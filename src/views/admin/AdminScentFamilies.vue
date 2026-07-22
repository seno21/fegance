<script setup lang="ts">
import { ref, computed } from 'vue'
import { useScentFamilies, type FirestoreScentFamily } from '@/composables/useScentFamilies'

const { families, loading, addFamily, updateFamily, deleteFamily } = useScentFamilies()

const showModal = ref(false)
const editingFamily = ref<FirestoreScentFamily | null>(null)
const saving = ref(false)
const deleteTarget = ref<FirestoreScentFamily | null>(null)

function freshForm() {
  return {
    id: '',
    name: '',
    tagline: '',
    description: '',
    image: '',
  }
}

const form = ref(freshForm())

const filteredFamilies = computed(() => {
  return [...families.value].sort((a, b) => a.name.localeCompare(b.name))
})

function openAdd() {
  editingFamily.value = null
  form.value = freshForm()
  showModal.value = true
}

function openEdit(family: FirestoreScentFamily) {
  editingFamily.value = family
  form.value = {
    id: family.id,
    name: family.name,
    tagline: family.tagline,
    description: family.description,
    image: family.image,
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingFamily.value = null
}

async function handleSave() {
  saving.value = true
  try {
    const data = {
      name: form.value.name,
      tagline: form.value.tagline,
      description: form.value.description,
      image: form.value.image,
    }

    if (editingFamily.value) {
      await updateFamily(editingFamily.value.id, data)
    } else {
      if (!form.value.id.trim()) return
      await addFamily(form.value.id.trim().toLowerCase(), data)
    }
    closeModal()
  } finally {
    saving.value = false
  }
}

function confirmDelete(family: FirestoreScentFamily) {
  deleteTarget.value = family
}

function cancelDelete() {
  deleteTarget.value = null
}

async function handleDelete() {
  if (!deleteTarget.value) return
  await deleteFamily(deleteTarget.value.id)
  deleteTarget.value = null
}

function truncate(text: string, max: number) {
  if (!text) return ''
  return text.length > max ? text.slice(0, max) + '…' : text
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
    <div class="mx-auto max-w-6xl">
      <!-- Header -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-[#111111]">Scent Families</h1>
          <p class="mt-1 text-gray-500">Manage fragrance family categories</p>
        </div>
        <button
          class="inline-flex items-center gap-2 rounded-xl bg-[#c9a227] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#b8921f]"
          @click="openAdd"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Family
        </button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center text-sm text-gray-400 shadow-sm">
        <svg class="mx-auto mb-3 h-6 w-6 animate-spin text-[#c9a227]" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Loading scent families…
      </div>

      <!-- Empty -->
      <div v-else-if="families.length === 0" class="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center text-sm text-gray-400 shadow-sm">
        No scent families yet. Click "Add Family" to create your first one.
      </div>

      <!-- Family Cards Grid -->
      <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="family in filteredFamilies"
          :key="family.id"
          class="rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
        >
          <div v-if="family.image" class="h-40 overflow-hidden rounded-t-2xl">
            <img
              :src="family.image"
              :alt="family.name"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="p-5">
            <div class="mb-1 flex items-center gap-2">
              <span class="inline-block rounded-full bg-[#c9a227]/10 px-2.5 py-0.5 text-xs font-medium text-[#c9a227]">
                {{ family.id }}
              </span>
            </div>
            <h3 class="text-lg font-semibold text-[#111111]">{{ family.name }}</h3>
            <p v-if="family.tagline" class="mt-1 text-sm text-gray-500 italic">{{ family.tagline }}</p>
            <p v-if="family.description" class="mt-2 text-sm leading-relaxed text-gray-600">
              {{ truncate(family.description, 120) }}
            </p>
            <div class="mt-4 flex gap-2">
              <button
                class="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#111111]"
                @click="openEdit(family)"
              >
                <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                </svg>
                Edit
              </button>
              <button
                class="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                @click="confirmDelete(family)"
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

      <!-- Family Count -->
      <p v-if="!loading && families.length > 0" class="mt-4 text-center text-xs text-gray-400">
        {{ families.length }} scent families
      </p>
    </div>

    <!-- Add/Edit Modal -->
    <Teleport to="body">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 px-4 py-10 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="w-full max-w-lg rounded-2xl bg-white shadow-xl">
          <!-- Modal Header -->
          <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h2 class="text-lg font-semibold text-[#111111]">
              {{ editingFamily ? 'Edit Family' : 'Add Family' }}
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
              <!-- ID (key) -->
              <div>
                <label class="mb-1 block text-xs font-medium text-gray-500">Family ID (key) *</label>
                <input
                  v-model="form.id"
                  type="text"
                  required
                  :disabled="!!editingFamily"
                  placeholder="e.g. floral, woody, citrus"
                  class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400"
                />
                <p class="mt-1 text-[11px] text-gray-400">Lowercase, no spaces. Used as the document key.</p>
              </div>

              <!-- Name -->
              <div>
                <label class="mb-1 block text-xs font-medium text-gray-500">Name *</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="e.g. Floral Bouquet"
                  class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                />
              </div>

              <!-- Tagline -->
              <div>
                <label class="mb-1 block text-xs font-medium text-gray-500">Tagline</label>
                <input
                  v-model="form.tagline"
                  type="text"
                  placeholder="e.g. Elegant & romantic"
                  class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                />
              </div>

              <!-- Description -->
              <div>
                <label class="mb-1 block text-xs font-medium text-gray-500">Description</label>
                <textarea
                  v-model="form.description"
                  rows="4"
                  placeholder="Describe this scent family…"
                  class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                />
              </div>

              <!-- Image -->
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
                  class="mt-2 h-20 w-20 rounded-xl object-cover"
                />
              </div>
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
                {{ saving ? 'Saving…' : (editingFamily ? 'Save Changes' : 'Add Family') }}
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
          <h3 class="text-lg font-semibold text-[#111111]">Delete Family</h3>
          <p class="mt-2 text-sm text-gray-500">
            Are you sure you want to delete <strong class="text-[#111111]">{{ deleteTarget.name }}</strong>? This will not remove products assigned to this family.
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
