<script setup lang="ts">
const stats = [
  { value: "Every Bottle", label: "Handcrafted" },
  { value: "Signature Scents", label: "Inspired of" },
  { value: "INDONESIA", label: "Made In" },
];
import filosofi from "@/assets/landing/filosofi-aksen2.jpg";
import filosofiAksen3 from "@/assets/landing/filosofi-aksen3.jpeg";
import filosofiAksen2 from "@/assets/landing/filosofi.jpeg";
</script>

<template>
  <section id="story" class="section bg-canvas">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <!-- Image collage -->
        <div
          class="lg:col-span-6"
          data-aos="fade-right"
          data-aos-duration="800"
        >
          <div class="relative grid grid-cols-12 gap-3 sm:gap-4">
            <!-- Main image -->
            <div
              class="col-span-8 aspect-[3/4] rounded-2xl overflow-hidden bg-surface"
            >
              <img
                :src="filosofi"
                alt="Fegance atelier"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <!-- Secondary image -->
            <div class="col-span-4 flex flex-col gap-3 sm:gap-4">
              <div class="aspect-square rounded-2xl overflow-hidden bg-surface">
                <img
                  :src="filosofiAksen3"
                  alt="Crafting process"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div
                class="aspect-[3/4] rounded-2xl overflow-hidden bg-surface relative"
              >
                <img
                  :src="filosofiAksen2"
                  alt="Signature bottle"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  class="absolute inset-0"
                  style="
                    background: linear-gradient(
                      180deg,
                      transparent 50%,
                      rgba(17, 17, 17, 0.5) 100%
                    );
                  "
                />
                <div class="absolute bottom-3 left-3 right-3 text-canvas">
                  <p class="font-display text-base leading-tight">Since 2025</p>
                  <p
                    class="text-[10px] tracking-wider uppercase opacity-80 mt-0.5"
                  >
                    Cirebon
                  </p>
                </div>
              </div>
            </div>
            <!-- Floating badge -->
            <div
              class="absolute -bottom-6 -left-2 sm:-left-6 bg-canvas border border-line shadow-lift rounded-2xl px-5 py-4 hidden md:flex items-center gap-3"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div
                class="w-10 h-10 rounded-full bg-cream flex items-center justify-center"
              >
                <svg
                  class="w-5 h-5 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="1.6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p class="font-display text-lg text-ink leading-none">
                  5 Years
                </p>
                <p class="text-[10px] tracking-wider uppercase text-faint mt-1">
                  of Craftsmanship
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Copy -->
        <div
          class="lg:col-span-6 lg:pl-8"
          data-aos="fade-left"
          data-aos-duration="800"
        >
          <p class="eyebrow mb-4">Our Philosophy</p>
          <h2 class="h-display text-3xl sm:text-4xl lg:text-5xl text-ink">
            A fragrance is a memory,
            <span class="block italic font-medium text-gold"
              >captured in liquid form.</span
            >
          </h2>
          <span class="gold-rule mt-6" />

          <div
            class="mt-8 space-y-5 text-sm sm:text-base leading-relaxed text-ink-soft"
          >
            <p>
              Founded in 2025, Fegance was born from a passion for the art of
              perfumery. We believe a scent is more than fragrance — it is
              identity, mood, and memory distilled into something you wear.
            </p>
            <p>
              Every bottle is crafted using the finest ingredients sourced from
              twelve countries — from the lavender fields of Provence to the oud
              forests of Southeast Asia. We travel the globe so you can carry a
              piece of it home.
            </p>
          </div>

          <!-- Stats -->
          <dl
            class="mt-10 grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-line"
          >
            <div v-for="stat in stats" :key="stat.label">
              <dt class="text-[10px] tracking-[0.2em] uppercase text-faint">
                {{ stat.label }}
              </dt>
              <dd class="mt-1.5 font-display text-xl sm:text-xl text-ink">
                {{ stat.value }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>
