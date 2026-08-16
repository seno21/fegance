<script setup lang="ts">
import ScrollToTop from '@/components/ScrollToTop.vue'
</script>

<template>
  <div class="overflow-x-hidden w-full max-w-full min-h-screen flex flex-col">
    <router-view />
    <ScrollToTop />
  </div>
</template>
