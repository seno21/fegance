import { ref, onMounted, onUnmounted } from "vue";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

export interface HeroContent {
  tagline: string;
  taglineAccent: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  imageUrl: string;
  bgUrl?: string;
}

export interface BrandStoryContent {
  eyebrow: string;
  title: string;
  titleAccent: string;
  paragraphs: string[];
  stats: { value: string; label: string }[];
  images: { main: string; secondary: string; accent: string };
}

export interface WhyChooseUsContent {
  sectionTitle: string;
  sectionSubtitle: string;
  pillars: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface ContactContent {
  eyebrow: string;
  title: string;
  description: string;
  address: string;
  businessHours: string;
  contacts: { name: string; handle: string; link: string; external: boolean }[];
}

export interface AnnouncementContent {
  messages: string[];
  enabled: boolean;
  promoBannerUrl?: string;
  promoBannerLink?: string;
}

export interface HeaderContent {
  logoText?: string;
  shopCtaText?: string;
  shopCtaLink?: string;
}

export interface FooterContent {
  brandDescription?: string;
  address?: string;
  businessHours?: string;
  copyright?: string;
  socials?: {
    whatsapp?: string;
    instagram?: string;
    tiktok?: string;
    shopee?: string;
  };
}

export interface SiteContent {
  hero: HeroContent;
  brandStory: BrandStoryContent;
  whyChooseUs: WhyChooseUsContent;
  contact: ContactContent;
  announcement: AnnouncementContent;
  header?: HeaderContent;
  footer?: FooterContent;
}

export function useSiteContent() {
  const content = ref<SiteContent | null>(null);
  const loading = ref(true);
  const error = ref<string | null>(null);
  let unsubscribe: (() => void) | null = null;

  onMounted(() => {
    unsubscribe = onSnapshot(
      doc(db, "siteContent", "main"),
      (snap) => {
        if (snap.exists()) {
          content.value = snap.data() as SiteContent;
        }
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

  async function updateSection<K extends keyof SiteContent>(
    section: K,
    data: Partial<SiteContent[K]>,
  ): Promise<void> {
    await updateDoc(doc(db, "siteContent", "main"), {
      [section]: data,
    });
  }

  async function updateAll(data: Partial<SiteContent>): Promise<void> {
    await updateDoc(doc(db, "siteContent", "main"), data);
  }

  return {
    content,
    loading,
    error,
    updateSection,
    updateAll,
  };
}
