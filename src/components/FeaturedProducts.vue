<script setup lang="ts">
import { computed, ref } from 'vue'
import { products, type Product } from '@/data/products'
import { useRouter } from 'vue-router'

const router = useRouter()

const activeFilter = ref<'all' | Product['family']>('all')

const filtered = computed(() => {
  if (activeFilter.value === 'all') return products
  return products.filter(p => p.family === activeFilter.value)
})

const filters: { id: 'all' | Product['family']; label: string }[] = [
  { id: 'all', label: 'All Scents' },
  { id: 'floral', label: 'Floral' },
  { id: 'woody', label: 'Woody' },
  { id: 'oriental', label: 'Oriental' },
  { id: 'fresh', label: 'Fresh' },
  { id: 'citrus', label: 'Citrus' },
]

function goToDetail(slug: string) {
  router.push({ name: 'product-detail', params: { slug } })
}

function formatPrice(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}
</script>

<template>
  <section id="products" class="section bg-cream">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-duration="800">
        <p class="eyebrow mb-3">Curated For You</p>
        <h2 class="h-display text-3xl sm:text-4xl lg:text-5xl text-ink">
          Featured Collection
        </h2>
        <span class="gold-rule mt-5 mx-auto" />
        <p class="mt-5 text-sm sm:text-base text-muted leading-relaxed">
          A handpicked selection of our most coveted signatures — from quiet everyday companions to evening statements.
        </p>
      </div>

      <!-- Filter chips -->
      <div class="flex flex-wrap justify-center gap-2 mb-10" data-aos="fade-up" data-aos-delay="100" data-aos-duration="600">
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

      <!-- Grid -->
      <TransitionGroup
        tag="div"
        name="grid"
        class="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7"
      >
        <article
          v-for="(product, i) in filtered"
          :key="product.id"
          :data-aos="'fade-up'"
          :data-aos-delay="(i % 4) * 80"
          data-aos-duration="800"
          class="group bg-canvas rounded-[20px] overflow-hidden border border-line/70 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold hover:shadow-lift cursor-pointer"
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

            <!-- Badges -->
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

            <!-- Quick view overlay -->
            <div
              class="absolute inset-x-3 bottom-3 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            >
              <span class="px-4 py-2 text-[11px] font-semibold tracking-wider uppercase bg-ink/95 text-canvas backdrop-blur rounded-pill">
                Quick View
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-4 sm:p-5">
            <p class="text-[10px] tracking-[0.2em] uppercase text-faint mb-1.5">
              {{ product.category }}
            </p>
            <h3 class="font-display text-lg sm:text-xl text-ink leading-snug truncate">
              {{ product.name }}
            </h3>
            <p class="mt-1.5 text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed">
              {{ product.shortDescription }}
            </p>
            <div class="mt-4 flex items-baseline justify-between">
              <p class="font-display text-lg sm:text-xl text-gold">
                {{ formatPrice(product.price) }}
              </p>
              <span class="text-[10px] tracking-wider uppercase text-faint">
                {{ product.size }}
              </span>
            </div>
          </div>
        </article>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.grid-move {
  transition: all 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.grid-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.grid-leave-active {
  transition: all 0.25s ease-in;
  position: absolute;
  z-index: 1;
}
.grid-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
.grid-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
