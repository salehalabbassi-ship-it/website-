/* NEXA Admin — translations (English / Arabic)
 * Core strings live here. Each view file adds its own with NX.i18n.add({ en: {...}, ar: {...} }).
 * Use NX.t("key") or NX.t("key", { n: 3 }) for "{n}" placeholders. */
window.NX = window.NX || {};

NX.i18n = (function () {
  var dict = { en: {}, ar: {} };
  var lang = "en";
  try { lang = localStorage.getItem("nx_lang") || ((navigator.language || "").slice(0, 2) === "ar" ? "ar" : "en"); } catch (e) {}
  if (lang !== "ar") lang = "en";

  function add(pack) {
    Object.keys(pack).forEach(function (l) {
      dict[l] = dict[l] || {};
      Object.assign(dict[l], pack[l]);
    });
  }

  function t(key, vars) {
    var s = (dict[lang] && dict[lang][key]);
    if (s == null) s = dict.en[key];
    if (s == null) s = key;
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }

  function apply() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }

  function setLang(l) {
    lang = l === "ar" ? "ar" : "en";
    try { localStorage.setItem("nx_lang", lang); } catch (e) {}
    apply();
    if (NX.app && NX.app.rerender) NX.app.rerender(true);
  }

  /* Pick the right language from a bilingual object: { en: "Fit-out", ar: "تشطيبات" } */
  function pick(obj) {
    if (obj == null) return "";
    if (typeof obj === "string") return obj;
    return obj[lang] || obj.en || obj.ar || "";
  }

  apply();
  return { add: add, t: t, setLang: setLang, pick: pick, get lang() { return lang; }, get isAr() { return lang === "ar"; } };
})();

NX.t = NX.i18n.t;

NX.i18n.add({
  en: {
    "app.name": "NEXA Workspace",
    "app.tagline": "Leads · Projects · Proposals",
    "nav.dashboard": "Dashboard",
    "nav.leads": "Leads",
    "nav.projects": "Projects",
    "nav.proposals": "Proposals",
    "nav.followups": "Follow-ups",
    "nav.templates": "Templates",
    "nav.conversations": "Conversations",
    "nav.analysis": "Analysis",
    "nav.settings": "Settings",

    "login.title": "Sign in to NEXA Workspace",
    "login.email": "Email",
    "login.password": "Password",
    "login.submit": "Sign in",
    "login.failed": "Wrong email or password.",
    "login.demoNote": "Demo mode — data is saved in this browser only. Use admin@nexa.demo / demo (Admin) or staff@nexa.demo / demo (Staff).",
    "login.demoFill": "Fill demo login",

    "top.search": "Search leads, projects, proposals…",
    "top.refresh": "Refresh data",
    "top.logout": "Sign out",
    "top.lang": "العربية",
    "top.menu": "Menu",
    "top.demo": "Demo",
    "top.noResults": "No results",

    "role.admin": "Admin",
    "role.staff": "Staff",

    "c.add": "Add",
    "c.new": "New",
    "c.save": "Save",
    "c.cancel": "Cancel",
    "c.close": "Close",
    "c.delete": "Delete",
    "c.edit": "Edit",
    "c.view": "View",
    "c.back": "Back",
    "c.search": "Search…",
    "c.all": "All",
    "c.none": "—",
    "c.yes": "Yes",
    "c.no": "No",
    "c.confirm": "Confirm",
    "c.saved": "Saved",
    "c.deleted": "Deleted",
    "c.loading": "Loading…",
    "c.error": "Something went wrong: {msg}",
    "c.required": "Please fill in the required fields.",
    "c.confirmDelete": "Delete this item? This cannot be undone.",
    "c.adminOnly": "Only admins can do this.",
    "c.empty": "Nothing here yet.",
    "c.name": "Name",
    "c.company": "Company",
    "c.phone": "Phone",
    "c.email": "Email",
    "c.notes": "Notes",
    "c.status": "Status",
    "c.date": "Date",
    "c.time": "Time",
    "c.owner": "Owner",
    "c.actions": "Actions",
    "c.service": "Service",
    "c.source": "Source",
    "c.stage": "Stage",
    "c.value": "Value",
    "c.total": "Total",
    "c.client": "Client",
    "c.city": "City",
    "c.title": "Title",
    "c.type": "Type",
    "c.created": "Created",
    "c.updated": "Updated",
    "c.today": "Today",
    "c.overdue": "Overdue",
    "c.upcoming": "Upcoming",
    "c.whatsapp": "WhatsApp",
    "c.call": "Call",
    "c.sendEmail": "Email",
    "c.print": "Print / PDF",
    "c.export": "Export",
    "c.more": "More",
    "c.select": "Select…",
    "c.lead": "Lead",
    "c.project": "Project",
    "c.sar": "SAR",
    "c.ago": "{t} ago",
    "c.in": "in {t}",
    "c.justNow": "just now",
    "c.min": "{n} min",
    "c.hr": "{n} h",
    "c.day": "{n} d",
    "c.emailSent": "Email sent",
    "c.offline": "Can't reach the server. Check your connection and try again."
  },
  ar: {
    "app.name": "مساحة عمل نكسا",
    "app.tagline": "العملاء · المشاريع · العروض",
    "nav.dashboard": "لوحة التحكم",
    "nav.leads": "العملاء المحتملون",
    "nav.projects": "المشاريع",
    "nav.proposals": "عروض الأسعار",
    "nav.followups": "المتابعات",
    "nav.templates": "قوالب نكسا",
    "nav.conversations": "المحادثات",
    "nav.analysis": "التحليلات",
    "nav.settings": "الإعدادات",

    "login.title": "تسجيل الدخول إلى مساحة عمل نكسا",
    "login.email": "البريد الإلكتروني",
    "login.password": "كلمة المرور",
    "login.submit": "دخول",
    "login.failed": "البريد أو كلمة المرور غير صحيحة.",
    "login.demoNote": "وضع تجريبي — تُحفظ البيانات في هذا المتصفح فقط. استخدم admin@nexa.demo / demo (مدير) أو staff@nexa.demo / demo (موظف).",
    "login.demoFill": "تعبئة بيانات التجربة",

    "top.search": "ابحث في العملاء والمشاريع والعروض…",
    "top.refresh": "تحديث البيانات",
    "top.logout": "تسجيل الخروج",
    "top.lang": "English",
    "top.menu": "القائمة",
    "top.demo": "تجريبي",
    "top.noResults": "لا توجد نتائج",

    "role.admin": "مدير",
    "role.staff": "موظف",

    "c.add": "إضافة",
    "c.new": "جديد",
    "c.save": "حفظ",
    "c.cancel": "إلغاء",
    "c.close": "إغلاق",
    "c.delete": "حذف",
    "c.edit": "تعديل",
    "c.view": "عرض",
    "c.back": "رجوع",
    "c.search": "بحث…",
    "c.all": "الكل",
    "c.none": "—",
    "c.yes": "نعم",
    "c.no": "لا",
    "c.confirm": "تأكيد",
    "c.saved": "تم الحفظ",
    "c.deleted": "تم الحذف",
    "c.loading": "جارٍ التحميل…",
    "c.error": "حدث خطأ: {msg}",
    "c.required": "يرجى تعبئة الحقول المطلوبة.",
    "c.confirmDelete": "حذف هذا العنصر؟ لا يمكن التراجع.",
    "c.adminOnly": "هذا الإجراء للمدير فقط.",
    "c.empty": "لا يوجد شيء بعد.",
    "c.name": "الاسم",
    "c.company": "الشركة",
    "c.phone": "الجوال",
    "c.email": "البريد الإلكتروني",
    "c.notes": "ملاحظات",
    "c.status": "الحالة",
    "c.date": "التاريخ",
    "c.time": "الوقت",
    "c.owner": "المسؤول",
    "c.actions": "إجراءات",
    "c.service": "الخدمة",
    "c.source": "المصدر",
    "c.stage": "المرحلة",
    "c.value": "القيمة",
    "c.total": "الإجمالي",
    "c.client": "العميل",
    "c.city": "المدينة",
    "c.title": "العنوان",
    "c.type": "النوع",
    "c.created": "تاريخ الإنشاء",
    "c.updated": "آخر تحديث",
    "c.today": "اليوم",
    "c.overdue": "متأخرة",
    "c.upcoming": "قادمة",
    "c.whatsapp": "واتساب",
    "c.call": "اتصال",
    "c.sendEmail": "بريد",
    "c.print": "طباعة / PDF",
    "c.export": "تصدير",
    "c.more": "المزيد",
    "c.select": "اختر…",
    "c.lead": "عميل محتمل",
    "c.project": "مشروع",
    "c.sar": "ر.س",
    "c.ago": "منذ {t}",
    "c.in": "بعد {t}",
    "c.justNow": "الآن",
    "c.min": "{n} د",
    "c.hr": "{n} س",
    "c.day": "{n} يوم",
    "c.emailSent": "تم إرسال البريد",
    "c.offline": "تعذّر الاتصال بالخادم. تحقّق من الاتصال وحاول مجدداً."
  }
});
