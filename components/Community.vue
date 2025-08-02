<script setup lang="ts">
import { NuxtLink } from "#components";
</script>

<template>
  <section class="bg-gradient-to-b from-white to-amber-300">
    <div class="p-8 md:p-12 lg:px-16 lg:py-24">
      <div class="mx-auto max-w-lg text-center">
        <h2 class="text-2xl font-bold text-gray-900 md:text-3xl">
          Want 10% Off Every Time You Buy a Perfume?
        </h2>
      </div>

      <div class="hidden md:block text-center w-6/12 mx-auto">
        <p class="text-black sm:mt-4 sm:block">
          Join our WhatsApp group! Be part of Fegance Mates and enjoy an
          exclusive 10% discount on all perfume variants — just by being a
          member of our community.
        </p>
        <p>Save more, stay closer, and smell even better with Fegance Mates.</p>
      </div>

      <div class="mx-auto m-3 flex justify-center">
        <NuxtLink
          class="group relative rounded-2xl inline-flex w-70 items-center justify-center overflow-hidden bg-green-800 px-8 py-3 focus:outline-none focus:ring-3"
          href="#">
          <span
            class="absolute inset-y-0 left-0 w-[2px] bg-green-600 transition-all group-hover:w-full"></span>

          <span
            class="relative text-md font-semibold text-white transition-colors group-hover:text-white">
            Join Now On WhatsApp
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
