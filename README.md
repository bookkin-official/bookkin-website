# Bookkin website

The official Bookkin product and download website at [web.bookkin.net](https://web.bookkin.net/), built with Astro. The Flutter application and its production data live in a separate repository.

## Development

Use Node 24, then run `npm ci` and `npm run dev`. Run `npm run verify` for type checks, configuration and language tests, a production build and static asset verification. `npm run preview` serves the built site.

## Updating content

- `src/content/home.ts` contains complete English, Traditional Chinese and Simplified Chinese editions.
- `src/content/documents.ts` contains the Privacy, Terms, Community & child safety, Help & support and Delete account pages in the same three languages. `src/components/Document.astro` renders each at `/privacy/`, `/terms/`, `/community/`, `/support/` and `/delete-account/` inside a language edition, with a language-neutral copy at the root. Section anchors are shared by every edition.
- `src/components/Home.astro` composes the homepage. `src/layouts/Layout.astro` owns navigation, language selection, metadata and the production chat embed.
- `src/styles/global.css` defines the shared website appearance. Read `DESIGN.md` before changing it.
- `site.config.mjs` holds public website and app links. The Google Play URL is the verified `app.bookkin.bookkin` listing. Hero and closing badges link directly there, as does the desktop QR. The homepage download actions use Google Play.
- `src/assets/screens/` contains real Flutter captures with sample content. Run `scripts/refresh-app-screens.ps1` to refresh them using the separate app checkout. Capture provenance and limitations are in `scripts/fixtures/README.md` and `ASSETS.md`.
- `src/assets/lifestyle/` contains the generated bookshop photography. Astro produces responsive WebP assets at build time.

## Language

A fresh tab visit uses the first supported browser language. Manual choices use sessionStorage for the current tab visit. The root URL honours that temporary choice during the visit. Explicit language URLs `/en/`, `/zh-Hant/` and `/zh-Hans/` always display that language. Chinese script subtags take precedence over region. Hong Kong, Taiwan and Macau use Traditional Chinese, other Chinese preferences use Simplified Chinese, and unsupported preferences fall back to English. Use device language is the default, checked entry in the language menu. The menu fades and scales smoothly on opening and closing, with instant reduced-motion changes. Query parameters and section fragments survive changes. Storage failures leave explicit language links usable. Without JavaScript the root remains a readable English page with language links. The language-neutral copy of each document page follows the same rules and keeps the page.

Each edition has its own canonical URL, HTML language, social metadata and alternate-language links. Sharing images use the corresponding app capture. Language-specific UI text belongs in the content dictionary, including screenshot descriptions and loading feedback.

## Interaction

The shelf uses manual accessible tabs with Arrow, Home and End keys. Choosing a book lifts it and turns the chapter into view. Linked app captures open a native dialog with screen selection, left/right navigation, Escape and focus restoration. The popup fits the complete screenshot in its flexible centre area. Loading retains the current image and offers the original image on failure. FAQ and mobile menus use native disclosure elements. Every chapter remains visible without JavaScript.

Motion is optional. Hero and section entrances run once, chapter changes take 650 ms, and hover effects lift the books and phone. Reduced motion removes displacement and cancels active JavaScript animations. Page scrolling stays native.

## Publishing

Cloudflare Workers Builds publishes this repository's `main` using `npm run verify`. The GitHub Pages mirror supplies a project-path `SITE_URL`. See `docs/hosting.md`. A push to main can publish the site. Verify both base paths before publishing, then check the public deployment and its assets. The contact link is only shown when `CONTACT_URL` is configured in `site.config.mjs`. The legal and support pages are part of the site.

The header sun/moon control follows device appearance until a manual choice is made, then keeps that choice across pages in the current tab visit. A fresh visit follows device appearance again. A circular View Transition reveals the new palette, with a colour-fade fallback and instant reduced-motion updates. Slim shared phone frames keep app captures complete.
