# Cine Estação Design Guidelines

## Design Approach
Cinema-first aesthetic with seasonal dynamic themes. Draw inspiration from modern streaming platforms (Netflix, HBO Max) with bold cinematic visuals, immersive video content, and dramatic dark theme execution.

## Brand Identity

**Color Palette**
- Primary: #ff6600 (vibrant orange - brand signature)
- Secondary: #111111 (deep cinema black)
- Background: #000000 (pure black)
- Text Light: #ffffff
- Text Dark: #1a1a1a
- Gradient overlays: Black with 50% opacity for video overlays

**Typography**
- Font Family: Inter, sans-serif
- Apply consistent weights across: Regular (400) for body, Semibold (600) for emphasis, Bold (700) for CTAs and headings

## Core Layout Structure

**Header (Sticky)**
- Background: Linear gradient from #0a0a0a to #1a1a1a
- Logo: Centered "Cine Estação" wordmark
- Navigation: Home, Promoções, Fidelidade, Dúvidas, Mais (evenly spaced)
- CTA Button: "Comprar Ingressos" - rounded-full, bg-[#ff6600], text-white, font-bold with shadow-lg and scale-105 hover transition
- Mobile: Hamburger menu with smooth slide-in drawer animation

**Hero Section**
- Full-width video banner (autoplay, muted, loop)
- Overlay text: "Consulte a programação do Cine Estação da sua cidade"
- Overlay styling: Blur backdrop (backdrop-blur-sm), bg-black/50, white text, rounded-xl, centered placement
- Mobile: Maintain video with minimal overlay text, cropped appropriately

**YouTube Section**
- Section title: "Inscreva-se no nosso canal do YouTube:"
- 3-card carousel layout for video previews
- Responsive grid: 1 column mobile, 2 columns tablet, 3 columns desktop
- Card styling: Dark borders, hover scale effect, embedded YouTube players

**Social Media Section**
- Title: "Siga nossas redes sociais:"
- Large icon display for Facebook, YouTube, Instagram using Lucide icons
- Centered alignment with generous spacing
- White icons with scale-110 hover transition
- Icons should be clickable links

**Footer**
- Text: "Cine Estação | A felicidade só é verdadeira quando compartilhada."
- Background: #0a0a0a
- Text color: #ffffff
- Center-aligned, generous padding

## Seasonal Theme System

**Halloween (October)**
- Primary override: #ff7518 (pumpkin orange)
- Secondary: #1a0000 (blood red dark)
- Decorations: Floating pumpkin SVG elements, orange glow borders on cards, subtle fog overlay animation

**Natal/Christmas (December)**
- Primary override: #e60023 (Christmas red)
- Secondary: #006400 (forest green)
- Decorations: Falling snow CSS animation, Christmas lights border animation, festive gradient overlays

**Dia dos Namorados/Valentine's (June)**
- Primary override: #ff3366 (romantic pink)
- Secondary: #33001a (deep romantic purple)
- Decorations: Floating heart SVG animations, soft pink glow effects, romantic gradient backgrounds

## Component Styling

**Buttons**
- Primary CTA: Orange (#ff6600), rounded-full, bold text, shadow-lg, scale hover
- Secondary: Outline style with white border on dark backgrounds
- All buttons: Subtle ripple effect on click

**Cards/Containers**
- Dark backgrounds (#111111 or darker)
- Subtle glow effects on hover
- Rounded corners (rounded-xl standard)
- Cinematic shadow depth (shadow-2xl)

## Animation & Interactions

**Page Transitions**: Fade + slide combinations using Framer Motion
**Hover Effects**: Scale (1.05-1.1) + shadow enhancement
**Button Clicks**: Ripple effect
**Scroll Animations**: Fade-in elements as they enter viewport
**Video Controls**: Smooth fade-in on hover

## Spacing & Layout

**Container**: max-w-7xl centered with px-4 to px-8 responsive padding
**Section Spacing**: py-16 mobile, py-24 desktop
**Component Gaps**: gap-6 to gap-8 for grids
**Vertical Rhythm**: Maintain consistent 8px baseline grid (2, 4, 6, 8 Tailwind units)

## Responsive Breakpoints

- Mobile: < 768px (single column, hamburger menu, stacked content)
- Tablet: 768px - 1024px (2-column grids where appropriate)
- Desktop: > 1024px (full grid layouts, expanded navigation)

## Images & Media

**Video Implementation**: Use HTML5 video element for hero with autoplay, muted, loop, and playsinline attributes
**YouTube Embeds**: Responsive iframe containers with 16:9 aspect ratio
**Lazy Loading**: Apply to all images and videos below the fold

## Accessibility

- Maintain WCAG AA contrast ratios despite dark theme
- Ensure orange (#ff6600) text is only on dark backgrounds
- Provide video pause controls for accessibility
- Keyboard navigation for all interactive elements