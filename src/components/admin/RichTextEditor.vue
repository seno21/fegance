<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

const props = defineProps<{
  modelValue?: string;
  placeholder?: string;
  minHeight?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const editorRef = ref<HTMLDivElement | null>(null);

function exec(command: string, value: string | undefined = undefined) {
  document.execCommand(command, false, value);
  onInput();
  if (editorRef.value) {
    editorRef.value.focus();
  }
}

function onInput() {
  if (!editorRef.value) return;
  const html = editorRef.value.innerHTML;
  // If only empty br or whitespace, emit empty
  if (html === "<br>" || html.trim() === "") {
    emit("update:modelValue", "");
  } else {
    emit("update:modelValue", html);
  }
}

watch(
  () => props.modelValue,
  (newVal) => {
    if (editorRef.value && editorRef.value.innerHTML !== (newVal || "")) {
      editorRef.value.innerHTML = newVal || "";
    }
  }
);

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue || "";
  }
});
</script>

<template>
  <div class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden focus-within:border-[#c9a227] focus-within:ring-1 focus-within:ring-[#c9a227]/30 transition-all">
    <!-- Formatting Toolbar -->
    <div class="flex flex-wrap items-center gap-1 p-2 bg-gray-50/80 border-b border-gray-100 text-ink text-xs select-none">
      <!-- Bold -->
      <button
        type="button"
        @click="exec('bold')"
        class="w-7 h-7 flex items-center justify-center rounded hover:bg-white hover:shadow-sm font-bold text-ink cursor-pointer"
        title="Tebal (Ctrl+B)"
      >
        B
      </button>

      <!-- Italic -->
      <button
        type="button"
        @click="exec('italic')"
        class="w-7 h-7 flex items-center justify-center rounded hover:bg-white hover:shadow-sm italic font-serif text-ink cursor-pointer"
        title="Miring (Ctrl+I)"
      >
        I
      </button>

      <!-- Underline -->
      <button
        type="button"
        @click="exec('underline')"
        class="w-7 h-7 flex items-center justify-center rounded hover:bg-white hover:shadow-sm underline text-ink cursor-pointer"
        title="Garis Bawah (Ctrl+U)"
      >
        U
      </button>

      <!-- Strikethrough -->
      <button
        type="button"
        @click="exec('strikeThrough')"
        class="w-7 h-7 flex items-center justify-center rounded hover:bg-white hover:shadow-sm line-through text-ink cursor-pointer"
        title="Coret"
      >
        S
      </button>

      <div class="w-px h-4 bg-gray-200 mx-1" />

      <!-- Headings -->
      <button
        type="button"
        @click="exec('formatBlock', '<h2>')"
        class="px-2 h-7 flex items-center justify-center rounded hover:bg-white hover:shadow-sm font-bold text-xs cursor-pointer"
        title="Subjudul Besar (H2)"
      >
        H2
      </button>
      <button
        type="button"
        @click="exec('formatBlock', '<h3>')"
        class="px-2 h-7 flex items-center justify-center rounded hover:bg-white hover:shadow-sm font-semibold text-xs cursor-pointer"
        title="Subjudul Sedang (H3)"
      >
        H3
      </button>
      <button
        type="button"
        @click="exec('formatBlock', '<p>')"
        class="px-2 h-7 flex items-center justify-center rounded hover:bg-white hover:shadow-sm text-xs cursor-pointer"
        title="Paragraf Biasa"
      >
        P
      </button>

      <div class="w-px h-4 bg-gray-200 mx-1" />

      <!-- Bullet list -->
      <button
        type="button"
        @click="exec('insertUnorderedList')"
        class="w-7 h-7 flex items-center justify-center rounded hover:bg-white hover:shadow-sm text-ink cursor-pointer"
        title="Daftar Poin"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </button>

      <!-- Numbered list -->
      <button
        type="button"
        @click="exec('insertOrderedList')"
        class="w-7 h-7 flex items-center justify-center rounded hover:bg-white hover:shadow-sm text-ink cursor-pointer"
        title="Daftar Nomor"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M4 7V4m0 0l-1 1m1-1v3m0 5c-.5 0-1 .5-1 1s1.5 1.5 1.5 2H3m1 4c.5 0 1-.3 1-.8s-.4-.7-.8-.7c.4 0 .8-.2.8-.7s-.5-.8-1-.8" />
        </svg>
      </button>

      <!-- Blockquote -->
      <button
        type="button"
        @click="exec('formatBlock', '<blockquote>')"
        class="w-7 h-7 flex items-center justify-center rounded hover:bg-white hover:shadow-sm text-ink cursor-pointer font-serif italic text-base leading-none"
        title="Kutipan / Quote"
      >
        “
      </button>

      <div class="w-px h-4 bg-gray-200 mx-1" />

      <!-- Clear Format -->
      <button
        type="button"
        @click="exec('removeFormat')"
        class="px-2 h-7 flex items-center justify-center rounded hover:bg-white hover:shadow-sm text-[10px] text-muted hover:text-red-600 cursor-pointer"
        title="Hapus Format"
      >
        Clear
      </button>
    </div>

    <!-- Editable Canvas Area -->
    <div
      ref="editorRef"
      contenteditable="true"
      @input="onInput"
      @blur="onInput"
      class="editor-content px-4 py-3 text-xs sm:text-sm text-ink focus:outline-none overflow-y-auto leading-relaxed"
      :style="{ minHeight: minHeight || '100px' }"
      :data-placeholder="placeholder || 'Tuliskan teks narasi…'"
    />
  </div>
</template>

<style scoped>
.editor-content:empty:before {
  content: attr(data-placeholder);
  color: #9ca3af;
  pointer-events: none;
  display: block;
}

.editor-content :deep(h2) {
  font-family: var(--font-playfair, serif);
  font-size: 1.25rem;
  font-weight: 700;
  color: #111111;
  margin-top: 0.75rem;
  margin-bottom: 0.25rem;
}

.editor-content :deep(h3) {
  font-family: var(--font-playfair, serif);
  font-size: 1.1rem;
  font-weight: 600;
  color: #111111;
  margin-top: 0.5rem;
  margin-bottom: 0.25rem;
}

.editor-content :deep(blockquote) {
  border-left: 3px solid #c9a227;
  padding-left: 0.75rem;
  margin: 0.5rem 0;
  font-style: italic;
  color: #4b5563;
}

.editor-content :deep(ul) {
  list-style-type: disc;
  padding-left: 1.25rem;
  margin: 0.5rem 0;
}

.editor-content :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.25rem;
  margin: 0.5rem 0;
}

.editor-content :deep(p) {
  margin-bottom: 0.5rem;
}
</style>
