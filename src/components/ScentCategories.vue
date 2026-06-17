<script setup lang="ts">
import { scentFamilies, products } from '@/data/products'
import { useRouter } from 'vue-router'

const router = useRouter()

function countByFamily(id: string) {
  return products.filter(p => p.family === id).length
}

function explore(familyId: string) {
  router.push({ path: '/', hash: `#family-${familyId}` })
  setTimeout(() => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
  }, 80)
}
</script>

<template>
  <section id="families" class="section bg-canvas">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14" data-aos="fade-up" data-aos-duration="800">
        <div class="max-w-xl">
          <p class="eyebrow mb-3">Scent Families</p>
          <h2 class="h-display text-3xl sm:text-4xl lg:text-5xl text-ink">
            Find your fragrance family.
          </h2>
          <span class="gold-rule mt-5" />
        </div>
        <p class="text-sm sm:text-base text-muted max-w-md leading-relaxed">
          Each scent tells a different story. Explore by family to discover the notes that speak to who you are — and who you are becoming.
        </p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-5">
        <button
          v-for="(family, i) in scentFamilies"
          :key="family.id"
          @click="explore(family.id)"
          class="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-surface text-left focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-canvas"
          data-aos="fade-up"
          :data-aos-delay="i * 80"
          data-aos-duration="800"
        >
          <img
            :src="family.image"
            :alt="family.name"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <!-- Gradient overlay -->
          <div
            aria-hidden="true"
            class="absolute inset-0 transition-opacity duration-300"
            style="background: linear-gradient(180deg, rgba(17,17,17,0.05) 0%, rgba(17,17,17,0.45) 50%, rgba(17,17,17,0.85) 100%);"
          />
          <div
            aria-hidden="true"
            class="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300"
          />

          <!-- Content -->
          <div class="absolute inset-0 p-4 sm:p-5 flex flex-col justify-end text-canvas">
            <p class="text-[10px] tracking-[0.22em] uppercase opacity-80 mb-1.5">
              {{ countByFamily(family.id) }} {{ countByFamily(family.id) === 1 ? 'fragrance' : 'fragrances' }}
            </p>
            <h3 class="font-display text-2xl sm:text-[28px] leading-tight">
              {{ family.name }}
            </h3>
            <p class="mt-1 text-xs sm:text-sm opacity-80 italic">
              {{ family.tagline }}
            </p>
            <div
              class="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300"
            >
              Explore
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </button>
      </div>
    </div>
  </section>
</template>
