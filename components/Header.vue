<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-gray-950 border-b border-amber-300 shadow-md">
    <div class="container mx-auto px-6 py-1">
      <div class="flex items-center justify-between">
        <a href=""
          ><img
            class="h-20 w-auto py-2"
            src="/public/images/icon-brand.svg"
            alt="brand"
        /></a>

        <nav class="hidden md:flex space-x-8 text-xl">
          <NuxtLink
            to="/"
            class="text-dark-gold-300 hover:text-amber-300 transition"
            >Home</NuxtLink
          >
          <NuxtLink
            to="/catalog"
            class="text-dark-gold-300 hover:text-amber-300 transition"
            >Catalog</NuxtLink
          >
          <NuxtLink
            to="/"
            class="text-dark-gold-300 hover:text-amber-300 transition"
            >Shop</NuxtLink
          >
          <NuxtLink
            to="/about"
            class="text-dark-gold-300 hover:text-amber-300 transition"
            >About</NuxtLink
          >
          <NuxtLink
            to="/contact"
            class="text-dark-gold-300 hover:text-amber-300 transition"
            >Contact</NuxtLink
          >
        </nav>

        <div class="flex items-center space-x-4">
          <a
            href=""
            type="button"
            class="text-dark-gold-300 hover:text-amber-300 transition">
            <Icon icon="weui:shop-filled" width="24" height="24" />
          </a>

          <button
            @click="isMenuOpen = !isMenuOpen"
            class="md:hidden text-dark-gold-300 focus:outline-none"
            aria-label="Toggle menu">
            <Icon
              :icon="
                isMenuOpen
                  ? 'radix-icons:cross-1'
                  : 'stash:burger-classic-duotone'
              "
              width="32"
              height="32" />
          </button>
        </div>
      </div>

      <!-- Burger button -->
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0 scale-95"
        enter-to-class="transform opacity-100 scale-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100 scale-100"
        leave-to-class="transform opacity-0 scale-95">
        <div v-show="isMenuOpen" class="md:hidden mt-4 pb-4">
          <div class="flex flex-col space-y-3">
            <NuxtLink to="/">Home</NuxtLink>
            <a href="#products" class="px-3 py-2">Collections</a>
            <a href="#" class="px-3 py-2">About</a>
            <a href="#" class="px-3 py-2">Contact</a>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";

const isMenuOpen = ref(false);
</script>
