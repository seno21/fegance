<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

interface UserRecord {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  role?: string;
  createdAt?: any;
  wishlistCount: number;
  wishlistItems?: any[];
}

interface ProductRanking {
  id: string;
  name: string;
  image?: string;
  price?: number;
  count: number;
}

const users = ref<UserRecord[]>([]);
const topProducts = ref<ProductRanking[]>([]);
const loading = ref(true);
const searchQuery = ref("");
const selectedUser = ref<UserRecord | null>(null);

async function loadData() {
  loading.value = true;
  try {
    const snap = await getDocs(collection(db, "users"));
    const list: UserRecord[] = [];
    const productCountMap: { [pId: string]: ProductRanking } = {};

    for (const uDoc of snap.docs) {
      const uData = uDoc.data();
      const wishSnap = await getDocs(collection(db, "users", uDoc.id, "wishlist"));
      const items = wishSnap.docs.map((d: any) => ({ productId: d.id, ...(d.data() as any) }));

      list.push({
        uid: uDoc.id,
        email: uData.email || "—",
        displayName: uData.displayName || "Pelanggan",
        photoURL: uData.photoURL || "",
        role: uData.role || "user",
        createdAt: uData.createdAt,
        wishlistCount: wishSnap.size,
        wishlistItems: items,
      });

      for (const item of items) {
        const id = String(item.productId);
        if (!productCountMap[id]) {
          productCountMap[id] = {
            id,
            name: item.name || "Parfum #" + id,
            image: item.image || "",
            price: item.price || 0,
            count: 0,
          };
        }
        productCountMap[id]!.count += 1;
      }
    }

    users.value = list;
    topProducts.value = Object.values(productCountMap)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  } catch (err) {
    console.error("Error loading users and wishlist:", err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadData();
});

const filteredUsers = computed(() => {
  if (!searchQuery.value.trim()) return users.value;
  const q = searchQuery.value.toLowerCase();
  return users.value.filter(
    (u) =>
      u.displayName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q)
  );
});

const totalWishlistCount = computed(() => {
  return users.value.reduce((acc, u) => acc + u.wishlistCount, 0);
});

function formatPrice(n?: number) {
  if (!n) return "—";
  return "Rp " + n.toLocaleString("id-ID");
}

function formatDate(ts: any) {
  if (!ts) return "—";
  if (ts.toDate) return ts.toDate().toLocaleDateString("id-ID");
  if (ts.seconds) return new Date(ts.seconds * 1000).toLocaleDateString("id-ID");
  return String(ts);
}

function openUserWishlist(u: UserRecord) {
  selectedUser.value = u;
}

function closeUserWishlist() {
  selectedUser.value = null;
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-8 sm:py-10">
    <div class="mx-auto max-w-6xl">
      <!-- Header -->
      <div class="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a227] block mb-1">
            Manajemen Komunitas
          </span>
          <h1 class="text-2xl sm:text-3xl font-bold text-ink">Pengguna & Wishlist</h1>
          <p class="text-xs sm:text-sm text-muted mt-1">
            Data pengguna terdaftar dan analitik minat parfum untuk keputusan persediaan dan promosi
          </p>
        </div>

        <button
          @click="loadData"
          :disabled="loading"
          class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-gray-200 text-xs font-semibold text-ink hover:bg-gray-50 shadow-sm transition-all cursor-pointer self-start sm:self-auto"
        >
          <svg class="w-4 h-4" :class="{ 'animate-spin': loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Segarkan Data
        </button>
      </div>

      <!-- Quick Metrics -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p class="text-xs font-medium text-muted">Total Pengguna Terdaftar</p>
          <p class="text-2xl font-bold text-ink mt-1">
            {{ loading ? "…" : users.length }}
          </p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p class="text-xs font-medium text-muted">Total Item di-Wishlist</p>
          <p class="text-2xl font-bold text-[#c9a227] mt-1">
            {{ loading ? "…" : totalWishlistCount }}
          </p>
        </div>
        <div class="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <p class="text-xs font-medium text-muted">Rata-rata Wishlist/Pengguna</p>
          <p class="text-2xl font-bold text-ink mt-1">
            {{ loading || users.length === 0 ? "0" : (totalWishlistCount / users.length).toFixed(1) }}
          </p>
        </div>
      </div>

      <!-- Top Wishlisted Perfumes Insight -->
      <div class="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-8">
        <div class="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <h2 class="text-sm font-bold text-ink">5 Parfum Paling Diminati Pengguna</h2>
          <span class="text-xs text-muted">Urutan berdasarkan jumlah love di wishlist</span>
        </div>

        <div v-if="loading" class="py-8 text-center text-xs text-muted">
          Memuat data analitik…
        </div>
        <div v-else-if="topProducts.length === 0" class="py-8 text-center text-xs text-muted">
          Belum ada aktivitas wishlist dari pengguna.
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-5 gap-3">
          <div
            v-for="(prod, i) in topProducts"
            :key="prod.id"
            class="p-3.5 rounded-xl border border-gray-100 bg-gray-50 flex flex-col items-center text-center relative"
          >
            <span class="absolute top-2 left-2 w-5 h-5 rounded-full bg-ink text-white text-[10px] font-bold flex items-center justify-center">
              {{ i + 1 }}
            </span>
            <img v-if="prod.image" :src="prod.image" class="w-14 h-14 rounded-lg object-cover mb-2" />
            <h4 class="text-xs font-bold text-ink truncate w-full">{{ prod.name }}</h4>
            <p class="text-[11px] text-[#c9a227] font-semibold mt-1">{{ prod.count }} pengguna</p>
          </div>
        </div>
      </div>

      <!-- User List Table -->
      <div class="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-base font-bold text-ink">Daftar Pengguna</h2>
            <p class="text-xs text-muted">Lihat data akun dan detail parfum yang disukai masing-masing pengguna</p>
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari nama atau email…"
            class="w-full sm:w-64 px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:border-[#c9a227] focus:outline-none"
          />
        </div>

        <div v-if="loading" class="py-12 text-center text-xs text-muted">
          Memuat daftar pengguna…
        </div>
        <div v-else-if="filteredUsers.length === 0" class="py-12 text-center text-xs text-muted">
          Tidak ada data pengguna yang ditemukan.
        </div>
        <table v-else class="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50/50 text-[11px] font-semibold uppercase tracking-wider text-muted">
              <th class="px-6 py-3.5">Nama & Profil</th>
              <th class="px-6 py-3.5">Email</th>
              <th class="px-6 py-3.5">Role</th>
              <th class="px-6 py-3.5 text-center">Jumlah Wishlist</th>
              <th class="px-6 py-3.5 text-right">Detail</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="user in filteredUsers" :key="user.uid" class="hover:bg-gray-50/70 transition-colors">
              <td class="px-6 py-3.5">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center font-bold text-xs uppercase shrink-0">
                    {{ user.displayName.charAt(0) }}
                  </div>
                  <span class="font-bold text-ink">{{ user.displayName }}</span>
                </div>
              </td>
              <td class="px-6 py-3.5 text-muted">{{ user.email }}</td>
              <td class="px-6 py-3.5">
                <span
                  class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                  :class="user.role === 'admin' ? 'bg-[#c9a227]/20 text-[#c9a227]' : 'bg-gray-100 text-gray-700'"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-3.5 text-center">
                <span class="px-2.5 py-1 rounded-full bg-red-50 text-red-600 font-bold text-xs">
                  {{ user.wishlistCount }} parfum
                </span>
              </td>
              <td class="px-6 py-3.5 text-right">
                <button
                  type="button"
                  @click="openUserWishlist(user)"
                  class="text-xs font-semibold text-[#c9a227] hover:underline cursor-pointer"
                >
                  Lihat Wishlist &rarr;
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- User Wishlist Detail Modal -->
    <Teleport to="body">
      <div
        v-if="selectedUser"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        @click.self="closeUserWishlist"
      >
        <div class="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl max-h-[85vh] overflow-y-auto">
          <div class="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
            <div>
              <h3 class="text-base font-bold text-ink">Wishlist {{ selectedUser.displayName }}</h3>
              <p class="text-xs text-muted">{{ selectedUser.email }}</p>
            </div>
            <button @click="closeUserWishlist" class="text-muted hover:text-ink p-1">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div v-if="!selectedUser.wishlistItems || selectedUser.wishlistItems.length === 0" class="py-10 text-center text-xs text-muted">
            Pengguna ini belum menyimpan parfum ke wishlist.
          </div>
          <div v-else class="space-y-3">
            <div
              v-for="item in selectedUser.wishlistItems"
              :key="item.productId"
              class="p-3 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-between gap-3"
            >
              <div class="flex items-center gap-3">
                <img :src="item.image" class="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <h4 class="text-xs font-bold text-ink">{{ item.name }}</h4>
                  <p class="text-[11px] text-muted">{{ formatPrice(item.price) }}</p>
                </div>
              </div>
              <router-link
                :to="`/product/${item.slug}`"
                target="_blank"
                class="text-xs text-[#c9a227] font-semibold hover:underline"
              >
                Buka &rarr;
              </router-link>
            </div>
          </div>

          <div class="mt-6 pt-3 border-t border-gray-100 flex justify-end">
            <button @click="closeUserWishlist" class="px-4 py-2 rounded-xl bg-ink text-white text-xs font-semibold">
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
