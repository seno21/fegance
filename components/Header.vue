<template>
  <header class="bg-white dark:bg-gray-900 py-2">
    <div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <div class="flex-1 md:flex md:items-center md:gap-12">
          <a class="block text-amber-300 dark:text-teal-300" href="#">
            <img
              class="h-20 w-auto py-2"
              src="/images/icon-brand.svg"
              alt="brand" />
          </a>
        </div>

        <div class="md:flex md:items-center md:gap-12">
          <nav aria-label="Global" class="hidden md:block">
            <ul class="flex items-center gap-6 text-md">
              <li>
                <a
                  class="text-amber-500 transition hover:text-amber-500/75 dark:text-white dark:hover:text-white/75"
                  href="#">
                  Home
                </a>
              </li>

              <li>
                <a
                  class="text-amber-500 transition hover:text-amber-500/75 dark:text-white dark:hover:text-white/75"
                  href="#">
                  Catalog
                </a>
              </li>

              <li>
                <a
                  class="text-amber-500 transition hover:text-amber-500/75 dark:text-white dark:hover:text-white/75"
                  href="#">
                  Shop
                </a>
              </li>

              <li>
                <a
                  class="text-amber-500 transition hover:text-amber-500/75 dark:text-white dark:hover:text-white/75"
                  href="#">
                  Blog
                </a>
              </li>

              <li>
                <a
                  class="text-amber-500 transition hover:text-amber-500/75 dark:text-white dark:hover:text-white/75"
                  href="#">
                  FAQ
                </a>
              </li>
            </ul>
          </nav>

          <div class="flex items-center gap-4">
            <div class="sm:flex sm:gap-4">
              <a
                class="rounded-md bg-amber-300 px-5 py-2.5 text-sm font-medium text-gray-900 shadow-sm dark:hover:bg-amber-500"
                href="#">
                Login
              </a>

              <div class="hidden sm:flex">
                <a
                  class="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-amber-300 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                  href="#">
                  Register
                </a>
              </div>
            </div>

            <div class="block md:hidden">
              <button
                @click="isMenuOpen = !isMenuOpen"
                class="rounded-sm bg-gray-100 p-2 text-amber-600 transition hover:text-amber-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                <svg
                  v-if="!isMenuOpen"
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>

                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95">
      <div v-show="isMenuOpen" class="md:hidden mt-4 pb-4">
        <div class="flex flex-col space-y-3">
          <NuxtLink class="px-3 py-2" to="/">Home</NuxtLink>
          <NuxtLink class="px-3 py-2" to="/">Catalog</NuxtLink>
          <NuxtLink class="px-3 py-2" to="/">Shop</NuxtLink>
          <NuxtLink class="px-3 py-2" to="/">Blog</NuxtLink>
          <NuxtLink class="px-3 py-2" to="/">FAQ</NuxtLink>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
</script>
