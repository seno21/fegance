<script setup lang="ts">
import { useSiteContent } from "@/composables/useSiteContent";
import { useProducts } from "@/composables/useProducts";
import brandFace from "@/assets/landing/brand-face.jpeg";
import { useRouter } from "vue-router";

const router = useRouter();
const { content, loading: siteLoading } = useSiteContent();
const { products, loading: productsLoading } = useProducts();

function scrollToProducts() {
  document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
}

function scrollToStory() {
  document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
}

function formatPrice(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

const year = new Date().getFullYear();

const goToProducts = () => {
  router.push("/product");
};

const featured = () => {
  if (!products.value.length) return null;
  return products.value.find((p) => p.isBestseller) ?? products.value[0];
};
</script>

<template>
  <section
    class="relative pt-12 lg:pt-20 pb-16 lg:pb-28 overflow-hidden bg-canvas"
  >
    <!-- Background Anime Countryside Scenery -->
    <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        src="/images/anime/up.jpg"
        alt="Anime Japanese Countryside Scenery"
        class="w-full h-full object-cover object-center filter saturate-[1.15] brightness-[0.98] transition-transform duration-1000 transform hover:scale-105 opacity-60 sm:opacity-75"
      />
      <!-- Gradient Overlays for optimal readability -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/85 to-canvas/40 sm:to-transparent z-10"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas z-10"
      />
    </div>

    <!-- Subtle ambient background blur orb -->
    <div
      aria-hidden="true"
      class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-black/5 rounded-full blur-3xl pointer-events-none z-10"
    />

    <!-- Loading skeleton -->
    <div v-if="siteLoading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div class="lg:col-span-7 order-2 lg:order-1 space-y-6">
          <div class="h-12 w-3/4 bg-line rounded animate-pulse" />
          <div class="h-5 w-full bg-line rounded animate-pulse" />
          <div class="h-5 w-2/3 bg-line rounded animate-pulse" />
          <div class="flex gap-4 mt-4">
            <div class="h-12 w-40 bg-line rounded-pill animate-pulse" />
            <div class="h-12 w-36 bg-line rounded-pill animate-pulse" />
          </div>
        </div>
        <div class="lg:col-span-5 order-1 lg:order-2">
          <div class="aspect-[4/5] rounded-[28px] bg-line animate-pulse" />
        </div>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <!-- Copy -->
        <div
          class="lg:col-span-7 order-2 lg:order-1"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <h1
            class="font-display font-bold text-[48px] sm:text-6xl lg:text-[76px] xl:text-[84px] text-ink leading-[1.05] tracking-tight"
          >
            {{ content?.hero?.tagline ?? "Wangi Dulu" }}
            <span
              class="block text-ink/70 mt-2 font-display italic font-normal"
              >{{ content?.hero?.taglineAccent ?? "Sisanya Nanti" }}</span
            >
          </h1>

          <p
            class="mt-7 text-base sm:text-xl leading-relaxed text-muted max-w-xl font-sans"
          >
            {{
              content?.hero?.subtitle ??
              "Pilih aroma favorit kamu. Biar wangi aja yang bicara, gak perlu repot menjelaskan siapa dirimu."
            }}
          </p>

          <div class="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              @click="goToProducts"
              class="group inline-flex items-center justify-center gap-3 px-8 py-4 text-[13px] font-bold tracking-[0.18em] uppercase bg-ink text-white rounded-pill hover:bg-black/80 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lift"
            >
              {{
                content?.hero?.ctaPrimary &&
                content.hero.ctaPrimary !== "View Collection"
                  ? content.hero.ctaPrimary
                  : "Collection"
              }}
              <svg
                class="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
            <button
              @click="scrollToStory"
              class="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-[13px] font-bold tracking-[0.18em] uppercase bg-canvas text-ink border-2 border-ink rounded-pill hover:bg-ink hover:text-white transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {{ content?.hero?.ctaSecondary ?? "Our Story" }}
            </button>
          </div>
        </div>

        <!-- Visual -->
        <div
          class="lg:col-span-5 order-1 lg:order-2"
          data-aos="fade-left"
          data-aos-duration="900"
        >
          <div class="relative max-w-[340px] mx-auto lg:max-w-none">
            <!-- Decorative border accent -->
            <div
              class="absolute -inset-3 rounded-[32px] bg-gradient-to-tr from-black/10 via-black/5 to-transparent blur-xl opacity-70"
            ></div>

            <!-- Main image frame -->
            <div
              class="relative aspect-[3/4] rounded-[28px] overflow-hidden bg-surface shadow-lift border border-line/80 group"
            >
              <img
                :src="content?.hero?.imageUrl || brandFace"
                alt="Fegance signature perfume"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <!-- Subtle vignette -->
              <div
                aria-hidden="true"
                class="absolute inset-0"
                style="
                  background: linear-gradient(
                    180deg,
                    transparent 50%,
                    rgba(17, 17, 17, 0.65) 100%
                  );
                "
              />
              <!-- Bottom caption -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-canvas">
                <span
                  class="inline-block px-3 py-1 rounded-full bg-white text-ink text-[10px] font-bold tracking-[0.25em] uppercase mb-2"
                >
                  Signature Scent
                </span>
                <p
                  class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white"
                >
                  {{ featured()?.name }}
                </p>
              </div>
            </div>

            <!-- Floating card: best seller -->
            <div
              class="absolute -left-6 sm:-left-10 top-10 bg-canvas/90 backdrop-blur-md border border-line/80 rounded-2xl p-4 shadow-lift max-w-[210px] hidden sm:block transform -rotate-1 hover:rotate-0 transition-transform duration-300"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-xl bg-ink/10 flex items-center justify-center shrink-0"
                >
                  <svg
                    class="w-5 h-5 text-ink"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    class="text-[10px] font-bold tracking-widest uppercase text-muted"
                  >
                    Best Seller
                  </p>
                  <p
                    class="font-display text-base font-bold text-ink leading-tight mt-0.5"
                  >
                    {{ featured()?.name }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Floating card: price -->
            <div
              v-if="featured()"
              class="absolute -right-4 sm:-right-8 bottom-12 bg-ink text-canvas border border-white/10 rounded-2xl p-4 shadow-lift hidden sm:block transform rotate-1 hover:rotate-0 transition-transform duration-300"
              data-aos="fade-left"
              data-aos-delay="500"
            >
              <p
                class="text-[10px] font-bold tracking-widest uppercase text-canvas/60"
              >
                Starting From
              </p>
              <p class="font-display text-xl font-bold text-white mt-0.5">
                {{ formatPrice(featured()!.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div
        class="hidden lg:flex justify-center mt-20"
        data-aos="fade-up"
        data-aos-delay="600"
      >
        <div class="flex flex-col items-center gap-2 text-faint">
          <span
            class="text-[10px] font-bold tracking-[0.3em] uppercase text-ink"
            >Scroll</span
          >
          <div class="w-px h-12 bg-gradient-to-b from-ink/80 to-transparent" />
        </div>
      </div>
    </div>
  </section>
</template>
