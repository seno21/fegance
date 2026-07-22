import { ref, onMounted, onUnmounted } from "vue";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import type { Testimonial } from "@/data/products";

export interface FirestoreTestimonial extends Omit<Testimonial, "id"> {
  id: string;
}

export function useTestimonials() {
  const testimonials = ref<FirestoreTestimonial[]>([]);
  const loading = ref(true);
  const error = ref<string | null>(null);
  let unsubscribe: (() => void) | null = null;

  onMounted(() => {
    const q = collection(db, "testimonials");
    unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        testimonials.value = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })) as FirestoreTestimonial[];
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

  async function addTestimonial(
    data: Omit<Testimonial, "id">,
  ): Promise<string> {
    const docRef = await addDoc(collection(db, "testimonials"), data);
    return docRef.id;
  }

  async function updateTestimonial(
    id: string,
    data: Partial<Omit<Testimonial, "id">>,
  ): Promise<void> {
    await updateDoc(doc(db, "testimonials", id), data);
  }

  async function deleteTestimonial(id: string): Promise<void> {
    await deleteDoc(doc(db, "testimonials", id));
  }

  return {
    testimonials,
    loading,
    error,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
}
