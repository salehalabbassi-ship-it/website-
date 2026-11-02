/* NEXA Workspace — Proposals (quotations in SAR with VAT, line items, payment milestones, bilingual PDF)
 * Routes:  #/proposals            list
 *          #/proposals/<id>       detail
 *          #/proposals/<id>/edit  full-page editor
 *          #/proposals/new[/<leadId>]  creates a draft and opens the editor
 * Actions: NX.actions.newProposal(prefill), NX.actions.printProposal(proposal), NX.actions.previewProposal(proposal) */
(function () {
  var esc = NX.esc;

  NX.i18n.add({
    en: {
      "prop.sub": "Quotations in SAR with VAT, milestones and bilingual PDF.",
      "prop.new": "New proposal",
      "prop.searchPh": "Search number, client or title…",
      "prop.kpiOpen": "Open proposals",
      "prop.kpiOpenSub": "{n} sent, awaiting reply",
      "prop.kpiAccepted": "Accepted value",
      "prop.kpiAcceptedSub": "{n} accepted",
      "prop.kpiRate": "Acceptance rate",
      "prop.kpiRateSub": "{a} of {b} sent",
      "prop.kpiDrafts": "Drafts",
      "prop.kpiDraftsSub": "Not sent yet",
      "prop.st.draft": "Draft",
      "prop.st.sent": "Sent",
      "prop.st.accepted": "Accepted",
      "prop.st.rejected": "Rejected",
      "prop.st.expired": "Expired",
      "prop.number": "Number",
      "prop.clientTitle": "Client / title",
      "prop.totalVat": "Total incl. VAT",
      "prop.validUntil": "Valid until",
      "prop.empty": "No proposals match.",
      "prop.emptyAll": "No proposals yet. Create your first quotation.",
      "prop.notFound": "This proposal was not found. It may have been deleted.",
      "prop.backList": "All proposals",
      "prop.backDetail": "Back to proposal",
      "prop.creating": "Creating proposal…",

      "prop.editTitle": "Edit proposal",
      "prop.secClient": "Client",
      "prop.secDetails": "Proposal details",
      "prop.secItems": "Line items",
      "prop.secScope": "Scope & exclusions",
      "prop.secPayments": "Payment milestones",
      "prop.secTerms": "Terms & notes",
      "prop.fromLead": "Client from leads",
      "prop.typeManual": "— Type manually —",
      "prop.leadHint": "Picking a lead fills in the client details.",
      "prop.clientName": "Client name",
      "prop.clientCompany": "Company",
      "prop.title": "Proposal title",
      "prop.titlePh": "e.g. Dental clinic — interior design",
      "prop.date": "Date",
      "prop.lang": "PDF language",
      "prop.langAr": "Arabic",
      "prop.langEn": "English",
      "prop.langBoth": "Both",
      "prop.template": "Start from template",
      "prop.tplPick": "Choose a template…",
      "prop.tplMatch": "For this service",
      "prop.tplOther": "Other templates",
      "prop.tplNone": "No proposal templates yet",
      "prop.tplConfirm": "Replace the current line items, scope, exclusions, payments and terms with the template “{name}”?",
      "prop.tplApplied": "Template applied",
      "prop.replace": "Replace",
      "prop.desc": "Description",
      "prop.descPh": "Item description",
      "prop.qty": "Qty",
      "prop.unit": "Unit",
      "prop.rate": "Rate",
      "prop.lineTotal": "Amount",
      "prop.addItem": "Add item",
      "prop.moveUp": "Move up",
      "prop.moveDown": "Move down",
      "prop.remove": "Remove",
      "prop.noItems": "No items yet — add a line or start from a template.",
      "prop.subtotal": "Subtotal",
      "prop.discount": "Discount",
      "prop.net": "Net",
      "prop.vat": "VAT",
      "prop.vatRate": "VAT %",
      "prop.grand": "Grand total",
      "prop.scope": "Scope of work",
      "prop.exclusions": "Exclusions",
      "prop.onePerLine": "One item per line.",
      "prop.milestone": "Milestone",
      "prop.milestonePh": "e.g. Advance payment",
      "prop.percent": "%",
      "prop.amount": "Amount",
      "prop.addMilestone": "Add milestone",
      "prop.paySum": "Total: {n}%",
      "prop.payWarn": "Milestones add up to {n}% — they should total 100%.",
      "prop.payOk": "Milestones total 100%.",
      "prop.noPayments": "No payment milestones.",
      "prop.terms": "Terms & conditions",
      "prop.termsPh": "Payment terms, delivery time, validity…",
      "prop.notes": "Internal notes",
      "prop.notesHint": "Not printed on the PDF.",
      "prop.saveDraft": "Save draft",
      "prop.preview": "Preview / PDF",
      "prop.unsaved": "Unsaved changes",
      "prop.allSaved": "All changes saved",
      "prop.leaveConfirm": "You have unsaved changes. Leave without saving?",
      "prop.leave": "Leave without saving",
      "prop.restored": "You have unsaved changes from earlier on this proposal.",
      "prop.discard": "Discard changes",
      "prop.dupNumber": "Another proposal already uses the number {n}.",
      "prop.defAdvance": "Advance payment",
      "prop.defDelivery": "On delivery",
      "prop.defTerms": "Prices are in Saudi Riyals (SAR). VAT is added as shown. This quotation is valid until the date stated above.",

      "prop.summary": "Summary",
      "prop.clientInfo": "Client",
      "prop.info": "Details",
      "prop.items": "Items",
      "prop.statusCard": "Status",
      "prop.sentAt": "Sent",
      "prop.preparedBy": "Prepared by",
      "prop.openLead": "Open lead",
      "prop.linkedProject": "Project",
      "prop.sendEmail": "Send by email",
      "prop.sendWa": "Send by WhatsApp",
      "prop.markSent": "Mark as sent",
      "prop.markAccepted": "Mark accepted",
      "prop.markRejected": "Mark rejected",
      "prop.reopen": "Reopen (back to sent)",
      "prop.backToDraft": "Back to draft",
      "prop.duplicate": "Duplicate",
      "prop.duplicated": "Copy created",
      "prop.statusDraftNote": "This proposal hasn't been sent yet.",
      "prop.statusSentNote": "Sent {d}. Waiting for the client's reply.",
      "prop.statusExpiredNote": "Validity ended {d}. Extend it or follow up with the client.",
      "prop.statusAcceptedNote": "Accepted by the client.",
      "prop.statusRejectedNote": "Rejected by the client.",
      "prop.attachTitle": "Attach the PDF",
      "prop.attachBody": "The quotation PDF can't be attached automatically. First click “Save as PDF” and choose “Save as PDF” in the print dialog, then attach the saved file to your {ch} message.",
      "prop.savePdf": "Save as PDF",
      "prop.continueWa": "Continue to WhatsApp",
      "prop.continueEmail": "Continue to email",
      "prop.noPhone": "This proposal has no phone number.",
      "prop.noEmail": "This proposal has no email address.",
      "prop.markedSent": "Marked as sent",
      "prop.fuOffer": "Create a follow-up call in 3 days to check on proposal {n}?",
      "prop.fuTitle": "Follow up on proposal {n}",
      "prop.fuCreate": "Create follow-up",
      "prop.projOffer": "Proposal accepted. Create a project for it now?",
      "prop.projCreate": "Create project",
      "prop.leadWon": "Lead moved to “Won”",
      "prop.leadMoved": "Lead moved to “Proposal sent”",
      "prop.notFoundShort": "Not found",
      "prop.previewTitle": "Preview — {n}",
      "prop.csvName": "proposals",
      "prop.manual": "Manual entry",
      "prop.untitled": "Untitled proposal"
    },
    ar: {
      "prop.sub": "عروض أسعار بالريال مع ضريبة القيمة المضافة ودفعات وملف PDF ثنائي اللغة.",
      "prop.new": "عرض سعر جديد",
      "prop.searchPh": "ابحث برقم العرض أو العميل أو العنوان…",
      "prop.kpiOpen": "العروض المفتوحة",
      "prop.kpiOpenSub": "{n} عرض بانتظار الرد",
      "prop.kpiAccepted": "قيمة العروض المقبولة",
      "prop.kpiAcceptedSub": "{n} عرض مقبول",
      "prop.kpiRate": "نسبة القبول",
      "prop.kpiRateSub": "{a} من {b} عرض مُرسل",
      "prop.kpiDrafts": "المسودات",
      "prop.kpiDraftsSub": "لم تُرسل بعد",
      "prop.st.draft": "مسودة",
      "prop.st.sent": "مُرسل",
      "prop.st.accepted": "مقبول",
      "prop.st.rejected": "مرفوض",
      "prop.st.expired": "منتهي الصلاحية",
      "prop.number": "الرقم",
      "prop.clientTitle": "العميل / العنوان",
      "prop.totalVat": "الإجمالي شامل الضريبة",
      "prop.validUntil": "صالح حتى",
      "prop.empty": "لا توجد عروض مطابقة.",
      "prop.emptyAll": "لا توجد عروض أسعار بعد. أنشئ أول عرض سعر.",
      "prop.notFound": "لم يتم العثور على هذا العرض، ربما تم حذفه.",
      "prop.backList": "جميع العروض",
      "prop.backDetail": "العودة إلى العرض",
      "prop.creating": "جارٍ إنشاء العرض…",

      "prop.editTitle": "تعديل العرض",
      "prop.secClient": "العميل",
      "prop.secDetails": "تفاصيل العرض",
      "prop.secItems": "البنود",
      "prop.secScope": "نطاق العمل والاستثناءات",
      "prop.secPayments": "الدفعات",
      "prop.secTerms": "الشروط والملاحظات",
      "prop.fromLead": "اختر من العملاء المحتملين",
      "prop.typeManual": "— إدخال يدوي —",
      "prop.leadHint": "اختيار العميل يعبّئ بياناته تلقائياً.",
      "prop.clientName": "اسم العميل",
      "prop.clientCompany": "الشركة",
      "prop.title": "عنوان العرض",
      "prop.titlePh": "مثال: عيادة أسنان — تصميم داخلي",
      "prop.date": "التاريخ",
      "prop.lang": "لغة ملف PDF",
      "prop.langAr": "العربية",
      "prop.langEn": "الإنجليزية",
      "prop.langBoth": "ثنائي اللغة",
      "prop.template": "البدء من قالب",
      "prop.tplPick": "اختر قالباً…",
      "prop.tplMatch": "لهذه الخدمة",
      "prop.tplOther": "قوالب أخرى",
      "prop.tplNone": "لا توجد قوالب عروض بعد",
      "prop.tplConfirm": "استبدال البنود ونطاق العمل والاستثناءات والدفعات والشروط الحالية بالقالب «{name}»؟",
      "prop.tplApplied": "تم تطبيق القالب",
      "prop.replace": "استبدال",
      "prop.desc": "الوصف",
      "prop.descPh": "وصف البند",
      "prop.qty": "الكمية",
      "prop.unit": "الوحدة",
      "prop.rate": "سعر الوحدة",
      "prop.lineTotal": "المبلغ",
      "prop.addItem": "إضافة بند",
      "prop.moveUp": "تحريك للأعلى",
      "prop.moveDown": "تحريك للأسفل",
      "prop.remove": "حذف",
      "prop.noItems": "لا توجد بنود بعد — أضف بنداً أو ابدأ من قالب.",
      "prop.subtotal": "المجموع الفرعي",
      "prop.discount": "الخصم",
      "prop.net": "الصافي",
      "prop.vat": "ضريبة القيمة المضافة",
      "prop.vatRate": "نسبة الضريبة %",
      "prop.grand": "الإجمالي النهائي",
      "prop.scope": "نطاق العمل",
      "prop.exclusions": "الاستثناءات",
      "prop.onePerLine": "بند واحد في كل سطر.",
      "prop.milestone": "الدفعة",
      "prop.milestonePh": "مثال: دفعة مقدمة",
      "prop.percent": "%",
      "prop.amount": "المبلغ",
      "prop.addMilestone": "إضافة دفعة",
      "prop.paySum": "المجموع: {n}%",
      "prop.payWarn": "مجموع الدفعات {n}% — يجب أن يكون 100%.",
      "prop.payOk": "مجموع الدفعات 100%.",
      "prop.noPayments": "لا توجد دفعات.",
      "prop.terms": "الشروط والأحكام",
      "prop.termsPh": "شروط الدفع، مدة التنفيذ، صلاحية العرض…",
      "prop.notes": "ملاحظات داخلية",
      "prop.notesHint": "لا تظهر في ملف PDF.",
      "prop.saveDraft": "حفظ المسودة",
      "prop.preview": "معاينة / PDF",
      "prop.unsaved": "تغييرات غير محفوظة",
      "prop.allSaved": "تم حفظ كل التغييرات",
      "prop.leaveConfirm": "لديك تغييرات غير محفوظة. هل تريد المغادرة دون حفظ؟",
      "prop.leave": "مغادرة دون حفظ",
      "prop.restored": "لديك تغييرات سابقة غير محفوظة على هذا العرض.",
      "prop.discard": "تجاهل التغييرات",
      "prop.dupNumber": "الرقم {n} مستخدم في عرض آخر.",
      "prop.defAdvance": "دفعة مقدمة",
      "prop.defDelivery": "عند التسليم",
      "prop.defTerms": "الأسعار بالريال السعودي، وتُضاف ضريبة القيمة المضافة كما هو موضح. هذا العرض صالح حتى التاريخ المذكور أعلاه.",

      "prop.summary": "الملخص",
      "prop.clientInfo": "العميل",
      "prop.info": "التفاصيل",
      "prop.items": "البنود",
      "prop.statusCard": "الحالة",
      "prop.sentAt": "تاريخ الإرسال",
      "prop.preparedBy": "أعدّه",
      "prop.openLead": "فتح العميل",
      "prop.linkedProject": "المشروع",
      "prop.sendEmail": "إرسال بالبريد",
      "prop.sendWa": "إرسال عبر واتساب",
      "prop.markSent": "تحديد كمُرسل",
      "prop.markAccepted": "تم القبول",
      "prop.markRejected": "تم الرفض",
      "prop.reopen": "إعادة فتح (مُرسل)",
      "prop.backToDraft": "إرجاع إلى مسودة",
      "prop.duplicate": "نسخ العرض",
      "prop.duplicated": "تم إنشاء نسخة",
      "prop.statusDraftNote": "لم يُرسل هذا العرض بعد.",
      "prop.statusSentNote": "أُرسل {d}. بانتظار رد العميل.",
      "prop.statusExpiredNote": "انتهت الصلاحية {d}. مدّد الصلاحية أو تابع مع العميل.",
      "prop.statusAcceptedNote": "وافق العميل على العرض.",
      "prop.statusRejectedNote": "رفض العميل العرض.",
      "prop.attachTitle": "إرفاق ملف PDF",
      "prop.attachBody": "لا يمكن إرفاق ملف العرض تلقائياً. اضغط أولاً «حفظ كملف PDF» واختر «حفظ بتنسيق PDF» في نافذة الطباعة، ثم أرفق الملف المحفوظ في رسالة {ch}.",
      "prop.savePdf": "حفظ كملف PDF",
      "prop.continueWa": "متابعة إلى واتساب",
      "prop.continueEmail": "متابعة إلى البريد",
      "prop.noPhone": "لا يوجد رقم جوال لهذا العرض.",
      "prop.noEmail": "لا يوجد بريد إلكتروني لهذا العرض.",
      "prop.markedSent": "تم تحديده كمُرسل",
      "prop.fuOffer": "إنشاء متابعة اتصال بعد 3 أيام بخصوص العرض {n}؟",
      "prop.fuTitle": "متابعة عرض السعر {n}",
      "prop.fuCreate": "إنشاء متابعة",
      "prop.projOffer": "تم قبول العرض. هل تريد إنشاء مشروع له الآن؟",
      "prop.projCreate": "إنشاء مشروع",
      "prop.leadWon": "تم نقل العميل إلى «تم الفوز»",
      "prop.leadMoved": "تم نقل العميل إلى «تم إرسال العرض»",
      "prop.notFoundShort": "غير موجود",
      "prop.previewTitle": "معاينة — {n}",
      "prop.csvName": "عروض-الأسعار",
      "prop.manual": "إدخال يدوي",
      "prop.untitled": "عرض بدون عنوان"
    }
  });

  /* ---------- Helpers ---------- */
  var STATUS_TONE = { draft: "gray", sent: "blue", accepted: "green", rejected: "red", expired: "amber" };
  var UNITS = ["LS", "m²", "m", "visit", "month", "item", "lot"];

  function settings() { return NX.store.settings; }
  function clone(o) { return JSON.parse(JSON.stringify(o || {})); }
  function today() { return NX.fmt.today(); }
  /* Parse numbers typed with Latin or Arabic-Indic digits, commas, Arabic decimal separator. */
  function num(v) {
    if (typeof v === "number") return isFinite(v) ? v : 0;
    var s = String(v == null ? "" : v)
      .replace(/[٠-٩]/g, function (d) { return String(d.charCodeAt(0) - 0x0660); })
      .replace(/[۰-۹]/g, function (d) { return String(d.charCodeAt(0) - 0x06F0); })
      .replace(/٫/g, ".").replace(/[,\s٬]/g, "");
    var n = parseFloat(s);
    return isNaN(n) ? 0 : n;
  }
  function m2(n) { return (Number(n) || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function money(n) { return NX.fmt.money(n, { decimals: true }); }
  function effStatus(p) {
    var s = p.status || "draft";
    if (s === "sent" && p.validUntil && p.validUntil < today()) return "expired";
    return s;
  }
  function statusBadge(p) { var s = effStatus(p); return NX.ui.badge(NX.t("prop.st." + s), STATUS_TONE[s]); }
  function totals(p) { return NX.calc.proposal(p); }
  function leadOf(p) { return p && p.leadId ? NX.store.get("leads", p.leadId) : null; }
  function stageIndex(id) { return NX.list("stages").findIndex(function (s) { return s.id === id; }); }
  function wonStage() { var s = NX.list("stages").find(function (x) { return x.won; }); return s ? s.id : "won"; }
  function lines(text) { return String(text || "").split(/\r?\n/).map(function (s) { return s.replace(/^\s*[-•·*]\s*/, "").trim(); }).filter(Boolean); }
  function proposalTemplates() { return NX.store.where("templates", function (t) { return t.kind === "proposal"; }); }
  function isOpen(p) { return effStatus(p) === "sent"; }
  function svcLabel(id) { return id ? NX.opt("services", id) : ""; }
  /* Run fn once every modal is closed (e.g. after the message composer). */
  function whenModalsClosed(fn) {
    var host = document.getElementById("nx-modals");
    if (!host || !host.children.length) { setTimeout(fn, 120); return; }
    var obs = new MutationObserver(function () {
      if (!host.children.length) { obs.disconnect(); setTimeout(fn, 200); }
    });
    obs.observe(host, { childList: true });
  }
  function confirmAsk(msg, okLabel) { return NX.ui.confirm(msg, { okLabel: okLabel }); }

  /* ---------- Module state (survives re-renders) ---------- */
  var listState = { status: "all", q: "" };
  var ed = null; // { id, draft, dirty, restored }
  var creating = false;

  // Leaving the editor some other way (sidebar, search…) keeps the draft; show a note when the user comes back.
  window.addEventListener("hashchange", function () {
    if (ed && ed.dirty && location.hash !== "#/proposals/" + ed.id + "/edit") ed.restored = true;
  });
  window.addEventListener("beforeunload", function (e) {
    if (ed && ed.dirty) { e.preventDefault(); e.returnValue = ""; }
  });

  /* ---------- New proposal ---------- */
  function blankProposal(prefill) {
    prefill = prefill || {};
    var s = settings();
    var date = today();
    var p = {
      number: NX.store.nextNumber("proposals", "number", s.proposalPrefix || "NX"),
      leadId: "", client: "", clientCompany: "", phone: "", email: "",
      title: "", service: "", date: date,
      validUntil: NX.fmt.addDays(date, Number(s.proposalValidityDays) || 30),
      lang: "both",
      items: [{ desc: "", qty: 1, unit: "LS", rate: 0 }],
      discount: 0, vatRate: Number(s.vatRate),
      scope: "", exclusions: "",
      payments: [{ label: NX.t("prop.defAdvance"), percent: 50 }, { label: NX.t("prop.defDelivery"), percent: 50 }],
      terms: NX.t("prop.defTerms"),
      status: "draft", sentAt: "", notes: "", templateId: ""
    };
    var lead = prefill.leadId ? NX.store.get("leads", prefill.leadId) : null;
    if (lead) applyLead(p, lead);
    var tpl = prefill.templateId ? NX.store.get("templates", prefill.templateId) : null;
    if (tpl) applyTemplate(p, tpl);
    ["title", "service", "client", "clientCompany", "phone", "email", "lang", "notes"].forEach(function (k) { if (prefill[k]) p[k] = prefill[k]; });
    return p;
  }
  function svcName(id, l) {
    var o = (settings().services || []).find(function (x) { return x.id === id; });
    return o ? (l === "ar" ? o.ar : o.en) : "";
  }
  function applyLead(p, lead) {
    if (!p.title && lead.service) p.title = NX.opt("services", lead.service) + " — " + (lead.company || lead.name || "");
    p.leadId = lead.id;
    p.client = lead.name || "";
    p.clientCompany = lead.company || "";
    p.phone = lead.phone || "";
    p.email = lead.email || "";
    if (lead.service) p.service = lead.service;
  }
  function applyTemplate(p, tpl) {
    var d = clone(tpl.data || {});
    p.items = (d.items || []).map(function (it) { return { desc: it.desc || "", qty: num(it.qty == null ? 1 : it.qty), unit: it.unit || "", rate: num(it.rate) }; });
    if (!p.items.length) p.items = [{ desc: "", qty: 1, unit: "LS", rate: 0 }];
    p.scope = d.scope || "";
    p.exclusions = d.exclusions || "";
    p.payments = (d.payments || []).map(function (x) { return { label: x.label || "", percent: num(x.percent) }; });
    if (d.terms) p.terms = d.terms;
    if (tpl.service && !p.service) p.service = tpl.service;
    if (tpl.lang && /^(ar|en|both)$/.test(tpl.lang)) p.lang = tpl.lang;
    p.templateId = tpl.id;
  }

  NX.actions.newProposal = function (prefill) {
    if (creating) return Promise.resolve(null);
    creating = true;
    var rec = blankProposal(prefill);
    return NX.ui.run(NX.store.save("proposals", rec), false).then(function (saved) {
      creating = false;
      ed = { id: saved.id, draft: clone(saved), dirty: false };
      NX.go("proposals/" + saved.id + "/edit");
      return saved;
    }, function (err) { creating = false; throw err; });
  };

  /* ---------- Status changes ---------- */
  function saveProposal(p, changes, msg) {
    return NX.ui.run(NX.store.save("proposals", Object.assign({}, p, changes)), msg);
  }

  function markSent(p) {
    var wasDraft = (p.status || "draft") === "draft";
    var changes = { status: "sent" };
    if (wasDraft || !p.sentAt) changes.sentAt = new Date().toISOString();
    return saveProposal(p, changes, NX.t("prop.markedSent")).then(function (saved) {
      var lead = leadOf(saved);
      var chain = Promise.resolve();
      if (lead) {
        var li = stageIndex(lead.stage), pi = stageIndex("proposal");
        var stage = NX.list("stages")[li];
        if (pi > -1 && (li < pi) && !(stage && stage.closed)) {
          chain = NX.ui.run(NX.store.save("leads", Object.assign({}, lead, { stage: "proposal" })), NX.t("prop.leadMoved"));
        }
      }
      return chain.then(function () {
        if (wasDraft && saved.leadId && NX.actions.newFollowup) {
          whenModalsClosed(function () {
            confirmAsk(NX.t("prop.fuOffer", { n: saved.number }), NX.t("prop.fuCreate")).then(function (ok) {
              if (ok) NX.actions.newFollowup({ leadId: saved.leadId, title: NX.t("prop.fuTitle", { n: saved.number }), type: "call", dueDate: NX.fmt.addDays(today(), 3) });
            });
          });
        }
        return saved;
      });
    });
  }

  function markAccepted(p) {
    return saveProposal(p, { status: "accepted", acceptedAt: new Date().toISOString(), sentAt: p.sentAt || new Date().toISOString() }).then(function (saved) {
      var lead = leadOf(saved);
      var won = wonStage();
      var chain = Promise.resolve();
      if (lead && lead.stage !== won) {
        var changes = { stage: won };
        if (!lead.value) changes.value = Math.round(totals(saved).net);
        chain = NX.ui.run(NX.store.save("leads", Object.assign({}, lead, changes)), NX.t("prop.leadWon"));
      }
      return chain.then(function () {
        var hasProject = NX.store.where("projects", function (x) { return x.proposalId === saved.id; }).length > 0;
        if (!hasProject && NX.actions.newProject) {
          whenModalsClosed(function () {
            confirmAsk(NX.t("prop.projOffer"), NX.t("prop.projCreate")).then(function (ok) {
              if (ok) NX.actions.newProject({ leadId: saved.leadId, proposalId: saved.id });
            });
          });
        }
        return saved;
      });
    });
  }

  /* Fallback message text when the conversations module isn't available. */
  var MSG = {
    en: "Hello {name},\n\nPlease find attached our quotation {number}{title}.\nTotal: {total} SAR (incl. VAT), valid until {valid}.\n\nBest regards,\n{me}\n{company}\n{phone}",
    ar: "مرحباً {name}،\n\nنرفق لكم عرض السعر رقم {number}{title}.\nالإجمالي: {total} ريال (شامل الضريبة)، والعرض صالح حتى {valid}.\n\nمع التحية،\n{me}\n{company}\n{phone}"
  };
  function fallbackText(p) {
    var l = p.lang === "ar" ? "ar" : p.lang === "en" ? "en" : (NX.i18n.isAr ? "ar" : "en");
    var c = settings().company, me = NX.store.session || {};
    var title = p.title || svcName(p.service, l);
    var vx = NX.fmt.toDate(p.validUntil);
    var valid = !vx ? "—" : l === "ar" ? vx.toLocaleDateString("ar-SA-u-nu-latn-ca-gregory", { day: "numeric", month: "long", year: "numeric" }) : vx.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    var vars = { name: p.client || "", number: p.number || "", title: title ? (l === "ar" ? " بخصوص " : " for ") + title : "", total: m2(totals(p).total), valid: valid, me: me.name || "", company: l === "ar" ? c.nameAr : c.nameEn, phone: c.phone || "" };
    var s = MSG[l];
    Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return { text: s, subject: (l === "ar" ? "عرض سعر " : "Quotation ") + (p.number || "") + (p.title ? " — " + p.title : "") };
  }

  function sendProposal(p, channel) {
    if (channel === "whatsapp" && !p.phone && !(leadOf(p) || {}).phone) { NX.ui.toast(NX.t("prop.noPhone"), "error"); return; }
    if (channel === "email" && !p.email && !(leadOf(p) || {}).email) { NX.ui.toast(NX.t("prop.noEmail"), "error"); return; }
    var chName = channel === "whatsapp" ? NX.t("c.whatsapp") : NX.t("c.sendEmail");
    NX.ui.modal({
      title: NX.t("prop.attachTitle"), size: "sm",
      body: '<div class="pr-attach">' + NX.icon(channel === "whatsapp" ? "whatsapp" : "mail", 28) + "<p>" + esc(NX.t("prop.attachBody", { ch: chName })) + "</p></div>",
      footer: NX.ui.btn({ label: NX.t("prop.savePdf"), icon: "download", act: "pdf", cls: "ghost" }),
      submitLabel: channel === "whatsapp" ? NX.t("prop.continueWa") : NX.t("prop.continueEmail"),
      onOpen: function (formEl) {
        NX.ui.on(formEl, "click", "[data-act=pdf]", function () { NX.actions.printProposal(p); });
        var sb = formEl.querySelector("[type=submit]");
        if (sb && channel === "whatsapp") sb.className = "nx-btn nx-btn-wa";
      },
      onSubmit: function () { setTimeout(function () { doSend(p, channel); }, 50); }
    });
  }

  function doSend(p, channel) {
    var lead = leadOf(p);
    var after = function (res) {
      if (res === false) return;
      var fresh = NX.store.get("proposals", p.id) || p;
      var st = fresh.status || "draft";
      if (st === "draft" || st === "sent") markSent(fresh);
    };
    if (NX.actions.sendMessage) {
      var r = NX.actions.sendMessage({ proposal: p, lead: lead || undefined, channel: channel });
      if (r && typeof r.then === "function") { r.then(after, function () {}); return; }
      var form = r && r.el;
      if (!form || !form.querySelector) { after(true); return; }
      // Pre-fill the composer (number + total) when no template text is there yet.
      var fb = fallbackText(p);
      var bodyEl = form.querySelector('[name="body"]'), subjEl = form.querySelector('[name="subject"]');
      if (bodyEl && !bodyEl.value) bodyEl.value = fb.text;
      if (subjEl && !subjEl.value) subjEl.value = fb.subject;
      // Mark as sent only when the composer is submitted and closes (not when cancelled).
      var submitted = false;
      form.addEventListener("submit", function () { submitted = true; });
      form.addEventListener("click", function (e) { if (e.target.closest("[data-close]")) submitted = false; });
      var host = document.getElementById("nx-modals");
      var obs = new MutationObserver(function () {
        if (document.body.contains(form)) return;
        obs.disconnect();
        if (submitted) after(true);
      });
      obs.observe(host, { childList: true, subtree: true });
      return;
    }
    var m = fallbackText(p);
    if (channel === "whatsapp") window.open(NX.phone.wa(p.phone || (lead && lead.phone), m.text), "_blank");
    else window.open(NX.phone.mailto(p.email || (lead && lead.email), m.subject, m.text), "_blank");
    if (p.leadId) {
      NX.store.save("conversations", { leadId: p.leadId, channel: channel, direction: "out", date: new Date().toISOString(), summary: m.subject, by: (NX.store.session || {}).email || "" }).catch(function () {});
    }
    after(true);
  }

  function duplicate(p) {
    var s = settings();
    var c = clone(p);
    ["id", "createdAt", "updatedAt", "createdBy", "sentAt", "acceptedAt", "rejectedAt"].forEach(function (k) { delete c[k]; });
    c.number = NX.store.nextNumber("proposals", "number", s.proposalPrefix || "NX");
    c.status = "draft";
    c.date = today();
    c.validUntil = NX.fmt.addDays(c.date, Number(s.proposalValidityDays) || 30);
    return NX.ui.run(NX.store.save("proposals", c), NX.t("prop.duplicated")).then(function (saved) {
      ed = { id: saved.id, draft: clone(saved), dirty: false };
      NX.go("proposals/" + saved.id + "/edit");
    });
  }

  /* ================= LIST ================= */
  function renderList(el) {
    var all = NX.store.all("proposals");
    var q = listState.q.trim().toLowerCase();
    var counts = { all: all.length, draft: 0, sent: 0, accepted: 0, rejected: 0, expired: 0 };
    var openVal = 0, accVal = 0, accN = 0, sentN = 0, openN = 0;
    all.forEach(function (p) {
      var s = effStatus(p);
      counts[s] = (counts[s] || 0) + 1;
      var tot = totals(p).total;
      if (s === "sent") { openVal += tot; openN++; }
      if (s === "accepted") { accVal += tot; accN++; }
      if (s !== "draft") sentN++;
    });
    var rate = sentN ? Math.round(100 * accN / sentN) : 0;

    var rows = all.filter(function (p) {
      if (listState.status !== "all" && effStatus(p) !== listState.status) return false;
      if (!q) return true;
      return [p.number, p.client, p.clientCompany, p.title].some(function (v) { return String(v || "").toLowerCase().indexOf(q) > -1; });
    }).slice().sort(function (a, b) {
      return String(b.date || "").localeCompare(String(a.date || "")) || String(b.number || "").localeCompare(String(a.number || ""));
    });

    var kpis = '<div class="nx-grid-4 pr-kpis">' +
      NX.ui.kpi({ label: NX.t("prop.kpiOpen"), value: '<span class="nx-num">' + esc(NX.fmt.compact(openVal)) + '</span> <small class="pr-cur">' + esc(NX.t("c.sar")) + "</small>", sub: esc(NX.t("prop.kpiOpenSub", { n: openN })), icon: "send", tone: "dark" }) +
      NX.ui.kpi({ label: NX.t("prop.kpiAccepted"), value: '<span class="nx-num">' + esc(NX.fmt.compact(accVal)) + '</span> <small class="pr-cur">' + esc(NX.t("c.sar")) + "</small>", sub: esc(NX.t("prop.kpiAcceptedSub", { n: accN })), icon: "check" }) +
      NX.ui.kpi({ label: NX.t("prop.kpiRate"), value: '<span class="nx-num">' + rate + "%</span>", sub: esc(NX.t("prop.kpiRateSub", { a: accN, b: sentN })), icon: "analysis" }) +
      NX.ui.kpi({ label: NX.t("prop.kpiDrafts"), value: '<span class="nx-num">' + (counts.draft || 0) + "</span>", sub: esc(NX.t("prop.kpiDraftsSub")), icon: "edit" }) +
      "</div>";

    var chipItems = [{ value: "all", label: NX.t("c.all"), count: counts.all }].concat(["draft", "sent", "accepted", "rejected", "expired"].map(function (s) {
      return { value: s, label: NX.t("prop.st." + s), count: counts[s] || 0 };
    }));

    var table = NX.ui.table({
      rows: rows,
      empty: all.length ? NX.t("prop.empty") : NX.t("prop.emptyAll"),
      rowAttr: function (p) { return 'data-href="#/proposals/' + esc(p.id) + '"'; },
      cols: [
        { label: NX.t("prop.number"), cls: "pr-c-num", render: function (p) { return '<span class="nx-num pr-numtag">' + esc(p.number || "—") + '</span><span class="pr-m-badge">' + statusBadge(p) + "</span>"; } },
        { label: NX.t("prop.clientTitle"), cls: "pr-c-client", render: function (p) {
          return '<span class="nx-cell-title" dir="auto">' + esc(p.client || p.clientCompany || NX.t("c.none")) + (p.client && p.clientCompany ? ' <span class="pr-co">· ' + esc(p.clientCompany) + "</span>" : "") + '</span><span class="nx-cell-sub" dir="auto">' + esc(p.title || NX.t("prop.untitled")) + "</span>";
        } },
        { label: NX.t("c.service"), cls: "pr-c-svc", render: function (p) { return esc(svcLabel(p.service) || NX.t("c.none")); } },
        { label: NX.t("c.date"), cls: "nx-nowrap", render: function (p) { return esc(NX.fmt.date(p.date)); } },
        { label: NX.t("prop.totalVat"), cls: "nx-right nx-nowrap", render: function (p) { return '<span class="nx-num pr-amt">' + esc(money(totals(p).total)) + "</span>"; } },
        { label: NX.t("c.status"), cls: "pr-c-status", render: function (p) { return statusBadge(p); } },
        { label: NX.t("prop.validUntil"), cls: "nx-nowrap", render: function (p) {
          var exp = effStatus(p) === "expired";
          return '<span class="' + (exp ? "pr-expired" : "") + '">' + esc(NX.fmt.date(p.validUntil) || NX.t("c.none")) + "</span>";
        } }
      ]
    });

    el.innerHTML =
      NX.ui.pageHead({
        title: NX.t("nav.proposals"), sub: esc(NX.t("prop.sub")),
        actions: NX.ui.btn({ label: NX.t("c.export"), icon: "download", act: "csv", cls: "ghost" }) +
          NX.ui.btn({ label: NX.t("prop.new"), icon: "plus", act: "new", cls: "primary" })
      }) +
      kpis +
      '<div class="nx-toolbar pr-toolbar">' + NX.ui.searchBox(listState.q, NX.t("prop.searchPh")) + NX.ui.chips(chipItems, listState.status, "status") + "</div>" +
      '<section class="nx-card pr-list-card">' + table + "</section>";

    NX.ui.on(el, "input", "[data-search]", function (e, t) { listState.q = t.value; NX.app.rerender(); });
    NX.ui.on(el, "click", "[data-status]", function (e, t) { listState.status = t.getAttribute("data-status"); NX.app.rerender(); });
    NX.ui.on(el, "click", "tr[data-href]", function (e, t) { location.hash = t.getAttribute("data-href"); });
    NX.ui.on(el, "click", "[data-act=new]", function () { NX.actions.newProposal({}); });
    NX.ui.on(el, "click", "[data-act=csv]", function () { exportCsv(rows); });
  }

  function exportCsv(rows) {
    var cols = [
      { label: "Number", key: "number" },
      { label: "Date", key: "date" },
      { label: "Valid until", key: "validUntil" },
      { label: "Status", value: function (p) { return effStatus(p); } },
      { label: "Client", key: "client" },
      { label: "Company", key: "clientCompany" },
      { label: "Phone", key: "phone" },
      { label: "Email", key: "email" },
      { label: "Title", key: "title" },
      { label: "Service", value: function (p) { return svcLabel(p.service); } },
      { label: "Language", key: "lang" },
      { label: "Subtotal", value: function (p) { return totals(p).subtotal.toFixed(2); } },
      { label: "Discount", value: function (p) { return totals(p).discount.toFixed(2); } },
      { label: "Net", value: function (p) { return totals(p).net.toFixed(2); } },
      { label: "VAT %", value: function (p) { return totals(p).vatRate; } },
      { label: "VAT", value: function (p) { return totals(p).vat.toFixed(2); } },
      { label: "Total incl. VAT", value: function (p) { return totals(p).total.toFixed(2); } },
      { label: "Sent at", key: "sentAt" }
    ];
    NX.ui.download(NX.t("prop.csvName") + "-" + today() + ".csv", NX.ui.csv(rows, cols), "text/csv;charset=utf-8");
  }

  /* ================= DETAIL ================= */
  function totalsBlock(p) {
    var c = totals(p);
    return '<div class="pr-totals">' +
      '<div><span>' + esc(NX.t("prop.subtotal")) + '</span><b class="nx-num">' + esc(money(c.subtotal)) + "</b></div>" +
      (c.discount ? '<div><span>' + esc(NX.t("prop.discount")) + '</span><b class="nx-num"><bdi dir="ltr">−' + esc(m2(c.discount)) + "</bdi> " + esc(NX.t("c.sar")) + "</b></div>" +
        '<div><span>' + esc(NX.t("prop.net")) + '</span><b class="nx-num">' + esc(money(c.net)) + "</b></div>" : "") +
      '<div><span>' + esc(NX.t("prop.vat")) + ' <span class="nx-num">(' + esc(NX.fmt.num(c.vatRate)) + '%)</span></span><b class="nx-num">' + esc(money(c.vat)) + "</b></div>" +
      '<div class="pr-grand"><span>' + esc(NX.t("prop.grand")) + '</span><b class="nx-num">' + esc(money(c.total)) + "</b></div>" +
      "</div>";
  }

  function bulletList(text) {
    var ls = lines(text);
    if (!ls.length) return '<p class="nx-muted">' + esc(NX.t("c.none")) + "</p>";
    return '<ul class="pr-bullets">' + ls.map(function (l) { return '<li dir="auto">' + esc(l) + "</li>"; }).join("") + "</ul>";
  }

  function renderDetail(el, id) {
    var p = NX.store.get("proposals", id);
    if (!p) {
      el.innerHTML = '<a class="nx-back" href="#/proposals">' + NX.icon("back", 16) + esc(NX.t("prop.backList")) + "</a>" + NX.ui.card("", NX.ui.empty(NX.t("prop.notFound")));
      return;
    }
    var st = effStatus(p);
    var c = totals(p);
    var lead = leadOf(p);
    var projects = NX.store.where("projects", function (x) { return x.proposalId === p.id; });

    var head = NX.ui.pageHead({
      title: p.number || NX.t("prop.untitled"),
      sub: statusBadge(p) + " " + esc(p.title || ""),
      actions:
        NX.ui.btn({ label: NX.t("c.edit"), icon: "edit", act: "edit", cls: "ghost" }) +
        NX.ui.btn({ label: NX.t("c.print"), icon: "print", act: "print", cls: "ghost" }) +
        NX.ui.btn({ label: NX.t("prop.sendEmail"), icon: "mail", act: "email", cls: "ghost" }) +
        NX.ui.btn({ label: NX.t("prop.sendWa"), icon: "whatsapp", act: "wa", cls: "wa" })
    });

    var itemsTable = NX.ui.table({
      rows: (p.items || []).filter(function (it) { return it.desc || num(it.rate); }),
      empty: NX.t("prop.noItems"),
      cols: [
        { label: NX.t("prop.desc"), cls: "pr-d-desc", render: function (it) { return '<span class="nx-pre" dir="auto">' + esc(it.desc || NX.t("c.none")) + "</span>"; } },
        { label: NX.t("prop.qty"), cls: "nx-right", render: function (it) { return '<span class="nx-num">' + esc(NX.fmt.num(it.qty)) + "</span>"; } },
        { label: NX.t("prop.unit"), render: function (it) { return esc(it.unit || ""); } },
        { label: NX.t("prop.rate"), cls: "nx-right nx-nowrap", render: function (it) { return '<span class="nx-num">' + esc(m2(it.rate)) + "</span>"; } },
        { label: NX.t("prop.lineTotal"), cls: "nx-right nx-nowrap", render: function (it) { return '<span class="nx-num"><b>' + esc(m2(num(it.qty) * num(it.rate))) + "</b></span>"; } }
      ]
    });

    var pays = (p.payments || []);
    var paySum = pays.reduce(function (s, x) { return s + num(x.percent); }, 0);
    var payHtml = pays.length ? '<ul class="nx-list pr-pay-list">' + pays.map(function (x, i) {
      return '<li><span class="pr-pay-n nx-num">' + (i + 1) + '</span><div class="nx-list-main"><b dir="auto">' + esc(x.label || NX.t("prop.milestone")) + '</b></div><span class="nx-num pr-pay-pct">' + esc(NX.fmt.num(x.percent)) + '%</span><span class="nx-num pr-pay-amt">' + esc(money(c.total * num(x.percent) / 100)) + "</span></li>";
    }).join("") + "</ul>" + (Math.abs(paySum - 100) > 0.001 ? '<div class="pr-warn">' + esc(NX.t("prop.payWarn", { n: NX.fmt.num(paySum) })) + "</div>" : "")
      : '<div class="nx-card-body"><p class="nx-muted">' + esc(NX.t("prop.noPayments")) + "</p></div>";

    var main =
      NX.ui.card(NX.t("prop.items"), itemsTable + '<div class="pr-totals-wrap">' + totalsBlock(p) + "</div>", { flush: true }) +
      NX.ui.card(NX.t("prop.secScope"), '<div class="nx-grid-2"><div><h3 class="pr-h3">' + esc(NX.t("prop.scope")) + "</h3>" + bulletList(p.scope) + '</div><div><h3 class="pr-h3">' + esc(NX.t("prop.exclusions")) + "</h3>" + bulletList(p.exclusions) + "</div></div>") +
      NX.ui.card(NX.t("prop.secPayments"), payHtml, { flush: true }) +
      ((p.terms || p.notes) ? NX.ui.card(NX.t("prop.secTerms"),
        (p.terms ? '<h3 class="pr-h3">' + esc(NX.t("prop.terms")) + '</h3><p class="nx-pre" dir="auto">' + esc(p.terms) + "</p>" : "") +
        (p.notes ? '<h3 class="pr-h3' + (p.terms ? " pr-mt" : "") + '">' + esc(NX.t("prop.notes")) + '</h3><div class="nx-note-box nx-pre" dir="auto">' + esc(p.notes) + "</div>" : "")) : "");

    // Status card
    var note = st === "draft" ? NX.t("prop.statusDraftNote")
      : st === "sent" ? NX.t("prop.statusSentNote", { d: NX.fmt.rel(p.sentAt) || NX.fmt.date(p.sentAt) })
      : st === "expired" ? NX.t("prop.statusExpiredNote", { d: NX.fmt.date(p.validUntil) })
      : st === "accepted" ? NX.t("prop.statusAcceptedNote") : NX.t("prop.statusRejectedNote");
    var sbtns = [];
    if (st === "draft") sbtns.push(NX.ui.btn({ label: NX.t("prop.markSent"), icon: "send", act: "mark-sent", cls: "primary" }));
    if (st === "sent" || st === "expired" || st === "draft") {
      sbtns.push(NX.ui.btn({ label: NX.t("prop.markAccepted"), icon: "check", act: "mark-accepted", cls: "ghost pr-ok" }));
      sbtns.push(NX.ui.btn({ label: NX.t("prop.markRejected"), icon: "close", act: "mark-rejected", cls: "ghost pr-no" }));
    }
    if (st === "accepted" || st === "rejected") sbtns.push(NX.ui.btn({ label: NX.t("prop.reopen"), icon: "refresh", act: "reopen", cls: "ghost" }));
    if (st === "sent" || st === "expired") sbtns.push(NX.ui.btn({ label: NX.t("prop.backToDraft"), icon: "edit", act: "to-draft", cls: "ghost sm" }));
    var statusCard = NX.ui.card(NX.t("prop.statusCard"),
      '<div class="pr-status-top">' + statusBadge(p) + '<span class="nx-num pr-status-total">' + esc(money(c.total)) + "</span></div>" +
      '<p class="nx-muted nx-small pr-status-note">' + esc(note) + "</p>" +
      '<div class="pr-status-btns">' + sbtns.join("") + "</div>");

    var phone = p.phone || (lead && lead.phone);
    var email = p.email || (lead && lead.email);
    var clientCard = NX.ui.card(NX.t("prop.clientInfo"),
      '<div class="pr-client-head">' + NX.ui.avatar(p.client || p.clientCompany) + '<div><b>' + esc(p.client || NX.t("c.none")) + "</b>" + (p.clientCompany ? "<small>" + esc(p.clientCompany) + "</small>" : "") + "</div></div>" +
      NX.ui.dl([
        [NX.t("c.phone"), phone ? '<a class="nx-num" dir="ltr" href="' + esc(NX.phone.tel(phone)) + '">' + esc(phone) + "</a>" : ""],
        [NX.t("c.email"), email ? '<a dir="ltr" href="mailto:' + esc(email) + '">' + esc(email) + "</a>" : ""]
      ]) +
      '<div class="nx-row pr-client-links">' +
      (phone ? NX.ui.btn({ label: NX.t("c.call"), icon: "phone", href: NX.phone.tel(phone), cls: "ghost sm" }) + NX.ui.btn({ label: NX.t("c.whatsapp"), icon: "whatsapp", href: NX.phone.wa(phone), external: true, cls: "ghost sm" }) : "") +
      (lead ? NX.ui.btn({ label: NX.t("prop.openLead"), icon: "leads", href: "#/leads/" + lead.id, cls: "ghost sm" }) : "") +
      "</div>");

    var langLbl = { ar: NX.t("prop.langAr"), en: NX.t("prop.langEn"), both: NX.t("prop.langBoth") }[p.lang || "both"];
    var infoCard = NX.ui.card(NX.t("prop.info"), NX.ui.dl([
      [NX.t("c.service"), esc(svcLabel(p.service))],
      [NX.t("c.date"), esc(NX.fmt.date(p.date))],
      [NX.t("prop.validUntil"), '<span class="' + (st === "expired" ? "pr-expired" : "") + '">' + esc(NX.fmt.date(p.validUntil)) + "</span>"],
      [NX.t("prop.lang"), esc(langLbl)],
      [NX.t("prop.sentAt"), p.sentAt ? esc(NX.fmt.date(p.sentAt)) : ""],
      [NX.t("prop.preparedBy"), esc(NX.userName(p.createdBy))],
      [NX.t("prop.linkedProject"), projects.map(function (j) { return '<a class="nx-link" href="#/projects/' + esc(j.id) + '">' + esc(j.code || j.name) + "</a>"; }).join(" ")]
    ]) + '<div class="nx-row pr-info-btns">' +
      NX.ui.btn({ label: NX.t("prop.duplicate"), icon: "copy", act: "dup", cls: "ghost sm" }) +
      (NX.store.isAdmin() ? NX.ui.btn({ label: NX.t("c.delete"), icon: "trash", act: "del", cls: "ghost sm pr-no" }) : "") +
      "</div>");

    el.innerHTML =
      '<a class="nx-back" href="#/proposals">' + NX.icon("back", 16) + esc(NX.t("prop.backList")) + "</a>" +
      head +
      '<div class="nx-split pr-detail"><div class="nx-stack"><div class="pr-status-m">' + statusCard + "</div>" + main + '</div><div class="nx-stack pr-side"><div class="pr-status-d">' + statusCard + "</div>" + clientCard + infoCard + "</div></div>";

    var cur = function () { return NX.store.get("proposals", id) || p; };
    NX.ui.on(el, "click", "[data-act=edit]", function () { NX.go("proposals/" + id + "/edit"); });
    NX.ui.on(el, "click", "[data-act=print]", function () { NX.actions.printProposal(cur()); });
    NX.ui.on(el, "click", "[data-act=email]", function () { sendProposal(cur(), "email"); });
    NX.ui.on(el, "click", "[data-act=wa]", function () { sendProposal(cur(), "whatsapp"); });
    NX.ui.on(el, "click", "[data-act=mark-sent]", function () { markSent(cur()); });
    NX.ui.on(el, "click", "[data-act=mark-accepted]", function () { markAccepted(cur()); });
    NX.ui.on(el, "click", "[data-act=mark-rejected]", function () { saveProposal(cur(), { status: "rejected", rejectedAt: new Date().toISOString() }); });
    NX.ui.on(el, "click", "[data-act=reopen]", function () { saveProposal(cur(), { status: "sent", sentAt: cur().sentAt || new Date().toISOString() }); });
    NX.ui.on(el, "click", "[data-act=to-draft]", function () { saveProposal(cur(), { status: "draft" }); });
    NX.ui.on(el, "click", "[data-act=dup]", function () { duplicate(cur()); });
    NX.ui.on(el, "click", "[data-act=del]", function () { NX.ui.del("proposals", id, function () { if (ed && ed.id === id) ed = null; NX.go("proposals"); }); });
  }

  /* ================= EDITOR ================= */
  function renderEditor(el, id) {
    var stored = NX.store.get("proposals", id);
    if (!stored) {
      el.innerHTML = '<a class="nx-back" href="#/proposals">' + NX.icon("back", 16) + esc(NX.t("prop.backList")) + "</a>" + NX.ui.card("", NX.ui.empty(NX.t("prop.notFound")));
      return;
    }
    if (!ed || ed.id !== id) ed = { id: id, draft: clone(stored), dirty: false, restored: false };
    else if (!ed.dirty) ed.draft = clone(stored);
    var d = ed.draft;
    if (!Array.isArray(d.items)) d.items = [];
    if (!Array.isArray(d.payments)) d.payments = [];
    if (d.vatRate == null || d.vatRate === "") d.vatRate = Number(settings().vatRate);

    var leads = NX.store.all("leads").slice().sort(function (a, b) { return String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")); });
    var leadOpts = [{ value: "", label: NX.t("prop.typeManual") }].concat(leads.map(function (l) {
      return { value: l.id, label: l.name + (l.company ? " — " + l.company : "") };
    }));
    if (d.leadId && !leads.some(function (l) { return l.id === d.leadId; })) leadOpts.push({ value: d.leadId, label: d.client || d.leadId });

    var F = function (o) { o.attrs = (o.attrs || "") + ' data-f="' + o.name + '"'; return NX.ui.field(o); };

    // Template select (grouped by service)
    var tpls = proposalTemplates();
    var match = tpls.filter(function (t) { return d.service && t.service === d.service; });
    var other = tpls.filter(function (t) { return match.indexOf(t) === -1; });
    var tplOpt = function (t) { return '<option value="' + esc(t.id) + '">' + esc(t.name + (t.service && t.service !== d.service ? " · " + svcLabel(t.service) : "")) + "</option>"; };
    var tplSelect = '<div class="nx-field"><label>' + esc(NX.t("prop.template")) + '</label><select data-act="pick-tpl"' + (tpls.length ? "" : " disabled") + '><option value="">' + esc(tpls.length ? NX.t("prop.tplPick") : NX.t("prop.tplNone")) + "</option>" +
      (match.length ? '<optgroup label="' + esc(NX.t("prop.tplMatch")) + '">' + match.map(tplOpt).join("") + "</optgroup>" + (other.length ? '<optgroup label="' + esc(NX.t("prop.tplOther")) + '">' + other.map(tplOpt).join("") + "</optgroup>" : "") : other.map(tplOpt).join("")) +
      "</select></div>";

    var langSeg = '<div class="nx-field"><label>' + esc(NX.t("prop.lang")) + '</label><div class="nx-seg pr-seg">' + ["ar", "en", "both"].map(function (l) {
      return '<button type="button" data-doclang="' + l + '" class="' + ((d.lang || "both") === l ? "is-active" : "") + '">' + esc(NX.t(l === "ar" ? "prop.langAr" : l === "en" ? "prop.langEn" : "prop.langBoth")) + "</button>";
    }).join("") + "</div></div>";

    var clientCard = NX.ui.card(NX.t("prop.secClient"),
      '<div class="nx-form-grid">' +
      '<div class="nx-field nx-full"><label>' + esc(NX.t("prop.fromLead")) + '</label><select data-act="pick-lead">' + leadOpts.map(function (o) {
        return '<option value="' + esc(o.value) + '"' + (o.value === (d.leadId || "") ? " selected" : "") + ">" + esc(o.label) + "</option>";
      }).join("") + '</select><small class="nx-hint">' + esc(NX.t("prop.leadHint")) + "</small></div>" +
      F({ name: "client", label: NX.t("prop.clientName"), value: d.client }) +
      F({ name: "clientCompany", label: NX.t("prop.clientCompany"), value: d.clientCompany }) +
      F({ name: "phone", label: NX.t("c.phone"), type: "tel", value: d.phone }) +
      F({ name: "email", label: NX.t("c.email"), type: "email", value: d.email }) +
      "</div>");

    var detailsCard = NX.ui.card(NX.t("prop.secDetails"),
      '<div class="nx-form-grid">' +
      F({ name: "title", label: NX.t("prop.title"), value: d.title, full: true, placeholder: NX.t("prop.titlePh") }) +
      F({ name: "service", label: NX.t("c.service"), type: "select", value: d.service, options: [{ value: "", label: NX.t("c.select") }].concat(NX.opts("services")) }) +
      F({ name: "number", label: NX.t("prop.number"), value: d.number, attrs: ' dir="ltr" class="nx-num"' }) +
      F({ name: "date", label: NX.t("prop.date"), type: "date", value: d.date }) +
      F({ name: "validUntil", label: NX.t("prop.validUntil"), type: "date", value: d.validUntil }) +
      langSeg + tplSelect +
      "</div>");

    // Items
    var itemsHtml = d.items.map(function (it, i) { return itemRow(it, i, d.items.length); }).join("");
    var itemsCard = NX.ui.card(NX.t("prop.secItems"),
      '<div class="pr-items">' +
      '<div class="pr-ihead"><span>#</span><span>' + esc(NX.t("prop.desc")) + "</span><span>" + esc(NX.t("prop.qty")) + "</span><span>" + esc(NX.t("prop.unit")) + "</span><span>" + esc(NX.t("prop.rate")) + '</span><span class="nx-right">' + esc(NX.t("prop.lineTotal")) + "</span><span></span></div>" +
      (itemsHtml || '<p class="pr-noitems nx-muted">' + esc(NX.t("prop.noItems")) + "</p>") +
      "</div>" +
      '<datalist id="pr-units">' + UNITS.map(function (u) { return '<option value="' + esc(u) + '"></option>'; }).join("") + "</datalist>" +
      '<div class="pr-items-foot">' + NX.ui.btn({ label: NX.t("prop.addItem"), icon: "plus", act: "add-item", cls: "ghost" }) +
      '<div class="pr-totals pr-totals-edit">' +
      '<div><span>' + esc(NX.t("prop.subtotal")) + '</span><b class="nx-num" data-calc="subtotal"></b></div>' +
      '<div><label for="pr-disc">' + esc(NX.t("prop.discount")) + ' <small>(' + esc(NX.t("c.sar")) + ')</small></label><input id="pr-disc" class="nx-input nx-num pr-tin" inputmode="decimal" dir="ltr" data-f="discount" data-numf value="' + esc(d.discount || "") + '" placeholder="0" /></div>' +
      '<div><span>' + esc(NX.t("prop.net")) + '</span><b class="nx-num" data-calc="net"></b></div>' +
      '<div><label for="pr-vat">' + esc(NX.t("prop.vatRate")) + '</label><input id="pr-vat" class="nx-input nx-num pr-tin" inputmode="decimal" dir="ltr" data-f="vatRate" data-numf value="' + esc(d.vatRate) + '" /></div>' +
      '<div><span>' + esc(NX.t("prop.vat")) + '</span><b class="nx-num" data-calc="vat"></b></div>' +
      '<div class="pr-grand"><span>' + esc(NX.t("prop.grand")) + '</span><b class="nx-num" data-calc="total"></b></div>' +
      "</div></div>", { cls: "pr-items-card" });

    var scopeCard = NX.ui.card(NX.t("prop.secScope"),
      '<div class="nx-form-grid">' +
      F({ name: "scope", label: NX.t("prop.scope"), type: "textarea", rows: 6, value: d.scope, hint: NX.t("prop.onePerLine") }) +
      F({ name: "exclusions", label: NX.t("prop.exclusions"), type: "textarea", rows: 6, value: d.exclusions, hint: NX.t("prop.onePerLine") }) +
      "</div>");

    var payRows = d.payments.map(function (x, i) {
      return '<div class="pr-pay" data-row="' + i + '">' +
        '<span class="pr-pay-n nx-num">' + (i + 1) + "</span>" +
        '<input class="nx-input pr-pay-label" data-pay="' + i + '" data-k="label" value="' + esc(x.label) + '" placeholder="' + esc(NX.t("prop.milestonePh")) + '" aria-label="' + esc(NX.t("prop.milestone")) + '" />' +
        '<span class="pr-pct"><input class="nx-input nx-num" inputmode="decimal" dir="ltr" data-pay="' + i + '" data-k="percent" value="' + esc(x.percent) + '" aria-label="%" /><i>%</i></span>' +
        '<span class="nx-num pr-pay-amt" data-pamt="' + i + '"></span>' +
        NX.ui.btn({ icon: "trash", act: "pay-del", cls: "icon sm", title: NX.t("prop.remove"), attrs: ' data-i="' + i + '"' }) +
        "</div>";
    }).join("");
    var payCard = NX.ui.card(NX.t("prop.secPayments"),
      '<div class="pr-pays">' + (payRows || '<p class="nx-muted">' + esc(NX.t("prop.noPayments")) + "</p>") + "</div>" +
      '<div class="pr-pay-foot">' + NX.ui.btn({ label: NX.t("prop.addMilestone"), icon: "plus", act: "add-pay", cls: "ghost" }) + '<span class="pr-paysum" data-psum></span></div>');

    var termsCard = NX.ui.card(NX.t("prop.secTerms"),
      '<div class="nx-form-grid">' +
      F({ name: "terms", label: NX.t("prop.terms"), type: "textarea", rows: 4, value: d.terms, full: true, placeholder: NX.t("prop.termsPh") }) +
      F({ name: "notes", label: NX.t("prop.notes"), type: "textarea", rows: 3, value: d.notes, full: true, hint: NX.t("prop.notesHint") }) +
      "</div>");

    var bar = '<div class="pr-bar' + (ed.dirty ? " is-dirty" : "") + '">' +
      '<div class="pr-bar-info"><span class="pr-bar-lbl">' + esc(NX.t("prop.grand")) + '</span><b class="nx-num" data-calc="total"></b>' +
      '<span class="pr-bar-state"><i class="nx-dot"></i><span class="pr-s-dirty">' + esc(NX.t("prop.unsaved")) + '</span><span class="pr-s-clean">' + esc(NX.t("prop.allSaved")) + "</span></span></div>" +
      '<div class="pr-bar-btns">' +
      NX.ui.btn({ label: NX.t("c.back"), icon: "back", act: "back", cls: "ghost pr-bar-back" }) +
      NX.ui.btn({ label: NX.t("prop.preview"), icon: "print", act: "preview", cls: "ghost" }) +
      NX.ui.btn({ label: (d.status || "draft") === "draft" ? NX.t("prop.saveDraft") : NX.t("c.save"), icon: "check", act: "save", cls: "gold" }) +
      "</div></div>";

    el.innerHTML =
      '<a class="nx-back" href="#/proposals/' + esc(id) + '" data-act="back">' + NX.icon("back", 16) + esc(NX.t("prop.backDetail")) + "</a>" +
      NX.ui.pageHead({ title: NX.t("prop.editTitle"), sub: '<span class="nx-num">' + esc(d.number || "") + "</span> " + statusBadge(d) }) +
      (ed.dirty && ed.restored ? '<div class="nx-note-box pr-restored"><span>' + esc(NX.t("prop.restored")) + "</span>" + NX.ui.btn({ label: NX.t("prop.discard"), act: "discard", cls: "ghost sm" }) + "</div>" : "") +
      '<div class="pr-editor">' +
      '<div class="nx-grid-2 pr-top">' + clientCard + detailsCard + "</div>" +
      itemsCard + scopeCard + payCard + termsCard +
      "</div>" + bar;

    ed.prevDate = d.date;
    updateCalc(el);
    setTimeout(function () { el.querySelectorAll(".pr-desc").forEach(autosize); }, 0);
    wireEditor(el, id);
  }

  function itemRow(it, i, n) {
    var line = num(it.qty) * num(it.rate);
    return '<div class="pr-item" data-row="' + i + '">' +
      '<span class="pr-i-n nx-num">' + (i + 1) + "</span>" +
      '<div class="pr-i-desc"><textarea class="nx-input pr-desc" rows="1" data-it="' + i + '" data-k="desc" placeholder="' + esc(NX.t("prop.descPh")) + '" aria-label="' + esc(NX.t("prop.desc")) + '">' + esc(it.desc) + "</textarea></div>" +
      '<label class="pr-i-qty"><small>' + esc(NX.t("prop.qty")) + '</small><input class="nx-input nx-num" inputmode="decimal" dir="ltr" data-it="' + i + '" data-k="qty" value="' + esc(it.qty) + '" /></label>' +
      '<label class="pr-i-unit"><small>' + esc(NX.t("prop.unit")) + '</small><input class="nx-input" list="pr-units" dir="auto" data-it="' + i + '" data-k="unit" value="' + esc(it.unit) + '" /></label>' +
      '<label class="pr-i-rate"><small>' + esc(NX.t("prop.rate")) + '</small><input class="nx-input nx-num" inputmode="decimal" dir="ltr" data-it="' + i + '" data-k="rate" value="' + esc(it.rate) + '" /></label>' +
      '<div class="pr-i-total"><small>' + esc(NX.t("prop.lineTotal")) + '</small><b class="nx-num" data-line="' + i + '">' + esc(m2(line)) + "</b></div>" +
      '<div class="pr-i-acts">' +
      NX.ui.btn({ icon: "arrow", act: "item-up", cls: "icon sm pr-up", title: NX.t("prop.moveUp"), attrs: ' data-i="' + i + '"' + (i === 0 ? " disabled" : "") }) +
      NX.ui.btn({ icon: "arrow", act: "item-down", cls: "icon sm pr-down", title: NX.t("prop.moveDown"), attrs: ' data-i="' + i + '"' + (i === n - 1 ? " disabled" : "") }) +
      NX.ui.btn({ icon: "trash", act: "item-del", cls: "icon sm pr-del", title: NX.t("prop.remove"), attrs: ' data-i="' + i + '"' }) +
      "</div></div>";
  }

  function autosize(ta) { if (!ta) return; ta.style.height = "auto"; ta.style.height = (ta.scrollHeight + 2) + "px"; }

  function updateCalc(el) {
    var d = ed.draft, c = totals(d);
    var set = function (sel, v) { el.querySelectorAll(sel).forEach(function (x) { x.textContent = v; }); };
    set('[data-calc="subtotal"]', money(c.subtotal));
    set('[data-calc="net"]', money(c.net));
    set('[data-calc="vat"]', money(c.vat));
    set('[data-calc="total"]', money(c.total));
    d.items.forEach(function (it, i) { set('[data-line="' + i + '"]', m2(num(it.qty) * num(it.rate))); });
    var sum = 0;
    d.payments.forEach(function (x, i) { sum += num(x.percent); set('[data-pamt="' + i + '"]', money(c.total * num(x.percent) / 100)); });
    var ps = el.querySelector("[data-psum]");
    if (ps) {
      var ok = Math.abs(sum - 100) < 0.001;
      ps.className = "pr-paysum " + (d.payments.length ? (ok ? "is-ok" : "is-warn") : "");
      ps.textContent = d.payments.length ? (ok ? NX.t("prop.payOk") : NX.t("prop.payWarn", { n: NX.fmt.num(sum) })) : "";
    }
  }

  function markDirty(el) {
    ed.dirty = true;
    var b = el.querySelector(".pr-bar");
    if (b) b.classList.add("is-dirty");
  }

  function hasItemContent(items) { return (items || []).some(function (it) { return String(it.desc || "").trim() || num(it.rate); }); }

  function cleanDraft(d) {
    var out = clone(d);
    out.items = (out.items || []).filter(function (it) { return String(it.desc || "").trim() || num(it.rate); })
      .map(function (it) { return { desc: String(it.desc || "").trim(), qty: num(it.qty), unit: String(it.unit || "").trim(), rate: num(it.rate) }; });
    out.payments = (out.payments || []).filter(function (x) { return String(x.label || "").trim() || num(x.percent); })
      .map(function (x) { return { label: String(x.label || "").trim(), percent: num(x.percent) }; });
    out.discount = num(out.discount);
    out.vatRate = out.vatRate === "" || out.vatRate == null ? Number(settings().vatRate) : num(out.vatRate);
    ["client", "clientCompany", "phone", "email", "title", "number"].forEach(function (k) { out[k] = String(out[k] || "").trim(); });
    return out;
  }

  function saveEditor() {
    var d = cleanDraft(ed.draft);
    if (d.number && NX.store.where("proposals", function (x) { return x.id !== d.id && x.number === d.number; }).length) {
      NX.ui.toast(NX.t("prop.dupNumber", { n: d.number }), "error");
      return Promise.reject(new Error("dup"));
    }
    var snap = JSON.stringify(ed.draft);
    var edRef = ed;
    return NX.ui.run(NX.store.save("proposals", d)).then(function (saved) {
      if (ed === edRef && JSON.stringify(ed.draft) === snap) { ed.dirty = false; ed.draft = clone(saved); NX.app.rerender(); }
      return saved;
    });
  }

  function wireEditor(el, id) {
    var d = function () { return ed.draft; };
    var structural = function () { markDirty(el); NX.app.rerender(); };

    NX.ui.on(el, "input", "[data-f]", function (e, t) {
      var f = t.getAttribute("data-f");
      if (t.tagName === "SELECT") return; // handled on change
      d()[f] = t.hasAttribute("data-numf") ? (t.value.trim() === "" ? "" : num(t.value)) : t.value;
      markDirty(el); updateCalc(el);
    });
    NX.ui.on(el, "change", "[data-f]", function (e, t) {
      var f = t.getAttribute("data-f");
      if (f === "date") {
        var days = Number(settings().proposalValidityDays) || 30;
        var old = ed.prevDate || t.value;
        if (t.value && (!d().validUntil || d().validUntil === NX.fmt.addDays(old, days) || d().validUntil < t.value)) {
          d().validUntil = NX.fmt.addDays(t.value, days);
          var vu = el.querySelector('[data-f="validUntil"]'); if (vu) vu.value = d().validUntil;
        }
        ed.prevDate = t.value;
        d().date = t.value; markDirty(el);
      }
      if (t.tagName === "SELECT") { d()[f] = t.value; structural(); }
    });
    NX.ui.on(el, "input", "[data-it]", function (e, t) {
      var i = Number(t.getAttribute("data-it")), k = t.getAttribute("data-k");
      var it = d().items[i]; if (!it) return;
      it[k] = (k === "qty" || k === "rate") ? num(t.value) : t.value;
      if (k === "desc") autosize(t);
      markDirty(el); updateCalc(el);
    });
    NX.ui.on(el, "input", "[data-pay]", function (e, t) {
      var i = Number(t.getAttribute("data-pay")), k = t.getAttribute("data-k");
      var x = d().payments[i]; if (!x) return;
      x[k] = k === "percent" ? num(t.value) : t.value;
      markDirty(el); updateCalc(el);
    });
    NX.ui.on(el, "click", "[data-doclang]", function (e, t) { d().lang = t.getAttribute("data-doclang"); structural(); });
    NX.ui.on(el, "click", "[data-act=add-item]", function () {
      var last = d().items[d().items.length - 1];
      d().items.push({ desc: "", qty: 1, unit: (last && last.unit) || "LS", rate: 0 });
      structural();
      setTimeout(function () { var all = document.querySelectorAll(".pr-desc"); var ta = all[all.length - 1]; if (ta) ta.focus(); }, 30);
    });
    NX.ui.on(el, "click", "[data-act=item-del]", function (e, t) { d().items.splice(Number(t.getAttribute("data-i")), 1); structural(); });
    NX.ui.on(el, "click", "[data-act=item-up]", function (e, t) { move(d().items, Number(t.getAttribute("data-i")), -1); structural(); });
    NX.ui.on(el, "click", "[data-act=item-down]", function (e, t) { move(d().items, Number(t.getAttribute("data-i")), 1); structural(); });
    NX.ui.on(el, "click", "[data-act=add-pay]", function () {
      var sum = d().payments.reduce(function (s, x) { return s + num(x.percent); }, 0);
      d().payments.push({ label: "", percent: Math.max(0, 100 - sum) });
      structural();
      setTimeout(function () { var all = document.querySelectorAll(".pr-pay-label"); var x = all[all.length - 1]; if (x) x.focus(); }, 30);
    });
    NX.ui.on(el, "click", "[data-act=pay-del]", function (e, t) { d().payments.splice(Number(t.getAttribute("data-i")), 1); structural(); });

    NX.ui.on(el, "change", "[data-act=pick-lead]", function (e, t) {
      var lead = t.value ? NX.store.get("leads", t.value) : null;
      if (lead) applyLead(d(), lead); else d().leadId = "";
      structural();
    });
    NX.ui.on(el, "change", "[data-act=pick-tpl]", function (e, t) {
      var tpl = NX.store.get("templates", t.value);
      t.value = "";
      if (!tpl) return;
      var go = function () { applyTemplate(d(), tpl); structural(); NX.ui.toast(NX.t("prop.tplApplied")); };
      if (hasItemContent(d().items) || lines(d().scope).length) {
        NX.ui.confirm(NX.t("prop.tplConfirm", { name: tpl.name }), { okLabel: NX.t("prop.replace") }).then(function (ok) { if (ok) go(); });
      } else go();
    });

    NX.ui.on(el, "click", "[data-act=save]", function (e, b) {
      b.disabled = true;
      saveEditor().catch(function () {}).then(function () { b.disabled = false; });
    });
    NX.ui.on(el, "click", "[data-act=preview]", function () { NX.actions.previewProposal(cleanDraft(ed.draft)); });
    NX.ui.on(el, "click", "[data-act=discard]", function () { ed = null; NX.app.rerender(); });
    NX.ui.on(el, "click", "[data-act=back]", function (e) {
      e.preventDefault();
      var leave = function () { ed = null; NX.go("proposals/" + id); };
      if (!ed || !ed.dirty) return leave();
      NX.ui.confirm(NX.t("prop.leaveConfirm"), { okLabel: NX.t("prop.leave"), danger: true }).then(function (ok) { if (ok) leave(); });
    });
  }

  function move(arr, i, dir) {
    var j = i + dir;
    if (j < 0 || j >= arr.length) return;
    var x = arr[i]; arr[i] = arr[j]; arr[j] = x;
  }

  /* ================= PRINTABLE DOCUMENT ================= */
  var DOC = {
    quotation: ["Quotation", "عرض سعر"],
    no: ["Quotation No.", "رقم العرض"],
    date: ["Date", "التاريخ"],
    valid: ["Valid until", "صالح حتى"],
    preparedFor: ["Prepared for", "مقدّم إلى"],
    project: ["Project", "المشروع"],
    service: ["Service", "الخدمة"],
    attn: ["Attention", "عناية"],
    phone: ["Phone", "الجوال"],
    email: ["Email", "البريد"],
    num: ["#", "م"],
    desc: ["Description", "الوصف"],
    qty: ["Qty", "الكمية"],
    unit: ["Unit", "الوحدة"],
    rate: ["Unit price", "سعر الوحدة"],
    amount: ["Amount", "المبلغ"],
    subtotal: ["Subtotal", "المجموع الفرعي"],
    discount: ["Discount", "الخصم"],
    net: ["Net amount", "الصافي"],
    vat: ["VAT", "ضريبة القيمة المضافة"],
    total: ["Total incl. VAT", "الإجمالي شامل الضريبة"],
    scope: ["Scope of work", "نطاق العمل"],
    excl: ["Exclusions", "الاستثناءات"],
    payments: ["Payment schedule", "جدول الدفعات"],
    milestone: ["Milestone", "الدفعة"],
    pct: ["%", "النسبة"],
    terms: ["Terms & conditions", "الشروط والأحكام"],
    bank: ["Bank details", "البيانات البنكية"],
    bankName: ["Bank", "البنك"],
    iban: ["IBAN", "الآيبان"],
    accName: ["Account name", "اسم الحساب"],
    forCo: ["For {co}", "عن {co}"],
    client: ["Client acceptance", "موافقة العميل"],
    name: ["Name", "الاسم"],
    sign: ["Signature", "التوقيع"],
    stamp: ["Stamp", "الختم"],
    sdate: ["Date", "التاريخ"],
    cr: ["C.R.", "س.ت"],
    vatNo: ["VAT No.", "الرقم الضريبي"],
    sar: ["SAR", "ر.س"],
    allSar: ["All amounts in Saudi Riyals (SAR)", "جميع المبالغ بالريال السعودي"],
    page: ["Thank you for the opportunity to work with you.", "شكراً لإتاحة الفرصة لنا للعمل معكم."]
  };
  var UNIT_AR = { "LS": "مقطوعية", "m²": "م²", "m2": "م²", "m": "م.ط", "visit": "زيارة", "month": "شهر", "item": "بند", "lot": "دفعة" };

  var LOGO_SVG = '<svg viewBox="0 0 44 52" fill="none" aria-hidden="true"><path d="M22 8 L7 45" stroke="currentColor" stroke-width="3.1" stroke-linecap="round"/><path d="M22 8 L37 45" stroke="currentColor" stroke-width="3.1" stroke-linecap="round"/><path d="M14 31 L30 31" stroke="currentColor" stroke-width="3.1" stroke-linecap="round"/><circle cx="22" cy="8" r="3.4" fill="#B79A5F"/></svg>';

  function buildDoc(p) {
    var lang = /^(ar|en|both)$/.test(p.lang) ? p.lang : "both";
    var isAr = lang === "ar", both = lang === "both";
    var co = settings().company || {};
    var c = totals(p);
    var coName = isAr ? (co.nameAr || co.nameEn) : (co.nameEn || co.nameAr);
    /* Label in the document language. stack=true puts English over Arabic (table headers). */
    var L = function (k, stack, vars) {
      var en = DOC[k][0], ar = DOC[k][1];
      if (vars) Object.keys(vars).forEach(function (v) { en = en.split("{" + v + "}").join(vars[v][0]); ar = ar.split("{" + v + "}").join(vars[v][1]); });
      if (lang === "en") return esc(en);
      if (lang === "ar") return esc(ar);
      return stack ? '<span class="pr-l-en">' + esc(en) + '</span><span class="pr-l-ar" lang="ar">' + esc(ar) + "</span>"
        : '<span class="pr-l-en">' + esc(en) + '</span><span class="pr-l-sep"> / </span><span class="pr-l-ar" lang="ar" dir="rtl">' + esc(ar) + "</span>";
    };
    var ltr = function (s, cls) { return '<span class="pr-ltr' + (cls ? " " + cls : "") + '" dir="ltr">' + esc(s) + "</span>"; };
    var dfmt = function (d) {
      var x = NX.fmt.toDate(d); if (!x) return "—";
      if (isAr) return x.toLocaleDateString("ar-SA-u-nu-latn-ca-gregory", { day: "numeric", month: "long", year: "numeric" });
      return x.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    };
    var svc = (settings().services || []).find(function (s) { return s.id === p.service; });
    var svcTxt = svc ? (isAr ? svc.ar : both ? svc.en + " · " + svc.ar : svc.en) : "";
    var unitHtml = function (u) {
      u = u || "";
      if (isAr && UNIT_AR[u]) return esc(UNIT_AR[u]);
      if (both && UNIT_AR[u]) return '<bdi dir="ltr">' + esc(u) + '</bdi> / <bdi class="pr-l-ar" dir="rtl">' + esc(UNIT_AR[u]) + "</bdi>";
      return '<bdi dir="auto">' + esc(u) + "</bdi>";
    };
    var sar = isAr ? DOC.sar[1] : DOC.sar[0];

    // Header band
    var coNames = both ? '<b>' + esc(co.nameEn) + '</b><b class="pr-ar-f" dir="rtl">' + esc(co.nameAr) + "</b>"
      : '<b' + (isAr ? ' class="pr-ar-f"' : "") + ">" + esc(coName) + "</b>";
    var tagline = both ? esc(co.taglineEn) + " · " + '<span class="pr-ar-f">' + esc(co.taglineAr) + "</span>" : esc(isAr ? co.taglineAr : co.taglineEn);
    var contact = [];
    if (co.phone) contact.push(ltr(co.phone));
    if (co.email) contact.push(ltr(co.email));
    if (co.website) contact.push(ltr(co.website));
    var addr = both ? esc(co.addressEn) + " · " + esc(co.addressAr) : esc(isAr ? co.addressAr : co.addressEn);
    var legal = [];
    if (co.crNumber) legal.push(L("cr") + " " + ltr(co.crNumber));
    if (co.vatNumber) legal.push(L("vatNo") + " " + ltr(co.vatNumber));

    var band =
      '<header class="pr-d-band">' +
      '<div class="pr-d-brand"><span class="pr-d-mark">' + LOGO_SVG + '</span><span class="pr-d-word" dir="ltr"><b>NEXA</b><small>ENGINEERING</small></span></div>' +
      '<div class="pr-d-co">' + coNames + '<small>' + tagline + "</small></div>" +
      "</header>" +
      '<div class="pr-d-contact"><span>' + contact.join('<i class="pr-sep"></i>') + "</span>" +
      '<span>' + (addr ? addr : "") + (legal.length ? '<i class="pr-sep"></i>' + legal.join('<i class="pr-sep"></i>') : "") + "</span></div>";

    // Title + meta
    var titleHtml = both ? '<h1><span class="pr-t-en">QUOTATION</span><span class="pr-t-ar">عرض سعر</span></h1>'
      : isAr ? '<h1><span class="pr-t-ar">عرض سعر</span></h1>' : '<h1><span class="pr-t-en">QUOTATION</span></h1>';
    var meta = '<table class="pr-d-meta"><tbody>' +
      "<tr><th>" + L("no") + "</th><td>" + ltr(p.number || "—", "pr-mono pr-strong") + "</td></tr>" +
      "<tr><th>" + L("date") + "</th><td>" + esc(dfmt(p.date)) + "</td></tr>" +
      "<tr><th>" + L("valid") + "</th><td>" + esc(dfmt(p.validUntil)) + "</td></tr>" +
      "</tbody></table>";

    // Parties
    var clientLines = [];
    if (p.clientCompany) clientLines.push('<div class="pr-strong pr-big">' + esc(p.clientCompany) + "</div>");
    if (p.client) clientLines.push('<div class="' + (p.clientCompany ? "" : "pr-strong pr-big") + '">' + (p.clientCompany ? L("attn") + ": " : "") + esc(p.client) + "</div>");
    if (p.phone) clientLines.push("<div>" + L("phone") + ": " + ltr(p.phone, "pr-mono") + "</div>");
    if (p.email) clientLines.push("<div>" + L("email") + ": " + ltr(p.email) + "</div>");
    var parties = '<section class="pr-d-parties pr-keep">' +
      '<div class="pr-d-box"><h4>' + L("preparedFor") + "</h4>" + (clientLines.join("") || "<div>—</div>") + "</div>" +
      '<div class="pr-d-box"><h4>' + L("project") + "</h4>" + '<div class="pr-strong pr-big">' + esc(p.title || "—") + "</div>" + (svcTxt ? '<div class="pr-muted">' + L("service") + ": " + esc(svcTxt) + "</div>" : "") + "</div>" +
      "</section>";

    // Items
    var items = (p.items || []).filter(function (it) { return String(it.desc || "").trim() || num(it.rate); });
    var itemsRows = items.map(function (it, i) {
      return "<tr>" +
        '<td class="pr-c-n">' + (i + 1) + "</td>" +
        '<td class="pr-c-desc">' + esc(it.desc || "").replace(/\n/g, "<br>") + "</td>" +
        '<td class="pr-c-q pr-mono">' + esc(NX.fmt.num(it.qty)) + "</td>" +
        '<td class="pr-c-u">' + unitHtml(it.unit) + "</td>" +
        '<td class="pr-c-m pr-mono">' + m2(it.rate) + "</td>" +
        '<td class="pr-c-m pr-mono pr-strong">' + m2(num(it.qty) * num(it.rate)) + "</td>" +
        "</tr>";
    }).join("") || '<tr><td colspan="6" class="pr-muted">—</td></tr>';
    var itemsTable = '<table class="pr-d-items"><thead><tr>' +
      '<th class="pr-c-n">' + L("num", true) + "</th>" +
      '<th class="pr-c-desc">' + L("desc", true) + "</th>" +
      '<th class="pr-c-q">' + L("qty", true) + "</th>" +
      '<th class="pr-c-u">' + L("unit", true) + "</th>" +
      '<th class="pr-c-m">' + L("rate", true) + (both ? "" : ' <span class="pr-cur">(' + sar + ")</span>") + "</th>" +
      '<th class="pr-c-m">' + L("amount", true) + (both ? "" : ' <span class="pr-cur">(' + sar + ")</span>") + "</th>" +
      "</tr></thead><tbody>" + itemsRows + "</tbody></table>";

    // Totals
    var trow = function (label, val, cls) { return '<tr class="' + (cls || "") + '"><th>' + label + "</th><td>" + ltr(val, "pr-mono") + "</td></tr>"; };
    var totalsHtml = '<div class="pr-d-sumwrap pr-keep"><p class="pr-d-note">' + L("allSar") + "</p>" +
      '<table class="pr-d-totals"><tbody>' +
      trow(L("subtotal"), m2(c.subtotal)) +
      (c.discount ? trow(L("discount"), "− " + m2(c.discount)) + trow(L("net"), m2(c.net)) : "") +
      trow(L("vat") + ' <span class="pr-mono">(' + NX.fmt.num(c.vatRate) + "%)</span>", m2(c.vat)) +
      '<tr class="pr-d-grand"><th>' + L("total") + "</th><td>" + ltr(m2(c.total) + " " + sar, "pr-mono") + "</td></tr>" +
      "</tbody></table></div>";

    // Scope / exclusions
    var list = function (text) { var ls = lines(text); return ls.length ? '<ul class="pr-d-list">' + ls.map(function (l) { return "<li>" + esc(l) + "</li>"; }).join("") + "</ul>" : ""; };
    var scope = list(p.scope), excl = list(p.exclusions);
    var scopeHtml = (scope || excl) ? '<section class="pr-d-cols">' +
      (scope ? '<div class="pr-keep"><h3 class="pr-d-h">' + L("scope") + "</h3>" + scope + "</div>" : "") +
      (excl ? '<div class="pr-keep"><h3 class="pr-d-h">' + L("excl") + "</h3>" + excl + "</div>" : "") +
      "</section>" : "";

    // Payments
    var pays = (p.payments || []).filter(function (x) { return String(x.label || "").trim() || num(x.percent); });
    var payHtml = pays.length ? '<section class="pr-keep"><h3 class="pr-d-h">' + L("payments") + "</h3>" +
      '<table class="pr-d-pay"><thead><tr><th class="pr-c-n">' + L("num", true) + "</th><th>" + L("milestone", true) + '</th><th class="pr-c-q">' + L("pct", true) + '</th><th class="pr-c-m">' + L("amount", true) + (both ? "" : ' <span class="pr-cur">(' + sar + ")</span>") + "</th></tr></thead><tbody>" +
      pays.map(function (x, i) {
        return '<tr><td class="pr-c-n">' + (i + 1) + "</td><td>" + esc(x.label) + '</td><td class="pr-c-q pr-mono">' + esc(NX.fmt.num(x.percent)) + '%</td><td class="pr-c-m pr-mono">' + m2(c.total * num(x.percent) / 100) + "</td></tr>";
      }).join("") + "</tbody></table></section>" : "";

    var termsHtml = String(p.terms || "").trim() ? '<section class="pr-keep"><h3 class="pr-d-h">' + L("terms") + '</h3><div class="pr-d-terms">' + esc(p.terms).replace(/\n/g, "<br>") + "</div></section>" : "";

    var bankRows = [];
    if (co.bankName) bankRows.push("<tr><th>" + L("bankName") + "</th><td>" + esc(co.bankName) + "</td></tr>");
    if (co.accountName) bankRows.push("<tr><th>" + L("accName") + "</th><td>" + esc(co.accountName) + "</td></tr>");
    if (co.iban) bankRows.push("<tr><th>" + L("iban") + "</th><td>" + ltr(co.iban, "pr-mono") + "</td></tr>");
    var bankHtml = bankRows.length ? '<section class="pr-keep pr-d-bank"><h3 class="pr-d-h">' + L("bank") + '</h3><table class="pr-d-kv"><tbody>' + bankRows.join("") + "</tbody></table></section>" : "";

    var coPair = [co.nameEn || "", co.nameAr || ""];
    var signHtml = '<section class="pr-d-sign pr-keep">' +
      '<div class="pr-d-sbox"><h4>' + L("forCo", false, { co: coPair }) + "</h4>" +
      '<div class="pr-d-sline"><span>' + L("name") + "</span><i></i></div>" +
      '<div class="pr-d-sline"><span>' + L("sign") + "</span><i></i></div>" +
      '<div class="pr-d-stamp">' + L("stamp") + "</div></div>" +
      '<div class="pr-d-sbox"><h4>' + L("client") + "</h4>" +
      '<div class="pr-d-sline"><span>' + L("name") + "</span><i></i></div>" +
      '<div class="pr-d-sline"><span>' + L("sign") + "</span><i></i></div>" +
      '<div class="pr-d-sline"><span>' + L("sdate") + "</span><i></i></div>" +
      '<div class="pr-d-stamp">' + L("stamp") + "</div></div>" +
      "</section>";

    var footer = '<footer class="pr-d-foot pr-keep"><p class="pr-d-thanks">' + L("page") + "</p><div>" +
      esc(both ? co.nameEn + " · " + co.nameAr : coName) + (co.website ? '<i class="pr-sep"></i>' + ltr(co.website) : "") + (co.phone ? '<i class="pr-sep"></i>' + ltr(co.phone) : "") +
      '<i class="pr-sep"></i>' + ltr(p.number || "") + "</div></footer>";

    return '<div class="pr-doc pr-doc-' + lang + '" dir="' + (isAr ? "rtl" : "ltr") + '" lang="' + (isAr ? "ar" : "en") + '">' +
      band +
      '<section class="pr-d-title pr-keep">' + titleHtml + meta + "</section>" +
      parties + itemsTable + totalsHtml + scopeHtml + payHtml + termsHtml + bankHtml + signHtml + footer +
      "</div>";
  }

  var DOC_CSS = [
    ".pr-doc{--pr-ink:#1b1b1b;--pr-gold:#b79a5f;--pr-gold-d:#8a6e3b;--pr-line:#e4ded1;--pr-soft:#f7f4ee;--pr-muted:#6b665d;",
    "font-family:'Archivo','Cairo',system-ui,sans-serif;color:var(--pr-ink);font-size:9.6pt;line-height:1.5;background:#fff;",
    "-webkit-print-color-adjust:exact;print-color-adjust:exact;width:100%;text-align:start}",
    ".pr-doc *{box-sizing:border-box;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact}",
    ".pr-doc[dir=rtl],.pr-doc .pr-ar-f,.pr-doc .pr-l-ar,.pr-doc .pr-t-ar{font-family:'Cairo','Archivo',system-ui,sans-serif}",
    ".pr-doc .pr-ltr{unicode-bidi:isolate;direction:ltr;display:inline-block}",
    ".pr-doc .pr-mono{font-family:'IBM Plex Mono',ui-monospace,Menlo,monospace;font-feature-settings:'tnum'}",
    ".pr-doc .pr-strong{font-weight:700}.pr-doc .pr-big{font-size:11pt}.pr-doc .pr-muted{color:var(--pr-muted)}",
    ".pr-doc .pr-keep{break-inside:avoid;page-break-inside:avoid}",
    ".pr-doc .pr-sep{display:inline-block;width:3px;height:3px;border-radius:50%;background:var(--pr-gold);margin:0 8px;vertical-align:middle}",
    /* band */
    ".pr-doc .pr-d-band{background:#1b1b1b;color:#fff;display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 22px;border-bottom:2px solid var(--pr-gold)}",
    ".pr-doc .pr-d-brand{display:flex;align-items:center;gap:12px}",
    ".pr-doc .pr-d-mark{color:#fff;display:block;width:30px;height:36px}.pr-doc .pr-d-mark svg{width:30px;height:36px;display:block}",
    ".pr-doc .pr-d-word{display:flex;flex-direction:column;line-height:1;font-family:'Archivo',sans-serif}",
    ".pr-doc .pr-d-word b{font-size:20pt;letter-spacing:.17em;font-weight:800}",
    ".pr-doc .pr-d-word small{font-size:6.6pt;letter-spacing:.42em;color:var(--pr-gold);margin-top:5px;font-weight:600}",
    ".pr-doc .pr-d-co{display:flex;flex-direction:column;align-items:flex-end;text-align:end;gap:1px}",
    ".pr-doc .pr-d-co b{font-size:10.5pt;font-weight:700;letter-spacing:.02em}",
    ".pr-doc .pr-d-co small{font-size:7.6pt;color:var(--pr-gold);margin-top:2px}",
    ".pr-doc .pr-d-contact{display:flex;justify-content:space-between;flex-wrap:wrap;gap:4px 16px;font-size:7.8pt;color:var(--pr-muted);padding:7px 2px 0}",
    /* title */
    ".pr-doc .pr-d-title{display:flex;justify-content:space-between;align-items:flex-end;gap:20px;margin:22px 0 16px;padding-bottom:14px;border-bottom:1px solid var(--pr-line)}",
    ".pr-doc .pr-d-title h1{display:flex;flex-direction:column;gap:2px;line-height:1.1;white-space:nowrap}",
    ".pr-doc .pr-t-en{font-size:22pt;font-weight:800;letter-spacing:.2em;color:var(--pr-ink)}",
    ".pr-doc .pr-t-ar{font-size:17pt;font-weight:700;color:var(--pr-gold-d)}",
    ".pr-doc[dir=rtl] .pr-t-ar{font-size:24pt;color:var(--pr-ink)}",
    ".pr-doc .pr-d-title h1::after{content:'';display:block;width:44px;height:2px;background:var(--pr-gold);margin-top:8px}",
    ".pr-doc .pr-d-meta{width:auto;border-collapse:collapse;font-size:8.8pt}",
    ".pr-doc .pr-d-meta th{text-align:start;font-weight:600;color:var(--pr-muted);padding:2px 14px 2px 0;white-space:nowrap}",
    ".pr-doc[dir=rtl] .pr-d-meta th{padding:2px 0 2px 14px}",
    ".pr-doc .pr-d-meta td{text-align:end;padding:2px 0;white-space:nowrap}",
    ".pr-doc .pr-d-meta .pr-l-sep{color:#c9c2b3}",
    /* parties */
    ".pr-doc .pr-d-parties{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px}",
    ".pr-doc .pr-d-box{border-top:2px solid var(--pr-gold);background:var(--pr-soft);padding:10px 14px 12px}",
    ".pr-doc h4{font-size:7.6pt;text-transform:uppercase;letter-spacing:.12em;color:var(--pr-gold-d);font-weight:700;margin-bottom:5px}",
    ".pr-doc[dir=rtl] h4,.pr-doc h4 .pr-l-ar{letter-spacing:0;text-transform:none}",
    ".pr-doc[dir=rtl] h4{font-size:9pt}",
    /* tables */
    ".pr-doc table{width:100%;border-collapse:collapse}",
    ".pr-doc thead{display:table-header-group}",
    ".pr-doc tr{break-inside:avoid;page-break-inside:avoid}",
    ".pr-doc .pr-d-items th,.pr-doc .pr-d-pay th{background:#1b1b1b;color:#fff;font-weight:600;font-size:7.8pt;text-align:start;padding:7px 9px;vertical-align:bottom;letter-spacing:.04em}",
    ".pr-doc[dir=rtl] .pr-d-items th,.pr-doc[dir=rtl] .pr-d-pay th{font-size:9pt;letter-spacing:0}",
    ".pr-doc thead th .pr-l-en,.pr-doc thead th .pr-l-ar{display:block}",
    ".pr-doc thead th .pr-l-ar{font-size:8pt;font-weight:500;color:#d9c9a3;margin-top:1px}",
    ".pr-doc .pr-l-ar{unicode-bidi:isolate}",
    ".pr-doc tbody th{white-space:nowrap}",
    ".pr-doc .pr-cur{font-weight:400;opacity:.75;font-size:.9em}",
    ".pr-doc .pr-d-items td,.pr-doc .pr-d-pay td{padding:8px 9px;border-bottom:1px solid var(--pr-line);vertical-align:top}",
    ".pr-doc .pr-d-items tbody tr:nth-child(even) td,.pr-doc .pr-d-pay tbody tr:nth-child(even) td{background:#fbfaf7}",
    ".pr-doc .pr-d-items tbody tr:last-child td,.pr-doc .pr-d-pay tbody tr:last-child td{border-bottom:1.5px solid var(--pr-gold)}",
    ".pr-doc .pr-c-n{width:28px;text-align:center !important;color:var(--pr-muted)}",
    ".pr-doc th.pr-c-n{color:#fff}",
    ".pr-doc .pr-c-q{width:58px;text-align:end !important;white-space:nowrap}",
    ".pr-doc .pr-c-u{width:72px;white-space:nowrap}",
    ".pr-doc .pr-c-m{width:104px;text-align:end !important;white-space:nowrap}",
    ".pr-doc td.pr-c-desc{white-space:normal;word-break:break-word}",
    /* totals */
    ".pr-doc .pr-d-sumwrap{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;margin:10px 0 22px}",
    ".pr-doc .pr-d-note{font-size:7.8pt;color:var(--pr-muted);padding-top:6px}",
    ".pr-doc .pr-d-totals{width:52%;min-width:280px;font-size:9.4pt}",
    ".pr-doc .pr-d-totals th{text-align:start;font-weight:500;color:var(--pr-muted);padding:5px 10px}",
    ".pr-doc .pr-d-totals td{text-align:end;padding:5px 10px;white-space:nowrap}",
    ".pr-doc .pr-d-totals th .pr-l-sep{color:#c9c2b3}",
    ".pr-doc .pr-d-grand th,.pr-doc .pr-d-grand td{background:#1b1b1b;color:#fff;font-weight:700;padding:9px 10px;font-size:10.5pt}",
    ".pr-doc .pr-d-grand td{color:#e3cf9f}",
    ".pr-doc .pr-d-grand th .pr-l-sep{color:#8d8677}",
    /* sections */
    ".pr-doc section{margin-bottom:18px}",
    ".pr-doc .pr-d-h{display:flex;align-items:center;gap:10px;font-size:8.4pt;text-transform:uppercase;letter-spacing:.12em;color:var(--pr-gold-d);font-weight:700;margin-bottom:8px}",
    ".pr-doc[dir=rtl] .pr-d-h{letter-spacing:0;font-size:10.5pt}",
    ".pr-doc .pr-d-h .pr-l-ar{letter-spacing:0;text-transform:none;font-size:9.4pt}",
    ".pr-doc .pr-d-h::after{content:'';flex:1;height:1px;background:var(--pr-line)}",
    ".pr-doc .pr-d-cols{display:grid;grid-template-columns:1fr 1fr;gap:22px}",
    ".pr-doc .pr-d-list{list-style:none}",
    ".pr-doc .pr-d-list li{position:relative;padding-inline-start:14px;margin-bottom:3px;break-inside:avoid}",
    ".pr-doc .pr-d-list li::before{content:'';position:absolute;inset-inline-start:0;top:.62em;width:5px;height:5px;background:var(--pr-gold);transform:rotate(45deg)}",
    ".pr-doc .pr-d-terms{color:#3a3833;font-size:9pt}",
    ".pr-doc .pr-d-kv th{text-align:start;font-weight:500;color:var(--pr-muted);padding:3px 16px 3px 0;width:150px;white-space:nowrap}",
    ".pr-doc[dir=rtl] .pr-d-kv th{padding:3px 0 3px 16px}",
    ".pr-doc .pr-d-kv td{padding:3px 0;font-weight:600}",
    ".pr-doc .pr-d-bank{background:var(--pr-soft);padding:10px 14px;border-inline-start:2px solid var(--pr-gold)}",
    /* signatures */
    ".pr-doc .pr-d-sign{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:26px}",
    ".pr-doc .pr-d-sbox{border:1px solid var(--pr-line);padding:12px 14px;border-top:2px solid #1b1b1b}",
    ".pr-doc .pr-d-sline{display:flex;align-items:flex-end;gap:10px;margin-top:14px;font-size:8.4pt;color:var(--pr-muted)}",
    ".pr-doc .pr-d-sline span{white-space:nowrap;min-width:64px}",
    ".pr-doc .pr-d-sline i{flex:1;border-bottom:1px solid #b8b1a3;height:14px}",
    ".pr-doc .pr-d-stamp{margin-top:14px;height:62px;border:1px dashed #cfc7b6;border-radius:4px;display:flex;align-items:center;justify-content:center;color:#b8b1a3;font-size:8pt}",
    /* footer */
    ".pr-doc .pr-d-foot{margin-top:24px;padding-top:10px;border-top:1px solid var(--pr-gold);text-align:center;font-size:7.6pt;color:var(--pr-muted)}",
    ".pr-doc .pr-d-thanks{font-size:8.8pt;color:var(--pr-ink);margin-bottom:3px}",
    ".pr-doc .pr-d-thanks .pr-l-sep{color:#c9c2b3}",
    ".pr-doc .pr-l-ar{font-family:'Cairo',sans-serif}",
    "@media print{.pr-doc{font-size:9.4pt}}"
  ].join("\n");

  NX.actions.printProposal = function (p) {
    if (!p) return;
    NX.ui.print(buildDoc(p), DOC_CSS, p.number || "Quotation");
  };

  /* On-screen preview (scaled A4) with a button to print / save as PDF. */
  NX.actions.previewProposal = function (p) {
    if (!p) return;
    NX.ui.modal({
      title: NX.t("prop.previewTitle", { n: p.number || "" }), size: "xl",
      body: "<style>" + DOC_CSS + '</style><div class="pr-preview"><div class="pr-sheet">' + buildDoc(p) + "</div></div>",
      submitLabel: NX.t("c.print"),
      onOpen: function (formEl) {
        var box = formEl.querySelector(".pr-preview"), sheet = formEl.querySelector(".pr-sheet");
        var fit = function () {
          if (!document.body.contains(box)) { window.removeEventListener("resize", fit); return; }
          var cs = getComputedStyle(box);
          var w = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight), z = Math.min(1, w / 794);
          sheet.style.zoom = z;
        };
        setTimeout(fit, 0);
        window.addEventListener("resize", fit);
      },
      onSubmit: function () { setTimeout(function () { NX.actions.printProposal(p); }, 60); }
    });
  };

  /* ================= VIEW ================= */
  NX.view("proposals", {
    order: 40, icon: "proposals",
    render: function (el, params) {
      params = params || [];
      if (params[0] === "new") {
        el.innerHTML = '<div class="nx-empty"><div class="nx-spinner"></div><p>' + esc(NX.t("prop.creating")) + "</p></div>";
        if (!creating) setTimeout(function () { NX.actions.newProposal({ leadId: params[1] || "" }); }, 0);
        return;
      }
      if (params[0] && params[1] === "edit") return renderEditor(el, params[0]);
      if (params[0]) return renderDetail(el, params[0]);
      return renderList(el);
    }
  });
})();
