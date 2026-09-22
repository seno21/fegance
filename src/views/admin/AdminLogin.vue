<template>
  <div class="min-h-screen bg-ink flex items-center justify-center px-5">
    <div
      class="w-full max-w-[380px] bg-canvas rounded-[20px] shadow-lift p-8 sm:p-10"
    >
      <!-- Logo -->
      <div class="flex flex-col items-center mb-6">
        <img :src="logoSvg" alt="Fegance" class="h-12 w-auto mb-4" />
        <h1 class="text-xl font-display font-semibold text-ink tracking-tight">
          Fegance Admin
        </h1>
      </div>

      <!-- Timeout Notice -->
      <div
        v-if="isTimeout"
        class="mb-5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed text-center"
      >
        Sesi Anda telah berakhir karena tidak ada aktivitas selama 10 menit. Silakan login kembali.
      </div>

      <!-- Error -->
      <div
        v-if="errorMsg"
        class="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm text-center"
      >
        {{ errorMsg }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
        <div>
          <label
            for="email"
            class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            autocomplete="email"
            placeholder="admin@fegance.com"
            class="w-full px-4 py-3 rounded-xl border border-line bg-surface text-black text-sm placeholder:text-faint focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink/30 transition-colors font-sans"
            style="color: #000000; -webkit-text-fill-color: #000000;"
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5"
          >
            Password
          </label>
          <div class="relative">
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              autocomplete="current-password"
              placeholder="••••••••"
              class="w-full px-4 py-3 pr-10 rounded-xl border border-line bg-surface text-black text-sm placeholder:text-faint focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink/30 transition-colors font-sans"
              style="color: #000000; -webkit-text-fill-color: #000000;"
            />
            <button
              type="button"
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none p-1"
              :title="showPassword ? 'Sembunyikan password' : 'Tampilkan password'"
              tabindex="-1"
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
          :disabled="loading"
          class="mt-2 w-full py-3 rounded-xl font-display font-semibold text-sm tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed bg-ink text-canvas hover:bg-neutral-800 shadow-soft hover:shadow-lift"
        >
          <span v-if="!loading">Sign In</span>
          <span v-else class="inline-flex items-center gap-2">
            <svg class="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="3"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Signing in…
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { updateSessionActivity } from "@/composables/useAdminSession";
import logoSvg from "@/assets/logo.svg";

const route = useRoute();
const router = useRouter();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const errorMsg = ref("");

const isTimeout = computed(() => route.query.reason === "timeout");

async function handleLogin() {
  loading.value = true;
  errorMsg.value = "";

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    updateSessionActivity();
    router.push("/admin");
  } catch (err: any) {
    console.error("Login error:", err);
    errorMsg.value = err.message || "Login failed. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>
