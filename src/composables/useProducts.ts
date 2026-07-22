import { ref, onMounted, onUnmounted } from "vue";
import {
  collection,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase";
import type { Product } from "@/data/products";

export interface FirestoreProduct extends Omit<Product, "id"> {
  id: string;
}

export function useProducts() {
  const products = ref<FirestoreProduct[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  let unsubscribe: (() => void) | null = null;

  onMounted(() => {
    const q = query(collection(db, "products"));
    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        products.value = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as FirestoreProduct[];
        loading.value = false;
      },
      (err) => {
        error.value = err.message;
        loading.value = false;
      },
    );
  });

  onUnmounted(() => {
    unsubscribe?.();
  });

  async function getProduct(id: string): Promise<FirestoreProduct | null> {
    const snap = await getDoc(doc(db, "products", id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as FirestoreProduct;
  }

  async function getProductBySlug(
    slug: string,
  ): Promise<FirestoreProduct | null> {
    const all = products.value.length
      ? products.value
      : await fetchAllProducts();
    return all.find((p) => p.slug === slug) ?? null;
  }

  async function fetchAllProducts(): Promise<FirestoreProduct[]> {
    const snap = await import("firebase/firestore").then((m) =>
      m.getDocs(collection(db, "products")),
    );
    return snap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as FirestoreProduct[];
  }

  async function addProduct(
    data: Omit<Product, "id">,
  ): Promise<string> {
    const docRef = await addDoc(collection(db, "products"), data);
    return docRef.id;
  }

  async function updateProduct(
    id: string,
    data: Partial<Omit<Product, "id">>,
  ): Promise<void> {
    await updateDoc(doc(db, "products", id), data);
  }

  async function deleteProduct(id: string): Promise<void> {
    await deleteDoc(doc(db, "products", id));
  }

  return {
    products,
    loading,
    error,
    getProduct,
    getProductBySlug,
    fetchAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
