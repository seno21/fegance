<script setup lang="ts">
import { computed } from "vue";
import { useProducts } from "@/composables/useProducts";
import { useTestimonials } from "@/composables/useTestimonials";
import { useScentFamilies } from "@/composables/useScentFamilies";

const { products, loading: productsLoading } = useProducts();
const { testimonials, loading: testimonialsLoading } = useTestimonials();
const { families, loading: familiesLoading } = useScentFamilies();

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

      <div class="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div
          class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9a227]/10"
            >
              <svg
                class="h-6 w-6 text-[#c9a227]"
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
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9a227]/10"
            >
              <svg
                class="h-6 w-6 text-[#c9a227]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-[#111111]">
                {{
                  testimonialsLoading ? "—" : (testimonials?.length ?? 0)
                }}
              </p>
              <p class="text-sm text-gray-500">Testimonials</p>
            </div>
          </div>
        </div>

        <div
          class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <div class="flex items-center gap-4">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#c9a227]/10"
            >
              <svg
                class="h-6 w-6 text-[#c9a227]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1.5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                />
              </svg>
            </div>
            <div>
              <p class="text-2xl font-bold text-[#111111]">
                {{
                  familiesLoading ? "—" : (families?.length ?? 0)
                }}
              </p>
              <p class="text-sm text-gray-500">Scent Families</p>
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
            class="inline-flex items-center gap-2 rounded-xl bg-[#c9a227] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#b8921f]"
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
            to="/admin/content"
            class="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-[#111111] shadow-sm transition-colors hover:bg-gray-50"
          >
            Manage Content
          </router-link>
          <router-link
            to="/admin/testimonials"
            class="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-[#111111] shadow-sm transition-colors hover:bg-gray-50"
          >
            Manage Testimonials
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
                <span class="shrink-0 rounded-full bg-[#c9a227]/10 px-2.5 py-0.5 text-xs font-medium text-[#c9a227] capitalize">
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
