// Opt-in website screenshots. Synthetic public sample data, no live services.
// Run via website/scripts/refresh-app-screens.ps1 (one process per locale).
import 'dart:io';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:bookkin/core/bottom_navigation.dart';
import 'package:bookkin/core/strings.dart';
import 'package:bookkin/core/widgets.dart';
import 'package:bookkin/data/customization.dart';
import 'package:bookkin/data/models.dart';
import 'package:bookkin/data/repository.dart';
import 'package:bookkin/data/store.dart';
import 'package:bookkin/features/library/book_scanner_screen.dart';
import 'package:bookkin/features/library/book_scanner_service.dart';
import 'package:bookkin/features/library/catalog_covers.dart';
import 'package:bookkin/features/library/profile_screen.dart';
import 'package:bookkin/main.dart';
import '../test/native_plugin_fixture.dart';
import '../test/profile_sections_test.dart' show section;
import '../test/shelf_cover_navigation_test.dart' show CarouselFixture;
import '../test/shelf_categories_test.dart' show travelId;
import '../test/support/scan_consent.dart';
import 'knowledge_domains_preview_test.dart' as qa;

final output = Directory(
  Platform.environment['BOOKKIN_WEBSITE_SCREENS'] ??
      '../bookkin-website/src/assets/screens',
);

List<Book> sampleBooks(String script) {
  final titles = script == 'en'
      ? [
          'The Secret Garden',
          'A Room of One’s Own',
          'Ways of Seeing',
          'Walden',
          'The Little Prince',
          'Pride and Prejudice',
        ]
      : script == 'Hant'
      ? ['秘密花園', '自己的房間', '觀看的方式', '瓦爾登湖', '小王子', '傲慢與偏見']
      : ['秘密花园', '自己的房间', '观看的方式', '瓦尔登湖', '小王子', '傲慢与偏见'];
  const authors = [
    'F. H. Burnett',
    'Virginia Woolf',
    'John Berger',
    'H. D. Thoreau',
    'Saint-Exupéry',
    'Jane Austen',
  ];
  const colors = [
    0xff8aa58d,
    0xffb08674,
    0xff899fb4,
    0xffbaa376,
    0xffc18d79,
    0xff8b889e,
  ];
  return [
    for (var i = 0; i < titles.length; i++)
      Book(
        id: 'sample-${i + 1}',
        title: titles[i],
        author: authors[i],
        category: i == 3 ? 'Nature' : 'Literature',
        color: colors[i],
        language: script == 'en' ? 'en' : 'zh',
      ),
  ];
}

Future<Uint8List> frameBytes(
  WidgetTester t, {
  bool verifyNavigation = false,
}) async {
  late Uint8List result;
  expect(t.takeException(), isNull);
  await t.runAsync(() async {
    final boundary =
        qa.capture.currentContext!.findRenderObject() as RenderRepaintBoundary;
    final image = await boundary.toImage(pixelRatio: 2);
    if (verifyNavigation) {
      final raw = (await image.toByteData(format: ui.ImageByteFormat.rawRgba))!;
      for (final spot in [(34, 34), (85, 1590), (370, 1590), (514, 1590)]) {
        var ink = 0;
        for (var x = spot.$1; x < spot.$1 + 40; x++) {
          for (var y = spot.$2; y < spot.$2 + 40; y++) {
            final offset = (y * image.width + x) * 4;
            if (raw.getUint8(offset) < 150 &&
                raw.getUint8(offset + 1) < 150 &&
                raw.getUint8(offset + 2) < 150) {
              ink++;
            }
          }
        }
        expect(
          ink,
          greaterThan(25),
          reason: 'Toolbar/navigation glyph is present at $spot',
        );
      }
    }
    final data = await image.toByteData(format: ui.ImageByteFormat.png);
    result = data!.buffer.asUint8List();
    image.dispose();
  });
  return result;
}

Future<void> capture(WidgetTester t, String name) async {
  await t.runAsync(() async {
    await Future.wait([
      for (final element in find.byType(Image).evaluate())
        precacheImage(
          (element.widget as Image).image,
          element,
          onError: (_, _) {},
        ),
    ]);
  });
  // Include fresh toolbar/navigation glyph paint in the exported widget tree.
  for (final element in find.byType(Icon).evaluate()) {
    element.renderObject?.markNeedsPaint();
  }
  await t.pumpAndSettle();
  final bytes = await frameBytes(
    t,
    verifyNavigation: !name.startsWith('scan-'),
  );
  output.createSync(recursive: true);
  File('${output.path}/$name.png').writeAsBytesSync(bytes);
}

String localized(String script, String en, String hant, String hans) =>
    script == 'en'
    ? en
    : script == 'Hant'
    ? hant
    : hans;

AppData sampleData(String script, List<Book> books) => AppData(
  accountId: 'a',
  signedIn: true,
  name: 'Sofia Chan',
  bio: localized(
    script,
    'A quiet moment. A new perspective.',
    '在書頁之間，遇見新的風景。',
    '在书页之间，遇见新的风景。',
  ),
  language: script == 'en' ? 'en' : 'zh_$script',
  theme: 'light',
  playDecorativeAnimations: false,
  books: books,
  shelfIds: books.map((b) => b.id).toList(),
  interests: ['Literature', 'Nature'],
  followerCount: 24,
  following: ['sample-noah', 'sample-iris', 'sample-lily'],
  customization: const Customization(bookshelf: BookshelfStyle.keepsakes),
  readers: [
    Reader(
      'sample-kai',
      'Kai Wong',
      localized(
        script,
        'Stories, slow mornings and a little curiosity.',
        '故事、慢活的早晨，還有一點好奇心。',
        '故事、慢活的早晨，还有一点好奇心。',
      ),
      ['Literature', 'Nature'],
      [],
      favouriteBooks: books.take(4).toList(),
      customization: const Customization(bookshelf: BookshelfStyle.keepsakes),
    ),
    Reader(
      'sample-maya',
      'Maya Lee',
      localized(
        script,
        'Finding new worlds, one chapter at a time.',
        '一章一章，探索新的世界。',
        '一章一章，探索新的世界。',
      ),
      ['Literature', 'Design'],
      [],
      favouriteBooks: books.skip(2).take(4).toList(),
    ),
  ],
);

void main() {
  setUp(useCleanNativePhotoRecovery);
  setUp(() {
    // ignore: invalid_use_of_visible_for_testing_member
    SharedPreferences.setMockInitialValues({});
  });
  setUpAll(() async {
    final sdk = Platform.environment['FLUTTER_ROOT'] ?? 'C:/flutter';
    for (final item in {
      'Roboto': '$sdk/bin/cache/artifacts/material_fonts/roboto-regular.ttf',
      'MaterialIcons':
          '$sdk/bin/cache/artifacts/material_fonts/MaterialIcons-Regular.otf',
      'PreviewCJK': 'C:/Windows/Fonts/msjh.ttc',
      'Georgia': 'C:/Windows/Fonts/georgia.ttf',
      'serif': 'C:/Windows/Fonts/msjh.ttc',
    }.entries) {
      await (FontLoader(item.key)..addFont(
            Future.value(
              ByteData.sublistView(File(item.value).readAsBytesSync()),
            ),
          ))
          .load();
    }
  });

  for (final script in ['en', 'Hant', 'Hans']) {
    testWidgets(
      'website screenshots $script',
      (t) async {
        final books = sampleBooks(script);
        final data = sampleData(script, books);
        final store = BookkinStore(MemoryRepository(), initial: data);
        addTearDown(store.dispose);
        final suffix = script == 'en' ? 'en' : script.toLowerCase();

        // A synthetic input photo made with the app's real cover widget.
        await qa.preview(
          t,
          store,
          Scaffold(
            body: Center(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  for (final book in books.take(3))
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 8),
                      child: SizedBox(
                        width: 100,
                        height: 150,
                        child: BookCover(book),
                      ),
                    ),
                ],
              ),
            ),
          ),
          height: 210,
          script: script,
        );
        final scanPhoto = await frameBytes(t);
        final scanData = data.clone()
          ..books = []
          ..shelfIds = [];
        final scanStore = BookkinStore(MemoryRepository(), initial: scanData);
        addTearDown(scanStore.dispose);
        await qa.preview(
          t,
          scanStore,
          BookScannerScreen(
            initialPhoto: scanPhoto,
            analyze: (_) async => BookScanResult([
              for (final book in books.take(3))
                ScannedBook(
                  book: Book.fromJson({
                    ...book.toJson(),
                    'id': 'scan-${book.id}',
                  }),
                  confidence: .99,
                ),
            ]),
            lookupCover: (_) async => const CoverMatches([]),
          ),
          script: script,
        );
        await allowScanPhotoProcessing(t);
        await t.pumpAndSettle();
        expect(find.byKey(const ValueKey('review')), findsOneWidget);
        await capture(t, 'scan-$suffix');

        await qa.preview(t, store, const AppShell(), script: script);
        final nav = t.widget<BookkinNavigationBar>(
          find.byType(BookkinNavigationBar),
        );
        nav.onDestinationSelected(1);
        await t.pumpAndSettle();
        await capture(t, 'people-$suffix');

        final fixture = CarouselFixture();
        fixture.copies
          ..clear()
          ..addAll(books);
        fixture.favourites = books.take(4).map((b) => b.id).toList();
        fixture.categoriesById.clear();
        fixture.categoriesById[travelId] = {
          'id': travelId,
          'name': localized(script, 'Weekend reads', '週末書單', '周末书单'),
          'version': 1,
          'bookIds': books.skip(2).map((b) => b.id).toList(),
        };
        fixture.snapshot = data.clone();
        final profileStore = BookkinStore(fixture, initial: data.clone());
        addTearDown(profileStore.dispose);
        addTearDown(fixture.api.dispose);
        await qa.preview(t, profileStore, const AppShell(), script: script);
        t
            .widget<BookkinNavigationBar>(find.byType(BookkinNavigationBar))
            .onDestinationSelected(4);
        await t.pumpAndSettle();
        final label = tr(t.element(find.byType(ProfileScreen)), 'Bookshelf');
        await section(t, label);
        // Return to the actual profile top after selecting its shelf section.
        final scroll = find
            .descendant(
              of: find.byType(ProfileScreen),
              matching: find.byType(Scrollable),
            )
            .first;
        t.state<ScrollableState>(scroll).position.jumpTo(0);
        await t.pumpAndSettle();
        await capture(t, 'profile-$suffix');
        await t.pumpWidget(const SizedBox.shrink());
        await t.pumpAndSettle();
      },
      variant: TargetPlatformVariant.only(TargetPlatform.android),
    );
  }
}
