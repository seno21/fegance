<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useSiteContent } from "@/composables/useSiteContent";

const { content, loading } = useSiteContent();
const visible = ref(true);
const index = ref(0);

let timer: ReturnType<typeof setInterval> | null = null;

const messages = ref<string[]>([]);

watch(
  () => content.value?.announcement,
  (announcement) => {
    if (announcement) {
      messages.value = announcement.messages;
      if (announcement.enabled && messages.value.length > 0) {
        stop();
        start();
      } else {
        visible.value = false;
      }
    }
  },
  { immediate: true }
);

function start() {
  if (!messages.value.length) return;
  timer = setInterval(rotate, 4000);
}

function stop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function rotate() {
  index.value = (index.value + 1) % messages.value.length;
}

onMounted(() => {
  if (content.value?.announcement?.enabled && messages.value.length > 0) {
    start();
  }
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

function close() {
  visible.value = false;
}
</script>

<template>
  <div
    v-if="visible && content?.announcement?.enabled !== false && messages.length > 0"
    class="bg-ink text-canvas text-[11px] sm:text-xs tracking-[0.18em] uppercase"
  >
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-center relative"
    >
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <p :key="index" class="text-center font-medium px-8">
          {{ messages[index] }}
        </p>
      </Transition>
      <button
        @click="close"
        class="absolute right-3 sm:right-6 text-canvas/50 hover:text-gold transition-colors"
        aria-label="Dismiss announcement"
      >
        <svg
          class="w-3.5 h-3.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
