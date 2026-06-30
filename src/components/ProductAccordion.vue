<template>
  <div class="accordion-container">
    <div
      v-for="(item, index) in accordionData"
      :key="index"
      class="accordion-item"
      :class="{ 'accordion-item--active': activeIndex === index }"
    >
      <button
        class="accordion-header"
        @click="toggleAccordion(index)"
        type="button"
        :aria-expanded="activeIndex === index"
      >
        <div class="header-left">
          <div class="header-icon-wrapper" :class="item.type">
            <component :is="getIconComponent(item.icon)" class="header-icon" />
          </div>
          <div class="header-titles">
            <h4 class="accordion-title">{{ item.title }}</h4>
            <span v-if="item.subtitle" class="accordion-subtitle" :class="item.type">
              {{ item.subtitle }}
            </span>
          </div>
        </div>
        <div class="accordion-toggle">
          <IconChevronDown class="chevron-icon" />
        </div>
      </button>

      <Transition name="accordion-slide">
        <div v-if="activeIndex === index" class="accordion-content">
          <div class="accordion-body">
            <!-- Description content -->
            <div v-if="item.type === 'description'" class="content-description">
              <p v-for="(p, i) in item.content" :key="i" class="paragraph">
                {{ p }}
              </p>
            </div>

            <!-- Notes content -->
            <div v-else-if="item.type === 'notes'" class="content-notes">
              <div v-for="note in item.content" :key="note" class="note-badge">
                {{ note }}
              </div>
            </div>

            <!-- Specs content -->
            <table v-else-if="item.type === 'specs'" class="content-specs">
              <tbody>
                <tr v-for="spec in item.content" :key="spec.label" class="spec-row">
                  <td class="spec-label">{{ spec.label }}</td>
                  <td class="spec-value">{{ spec.value }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  IconBook,
  IconFlower,
  IconGauge,
  IconChevronDown
} from '@tabler/icons-vue';

interface AccordionItem {
  type: 'description' | 'notes' | 'specs';
  title: string;
  subtitle?: string;
  icon: string;
  content: any;
}

const props = defineProps<{
  accordionData: AccordionItem[];
}>();

const activeIndex = ref<number | null>(0);

const toggleAccordion = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'IconBook': return IconBook;
    case 'IconFlower2': return IconFlower;
    case 'IconGauge': return IconGauge;
    default: return IconBook;
  }
};
</script>

<style scoped>
.accordion-container {
  --color-gold: #D4A574;
  --color-coral: #E8886B;
  --color-teal: #A8D5E2;
  --color-bg: #FAFAFA;
  --color-border: #E5E0DB;
  --color-text: #111111;
  --color-text-soft: #444444;
  --color-muted: #666666;
  
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  font-family: system-ui, -apple-system, sans-serif;
  background-color: var(--color-bg);
  padding: 16px;
  border-radius: 16px;
}

.accordion-item {
  background: #ffffff;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.accordion-item:hover {
  border-color: var(--color-gold);
  box-shadow: 0 4px 20px rgba(212, 165, 116, 0.1);
}

.accordion-item--active {
  border-color: var(--color-gold);
  box-shadow: 0 4px 20px rgba(212, 165, 116, 0.1);
}

.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #f7f7f7;
  color: var(--color-text);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.header-icon-wrapper.description {
  background-color: rgba(168, 213, 226, 0.15);
  color: #2E7D8A;
}

.header-icon-wrapper.notes {
  background-color: rgba(232, 136, 107, 0.15);
  color: #C85C40;
}

.header-icon-wrapper.specs {
  background-color: rgba(212, 165, 116, 0.15);
  color: #a66c24;
}

.header-icon {
  width: 20px;
  height: 20px;
}

.header-titles {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.accordion-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  transition: color 0.3s ease;
}

.accordion-item--active .accordion-title {
  color: var(--color-gold);
}

.accordion-subtitle {
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 2px 6px;
  border-radius: 4px;
  width: fit-content;
}

.accordion-subtitle.description {
  background: rgba(168, 213, 226, 0.1);
  color: #2E7D8A;
}

.accordion-subtitle.notes {
  background: rgba(232, 136, 107, 0.1);
  color: #C85C40;
}

.accordion-subtitle.specs {
  background: rgba(212, 165, 116, 0.1);
  color: #a66c24;
}

.accordion-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-muted);
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-item--active .accordion-toggle {
  transform: rotate(180deg);
  color: var(--color-gold);
}

.chevron-icon {
  width: 20px;
  height: 20px;
}

.accordion-content {
  overflow: hidden;
}

.accordion-body {
  padding: 0 16px 16px 16px;
}

/* Description content styling */
.content-description {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.paragraph {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-text-soft);
}

/* Notes grid 2 kolom */
.content-notes {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
}

@media (min-width: 480px) {
  .content-notes {
    grid-template-columns: repeat(2, 1fr);
  }
}

.note-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-soft);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  text-align: center;
}

/* Specs table styling */
.content-specs {
  width: 100%;
  border-collapse: collapse;
}

.spec-row {
  border-bottom: 1px solid var(--color-border);
}

.spec-row:last-child {
  border-bottom: none;
}

.spec-label {
  padding: 10px 0;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-muted);
  width: 40%;
}

.spec-value {
  padding: 10px 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  text-align: right;
}

/* Animations */
.accordion-slide-enter-active,
.accordion-slide-leave-active {
  transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 800px;
}

.accordion-slide-enter-from,
.accordion-slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
