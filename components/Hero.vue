<template>
  <section class="bg-center bg-no-repeat bg-[url('/public/images/hero.jpg')] bg-gray-400 bg-blend-multiply">
    <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
      <h1 class="mb-4 font-extrabold tracking-tight leading-none text-white text-3xl md:text-5xl lg:text-6xl">Be Elegant With Us</h1>
      <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
        Fegance Project was born from a hobby and hope to introduce that perfume is not just about smelling good or lasting long, but rather a reflection of identity, artwork, and self-confidence that come together in a flacon.
      </p>
      <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
        <NuxtLink to="/story" class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
          Our Story
          <Icon class="ml-1" icon="famicons:book-sharp" width="24" height="24" />
        </NuxtLink>
        <a href="#" class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 sm:ms-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
          Our Collection
        </a>
      </div>
    </div>
  </section>
</template>

<script setup></script>
