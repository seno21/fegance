<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProducts, type FirestoreProduct } from '@/composables/useProducts'

const { products, loading, addProduct, updateProduct, deleteProduct } = useProducts()

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

function freshForm() {
  return {
    name: '',
    slug: '',
    price: 0,
    image: '',
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
  form.value = {
    name: product.name,
    slug: product.slug,
    price: product.price,
    image: product.image,
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
    const data = {
      name: form.value.name,
      slug: form.value.slug || generateSlug(form.value.name),
      price: Number(form.value.price) || 0,
      image: form.value.image,
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
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
    <div class="mx-auto max-w-6xl">
      <!-- Header -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-[#111111]">Products</h1>
          <p class="mt-1 text-gray-500">Manage your perfume catalog</p>
        </div>
        <button
          class="inline-flex items-center gap-2 rounded-xl bg-[#c9a227] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#b8921f]"
          @click="openAdd"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Product
        </button>
      </div>

      <!-- Search -->
      <div class="mb-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name, family, or category…"
          class="w-full max-w-md rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#111111] shadow-sm placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
        />
      </div>

      <!-- Loading -->
      <div v-if="loading" class="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center text-sm text-gray-400 shadow-sm">
        <svg class="mx-auto mb-3 h-6 w-6 animate-spin text-[#c9a227]" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Loading products…
      </div>

      <!-- Empty -->
      <div v-else-if="filteredProducts.length === 0 && !searchQuery" class="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center text-sm text-gray-400 shadow-sm">
        No products yet. Click "Add Product" to create your first one.
      </div>

      <div v-else-if="filteredProducts.length === 0 && searchQuery" class="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center text-sm text-gray-400 shadow-sm">
        No products match "{{ searchQuery }}".
      </div>

      <!-- Desktop Table -->
      <div v-else class="hidden overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm md:block">
        <table class="w-full text-left text-sm">
          <thead>
            <tr class="border-b border-gray-100 text-xs font-medium uppercase tracking-wider text-gray-400">
              <th class="px-6 py-3">Product</th>
              <th class="px-6 py-3">Price</th>
              <th class="px-6 py-3">Family</th>
              <th class="px-6 py-3">Badges</th>
              <th class="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr
              v-for="(product, index) in filteredProducts"
              :key="product.id"
              :class="index % 2 === 1 ? 'bg-gray-50/50' : ''"
              class="transition-colors hover:bg-gray-50"
            >
              <td class="whitespace-nowrap px-6 py-3">
                <div class="flex items-center gap-3">
                  <img
                    :src="product.image"
                    :alt="product.name"
                    class="h-10 w-10 rounded-lg object-cover"
                  />
                  <div>
                    <p class="font-medium text-[#111111]">{{ product.name }}</p>
                    <p class="text-xs text-gray-400">{{ product.category }} · {{ product.size }}</p>
                  </div>
                </div>
              </td>
              <td class="whitespace-nowrap px-6 py-3 font-medium text-[#111111]">
                {{ formatPrice(product.price) }}
              </td>
              <td class="whitespace-nowrap px-6 py-3">
                <span class="inline-block rounded-full bg-[#c9a227]/10 px-2.5 py-0.5 text-xs font-medium text-[#c9a227] capitalize">
                  {{ product.family }}
                </span>
              </td>
              <td class="whitespace-nowrap px-6 py-3">
                <div class="flex gap-1.5">
                  <span v-if="product.isNew" class="inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    New
                  </span>
                  <span v-if="product.isBestseller" class="inline-block rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                    Bestseller
                  </span>
                </div>
              </td>
              <td class="whitespace-nowrap px-6 py-3 text-right">
                <div class="flex items-center justify-end gap-2">
                  <button
                    class="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#111111]"
                    @click="openEdit(product)"
                  >
                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    class="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                    @click="confirmDelete(product)"
                  >
                    <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div v-if="filteredProducts.length > 0" class="space-y-3 md:hidden">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div class="flex items-start gap-3">
            <img
              :src="product.image"
              :alt="product.name"
              class="h-14 w-14 rounded-xl object-cover"
            />
            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                  <p class="truncate font-medium text-[#111111]">{{ product.name }}</p>
                  <p class="text-xs text-gray-400">{{ product.category }} · {{ product.size }}</p>
                </div>
                <p class="shrink-0 text-sm font-semibold text-[#111111]">{{ formatPrice(product.price) }}</p>
              </div>
              <div class="mt-2 flex items-center gap-1.5">
                <span class="inline-block rounded-full bg-[#c9a227]/10 px-2 py-0.5 text-xs font-medium text-[#c9a227] capitalize">
                  {{ product.family }}
                </span>
                <span v-if="product.isNew" class="inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                  New
                </span>
                <span v-if="product.isBestseller" class="inline-block rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                  Bestseller
                </span>
              </div>
              <div class="mt-3 flex gap-2">
                <button
                  class="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
                  @click="openEdit(product)"
                >
                  <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                  </svg>
                  Edit
                </button>
                <button
                  class="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
                  @click="confirmDelete(product)"
                >
                  <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Product Count -->
      <p v-if="!loading && products.length > 0" class="mt-4 text-center text-xs text-gray-400">
        {{ filteredProducts.length }} of {{ products.length }} products
      </p>
    </div>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-10 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 class="text-lg font-semibold text-[#111111]">
              {{ editingProduct ? 'Edit Product' : 'Add Product' }}
            </h2>
            <button
              class="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              @click="closeModal"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Modal Body -->
          <form class="max-h-[70vh] overflow-y-auto px-6 py-5" @submit.prevent="handleSave">
            <div class="space-y-5">
              <!-- Basic Info -->
              <fieldset>
                <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Basic Info</legend>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Name *</label>
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                      @input="onNameChange"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Slug</label>
                    <input
                      v-model="form.slug"
                      type="text"
                      placeholder="auto-generated"
                      class="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Price (IDR) *</label>
                    <input
                      v-model.number="form.price"
                      type="number"
                      required
                      min="0"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Category</label>
                    <input
                      v-model="form.category"
                      type="text"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Family</label>
                    <select
                      v-model="form.family"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    >
                      <option v-for="f in families" :key="f.value" :value="f.value">{{ f.label }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Size</label>
                    <input
                      v-model="form.size"
                      type="text"
                      placeholder="e.g. 50 ml"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                </div>
              </fieldset>

              <!-- Image -->
              <fieldset>
                <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Image</legend>
                <div>
                  <label class="mb-1 block text-xs font-medium text-gray-500">Image URL</label>
                  <input
                    v-model="form.image"
                    type="url"
                    placeholder="https://…"
                    class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                  />
                  <img
                    v-if="form.image"
                    :src="form.image"
                    alt="Preview"
                    class="mt-2 h-16 w-16 rounded-lg object-cover"
                  />
                </div>
              </fieldset>

              <!-- Descriptions -->
              <fieldset>
                <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Descriptions</legend>
                <div class="space-y-4">
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Short Description</label>
                    <textarea
                      v-model="form.shortDescription"
                      rows="2"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Full Description</label>
                    <textarea
                      v-model="form.description"
                      rows="4"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                </div>
              </fieldset>

              <!-- Notes -->
              <fieldset>
                <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Fragrance Notes</legend>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Top Notes</label>
                    <input
                      v-model="topNotesInput"
                      type="text"
                      placeholder="Bergamot, Lemon"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Middle Notes</label>
                    <input
                      v-model="middleNotesInput"
                      type="text"
                      placeholder="Lavender, Rose"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Base Notes</label>
                    <input
                      v-model="baseNotesInput"
                      type="text"
                      placeholder="Amber, Musk"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                </div>
                <p class="mt-1.5 text-[11px] text-gray-400">Separate with commas</p>
              </fieldset>

              <!-- Links -->
              <fieldset>
                <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Store Links</legend>
                <div class="space-y-4">
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Shopee Link</label>
                    <input
                      v-model="form.shopeeLink"
                      type="url"
                      placeholder="https://shopee.co.id/…"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">TikTok Shop Link</label>
                    <input
                      v-model="form.tiktokLink"
                      type="url"
                      placeholder="https://shop.tiktok.com/…"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">WhatsApp Link</label>
                    <input
                      v-model="form.whatsappLink"
                      type="url"
                      placeholder="https://wa.me/…"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                </div>
              </fieldset>

              <!-- Performance -->
              <fieldset>
                <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Performance</legend>
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Type</label>
                    <input
                      v-model="form.performance.type"
                      type="text"
                      placeholder="e.g. Woody Oriental (Unisex)"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Sillage</label>
                    <input
                      v-model="form.performance.sillage"
                      type="text"
                      placeholder="e.g. Strong"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Projection</label>
                    <input
                      v-model="form.performance.projection"
                      type="text"
                      placeholder="e.g. 2 meters"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Longevity</label>
                    <input
                      v-model="form.performance.longevity"
                      type="text"
                      placeholder="e.g. 6-8 hours"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                </div>
              </fieldset>

              <!-- Flags -->
              <fieldset>
                <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Flags</legend>
                <div class="flex gap-6">
                  <label class="inline-flex items-center gap-2 text-sm text-gray-600">
                    <input
                      v-model="form.isNew"
                      type="checkbox"
                      class="h-4 w-4 rounded border-gray-300 text-[#c9a227] focus:ring-[#c9a227]/30"
                    />
                    Is New
                  </label>
                  <label class="inline-flex items-center gap-2 text-sm text-gray-600">
                    <input
                      v-model="form.isBestseller"
                      type="checkbox"
                      class="h-4 w-4 rounded border-gray-300 text-[#c9a227] focus:ring-[#c9a227]/30"
                    />
                    Is Bestseller
                  </label>
                </div>
              </fieldset>
            </div>

            <!-- Modal Footer -->
            <div class="mt-8 flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
              <button
                type="button"
                class="rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                @click="closeModal"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="saving"
                class="inline-flex items-center gap-2 rounded-xl bg-[#c9a227] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#b8921f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <svg v-if="saving" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ saving ? 'Saving…' : (editingProduct ? 'Save Changes' : 'Add Product') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <div
        v-if="deleteTarget"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
        @click.self="cancelDelete"
      >
        <div class="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
          <h3 class="text-lg font-semibold text-[#111111]">Delete Product</h3>
          <p class="mt-2 text-sm text-gray-500">
            Are you sure you want to delete <strong class="text-[#111111]">{{ deleteTarget.name }}</strong>? This action cannot be undone.
          </p>
          <div class="mt-6 flex justify-end gap-3">
            <button
              class="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
              @click="cancelDelete"
            >
              Cancel
            </button>
            <button
              class="rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              @click="handleDelete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
