/* NEXA Workspace — Settings: company, pricing, lists, team, my account, data & connection, website form */
(function () {
  NX.i18n.add({
    en: {
      "set.sub": "Company details, lists, team and your account.",
      "set.subStaff": "Your account and language.",
      "set.tCompany": "Company",
      "set.tSales": "Sales & pricing",
      "set.tLists": "Lists",
      "set.tTeam": "Team",
      "set.tAccount": "My account",
      "set.tData": "Data & connection",
      "set.tWebsite": "Website form",

      "set.companyIntro": "These details appear on PDF proposals and in message templates.",
      "set.secNames": "Name & tagline",
      "set.secContact": "Contact",
      "set.secLegal": "Registration",
      "set.secBank": "Bank details (for payments)",
      "set.nameEn": "Company name (English)",
      "set.nameAr": "Company name (Arabic)",
      "set.taglineEn": "Tagline (English)",
      "set.taglineAr": "Tagline (Arabic)",
      "set.website": "Website",
      "set.addressEn": "Address (English)",
      "set.addressAr": "Address (Arabic)",
      "set.crNumber": "CR number",
      "set.vatNumber": "VAT number",
      "set.bankName": "Bank name",
      "set.iban": "IBAN",
      "set.accountName": "Account name",
      "set.saveChanges": "Save changes",

      "set.salesIntro": "Defaults used when creating proposals, projects and follow-ups.",
      "set.currency": "Currency",
      "set.currencyHint": "All amounts are in Saudi Riyal.",
      "set.vatRate": "VAT %",
      "set.proposalPrefix": "Proposal number prefix",
      "set.prefixHint": "Example: {p}-{y}-001",
      "set.projectPrefix": "Project code prefix",
      "set.validity": "Proposal validity (days)",
      "set.fuDays": "Default follow-up after (days)",
      "set.badNumber": "Please enter valid numbers (0 or more).",

      "set.lStages": "Lead stages",
      "set.lServices": "Services",
      "set.lSources": "Lead sources",
      "set.lProjectStatuses": "Project statuses",
      "set.listsIntro": "Edit the options used across the workspace. Changes apply after you save.",
      "set.labelEn": "English label",
      "set.labelAr": "Arabic label",
      "set.color": "Color",
      "set.addItem": "Add item",
      "set.moveUp": "Move up",
      "set.moveDown": "Move down",
      "set.remove": "Remove",
      "set.inUse": "Used by {n}",
      "set.locked": "Required",
      "set.lockedWon": "This is the “won” stage. It can be renamed but not removed.",
      "set.lockedClosed": "This is a closing stage/status. It can be renamed but not removed.",
      "set.lockedSystem": "Used by the system (e.g. website enquiries). It can be renamed but not removed.",
      "set.removeInUse": "{n} records use “{x}”. They will keep this value but it will show as plain text. Remove anyway?",
      "set.unsaved": "Unsaved changes",
      "set.discard": "Discard",
      "set.saveList": "Save list",
      "set.needLabel": "Every item needs a label.",
      "set.newItem": "New item",

      "set.cGold": "Gold", "set.cGreen": "Green", "set.cRed": "Red", "set.cBlue": "Blue",
      "set.cAmber": "Amber", "set.cPurple": "Purple", "set.cGray": "Gray",

      "set.teamIntro": "People who can sign in to NEXA Workspace.",
      "set.rolesTitle": "Roles",
      "set.roleAdminDesc": "Everything, including settings, analysis, team and deleting records.",
      "set.roleStaffDesc": "Leads, projects, proposals, follow-ups, templates and conversations.",
      "set.addUser": "Add user",
      "set.editUser": "Edit user",
      "set.role": "Role",
      "set.active": "Active (can sign in)",
      "set.inactive": "Inactive",
      "set.activeBadge": "Active",
      "set.tempPassword": "Temporary password",
      "set.tempHint": "Share it with the person. They can change it under My account.",
      "set.resetPassword": "New password (optional)",
      "set.resetHint": "Leave empty to keep the current password.",
      "set.you": "You",
      "set.selfNote": "You can't change your own role or deactivate yourself.",
      "set.removeUser": "Remove {name}? They will no longer be able to sign in.",
      "set.userExists": "A user with this email already exists.",
      "set.userRemoved": "User removed",
      "set.pwShort": "Password must be at least 6 characters.",

      "set.accountIntro": "Your details and sign-in.",
      "set.changePw": "Change password",
      "set.oldPw": "Current password",
      "set.newPw": "New password",
      "set.confirmPw": "Confirm new password",
      "set.pwMismatch": "The new passwords don't match.",
      "set.pwChanged": "Password changed",
      "set.language": "Language",
      "set.languageHint": "Saved on this device.",
      "set.accountHint": "Ask an admin to change your name or email.",

      "set.mode": "Connection",
      "set.modeDemo": "Demo — data is saved in this browser only",
      "set.modeSheets": "Connected to Google Sheets",
      "set.apiUrl": "Apps Script URL",
      "set.backup": "Backup",
      "set.exportJson": "Export all data (JSON)",
      "set.exportHint": "Downloads leads, projects, proposals, follow-ups, templates, conversations and settings.",
      "set.importJson": "Import JSON",
      "set.importHint": "Replaces all demo data in this browser with a previously exported file.",
      "set.importConfirm": "Replace all data in this browser with the contents of “{f}”?",
      "set.importBad": "This file doesn't look like a NEXA Workspace export.",
      "set.imported": "Data imported",
      "set.resetDemo": "Reset demo data",
      "set.resetConfirm": "Delete all data in this browser and restore the sample data?",
      "set.resetDone": "Demo data restored",
      "set.setupTitle": "Connect Google Sheets",
      "set.setup1": "Create a Google Sheet and open Extensions → Apps Script.",
      "set.setup2": "Paste the code from admin/apps-script/Code.gs and deploy it as a web app.",
      "set.setup3": "Edit admin/js/config.js and paste the Apps Script URL into API_URL.",
      "set.setup4": "Reload the page and sign in. Full steps are in admin/README.md.",
      "set.sheetsNote": "Data lives in your Google Sheet. Every change is saved there straight away.",

      "set.webTitle": "Enquiries from the website",
      "set.web1": "When someone fills in the contact form on the NEXA website, the enquiry arrives here automatically as a new lead with source “Website” and stage “New”.",
      "set.web2": "It appears on the Dashboard under “New leads” with a Website badge, ready to be assigned.",
      "set.web3": "This works once the workspace is connected to Google Sheets (see Data & connection).",
      "set.webCount": "{n} website leads so far",
      "set.webDemo": "Demo mode: website enquiries are not received in this browser."
    },
    ar: {
      "set.sub": "بيانات الشركة والقوائم والفريق وحسابك.",
      "set.subStaff": "حسابك واللغة.",
      "set.tCompany": "الشركة",
      "set.tSales": "المبيعات والأسعار",
      "set.tLists": "القوائم",
      "set.tTeam": "الفريق",
      "set.tAccount": "حسابي",
      "set.tData": "البيانات والربط",
      "set.tWebsite": "نموذج الموقع",

      "set.companyIntro": "تظهر هذه البيانات في عروض الأسعار (PDF) وفي قوالب الرسائل.",
      "set.secNames": "الاسم والشعار",
      "set.secContact": "بيانات التواصل",
      "set.secLegal": "التسجيل",
      "set.secBank": "البيانات البنكية (للدفعات)",
      "set.nameEn": "اسم الشركة (إنجليزي)",
      "set.nameAr": "اسم الشركة (عربي)",
      "set.taglineEn": "الشعار النصي (إنجليزي)",
      "set.taglineAr": "الشعار النصي (عربي)",
      "set.website": "الموقع الإلكتروني",
      "set.addressEn": "العنوان (إنجليزي)",
      "set.addressAr": "العنوان (عربي)",
      "set.crNumber": "رقم السجل التجاري",
      "set.vatNumber": "الرقم الضريبي",
      "set.bankName": "اسم البنك",
      "set.iban": "رقم الآيبان",
      "set.accountName": "اسم الحساب",
      "set.saveChanges": "حفظ التغييرات",

      "set.salesIntro": "القيم الافتراضية عند إنشاء العروض والمشاريع والمتابعات.",
      "set.currency": "العملة",
      "set.currencyHint": "جميع المبالغ بالريال السعودي.",
      "set.vatRate": "ضريبة القيمة المضافة %",
      "set.proposalPrefix": "بادئة رقم العرض",
      "set.prefixHint": "مثال: {p}-{y}-001",
      "set.projectPrefix": "بادئة رمز المشروع",
      "set.validity": "مدة صلاحية العرض (أيام)",
      "set.fuDays": "موعد المتابعة الافتراضي بعد (أيام)",
      "set.badNumber": "يرجى إدخال أرقام صحيحة (صفر أو أكثر).",

      "set.lStages": "مراحل العملاء",
      "set.lServices": "الخدمات",
      "set.lSources": "مصادر العملاء",
      "set.lProjectStatuses": "حالات المشاريع",
      "set.listsIntro": "عدّل الخيارات المستخدمة في مساحة العمل. تُطبّق التغييرات بعد الحفظ.",
      "set.labelEn": "الاسم بالإنجليزية",
      "set.labelAr": "الاسم بالعربية",
      "set.color": "اللون",
      "set.addItem": "إضافة عنصر",
      "set.moveUp": "نقل لأعلى",
      "set.moveDown": "نقل لأسفل",
      "set.remove": "إزالة",
      "set.inUse": "مستخدم في {n}",
      "set.locked": "أساسي",
      "set.lockedWon": "هذه مرحلة «الفوز». يمكن تغيير اسمها لكن لا يمكن حذفها.",
      "set.lockedClosed": "هذه مرحلة/حالة إغلاق. يمكن تغيير اسمها لكن لا يمكن حذفها.",
      "set.lockedSystem": "يستخدمها النظام (مثل طلبات الموقع). يمكن تغيير اسمها لكن لا يمكن حذفها.",
      "set.removeInUse": "يوجد {n} سجلات تستخدم «{x}». ستبقى القيمة محفوظة لكنها ستظهر كنص عادي. هل تريد الإزالة؟",
      "set.unsaved": "تغييرات غير محفوظة",
      "set.discard": "تجاهل",
      "set.saveList": "حفظ القائمة",
      "set.needLabel": "كل عنصر يحتاج إلى اسم.",
      "set.newItem": "عنصر جديد",

      "set.cGold": "ذهبي", "set.cGreen": "أخضر", "set.cRed": "أحمر", "set.cBlue": "أزرق",
      "set.cAmber": "كهرماني", "set.cPurple": "بنفسجي", "set.cGray": "رمادي",

      "set.teamIntro": "الأشخاص الذين يمكنهم تسجيل الدخول إلى مساحة عمل نكسا.",
      "set.rolesTitle": "الصلاحيات",
      "set.roleAdminDesc": "كل شيء، بما في ذلك الإعدادات والتحليلات والفريق وحذف السجلات.",
      "set.roleStaffDesc": "العملاء والمشاريع والعروض والمتابعات والقوالب والمحادثات.",
      "set.addUser": "إضافة مستخدم",
      "set.editUser": "تعديل المستخدم",
      "set.role": "الصلاحية",
      "set.active": "نشط (يمكنه تسجيل الدخول)",
      "set.inactive": "غير نشط",
      "set.activeBadge": "نشط",
      "set.tempPassword": "كلمة مرور مؤقتة",
      "set.tempHint": "شاركها مع الشخص، ويمكنه تغييرها من «حسابي».",
      "set.resetPassword": "كلمة مرور جديدة (اختياري)",
      "set.resetHint": "اتركها فارغة للإبقاء على كلمة المرور الحالية.",
      "set.you": "أنت",
      "set.selfNote": "لا يمكنك تغيير صلاحيتك أو إيقاف حسابك بنفسك.",
      "set.removeUser": "إزالة {name}؟ لن يتمكن من تسجيل الدخول بعد ذلك.",
      "set.userExists": "يوجد مستخدم بهذا البريد مسبقاً.",
      "set.userRemoved": "تمت إزالة المستخدم",
      "set.pwShort": "يجب ألا تقل كلمة المرور عن 6 أحرف.",

      "set.accountIntro": "بياناتك وتسجيل الدخول.",
      "set.changePw": "تغيير كلمة المرور",
      "set.oldPw": "كلمة المرور الحالية",
      "set.newPw": "كلمة المرور الجديدة",
      "set.confirmPw": "تأكيد كلمة المرور الجديدة",
      "set.pwMismatch": "كلمتا المرور الجديدتان غير متطابقتين.",
      "set.pwChanged": "تم تغيير كلمة المرور",
      "set.language": "اللغة",
      "set.languageHint": "يُحفظ على هذا الجهاز.",
      "set.accountHint": "لتغيير الاسم أو البريد تواصل مع المدير.",

      "set.mode": "الربط",
      "set.modeDemo": "تجريبي — البيانات محفوظة في هذا المتصفح فقط",
      "set.modeSheets": "متصل بـ Google Sheets",
      "set.apiUrl": "رابط Apps Script",
      "set.backup": "النسخ الاحتياطي",
      "set.exportJson": "تصدير جميع البيانات (JSON)",
      "set.exportHint": "يشمل العملاء والمشاريع والعروض والمتابعات والقوالب والمحادثات والإعدادات.",
      "set.importJson": "استيراد JSON",
      "set.importHint": "يستبدل جميع البيانات التجريبية في هذا المتصفح بملف تم تصديره سابقاً.",
      "set.importConfirm": "استبدال جميع البيانات في هذا المتصفح بمحتوى «{f}»؟",
      "set.importBad": "هذا الملف لا يبدو ملف تصدير من مساحة عمل نكسا.",
      "set.imported": "تم استيراد البيانات",
      "set.resetDemo": "إعادة البيانات التجريبية",
      "set.resetConfirm": "حذف جميع البيانات في هذا المتصفح واستعادة البيانات النموذجية؟",
      "set.resetDone": "تمت استعادة البيانات التجريبية",
      "set.setupTitle": "الربط مع Google Sheets",
      "set.setup1": "أنشئ ملف Google Sheet ثم افتح الإضافات ← Apps Script.",
      "set.setup2": "الصق الكود من admin/apps-script/Code.gs وانشره كتطبيق ويب.",
      "set.setup3": "عدّل الملف admin/js/config.js والصق رابط Apps Script في API_URL.",
      "set.setup4": "أعد تحميل الصفحة وسجّل الدخول. الخطوات الكاملة في admin/README.md.",
      "set.sheetsNote": "البيانات محفوظة في ملف Google Sheet الخاص بك، وكل تعديل يُحفظ فوراً.",

      "set.webTitle": "الطلبات الواردة من الموقع",
      "set.web1": "عندما يعبّئ أي شخص نموذج التواصل في موقع نكسا، يصل الطلب هنا تلقائياً كعميل محتمل جديد بمصدر «الموقع الإلكتروني» ومرحلة «جديد».",
      "set.web2": "يظهر في لوحة التحكم ضمن «عملاء جدد» مع شارة الموقع، جاهزاً للإسناد.",
      "set.web3": "يعمل ذلك بعد ربط مساحة العمل مع Google Sheets (راجع «البيانات والربط»).",
      "set.webCount": "{n} عملاء من الموقع حتى الآن",
      "set.webDemo": "الوضع التجريبي: لا تصل طلبات الموقع إلى هذا المتصفح."
    }
  });

  var esc = NX.esc;
  var T = NX.t;
  var tab = null;            // remembered tab
  var listTab = "stages";    // remembered list in the Lists tab
  var draft = null;          // { name, items, dirty } — working copy of a list
  var COLORS = ["gold", "green", "red", "blue", "amber", "purple", "gray"];
  var LISTS = [
    { id: "stages", key: "set.lStages", color: true },
    { id: "services", key: "set.lServices" },
    { id: "sources", key: "set.lSources" },
    { id: "projectStatuses", key: "set.lProjectStatuses", color: true }
  ];

  function tabsFor(admin) {
    return admin ? ["company", "sales", "lists", "team", "account", "data", "website"] : ["account"];
  }
  var TAB_KEYS = { company: "set.tCompany", sales: "set.tSales", lists: "set.tLists", team: "set.tTeam", account: "set.tAccount", data: "set.tData", website: "set.tWebsite" };
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function section(label) { return '<div class="nx-form-section">' + esc(label) + "</div>"; }

  /* ================= Render ================= */
  function render(el) {
    var admin = NX.store.isAdmin();
    var tabs = tabsFor(admin);
    if (!tab || tabs.indexOf(tab) === -1) tab = admin ? "company" : "account";

    var body = "";
    if (tab === "company") body = companyTab();
    else if (tab === "sales") body = salesTab();
    else if (tab === "lists") body = listsTab();
    else if (tab === "team") body = teamTab();
    else if (tab === "account") body = accountTab();
    else if (tab === "data") body = dataTab();
    else if (tab === "website") body = websiteTab();

    el.innerHTML =
      NX.ui.pageHead({ title: T("nav.settings"), sub: esc(T(admin ? "set.sub" : "set.subStaff")) }) +
      (tabs.length > 1 ? '<div class="nx-toolbar st-tabs">' + NX.ui.chips(tabs.map(function (t) { return { value: t, label: T(TAB_KEYS[t]) }; }), tab, "tab") + "</div>" : "") +
      '<div class="st-body">' + body + "</div>";

    NX.ui.on(el, "click", "[data-tab]", function (e, b) { tab = b.getAttribute("data-tab"); NX.app.rerender(); });
    wireCompany(el); wireSales(el); wireLists(el); wireTeam(el); wireAccount(el); wireData(el);
  }

  /* ================= Company ================= */
  function companyTab() {
    var c = NX.store.settings.company || {};
    var f = function (name, label, o) { return NX.ui.field(Object.assign({ name: name, label: label, value: c[name] }, o || {})); };
    return '<form class="nx-card st-form" data-form="company" novalidate><div class="nx-card-body">' +
      '<p class="st-intro">' + esc(T("set.companyIntro")) + "</p>" +
      '<div class="nx-form-grid">' +
      section(T("set.secNames")) +
      f("nameEn", T("set.nameEn"), { required: true, dir: "ltr" }) + f("nameAr", T("set.nameAr"), { dir: "rtl" }) +
      f("taglineEn", T("set.taglineEn"), { dir: "ltr" }) + f("taglineAr", T("set.taglineAr"), { dir: "rtl" }) +
      section(T("set.secContact")) +
      f("phone", T("c.phone"), { type: "tel" }) + f("email", T("c.email"), { type: "email" }) +
      f("website", T("set.website"), { dir: "ltr" }) + '<div class="st-spacer"></div>' +
      f("addressEn", T("set.addressEn"), { dir: "ltr" }) + f("addressAr", T("set.addressAr"), { dir: "rtl" }) +
      section(T("set.secLegal")) +
      f("crNumber", T("set.crNumber"), { dir: "ltr" }) + f("vatNumber", T("set.vatNumber"), { dir: "ltr" }) +
      section(T("set.secBank")) +
      f("bankName", T("set.bankName")) + f("accountName", T("set.accountName")) +
      f("iban", T("set.iban"), { dir: "ltr", full: true, placeholder: "SA00 0000 0000 0000 0000 0000" }) +
      "</div></div>" + saveBar() + "</form>";
  }
  function saveBar() {
    return '<div class="st-save"><button type="submit" class="nx-btn nx-btn-primary">' + NX.icon("check", 16) + "<span>" + esc(T("set.saveChanges")) + "</span></button></div>";
  }
  function wireCompany(el) {
    var form = el.querySelector("[data-form=company]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      var data = NX.ui.readForm(form);
      var btn = form.querySelector("[type=submit]"); btn.disabled = true;
      NX.ui.run(NX.store.saveSettings({ company: Object.assign({}, NX.store.settings.company, data) })).catch(function () { btn.disabled = false; });
    });
  }
  function validate(form) {
    var bad = Array.prototype.filter.call(form.querySelectorAll("[required]"), function (x) { return !x.value || !x.checkValidity(); });
    form.querySelectorAll(".nx-field").forEach(function (f) { f.classList.remove("is-invalid"); });
    if (!bad.length) return true;
    bad.forEach(function (x) { var f = x.closest(".nx-field"); if (f) f.classList.add("is-invalid"); });
    bad[0].focus();
    NX.ui.toast(T("c.required"), "error");
    return false;
  }

  /* ================= Sales & pricing ================= */
  function salesTab() {
    var s = NX.store.settings;
    var y = new Date().getFullYear();
    return '<form class="nx-card st-form" data-form="sales" novalidate><div class="nx-card-body">' +
      '<p class="st-intro">' + esc(T("set.salesIntro")) + "</p>" +
      NX.ui.form([
        { name: "currency", label: T("set.currency"), value: (s.currency || "SAR") + " — " + T("c.sar"), attrs: " disabled", hint: T("set.currencyHint") },
        { name: "vatRate", label: T("set.vatRate"), type: "number", value: s.vatRate, min: 0, max: 100, step: "0.01", required: true },
        { name: "proposalPrefix", label: T("set.proposalPrefix"), value: s.proposalPrefix, required: true, dir: "ltr", hint: T("set.prefixHint", { p: s.proposalPrefix || "NX", y: y }) },
        { name: "projectPrefix", label: T("set.projectPrefix"), value: s.projectPrefix, required: true, dir: "ltr", hint: T("set.prefixHint", { p: s.projectPrefix || "PRJ", y: y }) },
        { name: "proposalValidityDays", label: T("set.validity"), type: "number", value: s.proposalValidityDays, min: 1, step: 1, required: true },
        { name: "followupDefaultDays", label: T("set.fuDays"), type: "number", value: s.followupDefaultDays, min: 0, step: 1, required: true }
      ]) + "</div>" + saveBar() + "</form>";
  }
  function wireSales(el) {
    var form = el.querySelector("[data-form=sales]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      var d = NX.ui.readForm(form);
      var nums = ["vatRate", "proposalValidityDays", "followupDefaultDays"];
      if (nums.some(function (k) { return typeof d[k] !== "number" || isNaN(d[k]) || d[k] < 0; })) { NX.ui.toast(T("set.badNumber"), "error"); return; }
      var clean = function (p) { return String(p || "").trim().replace(/\s+/g, "").replace(/-+$/, ""); };
      var btn = form.querySelector("[type=submit]"); btn.disabled = true;
      NX.ui.run(NX.store.saveSettings({
        vatRate: d.vatRate, proposalPrefix: clean(d.proposalPrefix), projectPrefix: clean(d.projectPrefix),
        proposalValidityDays: Math.round(d.proposalValidityDays), followupDefaultDays: Math.round(d.followupDefaultDays)
      })).catch(function () { btn.disabled = false; });
    });
  }

  /* ================= Lists ================= */
  function usage(listName, id) {
    var n = function (entity, key) { return NX.store.where(entity, function (r) { return r[key] === id; }).length; };
    if (listName === "stages") return n("leads", "stage");
    if (listName === "sources") return n("leads", "source");
    if (listName === "projectStatuses") return n("projects", "status");
    if (listName === "services") return n("leads", "service") + n("projects", "service") + n("proposals", "service") + n("templates", "service");
    return 0;
  }
  function lockReason(listName, item) {
    if (item.won) return T("set.lockedWon");
    if (item.closed) return T("set.lockedClosed");
    if ((listName === "stages" && item.id === "new") || (listName === "sources" && item.id === "website")) return T("set.lockedSystem");
    return "";
  }
  function getDraft() {
    if (!draft || draft.name !== listTab) {
      draft = { name: listTab, dirty: false, items: JSON.parse(JSON.stringify(NX.list(listTab))) };
    }
    return draft;
  }
  function slug(label, taken) {
    var base = String(label || "").toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 32) || "item";
    var id = base, i = 2;
    while (taken.indexOf(id) > -1) id = base + "-" + i++;
    return id;
  }

  function listsTab() {
    var def = LISTS.find(function (l) { return l.id === listTab; }) || LISTS[0];
    var d = getDraft();
    var rows = d.items.map(function (it, i) {
      var lock = it.id ? lockReason(def.id, it) : "";
      var used = it.id ? usage(def.id, it.id) : 0;
      return '<li class="st-item" data-i="' + i + '">' +
        '<div class="st-item-move">' +
        '<button type="button" class="nx-btn nx-btn-icon nx-btn-sm st-up" data-act="up" title="' + esc(T("set.moveUp")) + '" aria-label="' + esc(T("set.moveUp")) + '"' + (i === 0 ? " disabled" : "") + ">" + chevron("up") + "</button>" +
        '<button type="button" class="nx-btn nx-btn-icon nx-btn-sm st-down" data-act="down" title="' + esc(T("set.moveDown")) + '" aria-label="' + esc(T("set.moveDown")) + '"' + (i === d.items.length - 1 ? " disabled" : "") + ">" + chevron("down") + "</button>" +
        "</div>" +
        '<div class="st-item-fields">' +
        '<label class="st-in"><span>' + esc(T("set.labelEn")) + '</span><input class="nx-input" dir="ltr" data-k="en" value="' + esc(it.en || "") + '" placeholder="' + esc(T("set.newItem")) + '" /></label>' +
        '<label class="st-in"><span>' + esc(T("set.labelAr")) + '</span><input class="nx-input" dir="rtl" data-k="ar" value="' + esc(it.ar || "") + '" /></label>' +
        (def.color ? '<label class="st-in st-in-color"><span>' + esc(T("set.color")) + '</span><span class="st-color"><i class="nx-dot nx-dot-' + esc(it.color || "gray") + '"></i><select class="nx-input" data-k="color">' +
          COLORS.map(function (c) { return '<option value="' + c + '"' + ((it.color || "gray") === c ? " selected" : "") + ">" + esc(T("set.c" + cap(c))) + "</option>"; }).join("") + "</select></span></label>" : "") +
        "</div>" +
        '<div class="st-item-meta">' +
        (it.id ? '<span class="nx-tag" dir="ltr">' + esc(it.id) + "</span>" : '<span class="nx-badge nx-tone-gold">' + esc(T("c.new")) + "</span>") +
        (used ? '<span class="nx-badge nx-tone-gray">' + esc(T("set.inUse", { n: used })) + "</span>" : "") +
        (lock ? '<span class="nx-badge nx-tone-gold" title="' + esc(lock) + '">' + esc(T("set.locked")) + "</span>"
          : '<button type="button" class="nx-btn nx-btn-icon nx-btn-sm st-del" data-act="remove" title="' + esc(T("set.remove")) + '" aria-label="' + esc(T("set.remove")) + '">' + NX.icon("trash", 16) + "</button>") +
        "</div></li>";
    }).join("");

    return '<div class="nx-card st-lists"><div class="nx-card-body">' +
      '<p class="st-intro">' + esc(T("set.listsIntro")) + "</p>" +
      NX.ui.chips(LISTS.map(function (l) { return { value: l.id, label: T(l.key), count: NX.list(l.id).length }; }), listTab, "list") +
      "</div>" +
      '<ul class="st-items">' + rows + "</ul>" +
      '<div class="st-save st-save-list' + (d.dirty ? " is-dirty" : "") + '">' +
      NX.ui.btn({ label: T("set.addItem"), icon: "plus", act: "add-item" }) +
      '<span class="st-dirty">' + esc(T("set.unsaved")) + "</span>" +
      NX.ui.btn({ label: T("set.discard"), act: "discard", cls: "ghost st-discard" }) +
      NX.ui.btn({ label: T("set.saveList"), icon: "check", act: "save-list", cls: "primary" }) +
      "</div></div>";
  }
  function chevron(dir) {
    return '<svg class="nx-ic" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + (dir === "up" ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6") + '"/></svg>';
  }
  function markDirty(el) { draft.dirty = true; var bar = el.querySelector(".st-save-list"); if (bar) bar.classList.add("is-dirty"); }

  function wireLists(el) {
    if (!el.querySelector(".st-lists")) return;
    var idx = function (t) { return Number(t.closest("[data-i]").getAttribute("data-i")); };
    NX.ui.on(el, "click", "[data-list]", function (e, b) {
      var next = b.getAttribute("data-list");
      if (next === listTab) return;
      var go = function () { listTab = next; draft = null; NX.app.rerender(); };
      if (draft && draft.dirty) NX.ui.confirm(T("set.unsaved") + " — " + T("set.discard") + "?", { okLabel: T("set.discard") }).then(function (ok) { if (ok) go(); });
      else go();
    });
    NX.ui.on(el, "input", "[data-k]", function (e, inp) {
      draft.items[idx(inp)][inp.getAttribute("data-k")] = inp.value;
      if (inp.tagName === "SELECT") { var dot = inp.parentNode.querySelector(".nx-dot"); if (dot) dot.className = "nx-dot nx-dot-" + inp.value; }
      markDirty(el);
    });
    NX.ui.on(el, "change", "select[data-k]", function (e, inp) {
      draft.items[idx(inp)].color = inp.value;
      var dot = inp.parentNode.querySelector(".nx-dot"); if (dot) dot.className = "nx-dot nx-dot-" + inp.value;
      markDirty(el);
    });
    var move = function (i, j) {
      var it = draft.items; if (j < 0 || j >= it.length) return;
      var x = it[i]; it[i] = it[j]; it[j] = x; draft.dirty = true; NX.app.rerender();
    };
    NX.ui.on(el, "click", "[data-act=up]", function (e, b) { var i = idx(b); move(i, i - 1); });
    NX.ui.on(el, "click", "[data-act=down]", function (e, b) { var i = idx(b); move(i, i + 1); });
    NX.ui.on(el, "click", "[data-act=remove]", function (e, b) {
      var i = idx(b), it = draft.items[i];
      if (it.id && lockReason(draft.name, it)) return;
      var used = it.id ? usage(draft.name, it.id) : 0;
      var go = function () { draft.items.splice(i, 1); draft.dirty = true; NX.app.rerender(); };
      if (used) NX.ui.confirm(T("set.removeInUse", { n: used, x: NX.i18n.pick(it) || it.id }), { danger: true, okLabel: T("set.remove") }).then(function (ok) { if (ok) go(); });
      else go();
    });
    NX.ui.on(el, "click", "[data-act=add-item]", function () {
      var def = LISTS.find(function (l) { return l.id === draft.name; });
      var item = { id: "", en: "", ar: "" };
      if (def && def.color) item.color = "gray";
      draft.items.push(item); draft.dirty = true;
      NX.app.rerender();
      setTimeout(function () { var ins = document.querySelectorAll(".st-item [data-k=en]"); var last = ins[ins.length - 1]; if (last) { last.focus(); last.scrollIntoView({ block: "center", behavior: "smooth" }); } }, 30);
    });
    NX.ui.on(el, "click", "[data-act=discard]", function () { draft = null; NX.app.rerender(); });
    NX.ui.on(el, "click", "[data-act=save-list]", function (e, b) {
      var items = draft.items.map(function (it) { return Object.assign({}, it, { en: String(it.en || "").trim(), ar: String(it.ar || "").trim() }); });
      if (items.some(function (it) { return !it.en && !it.ar; })) { NX.ui.toast(T("set.needLabel"), "error"); return; }
      var taken = items.filter(function (it) { return it.id; }).map(function (it) { return it.id; });
      items.forEach(function (it) {
        if (!it.en) it.en = it.ar;
        if (!it.ar) it.ar = it.en;
        if (!it.id) { it.id = slug(it.en, taken); taken.push(it.id); }
      });
      var patch = {}; patch[draft.name] = items;
      b.disabled = true;
      var name = draft.name;
      NX.ui.run(NX.store.saveSettings(patch)).then(function () {
        if (draft && draft.name === name) draft = null;
        NX.app.rerender();
      }, function () { b.disabled = false; });
    });
  }

  /* ================= Team ================= */
  function teamTab() {
    var me = (NX.store.session || {}).email;
    var users = NX.store.users();
    var table = NX.ui.table({
      cols: [
        { label: T("c.name"), render: function (u) {
          return '<span class="st-user">' + NX.ui.avatar(u.name || u.email) + '<span><b class="nx-cell-title">' + esc(u.name || u.email) +
            (u.email === me ? ' <span class="nx-badge nx-tone-gold">' + esc(T("set.you")) + "</span>" : "") + '</b><small class="nx-cell-sub" dir="ltr">' + esc(u.email) + "</small></span></span>";
        } },
        { label: T("set.role"), render: function (u) { return NX.ui.badge(T("role." + u.role), u.role === "admin" ? "gold" : "blue"); } },
        { label: T("c.status"), render: function (u) { return u.active ? NX.ui.badge(T("set.activeBadge"), "green") : NX.ui.badge(T("set.inactive"), "gray"); } },
        { label: "", cls: "nx-right", render: function (u) {
          return '<span class="st-row-acts">' + NX.ui.btn({ icon: "edit", act: "edit-user", cls: "icon sm", title: T("c.edit"), attrs: ' data-email="' + esc(u.email) + '"' }) +
            (u.email !== me ? NX.ui.btn({ icon: "trash", act: "remove-user", cls: "icon sm", title: T("c.delete"), attrs: ' data-email="' + esc(u.email) + '"' }) : "") + "</span>";
        } }
      ],
      rows: users
    });
    return '<div class="st-team">' +
      '<section class="nx-card"><div class="nx-card-head"><div><h2>' + esc(T("set.tTeam")) + '</h2><p class="st-head-sub">' + esc(T("set.teamIntro")) + "</p></div>" +
      NX.ui.btn({ label: T("set.addUser"), icon: "plus", act: "add-user", cls: "primary sm" }) + "</div>" +
      '<div class="nx-card-body nx-flush">' + table + "</div></section>" +
      '<section class="nx-card"><div class="nx-card-head"><h2>' + esc(T("set.rolesTitle")) + "</h2></div><div class=\"nx-card-body\">" +
      '<dl class="st-roles"><div><dt>' + NX.ui.badge(T("role.admin"), "gold") + "</dt><dd>" + esc(T("set.roleAdminDesc")) + "</dd></div>" +
      "<div><dt>" + NX.ui.badge(T("role.staff"), "blue") + "</dt><dd>" + esc(T("set.roleStaffDesc")) + "</dd></div></dl></div></section>" +
      "</div>";
  }
  function roleOpts() { return [{ value: "staff", label: T("role.staff") }, { value: "admin", label: T("role.admin") }]; }
  function userModal(user) {
    var isNew = !user;
    var me = (NX.store.session || {}).email;
    var self = !isNew && user.email === me;
    var lock = self ? " disabled" : "";
    NX.ui.modal({
      title: T(isNew ? "set.addUser" : "set.editUser"), size: "sm",
      body: NX.ui.form([
        { name: "name", label: T("c.name"), value: user && user.name, required: true, full: true },
        { name: "email", label: T("c.email"), type: "email", value: user && user.email, required: isNew, full: true, attrs: isNew ? ' autocomplete="off"' : " disabled" },
        { name: "role", label: T("set.role"), type: "select", options: roleOpts(), value: (user && user.role) || "staff", full: true, attrs: lock },
        isNew ? { name: "password", label: T("set.tempPassword"), value: "", required: true, full: true, hint: T("set.tempHint"), attrs: ' autocomplete="new-password" minlength="6"', dir: "ltr" }
          : { name: "password", label: T("set.resetPassword"), type: "text", value: "", full: true, hint: T("set.resetHint"), attrs: ' autocomplete="new-password"', dir: "ltr" },
        isNew ? null : { name: "active", label: T("set.active"), type: "checkbox", value: user.active, full: true, attrs: lock }
      ].filter(Boolean)) + (self ? '<p class="nx-note-box st-mt">' + esc(T("set.selfNote")) + "</p>" : ""),
      onSubmit: function (d) {
        var pw = String(d.password || "");
        if ((isNew || pw) && pw.length < 6) { NX.ui.toast(T("set.pwShort"), "error"); return false; }
        if (isNew && NX.store.users().some(function (u) { return u.email === String(d.email).toLowerCase(); })) { NX.ui.toast(T("set.userExists"), "error"); return false; }
        var rec = isNew ? { email: d.email, name: d.name, role: d.role, active: true, password: pw }
          : { email: user.email, name: d.name, role: self ? user.role : d.role, active: self ? true : !!d.active };
        if (!isNew && pw) rec.password = pw;
        return NX.ui.run(NX.store.saveUser(rec));
      }
    });
  }
  function wireTeam(el) {
    if (!el.querySelector(".st-team")) return;
    var find = function (b) { var e = b.getAttribute("data-email"); return NX.store.users().find(function (u) { return u.email === e; }); };
    NX.ui.on(el, "click", "[data-act=add-user]", function () { userModal(null); });
    NX.ui.on(el, "click", "[data-act=edit-user]", function (e, b) { var u = find(b); if (u) userModal(u); });
    NX.ui.on(el, "click", "[data-act=remove-user]", function (e, b) {
      var u = find(b); if (!u) return;
      NX.ui.confirm(T("set.removeUser", { name: u.name || u.email }), { danger: true, okLabel: T("c.delete") }).then(function (ok) {
        if (ok) NX.ui.run(NX.store.removeUser(u.email), T("set.userRemoved")).catch(function () {});
      });
    });
  }

  /* ================= My account ================= */
  function accountTab() {
    var s = NX.store.session || {};
    var ar = NX.i18n.isAr;
    return '<div class="nx-grid-2 st-account">' +
      '<section class="nx-card"><div class="nx-card-head"><h2>' + esc(T("set.tAccount")) + "</h2></div><div class=\"nx-card-body\">" +
      '<div class="st-me">' + NX.ui.avatar(s.name || s.email) + "<div><b>" + esc(s.name || s.email) + '</b><small dir="ltr">' + esc(s.email) + "</small></div>" +
      NX.ui.badge(T("role." + s.role), s.role === "admin" ? "gold" : "blue") + "</div>" +
      (!NX.store.isAdmin() ? '<p class="nx-muted nx-small st-mt">' + esc(T("set.accountHint")) + "</p>" : "") +
      '<div class="st-lang"><div><b>' + esc(T("set.language")) + '</b><small class="nx-muted">' + esc(T("set.languageHint")) + "</small></div>" +
      '<div class="nx-seg" role="group" aria-label="' + esc(T("set.language")) + '">' +
      '<button type="button" data-setlang="en" lang="en"' + (!ar ? ' class="is-active" aria-pressed="true"' : ' aria-pressed="false"') + ">English</button>" +
      '<button type="button" data-setlang="ar" lang="ar"' + (ar ? ' class="is-active" aria-pressed="true"' : ' aria-pressed="false"') + ">العربية</button></div></div>" +
      "</div></section>" +
      '<form class="nx-card st-form" data-form="password" novalidate><div class="nx-card-head"><h2>' + esc(T("set.changePw")) + '</h2></div><div class="nx-card-body">' +
      '<div class="nx-form-grid st-one">' +
      NX.ui.field({ name: "old", label: T("set.oldPw"), type: "password", required: true, full: true, attrs: ' autocomplete="current-password"' }) +
      NX.ui.field({ name: "next", label: T("set.newPw"), type: "password", required: true, full: true, hint: T("set.pwShort"), attrs: ' autocomplete="new-password"' }) +
      NX.ui.field({ name: "confirm", label: T("set.confirmPw"), type: "password", required: true, full: true, attrs: ' autocomplete="new-password"' }) +
      '</div></div><div class="st-save"><button type="submit" class="nx-btn nx-btn-primary">' + esc(T("set.changePw")) + "</button></div></form>" +
      "</div>";
  }
  function wireAccount(el) {
    NX.ui.on(el, "click", "[data-setlang]", function (e, b) { var l = b.getAttribute("data-setlang"); if (l !== NX.i18n.lang) NX.i18n.setLang(l); });
    var form = el.querySelector("[data-form=password]");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(form)) return;
      var d = NX.ui.readForm(form);
      if (d.next.length < 6) { NX.ui.toast(T("set.pwShort"), "error"); return; }
      if (d.next !== d.confirm) { NX.ui.toast(T("set.pwMismatch"), "error"); return; }
      var btn = form.querySelector("[type=submit]"); btn.disabled = true;
      NX.ui.run(NX.store.changePassword(d.old, d.next), T("set.pwChanged")).then(function () { form.reset(); }, function () {}).then(function () { btn.disabled = false; });
    });
  }

  /* ================= Data & connection ================= */
  function maskUrl(u) { u = String(u || ""); return u.length > 48 ? u.slice(0, 36) + "…" + u.slice(-8) : u; }
  function dataTab() {
    var demo = NX.store.demo;
    var api = ((window.NX_CONFIG || {}).API_URL || "").trim();
    var steps = ["set.setup1", "set.setup2", "set.setup3", "set.setup4"].map(function (k) { return "<li>" + codeify(T(k)) + "</li>"; }).join("");
    return '<div class="nx-grid-2 st-data">' +
      '<section class="nx-card"><div class="nx-card-head"><h2>' + esc(T("set.mode")) + "</h2></div><div class=\"nx-card-body\">" +
      '<div class="st-mode ' + (demo ? "is-demo" : "is-live") + '"><span class="st-mode-ic">' + NX.icon(demo ? "inbox" : "check", 18) + "</span><b>" + esc(T(demo ? "set.modeDemo" : "set.modeSheets")) + "</b></div>" +
      (api ? '<div class="st-kv"><span>' + esc(T("set.apiUrl")) + '</span><code dir="ltr">' + esc(maskUrl(api)) + "</code></div>" : "") +
      (demo ? '<h3 class="st-h3">' + esc(T("set.setupTitle")) + '</h3><ol class="st-steps">' + steps + "</ol>" : '<p class="nx-muted st-mt">' + esc(T("set.sheetsNote")) + "</p>") +
      "</div></section>" +
      '<section class="nx-card"><div class="nx-card-head"><h2>' + esc(T("set.backup")) + "</h2></div><div class=\"nx-card-body st-actions\">" +
      '<div class="st-action"><div><b>' + esc(T("set.exportJson")) + "</b><small>" + esc(T("set.exportHint")) + "</small></div>" +
      NX.ui.btn({ label: T("c.export"), icon: "download", act: "export-json" }) + "</div>" +
      (demo ? '<div class="st-action"><div><b>' + esc(T("set.importJson")) + "</b><small>" + esc(T("set.importHint")) + "</small></div>" +
        NX.ui.btn({ label: T("set.importJson"), icon: "upload", act: "import-json" }) + '<input type="file" accept="application/json,.json" data-import hidden /></div>' +
        '<div class="st-action"><div><b>' + esc(T("set.resetDemo")) + "</b><small>" + esc(T("set.resetConfirm")) + "</small></div>" +
        NX.ui.btn({ label: T("set.resetDemo"), icon: "refresh", act: "reset-demo", cls: "danger" }) + "</div>" : "") +
      "</div></section></div>";
  }
  /* Show file paths in steps as code (text is escaped first). */
  function codeify(s) { return esc(s).replace(/(admin\/[\w./-]+[\w]|API_URL)/g, '<code dir="ltr">$1</code>'); }
  function wireData(el) {
    NX.ui.on(el, "click", "[data-act=export-json]", function () {
      NX.ui.download("nexa-workspace-" + NX.fmt.today() + ".json", JSON.stringify(NX.store.exportAll(), null, 2), "application/json");
    });
    var file = el.querySelector("[data-import]");
    NX.ui.on(el, "click", "[data-act=import-json]", function () { if (file) { file.value = ""; file.click(); } });
    if (file) file.addEventListener("change", function () {
      var f = file.files && file.files[0]; if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        var json;
        try { json = JSON.parse(r.result); } catch (e) { json = null; }
        if (!json || typeof json !== "object" || !json.data || typeof json.data !== "object") { NX.ui.toast(T("set.importBad"), "error"); return; }
        NX.ui.confirm(T("set.importConfirm", { f: f.name }), { danger: true, okLabel: T("set.importJson") }).then(function (ok) {
          if (ok) NX.ui.run(NX.store.importDemo(json), T("set.imported")).catch(function () {});
        });
      };
      r.readAsText(f);
    });
    NX.ui.on(el, "click", "[data-act=reset-demo]", function () {
      NX.ui.confirm(T("set.resetConfirm"), { danger: true, okLabel: T("set.resetDemo") }).then(function (ok) {
        if (ok) { draft = null; NX.ui.run(NX.store.resetDemo(), T("set.resetDone")).catch(function () {}); }
      });
    });
  }

  /* ================= Website form ================= */
  function websiteTab() {
    var n = NX.store.where("leads", function (l) { return l.source === "website"; }).length;
    return '<section class="nx-card st-web"><div class="nx-card-head"><h2>' + esc(T("set.webTitle")) + "</h2>" +
      '<a class="nx-btn nx-btn-text nx-btn-sm" href="#/leads">' + esc(T("set.webCount", { n: n })) + "</a></div><div class=\"nx-card-body\">" +
      '<div class="st-flow" aria-hidden="true"><span>' + NX.icon("globe", 18) + "</span><i></i><span>" + NX.icon("inbox", 18) + "</span><i></i><span>" + NX.icon("leads", 18) + "</span></div>" +
      '<ul class="st-web-list"><li>' + esc(T("set.web1")) + "</li><li>" + esc(T("set.web2")) + "</li><li>" + esc(T("set.web3")) + "</li></ul>" +
      (NX.store.demo ? '<p class="nx-note-box st-mt">' + esc(T("set.webDemo")) + "</p>" : "") +
      "</div></section>";
  }

  NX.view("settings", { order: 90, icon: "settings", render: render });
})();
