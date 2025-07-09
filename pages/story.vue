<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 font-sans">
    <Header />

    <main class="container mx-auto px-6 py-16 pt-32 md:pt-40 lg:pt-48">
      <section class="text-center mb-16 md:mb-24">
        <h1 class="text-5xl md:text-6xl font-serif font-bold text-amber-300 mb-6 leading-tight">The Scent of Our Journey</h1>
        <p class="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">Every fragrance tells a tale. Discover the passion, artistry, and vision behind Fegance.</p>
      </section>

      <section class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-20 md:mb-32">
        <div class="order-2 md:order-1">
          <h2 class="text-4xl md:text-5xl font-serif font-semibold text-amber-200 mb-6">A Spark of Inspiration</h2>
          <p class="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
            Founded in [Year], Fegance began with a singular obsession: to bottle the ephemeral beauty of scent. Our founder, [Founder's Name], a visionary perfumer, embarked on a quest to transform fleeting moments into lasting olfactory
            memories.
          </p>
          <p class="text-lg md:text-xl text-gray-200 leading-relaxed">
            From humble beginnings, we meticulously sourced the rarest botanicals and the finest essential oils from across the globe, believing that true luxury lies in purity and precision.
          </p>
        </div>
        <div class="order-1 md:order-2">
          <img src="/public/images/images1.jpg" alt="The Genesis of Fegance" class="w-full h-auto rounded-lg shadow-xl object-cover transform hover:scale-105 transition-transform duration-500" />
        </div>
      </section>

      <section class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-20 md:mb-32">
        <div>
          <img src="/public/images/images2.jpg" alt="The Art of Perfumery" class="w-full h-auto rounded-lg shadow-xl object-cover transform hover:scale-105 transition-transform duration-500" />
        </div>
        <div>
          <h2 class="text-4xl md:text-5xl font-serif font-semibold text-amber-200 mb-6">The Art of Creation</h2>
          <p class="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
            Our perfumers are more than chemists; they are storytellers. Each Fegance creation is a symphony of top, heart, and base notes, carefully composed to evoke distinct emotions and narratives. We honor traditional techniques while
            embracing modern innovation.
          </p>
          <p class="text-lg md:text-xl text-gray-200 leading-relaxed">This dedication to the craft ensures that every bottle is not just a fragrance, but an experience—a signature scent waiting to become yours.</p>
        </div>
      </section>

      <section class="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-20 md:mb-32">
        <div class="order-2 md:order-1">
          <h2 class="text-4xl md:text-5xl font-serif font-semibold text-amber-200 mb-6">A Future Scented with Promise</h2>
          <p class="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
            Looking ahead, Fegance is committed to sustainable practices and ethical sourcing. We believe that true luxury should not come at the expense of our planet or its people.
          </p>
          <p class="text-lg md:text-xl text-gray-200 leading-relaxed">
            Our journey continues, always guided by the desire to craft exquisite, meaningful fragrances that resonate deeply and leave an unforgettable mark. Join us as we explore new horizons in the world of scent.
          </p>
        </div>
        <div class="order-1 md:order-2">
          <img src="/public/images/images1.jpg" alt="Future Vision of Fegance" class="w-full h-auto rounded-lg shadow-xl object-cover transform hover:scale-105 transition-transform duration-500" />
        </div>
      </section>

      <section class="text-center py-16">
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-amber-300 mb-8">Ready to Discover Your Signature Scent?</h2>
        <NuxtLink
          to="/collection"
          class="inline-flex justify-center items-center py-4 px-8 text-lg font-medium text-center text-white rounded-lg bg-amber-500 hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Explore Our Collections
          <Icon icon="ic:round-arrow-right-alt" class="ml-2" width="28" height="28" />
        </NuxtLink>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
// Jika ada data dinamis atau logika spesifik untuk halaman ini, tambahkan di sini.
// Contoh: Mengambil data cerita dari API, jika ceritanya sangat panjang dan kompleks.
// import { ref } from 'vue';
// const storyContent = ref(null);
// onMounted(async () => {
//   // fetch your story content
// });
</script>
