/**
 * NEXA Workspace — Google Apps Script backend
 * ===========================================
 *
 * This script turns the Google Sheet it is attached to into the database for NEXA Workspace
 * (the admin tool in /admin) AND receives the public website's contact form.
 *
 *   Sheet tabs:  Leads · Projects · Proposals · FollowUps · Templates · Conversations · Settings · Users
 *   Row 1 of each tab holds the column names; every record is one row; every field is one column.
 *   Lists (proposal items, payments, project tasks, template data) are stored as JSON text.
 *
 * How the app talks to it (see admin/js/store.js):
 *   POST, Content-Type: text/plain, body = JSON { action, token, ... }
 *   → JSON { ok: true, ... }  or  { ok: false, error: "..." }   ("AUTH" = sign in again, "BAD_LOGIN" = wrong email/password)
 *
 * The website contact form (script.js) posts ordinary form fields (name, email, type, message).
 * Each enquiry becomes a new Lead (source "website", stage "new"), a Conversation entry and an email notification.
 *
 * ONE-TIME SETUP (see admin/README.md): paste this file, run setupNexa() once, then Deploy → Web app.
 */

/* =====================================================================================
 * Configuration — the defaults work for a script attached to the sheet (Extensions → Apps Script).
 * ===================================================================================== */

/** Only needed if this script is NOT attached to the sheet: paste the sheet's ID (from its URL) here. */
var SPREADSHEET_ID = "";
/** First admin account created by setupNexa(). Empty = the Google account that runs setupNexa(). */
var ADMIN_EMAIL = "";
/** Where website enquiry notifications go. Empty = the company email in Workspace Settings (Info@ex-nexa.com). */
var NOTIFY_EMAIL = "";
/** Address of the workspace, used for links in emails, e.g. "https://ex-nexa.com/admin/". Optional. */
var WORKSPACE_URL = "";
/** Sender name for emails when Settings has no company name yet. */
var COMPANY_NAME = "NEXA Engineering";
/** How long a sign-in lasts before the user must sign in again. */
var SESSION_DAYS = 30;
/** Also create a "reply to this enquiry" follow-up (due today) for every website enquiry. */
var AUTO_FOLLOWUP = true;

/* =====================================================================================
 * Internal constants
 * ===================================================================================== */

var VERSION = "1.0.0";
var MAX_BODY = 512 * 1024;     // max request size (bytes of JSON)
var MAX_CELL = 49000;          // Google Sheets allows 50,000 characters per cell
var MAX_COLUMNS = 150;         // safety limit for automatically added columns
var MIN_PASSWORD = 6;
var MAX_LOGIN_FAILS = 8;       // per email, per 15 minutes
var FORM_MAX_PER_10MIN = 30;   // website enquiries accepted per 10 minutes (all senders)
var HEADER_BG = "#1B1B1B";
var HEADER_FG = "#FFFFFF";

/** Entity name (used by the app) → sheet tab name. Only these can be read or written. */
var ENTITY_SHEETS = {
  leads: "Leads",
  projects: "Projects",
  proposals: "Proposals",
  followups: "FollowUps",
  templates: "Templates",
  conversations: "Conversations"
};

/** Column order for a fresh sheet. Any other field the app saves is added as a new column automatically. */
var META = ["createdAt", "updatedAt", "createdBy", "updatedBy"];
var COLUMNS = {
  leads: ["id", "name", "company", "phone", "email", "service", "sector", "source", "stage", "value", "city", "area",
    "owner", "lostReason", "notes"].concat(META),
  projects: ["id", "code", "name", "client", "phone", "leadId", "proposalId", "service", "status", "startDate", "dueDate",
    "value", "paid", "progress", "location", "owner", "notes", "tasks"].concat(META),
  proposals: ["id", "number", "leadId", "client", "clientCompany", "phone", "email", "title", "service", "date", "validUntil",
    "lang", "status", "sentAt", "items", "discount", "vatRate", "scope", "exclusions", "payments", "terms", "notes",
    "templateId"].concat(META),
  followups: ["id", "leadId", "projectId", "title", "type", "dueDate", "dueTime", "status", "owner", "notes", "doneAt"].concat(META),
  templates: ["id", "kind", "name", "lang", "channel", "service", "subject", "body", "url", "notes", "data"].concat(META),
  conversations: ["id", "leadId", "projectId", "channel", "direction", "date", "summary", "by"].concat(META)
};

/** Fields holding lists/objects (stored as JSON text). */
var JSON_FIELDS = { items: 1, payments: 1, tasks: 1, data: 1 };
/** Fields that are always numbers. */
var NUMERIC_FIELDS = { value: 1, area: 1, paid: 1, progress: 1, discount: 1, vatRate: 1, qty: 1, rate: 1 };

var USERS_SHEET = "Users";
var USER_HEADERS = ["email", "name", "role", "active", "createdAt", "updatedAt", "lastLogin", "salt", "hash"];
var SETTINGS_SHEET = "Settings";
var SETTINGS_HEADERS = ["key", "value", "updatedAt"];

/** Written to the Settings tab by setupNexa() if missing. Everything else (stages, services…) uses the app's defaults
 *  until an admin saves Settings in the app. Values are JSON. */
var DEFAULT_SETTINGS = {
  company: {
    nameEn: "NEXA Engineering", nameAr: "نكسا للهندسة",
    taglineEn: "Journey of Success", taglineAr: "رحلة نجاح",
    phone: "+966 54 404 6166", email: "Info@ex-nexa.com", website: "ex-nexa.com",
    addressEn: "Jeddah, Kingdom of Saudi Arabia", addressAr: "جدة، المملكة العربية السعودية",
    crNumber: "", vatNumber: "", bankName: "", iban: "", accountName: ""
  },
  currency: "SAR",
  vatRate: 15,
  proposalPrefix: "NX",
  projectPrefix: "PRJ",
  proposalValidityDays: 30,
  followupDefaultDays: 3
};

/* =====================================================================================
 * Web app entry points
 * ===================================================================================== */

/** Health check: open the web app URL in a browser to see this. */
function doGet() {
  return json_({ ok: true, service: "NEXA Workspace API", version: VERSION });
}

function doPost(e) {
  try {
    var raw = (e && e.postData && e.postData.contents) || "";
    if (raw.length > MAX_BODY) return json_({ ok: false, error: "Request is too large." });

    // 1) The app: a JSON body with an "action".
    var req = null;
    if (raw && raw.charAt(0) === "{") {
      try { req = JSON.parse(raw); } catch (err) { req = null; }
    }
    if (req && typeof req.action === "string") return json_(handleAction_(req));

    // 2) The public website's contact form: ordinary form fields, no action.
    var p = (e && e.parameter) || {};
    if (p.name || p.email || p.message) return json_(websiteEnquiry_(p));

    return json_({ ok: false, error: "Unknown request." });
  } catch (err) {
    return json_({ ok: false, error: publicError_(err) });
  }
}

/** Routes an app request. Every action except "login" needs a valid session token. */
function handleAction_(req) {
  if (req.action === "login") return login_(req);

  var me = requireUser_(req.token); // throws "AUTH"
  var adminOnly = { remove: 1, saveSettings: 1, saveUser: 1, removeUser: 1 };
  if (adminOnly[req.action] && me.role !== "admin") fail_("Only admins can do this.");

  switch (req.action) {
    case "logout": return logout_(me);
    case "bootstrap": return bootstrap_(me);
    case "save": return save_(me, req);
    case "remove": return remove_(me, req);
    case "saveSettings": return saveSettingsAction_(me, req);
    case "sendEmail": return sendEmail_(me, req);
    case "saveUser": return saveUser_(me, req);
    case "removeUser": return removeUser_(me, req);
    case "changePassword": return changePassword_(me, req);
  }
  fail_("Unknown action: " + String(req.action).slice(0, 40));
}

/* =====================================================================================
 * Actions
 * ===================================================================================== */

function login_(req) {
  var email = normEmail_(req.email);
  var password = typeof req.password === "string" ? req.password : "";
  if (!email || !password || password.length > 200) fail_("BAD_LOGIN");

  // Slow down password guessing.
  var cache = CacheService.getScriptCache();
  var failKey = "lf:" + sha256_(email).slice(0, 32);
  var fails = Number(cache.get(failKey) || 0);
  if (fails >= MAX_LOGIN_FAILS) fail_("Too many sign-in attempts. Please wait 15 minutes and try again.");

  var user = findUser_(email);
  var ok = user && user.active && user.hash && hashPassword_(user.salt, password) === user.hash;
  if (!ok) {
    cache.put(failKey, String(fails + 1), 900);
    fail_("BAD_LOGIN");
  }
  cache.remove(failKey);

  pruneSessions_();
  var token = newToken_();
  storeSession_(token, user.email);
  touchLastLogin_(user.email);
  return { ok: true, token: token, user: publicUser_(user, true) };
}

function logout_(me) {
  deleteSession_(me.sessionKey);
  return { ok: true };
}

/** Everything the app needs after sign-in, in one request (one read per sheet). */
function bootstrap_(me) {
  var data = {};
  Object.keys(ENTITY_SHEETS).forEach(function (entity) { data[entity] = readEntity_(entity); });
  return {
    ok: true,
    data: data,
    settings: readSettings_(),
    users: readUsers_().map(function (u) { return publicUser_(u); }),
    me: { email: me.email, name: me.name, role: me.role }
  };
}

/** Create or replace one record (matched by id). */
function save_(me, req) {
  var entity = checkEntity_(req.entity);
  var rec = req.record;
  if (!rec || typeof rec !== "object" || Array.isArray(rec)) fail_("Missing record.");
  rec = JSON.parse(JSON.stringify(rec)); // plain copy
  if (rec.id == null || rec.id === "") rec.id = uid_();
  rec.id = String(rec.id);
  if (!/^[A-Za-z0-9_.:\-]{1,64}$/.test(rec.id)) fail_("Invalid record id.");

  return withLock_(function () {
    var saved = upsertRecord_(entity, rec, me.email);
    return { ok: true, record: saved };
  });
}

function remove_(me, req) {
  var entity = checkEntity_(req.entity);
  var id = String(req.id == null ? "" : req.id);
  if (!id) fail_("Missing id.");
  return withLock_(function () {
    deleteRecord_(entity, id);
    return { ok: true };
  });
}

function saveSettingsAction_(me, req) {
  var s = req.settings;
  if (!s || typeof s !== "object" || Array.isArray(s)) fail_("Missing settings.");
  return withLock_(function () {
    writeSettings_(s);
    return { ok: true, settings: readSettings_() };
  });
}

function sendEmail_(me, req) {
  var to = parseEmailList_(req.to, "To");
  if (!to.length) fail_("Please enter the recipient's email address.");
  var cc = req.cc ? parseEmailList_(req.cc, "Cc") : [];
  if (to.length + cc.length > 20) fail_("Too many recipients (max 20).");
  var subject = String(req.subject || "").replace(/[\r\n]+/g, " ").trim();
  if (!subject) fail_("Please add a subject.");
  if (subject.length > 250) fail_("The subject is too long.");
  var body = String(req.body || "");
  if (!body.trim()) fail_("The message is empty.");
  if (body.length > 100000) fail_("The message is too long.");
  if (MailApp.getRemainingDailyQuota() < to.length + cc.length) fail_("The daily email limit has been reached. Please try again tomorrow.");

  var opts = {
    to: to.join(","),
    subject: subject,
    body: body,
    htmlBody: textToHtml_(body),
    name: companyName_(),
    replyTo: me.email
  };
  if (cc.length) opts.cc = cc.join(",");
  MailApp.sendEmail(opts);
  return { ok: true, sentAt: nowIso_(), remaining: MailApp.getRemainingDailyQuota() };
}

/** Admin: add a user, or update name/role/active (and optionally reset the password). */
function saveUser_(me, req) {
  var u = req.user || {};
  var email = normEmail_(u.email);
  if (!isEmail_(email)) fail_("Please enter a valid email address.");
  var name = cleanLine_(u.name, 80);
  var role = u.role === "admin" ? "admin" : "staff";
  var active = !(u.active === false || String(u.active).toLowerCase() === "false");
  var password = typeof u.password === "string" ? u.password : "";
  if (password) checkPassword_(password);

  return withLock_(function () {
    var users = readUsers_();
    var existing = null;
    users.forEach(function (x) { if (x.email === email) existing = x; });

    if (email === me.email && (role !== "admin" || !active)) fail_("You can't remove your own admin access.");
    var adminsLeft = users.filter(function (x) { return x.role === "admin" && x.active && x.email !== email; }).length;
    if (!(role === "admin" && active) && adminsLeft === 0) fail_("At least one active admin is required.");

    var temp = "";
    var next;
    if (existing) {
      next = Object.assign({}, existing, { name: name || existing.name, role: role, active: active });
    } else {
      if (!password) password = temp = randomPassword_();
      next = { email: email, name: name || email.split("@")[0], role: role, active: active, createdAt: nowIso_() };
    }
    if (password) { next.salt = newSalt_(); next.hash = hashPassword_(next.salt, password); }
    next.updatedAt = nowIso_();
    writeUser_(next);

    // Sign the person out everywhere if their access or password changed (but never the admin's own current session).
    if (existing && (!active || password)) revokeSessions_(email, email === me.email ? me.sessionKey : null);
    if (temp) {
      try { emailTempPassword_(next, temp, true); } catch (err) { console.warn("Invite email failed: " + err); }
    }
    var out = { ok: true, user: publicUser_(next) };
    if (temp) out.tempPassword = temp;
    return out;
  });
}

function removeUser_(me, req) {
  var email = normEmail_(req.email);
  if (!email) fail_("Missing email.");
  if (email === me.email) fail_("You can't remove yourself.");
  return withLock_(function () {
    var sheet = ensureSystemSheet_(USERS_SHEET, USER_HEADERS);
    var row = findRow_(sheet, getHeaders_(sheet).indexOf("email") + 1, email, true);
    if (row > 0) { sheet.deleteRow(row); usersCache_ = null; }
    revokeSessions_(email, null);
    return { ok: true };
  });
}

function changePassword_(me, req) {
  var oldPassword = typeof req.oldPassword === "string" ? req.oldPassword : "";
  var newPassword = typeof req.newPassword === "string" ? req.newPassword : "";
  checkPassword_(newPassword);
  return withLock_(function () {
    var user = findUser_(me.email);
    if (!user || hashPassword_(user.salt, oldPassword) !== user.hash) fail_("Your current password is not correct.");
    user.salt = newSalt_();
    user.hash = hashPassword_(user.salt, newPassword);
    user.updatedAt = nowIso_();
    writeUser_(user);
    revokeSessions_(user.email, me.sessionKey); // sign out other devices, keep this one
    return { ok: true };
  });
}

/* =====================================================================================
 * Website contact form → Lead + Conversation (+ Follow-up) + notification email
 * ===================================================================================== */

function websiteEnquiry_(p) {
  if (p.botcheck) return { ok: true }; // honeypot ticked → a bot; pretend success

  var name = cleanLine_(p.name, 120);
  var email = normEmail_(p.email);
  var phone = cleanLine_(p.phone, 40);
  var type = cleanLine_(p.type, 120);
  var message = String(p.message || "").replace(/\r\n?/g, "\n").trim().slice(0, 5000);
  if (!name || !isEmail_(email) || !message) return { ok: false, error: "Please fill in your name, email and message." };

  var cache = CacheService.getScriptCache();
  var dupKey = "wf:" + sha256_(email + "|" + message).slice(0, 32);
  if (cache.get(dupKey)) return { ok: true, duplicate: true }; // same message sent twice in a row

  var created = withLock_(function () {
    var count = Number(cache.get("wf:count") || 0);
    if (count >= FORM_MAX_PER_10MIN) return null;
    cache.put("wf:count", String(count + 1), 600);
    cache.put(dupKey, "1", 600);

    var now = nowIso_();
    var lead = upsertRecord_("leads", {
      id: uid_(), name: name, company: "", phone: phone, email: email, service: "", sector: type,
      source: "website", stage: "new", value: "", city: "", area: "", owner: "", notes: message,
      createdAt: now, createdBy: "website"
    }, "website");
    upsertRecord_("conversations", {
      id: uid_(), leadId: lead.id, projectId: "", channel: "website", direction: "in", date: now,
      summary: message, by: "", createdAt: now, createdBy: "website"
    }, "website");
    if (AUTO_FOLLOWUP) {
      upsertRecord_("followups", {
        id: uid_(), leadId: lead.id, projectId: "", title: "Reply to website enquiry — " + name, type: "email",
        dueDate: Utilities.formatDate(new Date(), tz_(), "yyyy-MM-dd"), dueTime: "", status: "open", owner: "",
        notes: "", createdAt: now, createdBy: "website"
      }, "website");
    }
    return lead;
  });
  if (!created) return { ok: false, error: "We're receiving a lot of messages right now. Please try again in a few minutes." };

  try { notifyEnquiry_(created, type, message); } catch (err) { console.warn("Notification email failed: " + err); }
  return { ok: true };
}

function notifyEnquiry_(lead, type, message) {
  var to = NOTIFY_EMAIL || ((readSettings_().company || {}).email) || Session.getEffectiveUser().getEmail();
  if (!isEmail_(normEmail_(to))) return;
  var link = workspaceUrl_();
  var body =
    "New enquiry from the website\n\n" +
    "Name: " + lead.name + "\n" +
    "Email: " + lead.email + "\n" +
    (lead.phone ? "Phone: " + lead.phone + "\n" : "") +
    "Project type: " + (type || "-") + "\n\n" +
    "Message:\n" + message + "\n\n" +
    "It has been added to NEXA Workspace as a new lead" + (AUTO_FOLLOWUP ? " with a reply follow-up due today" : "") + ".\n" +
    (link ? "Open it: " + link + "#/leads/" + lead.id + "\n" : "Open NEXA Workspace (your website /admin) → Leads.\n") +
    "Reply to this email to answer " + lead.name.split(" ")[0] + " directly.";
  MailApp.sendEmail({
    to: to,
    subject: "New website enquiry: " + lead.name + (type ? " (" + type + ")" : ""),
    body: body,
    htmlBody: textToHtml_(body),
    name: companyName_() + " Website",
    replyTo: lead.email
  });
}

/* =====================================================================================
 * One-time setup and editor helpers
 * ===================================================================================== */

/**
 * RUN THIS ONCE from the Apps Script editor (select "setupNexa" → Run).
 * Creates the tabs with headers, default settings and the first admin account, then emails you a temporary password.
 * Safe to run again: it never deletes or resets existing data, settings or users.
 */
function setupNexa() {
  Object.keys(ENTITY_SHEETS).forEach(function (entity) { ensureEntitySheet_(entity); });
  ensureSystemSheet_(SETTINGS_SHEET, SETTINGS_HEADERS);
  var usersSheet = ensureSystemSheet_(USERS_SHEET, USER_HEADERS);
  try { usersSheet.hideColumns(USER_HEADERS.indexOf("salt") + 1, 2); } catch (err) {}

  // Default settings (only keys that are not there yet).
  withLock_(function () {
    var current = readSettings_();
    var add = {};
    Object.keys(DEFAULT_SETTINGS).forEach(function (k) { if (current[k] === undefined) add[k] = DEFAULT_SETTINGS[k]; });
    if (Object.keys(add).length) writeSettings_(add);
  });

  // First admin.
  var email = normEmail_(ADMIN_EMAIL) || normEmail_(Session.getActiveUser().getEmail()) || normEmail_(Session.getEffectiveUser().getEmail());
  if (!isEmail_(email)) throw new Error("Could not detect your email. Set ADMIN_EMAIL at the top of Code.gs and run setupNexa again.");

  if (findUser_(email)) {
    Logger.log("Setup complete. The account " + email + " already exists — nothing was changed. " +
      "Forgot the password? Use the sheet menu NEXA Workspace → Reset a user's password, or run resetPassword.");
    return;
  }
  var temp = addUser_(email, "Admin", "admin");
  Logger.log("Setup complete.\n\nSign in to NEXA Workspace with:\n  Email: " + email + "\n  Temporary password: " + temp +
    "\n\nThe same details were emailed to " + email + ". Change the password after signing in (Settings).");
}

/**
 * Adds a user (for use from the editor or the sheet menu). Returns the password.
 * If no password is given a temporary one is generated, logged and emailed to the user.
 */
function addUser_(email, name, role, password) {
  email = normEmail_(email);
  if (!isEmail_(email)) throw new Error("Invalid email: " + email);
  if (password) checkPassword_(password);
  return withLock_(function () {
    if (findUser_(email)) throw new Error("A user with this email already exists: " + email);
    var temp = password || randomPassword_();
    var salt = newSalt_();
    var user = {
      email: email, name: cleanLine_(name, 80) || email.split("@")[0], role: role === "admin" ? "admin" : "staff",
      active: true, createdAt: nowIso_(), updatedAt: nowIso_(), salt: salt, hash: hashPassword_(salt, temp)
    };
    writeUser_(user);
    if (!password) {
      Logger.log("User " + email + " created. Temporary password: " + temp);
      try { emailTempPassword_(user, temp, true); } catch (err) { Logger.log("Could not email the password: " + err); }
    }
    return temp;
  });
}

/**
 * Gives a user a new temporary password (logged here and emailed to them) and signs them out everywhere.
 * Run from the editor without arguments to reset ADMIN_EMAIL / your own account.
 */
function resetPassword(email) {
  if (typeof email !== "string") email = ADMIN_EMAIL || Session.getActiveUser().getEmail() || Session.getEffectiveUser().getEmail();
  email = normEmail_(email);
  return withLock_(function () {
    var user = findUser_(email);
    if (!user) throw new Error("No NEXA Workspace user with the email " + email);
    var temp = randomPassword_();
    user.salt = newSalt_();
    user.hash = hashPassword_(user.salt, temp);
    user.active = true;
    user.updatedAt = nowIso_();
    writeUser_(user);
    revokeSessions_(email, null);
    CacheService.getScriptCache().remove("lf:" + sha256_(email).slice(0, 32));
    Logger.log("New temporary password for " + email + ": " + temp);
    try { emailTempPassword_(user, temp, false); } catch (err) { Logger.log("Could not email the password: " + err); }
    return temp;
  });
}

/** Adds a "NEXA Workspace" menu to the sheet for setup and user management without code. */
function onOpen() {
  try {
    SpreadsheetApp.getUi().createMenu("NEXA Workspace")
      .addItem("Set up / repair tabs", "setupNexa")
      .addItem("Add a user…", "menuAddUser")
      .addItem("Reset a user's password…", "menuResetPassword")
      .addToUi();
  } catch (err) { /* not opened from a spreadsheet */ }
}

function menuAddUser() {
  var ui = SpreadsheetApp.getUi();
  var email = ui.prompt("Add a user", "Email address:", ui.ButtonSet.OK_CANCEL);
  if (email.getSelectedButton() !== ui.Button.OK) return;
  var name = ui.prompt("Add a user", "Full name:", ui.ButtonSet.OK_CANCEL);
  if (name.getSelectedButton() !== ui.Button.OK) return;
  var admin = ui.alert("Add a user", "Should this person be an admin? (Admins can delete records and manage settings and users.)", ui.ButtonSet.YES_NO);
  var temp = addUser_(email.getResponseText(), name.getResponseText(), admin === ui.Button.YES ? "admin" : "staff");
  ui.alert("User added", "Temporary password: " + temp + "\n\nIt was also emailed to " + normEmail_(email.getResponseText()) + ".", ui.ButtonSet.OK);
}

function menuResetPassword() {
  var ui = SpreadsheetApp.getUi();
  var email = ui.prompt("Reset password", "Email address of the user:", ui.ButtonSet.OK_CANCEL);
  if (email.getSelectedButton() !== ui.Button.OK) return;
  var temp = resetPassword(email.getResponseText());
  ui.alert("Password reset", "New temporary password: " + temp + "\n\nIt was also emailed to the user.", ui.ButtonSet.OK);
}

function emailTempPassword_(user, temp, isNew) {
  var link = workspaceUrl_();
  var body =
    "Hello " + (user.name || "") + ",\n\n" +
    (isNew ? "An account has been created for you on NEXA Workspace." : "Your NEXA Workspace password has been reset.") + "\n\n" +
    "Email: " + user.email + "\n" +
    "Temporary password: " + temp + "\n" +
    (link ? "Sign in: " + link + "\n" : "") +
    "\nPlease sign in and change your password in Settings.\n\n" + companyName_();
  MailApp.sendEmail({
    to: user.email,
    subject: isNew ? "Your NEXA Workspace account" : "Your NEXA Workspace password was reset",
    body: body,
    htmlBody: textToHtml_(body),
    name: companyName_()
  });
}

/* =====================================================================================
 * Sessions — stored in Script Properties (durable, 30 days) with CacheService in front for speed.
 * The token itself is never stored, only its SHA-256 hash.
 * ===================================================================================== */

function newToken_() {
  return (Utilities.getUuid() + Utilities.getUuid()).replace(/-/g, "") + sha256_(Utilities.getUuid() + Date.now()).slice(0, 16);
}

function sessionKey_(token) { return "s:" + sha256_(token); }

function storeSession_(token, email) {
  var key = sessionKey_(token);
  var value = JSON.stringify({ e: email, x: Date.now() + SESSION_DAYS * 86400000 });
  PropertiesService.getScriptProperties().setProperty(key, value);
  CacheService.getScriptCache().put(key, value, 21600);
}

/** Returns the signed-in user {email, name, role, sessionKey} or throws "AUTH". */
function requireUser_(token) {
  if (typeof token !== "string" || token.length < 32 || token.length > 200) fail_("AUTH");
  var key = sessionKey_(token);
  var cache = CacheService.getScriptCache();
  var raw = cache.get(key);
  if (!raw) {
    raw = PropertiesService.getScriptProperties().getProperty(key);
    if (raw) cache.put(key, raw, 21600);
  }
  if (!raw) fail_("AUTH");
  var s;
  try { s = JSON.parse(raw); } catch (err) { s = null; }
  if (!s || !s.e || !(s.x > Date.now())) { deleteSession_(key); fail_("AUTH"); }
  var user = findUser_(s.e);
  if (!user || !user.active) { deleteSession_(key); fail_("AUTH"); }
  return { email: user.email, name: user.name, role: user.role, sessionKey: key };
}

function deleteSession_(key) {
  if (!key) return;
  PropertiesService.getScriptProperties().deleteProperty(key);
  CacheService.getScriptCache().remove(key);
}

/** Signs a user out everywhere (optionally keeping one session). */
function revokeSessions_(email, keepKey) {
  var props = PropertiesService.getScriptProperties().getProperties();
  Object.keys(props).forEach(function (key) {
    if (key.indexOf("s:") !== 0 || key === keepKey) return;
    try { if (JSON.parse(props[key]).e === email) deleteSession_(key); } catch (err) { deleteSession_(key); }
  });
}

/** Removes expired sessions (run on each sign-in). */
function pruneSessions_() {
  var store = PropertiesService.getScriptProperties();
  var props = store.getProperties();
  var now = Date.now();
  Object.keys(props).forEach(function (key) {
    if (key.indexOf("s:") !== 0) return;
    var s = null;
    try { s = JSON.parse(props[key]); } catch (err) {}
    if (!s || !(s.x > now)) store.deleteProperty(key);
  });
}

/* =====================================================================================
 * Users sheet
 * ===================================================================================== */

var usersCache_ = null; // per-request cache (cleared on every write)
function readUsers_() {
  if (!usersCache_) usersCache_ = loadUsers_();
  return usersCache_.map(function (u) { return Object.assign({}, u); });
}

function loadUsers_() {
  var sheet = ensureSystemSheet_(USERS_SHEET, USER_HEADERS);
  var values = sheet.getDataRange().getValues();
  var headers = values[0].map(String);
  var out = [];
  for (var r = 1; r < values.length; r++) {
    var u = {};
    headers.forEach(function (h, c) { if (h) u[h] = cellOut_(values[r][c]); });
    u.email = normEmail_(u.email);
    if (!u.email) continue;
    u.role = String(u.role || "").toLowerCase() === "admin" ? "admin" : "staff";
    u.active = !(u.active === false || String(u.active).toLowerCase() === "false");
    u.name = String(u.name || "");
    u.salt = String(u.salt || "");
    u.hash = String(u.hash || "");
    out.push(u);
  }
  return out;
}

function findUser_(email) {
  email = normEmail_(email);
  var users = readUsers_();
  for (var i = 0; i < users.length; i++) if (users[i].email === email) return users[i];
  return null;
}

/** Safe view of a user — never includes the password salt/hash. */
function publicUser_(u, noActive) {
  var out = { email: u.email, name: u.name, role: u.role };
  if (!noActive) out.active = u.active !== false;
  return out;
}

/** Insert or update a user row (matched by email). Call inside withLock_. */
function writeUser_(u) {
  var sheet = ensureSystemSheet_(USERS_SHEET, USER_HEADERS);
  var headers = getHeaders_(sheet);
  var row = findRow_(sheet, headers.indexOf("email") + 1, u.email, true);
  var existing = {};
  if (row > 0) {
    var cur = sheet.getRange(row, 1, 1, headers.length).getValues()[0];
    headers.forEach(function (h, c) { existing[h] = cur[c]; });
  }
  var values = headers.map(function (h) {
    var v = u[h] !== undefined ? u[h] : existing[h];
    if (h === "active") return v === false || String(v).toLowerCase() === "false" ? "false" : "true";
    return cellIn_(v, h);
  });
  writeRow_(sheet, row > 0 ? row : nextRow_(sheet), values);
  usersCache_ = null;
}

function touchLastLogin_(email) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(3000)) return;
  try { var u = findUser_(email); if (u) { u.lastLogin = nowIso_(); writeUser_(u); } }
  catch (err) { console.warn(err); }
  finally { lock.releaseLock(); }
}

/* =====================================================================================
 * Settings sheet (one row per top-level key, value as JSON)
 * ===================================================================================== */

function readSettings_() {
  var sheet = ensureSystemSheet_(SETTINGS_SHEET, SETTINGS_HEADERS);
  var values = sheet.getDataRange().getValues();
  var out = {};
  for (var r = 1; r < values.length; r++) {
    var key = String(values[r][0] || "").trim();
    if (!key) continue;
    var raw = cellOut_(values[r][1]);
    if (typeof raw === "string") {
      try { out[key] = JSON.parse(raw); } catch (err) { out[key] = raw; } // allow plain text edited by hand
    } else {
      out[key] = raw;
    }
  }
  return out;
}

/** Upserts the given top-level keys. Call inside withLock_. */
function writeSettings_(obj) {
  var sheet = ensureSystemSheet_(SETTINGS_SHEET, SETTINGS_HEADERS);
  var lastRow = sheet.getLastRow();
  var keys = lastRow > 1 ? sheet.getRange(2, 1, lastRow - 1, 1).getValues().map(function (r) { return String(r[0]).trim(); }) : [];
  var now = nowIso_();
  Object.keys(obj).forEach(function (k) {
    if (!/^[A-Za-z_][A-Za-z0-9_]{0,63}$/.test(k)) fail_("Invalid settings key: " + k.slice(0, 40));
    var v = obj[k] === undefined ? null : obj[k];
    var json = JSON.stringify(v);
    if (json.length > MAX_CELL) fail_("The setting \"" + k + "\" is too large.");
    var i = keys.indexOf(k);
    var row = i > -1 ? i + 2 : nextRow_(sheet);
    if (i === -1) keys.push(k);
    writeRow_(sheet, row, [k, json, now]);
  });
}

/* =====================================================================================
 * Entity sheets (Leads, Projects, …)
 * ===================================================================================== */

function checkEntity_(entity) {
  if (typeof entity !== "string" || !Object.prototype.hasOwnProperty.call(ENTITY_SHEETS, entity)) fail_("Unknown entity.");
  return entity;
}

/** All records of an entity, with one read of the sheet. */
function readEntity_(entity) {
  var sheet = ensureEntitySheet_(entity);
  var values = sheet.getDataRange().getValues();
  var headers = values[0].map(function (h) { return String(h).trim(); });
  var out = [];
  for (var r = 1; r < values.length; r++) {
    var rec = rowToRecord_(entity, headers, values[r]);
    if (rec) out.push(rec);
  }
  return out;
}

/** Writes a record (replacing any row with the same id) and returns the stored record. Call inside withLock_. */
function upsertRecord_(entity, rec, byEmail) {
  var sheet = ensureEntitySheet_(entity);
  var headers = getHeaders_(sheet);

  // Validate field names; add columns for new fields.
  var keys = Object.keys(rec);
  var missing = [];
  keys.forEach(function (k) {
    if (!/^[A-Za-z_][A-Za-z0-9_]{0,63}$/.test(k)) fail_("Invalid field name: " + k.slice(0, 40));
    if (headers.indexOf(k) === -1 && missing.indexOf(k) === -1) missing.push(k);
  });
  if (missing.indexOf("updatedAt") === -1 && headers.indexOf("updatedAt") === -1) missing.push("updatedAt");
  if (missing.length) headers = addColumns_(sheet, headers, missing);

  var row = findRow_(sheet, 1, rec.id, false);
  var existing = null;
  if (row > 0) existing = rowToRecord_(entity, headers, sheet.getRange(row, 1, 1, headers.length).getValues()[0]);

  // Trust the client's id/createdAt; keep the original creation info if the client didn't send it.
  var now = nowIso_();
  var out = Object.assign({}, rec);
  if (!out.createdAt) out.createdAt = (existing && existing.createdAt) || now;
  if (!out.createdBy && existing && existing.createdBy) out.createdBy = existing.createdBy;
  if (!out.createdBy && !existing) out.createdBy = byEmail || "";
  out.updatedAt = now;
  if (headers.indexOf("updatedBy") > -1) out.updatedBy = byEmail || "";

  var values = headers.map(function (h) { return cellIn_(out[h], h); });
  writeRow_(sheet, row > 0 ? row : nextRow_(sheet), values);
  return out;
}

function deleteRecord_(entity, id) {
  var sheet = ensureEntitySheet_(entity);
  var row = findRow_(sheet, 1, id, false);
  if (row > 0) sheet.deleteRow(row);
}

/** Turns a sheet row into a record. */
function rowToRecord_(entity, headers, row) {
  var known = COLUMNS[entity] || [];
  var rec = {};
  for (var c = 0; c < headers.length; c++) {
    var h = headers[c];
    if (!h) continue;
    var v = cellOut_(row[c]);
    var isKnown = known.indexOf(h) > -1;
    if (v === "") {
      if (isKnown && !JSON_FIELDS[h]) rec[h] = ""; // known text fields come back as "", lists/extra fields are left out
      continue;
    }
    if (typeof v === "string") {
      var first = v.charAt(0);
      if ((JSON_FIELDS[h] || !isKnown) && (first === "[" || first === "{")) {
        try { v = JSON.parse(v); } catch (err) { /* keep text */ }
      } else if (NUMERIC_FIELDS[h] && /^-?\d+(\.\d+)?$/.test(v.trim())) {
        v = Number(v);
      } else if (!isKnown && (v === "true" || v === "false")) {
        v = v === "true";
      }
    }
    if (h === "id") v = String(v);
    rec[h] = v;
  }
  return rec.id ? rec : null;
}

/** Converts a value for storage in a cell. */
function cellIn_(v, field) {
  if (v === null || v === undefined) return "";
  var out;
  if (typeof v === "number") return isFinite(v) ? v : "";
  if (typeof v === "boolean") out = v ? "true" : "false";
  else if (typeof v === "object") out = JSON.stringify(v);
  else out = String(v);
  if (out.length > MAX_CELL) fail_("The field \"" + field + "\" is too long.");
  if (out.charAt(0) === "=") out = "'" + out; // never let user text become a formula
  return out;
}

/** Normalises a value read from a cell (Dates typed into Sheets by hand become text again). */
function cellOut_(v) {
  if (v instanceof Date) {
    if (isNaN(v.getTime())) return "";
    var hms = Utilities.formatDate(v, tz_(), "HH:mm:ss");
    return hms === "00:00:00" ? Utilities.formatDate(v, tz_(), "yyyy-MM-dd") : v.toISOString();
  }
  if (typeof v === "string" && v.charAt(0) === "'" && v.charAt(1) === "=") return v.slice(1);
  return v;
}

/* =====================================================================================
 * Sheet helpers
 * ===================================================================================== */

function spreadsheet_() {
  var ss = null;
  try { ss = SpreadsheetApp.getActiveSpreadsheet(); } catch (err) {}
  if (!ss && SPREADSHEET_ID) ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  if (!ss) throw new Error("No spreadsheet. Open the script from the Google Sheet (Extensions → Apps Script) or set SPREADSHEET_ID.");
  return ss;
}

var sheetCache_ = {};
function sheet_(name, headers) {
  if (sheetCache_[name]) return sheetCache_[name];
  var ss = spreadsheet_();
  var sheet = ss.getSheetByName(name);
  if (!sheet) sheet = ss.insertSheet(name);
  if (sheet.getLastColumn() === 0 || !String(sheet.getRange(1, 1).getValue()).trim()) {
    // Empty tab: write the header row and make every cell plain text (stops Sheets turning "2026-11-02" into a date
    // or "0551234567" into a number).
    ensureColumns_(sheet, headers.length);
    sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns()).setNumberFormat("@");
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    styleHeader_(sheet, headers.length);
  }
  sheetCache_[name] = sheet;
  return sheet;
}

function ensureEntitySheet_(entity) { return sheet_(ENTITY_SHEETS[entity], COLUMNS[entity]); }

var checkedSheets_ = {};
function ensureSystemSheet_(name, headers) {
  var sheet = sheet_(name, headers);
  if (checkedSheets_[name]) return sheet;
  // Older/edited tabs: make sure all required columns exist.
  var have = getHeaders_(sheet);
  var missing = headers.filter(function (h) { return have.indexOf(h) === -1; });
  if (missing.length) addColumns_(sheet, have, missing);
  checkedSheets_[name] = true;
  return sheet;
}

function getHeaders_(sheet) {
  var n = sheet.getLastColumn();
  if (!n) return [];
  var row = sheet.getRange(1, 1, 1, n).getValues()[0].map(function (h) { return String(h).trim(); });
  while (row.length && !row[row.length - 1]) row.pop();
  return row;
}

function addColumns_(sheet, headers, names) {
  if (headers.length + names.length > MAX_COLUMNS) fail_("Too many columns in " + sheet.getName() + ".");
  var start = headers.length + 1;
  ensureColumns_(sheet, headers.length + names.length);
  sheet.getRange(1, start, sheet.getMaxRows(), names.length).setNumberFormat("@");
  sheet.getRange(1, start, 1, names.length).setValues([names]);
  styleHeader_(sheet, headers.length + names.length);
  return headers.concat(names);
}

function styleHeader_(sheet, n) {
  sheet.getRange(1, 1, 1, n).setBackground(HEADER_BG).setFontColor(HEADER_FG).setFontWeight("bold");
  sheet.setFrozenRows(1);
}

function ensureColumns_(sheet, n) {
  var max = sheet.getMaxColumns();
  if (max < n) sheet.insertColumnsAfter(max, n - max);
}

function nextRow_(sheet) {
  var row = sheet.getLastRow() + 1;
  var max = sheet.getMaxRows();
  if (row > max) sheet.insertRowsAfter(max, Math.max(50, row - max));
  return row;
}

/** Writes one row as plain text (numbers stay numbers). */
function writeRow_(sheet, row, values) {
  ensureColumns_(sheet, values.length);
  var range = sheet.getRange(row, 1, 1, values.length);
  range.setNumberFormat("@");
  range.setValues([values]);
}

/** 1-based row whose column `col` equals `value`, or -1. */
function findRow_(sheet, col, value, caseInsensitive) {
  var last = sheet.getLastRow();
  if (last < 2 || col < 1) return -1;
  var target = caseInsensitive ? String(value).toLowerCase() : String(value);
  var vals = sheet.getRange(2, col, last - 1, 1).getValues();
  for (var i = 0; i < vals.length; i++) {
    var v = String(vals[i][0]).trim();
    if ((caseInsensitive ? v.toLowerCase() : v) === target) return i + 2;
  }
  return -1;
}

/* =====================================================================================
 * Small utilities
 * ===================================================================================== */

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Throws an error whose message is safe to show to the user. */
function fail_(message) {
  var err = new Error(message);
  err.expose = true;
  throw err;
}

function publicError_(err) {
  if (err && err.expose) return err.message;
  console.error(err && err.stack ? err.stack : err);
  return "Server error: " + (err && err.message ? err.message : String(err));
}

function withLock_(fn) {
  var lock = LockService.getScriptLock();
  if (!lock.tryLock(20000)) fail_("The workspace is busy. Please try again.");
  try { return fn(); } finally { lock.releaseLock(); }
}

function tz_() {
  try { return Session.getScriptTimeZone() || "Asia/Riyadh"; } catch (err) { return "Asia/Riyadh"; }
}

function nowIso_() { return new Date().toISOString(); }

/** Same id format as the app (time + random). */
function uid_() {
  return Date.now().toString(36) + sha256_(Utilities.getUuid()).slice(0, 6);
}

function sha256_(text) {
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, String(text), Utilities.Charset.UTF_8);
  return bytes.map(function (b) { return ((b & 0xff) + 0x100).toString(16).slice(1); }).join("");
}

function newSalt_() { return Utilities.getUuid().replace(/-/g, ""); }

/** SHA-256 (hex) of salt + password. */
function hashPassword_(salt, password) { return sha256_(String(salt) + String(password)); }

function checkPassword_(p) {
  if (typeof p !== "string" || p.length < MIN_PASSWORD) fail_("The password must be at least " + MIN_PASSWORD + " characters.");
  if (p.length > 200) fail_("The password is too long.");
}

/** 12 characters, no look-alikes (0/O, 1/l/I). */
function randomPassword_() {
  var abc = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
  var bytes = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, Utilities.getUuid() + Utilities.getUuid(), Utilities.Charset.UTF_8);
  var out = "";
  for (var i = 0; i < 12; i++) out += abc.charAt((bytes[i] & 0xff) % abc.length);
  return out;
}

function normEmail_(v) { return String(v == null ? "" : v).trim().toLowerCase().slice(0, 160); }

function isEmail_(v) { return /^[^\s@<>(),;:"]+@[^\s@<>(),;:"]+\.[^\s@<>(),;:"]{2,}$/.test(String(v || "")); }

function parseEmailList_(v, label) {
  var list = String(v || "").split(/[,;\s]+/).map(normEmail_).filter(Boolean);
  list.forEach(function (e) { if (!isEmail_(e)) fail_(label + ": \"" + e.slice(0, 80) + "\" is not a valid email address."); });
  return list;
}

/** One line of text: trims, removes line breaks/control characters, limits length. */
function cleanLine_(v, max) {
  return String(v == null ? "" : v).replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function escapeHtml_(s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
}

/** Plain text → simple HTML email (escaped, line breaks kept, right-to-left aware). */
function textToHtml_(text) {
  var rtl = /[؀-ۿ]/.test(text);
  return '<div dir="' + (rtl ? "rtl" : "ltr") + '" style="font-family:Arial,Tahoma,sans-serif;font-size:14px;line-height:1.6;color:#1B1B1B">' +
    escapeHtml_(text).replace(/\r\n?|\n/g, "<br>") + "</div>";
}

function companyName_() {
  try { var c = readSettings_().company || {}; return c.nameEn || COMPANY_NAME; } catch (err) { return COMPANY_NAME; }
}

function workspaceUrl_() {
  if (WORKSPACE_URL) return WORKSPACE_URL;
  try { var s = readSettings_(); if (s.workspaceUrl) return String(s.workspaceUrl); } catch (err) {}
  return "";
}
