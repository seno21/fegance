<script setup lang="ts">
import { ref, watch } from "vue";
import { useSiteContent, type HeroContent } from "@/composables/useSiteContent";
import brandFace from "@/assets/landing/brand-face.jpeg";

const { content, loading, updateSection } = useSiteContent();

const hero = ref<HeroContent>({
  tagline: "",
  taglineAccent: "",
  subtitle: "",
  ctaPrimary: "",
  ctaSecondary: "",
  imageUrl: "",
  bgUrl: "",
});

const saving = ref(false);
const saveSuccess = ref(false);
const saveError = ref("");

watch(
  () => content.value?.hero,
  (val) => {
    if (!val) return;
    hero.value = {
      tagline: val.tagline || "",
      taglineAccent: val.taglineAccent || "",
      subtitle: val.subtitle || "",
      ctaPrimary: val.ctaPrimary || "",
      ctaSecondary: val.ctaSecondary || "",
      imageUrl: val.imageUrl || "",
      bgUrl: val.bgUrl || "",
    };
  },
  { immediate: true }
);

async function handleSave() {
  saving.value = true;
  saveSuccess.value = false;
  saveError.value = "";
  try {
    await updateSection("hero", { ...hero.value });
    saveSuccess.value = true;
    setTimeout(() => {
      saveSuccess.value = false;
    }, 3500);
  } catch (e: any) {
    saveError.value = e?.message || "Gagal menyimpan perubahan hero.";
  } finally {
    saving.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-8 sm:py-10">
    <div class="mx-auto max-w-6xl">
      <!-- Title & Header -->
      <div class="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a227] block mb-1">
            Landing Section
          </span>
          <h1 class="text-2xl sm:text-3xl font-bold text-ink">Manajemen Hero Section</h1>
          <p class="text-xs sm:text-sm text-muted mt-1">
            Kelola judul, teks aksen, tombol aksi, dan visual anime background pada halaman utama
          </p>
        </div>

        <button
          type="button"
          @click="handleSave"
          :disabled="saving || loading"
          class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#c9a227] text-white text-xs font-semibold hover:bg-[#b8921f] transition-all shadow-sm disabled:opacity-60 cursor-pointer self-start sm:self-auto"
        >
          <svg v-if="saving" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span>{{ saving ? "Menyimpan…" : "Simpan Perubahan" }}</span>
        </button>
      </div>

      <!-- Feedback -->
      <div v-if="saveSuccess" class="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800">
        <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        Perubahan Hero Section berhasil disimpan!
      </div>
      <div v-if="saveError" class="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
        <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        {{ saveError }}
      </div>

      <!-- Content Grid: Form (7 cols) + Live Preview (5 cols) -->
      <div class="grid lg:grid-cols-12 gap-8 items-start">
        <!-- Form Fields -->
        <div class="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
          <h2 class="text-sm font-bold uppercase tracking-wider text-muted pb-3 border-b border-gray-100">
            Form Konten Teks & Tombol
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-ink mb-1.5">Tagline Utama</label>
              <input
                v-model="hero.tagline"
                type="text"
                placeholder="Contoh: Wangi Dulu"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-ink text-xs focus:bg-white focus:outline-none focus:border-[#c9a227] transition-colors"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-ink mb-1.5">Tagline Aksen (Italic)</label>
              <input
                v-model="hero.taglineAccent"
                type="text"
                placeholder="Contoh: Sisanya Nanti"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-ink text-xs focus:bg-white focus:outline-none focus:border-[#c9a227] transition-colors"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-ink mb-1.5">Subtitle / Deskripsi</label>
            <textarea
              v-model="hero.subtitle"
              rows="3"
              placeholder="Deskripsi singkat yang tampil di bawah judul hero…"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-ink text-xs focus:bg-white focus:outline-none focus:border-[#c9a227] transition-colors"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-ink mb-1.5">Tombol Primer (CTA 1)</label>
              <input
                v-model="hero.ctaPrimary"
                type="text"
                placeholder="Contoh: Collection"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-ink text-xs focus:bg-white focus:outline-none focus:border-[#c9a227] transition-colors"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-ink mb-1.5">Tombol Sekunder (CTA 2)</label>
              <input
                v-model="hero.ctaSecondary"
                type="text"
                placeholder="Contoh: Our Story"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-ink text-xs focus:bg-white focus:outline-none focus:border-[#c9a227] transition-colors"
              />
            </div>
          </div>

          <h2 class="text-sm font-bold uppercase tracking-wider text-muted pt-4 pb-3 border-b border-gray-100">
            Visual & Gambar
          </h2>

          <div>
            <label class="block text-xs font-semibold text-ink mb-1.5">URL Gambar Produk Signature</label>
            <input
              v-model="hero.imageUrl"
              type="url"
              placeholder="https://images.unsplash.com/…"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-ink text-xs focus:bg-white focus:outline-none focus:border-[#c9a227] transition-colors"
            />
            <p class="text-[11px] text-muted mt-1">Kosongkan jika ingin menggunakan foto signature default.</p>
          </div>

          <div>
            <label class="block text-xs font-semibold text-ink mb-1.5">URL Gambar Anime Background Scenery</label>
            <input
              v-model="hero.bgUrl"
              type="text"
              placeholder="Default: /images/anime/up.jpg"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 text-ink text-xs focus:bg-white focus:outline-none focus:border-[#c9a227] transition-colors"
            />
            <p class="text-[11px] text-muted mt-1">Latar pemandangan anime Jepang di bagian atas landing page.</p>
          </div>
        </div>

        <!-- Live Preview Card (5 cols) -->
        <div class="lg:col-span-5 space-y-4">
          <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
              <span class="text-xs font-bold uppercase tracking-wider text-muted">Live Preview</span>
              <span class="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">Real-time</span>
            </div>

            <!-- Mini Hero Simulation Card -->
            <div class="relative rounded-2xl overflow-hidden border border-line bg-canvas p-5 shadow-inner">
              <!-- Simulated Scenery -->
              <div class="absolute inset-0 pointer-events-none opacity-40">
                <img :src="hero.bgUrl || '/images/anime/up.jpg'" class="w-full h-full object-cover" />
              </div>
              <div class="absolute inset-0 bg-gradient-to-b from-canvas/90 via-canvas/80 to-canvas" />

              <div class="relative z-10 space-y-3">
                <span class="text-[9px] font-bold tracking-widest uppercase text-[#c9a227] block">Preview Hero</span>
                <h3 class="font-display text-2xl font-bold text-ink leading-tight">
                  {{ hero.tagline || "Wangi Dulu" }}
                  <span class="block italic font-normal text-ink/70 text-lg">
                    {{ hero.taglineAccent || "Sisanya Nanti" }}
                  </span>
                </h3>

                <p class="text-xs text-muted leading-relaxed">
                  {{ hero.subtitle || "Pilih aroma favorit sesuai karaktermu, jadilah mc di ceritamu" }}
                </p>

                <div class="flex gap-2 pt-1">
                  <span class="px-3.5 py-1.5 rounded-pill bg-ink text-white text-[10px] font-bold uppercase">
                    {{ hero.ctaPrimary || "Collection" }}
                  </span>
                  <span class="px-3.5 py-1.5 rounded-pill border border-ink text-ink text-[10px] font-bold uppercase">
                    {{ hero.ctaSecondary || "Our Story" }}
                  </span>
                </div>

                <!-- Product Preview Image -->
                <div class="mt-4 pt-3 border-t border-line/60">
                  <p class="text-[10px] text-muted mb-2">Signature Perfume Image:</p>
                  <div class="w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface shadow-sm relative">
                    <img
                      :src="hero.imageUrl || brandFace"
                      alt="Signature Scent"
                      class="w-full h-full object-cover"
                    />
                    <div class="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold">
                      Signature Scent
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
