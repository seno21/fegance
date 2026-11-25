import { ref } from "vue";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/firebase";

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role: "user" | "admin";
  createdAt?: any;
}

const currentUser = ref<User | null>(null);
const userProfile = ref<UserProfile | null>(null);
const loading = ref(true);

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "fegasusena@gmail.com";

function resolveRole(email?: string | null): "user" | "admin" {
  return email && email.toLowerCase() === ADMIN_EMAIL.toLowerCase() ? "admin" : "user";
}

let initialized = false;

export function formatAuthError(err: any): string {
  if (!err) return "Terjadi kesalahan. Silakan coba lagi.";
  const code = err.code || "";
  const currentHost = typeof window !== "undefined" ? window.location.hostname : "domain ini";

  switch (code) {
    case "auth/unauthorized-domain":
      return `Domain (${currentHost}) belum diizinkan di Firebase. Buka Firebase Console > Authentication > Settings > Authorized domains lalu tambahkan '${currentHost}'.`;
    case "auth/operation-not-allowed":
      return "Login dengan Google belum diaktifkan di Firebase Console. Buka Firebase Console > Authentication > Sign-in method, dan aktifkan Google provider.";
    case "auth/popup-blocked":
      return "Jendela popup login diblokir oleh browser. Izinkan popup untuk situs ini atau coba lagi.";
    case "auth/popup-closed-by-user":
      return "Jendela login Google ditutup sebelum menyelesaikan autentikasi.";
    case "auth/cancelled-popup-request":
      return "Permintaan login Google dibatalkan.";
    case "auth/account-exists-with-different-credential":
      return "Akun dengan email ini sudah terdaftar menggunakan metode login lain.";
    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Email atau kata sandi tidak sesuai.";
    case "auth/email-already-in-use":
      return "Email ini sudah terdaftar. Silakan langsung masuk.";
    case "auth/weak-password":
      return "Kata sandi minimal 6 karakter.";
    case "auth/network-request-failed":
      return "Gagal terhubung ke server. Periksa koneksi internet Anda.";
    default:
      return err.message || "Gagal melakukan autentikasi. Silakan coba lagi.";
  }
}

function initAuth() {
  if (initialized) return;
  initialized = true;

  // Handle redirect result if returned from Google OAuth redirect
  getRedirectResult(auth)
    .then(async (result) => {
      if (result?.user) {
        const u = result.user;
        const userDocRef = doc(db, "users", u.uid);
        const snap = await getDoc(userDocRef);
        if (!snap.exists()) {
          const profile: UserProfile = {
            uid: u.uid,
            email: u.email || "",
            displayName: u.displayName || u.email?.split("@")[0] || "User",
            photoURL: u.photoURL || "",
            role: resolveRole(u.email),
            createdAt: serverTimestamp(),
          };
          await setDoc(userDocRef, profile);
          userProfile.value = profile;
        } else {
          userProfile.value = snap.data() as UserProfile;
        }
      }
    })
    .catch((err) => {
      console.error("Error processing Google redirect result:", err);
    });

  onAuthStateChanged(auth, async (u) => {
    currentUser.value = u;
    if (u) {
      try {
        const userDocRef = doc(db, "users", u.uid);
        const snap = await getDoc(userDocRef);
        if (snap.exists()) {
          userProfile.value = snap.data() as UserProfile;
        } else {
          const newProfile: UserProfile = {
            uid: u.uid,
            email: u.email || "",
            displayName: u.displayName || u.email?.split("@")[0] || "User",
            photoURL: u.photoURL || "",
            role: resolveRole(u.email),
            createdAt: serverTimestamp(),
          };
          await setDoc(userDocRef, newProfile);
          userProfile.value = newProfile;
        }
      } catch (err) {
        console.error("Error loading user profile:", err);
      }
    } else {
      userProfile.value = null;
    }
    loading.value = false;
  });
}

export function useUserAuth() {
  initAuth();

  async function loginWithGoogle(useRedirectFallback = true): Promise<UserProfile | null> {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const result = await signInWithPopup(auth, provider);
      const u = result.user;
      const userDocRef = doc(db, "users", u.uid);
      const snap = await getDoc(userDocRef);

      let profile: UserProfile;
      if (snap.exists()) {
        profile = snap.data() as UserProfile;
      } else {
        profile = {
          uid: u.uid,
          email: u.email || "",
          displayName: u.displayName || u.email?.split("@")[0] || "User",
          photoURL: u.photoURL || "",
          role: resolveRole(u.email),
          createdAt: serverTimestamp(),
        };
        await setDoc(userDocRef, profile);
      }
      userProfile.value = profile;
      return profile;
    } catch (err: any) {
      if ((err.code === "auth/popup-blocked" || err.code === "auth/cancelled-popup-request") && useRedirectFallback) {
        console.warn("Popup blocked, fallback to signInWithRedirect:", err);
        await signInWithRedirect(auth, provider);
        return null;
      }
      throw err;
    }
  }

  async function loginWithEmail(email: string, pass: string): Promise<User> {
    const res = await signInWithEmailAndPassword(auth, email, pass);
    return res.user;
  }

  async function registerWithEmail(
    email: string,
    pass: string,
    name: string,
  ): Promise<UserProfile> {
    const res = await createUserWithEmailAndPassword(auth, email, pass);
    const u = res.user;
    if (name) {
      await updateProfile(u, { displayName: name });
    }
    const profile: UserProfile = {
      uid: u.uid,
      email: u.email || "",
      displayName: name || u.email?.split("@")[0] || "User",
      photoURL: "",
      role: resolveRole(u.email),
      createdAt: serverTimestamp(),
    };
    await setDoc(doc(db, "users", u.uid), profile);
    userProfile.value = profile;
    return profile;
  }

  async function logout(): Promise<void> {
    await signOut(auth);
    currentUser.value = null;
    userProfile.value = null;
  }

  return {
    user: currentUser,
    userProfile,
    loading,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
  };
}
