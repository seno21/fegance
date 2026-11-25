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

      <!-- Google Sign In Button -->
      <button
        type="button"
        @click="handleGoogleLogin"
        :disabled="googleLoading || loading"
        class="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-line bg-white hover:bg-gray-50 text-ink text-sm font-medium transition-all shadow-sm hover:shadow disabled:opacity-60 cursor-pointer mb-5"
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
        <span v-if="!googleLoading">Masuk dengan Google Admin</span>
        <span v-else class="text-xs text-muted">Menghubungkan…</span>
      </button>

      <div class="relative mb-5 text-center">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-line" />
        </div>
        <span class="relative px-3 bg-canvas text-[11px] uppercase tracking-wider text-muted">
          atau gunakan email
        </span>
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
            placeholder="fegasusena@gmail.com"
            class="w-full px-4 py-3 rounded-xl border border-line bg-white text-ink text-sm placeholder:text-faint focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink/30 transition-colors"
            style="color: #111111 !important; -webkit-text-fill-color: #111111 !important; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif !important; background-color: #ffffff !important;"
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
              class="w-full px-4 py-3 pr-10 rounded-xl border border-line bg-white text-ink text-sm placeholder:text-faint focus:outline-none focus:border-ink focus:ring-1 focus:ring-ink/30 transition-colors"
              style="color: #111111 !important; -webkit-text-fill-color: #111111 !important; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif !important; background-color: #ffffff !important;"
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
          class="mt-2 w-full py-3 rounded-xl font-display font-semibold text-sm tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed bg-ink text-canvas hover:bg-neutral-800 shadow-soft hover:shadow-lift cursor-pointer"
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
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useUserAuth, formatAuthError } from "@/composables/useUserAuth";
import { updateSessionActivity } from "@/composables/useAdminSession";
import logoSvg from "@/assets/logo.svg";

const route = useRoute();
const router = useRouter();
const { loginWithGoogle } = useUserAuth();

const email = ref("");
const password = ref("");
const showPassword = ref(false);
const loading = ref(false);
const googleLoading = ref(false);
const errorMsg = ref("");

const isTimeout = computed(() => route.query.reason === "timeout");
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "fegasusena@gmail.com";

async function handleLogin() {
  loading.value = true;
  errorMsg.value = "";

  try {
    const cred = await signInWithEmailAndPassword(auth, email.value, password.value);
    if (cred.user.email !== ADMIN_EMAIL) {
      await signOut(auth);
      errorMsg.value = "Akun ini tidak memiliki akses administrator.";
      return;
    }
    updateSessionActivity();
    router.push("/admin");
  } catch (err: any) {
    console.error("Login error:", err);
    errorMsg.value = formatAuthError(err);
  } finally {
    loading.value = false;
  }
}

async function handleGoogleLogin() {
  googleLoading.value = true;
  errorMsg.value = "";

  try {
    const res = await loginWithGoogle();
    if (res) {
      if (res.email !== ADMIN_EMAIL && auth.currentUser?.email !== ADMIN_EMAIL) {
        await signOut(auth);
        errorMsg.value = "Akun Google ini tidak memiliki hak akses administrator.";
        return;
      }
      updateSessionActivity();
      router.push("/admin");
    }
  } catch (err: any) {
    console.error("Google sign-in error:", err);
    errorMsg.value = formatAuthError(err);
  } finally {
    googleLoading.value = false;
  }
}
</script>
