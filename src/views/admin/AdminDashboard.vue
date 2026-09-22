<script setup lang="ts">
import { computed } from "vue";
import { useProducts } from "@/composables/useProducts";
import { useOurStory } from "@/composables/useOurStory";

const { products, loading: productsLoading } = useProducts();
const { story, loading: storyLoading } = useOurStory();

const recentProducts = computed(() => {
  return [...(products.value || [])].slice(0, 5);
});

function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
    <div class="mx-auto max-w-6xl">
      <div class="mb-10">
        <h1 class="text-2xl font-bold text-[#111111] sm:text-3xl">Dashboard</h1>
        <p class="mt-1 text-gray-500">Manage your Fegance content</p>
      </div>

      <div class="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div
          class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#111111]/10"
            >
              <svg
                class="h-6 w-6 text-[#111111]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-[#111111]">
                {{ productsLoading ? "—" : (products?.length ?? 0) }}
              </p>
              <p class="text-sm text-gray-500">Products</p>
            </div>
          </div>
        </div>

        <div
          class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#111111]/10"
            >
              <svg
                class="h-6 w-6 text-[#111111]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25"
                />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-[#111111]">
                {{ storyLoading ? "—" : (story?.blocks?.length ?? 0) }}
              </p>
              <p class="text-sm text-gray-500">Story Elements</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-10">
        <h2 class="mb-4 text-lg font-semibold text-[#111111]">
          Quick Actions
        </h2>
        <div class="flex flex-wrap gap-3">
          <router-link
            to="/admin/products"
            class="inline-flex items-center gap-2 rounded-xl bg-[#111111] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#333333]"
          >
            <svg
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add Product
          </router-link>
          <router-link
            to="/admin/our-story"
            class="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-[#111111] shadow-sm transition-colors hover:bg-gray-50"
          >
            Manage Our Story
          </router-link>
          <router-link
            to="/admin/content"
            class="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-[#111111] shadow-sm transition-colors hover:bg-gray-50"
          >
            Manage Site Content
          </router-link>
        </div>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div class="border-b border-gray-100 px-6 py-4">
          <h2 class="text-lg font-semibold text-[#111111]">
            Recent Products
          </h2>
        </div>

        <div
          v-if="productsLoading"
          class="px-6 py-12 text-center text-sm text-gray-400"
        >
          Loading products...
        </div>

        <div
          v-else-if="recentProducts.length === 0"
          class="px-6 py-12 text-center text-sm text-gray-400"
        >
          No products yet. Add your first product to get started.
        </div>

        <template v-else>
          <!-- Mobile cards -->
          <div class="divide-y divide-gray-100 sm:hidden">
            <div
              v-for="product in recentProducts"
              :key="product.id"
              class="px-5 py-4"
            >
              <div class="mb-1 flex items-start justify-between gap-2">
                <p class="font-medium text-[#111111]">{{ product.name }}</p>
                <span class="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 capitalize">
                  {{ product.family }}
                </span>
              </div>
              <p class="text-sm text-gray-500">{{ formatPrice(product.price) }}</p>
            </div>
          </div>

          <!-- Desktop table -->
          <table class="hidden w-full text-left text-sm sm:table">
            <thead>
              <tr
                class="border-b border-gray-100 text-xs font-medium uppercase tracking-wider text-gray-400"
              >
                <th class="px-6 py-3">Name</th>
                <th class="px-6 py-3">Price</th>
                <th class="px-6 py-3">Family</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr
                v-for="product in recentProducts"
                :key="product.id"
                class="transition-colors hover:bg-gray-50"
              >
                <td
                  class="whitespace-nowrap px-6 py-3.5 font-medium text-[#111111]"
                >
                  {{ product.name }}
                </td>
                <td class="whitespace-nowrap px-6 py-3.5 text-gray-600">
                  {{ formatPrice(product.price) }}
                </td>
                <td class="whitespace-nowrap px-6 py-3.5 capitalize text-gray-500">
                  {{ product.family }}
                </td>
              </tr>
            </tbody>
          </table>
        </template>
      </div>
    </div>
  </div>
</template>
