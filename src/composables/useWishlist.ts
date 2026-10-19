import { ref, computed } from "vue";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase";

export interface WishlistItem {
  productId: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  category?: string;
  family?: string;
  shopeeLink?: string;
  whatsappLink?: string;
  addedAt?: any;
}

const GUEST_STORAGE_KEY = "fegance_guest_wishlist";

const wishlistItems = ref<WishlistItem[]>([]);
const loading = ref(true);
let unsubscribeWishlist: (() => void) | null = null;
let currentUid: string | null = null;

function loadGuestWishlist(): WishlistItem[] {
  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveGuestWishlist(items: WishlistItem[]) {
  try {
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.error("Failed to save guest wishlist", e);
  }
}

let authListening = false;
function initWishlistAuthListener() {
  if (authListening) return;
  authListening = true;

  onAuthStateChanged(auth, async (user) => {
    if (unsubscribeWishlist) {
      unsubscribeWishlist();
      unsubscribeWishlist = null;
    }

    if (user) {
      currentUid = user.uid;
      // Sync guest wishlist to user account if any
      const guestItems = loadGuestWishlist();
      if (guestItems.length > 0) {
        for (const item of guestItems) {
          try {
            await setDoc(doc(db, "users", user.uid, "wishlist", item.productId), {
              ...item,
              addedAt: serverTimestamp(),
            });
          } catch (e) {
            console.error("Error migrating guest wishlist item:", e);
          }
        }
        localStorage.removeItem(GUEST_STORAGE_KEY);
      }

      // Listen to Firestore collection
      const wishlistRef = collection(db, "users", user.uid, "wishlist");
      unsubscribeWishlist = onSnapshot(
        wishlistRef,
        (snapshot) => {
          wishlistItems.value = snapshot.docs.map((d) => ({
            productId: d.id,
            ...d.data(),
          })) as WishlistItem[];
          loading.value = false;
        },
        (err) => {
          console.error("Error listening to wishlist:", err);
          loading.value = false;
        }
      );
    } else {
      currentUid = null;
      wishlistItems.value = loadGuestWishlist();
      loading.value = false;
    }
  });
}

export function useWishlist() {
  initWishlistAuthListener();

  function isInWishlist(id: string | number): boolean {
    const strId = String(id);
    return wishlistItems.value.some((item) => item.productId === strId);
  }

  async function toggleWishlist(product: {
    id: string | number;
    name: string;
    slug: string;
    price: number;
    image: string;
    category?: string;
    family?: string;
    shopeeLink?: string;
    whatsappLink?: string;
  }): Promise<boolean> {
    const strId = String(product.id);
    const existingIndex = wishlistItems.value.findIndex(
      (item) => item.productId === strId
    );

    if (existingIndex >= 0) {
      // Remove
      await removeFromWishlist(strId);
      return false;
    } else {
      // Add
      const newItem: WishlistItem = {
        productId: strId,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        category: product.category || "",
        family: product.family || "",
        shopeeLink: product.shopeeLink || "",
        whatsappLink: product.whatsappLink || "",
      };

      if (currentUid) {
        await setDoc(doc(db, "users", currentUid, "wishlist", strId), {
          ...newItem,
          addedAt: serverTimestamp(),
        });
      } else {
        const updated = [...wishlistItems.value, newItem];
        wishlistItems.value = updated;
        saveGuestWishlist(updated);
      }
      return true;
    }
  }

  async function removeFromWishlist(id: string | number): Promise<void> {
    const strId = String(id);
    if (currentUid) {
      await deleteDoc(doc(db, "users", currentUid, "wishlist", strId));
    } else {
      const updated = wishlistItems.value.filter(
        (item) => item.productId !== strId
      );
      wishlistItems.value = updated;
      saveGuestWishlist(updated);
    }
  }

  const wishlistCount = computed(() => wishlistItems.value.length);

  return {
    wishlistItems,
    wishlistCount,
    loading,
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
  };
}
