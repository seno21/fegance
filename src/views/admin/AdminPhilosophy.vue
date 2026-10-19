<script setup lang="ts">
import { ref, watch } from "vue";
import { useSiteContent, type BrandStoryContent } from "@/composables/useSiteContent";
import { useOurStory, type OurStoryArticle, type StoryBlock } from "@/composables/useOurStory";

const activeTab = ref<"landing" | "fullStory">("landing");

// Tab 1: Landing section philosophy
const { content, updateSection } = useSiteContent();
const brandStory = ref<BrandStoryContent>({
  eyebrow: "",
  title: "",
  titleAccent: "",
  paragraphs: [],
  stats: [],
  images: { main: "", secondary: "", accent: "" },
});

watch(
  () => content.value?.brandStory,
  (val) => {
    if (!val) return;
    brandStory.value = {
      eyebrow: val.eyebrow || "",
      title: val.title || "",
      titleAccent: val.titleAccent || "",
      paragraphs: [...(val.paragraphs || [])],
      stats: (val.stats || []).map((s) => ({ ...s })),
      images: { ...(val.images || { main: "", secondary: "", accent: "" }) },
    };
  },
  { immediate: true }
);

// Tab 2: Full Our Story page
const { story, updateStory } = useOurStory();
const fullStory = ref<OurStoryArticle>({
  eyebrow: "",
  title: "",
  subtitle: "",
  blocks: [],
});

watch(
  story,
  (val) => {
    if (!val) return;
    fullStory.value = JSON.parse(JSON.stringify(val));
  },
  { immediate: true, deep: true }
);

const saving = ref(false);
const saveSuccess = ref(false);
const saveError = ref("");

async function handleSaveLanding() {
  saving.value = true;
  saveSuccess.value = false;
  saveError.value = "";
  try {
    await updateSection("brandStory", { ...brandStory.value });
    saveSuccess.value = true;
    setTimeout(() => (saveSuccess.value = false), 3500);
  } catch (e: any) {
    saveError.value = e?.message || "Gagal menyimpan section landing.";
  } finally {
    saving.value = false;
  }
}

async function handleSaveFullStory() {
  saving.value = true;
  saveSuccess.value = false;
  saveError.value = "";
  try {
    await updateStory(fullStory.value);
    saveSuccess.value = true;
    setTimeout(() => (saveSuccess.value = false), 3500);
  } catch (e: any) {
    saveError.value = e?.message || "Gagal menyimpan cerita lengkap.";
  } finally {
    saving.value = false;
  }
}

// Helpers for landing
function addParagraph() {
  brandStory.value.paragraphs.push("");
}
function removeParagraph(i: number) {
  brandStory.value.paragraphs.splice(i, 1);
}
function addStat() {
  brandStory.value.stats.push({ value: "", label: "" });
}
function removeStat(i: number) {
  brandStory.value.stats.splice(i, 1);
}

// Helpers for full story
function addBlock(type: "paragraph" | "image") {
  const id = "block_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6);
  if (type === "paragraph") {
    fullStory.value.blocks.push({ id, type: "paragraph", content: "" });
  } else {
    fullStory.value.blocks.push({
      id,
      type: "image",
      content: "",
      caption: "",
      position: "middle",
    });
  }
}
function removeBlock(idx: number) {
  fullStory.value.blocks.splice(idx, 1);
}
function moveBlock(idx: number, dir: -1 | 1) {
  const target = idx + dir;
  if (target < 0 || target >= fullStory.value.blocks.length) return;
  const temp = fullStory.value.blocks[idx]!;
  fullStory.value.blocks[idx] = fullStory.value.blocks[target]!;
  fullStory.value.blocks[target] = temp;
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-8 sm:py-10">
    <div class="mx-auto max-w-5xl">
      <!-- Header -->
      <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a227] block mb-1">
            Brand Story & Narasi
          </span>
          <h1 class="text-2xl sm:text-3xl font-bold text-ink">Philosophy & Cerita Kami</h1>
          <p class="text-xs sm:text-sm text-muted mt-1">
            Atur cerita filosofi pada landing page dan halaman narasi lengkap /our-story
          </p>
        </div>

        <button
          @click="activeTab === 'landing' ? handleSaveLanding() : handleSaveFullStory()"
          :disabled="saving"
          class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c9a227] text-white text-xs font-semibold hover:bg-[#b8921f] transition-all shadow-sm cursor-pointer disabled:opacity-60 self-start sm:self-auto"
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
        Perubahan cerita filosofi berhasil disimpan!
      </div>
      <div v-if="saveError" class="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
        {{ saveError }}
      </div>

      <!-- Tab Bar -->
      <div class="mb-6 flex gap-2 border-b border-gray-200 pb-3">
        <button
          @click="activeTab = 'landing'"
          class="px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer"
          :class="activeTab === 'landing' ? 'bg-[#111111] text-white shadow-sm' : 'bg-white text-muted hover:text-ink border border-gray-200'"
        >
          Section Landing Page (Our Philosophy)
        </button>
        <button
          @click="activeTab = 'fullStory'"
          class="px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer"
          :class="activeTab === 'fullStory' ? 'bg-[#c9a227] text-white shadow-sm' : 'bg-white text-muted hover:text-ink border border-gray-200'"
        >
          Halaman Lengkap Our Story (/our-story)
        </button>
      </div>

      <!-- TAB 1: SECTION LANDING PAGE -->
      <div v-if="activeTab === 'landing'" class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Eyebrow</label>
            <input v-model="brandStory.eyebrow" type="text" placeholder="Our Philosophy" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Judul Utama</label>
            <input v-model="brandStory.title" type="text" placeholder="Kore wa," class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Judul Aksen (Italic)</label>
            <input v-model="brandStory.titleAccent" type="text" placeholder="kaori no monogatari." class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
          </div>
        </div>

        <!-- Paragraphs -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-semibold text-ink">Paragraf Narasi Landing</label>
            <button type="button" @click="addParagraph" class="text-xs font-bold text-[#c9a227] hover:underline cursor-pointer">
              + Tambah Paragraf
            </button>
          </div>
          <div class="space-y-3">
            <div v-for="(_, i) in brandStory.paragraphs" :key="i" class="flex items-start gap-2">
              <textarea v-model="brandStory.paragraphs[i]" rows="2" class="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
              <button type="button" @click="removeParagraph(i)" class="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- 3 Stats -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-semibold text-ink">Statistik / Nilai Keunggulan</label>
            <button type="button" @click="addStat" class="text-xs font-bold text-[#c9a227] hover:underline cursor-pointer">
              + Tambah Stat
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div v-for="(_, i) in brandStory.stats" :key="i" class="p-3 rounded-xl bg-gray-50 border border-gray-100 flex items-center gap-2">
              <input v-model="brandStory.stats[i]!.value" type="text" placeholder="100% / 12+ Hrs" class="w-24 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs font-bold text-ink" />
              <input v-model="brandStory.stats[i]!.label" type="text" placeholder="Longevity" class="flex-1 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-ink" />
              <button type="button" @click="removeStat(i)" class="text-red-500 hover:bg-red-50 p-1 rounded">
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Images -->
        <div>
          <label class="text-xs font-semibold text-ink block mb-2">Foto Aksen Landing</label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label class="text-[11px] text-muted block mb-1">Foto Utama</label>
              <input v-model="brandStory.images.main" type="url" placeholder="https://…" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink" />
            </div>
            <div>
              <label class="text-[11px] text-muted block mb-1">Foto Sekunder</label>
              <input v-model="brandStory.images.secondary" type="url" placeholder="https://…" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink" />
            </div>
            <div>
              <label class="text-[11px] text-muted block mb-1">Foto Aksen 3</label>
              <input v-model="brandStory.images.accent" type="url" placeholder="https://…" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink" />
            </div>
          </div>
        </div>
      </div>

      <!-- TAB 2: HALAMAN LENGKAP OUR STORY -->
      <div v-else-if="activeTab === 'fullStory'" class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
        <div class="space-y-4 pb-5 border-b border-gray-100">
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Eyebrow</label>
            <input v-model="fullStory.eyebrow" type="text" placeholder="Cerita Fegance" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Judul Halaman</label>
            <input v-model="fullStory.title" type="text" placeholder="Biar Wangi Aja Yang Bicara" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink font-display text-base font-bold" />
          </div>
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Subtitle Pengantar</label>
            <textarea v-model="fullStory.subtitle" rows="2" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink" />
          </div>
        </div>

        <!-- Story Blocks -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xs font-bold uppercase tracking-wider text-muted">Blok Cerita Dinamis</h3>
            <div class="flex gap-2">
              <button type="button" @click="addBlock('paragraph')" class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-ink cursor-pointer">
                + Paragraf
              </button>
              <button type="button" @click="addBlock('image')" class="px-3 py-1.5 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-xs font-semibold text-ink cursor-pointer">
                + Foto / Ilustrasi
              </button>
            </div>
          </div>

          <div class="space-y-4">
            <div
              v-for="(block, idx) in fullStory.blocks"
              :key="block.id"
              class="p-4 rounded-xl border border-gray-200 bg-gray-50/50 space-y-3"
            >
              <div class="flex items-center justify-between pb-2 border-b border-gray-100">
                <span class="text-[11px] font-bold uppercase tracking-wider text-muted">
                  Blok {{ idx + 1 }}: {{ block.type === 'paragraph' ? 'Paragraf Teks' : 'Foto Cerita' }}
                </span>
                <div class="flex items-center gap-1">
                  <button type="button" @click="moveBlock(idx, -1)" :disabled="idx === 0" class="p-1 text-muted hover:text-ink disabled:opacity-30">
                    ▲
                  </button>
                  <button type="button" @click="moveBlock(idx, 1)" :disabled="idx === fullStory.blocks.length - 1" class="p-1 text-muted hover:text-ink disabled:opacity-30">
                    ▼
                  </button>
                  <button type="button" @click="removeBlock(idx)" class="p-1 text-red-500 hover:text-red-700 ml-2">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>

              <!-- Paragraph block content -->
              <div v-if="block.type === 'paragraph'">
                <textarea v-model="block.content" rows="3" placeholder="Tulis narasi cerita di sini…" class="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs text-ink" />
              </div>

              <!-- Image block content -->
              <div v-else class="space-y-2">
                <div>
                  <label class="text-[11px] text-muted block mb-0.5">URL Foto</label>
                  <input v-model="block.content" type="url" placeholder="https://…" class="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs text-ink" />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label class="text-[11px] text-muted block mb-0.5">Keterangan Foto (Caption)</label>
                    <input v-model="block.caption" type="text" placeholder="Contoh: Proses racikan wewangian" class="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs text-ink" />
                  </div>
                  <div>
                    <label class="text-[11px] text-muted block mb-0.5">Posisi Foto</label>
                    <select v-model="block.position" class="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs text-ink">
                      <option value="top">Atas (Header)</option>
                      <option value="middle">Tengah (Di sela-sela cerita)</option>
                      <option value="bottom">Bawah (Penutup)</option>
                    </select>
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
