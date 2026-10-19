<script setup lang="ts">
import { ref, watch } from "vue";
import { useSiteContent, type AnnouncementContent, type HeaderContent, type FooterContent } from "@/composables/useSiteContent";

const { content, loading, updateSection } = useSiteContent();

type Tab = "banner" | "header" | "footer";
const activeTab = ref<Tab>("banner");

const saving = ref(false);
const saveSuccess = ref(false);
const saveError = ref("");

// Tab 1: Banner
const announcement = ref<AnnouncementContent>({
  enabled: true,
  messages: [],
  promoBannerUrl: "",
  promoBannerLink: "",
});

// Tab 2: Header
const header = ref<HeaderContent>({
  logoText: "Fegance Project",
  shopCtaText: "Shop",
  shopCtaLink: "/product",
});

// Tab 3: Footer
const footer = ref<FooterContent>({
  brandDescription: "Aroma yang terinspirasi dari karakter dan cerita yang kami suka",
  address: "Kab. Cirebon",
  businessHours: "Mon – Sat · 09.00 – 20.00 WIB",
  copyright: "© " + new Date().getFullYear() + " Fegance Project. All Rights Reserved.",
  socials: {
    whatsapp: "https://wa.me/6285172372101",
    instagram: "https://instagram.com/fegance.id",
    tiktok: "https://www.tiktok.com/@fegance.id",
    shopee: "https://shopee.co.id",
  },
});

watch(
  content,
  (val) => {
    if (!val) return;
    if (val.announcement) {
      announcement.value = {
        enabled: val.announcement.enabled !== false,
        messages: [...(val.announcement.messages || [])],
        promoBannerUrl: val.announcement.promoBannerUrl || "",
        promoBannerLink: val.announcement.promoBannerLink || "",
      };
    }
    if (val.header) {
      header.value = {
        logoText: val.header.logoText || "Fegance Project",
        shopCtaText: val.header.shopCtaText || "Shop",
        shopCtaLink: val.header.shopCtaLink || "/product",
      };
    }
    if (val.footer) {
      footer.value = {
        brandDescription: val.footer.brandDescription || "Aroma yang terinspirasi dari karakter dan cerita yang kami suka",
        address: val.footer.address || "Kab. Cirebon",
        businessHours: val.footer.businessHours || "Mon – Sat · 09.00 – 20.00 WIB",
        copyright: val.footer.copyright || ("© " + new Date().getFullYear() + " Fegance Project. All Rights Reserved."),
        socials: {
          whatsapp: val.footer.socials?.whatsapp || "https://wa.me/6285172372101",
          instagram: val.footer.socials?.instagram || "https://instagram.com/fegance.id",
          tiktok: val.footer.socials?.tiktok || "https://www.tiktok.com/@fegance.id",
          shopee: val.footer.socials?.shopee || "https://shopee.co.id",
        },
      };
    }
  },
  { immediate: true }
);

function addMessage() {
  announcement.value.messages.push("");
}
function removeMessage(i: number) {
  announcement.value.messages.splice(i, 1);
}

async function handleSave() {
  saving.value = true;
  saveSuccess.value = false;
  saveError.value = "";
  try {
    if (activeTab.value === "banner") {
      await updateSection("announcement", { ...announcement.value });
    } else if (activeTab.value === "header") {
      await updateSection("header", { ...header.value });
    } else if (activeTab.value === "footer") {
      await updateSection("footer", { ...footer.value });
    }
    saveSuccess.value = true;
    setTimeout(() => (saveSuccess.value = false), 3500);
  } catch (e: any) {
    saveError.value = e?.message || "Gagal menyimpan pengaturan.";
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-8 sm:py-10">
    <div class="mx-auto max-w-5xl">
      <!-- Header -->
      <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a227] block mb-1">
            Konfigurasi Situs
          </span>
          <h1 class="text-2xl sm:text-3xl font-bold text-ink">Pengaturan (Settings)</h1>
          <p class="text-xs sm:text-sm text-muted mt-1">
            Atur banner iklan pengumuman atas, informasi header navbar, dan tautan sosial media footer
          </p>
        </div>

        <button
          @click="handleSave"
          :disabled="saving || loading"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c9a227] text-white text-xs font-semibold hover:bg-[#b8921f] transition-all shadow-sm cursor-pointer disabled:opacity-60 self-start sm:self-auto"
        >
          <svg v-if="saving" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>{{ saving ? "Menyimpan…" : "Simpan Pengaturan" }}</span>
        </button>
      </div>

      <!-- Feedback -->
      <div v-if="saveSuccess" class="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800">
        <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        Pengaturan berhasil disimpan!
      </div>
      <div v-if="saveError" class="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
        {{ saveError }}
      </div>

      <!-- Tab Bar -->
      <div class="mb-6 flex gap-2 border-b border-gray-200 pb-3">
        <button
          @click="activeTab = 'banner'"
          class="px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer"
          :class="activeTab === 'banner' ? 'bg-[#111111] text-white shadow-sm' : 'bg-white text-muted hover:text-ink border border-gray-200'"
        >
          1. Banner Iklan / Pengumuman
        </button>
        <button
          @click="activeTab = 'header'"
          class="px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer"
          :class="activeTab === 'header' ? 'bg-[#111111] text-white shadow-sm' : 'bg-white text-muted hover:text-ink border border-gray-200'"
        >
          2. Header (Navbar)
        </button>
        <button
          @click="activeTab = 'footer'"
          class="px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer"
          :class="activeTab === 'footer' ? 'bg-[#111111] text-white shadow-sm' : 'bg-white text-muted hover:text-ink border border-gray-200'"
        >
          3. Footer
        </button>
      </div>

      <!-- TAB 1: BANNER IKLAN -->
      <div v-if="activeTab === 'banner'" class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h2 class="text-sm font-bold text-ink">Announcement Bar (Bar Berjalan Atas)</h2>
            <p class="text-xs text-muted">Tampilkan pesan promosi, gratis ongkir, atau info toko di bar paling atas situs</p>
          </div>
          <label class="inline-flex items-center gap-2 text-xs font-bold text-ink cursor-pointer">
            <input v-model="announcement.enabled" type="checkbox" class="h-4 w-4 rounded text-[#c9a227]" />
            Aktifkan Banner
          </label>
        </div>

        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-semibold text-ink">Daftar Pesan Pengumuman (Bergantian Otomatis)</label>
            <button type="button" @click="addMessage" class="text-xs font-bold text-[#c9a227] hover:underline cursor-pointer">
              + Tambah Pesan
            </button>
          </div>
          <div class="space-y-2.5">
            <div v-for="(_, i) in announcement.messages" :key="i" class="flex items-center gap-2">
              <input
                v-model="announcement.messages[i]"
                type="text"
                placeholder="Contoh: FREE ONGKIR KESELURUH INDONESIA DENGAN MINIMAL BELANJA..."
                class="flex-1 px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none"
              />
              <button type="button" @click="removeMessage(i)" class="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </div>

        <div class="pt-4 border-t border-gray-100 space-y-4">
          <h3 class="text-xs font-bold uppercase tracking-wider text-muted">Banner Promo Tambahan (Opsional)</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-ink mb-1">URL Gambar Banner Promo</label>
              <input v-model="announcement.promoBannerUrl" type="url" placeholder="https://…" class="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
            </div>
            <div>
              <label class="block text-xs font-semibold text-ink mb-1">Target Link Promo</label>
              <input v-model="announcement.promoBannerLink" type="text" placeholder="https://shopee.co.id/…" class="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: HEADER -->
      <div v-if="activeTab === 'header'" class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
        <h2 class="text-sm font-bold text-ink pb-3 border-b border-gray-100">Pengaturan Navbar Header</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Teks Brand / Logo</label>
            <input v-model="header.logoText" type="text" placeholder="Fegance Project" class="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Teks Tombol CTA Utama</label>
            <input v-model="header.shopCtaText" type="text" placeholder="Shop" class="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
          </div>
        </div>

        <div>
          <label class="block text-xs font-semibold text-ink mb-1">Link Target Tombol CTA</label>
          <input v-model="header.shopCtaLink" type="text" placeholder="/product" class="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
        </div>
      </div>

      <!-- TAB 3: FOOTER -->
      <div v-if="activeTab === 'footer'" class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
        <h2 class="text-sm font-bold text-ink pb-3 border-b border-gray-100">Pengaturan Footer & Media Sosial</h2>

        <div>
          <label class="block text-xs font-semibold text-ink mb-1">Deskripsi / Bio Singkat Brand</label>
          <textarea v-model="footer.brandDescription" rows="2" class="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Alamat Outlet / Atelier</label>
            <input v-model="footer.address" type="text" placeholder="Kab. Cirebon" class="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Teks Hak Cipta (Copyright)</label>
            <input v-model="footer.copyright" type="text" class="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
          </div>
        </div>

        <h3 class="text-xs font-bold uppercase tracking-wider text-muted pt-3 border-t border-gray-100">
          Tautan Toko & Media Sosial
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">WhatsApp Toko</label>
            <input v-model="footer.socials!.whatsapp" type="text" placeholder="https://wa.me/6285172372101" class="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Toko Shopee Resmi</label>
            <input v-model="footer.socials!.shopee" type="text" placeholder="https://shopee.co.id/…" class="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Instagram (@fegance.id)</label>
            <input v-model="footer.socials!.instagram" type="text" placeholder="https://instagram.com/fegance.id" class="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">TikTok (@fegance.id)</label>
            <input v-model="footer.socials!.tiktok" type="text" placeholder="https://www.tiktok.com/@fegance.id" class="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
