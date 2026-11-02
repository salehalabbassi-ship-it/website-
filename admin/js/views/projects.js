/* NEXA Workspace — Projects (list, detail page, new/edit project, payments, task checklist) */
(function () {
  var esc = NX.esc;

  NX.i18n.add({
    en: {
      "proj.title": "Projects",
      "proj.sub": "Track delivery, tasks and payments for every project.",
      "proj.new": "New project",
      "proj.edit": "Edit project",
      "proj.kActive": "Active projects",
      "proj.kActiveSub": "{n} projects in total",
      "proj.kValue": "Total contract value",
      "proj.kValueSub": "All projects, excl. VAT",
      "proj.kPaid": "Collected",
      "proj.kPaidSub": "{p}% of contract value",
      "proj.kOut": "Outstanding",
      "proj.kOutSub": "Still to be collected",
      "proj.fActive": "Active",
      "proj.searchPh": "Search code, project, client…",
      "proj.viewGrid": "Cards",
      "proj.viewTable": "List",
      "proj.csv": "Export CSV",
      "proj.empty": "No projects match these filters.",
      "proj.emptyAll": "No projects yet. Create your first project.",
      "proj.notFound": "This project was not found. It may have been deleted.",
      "proj.backList": "All projects",
      "proj.code": "Code",
      "proj.name": "Project name",
      "proj.progress": "Progress",
      "proj.start": "Start date",
      "proj.due": "Due date",
      "proj.value": "Contract value",
      "proj.paid": "Paid",
      "proj.outstanding": "Outstanding",
      "proj.location": "Location",
      "proj.linkedLead": "Linked lead",
      "proj.linkedProposal": "Linked proposal",
      "proj.daysLeft": "{n} days left",
      "proj.dayLeft": "1 day left",
      "proj.dueToday": "Due today",
      "proj.daysOver": "{n} days overdue",
      "proj.dayOver": "1 day overdue",
      "proj.noDue": "No due date",
      "proj.statusChange": "Change status",
      "proj.addFollowup": "Add follow-up",
      "proj.logConv": "Log conversation",
      "proj.sendMsg": "Send message",
      "proj.overview": "Overview",
      "proj.money": "Money",
      "proj.collected": "Collected",
      "proj.recordPayment": "Record payment",
      "proj.amount": "Amount (SAR)",
      "proj.payNote": "Note",
      "proj.payNotePh": "e.g. Advance payment, bank transfer",
      "proj.payments": "Payments log",
      "proj.noPayments": "No payments recorded yet.",
      "proj.prevPaid": "Paid before log",
      "proj.payHint": "Outstanding now: {v}",
      "proj.payAdded": "Payment recorded",
      "proj.payRemove": "Remove this payment?",
      "proj.paidLocked": "Paid amount comes from the payments log on the project page.",
      "proj.tasks": "Tasks",
      "proj.tasksDone": "{d} of {n} done",
      "proj.noTasks": "No tasks yet. Add tasks or apply a checklist template.",
      "proj.addTask": "Add task",
      "proj.taskPh": "New task…",
      "proj.phasePh": "Phase",
      "proj.general": "General",
      "proj.applyTpl": "Apply checklist",
      "proj.applyTplTitle": "Apply checklist template",
      "proj.applyTplHint": "Tasks from the template are added to the end of this project's checklist.",
      "proj.applyBtn": "Add tasks",
      "proj.noChecklists": "No checklist templates yet. Create one in Templates.",
      "proj.tasksAdded": "{n} tasks added",
      "proj.sameService": "same service",
      "proj.nTasks": "{n} tasks",
      "proj.deleteTask": "Delete task",
      "proj.activity": "Activity",
      "proj.noActivity": "No follow-ups or conversations yet.",
      "proj.fu": "Follow-up",
      "proj.conv": "Conversation",
      "proj.done": "Done",
      "proj.open": "Open",
      "proj.markDone": "Mark done",
      "proj.in": "Incoming",
      "proj.out": "Outgoing",
      "proj.notes": "Notes",
      "proj.notesPh": "Site access, client preferences, important decisions…",
      "proj.saveNotes": "Save notes",
      "proj.checklistTpl": "Checklist template",
      "proj.noTpl": "No checklist",
      "proj.codeAuto": "Code {code} will be assigned automatically.",
      "proj.secMain": "Project",
      "proj.secSchedule": "Schedule & value",
      "proj.ch.call": "Call",
      "proj.ch.whatsapp": "WhatsApp",
      "proj.ch.email": "Email",
      "proj.ch.meeting": "Meeting",
      "proj.ch.sitevisit": "Site visit",
      "proj.ch.website": "Website",
      "proj.ch.other": "Other",
      "proj.noPhone": "No phone number for this client."
    },
    ar: {
      "proj.title": "المشاريع",
      "proj.sub": "تابع التنفيذ والمهام والدفعات لكل مشروع.",
      "proj.new": "مشروع جديد",
      "proj.edit": "تعديل المشروع",
      "proj.kActive": "المشاريع الجارية",
      "proj.kActiveSub": "{n} مشروع إجمالاً",
      "proj.kValue": "إجمالي قيمة العقود",
      "proj.kValueSub": "جميع المشاريع، بدون الضريبة",
      "proj.kPaid": "المحصّل",
      "proj.kPaidSub": "{p}% من قيمة العقود",
      "proj.kOut": "المتبقي",
      "proj.kOutSub": "مبالغ لم تُحصّل بعد",
      "proj.fActive": "الجارية",
      "proj.searchPh": "ابحث بالرمز أو المشروع أو العميل…",
      "proj.viewGrid": "بطاقات",
      "proj.viewTable": "قائمة",
      "proj.csv": "تصدير CSV",
      "proj.empty": "لا توجد مشاريع مطابقة لهذه التصفية.",
      "proj.emptyAll": "لا توجد مشاريع بعد. أنشئ مشروعك الأول.",
      "proj.notFound": "لم يتم العثور على هذا المشروع، ربما تم حذفه.",
      "proj.backList": "كل المشاريع",
      "proj.code": "الرمز",
      "proj.name": "اسم المشروع",
      "proj.progress": "نسبة الإنجاز",
      "proj.start": "تاريخ البدء",
      "proj.due": "تاريخ التسليم",
      "proj.value": "قيمة العقد",
      "proj.paid": "المدفوع",
      "proj.outstanding": "المتبقي",
      "proj.location": "الموقع",
      "proj.linkedLead": "العميل المحتمل المرتبط",
      "proj.linkedProposal": "عرض السعر المرتبط",
      "proj.daysLeft": "متبقٍ {n} يوم",
      "proj.dayLeft": "متبقٍ يوم واحد",
      "proj.dueToday": "التسليم اليوم",
      "proj.daysOver": "متأخر {n} يوم",
      "proj.dayOver": "متأخر يوماً واحداً",
      "proj.noDue": "بدون تاريخ تسليم",
      "proj.statusChange": "تغيير الحالة",
      "proj.addFollowup": "إضافة متابعة",
      "proj.logConv": "تسجيل محادثة",
      "proj.sendMsg": "إرسال رسالة",
      "proj.overview": "نظرة عامة",
      "proj.money": "المالية",
      "proj.collected": "نسبة التحصيل",
      "proj.recordPayment": "تسجيل دفعة",
      "proj.amount": "المبلغ (ر.س)",
      "proj.payNote": "ملاحظة",
      "proj.payNotePh": "مثال: دفعة مقدمة، تحويل بنكي",
      "proj.payments": "سجل الدفعات",
      "proj.noPayments": "لم تُسجّل أي دفعات بعد.",
      "proj.prevPaid": "مدفوع قبل السجل",
      "proj.payHint": "المتبقي حالياً: {v}",
      "proj.payAdded": "تم تسجيل الدفعة",
      "proj.payRemove": "حذف هذه الدفعة؟",
      "proj.paidLocked": "المبلغ المدفوع يُحسب من سجل الدفعات في صفحة المشروع.",
      "proj.tasks": "المهام",
      "proj.tasksDone": "{d} من {n} منجزة",
      "proj.noTasks": "لا توجد مهام بعد. أضف مهاماً أو طبّق قالب قائمة مهام.",
      "proj.addTask": "إضافة مهمة",
      "proj.taskPh": "مهمة جديدة…",
      "proj.phasePh": "المرحلة",
      "proj.general": "عام",
      "proj.applyTpl": "تطبيق قائمة مهام",
      "proj.applyTplTitle": "تطبيق قالب قائمة مهام",
      "proj.applyTplHint": "ستُضاف مهام القالب إلى نهاية قائمة مهام هذا المشروع.",
      "proj.applyBtn": "إضافة المهام",
      "proj.noChecklists": "لا توجد قوالب قوائم مهام بعد. أنشئ قالباً من صفحة القوالب.",
      "proj.tasksAdded": "تمت إضافة {n} مهمة",
      "proj.sameService": "نفس الخدمة",
      "proj.nTasks": "{n} مهمة",
      "proj.deleteTask": "حذف المهمة",
      "proj.activity": "النشاط",
      "proj.noActivity": "لا توجد متابعات أو محادثات بعد.",
      "proj.fu": "متابعة",
      "proj.conv": "محادثة",
      "proj.done": "منجزة",
      "proj.open": "مفتوحة",
      "proj.markDone": "تم الإنجاز",
      "proj.in": "واردة",
      "proj.out": "صادرة",
      "proj.notes": "ملاحظات",
      "proj.notesPh": "طريقة الدخول للموقع، تفضيلات العميل، القرارات المهمة…",
      "proj.saveNotes": "حفظ الملاحظات",
      "proj.checklistTpl": "قالب قائمة المهام",
      "proj.noTpl": "بدون قائمة مهام",
      "proj.codeAuto": "سيُعطى المشروع الرمز {code} تلقائياً.",
      "proj.secMain": "المشروع",
      "proj.secSchedule": "الجدول والقيمة",
      "proj.ch.call": "اتصال",
      "proj.ch.whatsapp": "واتساب",
      "proj.ch.email": "بريد",
      "proj.ch.meeting": "اجتماع",
      "proj.ch.sitevisit": "زيارة موقع",
      "proj.ch.website": "الموقع الإلكتروني",
      "proj.ch.other": "أخرى",
      "proj.noPhone": "لا يوجد رقم جوال لهذا العميل."
    }
  });

  /* ---------- Module state (survives re-renders) ---------- */
  var state = { filter: "active", q: "", mode: "grid" };
  try { state.mode = localStorage.getItem("nx_proj_mode") === "table" ? "table" : "grid"; } catch (e) {}

  /* ---------- Helpers ---------- */
  function statusDef(id) { return NX.list("projectStatuses").find(function (s) { return s.id === id; }) || null; }
  function isClosed(p) { var s = statusDef(p.status); return !!(s && s.closed); }
  function num(v) { return Number(v) || 0; }
  function paidOf(p) {
    if (p.payments && p.payments.length) return p.payments.reduce(function (s, x) { return s + num(x.amount); }, 0);
    return num(p.paid);
  }
  function outstandingOf(p) { return Math.max(0, num(p.value) - paidOf(p)); }
  function iconBtn(icon, act, title, extra) {
    return '<button type="button" class="nx-btn nx-btn-ghost pj-icon-btn' + (extra || "") + '" data-act="' + act + '" title="' + esc(title) + '" aria-label="' + esc(title) + '">' + NX.icon(icon, 16) + "</button>";
  }
  function pct(a, b) { return b > 0 ? Math.round(100 * a / b) : 0; }
  function daysTo(d) {
    var x = NX.fmt.toDate(d); if (!x) return null;
    var t = NX.fmt.toDate(NX.fmt.today());
    return Math.round((x - t) / 86400000);
  }
  /* Due date info: { text, over, soon } */
  function dueInfo(p) {
    if (!p.dueDate) return { text: NX.t("proj.noDue"), over: false, none: true };
    var n = daysTo(p.dueDate), closed = isClosed(p);
    if (closed || n == null) return { text: "", over: false };
    if (n < 0) return { text: n === -1 ? NX.t("proj.dayOver") : NX.t("proj.daysOver", { n: -n }), over: true };
    if (n === 0) return { text: NX.t("proj.dueToday"), over: false, soon: true };
    return { text: n === 1 ? NX.t("proj.dayLeft") : NX.t("proj.daysLeft", { n: n }), over: false, soon: n <= 7 };
  }
  function matches(p, q) {
    if (!q) return true;
    q = q.toLowerCase();
    return [p.code, p.name, p.client, p.phone, p.location, NX.opt("services", p.service)].some(function (v) { return String(v || "").toLowerCase().indexOf(q) > -1; });
  }
  function phases(tasks) {
    var order = [], map = {};
    (tasks || []).forEach(function (t) {
      var ph = String(t.phase || "").trim() || NX.t("proj.general");
      if (!map[ph]) { map[ph] = []; order.push(ph); }
      map[ph].push(t);
    });
    return order.map(function (ph) { return { phase: ph, tasks: map[ph] }; });
  }
  function checklistTemplates(service) {
    var list = NX.store.where("templates", function (t) { return t.kind === "checklist"; });
    return list.slice().sort(function (a, b) {
      var sa = a.service === service ? 0 : 1, sb = b.service === service ? 0 : 1;
      return sa - sb || String(a.name || "").localeCompare(String(b.name || ""));
    });
  }
  function tasksFromTemplate(tpl) {
    return (((tpl && tpl.data) || {}).tasks || []).filter(function (t) { return t && String(t.text || "").trim(); }).map(function (t) {
      return { id: NX.store.uid(), text: String(t.text).trim(), phase: String(t.phase || "").trim(), done: false };
    });
  }
  /* Save a merged project; keeps paid/progress fields in sync for other modules. */
  function saveProject(p, changes, okMsg) {
    var next = Object.assign({}, p, changes || {});
    next.tasks = next.tasks || [];
    if (next.payments && next.payments.length) next.paid = paidOf(next);
    next.progress = NX.calc.progress(next);
    return NX.ui.run(NX.store.save("projects", next), okMsg);
  }

  /* ================= LIST ================= */
  function renderList(el) {
    var all = NX.store.all("projects");
    var statuses = NX.list("projectStatuses");
    var active = all.filter(function (p) { return !isClosed(p); });

    var totalValue = 0, totalPaid = 0, totalOut = 0;
    all.forEach(function (p) { totalValue += num(p.value); totalPaid += paidOf(p); totalOut += outstandingOf(p); });

    var chipItems = [
      { value: "active", label: NX.t("proj.fActive"), count: active.length },
      { value: "all", label: NX.t("c.all"), count: all.length }
    ].concat(statuses.map(function (s) {
      return { value: s.id, label: NX.i18n.pick(s), count: all.filter(function (p) { return p.status === s.id; }).length };
    }));

    var rows = all.filter(function (p) {
      if (state.filter === "active" && isClosed(p)) return false;
      if (state.filter !== "active" && state.filter !== "all" && p.status !== state.filter) return false;
      return matches(p, state.q);
    }).sort(function (a, b) {
      // Open projects by nearest due date; closed ones last.
      var ca = isClosed(a) ? 1 : 0, cb = isClosed(b) ? 1 : 0;
      if (ca !== cb) return ca - cb;
      return String(a.dueDate || "9999").localeCompare(String(b.dueDate || "9999"));
    });

    var head = NX.ui.pageHead({
      title: NX.t("proj.title"),
      sub: esc(NX.t("proj.sub")),
      actions: NX.ui.btn({ label: NX.t("proj.csv"), icon: "download", act: "csv", cls: "ghost" }) +
        NX.ui.btn({ label: NX.t("proj.new"), icon: "plus", act: "new", cls: "primary" })
    });

    var kpis = '<div class="nx-grid-4 pj-kpis">' +
      NX.ui.kpi({ label: NX.t("proj.kActive"), value: '<span class="nx-num">' + active.length + "</span>", sub: esc(NX.t("proj.kActiveSub", { n: all.length })), icon: "projects", tone: "dark" }) +
      NX.ui.kpi({ label: NX.t("proj.kValue"), value: NX.fmt.money(totalValue, { bare: true }) + ' <small class="pj-cur">' + esc(NX.t("c.sar")) + "</small>", sub: esc(NX.t("proj.kValueSub")), icon: "money" }) +
      NX.ui.kpi({ label: NX.t("proj.kPaid"), value: NX.fmt.money(totalPaid, { bare: true }) + ' <small class="pj-cur">' + esc(NX.t("c.sar")) + "</small>", sub: esc(NX.t("proj.kPaidSub", { p: pct(totalPaid, totalValue) })), icon: "check" }) +
      NX.ui.kpi({ label: NX.t("proj.kOut"), value: NX.fmt.money(totalOut, { bare: true }) + ' <small class="pj-cur">' + esc(NX.t("c.sar")) + "</small>", sub: esc(NX.t("proj.kOutSub")), icon: "inbox" }) +
      "</div>";

    var toolbar = '<div class="nx-toolbar pj-toolbar">' + NX.ui.chips(chipItems, state.filter, "filter") + "</div>" +
      '<div class="nx-toolbar pj-toolbar">' + NX.ui.searchBox(state.q, NX.t("proj.searchPh")) +
      '<div class="nx-seg pj-seg" role="group">' +
      '<button type="button" data-mode="grid" class="' + (state.mode === "grid" ? "is-active" : "") + '" title="' + esc(NX.t("proj.viewGrid")) + '">' + NX.icon("board", 15) + "<span>" + esc(NX.t("proj.viewGrid")) + "</span></button>" +
      '<button type="button" data-mode="table" class="' + (state.mode === "table" ? "is-active" : "") + '" title="' + esc(NX.t("proj.viewTable")) + '">' + NX.icon("list", 15) + "<span>" + esc(NX.t("proj.viewTable")) + "</span></button>" +
      "</div></div>";

    var body;
    if (!rows.length) {
      body = NX.ui.card("", NX.ui.empty(all.length ? NX.t("proj.empty") : NX.t("proj.emptyAll"),
        all.length ? "" : NX.ui.btn({ label: NX.t("proj.new"), icon: "plus", act: "new", cls: "primary" })));
    } else if (state.mode === "table") {
      body = NX.ui.card("", tableHtml(rows), { flush: true });
    } else {
      body = '<div class="pj-grid">' + rows.map(cardHtml).join("") + "</div>";
    }

    el.innerHTML = head + kpis + toolbar + body;

    NX.ui.on(el, "click", "[data-act=new]", function () { NX.actions.newProject({}); });
    NX.ui.on(el, "click", "[data-act=csv]", function () { exportCsv(rows); });
    NX.ui.on(el, "click", "[data-filter]", function (e, b) { state.filter = b.getAttribute("data-filter"); NX.app.rerender(); });
    NX.ui.on(el, "click", "[data-mode]", function (e, b) {
      state.mode = b.getAttribute("data-mode");
      try { localStorage.setItem("nx_proj_mode", state.mode); } catch (er) {}
      NX.app.rerender();
    });
    NX.ui.on(el, "input", "[data-search]", function (e, i) { state.q = i.value; NX.app.rerender(); });
    NX.ui.on(el, "click", "tr[data-href]", function (e, tr) { if (!e.target.closest("a,button")) NX.go(tr.getAttribute("data-href")); });
  }

  function cardHtml(p) {
    var prog = NX.calc.progress(p), due = dueInfo(p), paid = paidOf(p), value = num(p.value);
    var svc = NX.opt("services", p.service);
    return '<a class="pj-card' + (isClosed(p) ? " is-closed" : "") + '" href="#/projects/' + esc(p.id) + '">' +
      '<div class="pj-card-top"><span class="nx-mono pj-code">' + esc(p.code || "") + "</span>" + NX.ui.statusBadge("projectStatuses", p.status) + "</div>" +
      '<h3 class="pj-card-name">' + esc(p.name || "—") + "</h3>" +
      '<div class="pj-card-sub">' + [p.client, svc].filter(Boolean).map(esc).join(' <span class="pj-sep">·</span> ') + "</div>" +
      '<div class="pj-card-prog">' + NX.ui.progressBar(prog) + '<span class="nx-num">' + prog + "%</span></div>" +
      '<div class="pj-card-foot">' +
      '<div class="pj-due' + (due.over ? " is-over" : due.soon ? " is-soon" : "") + '">' + NX.icon("calendar", 14) +
      "<span>" + (p.dueDate ? '<b class="nx-num">' + esc(NX.fmt.date(p.dueDate)) + "</b>" : "") + (due.text ? "<small>" + esc(due.text) + "</small>" : "") + "</span></div>" +
      '<div class="pj-card-money"><b class="nx-num">' + NX.fmt.money(value) + "</b>" +
      '<small>' + esc(NX.t("proj.paid")) + ' <span class="nx-num">' + NX.fmt.money(paid, { bare: true }) + "</span> · " + pct(paid, value) + "%</small></div>" +
      "</div></a>";
  }

  function tableHtml(rows) {
    return NX.ui.table({
      rows: rows,
      rowAttr: function (p) { return 'data-href="projects/' + esc(p.id) + '"'; },
      cols: [
        { label: NX.t("c.project"), render: function (p) { return '<a href="#/projects/' + esc(p.id) + '"><span class="nx-cell-sub nx-mono">' + esc(p.code || "") + '</span><span class="nx-cell-title">' + esc(p.name || "—") + "</span></a>"; } },
        { label: NX.t("c.client"), render: function (p) { return esc(p.client || "—") + '<span class="nx-cell-sub">' + esc(NX.opt("services", p.service)) + "</span>"; } },
        { label: NX.t("c.status"), render: function (p) { return NX.ui.statusBadge("projectStatuses", p.status); } },
        { label: NX.t("proj.progress"), render: function (p) { var g = NX.calc.progress(p); return '<span class="pj-tprog">' + NX.ui.progressBar(g) + '<span class="nx-num">' + g + "%</span></span>"; } },
        { label: NX.t("proj.due"), render: function (p) { var d = dueInfo(p); return p.dueDate ? '<span class="pj-tdue' + (d.over ? " is-over" : "") + '"><span class="nx-num">' + esc(NX.fmt.date(p.dueDate)) + "</span>" + (d.text ? "<small>" + esc(d.text) + "</small>" : "") + "</span>" : '<span class="nx-muted">—</span>'; } },
        { label: NX.t("c.value"), cls: "nx-right", render: function (p) { return '<span class="nx-num">' + NX.fmt.money(p.value) + "</span>"; } },
        { label: NX.t("proj.paid"), cls: "nx-right", render: function (p) { var pd = paidOf(p); return '<span class="nx-num">' + NX.fmt.money(pd) + '</span><span class="nx-cell-sub nx-num">' + pct(pd, num(p.value)) + "%</span>"; } }
      ]
    });
  }

  function exportCsv(rows) {
    var cols = [
      { label: "Code", key: "code" }, { label: "Project", key: "name" }, { label: "Client", key: "client" }, { label: "Phone", key: "phone" },
      { label: "Service", value: function (p) { return NX.opt("services", p.service); } },
      { label: "Status", value: function (p) { return NX.opt("projectStatuses", p.status); } },
      { label: "Start", key: "startDate" }, { label: "Due", key: "dueDate" },
      { label: "Value (SAR)", value: function (p) { return num(p.value); } },
      { label: "Paid (SAR)", value: function (p) { return paidOf(p); } },
      { label: "Outstanding (SAR)", value: function (p) { return outstandingOf(p); } },
      { label: "Progress %", value: function (p) { return NX.calc.progress(p); } },
      { label: "Owner", value: function (p) { return NX.userName(p.owner); } },
      { label: "Location", key: "location" }, { label: "Notes", key: "notes" }
    ];
    NX.ui.download("nexa-projects-" + NX.fmt.today() + ".csv", NX.ui.csv(rows, cols), "text/csv;charset=utf-8");
  }

  /* ================= DETAIL ================= */
  function renderDetail(el, id) {
    var p = NX.store.get("projects", id);
    var back = '<a class="nx-back" href="#/projects">' + NX.icon("back", 16) + esc(NX.t("proj.backList")) + "</a>";
    if (!p) { el.innerHTML = back + NX.ui.card("", NX.ui.empty(NX.t("proj.notFound"))); return; }

    var lead = p.leadId ? NX.store.get("leads", p.leadId) : null;
    var proposal = p.proposalId ? NX.store.get("proposals", p.proposalId) : null;
    var phone = p.phone || (lead && lead.phone) || "";
    var isAdmin = NX.store.isAdmin();

    var statusSel = '<label class="pj-status-sel nx-tone-' + esc(NX.optColor("projectStatuses", p.status)) + '" title="' + esc(NX.t("proj.statusChange")) + '">' +
      '<span class="nx-dot nx-dot-' + esc(NX.optColor("projectStatuses", p.status)) + '"></span>' +
      '<select data-act="status" aria-label="' + esc(NX.t("proj.statusChange")) + '">' +
      NX.opts("projectStatuses").map(function (o) { return '<option value="' + esc(o.value) + '"' + (o.value === p.status ? " selected" : "") + ">" + esc(o.label) + "</option>"; }).join("") +
      (statusDef(p.status) || !p.status ? "" : '<option value="' + esc(p.status) + '" selected>' + esc(p.status) + "</option>") +
      "</select></label>";

    var actions =
      (phone ? NX.ui.btn({ label: NX.t("c.whatsapp"), icon: "whatsapp", cls: "wa", href: NX.phone.wa(phone), external: true }) +
        NX.ui.btn({ label: NX.t("c.call"), icon: "phone", cls: "ghost", href: NX.phone.tel(phone) }) : "") +
      (NX.actions.sendMessage ? NX.ui.btn({ label: NX.t("proj.sendMsg"), icon: "send", act: "send", cls: "ghost" }) : "") +
      NX.ui.btn({ label: NX.t("proj.addFollowup"), icon: "followups", act: "followup", cls: "ghost" }) +
      NX.ui.btn({ label: NX.t("proj.logConv"), icon: "conversations", act: "logconv", cls: "ghost" }) +
      iconBtn("edit", "edit", NX.t("c.edit"), "") +
      (isAdmin ? iconBtn("trash", "delete", NX.t("c.delete"), " pj-del") : "");

    var due = dueInfo(p);
    var header = '<div class="pj-head">' +
      '<div class="pj-head-main">' +
      '<div class="pj-head-meta"><span class="nx-mono pj-code">' + esc(p.code || "") + "</span>" + statusSel + "</div>" +
      "<h1>" + esc(p.name || "—") + "</h1>" +
      '<p class="nx-sub">' + [p.client, NX.opt("services", p.service), p.location].filter(Boolean).map(esc).join(" · ") + "</p>" +
      "</div>" +
      '<div class="pj-head-actions">' + actions + "</div></div>";

    /* Overview */
    var overview = NX.ui.dl([
      [NX.t("c.client"), esc(p.client || "—")],
      [NX.t("c.phone"), phone ? '<a class="nx-link" dir="ltr" href="' + esc(NX.phone.tel(phone)) + '">' + esc(phone) + "</a>" : "—"],
      [NX.t("c.service"), esc(NX.opt("services", p.service) || "—")],
      [NX.t("proj.location"), esc(p.location || "—")],
      [NX.t("proj.start"), p.startDate ? '<span class="nx-num">' + esc(NX.fmt.date(p.startDate)) + "</span>" : "—"],
      [NX.t("proj.due"), p.dueDate ? '<span class="nx-num">' + esc(NX.fmt.date(p.dueDate)) + "</span>" + (due.text ? ' <span class="pj-due-tag' + (due.over ? " is-over" : due.soon ? " is-soon" : "") + '">' + esc(due.text) + "</span>" : "") : "—"],
      [NX.t("c.owner"), p.owner ? '<span class="pj-owner">' + NX.ui.avatar(NX.userName(p.owner)) + esc(NX.userName(p.owner)) + "</span>" : "—"],
      [NX.t("proj.linkedLead"), lead ? '<a class="nx-link" href="#/leads/' + esc(lead.id) + '">' + esc(lead.name || lead.company || "") + "</a>" + (lead.company && lead.name ? ' <span class="nx-muted nx-small">' + esc(lead.company) + "</span>" : "") : "—"],
      [NX.t("proj.linkedProposal"), proposal ? '<a class="nx-link" href="#/proposals/' + esc(proposal.id) + '"><span class="nx-mono">' + esc(proposal.number || "") + "</span></a>" + (proposal.title ? ' <span class="nx-muted nx-small">' + esc(proposal.title) + "</span>" : "") : "—"]
    ]);

    var cards = {
      overview: NX.ui.card(NX.t("proj.overview"), overview, { cls: "pj-c-overview" }),
      money: NX.ui.card(NX.t("proj.money"), moneyHtml(p), { cls: "pj-c-money" }),
      tasks: NX.ui.card(NX.t("proj.tasks"), tasksHtml(p), {
        cls: "pj-c-tasks", flush: true,
        actions: NX.ui.btn({ label: NX.t("proj.applyTpl"), icon: "templates", act: "apply-tpl", cls: "ghost sm" })
      }),
      activity: NX.ui.card(NX.t("proj.activity"), activityHtml(p), { cls: "pj-c-activity", flush: true }),
      notes: NX.ui.card(NX.t("proj.notes"), notesHtml(p), { cls: "pj-c-notes" })
    };

    el.innerHTML = back + header +
      '<div class="nx-split pj-detail">' +
      '<div class="pj-col">' + cards.overview + cards.tasks + cards.activity + "</div>" +
      '<div class="pj-col">' + cards.money + cards.notes + "</div>" +
      "</div>";

    wireDetail(el, p, lead, proposal);
  }

  function moneyHtml(p) {
    var value = num(p.value), paid = paidOf(p), out = outstandingOf(p), c = pct(paid, value);
    var pays = (p.payments || []).slice();
    var isAdmin = NX.store.isAdmin();
    var log = pays.length ? '<ul class="pj-pays">' + pays.map(function (x, i) { return { x: x, i: i }; }).sort(function (a, b) {
      return String(b.x.date || "").localeCompare(String(a.x.date || ""));
    }).map(function (o) {
      return '<li><div class="pj-pay-main"><b class="nx-num">' + NX.fmt.money(o.x.amount) + "</b><small>" +
        [o.x.date ? NX.fmt.date(o.x.date) : "", o.x.note || ""].filter(Boolean).map(esc).join(" · ") + "</small></div>" +
        (isAdmin ? NX.ui.btn({ icon: "close", cls: "icon sm", act: "pay-del", attrs: ' data-i="' + o.i + '"', title: NX.t("c.delete") }) : "") + "</li>";
    }).join("") + "</ul>" : num(p.paid) > 0
      ? '<ul class="pj-pays"><li><div class="pj-pay-main"><b class="nx-num">' + NX.fmt.money(p.paid) + "</b><small>" + esc(NX.t("proj.prevPaid")) + "</small></div></li></ul>"
      : '<p class="nx-muted nx-small pj-pays-empty">' + esc(NX.t("proj.noPayments")) + "</p>";

    return '<div class="pj-money">' +
      '<div class="pj-money-row"><span>' + esc(NX.t("proj.value")) + '</span><b class="nx-num">' + NX.fmt.money(value) + "</b></div>" +
      '<div class="pj-money-row is-paid"><span>' + esc(NX.t("proj.paid")) + '</span><b class="nx-num">' + NX.fmt.money(paid) + "</b></div>" +
      '<div class="pj-money-row' + (out > 0 ? " is-out" : "") + '"><span>' + esc(NX.t("proj.outstanding")) + '</span><b class="nx-num">' + NX.fmt.money(out) + "</b></div>" +
      "</div>" +
      '<div class="pj-collected"><div class="nx-between"><span class="nx-small nx-muted">' + esc(NX.t("proj.collected")) + '</span><b class="nx-num">' + c + "%</b></div>" + NX.ui.progressBar(c) + "</div>" +
      NX.ui.btn({ label: NX.t("proj.recordPayment"), icon: "plus", act: "pay", cls: "primary block" }) +
      '<h3 class="pj-subhead">' + esc(NX.t("proj.payments")) + "</h3>" + log;
  }

  function tasksHtml(p) {
    var tasks = p.tasks || [];
    var done = tasks.filter(function (t) { return t.done; }).length;
    var prog = NX.calc.progress(p);
    var top = '<div class="pj-task-sum"><div class="nx-between"><span class="nx-small nx-muted" data-task-count>' + esc(NX.t("proj.tasksDone", { d: done, n: tasks.length })) + '</span><b class="nx-num" data-task-pct>' + prog + "%</b></div>" + NX.ui.progressBar(prog) + "</div>";
    var groups = phases(tasks);
    var list = groups.length ? groups.map(function (g) {
      var gd = g.tasks.filter(function (t) { return t.done; }).length;
      return '<div class="pj-phase"><div class="pj-phase-head"><span>' + esc(g.phase) + '</span><small class="nx-num">' + gd + "/" + g.tasks.length + "</small></div>" +
        '<ul class="pj-tasks">' + g.tasks.map(function (t) {
          return '<li class="pj-task' + (t.done ? " is-done" : "") + '">' +
            '<label class="pj-task-check"><input type="checkbox" data-act="task-toggle" data-tid="' + esc(t.id) + '"' + (t.done ? " checked" : "") + ' /><span class="pj-task-text">' + esc(t.text) + "</span></label>" +
            NX.ui.btn({ icon: "trash", cls: "icon sm", act: "task-del", attrs: ' data-tid="' + esc(t.id) + '"', title: NX.t("proj.deleteTask") }) + "</li>";
        }).join("") + "</ul></div>";
    }).join("") : '<p class="pj-tasks-empty nx-muted">' + esc(NX.t("proj.noTasks")) + "</p>";

    var phaseList = groups.map(function (g) { return g.phase; }).filter(function (ph) { return ph !== NX.t("proj.general"); });
    var add = '<form class="pj-addtask" data-addtask novalidate>' +
      '<input type="text" class="nx-input" name="text" placeholder="' + esc(NX.t("proj.taskPh")) + '" autocomplete="off" />' +
      '<input type="text" class="nx-input pj-phase-in" name="phase" list="pjPhases" placeholder="' + esc(NX.t("proj.phasePh")) + '" autocomplete="off" value="' + esc(phaseList.length ? phaseList[phaseList.length - 1] : "") + '" />' +
      '<datalist id="pjPhases">' + phaseList.map(function (ph) { return '<option value="' + esc(ph) + '">'; }).join("") + "</datalist>" +
      NX.ui.btn({ label: NX.t("proj.addTask"), icon: "plus", cls: "primary", type: "submit" }) +
      "</form>";
    return top + list + add;
  }

  var FU_ICON = { call: "phone", whatsapp: "whatsapp", email: "mail", meeting: "user", sitevisit: "pin", website: "globe", other: "dots" };
  function chLabel(k) { var s = NX.t("proj.ch." + k); return s === "proj.ch." + k ? (k || "") : s; }

  function activityHtml(p) {
    var match = function (r) { return r.projectId === p.id || (p.leadId && r.leadId === p.leadId); };
    var today = NX.fmt.today();
    var items = [];
    NX.store.where("followups", match).forEach(function (f) {
      items.push({ kind: "fu", rec: f, when: (f.status === "done" && f.doneAt) ? f.doneAt : (f.dueDate ? f.dueDate + "T" + (f.dueTime || "00:00") : f.createdAt || "") });
    });
    NX.store.where("conversations", match).forEach(function (c) { items.push({ kind: "conv", rec: c, when: c.date || c.createdAt || "" }); });
    if (!items.length) return '<p class="pj-tasks-empty nx-muted">' + esc(NX.t("proj.noActivity")) + "</p>";
    items.sort(function (a, b) { return String(b.when).localeCompare(String(a.when)); });

    return '<ul class="nx-list pj-acts">' + items.slice(0, 40).map(function (it) {
      var r = it.rec;
      if (it.kind === "fu") {
        var done = r.status === "done", over = !done && r.dueDate && r.dueDate < today;
        var badge = done ? NX.ui.badge(NX.t("proj.done"), "green") : over ? NX.ui.badge(NX.t("c.overdue"), "red") : NX.ui.badge(NX.t("proj.open"), "amber");
        return '<li class="pj-act"><span class="pj-act-ic pj-ic-fu">' + NX.icon(FU_ICON[r.type] || "followups", 16) + "</span>" +
          '<div class="nx-list-main"><b>' + esc(r.title || chLabel(r.type)) + "</b>" +
          "<small>" + esc(NX.t("proj.fu")) + " · " + esc(chLabel(r.type)) + " · " + '<span class="nx-num">' + esc(NX.fmt.date(r.dueDate)) + (r.dueTime ? " " + esc(r.dueTime) : "") + "</span>" + (r.owner ? " · " + esc(NX.userName(r.owner)) : "") + "</small></div>" +
          '<div class="pj-act-side">' + badge +
          (!done && NX.actions.completeFollowup ? NX.ui.btn({ icon: "check", cls: "ghost sm", act: "fu-done", attrs: ' data-id="' + esc(r.id) + '"', title: NX.t("proj.markDone") }) : "") +
          "</div></li>";
      }
      return '<li class="pj-act"><span class="pj-act-ic pj-ic-conv">' + NX.icon(FU_ICON[r.channel] || "conversations", 16) + "</span>" +
        '<div class="nx-list-main"><p class="pj-act-text" dir="auto">' + esc(r.summary || "—") + "</p>" +
        "<small>" + esc(chLabel(r.channel)) + " · " + esc(NX.t(r.direction === "in" ? "proj.in" : "proj.out")) + " · " + '<span class="nx-num">' + esc(NX.fmt.dateTime(r.date)) + "</span>" + (r.by ? " · " + esc(NX.userName(r.by)) : "") + "</small></div>" +
        '<div class="pj-act-side">' + NX.icon(r.direction === "in" ? "in" : "out", 16) + "</div></li>";
    }).join("") + "</ul>";
  }

  function notesHtml(p) {
    return '<textarea class="nx-input pj-notes" data-notes rows="5" dir="auto" placeholder="' + esc(NX.t("proj.notesPh")) + '">' + esc(p.notes || "") + "</textarea>" +
      '<div class="pj-notes-foot">' + NX.ui.btn({ label: NX.t("proj.saveNotes"), icon: "check", act: "save-notes", cls: "ghost sm", attrs: " disabled" }) + "</div>";
  }

  function wireDetail(el, p, lead, proposal) {
    var fresh = function () { return NX.store.get("projects", p.id) || p; };

    NX.ui.on(el, "change", "[data-act=status]", function (e, s) { saveProject(fresh(), { status: s.value }); });
    NX.ui.on(el, "click", "[data-act=edit]", function () { NX.actions.editProject(fresh()); });
    NX.ui.on(el, "click", "[data-act=delete]", function () { NX.ui.del("projects", p.id, function () { NX.go("projects"); }); });
    NX.ui.on(el, "click", "[data-act=followup]", function () {
      if (NX.actions.newFollowup) NX.actions.newFollowup({ projectId: p.id, leadId: p.leadId || "" });
    });
    NX.ui.on(el, "click", "[data-act=logconv]", function () {
      if (NX.actions.logConversation) NX.actions.logConversation({ projectId: p.id, leadId: p.leadId || "" });
    });
    NX.ui.on(el, "click", "[data-act=send]", function () {
      if (NX.actions.sendMessage) NX.actions.sendMessage({ lead: lead || { name: p.client, phone: p.phone, service: p.service }, project: fresh(), proposal: proposal || undefined, channel: "whatsapp" });
    });
    NX.ui.on(el, "click", "[data-act=fu-done]", function (e, b) {
      var f = NX.store.get("followups", b.getAttribute("data-id"));
      if (f && NX.actions.completeFollowup) NX.actions.completeFollowup(f);
    });

    /* Money */
    NX.ui.on(el, "click", "[data-act=pay]", function () { recordPayment(fresh()); });
    NX.ui.on(el, "click", "[data-act=pay-del]", function (e, b) {
      var i = Number(b.getAttribute("data-i"));
      NX.ui.confirm(NX.t("proj.payRemove"), { danger: true, okLabel: NX.t("c.delete") }).then(function (ok) {
        if (!ok) return;
        var cur = fresh(), pays = (cur.payments || []).slice();
        pays.splice(i, 1);
        saveProject(cur, { payments: pays, paid: pays.reduce(function (s, x) { return s + num(x.amount); }, 0) });
      });
    });

    /* Tasks */
    NX.ui.on(el, "change", "[data-act=task-toggle]", function (e, cb) {
      // Read every checkbox from the page so quick successive taps are all kept.
      var states = {};
      el.querySelectorAll("[data-act=task-toggle]").forEach(function (x) { states[x.getAttribute("data-tid")] = x.checked; });
      var cur = fresh();
      var tasks = (cur.tasks || []).map(function (t) { return states.hasOwnProperty(t.id) ? Object.assign({}, t, { done: states[t.id] }) : t; });
      cb.closest(".pj-task").classList.toggle("is-done", cb.checked);
      var d = tasks.filter(function (t) { return t.done; }).length, pc = NX.calc.progress({ tasks: tasks });
      var cnt = el.querySelector("[data-task-count]"), pe = el.querySelector("[data-task-pct]");
      if (cnt) cnt.textContent = NX.t("proj.tasksDone", { d: d, n: tasks.length });
      if (pe) pe.textContent = pc + "%";
      saveProject(cur, { tasks: tasks }, false);
    });
    NX.ui.on(el, "click", "[data-act=task-del]", function (e, b) {
      var tid = b.getAttribute("data-tid"), cur = fresh();
      saveProject(cur, { tasks: (cur.tasks || []).filter(function (t) { return t.id !== tid; }) }, false);
    });
    el.addEventListener("submit", function (e) {
      var f = e.target.closest("[data-addtask]");
      if (!f) return;
      e.preventDefault();
      var text = f.text.value.trim(), phase = f.phase.value.trim();
      if (!text) { f.text.focus(); return; }
      var cur = fresh();
      saveProject(cur, { tasks: (cur.tasks || []).concat([{ id: NX.store.uid(), text: text, phase: phase, done: false }]) }, false).then(function () {
        // Keep typing tasks quickly: focus the new form's text box after the re-render.
        setTimeout(function () { var n = document.querySelector(".pj-addtask input[name=text]"); if (n) n.focus(); }, 30);
      });
    });
    NX.ui.on(el, "click", "[data-act=apply-tpl]", function () { applyChecklist(fresh()); });

    /* Notes */
    var ta = el.querySelector("[data-notes]"), sb = el.querySelector("[data-act=save-notes]");
    if (ta && sb) ta.addEventListener("input", function () { sb.disabled = ta.value === (fresh().notes || ""); sb.className = "nx-btn nx-btn-" + (sb.disabled ? "ghost" : "primary") + " nx-btn-sm"; });
    NX.ui.on(el, "click", "[data-act=save-notes]", function () { saveProject(fresh(), { notes: ta.value.trim() }); });
  }

  function recordPayment(p) {
    var out = outstandingOf(p);
    NX.ui.modal({
      title: NX.t("proj.recordPayment") + " — " + (p.code || p.name || ""),
      size: "sm",
      body: NX.ui.form([
        { name: "amount", label: NX.t("proj.amount"), type: "number", required: true, min: 0, step: "0.01", value: "", hint: NX.t("proj.payHint", { v: NX.fmt.money(out) }), full: true, attrs: ' inputmode="decimal"' },
        { name: "date", label: NX.t("c.date"), type: "date", value: NX.fmt.today(), full: true },
        { name: "note", label: NX.t("proj.payNote"), placeholder: NX.t("proj.payNotePh"), full: true }
      ]),
      submitLabel: NX.t("proj.recordPayment"),
      onSubmit: function (d) {
        var amount = Number(d.amount);
        if (!(amount > 0)) { NX.ui.toast(NX.t("c.required"), "error"); return false; }
        var cur = NX.store.get("projects", p.id) || p;
        var pays = (cur.payments || []).slice();
        // First log entry: keep any amount that was paid before payments were logged.
        if (!pays.length && num(cur.paid) > 0) pays.push({ date: cur.startDate || "", amount: num(cur.paid), note: NX.t("proj.prevPaid") });
        pays.push({ date: d.date || NX.fmt.today(), amount: amount, note: d.note || "" });
        return saveProject(cur, { payments: pays }, NX.t("proj.payAdded"));
      }
    });
  }

  function applyChecklist(p) {
    var list = checklistTemplates(p.service);
    if (!list.length) { NX.ui.toast(NX.t("proj.noChecklists"), "error"); return; }
    var opts = list.map(function (t) {
      var n = (((t.data || {}).tasks) || []).length;
      return { value: t.id, label: t.name + " (" + NX.t("proj.nTasks", { n: n }) + ")" + (t.service && t.service === p.service ? " — " + NX.t("proj.sameService") : "") };
    });
    NX.ui.modal({
      title: NX.t("proj.applyTplTitle"), size: "sm",
      body: '<p class="nx-note-box pj-mb">' + esc(NX.t("proj.applyTplHint")) + "</p>" +
        NX.ui.form([{ name: "tpl", label: NX.t("proj.checklistTpl"), type: "select", options: opts, value: list[0].id, full: true }]) +
        '<div class="pj-tpl-preview" data-preview></div>',
      submitLabel: NX.t("proj.applyBtn"),
      onOpen: function (f) {
        var show = function () {
          var t = list.find(function (x) { return x.id === f.tpl.value; });
          f.querySelector("[data-preview]").innerHTML = phases(((t && t.data) || {}).tasks || []).map(function (g) {
            return '<div class="pj-prev-ph"><b>' + esc(g.phase) + "</b><ul>" + g.tasks.map(function (x) { return "<li>" + esc(x.text) + "</li>"; }).join("") + "</ul></div>";
          }).join("");
        };
        f.tpl.addEventListener("change", show); show();
      },
      onSubmit: function (d) {
        var t = list.find(function (x) { return x.id === d.tpl; });
        var add = tasksFromTemplate(t);
        if (!add.length) return false;
        var cur = NX.store.get("projects", p.id) || p;
        return saveProject(cur, { tasks: (cur.tasks || []).concat(add) }, NX.t("proj.tasksAdded", { n: add.length }));
      }
    });
  }

  /* ================= NEW / EDIT ================= */
  function projectModal(rec, isNew, opts) {
    opts = opts || {};
    var s = NX.store.settings;
    var code = isNew ? NX.store.nextNumber("projects", "code", s.projectPrefix || "PRJ") : rec.code;
    var svcOpts = [{ value: "", label: NX.t("c.select") }].concat(NX.opts("services"));
    var stOpts = NX.opts("projectStatuses");
    var hasPays = !!(rec.payments && rec.payments.length);
    var tpls = isNew ? checklistTemplates(rec.service) : [];
    var tplPick = isNew && rec.service ? (tpls.find(function (t) { return t.service === rec.service; }) || {}).id || "" : "";

    var fields = [
      { name: "name", label: NX.t("proj.name"), required: true, full: true, value: rec.name },
      { name: "client", label: NX.t("c.client"), value: rec.client },
      { name: "phone", label: NX.t("c.phone"), type: "tel", value: rec.phone, attrs: ' inputmode="tel"' },
      { name: "service", label: NX.t("c.service"), type: "select", options: svcOpts, value: rec.service || "" },
      { name: "status", label: NX.t("c.status"), type: "select", options: stOpts, value: rec.status || "planning" },
      { name: "location", label: NX.t("proj.location"), value: rec.location, placeholder: NX.i18n.isAr ? "جدة" : "Jeddah" },
      { name: "owner", label: NX.t("c.owner"), type: "select", options: NX.userOpts(true), value: rec.owner || "" },
      { name: "startDate", label: NX.t("proj.start"), type: "date", value: rec.startDate || "" },
      { name: "dueDate", label: NX.t("proj.due"), type: "date", value: rec.dueDate || "" },
      { name: "value", label: NX.t("proj.value") + " (" + NX.t("c.sar") + ")", type: "number", min: 0, step: "0.01", value: rec.value === "" || rec.value == null ? "" : rec.value, attrs: ' inputmode="decimal"' }
    ];
    if (!isNew) {
      fields.push(hasPays
        ? { name: "_paidInfo", label: NX.t("proj.paid") + " (" + NX.t("c.sar") + ")", type: "number", value: paidOf(rec), hint: NX.t("proj.paidLocked"), attrs: " disabled" }
        : { name: "paid", label: NX.t("proj.paid") + " (" + NX.t("c.sar") + ")", type: "number", min: 0, step: "0.01", value: num(rec.paid), attrs: ' inputmode="decimal"' });
    }
    if (isNew) {
      fields.push({ name: "tpl", label: NX.t("proj.checklistTpl"), type: "select", full: true, value: tplPick,
        options: [{ value: "", label: NX.t("proj.noTpl") }].concat(tpls.map(function (t) {
          return { value: t.id, label: t.name + " (" + NX.t("proj.nTasks", { n: (((t.data || {}).tasks) || []).length }) + ")" };
        })) });
    }
    fields.push({ name: "notes", label: NX.t("c.notes"), type: "textarea", rows: 3, full: true, value: rec.notes, dir: "auto" });

    NX.ui.modal({
      title: isNew ? NX.t("proj.new") : NX.t("proj.edit") + " — " + (rec.code || ""),
      size: "md",
      body: (isNew ? '<p class="pj-code-hint nx-small nx-muted">' + NX.icon("projects", 14) + "<span>" + esc(NX.t("proj.codeAuto", { code: code })) + "</span></p>" : "") + NX.ui.form(fields),
      submitLabel: isNew ? NX.t("proj.new") : NX.t("c.save"),
      onOpen: function (f) {
        if (!isNew || !f.tpl) return;
        var touched = false;
        f.tpl.addEventListener("change", function () { touched = true; });
        f.service.addEventListener("change", function () {
          if (touched) return;
          var m = tpls.find(function (t) { return t.service && t.service === f.service.value; });
          f.tpl.value = m ? m.id : "";
        });
      },
      onSubmit: function (d) {
        var tplId = d.tpl; delete d.tpl;
        d.value = d.value === "" ? 0 : Number(d.value) || 0;
        if (isNew) {
          var tpl = tplId ? NX.store.get("templates", tplId) : null;
          var rec2 = Object.assign({}, d, {
            code: NX.store.nextNumber("projects", "code", s.projectPrefix || "PRJ"),
            leadId: rec.leadId || "", proposalId: rec.proposalId || "",
            paid: 0, payments: [], tasks: tasksFromTemplate(tpl)
          });
          rec2.progress = NX.calc.progress(rec2);
          return NX.ui.run(NX.store.save("projects", rec2)).then(function (saved) {
            if (opts.after) opts.after(saved);
            NX.go("projects/" + saved.id);
            return saved;
          });
        }
        if (d.paid !== undefined) d.paid = d.paid === "" ? 0 : Number(d.paid) || 0;
        return saveProject(NX.store.get("projects", rec.id) || rec, d);
      }
    });
  }

  NX.actions.newProject = function (prefill) {
    prefill = prefill || {};
    var me = (NX.store.session || {}).email || "";
    var rec = { status: "planning", startDate: NX.fmt.today(), owner: me };
    var lead = prefill.leadId ? NX.store.get("leads", prefill.leadId) : null;
    var prop = prefill.proposalId ? NX.store.get("proposals", prefill.proposalId) : null;
    if (prop && !lead && prop.leadId) lead = NX.store.get("leads", prop.leadId);
    if (lead) {
      var who = lead.company || lead.name || "";
      Object.assign(rec, {
        leadId: lead.id,
        name: [NX.opt("services", lead.service), who].filter(Boolean).join(" — "),
        client: lead.name || lead.company || "", phone: lead.phone || "", service: lead.service || "",
        value: Number(lead.value) || "", location: lead.city || ""
      });
    }
    if (prop) {
      Object.assign(rec, {
        proposalId: prop.id,
        name: prop.title || rec.name || "",
        client: rec.client || prop.client || prop.clientCompany || "",
        phone: rec.phone || prop.phone || "",
        service: prop.service || rec.service || "",
        value: Math.round(NX.calc.proposal(prop).net * 100) / 100
      });
      if (prop.leadId && !rec.leadId) rec.leadId = prop.leadId;
    }
    // Any other explicit prefill fields win.
    Object.keys(prefill).forEach(function (k) { if (k !== "leadId" && k !== "proposalId" && prefill[k] != null) rec[k] = prefill[k]; });
    if (prefill.leadId) rec.leadId = prefill.leadId;
    if (prefill.proposalId) rec.proposalId = prefill.proposalId;
    projectModal(rec, true);
  };

  NX.actions.editProject = function (p) { if (p) projectModal(p, false); };

  /* ================= VIEW ================= */
  NX.view("projects", {
    order: 30,
    icon: "projects",
    render: function (el, params) {
      if (params && params[0]) renderDetail(el, params[0]);
      else renderList(el);
    }
  });
})();
