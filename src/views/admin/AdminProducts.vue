<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProducts, type FirestoreProduct } from '@/composables/useProducts'

const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts()

const activeTab = ref<'catalog' | 'landing'>('catalog')
const searchQuery = ref('')
const showModal = ref(false)
const editingProduct = ref<FirestoreProduct | null>(null)
const saving = ref(false)
const deleteTarget = ref<FirestoreProduct | null>(null)

type Family = 'woody' | 'floral' | 'fresh' | 'oriental' | 'citrus'
const families: { value: Family; label: string }[] = [
  { value: 'woody', label: 'Woody' },
  { value: 'floral', label: 'Floral' },
  { value: 'fresh', label: 'Fresh' },
  { value: 'oriental', label: 'Oriental' },
  { value: 'citrus', label: 'Citrus' },
]

const categories = [
  'Eau de Cologne',
  'Eau de Toilette',
  'Eau de Parfum',
  'Eau de Parfum Intense',
  'Extrait de Parfum',
]

function freshForm() {
  return {
    name: '',
    slug: '',
    price: 0,
    image: '',
    gallery1: '',
    gallery2: '',
    gallery3: '',
    shortDescription: '',
    description: '',
    category: 'Eau de Parfum',
    family: 'woody' as Family,
    size: '50 ml',
    topNotes: [] as string[],
    middleNotes: [] as string[],
    baseNotes: [] as string[],
    shopeeLink: '',
    tiktokLink: '',
    whatsappLink: '',
    performance: { type: '', sillage: '', projection: '', longevity: '' },
    isNew: false,
    isBestseller: false,
    showOnLanding: true,
    landingOrder: 1,
  }
}

const form = ref(freshForm())
const topNotesInput = ref('')
const middleNotesInput = ref('')
const baseNotesInput = ref('')

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return products.value
  const q = searchQuery.value.toLowerCase()
  return products.value.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.family.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  )
})

const landingProducts = computed(() => {
  return [...products.value].sort((a, b) => (a.landingOrder ?? 99) - (b.landingOrder ?? 99))
})

const landingActiveCount = computed(() => {
  return products.value.filter((p) => p.showOnLanding !== false).length
})

function generateSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function onNameChange() {
  if (!editingProduct.value) {
    form.value.slug = generateSlug(form.value.name)
  }
}

function parseNotes(raw: string): string[] {
  return raw
    .split(',')
    .map((n) => n.trim())
    .filter(Boolean)
}

function openAdd() {
  editingProduct.value = null
  form.value = freshForm()
  topNotesInput.value = ''
  middleNotesInput.value = ''
  baseNotesInput.value = ''
  showModal.value = true
}

function openEdit(product: FirestoreProduct) {
  editingProduct.value = product
  const g = product.gallery || []
  form.value = {
    name: product.name,
    slug: product.slug,
    price: product.price,
    image: product.image,
    gallery1: g[0] || '',
    gallery2: g[1] || '',
    gallery3: g[2] || '',
    shortDescription: product.shortDescription,
    description: product.description,
    category: product.category,
    family: product.family,
    size: product.size,
    topNotes: [...(product.topNotes || [])],
    middleNotes: [...(product.middleNotes || [])],
    baseNotes: [...(product.baseNotes || [])],
    shopeeLink: product.shopeeLink || '',
    tiktokLink: product.tiktokLink || '',
    whatsappLink: product.whatsappLink || '',
    performance: { ...(product.performance || { type: '', sillage: '', projection: '', longevity: '' }) },
    isNew: product.isNew || false,
    isBestseller: product.isBestseller || false,
    showOnLanding: product.showOnLanding !== false,
    landingOrder: product.landingOrder ?? 1,
  }
  topNotesInput.value = (product.topNotes || []).join(', ')
  middleNotesInput.value = (product.middleNotes || []).join(', ')
  baseNotesInput.value = (product.baseNotes || []).join(', ')
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingProduct.value = null
}

async function handleSave() {
  saving.value = true
  try {
    const galleryArray = [form.value.gallery1, form.value.gallery2, form.value.gallery3]
      .map((url) => url.trim())
      .filter(Boolean)

    const data = {
      name: form.value.name,
      slug: form.value.slug || generateSlug(form.value.name),
      price: Number(form.value.price) || 0,
      image: form.value.image,
      gallery: galleryArray,
      shortDescription: form.value.shortDescription,
      description: form.value.description,
      category: form.value.category,
      family: form.value.family,
      size: form.value.size,
      topNotes: parseNotes(topNotesInput.value),
      middleNotes: parseNotes(middleNotesInput.value),
      baseNotes: parseNotes(baseNotesInput.value),
      shopeeLink: form.value.shopeeLink,
      tiktokLink: form.value.tiktokLink,
      whatsappLink: form.value.whatsappLink,
      performance: { ...form.value.performance },
      isNew: form.value.isNew,
      isBestseller: form.value.isBestseller,
      showOnLanding: form.value.showOnLanding,
      landingOrder: Number(form.value.landingOrder) || 1,
    }

    if (editingProduct.value) {
      await updateProduct(editingProduct.value.id, data)
    } else {
      await addProduct(data as any)
    }
    closeModal()
  } finally {
    saving.value = false
  }
}

async function toggleLanding(product: FirestoreProduct) {
  const current = product.showOnLanding !== false
  await updateProduct(product.id, { showOnLanding: !current })
}

async function toggleBestseller(product: FirestoreProduct) {
  await updateProduct(product.id, { isBestseller: !product.isBestseller })
}

async function handleOrderChange(product: FirestoreProduct, event: Event) {
  const target = event.target as HTMLInputElement
  const val = parseInt(target.value, 10)
  if (!isNaN(val)) {
    await updateProduct(product.id, { landingOrder: val })
  }
}

function confirmDelete(product: FirestoreProduct) {
  deleteTarget.value = product
}

function cancelDelete() {
  deleteTarget.value = null
}

async function handleDelete() {
  if (!deleteTarget.value) return
  await deleteProduct(deleteTarget.value.id)
  deleteTarget.value = null
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(price)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-8 sm:py-10">
    <div class="mx-auto max-w-6xl">
      <!-- Header -->
      <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span class="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a227] block mb-1">
            Katalog & Kurasi
          </span>
          <h1 class="text-2xl sm:text-3xl font-bold text-ink">Manajemen Produk</h1>
          <p class="text-xs sm:text-sm text-muted mt-1">Kelola katalog parfum lengkap dan atur kurasi yang tampil pada landing page</p>
        </div>
        <button
          class="inline-flex items-center gap-2 rounded-xl bg-[#c9a227] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[#b8921f] cursor-pointer self-start sm:self-auto"
          @click="openAdd"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Tambah Parfum Baru
        </button>
      </div>

      <!-- Tab Bar -->
      <div class="mb-6 flex gap-2 border-b border-gray-200 pb-3 overflow-x-auto">
        <button
          @click="activeTab = 'catalog'"
          class="px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap"
          :class="activeTab === 'catalog' ? 'bg-[#111111] text-white shadow-sm' : 'bg-white text-muted hover:text-ink border border-gray-200'"
        >
          Semua Produk ({{ products.length }})
        </button>
        <button
          @click="activeTab = 'landing'"
          class="px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
          :class="activeTab === 'landing' ? 'bg-[#c9a227] text-white shadow-sm' : 'bg-white text-muted hover:text-ink border border-gray-200'"
        >
          Tampilan Landing Page
          <span
            class="px-2 py-0.5 rounded-full text-[10px] font-bold"
            :class="activeTab === 'landing' ? 'bg-white text-[#c9a227]' : 'bg-gray-100 text-gray-700'"
          >
            {{ landingActiveCount }} aktif
          </span>
        </button>
      </div>

      <!-- TAB 1: SEMUA PRODUK (KATALOG) -->
      <template v-if="activeTab === 'catalog'">
        <!-- Search -->
        <div class="mb-6">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari berdasarkan nama, aroma, atau kategori…"
            class="w-full max-w-md rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs sm:text-sm text-[#111111] shadow-sm placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
          />
        </div>

        <!-- Loading -->
        <div v-if="loading" class="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center text-sm text-gray-400 shadow-sm">
          <svg class="mx-auto mb-3 h-6 w-6 animate-spin text-[#c9a227]" viewBox="0 0 24 24" fill="none">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Memuat katalog produk…
        </div>

        <!-- Empty -->
        <div v-else-if="filteredProducts.length === 0 && !searchQuery" class="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center text-sm text-gray-400 shadow-sm">
          Belum ada produk. Klik "Tambah Parfum Baru" untuk membuat produk pertama.
        </div>

        <div v-else-if="filteredProducts.length === 0 && searchQuery" class="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center text-sm text-gray-400 shadow-sm">
          Tidak ada produk yang cocok dengan pencarian "{{ searchQuery }}".
        </div>

        <!-- Desktop Table -->
        <div v-else class="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr class="border-b border-gray-100 bg-gray-50/50 text-[11px] font-semibold uppercase tracking-wider text-muted">
                <th class="px-6 py-3">Produk</th>
                <th class="px-6 py-3">Kategori</th>
                <th class="px-6 py-3">Family</th>
                <th class="px-6 py-3">Harga</th>
                <th class="px-6 py-3">Badges</th>
                <th class="px-6 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="product in filteredProducts" :key="product.id" class="hover:bg-gray-50/70 transition-colors">
                <td class="px-6 py-3.5">
                  <div class="flex items-center gap-3">
                    <img :src="product.image" :alt="product.name" class="h-10 w-10 shrink-0 rounded-lg object-cover" />
                    <div>
                      <p class="font-bold text-ink">{{ product.name }}</p>
                      <p class="text-[11px] text-muted">{{ product.size }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-3.5 text-muted">{{ product.category }}</td>
                <td class="px-6 py-3.5 capitalize text-muted">{{ product.family }}</td>
                <td class="px-6 py-3.5 font-bold text-ink">{{ formatPrice(product.price) }}</td>
                <td class="px-6 py-3.5">
                  <div class="flex flex-wrap gap-1">
                    <span v-if="product.isNew" class="rounded px-1.5 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-600">New</span>
                    <span v-if="product.isBestseller" class="rounded px-1.5 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700">Best Seller</span>
                  </div>
                </td>
                <td class="px-6 py-3.5 text-right space-x-2">
                  <router-link :to="`/product/${product.slug}`" target="_blank" class="text-xs text-muted hover:text-ink font-medium">
                    Lihat
                  </router-link>
                  <button class="text-xs font-semibold text-[#c9a227] hover:underline cursor-pointer" @click="openEdit(product)">
                    Edit
                  </button>
                  <button class="text-xs font-semibold text-red-500 hover:underline cursor-pointer" @click="confirmDelete(product)">
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile List -->
        <div class="space-y-3 md:hidden">
          <div v-for="product in filteredProducts" :key="product.id" class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <img :src="product.image" class="w-12 h-12 rounded-xl object-cover shrink-0" />
              <div>
                <h4 class="font-bold text-ink text-sm">{{ product.name }}</h4>
                <p class="text-xs text-muted">{{ formatPrice(product.price) }} &middot; {{ product.family }}</p>
              </div>
            </div>
            <div class="flex items-center gap-1">
              <button @click="openEdit(product)" class="p-2 text-[#c9a227] hover:bg-amber-50 rounded-lg">
                Edit
              </button>
              <button @click="confirmDelete(product)" class="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                Hapus
              </button>
            </div>
          </div>
        </div>
      </template>

      <!-- TAB 2: TAMPILAN LANDING PAGE -->
      <template v-else-if="activeTab === 'landing'">
        <div class="rounded-2xl border border-amber-200 bg-amber-50/60 p-4 mb-6 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
          <svg class="w-5 h-5 text-[#c9a227] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <div>
            <strong>Pengaturan Kurasi Halaman Depan:</strong>
            Atur parfum mana saja yang ditampilkan di section <em>Featured Collection</em> pada landing page. Anda dapat menyalakan/mematikan visibilitas langsung, mengatur nomor urut tampil, dan memilih badge Best Seller.
          </div>
        </div>

        <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <table class="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr class="border-b border-gray-100 bg-gray-50/50 text-[11px] font-semibold uppercase tracking-wider text-muted">
                <th class="px-6 py-3.5">Parfum</th>
                <th class="px-6 py-3.5 text-center">Tampil di Landing</th>
                <th class="px-6 py-3.5 text-center">Urutan Tampil</th>
                <th class="px-6 py-3.5 text-center">Best Seller</th>
                <th class="px-6 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="product in landingProducts" :key="product.id" class="hover:bg-gray-50/70 transition-colors">
                <!-- Info -->
                <td class="px-6 py-3.5">
                  <div class="flex items-center gap-3">
                    <img :src="product.image" class="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div>
                      <p class="font-bold text-ink">{{ product.name }}</p>
                      <p class="text-[11px] text-muted">{{ formatPrice(product.price) }}</p>
                    </div>
                  </div>
                </td>

                <!-- Toggle Landing -->
                <td class="px-6 py-3.5 text-center">
                  <button
                    type="button"
                    @click="toggleLanding(product)"
                    class="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                    :class="product.showOnLanding !== false ? 'bg-[#c9a227]' : 'bg-gray-200'"
                  >
                    <span
                      class="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                      :class="product.showOnLanding !== false ? 'translate-x-5' : 'translate-x-0'"
                    />
                  </button>
                </td>

                <!-- Order Input -->
                <td class="px-6 py-3.5 text-center">
                  <input
                    type="number"
                    :value="product.landingOrder ?? 1"
                    @change="handleOrderChange(product, $event)"
                    min="1"
                    class="w-16 px-2 py-1 text-center rounded-lg border border-gray-200 text-xs font-bold text-ink focus:border-[#c9a227] focus:outline-none"
                  />
                </td>

                <!-- Toggle Bestseller -->
                <td class="px-6 py-3.5 text-center">
                  <button
                    type="button"
                    @click="toggleBestseller(product)"
                    class="px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer"
                    :class="product.isBestseller ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-400 hover:text-gray-700'"
                  >
                    {{ product.isBestseller ? '★ Ya (Best Seller)' : '—' }}
                  </button>
                </td>

                <!-- Status Badge -->
                <td class="px-6 py-3.5 text-right">
                  <span
                    v-if="product.showOnLanding !== false"
                    class="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700"
                  >
                    Aktif di Landing
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-500"
                  >
                    Disembunyikan
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm" @click.self="closeModal">
        <div class="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
          <div class="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
            <h2 class="text-lg font-bold text-ink">
              {{ editingProduct ? 'Edit Parfum' : 'Tambah Parfum Baru' }}
            </h2>
            <button @click="closeModal" class="text-muted hover:text-ink p-1">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form @submit.prevent="handleSave" class="space-y-5">
            <!-- Basic info -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold text-ink mb-1">Nama Parfum</label>
                <input v-model="form.name" @input="onNameChange" type="text" required class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-ink mb-1">Slug URL</label>
                <input v-model="form.slug" type="text" required class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none font-mono" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label class="block text-xs font-semibold text-ink mb-1">Harga (IDR)</label>
                <input v-model.number="form.price" type="number" required class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-ink mb-1">Ukuran Botol</label>
                <input v-model="form.size" type="text" placeholder="e.g. 50 ml" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-ink mb-1">Aroma Family</label>
                <select v-model="form.family" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none">
                  <option v-for="f in families" :key="f.value" :value="f.value">{{ f.label }}</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold text-ink mb-1">Kategori</label>
              <select v-model="form.category" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none">
                <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-semibold text-ink mb-1">Deskripsi Singkat</label>
              <input v-model="form.shortDescription" type="text" placeholder="Ringkasan aroma 1 kalimat…" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
            </div>

            <div>
              <label class="block text-xs font-semibold text-ink mb-1">Deskripsi Lengkap / Cerita Parfum</label>
              <textarea v-model="form.description" rows="3" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
            </div>

            <!-- Notes -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-semibold text-ink mb-1">Top Notes (pisahkan koma)</label>
                <input v-model="topNotesInput" type="text" placeholder="Bergamot, Lemon" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-ink mb-1">Middle Notes</label>
                <input v-model="middleNotesInput" type="text" placeholder="Rose, Jasmine" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-ink mb-1">Base Notes</label>
                <input v-model="baseNotesInput" type="text" placeholder="Amber, Musk" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
              </div>
            </div>

            <!-- Image & Galleries -->
            <div>
              <label class="block text-xs font-semibold text-ink mb-1">URL Foto Utama</label>
              <input v-model="form.image" type="url" required placeholder="https://…" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
              <img v-if="form.image" :src="form.image" class="mt-2 h-16 w-16 rounded-lg object-cover" />
            </div>

            <!-- Marketplace Links -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label class="block text-xs font-semibold text-ink mb-1">Link Shopee</label>
                <input v-model="form.shopeeLink" type="url" placeholder="https://shopee.co.id/…" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-ink mb-1">Link WhatsApp</label>
                <input v-model="form.whatsappLink" type="url" placeholder="https://wa.me/…" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-ink mb-1">Link TikTok</label>
                <input v-model="form.tiktokLink" type="url" placeholder="https://tiktok.com/…" class="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs text-ink focus:border-[#c9a227] focus:outline-none" />
              </div>
            </div>

            <!-- Landing Options & Flags -->
            <div class="p-4 rounded-xl bg-gray-50 space-y-3">
              <span class="text-xs font-bold uppercase tracking-wider text-muted block">Pengaturan Tampilan Landing</span>
              <div class="flex flex-wrap gap-5">
                <label class="inline-flex items-center gap-2 text-xs font-semibold text-ink cursor-pointer">
                  <input v-model="form.showOnLanding" type="checkbox" class="h-4 w-4 rounded text-[#c9a227]" />
                  Tampilkan di Landing Page
                </label>
                <label class="inline-flex items-center gap-2 text-xs font-semibold text-ink cursor-pointer">
                  <input v-model="form.isBestseller" type="checkbox" class="h-4 w-4 rounded text-[#c9a227]" />
                  Tandai Best Seller
                </label>
                <label class="inline-flex items-center gap-2 text-xs font-semibold text-ink cursor-pointer">
                  <input v-model="form.isNew" type="checkbox" class="h-4 w-4 rounded text-[#c9a227]" />
                  Tandai Produk Baru
                </label>
              </div>
              <div class="pt-2">
                <label class="block text-xs font-semibold text-muted mb-1">Urutan Tampil di Landing</label>
                <input v-model.number="form.landingOrder" type="number" min="1" class="w-24 px-3 py-1.5 rounded-lg border border-gray-200 text-xs text-ink font-bold" />
              </div>
            </div>

            <!-- Submit buttons -->
            <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button type="button" @click="closeModal" class="px-4 py-2 rounded-xl text-xs font-semibold text-muted hover:text-ink">
                Batal
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="px-5 py-2.5 rounded-xl bg-[#c9a227] text-white text-xs font-semibold hover:bg-[#b8921f] disabled:opacity-60 cursor-pointer"
              >
                {{ saving ? 'Menyimpan…' : (editingProduct ? 'Simpan Perubahan' : 'Tambah Produk') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Delete Modal -->
    <Teleport to="body">
      <div v-if="deleteTarget" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm" @click.self="cancelDelete">
        <div class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
          <h3 class="text-base font-bold text-ink">Hapus Produk</h3>
          <p class="mt-2 text-xs text-muted leading-relaxed">
            Apakah Anda yakin ingin menghapus parfum <strong>{{ deleteTarget.name }}</strong>? Tindakan ini tidak dapat dibatalkan.
          </p>
          <div class="mt-6 flex justify-end gap-3">
            <button @click="cancelDelete" class="px-4 py-2 rounded-xl border border-gray-200 text-xs font-medium text-muted hover:text-ink">
              Batal
            </button>
            <button @click="handleDelete" class="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
