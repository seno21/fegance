<script setup lang="ts">
import { computed } from "vue";
import { useOurStory } from "@/composables/useOurStory";
import AnnouncementBar from "@/components/AnnouncementBar.vue";
import Navbar from "@/components/Navbar.vue";
import FooterSection from "@/components/FooterSection.vue";

const { story, loading } = useOurStory();

// Find the index of the first paragraph block to add initial drop accent
const firstParagraphIndex = computed(() => {
  if (!story.value?.blocks) return -1;
  return story.value.blocks.findIndex((b) => b.type === "paragraph");
});
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-canvas text-ink overflow-x-hidden w-full max-w-full"
  >
    <AnnouncementBar />
    <Navbar />

    <main class="flex-1 py-12 sm:py-16 lg:py-20">
      <!-- SKELETON LOADING -->
      <div
        v-if="loading"
        class="max-w-3xl mx-auto px-4 sm:px-6 space-y-6 animate-pulse"
      >
        <div class="h-4 w-24 bg-surface rounded" />
        <div class="h-10 w-3/4 bg-surface rounded" />
        <div class="h-6 w-full bg-surface rounded" />
        <div class="h-96 w-full bg-surface rounded-2xl" />
        <div class="space-y-3 pt-4">
          <div class="h-4 w-full bg-surface rounded" />
          <div class="h-4 w-full bg-surface rounded" />
          <div class="h-4 w-2/3 bg-surface rounded" />
        </div>
      </div>

      <!-- ARTICLE CONTENT -->
      <article v-else class="max-w-3xl mx-auto px-4 sm:px-6">
        <!-- HEADER SECTION -->
        <header class="text-center space-y-4 mb-10">
          <span
            class="inline-block text-xs font-bold uppercase tracking-[0.25em] text-ink"
          >
            {{ story.eyebrow || "Cerita Fegance" }}
          </span>

          <h1
            class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight"
          >
            {{ story.title }}
          </h1>

          <p
            v-if="story.subtitle"
            class="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl mx-auto pt-1 font-light"
          >
            {{ story.subtitle }}
          </p>

          <div
            class="flex items-center justify-center gap-2 pt-2 text-xs text-muted"
          >
            <span
              >Oleh
              <strong class="text-ink font-semibold"
                >Maison Fegance</strong
              ></span
            >
            <span>&middot;</span>
            <span>Cirebon, Indonesia</span>
          </div>

          <div class="gold-rule mx-auto mt-6" />
        </header>

        <!-- ARTICLE BODY BLOCKS (Dynamic Paragraphs & Custom Placed Images) -->
        <div
          class="space-y-6 text-base sm:text-lg leading-relaxed text-ink-soft"
        >
          <template
            v-for="(block, index) in story.blocks"
            :key="block.id || index"
          >
            <!-- PARAGRAPH BLOCK -->
            <div
              v-if="block.type === 'paragraph'"
              :class="
                index === firstParagraphIndex
                  ? 'relative pl-5 border-l-2 border-ink text-ink font-medium leading-relaxed'
                  : ''
              "
              class="story-html-content"
              v-html="block.content"
            />

            <!-- IMAGE BLOCK (Rendered wherever placed: Top, Middle, Bottom) -->
            <div
              v-else-if="block.type === 'image' && block.content"
              class="my-8"
            >
              <div
                class="aspect-[16/9] rounded-2xl overflow-hidden bg-surface shadow-soft border border-line/60"
              >
                <img
                  :src="block.content"
                  :alt="block.caption || story.title"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <p
                v-if="block.caption"
                class="text-center text-xs text-muted mt-2.5 italic"
              >
                {{ block.caption }}
              </p>
            </div>
          </template>
        </div>

        <!-- ARTICLE SIGNOFF & CTA -->
        <footer
          class="mt-14 pt-8 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p class="font-display text-lg font-bold text-ink">
              Maison Fegance
            </p>
            <p class="text-xs text-muted">Wangi Dulu, Sisanya Nanti</p>
          </div>

          <router-link
            to="/product"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-ink text-canvas hover:bg-neutral-800 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-soft"
          >
            Collection
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </router-link>
        </footer>
      </article>
    </main>

    <FooterSection />
  </div>
</template>

<style scoped>
.story-html-content :deep(h2) {
  font-family: var(--font-playfair, serif);
  font-size: 1.5rem;
  font-weight: 700;
  color: #111111;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.story-html-content :deep(h3) {
  font-family: var(--font-playfair, serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: #111111;
  margin-top: 1.25rem;
  margin-bottom: 0.5rem;
}

.story-html-content :deep(blockquote) {
  border-left: 3px solid #c9a227;
  padding-left: 1rem;
  margin: 1.25rem 0;
  font-style: italic;
  color: #4b5563;
}

.story-html-content :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.story-html-content :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin: 1rem 0;
}

.story-html-content :deep(p) {
  margin-bottom: 1rem;
}
</style>
