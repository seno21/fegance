<template>
  <div class="min-h-screen bg-gray-900 text-gray-100 font-sans">
    <Header />

    <main class="container mx-auto px-6 py-16 pt-32 md:pt-40 lg:pt-48">
      <section class="text-center mb-16 md:mb-24">
        <h1 class="text-5xl md:text-6xl font-serif font-bold text-amber-300 mb-6 leading-tight">Hubungi Kami</h1>
        <p class="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto">Punya pertanyaan, saran, atau hanya ingin menyapa? Kami senang mendengar dari Anda!</p>
      </section>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20 md:mb-32">
        <section class="p-8 bg-gray-950 rounded-lg shadow-xl">
          <h2 class="text-3xl md:text-4xl font-serif font-semibold text-amber-200 mb-8">Kirimkan Pesan</h2>
          <form @submit.prevent="submitForm" class="space-y-6">
            <div>
              <label for="name" class="block text-lg font-medium text-gray-300 mb-2">Nama Lengkap</label>
              <input type="text" id="name" v-model="formData.name" required class="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-amber-400 focus:ring focus:ring-amber-400 focus:ring-opacity-50 text-white" />
            </div>
            <div>
              <label for="email" class="block text-lg font-medium text-gray-300 mb-2">Email Anda</label>
              <input type="email" id="email" v-model="formData.email" required class="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-amber-400 focus:ring focus:ring-amber-400 focus:ring-opacity-50 text-white" />
            </div>
            <div>
              <label for="subject" class="block text-lg font-medium text-gray-300 mb-2">Subjek</label>
              <input type="text" id="subject" v-model="formData.subject" required class="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-amber-400 focus:ring focus:ring-amber-400 focus:ring-opacity-50 text-white" />
            </div>
            <div>
              <label for="message" class="block text-lg font-medium text-gray-300 mb-2">Pesan Anda</label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="6"
                required
                class="w-full p-3 rounded-md bg-gray-800 border border-gray-700 focus:border-amber-400 focus:ring focus:ring-amber-400 focus:ring-opacity-50 text-white"
              ></textarea>
            </div>
            <button type="submit" class="w-full py-3 px-6 bg-amber-500 text-white font-semibold rounded-lg hover:bg-amber-600 focus:ring-4 focus:ring-amber-300 transition duration-300 ease-in-out transform hover:-translate-y-1">
              Kirim Pesan
            </button>
          </form>
          <p v-if="formStatus" class="mt-4 text-center text-lg" :class="{ 'text-green-400': formStatus === 'success', 'text-red-400': formStatus === 'error' }">
            {{ formMessage }}
          </p>
        </section>

        <section class="p-8 bg-gray-950 rounded-lg shadow-xl flex flex-col justify-between">
          <div>
            <h2 class="text-3xl md:text-4xl font-serif font-semibold text-amber-200 mb-8">Atau Hubungi Kami Langsung</h2>

            <div class="space-y-6 text-lg text-gray-200">
              <div class="flex items-start">
                <Icon icon="ic:round-email" class="text-amber-400 mr-3 mt-1 flex-shrink-0" width="28" height="28" />
                <div>
                  <h3 class="font-semibold text-amber-100">Email</h3>
                  <a href="mailto:info@fegance.com" class="hover:text-amber-300 transition">adarafaranisa443@gmail.com</a>
                  <p class="text-gray-400 text-sm">Respons dalam 1-2 hari kerja</p>
                </div>
              </div>

              <div class="flex items-start">
                <Icon icon="ic:round-phone" class="text-amber-400 mr-3 mt-1 flex-shrink-0" width="28" height="28" />
                <div>
                  <h3 class="font-semibold text-amber-100">Telepon</h3>
                  <a href="tel:+628123456789" class="hover:text-amber-300 transition">+62 896-6149-9225</a>
                  <p class="text-gray-400 text-sm">Tersedia Senin-Jumat, 09:00 - 17:00 WIB</p>
                </div>
              </div>

              <div class="flex items-start">
                <Icon icon="ic:round-location-on" class="text-amber-400 mr-3 mt-1 flex-shrink-0" width="28" height="28" />
                <div>
                  <h3 class="font-semibold text-amber-100">Alamat Studio/Kantor (Opsional)</h3>
                  <p>Jl. Wangi No. 123, Kota Aroma,</p>
                  <p>Depok, Jawa Barat, Indonesia 16418</p>
                  <p class="text-gray-400 text-sm">Hanya dengan janji temu</p>
                </div>
              </div>

              <div class="flex items-start">
                <Icon icon="ic:round-business-center" class="text-amber-400 mr-3 mt-1 flex-shrink-0" width="28" height="28" />
                <div>
                  <h3 class="font-semibold text-amber-100">Kerja Sama & Media</h3>
                  <a href="mailto:partnership@fegance.com" class="hover:text-amber-300 transition">partnership@fegance.com</a>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-10 text-center">
            <h3 class="text-2xl font-semibold text-amber-200 mb-4">Ikuti Kami</h3>
            <div class="flex justify-center space-x-6">
              <a href="https://instagram.com/fegance" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                <Icon icon="mdi:instagram" width="40" height="40" />
              </a>
              <a href="https://facebook.com/fegance" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                <Icon icon="mdi:facebook" width="40" height="40" />
              </a>
              <a href="https://twitter.com/fegance" target="_blank" rel="noopener noreferrer" class="text-gray-300 hover:text-amber-400 transition-colors duration-200">
                <Icon icon="mdi:twitter" width="40" height="40" />
              </a>
            </div>
          </div>
        </section>
      </div>

      <section class="max-w-4xl mx-auto py-12">
        <h2 class="text-4xl md:text-5xl font-serif font-bold text-amber-300 mb-12 text-center">Pertanyaan Umum (FAQ)</h2>
        <div class="space-y-6">
          <div v-for="(faq, index) in faqs" :key="index" class="bg-gray-950 p-6 rounded-lg shadow-md cursor-pointer" @click="toggleFaq(index)">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-semibold text-amber-200">{{ faq.question }}</h3>
              <Icon :icon="faq.isOpen ? 'ic:round-expand-less' : 'ic:round-expand-more'" class="text-amber-400" width="28" height="28" />
            </div>
            <p v-show="faq.isOpen" class="mt-4 text-lg text-gray-300">{{ faq.answer }}</p>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";

// Data untuk formulir kontak
const formData = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const formStatus = ref(null); // 'success' or 'error'
const formMessage = ref("");

const submitForm = async () => {
  formStatus.value = null;
  formMessage.value = "Mengirim pesan Anda...";

  // --- LOGIKA PENGIRIMAN FORMULIR ---
  // Di sini kamu perlu mengintegrasikan dengan layanan pengiriman formulir.
  // Beberapa opsi populer:
  // 1. Backend API kustom (Node.js, Laravel, dll.)
  // 2. Layanan pihak ketiga seperti Formspree, Netlify Forms, Getform, Basin, dll.
  //    (Biasanya hanya perlu mengubah action URL di tag <form> atau mengirim POST request ke endpoint mereka)
  // 3. EmailJS (mengirim email langsung dari frontend)

  // Contoh placeholder sukses/error (ganti dengan logika asli)
  try {
    // Simulasikan pengiriman API
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulasi delay

    // Ini adalah tempat kamu akan mengirim data. Contoh Fetch API:
    // const response = await fetch('/api/contact', { // Ganti dengan endpoint API kamu
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(formData.value),
    // });

    // if (response.ok) { // Atau cek response.status === 200
    formStatus.value = "success";
    formMessage.value = "Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.";
    formData.value = { name: "", email: "", subject: "", message: "" }; // Reset form
    // } else {
    //   formStatus.value = 'error';
    //   formMessage.value = 'Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.';
    // }
  } catch (error) {
    console.error("Error submitting form:", error);
    formStatus.value = "error";
    formMessage.value = "Terjadi masalah koneksi. Silakan periksa jaringan Anda atau coba lagi.";
  }
};

// Data untuk FAQ
const faqs = ref([
  {
    question: "Bagaimana cara melacak pesanan saya?",
    answer: "Setelah pesanan Anda dikirim, Anda akan menerima email konfirmasi dengan nomor pelacakan dan tautan untuk melacak status pengiriman Anda.",
    isOpen: false,
  },
  {
    question: "Apakah Fegance mengirimkan produk ke luar negeri?",
    answer: "Saat ini, kami hanya melayani pengiriman di wilayah Indonesia. Kami sedang berupaya untuk memperluas jangkauan pengiriman kami di masa mendatang.",
    isOpen: false,
  },
  {
    question: "Apa kebijakan pengembalian atau penukaran produk?",
    answer: "Kami menerima pengembalian atau penukaran produk dalam waktu 14 hari setelah pembelian, asalkan produk dalam kondisi belum digunakan dan kemasan asli. Silakan hubungi tim dukungan kami untuk proses lebih lanjut.",
    isOpen: false,
  },
  {
    question: "Apakah parfum Fegance terbuat dari bahan alami?",
    answer:
      "Kami berkomitmen menggunakan bahan-bahan berkualitas tinggi, termasuk ekstrak alami dan molekul sintetis aman yang dipilih secara cermat untuk menciptakan keharuman yang kompleks dan tahan lama. Detail komposisi dapat ditemukan di halaman produk masing-masing.",
    isOpen: false,
  },
]);

const toggleFaq = (index) => {
  faqs.value[index].isOpen = !faqs.value[index].isOpen;
};
</script>
