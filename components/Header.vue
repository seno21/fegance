<template>
  <header class="bg-gray-900 border-b border-dark-gold-800">
    <div class="container mx-auto px-6 py-4">
      <div class="flex items-center justify-between">
        <a href=""
          ><img
            class="h-22 w-auto py-2"
            src="/public/images/icon-brand.svg"
            alt="brand"
        /></a>

        <nav class="hidden md:flex space-x-8 text-xl">
          <a
            href="#"
            class="text-dark-gold-300 hover:text-dark-gold-100 transition"
            >Home</a
          >
          <a
            href="#"
            class="text-dark-gold-300 hover:text-dark-gold-100 transition"
            >Collections</a
          >
          <a
            href="#"
            class="text-dark-gold-300 hover:text-dark-gold-100 transition"
            >About</a
          >
          <a
            href="#"
            class="text-dark-gold-300 hover:text-dark-gold-100 transition"
            >Contact</a
          >
        </nav>

        <div class="flex items-center space-x-4">
          <a
            href=""
            type="button"
            class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2">
            <Icon icon="weui:shop-filled" width="24" height="24" />
            Shop Now
          </a>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup></script>
