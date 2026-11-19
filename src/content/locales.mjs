export const locales = ["en", "zh-Hant", "zh-Hans"];

// Self-contained so the root page uses this resolver before its first paint.
export function resolveLanguage(preferences = []) {
  for (const preference of preferences) {
    const parts = String(preference)
      .toLowerCase()
      .replaceAll("_", "-")
      .split("-");
    if (parts[0] === "en") return "en";
    if (parts[0] !== "zh") continue;
    if (parts.includes("hant")) return "zh-Hant";
    if (parts.includes("hans")) return "zh-Hans";
    return parts.some((part) => ["hk", "tw", "mo"].includes(part))
      ? "zh-Hant"
      : "zh-Hans";
  }
  return "en";
}
