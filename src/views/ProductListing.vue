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
        <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
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
