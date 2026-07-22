<template>
  <div class="min-h-screen bg-ink flex items-center justify-center px-5">
    <div
      class="w-full max-w-[380px] bg-canvas rounded-[20px] shadow-lift p-8 sm:p-10"
    >
      <!-- Logo -->
      <div class="flex flex-col items-center mb-8">
        <img
          :src="logoSvg"
          alt="Fegance"
          class="h-12 w-auto mb-4"
        />
        <h1 class="text-xl font-display font-semibold text-ink tracking-tight">
          Admin Panel
        </h1>
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
            class="w-full px-4 py-3 rounded-xl border border-line bg-surface text-ink text-sm placeholder:text-faint focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
          />
        </div>

        <div>
          <label
            for="password"
            class="block text-xs font-semibold text-muted uppercase tracking-wider mb-1.5"
          >
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="••••••••"
            class="w-full px-4 py-3 rounded-xl border border-line bg-surface text-ink text-sm placeholder:text-faint focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-colors"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="mt-2 w-full py-3 rounded-xl font-display font-semibold text-sm tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
          :class="
            loading
              ? 'bg-gold/70 text-canvas'
              : 'bg-gold text-ink hover:bg-gold-hover shadow-soft hover:shadow-lift'
          "
        >
          <span v-if="!loading">Sign In</span>
          <span v-else class="inline-flex items-center gap-2">
            <svg
              class="animate-spin h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
            >
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'
import logoSvg from '@/assets/logo.svg'

const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMsg = ref('')

async function handleLogin() {
  loading.value = true
  errorMsg.value = ''

  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)
    router.push('/admin')
  } catch (err: any) {
    console.error('Login error:', err)
    errorMsg.value = err.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
