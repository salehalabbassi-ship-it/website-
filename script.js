/* ===== NEXA — interactions ===== */
(function () {
  "use strict";

  /* ---------- Bilingual (EN / AR) ---------- */
  var HTML = {
    heroTitle: {
      en: 'From concept to<br />construction, <span class="gold">built right</span>.',
      ar: 'من الفكرة إلى التنفيذ،<br />نبنيها <span class="gold">بإتقان</span>.'
    }
  };
  var TITLE = {
    en: "NEXA Engineering — Architecture · Engineering · Interior Design",
    ar: "نكسا للهندسة — عمارة · هندسة · تصميم داخلي"
  };
  var root = document.documentElement;
  var langToggle = document.getElementById("langToggle");
  var heroTitle = document.getElementById("heroTitle");

  function applyLang(lang) {
    var isAr = lang === "ar";
    root.lang = lang;
    root.dir = isAr ? "rtl" : "ltr";
    document.title = TITLE[lang];

    document.querySelectorAll("[data-en]").forEach(function (el) {
      var val = el.getAttribute("data-" + lang);
      if (val !== null) el.textContent = val;
    });
    document.querySelectorAll("[data-en-ph]").forEach(function (el) {
      var val = el.getAttribute("data-" + lang + "-ph");
      if (val !== null) el.setAttribute("placeholder", val);
    });
    if (heroTitle) heroTitle.innerHTML = HTML.heroTitle[lang];
    if (langToggle) {
      langToggle.textContent = isAr ? "English" : "العربية";
      langToggle.setAttribute("aria-label", isAr ? "Switch to English" : "التبديل إلى العربية");
    }
    try { localStorage.setItem("nexa-lang", lang); } catch (e) {}
  }

  var savedLang = "en";
  try { savedLang = localStorage.getItem("nexa-lang") || "en"; } catch (e) {}
  applyLang(savedLang === "ar" ? "ar" : "en");

  if (langToggle) {
    langToggle.addEventListener("click", function () {
      applyLang(root.lang === "ar" ? "en" : "ar");
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.getElementById("header");
  var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 20); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("nav");
  var closeMenu = function () {
    nav.classList.remove("open");
    toggle.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add("visible"); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }

  /* ---------- Animated stat counters ---------- */
  var counters = document.querySelectorAll(".stat-num[data-count]");
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var runCounter = function (el) {
    var target = parseInt(el.dataset.count, 10) || 0;
    var suffix = el.dataset.suffix || "";
    if (prefersReduced) { el.textContent = target + suffix; return; }
    var duration = 1400, start = performance.now();
    var tick = function (now) {
      var p = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window && counters.length) {
    var co = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { runCounter(entry.target); co.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { co.observe(el); });
  } else {
    counters.forEach(runCounter);
  }

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contactForm");
  var note = document.getElementById("formNote");
  var EMAIL = "Info@ex-nexa.com";
  // Google Apps Script web app — saves each message to the NEXA spreadsheet and emails a copy.
  var ENDPOINT = "https://script.google.com/macros/s/AKfycbyMNeRrx026cIjVHtBzjvfA8ZZGplCjr8h5LMysmXtD67j4oEM5pctA901NW8foB7cQEQ/exec";

  var MSG = {
    invalid: { en: "Please fill in the required fields correctly.", ar: "يرجى تعبئة الحقول المطلوبة بشكل صحيح." },
    sending: { en: "Sending…", ar: "جارٍ الإرسال…" },
    sent: { en: "Thanks{n}! Your message has been sent — we'll be in touch soon.", ar: "شكراً{n}! تم إرسال رسالتك — سنتواصل معك قريباً." },
    tap: { en: "Almost done — tap here to send your message to " + EMAIL, ar: "خطوة أخيرة — اضغط هنا لإرسال رسالتك إلى " + EMAIL },
    failed: { en: "Couldn't send automatically — tap here to email us instead", ar: "تعذّر الإرسال تلقائياً — اضغط هنا لمراسلتنا عبر البريد" }
  };
  var t = function (key) { return MSG[key][root.lang === "ar" ? "ar" : "en"]; };

  var buildMailto = function (d) {
    var subject = encodeURIComponent("New enquiry from the NEXA website");
    var body = encodeURIComponent(
      "Name: " + d.name + "\nEmail: " + d.email +
      "\nProject type: " + (d.type || "-") + "\n\nMessage:\n" + d.message
    );
    return "mailto:" + EMAIL + "?subject=" + subject + "&body=" + body;
  };

  var showMailto = function (label, d, kind) {
    note.className = "form-note " + (kind || "success");
    var a = document.createElement("a");
    a.href = buildMailto(d);
    a.textContent = label;
    note.textContent = "";
    note.appendChild(a);
  };

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      note.className = "form-note";
      note.textContent = "";

      var valid = true;
      form.querySelectorAll("[required]").forEach(function (input) {
        var field = input.closest(".field");
        var ok = input.checkValidity();
        if (field) field.classList.toggle("invalid", !ok);
        if (!ok) valid = false;
      });
      if (!valid) {
        note.className = "form-note error";
        note.textContent = t("invalid");
        return;
      }

      // Honeypot: silently ignore bots
      if (form.botcheck && form.botcheck.checked) return;

      var data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        type: form.type.value,
        message: form.message.value.trim()
      };
      var first = data.name.split(" ")[0];
      var nameSuffix = first ? ", " + first : "";
      var configured = ENDPOINT && ENDPOINT.indexOf("script.google.com") !== -1;

      if (!configured) {
        // No backend connected yet — offer one-tap email to the studio.
        showMailto(t("tap"), data, "success");
        return;
      }

      note.className = "form-note";
      note.textContent = t("sending");
      var body = new URLSearchParams({
        name: data.name, email: data.email, type: data.type, message: data.message
      });
      // Posts to the Google Apps Script, which appends a spreadsheet row and emails a copy.
      // no-cors: the submission reaches the script; we treat a completed request as sent.
      fetch(ENDPOINT, { method: "POST", mode: "no-cors", body: body })
        .then(function () {
          note.className = "form-note success";
          note.textContent = t("sent").replace("{n}", nameSuffix);
          form.reset();
        })
        .catch(function () { showMailto(t("failed"), data, "error"); });
    });

    form.querySelectorAll("input, textarea, select").forEach(function (input) {
      input.addEventListener("input", function () {
        var f = input.closest(".field");
        if (f) f.classList.remove("invalid");
      });
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
