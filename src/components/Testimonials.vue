<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { testimonials, type Testimonial } from "@/data/products";

const current = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

function start() {
  timer = setInterval(() => {
    current.value = (current.value + 1) % testimonials.length;
  }, 5000);
}

function stop() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function goTo(index: number) {
  current.value = index;
  stop();
  start();
}

function prev() {
  current.value =
    (current.value - 1 + testimonials.length) % testimonials.length;
  stop();
  start();
}

function next() {
  current.value = (current.value + 1) % testimonials.length;
  stop();
  start();
}

const currentItem = computed<Testimonial>(() => testimonials[current.value]!);

onMounted(() => start());
onUnmounted(() => stop());
</script>

<template>
  <section class="section bg-canvas relative overflow-hidden">
    <!-- Decorative quote -->
    <div
      aria-hidden="true"
      class="absolute top-12 left-1/2 -translate-x-1/2 opacity-[0.04] pointer-events-none"
    >
      <svg class="w-64 h-64 text-ink" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M11 7H7.5C6.12 7 5 8.12 5 9.5V11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1V9.5c0-.28.22-.5.5-.5H11c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1zm0 4H7.5c-.28 0-.5.22-.5.5v3c0 1.93 1.57 3.5 3.5 3.5h.5c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1zm8-4h-3.5C14.12 7 13 8.12 13 9.5V11c0 .55.45 1 1 1h2c.55 0 1-.45 1-1V9.5c0-.28.22-.5.5-.5H19c.55 0 1-.45 1-1V8c0-.55-.45-1-1-1zm0 4h-3.5c-.28 0-.5.22-.5.5v3c0 1.93 1.57 3.5 3.5 3.5h.5c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1z"
        />
      </svg>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <!-- Header -->
      <div
        class="text-center max-w-2xl mx-auto mb-14"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <p class="eyebrow mb-3">Voices</p>
        <h2 class="h-display text-3xl sm:text-4xl lg:text-5xl text-ink">
          What our community says.
        </h2>
        <span class="gold-rule mt-5 mx-auto" />
      </div>

      <!-- Carousel -->
      <div class="max-w-3xl mx-auto" data-aos="fade-up" data-aos-duration="800">
        <div
          class="relative bg-canvas border border-line rounded-3xl px-6 sm:px-12 py-10 sm:py-14 shadow-soft"
        >
          <!-- Stars -->
          <div class="flex justify-center gap-1 mb-6">
            <svg
              v-for="star in 5"
              :key="star"
              class="w-4 h-4 text-gold"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>

          <Transition
            mode="out-in"
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 translate-y-3"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div :key="currentItem.id" class="text-center">
              <p
                class="font-display text-lg sm:text-2xl lg:text-[26px] leading-relaxed text-ink"
              >
                &ldquo;{{ currentItem.text }}&rdquo;
              </p>

              <div class="mt-8 flex flex-col items-center gap-3">
                <div>
                  <p class="font-display text-base text-ink">
                    {{ currentItem.name }}
                  </p>
                  <p
                    class="text-[11px] tracking-wider uppercase text-faint mt-0.5"
                  >
                    {{ currentItem.role }}
                  </p>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Controls -->
        <div class="mt-8 flex items-center justify-center gap-6">
          <button
            @click="prev"
            class="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink hover:border-ink hover:bg-ink hover:text-canvas transition-all"
            aria-label="Previous testimonial"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div class="flex items-center gap-2">
            <button
              v-for="(item, index) in testimonials"
              :key="item.id"
              @click="goTo(index)"
              class="h-1.5 rounded-full transition-all duration-300"
              :class="
                index === current
                  ? 'bg-gold w-8'
                  : 'bg-line w-1.5 hover:bg-ink/30'
              "
              :aria-label="`Go to testimonial ${index + 1}`"
            />
          </div>

          <button
            @click="next"
            class="w-10 h-10 rounded-full border border-line flex items-center justify-center text-ink hover:border-ink hover:bg-ink hover:text-canvas transition-all"
            aria-label="Next testimonial"
          >
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
