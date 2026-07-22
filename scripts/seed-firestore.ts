/**
 * Firestore Seed Script
 *
 * Run this once to populate your Firestore database with initial data.
 * Usage: npx tsx scripts/seed-firestore.ts
 *
 * Make sure your .env file has the correct Firebase config.
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import * as dotenv from "dotenv";

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const products = [
  {
    name: "Leorin",
    slug: "midnight-gold",
    price: 75000,
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&h=800&fit=crop",
    shortDescription: "Elegant woody fragrance with a touch of gold.",
    description:
      "Leorin is a luxurious perfume crafted for those who command attention. With its deep woody base and bright citrus opening, it transitions seamlessly from day to night. Every spritz leaves a trail of sophistication that lingers for hours.",
    category: "Eau de Parfum",
    family: "woody",
    size: "50 ml",
    topNotes: ["Bergamot", "Lemon", "Pink Pepper"],
    middleNotes: ["Lavender", "Rose", "Jasmine"],
    baseNotes: ["Amber", "Musk", "Sandalwood"],
    shopeeLink:
      "https://shopee.co.id/Maison-Fegance-Midnight-Gold-i.dummy.midnight-gold",
    tiktokLink: "https://shop.tiktok.com/view/product/dummy-midnight-gold",
    whatsappLink:
      "https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Midnight%20Gold",
    performance: {
      type: "Gen XY (Masculine)",
      sillage: "Medium to strong",
      projection: "2-3 meters",
      longevity: "3-4 hours outdoors, up to 6 hours indoors",
    },
    isNew: false,
    isBestseller: true,
  },
  {
    name: "Velvet Rose",
    slug: "velvet-rose",
    price: 65000,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop",
    shortDescription: "Romantic floral bouquet with velvety finish.",
    description:
      "Velvet Rose captures the essence of a blooming garden at dusk. The rich damask rose takes center stage, wrapped in warm vanilla and patchouli. A fragrance that speaks of timeless romance and quiet confidence.",
    category: "Eau de Parfum",
    family: "floral",
    size: "50 ml",
    topNotes: ["Raspberry", "Orange Blossom"],
    middleNotes: ["Damask Rose", "Iris", "Peony"],
    baseNotes: ["Vanilla", "Patchouli", "White Musk"],
    shopeeLink:
      "https://shopee.co.id/Maison-Fegance-Velvet-Rose-i.dummy.velvet-rose",
    tiktokLink: "https://shop.tiktok.com/view/product/dummy-velvet-rose",
    whatsappLink:
      "https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Velvet%20Rose",
    performance: {
      type: "Floral Rose (Feminine)",
      sillage: "Moderate",
      projection: "1.5 meters",
      longevity: "5-6 hours",
    },
    isNew: false,
    isBestseller: false,
  },
  {
    name: "Ocean Noir",
    slug: "ocean-noir",
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=800&fit=crop",
    shortDescription: "Fresh aquatic scent with dark undertones.",
    description:
      "Ocean Noir evokes the mystery of the deep sea meeting the night sky. Salty sea breeze mingles with dark woods and aromatic herbs. A fragrance for the adventurous soul who finds beauty in the unknown.",
    category: "Eau de Toilette",
    family: "fresh",
    size: "75 ml",
    topNotes: ["Sea Breeze", "Bergamot", "Cypress"],
    middleNotes: ["Lavender", "Sage", "Geranium"],
    baseNotes: ["Vetiver", "Cedarwood", "Ambergris"],
    shopeeLink:
      "https://shopee.co.id/Maison-Fegance-Ocean-Noir-i.dummy.ocean-noir",
    tiktokLink: "https://shop.tiktok.com/view/product/dummy-ocean-noir",
    whatsappLink:
      "https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Ocean%20Noir",
    performance: {
      type: "Fresh Aquatic (Masculine)",
      sillage: "Medium",
      projection: "1-2 meters",
      longevity: "4-5 hours",
    },
    isNew: true,
    isBestseller: false,
  },
  {
    name: "Crystal Bloom",
    slug: "crystal-bloom",
    price: 85000,
    image:
      "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&h=800&fit=crop",
    shortDescription: "Crystalline floral with sparkling freshness.",
    description:
      "Crystal Bloom is a radiant fragrance that dances on the skin like morning dew on petals. Its sparkling citrus opening gives way to an exquisite floral heart, settling into a warm, sensual base that captivates the senses.",
    category: "Eau de Parfum",
    family: "floral",
    size: "50 ml",
    topNotes: ["Mandarin", "Blackcurrant", "Pear"],
    middleNotes: ["Freesia", "Lily of the Valley", "Magnolia"],
    baseNotes: ["Musk", "Sandalwood", "Cashmeran"],
    shopeeLink:
      "https://shopee.co.id/Maison-Fegance-Crystal-Bloom-i.dummy.crystal-bloom",
    tiktokLink: "https://shop.tiktok.com/view/product/dummy-crystal-bloom",
    whatsappLink:
      "https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Crystal%20Bloom",
    performance: {
      type: "Floral Fresh (Feminine)",
      sillage: "Intimate to moderate",
      projection: "1 meter",
      longevity: "4-5 hours",
    },
    isNew: false,
    isBestseller: false,
  },
  {
    name: "Ember Oud",
    slug: "ember-oud",
    price: 100000,
    image:
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=800&fit=crop",
    shortDescription: "Rich smoky oud with warm spices.",
    description:
      "Ember Oud is an intense journey through ancient trade routes. Smoky agarwood blends with saffron and leather, creating a bold statement of power and prestige. A fragrance that leaves an indelible mark wherever it goes.",
    category: "Eau de Parfum Intense",
    family: "oriental",
    size: "50 ml",
    topNotes: ["Saffron", "Cardamom", "Cinnamon"],
    middleNotes: ["Oud", "Leather", "Labdanum"],
    baseNotes: ["Frankincense", "Benzoin", "Cedarwood"],
    shopeeLink:
      "https://shopee.co.id/Maison-Fegance-Ember-Oud-i.dummy.ember-oud",
    tiktokLink: "https://shop.tiktok.com/view/product/dummy-ember-oud",
    whatsappLink:
      "https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Ember%20Oud",
    performance: {
      type: "Oriental Woody (Unisex)",
      sillage: "Strong",
      projection: "2-3 meters",
      longevity: "8-12 hours",
    },
    isNew: false,
    isBestseller: true,
  },
  {
    name: "Iris Garden",
    slug: "iris-garden",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=800&fit=crop",
    shortDescription: "Powdery floral elegance with green accords.",
    description:
      "Iris Garden transports you to a serene French garden in full bloom. Delicate iris root mingles with fresh violet leaves and soft musk. A refined, understated fragrance that whispers elegance without saying a word.",
    category: "Eau de Parfum",
    family: "floral",
    size: "50 ml",
    topNotes: ["Violet Leaf", "Green Notes", "Bergamot"],
    middleNotes: ["Iris", "Heliotrope", "Rose"],
    baseNotes: ["Musk", "Cedar", "Vanilla"],
    shopeeLink:
      "https://shopee.co.id/Maison-Fegance-Iris-Garden-i.dummy.iris-garden",
    tiktokLink: "https://shop.tiktok.com/view/product/dummy-iris-garden",
    whatsappLink:
      "https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Iris%20Garden",
    performance: {
      type: "Floral Green (Feminine)",
      sillage: "Moderate",
      projection: "1.5 meters",
      longevity: "5-6 hours",
    },
    isNew: false,
    isBestseller: false,
  },
  {
    name: "Amber Nights",
    slug: "amber-nights",
    price: 80000,
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&h=800&fit=crop",
    shortDescription: "Warm amber vanilla for evening allure.",
    description:
      "Amber Nights is the olfactory equivalent of a warm embrace under a starlit sky. Rich amber and vanilla create a cocoon of comfort, while spicy saffron adds an unexpected twist. Perfect for evenings when you want to be unforgettable.",
    category: "Eau de Parfum",
    family: "oriental",
    size: "50 ml",
    topNotes: ["Saffron", "Cinnamon", "Orange"],
    middleNotes: ["Amber", "Jasmine", "Ylang-Ylang"],
    baseNotes: ["Vanilla", "Tonka Bean", "Musk"],
    shopeeLink:
      "https://shopee.co.id/Maison-Fegance-Amber-Nights-i.dummy.amber-nights",
    tiktokLink: "https://shop.tiktok.com/view/product/dummy-amber-nights",
    whatsappLink:
      "https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Amber%20Nights",
    performance: {
      type: "Oriental Warm (Unisex)",
      sillage: "Strong",
      projection: "2 meters",
      longevity: "7-9 hours",
    },
    isNew: true,
    isBestseller: false,
  },
  {
    name: "Citrus Sky",
    slug: "citrus-sky",
    price: 50000,
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=800&fit=crop",
    shortDescription: "Bright citrus blend for an uplifting feel.",
    description:
      "Citrus Sky is an explosion of sunshine in a bottle. Juicy Mediterranean fruits dance with aromatic herbs for an uplifting experience that energizes the spirit. A daily essential for those who see the bright side of life.",
    category: "Eau de Toilette",
    family: "citrus",
    size: "75 ml",
    topNotes: ["Grapefruit", "Lemon", "Mandarin"],
    middleNotes: ["Basil", "Mint", "Rosemary"],
    baseNotes: ["Cedarwood", "Musk", "White Amber"],
    shopeeLink:
      "https://shopee.co.id/Maison-Fegance-Citrus-Sky-i.dummy.citrus-sky",
    tiktokLink: "https://shop.tiktok.com/view/product/dummy-citrus-sky",
    whatsappLink:
      "https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Citrus%20Sky",
    performance: {
      type: "Citrus Aromatic (Unisex/Masculine)",
      sillage: "Medium",
      projection: "1 meter",
      longevity: "4-6 hours",
    },
    isNew: false,
    isBestseller: false,
  },
];

const testimonials = [
  {
    name: "Sarah Wijaya",
    role: "Beauty Editor, Jakarta",
    text: "I have been wearing Leorin for a month and I get compliments everywhere I go. The longevity is incredible — easily 8+ hours on my skin.",
    rating: 5,
  },
  {
    name: "Dimas Pratama",
    role: "Creative Director",
    text: "Ember Oud is the most sophisticated scent I have ever owned. Worth every rupiah. Packaged beautifully, feels like a true luxury ritual.",
    rating: 5,
  },
  {
    name: "Rina Kusuma",
    role: "Verified Buyer",
    text: "Velvet Rose is my signature scent now. It is feminine without being overpowering. Absolutely love how it evolves through the day.",
    rating: 5,
  },
  {
    name: "Andi Hartono",
    role: "Loyal Customer",
    text: "Ocean Noir is perfect for daily wear. Fresh yet has depth. Fast shipping and great packaging — the unboxing alone feels like a gift.",
    rating: 5,
  },
  {
    name: "Maya Putri",
    role: "Verified Buyer",
    text: "Crystal Bloom makes me feel like I am walking through a garden in spring. Such a beautiful, delicate fragrance — I am on my third bottle.",
    rating: 5,
  },
];

const scentFamilies = [
  {
    id: "floral",
    name: "Floral",
    tagline: "Romantic & Timeless",
    description:
      "Bouquets of rose, iris, jasmine and peony for the dreamers and romantics.",
    image:
      "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&h=700&fit=crop",
  },
  {
    id: "woody",
    name: "Woody",
    tagline: "Bold & Grounded",
    description:
      "Sandalwood, cedar, and oud — quiet confidence, distilled into scent.",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=700&fit=crop",
  },
  {
    id: "oriental",
    name: "Oriental",
    tagline: "Warm & Mysterious",
    description:
      "Amber, vanilla, and exotic spices that linger long after the moment passes.",
    image:
      "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=700&fit=crop",
  },
  {
    id: "fresh",
    name: "Fresh",
    tagline: "Clean & Aquatic",
    description:
      "Sea breeze, herbs, and green notes for those who crave clarity and calm.",
    image:
      "https://images.unsplash.com/photo-1761419647919-233829f0f469?w=600&h=700&fit=crop",
  },
  {
    id: "citrus",
    name: "Citrus",
    tagline: "Bright & Uplifting",
    description:
      "Bergamot, mandarin, and grapefruit — sunshine captured in a bottle.",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&h=700&fit=crop",
  },
];

const siteContent = {
  hero: {
    tagline: "Wangi Dulu",
    taglineAccent: "Sisanya Nanti",
    subtitle:
      "Pilih aroma favorit kamu. Biar wangi aja yang bicara, gak perlu repot menjelaskan siapa dirimu.",
    ctaPrimary: "View Collection",
    ctaSecondary: "Our Story",
    imageUrl: "",
  },
  brandStory: {
    eyebrow: "Our Philosophy",
    title: "Let Us Tell You a Little",
    titleAccent: "About Who We Are",
    paragraphs: [
      "Fegance lahir dari rasa penasaran terhadap dunia parfum. Bagi kami, parfum adalah sebuah karya seni. Ia merupakan bagian dari keindahan—meski ia tak memiliki rupa, namun hidup lama di ingatan. Ia bagian dari identitas seseorang, menentukan bagaimana orang menilaimu pertama kali.",
      "Layaknya sebuah brand yang terus bertumbuh, Fegance berkomitmen untuk selalu berkembang. Kami terus menyempurnakan setiap komposisi, memilih formulasi terbaik, serta menggunakan bahan-bahan premium agar setiap aroma yang kami hadirkan memiliki kualitas yang layak dikenang.",
      "Di balik setiap judul parfum yang kami ciptakan, selalu ada sebuah cerita. Kami percaya bahwa sebuah parfum adalah medium untuk menyampaikan karakter. Kami ingin setiap parfum Fegance menjadi bagian dari keseharianmu, dan menceritakan identitasmu—tanpa perlu banyak kata.",
    ],
    stats: [
      { value: "Every Bottle", label: "Handcrafted" },
      { value: "Signature Scents", label: "Inspired of" },
      { value: "INDONESIA", label: "Made In" },
    ],
    images: {
      main: "",
      secondary: "",
      accent: "",
    },
  },
  whyChooseUs: {
    sectionTitle: "The Maison Standards",
    sectionSubtitle: "Why Choose Fegance",
    pillars: [
      {
        title: "Masterfully Crafted",
        description:
          "Setiap botol kami racik dengan pilihan formulasi terbaik dan disempurnakan melalui komposisi kami sendiri.",
        icon: "sparkles" as const,
      },
      {
        title: "Long-Lasting Performance",
        description:
          "Dirancang untuk memberikan projection dan longevity terbaik, sehingga aromanya tetap bersama kamu sepanjang hari.",
        icon: "hourglass" as const,
      },
      {
        title: "Satisfaction Promises",
        description:
          "Setiap pengalaman bersama Fegance sangat berarti bagi kami. Kami siap membantu untuk langkah perjalananmu.",
        icon: "shield" as const,
      },
    ],
  },
  contact: {
    eyebrow: "Get In Touch",
    title: "Let's start a conversation.",
    description:
      "Punya pertanyaan, ingin melacak pesanan, atau sekadar menyapa? Kami akan dengan senang hati membantu.",
    address: "Kab. Cirebon, Jawa Barat",
    businessHours: "Mon – Sat · 09.00 – 20.00 WIB",
    contacts: [
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
    ],
  },
  announcement: {
    messages: [
      "Free shipping on orders above Rp 500.000",
      "New collection 2026 — discover the signature scents",
      "Complimentary sample with every order",
    ],
    enabled: false,
  },
};

async function seed() {
  console.log("Seeding Firestore...\n");

  // Seed products
  console.log("Seeding products...");
  for (const product of products) {
    await addDoc(collection(db, "products"), product);
    console.log(`  + ${product.name}`);
  }

  // Seed testimonials
  console.log("Seeding testimonials...");
  for (const testimonial of testimonials) {
    await addDoc(collection(db, "testimonials"), testimonial);
    console.log(`  + ${testimonial.name}`);
  }

  // Seed scent families
  console.log("Seeding scent families...");
  for (const family of scentFamilies) {
    await setDoc(doc(db, "scentFamilies", family.id), {
      name: family.name,
      tagline: family.tagline,
      description: family.description,
      image: family.image,
    });
    console.log(`  + ${family.name}`);
  }

  // Seed site content
  console.log("Seeding site content...");
  await setDoc(doc(db, "siteContent", "main"), siteContent);
  console.log("  + siteContent/main");

  // Create admin user
  const adminEmail = process.env.VITE_ADMIN_EMAIL || "admin@fegance.id";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";
  console.log(`\nCreating admin user: ${adminEmail}`);
  try {
    await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
    console.log("  + Admin user created successfully!");
  } catch (e: any) {
    if (e.code === "auth/email-already-in-use") {
      console.log("  ! Admin user already exists, skipping.");
    } else {
      console.error("  X Error creating admin user:", e.message);
    }
  }

  console.log("\nDone! Firestore seeded successfully.");
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
