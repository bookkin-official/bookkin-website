# Store badge assets

The unmodified English badge assets were acquired on 4 October 2026. On 19 November 2026 the Bookkin Google Play listing at `app.bookkin.bookkin` was verified with an Install action. The redesign displays the Google badge and links directly to that listing. The App Store URL remains unconfigured.

| Local asset | Official source | Original dimensions |
| --- | --- | --- |
| `public/store-badges/app-store.svg` | [Apple SVG](https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg), linked from [Apple's marketing guidelines](https://developer.apple.com/app-store/marketing/guidelines/) | SVG viewBox `0 0 119.66407 40` |
| `public/store-badges/google-play.png` | [Google Partner Marketing Hub: digital PNG badges](https://partnermarketinghub.withgoogle.com/brands/google-play/google-play/lockups-icons-badges/?folder=86642), file `GetItOnGooglePlay_Badge_Web_color_English.png`, updated 14 November 2025 | 478 × 142 pixels |

The Google download is served by its official `storage.googleapis.com/pe-portal-consumer-prod-wagtail-static` bucket using a temporary signed URL. To refresh it, open the linked folder and download the English PNG. Do not store the expiring query string in website configuration. The asset object path is `downloads_folder/Google Play Badge guidelines/11nVShEBmHWOUyCHfC_aTrzDZSs06-zEB`.

Checksums of the original downloaded bytes:

```text
SHA-256 app-store.svg
a26fc5b38380272c92e9019a2eb8b45542a66814b3e2b203772db8904b9fb99f

SHA-256 google-play.png
a7dbeba4623dd255798dd1159e543cdbeeb9e43faa6db7f859b0f9ed3699932c
```

## Display and links

- Set store URLs only after confirming that the corresponding Bookkin product page is live and downloadable. The Google badge links directly to the current listing. The redesign offers the web app for other devices and omits unconfigured native platform actions.
- Preserve the artwork, border, colours and aspect ratio. Do not crop, recolour, recreate, rotate, distort or animate it. Keep the Google PNG at its original pixel resolution; scale it uniformly with CSS rather than editing the file.
- Apple specifies at least 40 px height onscreen and 10 mm in print, with clear space of at least one-quarter of badge height. Use the preferred black badge when shown with other platforms and place it first. [Apple guidance](https://developer.apple.com/app-store/marketing/guidelines/)
- Google specifies at least 28 px height onscreen and 7.6 mm in print, with clear space of one-quarter of badge height. Its badge must be at least the size of adjacent store badges. [Google guidance](https://partnermarketinghub.withgoogle.com/brands/google-play/google-play/lockups-icons-badges/)
- For this website, use 48 px badge height, automatic width and at least 12 px surrounding clear space. The Google file listed above has no transparent outer padding; an older 646 × 250 Google download has different spacing and is not the asset committed here.
- Give each linked image a useful accessible name, such as “Download Bookkin on the App Store” or “Get Bookkin on Google Play”, and retain the website's visible keyboard focus indicator. Resolve local asset URLs through the shared base-path helper.

Before displaying badges, review the linked brand guidelines and include the applicable trademark credit lines with the website's legal information. These third-party marks remain owned by their respective companies; storing artwork does not imply Bookkin has been published, approved or endorsed by either store.

## Verification

The Apple file was parsed as SVG XML with its original viewBox. The Google file was checked for the PNG signature, decoded successfully and visually inspected. Both assets were downloaded directly from the official sources above; no badge artwork was generated or modified.
