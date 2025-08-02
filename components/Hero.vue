<template>
  <section class="bg-gray-100 lg:grid lg:h-screen lg:place-content-center">
    <div
      class="mx-auto w-screen max-w-screen-xl px-6 py-16 sm:py-24 flex flex-col-reverse md:grid md:grid-cols-2 md:items-center md:gap-36">
      <!-- TEKS -->
      <div class="max-w-prose text-left">
        <h1 class="text-4xl font-bold text-gray-900 sm:text-6xl">
          Impress with a <strong class="text-amber-300">Signature</strong>
          Scent
        </h1>

        <p class="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
          We believe that fragrance is hope — a hope to appear more graceful,
          confident, and elegant. To us, it is an art of leaving an impression
          without words — a way to empower every step and celebrate one’s true
          identity.
        </p>

        <div class="mt-4 flex gap-4 sm:mt-6">
          <NuxtLink
            class="inline-block rounded border border-amber-300 bg-amber-300 px-5 py-3 font-medium text-gray-950 shadow-sm transition-colors hover:bg-amber-700"
            to="/shop">
            Shop Now
          </NuxtLink>
          <NuxtLink
            class="inline-block rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
            to="/story">
            Our Story
          </NuxtLink>
        </div>
      </div>

      <!-- SLIDER -->
      <div class="px-7 py-10">
        <Swiper
          :modules="[Autoplay]"
          :spaceBetween="20"
          :slidesPerView="1"
          :loop="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }"
          class="max-w-md">
          <SwiperSlide>
            <img
              src="/images/hero/PM.jpeg"
              alt="Slide 1"
              class="rounded-lg w-full max-w-[500px] aspect-[3/4] object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="/images/hero/PM.jpeg"
              alt="Slide 2"
              class="rounded-lg w-full max-w-[500px] aspect-[3/4] object-cover" />
          </SwiperSlide>
          <!-- Tambahkan lebih banyak slide jika perlu -->
        </Swiper>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay } from "swiper/modules";
import "swiper/css";
</script>
