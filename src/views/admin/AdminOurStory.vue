<script setup lang="ts">
import { ref, watch } from "vue";
import { useOurStory, type OurStoryArticle, type StoryBlock } from "@/composables/useOurStory";

const { story, loading, updateStory } = useOurStory();

const saving = ref(false);
const saveSuccess = ref(false);
const saveError = ref("");

const form = ref<OurStoryArticle>({
  eyebrow: "",
  title: "",
  subtitle: "",
  blocks: [],
});

watch(
  story,
  (val) => {
    if (!val) return;
    form.value = JSON.parse(JSON.stringify(val));
  },
  { immediate: true, deep: true }
);

async function handleSave() {
  saving.value = true;
  saveSuccess.value = false;
  saveError.value = "";
  try {
    await updateStory(form.value);
    saveSuccess.value = true;
    setTimeout(() => {
      saveSuccess.value = false;
    }, 3500);
  } catch (e: any) {
    console.error("Save error:", e);
    saveError.value = e?.message || "Gagal menyimpan perubahan. Silakan coba lagi.";
  } finally {
    saving.value = false;
  }
}

function addParagraphBlock() {
  form.value.blocks.push({
    id: "block_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
    type: "paragraph",
    content: "",
  });
}

function addImageBlock(pos: "top" | "middle" | "bottom" = "middle") {
  const newBlock: StoryBlock = {
    id: "block_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
    type: "image",
    content: "",
    caption: "",
    position: pos,
  };

  if (pos === "top") {
    form.value.blocks.unshift(newBlock);
  } else {
    form.value.blocks.push(newBlock);
  }
}

function removeBlock(index: number) {
  form.value.blocks.splice(index, 1);
}

function moveUp(index: number) {
  if (index <= 0) return;
  const temp = form.value.blocks[index];
  form.value.blocks[index] = form.value.blocks[index - 1]!;
  form.value.blocks[index - 1] = temp!;
}

function moveDown(index: number) {
  if (index >= form.value.blocks.length - 1) return;
  const temp = form.value.blocks[index];
  form.value.blocks[index] = form.value.blocks[index + 1]!;
  form.value.blocks[index + 1] = temp!;
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
    <div class="mx-auto max-w-3xl">
      <!-- Header -->
      <div class="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-[#111111]">Editor Artikel Our Story</h1>
          <p class="mt-1 text-sm text-gray-500">
            Kelola isi cerita dan letakkan gambar secara bebas (di atas, di tengah, atau di bawah).
          </p>
        </div>
        <a
          href="/our-story"
          target="_blank"
          class="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-[#111111] shadow-sm hover:bg-gray-50 transition-colors shrink-0"
        >
          <svg class="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          Pratinjau Artikel
        </a>
      </div>

      <!-- Loading State -->
      <div
        v-if="loading"
        class="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center text-sm text-gray-400 shadow-sm"
      >
        <svg class="mx-auto mb-3 h-6 w-6 animate-spin text-[#c9a227]" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Memuat artikel...
      </div>

      <template v-else>
        <!-- Alerts -->
        <div
          v-if="saveSuccess"
          class="mb-4 flex items-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          <svg class="h-5 w-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Artikel Our Story berhasil diperbarui!
        </div>

        <div
          v-if="saveError"
          class="mb-4 flex items-center gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <svg class="h-5 w-5 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {{ saveError }}
        </div>

        <!-- Editor Form Card -->
        <div class="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden mb-8">
          <form @submit.prevent="handleSave">
            <div class="p-6 sm:p-8 space-y-6">
              <!-- Judul & Subtitle -->
              <div>
                <label class="mb-1 block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Eyebrow / Kategori Atas
                </label>
                <input
                  v-model="form.eyebrow"
                  type="text"
                  placeholder="Contoh: Cerita Fegance"
                  class="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/20"
                />
              </div>

              <div>
                <label class="mb-1 block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Judul Artikel
                </label>
                <input
                  v-model="form.title"
                  type="text"
                  placeholder="Contoh: Biar Wangi Aja Yang Bicara"
                  class="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#111111] font-bold focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/20"
                />
              </div>

              <div>
                <label class="mb-1 block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Sub-judul / Ringkasan Pembuka
                </label>
                <textarea
                  v-model="form.subtitle"
                  rows="2"
                  placeholder="Ringkasan singkat artikel..."
                  class="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/20"
                />
              </div>

              <!-- DYNAMIC ARTICLE BLOCKS SECTION -->
              <div class="pt-4 border-t border-gray-100">
                <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <h2 class="text-base font-bold text-[#111111]">Susunan Isi Artikel & Gambar</h2>
                    <p class="text-xs text-gray-500">
                      Bebas tambahkan teks paragraf atau gambar di mana saja (Atas, Tengah, atau Bawah).
                    </p>
                  </div>

                  <div class="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      @click="addParagraphBlock"
                      class="inline-flex items-center gap-1.5 rounded-xl bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-800 hover:bg-gray-200 transition-colors"
                    >
                      + Tambah Paragraf
                    </button>
                    <button
                      type="button"
                      @click="addImageBlock('middle')"
                      class="inline-flex items-center gap-1.5 rounded-xl bg-[#c9a227]/15 px-3 py-1.5 text-xs font-semibold text-[#c9a227] hover:bg-[#c9a227]/25 transition-colors"
                    >
                      🖼️ + Tambah Gambar
                    </button>
                  </div>
                </div>

                <!-- Empty State -->
                <div
                  v-if="!form.blocks || form.blocks.length === 0"
                  class="rounded-xl border border-dashed border-gray-300 p-8 text-center text-xs text-gray-400"
                >
                  Belum ada bagian cerita. Klik tombol di atas untuk menambah Paragraf atau Gambar.
                </div>

                <!-- List of Blocks -->
                <div class="space-y-4">
                  <div
                    v-for="(block, index) in form.blocks"
                    :key="block.id || index"
                    class="rounded-xl border border-gray-200 p-4 transition-all duration-150"
                    :class="block.type === 'image' ? 'bg-amber-50/40 border-amber-200' : 'bg-gray-50/50'"
                  >
                    <!-- Block Header Bar -->
                    <div class="flex items-center justify-between mb-3 pb-2 border-b border-gray-200/60">
                      <div class="flex items-center gap-2">
                        <span
                          class="rounded-lg px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider"
                          :class="block.type === 'image' ? 'bg-[#c9a227] text-white' : 'bg-gray-200 text-gray-700'"
                        >
                          {{ block.type === 'image' ? '🖼️ Gambar' : '📝 Paragraf ' + (index + 1) }}
                        </span>

                        <span v-if="block.type === 'image'" class="text-xs text-gray-500 italic">
                          (Posisi ke-{{ index + 1 }} dari {{ form.blocks.length }})
                        </span>
                      </div>

                      <!-- Control Actions -->
                      <div class="flex items-center gap-1">
                        <button
                          type="button"
                          :disabled="index === 0"
                          @click="moveUp(index)"
                          title="Pindahkan Ke Atas"
                          class="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 text-xs font-bold px-2 py-0.5 rounded hover:bg-gray-200"
                        >
                          ▲ Naik
                        </button>
                        <button
                          type="button"
                          :disabled="index === form.blocks.length - 1"
                          @click="moveDown(index)"
                          title="Pindahkan Ke Bawah"
                          class="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 text-xs font-bold px-2 py-0.5 rounded hover:bg-gray-200"
                        >
                          ▼ Turun
                        </button>
                        <button
                          type="button"
                          @click="removeBlock(index)"
                          class="p-1 text-red-500 hover:text-red-700 text-xs font-semibold px-2 py-0.5 rounded hover:bg-red-50 ml-1"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>

                    <!-- Block Body: PARAGRAPH -->
                    <div v-if="block.type === 'paragraph'">
                      <textarea
                        v-model="block.content"
                        rows="3"
                        placeholder="Tulis isi cerita paragraf di sini..."
                        class="w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/20"
                      />
                    </div>

                    <!-- Block Body: IMAGE -->
                    <div v-else class="space-y-3">
                      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div class="sm:col-span-2">
                          <label class="block text-xs font-semibold text-gray-600 mb-1">
                            URL Gambar
                          </label>
                          <input
                            v-model="block.content"
                            type="url"
                            placeholder="https://..."
                            class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label class="block text-xs font-semibold text-gray-600 mb-1">
                            Tag Posisi Gambar
                          </label>
                          <select
                            v-model="block.position"
                            class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none"
                          >
                            <option value="top">Di Atas (Header)</option>
                            <option value="middle">Di Tengah</option>
                            <option value="bottom">Di Bawah (Footer)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label class="block text-xs font-semibold text-gray-600 mb-1">
                          Caption / Keterangan Foto (Opsional)
                        </label>
                        <input
                          v-model="block.caption"
                          type="text"
                          placeholder="Keterangan singkat gambar..."
                          class="w-full rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-[#111111] focus:border-[#c9a227] focus:outline-none"
                        />
                      </div>

                      <!-- Preview image -->
                      <div v-if="block.content" class="aspect-[16/9] rounded-lg overflow-hidden bg-gray-200 max-h-48">
                        <img :src="block.content" alt="Image preview" class="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Action -->
            <div class="flex items-center justify-between border-t border-gray-100 bg-gray-50/60 px-6 py-4">
              <span class="text-xs text-gray-500 hidden sm:inline">
                Artikel dan susunan gambar akan disimpan secara otomatis di Firestore.
              </span>
              <button
                type="submit"
                :disabled="saving"
                class="inline-flex items-center gap-2 rounded-xl bg-[#c9a227] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#b8921f] disabled:opacity-60 disabled:cursor-not-allowed ml-auto"
              >
                <svg v-if="saving" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ saving ? "Menyimpan..." : "Simpan Artikel" }}
              </button>
            </div>
          </form>
        </div>
      </template>
    </div>
  </div>
</template>
