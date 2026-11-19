# Asset provenance

## Current app captures

`src/assets/screens/` contains Profile, People and scanner review captures in English (`en`), Traditional Chinese (`hant`) and Simplified Chinese (`hans`). Each PNG is 780 × 1688 pixels, rendered from actual Flutter widgets at 390 × 844 logical pixels on 19 November 2026.

Source revision is `0ca4d243ff4aeb002d3f9e80343732ccddf97254`. Profile and People use AppShell navigation. Scanner review uses BookScannerScreen with injected recognition fixture results. Captures use the current app's normal appearance, cover-based shelves and original interface geometry. The source revision is recorded explicitly because newer app revisions can arrive independently of this website.

Accounts, biographies, counts and book arrangements are local demonstration data. The screenshots use Bookkin's generated default covers for sample book records. They contain no production reader data and do not demonstrate live recognition, provider approval or audience size. Scanner results are provided by the fixture. No account, database or live provider request was involved.

Reproduce with `scripts/refresh-app-screens.ps1`. The retained fixture and additional limitations are in `scripts/fixtures/README.md`. All nine captures passed their locale render test, fixed-dimension and icon-pixel checks. The visible caption is localized from “Actual Bookkin interface · sample content”.

Older October app-profile/app-people/app-home assets are retained as historical originals and are no longer used by the redesigned page.

## Generated editorial photographs

The three original PNGs in `src/assets/lifestyle/` were generated with the built-in image-generation tool on 19 November 2026 for Bookkin's official website. They depict fictional readers in a Hong Kong neighbourhood bookshop, with consistent warm timber, cream, navy and rust tones.

- `bookshop-reading.png` shows a reader using a phone beside sunlit shelves.
- `bookshop-scan.png` shows a reader holding a phone toward book spines. The first output had the phone reversed. The selected revision corrects its orientation and uses the actual `scan-en.png` as the screen reference.
- `bookshop-friends.png` shows two readers sharing a book and a phone at a table.

The photographic scan screen is a generated perspective rendering of the supplied real app screenshot. Unaltered, localized screenshots remain separately available in the page's app preview gallery. The editorial scene retains its English scan screen in every language edition. Lifestyle imagery does not document actual Bookkin customers. The localized footer discloses AI-created editorial scenes and sample app content.

Astro creates responsive WebP files for delivery. Keep complete source PNGs for future approved edits.

## Brand, fonts and store badge

The existing Bookkin icon and favicon are reused. Newsreader and Manrope remain self-hosted with their SIL Open Font License notices under `public/licenses/`. System fonts render Chinese copy without a third-party font request.

`public/store-badges/google-play.png` is the original official badge. Preserve its artwork and proportions, provide surrounding clear space, and link to the verified Bookkin listing. See `docs/store-badges.md`. Google Play and the Google Play logo are trademarks of Google LLC.

## Generated site graphics

The desktop QR is generated locally from `settings.GOOGLE_PLAY_URL` and is verified by decoding the built PNG. Each localized sharing image combines the website's original brand assets, typography, generated reading photograph and the corresponding real app screenshot. The build also retains `og.png` as an English compatibility image.
