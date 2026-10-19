<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { useProducts } from "@/composables/useProducts";
import { useSiteContent } from "@/composables/useSiteContent";

const router = useRouter();
const { products, loading: productsLoading } = useProducts();
const { content } = useSiteContent();

const totalUsers = ref(0);
const totalWishlistCount = ref(0);
const usersLoading = ref(true);

interface WishlistCountMap {
  [productId: string]: { name: string; count: number; image?: string };
}
const topWishlist = ref<{ id: string; name: string; count: number; image?: string }[]>([]);

async function loadUserStats() {
  usersLoading.value = true;
  try {
    const snap = await getDocs(collection(db, "users"));
    totalUsers.value = snap.size;

    const map: WishlistCountMap = {};
    let totalWish = 0;

    for (const userDoc of snap.docs) {
      const wishSnap = await getDocs(collection(db, "users", userDoc.id, "wishlist"));
      totalWish += wishSnap.size;
      for (const item of wishSnap.docs) {
        const data = item.data();
        const pId = String(item.id);
        if (!map[pId]) {
          map[pId] = {
            name: data.name || "Parfum #" + pId,
            count: 0,
            image: data.image || "",
          };
        }
        map[pId].count += 1;
      }
    }

    totalWishlistCount.value = totalWish;
    topWishlist.value = Object.entries(map)
      .map(([id, val]) => ({ id, ...val }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  } catch (err) {
    console.error("Error loading user stats:", err);
  } finally {
    usersLoading.value = false;
  }
}

onMounted(() => {
  loadUserStats();
});

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
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-8 sm:py-10">
    <div class="mx-auto max-w-6xl">
      <!-- Header Banner with Anime Scenery Accent -->
      <div class="relative overflow-hidden rounded-3xl bg-[#111111] text-white p-6 sm:p-8 mb-8 shadow-lift border border-white/10">
        <div class="absolute inset-0 pointer-events-none opacity-20">
          <img src="/images/anime/up.jpg" alt="" class="w-full h-full object-cover" />
        </div>
        <div class="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span class="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a227] block mb-1">
              Atelier Management
            </span>
            <h1 class="text-2xl sm:text-3xl font-display font-bold tracking-tight">
              Dashboard Fegance
            </h1>
            <p class="text-xs sm:text-sm text-white/60 mt-1">
              Pantau performa katalog, data pengguna, dan minat wishlist parfum secara real-time.
            </p>
          </div>
          <div class="flex gap-2">
            <button
              @click="router.push('/admin/products')"
              class="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#c9a227] text-white text-xs font-semibold hover:bg-[#b8921f] transition-colors shadow-sm cursor-pointer"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Kelola Produk
            </button>
          </div>
        </div>
      </div>

      <!-- 4 Stat Metric Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <!-- Products -->
        <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink/10 text-ink">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
              </svg>
            </div>
            <div>
              <p class="text-xl font-bold text-ink">
                {{ productsLoading ? "…" : (products?.length ?? 0) }}
              </p>
              <p class="text-[11px] text-muted">Total Produk</p>
            </div>
          </div>
        </div>

        <!-- Users -->
        <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <div>
              <p class="text-xl font-bold text-ink">
                {{ usersLoading ? "…" : totalUsers }}
              </p>
              <p class="text-[11px] text-muted">Pengguna Terdaftar</p>
            </div>
          </div>
        </div>

        <!-- Wishlists -->
        <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div class="flex items-center gap-3">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <div>
              <p class="text-xl font-bold text-ink">
                {{ usersLoading ? "…" : totalWishlistCount }}
              </p>
              <p class="text-[11px] text-muted">Item di-Wishlist</p>
            </div>
          </div>
        </div>

        <!-- Announcement Banner Status -->
        <div class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              :class="content?.announcement?.enabled !== false ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-400'"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.115-1.527-.452a22.25 22.25 0 01-1.393-3.843m3.055-.379a48.72 48.72 0 005.41.696m-5.41-.696a48.774 48.774 0 01-5.41-.696m10.82 1.392a48.814 48.814 0 01-5.41-.696m5.41.696c.688.06 1.386.09 2.09.09h.75a4.5 4.5 0 100-9h-.75a48.74 48.74 0 00-2.09.09" />
              </svg>
            </div>
            <div>
              <p class="text-sm font-bold text-ink">
                {{ content?.announcement?.enabled !== false ? "Aktif" : "Nonaktif" }}
              </p>
              <p class="text-[11px] text-muted">Promo Banner</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Two Columns: Top Wishlisted Perfumes & Quick Shortcuts -->
      <div class="grid lg:grid-cols-12 gap-8 mb-8">
        <!-- Top Wishlist Insight (7 cols) -->
        <div class="lg:col-span-7 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div class="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
            <div>
              <h2 class="text-base font-bold text-ink">Parfum Paling Diminati</h2>
              <p class="text-xs text-muted">Berdasarkan akumulasi wishlist pembeli</p>
            </div>
            <router-link to="/admin/users" class="text-xs font-semibold text-[#c9a227] hover:underline">
              Lihat Pengguna &rarr;
            </router-link>
          </div>

          <div v-if="usersLoading" class="py-10 text-center text-xs text-muted">
            Memuat data wishlist…
          </div>
          <div v-else-if="topWishlist.length === 0" class="py-10 text-center text-xs text-muted">
            Belum ada data wishlist dari pengguna.
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="(item, idx) in topWishlist"
              :key="item.id"
              class="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100/70 transition-colors"
            >
              <div class="flex items-center gap-3">
                <span class="w-6 h-6 rounded-full bg-ink text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                  {{ idx + 1 }}
                </span>
                <img v-if="item.image" :src="item.image" class="w-9 h-9 rounded-lg object-cover" />
                <span class="text-sm font-semibold text-ink">{{ item.name }}</span>
              </div>
              <div class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold">
                <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                {{ item.count }} wishlist
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Shortcuts (5 cols) -->
        <div class="lg:col-span-5 bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 class="text-base font-bold text-ink mb-1">Aksi Cepat Admin</h2>
            <p class="text-xs text-muted mb-4">Navigasi instan ke area manajemen utama</p>

            <div class="grid grid-cols-2 gap-2.5">
              <router-link
                to="/admin/hero"
                class="flex flex-col p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#c9a227]/10 hover:border-[#c9a227]/30 transition-all text-left"
              >
                <span class="text-xs font-bold text-ink">Hero Section</span>
                <span class="text-[10px] text-muted mt-0.5">Edit visual landing</span>
              </router-link>

              <router-link
                to="/admin/products"
                class="flex flex-col p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#c9a227]/10 hover:border-[#c9a227]/30 transition-all text-left"
              >
                <span class="text-xs font-bold text-ink">Produk & Landing</span>
                <span class="text-[10px] text-muted mt-0.5">Atur kurasi katalog</span>
              </router-link>

              <router-link
                to="/admin/philosophy"
                class="flex flex-col p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#c9a227]/10 hover:border-[#c9a227]/30 transition-all text-left"
              >
                <span class="text-xs font-bold text-ink">Philosophy</span>
                <span class="text-[10px] text-muted mt-0.5">Cerita brand & narasi</span>
              </router-link>

              <router-link
                to="/admin/standards"
                class="flex flex-col p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#c9a227]/10 hover:border-[#c9a227]/30 transition-all text-left"
              >
                <span class="text-xs font-bold text-ink">Standar Card</span>
                <span class="text-[10px] text-muted mt-0.5">Maison standards</span>
              </router-link>

              <router-link
                to="/admin/users"
                class="flex flex-col p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#c9a227]/10 hover:border-[#c9a227]/30 transition-all text-left"
              >
                <span class="text-xs font-bold text-ink">Data Pengguna</span>
                <span class="text-[10px] text-muted mt-0.5">Daftar user & wishlist</span>
              </router-link>

              <router-link
                to="/admin/settings"
                class="flex flex-col p-3 rounded-xl border border-gray-100 bg-gray-50 hover:bg-[#c9a227]/10 hover:border-[#c9a227]/30 transition-all text-left"
              >
                <span class="text-xs font-bold text-ink">Pengaturan</span>
                <span class="text-[10px] text-muted mt-0.5">Banner, Header, Footer</span>
              </router-link>
            </div>
          </div>

          <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-muted">
            <span>Versi Antarmuka</span>
            <span class="font-semibold text-ink">Fegance Atelier v2.0</span>
          </div>
        </div>
      </div>

      <!-- Recent Products Table -->
      <div class="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div class="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 class="text-base font-bold text-ink">Produk Terbaru</h2>
          <router-link to="/admin/products" class="text-xs font-semibold text-[#c9a227] hover:underline">
            Semua Produk &rarr;
          </router-link>
        </div>

        <div v-if="productsLoading" class="px-6 py-10 text-center text-xs text-muted">
          Memuat produk…
        </div>

        <table v-else class="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50/50 text-[11px] font-semibold uppercase tracking-wider text-muted">
              <th class="px-6 py-3">Nama Parfum</th>
              <th class="px-6 py-3">Harga</th>
              <th class="px-6 py-3">Kategori / Family</th>
              <th class="px-6 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="product in recentProducts" :key="product.id" class="hover:bg-gray-50/70 transition-colors">
              <td class="px-6 py-3.5 font-medium text-ink flex items-center gap-3">
                <img :src="product.image" class="w-8 h-8 rounded-lg object-cover" />
                <span>{{ product.name }}</span>
              </td>
              <td class="px-6 py-3.5 text-gray-700 font-semibold">
                {{ formatPrice(product.price) }}
              </td>
              <td class="px-6 py-3.5 text-muted capitalize">
                {{ product.family }} &middot; {{ product.size }}
              </td>
              <td class="px-6 py-3.5 text-right">
                <router-link
                  :to="`/product/${product.slug}`"
                  target="_blank"
                  class="text-xs text-muted hover:text-ink font-medium mr-3"
                >
                  Preview
                </router-link>
                <router-link
                  to="/admin/products"
                  class="text-xs text-[#c9a227] hover:underline font-semibold"
                >
                  Edit
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
