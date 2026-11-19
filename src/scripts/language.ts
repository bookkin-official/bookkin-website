import { locales, resolveLanguage } from "../content/locales.mjs";

const menu = document.querySelector<HTMLDetailsElement>(".language-menu");
const summary = menu?.querySelector("summary");
const navigation = menu?.querySelector("nav");

if (menu && summary && navigation) {
  let selected: string | null = null;
  try {
    selected = sessionStorage.getItem("bookkin-language");
  } catch {}
  if (!selected || !locales.includes(selected)) selected = null;
  const links = menu.querySelectorAll<HTMLAnchorElement>(
    "[data-language], [data-use-device]",
  );
  links.forEach((link) => {
    const current = selected
      ? link.dataset.language === selected
      : link.hasAttribute("data-use-device");
    if (current) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
    link.addEventListener("click", () => {
      try {
        if (link.hasAttribute("data-use-device"))
          sessionStorage.removeItem("bookkin-language");
        else sessionStorage.setItem("bookkin-language", link.dataset.language!);
      } catch {
        /* Explicit language links remain usable without storage. */
      }
      const target = new URL(link.href);
      target.search = location.search;
      target.hash = location.hash;
      link.href = target.href;
    });
  });

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  let desiredOpen = menu.open;
  let activeAnimation: Animation | undefined;

  function setOpen(open: boolean, restoreFocus = false) {
    const wasOpen = menu!.open;
    const previous = getComputedStyle(navigation!);
    const opacity = previous.opacity;
    const transform = previous.transform;
    activeAnimation?.cancel();
    activeAnimation = undefined;
    desiredOpen = open;
    if (restoreFocus) summary!.focus();
    if (reducedMotion.matches || typeof navigation!.animate !== "function") {
      menu!.open = open;
      navigation!.inert = false;
      return;
    }
    if (open) menu!.open = true;
    navigation!.inert = !open;
    const animation = navigation!.animate(
      [
        {
          opacity: wasOpen ? opacity : 0,
          transform: wasOpen ? transform : "scale(.97)",
        },
        { opacity: open ? 1 : 0, transform: open ? "scale(1)" : "scale(.97)" },
      ],
      {
        duration: open ? 180 : 140,
        easing: "cubic-bezier(.22,1,.36,1)",
        fill: "both",
      },
    );
    activeAnimation = animation;
    void animation.finished
      .then(() => {
        if (activeAnimation !== animation) return;
        menu!.open = desiredOpen;
        navigation!.inert = false;
        animation.cancel();
        activeAnimation = undefined;
      })
      .catch(() => {});
  }

  summary.addEventListener("click", (event) => {
    event.preventDefault();
    setOpen(!desiredOpen);
  });
  document.addEventListener("pointerdown", (event) => {
    if (
      desiredOpen &&
      event.target instanceof Node &&
      !menu.contains(event.target)
    )
      setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      desiredOpen &&
      !document.querySelector("dialog[open]")
    ) {
      event.preventDefault();
      setOpen(false, true);
    }
  });
  menu.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    requestAnimationFrame(() => {
      if (desiredOpen && !menu.contains(document.activeElement)) setOpen(false);
    });
  });
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) setOpen(desiredOpen);
  });
  window.addEventListener("languagechange", () => {
    if (selected) return;
    const language = resolveLanguage([...navigator.languages]);
    if (language === document.documentElement.lang) return;
    const target = new URL(`${menu.dataset.base}${language}/`, location.origin);
    target.search = location.search;
    target.hash = location.hash;
    location.replace(target.href);
  });
}
