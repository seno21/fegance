<template>
  <div class="min-h-screen bg-[#FAFAFA] flex flex-col items-center py-12 px-5 font-sans">
    
    <!-- Profile / Header -->
    <div class="flex flex-col items-center text-center mb-10 w-full max-w-[400px]">
      <div class="w-24 h-24 rounded-full bg-white shadow-soft flex items-center justify-center mb-5 overflow-hidden border border-[#E5E0DB]">
        <img src="/favicon.svg" alt="Maison Fegance Logo" class="w-16 h-16 object-contain" />
      </div>
      <h1 class="text-2xl font-bold tracking-widest text-[#111111] mb-2 uppercase">Maison Fegance</h1>
      <p class="text-[13px] text-[#666666] tracking-wide leading-relaxed">
        Luxury in every drop.
      </p>
    </div>

    <!-- Link List -->
    <div class="w-full max-w-[400px] flex flex-col gap-4">
      
      <!-- Shopee Link -->
      <a 
        href="https://shopee.co.id/fegance" 
        target="_blank" 
        rel="noopener noreferrer"
        class="group flex items-center p-4 bg-white border border-[#E5E0DB] rounded-2xl hover:border-[#EE4D2D]/40 hover:shadow-soft transition-all duration-300"
      >
        <div class="w-10 h-10 rounded-xl bg-[#EE4D2D]/10 flex items-center justify-center text-[#EE4D2D] mr-4 transition-colors group-hover:bg-[#EE4D2D] group-hover:text-white">
          <IconBrandShopee class="w-6 h-6" />
        </div>
        <div class="flex-1">
          <h2 class="text-[15px] font-semibold text-[#111111]">Shop on Shopee</h2>
          <p class="text-[11px] text-[#666666] uppercase tracking-wider mt-0.5">Official Store</p>
        </div>
        <IconChevronRight class="w-5 h-5 text-[#cccccc] group-hover:text-[#EE4D2D] transition-colors" />
      </a>

      <!-- TikTok Shop Link -->
      <a 
        href="https://tiktok.com/@fegance" 
        target="_blank" 
        rel="noopener noreferrer"
        class="group flex items-center p-4 bg-white border border-[#E5E0DB] rounded-2xl hover:border-black/30 hover:shadow-soft transition-all duration-300"
      >
        <div class="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-black mr-4 transition-colors group-hover:bg-black group-hover:text-white">
          <IconBrandTiktok class="w-6 h-6" />
        </div>
        <div class="flex-1">
          <h2 class="text-[15px] font-semibold text-[#111111]">Shop on TikTok</h2>
          <p class="text-[11px] text-[#666666] uppercase tracking-wider mt-0.5">Live & Promos</p>
        </div>
        <IconChevronRight class="w-5 h-5 text-[#cccccc] group-hover:text-black transition-colors" />
      </a>

      <!-- WhatsApp Link -->
      <a 
        href="https://wa.me/6281234567890" 
        target="_blank" 
        rel="noopener noreferrer"
        class="group flex items-center p-4 bg-white border border-[#E5E0DB] rounded-2xl hover:border-[#25D366]/40 hover:shadow-soft transition-all duration-300"
      >
        <div class="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center text-[#25D366] mr-4 transition-colors group-hover:bg-[#25D366] group-hover:text-white">
          <IconBrandWhatsapp class="w-6 h-6" />
        </div>
        <div class="flex-1">
          <h2 class="text-[15px] font-semibold text-[#111111]">WhatsApp Concierge</h2>
          <p class="text-[11px] text-[#666666] uppercase tracking-wider mt-0.5">Consultation & Order</p>
        </div>
        <IconChevronRight class="w-5 h-5 text-[#cccccc] group-hover:text-[#25D366] transition-colors" />
      </a>

      <!-- Website Link -->
      <router-link 
        to="/" 
        class="group flex items-center p-4 bg-[#111111] border border-[#111111] rounded-2xl hover:bg-[#222222] transition-all duration-300 mt-2 shadow-soft"
      >
        <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white mr-4">
          <IconWorld class="w-6 h-6" />
        </div>
        <div class="flex-1">
          <h2 class="text-[15px] font-semibold text-white">Visit Website</h2>
          <p class="text-[11px] text-[#aaaaaa] uppercase tracking-wider mt-0.5">Full Collection</p>
        </div>
        <IconChevronRight class="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
      </router-link>

    </div>

    <!-- Footer Socials -->
    <div class="mt-12 flex items-center gap-6 text-[#666666]">
      <a href="#" class="hover:text-black transition-colors p-2">
        <IconBrandInstagram class="w-6 h-6" />
      </a>
      <a href="#" class="hover:text-black transition-colors p-2">
        <IconBrandTiktok class="w-6 h-6" />
      </a>
    </div>

  </div>
</template>

<script setup lang="ts">
import { 
  IconBrandShopee, 
  IconBrandTiktok, 
  IconBrandWhatsapp, 
  IconWorld, 
  IconChevronRight,
  IconBrandInstagram
} from '@tabler/icons-vue';
</script>

<style scoped>
.shadow-soft {
  box-shadow: 0 4px 20px rgba(17, 17, 17, 0.05);
}
</style>
