<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import logoSvg from "@/assets/logo.svg";
import { useWishlist } from "@/composables/useWishlist";
import { useUserAuth } from "@/composables/useUserAuth";

const router = useRouter();
const isMenuOpen = ref(false);
const isScrolled = ref(false);
const isUserMenuOpen = ref(false);

const { wishlistCount } = useWishlist();
const { user, userProfile, logout } = useUserAuth();

function handleScroll() {
  isScrolled.value = window.scrollY > 24;
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
  isUserMenuOpen.value = false;
}

function goHome() {
  closeMenu();
  router.push("/");
}

function goToCollection() {
  closeMenu();
  router.push("/product");
}

function goToStory() {
  closeMenu();
  router.push("/our-story");
}

function goToWishlist() {
  closeMenu();
  router.push("/wishlist");
}

function goToLogin() {
  closeMenu();
  router.push("/login");
}

function goToAdmin() {
  closeMenu();
  router.push("/admin");
}

async function handleLogout() {
  closeMenu();
  await logout();
  router.push("/");
}

function handleNavClick(action: "home" | "collection" | "story") {
  if (action === "home") goHome();
  else if (action === "collection") goToCollection();
  else if (action === "story") goToStory();
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const navLinks = [
  { label: "Home", action: "home" as const },
  { label: "Collection", action: "collection" as const },
  { label: "Our Story", action: "story" as const },
];
</script>

<template>
  <header
    class="sticky top-0 left-0 right-0 z-50 transition-all duration-300"
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
          class="flex items-center gap-2 cursor-pointer"
          aria-label="Fegance home"
        >
          <img :src="logoSvg" alt="Fegance" class="logo-mark" />
        </button>

        <!-- Desktop nav -->
        <nav class="hidden lg:flex items-center gap-10">
          <button
            v-for="link in navLinks"
            :key="link.label"
            @click="handleNavClick(link.action)"
            class="group relative font-display text-[14px] font-bold tracking-widest uppercase text-ink hover:text-black transition-colors duration-200 py-1 cursor-pointer"
          >
            {{ link.label }}
            <span
              class="absolute -bottom-1 left-0 h-[2px] bg-ink transition-all duration-300 w-0 group-hover:w-full"
            />
          </button>
        </nav>

        <!-- Right side -->
        <div class="flex items-center gap-1 sm:gap-2 lg:gap-3">
          <!-- Wishlist button with badge -->
          <button
            @click="goToWishlist"
            class="relative p-2 text-muted hover:text-ink transition-colors duration-200 cursor-pointer"
            aria-label="Wishlist"
            title="Wishlist Saya"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="1.6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
            <span
              v-if="wishlistCount > 0"
              class="absolute top-1 right-1 flex items-center justify-center min-w-4 h-4 px-1 text-[10px] font-bold text-white bg-[#c9a227] rounded-full shadow-sm"
            >
              {{ wishlistCount }}
            </span>
          </button>

          <!-- User Account Menu / Login -->
          <div class="relative">
            <!-- Logged In User Button -->
            <button
              v-if="user"
              @click="isUserMenuOpen = !isUserMenuOpen"
              class="flex items-center gap-1.5 p-1.5 rounded-full hover:bg-black/5 text-ink transition-colors cursor-pointer"
              title="Akun Saya"
            >
              <div class="w-7 h-7 rounded-full bg-ink text-canvas flex items-center justify-center text-xs font-semibold uppercase">
                {{ userProfile?.displayName?.charAt(0) || user.email?.charAt(0) || "U" }}
              </div>
              <svg class="w-3.5 h-3.5 text-muted hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Guest User Button -->
            <button
              v-else
              @click="goToLogin"
              class="p-2 text-muted hover:text-ink transition-colors duration-200 cursor-pointer"
              aria-label="Masuk Akun"
              title="Masuk / Daftar"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1.6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </button>

            <!-- User Dropdown Menu -->
            <div
              v-if="user && isUserMenuOpen"
              class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lift border border-line py-1.5 z-50 text-xs"
            >
              <div class="px-4 py-2 border-b border-line/60">
                <p class="font-bold text-ink truncate">{{ userProfile?.displayName || "Pengguna Fegance" }}</p>
                <p class="text-[11px] text-faint truncate">{{ user.email }}</p>
              </div>

              <button
                @click="goToWishlist"
                class="w-full text-left px-4 py-2 hover:bg-gray-50 text-ink flex items-center gap-2 cursor-pointer"
              >
                <svg class="w-4 h-4 text-[#c9a227]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                Wishlist Saya ({{ wishlistCount }})
              </button>

              <button
                @click="goToAdmin"
                class="w-full text-left px-4 py-2 hover:bg-gray-50 text-ink flex items-center gap-2 cursor-pointer"
              >
                <svg class="w-4 h-4 text-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
                </svg>
                Panel Admin
              </button>

              <div class="border-t border-line/60 my-1" />

              <button
                @click="handleLogout"
                class="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 flex items-center gap-2 cursor-pointer"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>
                Keluar
              </button>
            </div>
          </div>

          <!-- Shop CTA Button -->
          <button
            @click="goToCollection()"
            class="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 text-[12px] font-semibold tracking-wider uppercase bg-ink text-canvas rounded-pill hover:bg-black/80 hover:text-white transition-all duration-300 cursor-pointer"
          >
            Shop
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
            class="lg:hidden p-2 -mr-2 text-ink cursor-pointer"
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
            @click="handleNavClick(link.action)"
            class="block w-full text-left py-3 text-base font-medium text-ink hover:text-black transition-colors border-b border-line/60 last:border-0"
          >
            {{ link.label }}
          </button>

          <button
            @click="goToWishlist"
            class="flex items-center justify-between w-full text-left py-3 text-base font-medium text-ink hover:text-black transition-colors border-b border-line/60"
          >
            <span class="flex items-center gap-2">
              <svg class="w-4.5 h-4.5 text-[#c9a227]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
              Wishlist Saya
            </span>
            <span v-if="wishlistCount > 0" class="px-2 py-0.5 text-xs font-bold bg-[#c9a227] text-white rounded-full">
              {{ wishlistCount }}
            </span>
          </button>

          <div v-if="user" class="py-2 space-y-2">
            <p class="text-xs text-muted">Masuk sebagai {{ userProfile?.displayName || user.email }}</p>
            <button
              @click="handleLogout"
              class="w-full py-2.5 text-xs font-medium uppercase tracking-wider text-red-600 border border-red-200 rounded-pill"
            >
              Keluar
            </button>
          </div>
          <button
            v-else
            @click="goToLogin"
            class="w-full mt-2 py-3 text-[12px] font-medium tracking-wider uppercase text-ink border border-ink/40 rounded-pill transition-colors"
          >
            Masuk / Buat Akun
          </button>

          <button
            @click="goToCollection()"
            class="w-full mt-3 py-3.5 text-[12px] font-semibold tracking-wider uppercase bg-ink text-canvas rounded-pill hover:bg-black/80 transition-colors"
          >
            Shop
          </button>

          <button
            @click="goToAdmin"
            class="w-full mt-2 py-2 text-[11px] font-medium tracking-wider uppercase text-muted hover:text-ink text-center"
          >
            Panel Admin
          </button>
        </div>
      </div>
    </Transition>
  </header>
</template>
