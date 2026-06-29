<script setup lang="ts">
interface Contact {
  name: string;
  handle: string;
  link: string;
  external: boolean;
}

const contacts: Contact[] = [
  {
    name: "WhatsApp",
    handle: "+62 851 7237 2101",
    link: "https://wa.me/6285172372101",
    external: true,
  },
  {
    name: "Instagram",
    handle: "@fegance.id",
    link: "https://www.instagram.com/fegance.id",
    external: true,
  },
  {
    name: "TikTok",
    handle: "@fegance.id",
    link: "https://www.tiktok.com/@fegance.id",
    external: true,
  },
  {
    name: "Email",
    handle: "feganceofficial@gmail.com",
    link: "mailto:feganceofficial@gmail.com",
    external: false,
  },
];
</script>

<template>
  <section id="contact" class="section bg-surface">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <!-- Copy -->
        <div data-aos="fade-right" data-aos-duration="800">
          <p class="eyebrow mb-4">Get In Touch</p>
          <h2 class="h-display text-3xl sm:text-4xl lg:text-5xl text-ink">
            Let&apos;s start a conversation.
          </h2>
          <span class="gold-rule mt-5" />
          <p
            class="mt-6 text-sm sm:text-base text-muted leading-relaxed max-w-md"
          >
            Whether you need a fragrance consultation, want to track an order,
            or simply wish to say hello — we are here, and we love hearing from
            you.
          </p>

          <div class="mt-10 space-y-3">
            <div class="flex items-start gap-3 text-sm">
              <div
                class="w-9 h-9 rounded-full bg-canvas border border-line flex items-center justify-center flex-shrink-0 mt-0.5"
              >
                <svg
                  class="w-4 h-4 text-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  stroke-width="1.6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <div>
                <p class="text-[10px] tracking-[0.2em] uppercase text-faint">
                  Maison Fégance
                </p>
                <p class="text-ink mt-0.5">Jl. Nataswara 001, Cirebon</p>
                <p class="text-muted text-xs mt-0.5">
                  Mon &ndash; Sat &middot; 09.00 &ndash; 20.00 WIB
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact cards -->
        <div
          class="grid sm:grid-cols-2 gap-3 sm:gap-4"
          data-aos="fade-left"
          data-aos-duration="800"
        >
          <a
            v-for="(c, i) in contacts"
            :key="c.name"
            :href="c.link"
            :target="c.external ? '_blank' : undefined"
            :rel="c.external ? 'noopener noreferrer' : undefined"
            class="group bg-canvas border border-line rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:border-ink hover:-translate-y-0.5 hover:shadow-lift"
            :data-aos="'fade-up'"
            :data-aos-delay="i * 80"
            data-aos-duration="700"
          >
            <div class="flex items-center justify-between">
              <p class="text-[10px] tracking-[0.2em] uppercase text-faint">
                {{ c.name }}
              </p>
              <svg
                class="w-4 h-4 text-ink transition-all duration-300 group-hover:text-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                stroke-width="1.6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7 17L17 7M17 7H7M17 7v10"
                />
              </svg>
            </div>
            <p class="mt-3 font-display text-lg sm:text-xl text-ink break-all">
              {{ c.handle }}
            </p>
            <p class="mt-1 text-xs text-muted">
              {{
                c.name === "Email" ? "Drop us a line" : "Chat with us directly"
              }}
            </p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
