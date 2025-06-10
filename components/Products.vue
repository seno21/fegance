<template>
  <section class="py-16 bg-gray-50" id="products">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-amber-400 mb-4">Our Collection</h2>
        <p class="text-black max-w-2xl mx-auto">
          One scent, a thousand stories. Discover the fragrance that defines
          you.
        </p>
      </div>

      <!-- Test -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="w-full px-2 py-3 max-w-sm rounded-lg shadow-sm">
          <a href="#">
            <!-- Gambar dibungkus dalam container dengan tinggi tetap -->
            <div
              class="h-56 flex items-center justify-center overflow-hidden bg-white">
              <img
                class="object-contain rounded h-full transition transform hover:scale-105"
                :src="`/images/product/${product.image}`"
                :alt="product.name" />
            </div>
          </a>

          <div class="px-5 pb-5">
            <a href="#">
              <h5
                class="mt-4 text-xl font-semibold tracking-tight text-gray-950">
                {{ product.name }}
              </h5>
            </a>

            <div class="flex items-center mt-2.5 mb-5">
              <!-- Tambahan rating atau badge (jika ada) -->
            </div>

            <div class="flex items-center justify-between">
              <span class="text-xl font-bold text-gray-950">
                {{ product.price }}
              </span>
              <a
                href="#"
                class="text-white bg-amber-300 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Add to cart
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const products = [
  {
    name: "Deep In The Night (DITN)",
    price: "Rp 120K",
    description: "A rich blend of oud, spices and amber.",
    image: "perfume-1.jpg",
  },
  {
    name: "Golden Amber",
    price: "Rp 135K",
    description: "Warm amber with hints of vanilla and musk.",
    image: "perfume-2.jpg",
  },
  {
    name: "Midnight Jasmine",
    price: "Rp 150K",
    description: "Floral jasmine with dark woody undertones.",
    image: "perfume-3.jpg",
  },
];
</script>
