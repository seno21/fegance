<template>
  <section class="py-16 bg-gray-900">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-dark-gold-400 mb-4">
          Our Signature Collection
        </h2>
        <p class="text-gray-300 max-w-2xl mx-auto">
          Each fragrance tells a story. Discover yours.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="bg-gray-800 rounded-lg overflow-hidden border border-dark-gold-800 hover:border-dark-gold-500 transition transform hover:scale-105">
          <div class="h-64 bg-gray-700 flex items-center justify-center">
            <img
              :src="product.image"
              :alt="product.name"
              class="h-48 object-contain" />
          </div>
          <div class="p-6">
            <div class="flex justify-between items-start">
              <h3 class="text-xl font-bold text-white">{{ product.name }}</h3>
              <span class="text-dark-gold-400 font-bold">{{
                product.price
              }}</span>
            </div>
            <p class="text-gray-400 mt-2">{{ product.description }}</p>
            <button
              class="mt-4 w-full bg-dark-gold-600 hover:bg-dark-gold-500 text-white py-2 rounded transition">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const products = [
  {
    name: "Royal Oud",
    price: "$120",
    description: "A rich blend of oud, spices and amber.",
    image: "https://via.placeholder.com/300x300",
  },
  {
    name: "Golden Amber",
    price: "$95",
    description: "Warm amber with hints of vanilla and musk.",
    image: "https://via.placeholder.com/300x300",
  },
  {
    name: "Midnight Jasmine",
    price: "$110",
    description: "Floral jasmine with dark woody undertones.",
    image: "https://via.placeholder.com/300x300",
  },
];
</script>
