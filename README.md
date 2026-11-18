# The Old Roastery — Independent Luxury Website Redesign Concept

A premium, contemporary-vintage luxury café brand experience for **The Old Roastery**, located in Vesu, Surat.

> **Independent Concept Disclaimer:** This project is an independent conceptual redesign created for portfolio and design demonstration purposes. It is **not** an official, authorized, or endorsed website of The Old Roastery. The site uses locally hosted café photography supplied for this project. Captions describe visible subjects; menu prices, availability, and exact preparations should be confirmed with the café.

---

## ☕ Verified Business Information

- **Brand:** The Old Roastery
- **Address:** Shop 20–21–22, Vacanza Trade Center, Near BB Club Circle, Vesu, Surat, Gujarat 395007, India
- **Phone:** [+91 75750 29779](tel:+917575029779)
- **Listed Approximate Cost:** ₹800 for two (approx.)
- **Known Menu Selections (Examples):** Cappuccino, Flat White, Espresso Tonic, Vietnamese Coffee, Cranberry Cold Brew, Pesto Vegetable Spaghetti, Margherita Pizza, Avocado Truffle Pizza, Biscoff Cheesecake, Nutella Shake.
- **Opening hours:** Daily, 11:30 AM–1:00 AM IST (closing the following day), confirmed by the project owner. Call for holiday hours and kitchen schedules.

---

## 🛠️ Tech Stack & Architecture

- **Core:** React 18 (Functional Components, Hooks), TypeScript 5.6
- **Build Tool:** Vite 5.4
- **Styling:** Tailwind CSS 3.4 (Custom Luxury Warm Ivory, Espresso Brown, and Antique Gold Design Tokens)
- **Typography:** `Playfair Display`, `Cormorant Garamond`, `Plus Jakarta Sans`, and `JetBrains Mono`
- **Animations:** Framer Motion 11 (Reduced-motion compliant)
- **Icons:** Lucide React
- **Testing:** Vitest 2.1, React Testing Library, JSDOM

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Run Typecheck
```bash
npm run typecheck
```

### 4. Run Unit & Component Tests
```bash
npm run test
```

### 5. Build for Production
```bash
npm run build
```

---

## 📋 Features Implemented

1. **Concept Disclaimer (`DisclaimerBanner`):** Compact espresso notice identifying the unofficial portfolio concept and café imagery, with a full-size dismiss target. Full disclosures remain in the footer.
2. **Editorial Navigation (`Navbar`):** Left-aligned wordmark, balanced desktop directory, direct call action, and scrollable mobile dropdown with keyboard dismissal and focus restoration on Escape.
3. **Split Editorial Hero (`Hero`):** Ivory text composition (*"Good coffee. Thoughtful plates. Unhurried days."*) alongside responsive local café photography, menu and visit actions, and a compact location/contact strip. Entrance motion respects reduced-motion preferences.
4. **Editorial Story (`About`):** Balanced photography and narrative, three-shop footprint, approximate cost, and location/call links.
5. **Featured Selections (`BestSellers`):** A featured drink photograph paired with four text selections, responsive stacking, menu links, and a shared pricing/availability advisory. Reveals and image zooms respect reduced-motion preferences.
6. **Curated Menu (`Menu`):** Two distinct kitchen photographs and text-based item cards with combined category/keyword filtering, result counts, clear/reset actions, and pricing guidance. Tabs support Left/Right, Home/End, roving focus, and an associated results panel. Images have loading/failure states.
7. **Everyday Rituals (`Experiences`):** Three keyboard-operable selectors for coffee, kitchen, and the Vesu space; each updates the adjacent photograph and caption and exposes its selected state.
8. **Visual Journal (`Gallery` & `LightboxModal`):** Varied tall/wide/square photographs in a responsive grid, pressed-state category filters, and keyboard-operable photo buttons. The portaled lightbox traps focus, makes the background inert, restores opener focus and body scrolling on close, supports Escape and wraparound arrow navigation, and reports image load failures. Single-image categories disable navigation.
9. **Why Visit (`WhyVisit`):** Numbered editorial highlights paired with a desktop-only sticky introduction.
10. **Location & Contact (`LocationContact`):** Address/map split, shared business details, daily hours, direct call/maps links, and independent clipboard states. Copy success is announced only after completion; failures provide manual-copy guidance and allow retrying.
11. **Visit Invitation (`PreFooterCTA`):** Spacious ivory invitation with direct telephone and directions actions.
12. **Floating Actions (`FloatingActions`):** Compact 48px call/maps controls with mobile safe-area placement.
13. **Footer (`Footer`):** Complete navigation, contacts, business address, full concept/photography disclosures, and a back-to-top action that respects reduced motion.

Shared editorial styles live in `src/index.css`: section widths, spacing, typography, buttons, filters, anchor offsets, and small arrow/pressed interactions.

### Brand logo

The supplied circular logo is stored once at `public/brand/old-roastery-logo.webp` (700 x 700, approximately 31 KB). `BrandLogo.tsx` reuses this asset in the header, footer, and photographic fallback states. It uses `object-contain` and square dimensions: 56px on small-screen headers, 64px from the small breakpoint, and 112px/144px in the footer. The source artwork is not stretched, recolored, or filtered; rounded presentation removes only the white corner area outside the emblem.

The browser icon is a 64 x 64 PNG derived from the same logo at `public/brand/favicon.png`. `index.html` references it; the original `public/favicon.svg` remains preserved. Normal business-name mentions and copyright text remain as text. Brand assets are separate from the distinct café-photograph placements.

### Local photography

All six supplied Google image links were accessible, including the fourth after its split continuation was rejoined. Six new photos and eight existing project photos now have distinct placements across the hero, story, Featured Selections, menu, experiences, and gallery. No photograph is repeated across sections; the lightbox enlarges its own gallery image.

Each photograph now has one full-quality local source: the eight reused originals in `public/images/` and six supplied photos in `public/images/curated/`. All 11 pre-existing originals and the favicon remain untouched. Eight identical copies and 14 lower-resolution variants were removed; `srcSet` references only the retained source. This reduces stored files but means mobile visitors download the full-quality image. Sources, checksums, dimensions, and placement decisions are recorded in [docs/photography.md](docs/photography.md), with the approved cleanup recorded in [docs/image-cleanup.json](docs/image-cleanup.json). There are no remaining external stock-image URLs in the application.

The menu uses two general kitchen photographs and text descriptions for individual dishes. Featured Selections retains its featured drink photograph and four text cards, avoiding unrelated images where a matching dish photo was not supplied. Gallery captions describe the actual photographs rather than unverified menu item names.

### Motion

The animation system uses the existing Framer Motion dependency. No extra animation or scrolling library is required.

- **Hero:** three individually masked heading lines with staggered upward reveals, coordinated eyebrow/copy/actions, a load-aware image curtain and settling zoom. Desktop fine-pointer devices receive a bounded 44px scroll-parallax range inside the photograph's crop.
- **Navbar:** page-load entrance, transparent-to-ivory background transition, animated desktop underlines, rotating mobile toggle, and staggered mobile directory links. Closed links immediately become inert.
- **Story:** horizontal image curtain, bounded desktop image parallax, masked headline, and a directional photo entrance.
- **Featured Selections:** image curtains, staggered scale/position entrances, hover image zoom, and tactile card/arrow feedback.
- **Menu:** masked headline, staggered cards, image loading/failure states, moving category underline, and layout/exit transitions when category or search results change. Departing cards become inert and hidden from assistive technology immediately.
- **Experiences:** masked headline and directional, layered image transitions on selection.
- **Gallery:** load-aware image curtains, hover zoom, moving filter underline, and animated photo rearrangement. The lightbox scales/slides into place; images overlap during directional changes, with exiting images hidden from assistive technology. Focus trapping, Escape/arrows, scroll locking, and opener focus restoration remain active through the dialog's exit.
- **Why Visit, contact, invitation, footer:** masked headings where applicable, directional/scale reveals, numbered-item stagger, and animated section rules. Buttons use restrained fill, shadow, pressed, and arrow feedback.

`src/components/MotionPrimitives.tsx` contains masked headings, image curtains, filter items, image transitions, and section rules. `src/components/motion.ts` contains reveal timing, reactive reduced-motion preferences, and desktop-parallax eligibility. Scroll parallax uses motion values and springs instead of React state updates per frame.

Reduced-motion visitors receive stable headings, immediate transitions, and no parallax or loading shimmer. Preference changes are handled during the visit. Parallax is disabled on mobile/coarse-pointer devices. Photograph frames reserve space, and external image failures use readable fallback states. Native scrolling and hash links remain intact.

### Preview and verify animations

1. Run `npm run dev`, then open the local URL printed by Vite (normally `http://localhost:5173/`).
2. Refresh from the top: watch the three hero lines, navbar, CTA sequence, and photograph curtain. Photographs reveal after loading, including cached loads.
3. Scroll through Story, Featured Selections, Menu, Experiences, Gallery, Why Visit, and Location; compare the different text, image, card, and divider treatments.
4. Hover navigation, cards, and buttons on desktop. Change menu/gallery categories and search; watch the underline and card rearrangement.
5. Select another experience, open a gallery photograph, and use previous/next or arrow keys. Close with Escape and confirm focus returns to the originating photograph.
6. Check a narrow mobile viewport and the mobile directory. Enable your device/browser's reduced-motion preference and confirm all content remains available without movement.
7. Run `npm run typecheck`, `npm test`, and `npm run build` for automated verification. Unit tests cover interaction and fallback behavior; real animation timing is checked in Chrome because JSDOM mocks observers and exit lifecycles.

#   t h e - o l d - r o a s t e r y - w e b s i t e  
 
### Business content and accessibility update

Hours and Instagram (@theoldroastery_srt) were supplied by the project owner. The map and directions use the café coordinates (21.1407724, 72.77336) linked by its Zomato listing. Menu descriptions were checked against https://www.zomato.com/surat/the-old-roastery-vesu/order on 18 November 2026; unpublished recipes are not inferred. Featured Selections replace unverified sales/signature claims. Item links clear filters, focus and scroll to an exact heading, including direct hash loads. Mobile gallery frames preserve native photo proportions; desktop compositions and reduced-motion behavior remain. A keyboard-visible skip link targets the main landmark.
