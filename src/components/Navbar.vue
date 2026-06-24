<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import logoSvg from "@/assets/logo.svg";

const router = useRouter();
const isMenuOpen = ref(false);
const isScrolled = ref(false);

function handleScroll() {
  isScrolled.value = window.scrollY > 24;
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}

function scrollToSection(id: string) {
  closeMenu();
  if (router.currentRoute.value.name !== "home") {
    router.push("/");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 320);
    return;
  }
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth" });
}

function goHome() {
  closeMenu();
  router.push("/");
}

function goToCollection() {
  closeMenu();
  router.push("/product");
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const navLinks = [
  { label: "Home", target: "top", action: "home" as const },
  { label: "Collection", target: "", action: "collection" as const },
  { label: "Families", target: "families" },
  { label: "Story", target: "story" },
  { label: "Contact", target: "contact" },
];
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-canvas/95 backdrop-blur-md shadow-soft'
        : 'bg-canvas/80 backdrop-blur-sm',
    ]"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        class="flex items-center justify-between h-16 lg:h-20"
        :class="{ 'border-b border-line/60': !isScrolled }"
      >
        <!-- Logo -->
        <button
          @click="goHome"
          class="flex items-center gap-2"
          aria-label="Fegance home"
        >
          <img :src="logoSvg" alt="Fegance" class="logo-mark" />
        </button>

        <!-- Desktop nav -->
        <nav class="hidden lg:flex items-center gap-9">
          <button
            v-for="link in navLinks"
            :key="link.label"
            @click="
              link.action === 'home'
                ? goHome()
                : link.action === 'collection'
                  ? goToCollection()
                  : scrollToSection(link.target!)
            "
            class="group relative text-[13px] font-medium tracking-wide text-ink hover:text-gold transition-colors duration-200"
          >
            {{ link.label }}
            <span
              class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-px bg-gold transition-all duration-300 w-0 group-hover:w-full"
            />
          </button>
        </nav>

        <!-- Right side -->
        <div class="flex items-center gap-2 lg:gap-3">
          <button
            @click="scrollToSection('contact')"
            class="hidden md:inline-flex items-center gap-2 text-[13px] font-medium text-ink hover:text-gold transition-colors"
            aria-label="Search"
          >
            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
          </button>

          <button
            @click="goToCollection()"
            class="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold tracking-wider uppercase bg-ink text-canvas rounded-pill hover:bg-gold hover:text-ink transition-all duration-300"
          >
            Shop Now
            <svg
              class="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>

          <!-- Mobile menu button -->
          <button
            @click="toggleMenu"
            class="lg:hidden p-2 -mr-2 text-ink"
            :aria-label="isMenuOpen ? 'Close menu' : 'Open menu'"
            :aria-expanded="isMenuOpen"
          >
            <div class="w-5 h-4 relative flex flex-col justify-between">
              <span
                class="block h-px w-full bg-current transition-all duration-300 origin-center"
                :class="isMenuOpen ? 'translate-y-[7px] rotate-45' : ''"
              />
              <span
                class="block h-px w-full bg-current transition-all duration-300"
                :class="isMenuOpen ? 'opacity-0 scale-x-0' : ''"
              />
              <span
                class="block h-px w-full bg-current transition-all duration-300 origin-center"
                :class="isMenuOpen ? '-translate-y-[9px] -rotate-45' : ''"
              />
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="lg:hidden bg-canvas border-t border-line">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-1">
          <button
            v-for="link in navLinks"
            :key="link.label"
            @click="
              link.action === 'home'
                ? goHome()
                : link.action === 'collection'
                  ? goToCollection()
                  : scrollToSection(link.target!)
            "
            class="block w-full text-left py-3 text-base font-medium text-ink hover:text-gold transition-colors border-b border-line/60 last:border-0"
          >
            {{ link.label }}
          </button>
          <button
            @click="goToCollection()"
            class="w-full mt-4 py-3.5 text-[12px] font-semibold tracking-wider uppercase bg-ink text-canvas rounded-pill hover:bg-gold hover:text-ink transition-colors"
          >
            Shop Now
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>
