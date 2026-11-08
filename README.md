# LOBBO BEVERAGES – E-COMMERCE WEBSITE

> **"Home-Brewed Excellence. Serve Chilled."**

A modern, visually stunning, fully responsive e-commerce website for **Lobbo Beverages**, an artisanal home-brewed beverage brand based in Ghana. Built with **React 19, TypeScript, Tailwind CSS v4, and Vite**.

---

## 🎨 Visual Identity & Brand System

The entire visual identity is directly inspired by the authentic photographs and packaging of Lobbo's two signature beverages:

- **Dominant Background**: Creamy Ivory (`#FFF8EF`) & Warm Cream (`#F5E9D9`)
- **Primary Brand Accent**: Lobbo Orange-Red (`#EF4329`) – inspired by the signature Cous Cous typography and brand emblem
- **Secondary Brand Accent**: Deep Chocolate Brown (`#512719`) – inspired by the Bruks typography and warm tones
- **Clean Surfaces**: Pure White (`#FFFFFF`) & Soft Peach (`#F2C7A9`)
- **Luxury Contrast**: Charcoal Black (`#191513`) – reserved for footer, product podiums, and bottle stage contrast
- **Typography**: Headings in *Plus Jakarta Sans* / *Poppins*, body text in *Inter* / *DM Sans*

---

## 🍾 Featured Products

All product specifications and prices are managed centrally in `src/data/products.ts`:

1. **Lobbo Cous Cous**
   - **Size**: 250ml
   - **Price**: GH₵ 20.00
   - **Bottle**: White cap seal, smooth creamy off-white beverage
   - **Accent**: Lobbo Orange-Red
   - **Labels**: Home-Brewed, Serve Chilled, 250ml

2. **Lobbo Bruks**
   - **Size**: 300ml
   - **Price**: GH₵ 20.00
   - **Bottle**: Black cap seal, creamy beverage with distinctive spiced/textured flakes
   - **Accent**: Deep Chocolate Brown
   - **Labels**: Home-Brewed, Serve Chilled, 300ml

---

## 🛒 Features & Architecture

- **Interactive Hero Showcase**: Interactive bottle switch between Cous Cous and Bruks with ambient glow, badges, and quick-add buttons.
- **Product Catalogue with Retail & Bulk Options**:
  - Interactive packaging switcher on each card and Quick View modal:
    - **Single Bottle (Retail)**: GH₵ 20.00
    - **6-Bottle Pack (Retail Bundle)**: GH₵ 110.00 (Save GH₵ 10.00)
    - **Full Crate (12 Bottles - Bulk)**: GH₵ 215.00 (Save GH₵ 25.00)
    - **Event Crate (24 Bottles - Wholesale)**: GH₵ 420.00 (Save GH₵ 60.00)
  - Live unit price breakdown (`~GH₵ 13.33 / bottle`) and dynamic savings badges.
  - Dedicated **Bulk Purchases & Retail Orders** showcase with transparent pricing matrix and 1-click WhatsApp event inquiries.
  - One-click tasting duo bundle.
- **Full Slide-Out Cart Drawer**:
  - Live item count badge in the navbar and floating sticky cart button.
  - Increment/decrement quantity controls with live line-item and subtotal calculation.
  - Fulfilment toggle (Delivery vs Pickup) with clear indication that delivery fees are calculated by the seller on WhatsApp based on customer location.
  - Cart persistence via `localStorage`.
- **WhatsApp Checkout Integration**:
  - Validates Full Name, Phone Number, Fulfilment Type, and Customer Delivery Location.
  - Customer states their location/area; the seller reviews it on WhatsApp and gives the delivery bill directly.
  - Automatically formats the WhatsApp order text with location and seller-calculated delivery note.
  - Celebratory confetti feedback and transfer to `https://wa.me/233243191039`.
  - Order confirmation screen with copy message utility and safe cart clearing workflow.
- **Brand Story & Values**: Clean presentation highlighting Small-Batch Freshness, Distinctive Quality, Customer Satisfaction, and Authentic Craft.
- **Why Choose Lobbo**: 5 key selling points with custom iconography.
- **Direct WhatsApp Contact**: Fast inquiry form linked directly to WhatsApp.
- **Fully Responsive & Accessible**: Optimized for mobile, tablet, and desktop viewports.

---

## 🚀 Setup & Installation Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm` / `yarn`

### 1. Installation
Clone the repository and install dependencies:
```bash
npm install
```

### 2. Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Production Build
Compile TypeScript and bundle for production:
```bash
npm run build
```
The optimized production output will be generated in the `dist/` directory.

### 4. Preview Production Build
Preview the production build locally:
```bash
npm run preview
```

---

## ⚙️ Configuration

- **Products & Prices**: Edit `src/data/products.ts`
- **Brand Details & WhatsApp Number**: Edit `src/data/brand.ts`
- **Styling Tokens**: Edit `src/index.css`

