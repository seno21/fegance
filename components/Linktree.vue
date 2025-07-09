<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-50 to-gray-400 flex flex-col items-center py-10 px-4">
    <!-- Brand Logo -->
    <img
      src="/public/images/icon-brand.svg"
      alt="Brand Logo"
      class="w-36 h-36 rounded-full shadow-md shadow-amber-400 bg-gray-700 mb-4 mt-32" />

    <!-- Brand Name & Description -->
    <h1 class="text-2xl font-semibold text-gray-800">Maison Fegance</h1>
    <p class="text-lg text-gray-500 mb-6 text-center max-w-lg">
      "Make a first impression with a memorable fragrance"
    </p>

    <!-- Link List -->
    <div class="flex flex-col gap-4 w-full max-w-lg">
      <a
        v-for="link in links"
        :key="link.label"
        :href="link.url"
        target="_blank"
        class="bg-amber-200 border border-black text-black px-10 py-6 rounded-full shadow hover:bg-amber-500 text-center font-bold transition">
        {{ link.label }}
      </a>
    </div>

    <!-- Address/Map -->
    <div class="mt-10 text-sm text-center text-gray-500">
      <p class="text-2xl">Be elegant ✨</p>
      <!-- <a
        href="https://maps.google.com/?q=Jakarta"
        target="_blank"
        class="underline text-blue-600">
        Jl. Contoh Alamat No. 123, Jakarta
      </a> -->
    </div>
  </div>
</template>

<script setup>
const links = [
  { label: "Instagram", url: "https://instagram.com/fegance.id" },
  { label: "WhatsApp", url: "https://wa.me/6285172372101" },
  { label: "Shopee", url: "https://shopee.co.id/fegance" },
  { label: "Tokopedia", url: "https://tokopedia.com/fegance" },
  { label: "Official Site", url: "https://fegance.id" },
];
</script>
