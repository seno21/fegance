<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar.vue";
import AnnouncementBar from "@/components/AnnouncementBar.vue";
import FooterSection from "@/components/FooterSection.vue";
import logoShopee from "@/assets/logo-shopee.png";

const route = useRoute();
const router = useRouter();

type Tab = "description" | "notes" | "performance";
const activeTab = ref<Tab>("description");

const product = computed(() =>
  products.find((p) => p.slug === route.params.slug),
);

if (!product.value) {
  router.replace("/");
}

const otherProducts = computed(() =>
  products.filter((p) => p.slug !== route.params.slug).slice(0, 4),
);

const tabs: { id: Tab; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "notes", label: "Fragrance Notes" },
  { id: "performance", label: "Product Performance" },
];

function goToDetail(slug: string) {
  activeTab.value = "description";
  router.push({ name: "product-detail", params: { slug } });
}

function formatPrice(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

// Reset tab when navigating between products
watch(
  () => route.params.slug,
  () => {
    activeTab.value = "description";
  },
);

// --- Main image hover zoom ---
const mainZoomPos = ref({ x: 50, y: 50 });
const isMainZoomed = ref(false);

function handleMainZoomMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  mainZoomPos.value = {
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100,
  };
}

// --- Lightbox ---
const showLightbox = ref(false);
const isZoomed = ref(false);
const zoomPos = ref({ x: 50, y: 50 });

function openLightbox() {
  showLightbox.value = true;
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  showLightbox.value = false;
  isZoomed.value = false;
  document.body.style.overflow = "";
}

function handleZoomMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  zoomPos.value = {
    x: ((e.clientX - rect.left) / rect.width) * 100,
    y: ((e.clientY - rect.top) / rect.height) * 100,
  };
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") closeLightbox();
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  document.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <div v-if="product">
    <AnnouncementBar />
    <Navbar />

    <main class="pt-6 lg:pt-10 pb-20 lg:pb-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb / back -->
        <button
          @click="router.push('/product')"
          class="inline-flex items-center gap-2 text-sm text-muted hover:text-gold transition-colors mb-10 group"
        >
          <svg
            class="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="1.6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Collection
        </button>

        <!-- Top: image + info -->
        <div class="grid lg:grid-cols-2 gap-10 lg:gap-20">
          <!-- Image -->
          <div
            class="lg:sticky lg:top-32 lg:self-start"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            <div
              class="relative aspect-square sm:aspect-[4/5] rounded-3xl overflow-hidden bg-surface shadow-soft cursor-crosshair"
              @click="openLightbox"
              @mousemove="handleMainZoomMove"
              @mouseenter="isMainZoomed = true"
              @mouseleave="isMainZoomed = false"
            >
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-75 select-none"
                :class="{ 'scale-[2.5]': isMainZoomed }"
                :style="{
                  transformOrigin: `${mainZoomPos.x}% ${mainZoomPos.y}%`,
                }"
                draggable="false"
              />
              <div
                class="absolute inset-0 bg-black/0 hover:bg-black/5 transition-colors duration-300"
              />
              <div
                v-if="product.isBestseller || product.isNew"
                class="absolute top-5 left-5 flex flex-col gap-2"
              >
                <span
                  v-if="product.isBestseller"
                  class="px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase rounded-pill bg-gold text-ink"
                >
                  Best Seller
                </span>
                <span
                  v-if="product.isNew"
                  class="px-3 py-1.5 text-[10px] font-semibold tracking-[0.2em] uppercase rounded-pill bg-ink text-canvas"
                >
                  New
                </span>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div data-aos="fade-left" data-aos-duration="800">
            <p class="eyebrow mb-3">{{ product.category }}</p>
            <h1 class="h-display text-4xl sm:text-5xl lg:text-6xl text-ink">
              {{ product.name }}
            </h1>
            <span class="gold-rule mt-5" />

            <div class="mt-7 flex flex-wrap items-center gap-2.5">
              <span
                class="px-3 py-1.5 text-xs rounded-pill bg-cream text-ink border border-line"
              >
                {{ product.size }}
              </span>
              <span
                class="px-3 py-1.5 text-xs rounded-pill bg-cream text-ink border border-line"
              >
                {{
                  product.family.charAt(0).toUpperCase() +
                  product.family.slice(1)
                }}
              </span>
              <span
                class="px-3 py-1.5 text-xs rounded-pill bg-cream text-ink border border-line"
              >
                EDP
              </span>
            </div>

            <p class="mt-7 font-display text-3xl sm:text-4xl text-gold">
              {{ formatPrice(product.price) }}
            </p>

            <p class="mt-6 text-base leading-relaxed text-ink-soft max-w-prose">
              {{ product.description }}
            </p>

            <!-- CTAs -->
            <div class="mt-9 flex flex-col sm:flex-row gap-2.5">
              <a
                :href="product.shopeeLink"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-brand btn-shopee flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase rounded-pill transition-all duration-200 group"
              >
                <img
                  :src="logoShopee"
                  alt="Shopee"
                  class="w-4.5 h-4.5 shrink-0 object-contain filter group-hover:brightness-0 group-hover:invert transition-all duration-200"
                />
                Shopee
              </a>
              <a
                :href="product.tiktokLink"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-brand btn-tiktok flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase rounded-pill transition-all duration-200 hover:text-white"
              >
                <svg
                  class="w-4 h-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                  />
                </svg>
                TikTok Shop
              </a>
              <a
                :href="product.whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-brand btn-whatsapp flex-1 inline-flex items-center justify-center gap-2.5 px-5 py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase rounded-pill transition-all duration-200"
              >
                <svg
                  class="w-4 h-4 shrink-0"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
                  />
                  <path
                    d="M12 0C5.373 0 0 5.373 0 12c0 2.125.554 4.12 1.523 5.85L.053 23.334l5.665-1.46C7.263 22.564 9.546 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.858 0-3.654-.506-5.2-1.462l-.373-.224-3.36.866.898-3.278-.243-.389C2.575 16.17 2 14.139 2 12 2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"
                  />
                </svg>
                WhatsApp
              </a>
            </div>

            <p class="mt-4 text-xs text-faint text-center sm:text-left">
              Secure checkout &middot; Free shipping above Rp 500.000 &middot;
              30-day returns
            </p>

            <!-- Tabs -->
            <div class="mt-12 border-b border-line">
              <div class="flex gap-8 overflow-x-auto -mb-px">
                <button
                  v-for="tab in tabs"
                  :key="tab.id"
                  @click="activeTab = tab.id"
                  class="pb-3.5 text-sm font-medium tracking-wide whitespace-nowrap transition-colors relative"
                  :class="
                    activeTab === tab.id
                      ? 'text-ink'
                      : 'text-faint hover:text-ink'
                  "
                >
                  {{ tab.label }}
                  <span
                    v-if="activeTab === tab.id"
                    class="absolute -bottom-px left-0 right-0 h-0.5 bg-gold"
                  />
                </button>
              </div>
            </div>

            <div class="py-8 min-h-[180px]">
              <!-- Description -->
              <div
                v-if="activeTab === 'description'"
                class="space-y-4 text-sm sm:text-base text-ink-soft leading-relaxed max-w-prose"
              >
                <p>{{ product.description }}</p>
                <p>
                  Experience the balance of craftsmanship and luxury. Each
                  bottle is meticulously designed to reflect the elegance of the
                  fragrance within &mdash; a vessel worthy of the story it
                  carries.
                </p>
              </div>

              <!-- Notes -->
              <div v-if="activeTab === 'notes'" class="space-y-7">
                <div
                  v-for="group in [
                    {
                      label: 'Top Notes',
                      items: product.topNotes,
                      hint: 'First impression &middot; 15 min',
                    },
                    {
                      label: 'Heart Notes',
                      items: product.middleNotes,
                      hint: 'The character &middot; 2 to 4 hours',
                    },
                    {
                      label: 'Base Notes',
                      items: product.baseNotes,
                      hint: 'The trail &middot; 6+ hours',
                    },
                  ]"
                  :key="group.label"
                >
                  <div class="flex items-baseline justify-between mb-3">
                    <p
                      class="text-[10px] tracking-[0.22em] uppercase text-gold font-semibold"
                    >
                      {{ group.label }}
                    </p>
                    <p class="text-[10px] tracking-wider uppercase text-faint">
                      {{ group.hint }}
                    </p>
                  </div>
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="note in group.items"
                      :key="note"
                      class="px-3.5 py-1.5 text-xs rounded-pill bg-cream text-ink border border-line"
                    >
                      {{ note }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Product Performance -->
              <div
                v-if="activeTab === 'performance'"
                class="space-y-4 max-w-prose"
              >
                <div
                  class="grid grid-cols-[auto_1fr] gap-y-4 gap-x-6 border border-line rounded-2xl p-5 sm:p-6 bg-cream/40"
                >
                  <div
                    class="text-[10px] tracking-[0.2em] uppercase text-faint font-semibold pt-0.5"
                  >
                    Type
                  </div>
                  <div class="text-sm text-ink font-medium">
                    {{ product.performance.type }}
                  </div>

                  <div
                    class="text-[10px] tracking-[0.2em] uppercase text-faint font-semibold pt-0.5"
                  >
                    Size
                  </div>
                  <div class="text-sm text-ink font-medium">
                    {{ product.size }}
                  </div>

                  <div
                    class="text-[10px] tracking-[0.2em] uppercase text-faint font-semibold pt-0.5"
                  >
                    Sillage
                  </div>
                  <div class="text-sm text-ink font-medium">
                    {{ product.performance.sillage }}
                  </div>

                  <div
                    class="text-[10px] tracking-[0.2em] uppercase text-faint font-semibold pt-0.5"
                  >
                    Projection
                  </div>
                  <div class="text-sm text-ink font-medium">
                    {{ product.performance.projection }}
                  </div>

                  <div
                    class="text-[10px] tracking-[0.2em] uppercase text-faint font-semibold pt-0.5"
                  >
                    Longevity
                  </div>
                  <div class="text-sm text-ink font-medium">
                    {{ product.performance.longevity }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Related -->
        <div class="mt-24 lg:mt-32 pt-16 border-t border-line">
          <div class="text-center max-w-xl mx-auto mb-12">
            <p class="eyebrow mb-3">You May Also Like</p>
            <h2 class="h-display text-3xl sm:text-4xl text-ink">
              Other signatures
            </h2>
            <span class="gold-rule mt-4 mx-auto" />
          </div>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <article
              v-for="(item, i) in otherProducts"
              :key="item.id"
              @click="goToDetail(item.slug)"
              class="group cursor-pointer bg-canvas border border-line rounded-2xl overflow-hidden transition-all duration-300 hover:border-gold hover:-translate-y-1 hover:shadow-lift"
              data-aos="fade-up"
              :data-aos-delay="i * 80"
              data-aos-duration="700"
            >
              <div class="aspect-square overflow-hidden bg-surface">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div class="p-4">
                <p class="text-[10px] tracking-[0.2em] uppercase text-faint">
                  {{ item.category }}
                </p>
                <h3
                  class="mt-1 font-display text-base sm:text-lg text-ink truncate"
                >
                  {{ item.name }}
                </h3>
                <p class="mt-1.5 font-display text-sm sm:text-base text-gold">
                  {{ formatPrice(item.price) }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>

    <FooterSection />

    <!-- Lightbox overlay -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="showLightbox"
          class="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          @click="closeLightbox"
        >
          <button
            @click="closeLightbox"
            class="absolute top-6 right-6 z-10 text-white/60 hover:text-white transition-colors"
            aria-label="Close zoom"
          >
            <svg
              class="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div
            class="relative max-w-[90vw] max-h-[90vh] overflow-hidden rounded-2xl"
            @click.stop
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="max-w-[90vw] max-h-[90vh] object-contain transition-transform duration-75 cursor-crosshair select-none"
              :class="{ 'scale-[2]': isZoomed }"
              :style="{
                transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
              }"
              draggable="false"
              @mousemove="handleZoomMove"
              @mouseenter="isZoomed = true"
              @mouseleave="isZoomed = false"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.btn-shopee {
  border: 1.5px solid #ee4d2d;
  color: #ee4d2d;
  background: transparent;
}
.btn-shopee:hover {
  background: #ee4d2d;
  color: #fff;
}

.btn-tiktok {
  background: transparent;
  color: #010101;
  border: 1.5px solid #010101;
}
.btn-tiktok:hover {
  background: #010101;
  color: #fff !important;
}

.btn-whatsapp {
  background: transparent;
  color: #25d366;
  border: 1.5px solid #25d366;
}
.btn-whatsapp:hover {
  background: #25d366;
  color: #fff;
}

/* Lightbox transitions */
.lightbox-enter-active {
  transition: opacity 0.3s ease;
}
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
