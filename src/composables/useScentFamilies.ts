import { ref, onMounted, onUnmounted } from "vue";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import type { ScentFamily } from "@/data/products";

export interface FirestoreScentFamily extends Omit<ScentFamily, "id"> {
  id: string;
}

export function useScentFamilies() {
  const families = ref<FirestoreScentFamily[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  let unsubscribe: (() => void) | null = null;

  onMounted(() => {
    const q = collection(db, "scentFamilies");
    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        families.value = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as FirestoreScentFamily[];
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

  async function addFamily(
    id: string,
    data: Omit<ScentFamily, "id">,
  ): Promise<void> {
    await setDoc(doc(db, "scentFamilies", id), data);
  }

  async function updateFamily(
    id: string,
    data: Partial<Omit<ScentFamily, "id">>,
  ): Promise<void> {
    await updateDoc(doc(db, "scentFamilies", id), data);
  }

  async function deleteFamily(id: string): Promise<void> {
    await deleteDoc(doc(db, "scentFamilies", id));
  }

  return {
    families,
    loading,
    error,
    addFamily,
    updateFamily,
    deleteFamily,
  };
}
