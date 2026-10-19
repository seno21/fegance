<script setup lang="ts">
import { ref, watch } from "vue";
import { useSiteContent, type WhyChooseUsContent } from "@/composables/useSiteContent";

const { content, loading, updateSection } = useSiteContent();

const whyChooseUs = ref<WhyChooseUsContent>({
  sectionTitle: "",
  sectionSubtitle: "",
  pillars: [],
});

const saving = ref(false);
const saveSuccess = ref(false);
const saveError = ref("");

const availableIcons = [
  { value: "sparkles", label: "Sparkles (Mahkota / Kemewahan)" },
  { value: "hourglass", label: "Hourglass (Ketahanan / Longevity)" },
  { value: "shield", label: "Shield (Jaminan Kualitas / Proteksi)" },
  { value: "star", label: "Star (Bintang / Keunggulan)" },
  { value: "heart", label: "Heart (Kepuasan / Cinta Pelanggan)" },
  { value: "feather", label: "Feather (Kelembutan / Ringan)" },
];

watch(
  () => content.value?.whyChooseUs,
  (val) => {
    if (!val) return;
    whyChooseUs.value = {
      sectionTitle: val.sectionTitle || "The Maison Standards",
      sectionSubtitle: val.sectionSubtitle || "Why Choose Fegance",
      pillars: (val.pillars || []).map((p) => ({ ...p })),
    };
  },
  { immediate: true }
);

function addPillar() {
  whyChooseUs.value.pillars.push({
    title: "",
    description: "",
    icon: "sparkles",
  });
}

function removePillar(idx: number) {
  whyChooseUs.value.pillars.splice(idx, 1);
}

function movePillar(idx: number, dir: -1 | 1) {
  const target = idx + dir;
  if (target < 0 || target >= whyChooseUs.value.pillars.length) return;
  const temp = whyChooseUs.value.pillars[idx]!;
  whyChooseUs.value.pillars[idx] = whyChooseUs.value.pillars[target]!;
  whyChooseUs.value.pillars[target] = temp;
}

async function handleSave() {
  saving.value = true;
  saveSuccess.value = false;
  saveError.value = "";
  try {
    await updateSection("whyChooseUs", { ...whyChooseUs.value });
    saveSuccess.value = true;
    setTimeout(() => (saveSuccess.value = false), 3500);
  } catch (e: any) {
    saveError.value = e?.message || "Gagal menyimpan standar kartu.";
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
            Section Standards
          </span>
          <h1 class="text-2xl sm:text-3xl font-bold text-ink">Standar Card (The Maison Standards)</h1>
          <p class="text-xs sm:text-sm text-muted mt-1">
            Atur kartu keunggulan racikan parfum dan standar mutu yang tampil di landing page
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
          <span>{{ saving ? "Menyimpan…" : "Simpan Perubahan" }}</span>
        </button>
      </div>

      <!-- Feedback -->
      <div v-if="saveSuccess" class="mb-6 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs text-emerald-800">
        <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        Kartu standar The Maison Standards berhasil disimpan!
      </div>
      <div v-if="saveError" class="mb-6 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-700">
        {{ saveError }}
      </div>

      <!-- Section Title & Subtitle Card -->
      <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-6 space-y-4">
        <h2 class="text-xs font-bold uppercase tracking-wider text-muted">Judul Section</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Judul Utama</label>
            <input
              v-model="whyChooseUs.sectionTitle"
              type="text"
              placeholder="The Maison Standards"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-xs font-semibold text-ink mb-1">Subtitle / Kategori</label>
            <input
              v-model="whyChooseUs.sectionSubtitle"
              type="text"
              placeholder="Why Choose Fegance"
              class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Dynamic Cards -->
      <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-gray-100">
          <div>
            <h2 class="text-xs font-bold uppercase tracking-wider text-muted">Daftar Kartu Standar</h2>
            <p class="text-[11px] text-faint mt-0.5">Tambah atau ubah kartu keunggulan yang tampil di grid 3 kolom homepage</p>
          </div>
          <button
            type="button"
            @click="addPillar"
            class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ink text-white text-xs font-semibold hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Tambah Kartu
          </button>
        </div>

        <div v-if="whyChooseUs.pillars.length === 0" class="py-12 text-center text-xs text-muted">
          Belum ada kartu standar. Klik "Tambah Kartu" untuk menambahkan kartu keunggulan.
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="(pillar, idx) in whyChooseUs.pillars"
            :key="idx"
            class="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3"
          >
            <div class="flex items-center justify-between pb-2 border-b border-gray-200/60">
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-[#c9a227] text-white text-xs font-bold flex items-center justify-center">
                  {{ idx + 1 }}
                </span>
                <span class="text-xs font-bold text-ink">Kartu Standar {{ idx + 1 }}</span>
              </div>
              <div class="flex items-center gap-1">
                <button
                  type="button"
                  @click="movePillar(idx, -1)"
                  :disabled="idx === 0"
                  class="p-1 text-muted hover:text-ink disabled:opacity-30"
                  title="Geser ke atas"
                >
                  ▲
                </button>
                <button
                  type="button"
                  @click="movePillar(idx, 1)"
                  :disabled="idx === whyChooseUs.pillars.length - 1"
                  class="p-1 text-muted hover:text-ink disabled:opacity-30"
                  title="Geser ke bawah"
                >
                  ▼
                </button>
                <button
                  type="button"
                  @click="removePillar(idx)"
                  class="p-1 text-red-500 hover:text-red-700 ml-2"
                  title="Hapus kartu ini"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-ink mb-1">Judul Keunggulan</label>
                <input
                  v-model="whyChooseUs.pillars[idx]!.title"
                  type="text"
                  placeholder="Contoh: Masterfully Crafted"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs text-ink focus:border-[#c9a227] focus:outline-none"
                />
              </div>

              <div>
                <label class="block text-xs font-semibold text-ink mb-1">Pilihan Icon</label>
                <select
                  v-model="whyChooseUs.pillars[idx]!.icon"
                  class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs text-ink focus:border-[#c9a227] focus:outline-none"
                >
                  <option v-for="iconOpt in availableIcons" :key="iconOpt.value" :value="iconOpt.value">
                    {{ iconOpt.label }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-ink mb-1">Deskripsi Standar</label>
              <textarea
                v-model="whyChooseUs.pillars[idx]!.description"
                rows="2"
                placeholder="Penjelasan komitmen dan mutu wewangian…"
                class="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 bg-white text-xs text-ink focus:border-[#c9a227] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
