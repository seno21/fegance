<template>
  <div class="min-h-screen bg-gray-900 text-gray-100">
    <Header />
    <main>
      <Hero />
      <Features />
      <Products />
      <Testimonials />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Hero from "@/components/Hero.vue";
import Features from "@/components/Features.vue";
import Products from "@/components/Products.vue";
// import Testimonials from "@/components/Testimonials.vue";
import Footer from "@/components/Footer.vue";
</script>
