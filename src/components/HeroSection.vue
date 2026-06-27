<script setup lang="ts">
import {
  products,
  testimonials,
  type Product,
  type Testimonial,
} from "@/data/products";

const featured = (products.find((p) => p.isBestseller) ??
  products[0]) as Product;

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

import brandFace from "@/assets/landing/brand-face.jpg";
</script>

<template>
  <section class="relative pt-28 lg:pt-36 pb-16 lg:pb-24 overflow-hidden">
    <!-- Decorative background -->
    <div aria-hidden="true" class="absolute inset-0 -z-10">
      <div class="absolute inset-0 bg-cream" />
      <div
        class="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40"
        style="
          background: radial-gradient(
            circle,
            rgba(201, 162, 39, 0.1) 0%,
            transparent 70%
          );
        "
      />
      <div
        class="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30"
        style="
          background: radial-gradient(
            circle,
            rgba(201, 162, 39, 0.08) 0%,
            transparent 70%
          );
        "
      />
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <!-- Copy -->
        <div
          class="lg:col-span-7 order-2 lg:order-1"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          <div
            class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-pill bg-canvas border border-line mb-7"
          >
            <span class="dot-gold" />
            <span
              class="text-[10px] font-semibold tracking-[0.22em] uppercase text-muted"
            >
              New Collection

              <span
                class="text-[10px] font-semibold tracking-[0.22em] uppercase text-muted"
              >
                {{ year }}
              </span>
            </span>
          </div>

          <h1
            class="h-display text-[44px] sm:text-6xl lg:text-[72px] xl:text-[80px] text-ink"
          >
            Luxury in
            <span class="block italic font-medium text-gold">every drop.</span>
          </h1>

          <p
            class="mt-7 text-base sm:text-lg leading-relaxed text-muted max-w-xl"
          >
            Discover premium fragrances crafted to define your identity. Each
            bottle is a quiet ritual — a signature left in the air long after
            you have left the room.
          </p>

          <div class="mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              @click="scrollToProducts"
              class="group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[12px] font-semibold tracking-[0.18em] uppercase bg-ink text-gold rounded-pill hover:bg-gold hover:text-ink transition-all duration-300"
            >
              View Collection
              <svg
                class="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
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
            </button>
            <button
              @click="scrollToStory"
              class="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[12px] font-semibold tracking-[0.18em] uppercase bg-transparent text-ink border border-ink/15 rounded-pill hover:border-gold hover:text-gold transition-all duration-300"
            >
              Our Story
            </button>
          </div>
        </div>

        <!-- Visual -->
        <div
          class="lg:col-span-5 order-1 lg:order-2"
          data-aos="fade-left"
          data-aos-duration="900"
        >
          <div class="relative max-w-md mx-auto lg:max-w-none">
            <!-- Main image frame -->
            <div
              class="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-surface shadow-lift"
            >
              <img
                :src="brandFace"
                alt="Fegance signature perfume"
                class="w-full h-full object-cover"
              />
              <!-- Subtle vignette -->
              <div
                aria-hidden="true"
                class="absolute inset-0"
                style="
                  background: linear-gradient(
                    180deg,
                    transparent 60%,
                    rgba(17, 17, 17, 0.35) 100%
                  );
                "
              />
              <!-- Bottom caption -->
              <div class="absolute bottom-0 left-0 right-0 p-6 text-canvas">
                <p class="text-[10px] tracking-[0.25em] uppercase opacity-80">
                  Signature Scent
                </p>
                <p class="mt-1 font-display text-2xl">{{ featured.name }}</p>
              </div>
            </div>

            <!-- Floating card: best seller -->
            <div
              class="absolute -left-4 sm:-left-8 top-8 bg-canvas rounded-2xl p-4 shadow-lift max-w-[200px] hidden sm:block"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <div class="flex items-center gap-2.5">
                <div
                  class="w-10 h-10 rounded-full bg-cream flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <div>
                  <p class="text-[10px] tracking-wider uppercase text-faint">
                    Best Seller
                  </p>
                  <p class="font-display text-sm text-ink leading-tight">
                    {{ featured.name }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Floating card: price -->
            <div
              class="absolute -right-3 sm:-right-6 bottom-12 bg-ink text-canvas rounded-2xl p-4 shadow-lift hidden sm:block"
              data-aos="fade-left"
              data-aos-delay="500"
            >
              <p class="text-[10px] tracking-wider uppercase text-canvas/60">
                From
              </p>
              <p class="font-display text-xl text-gold">
                {{ formatPrice(featured.price) }}
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
          <span class="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div
            class="w-px h-12 bg-gradient-to-b from-faint/60 to-transparent"
          />
        </div>
      </div>
    </div>
  </section>
</template>
