import test from "node:test";
import assert from "node:assert/strict";
import { resolveLanguage } from "../src/content/locales.mjs";

test("device language respects ordered supported preferences and English fallback", () => {
  assert.equal(resolveLanguage(["ja-JP", "en-GB", "zh-HK"]), "en");
  assert.equal(resolveLanguage(["ko-KR", "zh-TW"]), "zh-Hant");
  assert.equal(resolveLanguage(["ja-JP"]), "en");
  assert.equal(resolveLanguage([]), "en");
});
test("explicit Chinese script overrides region", () => {
  assert.equal(resolveLanguage(["zh-Hans-HK"]), "zh-Hans");
  assert.equal(resolveLanguage(["zh-Hant-CN"]), "zh-Hant");
  assert.equal(resolveLanguage(["ZH_hAnt_tw"]), "zh-Hant");
});
test("Chinese region resolves to the appropriate written language", () => {
  for (const region of ["HK", "TW", "MO"])
    assert.equal(resolveLanguage([`zh-${region}`]), "zh-Hant");
  for (const language of ["zh", "zh-CN", "zh-SG"])
    assert.equal(resolveLanguage([language]), "zh-Hans");
});
