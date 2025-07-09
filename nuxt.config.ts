// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
    },
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "nuxt-icon-tw",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/tailwindcss",
    "nuxt-icon-tw",
  ],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
});
