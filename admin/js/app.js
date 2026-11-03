/* NEXA Admin — app shell, sign-in and router
 *
 * Views register themselves:
 *   NX.view("leads", {
 *     order: 20, icon: "leads", adminOnly: false,
 *     render: function (el, params) { ... }   // params = parts after the view id in the URL: #/leads/abc → ["abc"]
 *   });
 * Navigate with NX.go("leads/abc") or links like href="#/leads/abc".
 * The current page re-renders automatically after any NX.store write, so views just render from NX.store.
 * Keep per-view UI state (filters, tabs) in a module variable so it survives re-renders.
 */
window.NX = window.NX || {};
NX.views = {};
NX.view = function (id, def) { def.id = id; NX.views[id] = def; };
NX.go = function (path) { location.hash = "#/" + String(path).replace(/^#?\/?/, ""); };

NX.app = (function () {
  var root, mainEl, current = null, rendering = false;

  function start() {
    root = document.getElementById("app");
    NX.store.on(function (entity) {
      if (entity === "users" || entity === "settings" || entity === "all") renderShell();
      rerender();
    });
    window.addEventListener("hashchange", function () { closeMenu(); route(); });
    if (NX.store.session) boot(); else renderLogin();
  }

  /* ---------- Sign in ---------- */
  function renderLogin(errorMsg) {
    root.className = "nx-login-page";
    root.innerHTML =
      '<div class="nx-login">' +
      '<div class="nx-login-brand">' + logoHtml() + "</div>" +
      '<form class="nx-login-card" novalidate>' +
      '<h1>' + NX.esc(NX.t("login.title")) + "</h1>" +
      (NX.store.demo ? '<p class="nx-login-demo">' + NX.esc(NX.t("login.demoNote")) + ' <button type="button" class="nx-link" data-demo>' + NX.esc(NX.t("login.demoFill")) + "</button></p>" : "") +
      NX.ui.field({ name: "email", label: NX.t("login.email"), type: "email", required: true, attrs: ' autocomplete="username"' }) +
      NX.ui.field({ name: "password", label: NX.t("login.password"), type: "password", required: true, attrs: ' autocomplete="current-password"' }) +
      (errorMsg ? '<p class="nx-login-error">' + NX.esc(errorMsg) + "</p>" : "") +
      '<button type="submit" class="nx-btn nx-btn-primary nx-btn-block">' + NX.esc(NX.t("login.submit")) + "</button>" +
      '<button type="button" class="nx-link nx-login-lang" data-lang>' + NX.icon("globe", 16) + " " + NX.esc(NX.t("top.lang")) + "</button>" +
      "</form></div>";
    var form = root.querySelector("form");
    NX.ui.on(root, "click", "[data-demo]", function () { form.email.value = "admin@nexa.demo"; form.password.value = "demo"; });
    NX.ui.on(root, "click", "[data-lang]", function () { NX.i18n.setLang(NX.i18n.isAr ? "en" : "ar"); renderLogin(); });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var btn = form.querySelector("[type=submit]");
      btn.disabled = true;
      NX.store.login(form.email.value, form.password.value).then(boot, function (err) { renderLogin(err.message); });
    });
  }

  function boot() {
    root.className = "nx-boot";
    root.innerHTML = '<div class="nx-spinner"></div>';
    NX.store.bootstrap().then(function () {
      renderShell();
      if (!location.hash || location.hash === "#" || location.hash === "#/") location.replace("#/dashboard");
      route();
    }, function (err) {
      NX.store.logout().then(function () { renderLogin(err.message); });
    });
  }

  /* ---------- Shell ---------- */
  function logoHtml() {
    return '<span class="nx-logo"><svg viewBox="0 0 44 52" fill="none" aria-hidden="true"><path d="M22 8 L7 45" stroke="currentColor" stroke-width="3.1" stroke-linecap="round"/><path d="M22 8 L37 45" stroke="currentColor" stroke-width="3.1" stroke-linecap="round"/><path d="M14 31 L30 31" stroke="currentColor" stroke-width="3.1" stroke-linecap="round"/><circle cx="22" cy="8" r="3.4" fill="#B79A5F"/></svg>' +
      '<span class="nx-logo-type"><b>NEXA</b><small>WORKSPACE</small></span></span>';
  }

  function navItems() {
    return Object.keys(NX.views).map(function (k) { return NX.views[k]; })
      .filter(function (v) { return v.nav !== false && (!v.adminOnly || NX.store.isAdmin()); })
      .sort(function (a, b) { return (a.order || 99) - (b.order || 99); });
  }

  function badgeFor(id) {
    if (id === "followups") {
      var today = NX.fmt.today();
      var me = NX.store.session.email, admin = NX.store.isAdmin();
      // Staff see their own and unassigned items; admins see everyone's.
      var n = NX.store.where("followups", function (f) { return f.status !== "done" && f.dueDate && f.dueDate <= today && (admin || !f.owner || f.owner === me); }).length;
      return n ? '<span class="nx-nav-badge">' + n + "</span>" : "";
    }
    if (id === "leads") {
      var m = NX.store.where("leads", function (l) { return l.stage === "new"; }).length;
      return m ? '<span class="nx-nav-badge nx-nav-badge-soft">' + m + "</span>" : "";
    }
    return "";
  }

  function renderShell() {
    if (!NX.store.session) return;
    var s = NX.store.session;
    root.className = "nx-shell";
    root.innerHTML =
      '<aside class="nx-side" id="nxSide">' +
      '<div class="nx-side-top"><a href="#/dashboard" class="nx-side-logo">' + logoHtml() + "</a>" +
      (NX.store.demo ? '<span class="nx-demo-pill">' + NX.esc(NX.t("top.demo")) + "</span>" : "") + "</div>" +
      '<nav class="nx-nav" id="nxNav"></nav>' +
      '<div class="nx-side-foot">' +
      '<div class="nx-me">' + NX.ui.avatar(s.name || s.email) + '<div><b>' + NX.esc(s.name || s.email) + "</b><small>" + NX.esc(NX.t("role." + s.role)) + "</small></div></div>" +
      '<button type="button" class="nx-btn nx-btn-icon nx-on-dark" data-act="logout" title="' + NX.esc(NX.t("top.logout")) + '">' + NX.icon("logout") + "</button>" +
      "</div></aside>" +
      '<div class="nx-scrim" data-act="close-menu"></div>' +
      '<div class="nx-main-col">' +
      '<header class="nx-top">' +
      '<button type="button" class="nx-btn nx-btn-icon nx-menu-btn" data-act="menu" title="' + NX.esc(NX.t("top.menu")) + '">' + NX.icon("menu") + "</button>" +
      '<div class="nx-global-search">' + NX.icon("search", 16) + '<input type="search" id="nxSearch" autocomplete="off" placeholder="' + NX.esc(NX.t("top.search")) + '" /><div class="nx-search-results" id="nxSearchResults" hidden></div></div>' +
      '<div class="nx-top-actions">' +
      '<button type="button" class="nx-btn nx-btn-icon" data-act="refresh" title="' + NX.esc(NX.t("top.refresh")) + '">' + NX.icon("refresh") + "</button>" +
      '<button type="button" class="nx-btn nx-btn-ghost nx-btn-sm nx-lang-btn" data-act="lang">' + NX.esc(NX.t("top.lang")) + "</button>" +
      "</div></header>" +
      '<main class="nx-main" id="nxMain"></main>' +
      "</div>";
    mainEl = document.getElementById("nxMain");
    renderNav();
    wireShell();
  }

  function renderNav() {
    var nav = document.getElementById("nxNav");
    if (!nav) return;
    var active = current && current.id;
    nav.innerHTML = navItems().map(function (v) {
      return '<a href="#/' + v.id + '" class="nx-nav-item' + (v.id === active ? " is-active" : "") + '">' + NX.icon(v.icon || v.id) + "<span>" + NX.esc(NX.t("nav." + v.id)) + "</span>" + badgeFor(v.id) + "</a>";
    }).join("");
  }

  function closeMenu() { document.body.classList.remove("nx-menu-open"); }

  function wireShell() {
    NX.ui.on(root, "click", "[data-act=menu]", function () { document.body.classList.toggle("nx-menu-open"); });
    NX.ui.on(root, "click", "[data-act=close-menu]", closeMenu);
    NX.ui.on(root, "click", "[data-act=lang]", function () { NX.i18n.setLang(NX.i18n.isAr ? "en" : "ar"); });
    NX.ui.on(root, "click", "[data-act=logout]", function () { NX.store.logout().then(function () { location.hash = ""; renderLogin(); }); });
    NX.ui.on(root, "click", "[data-act=refresh]", function (e, b) {
      b.classList.add("is-spinning");
      NX.store.bootstrap().then(function () { renderShell(); route(); NX.ui.toast(NX.i18n.isAr ? "تم التحديث" : "Up to date"); },
        function (err) { b.classList.remove("is-spinning"); NX.ui.toast(err.message, "error"); });
    });

    var input = document.getElementById("nxSearch"), box = document.getElementById("nxSearchResults");
    input.addEventListener("input", function () { renderSearch(input.value, box); });
    input.addEventListener("focus", function () { if (input.value) renderSearch(input.value, box); });
    input.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { input.value = ""; box.hidden = true; input.blur(); }
      if (e.key === "Enter") { var a = box.querySelector("a"); if (a) { location.hash = a.getAttribute("href"); box.hidden = true; input.blur(); } }
    });
    document.addEventListener("click", function (e) { if (!e.target.closest(".nx-global-search")) box.hidden = true; });
    NX.ui.on(box, "click", "a", function () { box.hidden = true; input.value = ""; });
  }

  function renderSearch(q, box) {
    q = q.trim().toLowerCase();
    if (!q) { box.hidden = true; return; }
    var has = function (r, keys) { return keys.some(function (k) { return String(r[k] || "").toLowerCase().indexOf(q) > -1; }); };
    var groups = [
      { key: "leads", icon: "leads", rows: NX.store.where("leads", function (r) { return has(r, ["name", "company", "phone", "email", "city"]); }), title: function (r) { return r.name; }, sub: function (r) { return [r.company, NX.opt("stages", r.stage)].filter(Boolean).join(" · "); }, href: function (r) { return "#/leads/" + r.id; } },
      { key: "projects", icon: "projects", rows: NX.store.where("projects", function (r) { return has(r, ["name", "client", "code"]); }), title: function (r) { return r.name; }, sub: function (r) { return [r.code, r.client].filter(Boolean).join(" · "); }, href: function (r) { return "#/projects/" + r.id; } },
      { key: "proposals", icon: "proposals", rows: NX.store.where("proposals", function (r) { return has(r, ["number", "client", "clientCompany", "title"]); }), title: function (r) { return r.number + " — " + (r.client || ""); }, sub: function (r) { return r.title || ""; }, href: function (r) { return "#/proposals/" + r.id; } }
    ];
    var html = groups.filter(function (g) { return g.rows.length; }).map(function (g) {
      return '<div class="nx-sr-group"><h6>' + NX.esc(NX.t("nav." + g.key)) + "</h6>" + g.rows.slice(0, 5).map(function (r) {
        return '<a href="' + g.href(r) + '">' + NX.icon(g.icon, 16) + "<span><b>" + NX.esc(g.title(r)) + "</b><small>" + NX.esc(g.sub(r)) + "</small></span></a>";
      }).join("") + "</div>";
    }).join("");
    box.innerHTML = html || '<p class="nx-sr-empty">' + NX.esc(NX.t("top.noResults")) + "</p>";
    box.hidden = false;
  }

  /* ---------- Router ---------- */
  function parse() {
    var parts = (location.hash || "").replace(/^#\/?/, "").split("/").filter(Boolean).map(decodeURIComponent);
    return { id: parts[0] || "dashboard", params: parts.slice(1) };
  }

  function route() {
    if (!NX.store.session) return renderLogin();
    if (!mainEl) renderShell();
    var r = parse();
    var v = NX.views[r.id];
    if (!v || (v.adminOnly && !NX.store.isAdmin())) { NX.go("dashboard"); return; }
    var changed = !current || current.id !== r.id || String(current.params) !== String(r.params);
    current = { id: r.id, params: r.params };
    renderNav();
    paint();
    if (changed) window.scrollTo(0, 0);
  }

  function paint() {
    if (!mainEl || !current) return;
    var v = NX.views[current.id];
    if (!v) return;
    rendering = true;
    var y = window.scrollY;
    // Fresh element each time so views can attach listeners without piling them up.
    var el = document.createElement("div");
    el.className = "nx-view nx-view-" + current.id;
    try { v.render(el, current.params); }
    catch (err) { console.error(err); el.innerHTML = '<div class="nx-empty"><p>' + NX.esc(NX.t("c.error", { msg: err.message })) + "</p></div>"; }
    // Keep focus/caret in a search box across re-renders.
    var active = document.activeElement, sel = null;
    if (active && mainEl.contains(active) && active.matches("[data-search]")) sel = { v: active.value, s: active.selectionStart };
    mainEl.innerHTML = "";
    mainEl.appendChild(el);
    if (sel) { var ns = el.querySelector("[data-search]"); if (ns) { ns.focus(); try { ns.setSelectionRange(sel.s, sel.s); } catch (e) {} } }
    window.scrollTo(0, y);
    rendering = false;
  }

  /* Re-render the current page (after data changes). full=true also rebuilds the shell (language change). */
  var queued = false;
  function rerender(full) {
    if (full === true) { if (NX.store.session && mainEl) { renderShell(); route(); } return; }
    if (queued) return;
    queued = true;
    Promise.resolve().then(function () { queued = false; if (!rendering) { renderNav(); paint(); } });
  }

  return { start: start, rerender: rerender, route: route, get current() { return current; } };
})();
