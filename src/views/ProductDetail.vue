<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProducts } from "@/composables/useProducts";
import Navbar from "@/components/Navbar.vue";
import FooterSection from "@/components/FooterSection.vue";
import ProductAccordion from "@/components/ProductAccordion.vue";
import logoShopee from "@/assets/logo-shopee.png";

const route = useRoute();
const router = useRouter();
const { products, loading } = useProducts();

const product = computed(() =>
  products.value.find((p) => p.slug === route.params.slug),
);

const otherProducts = computed(() =>
  products.value.filter((p) => p.slug !== route.params.slug).slice(0, 4),
);

onMounted(() => {
  if (!loading.value && !product.value) {
    router.replace("/");
  }
});

watch(loading, (isLoading) => {
  if (!isLoading && !product.value) {
    router.replace("/");
  }
});

// --- Gallery ---
const selectedImageIndex = ref(0);

const allImages = computed(() => {
  if (!product.value) return [];
  const list = [product.value.image];
  if (product.value.gallery && Array.isArray(product.value.gallery)) {
    product.value.gallery.forEach((url) => {
      if (url && url.trim()) list.push(url.trim());
    });
  }
  // Guarantee 3 photo choices are present
  while (list.length < 3 && product.value.image) {
    list.push(product.value.image);
  }
  return list;
});

const selectedImage = computed(() => {
  if (!allImages.value.length) return product.value?.image || "";
  return allImages.value[selectedImageIndex.value] || allImages.value[0];
});

watch(
  () => route.params.slug,
  () => {
    selectedImageIndex.value = 0;
  }
);

// Map product properties into accordion format
interface AccordionItem {
  type: "description" | "notes" | "specs";
  title: string;
  subtitle?: string;
  icon: string;
  content: any;
}

const accordionData = computed<AccordionItem[]>(() => {
  if (!product.value) return [];
  const p = product.value;
  return [
    {
      type: "description" as const,
      title: "Description",
      subtitle: "Story",
      icon: "IconBook",
      content: [
        p.description,
        "Experience the balance of craftsmanship and luxury. Each bottle is meticulously designed to reflect the elegance of the fragrance within — a vessel worthy of the story it carries.",
      ],
    },
    {
      type: "notes" as const,
      title: "Fragrance Notes",
      subtitle: `${p.topNotes.length + p.middleNotes.length + p.baseNotes.length} Notes`,
      icon: "IconFlower2",
      content: {
        top: p.topNotes,
        middle: p.middleNotes,
        base: p.baseNotes,
      },
    },
    {
      type: "specs" as const,
      title: "Product Performance",
      subtitle: "Specs",
      icon: "IconGauge",
      content: [
        { label: "Type", value: p.performance.type },
        { label: "Size", value: p.size },
        { label: "Sillage", value: p.performance.sillage },
        { label: "Projection", value: p.performance.projection },
        { label: "Longevity", value: p.performance.longevity },
      ],
    },
  ];
});

function goToDetail(slug: string) {
  router.push({ name: "product-detail", params: { slug } });
}

function formatPrice(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

function categoryLabel(category: string): string {
  const map: Record<string, string> = {
    "eau de cologne": "EDC",
    "eau de toilette": "EDT",
    "eau de parfum": "EDP",
    "eau de parfum intense": "EDP Intense",
    "extrait de parfum": "Extrait",
  };
  return map[category.toLowerCase()] ?? category;
}

// --- Lightbox / Modal ---
const showLightbox = ref(false);
const isZoomed = ref(false);
const zoomPos = ref({ x: 50, y: 50 });
const isTouchingLightbox = ref(false);

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
    x: Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)),
    y: Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100)),
  };
}

function handleLightboxTouchStart(e: TouchEvent) {
  if (!e.touches.length) return;
  isTouchingLightbox.value = true;
  isZoomed.value = true;
  updateLightboxTouchPos(e);
}
function handleLightboxTouchMove(e: TouchEvent) {
  if (!isTouchingLightbox.value) return;
  if (e.cancelable) e.preventDefault();
  updateLightboxTouchPos(e);
}
function handleLightboxTouchEnd() {
  isTouchingLightbox.value = false;
  isZoomed.value = false;
}
function updateLightboxTouchPos(e: TouchEvent) {
  if (!e.touches.length) return;
  const touch = e.touches[0];
  if (!touch) return;
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  zoomPos.value = {
    x: Math.max(
      0,
      Math.min(100, ((touch.clientX - rect.left) / rect.width) * 100),
    ),
    y: Math.max(
      0,
      Math.min(100, ((touch.clientY - rect.top) / rect.height) * 100),
    ),
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
  <div v-if="loading && !product">
    <Navbar />
    <main class="pt-6 lg:pt-10 pb-20 lg:pb-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="product-layout">
          <div class="product-gallery">
            <div class="gallery-main bg-surface animate-pulse" />
          </div>
          <div class="product-info space-y-6">
            <div class="h-4 w-24 bg-line rounded animate-pulse" />
            <div class="h-12 w-3/4 bg-line rounded animate-pulse" />
            <div class="h-8 w-40 bg-line rounded animate-pulse" />
            <div class="flex gap-2.5 mt-7">
              <div class="h-8 w-20 bg-line rounded-pill animate-pulse" />
              <div class="h-8 w-24 bg-line rounded-pill animate-pulse" />
              <div class="h-8 w-16 bg-line rounded-pill animate-pulse" />
            </div>
            <div class="h-10 w-48 bg-line rounded animate-pulse" />
            <div class="flex gap-2.5 mt-9">
              <div class="h-12 flex-1 bg-line rounded-pill animate-pulse" />
              <div class="h-12 flex-1 bg-line rounded-pill animate-pulse" />
              <div class="h-12 flex-1 bg-line rounded-pill animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>

  <div v-else-if="product">
    <Navbar />

    <main class="pt-6 lg:pt-10 pb-20 lg:pb-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Two-column independent layout -->
        <div class="product-layout">
          <!-- Left: Independent Gallery (sticky on desktop) -->
          <div
            class="product-gallery"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <!-- Main Image with Thin Dark Fade & Zoom Icon on Hover -->
            <div
              class="group relative aspect-square w-full rounded-[24px] overflow-hidden bg-surface shadow-soft border border-line/70 cursor-pointer"
              @click="openLightbox"
            >
              <Transition name="gallery-fade" mode="out-in">
                <img
                  :key="selectedImage"
                  :src="selectedImage"
                  :alt="product.name"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  draggable="false"
                />
              </Transition>

              <!-- Fade Warna Hitam Tipis & Icon Zoom -->
              <div
                class="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-2 text-white z-10"
              >
                <div
                  class="w-12 h-12 rounded-full bg-white/20 border border-white/40 backdrop-blur-md flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                    />
                  </svg>
                </div>
                <span class="text-xs font-semibold uppercase tracking-wider text-white drop-shadow">
                  Klik untuk Zoom
                </span>
              </div>

              <!-- Badges -->
              <div
                v-if="product.isBestseller || product.isNew"
                class="absolute top-4 left-4 flex flex-col gap-1.5 z-20 pointer-events-none"
              >
                <span
                  v-if="product.isBestseller"
                  class="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-pill bg-neutral-900 text-white border border-neutral-700"
                >
                  Best Seller
                </span>
                <span
                  v-if="product.isNew"
                  class="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-pill bg-ink text-canvas"
                >
                  New
                </span>
              </div>
            </div>

            <!-- 3 Pilihan Foto Thumbnails di bawah foto utama halaman detail -->
            <div class="mt-4 flex items-center gap-3 overflow-x-auto pb-1">
              <button
                v-for="(imgUrl, idx) in allImages"
                :key="idx"
                @click="selectedImageIndex = idx"
                class="group relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0 focus:outline-none"
                :class="
                  selectedImageIndex === idx
                    ? 'border-ink shadow-md scale-105'
                    : 'border-line/80 hover:border-ink/60 opacity-75 hover:opacity-100'
                "
              >
                <img
                  :src="imgUrl"
                  :alt="`${product.name} foto ${idx + 1}`"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>

          <!-- Right: Product Information -->
          <div
            class="product-info"
            data-aos="fade-left"
            data-aos-duration="800"
          >
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
                {{ categoryLabel(product.category) }}
              </span>
            </div>

            <p class="mt-7 font-display text-3xl sm:text-4xl text-ink font-bold">
              {{ formatPrice(product.price) }}
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

            <!-- Accordion -->
            <ProductAccordion
              :accordion-data="accordionData"
              :key="product.slug"
            />
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
              class="group cursor-pointer bg-canvas border border-line rounded-2xl overflow-hidden transition-all duration-300 hover:border-black hover:-translate-y-1 hover:shadow-lift"
              data-aos="fade-up"
              :data-aos-delay="i * 80"
              data-aos-duration="700"
            >
              <div class="aspect-square overflow-hidden bg-surface">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
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
                <p class="mt-1.5 font-display text-sm sm:text-base text-ink font-bold">
                  {{ formatPrice(item.price) }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </main>

    <FooterSection />

    <!-- Lightbox / Modal for Auto-Zoom & 3 Photo Choices -->
    <Teleport to="body">
      <Transition name="lightbox">
        <div
          v-if="showLightbox"
          class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          @click="closeLightbox"
        >
          <!-- Close button -->
          <button
            @click="closeLightbox"
            class="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <svg
              class="w-6 h-6"
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

          <div
            class="relative flex flex-col items-center max-w-3xl w-full max-h-[92vh] bg-[#111111]/95 border border-white/10 rounded-3xl p-4 sm:p-6 overflow-hidden shadow-2xl"
            @click.stop
          >
            <!-- Header inside modal -->
            <div class="w-full flex items-center justify-between mb-3 px-1">
              <div>
                <h3 class="font-display text-xl font-bold text-white leading-tight">
                  {{ product.name }}
                </h3>
              </div>
            </div>

            <!-- Auto-Zoom Large Photo View -->
            <div
              class="relative w-full aspect-square max-h-[50vh] sm:max-h-[58vh] rounded-2xl overflow-hidden bg-black/60 border border-white/10 cursor-crosshair group flex items-center justify-center"
              @mousemove="handleZoomMove"
              @mouseenter="isZoomed = true"
              @mouseleave="isZoomed = false"
              @touchstart="handleLightboxTouchStart"
              @touchmove="handleLightboxTouchMove"
              @touchend.passive="handleLightboxTouchEnd"
            >
              <img
                :src="selectedImage"
                :alt="product.name"
                class="w-full h-full object-contain transition-transform duration-100 ease-out select-none pointer-events-none"
                :class="{ 'scale-[2.2]': isZoomed }"
                :style="{ transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` }"
                draggable="false"
              />

              <!-- Unzoomed Overlay Hint -->
              <div
                v-if="!isZoomed"
                class="absolute bottom-3 bg-black/70 text-white/90 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border border-white/10 pointer-events-none flex items-center gap-1.5"
              >
                <svg
                  class="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"
                  />
                </svg>
                Sorot foto untuk Auto-Zoom
              </div>
            </div>

            <!-- 3 Pilihan Foto Thumbnails di bawah foto utama Modal -->
            <div class="w-full mt-4 flex items-center justify-center gap-3 overflow-x-auto py-1">
              <button
                v-for="(imgUrl, idx) in allImages"
                :key="idx"
                @click="selectedImageIndex = idx"
                class="group relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 shrink-0 focus:outline-none"
                :class="
                  selectedImageIndex === idx
                    ? 'border-white ring-2 ring-white/40 scale-105 shadow-glow'
                    : 'border-white/20 hover:border-white/60 opacity-60 hover:opacity-100'
                "
              >
                <img
                  :src="imgUrl"
                  :alt="`Pilihan ${idx + 1}`"
                  class="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* ============================================================
   PRODUCT LAYOUT — Two independent columns
   Left gallery never stretches; only right column grows.
   ============================================================ */
.product-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: start;
}

@media (min-width: 1024px) {
  .product-layout {
    grid-template-columns: 560px 1fr;
    gap: 64px;
  }
}

/* ============================================================
   GALLERY — Independent, sticky, fixed dimensions
   ============================================================ */
.product-gallery {
  width: 100%;
  max-width: 560px;
  height: fit-content;
  align-self: start;
  position: sticky;
  top: 120px;
}

@media (max-width: 1023px) {
  .product-gallery {
    position: static;
  }
}

/* Main image container */
.gallery-main {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 24px;
  overflow: hidden;
  background: var(--color-surface);
  box-shadow: var(--shadow-soft);
  cursor: crosshair;
  flex-shrink: 0;
}

.gallery-main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 75ms ease;
  user-select: none;
}

.gallery-main-img.zoom-active {
  transform: scale(2.5);
}

.gallery-main-overlay {
  position: absolute;
  inset: 0;
  background: transparent;
  transition: background 300ms ease;
  pointer-events: none;
}

.gallery-main:hover .gallery-main-overlay {
  background: rgba(0, 0, 0, 0.03);
}

/* Badge overlays */
.gallery-badge-group {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.gallery-badge {
  padding: 6px 12px;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-radius: 9999px;
  line-height: 1;
}

.gallery-badge-gold {
  background: var(--color-ink);
  color: var(--color-canvas);
}

.gallery-badge-ink {
  background: var(--color-ink);
  color: var(--color-canvas);
}

/* ============================================================
   PRODUCT INFO — Only this column grows with accordion
   ============================================================ */
.product-info {
  min-width: 0;
}

/* ============================================================
   IMAGE FADE TRANSITION
   ============================================================ */
.gallery-fade-enter-active,
.gallery-fade-leave-active {
  transition: opacity 250ms ease;
}

.gallery-fade-enter-from,
.gallery-fade-leave-to {
  opacity: 0;
}

/* ============================================================
   VENDOR BUTTONS
   ============================================================ */
.btn-shopee {
  border: 1.5px solid #ee4d2d;
  color: #ee4d2d;
  background: transparent;
}
.btn-shopee:hover {
  background: #ee4d2d;
  color: #fff;
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

/* ============================================================
   LIGHTBOX TRANSITIONS
   ============================================================ */
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
