const root = document.documentElement;
const MIN_THUMB_HEIGHT = 40;
const HIDE_DELAY = 800;

/* Only fine pointers (mouse/trackpad) get the overlay bar; touch devices keep native behaviour. */
if (matchMedia("(pointer: fine)").matches) {
  root.dataset.scrollbars = "custom";

  const track = document.createElement("div");
  track.className = "scrollbar";
  track.setAttribute("aria-hidden", "true");
  const thumb = document.createElement("div");
  thumb.className = "scrollbar-thumb";
  track.append(thumb);
  document.body.append(track);

  let hideTimer = 0;
  let hovering = false;
  let dragging = false;

  function show() {
    track.classList.add("is-visible");
    clearTimeout(hideTimer);
    hideTimer = window.setTimeout(() => {
      if (!hovering && !dragging) track.classList.remove("is-visible");
    }, HIDE_DELAY);
  }

  function update() {
    const scrollable = root.scrollHeight - root.clientHeight;
    if (scrollable <= 0) {
      track.hidden = true;
      return;
    }
    track.hidden = false;
    const trackHeight = track.clientHeight;
    const height = Math.max(
      (root.clientHeight / root.scrollHeight) * trackHeight,
      Math.min(MIN_THUMB_HEIGHT, trackHeight),
    );
    thumb.style.height = `${height}px`;
    thumb.style.transform = `translateY(${(root.scrollTop / scrollable) * (trackHeight - height)}px)`;
  }

  /* Viewport scroll events target document directly; a window listener can miss them. */
  document.addEventListener(
    "scroll",
    () => {
      update();
      show();
    },
    { passive: true },
  );
  addEventListener("resize", update);
  if (typeof ResizeObserver === "function")
    new ResizeObserver(update).observe(document.body);

  thumb.addEventListener("pointerenter", () => {
    hovering = true;
    clearTimeout(hideTimer);
  });
  thumb.addEventListener("pointerleave", () => {
    hovering = false;
    show();
  });

  thumb.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    const maxScroll = root.scrollHeight - root.clientHeight;
    const travel = track.clientHeight - thumb.clientHeight;
    if (maxScroll <= 0 || travel <= 0) return;
    thumb.setPointerCapture(event.pointerId);
    thumb.classList.add("is-dragging");
    dragging = true;
    clearTimeout(hideTimer);
    const startY = event.clientY;
    const startScrollTop = root.scrollTop;
    const behavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto"; /* Dragging must track the pointer 1:1. */
    const move = (moveEvent: PointerEvent) => {
      root.scrollTop =
        startScrollTop + ((moveEvent.clientY - startY) / travel) * maxScroll;
    };
    const stop = () => {
      root.style.scrollBehavior = behavior;
      thumb.classList.remove("is-dragging");
      dragging = false;
      thumb.removeEventListener("pointermove", move);
      thumb.removeEventListener("pointerup", stop);
      thumb.removeEventListener("pointercancel", stop);
      show();
    };
    thumb.addEventListener("pointermove", move);
    thumb.addEventListener("pointerup", stop);
    thumb.addEventListener("pointercancel", stop);
  });

  update();
}

export {};
