/**
 * Firestore Seed Script
 *
 * Run this to populate your Firestore database with initial hardcoded data.
 * Usage: npm run seed
 */

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
      "https://wa.me/6285172372101?text=Halo%20saya%20tertarik%20dengan%20Leorin%20Midnight%20Gold",
    performance: {
      type: "Gen XY (Masculine / Unisex)",
      sillage: "Medium to strong",
      projection: "2-3 meters",
      longevity: "8-12 hours",
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
      "https://wa.me/6285172372101?text=Halo%20saya%20tertarik%20dengan%20Velvet%20Rose",
    performance: {
      type: "Floral Rose (Feminine)",
      sillage: "Moderate",
      projection: "1.5 - 2 meters",
      longevity: "8-10 hours",
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
      "https://wa.me/6285172372101?text=Halo%20saya%20tertarik%20dengan%20Ocean%20Noir",
    performance: {
      type: "Fresh Aquatic (Masculine)",
      sillage: "Medium",
      projection: "1-2 meters",
      longevity: "6-8 hours",
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
      "https://wa.me/6285172372101?text=Halo%20saya%20tertarik%20dengan%20Crystal%20Bloom",
    performance: {
      type: "Floral Fresh (Feminine)",
      sillage: "Intimate to moderate",
      projection: "1.5 meters",
      longevity: "8-10 hours",
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
      "https://wa.me/6285172372101?text=Halo%20saya%20tertarik%20dengan%20Ember%20Oud",
    performance: {
      type: "Oriental Woody (Unisex)",
      sillage: "Strong",
      projection: "2-3 meters",
      longevity: "10-14 hours",
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
      "https://wa.me/6285172372101?text=Halo%20saya%20tertarik%20dengan%20Iris%20Garden",
    performance: {
      type: "Floral Green (Feminine)",
      sillage: "Moderate",
      projection: "1.5 meters",
      longevity: "6-8 hours",
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
      "https://wa.me/6285172372101?text=Halo%20saya%20tertarik%20dengan%20Amber%20Nights",
    performance: {
      type: "Oriental Warm (Unisex)",
      sillage: "Strong",
      projection: "2 meters",
      longevity: "8-10 hours",
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
      "https://wa.me/6285172372101?text=Halo%20saya%20tertarik%20dengan%20Citrus%20Sky",
    performance: {
      type: "Citrus Aromatic (Unisex/Masculine)",
      sillage: "Medium",
      projection: "1.5 meters",
      longevity: "6-8 hours",
    },
    isNew: false,
    isBestseller: false,
  },
];

const ourStory = {
  eyebrow: "Cerita Fegance",
  title: "Biar Wangi Aja Yang Bicara",
  subtitle:
    "Sebuah karya seni aroma buatan Cirebon yang diracik khusus untuk menceritakan identitas diri tanpa perlu banyak kata.",
  blocks: [
    {
      id: "b1",
      type: "image",
      content:
        "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=1200&fit=crop",
      caption: "Maison Fegance Atelier & Signature Fragrance",
      position: "top",
    },
    {
      id: "b2",
      type: "paragraph",
      content:
        "Fegance lahir di Cirebon dari rasa penasaran yang mendalam terhadap dunia seni wewangian. Bagi kami, parfum bukanlah sekadar minyak wangi penyegar tubuh biasa. Ia adalah sebuah karya seni tanpa rupa—meski tak kasat mata, aromanya hidup lama dalam ingatan dan menjadi bagian erat dari identitas seseorang.",
    },
    {
      id: "b3",
      type: "paragraph",
      content:
        "Perjalanan kami dimulai dari keinginan sederhana: menciptakan parfum lokal berkualitas tinggi dengan ekstrak minyak wangi premium yang tahan lama, dipadu dengan kemasan mewah dan estetik, tanpa membebankan harga yang berlebihan.",
    },
    {
      id: "b4",
      type: "image",
      content:
        "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=1200&fit=crop",
      caption: "Proses racikan formulasi wewangian dengan standar tinggi",
      position: "middle",
    },
    {
      id: "b5",
      type: "paragraph",
      content:
        "Setiap racikan Fegance dibuat melalui proses formulasi teliti (olfactory testing) untuk memastikan daya tahan (longevity) dan jejak aroma (sillage) yang memikat sepanjang hari. Kami percaya bahwa wewangian adalah cara paling elegan untuk menyampaikan karakter diri.",
    },
    {
      id: "b6",
      type: "paragraph",
      content:
        "Ketika kata-kata tak perlu terucap, biarkan wangi Fegance yang berbicara mewakili pesona dan keunikan dirimu.",
    },
  ],
};

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
    ctaPrimary: "Collection",
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
        icon: "sparkles",
      },
      {
        title: "Long-Lasting Performance",
        description:
          "Dirancang untuk memberikan projection dan longevity terbaik, sehingga aromanya tetap bersama kamu sepanjang hari.",
        icon: "hourglass",
      },
      {
        title: "Satisfaction Promises",
        description:
          "Setiap pengalaman bersama Fegance sangat berarti bagi kami. Kami siap membantu untuk langkah perjalananmu.",
        icon: "shield",
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

  // 1. Authenticate admin first
  const adminEmail = process.env.VITE_ADMIN_EMAIL || "admin@fegance.id";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123456";
  console.log(`Authenticating admin user: ${adminEmail}`);
  try {
    await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
    console.log("  + Signed in as admin successfully!");
  } catch (e: any) {
    try {
      await createUserWithEmailAndPassword(auth, adminEmail, adminPassword);
      console.log("  + Admin user created & authenticated successfully!");
    } catch (createErr: any) {
      console.log("  ! Admin authentication note:", createErr.message);
    }
  }

  // 2. Clean existing products to prevent duplicates
  console.log("Clearing existing products in database...");
  try {
    const existingDocs = await getDocs(collection(db, "products"));
    for (const d of existingDocs.docs) {
      await deleteDoc(doc(db, "products", d.id));
    }
    console.log(`  + Removed ${existingDocs.docs.length} old products`);
  } catch (err: any) {
    console.log("  ! Note on clearing products:", err.message);
  }

  // 3. Seed products
  console.log("Seeding products...");
  for (const product of products) {
    await addDoc(collection(db, "products"), product);
    console.log(`  + ${product.name}`);
  }

  // 4. Seed Our Story
  console.log("Seeding Our Story content...");
  await setDoc(doc(db, "siteContent", "ourStory"), ourStory);
  await setDoc(doc(db, "ourStory", "main"), ourStory);
  console.log("  + siteContent/ourStory & ourStory/main");

  // 5. Seed scent families
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

  // 6. Seed site content
  console.log("Seeding site content...");
  await setDoc(doc(db, "siteContent", "main"), siteContent);
  console.log("  + siteContent/main");

  console.log("\nDone! Firestore database seeded successfully.");
  process.exit(0);
}

seed().catch((e) => {
  console.error("Seed failed:", e);
  process.exit(1);
});
