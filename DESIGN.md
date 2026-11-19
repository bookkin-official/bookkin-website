# Bookkin website design

The website is a neighbourhood bookshop for a Hong Kong and broader Asian reading audience. Real app previews, warm photography and a shelf interaction explain the product. The current Flutter app remains the source for functionality and screenshots.

## Shared appearance

Use warm paper `#f5f1e8`, ink `#293c50`, muted text `#586675`, rules `#d8d4cb` and restrained rust `#99513d`. Dark appearance uses app-aligned background `#1c2630`, ink `#efe9db` and muted text `#b3bec8`. Default to device language and appearance on a fresh tab visit. Manual language and light/dark choices last for the current tab visit, across pages and language editions, using sessionStorage. Apply the selected palette before paint. The closing download panel uses ink blue.

Use the existing self-hosted Newsreader for editorial headings and Manrope for controls and body copy. Chinese text uses system serif and sans families appropriate to its script. Preserve the fonts inside real app captures. Display headlines may be larger than app headings. Website controls use the app's 12 px corner role and visible focus, with at least 44 px control targets. Keep app screenshots complete and proportional.

Use one continuous ledge and three book-shaped chapter controls. Their labels describe actual actions. Let photographs provide the timber texture. Use the original Bookkin icon and unmodified official Google Play badge. Badge artwork remains stationary.

## Motion and access

Use native scrolling, one-time entrances, a 650 ms perspective chapter reveal and gentle cover lifts. Content is visible before enhancement. Respect reduced motion initially and during preference changes. Keep manual tabs keyboard-operable, ensure only the selected panel is interactive, and restore focus when closing image previews.

The 44 px theme button uses a 450 ms circular palette reveal originating from its centre, with a 250 ms colour fade fallback. Its icon and accessible name describe the available action. Reduced motion applies theme changes immediately. Header controls stay at their resting position on hover. Links use a growing underline and icon controls use a soft surface response. Get Bookkin uses a 320 ms background swipe from left to right and a horizontal arrow movement. Hover motion requires a fine pointer. The language menu opens with a 180 ms fade and scale, and closes over 140 ms. Use device language appears first and is checked by default; explicit selections remain checked during the current tab visit. Reduced motion changes menu state immediately.

Use a shared phone frame with 2 px padding, a 1 px graphite edge, 22 px outer corners and 19 px screen corners. The hero phone rests at a restrained three-degree angle with a soft shadow. Screens remain complete and proportional.

Image previews fit the complete screenshot into the popup's flexible centre area. Header, screen selectors and original-image access surround it. Ordinary viewports show the complete image without internal scrolling. Very short viewports and enlarged controls may scroll the outer dialog.

At compact widths, stack the hero and chapter photography above their copy and screenshots. Let long translations and enlarged text wrap. Keep download actions available without a QR, which is displayed on desktop. Provide English, Traditional Chinese and Simplified Chinese throughout.

## Product and imagery

Show actual app captures with sample-content captions. Store screenshot revision and capture provenance in `ASSETS.md`. Generated lifestyle scenes are disclosed in the footer. The scanning photograph shows the actual Bookkin scan-review capture facing its reader. The remaining photographs pair with separate original app captures so interface details remain readable.

Public books are represented by shared Home book discussions. Adding a book does not create a personal post. New-account referral and waitlist requirements must match the current release before changing that copy.
