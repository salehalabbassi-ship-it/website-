/* NEXA Admin — Follow-ups
 * Grouped task list (Overdue / Today / Tomorrow / This week / Later / Done), quick complete, snooze, .ics export.
 * Owns: NX.actions.newFollowup(prefill), NX.actions.editFollowup(fu), NX.actions.completeFollowup(fu) */
(function () {
  var TYPES = [
    { id: "call", icon: "phone" },
    { id: "whatsapp", icon: "whatsapp" },
    { id: "email", icon: "mail" },
    { id: "meeting", icon: "leads" },
    { id: "sitevisit", icon: "pin" },
    { id: "other", icon: "dots" }
  ];
  var DONE_PAGE = 20;
  var state = { status: "open", owner: null, ownerFor: null, type: "", q: "", doneOpen: false, doneLimit: DONE_PAGE };

  NX.i18n.add({
    en: {
      "fu.new": "New follow-up",
      "fu.edit": "Edit follow-up",
      "fu.search": "Search follow-ups…",
      "fu.subOverdue": "{n} overdue",
      "fu.subToday": "{n} due today",
      "fu.subClear": "You're all caught up.",
      "fu.st.open": "Open",
      "fu.st.done": "Done",
      "fu.st.all": "All",
      "fu.mine": "Mine",
      "fu.everyone": "Everyone",
      "fu.allTypes": "All types",
      "fu.type.call": "Call",
      "fu.type.whatsapp": "WhatsApp",
      "fu.type.email": "Email",
      "fu.type.meeting": "Meeting",
      "fu.type.sitevisit": "Site visit",
      "fu.type.other": "Other",
      "fu.sec.overdue": "Overdue",
      "fu.sec.today": "Today",
      "fu.sec.tomorrow": "Tomorrow",
      "fu.sec.week": "This week",
      "fu.sec.later": "Later",
      "fu.sec.done": "Done",
      "fu.yesterday": "Yesterday",
      "fu.daysOverdue": "{n} days overdue",
      "fu.noDate": "No date",
      "fu.markDone": "Mark as done",
      "fu.markOpen": "Mark as not done",
      "fu.doneToast": "Marked as done",
      "fu.reopened": "Moved back to open",
      "fu.doneAt": "Done {t}",
      "fu.snooze": "Snooze",
      "fu.snooze1": "+1 day",
      "fu.snooze3": "+3 days",
      "fu.snoozeW": "Next week",
      "fu.snoozed": "Moved to {d}",
      "fu.addCal": "Add to calendar",
      "fu.exportCal": "Export to calendar",
      "fu.nothingExport": "No open follow-ups to export.",
      "fu.f.title": "What needs to be done?",
      "fu.f.titlePh": "e.g. Call about the proposal",
      "fu.f.type": "Type",
      "fu.f.due": "Due date",
      "fu.f.time": "Time (optional)",
      "fu.f.linkLead": "Linked lead",
      "fu.f.linkProject": "Linked project",
      "fu.q.today": "Today",
      "fu.q.tomorrow": "Tomorrow",
      "fu.q.in3": "In 3 days",
      "fu.q.nextWeek": "Next week",
      "fu.next.title": "Schedule the next follow-up?",
      "fu.next.text": "Done. Keep the momentum going with {name}.",
      "fu.next.textNoName": "Done. Want to plan the next step now?",
      "fu.next.submit": "Schedule",
      "fu.next.skip": "Not now",
      "fu.empty.open": "No open follow-ups. You're all caught up.",
      "fu.empty.filter": "No follow-ups match these filters.",
      "fu.empty.done": "No completed follow-ups yet.",
      "fu.showMore": "Show {n} more",
      "fu.unassigned": "Unassigned",
      "fu.calDesc": "Follow-up from NEXA Workspace"
    },
    ar: {
      "fu.new": "متابعة جديدة",
      "fu.edit": "تعديل المتابعة",
      "fu.search": "ابحث في المتابعات…",
      "fu.subOverdue": "{n} متأخرة",
      "fu.subToday": "{n} مستحقة اليوم",
      "fu.subClear": "لا توجد متابعات معلّقة، أحسنت.",
      "fu.st.open": "مفتوحة",
      "fu.st.done": "منجزة",
      "fu.st.all": "الكل",
      "fu.mine": "متابعاتي",
      "fu.everyone": "الجميع",
      "fu.allTypes": "كل الأنواع",
      "fu.type.call": "اتصال",
      "fu.type.whatsapp": "واتساب",
      "fu.type.email": "بريد إلكتروني",
      "fu.type.meeting": "اجتماع",
      "fu.type.sitevisit": "زيارة موقع",
      "fu.type.other": "أخرى",
      "fu.sec.overdue": "متأخرة",
      "fu.sec.today": "اليوم",
      "fu.sec.tomorrow": "غداً",
      "fu.sec.week": "هذا الأسبوع",
      "fu.sec.later": "لاحقاً",
      "fu.sec.done": "منجزة",
      "fu.yesterday": "أمس",
      "fu.daysOverdue": "متأخرة {n} أيام",
      "fu.noDate": "بدون تاريخ",
      "fu.markDone": "تحديد كمنجزة",
      "fu.markOpen": "إلغاء الإنجاز",
      "fu.doneToast": "تم إنجاز المتابعة",
      "fu.reopened": "أُعيدت إلى المتابعات المفتوحة",
      "fu.doneAt": "أُنجزت {t}",
      "fu.snooze": "تأجيل",
      "fu.snooze1": "يوم واحد",
      "fu.snooze3": "3 أيام",
      "fu.snoozeW": "الأسبوع القادم",
      "fu.snoozed": "تم التأجيل إلى {d}",
      "fu.addCal": "إضافة إلى التقويم",
      "fu.exportCal": "تصدير إلى التقويم",
      "fu.nothingExport": "لا توجد متابعات مفتوحة للتصدير.",
      "fu.f.title": "ما المطلوب؟",
      "fu.f.titlePh": "مثال: اتصال بخصوص عرض السعر",
      "fu.f.type": "النوع",
      "fu.f.due": "تاريخ الاستحقاق",
      "fu.f.time": "الوقت (اختياري)",
      "fu.f.linkLead": "العميل المرتبط",
      "fu.f.linkProject": "المشروع المرتبط",
      "fu.q.today": "اليوم",
      "fu.q.tomorrow": "غداً",
      "fu.q.in3": "بعد 3 أيام",
      "fu.q.nextWeek": "الأسبوع القادم",
      "fu.next.title": "جدولة المتابعة التالية؟",
      "fu.next.text": "تم. حافظ على التواصل مع {name}.",
      "fu.next.textNoName": "تم. هل تريد تحديد الخطوة التالية الآن؟",
      "fu.next.submit": "جدولة",
      "fu.next.skip": "ليس الآن",
      "fu.empty.open": "لا توجد متابعات مفتوحة. كل شيء تحت السيطرة.",
      "fu.empty.filter": "لا توجد متابعات مطابقة لهذه الفلاتر.",
      "fu.empty.done": "لا توجد متابعات منجزة بعد.",
      "fu.showMore": "عرض {n} أخرى",
      "fu.unassigned": "غير مسندة",
      "fu.calDesc": "متابعة من مساحة عمل نكسا"
    }
  });

  /* ---------- helpers ---------- */
  var esc = NX.esc;
  function me() { return (NX.store.session || {}).email || ""; }
  function today() { return NX.fmt.today(); }
  function loc() { return NX.i18n.isAr ? "ar-SA-u-nu-latn-ca-gregory" : "en-GB"; }
  function typeDef(id) { return TYPES.find(function (t) { return t.id === id; }) || TYPES[TYPES.length - 1]; }
  function typeLabel(id) { return NX.t("fu.type." + typeDef(id).id); }
  function isOpen(f) { return f.status !== "done"; }
  function leadOf(f) { return f.leadId ? NX.store.get("leads", f.leadId) : null; }
  function projOf(f) { return f.projectId ? NX.store.get("projects", f.projectId) : null; }
  function dayDiff(d) {
    var a = NX.fmt.toDate(d), b = NX.fmt.toDate(today());
    if (!a || !b) return 0;
    return Math.round((a - b) / 864e5);
  }
  function nowHM() { var d = new Date(); return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); }
  function dayName(d) { var x = NX.fmt.toDate(d); return x ? x.toLocaleDateString(loc(), { weekday: "short", day: "numeric", month: "short" }) : ""; }
  function niceDate(d) {
    var n = dayDiff(d);
    if (n === 0) return NX.t("fu.q.today");
    if (n === 1) return NX.t("fu.q.tomorrow");
    if (n === -1) return NX.t("fu.yesterday");
    if (n > 1 && n < 7) return dayName(d);
    var x = NX.fmt.toDate(d);
    return x && x.getFullYear() === new Date().getFullYear() ? NX.fmt.dateShort(d) : NX.fmt.date(d);
  }

  function ownerMode() {
    if (!state.owner || state.ownerFor !== me()) { state.owner = NX.store.isAdmin() ? "all" : "mine"; state.ownerFor = me(); }
    return state.owner;
  }

  function isLate(f) {
    if (!isOpen(f) || !f.dueDate) return false;
    var n = dayDiff(f.dueDate);
    return n < 0 || (n === 0 && !!f.dueTime && f.dueTime < nowHM());
  }

  function dueText(f) {
    if (!f.dueDate) return NX.t("fu.noDate");
    var n = dayDiff(f.dueDate), t;
    if (isOpen(f) && n < -1) t = NX.t("fu.daysOverdue", { n: -n });
    else t = niceDate(f.dueDate);
    return t + (f.dueTime ? " · " + f.dueTime : "");
  }

  function bucket(f) {
    if (!f.dueDate) return "later";
    var n = dayDiff(f.dueDate);
    if (n < 0) return "overdue";
    if (n === 0) return "today";
    if (n === 1) return "tomorrow";
    if (n <= 7) return "week";
    return "later";
  }

  function byDue(a, b) {
    var c = String(a.dueDate || "9999").localeCompare(String(b.dueDate || "9999"));
    if (c) return c;
    // timed items first (in order), untimed after
    return String(a.dueTime || "99:99").localeCompare(String(b.dueTime || "99:99"));
  }

  function snoozeTarget(f, days) {
    var t = today();
    var base = f.dueDate && f.dueDate >= t ? f.dueDate : t;
    return NX.fmt.addDays(base, days);
  }

  function filtered() {
    var mine = ownerMode() === "mine", em = me(), q = state.q.trim().toLowerCase();
    return NX.store.all("followups").filter(function (f) {
      if (mine && f.owner !== em) return false;
      if (state.type && typeDef(f.type).id !== state.type) return false;
      if (q) {
        var l = leadOf(f), p = projOf(f);
        var hay = [f.title, f.notes, l && l.name, l && l.company, l && l.phone, p && p.name, p && p.client].join(" ").toLowerCase();
        if (hay.indexOf(q) === -1) return false;
      }
      return true;
    });
  }

  /* ---------- item rendering ---------- */
  function menuHtml(f) {
    var items = "";
    if (isOpen(f)) {
      items += '<div class="fu-menu-h">' + esc(NX.t("fu.snooze")) + "</div>" +
        [[1, "fu.snooze1"], [3, "fu.snooze3"], [7, "fu.snoozeW"]].map(function (s) {
          return '<button type="button" data-act="snooze" data-days="' + s[0] + '">' + NX.icon("followups", 16) + "<span>" + esc(NX.t(s[1])) + '</span><small>' + esc(dayName(snoozeTarget(f, s[0]))) + "</small></button>";
        }).join("") + "<hr />";
    }
    items += '<button type="button" data-act="edit">' + NX.icon("edit", 16) + "<span>" + esc(NX.t("c.edit")) + "</span></button>";
    if (isOpen(f) && f.dueDate) items += '<button type="button" data-act="ics">' + NX.icon("calendar", 16) + "<span>" + esc(NX.t("fu.addCal")) + "</span></button>";
    if (NX.store.isAdmin()) items += '<button type="button" data-act="del" class="is-danger">' + NX.icon("trash", 16) + "<span>" + esc(NX.t("c.delete")) + "</span></button>";
    return '<details class="fu-menu"><summary class="nx-btn nx-btn-icon nx-btn-sm" title="' + esc(NX.t("c.more")) + '" aria-label="' + esc(NX.t("c.more")) + '">' + NX.icon("dots", 18) + "</summary>" +
      '<div class="fu-menu-pop" role="menu">' + items + "</div></details>";
  }

  function itemHtml(f) {
    var open = isOpen(f), late = isLate(f), l = leadOf(f), p = projOf(f), td = typeDef(f.type);
    var phone = (l && l.phone) || (p && p.phone) || "";
    var link = "";
    if (l) link = '<a class="fu-link" href="#/leads/' + esc(l.id) + '">' + NX.icon("leads", 14) + "<span>" + esc(l.name) + "</span></a>";
    if (p) link += '<a class="fu-link" href="#/projects/' + esc(p.id) + '">' + NX.icon("projects", 14) + "<span>" + esc(p.name) + "</span></a>";
    var owner = f.owner ? NX.userName(f.owner) : "";
    var when = open
      ? '<span class="fu-due' + (late ? " is-late" : "") + '" title="' + esc(f.dueDate ? NX.fmt.date(f.dueDate) : "") + '">' + NX.icon("calendar", 14) + '<span class="nx-num">' + esc(dueText(f)) + "</span></span>"
      : '<span class="fu-due is-done">' + NX.icon("check", 14) + "<span>" + esc(NX.t("fu.doneAt", { t: f.doneAt ? niceDate(NX.fmt.iso(f.doneAt)) : "" })) + "</span></span>";
    var actions = "";
    if (open && phone) {
      actions += '<button type="button" class="nx-btn nx-btn-icon nx-btn-sm fu-wa" data-act="wa" title="' + esc(NX.t("c.whatsapp")) + '" aria-label="' + esc(NX.t("c.whatsapp")) + '">' + NX.icon("whatsapp", 18) + "</button>" +
        '<a class="nx-btn nx-btn-icon nx-btn-sm" href="' + esc(NX.phone.tel(phone)) + '" title="' + esc(NX.t("c.call")) + '" aria-label="' + esc(NX.t("c.call")) + '">' + NX.icon("phone", 18) + "</a>";
    }
    if (open && l && l.email && typeDef(f.type).id === "email") {
      actions += '<button type="button" class="nx-btn nx-btn-icon nx-btn-sm" data-act="mail" title="' + esc(NX.t("c.sendEmail")) + '" aria-label="' + esc(NX.t("c.sendEmail")) + '">' + NX.icon("mail", 18) + "</button>";
    }
    actions += menuHtml(f);

    return '<li class="fu-item' + (open ? "" : " is-done") + (late ? " is-late" : "") + '" data-id="' + esc(f.id) + '">' +
      '<button type="button" class="fu-check" data-act="toggle" role="checkbox" aria-checked="' + (open ? "false" : "true") + '" title="' + esc(NX.t(open ? "fu.markDone" : "fu.markOpen")) + '" aria-label="' + esc(NX.t(open ? "fu.markDone" : "fu.markOpen")) + '">' + NX.icon("check", 18) + "</button>" +
      '<div class="fu-main">' +
      '<div class="fu-title-row"><span class="fu-type fu-type-' + td.id + '" title="' + esc(typeLabel(td.id)) + '">' + NX.icon(td.icon, 15) + '</span><button type="button" class="fu-title" data-act="edit" dir="auto">' + esc(f.title || typeLabel(td.id)) + "</button></div>" +
      '<div class="fu-meta">' + when + link +
      (owner ? '<span class="fu-owner" title="' + esc(owner) + '">' + NX.ui.avatar(owner) + '<span class="fu-owner-name">' + esc(owner) + "</span></span>" : "") +
      "</div>" +
      (f.notes ? '<p class="fu-notes" dir="auto">' + esc(f.notes) + "</p>" : "") +
      "</div>" +
      '<div class="fu-actions">' + actions + "</div>" +
      "</li>";
  }

  function section(key, title, list, opts) {
    opts = opts || {};
    return '<section class="fu-sec fu-sec-' + key + '">' +
      '<h3 class="fu-sec-h"><span>' + esc(title) + '</span><span class="fu-sec-n nx-num">' + list.length + "</span></h3>" +
      '<ul class="fu-list">' + list.map(itemHtml).join("") + "</ul>" + (opts.more || "") + "</section>";
  }

  function doneSection(done, collapsible) {
    done = done.slice().sort(function (a, b) { return String(b.doneAt || b.updatedAt || "").localeCompare(String(a.doneAt || a.updatedAt || "")); });
    var expanded = !collapsible || state.doneOpen;
    var shown = done.slice(0, state.doneLimit);
    var more = done.length > shown.length
      ? '<div class="fu-more"><button type="button" class="nx-btn nx-btn-ghost nx-btn-sm" data-act="more-done">' + esc(NX.t("fu.showMore", { n: Math.min(DONE_PAGE, done.length - shown.length) })) + "</button></div>" : "";
    if (!collapsible) return section("done", NX.t("fu.sec.done"), shown, { more: more });
    return '<section class="fu-sec fu-sec-done' + (expanded ? " is-expanded" : "") + '">' +
      '<button type="button" class="fu-sec-h fu-sec-toggle" data-act="toggle-done" aria-expanded="' + expanded + '">' + NX.icon("arrow", 14) + "<span>" + esc(NX.t("fu.sec.done")) + '</span><span class="fu-sec-n nx-num">' + done.length + "</span></button>" +
      (expanded ? '<ul class="fu-list">' + shown.map(itemHtml).join("") + "</ul>" + more : "") + "</section>";
  }

  /* ---------- calendar (.ics) ---------- */
  function icsEsc(s) { return String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n"); }
  function icsFold(line) {
    // Fold lines at 75 octets (UTF-8 aware)
    var out = "", bytes = 0;
    for (var i = 0; i < line.length; i++) {
      var ch = line.charAt(i), code = line.charCodeAt(i);
      if (code >= 0xd800 && code <= 0xdbff && i + 1 < line.length) { ch += line.charAt(++i); }
      var b = unescape(encodeURIComponent(ch)).length;
      if (bytes + b > 74) { out += "\r\n "; bytes = 1; }
      out += ch; bytes += b;
    }
    return out;
  }
  function utcStamp(d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
  function ics(list) {
    var lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//NEXA Engineering//NEXA Workspace//EN", "CALSCALE:GREGORIAN", "METHOD:PUBLISH"];
    var stamp = utcStamp(new Date());
    list.forEach(function (f) {
      if (!f.dueDate) return;
      var l = leadOf(f), p = projOf(f);
      var desc = [NX.t("fu.calDesc"), typeLabel(f.type),
        l ? NX.t("c.lead") + ": " + l.name + (l.phone ? " · " + l.phone : "") : "",
        p ? NX.t("c.project") + ": " + p.name : "", f.notes || ""].filter(Boolean).join("\n");
      lines.push("BEGIN:VEVENT", "UID:" + f.id + "@nexa-workspace", "DTSTAMP:" + stamp);
      if (f.dueTime) {
        var start = new Date(f.dueDate + "T" + f.dueTime + ":00");
        var end = new Date(start.getTime() + 30 * 60000);
        lines.push("DTSTART:" + utcStamp(start), "DTEND:" + utcStamp(end));
      } else {
        lines.push("DTSTART;VALUE=DATE:" + f.dueDate.replace(/-/g, ""), "DTEND;VALUE=DATE:" + NX.fmt.addDays(f.dueDate, 1).replace(/-/g, ""));
      }
      lines.push("SUMMARY:" + icsEsc(f.title || typeLabel(f.type)), "DESCRIPTION:" + icsEsc(desc));
      if (l) lines.push("URL:" + icsEsc(location.href.split("#")[0] + "#/leads/" + l.id));
      lines.push("BEGIN:VALARM", f.dueTime ? "TRIGGER:-PT15M" : "TRIGGER:PT9H", "ACTION:DISPLAY", "DESCRIPTION:" + icsEsc(f.title || ""), "END:VALARM", "END:VEVENT");
    });
    lines.push("END:VCALENDAR");
    return lines.map(icsFold).join("\r\n") + "\r\n";
  }
  function downloadIcs(list, name) { NX.ui.download(name, ics(list), "text/calendar;charset=utf-8"); }

  /* ---------- writes ---------- */
  function setDone(f, done) {
    var rec = Object.assign({}, f, { status: done ? "done" : "open", doneAt: done ? new Date().toISOString() : "" });
    return NX.ui.run(NX.store.save("followups", rec), NX.t(done ? "fu.doneToast" : "fu.reopened"));
  }

  function snooze(f, days) {
    var d = snoozeTarget(f, days);
    return NX.ui.run(NX.store.save("followups", Object.assign({}, f, { dueDate: d })), NX.t("fu.snoozed", { d: dayName(d) }));
  }

  /* Quick date picker row (works inside any form with an input[name=<name>]) */
  function quickDates(name, value) {
    var t = today();
    return '<div class="fu-quick nx-full" data-qd-for="' + name + '">' + [[0, "fu.q.today"], [1, "fu.q.tomorrow"], [3, "fu.q.in3"], [7, "fu.q.nextWeek"]].map(function (q) {
      var d = NX.fmt.addDays(t, q[0]);
      return '<button type="button" class="nx-chip' + (d === value ? " is-active" : "") + '" data-qd="' + d + '">' + esc(NX.t(q[1])) + "</button>";
    }).join("") + "</div>";
  }
  /* Due date + time + quick picks, kept together (2 columns even on phones) */
  function whenFields(date, time) {
    return '<div class="nx-full fu-when">' +
      NX.ui.field({ name: "dueDate", label: NX.t("fu.f.due"), type: "date", required: true, value: date }) +
      NX.ui.field({ name: "dueTime", label: NX.t("fu.f.time"), type: "time", value: time || "" }) +
      quickDates("dueDate", date) + "</div>";
  }
  function wireQuickDates(formEl) {
    var sync = function () {
      formEl.querySelectorAll(".fu-quick").forEach(function (row) {
        var input = formEl.querySelector('[name="' + row.getAttribute("data-qd-for") + '"]');
        row.querySelectorAll("[data-qd]").forEach(function (b) { b.classList.toggle("is-active", !!input && b.getAttribute("data-qd") === input.value); });
      });
    };
    NX.ui.on(formEl, "click", "[data-qd]", function (e, b) {
      var row = b.closest(".fu-quick");
      var input = formEl.querySelector('[name="' + row.getAttribute("data-qd-for") + '"]');
      if (input) { input.value = b.getAttribute("data-qd"); var f = input.closest(".nx-field"); if (f) f.classList.remove("is-invalid"); }
      sync();
    });
    formEl.addEventListener("input", sync);
    formEl.addEventListener("change", sync);
  }

  function typePicker(value) {
    return '<div class="nx-field nx-full"><label>' + esc(NX.t("fu.f.type")) + '</label><input type="hidden" name="type" value="' + esc(value) + '" />' +
      '<div class="fu-typepick" role="radiogroup">' + TYPES.map(function (t) {
        return '<button type="button" role="radio" aria-checked="' + (t.id === value) + '" class="fu-tp' + (t.id === value ? " is-active" : "") + '" data-type="' + t.id + '">' + NX.icon(t.icon, 16) + "<span>" + esc(NX.t("fu.type." + t.id)) + "</span></button>";
      }).join("") + "</div></div>";
  }
  function wireTypePicker(formEl) {
    NX.ui.on(formEl, "click", "[data-type]", function (e, b) {
      formEl.querySelector('input[name="type"]').value = b.getAttribute("data-type");
      formEl.querySelectorAll("[data-type]").forEach(function (x) { var on = x === b; x.classList.toggle("is-active", on); x.setAttribute("aria-checked", on); });
    });
  }

  function leadOptions() {
    var list = NX.store.all("leads").slice().sort(function (a, b) { return String(a.name || "").localeCompare(String(b.name || ""), NX.i18n.lang); });
    return [{ value: "", label: NX.t("c.none") }].concat(list.map(function (l) { return { value: l.id, label: l.name + (l.company ? " — " + l.company : "") }; }));
  }
  function projectOptions() {
    var list = NX.store.all("projects").slice().sort(function (a, b) { return String(a.name || "").localeCompare(String(b.name || ""), NX.i18n.lang); });
    return [{ value: "", label: NX.t("c.none") }].concat(list.map(function (p) { return { value: p.id, label: (p.code ? p.code + " — " : "") + p.name }; }));
  }

  function openEditor(fu, prefill) {
    var isNew = !fu || !fu.id;
    var defDays = Number(NX.store.settings.followupDefaultDays);
    if (isNaN(defDays)) defDays = 3;
    var base = { title: "", type: "call", leadId: "", projectId: "", dueDate: NX.fmt.addDays(today(), defDays), dueTime: "", owner: me(), notes: "", status: "open" };
    var rec = Object.assign(base, isNew ? (prefill || {}) : fu);
    if (!rec.type || !TYPES.some(function (t) { return t.id === rec.type; })) rec.type = "other";
    var users = NX.userOpts(true);
    if (rec.owner && !users.some(function (u) { return u.value === rec.owner; })) users.push({ value: rec.owner, label: NX.userName(rec.owner) });

    var body = '<div class="nx-form-grid">' +
      NX.ui.field({ name: "title", label: NX.t("fu.f.title"), required: true, full: true, value: rec.title, placeholder: NX.t("fu.f.titlePh"), attrs: ' dir="auto" autocomplete="off"' }) +
      typePicker(rec.type) +
      whenFields(rec.dueDate, rec.dueTime) +
      NX.ui.field({ name: "leadId", label: NX.t("fu.f.linkLead"), type: "select", options: leadOptions(), value: rec.leadId }) +
      NX.ui.field({ name: "projectId", label: NX.t("fu.f.linkProject"), type: "select", options: projectOptions(), value: rec.projectId }) +
      NX.ui.field({ name: "owner", label: NX.t("c.owner"), type: "select", options: users, value: rec.owner }) +
      NX.ui.field({ name: "notes", label: NX.t("c.notes"), type: "textarea", full: true, rows: 3, value: rec.notes, attrs: ' dir="auto"' }) +
      "</div>";

    var footer = "";
    if (!isNew && NX.store.isAdmin()) footer = NX.ui.btn({ label: NX.t("c.delete"), icon: "trash", act: "fu-del", cls: "text" });

    NX.ui.modal({
      title: isNew ? NX.t("fu.new") : NX.t("fu.edit"),
      size: "md",
      body: body,
      footer: footer,
      onOpen: function (formEl, m) {
        wireTypePicker(formEl);
        wireQuickDates(formEl);
        NX.ui.on(formEl, "click", "[data-act=fu-del]", function () {
          NX.ui.del("followups", rec.id, function () { m.close(); });
        });
      },
      onSubmit: function (data) {
        var out = Object.assign({}, rec, data);
        if (!out.status) out.status = "open";
        return NX.ui.run(NX.store.save("followups", out));
      }
    });
  }

  function promptNext(f) {
    var l = leadOf(f), p = projOf(f);
    var name = (l && l.name) || (p && p.name) || "";
    var defDays = Number(NX.store.settings.followupDefaultDays);
    if (isNaN(defDays) || defDays < 1) defDays = 3;
    var d = NX.fmt.addDays(today(), defDays);
    var body = '<p class="fu-next-text">' + esc(name ? NX.t("fu.next.text", { name: name }) : NX.t("fu.next.textNoName")) + "</p>" +
      '<div class="nx-form-grid">' +
      NX.ui.field({ name: "title", label: NX.t("fu.f.title"), required: true, full: true, value: f.title || "", attrs: ' dir="auto" autocomplete="off"' }) +
      whenFields(d, "") +
      "</div>";
    NX.ui.modal({
      title: NX.t("fu.next.title"),
      size: "sm",
      body: body,
      submitLabel: NX.t("fu.next.submit"),
      onOpen: function (formEl) {
        wireQuickDates(formEl);
        var cancel = formEl.querySelector(".nx-modal-foot [data-close]");
        if (cancel) cancel.textContent = NX.t("fu.next.skip");
      },
      onSubmit: function (data) {
        var next = {
          title: data.title, type: f.type || "call", leadId: f.leadId || "", projectId: f.projectId || "",
          dueDate: data.dueDate, dueTime: data.dueTime || "", owner: f.owner || me(), notes: "", status: "open"
        };
        return NX.ui.run(NX.store.save("followups", next));
      }
    });
  }

  /* ---------- cross-section actions ---------- */
  NX.actions.newFollowup = function (prefill) { openEditor(null, prefill || {}); };
  NX.actions.editFollowup = function (fu) {
    if (typeof fu === "string") fu = NX.store.get("followups", fu);
    if (fu) openEditor(fu);
  };
  NX.actions.completeFollowup = function (fu) {
    if (typeof fu === "string") fu = NX.store.get("followups", fu);
    if (!fu) return Promise.resolve(null);
    return setDone(fu, true).then(function (saved) { promptNext(saved || fu); return saved; });
  };

  // Close any open "more" menu when clicking elsewhere (installed once).
  document.addEventListener("click", function (e) {
    document.querySelectorAll("details.fu-menu[open]").forEach(function (d) { if (!d.contains(e.target)) d.removeAttribute("open"); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") document.querySelectorAll("details.fu-menu[open]").forEach(function (d) { d.removeAttribute("open"); });
  });

  /* ---------- page ---------- */
  NX.view("followups", {
    order: 50,
    icon: "followups",
    render: function (el) {
      var list = filtered();
      var open = list.filter(isOpen).sort(byDue);
      var done = list.filter(function (f) { return !isOpen(f); });
      var nOver = open.filter(function (f) { return bucket(f) === "overdue"; }).length;
      var nToday = open.filter(function (f) { return bucket(f) === "today"; }).length;

      var sub = [];
      if (nOver) sub.push('<b class="fu-sub-late">' + esc(NX.t("fu.subOverdue", { n: nOver })) + "</b>");
      if (nToday) sub.push(esc(NX.t("fu.subToday", { n: nToday })));
      if (!sub.length) sub.push(esc(NX.t("fu.subClear")));

      var actions = NX.ui.btn({ label: NX.t("fu.exportCal"), icon: "calendar", act: "export-ics", cls: "ghost", attrs: ' data-fu-export' }) +
        NX.ui.btn({ label: NX.t("fu.new"), icon: "plus", act: "new", cls: "primary" });

      var mode = ownerMode();
      var toolbar = '<div class="nx-toolbar fu-toolbar">' + NX.ui.searchBox(state.q, NX.t("fu.search")) +
        NX.ui.chips([
          { value: "open", label: NX.t("fu.st.open"), count: open.length },
          { value: "done", label: NX.t("fu.st.done"), count: done.length },
          { value: "all", label: NX.t("fu.st.all"), count: list.length }
        ], state.status, "fu-status") +
        '<div class="nx-seg fu-owner-seg" role="group">' +
        '<button type="button" data-fu-owner="mine" class="' + (mode === "mine" ? "is-active" : "") + '">' + NX.icon("user", 14) + "<span>" + esc(NX.t("fu.mine")) + "</span></button>" +
        '<button type="button" data-fu-owner="all" class="' + (mode === "all" ? "is-active" : "") + '">' + NX.icon("leads", 14) + "<span>" + esc(NX.t("fu.everyone")) + "</span></button>" +
        "</div></div>" +
        '<div class="nx-chips fu-types">' + [{ id: "", icon: "filter" }].concat(TYPES).map(function (t) {
          return '<button type="button" class="nx-chip' + (state.type === t.id ? " is-active" : "") + '" data-fu-type="' + t.id + '">' + NX.icon(t.icon, 14) + "<span>" + esc(t.id ? NX.t("fu.type." + t.id) : NX.t("fu.allTypes")) + "</span></button>";
        }).join("") + "</div>";

      var filtersOn = !!(state.q || state.type);
      var bodyHtml = "";
      if (state.status !== "done") {
        var groups = { overdue: [], today: [], tomorrow: [], week: [], later: [] };
        open.forEach(function (f) { groups[bucket(f)].push(f); });
        var secs = ["overdue", "today", "tomorrow", "week", "later"].filter(function (k) { return groups[k].length; })
          .map(function (k) { return section(k, NX.t("fu.sec." + k), groups[k]); }).join("");
        if (secs) bodyHtml += secs;
        else bodyHtml += '<div class="fu-empty">' + NX.icon("check", 28) + "<p>" + esc(NX.t(filtersOn ? "fu.empty.filter" : "fu.empty.open")) + "</p>" +
          (filtersOn ? "" : NX.ui.btn({ label: NX.t("fu.new"), icon: "plus", act: "new", cls: "ghost sm" })) + "</div>";
        if (done.length) bodyHtml += doneSection(done, state.status === "open");
      } else {
        bodyHtml += done.length ? doneSection(done, false)
          : '<div class="fu-empty">' + NX.icon("check", 28) + "<p>" + esc(NX.t(filtersOn ? "fu.empty.filter" : "fu.empty.done")) + "</p></div>";
      }

      el.innerHTML = NX.ui.pageHead({ title: NX.t("nav.followups"), sub: sub.join(" · "), actions: actions }) +
        toolbar + '<div class="fu-board">' + bodyHtml + "</div>";

      /* ----- events ----- */
      var find = function (t) { var li = t.closest("[data-id]"); return li ? NX.store.get("followups", li.getAttribute("data-id")) : null; };
      NX.ui.on(el, "input", "[data-search]", function (e, t) { state.q = t.value; NX.app.rerender(); });
      NX.ui.on(el, "click", "[data-fu-status]", function (e, t) { state.status = t.getAttribute("data-fu-status"); state.doneLimit = DONE_PAGE; NX.app.rerender(); });
      NX.ui.on(el, "click", "[data-fu-owner]", function (e, t) { state.owner = t.getAttribute("data-fu-owner"); NX.app.rerender(); });
      NX.ui.on(el, "click", "[data-fu-type]", function (e, t) { state.type = t.getAttribute("data-fu-type"); NX.app.rerender(); });
      NX.ui.on(el, "click", "[data-act=new]", function () { NX.actions.newFollowup({}); });
      NX.ui.on(el, "click", "[data-act=toggle-done]", function () { state.doneOpen = !state.doneOpen; NX.app.rerender(); });
      NX.ui.on(el, "click", "[data-act=more-done]", function () { state.doneLimit += DONE_PAGE; NX.app.rerender(); });
      NX.ui.on(el, "click", "[data-act=export-ics]", function () {
        var items = open.filter(function (f) { return f.dueDate; });
        if (!items.length) { NX.ui.toast(NX.t("fu.nothingExport"), "error"); return; }
        downloadIcs(items, "nexa-followups-" + today() + ".ics");
      });
      NX.ui.on(el, "click", "[data-act=toggle]", function (e, t) {
        var f = find(t); if (!f) return;
        var li = t.closest(".fu-item");
        if (isOpen(f)) {
          li.classList.add("is-checking");
          t.setAttribute("aria-checked", "true");
          NX.actions.completeFollowup(f).catch(function () { li.classList.remove("is-checking"); });
        } else {
          setDone(f, false);
        }
      });
      NX.ui.on(el, "click", "[data-act=edit]", function (e, t) { var f = find(t); closeMenus(t); if (f) openEditor(f); });
      NX.ui.on(el, "click", "[data-act=snooze]", function (e, t) { var f = find(t); closeMenus(t); if (f) snooze(f, Number(t.getAttribute("data-days")) || 1); });
      NX.ui.on(el, "click", "[data-act=ics]", function (e, t) { var f = find(t); closeMenus(t); if (f) downloadIcs([f], "nexa-followup-" + f.dueDate + ".ics"); });
      NX.ui.on(el, "click", "[data-act=del]", function (e, t) { var f = find(t); closeMenus(t); if (f) NX.ui.del("followups", f.id); });
      NX.ui.on(el, "click", "[data-act=wa]", function (e, t) {
        var f = find(t); if (!f) return;
        var l = leadOf(f), p = projOf(f);
        if (NX.actions.sendMessage) NX.actions.sendMessage({ lead: l, project: p, channel: "whatsapp" });
        else window.open(NX.phone.wa((l && l.phone) || (p && p.phone)), "_blank");
      });
      NX.ui.on(el, "click", "[data-act=mail]", function (e, t) {
        var f = find(t); if (!f) return;
        var l = leadOf(f);
        if (NX.actions.sendMessage) NX.actions.sendMessage({ lead: l, project: projOf(f), channel: "email" });
        else if (l) location.href = NX.phone.mailto(l.email);
      });
    }
  });

  function closeMenus(t) { var d = t.closest("details"); if (d) d.removeAttribute("open"); }
})();
