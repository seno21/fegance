<template>
  <!-- New -->
  <section>
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <header class="text-center mb-10">
        <h2 class="text-xl font-bold text-gray-900 sm:text-4xl">
          Product Collection
        </h2>

        <p class="mx-auto mt-4 max-w-2xl text-gray-700">
          Each spritz reveals a part of who you are — a signature scent that
          tells your essence. Make every encounter more meaningful, and let this
          fragrance become your unforgettable identity.
        </p>
      </header>

      <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="(product, index) in products"
          :key="index"
          class="flex flex-col h-full">
          <div class="group flex flex-col h-full overflow-hidden">
            <!-- Tombol Wishlist -->
            <div class="relative aspect-square w-full">
              <img
                :src="`/images/product/${product.image}`"
                alt=""
                class="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0" />

              <img
                :src="`/images/product/${product.detailImage}`"
                alt=""
                class="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100" />
            </div>

            <!-- Konten Produk -->
            <div
              class="relative flex flex-col justify-between border border-gray-100 bg-white p-6 flex-1">
              <div>
                <p class="text-gray-700">{{ product.price }}</p>
                <h3 class="mt-1.5 text-lg font-bold text-gray-900">
                  {{ product.name }}
                </h3>
              </div>

              <form class="mt-4 flex gap-4">
                <button
                  class="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-900 transition hover:scale-105">
                  Detail
                </button>
                <button
                  type="button"
                  class="block w-full rounded-sm bg-amber-300 px-4 py-3 text-sm font-semibold text-black transition hover:scale-105">
                  Buy Now
                </button>
              </form>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="mx-auto m-3 flex justify-center">
      <NuxtLink
        class="group rounded-2xl relative inline-flex w-70 items-center justify-center overflow-hidden border bg-gray-700 border-gray-700 px-8 py-3 focus:outline-none focus:ring-3"
        to="/shop">
        <span
          class="absolute inset-y-0 left-0 w-[2px] bg-amber-300 transition-all group-hover:w-full"></span>

        <span
          class="relative text-md font-semibold text-amber-400 transition-colors group-hover:text-black">
          View All
        </span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup>
import { NuxtLink } from "#components";

const products = [
  {
    name: "Deep In The Night (DITN)",
    price: "Rp 120.000",
    description: "A rich blend of oud, spices and amber.",
    image: "DITN.jpeg",
    detailImage: "DITN2.jpeg",
  },
  {
    name: "Dusk Exlixir",
    price: "Rp 120.000",
    description: "Warm amber with hints of vanilla and musk.",
    image: "DE2.jpeg",
    detailImage: "DE1.jpeg",
  },
  {
    name: "Silent Infusion",
    price: "Rp 145K",
    description: "Floral jasmine with dark woody undertones.",
    image: "SI1.jpeg",
    detailImage: "SI2.jpeg",
  },
  {
    name: "Perfect Man",
    price: "Rp 145K",
    description: "Floral jasmine with dark woody undertones.",
    image: "PM1.jpeg",
    detailImage: "PM3.jpeg",
  },
  {
    name: "Plus (+62)",
    price: "Rp 145K",
    description: "Floral jasmine with dark woody undertones.",
    image: "perfect-man.jpeg",
    detailImage: "dusk-elixir.jpeg",
  },
];
</script>
