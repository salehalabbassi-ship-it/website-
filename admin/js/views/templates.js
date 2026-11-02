/* NEXA Workspace — Templates of NEXA (proposal templates, message templates, documents, project checklists) */
(function () {
  var esc = NX.esc;

  NX.i18n.add({
    en: {
      "tpl.title": "Templates of NEXA",
      "tpl.sub": "Ready-made proposals, messages, documents and checklists for the team.",
      "tpl.k.proposal": "Proposal templates",
      "tpl.k.message": "Message templates",
      "tpl.k.document": "Documents",
      "tpl.k.checklist": "Project checklists",
      "tpl.ks.proposal": "Proposals",
      "tpl.ks.message": "Messages",
      "tpl.ks.document": "Documents",
      "tpl.ks.checklist": "Checklists",
      "tpl.new.proposal": "New proposal template",
      "tpl.new.message": "New message",
      "tpl.new.document": "Add document",
      "tpl.new.checklist": "New checklist",
      "tpl.edit.proposal": "Edit proposal template",
      "tpl.edit.message": "Edit message template",
      "tpl.edit.document": "Edit document",
      "tpl.edit.checklist": "Edit checklist",
      "tpl.searchPh": "Search templates…",
      "tpl.langAll": "All",
      "tpl.lang": "Language",
      "tpl.l.ar": "Arabic",
      "tpl.l.en": "English",
      "tpl.l.both": "Bilingual",
      "tpl.channel": "Channel",
      "tpl.ch.whatsapp": "WhatsApp",
      "tpl.ch.email": "Email",
      "tpl.ch.any": "Any channel",
      "tpl.subject": "Email subject",
      "tpl.body": "Message",
      "tpl.bodyPh": "Hello {{name}}, …",
      "tpl.copy": "Copy",
      "tpl.copyText": "Copy text",
      "tpl.duplicate": "Duplicate",
      "tpl.copySuffix": "(copy)",
      "tpl.duplicated": "Duplicated",
      "tpl.empty": "No templates here yet.",
      "tpl.noMatch": "No templates match your search.",
      "tpl.phTitle": "Insert placeholder",
      "tpl.phHint": "Tap to insert at the cursor. Placeholders are filled automatically when sending.",
      "tpl.preview": "Live preview",
      "tpl.previewNote": "Preview uses sample client data.",
      "tpl.ph.name": "Client name",
      "tpl.ph.company": "Client company",
      "tpl.ph.service": "Service",
      "tpl.ph.proposalNumber": "Proposal number",
      "tpl.ph.proposalTitle": "Proposal title",
      "tpl.ph.total": "Proposal total",
      "tpl.ph.projectName": "Project name",
      "tpl.ph.myName": "My name",
      "tpl.ph.companyName": "Company name",
      "tpl.ph.companyPhone": "Company phone",
      "tpl.ph.companyEmail": "Company email",
      "tpl.ph.website": "Website",
      "tpl.sample.name": "Faisal Al-Harbi",
      "tpl.sample.company": "Al-Harbi Clinics",
      "tpl.sample.title": "Dental clinic — interior design",
      "tpl.sample.project": "Al-Harbi dental clinic",
      "tpl.items": "Line items",
      "tpl.desc": "Description",
      "tpl.qty": "Qty",
      "tpl.unit": "Unit",
      "tpl.rate": "Rate",
      "tpl.amount": "Amount",
      "tpl.addItem": "Add item",
      "tpl.removeRow": "Remove",
      "tpl.subtotal": "Subtotal",
      "tpl.vat": "VAT {r}%",
      "tpl.totalIncl": "Total incl. VAT",
      "tpl.sampleTotal": "Sample total",
      "tpl.exclVat": "excl. VAT",
      "tpl.nItems": "{n} items",
      "tpl.scope": "Scope of work",
      "tpl.scopeHint": "One item per line.",
      "tpl.exclusions": "Exclusions",
      "tpl.payments": "Payment milestones",
      "tpl.payLabel": "Milestone",
      "tpl.payLabelPh": "e.g. Advance",
      "tpl.percent": "%",
      "tpl.addPayment": "Add milestone",
      "tpl.paySum": "Total {p}%",
      "tpl.payWarn": "Milestones add up to {p}% — they should total 100%.",
      "tpl.terms": "Terms & conditions",
      "tpl.useTpl": "Use",
      "tpl.useTplTitle": "Create a proposal from this template",
      "tpl.docNote": "Files are stored in Google Drive (or on the website) and linked here, so the team can open, copy or share them in one tap.",
      "tpl.url": "Link (URL)",
      "tpl.urlHint": "Paste a Google Drive share link or a website address.",
      "tpl.openLink": "Open",
      "tpl.copyLink": "Copy link",
      "tpl.sendWa": "Send",
      "tpl.sendWaTitle": "Send the link on WhatsApp",
      "tpl.badUrl": "This link doesn't look valid.",
      "tpl.tasks": "Tasks",
      "tpl.task": "Task",
      "tpl.taskPh": "Task description",
      "tpl.phase": "Phase",
      "tpl.phasePh": "e.g. Design",
      "tpl.addTask": "Add task",
      "tpl.up": "Move up",
      "tpl.down": "Move down",
      "tpl.nTasks": "{n} tasks",
      "tpl.general": "General",
      "tpl.noTasks": "Add the first task below.",
      "tpl.anyService": "Any service"
    },
    ar: {
      "tpl.title": "قوالب نكسا",
      "tpl.sub": "عروض أسعار ورسائل ومستندات وقوائم مهام جاهزة لفريق العمل.",
      "tpl.k.proposal": "قوالب عروض الأسعار",
      "tpl.k.message": "قوالب الرسائل",
      "tpl.k.document": "المستندات",
      "tpl.k.checklist": "قوائم مهام المشاريع",
      "tpl.ks.proposal": "العروض",
      "tpl.ks.message": "الرسائل",
      "tpl.ks.document": "المستندات",
      "tpl.ks.checklist": "قوائم المهام",
      "tpl.new.proposal": "قالب عرض جديد",
      "tpl.new.message": "رسالة جديدة",
      "tpl.new.document": "إضافة مستند",
      "tpl.new.checklist": "قائمة مهام جديدة",
      "tpl.edit.proposal": "تعديل قالب العرض",
      "tpl.edit.message": "تعديل قالب الرسالة",
      "tpl.edit.document": "تعديل المستند",
      "tpl.edit.checklist": "تعديل قائمة المهام",
      "tpl.searchPh": "ابحث في القوالب…",
      "tpl.langAll": "الكل",
      "tpl.lang": "اللغة",
      "tpl.l.ar": "العربية",
      "tpl.l.en": "الإنجليزية",
      "tpl.l.both": "ثنائي اللغة",
      "tpl.channel": "القناة",
      "tpl.ch.whatsapp": "واتساب",
      "tpl.ch.email": "بريد إلكتروني",
      "tpl.ch.any": "أي قناة",
      "tpl.subject": "عنوان البريد",
      "tpl.body": "نص الرسالة",
      "tpl.bodyPh": "مرحباً {{name}}، …",
      "tpl.copy": "نسخ",
      "tpl.copyText": "نسخ النص",
      "tpl.duplicate": "تكرار",
      "tpl.copySuffix": "(نسخة)",
      "tpl.duplicated": "تم إنشاء نسخة",
      "tpl.empty": "لا توجد قوالب هنا بعد.",
      "tpl.noMatch": "لا توجد قوالب مطابقة للبحث.",
      "tpl.phTitle": "إدراج متغيّر",
      "tpl.phHint": "اضغط لإدراج المتغيّر مكان المؤشر. تُعبّأ المتغيّرات تلقائياً عند الإرسال.",
      "tpl.preview": "معاينة مباشرة",
      "tpl.previewNote": "المعاينة ببيانات عميل تجريبية.",
      "tpl.ph.name": "اسم العميل",
      "tpl.ph.company": "شركة العميل",
      "tpl.ph.service": "الخدمة",
      "tpl.ph.proposalNumber": "رقم العرض",
      "tpl.ph.proposalTitle": "عنوان العرض",
      "tpl.ph.total": "إجمالي العرض",
      "tpl.ph.projectName": "اسم المشروع",
      "tpl.ph.myName": "اسمي",
      "tpl.ph.companyName": "اسم الشركة",
      "tpl.ph.companyPhone": "هاتف الشركة",
      "tpl.ph.companyEmail": "بريد الشركة",
      "tpl.ph.website": "الموقع الإلكتروني",
      "tpl.sample.name": "فيصل الحربي",
      "tpl.sample.company": "عيادات الحربي",
      "tpl.sample.title": "التصميم الداخلي لعيادة أسنان",
      "tpl.sample.project": "عيادة الحربي للأسنان",
      "tpl.items": "بنود العرض",
      "tpl.desc": "الوصف",
      "tpl.qty": "الكمية",
      "tpl.unit": "الوحدة",
      "tpl.rate": "سعر الوحدة",
      "tpl.amount": "المبلغ",
      "tpl.addItem": "إضافة بند",
      "tpl.removeRow": "حذف",
      "tpl.subtotal": "المجموع الفرعي",
      "tpl.vat": "ضريبة القيمة المضافة {r}%",
      "tpl.totalIncl": "الإجمالي شامل الضريبة",
      "tpl.sampleTotal": "الإجمالي التقديري",
      "tpl.exclVat": "بدون الضريبة",
      "tpl.nItems": "{n} بند",
      "tpl.scope": "نطاق العمل",
      "tpl.scopeHint": "بند واحد في كل سطر.",
      "tpl.exclusions": "الاستثناءات",
      "tpl.payments": "دفعات السداد",
      "tpl.payLabel": "الدفعة",
      "tpl.payLabelPh": "مثال: دفعة مقدمة",
      "tpl.percent": "%",
      "tpl.addPayment": "إضافة دفعة",
      "tpl.paySum": "المجموع {p}%",
      "tpl.payWarn": "مجموع الدفعات {p}% — يجب أن يكون 100%.",
      "tpl.terms": "الشروط والأحكام",
      "tpl.useTpl": "استخدام",
      "tpl.useTplTitle": "إنشاء عرض سعر من هذا القالب",
      "tpl.docNote": "تُحفظ الملفات في Google Drive (أو على الموقع) وتُربط هنا، ليتمكن الفريق من فتحها أو نسخ رابطها أو مشاركتها بضغطة واحدة.",
      "tpl.url": "الرابط (URL)",
      "tpl.urlHint": "الصق رابط مشاركة من Google Drive أو عنوان صفحة على الموقع.",
      "tpl.openLink": "فتح",
      "tpl.copyLink": "نسخ الرابط",
      "tpl.sendWa": "إرسال",
      "tpl.sendWaTitle": "إرسال الرابط عبر واتساب",
      "tpl.badUrl": "يبدو أن الرابط غير صحيح.",
      "tpl.tasks": "المهام",
      "tpl.task": "المهمة",
      "tpl.taskPh": "وصف المهمة",
      "tpl.phase": "المرحلة",
      "tpl.phasePh": "مثال: التصميم",
      "tpl.addTask": "إضافة مهمة",
      "tpl.up": "تحريك للأعلى",
      "tpl.down": "تحريك للأسفل",
      "tpl.nTasks": "{n} مهمة",
      "tpl.general": "عام",
      "tpl.noTasks": "أضف أول مهمة من الأسفل.",
      "tpl.anyService": "أي خدمة"
    }
  });

  var KINDS = ["proposal", "message", "document", "checklist"];
  var KIND_ICON = { proposal: "proposals", message: "conversations", document: "file", checklist: "list" };
  var PH = ["name", "company", "service", "proposalNumber", "proposalTitle", "total", "projectName", "myName", "companyName", "companyPhone", "companyEmail", "website"];
  var UNITS = ["LS", "m²", "m", "month", "visit", "item", "drawing", "day"];
  var CH_TONE = { whatsapp: "green", email: "blue", any: "gray" };

  /* UI state (survives re-renders) */
  var state = { tab: "message", q: "", lang: "all" };
  var openedParam = null;

  /* ---------- Helpers ---------- */
  function langLabel(l) { return NX.t("tpl.l." + (l === "ar" || l === "en" ? l : "both")); }
  function langOpts() { return ["ar", "en", "both"].map(function (l) { return { value: l, label: langLabel(l) }; }); }
  function langTag(l) { return '<span class="tp-lang">' + NX.icon("globe", 12) + esc(langLabel(l)) + "</span>"; }
  function svcOpts() { return [{ value: "", label: NX.t("tpl.anyService") }].concat(NX.opts("services")); }
  function num(v) { return Number(v) || 0; }
  function langOk(t) { return state.lang === "all" || t.lang === state.lang || t.lang === "both" || !t.lang; }
  function textOf(t) {
    var d = t.data || {};
    return [t.name, t.subject, t.body, t.url, t.notes, NX.opt("services", t.service), d.scope,
      (d.items || []).map(function (i) { return i.desc; }).join(" "), (d.tasks || []).map(function (i) { return i.text + " " + i.phase; }).join(" ")].join(" ").toLowerCase();
  }
  function safeUrl(u) {
    u = String(u || "").trim();
    if (!u) return "";
    if (!/^[a-z][a-z0-9+.-]*:/i.test(u)) u = "https://" + u.replace(/^\/+/, "");
    return /^https?:\/\//i.test(u) ? u : "";
  }
  function host(u) { try { return new URL(u).hostname.replace(/^www\./, ""); } catch (e) { return u; } }
  function highlight(text) {
    return esc(text).replace(/\{\{\s*(\w+)\s*\}\}/g, '<span class="tp-tok">{{$1}}</span>');
  }
  function phases(tasks) {
    var order = [], map = {};
    (tasks || []).forEach(function (t) {
      var ph = String(t.phase || "").trim() || NX.t("tpl.general");
      if (!map[ph]) { map[ph] = []; order.push(ph); }
      map[ph].push(t);
    });
    return order.map(function (ph) { return { phase: ph, tasks: map[ph] }; });
  }
  function propTotals(data) {
    return NX.calc.proposal({ items: (data && data.items) || [], discount: 0, vatRate: NX.store.settings.vatRate });
  }
  function save(t, changes, msg) { return NX.ui.run(NX.store.save("templates", Object.assign({}, t, changes || {})), msg); }
  function duplicate(t) {
    var c = JSON.parse(JSON.stringify(t));
    delete c.id; delete c.createdAt; delete c.updatedAt; delete c.createdBy;
    c.name = (t.name || "") + " " + NX.t("tpl.copySuffix");
    return NX.ui.run(NX.store.save("templates", c), NX.t("tpl.duplicated"));
  }
  function sbtn(label, icon, act, id, extraCls, title) {
    return '<button type="button" class="nx-btn nx-btn-ghost nx-btn-sm tp-act' + (extraCls ? " " + extraCls : "") + '" data-act="' + act + '" data-id="' + esc(id) + '"' +
      (title ? ' title="' + esc(title) + '" aria-label="' + esc(title) + '"' : "") + ">" + NX.icon(icon, 15) + (label ? "<span>" + esc(label) + "</span>" : "") + "</button>";
  }
  function delBtn(t) { return NX.store.isAdmin() ? sbtn("", "trash", "del", t.id, "tp-icon tp-del", NX.t("c.delete")) : ""; }

  /* ================= LIST ================= */
  function render(el, params) {
    if (params && params[0]) {
      var pt = NX.store.get("templates", params[0]);
      if (pt && openedParam !== params[0]) {
        openedParam = params[0];
        state.tab = pt.kind;
        setTimeout(function () { editor(pt); NX.go("templates"); }, 0);
      }
    } else openedParam = null;

    var all = NX.store.all("templates");
    var counts = {};
    KINDS.forEach(function (k) { counts[k] = all.filter(function (t) { return t.kind === k; }).length; });
    var q = state.q.trim().toLowerCase();
    var rows = all.filter(function (t) { return t.kind === state.tab && langOk(t) && (!q || textOf(t).indexOf(q) > -1); })
      .sort(function (a, b) { return String(a.name || "").localeCompare(String(b.name || "")); });

    var head = NX.ui.pageHead({
      title: NX.t("tpl.title"),
      sub: esc(NX.t("tpl.sub")),
      actions: NX.ui.btn({ label: NX.t("tpl.new." + state.tab), icon: "plus", act: "new", cls: "primary" })
    });

    var tabs = '<div class="tp-tabs" role="tablist">' + KINDS.map(function (k) {
      return '<button type="button" role="tab" class="tp-tab' + (k === state.tab ? " is-active" : "") + '" data-tab="' + k + '" aria-selected="' + (k === state.tab) + '">' +
        NX.icon(KIND_ICON[k], 16) + '<span class="tp-tab-l">' + esc(NX.t("tpl.k." + k)) + '</span><span class="tp-tab-s">' + esc(NX.t("tpl.ks." + k)) + '</span><span class="tp-tab-n nx-num">' + counts[k] + "</span></button>";
    }).join("") + "</div>";

    var toolbar = '<div class="nx-toolbar tp-toolbar">' + NX.ui.searchBox(state.q, NX.t("tpl.searchPh")) +
      '<div class="nx-seg tp-langseg" role="group" aria-label="' + esc(NX.t("tpl.lang")) + '">' +
      [["all", NX.t("tpl.langAll")], ["ar", NX.t("tpl.l.ar")], ["en", NX.t("tpl.l.en")]].map(function (o) {
        return '<button type="button" data-lang-f="' + o[0] + '" class="' + (state.lang === o[0] ? "is-active" : "") + '">' + esc(o[1]) + "</button>";
      }).join("") + "</div></div>";

    var note = state.tab === "document" ? '<p class="nx-note-box tp-docnote">' + esc(NX.t("tpl.docNote")) + "</p>" : "";

    var body = rows.length
      ? '<div class="tp-grid tp-grid-' + state.tab + '">' + rows.map(cardFor).join("") + "</div>"
      : NX.ui.card("", NX.ui.empty(counts[state.tab] ? NX.t("tpl.noMatch") : NX.t("tpl.empty"),
        counts[state.tab] ? "" : NX.ui.btn({ label: NX.t("tpl.new." + state.tab), icon: "plus", act: "new", cls: "primary" })));

    el.innerHTML = head + tabs + toolbar + note + body;

    NX.ui.on(el, "click", "[data-tab]", function (e, b) { state.tab = b.getAttribute("data-tab"); NX.app.rerender(); });
    NX.ui.on(el, "click", "[data-lang-f]", function (e, b) { state.lang = b.getAttribute("data-lang-f"); NX.app.rerender(); });
    NX.ui.on(el, "input", "[data-search]", function (e, i) { state.q = i.value; NX.app.rerender(); });
    NX.ui.on(el, "click", "[data-act=new]", function () { editor({ kind: state.tab, lang: state.lang !== "all" ? state.lang : (NX.i18n.isAr ? "ar" : "en"), channel: "any" }); });

    var byId = function (b) { return NX.store.get("templates", b.getAttribute("data-id")); };
    NX.ui.on(el, "click", "[data-act=edit]", function (e, b) { var t = byId(b); if (t) editor(t); });
    NX.ui.on(el, "click", "[data-act=dup]", function (e, b) { var t = byId(b); if (t) duplicate(t); });
    NX.ui.on(el, "click", "[data-act=del]", function (e, b) { NX.ui.del("templates", b.getAttribute("data-id")); });
    NX.ui.on(el, "click", "[data-act=copy]", function (e, b) {
      var t = byId(b); if (!t) return;
      NX.ui.copy(t.kind === "document" ? safeUrl(t.url) : (t.body || ""));
    });
    NX.ui.on(el, "click", "[data-act=use]", function (e, b) {
      if (NX.actions.newProposal) NX.actions.newProposal({ templateId: b.getAttribute("data-id") });
    });
    NX.ui.on(el, "click", "[data-act=open-card]", function (e, c) {
      if (e.target.closest("a,button")) return;
      var t = NX.store.get("templates", c.getAttribute("data-id")); if (t) editor(t);
    });
  }

  function cardFor(t) {
    var inner = t.kind === "message" ? messageCard(t) : t.kind === "proposal" ? proposalCard(t) : t.kind === "document" ? documentCard(t) : checklistCard(t);
    return '<article class="tp-card" data-act="open-card" data-id="' + esc(t.id) + '">' + inner + "</article>";
  }

  function cardHead(t, badges) {
    return '<div class="tp-card-head"><span class="tp-kind-ic">' + NX.icon(KIND_ICON[t.kind] || "file", 16) + "</span>" +
      '<div class="tp-card-title"><h3 dir="auto">' + esc(t.name || "—") + '</h3><div class="tp-meta">' + badges + "</div></div></div>";
  }

  function messageCard(t) {
    var ch = t.channel || "any";
    return cardHead(t, NX.ui.badge(NX.t("tpl.ch." + ch), CH_TONE[ch] || "gray") + langTag(t.lang)) +
      (t.subject && ch !== "whatsapp" ? '<p class="tp-subj" dir="auto">' + NX.icon("mail", 13) + "<span>" + highlight(t.subject) + "</span></p>" : "") +
      '<p class="tp-body" dir="auto"><span>' + highlight(t.body || "") + "</span></p>" +
      '<div class="tp-card-actions">' +
      '<button type="button" class="nx-btn nx-btn-primary nx-btn-sm tp-act" data-act="copy" data-id="' + esc(t.id) + '">' + NX.icon("copy", 15) + "<span>" + esc(NX.t("tpl.copyText")) + "</span></button>" +
      sbtn(NX.t("c.edit"), "edit", "edit", t.id) + sbtn("", "copy", "dup", t.id, "tp-icon", NX.t("tpl.duplicate")) + delBtn(t) + "</div>";
  }

  function proposalCard(t) {
    var d = t.data || {}, tot = propTotals(d);
    var pays = (d.payments || []).map(function (p) { return num(p.percent) + "%"; }).join(" · ");
    return cardHead(t, (t.service ? NX.ui.badge(NX.opt("services", t.service), "gold") : "") + langTag(t.lang)) +
      '<ul class="tp-lines">' + (d.items || []).slice(0, 4).map(function (i) {
        return '<li><span dir="auto">' + esc(i.desc || "—") + '</span><span class="nx-num">' + esc(NX.fmt.num(i.qty)) + " " + esc(i.unit || "") + " × " + esc(NX.fmt.num(i.rate)) + "</span></li>";
      }).join("") + ((d.items || []).length > 4 ? '<li class="nx-muted">+' + ((d.items || []).length - 4) + "</li>" : "") + "</ul>" +
      '<div class="tp-total"><div><small>' + esc(NX.t("tpl.sampleTotal")) + " · " + esc(NX.t("tpl.nItems", { n: (d.items || []).length })) + '</small><b class="nx-num">' + NX.fmt.money(tot.net) + "</b></div>" +
      '<div class="tp-total-side"><small>' + esc(NX.t("tpl.totalIncl")) + '</small><span class="nx-num">' + NX.fmt.money(tot.total) + "</span></div></div>" +
      (pays ? '<p class="tp-pays nx-small nx-muted">' + esc(NX.t("tpl.payments")) + ': <span class="nx-num" dir="ltr">' + esc(pays) + "</span></p>" : "") +
      '<div class="tp-card-actions">' +
      (NX.actions.newProposal ? '<button type="button" class="nx-btn nx-btn-primary nx-btn-sm tp-act" data-act="use" data-id="' + esc(t.id) + '" title="' + esc(NX.t("tpl.useTplTitle")) + '">' + NX.icon("proposals", 15) + "<span>" + esc(NX.t("tpl.useTpl")) + "</span></button>" : "") +
      sbtn(NX.t("c.edit"), "edit", "edit", t.id) + sbtn("", "copy", "dup", t.id, "tp-icon", NX.t("tpl.duplicate")) + delBtn(t) + "</div>";
  }

  function documentCard(t) {
    var u = safeUrl(t.url);
    var wa = "https://wa.me/?text=" + encodeURIComponent((t.name ? t.name + "\n" : "") + u);
    return cardHead(t, langTag(t.lang)) +
      (u ? '<p class="tp-url" dir="ltr">' + NX.icon("link", 13) + "<span>" + esc(host(u)) + "</span></p>" : "") +
      (t.notes ? '<p class="tp-notes" dir="auto">' + esc(t.notes) + "</p>" : "") +
      '<div class="tp-card-actions">' +
      (u ? '<a class="nx-btn nx-btn-primary nx-btn-sm tp-act" href="' + esc(u) + '" target="_blank" rel="noopener">' + NX.icon("out", 15) + "<span>" + esc(NX.t("tpl.openLink")) + "</span></a>" +
        sbtn(NX.t("tpl.copy"), "copy", "copy", t.id, "", NX.t("tpl.copyLink")) +
        '<a class="nx-btn nx-btn-wa nx-btn-sm tp-act" href="' + esc(wa) + '" target="_blank" rel="noopener" title="' + esc(NX.t("tpl.sendWaTitle")) + '">' + NX.icon("whatsapp", 15) + "<span>" + esc(NX.t("tpl.sendWa")) + "</span></a>" : "") +
      sbtn("", "edit", "edit", t.id, "tp-icon", NX.t("c.edit")) + delBtn(t) + "</div>";
  }

  function checklistCard(t) {
    var tasks = ((t.data || {}).tasks) || [];
    var groups = phases(tasks);
    return cardHead(t, (t.service ? NX.ui.badge(NX.opt("services", t.service), "gold") : "") + '<span class="tp-lang">' + NX.icon("check", 12) + esc(NX.t("tpl.nTasks", { n: tasks.length })) + "</span>") +
      '<ol class="tp-phases">' + groups.map(function (g) {
        return '<li><span dir="auto">' + esc(g.phase) + '</span><span class="nx-num">' + g.tasks.length + "</span></li>";
      }).join("") + "</ol>" +
      '<div class="tp-card-actions">' + sbtn(NX.t("c.edit"), "edit", "edit", t.id) + sbtn("", "copy", "dup", t.id, "tp-icon", NX.t("tpl.duplicate")) + delBtn(t) + "</div>";
  }

  /* ================= EDITORS ================= */
  function editor(t) {
    if (t.kind === "message") return editMessage(t);
    if (t.kind === "proposal") return editProposal(t);
    if (t.kind === "document") return editDocument(t);
    if (t.kind === "checklist") return editChecklist(t);
  }
  function titleFor(t) { return NX.t((t.id ? "tpl.edit." : "tpl.new.") + t.kind); }

  /* ---------- Message ---------- */
  function sampleCtx(lang) {
    var ar = lang === "ar" || (lang !== "en" && NX.i18n.isAr);
    var pick = function (k) { return (ar ? arSample : enSample)[k]; };
    var s = NX.store.settings;
    return NX.templateContext({
      lang: ar ? "ar" : "en",
      lead: { name: pick("tpl.sample.name"), company: pick("tpl.sample.company"), service: "interior" },
      proposal: { number: (s.proposalPrefix || "NX") + "-" + new Date().getFullYear() + "-001", title: pick("tpl.sample.title"), items: [{ qty: 1, rate: 120000 }], discount: 0, vatRate: s.vatRate, service: "interior" },
      project: { name: pick("tpl.sample.project"), service: "interior" }
    });
  }
  var arSample = { "tpl.sample.name": "فيصل الحربي", "tpl.sample.company": "عيادات الحربي", "tpl.sample.title": "التصميم الداخلي لعيادة أسنان", "tpl.sample.project": "عيادة الحربي للأسنان" };
  var enSample = { "tpl.sample.name": "Faisal Al-Harbi", "tpl.sample.company": "Al-Harbi Clinics", "tpl.sample.title": "Dental clinic — interior design", "tpl.sample.project": "Al-Harbi dental clinic" };

  function editMessage(t) {
    var F = NX.ui.field;
    var body = '<div class="tp-msg-ed"><div class="tp-msg-form"><div class="nx-form-grid">' +
      F({ name: "name", label: NX.t("c.name"), required: true, full: true, value: t.name, dir: "auto" }) +
      F({ name: "lang", label: NX.t("tpl.lang"), type: "select", options: langOpts(), value: t.lang || "en" }) +
      F({ name: "channel", label: NX.t("tpl.channel"), type: "select", options: ["whatsapp", "email", "any"].map(function (c) { return { value: c, label: NX.t("tpl.ch." + c) }; }), value: t.channel || "any" }) +
      F({ name: "subject", label: NX.t("tpl.subject"), full: true, value: t.subject, dir: "auto" }) +
      F({ name: "body", label: NX.t("tpl.body"), type: "textarea", rows: 9, full: true, required: true, value: t.body, dir: "auto", placeholder: NX.t("tpl.bodyPh") }) +
      "</div>" +
      '<div class="tp-phs"><div class="tp-phs-head"><b>' + esc(NX.t("tpl.phTitle")) + "</b><small>" + esc(NX.t("tpl.phHint")) + "</small></div>" +
      '<div class="tp-phs-list">' + PH.map(function (k) {
        return '<button type="button" class="tp-ph" data-ph="' + k + '" title="' + esc(NX.t("tpl.ph." + k)) + '"><code>{{' + k + "}}</code><span>" + esc(NX.t("tpl.ph." + k)) + "</span></button>";
      }).join("") + "</div></div></div>" +
      '<aside class="tp-msg-prev"><div class="tp-prev-label">' + NX.icon("conversations", 14) + "<span>" + esc(NX.t("tpl.preview")) + "</span></div>" +
      '<div class="tp-prev-box" data-prev><div class="tp-prev-subj" data-prev-subj dir="auto"></div><div class="tp-prev-body" data-prev-body dir="auto"></div></div>' +
      '<small class="nx-muted">' + esc(NX.t("tpl.previewNote")) + "</small></aside></div>";

    NX.ui.modal({
      title: titleFor(t), size: "xl", body: body,
      onOpen: function (f) {
        var last = f.body;
        var subjField = f.subject.closest(".nx-field");
        var update = function () {
          var ch = f.channel.value;
          subjField.classList.toggle("nx-hide", ch === "whatsapp");
          var ctx = sampleCtx(f.lang.value);
          var box = f.querySelector("[data-prev]");
          box.className = "tp-prev-box" + (ch === "whatsapp" ? " is-wa" : " is-mail");
          var subj = ch === "whatsapp" ? "" : NX.fill(f.subject.value, ctx);
          f.querySelector("[data-prev-subj]").textContent = subj;
          f.querySelector("[data-prev-subj]").hidden = !subj;
          f.querySelector("[data-prev-body]").textContent = NX.fill(f.body.value, ctx) || "…";
        };
        [f.subject, f.body].forEach(function (x) { x.addEventListener("focus", function () { last = x; }); });
        f.addEventListener("input", update);
        f.addEventListener("change", update);
        NX.ui.on(f, "mousedown", "[data-ph]", function (e) { e.preventDefault(); });
        NX.ui.on(f, "click", "[data-ph]", function (e, b) {
          var tok = "{{" + b.getAttribute("data-ph") + "}}";
          var target = (last === f.subject && !subjField.classList.contains("nx-hide")) ? f.subject : f.body;
          var s = target.selectionStart == null ? target.value.length : target.selectionStart;
          var en = target.selectionEnd == null ? s : target.selectionEnd;
          target.setRangeText(tok, s, en, "end");
          target.focus();
          update();
        });
        update();
      },
      onSubmit: function (d) {
        var rec = { kind: "message", name: d.name, lang: d.lang, channel: d.channel, subject: d.channel === "whatsapp" ? (t.subject || "") : d.subject, body: d.body };
        return save(t, rec);
      }
    });
  }

  /* ---------- Proposal ---------- */
  function itemRow(it) {
    it = it || {};
    return '<div class="tp-item" data-item>' +
      '<label class="tp-c-desc"><span class="tp-ml">' + esc(NX.t("tpl.desc")) + '</span><input class="nx-input" data-k="desc" dir="auto" value="' + esc(it.desc || "") + '" /></label>' +
      '<label class="tp-c-qty"><span class="tp-ml">' + esc(NX.t("tpl.qty")) + '</span><input class="nx-input nx-num" data-k="qty" type="number" step="any" min="0" inputmode="decimal" dir="ltr" value="' + esc(it.qty == null ? 1 : it.qty) + '" /></label>' +
      '<label class="tp-c-unit"><span class="tp-ml">' + esc(NX.t("tpl.unit")) + '</span><input class="nx-input" data-k="unit" list="tpUnits" value="' + esc(it.unit || "") + '" /></label>' +
      '<label class="tp-c-rate"><span class="tp-ml">' + esc(NX.t("tpl.rate")) + '</span><input class="nx-input nx-num" data-k="rate" type="number" step="any" min="0" inputmode="decimal" dir="ltr" value="' + esc(it.rate == null ? "" : it.rate) + '" /></label>' +
      '<div class="tp-c-amt"><span class="tp-ml">' + esc(NX.t("tpl.amount")) + '</span><b class="nx-num" data-amt>0</b></div>' +
      '<button type="button" class="nx-btn nx-btn-icon nx-btn-sm tp-c-del" data-act="row-del" title="' + esc(NX.t("tpl.removeRow")) + '" aria-label="' + esc(NX.t("tpl.removeRow")) + '">' + NX.icon("trash", 15) + "</button>" +
      "</div>";
  }
  function payRow(p) {
    p = p || {};
    return '<div class="tp-pay" data-pay>' +
      '<input class="nx-input" data-k="label" dir="auto" placeholder="' + esc(NX.t("tpl.payLabelPh")) + '" aria-label="' + esc(NX.t("tpl.payLabel")) + '" value="' + esc(p.label || "") + '" />' +
      '<label class="tp-pct" dir="ltr"><input class="nx-input nx-num" data-k="percent" type="number" step="any" min="0" max="100" inputmode="decimal" dir="ltr" value="' + esc(p.percent == null ? "" : p.percent) + '" /><span>%</span></label>' +
      '<button type="button" class="nx-btn nx-btn-icon nx-btn-sm" data-act="row-del" title="' + esc(NX.t("tpl.removeRow")) + '" aria-label="' + esc(NX.t("tpl.removeRow")) + '">' + NX.icon("trash", 15) + "</button></div>";
  }

  function editProposal(t) {
    var d = t.data || {};
    var items = (d.items && d.items.length) ? d.items : [{}];
    var pays = d.payments || [];
    var F = NX.ui.field;
    var vatRate = num(NX.store.settings.vatRate);
    var body = '<div class="nx-form-grid tp-pform">' +
      F({ name: "name", label: NX.t("c.name"), required: true, full: true, value: t.name, dir: "auto" }) +
      F({ name: "service", label: NX.t("c.service"), type: "select", options: svcOpts(), value: t.service || "" }) +
      F({ name: "lang", label: NX.t("tpl.lang"), type: "select", options: langOpts(), value: t.lang || "en" }) +
      '<div class="nx-form-section">' + esc(NX.t("tpl.items")) + "</div>" +
      '<div class="nx-full"><div class="tp-items">' +
      '<div class="tp-items-head"><span>' + esc(NX.t("tpl.desc")) + "</span><span>" + esc(NX.t("tpl.qty")) + "</span><span>" + esc(NX.t("tpl.unit")) + "</span><span>" + esc(NX.t("tpl.rate")) + '</span><span class="nx-right">' + esc(NX.t("tpl.amount")) + "</span><span></span></div>" +
      '<div data-items>' + items.map(itemRow).join("") + "</div></div>" +
      '<datalist id="tpUnits">' + UNITS.map(function (u) { return '<option value="' + esc(u) + '">'; }).join("") + "</datalist>" +
      '<div class="tp-items-foot">' + NX.ui.btn({ label: NX.t("tpl.addItem"), icon: "plus", act: "item-add", cls: "ghost sm" }) +
      '<dl class="tp-sums"><div><dt>' + esc(NX.t("tpl.subtotal")) + '</dt><dd class="nx-num" data-sub></dd></div>' +
      "<div><dt>" + esc(NX.t("tpl.vat", { r: vatRate })) + '</dt><dd class="nx-num" data-vat></dd></div>' +
      '<div class="is-total"><dt>' + esc(NX.t("tpl.totalIncl")) + '</dt><dd class="nx-num" data-tot></dd></div></dl></div></div>' +
      '<div class="nx-form-section">' + esc(NX.t("tpl.scope")) + " · " + esc(NX.t("tpl.exclusions")) + "</div>" +
      F({ name: "scope", label: NX.t("tpl.scope"), type: "textarea", rows: 5, value: d.scope, dir: "auto", hint: NX.t("tpl.scopeHint") }) +
      F({ name: "exclusions", label: NX.t("tpl.exclusions"), type: "textarea", rows: 5, value: d.exclusions, dir: "auto", hint: NX.t("tpl.scopeHint") }) +
      '<div class="nx-form-section">' + esc(NX.t("tpl.payments")) + "</div>" +
      '<div class="nx-full"><div data-pays class="tp-pays-ed">' + pays.map(payRow).join("") + "</div>" +
      '<div class="tp-pays-foot">' + NX.ui.btn({ label: NX.t("tpl.addPayment"), icon: "plus", act: "pay-add", cls: "ghost sm" }) + '<span class="tp-paysum" data-paysum></span></div></div>' +
      '<div class="nx-form-section">' + esc(NX.t("tpl.terms")) + "</div>" +
      F({ name: "terms", label: "", type: "textarea", rows: 3, full: true, value: d.terms, dir: "auto" }) +
      "</div>";

    NX.ui.modal({
      title: titleFor(t), size: "xl", body: body,
      onOpen: function (f) {
        var itemsBox = f.querySelector("[data-items]"), paysBox = f.querySelector("[data-pays]");
        var calc = function () {
          var sub = 0;
          itemsBox.querySelectorAll("[data-item]").forEach(function (r) {
            var a = num(r.querySelector("[data-k=qty]").value) * num(r.querySelector("[data-k=rate]").value);
            sub += a;
            r.querySelector("[data-amt]").textContent = NX.fmt.money(a, { bare: true });
          });
          var vat = sub * vatRate / 100;
          f.querySelector("[data-sub]").textContent = NX.fmt.money(sub);
          f.querySelector("[data-vat]").textContent = NX.fmt.money(vat);
          f.querySelector("[data-tot]").textContent = NX.fmt.money(sub + vat);
          var rowsP = paysBox.querySelectorAll("[data-pay]"), ps = 0;
          rowsP.forEach(function (r) { ps += num(r.querySelector("[data-k=percent]").value); });
          ps = Math.round(ps * 100) / 100;
          var sumEl = f.querySelector("[data-paysum]");
          if (!rowsP.length) { sumEl.textContent = ""; sumEl.className = "tp-paysum"; }
          else if (ps === 100) { sumEl.textContent = "✓ " + NX.t("tpl.paySum", { p: ps }); sumEl.className = "tp-paysum is-ok"; }
          else { sumEl.textContent = NX.t("tpl.payWarn", { p: ps }); sumEl.className = "tp-paysum is-warn"; }
        };
        f.addEventListener("input", calc);
        NX.ui.on(f, "click", "[data-act=item-add]", function () {
          itemsBox.insertAdjacentHTML("beforeend", itemRow({}));
          itemsBox.lastElementChild.querySelector("[data-k=desc]").focus(); calc();
        });
        NX.ui.on(f, "click", "[data-act=pay-add]", function () {
          var used = 0; paysBox.querySelectorAll("[data-k=percent]").forEach(function (x) { used += num(x.value); });
          paysBox.insertAdjacentHTML("beforeend", payRow({ percent: used < 100 ? Math.round((100 - used) * 100) / 100 : "" }));
          paysBox.lastElementChild.querySelector("[data-k=label]").focus(); calc();
        });
        NX.ui.on(f, "click", "[data-act=row-del]", function (e, b) { (b.closest("[data-item]") || b.closest("[data-pay]")).remove(); calc(); });
        calc();
      },
      onSubmit: function (v, f) {
        var its = [];
        f.querySelectorAll("[data-item]").forEach(function (r) {
          var g = function (k) { return r.querySelector("[data-k=" + k + "]").value.trim(); };
          if (!g("desc") && !g("rate")) return;
          its.push({ desc: g("desc"), qty: g("qty") === "" ? 1 : num(g("qty")), unit: g("unit"), rate: num(g("rate")) });
        });
        var ps = [];
        f.querySelectorAll("[data-pay]").forEach(function (r) {
          var l = r.querySelector("[data-k=label]").value.trim(), p = r.querySelector("[data-k=percent]").value;
          if (!l && p === "") return;
          ps.push({ label: l, percent: num(p) });
        });
        return save(t, {
          kind: "proposal", name: v.name, service: v.service, lang: v.lang,
          data: Object.assign({}, t.data || {}, { items: its, scope: v.scope, exclusions: v.exclusions, payments: ps, terms: v.terms })
        });
      }
    });
  }

  /* ---------- Document ---------- */
  function editDocument(t) {
    NX.ui.modal({
      title: titleFor(t), size: "md",
      body: '<p class="nx-note-box tp-mb">' + esc(NX.t("tpl.docNote")) + "</p>" + NX.ui.form([
        { name: "name", label: NX.t("c.name"), required: true, full: true, value: t.name, dir: "auto" },
        { name: "url", label: NX.t("tpl.url"), type: "url", required: true, full: true, value: t.url, placeholder: "https://drive.google.com/…", hint: NX.t("tpl.urlHint") },
        { name: "lang", label: NX.t("tpl.lang"), type: "select", options: langOpts(), value: t.lang || "both" },
        { name: "notes", label: NX.t("c.notes"), type: "textarea", rows: 3, full: true, value: t.notes, dir: "auto" }
      ]),
      onOpen: function (f) {
        // Accept links pasted without https:// (the browser's url check would reject them).
        f.url.addEventListener("blur", function () { var u = safeUrl(f.url.value); if (u) f.url.value = u; });
      },
      onSubmit: function (d) {
        var u = safeUrl(d.url);
        if (!u) { NX.ui.toast(NX.t("tpl.badUrl"), "error"); return false; }
        return save(t, { kind: "document", name: d.name, url: u, lang: d.lang, notes: d.notes });
      }
    });
  }

  /* ---------- Checklist ---------- */
  function taskRow(x) {
    x = x || {};
    return '<div class="tp-task" data-task>' +
      '<span class="tp-task-n nx-num" data-n></span>' +
      '<input class="nx-input tp-task-text" data-k="text" dir="auto" placeholder="' + esc(NX.t("tpl.taskPh")) + '" aria-label="' + esc(NX.t("tpl.task")) + '" value="' + esc(x.text || "") + '" />' +
      '<input class="nx-input tp-task-phase" data-k="phase" dir="auto" list="tpPhases" placeholder="' + esc(NX.t("tpl.phasePh")) + '" aria-label="' + esc(NX.t("tpl.phase")) + '" value="' + esc(x.phase || "") + '" />' +
      '<div class="tp-task-btns">' +
      '<button type="button" class="nx-btn nx-btn-icon nx-btn-sm tp-up" data-act="t-up" title="' + esc(NX.t("tpl.up")) + '" aria-label="' + esc(NX.t("tpl.up")) + '">' + NX.icon("arrow", 15) + "</button>" +
      '<button type="button" class="nx-btn nx-btn-icon nx-btn-sm tp-down" data-act="t-down" title="' + esc(NX.t("tpl.down")) + '" aria-label="' + esc(NX.t("tpl.down")) + '">' + NX.icon("arrow", 15) + "</button>" +
      '<button type="button" class="nx-btn nx-btn-icon nx-btn-sm tp-del" data-act="row-del" title="' + esc(NX.t("tpl.removeRow")) + '" aria-label="' + esc(NX.t("tpl.removeRow")) + '">' + NX.icon("trash", 15) + "</button>" +
      "</div></div>";
  }

  function editChecklist(t) {
    var tasks = ((t.data || {}).tasks) || [];
    var body = '<div class="tp-cl-ed"><div class="tp-cl-form">' + NX.ui.form([
      { name: "name", label: NX.t("c.name"), required: true, full: true, value: t.name, dir: "auto" },
      { name: "service", label: NX.t("c.service"), type: "select", options: svcOpts(), value: t.service || "" },
      { name: "lang", label: NX.t("tpl.lang"), type: "select", options: langOpts(), value: t.lang || "en" }
    ]) +
      '<div class="tp-cl-head"><b>' + esc(NX.t("tpl.tasks")) + '</b><span class="nx-muted nx-small" data-count></span></div>' +
      '<div class="tp-tasks" data-tasks>' + tasks.map(taskRow).join("") + "</div>" +
      '<datalist id="tpPhases" data-phlist></datalist>' +
      '<div class="tp-cl-add">' + NX.ui.btn({ label: NX.t("tpl.addTask"), icon: "plus", act: "t-add", cls: "ghost sm" }) + "</div></div>" +
      '<aside class="tp-cl-prev"><div class="tp-prev-label">' + NX.icon("list", 14) + "<span>" + esc(NX.t("tpl.preview")) + '</span></div><div data-cl-prev class="tp-cl-prev-body"></div></aside></div>';

    NX.ui.modal({
      title: titleFor(t), size: "lg", body: body,
      onOpen: function (f) {
        var box = f.querySelector("[data-tasks]");
        var read = function () {
          return Array.prototype.map.call(box.querySelectorAll("[data-task]"), function (r) {
            return { text: r.querySelector("[data-k=text]").value.trim(), phase: r.querySelector("[data-k=phase]").value.trim() };
          });
        };
        var update = function () {
          var list = read();
          box.querySelectorAll("[data-n]").forEach(function (n, i) { n.textContent = i + 1; });
          var filled = list.filter(function (x) { return x.text; });
          f.querySelector("[data-count]").textContent = NX.t("tpl.nTasks", { n: filled.length });
          var phs = [];
          list.forEach(function (x) { if (x.phase && phs.indexOf(x.phase) === -1) phs.push(x.phase); });
          f.querySelector("[data-phlist]").innerHTML = phs.map(function (p) { return '<option value="' + esc(p) + '">'; }).join("");
          var g = phases(filled);
          f.querySelector("[data-cl-prev]").innerHTML = g.length ? g.map(function (gr) {
            return '<div class="tp-cl-ph"><div class="tp-cl-ph-h"><span dir="auto">' + esc(gr.phase) + '</span><small class="nx-num">' + gr.tasks.length + "</small></div><ul>" +
              gr.tasks.map(function (x) { return '<li dir="auto">' + esc(x.text) + "</li>"; }).join("") + "</ul></div>";
          }).join("") : '<p class="nx-muted nx-small">' + esc(NX.t("tpl.noTasks")) + "</p>";
        };
        f.addEventListener("input", update);
        NX.ui.on(f, "click", "[data-act=t-add]", function () {
          var rows = box.querySelectorAll("[data-task]");
          var lastPhase = rows.length ? rows[rows.length - 1].querySelector("[data-k=phase]").value : "";
          box.insertAdjacentHTML("beforeend", taskRow({ phase: lastPhase }));
          box.lastElementChild.querySelector("[data-k=text]").focus();
          update();
        });
        NX.ui.on(f, "click", "[data-act=t-up]", function (e, b) { var r = b.closest("[data-task]"); if (r.previousElementSibling) box.insertBefore(r, r.previousElementSibling); update(); });
        NX.ui.on(f, "click", "[data-act=t-down]", function (e, b) { var r = b.closest("[data-task]"); if (r.nextElementSibling) box.insertBefore(r.nextElementSibling, r); update(); });
        NX.ui.on(f, "click", "[data-act=row-del]", function (e, b) { b.closest("[data-task]").remove(); update(); });
        // Enter in a task box adds the next task instead of saving the whole form.
        f.addEventListener("keydown", function (e) {
          if (e.key === "Enter" && e.target.matches && e.target.matches("[data-task] input")) {
            e.preventDefault();
            var r = e.target.closest("[data-task]");
            if (r === box.lastElementChild) f.querySelector("[data-act=t-add]").click();
            else r.nextElementSibling.querySelector("[data-k=text]").focus();
          }
        });
        if (!tasks.length) box.insertAdjacentHTML("beforeend", taskRow({}));
        update();
      },
      onSubmit: function (v, f) {
        var list = Array.prototype.map.call(f.querySelectorAll("[data-task]"), function (r) {
          return { text: r.querySelector("[data-k=text]").value.trim(), phase: r.querySelector("[data-k=phase]").value.trim() };
        }).filter(function (x) { return x.text; });
        return save(t, { kind: "checklist", name: v.name, service: v.service, lang: v.lang, data: Object.assign({}, t.data || {}, { tasks: list }) });
      }
    });
  }

  NX.view("templates", { order: 60, icon: "templates", render: render });
})();
