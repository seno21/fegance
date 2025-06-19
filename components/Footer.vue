<template>
  <footer class="bg-black border-t border-amber-300">
    <div class="container mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-xl font-bold text-amber-400 mb-4">FEGANCE</h3>
          <p class="text-gray-400">
            Make a first impression with a memorable fragrance. Be elegant ✨
          </p>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-amber-400 mb-4">Shop</h4>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-gray-400 hover:text-amber-300 transition"
                >Shopee</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-amber-300 transition"
                >Tokopedia</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-amber-300 transition"
                >Tiktok Shop</a
              >
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-amber-400 mb-4">Company</h4>
          <ul class="space-y-2">
            <li>
              <a href="#" class="text-gray-400 hover:text-amber-300 transition"
                >Our Story</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-amber-300 transition"
                >Community</a
              >
            </li>
            <li>
              <a href="#" class="text-gray-400 hover:text-amber-300 transition"
                >Contact</a
              >
            </li>
          </ul>
        </div>

        <div>
          <h4 class="text-lg font-semibold text-amber-400 mb-4">
            Stay Connected
          </h4>
          <p class="text-gray-400 mb-4">
            Follow us on social media to stay up to date with the latest
            updates.
          </p>
          <div class="flex space-x-4 mt-4">
            <a href="#" class="text-gray-400 hover:text-amber-300 transition">
              <Icon icon="basil:instagram-outline" width="24" height="24" />
            </a>
            <a href="#" class="text-gray-400 hover:text-amber-300 transition">
              <Icon icon="akar-icons:tiktok-fill" width="24" height="24" />
            </a>
            <a href="#" class="text-gray-400 hover:text-amber-300 transition">
              <Icon icon="grommet-icons:threads" width="24" height="24" />
            </a>
          </div>
        </div>
      </div>

      <div
        class="border-t border-amber-300 mt-12 pt-8 flex flex-col md:flex-row justify-center items-center">
        <p class="text-gray-500 text-sm">
          © {{ currentYear }} Fegance. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>
