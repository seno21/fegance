<script setup lang="ts">
interface Pillar {
  title: string;
  description: string;
  icon: "leaf" | "truck" | "sparkles" | "shield";
}

const pillars: Pillar[] = [
  {
    title: "Masterfully Crafted",
    description:
      "Every fragrance is developed by our perfumers—from concept to final blend—ensuring every bottle carries its own identity.",
    icon: "sparkles",
  },
  {
    title: "Long-Lasting Performance",
    description:
      "Designed to deliver impressive projection and longevity, so your signature scent stays with you throughout the day.",
    icon: "leaf",
  },
  {
    title: "Premium Packaging",
    description:
      "Every order is carefully prepared and securely packaged for a refined unboxing experience.",
    icon: "truck",
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
  <section class="section bg-surface">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div
        class="text-center max-w-2xl mx-auto mb-14"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <p class="eyebrow mb-3">Why Fegance</p>
        <h2 class="h-display text-3xl sm:text-4xl lg:text-5xl text-ink">
          The quiet details that make
          <span class="italic font-medium text-gold">all the difference.</span>
        </h2>
      </div>

      <!-- Pillars -->
      <div
        class="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden border border-line"
      >
        <div
          v-for="(pillar, i) in pillars"
          :key="pillar.title"
          class="bg-canvas p-7 lg:p-9 transition-colors duration-300 hover:bg-cream group"
          data-aos="fade-up"
          :data-aos-delay="i * 100"
          data-aos-duration="800"
        >
          <div
            class="w-12 h-12 rounded-2xl bg-cream flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-gold/15"
          >
            <!-- Sparkles -->
            <svg
              v-if="pillar.icon === 'sparkles'"
              class="w-5 h-5 text-gold"
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
            <!-- Leaf -->
            <svg
              v-else-if="pillar.icon === 'leaf'"
              class="w-5 h-5 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
              />
            </svg>
            <!-- Truck -->
            <svg
              v-else-if="pillar.icon === 'truck'"
              class="w-5 h-5 text-gold"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            <!-- Shield -->
            <svg
              v-else
              class="w-5 h-5 text-gold"
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
          <h3 class="font-display text-xl text-ink mb-2.5">
            {{ pillar.title }}
          </h3>
          <p class="text-sm leading-relaxed text-muted">
            {{ pillar.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
