<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import logoSvg from "@/assets/logo.svg";
import { useAdminSession, clearSessionActivity } from "@/composables/useAdminSession";

const route = useRoute();
const router = useRouter();
const mobileOpen = ref(false);

// Initialize 10-minute inactivity session tracking
useAdminSession();

const navItems = [
  {
    label: "Dashboard",
    to: "/admin",
    exact: true,
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />`,
  },
  {
    label: "Hero",
    to: "/admin/hero",
    exact: false,
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />`,
  },
  {
    label: "Product",
    to: "/admin/products",
    exact: false,
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />`,
  },
  {
    label: "Philosophy",
    to: "/admin/philosophy",
    exact: false,
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />`,
  },
  {
    label: "Standar Card",
    to: "/admin/standards",
    exact: false,
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 5.591-3.824 10.29-9 11.622C6.824 22.29 3 17.59 3 12V5l9-2 9 2v7z" />`,
  },
  {
    label: "Users",
    to: "/admin/users",
    exact: false,
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />`,
  },
  {
    label: "Settings",
    to: "/admin/settings",
    exact: false,
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />`,
  },
];

function isActive(item: (typeof navItems)[number]): boolean {
  if (item.exact) return route.path === item.to;
  return route.path.startsWith(item.to);
}

async function logout() {
  clearSessionActivity();
  await signOut(auth);
  router.push("/");
}

watch(
  () => route.path,
  () => {
    mobileOpen.value = false;
  }
);
</script>

<template>
  <!-- Mobile hamburger -->
  <button
    @click="mobileOpen = true"
    class="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-[#111111] text-white shadow-lift border border-white/10"
    aria-label="Buka menu admin"
  >
    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  </button>

  <!-- Mobile overlay -->
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-150"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="mobileOpen"
      @click="mobileOpen = false"
      class="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
    />
  </Transition>

  <!-- Sidebar -->
  <aside
    class="fixed top-0 left-0 z-50 h-screen w-64 flex flex-col bg-[#111111] text-canvas border-r border-white/10 transition-transform duration-200 ease-in-out lg:translate-x-0"
    :class="mobileOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <!-- Brand Header -->
    <div class="flex items-center justify-between px-6 h-20 border-b border-white/10">
      <div class="flex items-center gap-3">
        <img :src="logoSvg" alt="Fegance" class="h-6 w-auto filter invert brightness-200" />
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="text-sm font-display font-bold tracking-wider uppercase text-white">Fegance</span>
            <span class="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#c9a227]/20 text-[#c9a227] border border-[#c9a227]/30">
              Admin
            </span>
          </div>
          <span class="text-[10px] text-white/40 tracking-wider">Maison Atelier</span>
        </div>
      </div>
      <button
        @click="mobileOpen = false"
        class="lg:hidden p-1.5 text-white/50 hover:text-white transition-colors"
        aria-label="Tutup menu"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 overflow-y-auto py-5 px-3 space-y-1">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 relative group"
        :class="
          isActive(item)
            ? 'bg-white/10 text-white font-bold border-l-2 border-[#c9a227] pl-3'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        "
      >
        <svg
          class="w-4.5 h-4.5 shrink-0 transition-transform group-hover:scale-105"
          :class="isActive(item) ? 'text-[#c9a227]' : 'text-white/50 group-hover:text-white'"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          stroke-width="1.6"
          v-html="item.icon"
        />
        <span>{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Footer Controls -->
    <div class="px-3 py-4 border-t border-white/10 space-y-1.5">
      <a
        href="/"
        target="_blank"
        class="flex items-center gap-3 w-full px-3.5 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
      >
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
        Lihat Website
      </a>
      <button
        @click="logout"
        class="flex items-center gap-3 w-full px-3.5 py-2 rounded-xl text-xs font-medium text-white/50 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
      >
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
        </svg>
        Keluar
      </button>
    </div>
  </aside>

  <!-- Main content area -->
  <div class="lg:ml-64 min-h-screen bg-canvas">
    <router-view />
  </div>
</template>
