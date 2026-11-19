import { readFile, stat, readdir } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import sharp from "sharp";
import jsQR from "jsqr";
import { site, settings } from "../site.config.mjs";
import { locales } from "../src/content/locales.mjs";

const pages = [
  "index.html",
  ...locales.map((locale) => `${locale}/index.html`),
  "404.html",
];
const localPaths = new Set();
for (const page of pages) {
  const html = await readFile(`dist/${page}`, "utf8");
  const is404 = page === "404.html";
  const locale =
    locales.find((language) => page.startsWith(`${language}/`)) || "en";
  const widgets = [
    ...html.matchAll(
      /<script\b[^>]*\bsrc="https:\/\/app\.johncrm\.com\/widget\/chat\.js"[^>]*>/g,
    ),
  ];
  assert.equal(
    widgets.length,
    site.origin === "https://web.bookkin.net" ? 1 : 0,
    `WebChat embed count on ${page}`,
  );
  if (widgets.length) assert.match(widgets[0][0], /\basync\b/);
  assert.ok(html.includes(`lang="${locale}"`), `${page} language`);
  if (!is404) {
    assert.ok(
      html.includes(`rel="canonical" href="${site.absolute(`${locale}/`)}"`),
      `${page} canonical`,
    );
    assert.ok(
      html.includes(`content="${site.absolute(`og-${locale}.png`)}"`),
      `${page} social image`,
    );
    for (const language of locales)
      assert.ok(
        html.includes(`hreflang="${language}"`),
        `${page} alternate ${language}`,
      );
    assert.ok(html.includes('id="download"'), `${page} download anchor`);
    assert.ok(
      html.includes(settings.GOOGLE_PLAY_URL),
      `${page} Play Store link`,
    );
    assert.ok(
      !html.includes("download-unlinked"),
      `${page} has no disabled release buttons`,
    );
    assert.ok(
      !html.includes(`href="${settings.WEB_APP_URL}"`),
      `${page} web app CTA removed`,
    );
    assert.ok(
      !html.includes('class="scroll-cue"'),
      `${page} scroll cue removed`,
    );
    assert.ok(html.includes("data-theme-toggle"), `${page} theme control`);
  }
  assert.ok(
    !html.includes('href=""') && !html.includes('href="#"'),
    `${page} no empty links`,
  );
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((x) => x[1]));
  for (const [, raw] of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    const value = raw.replaceAll("&amp;", "&");
    if (value.startsWith("#")) {
      assert.ok(ids.has(value.slice(1)), `${page} missing anchor ${value}`);
      continue;
    }
    if (!value.startsWith("/")) continue;
    assert.ok(
      value.startsWith(site.base),
      `${page} base missing from ${value}`,
    );
    const url = new URL(value, site.origin);
    let file = decodeURIComponent(url.pathname.slice(site.base.length));
    if (!file || file.endsWith("/")) file += "index.html";
    if (url.hash) {
      const target = await readFile(`dist/${file}`, "utf8");
      assert.ok(
        target.includes(`id="${url.hash.slice(1)}"`),
        `${page} missing target ${value}`,
      );
    }
    localPaths.add(file);
  }
  for (const [, list] of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const item of list.split(",")) {
      const url = item.trim().split(/\s+/)[0];
      assert.ok(url.startsWith(site.base), `${page} srcset prefix ${url}`);
      localPaths.add(decodeURIComponent(url.slice(site.base.length)));
    }
  }
}
for (const file of localPaths)
  assert.ok(
    (await stat(path.join("dist", file))).isFile(),
    `asset missing ${file}`,
  );
for (const file of await readdir("dist/_astro")) {
  if (!file.endsWith(".css")) continue;
  const css = await readFile(`dist/_astro/${file}`, "utf8");
  for (const [, raw] of css.matchAll(/url\(([^)]+)\)/g)) {
    const url = raw.replaceAll(/['"]/g, "");
    if (url.startsWith("data:")) continue;
    const relative = url.startsWith(site.base)
      ? url.slice(site.base.length)
      : path.join("_astro", url);
    assert.ok(
      (await stat(path.join("dist", relative))).isFile(),
      `font/CSS asset missing ${url}`,
    );
  }
}
const sitemap = await readFile("dist/sitemap-0.xml", "utf8");
for (const locale of locales)
  assert.ok(
    sitemap.includes(`<loc>${site.absolute(`${locale}/`)}</loc>`),
    `sitemap ${locale}`,
  );
assert.ok(
  !sitemap.includes("#download") && !sitemap.includes("404"),
  "sitemap excludes fragments and errors",
);
assert.ok(
  (await readFile("dist/robots.txt", "utf8")).includes(
    site.absolute("sitemap-index.xml"),
  ),
);
const { data, info } = await sharp("dist/download-qr.png")
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const qr = jsQR(new Uint8ClampedArray(data), info.width, info.height);
assert.equal(
  qr?.data,
  settings.GOOGLE_PLAY_URL,
  "QR decodes directly to Bookkin on Google Play",
);
console.log(
  `Verified ${pages.length} pages, ${localPaths.size} assets, language metadata, sitemap, downloads and QR for ${site.siteUrl}`,
);
