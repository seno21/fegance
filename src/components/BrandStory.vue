<script setup lang="ts">
import { useSiteContent } from "@/composables/useSiteContent";
import filosofi from "@/assets/landing/filosofi-aksen2.jpg";
import filosofiAksen3 from "@/assets/landing/filosofi-aksen3.jpeg";
import filosofiAksen2 from "@/assets/landing/filosofi.jpeg";

const { content, loading } = useSiteContent();

const defaultStats = [
  { value: "Every Bottle", label: "Handcrafted" },
  { value: "Signature Scents", label: "Inspired of" },
  { value: "INDONESIA", label: "Made In" },
];
</script>

<template>
  <section id="story" class="section bg-canvas">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading skeleton -->
      <div v-if="loading" class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div class="lg:col-span-6 space-y-4">
          <div class="aspect-[3/4] rounded-2xl bg-surface animate-pulse" />
        </div>
        <div class="lg:col-span-6 space-y-4">
          <div class="h-4 w-20 bg-line rounded animate-pulse" />
          <div class="h-10 w-3/4 bg-line rounded animate-pulse" />
          <div class="h-12 w-2/3 bg-line rounded animate-pulse" />
          <div class="space-y-3 mt-6">
            <div class="h-4 w-full bg-line rounded animate-pulse" />
            <div class="h-4 w-full bg-line rounded animate-pulse" />
            <div class="h-4 w-3/4 bg-line rounded animate-pulse" />
          </div>
          <div class="grid grid-cols-3 gap-4 mt-8">
            <div v-for="n in 3" :key="n" class="space-y-2">
              <div class="h-3 w-16 bg-line rounded animate-pulse" />
              <div class="h-5 w-20 bg-line rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div v-else class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
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
                :src="content?.brandStory?.images?.main || filosofi"
                alt="Fegance atelier"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <!-- Secondary image -->
            <div class="col-span-4 flex flex-col gap-3 sm:gap-4">
              <div class="aspect-square rounded-2xl overflow-hidden bg-surface">
                <img
                  :src="content?.brandStory?.images?.secondary || filosofiAksen3"
                  alt="Crafting process"
                  class="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div
                class="aspect-[3/4] rounded-2xl overflow-hidden bg-surface relative"
              >
                <img
                  :src="content?.brandStory?.images?.accent || filosofiAksen2"
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
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
                  />
                </svg>
              </div>
              <div>
                <p class="font-display text-lg text-ink leading-none">
                  In-House
                </p>
                <p class="text-[10px] tracking-wider uppercase text-faint mt-1">
                  Crafted
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
          <p class="eyebrow mb-4">{{ content?.brandStory?.eyebrow ?? "Our Philosophy" }}</p>
          <h2 class="h-display text-3xl sm:text-4xl lg:text-5xl text-ink">
            {{ content?.brandStory?.title ?? "Let Us Tell You a Little" }}
            <span class="block italic font-medium text-gold"
              >{{ content?.brandStory?.titleAccent ?? "About Who We Are" }}</span
            >
          </h2>
          <span class="gold-rule mt-6" />

          <div
            class="mt-8 space-y-5 text-sm sm:text-base leading-relaxed text-ink-soft"
          >
            <p v-for="(paragraph, i) in (content?.brandStory?.paragraphs ?? [
              'Fegance lahir dari rasa penasaran terhadap dunia parfum. Bagi kami, parfum adalah sebuah karya seni. Ia merupakan bagian dari keindahan—meski ia tak memiliki rupa, namun hidup lama di ingatan. Ia bagian dari identitas seseorang, menentukan bagaimana orang menilaimu pertama kali.',
              'Layaknya sebuah brand yang terus bertumbuh, Fegance berkomitmen untuk selalu berkembang. Kami terus menyempurnakan setiap komposisi, memilih formulasi terbaik, serta menggunakan bahan-bahan premium agar setiap aroma yang kami hadirkan memiliki kualitas yang layak dikenang.',
              'Di balik setiap judul parfum yang kami ciptakan, selalu ada sebuah cerita. Kami percaya bahwa sebuah parfum adalah medium untuk menyampaikan karakter. Kami ingin setiap parfum Fegance menjadi bagian dari keseharianmu, dan menceritakan identitasmu—tanpa perlu banyak kata.',
            ])" :key="i">
              {{ paragraph }}
            </p>
          </div>

          <!-- Stats -->
          <dl
            class="mt-10 grid grid-cols-3 gap-4 sm:gap-8 pt-8 border-t border-line"
          >
            <div v-for="stat in (content?.brandStory?.stats ?? defaultStats)" :key="stat.label">
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
