import { ref } from "vue";
import {
  signInWithPopup,
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

let initialized = false;

function initAuth() {
  if (initialized) return;
  initialized = true;

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
            role: "user",
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

  async function loginWithGoogle(): Promise<UserProfile> {
    const provider = new GoogleAuthProvider();
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
        role: "user",
        createdAt: serverTimestamp(),
      };
      await setDoc(userDocRef, profile);
    }
    userProfile.value = profile;
    return profile;
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
      role: "user",
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
