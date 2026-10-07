# Voltra: cinematic concept site

A hardcoded showcase website for a concept electric-bike brand, built to show clients
what kind of motion-heavy site you can make. All copy, prices and images are placeholders.

## Run it
Requires Node.js. Install dependencies once, then start the Express server:

```sh
npm install
npm start
```

Open `http://localhost:3000`. Set the `PORT` environment variable to use a different port.

## Files
- `server.js`: Express server for the website
- `index.html`, `bikes.html`, `technology.html`, `about.html`, `contact.html`, `showcase.html`: the six pages
- `css/style.css`: all styles and animations (pure CSS: 3D, scroll, hover, AI effects)
- `js/main.js`: interactions (menu, AI assistant prompts, filters, swatches, form), no dependencies
- `design-source/`: the original design-canvas artboards (`.dc.html`), for reference only.
  They only run inside the design canvas.

## What's in it
- Cinematic hero: letterbox, camera HUD, split-letter headline, lime text fill, perspective grid floor
- "AI" layer: 3D energy core (rotating rings + morphing orb), AI ride assistant that types,
  thinks, streams answers, draws a route and predicts range; neural network background
- 3D: tilt-on-hover product frame with hotspots, exploded view (hover to separate),
  rotating 3D carousel (hover to pause), flip cards, 3D tilt cards
- Scroll: section reveals, tilt-in frames and a drifting timeline (CSS scroll-driven animations);
  every section's animations start when it scrolls into view
- Hover: fill-sweep buttons, rolling nav labels, underline draws, spotlight cards
- Micro-UI: counters, charging battery cells, floating-label form, smart-reply chips

## Customise
- **Brand name:** search and replace `Voltra` across the HTML files.
- **Accent colour:** change `--a:#d9f99d` on the `<div class="site">` element in each page
  (try `#67e8f9` cyan, `#fdba74` orange, `#c4b5fd` violet).
- **Images:** each placeholder is a `<div class="ph">` labelled with its size; replace it
  with an `<img>` keeping the same `aspect-ratio`.
- **Copy:** placeholder text is marked with brackets like `[Rs 000,000]` or starts with "Placeholder".
- **Contact form:** validates and shows a sent state but does not send. Connect it in
  `js/main.js` (look for "Concept only") to EmailJS, Formspree or your own endpoint.

## Browser notes
- Scroll-linked effects use CSS scroll-driven animations (Chrome, Edge, Opera). Other browsers
  show the finished state, so nothing is ever hidden.
- `prefers-reduced-motion` turns animations off; all content stays visible.
- If JavaScript fails, every page still renders fully; only the interactions are lost.
