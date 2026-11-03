/* NEXA Admin — shared UI helpers
 * Views build HTML strings with these helpers and attach events with NX.ui.on (event delegation).
 * Always escape user data with NX.esc() before putting it in HTML. */
window.NX = window.NX || {};

/* ---------- Basics ---------- */
NX.esc = function (s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
};

/* Replace {{placeholders}} in template text. Unknown placeholders are left empty. */
NX.fill = function (text, ctx) {
  return String(text || "").replace(/\{\{\s*(\w+)\s*\}\}/g, function (_, k) { return ctx && ctx[k] != null ? ctx[k] : ""; });
};

/* Standard placeholder values for a lead/proposal — used by message templates. */
NX.templateContext = function (opts) {
  opts = opts || {};
  var s = NX.store.settings, c = s.company, me = NX.store.session || {};
  var lead = opts.lead || {}, prop = opts.proposal || {}, proj = opts.project || {};
  var ar = opts.lang ? opts.lang === "ar" : NX.i18n.isAr;
  var svc = NX.opt("services", lead.service || prop.service || proj.service);
  var svcObj = (s.services || []).find(function (x) { return x.id === (lead.service || prop.service || proj.service); });
  return {
    name: lead.name || prop.client || proj.client || "",
    company: lead.company || prop.clientCompany || "",
    service: svcObj ? (ar ? svcObj.ar : svcObj.en) : svc,
    proposalNumber: prop.number || "",
    proposalTitle: prop.title || "",
    total: prop.items ? NX.fmt.money(NX.calc.proposal(prop).total) : "",
    projectName: proj.name || "",
    myName: me.name || "",
    myEmail: me.email || "",
    companyName: ar ? c.nameAr : c.nameEn,
    companyPhone: c.phone || "",
    companyEmail: c.email || "",
    website: c.website || ""
  };
};

/* ---------- Formatting ---------- */
NX.fmt = (function () {
  function loc() { return NX.i18n.isAr ? "ar-SA-u-nu-latn-ca-gregory" : "en-GB"; }
  function num(n, d) {
    var v = Number(n) || 0;
    return v.toLocaleString("en-US", { minimumFractionDigits: d || 0, maximumFractionDigits: d == null ? 2 : d });
  }
  function money(n, opts) {
    var v = Number(n) || 0;
    var s = v.toLocaleString("en-US", { minimumFractionDigits: (opts && opts.decimals) ? 2 : 0, maximumFractionDigits: (opts && opts.decimals) ? 2 : 0 });
    return opts && opts.bare ? s : s + " " + NX.t("c.sar");
  }
  function compact(n) {
    var v = Number(n) || 0;
    if (Math.abs(v) >= 1e6) return (v / 1e6).toFixed(v >= 1e7 ? 0 : 1).replace(/\.0$/, "") + "M";
    if (Math.abs(v) >= 1e3) return (v / 1e3).toFixed(v >= 1e5 ? 0 : 1).replace(/\.0$/, "") + "K";
    return String(Math.round(v));
  }
  function toDate(d) { if (!d) return null; var x = d instanceof Date ? d : new Date(String(d).length === 10 ? d + "T00:00:00" : d); return isNaN(x) ? null : x; }
  function date(d) { var x = toDate(d); return x ? x.toLocaleDateString(loc(), { day: "numeric", month: "short", year: "numeric" }) : ""; }
  function dateShort(d) { var x = toDate(d); return x ? x.toLocaleDateString(loc(), { day: "numeric", month: "short" }) : ""; }
  function dateTime(d) { var x = toDate(d); return x ? x.toLocaleString(loc(), { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }) : ""; }
  function rel(d) {
    var x = toDate(d); if (!x) return "";
    var diff = (x - new Date()) / 1000, a = Math.abs(diff), t;
    if (a < 60) return NX.t("c.justNow");
    if (a < 3600) t = NX.t("c.min", { n: Math.round(a / 60) });
    else if (a < 86400) t = NX.t("c.hr", { n: Math.round(a / 3600) });
    else t = NX.t("c.day", { n: Math.round(a / 86400) });
    return diff < 0 ? NX.t("c.ago", { t: t }) : NX.t("c.in", { t: t });
  }
  /* YYYY-MM-DD in local time */
  function iso(d) { var x = d ? toDate(d) : new Date(); var p = function (n) { return String(n).padStart(2, "0"); }; return x.getFullYear() + "-" + p(x.getMonth() + 1) + "-" + p(x.getDate()); }
  function today() { return iso(new Date()); }
  function addDays(d, n) { var x = toDate(d) || new Date(); x = new Date(x); x.setDate(x.getDate() + n); return iso(x); }
  return { num: num, money: money, compact: compact, date: date, dateShort: dateShort, dateTime: dateTime, rel: rel, iso: iso, today: today, addDays: addDays, toDate: toDate };
})();

/* ---------- Calculations ---------- */
NX.calc = {
  /* Proposal totals. items: [{qty, rate}], discount (SAR), vatRate (%) */
  proposal: function (p) {
    var subtotal = (p.items || []).reduce(function (s, it) { return s + (Number(it.qty) || 0) * (Number(it.rate) || 0); }, 0);
    var discount = Number(p.discount) || 0;
    var net = Math.max(0, subtotal - discount);
    var vatRate = p.vatRate == null || p.vatRate === "" ? NX.store.settings.vatRate : Number(p.vatRate);
    var vat = net * vatRate / 100;
    return { subtotal: subtotal, discount: discount, net: net, vatRate: vatRate, vat: vat, total: net + vat };
  },
  /* Project progress from tasks (falls back to manual progress). */
  progress: function (proj) {
    var t = proj.tasks || [];
    if (!t.length) return Number(proj.progress) || 0;
    return Math.round(100 * t.filter(function (x) { return x.done; }).length / t.length);
  }
};

/* ---------- Settings lists (stages, services, sources, projectStatuses) ---------- */
NX.list = function (name) { return (NX.store.settings[name] || []); };
NX.opt = function (name, id) {
  var o = NX.list(name).find(function (x) { return x.id === id; });
  return o ? NX.i18n.pick(o) : (id || "");
};
NX.opts = function (name) { return NX.list(name).map(function (o) { return { value: o.id, label: NX.i18n.pick(o) }; }); };
NX.optColor = function (name, id) { var o = NX.list(name).find(function (x) { return x.id === id; }); return (o && o.color) || "gray"; };

/* Users as select options, and display name for an email. */
NX.userOpts = function (withEmpty) {
  var list = NX.store.users().filter(function (u) { return u.active; }).map(function (u) { return { value: u.email, label: u.name || u.email }; });
  return withEmpty ? [{ value: "", label: NX.t("c.none") }].concat(list) : list;
};
NX.userName = function (email) {
  if (!email) return "";
  var u = NX.store.users().find(function (x) { return x.email === email; });
  return u ? (u.name || u.email) : email;
};

/* ---------- Phone / WhatsApp / mail links ---------- */
NX.phone = {
  /* Normalize a Saudi number to international digits: 0551234567 → 966551234567 */
  intl: function (p) {
    var d = String(p || "").replace(/[^\d]/g, "");
    if (!d) return "";
    if (d.indexOf("00") === 0) d = d.slice(2);
    if (d.indexOf("05") === 0 && d.length === 10) d = "966" + d.slice(1);
    else if (d.indexOf("5") === 0 && d.length === 9) d = "966" + d;
    return d;
  },
  wa: function (p, text) { var n = NX.phone.intl(p); return "https://wa.me/" + n + (text ? "?text=" + encodeURIComponent(text) : ""); },
  tel: function (p) { var n = NX.phone.intl(p); return n ? "tel:+" + n : "tel:" + p; },
  mailto: function (to, subject, body) { return "mailto:" + (to || "") + "?subject=" + encodeURIComponent(subject || "") + "&body=" + encodeURIComponent(body || ""); }
};

/* ---------- Icons (inline SVG, stroke = currentColor) ---------- */
NX.icon = (function () {
  var P = {
    dashboard: '<rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/>',
    leads: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18.5 14.8c1.6.8 2.7 2.5 3 5.2"/>',
    projects: '<path d="M3 21h18M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6"/><path d="M9 10h.01M15 10h.01"/>',
    proposals: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5M9 13h6M9 17h6M9 9h2"/>',
    followups: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/>',
    templates: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/><path d="m3 17.5 9 5 9-5" opacity=".5"/>',
    conversations: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20.5l1.4-4.6A8 8 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
    analysis: '<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    whatsapp: '<path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.2z"/><path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8c-1-.4-2.2-1.6-2.6-2.6l.8-1-1-2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    phone: '<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>',
    print: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    logout: '<path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4M10 17l-5-5 5-5M5 12h11"/>',
    refresh: '<path d="M20 11a8 8 0 0 0-14.8-4M4 4v4h4M4 13a8 8 0 0 0 14.8 4M20 20v-4h-4"/>',
    check: '<path d="m5 12 5 5L20 7"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21c1-4 4.5-6 8-6s7 2 8 6"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',
    link: '<path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
    file: '<path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8z"/><path d="M14 3v5h5"/>',
    list: '<path d="M9 6h12M9 12h12M9 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    board: '<rect x="3" y="4" width="5" height="16" rx="1"/><rect x="10" y="4" width="5" height="11" rx="1"/><rect x="17" y="4" width="4" height="7" rx="1"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 21h16"/>',
    upload: '<path d="M12 21V9M7 14l5-5 5 5M4 3h16"/>',
    send: '<path d="M21 3 10 14M21 3l-7 18-4-7-7-4z"/>',
    pin: '<path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
    money: '<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/>',
    star: '<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
    dots: '<circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/>',
    inbox: '<path d="M3 13h5l1.5 3h5L16 13h5"/><path d="M5 5h14l2 8v6H3v-6z"/>',
    out: '<path d="M7 17 17 7M8 7h9v9"/>',
    in: '<path d="M17 7 7 17M16 17H7V8"/>'
  };
  return function (name, size) {
    var s = size || 18;
    return '<svg class="nx-ic" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[name] || P.dots) + "</svg>";
  };
})();

/* ---------- UI components ---------- */
NX.ui = (function () {
  var esc = NX.esc;

  /* Event delegation: NX.ui.on(el, "click", "[data-act=edit]", function (e, target) {...}) */
  function on(el, type, selector, fn) {
    el.addEventListener(type, function (e) {
      var t = e.target.closest(selector);
      if (t && el.contains(t)) fn(e, t);
    });
  }

  /* Tones: gold, green, red, blue, amber, purple, gray */
  function badge(text, tone) { return '<span class="nx-badge nx-tone-' + (tone || "gray") + '">' + esc(text) + "</span>"; }
  function stageBadge(id) { return badge(NX.opt("stages", id), NX.optColor("stages", id)); }
  function statusBadge(listName, id) { return badge(NX.opt(listName, id), NX.optColor(listName, id)); }

  /* Button: { label, icon, act, cls ("primary"|"ghost"|"danger"|"icon"|"sm"), attrs, href, title } */
  function btn(o) {
    var cls = "nx-btn " + (o.cls || "ghost").split(" ").map(function (c) { return "nx-btn-" + c; }).join(" ");
    var inner = (o.icon ? NX.icon(o.icon, o.iconSize || 16) : "") + (o.label ? "<span>" + esc(o.label) + "</span>" : "");
    var attrs = (o.act ? ' data-act="' + esc(o.act) + '"' : "") + (o.title ? ' title="' + esc(o.title) + '" aria-label="' + esc(o.title) + '"' : "") + (o.attrs || "");
    if (o.href) return '<a class="' + cls + '" href="' + esc(o.href) + '"' + (o.external ? ' target="_blank" rel="noopener"' : "") + attrs + ">" + inner + "</a>";
    return '<button type="' + (o.type || "button") + '" class="' + cls + '"' + attrs + ">" + inner + "</button>";
  }

  /* Page header: { title, sub, actions (html) } */
  function pageHead(o) {
    return '<div class="nx-page-head"><div><h1>' + esc(o.title) + "</h1>" + (o.sub ? '<p class="nx-sub">' + o.sub + "</p>" : "") + '</div><div class="nx-page-actions">' + (o.actions || "") + "</div></div>";
  }

  /* KPI tile: { label, value, sub, tone, icon, href } */
  function kpi(o) {
    var tag = o.href ? "a" : "div";
    return "<" + tag + ' class="nx-kpi' + (o.tone ? " nx-kpi-" + o.tone : "") + '"' + (o.href ? ' href="' + esc(o.href) + '"' : "") + ">" +
      '<div class="nx-kpi-top"><span class="nx-kpi-label">' + esc(o.label) + "</span>" + (o.icon ? NX.icon(o.icon, 18) : "") + "</div>" +
      '<div class="nx-kpi-value">' + o.value + "</div>" + (o.sub ? '<div class="nx-kpi-sub">' + o.sub + "</div>" : "") + "</" + tag + ">";
  }

  function card(title, body, opts) {
    opts = opts || {};
    return '<section class="nx-card' + (opts.cls ? " " + opts.cls : "") + '">' +
      (title ? '<div class="nx-card-head"><h2>' + esc(title) + "</h2>" + (opts.actions || "") + "</div>" : "") +
      '<div class="nx-card-body' + (opts.flush ? " nx-flush" : "") + '">' + body + "</div></section>";
  }

  function empty(text, actionHtml) {
    return '<div class="nx-empty"><p>' + esc(text || NX.t("c.empty")) + "</p>" + (actionHtml || "") + "</div>";
  }

  /* Responsive table (cards on phones).
   * { cols: [{ label, render(row) → html, cls }], rows, rowAttr(row) → attribute string, empty: text } */
  function table(o) {
    if (!o.rows || !o.rows.length) return empty(o.empty);
    var head = o.cols.map(function (c) { return '<th class="' + (c.cls || "") + '">' + esc(c.label || "") + "</th>"; }).join("");
    var body = o.rows.map(function (r) {
      return "<tr " + (o.rowAttr ? o.rowAttr(r) : "") + ">" + o.cols.map(function (c) {
        return '<td class="' + (c.cls || "") + '" data-label="' + esc(c.label || "") + '">' + c.render(r) + "</td>";
      }).join("") + "</tr>";
    }).join("");
    return '<div class="nx-table-wrap"><table class="nx-table"><thead><tr>' + head + "</tr></thead><tbody>" + body + "</tbody></table></div>";
  }

  /* Filter chips: items [{ value, label, count }], active value, attr name used for clicks (data-<attr>) */
  function chips(items, active, attr) {
    return '<div class="nx-chips">' + items.map(function (it) {
      return '<button type="button" class="nx-chip' + (String(it.value) === String(active) ? " is-active" : "") + '" data-' + attr + '="' + esc(it.value) + '">' +
        esc(it.label) + (it.count != null ? ' <span class="nx-chip-n">' + it.count + "</span>" : "") + "</button>";
    }).join("") + "</div>";
  }

  /* Form field.
   * { name, label, type: text|number|email|tel|date|time|datetime-local|url|password|textarea|select|checkbox,
   *   value, options: [{value,label}], required, full (span 2 columns), placeholder, rows, dir, step, min, max, hint, attrs } */
  function field(f) {
    var id = "f_" + f.name + "_" + Math.random().toString(36).slice(2, 6);
    var v = f.value == null ? "" : f.value;
    var req = f.required ? " required" : "";
    var common = ' id="' + id + '" name="' + esc(f.name) + '"' + req + (f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : "") + (f.dir ? ' dir="' + f.dir + '"' : "") + (f.attrs || "");
    var input;
    if (f.type === "textarea") input = "<textarea" + common + ' rows="' + (f.rows || 3) + '">' + esc(v) + "</textarea>";
    else if (f.type === "select") {
      input = "<select" + common + ">" + (f.options || []).map(function (o) {
        var ov = typeof o === "object" ? o.value : o, ol = typeof o === "object" ? o.label : o;
        return '<option value="' + esc(ov) + '"' + (String(ov) === String(v) ? " selected" : "") + ">" + esc(ol) + "</option>";
      }).join("") + "</select>";
    } else if (f.type === "checkbox") {
      return '<label class="nx-check' + (f.full ? " nx-full" : "") + '"><input type="checkbox"' + common + (v ? " checked" : "") + " /> <span>" + esc(f.label) + "</span></label>";
    } else {
      var dirAttr = (!f.dir && /^(email|tel|url|number)$/.test(f.type)) ? ' dir="ltr"' : "";
      input = '<input type="' + (f.type || "text") + '"' + common + dirAttr + ' value="' + esc(v) + '"' + (f.step != null ? ' step="' + f.step + '"' : "") + (f.min != null ? ' min="' + f.min + '"' : "") + (f.max != null ? ' max="' + f.max + '"' : "") + " />";
    }
    return '<div class="nx-field' + (f.full ? " nx-full" : "") + '"><label for="' + id + '">' + esc(f.label || "") + (f.required ? ' <i class="nx-req">*</i>' : "") + "</label>" + input + (f.hint ? '<small class="nx-hint">' + esc(f.hint) + "</small>" : "") + "</div>";
  }
  function form(fields) { return '<div class="nx-form-grid">' + fields.map(field).join("") + "</div>"; }

  /* Read a form into an object. number inputs → Number, checkboxes → boolean. */
  function readForm(formEl) {
    var out = {};
    Array.prototype.forEach.call(formEl.elements, function (el) {
      if (!el.name || el.disabled) return;
      if (el.type === "checkbox") out[el.name] = el.checked;
      else if (el.type === "number") out[el.name] = el.value === "" ? "" : Number(el.value);
      else out[el.name] = el.value.trim ? el.value.trim() : el.value;
    });
    return out;
  }

  /* Modal dialog.
   * { title, body (html), size: "sm"|"md"|"lg"|"xl", submitLabel, onSubmit(data, formEl, modal) → false | Promise,
   *   footer (extra html on the left), onOpen(el, modal), noFooter }
   * Returns { el, close }. Click handlers inside can use NX.ui.on(modal.el, ...). */
  function modal(o) {
    var host = document.getElementById("nx-modals");
    var wrap = document.createElement("div");
    wrap.className = "nx-modal-backdrop";
    wrap.innerHTML =
      '<form class="nx-modal nx-modal-' + (o.size || "md") + '" novalidate>' +
      '<div class="nx-modal-head"><h2>' + esc(o.title || "") + '</h2><button type="button" class="nx-btn nx-btn-icon" data-close aria-label="' + esc(NX.t("c.close")) + '">' + NX.icon("close") + "</button></div>" +
      '<div class="nx-modal-body">' + (o.body || "") + "</div>" +
      (o.noFooter ? "" : '<div class="nx-modal-foot"><div class="nx-modal-foot-l">' + (o.footer || "") + '</div><div class="nx-modal-foot-r">' +
        '<button type="button" class="nx-btn nx-btn-ghost" data-close>' + esc(NX.t("c.cancel")) + "</button>" +
        (o.onSubmit ? '<button type="submit" class="nx-btn nx-btn-primary">' + esc(o.submitLabel || NX.t("c.save")) + "</button>" : "") +
        "</div></div>") +
      "</form>";
    host.appendChild(wrap);
    document.body.classList.add("nx-modal-open");
    var formEl = wrap.querySelector("form");
    var m = { el: formEl, close: close };
    function close() {
      wrap.remove();
      if (!host.children.length) document.body.classList.remove("nx-modal-open");
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) { if (e.key === "Escape" && host.lastElementChild === wrap) close(); }
    document.addEventListener("keydown", onKey);
    wrap.addEventListener("mousedown", function (e) { if (e.target === wrap) close(); });
    on(formEl, "click", "[data-close]", function (e) { e.preventDefault(); close(); });
    formEl.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!o.onSubmit) return;
      var bad = Array.prototype.filter.call(formEl.querySelectorAll("[required]"), function (el) { return !el.value || !el.checkValidity(); });
      formEl.querySelectorAll(".nx-field").forEach(function (f) { f.classList.remove("is-invalid"); });
      if (bad.length) {
        bad.forEach(function (el) { var f = el.closest(".nx-field"); if (f) f.classList.add("is-invalid"); });
        bad[0].focus();
        toast(NX.t("c.required"), "error");
        return;
      }
      var submitBtn = formEl.querySelector('[type="submit"]');
      var res = o.onSubmit(readForm(formEl), formEl, m);
      if (res === false) return;
      if (res && res.then) {
        if (submitBtn) submitBtn.disabled = true;
        res.then(function (v) { if (v !== false) close(); }, function (err) { toast(NX.t("c.error", { msg: err.message || err }), "error"); })
          .then(function () { if (submitBtn) submitBtn.disabled = false; });
      } else close();
    });
    if (o.onOpen) o.onOpen(formEl, m);
    var first = formEl.querySelector(".nx-modal-body input:not([type=hidden]):not([type=checkbox]), .nx-modal-body textarea, .nx-modal-body select");
    if (first && window.innerWidth > 720) setTimeout(function () { first.focus(); }, 30);
    return m;
  }

  function confirm(message, opts) {
    opts = opts || {};
    return new Promise(function (resolve) {
      var done = false;
      var m = modal({
        title: opts.title || NX.t("c.confirm"), size: "sm",
        body: "<p>" + esc(message) + "</p>",
        submitLabel: opts.okLabel || NX.t("c.confirm"),
        onSubmit: function () { done = true; resolve(true); }
      });
      if (opts.danger) m.el.querySelector('[type="submit"]').className = "nx-btn nx-btn-danger";
      var obs = new MutationObserver(function () { if (!document.body.contains(m.el)) { obs.disconnect(); if (!done) resolve(false); } });
      obs.observe(document.getElementById("nx-modals"), { childList: true });
    });
  }

  function toast(msg, kind) {
    var host = document.getElementById("nx-toasts");
    var el = document.createElement("div");
    el.className = "nx-toast nx-toast-" + (kind || "ok");
    el.textContent = msg;
    host.appendChild(el);
    setTimeout(function () { el.classList.add("is-out"); }, 2600);
    setTimeout(function () { el.remove(); }, 3000);
  }

  /* Run a store promise with a toast on success/failure. */
  function run(promise, okMsg) {
    return promise.then(function (v) { if (okMsg !== false) toast(okMsg || NX.t("c.saved")); return v; },
      function (err) { toast(NX.t("c.error", { msg: err.message || err }), "error"); throw err; });
  }

  /* Delete with confirmation. */
  function del(entity, id, after) {
    if (!NX.store.isAdmin()) { toast(NX.t("c.adminOnly"), "error"); return Promise.resolve(false); }
    return confirm(NX.t("c.confirmDelete"), { danger: true, okLabel: NX.t("c.delete") }).then(function (ok) {
      if (!ok) return false;
      return run(NX.store.remove(entity, id), NX.t("c.deleted")).then(function () { if (after) after(); return true; });
    });
  }

  /* Small helpers */
  function avatar(name) {
    var parts = String(name || "?").replace(/[^\p{L}\s]/gu, "").trim().split(/\s+/);
    var ini = (parts[0] || "?").charAt(0) + (parts.length > 1 ? parts[parts.length - 1].charAt(0) : "");
    return '<span class="nx-avatar">' + esc(ini.toUpperCase()) + "</span>";
  }
  function progressBar(pct) {
    var p = Math.max(0, Math.min(100, Number(pct) || 0));
    return '<div class="nx-progress" title="' + p + '%"><span style="width:' + p + '%"></span></div>';
  }
  function dl(pairs) {
    return '<dl class="nx-dl">' + pairs.filter(function (p) { return p && p[1] !== undefined && p[1] !== null && p[1] !== ""; }).map(function (p) {
      return "<div><dt>" + esc(p[0]) + "</dt><dd>" + p[1] + "</dd></div>";
    }).join("") + "</dl>";
  }
  function searchBox(value, placeholder) {
    return '<label class="nx-search">' + NX.icon("search", 16) + '<input type="search" data-search value="' + esc(value || "") + '" placeholder="' + esc(placeholder || NX.t("c.search")) + '" /></label>';
  }

  /* Copy text to clipboard */
  function copy(text) {
    var done = function () { toast(NX.i18n.isAr ? "تم النسخ" : "Copied"); };
    if (navigator.clipboard) return navigator.clipboard.writeText(text).then(done, function () {});
    var ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) {}
    ta.remove();
  }

  /* Download a text/JSON/CSV file */
  function download(filename, content, mime) {
    var blob = new Blob([content], { type: mime || "text/plain;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }
  function csv(rows, cols) {
    var q = function (v) { v = v == null ? "" : String(v); return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v; };
    return "﻿" + [cols.map(function (c) { return q(c.label); }).join(",")].concat(rows.map(function (r) {
      return cols.map(function (c) { return q(typeof c.value === "function" ? c.value(r) : r[c.key]); }).join(",");
    })).join("\n");
  }

  /* Print an HTML document (used for PDF proposals). `html` is the inner body; `css` is extra print CSS. */
  function print(html, css, title) {
    var host = document.getElementById("nx-print");
    host.innerHTML = (css ? "<style>" + css + "</style>" : "") + html;
    var oldTitle = document.title;
    if (title) document.title = title;
    document.body.classList.add("nx-printing");
    var cleanup = function () { document.body.classList.remove("nx-printing"); host.innerHTML = ""; document.title = oldTitle; window.removeEventListener("afterprint", cleanup); };
    window.addEventListener("afterprint", cleanup);
    // #nx-print is hidden on screen, so leftover content is harmless if "afterprint" never fires (some phones).
    setTimeout(function () { window.print(); }, 250);
  }

  return {
    on: on, badge: badge, stageBadge: stageBadge, statusBadge: statusBadge, btn: btn, pageHead: pageHead, kpi: kpi, card: card,
    empty: empty, table: table, chips: chips, field: field, form: form, readForm: readForm, modal: modal, confirm: confirm,
    toast: toast, run: run, del: del, avatar: avatar, progressBar: progressBar, dl: dl, searchBox: searchBox,
    copy: copy, download: download, csv: csv, print: print
  };
})();

/* ---------- Cross-section actions ----------
 * Each view file fills these in so any page can trigger them (e.g. the lead page opens "new proposal").
 * Always call through NX.actions.x && NX.actions.x(...) in case a module is missing. */
NX.actions = NX.actions || {};
