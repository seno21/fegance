<script setup lang="ts">
import { ref } from 'vue';

interface Pillar {
  title: string;
  description: string;
  icon: "sparkles" | "hourglass" | "shield";
}

const pillars: Pillar[] = [
  {
    title: "Masterfully Crafted",
    description:
      "Each fragrance is thoughtfully composed from carefully selected fragrance oils and refined through our own blending process.",
    icon: "sparkles",
  },
  {
    title: "Long-Lasting Performance",
    description:
      "Designed to deliver impressive projection and longevity, so your signature scent stays with you throughout the day.",
    icon: "hourglass",
  },
  {
    title: "Satisfaction Promises",
    description:
      "If your fragrance isn't the right match, we're here to help with exchanges or dedicated customer support.",
    icon: "shield",
  },
];
</script>

<template>
  <section class="py-[120px] bg-[#F8F8F8] overflow-hidden">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        class="text-center max-w-2xl mx-auto mb-14 flex flex-col items-center"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <span class="text-[11px] font-bold tracking-[0.22em] text-gold uppercase block mb-3">
          Why Choose Fegance
        </span>
        <h2 class="font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.1] text-[#111111] font-semibold mb-6">
          The Maison Standards
        </h2>
        <!-- Elegant gold divider -->
        <div class="w-12 h-[1px] bg-gold"></div>
      </div>

      <!-- Cards Layout -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch"
      >
        <div
          v-for="(pillar, i) in pillars"
          :key="pillar.title"
          class="bg-[#FFFFFF] border border-[#ECECEC] rounded-[24px] p-12 shadow-[0_1px_2px_rgba(17,17,17,0.04),0_4px_16px_rgba(17,17,17,0.04)] hover:shadow-[0_8px_30px_rgba(17,17,17,0.08),0_2px_8px_rgba(17,17,17,0.04)] hover:border-gold transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] group flex flex-col items-center text-center"
          data-aos="fade-up"
          :data-aos-delay="(i + 1) * 100"
          data-aos-duration="800"
        >
          <!-- Icon Circle Background -->
          <div
            class="w-14 h-14 rounded-full bg-[#faf7f2] flex items-center justify-center mb-8 transition-colors duration-300 group-hover:bg-gold"
          >
            <!-- Sparkles (Crown/Sparkle) -->
            <svg
              v-if="pillar.icon === 'sparkles'"
              class="w-6 h-6 text-gold transition-colors duration-300 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
              />
            </svg>
            <!-- Hourglass -->
            <svg
              v-else-if="pillar.icon === 'hourglass'"
              class="w-6 h-6 text-gold transition-colors duration-300 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <!-- Shield -->
            <svg
              v-else
              class="w-6 h-6 text-gold transition-colors duration-300 group-hover:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12c0 5.591-3.824 10.29-9 11.622C6.824 22.29 3 17.59 3 12V5l9-2 9 2v7z"
              />
            </svg>
          </div>
          <h3 class="font-display text-[32px] font-bold text-[#111111] mb-4">
            {{ pillar.title }}
          </h3>
          <p class="font-sans text-[17px] leading-[1.8] text-[#666666]">
            {{ pillar.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
