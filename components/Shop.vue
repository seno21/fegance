<template>
  <section>
    <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <!-- Tombol Mobile Filter -->
      <div class="mt-8 block lg:hidden">
        <button
          @click="toggleMobileFilter"
          class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600">
          <span class="text-sm font-medium"> Filters & Sorting </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4 rtl:rotate-180">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <!-- BACKDROP untuk Mobile Filter -->
      <div
        v-if="isMobileFilterOpen"
        @click="isMobileFilterOpen = false"
        class="fixed inset-0 z-40 bg-black/30 lg:hidden"></div>

      <div class="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8">
        <!-- Sidebar Filter -->
        <div
          :class="[
            'space-y-4 z-50 bg-white p-4 rounded-md lg:p-0',
            isMobileFilterOpen
              ? 'fixed top-20 left-4 right-4 block lg:static'
              : 'hidden',
            'lg:block',
          ]">
          <!-- Sort -->
          <div>
            <label for="SortBy" class="block text-xs font-medium text-gray-700">
              Sort By
            </label>
            <select
              id="SortBy"
              v-model="selectedSort"
              @change="applySort"
              class="mt-1 rounded-sm border-gray-300 text-sm w-full">
              <option value="">-Sort By-</option>
              <option value="Title,DESC">Title, DESC</option>
              <option value="Title,ASC">Title, ASC</option>
              <option value="Price,DESC">Price, DESC</option>
              <option value="Price,ASC">Price, ASC</option>
            </select>
          </div>

          <!-- Filter -->
          <div>
            <p class="block text-xs font-medium text-gray-700">Filters</p>
            <div class="mt-1 space-y-2">
              <!-- Availability Filter -->
              <details
                class="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                <summary
                  class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                  <span class="text-sm font-medium"> Availability </span>
                  <span class="transition group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div class="border-t border-gray-200 bg-white">
                  <header class="flex items-center justify-between p-4">
                    <span class="text-sm text-gray-700"> 0 Selected </span>
                    <button
                      type="button"
                      class="text-sm text-gray-900 underline underline-offset-4"
                      @click="resetFilter">
                      Reset
                    </button>
                  </header>
                  <ul class="space-y-1 border-t border-gray-200 p-4">
                    <li>
                      <label
                        for="FilterInStock"
                        class="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="FilterInStock"
                          v-model="filterAvailability.inStock"
                          class="size-5 rounded-sm border-gray-300 shadow-sm" />
                        <span class="text-sm font-medium text-gray-700"
                          >In Stock</span
                        >
                      </label>
                    </li>
                    <li>
                      <label
                        for="FilterPreOrder"
                        class="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="FilterPreOrder"
                          v-model="filterAvailability.preOrder"
                          class="size-5 rounded-sm border-gray-300 shadow-sm" />
                        <span class="text-sm font-medium text-gray-700"
                          >Pre Order</span
                        >
                      </label>
                    </li>
                    <li>
                      <label
                        for="FilterOutOfStock"
                        class="inline-flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="FilterOutOfStock"
                          v-model="filterAvailability.outOfStock"
                          class="size-5 rounded-sm border-gray-300 shadow-sm" />
                        <span class="text-sm font-medium text-gray-700"
                          >Out of Stock</span
                        >
                      </label>
                    </li>
                  </ul>
                </div>
              </details>

              <!-- Price Filter -->
              <details
                class="overflow-hidden rounded-sm border border-gray-300 [&_summary::-webkit-details-marker]:hidden">
                <summary
                  class="flex cursor-pointer items-center justify-between gap-2 p-4 text-gray-900 transition">
                  <span class="text-sm font-medium"> Price </span>
                  <span class="transition group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="size-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div class="border-t border-gray-200 bg-white">
                  <header class="flex items-center justify-between p-4">
                    <span class="text-sm text-gray-700"
                      >The highest price is Rp600.000</span
                    >
                    <button
                      @click="resetFilter"
                      class="text-sm text-gray-900 underline underline-offset-4">
                      Reset
                    </button>
                  </header>
                  <div class="border-t border-gray-200 p-4">
                    <div class="flex justify-between gap-4">
                      <label
                        for="FilterPriceFrom"
                        class="flex items-center gap-2">
                        <span class="text-sm text-gray-600">Rp</span>
                        <input
                          type="number"
                          id="FilterPriceFrom"
                          v-model="priceFrom"
                          placeholder="From"
                          class="w-full rounded-md border-gray-200 shadow-xs sm:text-sm" />
                      </label>
                      <label
                        for="FilterPriceTo"
                        class="flex items-center gap-2">
                        <span class="text-sm text-gray-600">Rp</span>
                        <input
                          type="number"
                          id="FilterPriceTo"
                          v-model="priceTo"
                          placeholder="To"
                          class="w-full rounded-md border-gray-200 shadow-xs sm:text-sm" />
                      </label>
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>

        <!-- Produk -->
        <div class="lg:col-span-3">
          <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <li
              v-for="(product, index) in sortedProducts"
              :key="index"
              class="flex flex-col h-full">
              <div class="group flex flex-col h-full overflow-hidden">
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
                <div
                  class="relative flex flex-col justify-between border border-gray-100 bg-white p-6 flex-1">
                  <div>
                    <p class="text-gray-700">{{ product.price }}</p>
                    <h3 class="mt-1.5 text-lg font-bold text-gray-900">
                      {{ product.name }}
                    </h3>
                  </div>
                  <form class="mt-4">
                    <button
                      class="block w-full rounded-md bg-yellow-400 p-4 text-md font-medium transition hover:scale-105">
                      Own It Today
                    </button>
                  </form>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";

// Produk
const products = [
  {
    name: "Deep In The Night (DITN)",
    price: "Rp 120.000",
    description: "A rich blend of oud, spices and amber.",
    image: "DITN.jpeg",
    detailImage: "DITN2.jpeg",
    stockStatus: "in-stock",
  },
  {
    name: "Dusk Exlixir",
    price: "Rp 120.000",
    description: "Warm amber with hints of vanilla and musk.",
    image: "DE2.jpeg",
    detailImage: "DE1.jpeg",
    stockStatus: "in-stock",
  },
  {
    name: "Silent Infusion",
    price: "Rp 145.000",
    description: "Floral jasmine with dark woody undertones.",
    image: "SI1.jpeg",
    detailImage: "SI2.jpeg",
    stockStatus: "out-of-stock",
  },
  {
    name: "Perfect Man",
    price: "Rp 145.000",
    description: "Floral jasmine with dark woody undertones.",
    image: "PM1.jpeg",
    detailImage: "PM3.jpeg",
    stockStatus: "in-stock",
  },
  {
    name: "Plus (+62)",
    price: "Rp 145.000",
    description: "Floral jasmine with dark woody undertones.",
    image: "perfect-man.jpeg",
    detailImage: "dusk-elixir.jpeg",
    stockStatus: "pre-order",
  },
];

const selectedSort = ref("");
const filterAvailability = ref({
  inStock: false,
  preOrder: false,
  outOfStock: false,
});
const priceFrom = ref(null);
const priceTo = ref(null);
const isMobileFilterOpen = ref(false);

const toggleMobileFilter = () => {
  isMobileFilterOpen.value = !isMobileFilterOpen.value;
};

const sortedProducts = computed(() => {
  let sorted = [...products];

  // FILTER STOCK STATUS
  sorted = sorted.filter((product) => {
    const status = product.stockStatus;
    const noFilter =
      !filterAvailability.value.inStock &&
      !filterAvailability.value.preOrder &&
      !filterAvailability.value.outOfStock;

    if (noFilter) return true;

    return (
      (filterAvailability.value.inStock && status === "in-stock") ||
      (filterAvailability.value.preOrder && status === "pre-order") ||
      (filterAvailability.value.outOfStock && status === "out-of-stock")
    );
  });

  // FILTER HARGA
  sorted = sorted.filter((product) => {
    const price = parseInt(product.price.replace(/\D/g, ""));
    if (priceFrom.value && price < priceFrom.value) return false;
    if (priceTo.value && price > priceTo.value) return false;
    return true;
  });

  // SORTING
  if (!selectedSort.value) return sorted;

  const [field, direction] = selectedSort.value.split(",");

  if (field === "Title") {
    sorted.sort((a, b) =>
      direction === "ASC"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
  }

  if (field === "Price") {
    sorted.sort((a, b) => {
      const aPrice = parseInt(a.price.replace(/\D/g, ""));
      const bPrice = parseInt(b.price.replace(/\D/g, ""));
      return direction === "ASC" ? aPrice - bPrice : bPrice - aPrice;
    });
  }

  return sorted;
});

const resetFilter = () => {
  filterAvailability.value = {
    inStock: false,
    preOrder: false,
    outOfStock: false,
  };
  priceFrom.value = null;
  priceTo.value = null;
  selectedSort.value = "";
};
</script>
