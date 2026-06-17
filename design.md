# DESIGN.md

## Luxury Perfume Store Website

Version: 1.0

---

# 1. Project Overview

Website katalog parfum premium dengan desain modern, elegan, dan minimalis.

Tujuan utama:

- Menampilkan brand image parfum
- Menampilkan katalog produk
- Menampilkan detail parfum
- Mengarahkan pembelian ke Shopee dan TikTok Shop
- Mobile First
- Fast Loading
- SEO Friendly

Framework:

- Vue 3
- Vite
- Tailwind CSS
- Vue Router

---

# 2. Design Concept

Tema:

Luxury Minimalist

Nuansa:

- Bersih
- Premium
- Elegan
- Modern

Warna dominan:

- Putih
- Hitam
- Gold Accent

---

# 3. Color Palette

### Primary

White

```css
#FFFFFF
```

### Secondary

Black

```css
#111111
```

### Gold Accent

```css
#C9A227
```

Hover Gold

```css
#D4AF37
```

Light Gray

```css
#F7F7F7
```

Border Gray

```css
#E5E5E5
```

---

# 4. Typography

Heading

```css
Playfair Display
```

Body

```css
Inter
```

Example:

H1
48px

H2
36px

H3
24px

Body
16px

Small
14px

---

# 5. Layout Structure

## Navbar

Position:

Sticky Top

Content:

Logo

Menu:

- Home
- Products
- About
- Contact

Button:

Shop Now

Style:

Background White

Bottom Border Gold

---

# 6. Hero Section

Full Width

Background:

White

Layout:

Left:

- Headline
- Description
- CTA Button

Right:

- Large perfume image

Example Headline:

"Luxury in Every Drop"

Subheadline:

Discover premium fragrances crafted to define your identity.

Buttons:

View Collection

Style:

Gold Background
Black Text

---

# 7. Featured Products

Section Title:

Featured Collection

Grid:

Desktop:
4 Columns

Tablet:
2 Columns

Mobile:
1 Column

Card Style:

Background White

Border:
1px Gold

Radius:
20px

Hover:

- Shadow
- Slight Scale
- Gold Glow

Card Content:

Product Image

Product Name

Short Description

Price

Button:

View Detail

---

# 8. Product Detail Page

Hero Layout

Left:

Large Product Image

Right:

Product Information

Content:

Product Name

Category

Size

Price

Description

Top Notes

Middle Notes

Base Notes

Available Variants

---

# 9. Purchase Section

Two CTA Buttons

### Shopee

Text:

Buy on Shopee

Style:

Gold Border

### TikTok Shop

Text:

Buy on TikTok Shop

Style:

Gold Background

Example:

[ Buy on Shopee ]

[ Buy on TikTok Shop ]

Buttons open:

```html
target="_blank"
```

---

# 10. Product Information Tabs

Tabs:

- Description
- Notes
- Ingredients

Style:

Underline Gold

Active Tab:

Gold

Inactive:

Black

---

# 11. Brand Story Section

Background:

Light Gray

Layout:

2 Columns

Left:

Brand Image

Right:

Story Content

Title:

Our Philosophy

Content:

Brand history and perfume craftsmanship.

---

# 12. Testimonials

Card Style:

White

Border Gold

Customer Name

Review

Rating

★★★★★

Carousel Slider

---

# 13. Contact Section

Content:

WhatsApp

Instagram

TikTok

Email

Buttons:

Gold Outline

---

# 14. Footer

Background:

Black

Text:

White

Accent:

Gold

Content:

Logo

Quick Links

Social Media

Copyright

Example:

© 2026 Luxury Perfume. All Rights Reserved.

---

# 15. Product Data Structure

```javascript
{
  id: 1,
  name: "Midnight Gold",
  slug: "midnight-gold",
  price: 249000,
  image: "/products/midnight-gold.jpg",

  shortDescription:
    "Elegant woody fragrance.",

  description:
    "Luxury perfume crafted for confidence.",

  topNotes: [
    "Bergamot",
    "Lemon"
  ],

  middleNotes: [
    "Lavender",
    "Rose"
  ],

  baseNotes: [
    "Amber",
    "Musk"
  ],

  shopeeLink:
    "https://shopee.co.id/...",

  tiktokLink:
    "https://shop.tiktok.com/..."
}
```

---

# 16. Animation

Use:

AOS Animation

Effects:

Fade Up

Fade Left

Fade Right

Duration:

800ms

Hover Product:

```css
transform: translateY(-5px);
```

---

# 17. Responsive Breakpoints

Mobile

```css
< 768px
```

Tablet

```css
768px - 1024px
```

Desktop

```css
> 1024px
```

---

# 18. SEO

Homepage Title

Luxury Perfume Collection

Meta Description

Premium perfumes with elegant scents and long-lasting impressions.

Schema:

Product Schema

Open Graph:

Enabled

---

# 19. Performance Target

Lighthouse Score

Performance:
95+

Accessibility:
95+

SEO:
100

Best Practices:
95+

---

# 20. Future Features

- Search Product
- Product Filtering
- Favorite/Wishlist
- Blog
- Promo Banner
- WhatsApp Consultation
- Multi Language
- Dark Mode
- AI Fragrance Recommendation

```

```
