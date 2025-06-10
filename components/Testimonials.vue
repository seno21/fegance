<template>
  <section class="py-16 bg-amber-50">
    <div class="container mx-auto px-6">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-amber-400 mb-4">
          What Our Clients Say
        </h2>
        <p class="text-black max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our customers have to
          say.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="bg-gray-100 p-6 rounded-lg shadow-xl">
          <div class="flex items-center mb-4">
            <div
              class="h-12 w-12 rounded-full bg-gray-600 overflow-hidden mr-4">
              <img
                :src="`/images/avatar/${testimonial.avatar}`"
                :alt="testimonial.name"
                class="h-full w-full object-cover" />
            </div>
            <div>
              <h4 class="font-bold text-black">{{ testimonial.name }}</h4>
              <p class="text-yellow-700 text-shadow-xl text-sm">
                {{ testimonial.title }}
              </p>
            </div>
          </div>
          <p class="text-black italic">"{{ testimonial.quote }}"</p>
          <div class="flex mt-4 text-yellow-500">
            <span v-for="i in 5" :key="i" class="text-yellow-400"> ★ </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Loyal Customer",
    quote:
      "The Royal Oud is absolutely divine. I get compliments every time I wear it.",
    avatar: "user.png",
  },
  {
    name: "Michael Chen",
    title: "Fragrance Enthusiast",
    quote:
      "Finally found a brand that understands true luxury. The longevity is impressive.",
    avatar: "user.png",
  },
  {
    name: "Emily Rodriguez",
    title: "Fashion Blogger",
    quote:
      "Golden Amber is my signature scent. It perfectly captures elegance and warmth.",
    avatar: "user.png",
  },
];
</script>
