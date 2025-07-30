<template>
  <section class="py-16 bg-gray-50" id="products">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-amber-400 mb-4">Collections</h2>
        <p class="text-black max-w-2xl mx-auto">
          Enjoy the art in every spray. Crafted with heart, for souls who
          appreciate the beauty of scent.
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
              class="h-56 py-2 flex items-center justify-center overflow-hidden bg-white">
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
                class="text-black bg-amber-300 hover:bg-amber-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Detail
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="grid py-7">
        <div class="container mx-auto px-6 py-10 text-center">
          <div class="flex justify-center mt-10">
            <NuxtLink
              to="/collections"
              class="inline-flex bg-amber-300 hover:bg-amber-500 text-black text-2xl font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105 justify-center items-center gap-2">
              <Icon icon="weui:shop-filled" width="24" height="24" />
              Collections
            </NuxtLink>
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
    price: "Rp 135K",
    description: "A rich blend of oud, spices and amber.",
    image: "deep-in-the-night.jpeg",
  },
  {
    name: "Dusk Exlixir",
    price: "Rp 135K",
    description: "Warm amber with hints of vanilla and musk.",
    image: "dusk-elixir.jpeg",
  },
  {
    name: "Silent Infusion",
    price: "Rp 145K",
    description: "Floral jasmine with dark woody undertones.",
    image: "silent-infusion.jpeg",
  },
  {
    name: "Perfect Man",
    price: "Rp 145K",
    description: "Floral jasmine with dark woody undertones.",
    image: "perfect-man.jpeg",
  },
];
</script>
