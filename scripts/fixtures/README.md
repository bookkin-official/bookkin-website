# App screenshot fixtures

The nine PNGs in `src/assets/screens` were rendered on 19 November 2026 from the actual Bookkin Flutter widget tree at app revision `0ca4d243ff4aeb002d3f9e80343732ccddf97254` using Flutter 3.41.6 / Dart 3.11.4. Each is a 390 × 844 logical-pixel viewport captured at 2×, giving **780 × 1688 PNG pixels**.

| Files | Actual screen |
| --- | --- |
| `profile-{en,hant,hans}.png` | `AppShell` → `ProfileScreen`, Bookshelf section with `BookCollectionShelf` / `BookshelfPreview` |
| `people-{en,hant,hans}.png` | `AppShell` → `PeopleScreen`, public discovery cards and complete rounded favourite covers |
| `scan-{en,hant,hans}.png` | `BookScannerScreen`, review stage with three selected books and the real add-to-bookshelf action |

Names, counts and book selections are deterministic sample fixtures. No production account, private photo, service token or live provider result is used. Artwork is the app's actual `BookCover` / `SimpleBookArtwork` fallback. The scanner input is a synthetic fixture assembled from these real cover widgets; recognition is injected through the existing `analyze` callback and catalog lookup returns no candidates. These screenshots demonstrate the app UI, not live recognition quality. The fixture confirms the scan-processing consent through the existing test helper before rendering the review.

From the website checkout on this Windows machine:

```powershell
.\scripts\refresh-app-screens.ps1 -AppRepository C:\Users\wyau7\Documents\Projects\bookkin
```

The script temporarily copies `website_screens_preview_test.dart` into the app's `tool` directory, captures each locale in a separate Flutter process, and removes the temporary file in `finally`. It refuses to overwrite an existing fixture and leaves the app's existing edits untouched. Dependencies must already be resolved (`flutter pub get` in the app if needed). Fonts use local Roboto/MaterialIcons from the Flutter SDK and Microsoft JhengHei/Georgia from Windows; no remote font request occurs.

The key capture command, run once for `en`, `Hant` and `Hans`, is:

```powershell
C:\flutter\bin\flutter.bat test --no-pub tool/website_screens_preview_test.dart --plain-name 'website screenshots en' --reporter expanded
```

The capture fixture passed formatting, Flutter analysis, three locale widget runs, PNG dimension checks and visual inspection of all nine outputs. This does not represent a live production login, camera/provider test or a full application regression run.
