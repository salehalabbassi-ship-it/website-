/* NEXA Admin — data store
 *
 * One API for the whole app. Two backends:
 *   - DEMO:   no API_URL set → everything is kept in this browser (localStorage), seeded with sample data.
 *   - SHEETS: API_URL set → Google Apps Script web app backed by a Google Sheet (admin/apps-script/Code.gs).
 *
 * All data is loaded once after sign-in (bootstrap) and kept in memory, so reads are synchronous:
 *   NX.store.all("leads")            → array (newest first)
 *   NX.store.get("leads", id)        → record or null
 *   NX.store.where("followups", fn)  → filtered array
 * Writes return Promises and notify listeners (the app re-renders the current page automatically):
 *   NX.store.save("leads", record)   → Promise<record>   (adds id/createdAt/updatedAt/createdBy)
 *   NX.store.remove("leads", id)     → Promise           (admin only)
 *   NX.store.saveSettings(obj)       → Promise           (admin only)
 *   NX.store.sendEmail({to, subject, body, cc}) → Promise
 *   NX.store.users / saveUser / removeUser / changePassword
 */
window.NX = window.NX || {};

NX.store = (function () {
  var ENTITIES = ["leads", "projects", "proposals", "followups", "templates", "conversations"];
  var API = ((window.NX_CONFIG || {}).API_URL || "").trim();
  var DEMO = !API;
  var DEMO_KEY = "nx_demo_v1";
  var SESSION_KEY = "nx_session";

  var db = {};
  ENTITIES.forEach(function (e) { db[e] = []; });
  var settings = null;
  var users = [];
  var session = null;
  var listeners = [];

  /* ---------- Defaults (Settings can edit all of these) ---------- */
  var DEFAULT_SETTINGS = {
    company: {
      nameEn: "NEXA Engineering",
      nameAr: "نكسا للهندسة",
      taglineEn: "Journey of Success",
      taglineAr: "رحلة نجاح",
      phone: "+966 54 404 6166",
      email: "Info@ex-nexa.com",
      website: "ex-nexa.com",
      addressEn: "Jeddah, Kingdom of Saudi Arabia",
      addressAr: "جدة، المملكة العربية السعودية",
      crNumber: "",
      vatNumber: "",
      bankName: "",
      iban: "",
      accountName: ""
    },
    currency: "SAR",
    vatRate: 15,
    proposalPrefix: "NX",
    projectPrefix: "PRJ",
    proposalValidityDays: 30,
    followupDefaultDays: 3,
    stages: [
      { id: "new", en: "New", ar: "جديد", color: "blue" },
      { id: "contacted", en: "Contacted", ar: "تم التواصل", color: "amber" },
      { id: "meeting", en: "Site visit / Meeting", ar: "زيارة موقع / اجتماع", color: "purple" },
      { id: "proposal", en: "Proposal sent", ar: "تم إرسال العرض", color: "gold" },
      { id: "won", en: "Won", ar: "تم الفوز", color: "green", closed: true, won: true },
      { id: "lost", en: "Lost", ar: "خسارة", color: "red", closed: true }
    ],
    services: [
      { id: "interior", en: "Interior Design", ar: "التصميم الداخلي" },
      { id: "architecture", en: "Architectural Design", ar: "التصميم المعماري" },
      { id: "engineering", en: "Engineering & Shop Drawings", ar: "الهندسة والمخططات التنفيذية" },
      { id: "fitout", en: "Fit-out", ar: "التشطيبات والتجهيز" },
      { id: "supervision", en: "Supervision / PM", ar: "الإشراف وإدارة المشاريع" },
      { id: "inspection", en: "Property Inspection", ar: "فحص العقارات" },
      { id: "booth", en: "Booth Design", ar: "تصميم الأجنحة" }
    ],
    sources: [
      { id: "website", en: "Website", ar: "الموقع الإلكتروني" },
      { id: "whatsapp", en: "WhatsApp", ar: "واتساب" },
      { id: "referral", en: "Referral", ar: "توصية" },
      { id: "instagram", en: "Instagram", ar: "إنستغرام" },
      { id: "phone", en: "Phone call", ar: "اتصال هاتفي" },
      { id: "walkin", en: "Walk-in", ar: "زيارة مباشرة" },
      { id: "other", en: "Other", ar: "أخرى" }
    ],
    projectStatuses: [
      { id: "planning", en: "Planning", ar: "تخطيط", color: "blue" },
      { id: "design", en: "Design", ar: "تصميم", color: "purple" },
      { id: "execution", en: "Execution", ar: "تنفيذ", color: "amber" },
      { id: "handover", en: "Handover", ar: "تسليم", color: "gold" },
      { id: "completed", en: "Completed", ar: "مكتمل", color: "green", closed: true },
      { id: "onhold", en: "On hold", ar: "متوقف", color: "gray" }
    ]
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function mergeSettings(saved) {
    var s = clone(DEFAULT_SETTINGS);
    if (!saved) return s;
    Object.keys(saved).forEach(function (k) {
      if (k === "company") s.company = Object.assign(s.company, saved.company || {});
      else if (saved[k] !== undefined && saved[k] !== null && saved[k] !== "") s[k] = saved[k];
    });
    return s;
  }

  function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }
  function nowIso() { return new Date().toISOString(); }
  function emit(entity, record, kind) { listeners.forEach(function (fn) { try { fn(entity, record, kind); } catch (e) { console.error(e); } }); }
  function sortNewest(list) {
    return list.sort(function (a, b) { return String(b.createdAt || "").localeCompare(String(a.createdAt || "")); });
  }

  /* ---------- Sheets backend ---------- */
  function call(action, payload) {
    var body = Object.assign({ action: action, token: session && session.token }, payload || {});
    return fetch(API, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" }, // text/plain avoids a CORS preflight
      body: JSON.stringify(body)
    })
      .catch(function () { throw new Error(NX.t("c.offline")); })
      .then(function (r) { return r.json(); })
      .then(function (res) {
        if (!res || !res.ok) {
          var err = (res && res.error) || "Unknown error";
          if (err === "AUTH") { clearSession(); location.reload(); }
          throw new Error(err);
        }
        return res;
      });
  }

  /* ---------- Demo backend (localStorage) ---------- */
  function demoLoad() {
    var raw = null;
    try { raw = JSON.parse(localStorage.getItem(DEMO_KEY) || "null"); } catch (e) {}
    if (!raw) { raw = demoSeed(); demoWrite(raw); }
    return raw;
  }
  function demoWrite(raw) { try { localStorage.setItem(DEMO_KEY, JSON.stringify(raw)); } catch (e) { console.warn(e); } }
  function demoPersist() { demoWrite({ data: db, settings: settings, users: users }); }
  function delay(v) { return new Promise(function (res) { setTimeout(function () { res(v); }, 60); }); }

  /* ---------- Session ---------- */
  function loadSession() {
    try { session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch (e) { session = null; }
    if (session && session.demo !== DEMO) session = null; // switched modes
    return session;
  }
  function saveSession() { try { localStorage.setItem(SESSION_KEY, JSON.stringify(session)); } catch (e) {} }
  function clearSession() { session = null; try { localStorage.removeItem(SESSION_KEY); } catch (e) {} }

  function login(email, password) {
    email = String(email || "").trim().toLowerCase();
    if (DEMO) {
      var raw = demoLoad();
      var u = (raw.users || []).find(function (x) { return x.email === email && x.active !== false; });
      if (!u || (u.password || "demo") !== password) return Promise.reject(new Error(NX.t("login.failed")));
      session = { email: u.email, name: u.name, role: u.role, token: "demo", demo: true };
      saveSession();
      return delay(session);
    }
    return call("login", { email: email, password: password }).then(function (res) {
      session = Object.assign({}, res.user, { token: res.token, demo: false });
      saveSession();
      return session;
    }, function (e) { throw new Error(e.message === "BAD_LOGIN" ? NX.t("login.failed") : e.message); });
  }

  function logout() {
    var p = (!DEMO && session) ? call("logout", {}).catch(function () {}) : Promise.resolve();
    return p.then(function () { clearSession(); });
  }

  function bootstrap() {
    if (DEMO) {
      var raw = demoLoad();
      ENTITIES.forEach(function (e) { db[e] = sortNewest((raw.data && raw.data[e]) || []); });
      settings = mergeSettings(raw.settings);
      users = raw.users || [];
      return delay(true);
    }
    return call("bootstrap", {}).then(function (res) {
      ENTITIES.forEach(function (e) { db[e] = sortNewest((res.data && res.data[e]) || []); });
      settings = mergeSettings(res.settings);
      users = res.users || [];
      if (res.me) { session = Object.assign(session, res.me); saveSession(); }
      return true;
    });
  }

  /* ---------- Reads ---------- */
  function all(entity) { return db[entity] || []; }
  function get(entity, id) { return (db[entity] || []).find(function (r) { return r.id === id; }) || null; }
  function where(entity, fn) { return (db[entity] || []).filter(fn); }

  /* ---------- Writes ---------- */
  function save(entity, record) {
    if (ENTITIES.indexOf(entity) === -1) return Promise.reject(new Error("Unknown entity " + entity));
    var r = Object.assign({}, record);
    var isNew = !r.id;
    if (isNew) { r.id = uid(); r.createdAt = r.createdAt || nowIso(); r.createdBy = r.createdBy || (session && session.email) || ""; }
    r.updatedAt = nowIso();

    var apply = function (saved) {
      var list = db[entity];
      var i = list.findIndex(function (x) { return x.id === saved.id; });
      if (i === -1) list.unshift(saved); else list[i] = saved;
      emit(entity, saved, isNew ? "create" : "update");
      return saved;
    };
    if (DEMO) { var out = apply(r); demoPersist(); return delay(out); }
    return call("save", { entity: entity, record: r }).then(function (res) { return apply(res.record || r); });
  }

  function remove(entity, id) {
    if (!isAdmin()) return Promise.reject(new Error(NX.t("c.adminOnly")));
    var apply = function () {
      db[entity] = db[entity].filter(function (x) { return x.id !== id; });
      emit(entity, { id: id }, "remove");
    };
    if (DEMO) { apply(); demoPersist(); return delay(true); }
    return call("remove", { entity: entity, id: id }).then(apply);
  }

  function saveSettings(next) {
    if (!isAdmin()) return Promise.reject(new Error(NX.t("c.adminOnly")));
    var merged = mergeSettings(Object.assign({}, settings, next));
    if (DEMO) { settings = merged; demoPersist(); emit("settings", settings, "update"); return delay(settings); }
    return call("saveSettings", { settings: merged }).then(function () { settings = merged; emit("settings", settings, "update"); return settings; });
  }

  /* ---------- Email ---------- */
  function sendEmail(msg) {
    // msg: { to, subject, body (plain text), cc? }
    if (DEMO) {
      // No mail server in demo mode: open the user's email app instead.
      var href = "mailto:" + encodeURIComponent(msg.to || "") +
        "?subject=" + encodeURIComponent(msg.subject || "") +
        (msg.cc ? "&cc=" + encodeURIComponent(msg.cc) : "") +
        "&body=" + encodeURIComponent(msg.body || "");
      window.open(href, "_blank");
      return delay({ ok: true, via: "mailto" });
    }
    return call("sendEmail", msg).then(function (res) { return { ok: true, via: "gmail", res: res }; });
  }

  /* ---------- Users (admin) ---------- */
  function listUsers() { return users.map(function (u) { return { email: u.email, name: u.name, role: u.role, active: u.active !== false }; }); }
  function saveUser(user) {
    // user: { email, name, role, active, password? } — password only when creating or resetting
    if (!isAdmin()) return Promise.reject(new Error(NX.t("c.adminOnly")));
    user = Object.assign({}, user, { email: String(user.email || "").trim().toLowerCase() });
    var apply = function () {
      var i = users.findIndex(function (u) { return u.email === user.email; });
      var keep = i > -1 ? users[i] : {};
      var next = Object.assign({}, keep, user);
      if (!user.password) next.password = keep.password;
      if (DEMO && !next.password) next.password = "demo";
      if (!DEMO) delete next.password;
      if (i === -1) users.push(next); else users[i] = next;
      emit("users", next, i === -1 ? "create" : "update");
    };
    if (DEMO) { apply(); demoPersist(); return delay(true); }
    return call("saveUser", { user: user }).then(apply);
  }
  function removeUser(email) {
    if (!isAdmin()) return Promise.reject(new Error(NX.t("c.adminOnly")));
    if (session && email === session.email) return Promise.reject(new Error("You can't remove yourself."));
    var apply = function () { users = users.filter(function (u) { return u.email !== email; }); emit("users", { email: email }, "remove"); };
    if (DEMO) { apply(); demoPersist(); return delay(true); }
    return call("removeUser", { email: email }).then(apply);
  }
  function changePassword(oldPassword, newPassword) {
    if (DEMO) {
      var u = users.find(function (x) { return x.email === session.email; });
      if (!u || (u.password || "demo") !== oldPassword) return Promise.reject(new Error(NX.t("login.failed")));
      u.password = newPassword; demoPersist(); return delay(true);
    }
    return call("changePassword", { oldPassword: oldPassword, newPassword: newPassword });
  }

  /* ---------- Helpers ---------- */
  function isAdmin() { return !!(session && session.role === "admin"); }

  /* Next sequential number like "NX-2026-004" based on existing records' `field`. */
  function nextNumber(entity, field, prefix) {
    var year = new Date().getFullYear();
    var base = prefix + "-" + year + "-";
    var max = 0;
    all(entity).forEach(function (r) {
      var v = String(r[field] || "");
      if (v.indexOf(base) === 0) { var n = parseInt(v.slice(base.length), 10); if (n > max) max = n; }
    });
    return base + String(max + 1).padStart(3, "0");
  }

  function exportAll() { return { exportedAt: nowIso(), data: db, settings: settings }; }
  function resetDemo() { if (!DEMO) return; localStorage.removeItem(DEMO_KEY); return bootstrap().then(function () { emit("all", null, "reset"); }); }
  function importDemo(json) {
    if (!DEMO) return Promise.reject(new Error("Import is only available in demo mode."));
    var raw = { data: json.data || {}, settings: json.settings || settings, users: users };
    demoWrite(raw);
    return bootstrap().then(function () { emit("all", null, "reset"); });
  }

  /* ---------- Demo seed data ---------- */
  function demoSeed() {
    var d = function (days, h) { var x = new Date(); x.setDate(x.getDate() + days); if (h != null) x.setHours(h, 0, 0, 0); return x.toISOString(); };
    var day = function (days) { return d(days).slice(0, 10); };
    var y = new Date().getFullYear();
    var A = "admin@nexa.demo", S = "staff@nexa.demo";
    var leads = [
      { id: "l1", name: "Faisal Al-Harbi", company: "Al-Harbi Clinics", phone: "0551234567", email: "faisal@example.com", service: "interior", sector: "Clinics & Healthcare", source: "website", stage: "proposal", value: 185000, city: "Jeddah", area: 420, notes: "Dental clinic, 6 rooms. Wants modern warm look.", owner: A, createdAt: d(-21), updatedAt: d(-3) },
      { id: "l2", name: "Noura Al-Qahtani", company: "", phone: "0569876543", email: "noura@example.com", service: "fitout", sector: "Residential", source: "instagram", stage: "meeting", value: 260000, city: "Jeddah", area: 380, notes: "Villa fit-out, Al-Shati district.", owner: S, createdAt: d(-12), updatedAt: d(-2) },
      { id: "l3", name: "Omar Bakr", company: "Bakr Trading Co.", phone: "0533344556", email: "omar@example.com", service: "supervision", sector: "Commercial", source: "referral", stage: "won", value: 96000, city: "Makkah", area: 1200, notes: "Showroom supervision, 4 months.", owner: A, createdAt: d(-48), updatedAt: d(-30) },
      { id: "l4", name: "Sara Al-Zahrani", company: "Zahrani Office", phone: "0547788990", email: "sara@example.com", service: "interior", sector: "Office & Corporate", source: "website", stage: "new", value: 70000, city: "Jeddah", area: 210, notes: "Office interior, 15 staff.", owner: "", createdAt: d(-1), updatedAt: d(-1) },
      { id: "l5", name: "Khalid Al-Ghamdi", company: "", phone: "0501112223", email: "", service: "inspection", sector: "Residential", source: "whatsapp", stage: "contacted", value: 4500, city: "Jeddah", area: 300, notes: "Pre-purchase apartment inspection.", owner: S, createdAt: d(-4), updatedAt: d(-3) },
      { id: "l6", name: "Hind Al-Otaibi", company: "Bloom Events", phone: "0555667788", email: "hind@example.com", service: "booth", sector: "Booth Design", source: "referral", stage: "lost", value: 55000, city: "Riyadh", area: 54, notes: "Exhibition booth.", lostReason: "Budget too low", owner: A, createdAt: d(-35), updatedAt: d(-20) },
      { id: "l7", name: "Majed Al-Shehri", company: "Shehri Holdings", phone: "0598887776", email: "majed@example.com", service: "architecture", sector: "Mixed-Use", source: "phone", stage: "won", value: 340000, city: "Jeddah", area: 2600, notes: "Mixed-use building concept + detailed design.", owner: A, createdAt: d(-80), updatedAt: d(-60) }
    ];
    var proposals = [
      { id: "p1", number: "NX-" + y + "-001", leadId: "l7", client: "Majed Al-Shehri", clientCompany: "Shehri Holdings", phone: "0598887776", email: "majed@example.com", title: "Mixed-use building — architectural design", service: "architecture", date: day(-65), validUntil: day(-35), lang: "both", items: [{ desc: "Concept design (2D/3D)", qty: 1, unit: "LS", rate: 90000 }, { desc: "Detailed architectural design", qty: 1, unit: "LS", rate: 170000 }, { desc: "Construction documents", qty: 1, unit: "LS", rate: 80000 }], discount: 0, vatRate: 15, scope: "Concept design\nDetailed design\nConstruction documents", exclusions: "Authority fees\nSoil investigation", payments: [{ label: "Advance", percent: 30 }, { label: "Concept approval", percent: 30 }, { label: "Detailed design", percent: 30 }, { label: "Final delivery", percent: 10 }], terms: "Prices in SAR. Validity 30 days.", status: "accepted", createdBy: A, createdAt: d(-65), updatedAt: d(-60), sentAt: d(-64) },
      { id: "p2", number: "NX-" + y + "-002", leadId: "l3", client: "Omar Bakr", clientCompany: "Bakr Trading Co.", phone: "0533344556", email: "omar@example.com", title: "Showroom supervision", service: "supervision", date: day(-40), validUntil: day(-10), lang: "ar", items: [{ desc: "Site supervision (monthly)", qty: 4, unit: "month", rate: 24000 }], discount: 0, vatRate: 15, scope: "Full-time site engineer\nWeekly reports", exclusions: "Contractor works", payments: [{ label: "Monthly", percent: 100 }], terms: "", status: "accepted", createdBy: A, createdAt: d(-40), updatedAt: d(-30), sentAt: d(-39) },
      { id: "p3", number: "NX-" + y + "-003", leadId: "l1", client: "Faisal Al-Harbi", clientCompany: "Al-Harbi Clinics", phone: "0551234567", email: "faisal@example.com", title: "Dental clinic — interior design", service: "interior", date: day(-3), validUntil: day(27), lang: "both", items: [{ desc: "Interior concept & 3D renders", qty: 420, unit: "m²", rate: 220 }, { desc: "Detailed drawings & BOQ", qty: 420, unit: "m²", rate: 140 }, { desc: "Site visits during execution", qty: 6, unit: "visit", rate: 1500 }], discount: 5000, vatRate: 15, scope: "Space planning\n3D design\nShop drawings\nBOQ", exclusions: "Execution works\nFurniture supply", payments: [{ label: "Advance", percent: 40 }, { label: "Design approval", percent: 40 }, { label: "Final drawings", percent: 20 }], terms: "Prices in SAR excluding VAT unless stated.", status: "sent", createdBy: A, createdAt: d(-3), updatedAt: d(-3), sentAt: d(-3) }
    ];
    var projects = [
      { id: "j1", code: "PRJ-" + y + "-001", name: "Shehri mixed-use building", client: "Majed Al-Shehri", phone: "0598887776", leadId: "l7", proposalId: "p1", service: "architecture", status: "design", startDate: day(-58), dueDate: day(40), value: 340000, paid: 204000, progress: 55, location: "Jeddah", owner: A, notes: "", tasks: [{ id: "t1", text: "Site survey", phase: "Concept", done: true }, { id: "t2", text: "Concept options", phase: "Concept", done: true }, { id: "t3", text: "Client approval", phase: "Concept", done: true }, { id: "t4", text: "Detailed plans", phase: "Design", done: false }, { id: "t5", text: "Elevations & sections", phase: "Design", done: false }], createdAt: d(-58), updatedAt: d(-2) },
      { id: "j2", code: "PRJ-" + y + "-002", name: "Bakr showroom supervision", client: "Omar Bakr", phone: "0533344556", leadId: "l3", proposalId: "p2", service: "supervision", status: "execution", startDate: day(-28), dueDate: day(92), value: 96000, paid: 24000, progress: 25, location: "Makkah", owner: S, notes: "", tasks: [{ id: "t1", text: "Kick-off meeting", phase: "Start", done: true }, { id: "t2", text: "Month 1 report", phase: "Supervision", done: true }, { id: "t3", text: "Month 2 report", phase: "Supervision", done: false }], createdAt: d(-28), updatedAt: d(-1) }
    ];
    var followups = [
      { id: "f1", leadId: "l1", title: "Call Faisal about the proposal", type: "call", dueDate: day(0), dueTime: "11:00", status: "open", owner: A, notes: "", createdAt: d(-3) },
      { id: "f2", leadId: "l2", title: "Site visit — villa", type: "sitevisit", dueDate: day(2), dueTime: "16:00", status: "open", owner: S, notes: "Bring laser meter", createdAt: d(-2) },
      { id: "f3", leadId: "l5", title: "Send inspection price on WhatsApp", type: "whatsapp", dueDate: day(-1), dueTime: "", status: "open", owner: S, notes: "", createdAt: d(-3) },
      { id: "f4", leadId: "l4", title: "First reply to website enquiry", type: "email", dueDate: day(0), dueTime: "", status: "open", owner: A, notes: "", createdAt: d(-1) },
      { id: "f5", leadId: "l3", title: "Kick-off meeting", type: "meeting", dueDate: day(-30), dueTime: "10:00", status: "done", owner: A, doneAt: d(-30), notes: "", createdAt: d(-35) }
    ];
    var conversations = [
      { id: "c1", leadId: "l1", channel: "website", direction: "in", date: d(-21, 9), summary: "Website enquiry: dental clinic interior, 420 m².", by: "" , createdAt: d(-21, 9) },
      { id: "c2", leadId: "l1", channel: "call", direction: "out", date: d(-19, 12), summary: "Discussed scope and timeline. Site visit agreed.", by: A, createdAt: d(-19, 12) },
      { id: "c3", leadId: "l1", channel: "email", direction: "out", date: d(-3, 15), summary: "Sent proposal NX-" + y + "-003.", by: A, createdAt: d(-3, 15) },
      { id: "c4", leadId: "l2", channel: "whatsapp", direction: "in", date: d(-12, 20), summary: "Asked about villa fit-out pricing per m².", by: "", createdAt: d(-12, 20) },
      { id: "c5", leadId: "l2", channel: "whatsapp", direction: "out", date: d(-11, 10), summary: "Shared company profile and booked site visit.", by: S, createdAt: d(-11, 10) },
      { id: "c6", leadId: "l5", channel: "whatsapp", direction: "in", date: d(-4, 18), summary: "Needs inspection before buying apartment.", by: "", createdAt: d(-4, 18) }
    ];
    var templates = [
      { id: "tm1", kind: "message", name: "First reply", lang: "en", channel: "any", subject: "Thank you for contacting {{companyName}}", body: "Hello {{name}},\n\nThank you for contacting {{companyName}} about your {{service}} project. We'd be glad to help. When is a good time for a short call?\n\nBest regards,\n{{myName}}\n{{companyPhone}}", createdAt: d(-90) },
      { id: "tm2", kind: "message", name: "الرد الأول", lang: "ar", channel: "whatsapp", subject: "", body: "مرحباً {{name}}،\n\nشكراً لتواصلك مع {{companyName}} بخصوص مشروع {{service}}. يسعدنا خدمتك، متى يناسبك اتصال قصير؟\n\nمع التحية،\n{{myName}}", createdAt: d(-90) },
      { id: "tm3", kind: "message", name: "Proposal follow-up", lang: "en", channel: "any", subject: "Following up on proposal {{proposalNumber}}", body: "Hello {{name}},\n\nI hope you're well. I wanted to follow up on our proposal {{proposalNumber}}. Do you have any questions, or would you like to adjust the scope?\n\nBest regards,\n{{myName}}", createdAt: d(-90) },
      { id: "tm4", kind: "message", name: "متابعة العرض", lang: "ar", channel: "whatsapp", subject: "", body: "مرحباً {{name}}،\n\nنود متابعة عرض السعر رقم {{proposalNumber}}. هل لديك أي استفسار أو ترغب في تعديل نطاق العمل؟\n\nمع التحية،\n{{myName}}", createdAt: d(-90) },
      { id: "tm5", kind: "proposal", name: "Interior design (per m²)", lang: "en", service: "interior", data: { items: [{ desc: "Interior concept & 3D renders", qty: 1, unit: "m²", rate: 220 }, { desc: "Detailed drawings & BOQ", qty: 1, unit: "m²", rate: 140 }], scope: "Space planning\n3D design\nShop drawings\nBOQ", exclusions: "Execution works\nFurniture supply\nAuthority fees", payments: [{ label: "Advance", percent: 40 }, { label: "Design approval", percent: 40 }, { label: "Final drawings", percent: 20 }], terms: "Prices in SAR. Validity 30 days from issue date." }, createdAt: d(-90) },
      { id: "tm6", kind: "proposal", name: "Property inspection", lang: "en", service: "inspection", data: { items: [{ desc: "Property inspection & report", qty: 1, unit: "LS", rate: 3500 }], scope: "Visual inspection of civil, MEP and finishes\nThermal camera check\nWritten report with photos", exclusions: "Destructive testing\nLab tests", payments: [{ label: "On booking", percent: 100 }], terms: "Report delivered within 3 working days." }, createdAt: d(-90) },
      { id: "tm7", kind: "checklist", name: "Interior design project", lang: "en", service: "interior", data: { tasks: [{ text: "Site measurement", phase: "Start" }, { text: "Client brief & mood board", phase: "Concept" }, { text: "Layout options", phase: "Concept" }, { text: "3D renders", phase: "Design" }, { text: "Client approval", phase: "Design" }, { text: "Shop drawings", phase: "Documents" }, { text: "BOQ", phase: "Documents" }, { text: "Handover", phase: "Close" }] }, createdAt: d(-90) },
      { id: "tm8", kind: "document", name: "Company profile", lang: "both", url: "https://ex-nexa.com", notes: "Latest company profile PDF (replace with your Drive link).", createdAt: d(-90) }
    ];
    return {
      data: { leads: leads, projects: projects, proposals: proposals, followups: followups, conversations: conversations, templates: templates },
      settings: null,
      users: [
        { email: A, name: "Saleh Alabbassi", role: "admin", active: true, password: "demo" },
        { email: S, name: "Staff member", role: "staff", active: true, password: "demo" }
      ]
    };
  }

  loadSession();

  return {
    ENTITIES: ENTITIES,
    DEFAULT_SETTINGS: DEFAULT_SETTINGS,
    get demo() { return DEMO; },
    get session() { return session; },
    get settings() { return settings || mergeSettings(null); },
    isAdmin: isAdmin,
    on: function (fn) { listeners.push(fn); },
    login: login, logout: logout, bootstrap: bootstrap,
    all: all, get: get, where: where,
    save: save, remove: remove, saveSettings: saveSettings,
    sendEmail: sendEmail,
    users: listUsers, saveUser: saveUser, removeUser: removeUser, changePassword: changePassword,
    nextNumber: nextNumber, uid: uid,
    exportAll: exportAll, resetDemo: resetDemo, importDemo: importDemo
  };
})();
