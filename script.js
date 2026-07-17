/* ===== Nexa Agency — interactions ===== */
(function () {
  "use strict";

  // Header shadow on scroll
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile menu
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const closeMenu = () => {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  // Reveal on scroll
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
  }

  // Animated stat counters
  const counters = document.querySelectorAll(".stat-num[data-count]");
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const runCounter = (el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    const suffix = el.dataset.suffix || "";
    if (prefersReduced) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window && counters.length) {
    const co = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            co.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => co.observe(el));
  } else {
    counters.forEach(runCounter);
  }

  // Contact form (client-side only demo)
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      note.className = "form-note";
      note.textContent = "";
      let valid = true;
      form.querySelectorAll("[required]").forEach((input) => {
        const field = input.closest(".field");
        const ok = input.checkValidity();
        field.classList.toggle("invalid", !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        note.classList.add("error");
        note.textContent = "Please fill in the required fields correctly.";
        return;
      }
      const name = form.querySelector("#name").value.trim().split(" ")[0] || "there";
      note.classList.add("success");
      note.textContent = `Thanks, ${name}! We'll be in touch within one business day.`;
      form.reset();
    });
    form.querySelectorAll("input, textarea, select").forEach((input) => {
      input.addEventListener("input", () => input.closest(".field").classList.remove("invalid"));
    });
  }

  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
