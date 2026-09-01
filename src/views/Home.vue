<script setup lang="ts">
import AnnouncementBar from "@/components/AnnouncementBar.vue";
import Navbar from "@/components/Navbar.vue";
import HeroSection from "@/components/HeroSection.vue";
import FeaturedProducts from "@/components/FeaturedProducts.vue";
import BrandStory from "@/components/BrandStory.vue";
import WhyChooseUs from "@/components/WhyChooseUs.vue";
import ContactSection from "@/components/ContactSection.vue";
import FooterSection from "@/components/FooterSection.vue";
</script>

<template>
  <div
    class="min-h-screen flex flex-col bg-canvas overflow-x-hidden w-full max-w-full"
  >
    <AnnouncementBar />
    <Navbar />

    <main class="flex-1">
      <HeroSection />
      <FeaturedProducts />
      <BrandStory />
      <WhyChooseUs />
      <ContactSection />
    </main>

    <FooterSection />
  </div>
</template>
