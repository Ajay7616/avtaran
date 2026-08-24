# Avtaran Capital — React + Tailwind conversion

## Project structure

```
src/
  App.jsx                  # top-level state (scroll, nav, reveal/count-up effects) + section order
  index.js                 # React DOM entry point, imports index.css
  index.css                # Tailwind directives + @apply component classes
  logo.js                  # base64 logo, shared by Nav & Footer
  components/
    data.jsx                # shared content arrays (nav links, team, services, cities, etc.)
    Nav.jsx, Hero.jsx, TrustBar.jsx, About.jsx, ImpactStats.jsx,
    Leadership.jsx, Services.jsx, VcfoFeature.jsx, StartupProgramme.jsx,
    Presence.jsx, Industries.jsx, Testimonial.jsx, CtaStrip.jsx,
    Contact.jsx, Footer.jsx, LocationPin.jsx
```

Each section of the page is its own component file. Shared content (nav links, team bios, service list, city/country lists) lives in `components/data.jsx` — it has a `.jsx` extension because the services list embeds inline SVG icons.

## Tailwind setup
- `tailwind.config.js` — brand design tokens (colors, fonts, gradients, shadows, custom `tab`/`mob` breakpoints matching the original 960px/720px media queries)
- `src/index.css` — Tailwind directives + a small `@layer components` block for the complex/reused visual patterns (buttons, cards, nav dropdown, form fields, presence tabs) built from `@apply`
- Everything else (layout, spacing, one-off styling) is Tailwind utilities directly in each component's JSX
- `public/index.html` — HTML shell (Google Fonts, `scroll-smooth` on `<html>`, mounts `#root`)

The old hand-written `App.css` (~340 lines of raw CSS) has been fully replaced — `index.css` is ~75 lines.

## Behavior ported from the original vanilla-JS

- Sticky nav background/shrink on scroll
- Mobile menu open/close (uses the `mob:` breakpoint, ≤720px)
- Scroll-triggered `.reveal` animations (IntersectionObserver)
- Animated count-up stats (IntersectionObserver)
- India/Global presence tabs (also triggerable from footer/dropdown links via `data-panel`)
- Contact form client-side validation + success/error message

## Run locally

```bash
npm install
npm start
```

Tailwind's JIT compiler scans `src/**/*.{js,jsx}` automatically — no separate build step needed beyond `npm start`/`npm run build`.
