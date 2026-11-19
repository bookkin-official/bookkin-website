import { readFile, mkdir, copyFile, writeFile } from "node:fs/promises";
import satori from "satori";
import sharp from "sharp";

const fontRoot = "node_modules/@fontsource/newsreader";
const regular = await readFile(
  `${fontRoot}/files/newsreader-latin-400-normal.woff`,
);
const italic = await readFile(
  `${fontRoot}/files/newsreader-latin-400-italic.woff`,
);
const icon = await readFile("public/bookkin-icon.png");
const photo = await sharp("src/assets/lifestyle/bookshop-reading.png")
  .resize(650, 630, { fit: "cover", position: "right" })
  .jpeg()
  .toBuffer();
const el = (type, props, ...children) => ({
  type,
  props: { ...props, children: children.length === 1 ? children[0] : children },
});
for (const [locale, suffix] of [
  ["en", "en"],
  ["zh-Hant", "hant"],
  ["zh-Hans", "hans"],
]) {
  const screen = await sharp(`src/assets/screens/profile-${suffix}.png`)
    .resize(190)
    .png()
    .toBuffer();
  const svg = await satori(
    el(
      "div",
      {
        style: {
          display: "flex",
          width: "100%",
          height: "100%",
          background: "#f5f1e8",
          color: "#293c50",
          position: "relative",
          fontFamily: "Newsreader",
        },
      },
      el("img", {
        src: `data:image/jpeg;base64,${photo.toString("base64")}`,
        width: 650,
        height: 630,
        style: { position: "absolute", right: 0, top: 0 },
      }),
      el(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 600,
            padding: "55px 60px",
          },
        },
        el(
          "div",
          { style: { display: "flex", alignItems: "center", gap: 12 } },
          el("img", {
            src: `data:image/png;base64,${icon.toString("base64")}`,
            width: 44,
            height: 44,
            style: { borderRadius: 9 },
          }),
          el("span", { style: { fontSize: 35 } }, "Bookkin"),
        ),
        el(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              fontSize: 95,
              lineHeight: 1.02,
              letterSpacing: -3,
            },
          },
          el("span", {}, "Your books."),
          el(
            "span",
            { style: { fontStyle: "italic", color: "#99513d" } },
            "Your people.",
          ),
        ),
        el("span", { style: { fontSize: 23 } }, "bookkin.net"),
      ),
      el("img", {
        src: `data:image/png;base64,${screen.toString("base64")}`,
        width: 190,
        height: 411,
        style: {
          position: "absolute",
          bottom: 25,
          left: 540,
          border: "6px solid #293c50",
          borderRadius: 24,
          transform: "rotate(-6deg)",
        },
      }),
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Newsreader", data: regular, weight: 400, style: "normal" },
        { name: "Newsreader", data: italic, weight: 400, style: "italic" },
      ],
    },
  );
  await writeFile(
    `public/og-${locale}.png`,
    await sharp(Buffer.from(svg)).png({ palette: true, quality: 90 }).toBuffer(),
  );
}
await copyFile("public/og-en.png", "public/og.png");
await mkdir("public/licenses", { recursive: true });
await copyFile(`${fontRoot}/LICENSE`, "public/licenses/newsreader-OFL.txt");
await copyFile(
  "node_modules/@fontsource-variable/manrope/LICENSE",
  "public/licenses/manrope-OFL.txt",
);
console.log(
  "Generated sharing artwork with each localized app screen and retained font licenses.",
);
