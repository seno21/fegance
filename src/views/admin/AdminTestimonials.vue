<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTestimonials, type FirestoreTestimonial } from '@/composables/useTestimonials'

const { testimonials, loading, addTestimonial, updateTestimonial, deleteTestimonial } = useTestimonials()

const searchQuery = ref('')
const showModal = ref(false)
const editingTestimonial = ref<FirestoreTestimonial | null>(null)
const saving = ref(false)
const deleteTarget = ref<FirestoreTestimonial | null>(null)

function freshForm() {
  return {
    name: '',
    role: '',
    text: '',
    rating: 5,
    avatar: '',
  }
}

const form = ref(freshForm())

const filteredTestimonials = computed(() => {
  if (!searchQuery.value.trim()) return testimonials.value
  const q = searchQuery.value.toLowerCase()
  return testimonials.value.filter((t) => t.name.toLowerCase().includes(q))
})

function openAdd() {
  editingTestimonial.value = null
  form.value = freshForm()
  showModal.value = true
}

function openEdit(testimonial: FirestoreTestimonial) {
  editingTestimonial.value = testimonial
  form.value = {
    name: testimonial.name,
    role: testimonial.role,
    text: testimonial.text,
    rating: testimonial.rating,
    avatar: testimonial.avatar,
  }
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editingTestimonial.value = null
}

async function handleSave() {
  saving.value = true
  try {
    const data = {
      name: form.value.name,
      role: form.value.role,
      text: form.value.text,
      rating: Number(form.value.rating) || 5,
      avatar: form.value.avatar,
    }
    if (editingTestimonial.value) {
      await updateTestimonial(editingTestimonial.value.id, data)
    } else {
      await addTestimonial(data as any)
    }
    closeModal()
  } finally {
    saving.value = false
  }
}

function confirmDelete(testimonial: FirestoreTestimonial) {
  deleteTarget.value = testimonial
}

function cancelDelete() {
  deleteTarget.value = null
}

async function handleDelete() {
  if (!deleteTarget.value) return
  await deleteTestimonial(deleteTarget.value.id)
  deleteTarget.value = null
}

function truncate(text: string, max: number) {
  if (!text) return ''
  return text.length > max ? text.slice(0, max) + '…' : text
}

function renderStars(rating: number) {
  return Array.from({ length: 5 }, (_, i) => i < rating)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-6 py-10">
    <div class="mx-auto max-w-6xl">
      <!-- Header -->
      <div class="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold text-[#111111]">Testimonials</h1>
          <p class="mt-1 text-gray-500">Manage customer reviews and testimonials</p>
        </div>
        <button
          class="inline-flex items-center gap-2 rounded-xl bg-[#c9a227] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#b8921f]"
          @click="openAdd"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Testimonial
        </button>
      </div>

      <!-- Search -->
      <div class="mb-6">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name…"
          class="w-full max-w-md rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#111111] shadow-sm placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
        />
      </div>

      <!-- Loading -->
      <div v-if="loading" class="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center text-sm text-gray-400 shadow-sm">
        <svg class="mx-auto mb-3 h-6 w-6 animate-spin text-[#c9a227]" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Loading testimonials…
      </div>

      <!-- Empty -->
      <div v-else-if="filteredTestimonials.length === 0 && !searchQuery" class="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center text-sm text-gray-400 shadow-sm">
        No testimonials yet. Click "Add Testimonial" to create your first one.
      </div>

      <div v-else-if="filteredTestimonials.length === 0 && searchQuery" class="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center text-sm text-gray-400 shadow-sm">
        No testimonials match "{{ searchQuery }}".
      </div>

      <!-- Cards Grid -->
      <div v-if="!loading && filteredTestimonials.length > 0" class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div
          v-for="testimonial in filteredTestimonials"
          :key="testimonial.id"
          class="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
        >
          <div class="flex items-start gap-4">
            <img
              v-if="testimonial.avatar"
              :src="testimonial.avatar"
              :alt="testimonial.name"
              class="h-12 w-12 shrink-0 rounded-full object-cover"
            />
            <div v-else class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c9a227]/10 text-sm font-semibold text-[#c9a227]">
              {{ testimonial.name?.charAt(0)?.toUpperCase() }}
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                  <p class="truncate font-medium text-[#111111]">{{ testimonial.name }}</p>
                  <p class="text-xs text-gray-400">{{ testimonial.role }}</p>
                </div>
              </div>
              <!-- Stars -->
              <div class="mt-1.5 flex gap-0.5">
                <svg
                  v-for="(filled, i) in renderStars(testimonial.rating)"
                  :key="i"
                  class="h-3.5 w-3.5"
                  :class="filled ? 'text-[#c9a227]' : 'text-gray-200'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
          </div>

          <p class="mt-3 text-sm leading-relaxed text-gray-500">
            {{ testimonial.text }}
          </p>

          <div class="mt-4 flex gap-2 border-t border-gray-100 pt-3">
            <button
              class="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#111111]"
              @click="openEdit(testimonial)"
            >
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
              </svg>
              Edit
            </button>
            <button
              class="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
              @click="confirmDelete(testimonial)"
            >
              <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>

      <!-- Count -->
      <p v-if="!loading && testimonials.length > 0" class="mt-4 text-center text-xs text-gray-400">
        {{ filteredTestimonials.length }} of {{ testimonials.length }} testimonials
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
              {{ editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial' }}
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
              <!-- Avatar -->
              <fieldset>
                <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Avatar</legend>
                <div>
                  <label class="mb-1 block text-xs font-medium text-gray-500">Avatar URL</label>
                  <input
                    v-model="form.avatar"
                    type="url"
                    placeholder="https://…"
                    class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                  />
                  <div class="mt-2 flex items-center gap-3">
                    <img
                      v-if="form.avatar"
                      :src="form.avatar"
                      alt="Avatar preview"
                      class="h-14 w-14 rounded-full object-cover"
                      @error="form.avatar = ''"
                    />
                    <div v-else class="flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a227]/10 text-lg font-semibold text-[#c9a227]">
                      {{ form.name?.charAt(0)?.toUpperCase() || '?' }}
                    </div>
                    <span v-if="form.avatar" class="text-xs text-gray-400">Preview</span>
                  </div>
                </div>
              </fieldset>

              <!-- Info -->
              <fieldset>
                <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Info</legend>
                <div class="space-y-4">
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Name *</label>
                    <input
                      v-model="form.name"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Role</label>
                    <input
                      v-model="form.role"
                      type="text"
                      placeholder="e.g. Loyal Customer"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Rating *</label>
                    <select
                      v-model.number="form.rating"
                      class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                    >
                      <option :value="1">1 — Poor</option>
                      <option :value="2">2 — Fair</option>
                      <option :value="3">3 — Good</option>
                      <option :value="4">4 — Very Good</option>
                      <option :value="5">5 — Excellent</option>
                    </select>
                  </div>
                </div>
              </fieldset>

              <!-- Testimonial Text -->
              <fieldset>
                <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Testimonial</legend>
                <div>
                  <label class="mb-1 block text-xs font-medium text-gray-500">Text *</label>
                  <textarea
                    v-model="form.text"
                    rows="4"
                    required
                    placeholder="What the customer said…"
                    class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30"
                  />
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
                {{ saving ? 'Saving…' : (editingTestimonial ? 'Save Changes' : 'Add Testimonial') }}
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
          <h3 class="text-lg font-semibold text-[#111111]">Delete Testimonial</h3>
          <p class="mt-2 text-sm text-gray-500">
            Are you sure you want to delete the testimonial by <strong class="text-[#111111]">{{ deleteTarget.name }}</strong>? This action cannot be undone.
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
