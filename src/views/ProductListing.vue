<script setup lang="ts">
import { computed, ref } from 'vue'
import { products, type Product } from '@/data/products'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import AnnouncementBar from '@/components/AnnouncementBar.vue'
import FooterSection from '@/components/FooterSection.vue'
import logoShopee from '@/assets/logo-shopee.png'

const router = useRouter()

const activeFilter = ref<'all' | Product['family']>('all')
const sortBy = ref<'default' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'>('default')
const isFilterOpen = ref(false)

const filtered = computed(() => {
  let result = activeFilter.value === 'all'
    ? [...products]
    : products.filter(p => p.family === activeFilter.value)

  switch (sortBy.value) {
    case 'price-asc': result.sort((a, b) => a.price - b.price); break
    case 'price-desc': result.sort((a, b) => b.price - a.price); break
    case 'name-asc': result.sort((a, b) => a.name.localeCompare(b.name)); break
    case 'name-desc': result.sort((a, b) => b.name.localeCompare(a.name)); break
  }

  return result
})

const filters: { id: 'all' | Product['family']; label: string }[] = [
  { id: 'all', label: 'All Scents' },
  { id: 'floral', label: 'Floral' },
  { id: 'woody', label: 'Woody' },
  { id: 'oriental', label: 'Oriental' },
  { id: 'fresh', label: 'Fresh' },
  { id: 'citrus', label: 'Citrus' },
]

const sortOptions = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
  { value: 'name-desc', label: 'Name: Z to A' },
] as const

function goToDetail(slug: string) {
  router.push({ name: 'product-detail', params: { slug } })
}

function formatPrice(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}
</script>

<template>
  <div>
    <AnnouncementBar />
    <Navbar />

    <main class="pt-24 lg:pt-32 pb-20 lg:pb-28">
      <!-- Hero banner -->
      <div class="bg-cream border-b border-line">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 text-center">
          <p class="eyebrow mb-3" data-aos="fade-up" data-aos-duration="600">Our Collection</p>
          <h1 class="h-display text-4xl sm:text-5xl lg:text-6xl text-ink" data-aos="fade-up" data-aos-delay="100" data-aos-duration="600">
            Find Your Signature
          </h1>
          <span class="gold-rule mt-5 mx-auto" data-aos="fade-up" data-aos-delay="150" data-aos-duration="600" />
          <p class="mt-5 text-sm sm:text-base text-muted max-w-lg mx-auto leading-relaxed" data-aos="fade-up" data-aos-delay="200" data-aos-duration="600">
            Explore our complete range of luxury fragrances — from bold ouds to delicate florals.
          </p>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Filter bar -->
        <div class="py-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line">
          <!-- Filter chips (desktop) -->
          <div class="hidden sm:flex flex-wrap items-center gap-2">
            <button
              v-for="f in filters"
              :key="f.id"
              @click="activeFilter = f.id"
              class="px-4 py-2 text-[12px] font-medium tracking-wide rounded-pill border transition-all duration-200"
              :class="
                activeFilter === f.id
                  ? 'bg-ink text-canvas border-ink'
                  : 'bg-canvas text-ink border-line hover:border-ink/40'
              "
            >
              {{ f.label }}
            </button>
          </div>

          <!-- Mobile filter toggle -->
          <button
            @click="isFilterOpen = !isFilterOpen"
            class="sm:hidden flex items-center gap-2 text-[12px] font-medium tracking-wide text-ink border border-line rounded-pill px-4 py-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
            <span class="text-faint">({{ activeFilter === 'all' ? 'All' : activeFilter }})</span>
          </button>

          <!-- Mobile filter dropdown -->
          <Transition
            enter-active-class="transition-all duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div v-if="isFilterOpen" class="sm:hidden flex flex-wrap gap-2 -mt-2">
              <button
                v-for="f in filters"
                :key="f.id"
                @click="activeFilter = f.id; isFilterOpen = false"
                class="px-4 py-2 text-[12px] font-medium tracking-wide rounded-pill border transition-all duration-200"
                :class="
                  activeFilter === f.id
                    ? 'bg-ink text-canvas border-ink'
                    : 'bg-canvas text-ink border-line'
                "
              >
                {{ f.label }}
              </button>
            </div>
          </Transition>

          <!-- Sort -->
          <div class="flex items-center gap-2">
            <label for="sort" class="text-[12px] font-medium text-faint tracking-wide uppercase shrink-0">Sort</label>
            <div class="relative">
              <select
                id="sort"
                v-model="sortBy"
                class="text-[13px] font-medium text-ink bg-canvas border border-line rounded-pill px-4 py-2 pr-8 appearance-none cursor-pointer focus:outline-none focus:border-gold transition-colors"
              >
                <option
                  v-for="opt in sortOptions"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>
              <svg
                class="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-faint pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="2"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Results count -->
        <p class="mt-6 text-xs text-faint tracking-wide">
          Showing {{ filtered.length }} product{{ filtered.length !== 1 ? 's' : '' }}
        </p>

        <!-- Product grid -->
        <div class="mt-4 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          <article
            v-for="(product, i) in filtered"
            :key="product.id"
            data-aos="fade-up"
            :data-aos-delay="(i % 4) * 80"
            data-aos-duration="800"
            class="group bg-canvas rounded-[20px] overflow-hidden border border-line/70 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold hover:shadow-lift cursor-pointer flex flex-col"
            @click="goToDetail(product.slug)"
          >
            <!-- Image -->
            <div class="relative aspect-square overflow-hidden bg-surface">
              <img
                :src="product.image"
                :alt="product.name"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              <div class="absolute top-3 left-3 flex flex-col gap-1.5">
                <span
                  v-if="product.isNew"
                  class="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-pill bg-ink text-canvas"
                >
                  New
                </span>
                <span
                  v-if="product.isBestseller"
                  class="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-pill bg-gold text-ink"
                >
                  Best Seller
                </span>
              </div>
            </div>

            <!-- Content -->
            <div class="p-4 sm:p-5 flex flex-col flex-1">
              <p class="text-[10px] tracking-[0.2em] uppercase text-faint mb-1.5">
                {{ product.category }}
              </p>
              <h3 class="font-display text-lg sm:text-xl text-ink leading-snug truncate">
                {{ product.name }}
              </h3>
              <p class="mt-1.5 text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed flex-1">
                {{ product.shortDescription }}
              </p>

              <div class="mt-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-0">
                <p class="font-display text-lg sm:text-xl text-gold">
                  {{ formatPrice(product.price) }}
                </p>
                <span class="text-[10px] tracking-wider uppercase text-faint">
                  {{ product.size }}
                </span>
              </div>

              <div class="mt-4 pt-4 border-t border-line/60 flex flex-col gap-1.5" @click.stop>
                <p class="text-[10px] tracking-[0.15em] uppercase text-faint font-medium mb-0.5">Beli Sekarang</p>
                <div class="flex flex-col sm:flex-row gap-1.5 w-full">
                  <a
                    :href="product.shopeeLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-pill border transition-all duration-200 border-[#EE4D2D] text-[#EE4D2D] hover:bg-[#EE4D2D] hover:text-white"
                  >
                    <img :src="logoShopee" alt="Shopee" class="w-3.5 h-3.5 object-contain shrink-0" />
                    Shopee
                  </a>
                  <a
                    :href="product.tiktokLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-pill border transition-all duration-200 border-[#010101] text-[#010101] hover:bg-[#010101] hover:text-white"
                  >
                    <svg class="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                    </svg>
                    TikTok
                  </a>
                  <a
                    :href="product.whatsappLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase rounded-pill border transition-all duration-200 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white"
                  >
                    <svg class="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.554 4.12 1.523 5.85L.053 23.334l5.665-1.46C7.263 22.564 9.546 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.858 0-3.654-.506-5.2-1.462l-.373-.224-3.36.866.898-3.278-.243-.389C2.575 16.17 2 14.139 2 12 2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/>
                    </svg>
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Empty state -->
        <div
          v-if="filtered.length === 0"
          class="text-center py-20"
        >
          <p class="text-muted text-sm">No products match this filter.</p>
          <button
            @click="activeFilter = 'all'"
            class="mt-4 px-5 py-2.5 text-[12px] font-semibold tracking-wider uppercase bg-ink text-canvas rounded-pill hover:bg-gold hover:text-ink transition-all duration-300"
          >
            View All Products
          </button>
        </div>
      </div>
    </main>

    <FooterSection />
  </div>
</template>
