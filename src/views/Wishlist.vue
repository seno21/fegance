<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import AnnouncementBar from "@/components/AnnouncementBar.vue";
import Navbar from "@/components/Navbar.vue";
import FooterSection from "@/components/FooterSection.vue";
import { useWishlist } from "@/composables/useWishlist";
import { useUserAuth } from "@/composables/useUserAuth";

const router = useRouter();
const { wishlistItems, loading, removeFromWishlist } = useWishlist();
const { user, userProfile } = useUserAuth();

function formatPrice(n: number) {
  return "Rp " + n.toLocaleString("id-ID");
}

const totalPrice = computed(() => {
  return wishlistItems.value.reduce((acc, item) => acc + (item.price || 0), 0);
});

function getShopeeLink(item: (typeof wishlistItems.value)[0]) {
  return item.shopeeLink || "https://shopee.co.id";
}

function getWhatsAppItemLink(item: (typeof wishlistItems.value)[0]) {
  const phone = "6285172372101";
  const text = encodeURIComponent(
    `Halo Fegance, saya tertarik memesan parfum ${item.name} (${formatPrice(item.price)}) dari wishlist saya.`
  );
  return `https://wa.me/${phone}?text=${text}`;
}

function getWhatsAppCheckoutAllLink() {
  const phone = "6285172372101";
  const itemsText = wishlistItems.value
    .map((item, idx) => `${idx + 1}. ${item.name} - ${formatPrice(item.price)}`)
    .join("\n");
  const text = encodeURIComponent(
    `Halo Fegance, saya ingin memesan daftar parfum dari wishlist saya:\n\n${itemsText}\n\nTotal Perkiraan: ${formatPrice(
      totalPrice.value
    )}\n\nMohon info ketersediaan stok & cara pemesanannya ya, terima kasih!`
  );
  return `https://wa.me/${phone}?text=${text}`;
}

function goToDetail(slug: string) {
  router.push({ name: "product-detail", params: { slug } });
}

function goToProducts() {
  router.push("/product");
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-canvas">
    <AnnouncementBar />
    <Navbar />

    <main class="flex-1 py-10 sm:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Breadcrumb / Header -->
        <div class="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span class="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a227] block mb-2">
            Pilihan Impianmu
          </span>
          <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-ink tracking-tight">
            Daftar Wishlist
          </h1>
          <p class="mt-3 text-xs sm:text-sm text-muted">
            <span v-if="user">Disimpan untuk {{ userProfile?.displayName || user.email }}</span>
            <span v-else>Daftar parfum favorit yang siap kamu bawa pulang</span>
          </p>
          <div class="w-12 h-[2px] bg-[#c9a227] mx-auto mt-4" />
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="py-20 text-center text-sm text-faint">
          <svg class="mx-auto mb-3 h-6 w-6 animate-spin text-[#c9a227]" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Memuat wishlist Anda…
        </div>

        <!-- Empty State -->
        <div
          v-else-if="wishlistItems.length === 0"
          class="max-w-md mx-auto text-center py-16 px-6 bg-white/70 backdrop-blur rounded-[28px] border border-line shadow-soft"
        >
          <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[#c9a227]/10 flex items-center justify-center text-[#c9a227]">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
          </div>
          <h2 class="font-display text-xl font-bold text-ink mb-2">Wishlist Anda Masih Kosong</h2>
          <p class="text-xs text-muted leading-relaxed mb-6">
            Jelajahi koleksi racikan wewangian Maison Fegance dan ketuk ikon hati pada parfum yang mencerminkan karaktermu.
          </p>
          <button
            @click="goToProducts"
            class="px-6 py-3 rounded-pill bg-ink text-canvas font-semibold text-xs tracking-wider uppercase hover:bg-black transition-all shadow-soft cursor-pointer"
          >
            Jelajahi Koleksi Parfum
          </button>
        </div>

        <!-- Wishlist Content -->
        <div v-else class="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <!-- Item List (8 cols) -->
          <div class="lg:col-span-8 space-y-4">
            <div
              v-for="item in wishlistItems"
              :key="item.productId"
              class="group bg-white rounded-2xl border border-line p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 shadow-sm hover:shadow-soft transition-all"
            >
              <!-- Thumbnail -->
              <div
                @click="goToDetail(item.slug)"
                class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-surface shrink-0 cursor-pointer relative"
              >
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <!-- Details -->
              <div class="flex-1 text-center sm:text-left">
                <span v-if="item.category" class="text-[10px] tracking-widest uppercase text-faint block mb-1">
                  {{ item.category }}
                </span>
                <h3
                  @click="goToDetail(item.slug)"
                  class="font-display text-lg sm:text-xl font-bold text-ink hover:text-[#c9a227] transition-colors cursor-pointer"
                >
                  {{ item.name }}
                </h3>
                <p class="text-base font-bold text-ink mt-1">
                  {{ formatPrice(item.price) }}
                </p>
              </div>

              <!-- Actions -->
              <div class="flex sm:flex-col gap-2 w-full sm:w-auto shrink-0">
                <!-- Shopee Button -->
                <a
                  :href="getShopeeLink(item)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#ee4d2d] text-white text-xs font-semibold hover:bg-[#d73211] transition-colors shadow-sm"
                >
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19.78 6.42A2 2 0 0 0 18.23 5h-2.31A5.94 5.94 0 0 0 12 1a5.94 5.94 0 0 0-3.92 4H5.77a2 2 0 0 0-1.55 1.42L2 19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2zM12 3a3.94 3.94 0 0 1 3.86 3H8.14A3.94 3.94 0 0 1 12 3zm-1.8 8.8a1.8 1.8 0 0 1 3.6 0c0 .9-.6 1.4-1.2 1.7l-.4.2c-.7.4-.9.7-.9 1.3h-1.5c0-1.1.6-1.7 1.4-2.1l.4-.2c.5-.3.7-.5.7-.9a.8.8 0 0 0-1.6 0H10.2zm1.8 6.2a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                  </svg>
                  Shopee
                </a>

                <!-- WhatsApp Button -->
                <a
                  :href="getWhatsAppItemLink(item)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#25D366] text-white text-xs font-semibold hover:bg-[#1ebc59] transition-colors shadow-sm"
                >
                  <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                  Chat WA
                </a>

                <!-- Remove Button -->
                <button
                  type="button"
                  @click="removeFromWishlist(item.productId)"
                  class="p-2 text-faint hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center"
                  title="Hapus dari wishlist"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Checkout / Action Card (4 cols) -->
          <div class="lg:col-span-4">
            <div class="bg-white rounded-2xl border border-line p-6 shadow-soft sticky top-24">
              <h2 class="font-display text-lg font-bold text-ink mb-4 pb-3 border-b border-line">
                Ringkasan Wishlist
              </h2>

              <div class="space-y-3 text-sm mb-6">
                <div class="flex justify-between text-muted">
                  <span>Jumlah Parfum</span>
                  <span class="font-semibold text-ink">{{ wishlistItems.length }} botol</span>
                </div>
                <div class="flex justify-between text-muted">
                  <span>Metode Belanja</span>
                  <span class="font-medium text-ink">Shopee & WhatsApp</span>
                </div>
                <div class="pt-3 border-t border-line flex justify-between text-base">
                  <span class="font-semibold text-ink">Total Estimasi</span>
                  <span class="font-display font-bold text-ink text-lg">{{ formatPrice(totalPrice) }}</span>
                </div>
              </div>

              <!-- Main Checkout All via WhatsApp Button -->
              <a
                :href="getWhatsAppCheckoutAllLink()"
                target="_blank"
                rel="noopener noreferrer"
                class="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-pill bg-[#25D366] hover:bg-[#1ebc59] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lift cursor-pointer text-center"
              >
                <svg class="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                </svg>
                Pesan Semua via WhatsApp
              </a>

              <p class="text-[11px] text-faint text-center mt-3 leading-relaxed">
                Pesan WhatsApp akan otomatis terisi daftar parfum & estimasi total harga untuk konsultasi dengan admin Fegance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <FooterSection />
  </div>
</template>
