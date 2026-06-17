<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const visible = ref(true)
const messages = [
  'Free shipping on orders above Rp 500.000',
  'New collection 2026 — discover the signature scents',
  'Complimentary sample with every order',
]
const index = ref(0)

let timer: ReturnType<typeof setInterval> | null = null

function rotate() {
  index.value = (index.value + 1) % messages.length
}

onMounted(() => {
  timer = setInterval(rotate, 4000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

function close() {
  visible.value = false
}
</script>

<template>
  <div
    v-if="visible"
    class="bg-ink text-canvas text-[11px] sm:text-xs tracking-[0.18em] uppercase"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-center relative">
      <Transition
        enter-active-class="transition-all duration-500 ease-out"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-300 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <p :key="index" class="text-center font-medium">
          {{ messages[index] }}
        </p>
      </Transition>
      <button
        @click="close"
        class="absolute right-3 sm:right-6 text-canvas/50 hover:text-gold transition-colors"
        aria-label="Dismiss announcement"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>
