<script setup lang="ts">
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUserAuth } from "@/composables/useUserAuth";
import logoSvg from "@/assets/logo.svg";

const router = useRouter();
const route = useRoute();
const { loginWithGoogle, loginWithEmail } = useUserAuth();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const googleLoading = ref(false);
const errorMsg = ref("");

const redirectPath = (route.query.redirect as string) || "/";

async function handleEmailLogin() {
  if (!email.value || !password.value) return;
  loading.value = true;
  errorMsg.value = "";
  try {
    await loginWithEmail(email.value, password.value);
    router.push(redirectPath);
  } catch (err: any) {
    console.error("Login error:", err);
    if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
      errorMsg.value = "Email atau kata sandi tidak sesuai.";
    } else {
      errorMsg.value = err.message || "Gagal masuk. Silakan coba lagi.";
    }
  } finally {
    loading.value = false;
  }
}

async function handleGoogleLogin() {
  googleLoading.value = true;
  errorMsg.value = "";
  try {
    await loginWithGoogle();
    router.push(redirectPath);
  } catch (err: any) {
    console.error("Google sign-in error:", err);
    errorMsg.value = err.message || "Gagal masuk dengan Google.";
  } finally {
    googleLoading.value = false;
  }
}
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden bg-canvas">
    <!-- Anime Background Scenery -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <img
        src="/images/anime/up.jpg"
        alt="Anime Japanese Scenery"
        class="w-full h-full object-cover object-center filter saturate-[1.1] brightness-[0.92] opacity-40 sm:opacity-50"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-canvas/90 via-canvas/80 to-canvas z-10" />
    </div>

    <!-- Card Container -->
    <div class="relative z-20 w-full max-w-[420px] bg-white/95 backdrop-blur-md rounded-[28px] border border-line shadow-lift p-8 sm:p-10">
      <!-- Brand & Title -->
      <div class="flex flex-col items-center text-center mb-8">
        <router-link to="/" class="mb-4 inline-block hover:opacity-85 transition-opacity">
          <img :src="logoSvg" alt="Fegance" class="h-9 w-auto" />
        </router-link>
        <span class="text-[10px] font-bold tracking-[0.25em] uppercase text-[#c9a227] mb-1">
          Kore wa, kaori no monogatari
        </span>
        <h1 class="text-2xl font-display font-bold text-ink tracking-tight">
          Masuk ke Akun
        </h1>
        <p class="text-xs text-muted mt-1">
          Simpan parfum favoritmu dan sinkronkan wishlist antar perangkat
        </p>
      </div>

      <!-- Error Alert -->
      <div
        v-if="errorMsg"
        class="mb-6 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center leading-relaxed"
      >
        {{ errorMsg }}
      </div>

      <!-- Google Button -->
      <button
        type="button"
        @click="handleGoogleLogin"
        :disabled="googleLoading || loading"
        class="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-line bg-white hover:bg-gray-50 text-ink text-sm font-medium transition-all shadow-sm hover:shadow disabled:opacity-60 cursor-pointer"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span v-if="!googleLoading">Masuk dengan Google</span>
        <span v-else class="text-xs text-muted">Menghubungkan ke Google…</span>
      </button>

      <!-- Divider -->
      <div class="relative my-6 text-center">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-line" />
        </div>
        <span class="relative px-3 bg-white text-[11px] uppercase tracking-wider text-faint">
          atau gunakan email
        </span>
      </div>

      <!-- Email Form -->
      <form @submit.prevent="handleEmailLogin" class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
            Email
          </label>
          <input
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="nama@email.com"
            class="w-full px-4 py-2.5 rounded-xl border border-line bg-surface text-ink text-sm placeholder:text-faint focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink/30 transition-colors"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">
            Kata Sandi
          </label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              autocomplete="current-password"
              placeholder="••••••••"
              class="w-full px-4 py-2.5 pr-10 rounded-xl border border-line bg-surface text-ink text-sm placeholder:text-faint focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink/30 transition-colors"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink p-1"
            >
              <svg v-if="!showPassword" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <svg v-else class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858-5.908a8.962 8.962 0 012.122-.063c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            </button>
          </div>
        </div>

        <button
          type="submit"
          :disabled="loading || googleLoading"
          class="w-full mt-2 py-3 rounded-pill bg-ink text-canvas font-semibold text-xs tracking-wider uppercase hover:bg-black transition-all shadow-soft hover:shadow-lift disabled:opacity-60 cursor-pointer"
        >
          <span v-if="!loading">Masuk</span>
          <span v-else class="inline-flex items-center gap-2">
            <svg class="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Memproses…
          </span>
        </button>
      </form>

      <!-- Register Switch -->
      <div class="mt-8 pt-5 border-t border-line text-center text-xs text-muted">
        Belum memiliki akun Fegance?
        <router-link
          :to="{ path: '/register', query: route.query }"
          class="text-ink font-semibold underline hover:text-[#c9a227] transition-colors ml-1"
        >
          Daftar sekarang
        </router-link>
      </div>

      <!-- Back to home -->
      <div class="mt-4 text-center">
        <router-link to="/" class="text-[11px] text-faint hover:text-ink transition-colors inline-flex items-center gap-1">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Beranda
        </router-link>
      </div>
    </div>
  </div>
</template>
