export interface ProductPerformance {
  type: string
  sillage: string
  projection: string
  longevity: string
}

export interface Product {
  id: number
  name: string
  slug: string
  price: number
  image: string
  gallery?: string[]
  shortDescription: string
  description: string
  category: string
  family: 'woody' | 'floral' | 'fresh' | 'oriental' | 'citrus'
  size: string
  topNotes: string[]
  middleNotes: string[]
  baseNotes: string[]
  shopeeLink: string
  tiktokLink: string
  whatsappLink: string
  performance: ProductPerformance
  isNew?: boolean
  isBestseller?: boolean
}

export interface Testimonial {
  id: number
  name: string
  role: string
  text: string
  rating: number
  avatar: string
}

export interface ScentFamily {
  id: Product['family']
  name: string
  tagline: string
  description: string
  image: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Midnight Gold',
    slug: 'midnight-gold',
    price: 75000,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&h=800&fit=crop',
    shortDescription: 'Elegant woody fragrance with a touch of gold.',
    description:
      'Midnight Gold is a luxurious perfume crafted for those who command attention. With its deep woody base and bright citrus opening, it transitions seamlessly from day to night. Every spritz leaves a trail of sophistication that lingers for hours.',
    category: 'Eau de Parfum',
    family: 'woody',
    size: '50 ml',
    topNotes: ['Bergamot', 'Lemon', 'Pink Pepper'],
    middleNotes: ['Lavender', 'Rose', 'Jasmine'],
    baseNotes: ['Amber', 'Musk', 'Sandalwood'],
    shopeeLink: 'https://shopee.co.id/Maison-Fegance-Midnight-Gold-i.dummy.midnight-gold',
    tiktokLink: 'https://shop.tiktok.com/view/product/dummy-midnight-gold',
    whatsappLink: 'https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Midnight%20Gold',
    performance: {
      type: 'Gen XY (Masculine)',
      sillage: 'Medium to strong',
      projection: '2-3 meters',
      longevity: '3-4 hours outdoors, up to 6 hours indoors'
    },
    isBestseller: true,
  },
  {
    id: 2,
    name: 'Velvet Rose',
    slug: 'velvet-rose',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=800&fit=crop',
    shortDescription: 'Romantic floral bouquet with velvety finish.',
    description:
      'Velvet Rose captures the essence of a blooming garden at dusk. The rich damask rose takes center stage, wrapped in warm vanilla and patchouli. A fragrance that speaks of timeless romance and quiet confidence.',
    category: 'Eau de Parfum',
    family: 'floral',
    size: '50 ml',
    topNotes: ['Raspberry', 'Orange Blossom'],
    middleNotes: ['Damask Rose', 'Iris', 'Peony'],
    baseNotes: ['Vanilla', 'Patchouli', 'White Musk'],
    shopeeLink: 'https://shopee.co.id/Maison-Fegance-Velvet-Rose-i.dummy.velvet-rose',
    tiktokLink: 'https://shop.tiktok.com/view/product/dummy-velvet-rose',
    whatsappLink: 'https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Velvet%20Rose',
    performance: {
      type: 'Floral Rose (Feminine)',
      sillage: 'Moderate',
      projection: '1.5 meters',
      longevity: '5-6 hours'
    },
  },
  {
    id: 3,
    name: 'Ocean Noir',
    slug: 'ocean-noir',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&h=800&fit=crop',
    shortDescription: 'Fresh aquatic scent with dark undertones.',
    description:
      'Ocean Noir evokes the mystery of the deep sea meeting the night sky. Salty sea breeze mingles with dark woods and aromatic herbs. A fragrance for the adventurous soul who finds beauty in the unknown.',
    category: 'Eau de Toilette',
    family: 'fresh',
    size: '75 ml',
    topNotes: ['Sea Breeze', 'Bergamot', 'Cypress'],
    middleNotes: ['Lavender', 'Sage', 'Geranium'],
    baseNotes: ['Vetiver', 'Cedarwood', 'Ambergris'],
    shopeeLink: 'https://shopee.co.id/Maison-Fegance-Ocean-Noir-i.dummy.ocean-noir',
    tiktokLink: 'https://shop.tiktok.com/view/product/dummy-ocean-noir',
    whatsappLink: 'https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Ocean%20Noir',
    performance: {
      type: 'Fresh Aquatic (Masculine)',
      sillage: 'Medium',
      projection: '1-2 meters',
      longevity: '4-5 hours'
    },
    isNew: true,
  },
  {
    id: 4,
    name: 'Crystal Bloom',
    slug: 'crystal-bloom',
    price: 85000,
    image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=800&h=800&fit=crop',
    shortDescription: 'Crystalline floral with sparkling freshness.',
    description:
      'Crystal Bloom is a radiant fragrance that dances on the skin like morning dew on petals. Its sparkling citrus opening gives way to an exquisite floral heart, settling into a warm, sensual base that captivates the senses.',
    category: 'Eau de Parfum',
    family: 'floral',
    size: '50 ml',
    topNotes: ['Mandarin', 'Blackcurrant', 'Pear'],
    middleNotes: ['Freesia', 'Lily of the Valley', 'Magnolia'],
    baseNotes: ['Musk', 'Sandalwood', 'Cashmeran'],
    shopeeLink: 'https://shopee.co.id/Maison-Fegance-Crystal-Bloom-i.dummy.crystal-bloom',
    tiktokLink: 'https://shop.tiktok.com/view/product/dummy-crystal-bloom',
    whatsappLink: 'https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Crystal%20Bloom',
    performance: {
      type: 'Floral Fresh (Feminine)',
      sillage: 'Intimate to moderate',
      projection: '1 meter',
      longevity: '4-5 hours'
    },
  },
  {
    id: 5,
    name: 'Ember Oud',
    slug: 'ember-oud',
    price: 100000,
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&h=800&fit=crop',
    shortDescription: 'Rich smoky oud with warm spices.',
    description:
      'Ember Oud is an intense journey through ancient trade routes. Smoky agarwood blends with saffron and leather, creating a bold statement of power and prestige. A fragrance that leaves an indelible mark wherever it goes.',
    category: 'Eau de Parfum Intense',
    family: 'oriental',
    size: '50 ml',
    topNotes: ['Saffron', 'Cardamom', 'Cinnamon'],
    middleNotes: ['Oud', 'Leather', 'Labdanum'],
    baseNotes: ['Frankincense', 'Benzoin', 'Cedarwood'],
    shopeeLink: 'https://shopee.co.id/Maison-Fegance-Ember-Oud-i.dummy.ember-oud',
    tiktokLink: 'https://shop.tiktok.com/view/product/dummy-ember-oud',
    whatsappLink: 'https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Ember%20Oud',
    performance: {
      type: 'Oriental Woody (Unisex)',
      sillage: 'Strong',
      projection: '2-3 meters',
      longevity: '8-12 hours'
    },
    isBestseller: true,
  },
  {
    id: 6,
    name: 'Iris Garden',
    slug: 'iris-garden',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=800&fit=crop',
    shortDescription: 'Powdery floral elegance with green accords.',
    description:
      'Iris Garden transports you to a serene French garden in full bloom. Delicate iris root mingles with fresh violet leaves and soft musk. A refined, understated fragrance that whispers elegance without saying a word.',
    category: 'Eau de Parfum',
    family: 'floral',
    size: '50 ml',
    topNotes: ['Violet Leaf', 'Green Notes', 'Bergamot'],
    middleNotes: ['Iris', 'Heliotrope', 'Rose'],
    baseNotes: ['Musk', 'Cedar', 'Vanilla'],
    shopeeLink: 'https://shopee.co.id/Maison-Fegance-Iris-Garden-i.dummy.iris-garden',
    tiktokLink: 'https://shop.tiktok.com/view/product/dummy-iris-garden',
    whatsappLink: 'https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Iris%20Garden',
    performance: {
      type: 'Floral Green (Feminine)',
      sillage: 'Moderate',
      projection: '1.5 meters',
      longevity: '5-6 hours'
    },
  },
  {
    id: 7,
    name: 'Amber Nights',
    slug: 'amber-nights',
    price: 80000,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800&h=800&fit=crop',
    shortDescription: 'Warm amber vanilla for evening allure.',
    description:
      'Amber Nights is the olfactory equivalent of a warm embrace under a starlit sky. Rich amber and vanilla create a cocoon of comfort, while spicy saffron adds an unexpected twist. Perfect for evenings when you want to be unforgettable.',
    category: 'Eau de Parfum',
    family: 'oriental',
    size: '50 ml',
    topNotes: ['Saffron', 'Cinnamon', 'Orange'],
    middleNotes: ['Amber', 'Jasmine', 'Ylang-Ylang'],
    baseNotes: ['Vanilla', 'Tonka Bean', 'Musk'],
    shopeeLink: 'https://shopee.co.id/Maison-Fegance-Amber-Nights-i.dummy.amber-nights',
    tiktokLink: 'https://shop.tiktok.com/view/product/dummy-amber-nights',
    whatsappLink: 'https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Amber%20Nights',
    performance: {
      type: 'Oriental Warm (Unisex)',
      sillage: 'Strong',
      projection: '2 meters',
      longevity: '7-9 hours'
    },
    isNew: true,
  },
  {
    id: 8,
    name: 'Citrus Sky',
    slug: 'citrus-sky',
    price: 50000,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&h=800&fit=crop',
    shortDescription: 'Bright citrus blend for an uplifting feel.',
    description:
      'Citrus Sky is an explosion of sunshine in a bottle. Juicy Mediterranean fruits dance with aromatic herbs for an uplifting experience that energizes the spirit. A daily essential for those who see the bright side of life.',
    category: 'Eau de Toilette',
    family: 'citrus',
    size: '75 ml',
    topNotes: ['Grapefruit', 'Lemon', 'Mandarin'],
    middleNotes: ['Basil', 'Mint', 'Rosemary'],
    baseNotes: ['Cedarwood', 'Musk', 'White Amber'],
    shopeeLink: 'https://shopee.co.id/Maison-Fegance-Citrus-Sky-i.dummy.citrus-sky',
    tiktokLink: 'https://shop.tiktok.com/view/product/dummy-citrus-sky',
    whatsappLink: 'https://wa.me/6281234567890?text=Halo%20saya%20tertarik%20dengan%20Citrus%20Sky',
    performance: {
      type: 'Citrus Aromatic (Unisex/Masculine)',
      sillage: 'Medium',
      projection: '1 meter',
      longevity: '4-6 hours'
    },
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Wijaya',
    role: 'Beauty Editor, Jakarta',
    text: 'I have been wearing Midnight Gold for a month and I get compliments everywhere I go. The longevity is incredible — easily 8+ hours on my skin.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop',
  },
  {
    id: 2,
    name: 'Dimas Pratama',
    role: 'Creative Director',
    text: 'Ember Oud is the most sophisticated scent I have ever owned. Worth every rupiah. Packaged beautifully, feels like a true luxury ritual.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop',
  },
  {
    id: 3,
    name: 'Rina Kusuma',
    role: 'Verified Buyer',
    text: 'Velvet Rose is my signature scent now. It is feminine without being overpowering. Absolutely love how it evolves through the day.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop',
  },
  {
    id: 4,
    name: 'Andi Hartono',
    role: 'Loyal Customer',
    text: 'Ocean Noir is perfect for daily wear. Fresh yet has depth. Fast shipping and great packaging — the unboxing alone feels like a gift.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop',
  },
  {
    id: 5,
    name: 'Maya Putri',
    role: 'Verified Buyer',
    text: 'Crystal Bloom makes me feel like I am walking through a garden in spring. Such a beautiful, delicate fragrance — I am on my third bottle.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop',
  },
]

export const scentFamilies: ScentFamily[] = [
  {
    id: 'floral',
    name: 'Floral',
    tagline: 'Romantic & Timeless',
    description: 'Bouquets of rose, iris, jasmine and peony for the dreamers and romantics.',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=600&h=700&fit=crop',
  },
  {
    id: 'woody',
    name: 'Woody',
    tagline: 'Bold & Grounded',
    description: 'Sandalwood, cedar, and oud — quiet confidence, distilled into scent.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=600&h=700&fit=crop',
  },
  {
    id: 'oriental',
    name: 'Oriental',
    tagline: 'Warm & Mysterious',
    description: 'Amber, vanilla, and exotic spices that linger long after the moment passes.',
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=600&h=700&fit=crop',
  },
  {
    id: 'fresh',
    name: 'Fresh',
    tagline: 'Clean & Aquatic',
    description: 'Sea breeze, herbs, and green notes for those who crave clarity and calm.',
    image: 'https://images.unsplash.com/photo-1557170334-a9086d61c1f5?w=600&h=700&fit=crop',
  },
  {
    id: 'citrus',
    name: 'Citrus',
    tagline: 'Bright & Uplifting',
    description: 'Bergamot, mandarin, and grapefruit — sunshine captured in a bottle.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=600&h=700&fit=crop',
  },
]
