<template>
  <div class="flex flex-col gap-[12px] w-full bg-transparent p-0">
    <div
      v-for="(item, index) in accordionData"
      :key="index"
      class="bg-white border border-[#ECECEC] rounded-[16px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-[#c9a227] transition-all duration-[250ms] group"
      :class="{ 'border-[#c9a227]': activeIndex === index }"
    >
      <button
        class="flex items-center justify-between w-full min-h-[56px] sm:min-h-[64px] py-[16px] px-[24px] bg-transparent border-none cursor-pointer text-left focus:outline-none"
        @click="toggleAccordion(index)"
        type="button"
        :aria-expanded="activeIndex === index"
      >
        <div class="flex items-center gap-[16px]">
          <!-- Icon Circle Background -->
          <div
            class="w-[40px] h-[40px] rounded-full bg-[#faf7f2] flex items-center justify-center transition-colors duration-[250ms] group-hover:bg-[#c9a227] shrink-0"
            :class="{ 'bg-[#c9a227]': activeIndex === index }"
          >
            <component
              :is="getIconComponent(item.icon)"
              class="w-[18px] h-[18px] text-[#c9a227] transition-colors duration-[250ms] group-hover:text-white"
              :class="{ 'text-white': activeIndex === index }"
            />
          </div>
          <div class="flex flex-col justify-center">
            <h4
              class="font-sans text-[18px] font-semibold text-[#111111] transition-colors duration-[250ms] leading-none"
            >
              {{ item.title }}
            </h4>
            <span
              v-if="item.subtitle"
              class="font-sans text-[12px] tracking-widest text-[#c9a227] uppercase mt-[4px] leading-none"
            >
              {{ item.subtitle }}
            </span>
          </div>
        </div>

        <!-- Toggle Chevron -->
        <div
          class="flex items-center justify-center text-[#666666] transition-transform duration-[250ms] group-hover:text-[#c9a227]"
          :class="{ 'rotate-180 text-[#c9a227]': activeIndex === index }"
        >
          <IconChevronDown
            class="w-[20px] h-[20px] transition-transform duration-[250ms]"
          />
        </div>
      </button>

      <!-- Panel Content -->
      <Transition name="accordion-slide">
        <div v-if="activeIndex === index" class="overflow-hidden">
          <div class="px-[24px] pb-[24px] pt-[4px]">
            <!-- Description -->
            <div
              v-if="item.type === 'description'"
              class="flex flex-col gap-[16px] max-w-prose"
            >
              <p
                v-for="(p, i) in item.content"
                :key="i"
                class="font-sans text-[16px] leading-[1.8] text-[#555555] m-0"
              >
                {{ p }}
              </p>
            </div>

            <!-- Notes -->
            <div
              v-else-if="item.type === 'notes'"
              class="flex flex-col gap-[16px]"
            >
              <div
                v-if="item.content.top?.length"
                class="flex flex-col gap-[8px]"
              >
                <span
                  class="text-[12px] font-bold tracking-widest text-[#000000] uppercase leading-none"
                  >TOP NOTES</span
                >
                <div class="flex flex-wrap gap-[6px]">
                  <span
                    v-for="note in item.content.top"
                    :key="note"
                    class="text-[13px] bg-[#faf7f2] text-[#c9a227] px-[12px] py-[4px] rounded-full border border-[#f0ebe1] leading-none"
                  >
                    {{ note }}
                  </span>
                </div>
              </div>

              <div
                v-if="item.content.middle?.length"
                class="flex flex-col gap-[8px]"
              >
                <span
                  class="text-[12px] font-bold tracking-widest text-[#000000] uppercase leading-none"
                  >MIDDLE NOTES</span
                >
                <div class="flex flex-wrap gap-[6px]">
                  <span
                    v-for="note in item.content.middle"
                    :key="note"
                    class="text-[13px] bg-[#faf7f2] text-[#c9a227] px-[12px] py-[4px] rounded-full border border-[#f0ebe1] leading-none"
                  >
                    {{ note }}
                  </span>
                </div>
              </div>

              <div
                v-if="item.content.base?.length"
                class="flex flex-col gap-[8px]"
              >
                <span
                  class="text-[12px] font-bold tracking-widest text-[#000000] uppercase leading-none"
                  >BASE NOTES</span
                >
                <div class="flex flex-wrap gap-[6px]">
                  <span
                    v-for="note in item.content.base"
                    :key="note"
                    class="text-[13px] bg-[#faf7f2] text-[#c9a227] px-[12px] py-[4px] rounded-full border border-[#f0ebe1] leading-none"
                  >
                    {{ note }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Specs Grid -->
            <div v-else-if="item.type === 'specs'" class="flex flex-col">
              <div
                v-for="spec in item.content"
                :key="spec.label"
                class="flex flex-row justify-between items-center py-[10px] border-b border-[#F5F5F5] last:border-0 first:pt-0"
              >
                <span class="text-[14px] font-medium text-[#555555]">{{
                  spec.label
                }}</span>
                <span class="text-[14px] font-medium text-[#111111]">{{
                  spec.value
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  IconBook,
  IconFlower,
  IconGauge,
  IconChevronDown,
} from "@tabler/icons-vue";

interface AccordionItem {
  type: "description" | "notes" | "specs";
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
    case "IconBook":
      return IconBook;
    case "IconFlower2":
      return IconFlower;
    case "IconGauge":
      return IconGauge;
    default:
      return IconBook;
  }
};
</script>

<style scoped>
/* Smooth slide and fade transition for content */
.accordion-slide-enter-active,
.accordion-slide-leave-active {
  transition: all 250ms ease-in-out;
  overflow: hidden;
}

.accordion-slide-enter-from,
.accordion-slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.accordion-slide-enter-to,
.accordion-slide-leave-from {
  max-height: 600px; /* Adjust if content is exceptionally long */
  opacity: 1;
}
</style>
