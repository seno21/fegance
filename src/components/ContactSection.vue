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
];
</script>

<template>
  <section id="contact" class="py-[120px] bg-[#F8F8F8] overflow-hidden">
    <div class="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <!-- Copy -->
        <div data-aos="fade-right" data-aos-duration="800">
          <p
            class="text-[11px] font-bold tracking-[0.22em] text-gold uppercase block mb-4"
          >
            Get In Touch
          </p>
          <h2 class="h-display text-3xl sm:text-4xl lg:text-5xl text-ink">
            Let&apos;s start a conversation.
          </h2>
          <div class="w-12 h-[1px] bg-gold mt-5" />
          <p
            class="mt-6 text-sm sm:text-base text-muted leading-relaxed max-w-md"
          >
            Punya pertanyaan, ingin melacak pesanan, atau sekadar menyapa? Kami
            akan dengan senang hati membantu.
          </p>

          <div class="mt-10 space-y-3">
            <div class="flex items-start gap-3 text-sm">
              <div
                class="w-9 h-9 rounded-full bg-[#faf7f2] border border-line flex items-center justify-center flex-shrink-0 mt-0.5"
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
                  Fegance Project
                </p>
                <p class="text-ink mt-0.5">Kab. Cirebon</p>
                <p class="text-muted text-xs mt-0.5">
                  Mon &ndash; Sat &middot; 09.00 &ndash; 20.00 WIB
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact cards -->
        <div
          class="flex flex-col gap-4 sm:gap-6"
          data-aos="fade-left"
          data-aos-duration="800"
        >
          <a
            v-for="(c, i) in contacts"
            :key="c.name"
            :href="c.link"
            :target="c.external ? '_blank' : undefined"
            :rel="c.external ? 'noopener noreferrer' : undefined"
            class="group relative bg-[#FFFFFF] border border-[#ECECEC] rounded-[24px] p-8 transition-all duration-300 hover:border-gold hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(201,162,39,0.08)] flex flex-col justify-between overflow-hidden min-h-[180px]"
            :data-aos="'fade-up'"
            :data-aos-delay="i * 120"
            data-aos-duration="800"
          >
            <!-- Background Decorative Glow -->
            <div
              class="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl transition-all duration-500 group-hover:bg-gold/10 group-hover:scale-150"
            ></div>

            <div>
              <div class="flex items-center justify-between mb-4">
                <span
                  class="text-[10px] tracking-[0.25em] font-bold uppercase text-gold"
                >
                  {{ c.name }}
                </span>

                <!-- Icon Circle background -->
                <div
                  class="w-8 h-8 rounded-full bg-[#faf7f2] flex items-center justify-center transition-colors duration-300 group-hover:bg-gold"
                >
                  <svg
                    class="w-4 h-4 text-gold transition-colors duration-300 group-hover:text-[#FFFFFF]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M7 17L17 7M17 7H7M17 7v10"
                    />
                  </svg>
                </div>
              </div>

              <h3
                class="font-display text-2xl sm:text-3xl font-semibold text-[#111111] leading-tight break-all"
              >
                {{ c.handle }}
              </h3>
            </div>

            <p
              class="mt-6 text-xs text-[#666666] tracking-wide font-sans group-hover:text-gold transition-colors"
            >
              {{
                c.name === "WhatsApp"
                  ? "Chat with us directly"
                  : "Follow our journey"
              }}
            </p>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
