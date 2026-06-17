<script setup lang="ts">
import AnnouncementBar from '@/components/AnnouncementBar.vue'
import Navbar from '@/components/Navbar.vue'
import HeroSection from '@/components/HeroSection.vue'
import ScentCategories from '@/components/ScentCategories.vue'
import FeaturedProducts from '@/components/FeaturedProducts.vue'
import BrandStory from '@/components/BrandStory.vue'
import WhyChooseUs from '@/components/WhyChooseUs.vue'
import Testimonials from '@/components/Testimonials.vue'
import ContactSection from '@/components/ContactSection.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-canvas">
    <AnnouncementBar />
    <Navbar />

    <main class="flex-1">
      <HeroSection />
      <ScentCategories />
      <FeaturedProducts />
      <BrandStory />
      <WhyChooseUs />
      <Testimonials />
      <ContactSection />
    </main>

    <FooterSection />
  </div>
</template>
