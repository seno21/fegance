import { ref, onMounted, onUnmounted } from "vue";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/firebase";

export interface StoryBlock {
  id: string;
  type: "paragraph" | "image";
  content: string; // Teks untuk paragraf, URL gambar untuk image
  caption?: string; // Caption opsional untuk gambar
  position?: "top" | "middle" | "bottom"; // Tag posisi opsional
}

export interface OurStoryArticle {
  eyebrow: string;
  title: string;
  subtitle: string;
  blocks: StoryBlock[];
}

export const defaultOurStoryArticle: OurStoryArticle = {
  eyebrow: "Cerita Fegance",
  title: "Biar Wangi Aja Yang Bicara",
  subtitle:
    "Sebuah karya seni aroma buatan Cirebon yang diracik khusus untuk menceritakan identitas diri tanpa perlu banyak kata.",
  blocks: [
    {
      id: "b1",
      type: "image",
      content:
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1200&fit=crop",
      caption: "Maison Fegance Atelier & Signature Fragrance",
      position: "top"
    },
    {
      id: "b2",
      type: "paragraph",
      content:
        "Fegance lahir di Cirebon dari rasa penasaran yang mendalam terhadap dunia seni wewangian. Bagi kami, parfum bukanlah sekadar minyak wangi penyegar tubuh biasa. Ia adalah sebuah karya seni tanpa rupa—meski tak kasat mata, aromanya hidup lama dalam ingatan dan menjadi bagian erat dari identitas seseorang."
    },
    {
      id: "b3",
      type: "paragraph",
      content:
        "Perjalanan kami dimulai dari keinginan sederhana: menciptakan parfum lokal berkualitas tinggi dengan ekstrak minyak wangi premium yang tahan lama, dipadu dengan kemasan mewah dan estetik, tanpa membebankan harga yang berlebihan."
    },
    {
      id: "b4",
      type: "image",
      content:
        "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=1200&fit=crop",
      caption: "Proses racikan formulasi wewangian dengan standar tinggi",
      position: "middle"
    },
    {
      id: "b5",
      type: "paragraph",
      content:
        "Setiap racikan Fegance dibuat melalui proses formulasi teliti (olfactory testing) untuk memastikan daya tahan (longevity) dan jejak aroma (sillage) yang memikat sepanjang hari. Kami percaya bahwa wewangian adalah cara paling elegan untuk menyampaikan karakter diri."
    },
    {
      id: "b6",
      type: "paragraph",
      content:
        "Ketika kata-kata tak perlu terucap, biarkan wangi Fegance yang berbicara mewakili pesona dan keunikan dirimu."
    }
  ]
};

export function useOurStory() {
  const story = ref<OurStoryArticle>(defaultOurStoryArticle);
  const loading = ref(true);
  const error = ref<string | null>(null);
  let unsubscribe: (() => void) | null = null;

  onMounted(() => {
    unsubscribe = onSnapshot(
      doc(db, "ourStory", "main"),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as any;
          // Upgrade / migrate older data structure if needed
          if (!data.blocks && (data.paragraphs || data.coverImage)) {
            const blocks: StoryBlock[] = [];
            if (data.coverImage) {
              blocks.push({
                id: "cover",
                type: "image",
                content: data.coverImage,
                position: "top"
              });
            }
            if (Array.isArray(data.paragraphs)) {
              data.paragraphs.forEach((p: string, idx: number) => {
                blocks.push({
                  id: "p_" + idx,
                  type: "paragraph",
                  content: p
                });
                if (idx === Math.floor(data.paragraphs.length / 2) - 1 && data.secondaryImage) {
                  blocks.push({
                    id: "sec",
                    type: "image",
                    content: data.secondaryImage,
                    position: "middle"
                  });
                }
              });
            }
            story.value = {
              eyebrow: data.eyebrow || defaultOurStoryArticle.eyebrow,
              title: data.title || defaultOurStoryArticle.title,
              subtitle: data.subtitle || defaultOurStoryArticle.subtitle,
              blocks: blocks.length ? blocks : defaultOurStoryArticle.blocks
            };
          } else {
            story.value = {
              ...defaultOurStoryArticle,
              ...data,
              blocks: Array.isArray(data.blocks) ? data.blocks : defaultOurStoryArticle.blocks
            };
          }
        } else {
          story.value = defaultOurStoryArticle;
        }
        loading.value = false;
      },
      (err) => {
        console.warn("Using default Our Story article data:", err.message);
        story.value = defaultOurStoryArticle;
        error.value = err.message;
        loading.value = false;
      }
    );
  });

  onUnmounted(() => {
    unsubscribe?.();
  });

  async function updateStory(data: OurStoryArticle): Promise<void> {
    await setDoc(doc(db, "ourStory", "main"), data, { merge: true });
  }

  return {
    story,
    loading,
    error,
    updateStory
  };
}
