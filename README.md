# GLAM & GRACE BEAUTY STUDIO
## Complete Premium Beauty Salon, Makeup Artist & Bridal Portfolio Website

> **Tagline**: Where Beauty Meets Elegance.  
> **Brand Phrase**: More Than Just Makeup, It's a Feeling.

---

## 🌸 Brand Overview & Creative Direction
**GLAM & GRACE BEAUTY STUDIO** is an editorial-grade, luxury bridal beauty atelier and salon website designed for discerning brides and clients seeking bridal artistry, engagement looks, reception glamour, couture hairstyling, and pre-bridal skincare rituals.

The design faithfully embodies the warmth, sophistication, and editorial hierarchy of the reference art direction:
- **Warm Ivory & Soft Blush backgrounds** for radiant, welcoming light sections.
- **Deep Espresso & Plum-Brown (#38252D)** for dramatic, high-contrast bridal showcases and footers.
- **Muted Champagne (#C6A477) & Dusty Rose (#B77D83)** for refined luxury accents, badges, and CTAs.
- **Editorial Typography**: *Cormorant Garamond* for serif headlines, *Montserrat* for crisp legibility, and *Alex Brush* for delicate script signatures.

---

## ✨ Key Features & Interactive Architecture

### 1. Navigation & Luxury Announcement Bar
- Sticky frosted glass header (`backdrop-filter: blur(12px)`).
- Fluid active-state scroll spy observing on-screen sections.
- Smooth anchor navigation with header offset correction.
- Fully accessible mobile menu drawer with backdrop blur and keyboard (Esc) support.

### 2. Cinematic Bridal Hero Section
- High-definition editorial portrait of an Indian bride with polki kundan jewellery, blush dupatta, and radiant makeup.
- Typography balancing headline, subheading, and dual CTAs (*Explore Our Services* & *Discover Our Story*).
- Floating luxury badge: "Couture Bridal Artistry".
- Editorial pagination and progress line (`01 / 03`).

### 3. Studio Philosophy & Introduction
- Warm ivory layout highlighting the brand ethos: *"Your Beauty. Our Art."*
- Arched vanity mirror photography featuring ambient glow bulbs, marble countertops, and makeup artistry tools.

### 4. Signature Services
- 4 curated service cards with category pills and smooth hover animations:
  1. **Makeup Artistry**: Natural soft glam to bridal perfection.
  2. **Hair Artistry**: Romantic curls to timeless jasmine gajra buns.
  3. **Skincare & Facials**: Calming dermal prep rituals and hydration.
  4. **Bridal Experiences**: All-inclusive day-of and multi-event packages.

### 5. High-Contrast Bridal Showcase (`#38252D`)
- Rich dark contrast section titled **"Real Brides. Beautiful Stories."**
- Editorial mosaic collage of royal crimson velvet, pastel blush, evening reception glam, and floral hair styling.
- Subtle background luxury typography watermark.

### 6. The Beauty Portfolio with Real Filtering & Lightbox
- **7 Working Category Filters**: `All Looks`, `Bridal`, `Engagement`, `Reception`, `Hair`, `Makeup`, `Skincare`.
- **Accessible Lightbox Modal**:
  - Full-screen view with high-res imagery, caption title, and category badge.
  - Previous / Next cycling with touch and keyboard arrow support (`←`, `→`).
  - Close button and Escape key dismiss with body scroll lock.
- **Load More** button to reveal extra curated looks.

### 7. Interactive Before & After Transformation Slider
- Draggable vertical divider handle comparing bare skin (*Before*) to glamorous event makeup (*After*).
- Built with matched facial photography of the same subject.
- Full mouse drag, touch swipe, and keyboard arrow accessibility (`ArrowLeft`, `ArrowRight`).

### 8. The Hair Studio Showcase & Carousel
- Dedicated gallery highlighting traditional floral buns, romantic waves, intricate braids, and Hollywood waves.
- Carousel navigation controls and direct shortcut to filter the main portfolio by hair styling.

### 9. Interactive Beauty Services Tabs
- 4 Switchable Panels: **1. Makeup**, **2. Hair**, **3. Skincare**, and **4. Bridal Packages**.
- Detailed breakdowns with item descriptions, illustrative starting rates, and preview photography.

### 10. Bridal Packages & Pricing
- 3 Tiered Packages:
  - **The Signature Bride** (Essential Day-of Radiance)
  - **The Royal Experience** (*Most Cherished* / Featured)
  - **The Complete Bride** (Multi-Day Grand Celebration)
- **Automatic Package Pre-selection**: Clicking *"Book Package"* scrolls to the booking form and automatically sets the selected package in the dropdown!

### 11. Bridal Journey Timeline
- 4-step chronological roadmap:
  1. *Consultation*
  2. *Look Planning & Trial*
  3. *The Final Look*
  4. *Your Special Day*

### 12. Verified-Style Testimonials
- Testimonial cards featuring 5-star ratings, heartfelt reviews, and real bride event notes.

### 13. The Physical Beauty Studio Sanctuary
- Features luxury setting, sanitized hygiene standards, premium international cosmetics (Dior, MAC, Huda, Charlotte Tilbury), and private bridal suites.
- Address and studio operating hours placeholders.

### 14. Appointment Booking Form & Dynamic WhatsApp Booking
- Real-time client-side validation for:
  - Full Name, Phone Number, Event Date, Event Type, Required Service, and Venue.
  - Accessible error indicators and aria-invalid attributes.
  - Success banner with user confirmation.
- **WhatsApp Integration Button**: Dynamically generates an encoded inquiry message incorporating the client's entered name, date, event type, and package!

### 15. Instagram Social Showcase
- Curated 6-tile grid of studio moments and bridal details with like counters.

### 16. Comprehensive Footer
- Deep plum-brown background with quick links, service shortcuts, studio location, operating hours, social media links, and dynamic copyright year.

---

## 🎨 Color System Tokens
| Token | Hex Code | Purpose |
| :--- | :--- | :--- |
| `Warm Ivory` | `#F7F1E9` | Dominant primary background |
| `Soft Blush` | `#EAD5D2` | Secondary background, accent cards |
| `Deep Espresso` | `#302321` | Primary headings, dark typography |
| `Muted Champagne` | `#C6A477` | Fine luxury borders, accents, icons |
| `Dusty Rose` | `#B77D83` | Primary action buttons, active pills |
| `Deep Plum-Brown` | `#38252D` | Dark contrast bridal section & footer |
| `Pure White` | `#FFFFFF` | Cards, input fields, image overlays |

---

## 📁 Directory Structure
```
glam-and-grace/
│
├── index.html              # Complete semantic HTML5 structure
├── css/
│   └── style.css           # Luxury design system, CSS variables, responsive rules
├── js/
│   └── script.js           # Filtering, lightbox, comparison slider, validation
├── assets/
│   └── images/             # 25+ curated and generated photorealistic beauty assets
└── README.md               # Documentation & setup guide
```

---

## 🚀 How to Run Locally

### Option A: Using Node.js (Already Configured)
Run in project directory:
```bash
node -e "const http=require('http'),fs=require('fs'),path=require('path');http.createServer((q,s)=>{let p=decodeURI(q.url.split('?')[0]);if(p==='/')p='/index.html';let f=path.join(process.cwd(),p);fs.readFile(f,(e,d)=>{if(e){s.writeHead(404);s.end('Not Found');}else{s.writeHead(200);s.end(d);}})}).listen(4173,()=>console.log('Running at http://localhost:4173'));"
```
Then open: **`http://localhost:4173`**

### Option B: Using VS Code Live Server or Any Static Server
Open `index.html` with Live Server or run `npx serve .` in your terminal.
