const toggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");
const root = document.documentElement;
const deviceTheme = window.matchMedia("(prefers-color-scheme: dark)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let manualTheme: string | null = null;
try {
  manualTheme = sessionStorage.getItem("bookkin-theme");
} catch {}
if (manualTheme !== "light" && manualTheme !== "dark") manualTheme = null;

function applyTheme(theme: "light" | "dark") {
  root.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#1c2630" : "#f5f1e8");
  if (!toggle) return;
  const label =
    theme === "dark" ? toggle.dataset.labelLight! : toggle.dataset.labelDark!;
  toggle.setAttribute("aria-label", label);
  toggle.title = label;
}

export {};

if (toggle) {
  applyTheme(
    manualTheme === "light" || manualTheme === "dark"
      ? manualTheme
      : deviceTheme.matches
        ? "dark"
        : "light",
  );
  toggle.hidden = false;
  let transition: ViewTransition | undefined;

  reducedMotion.addEventListener("change", () => {
    if (!reducedMotion.matches) return;
    transition?.skipTransition();
    root.classList.remove("theme-fade");
  });
  deviceTheme.addEventListener("change", (event) => {
    if (!manualTheme) applyTheme(event.matches ? "dark" : "light");
  });

  toggle.addEventListener("click", async () => {
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    manualTheme = theme;
    try {
      sessionStorage.setItem("bookkin-theme", theme);
    } catch {}
    if (reducedMotion.matches) {
      applyTheme(theme);
      return;
    }
    toggle.disabled = true;
    if (typeof document.startViewTransition !== "function") {
      root.classList.add("theme-fade");
      applyTheme(theme);
      window.setTimeout(() => {
        root.classList.remove("theme-fade");
        toggle.disabled = false;
      }, 250);
      return;
    }
    const bounds = toggle.getBoundingClientRect();
    const x = bounds.left + bounds.width / 2;
    const y = bounds.top + bounds.height / 2;
    const radius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    );
    try {
      transition = document.startViewTransition(() => applyTheme(theme));
      await transition.ready;
      if (!reducedMotion.matches) {
        await root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 450,
            easing: "cubic-bezier(.22,1,.36,1)",
            pseudoElement: "::view-transition-new(root)",
          },
        ).finished;
      }
      await transition.finished;
    } catch {
      transition?.skipTransition();
      applyTheme(theme);
    } finally {
      transition = undefined;
      toggle.disabled = false;
    }
  });
}
