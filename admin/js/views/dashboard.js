/* NEXA Workspace — Dashboard: "what do I do today" */
(function () {
  NX.i18n.add({
    en: {
      "dash.morning": "Good morning, {name}",
      "dash.afternoon": "Good afternoon, {name}",
      "dash.evening": "Good evening, {name}",
      "dash.newLead": "New lead",
      "dash.newProposal": "New proposal",
      "dash.newFollowup": "New follow-up",
      "dash.kNewLeads": "New leads this month",
      "dash.kNewLeadsSub": "{n} waiting for first contact",
      "dash.kPipeline": "Open pipeline",
      "dash.kPipelineSub": "{n} open leads",
      "dash.kAwaiting": "Awaiting client reply",
      "dash.kAwaitingSub": "{v} in sent proposals",
      "dash.kProjects": "Active projects",
      "dash.kProjectsSub": "{n} past due date",
      "dash.kProjectsOk": "All on schedule",
      "dash.kWon": "Won this month",
      "dash.kWonSub": "{n} deals closed",
      "dash.today": "Today",
      "dash.todaySub": "Overdue and due today",
      "dash.todayEmpty": "Nothing due today. You're all caught up.",
      "dash.overdueBy": "Overdue · {t}",
      "dash.dueToday": "Today",
      "dash.markDone": "Mark as done",
      "dash.upcoming": "{n} more coming up this week",
      "dash.viewAll": "View all",
      "dash.newLeads": "New leads",
      "dash.newLeadsSub": "Waiting for first contact",
      "dash.website": "Website",
      "dash.assignMe": "Assign to me",
      "dash.unassigned": "Unassigned",
      "dash.noNew": "No new leads waiting.",
      "dash.pipeline": "Pipeline",
      "dash.pipelineSub": "Open leads by stage",
      "dash.noPipeline": "No open leads yet.",
      "dash.leadsN": "{n} leads",
      "dash.chase": "Proposals to chase",
      "dash.chaseSub": "Sent over 3 days ago, no reply logged",
      "dash.noChase": "No proposals waiting on a follow-up.",
      "dash.sentAgo": "Sent {t}",
      "dash.followUp": "Follow up",
      "dash.projects": "Active projects",
      "dash.noProjects": "No active projects.",
      "dash.due": "Due {d}",
      "dash.overdueProj": "Overdue · {d}",
      "dash.activity": "Recent activity",
      "dash.noActivity": "No conversations logged yet.",
      "dash.dirIn": "Incoming",
      "dash.dirOut": "Outgoing",
      "dash.done": "Done"
    },
    ar: {
      "dash.morning": "صباح الخير، {name}",
      "dash.afternoon": "مساء الخير، {name}",
      "dash.evening": "مساء الخير، {name}",
      "dash.newLead": "عميل جديد",
      "dash.newProposal": "عرض سعر جديد",
      "dash.newFollowup": "متابعة جديدة",
      "dash.kNewLeads": "عملاء جدد هذا الشهر",
      "dash.kNewLeadsSub": "{n} بانتظار أول تواصل",
      "dash.kPipeline": "قيمة الفرص المفتوحة",
      "dash.kPipelineSub": "{n} فرص مفتوحة",
      "dash.kAwaiting": "عروض بانتظار رد العميل",
      "dash.kAwaitingSub": "{v} في العروض المرسلة",
      "dash.kProjects": "المشاريع الجارية",
      "dash.kProjectsSub": "{n} تجاوزت موعد التسليم",
      "dash.kProjectsOk": "جميعها ضمن الجدول",
      "dash.kWon": "صفقات هذا الشهر",
      "dash.kWonSub": "{n} صفقات مُغلقة بنجاح",
      "dash.today": "اليوم",
      "dash.todaySub": "المتأخرة والمستحقة اليوم",
      "dash.todayEmpty": "لا توجد مهام مستحقة اليوم. أحسنت!",
      "dash.overdueBy": "متأخرة · {t}",
      "dash.dueToday": "اليوم",
      "dash.markDone": "تحديد كمنجزة",
      "dash.upcoming": "{n} متابعات قادمة هذا الأسبوع",
      "dash.viewAll": "عرض الكل",
      "dash.newLeads": "عملاء جدد",
      "dash.newLeadsSub": "بانتظار أول تواصل",
      "dash.website": "الموقع",
      "dash.assignMe": "إسناد لي",
      "dash.unassigned": "غير مُسند",
      "dash.noNew": "لا يوجد عملاء جدد بالانتظار.",
      "dash.pipeline": "مسار المبيعات",
      "dash.pipelineSub": "الفرص المفتوحة حسب المرحلة",
      "dash.noPipeline": "لا توجد فرص مفتوحة بعد.",
      "dash.leadsN": "{n} عملاء",
      "dash.chase": "عروض تحتاج متابعة",
      "dash.chaseSub": "أُرسلت قبل أكثر من 3 أيام دون رد مسجّل",
      "dash.noChase": "لا توجد عروض بانتظار المتابعة.",
      "dash.sentAgo": "أُرسل {t}",
      "dash.followUp": "متابعة",
      "dash.projects": "المشاريع الجارية",
      "dash.noProjects": "لا توجد مشاريع جارية.",
      "dash.due": "التسليم {d}",
      "dash.overdueProj": "متأخر · {d}",
      "dash.activity": "آخر النشاطات",
      "dash.noActivity": "لم تُسجّل أي محادثات بعد.",
      "dash.dirIn": "وارد",
      "dash.dirOut": "صادر",
      "dash.done": "تم"
    }
  });

  var esc = NX.esc;
  var T = NX.t;
  var DAY = 86400000;
  var TYPE_ICON = { call: "phone", whatsapp: "whatsapp", email: "mail", meeting: "calendar", sitevisit: "pin", other: "followups" };
  var CH_ICON = { whatsapp: "whatsapp", call: "phone", email: "mail", meeting: "calendar", sitevisit: "pin", website: "globe", other: "conversations" };

  function stageDef(id) { return NX.list("stages").find(function (s) { return s.id === id; }) || {}; }
  function isClosedStage(id) { return !!stageDef(id).closed; }
  function wonIds() { return NX.list("stages").filter(function (s) { return s.won; }).map(function (s) { return s.id; }); }
  function closedStatus(id) { var s = NX.list("projectStatuses").find(function (x) { return x.id === id; }); return !!(s && s.closed); }
  function monthStart() { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); }
  function after(iso, d) { var x = NX.fmt.toDate(iso); return !!x && x >= d; }
  function propTotal(p) { try { return NX.calc.proposal(p).total; } catch (e) { return 0; } }
  function moneyShort(v) { return Math.abs(v) >= 1e6 ? NX.fmt.compact(v) + " " + T("c.sar") : NX.fmt.money(v); }
  /* KPI money: number + smaller currency so it fits phone tiles */
  function moneyKpi(v) { var n = Math.abs(v) >= 1e6 ? NX.fmt.compact(v) : NX.fmt.money(v, { bare: true }); return esc(n) + ' <small class="db-cur">' + esc(T("c.sar")) + "</small>"; }
  function daysSince(iso) { var x = NX.fmt.toDate(iso); return x ? Math.floor((Date.now() - x.getTime()) / DAY) : 0; }
  function firstName(s) { var n = String((s && (s.name || s.email)) || "").trim(); return n.split(/[\s@]+/)[0] || ""; }
  function iconLink(href, icon, title, external) {
    return '<a class="nx-btn nx-btn-icon nx-btn-sm db-ic-btn" href="' + esc(href) + '"' + (external ? ' target="_blank" rel="noopener"' : "") + ' title="' + esc(title) + '" aria-label="' + esc(title) + '">' + NX.icon(icon, 16) + "</a>";
  }

  function render(el) {
    var me = NX.store.session || {};
    var admin = NX.store.isAdmin();
    var today = NX.fmt.today();
    var mStart = monthStart();
    var leads = NX.store.all("leads");
    var won = wonIds();

    /* ---------- Header ---------- */
    var h = new Date().getHours();
    var greet = T(h < 12 ? "dash.morning" : h < 17 ? "dash.afternoon" : "dash.evening", { name: firstName(me) });
    var dateStr = new Date().toLocaleDateString(NX.i18n.isAr ? "ar-SA-u-nu-latn-ca-gregory" : "en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
    var actions =
      NX.ui.btn({ label: T("dash.newLead"), icon: "plus", act: "new-lead", cls: "primary" }) +
      NX.ui.btn({ label: T("dash.newProposal"), icon: "proposals", act: "new-proposal" }) +
      NX.ui.btn({ label: T("dash.newFollowup"), icon: "followups", act: "new-followup" });

    /* ---------- KPIs ---------- */
    var newThisMonth = leads.filter(function (l) { return after(l.createdAt, mStart); });
    var openLeads = leads.filter(function (l) { return !isClosedStage(l.stage); });
    var pipelineValue = openLeads.reduce(function (s, l) { return s + (Number(l.value) || 0); }, 0);
    var sent = NX.store.where("proposals", function (p) { return p.status === "sent"; });
    var sentValue = sent.reduce(function (s, p) { return s + propTotal(p); }, 0);
    var activeProjects = NX.store.where("projects", function (p) { return !closedStatus(p.status); });
    var lateProjects = activeProjects.filter(function (p) { return p.dueDate && p.dueDate < today; });
    var waitingNew = leads.filter(function (l) { return l.stage === "new"; });
    var kpis = [
      NX.ui.kpi({ label: T("dash.kNewLeads"), value: String(newThisMonth.length), sub: esc(T("dash.kNewLeadsSub", { n: waitingNew.length })), icon: "leads", href: "#/leads" }),
      NX.ui.kpi({ label: T("dash.kPipeline"), value: moneyKpi((pipelineValue)), sub: esc(T("dash.kPipelineSub", { n: openLeads.length })), icon: "money", href: "#/leads" }),
      NX.ui.kpi({ label: T("dash.kAwaiting"), value: String(sent.length), sub: esc(T("dash.kAwaitingSub", { v: moneyShort(sentValue) })), icon: "proposals", href: "#/proposals" }),
      NX.ui.kpi({ label: T("dash.kProjects"), value: String(activeProjects.length), sub: esc(lateProjects.length ? T("dash.kProjectsSub", { n: lateProjects.length }) : T("dash.kProjectsOk")), icon: "projects", href: "#/projects" })
    ];
    if (admin) {
      var wonMonth = leads.filter(function (l) { return won.indexOf(l.stage) > -1 && after(l.updatedAt, mStart); });
      var wonValue = wonMonth.reduce(function (s, l) { return s + (Number(l.value) || 0); }, 0);
      kpis.push(NX.ui.kpi({ label: T("dash.kWon"), value: moneyKpi((wonValue)), sub: esc(T("dash.kWonSub", { n: wonMonth.length })), icon: "star", href: "#/analysis", tone: "dark" }));
    }

    el.innerHTML =
      NX.ui.pageHead({ title: greet, sub: esc(dateStr), actions: actions }) +
      '<div class="db-kpis' + (admin ? " db-kpis-5" : "") + '">' + kpis.join("") + "</div>" +
      '<div class="db-cols">' +
      '<div class="db-col">' + todayCard(me, admin, today) + newLeadsCard(waitingNew, me) + chaseCard() + "</div>" +
      '<div class="db-col">' + pipelineCard(openLeads) + projectsCard(activeProjects, today) + activityCard() + "</div>" +
      "</div>";

    wire(el, me);
  }

  /* ---------- Today ---------- */
  function todayCard(me, admin, today) {
    var mine = function (f) { return f.owner === me.email; };
    var all = NX.store.where("followups", function (f) { return f.status !== "done" && f.dueDate; });
    var visible = admin ? all : all.filter(function (f) { return mine(f) || !f.owner; });
    var due = visible.filter(function (f) { return f.dueDate <= today; }).sort(function (a, b) {
      var am = mine(a) ? 0 : 1, bm = mine(b) ? 0 : 1;
      if (am !== bm) return am - bm;
      return (a.dueDate + (a.dueTime || "99")).localeCompare(b.dueDate + (b.dueTime || "99"));
    });
    var weekEnd = NX.fmt.addDays(today, 7);
    var upcoming = visible.filter(function (f) { return f.dueDate > today && f.dueDate <= weekEnd; }).length;

    var body;
    if (!due.length) {
      body = '<div class="db-empty">' + NX.icon("check", 22) + "<p>" + esc(T("dash.todayEmpty")) + "</p>" +
        NX.ui.btn({ label: T("dash.newFollowup"), icon: "plus", act: "new-followup", cls: "sm ghost" }) + "</div>";
    } else {
      body = '<ul class="nx-list db-today">' + due.map(function (f) {
        var lead = f.leadId ? NX.store.get("leads", f.leadId) : null;
        var proj = f.projectId ? NX.store.get("projects", f.projectId) : null;
        var phone = (lead && lead.phone) || (proj && proj.phone) || "";
        var overdue = f.dueDate < today;
        var when = overdue ? T("dash.overdueBy", { t: T("c.day", { n: Math.max(1, Math.round((NX.fmt.toDate(today) - NX.fmt.toDate(f.dueDate)) / DAY)) }) })
          : T("dash.dueToday") + (f.dueTime ? " · " + f.dueTime : "");
        var who = lead ? '<a href="#/leads/' + esc(lead.id) + '">' + esc(lead.name || lead.company) + "</a>"
          : proj ? '<a href="#/projects/' + esc(proj.id) + '">' + esc(proj.name) + "</a>" : "";
        return '<li class="db-fu' + (overdue ? " is-overdue" : "") + '">' +
          '<button type="button" class="db-check" data-act="done" data-id="' + esc(f.id) + '" title="' + esc(T("dash.markDone")) + '" aria-label="' + esc(T("dash.markDone")) + '">' + NX.icon("check", 14) + "</button>" +
          '<div class="nx-list-main"><b>' + esc(f.title || T("c.none")) + "</b>" +
          '<small class="db-meta"><span class="db-type">' + NX.icon(TYPE_ICON[f.type] || "followups", 13) + "</span>" +
          '<span class="' + (overdue ? "db-late" : "db-when") + '">' + esc(when) + "</span>" + (who ? "<span>·</span>" + who : "") + "</small></div>" +
          (admin && f.owner ? '<span class="db-owner" title="' + esc(NX.userName(f.owner)) + '">' + NX.ui.avatar(NX.userName(f.owner)) + "</span>" : "") +
          '<div class="db-quick">' +
          (phone ? iconLink(NX.phone.wa(phone), "whatsapp", T("c.whatsapp"), true) + iconLink(NX.phone.tel(phone), "phone", T("c.call")) : "") +
          "</div></li>";
      }).join("") + "</ul>";
    }
    var foot = upcoming ? '<a class="db-foot-link" href="#/followups">' + esc(T("dash.upcoming", { n: upcoming })) + '<span class="nx-arrow">' + NX.icon("arrow", 14) + "</span></a>" : "";
    var count = due.length ? ' <span class="db-count">' + due.length + "</span>" : "";
    return '<section class="nx-card db-card db-card-today"><div class="nx-card-head"><div><h2>' + esc(T("dash.today")) + count + '</h2><p class="db-head-sub">' + esc(T("dash.todaySub")) + "</p></div>" +
      '<a class="nx-btn nx-btn-text nx-btn-sm" href="#/followups">' + esc(T("dash.viewAll")) + "</a></div>" +
      '<div class="nx-card-body nx-flush">' + body + foot + "</div></section>";
  }

  /* ---------- New leads ---------- */
  function newLeadsCard(list) {
    list = list.slice().sort(function (a, b) { return String(b.createdAt || "").localeCompare(String(a.createdAt || "")); });
    var body = !list.length ? '<p class="db-none">' + esc(T("dash.noNew")) + "</p>" :
      '<ul class="nx-list">' + list.slice(0, 6).map(function (l) {
        var svc = NX.opt("services", l.service);
        return '<li><a class="nx-list-main" href="#/leads/' + esc(l.id) + '"><b>' + esc(l.name || l.company || T("c.none")) + "</b>" +
          "<small>" + esc([l.company && l.name ? l.company : "", svc, NX.fmt.rel(l.createdAt)].filter(Boolean).join(" · ")) + "</small></a>" +
          (l.source === "website" ? '<span class="nx-badge nx-tone-blue db-web">' + NX.icon("globe", 12) + esc(T("dash.website")) + "</span>" : "") +
          (l.owner ? '<span class="db-owner" title="' + esc(NX.userName(l.owner)) + '">' + NX.ui.avatar(NX.userName(l.owner)) + "</span>"
            : NX.ui.btn({ label: T("dash.assignMe"), icon: "user", act: "assign", cls: "sm ghost", attrs: ' data-id="' + esc(l.id) + '"' })) +
          "</li>";
      }).join("") + "</ul>";
    var more = list.length > 6 ? '<a class="db-foot-link" href="#/leads">' + esc(T("dash.viewAll")) + " (" + list.length + ')<span class="nx-arrow">' + NX.icon("arrow", 14) + "</span></a>" : "";
    return cardWrap(T("dash.newLeads"), T("dash.newLeadsSub"), body + more, "#/leads", list.length);
  }

  /* ---------- Pipeline mini-chart ---------- */
  function pipelineCard(openLeads) {
    var stages = NX.list("stages").filter(function (s) { return !s.closed; });
    var rows = stages.map(function (s) {
      var ls = openLeads.filter(function (l) { return l.stage === s.id; });
      return { s: s, n: ls.length, v: ls.reduce(function (a, l) { return a + (Number(l.value) || 0); }, 0) };
    });
    var max = Math.max.apply(null, rows.map(function (r) { return r.v; }).concat([1]));
    var body = !openLeads.length ? '<p class="db-none">' + esc(T("dash.noPipeline")) + "</p>" :
      '<div class="db-bars">' + rows.map(function (r) {
        var pct = r.v ? Math.max(2, Math.round(100 * r.v / max)) : 0;
        var tip = NX.i18n.pick(r.s) + " — " + T("dash.leadsN", { n: r.n }) + " · " + NX.fmt.money(r.v);
        return '<a class="db-bar" href="#/leads" title="' + esc(tip) + '">' +
          '<span class="db-bar-top"><span class="db-bar-name"><i class="nx-dot nx-dot-' + esc(r.s.color || "gray") + '"></i>' + esc(NX.i18n.pick(r.s)) + "</span>" +
          '<span class="db-bar-val nx-num">' + esc(NX.fmt.compact(r.v)) + ' <small>· ' + r.n + "</small></span></span>" +
          '<span class="db-bar-track"><span class="db-bar-fill" style="width:' + pct + '%"></span></span></a>';
      }).join("") + "</div>";
    return cardWrap(T("dash.pipeline"), T("dash.pipelineSub"), '<div class="db-pad">' + body + "</div>", "#/leads");
  }

  /* ---------- Proposals to chase ---------- */
  function chaseCard() {
    var convs = NX.store.all("conversations");
    var list = NX.store.where("proposals", function (p) {
      if (p.status !== "sent") return false;
      var sentAt = p.sentAt || p.date;
      if (!sentAt || daysSince(sentAt) <= 3) return false;
      var t = NX.fmt.toDate(sentAt);
      var newer = p.leadId && convs.some(function (c) { return c.leadId === p.leadId && NX.fmt.toDate(c.date || c.createdAt) > t; });
      return !newer;
    }).sort(function (a, b) { return String(a.sentAt || a.date).localeCompare(String(b.sentAt || b.date)); });
    var body = !list.length ? '<p class="db-none">' + esc(T("dash.noChase")) + "</p>" :
      '<ul class="nx-list">' + list.map(function (p) {
        var lead = p.leadId ? NX.store.get("leads", p.leadId) : null;
        var phone = p.phone || (lead && lead.phone) || "";
        return '<li><a class="nx-list-main" href="#/proposals/' + esc(p.id) + '"><b>' + esc(p.client || p.clientCompany || p.number) + "</b>" +
          '<small><span class="nx-num">' + esc(p.number || "") + "</span> · " + esc(NX.fmt.money(propTotal(p))) + ' · <span class="db-late">' + esc(T("dash.sentAgo", { t: NX.fmt.rel(p.sentAt || p.date) })) + "</span></small></a>" +
          (NX.actions.sendMessage
            ? NX.ui.btn({ label: T("dash.followUp"), icon: "whatsapp", act: "chase", cls: "sm ghost", attrs: ' data-id="' + esc(p.id) + '"' })
            : (phone ? iconLink(NX.phone.wa(phone), "whatsapp", T("c.whatsapp"), true) : "")) +
          "</li>";
      }).join("") + "</ul>";
    return cardWrap(T("dash.chase"), T("dash.chaseSub"), body, "#/proposals", list.length);
  }

  /* ---------- Active projects ---------- */
  function projectsCard(list, today) {
    list = list.slice().sort(function (a, b) { return String(a.dueDate || "9999").localeCompare(String(b.dueDate || "9999")); });
    var body = !list.length ? '<p class="db-none">' + esc(T("dash.noProjects")) + "</p>" :
      '<ul class="nx-list db-projects">' + list.slice(0, 6).map(function (p) {
        var pct = NX.calc.progress(p);
        var late = p.dueDate && p.dueDate < today;
        return '<li><a class="db-proj" href="#/projects/' + esc(p.id) + '">' +
          '<span class="db-proj-top"><b>' + esc(p.name || p.code) + "</b>" + NX.ui.statusBadge("projectStatuses", p.status) + "</span>" +
          '<span class="db-proj-bar">' + NX.ui.progressBar(pct) + '<span class="nx-num">' + pct + "%</span></span>" +
          '<small class="' + (late ? "db-late" : "") + '">' + esc([p.code, p.client].filter(Boolean).join(" · ")) +
          (p.dueDate ? " · " + esc(late ? T("dash.overdueProj", { d: NX.fmt.dateShort(p.dueDate) }) : T("dash.due", { d: NX.fmt.dateShort(p.dueDate) })) : "") + "</small></a></li>";
      }).join("") + "</ul>";
    return cardWrap(T("dash.projects"), "", body, "#/projects", list.length);
  }

  /* ---------- Recent activity ---------- */
  function activityCard() {
    var list = NX.store.all("conversations").slice().sort(function (a, b) {
      return String(b.date || b.createdAt || "").localeCompare(String(a.date || a.createdAt || ""));
    }).slice(0, 8);
    var body = !list.length ? '<p class="db-none">' + esc(T("dash.noActivity")) + "</p>" :
      '<ul class="nx-list db-activity">' + list.map(function (c) {
        var lead = c.leadId ? NX.store.get("leads", c.leadId) : null;
        var proj = c.projectId ? NX.store.get("projects", c.projectId) : null;
        var target = lead ? '<a href="#/leads/' + esc(lead.id) + '">' + esc(lead.name || lead.company) + "</a>"
          : proj ? '<a href="#/projects/' + esc(proj.id) + '">' + esc(proj.name) + "</a>" : "";
        var dir = c.direction === "in" ? "in" : "out";
        return '<li><span class="db-ch db-ch-' + dir + '" title="' + esc(T(dir === "in" ? "dash.dirIn" : "dash.dirOut")) + '">' + NX.icon(CH_ICON[c.channel] || "conversations", 15) + "</span>" +
          '<div class="nx-list-main"><span class="db-act-top">' + (target || "<span></span>") + '<small class="nx-muted">' + esc(NX.fmt.rel(c.date || c.createdAt)) + "</small></span>" +
          '<p class="db-act-sum">' + esc(c.summary || "") + "</p></div></li>";
      }).join("") + "</ul>";
    return cardWrap(T("dash.activity"), "", body, "#/conversations");
  }

  function cardWrap(title, sub, body, href, count) {
    return '<section class="nx-card db-card"><div class="nx-card-head"><div><h2>' + esc(title) + (count ? ' <span class="db-count db-count-soft">' + count + "</span>" : "") + "</h2>" +
      (sub ? '<p class="db-head-sub">' + esc(sub) + "</p>" : "") + "</div>" +
      (href ? '<a class="nx-btn nx-btn-text nx-btn-sm" href="' + href + '">' + esc(T("dash.viewAll")) + "</a>" : "") + "</div>" +
      '<div class="nx-card-body nx-flush">' + body + "</div></section>";
  }

  /* ---------- Events ---------- */
  function wire(el, me) {
    var A = NX.actions;
    NX.ui.on(el, "click", "[data-act=new-lead]", function () { if (A.newLead) A.newLead({}); else NX.go("leads"); });
    NX.ui.on(el, "click", "[data-act=new-proposal]", function () { if (A.newProposal) A.newProposal({}); else NX.go("proposals"); });
    NX.ui.on(el, "click", "[data-act=new-followup]", function () { if (A.newFollowup) A.newFollowup({}); else NX.go("followups"); });
    NX.ui.on(el, "click", "[data-act=done]", function (e, b) {
      var f = NX.store.get("followups", b.getAttribute("data-id"));
      if (!f || b.disabled) return;
      b.disabled = true;
      b.classList.add("is-done");
      var li = b.closest("li"); if (li) li.classList.add("is-done");
      if (A.completeFollowup) { A.completeFollowup(f); return; }
      NX.ui.run(NX.store.save("followups", Object.assign({}, f, { status: "done", doneAt: new Date().toISOString() })), T("dash.done"))
        .catch(function () { b.disabled = false; b.classList.remove("is-done"); if (li) li.classList.remove("is-done"); });
    });
    NX.ui.on(el, "click", "[data-act=assign]", function (e, b) {
      var l = NX.store.get("leads", b.getAttribute("data-id"));
      if (!l) return;
      b.disabled = true;
      NX.ui.run(NX.store.save("leads", Object.assign({}, l, { owner: me.email }))).catch(function () { b.disabled = false; });
    });
    NX.ui.on(el, "click", "[data-act=chase]", function (e, b) {
      var p = NX.store.get("proposals", b.getAttribute("data-id"));
      if (!p) return;
      var lead = p.leadId ? NX.store.get("leads", p.leadId) : null;
      if (A.sendMessage) A.sendMessage({ lead: lead, proposal: p, channel: "whatsapp" });
    });
  }

  NX.view("dashboard", { order: 10, icon: "dashboard", render: render });
})();
