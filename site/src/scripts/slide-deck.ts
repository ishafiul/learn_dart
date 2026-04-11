export function initSlideDecks(): void {
  document.querySelectorAll(".deck").forEach((node) => initDeck(node as HTMLElement));
}

function initDeck(root: HTMLElement): void {
  const slides = Array.from(root.querySelectorAll(".slide")) as HTMLElement[];
  const storageKey = root.dataset.storageKey ?? "";
  const progressKey = root.dataset.progressKey ?? "";
  const lessonUrl = root.dataset.lessonUrl ?? "";
  const wrap = root.closest(".deck-wrap");
  const progressEl = wrap?.querySelector("[data-progress]");
  const progressFill = wrap?.querySelector("[data-progress-fill]") as HTMLElement | null;
  const nextWrap = wrap?.querySelector("[data-next-lesson]") as HTMLElement | null;
  const prevBtn = wrap?.querySelector('[data-action="prev"]') as HTMLButtonElement | null;
  const nextBtn = wrap?.querySelector('[data-action="next"]') as HTMLButtonElement | null;

  let index = 0;
  try {
    const raw = localStorage.getItem(storageKey);
    if (raw !== null) {
      const n = Number(raw);
      if (Number.isFinite(n) && n >= 0 && n < slides.length) index = n;
    }
  } catch {
    /* ignore */
  }

  function apply(): void {
    slides.forEach((slideEl, i) => {
      slideEl.classList.toggle("is-active", i === index);
    });
    if (progressEl) {
      progressEl.textContent = `Slide ${index + 1} / ${slides.length}`;
    }
    const pct = slides.length ? ((index + 1) / slides.length) * 100 : 100;
    root.style.setProperty("--deck-pct", `${pct}%`);
    if (progressFill) {
      progressFill.style.width = `${pct}%`;
    }
    try {
      localStorage.setItem(storageKey, String(index));
      localStorage.setItem(progressKey, lessonUrl);
    } catch {
      /* ignore */
    }
    const atEnd = index === slides.length - 1;
    if (nextWrap) {
      nextWrap.style.display = atEnd ? "flex" : "none";
    }
    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) {
      if (atEnd) {
        nextBtn.textContent = "Finished ✓";
        nextBtn.disabled = true;
      } else {
        nextBtn.textContent = "Next →";
        nextBtn.disabled = false;
      }
    }
  }

  prevBtn?.addEventListener("click", () => {
    index = Math.max(0, index - 1);
    apply();
  });
  nextBtn?.addEventListener("click", () => {
    if (index < slides.length - 1) {
      index += 1;
      apply();
    }
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === " ") {
      e.preventDefault();
      nextBtn?.click();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevBtn?.click();
    }
  });

  apply();
}
