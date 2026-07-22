<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useSiteContent, type SiteContent } from '@/composables/useSiteContent'

const { content, loading, updateSection } = useSiteContent()

type Tab = 'hero' | 'brandStory' | 'whyChooseUs' | 'contact' | 'announcement'
const activeTab = ref<Tab>('hero')
const saving = ref(false)
const saveSuccess = ref(false)
const saveError = ref('')

const tabs: { key: Tab; label: string }[] = [
  { key: 'hero', label: 'Hero' },
  { key: 'brandStory', label: 'Brand Story' },
  { key: 'whyChooseUs', label: 'Why Choose Us' },
  { key: 'contact', label: 'Contact' },
  { key: 'announcement', label: 'Announcement' },
]

const hero = ref<SiteContent['hero']>({ tagline: '', taglineAccent: '', subtitle: '', ctaPrimary: '', ctaSecondary: '', imageUrl: '' })
const brandStory = ref<SiteContent['brandStory']>({ eyebrow: '', title: '', titleAccent: '', paragraphs: [], stats: [], images: { main: '', secondary: '', accent: '' } })
const whyChooseUs = ref<SiteContent['whyChooseUs']>({ sectionTitle: '', sectionSubtitle: '', pillars: [] })
const contact = ref<SiteContent['contact']>({ eyebrow: '', title: '', description: '', address: '', businessHours: '', contacts: [] })
const announcement = ref<SiteContent['announcement']>({ messages: [], enabled: false })

watch(content, (val) => {
  if (!val) return
  hero.value = { ...val.hero }
  brandStory.value = {
    ...val.brandStory,
    paragraphs: [...val.brandStory.paragraphs],
    stats: val.brandStory.stats.map(s => ({ ...s })),
    images: { ...val.brandStory.images },
  }
  whyChooseUs.value = {
    ...val.whyChooseUs,
    pillars: val.whyChooseUs.pillars.map(p => ({ ...p })),
  }
  contact.value = {
    ...val.contact,
    contacts: val.contact.contacts.map(c => ({ ...c })),
  }
  announcement.value = {
    ...val.announcement,
    messages: [...val.announcement.messages],
  }
}, { immediate: true })

async function handleSave() {
  saving.value = true
  saveSuccess.value = false
  saveError.value = ''
  try {
    const section = activeTab.value
    let data: any
    if (section === 'hero') {
      data = { ...hero.value }
    } else if (section === 'brandStory') {
      data = { ...brandStory.value }
    } else if (section === 'whyChooseUs') {
      data = { ...whyChooseUs.value }
    } else if (section === 'contact') {
      data = { ...contact.value }
    } else {
      data = { ...announcement.value }
    }
    await updateSection(section, data)
    saveSuccess.value = true
    setTimeout(() => { saveSuccess.value = false }, 3000)
  } catch (e: any) {
    saveError.value = e?.message || 'Failed to save'
    setTimeout(() => { saveError.value = '' }, 5000)
  } finally {
    saving.value = false
  }
}

function addParagraph() {
  brandStory.value.paragraphs.push('')
}
function removeParagraph(i: number) {
  brandStory.value.paragraphs.splice(i, 1)
}
function addStat() {
  brandStory.value.stats.push({ value: '', label: '' })
}
function removeStat(i: number) {
  brandStory.value.stats.splice(i, 1)
}
function addPillar() {
  whyChooseUs.value.pillars.push({ title: '', description: '', icon: 'sparkles' })
}
function removePillar(i: number) {
  whyChooseUs.value.pillars.splice(i, 1)
}
function addContact() {
  contact.value.contacts.push({ name: '', handle: '', link: '', external: true })
}
function removeContact(i: number) {
  contact.value.contacts.splice(i, 1)
}
function addMessage() {
  announcement.value.messages.push('')
}
function removeMessage(i: number) {
  announcement.value.messages.splice(i, 1)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10">
    <div class="mx-auto max-w-4xl">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-[#111111]">Site Content</h1>
        <p class="mt-1 text-gray-500">Manage your storefront content</p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="rounded-2xl border border-gray-200 bg-white px-6 py-20 text-center text-sm text-gray-400 shadow-sm">
        <svg class="mx-auto mb-3 h-6 w-6 animate-spin text-[#c9a227]" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Loading content…
      </div>

      <template v-else>
        <!-- Tab Bar -->
        <div class="mb-6 overflow-x-auto">
          <div class="inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
            <button
              v-for="tab in tabs"
              :key="tab.key"
              class="whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-colors"
              :class="activeTab === tab.key ? 'bg-[#c9a227] text-white shadow-sm' : 'text-gray-500 hover:text-[#111111]'"
              @click="activeTab = tab.key"
            >
              {{ tab.label }}
            </button>
          </div>
        </div>

        <!-- Feedback -->
        <div v-if="saveSuccess" class="mb-4 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Changes saved successfully.
        </div>
        <div v-if="saveError" class="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {{ saveError }}
        </div>

        <!-- Form Card -->
        <div class="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <form @submit.prevent="handleSave">
            <div class="px-6 py-6">

              <!-- HERO TAB -->
              <template v-if="activeTab === 'hero'">
                <h2 class="mb-5 text-lg font-semibold text-[#111111]">Hero Section</h2>
                <div class="space-y-4">
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Tagline</label>
                    <input v-model="hero.tagline" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Tagline Accent</label>
                    <input v-model="hero.taglineAccent" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Subtitle</label>
                    <textarea v-model="hero.subtitle" rows="2" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                  </div>
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-500">CTA Primary</label>
                      <input v-model="hero.ctaPrimary" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-500">CTA Secondary</label>
                      <input v-model="hero.ctaSecondary" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                    </div>
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Image URL</label>
                    <input v-model="hero.imageUrl" type="url" placeholder="https://…" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                    <img v-if="hero.imageUrl" :src="hero.imageUrl" alt="Preview" class="mt-2 h-20 w-40 rounded-lg object-cover" />
                  </div>
                </div>
              </template>

              <!-- BRAND STORY TAB -->
              <template v-if="activeTab === 'brandStory'">
                <h2 class="mb-5 text-lg font-semibold text-[#111111]">Brand Story</h2>
                <div class="space-y-4">
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-500">Eyebrow</label>
                      <input v-model="brandStory.eyebrow" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-500">Title</label>
                      <input v-model="brandStory.title" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-500">Title Accent</label>
                      <input v-model="brandStory.titleAccent" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                    </div>
                  </div>

                  <!-- Paragraphs -->
                  <fieldset>
                    <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Paragraphs</legend>
                    <div class="space-y-3">
                      <div v-for="(_, i) in brandStory.paragraphs" :key="i" class="flex items-start gap-2">
                        <textarea v-model="brandStory.paragraphs[i]" rows="2" class="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                        <button type="button" class="mt-1 shrink-0 rounded-lg border border-red-200 p-1.5 text-red-500 transition-colors hover:bg-red-50" @click="removeParagraph(i)">
                          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <button type="button" class="mt-3 inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50" @click="addParagraph">
                      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add Paragraph
                    </button>
                  </fieldset>

                  <!-- Stats -->
                  <fieldset>
                    <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Stats</legend>
                    <div class="space-y-3">
                      <div v-for="(_, i) in brandStory.stats" :key="i" class="flex items-start gap-2">
                        <input v-model="brandStory.stats[i]!.value" type="text" placeholder="Value" class="w-32 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                        <input v-model="brandStory.stats[i]!.label" type="text" placeholder="Label" class="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                        <button type="button" class="mt-1 shrink-0 rounded-lg border border-red-200 p-1.5 text-red-500 transition-colors hover:bg-red-50" @click="removeStat(i)">
                          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <button type="button" class="mt-3 inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50" @click="addStat">
                      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add Stat
                    </button>
                  </fieldset>

                  <!-- Images -->
                  <fieldset>
                    <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Images</legend>
                    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <label class="mb-1 block text-xs font-medium text-gray-500">Main Image URL</label>
                        <input v-model="brandStory.images.main" type="url" placeholder="https://…" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                      </div>
                      <div>
                        <label class="mb-1 block text-xs font-medium text-gray-500">Secondary Image URL</label>
                        <input v-model="brandStory.images.secondary" type="url" placeholder="https://…" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                      </div>
                      <div>
                        <label class="mb-1 block text-xs font-medium text-gray-500">Accent Image URL</label>
                        <input v-model="brandStory.images.accent" type="url" placeholder="https://…" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                      </div>
                    </div>
                    <div v-if="brandStory.images.main || brandStory.images.secondary || brandStory.images.accent" class="mt-3 flex gap-2">
                      <img v-if="brandStory.images.main" :src="brandStory.images.main" alt="Main" class="h-16 w-16 rounded-lg object-cover" />
                      <img v-if="brandStory.images.secondary" :src="brandStory.images.secondary" alt="Secondary" class="h-16 w-16 rounded-lg object-cover" />
                      <img v-if="brandStory.images.accent" :src="brandStory.images.accent" alt="Accent" class="h-16 w-16 rounded-lg object-cover" />
                    </div>
                  </fieldset>
                </div>
              </template>

              <!-- WHY CHOOSE US TAB -->
              <template v-if="activeTab === 'whyChooseUs'">
                <h2 class="mb-5 text-lg font-semibold text-[#111111]">Why Choose Us</h2>
                <div class="space-y-4">
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-500">Section Title</label>
                      <input v-model="whyChooseUs.sectionTitle" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-500">Section Subtitle</label>
                      <input v-model="whyChooseUs.sectionSubtitle" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                    </div>
                  </div>

                  <!-- Pillars -->
                  <fieldset>
                    <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Pillars</legend>
                    <div class="space-y-4">
                      <div v-for="(pillar, i) in whyChooseUs.pillars" :key="i" class="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                        <div class="mb-3 flex items-center justify-between">
                          <span class="text-xs font-medium text-gray-400">Pillar {{ i + 1 }}</span>
                          <button type="button" class="text-red-500 transition-colors hover:text-red-700" @click="removePillar(i)">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div class="space-y-3">
                          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                              <label class="mb-1 block text-xs font-medium text-gray-500">Title</label>
                              <input v-model="whyChooseUs.pillars[i]!.title" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                            </div>
                            <div>
                              <label class="mb-1 block text-xs font-medium text-gray-500">Icon</label>
                              <select v-model="whyChooseUs.pillars[i]!.icon" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30">
                                <option value="sparkles">Sparkles</option>
                                <option value="hourglass">Hourglass</option>
                                <option value="shield">Shield</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label class="mb-1 block text-xs font-medium text-gray-500">Description</label>
                            <textarea v-model="whyChooseUs.pillars[i]!.description" rows="2" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <button type="button" class="mt-3 inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50" @click="addPillar">
                      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add Pillar
                    </button>
                  </fieldset>
                </div>
              </template>

              <!-- CONTACT TAB -->
              <template v-if="activeTab === 'contact'">
                <h2 class="mb-5 text-lg font-semibold text-[#111111]">Contact</h2>
                <div class="space-y-4">
                  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-500">Eyebrow</label>
                      <input v-model="contact.eyebrow" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                    </div>
                    <div>
                      <label class="mb-1 block text-xs font-medium text-gray-500">Title</label>
                      <input v-model="contact.title" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                    </div>
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Description</label>
                    <textarea v-model="contact.description" rows="2" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Address</label>
                    <textarea v-model="contact.address" rows="2" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                  </div>
                  <div>
                    <label class="mb-1 block text-xs font-medium text-gray-500">Business Hours</label>
                    <input v-model="contact.businessHours" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                  </div>

                  <!-- Contacts -->
                  <fieldset>
                    <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Contact Links</legend>
                    <div class="space-y-4">
                      <div v-for="(_, i) in contact.contacts" :key="i" class="rounded-xl border border-gray-100 bg-gray-50/50 p-4">
                        <div class="mb-3 flex items-center justify-between">
                          <span class="text-xs font-medium text-gray-400">Contact {{ i + 1 }}</span>
                          <button type="button" class="text-red-500 transition-colors hover:text-red-700" @click="removeContact(i)">
                            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                        <div class="space-y-3">
                          <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                              <label class="mb-1 block text-xs font-medium text-gray-500">Name</label>
                              <input v-model="contact.contacts[i]!.name" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                            </div>
                            <div>
                              <label class="mb-1 block text-xs font-medium text-gray-500">Handle</label>
                              <input v-model="contact.contacts[i]!.handle" type="text" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                            </div>
                          </div>
                          <div>
                            <label class="mb-1 block text-xs font-medium text-gray-500">Link</label>
                              <input v-model="contact.contacts[i]!.link" type="url" placeholder="https://…" class="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                          </div>
                          <label class="inline-flex items-center gap-2 text-sm text-gray-600">
                            <input v-model="contact.contacts[i]!.external" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-[#c9a227] focus:ring-[#c9a227]/30" />
                            Opens externally
                          </label>
                        </div>
                      </div>
                    </div>
                    <button type="button" class="mt-3 inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50" @click="addContact">
                      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add Contact
                    </button>
                  </fieldset>
                </div>
              </template>

              <!-- ANNOUNCEMENT TAB -->
              <template v-if="activeTab === 'announcement'">
                <h2 class="mb-5 text-lg font-semibold text-[#111111]">Announcement Bar</h2>
                <div class="space-y-4">
                  <label class="inline-flex items-center gap-2 text-sm text-gray-600">
                    <input v-model="announcement.enabled" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-[#c9a227] focus:ring-[#c9a227]/30" />
                    Enabled
                  </label>

                  <fieldset>
                    <legend class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Messages</legend>
                    <div class="space-y-3">
                      <div v-for="(_, i) in announcement.messages" :key="i" class="flex items-start gap-2">
                        <input v-model="announcement.messages[i]" type="text" placeholder="Announcement message" class="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-[#111111] placeholder:text-gray-400 focus:border-[#c9a227] focus:outline-none focus:ring-1 focus:ring-[#c9a227]/30" />
                        <button type="button" class="mt-1 shrink-0 rounded-lg border border-red-200 p-1.5 text-red-500 transition-colors hover:bg-red-50" @click="removeMessage(i)">
                          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <button type="button" class="mt-3 inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50" @click="addMessage">
                      <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Add Message
                    </button>
                  </fieldset>
                </div>
              </template>
            </div>

            <!-- Save Footer -->
            <div class="flex items-center justify-end border-t border-gray-100 px-6 py-4">
              <button
                type="submit"
                :disabled="saving"
                class="inline-flex items-center gap-2 rounded-xl bg-[#c9a227] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#b8921f] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <svg v-if="saving" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ saving ? 'Saving…' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </template>
    </div>
  </div>
</template>
