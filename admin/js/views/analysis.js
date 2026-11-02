/* NEXA Workspace — Analysis (admin only): sales performance, funnel, sources, services, team */
(function () {
  NX.i18n.add({
    en: {
      "an.sub": "How the business is doing — leads, wins and money.",
      "an.pMonth": "This month",
      "an.p3m": "Last 3 months",
      "an.pYear": "This year",
      "an.pAll": "All time",
      "an.periodNote": "Figures use the date each lead, proposal or project was created.",
      "an.exportCsv": "Export CSV",
      "an.kLeads": "Leads created",
      "an.kLeadsSub": "{n} still open",
      "an.kWinRate": "Win rate",
      "an.kWinRateSub": "{w} won · {l} lost",
      "an.kAvgDeal": "Average deal value",
      "an.kAvgDealSub": "Across {n} won deals",
      "an.kWonValue": "Total won value",
      "an.kWonValueSub": "{n} deals",
      "an.kProps": "Proposals sent",
      "an.kPropsSub": "{p}% accepted · {o} awaiting reply",
      "an.kDays": "Average days to win",
      "an.kDaysSub": "From lead created to won",
      "an.kCollected": "Collected on projects",
      "an.kCollectedSub": "{v} outstanding",
      "an.days": "{n} days",
      "an.noData": "Not enough data yet.",
      "an.monthly": "Leads per month",
      "an.monthlySub": "Last 12 months · all leads",
      "an.monthlyTake": "{n} leads in the last 12 months — busiest month was {m} with {c}.",
      "an.monthlyTakeNone": "No leads in the last 12 months yet.",
      "an.legendLeads": "Other leads",
      "an.legendWon": "Won",
      "an.showTable": "Show as table",
      "an.month": "Month",
      "an.leads": "Leads",
      "an.won": "Won",
      "an.funnel": "Conversion funnel",
      "an.funnelTake": "{p}% of leads reached “{s}”.",
      "an.funnelNote": "Approximate: a lead counts for its current stage and every stage before it. Lost leads count only in the first stage.",
      "an.sources": "Leads by source",
      "an.sourcesTake": "Most leads come from {s} ({p}%).",
      "an.services": "Won value by service",
      "an.servicesTake": "{s} brings the most revenue: {v}.",
      "an.servicesNone": "No won deals in this period yet.",
      "an.lost": "Lost reasons",
      "an.lostTake": "Most common reason: “{r}” ({n}).",
      "an.lostNone": "No lost leads in this period. Great!",
      "an.notSpecified": "Not specified",
      "an.team": "Team performance",
      "an.teamTake": "{u} leads with {v} won.",
      "an.teamNoneTake": "No won deals yet in this period.",
      "an.person": "Team member",
      "an.wonValue": "Won value",
      "an.openFu": "Open follow-ups",
      "an.overdueFu": "Overdue",
      "an.teamNote": "Leads and wins follow the period; follow-ups are shown as they are today.",
      "an.unassigned": "Unassigned",
      "an.csvSection": "Section",
      "an.csvItem": "Item",
      "an.csvValue": "Value",
      "an.csvExtra": "Detail",
      "an.secSummary": "Summary",
      "an.period": "Period",
      "an.kCollectedOut": "Outstanding on projects",
      "an.ofTotal": "{p}% of leads"
    },
    ar: {
      "an.sub": "نظرة على أداء العمل — العملاء والصفقات والإيرادات.",
      "an.pMonth": "هذا الشهر",
      "an.p3m": "آخر 3 أشهر",
      "an.pYear": "هذه السنة",
      "an.pAll": "كل الفترات",
      "an.periodNote": "تعتمد الأرقام على تاريخ إنشاء كل عميل أو عرض أو مشروع.",
      "an.exportCsv": "تصدير CSV",
      "an.kLeads": "العملاء المضافون",
      "an.kLeadsSub": "{n} ما زالت مفتوحة",
      "an.kWinRate": "نسبة الفوز",
      "an.kWinRateSub": "{w} فوز · {l} خسارة",
      "an.kAvgDeal": "متوسط قيمة الصفقة",
      "an.kAvgDealSub": "من {n} صفقات رابحة",
      "an.kWonValue": "إجمالي قيمة الصفقات",
      "an.kWonValueSub": "{n} صفقات",
      "an.kProps": "العروض المرسلة",
      "an.kPropsSub": "{p}% مقبولة · {o} بانتظار الرد",
      "an.kDays": "متوسط أيام الإغلاق",
      "an.kDaysSub": "من إضافة العميل حتى الفوز",
      "an.kCollected": "المحصّل من المشاريع",
      "an.kCollectedSub": "{v} متبقٍ",
      "an.days": "{n} يوم",
      "an.noData": "لا توجد بيانات كافية بعد.",
      "an.monthly": "العملاء شهرياً",
      "an.monthlySub": "آخر 12 شهراً · جميع العملاء",
      "an.monthlyTake": "{n} عميل خلال آخر 12 شهراً — أعلى شهر كان {m} بعدد {c}.",
      "an.monthlyTakeNone": "لا يوجد عملاء خلال آخر 12 شهراً بعد.",
      "an.legendLeads": "عملاء آخرون",
      "an.legendWon": "صفقات رابحة",
      "an.showTable": "عرض كجدول",
      "an.month": "الشهر",
      "an.leads": "العملاء",
      "an.won": "الفوز",
      "an.funnel": "مسار التحويل",
      "an.funnelTake": "{p}% من العملاء وصلوا إلى مرحلة «{s}».",
      "an.funnelNote": "تقريبي: يُحتسب العميل في مرحلته الحالية وجميع المراحل التي قبلها، والعملاء الخاسرون يُحتسبون في المرحلة الأولى فقط.",
      "an.sources": "العملاء حسب المصدر",
      "an.sourcesTake": "أغلب العملاء يأتون من {s} ({p}%).",
      "an.services": "قيمة الصفقات حسب الخدمة",
      "an.servicesTake": "خدمة {s} هي الأعلى إيراداً: {v}.",
      "an.servicesNone": "لا توجد صفقات رابحة في هذه الفترة بعد.",
      "an.lost": "أسباب الخسارة",
      "an.lostTake": "السبب الأكثر تكراراً: «{r}» ({n}).",
      "an.lostNone": "لا توجد صفقات خاسرة في هذه الفترة. ممتاز!",
      "an.notSpecified": "غير محدد",
      "an.team": "أداء الفريق",
      "an.teamTake": "{u} في الصدارة بصفقات قيمتها {v}.",
      "an.teamNoneTake": "لا توجد صفقات رابحة في هذه الفترة بعد.",
      "an.person": "عضو الفريق",
      "an.wonValue": "قيمة الصفقات",
      "an.openFu": "متابعات مفتوحة",
      "an.overdueFu": "متأخرة",
      "an.teamNote": "العملاء والصفقات حسب الفترة المختارة، والمتابعات كما هي اليوم.",
      "an.unassigned": "غير مُسند",
      "an.csvSection": "القسم",
      "an.csvItem": "البند",
      "an.csvValue": "القيمة",
      "an.csvExtra": "تفاصيل",
      "an.secSummary": "الملخص",
      "an.period": "الفترة",
      "an.kCollectedOut": "المتبقي على المشاريع",
      "an.ofTotal": "{p}% من العملاء"
    }
  });

  var esc = NX.esc;
  var T = NX.t;
  var DAY = 86400000;
  var period = "year";
  var PERIODS = [
    { value: "month", key: "an.pMonth" },
    { value: "3m", key: "an.p3m" },
    { value: "year", key: "an.pYear" },
    { value: "all", key: "an.pAll" }
  ];

  function periodStart(p) {
    var d = new Date();
    if (p === "month") return new Date(d.getFullYear(), d.getMonth(), 1);
    if (p === "3m") return new Date(d.getFullYear(), d.getMonth() - 2, 1);
    if (p === "year") return new Date(d.getFullYear(), 0, 1);
    return null;
  }
  function inP(start, v) { if (!start) return true; var x = NX.fmt.toDate(v); return !!x && x >= start; }
  function sum(list, fn) { return list.reduce(function (s, x) { return s + (Number(fn(x)) || 0); }, 0); }
  function pct(a, b) { return b ? Math.round(100 * a / b) : 0; }
  function moneyShort(v) { return Math.abs(v) >= 1e6 ? NX.fmt.compact(v) + " " + T("c.sar") : NX.fmt.money(v); }
  function loc() { return NX.i18n.isAr ? "ar-SA-u-nu-latn-ca-gregory" : "en-GB"; }
  function propTotal(p) { try { return NX.calc.proposal(p).total; } catch (e) { return 0; } }
  function tipAttr(value, label) { return ' data-tip="' + esc(value) + '" data-tip-label="' + esc(label) + '" tabindex="0"'; }

  /* ---------- Compute everything for the selected period ---------- */
  function compute() {
    var start = periodStart(period);
    var stages = NX.list("stages");
    var wonIds = stages.filter(function (s) { return s.won; }).map(function (s) { return s.id; });
    var lostIds = stages.filter(function (s) { return s.closed && !s.won; }).map(function (s) { return s.id; });
    var isWon = function (l) { return wonIds.indexOf(l.stage) > -1; };
    var isLost = function (l) { return lostIds.indexOf(l.stage) > -1; };

    var allLeads = NX.store.all("leads");
    var leads = allLeads.filter(function (l) { return inP(start, l.createdAt); });
    var won = leads.filter(isWon), lost = leads.filter(isLost);
    var wonValue = sum(won, function (l) { return l.value; });
    var days = won.map(function (l) {
      var a = NX.fmt.toDate(l.createdAt), b = NX.fmt.toDate(l.updatedAt);
      return a && b ? Math.max(0, (b - a) / DAY) : null;
    }).filter(function (x) { return x != null; });

    var props = NX.store.where("proposals", function (p) { return p.status && p.status !== "draft" && inP(start, p.date || p.createdAt); });
    var accepted = props.filter(function (p) { return p.status === "accepted"; }).length;
    var pending = props.filter(function (p) { return p.status === "sent"; }).length;

    var projects = NX.store.where("projects", function (p) { return inP(start, p.startDate || p.createdAt); });
    var projValue = sum(projects, function (p) { return p.value; });
    var collected = sum(projects, function (p) { return p.paid; });

    /* Leads per month — last 12 months, independent of period */
    var now = new Date(), months = [];
    for (var i = 11; i >= 0; i--) {
      var m = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({ y: m.getFullYear(), m: m.getMonth(), date: m, n: 0, won: 0 });
    }
    allLeads.forEach(function (l) {
      var d = NX.fmt.toDate(l.createdAt); if (!d) return;
      var mo = months.find(function (x) { return x.y === d.getFullYear() && x.m === d.getMonth(); });
      if (mo) { mo.n++; if (isWon(l)) mo.won++; }
    });

    /* Funnel */
    var ordered = stages.filter(function (s) { return lostIds.indexOf(s.id) === -1; });
    var idxOf = function (l) { if (isLost(l)) return 0; var i = ordered.findIndex(function (s) { return s.id === l.stage; }); return i < 0 ? 0 : i; };
    var funnel = ordered.map(function (s, j) { return { s: s, n: leads.filter(function (l) { return idxOf(l) >= j; }).length }; });

    /* Sources */
    var sources = NX.list("sources").map(function (s) { return { id: s.id, label: NX.i18n.pick(s), n: leads.filter(function (l) { return l.source === s.id; }).length }; });
    var otherSrc = leads.filter(function (l) { return !NX.list("sources").some(function (s) { return s.id === l.source; }); }).length;
    if (otherSrc) sources.push({ id: "_none", label: T("an.notSpecified"), n: otherSrc });
    sources = sources.filter(function (s) { return s.n; }).sort(function (a, b) { return b.n - a.n; });

    /* Services (won value) */
    var services = NX.list("services").map(function (s) {
      var w = won.filter(function (l) { return l.service === s.id; });
      return { id: s.id, label: NX.i18n.pick(s), v: sum(w, function (l) { return l.value; }), n: w.length };
    }).filter(function (s) { return s.v || s.n; }).sort(function (a, b) { return b.v - a.v; });

    /* Lost reasons */
    var reasons = {};
    lost.forEach(function (l) {
      var r = String(l.lostReason || "").trim();
      var k = r.toLowerCase() || "_none";
      if (!reasons[k]) reasons[k] = { label: r || T("an.notSpecified"), n: 0 };
      reasons[k].n++;
    });
    reasons = Object.keys(reasons).map(function (k) { return reasons[k]; }).sort(function (a, b) { return b.n - a.n; });

    /* Team */
    var today = NX.fmt.today();
    var emails = NX.store.users().map(function (u) { return u.email; });
    allLeads.forEach(function (l) { if (l.owner && emails.indexOf(l.owner) === -1) emails.push(l.owner); });
    if (leads.some(function (l) { return !l.owner; })) emails.push("");
    var fus = NX.store.where("followups", function (f) { return f.status !== "done"; });
    var team = emails.map(function (e) {
      var ls = leads.filter(function (l) { return (l.owner || "") === e; });
      var ws = ls.filter(isWon);
      var f = fus.filter(function (x) { return (x.owner || "") === e; });
      return {
        email: e, name: e ? NX.userName(e) : T("an.unassigned"),
        leads: ls.length, won: ws.length, wonValue: sum(ws, function (l) { return l.value; }),
        open: f.length, overdue: f.filter(function (x) { return x.dueDate && x.dueDate < today; }).length
      };
    }).sort(function (a, b) { return b.wonValue - a.wonValue || b.leads - a.leads; });

    return {
      start: start, leads: leads, open: leads.filter(function (l) { return !isWon(l) && !isLost(l); }).length,
      won: won, lost: lost, wonValue: wonValue, avgDeal: won.length ? wonValue / won.length : 0,
      winRate: won.length + lost.length ? pct(won.length, won.length + lost.length) : null,
      avgDays: days.length ? Math.round(days.reduce(function (a, b) { return a + b; }, 0) / days.length) : null,
      props: props, accepted: accepted, pending: pending, acceptRate: pct(accepted, props.length),
      projValue: projValue, collected: collected, outstanding: Math.max(0, projValue - collected),
      months: months, funnel: funnel, sources: sources, services: services, reasons: reasons, team: team
    };
  }

  /* ---------- Chart pieces ---------- */
  /* Horizontal bars (HTML, so text stays crisp and RTL flips automatically). rows: [{label, value, display, tip}] */
  function hbars(rows, opts) {
    opts = opts || {};
    var max = Math.max.apply(null, rows.map(function (r) { return r.value; }).concat([0])) || 1;
    return '<div class="an-hbars">' + rows.map(function (r) {
      var w = r.value ? Math.max(1.5, 100 * r.value / max) : 0;
      return '<div class="an-hbar"' + tipAttr(r.tip || r.display, r.label) + ">" +
        '<div class="an-hbar-top"><span class="an-hbar-label">' + esc(r.label) + '</span><span class="an-hbar-val nx-num">' + esc(r.display) + "</span></div>" +
        '<div class="an-hbar-track"><span class="an-hbar-fill' + (opts.fade && r.fade ? " is-fade" : "") + '" style="width:' + w.toFixed(1) + '%"></span></div></div>';
    }).join("") + "</div>";
  }

  /* Monthly stacked columns: won (accent) on the baseline, other leads (neutral) above, 2px surface gap. */
  function columns(months) {
    var max = Math.max.apply(null, months.map(function (m) { return m.n; }).concat([1]));
    var step = max <= 4 ? 1 : max <= 10 ? 2 : max <= 25 ? 5 : max <= 50 ? 10 : Math.ceil(max / 5 / 10) * 10;
    var top = Math.ceil(max / step) * step;
    var ticks = []; for (var t = 0; t <= top; t += step) ticks.push(t);
    var peak = months.reduce(function (b, m, i) { return m.n > months[b].n ? i : b; }, 0);
    var grid = ticks.map(function (t) {
      return '<div class="an-grid-line" style="bottom:' + (100 * t / top).toFixed(2) + '%"><span class="nx-num">' + t + "</span></div>";
    }).join("");
    var cols = months.map(function (m, i) {
      var label = m.date.toLocaleDateString(loc(), { month: "short" });
      var full = m.date.toLocaleDateString(loc(), { month: "long", year: "numeric" });
      var other = m.n - m.won;
      var hOther = 100 * other / top, hWon = 100 * m.won / top;
      var showVal = m.n && (i === peak || i === months.length - 1);
      return '<div class="an-col"' + tipAttr(T("an.leads") + ": " + m.n + " · " + T("an.won") + ": " + m.won, full) + ">" +
        '<div class="an-col-plot">' +
        (showVal ? '<span class="an-col-val nx-num" style="bottom:calc(' + (hOther + hWon).toFixed(2) + '% + 4px)">' + m.n + "</span>" : "") +
        '<div class="an-col-stack" style="height:' + (hOther + hWon).toFixed(2) + '%">' +
        (other ? '<span class="an-seg an-seg-other" style="flex:' + other + '"></span>' : "") +
        (m.won ? '<span class="an-seg an-seg-won" style="flex:' + m.won + '"></span>' : "") +
        "</div></div>" +
        '<span class="an-col-lbl">' + esc(label) + "</span></div>";
    }).join("");
    var legend = '<div class="an-legend"><span><i class="an-key an-key-other"></i>' + esc(T("an.legendLeads")) + '</span><span><i class="an-key an-key-won"></i>' + esc(T("an.legendWon")) + "</span></div>";
    var table = '<details class="an-details"><summary>' + esc(T("an.showTable")) + "</summary>" +
      NX.ui.table({
        cols: [
          { label: T("an.month"), render: function (m) { return esc(m.date.toLocaleDateString(loc(), { month: "long", year: "numeric" })); } },
          { label: T("an.leads"), cls: "nx-right", render: function (m) { return '<span class="nx-num">' + m.n + "</span>"; } },
          { label: T("an.won"), cls: "nx-right", render: function (m) { return '<span class="nx-num">' + m.won + "</span>"; } }
        ],
        rows: months.slice().reverse()
      }) + "</details>";
    return legend + '<div class="an-cols-wrap"><div class="an-grid">' + grid + '</div><div class="an-cols">' + cols + "</div></div>" + table;
  }

  function chartCard(title, take, body, opts) {
    opts = opts || {};
    return '<section class="nx-card an-card' + (opts.cls ? " " + opts.cls : "") + '"><div class="nx-card-head"><div><h2>' + esc(title) + "</h2>" +
      (opts.sub ? '<p class="an-sub">' + esc(opts.sub) + "</p>" : "") + "</div></div>" +
      '<div class="nx-card-body">' + (take ? '<p class="an-take">' + esc(take) + "</p>" : "") + body +
      (opts.note ? '<p class="an-note">' + esc(opts.note) + "</p>" : "") + "</div></section>";
  }

  /* ---------- Render ---------- */
  function render(el) {
    var d = compute();
    var periodLabel = T((PERIODS.find(function (p) { return p.value === period; }) || PERIODS[0]).key);

    var kpis = [
      NX.ui.kpi({ label: T("an.kLeads"), value: String(d.leads.length), sub: esc(T("an.kLeadsSub", { n: d.open })), icon: "leads" }),
      NX.ui.kpi({ label: T("an.kWinRate"), value: d.winRate == null ? "—" : d.winRate + "%", sub: esc(T("an.kWinRateSub", { w: d.won.length, l: d.lost.length })), icon: "star" }),
      NX.ui.kpi({ label: T("an.kWonValue"), value: esc(moneyShort(d.wonValue)), sub: esc(T("an.kWonValueSub", { n: d.won.length })), icon: "money", tone: "dark" }),
      NX.ui.kpi({ label: T("an.kAvgDeal"), value: d.won.length ? esc(moneyShort(d.avgDeal)) : "—", sub: esc(T("an.kAvgDealSub", { n: d.won.length })), icon: "money" }),
      NX.ui.kpi({ label: T("an.kProps"), value: String(d.props.length), sub: esc(T("an.kPropsSub", { p: d.acceptRate, o: d.pending })), icon: "proposals" }),
      NX.ui.kpi({ label: T("an.kDays"), value: d.avgDays == null ? "—" : esc(T("an.days", { n: d.avgDays })), sub: esc(T("an.kDaysSub")), icon: "calendar" }),
      NX.ui.kpi({ label: T("an.kCollected"), value: esc(moneyShort(d.collected)), icon: "projects",
        sub: '<span class="an-meter" role="img" aria-label="' + pct(d.collected, d.projValue) + '%"><span style="width:' + pct(d.collected, d.projValue) + '%"></span></span>' + esc(T("an.kCollectedSub", { v: moneyShort(d.outstanding) })) })
    ];

    /* Monthly */
    var totalYear = d.months.reduce(function (s, m) { return s + m.n; }, 0);
    var peak = d.months.reduce(function (b, m) { return m.n > b.n ? m : b; }, d.months[0]);
    var monthlyTake = totalYear ? T("an.monthlyTake", { n: totalYear, m: peak.date.toLocaleDateString(loc(), { month: "long" }), c: peak.n }) : T("an.monthlyTakeNone");

    /* Funnel */
    var first = d.funnel.length ? d.funnel[0].n : 0;
    var wonStep = d.funnel.find(function (f) { return f.s.won; }) || d.funnel[d.funnel.length - 1];
    var funnelBody = first ? hbars(d.funnel.map(function (f) {
      return { label: NX.i18n.pick(f.s), value: f.n, display: f.n + " · " + pct(f.n, first) + "%", tip: f.n + " · " + T("an.ofTotal", { p: pct(f.n, first) }) };
    })) : NX.ui.empty(T("an.noData"));
    var funnelTake = first && wonStep ? T("an.funnelTake", { p: pct(wonStep.n, first), s: NX.i18n.pick(wonStep.s) }) : "";

    /* Sources */
    var nLeads = d.leads.length;
    var srcBody = d.sources.length ? hbars(d.sources.map(function (s) {
      return { label: s.label, value: s.n, display: s.n + " · " + pct(s.n, nLeads) + "%" };
    })) : NX.ui.empty(T("an.noData"));
    var srcTake = d.sources.length ? T("an.sourcesTake", { s: d.sources[0].label, p: pct(d.sources[0].n, nLeads) }) : "";

    /* Services */
    var svcBody = d.services.length ? hbars(d.services.map(function (s) {
      return { label: s.label, value: s.v, display: NX.fmt.compact(s.v), tip: NX.fmt.money(s.v) + " · " + T("an.kWonValueSub", { n: s.n }) };
    })) : NX.ui.empty(T("an.servicesNone"));
    var svcTake = d.services.length ? T("an.servicesTake", { s: d.services[0].label, v: moneyShort(d.services[0].v) }) : "";

    /* Lost */
    var lostBody = d.reasons.length ? '<ul class="an-reasons">' + d.reasons.map(function (r) {
      return '<li><span>' + esc(r.label) + '</span><span class="nx-num an-reason-n">' + r.n + "</span></li>";
    }).join("") + "</ul>" : NX.ui.empty(T("an.lostNone"));
    var lostTake = d.reasons.length ? T("an.lostTake", { r: d.reasons[0].label, n: d.reasons[0].n }) : "";

    /* Team */
    var leader = d.team.find(function (u) { return u.wonValue > 0 && u.email; });
    var teamTake = leader ? T("an.teamTake", { u: leader.name, v: moneyShort(leader.wonValue) }) : T("an.teamNoneTake");
    var teamBody = NX.ui.table({
      cols: [
        { label: T("an.person"), render: function (u) { return '<span class="an-person">' + NX.ui.avatar(u.name) + '<span><b class="nx-cell-title">' + esc(u.name) + "</b>" + (u.email ? '<small class="nx-cell-sub">' + esc(u.email) + "</small>" : "") + "</span></span>"; } },
        { label: T("an.leads"), cls: "nx-right", render: function (u) { return '<span class="nx-num">' + u.leads + "</span>"; } },
        { label: T("an.won"), cls: "nx-right", render: function (u) { return '<span class="nx-num">' + u.won + "</span>"; } },
        { label: T("an.wonValue"), cls: "nx-right", render: function (u) { return '<span class="nx-num">' + esc(NX.fmt.money(u.wonValue)) + "</span>"; } },
        { label: T("an.openFu"), cls: "nx-right", render: function (u) { return '<span class="nx-num">' + u.open + "</span>"; } },
        { label: T("an.overdueFu"), cls: "nx-right", render: function (u) { return u.overdue ? '<span class="nx-badge nx-tone-red nx-num">' + u.overdue + "</span>" : '<span class="nx-num nx-muted">0</span>'; } }
      ],
      rows: d.team
    });

    el.innerHTML =
      NX.ui.pageHead({ title: T("nav.analysis"), sub: esc(T("an.sub")), actions: NX.ui.btn({ label: T("an.exportCsv"), icon: "download", act: "csv" }) }) +
      '<div class="nx-toolbar an-toolbar">' + NX.ui.chips(PERIODS.map(function (p) { return { value: p.value, label: T(p.key) }; }), period, "period") +
      '<span class="an-period-note nx-muted nx-small">' + esc(T("an.periodNote")) + "</span></div>" +
      '<div class="an-kpis">' + kpis.join("") + "</div>" +
      '<div class="an-grid-2">' +
      chartCard(T("an.monthly"), monthlyTake, columns(d.months), { sub: T("an.monthlySub"), cls: "an-wide" }) +
      chartCard(T("an.funnel"), funnelTake, funnelBody, { sub: periodLabel, note: T("an.funnelNote") }) +
      chartCard(T("an.sources"), srcTake, srcBody, { sub: periodLabel }) +
      chartCard(T("an.services"), svcTake, svcBody, { sub: periodLabel }) +
      chartCard(T("an.lost"), lostTake, lostBody, { sub: periodLabel }) +
      "</div>" +
      '<section class="nx-card an-card an-team"><div class="nx-card-head"><div><h2>' + esc(T("an.team")) + '</h2><p class="an-sub">' + esc(periodLabel) + "</p></div></div>" +
      '<div class="nx-card-body"><p class="an-take">' + esc(teamTake) + "</p></div>" +
      '<div class="nx-card-body nx-flush">' + teamBody + "</div>" +
      '<div class="nx-card-body"><p class="an-note">' + esc(T("an.teamNote")) + "</p></div></section>" +
      '<div class="an-tip" role="tooltip" hidden><b></b><small></small></div>';

    NX.ui.on(el, "click", "[data-period]", function (e, b) { period = b.getAttribute("data-period"); NX.app.rerender(); });
    NX.ui.on(el, "click", "[data-act=csv]", function () { exportCsv(d, periodLabel); });
    wireTips(el);
  }

  /* One tooltip for every mark: value first, label second. Text is set with textContent. */
  function wireTips(el) {
    var tip = el.querySelector(".an-tip");
    var show = function (t) {
      tip.querySelector("b").textContent = t.getAttribute("data-tip");
      tip.querySelector("small").textContent = t.getAttribute("data-tip-label") || "";
      tip.hidden = false;
      var r = t.getBoundingClientRect(), host = el.getBoundingClientRect();
      var tw = tip.offsetWidth, th = tip.offsetHeight;
      var x = r.left + r.width / 2 - host.left - tw / 2;
      x = Math.max(0, Math.min(x, host.width - tw));
      var y = r.top - host.top - th - 8;
      if (t.classList.contains("an-col")) y = r.top - host.top + r.height * 0.15 - th;
      tip.style.left = x + "px"; tip.style.top = Math.max(0, y) + "px";
    };
    var hide = function () { tip.hidden = true; };
    el.addEventListener("pointerover", function (e) { var t = e.target.closest("[data-tip]"); if (t && el.contains(t)) show(t); });
    el.addEventListener("pointerout", function (e) { var t = e.target.closest("[data-tip]"); if (t && !t.contains(e.relatedTarget)) hide(); });
    el.addEventListener("focusin", function (e) { var t = e.target.closest("[data-tip]"); if (t) show(t); });
    el.addEventListener("focusout", hide);
  }

  function exportCsv(d, periodLabel) {
    var rows = [];
    var S = T("an.secSummary");
    var add = function (sec, item, value, extra) { rows.push({ s: sec, i: item, v: value, x: extra == null ? "" : extra }); };
    add(S, T("an.period"), periodLabel);
    add(S, T("an.kLeads"), d.leads.length);
    add(S, T("an.kWinRate"), d.winRate == null ? "" : d.winRate + "%", T("an.kWinRateSub", { w: d.won.length, l: d.lost.length }));
    add(S, T("an.kWonValue"), Math.round(d.wonValue), T("c.sar"));
    add(S, T("an.kAvgDeal"), Math.round(d.avgDeal), T("c.sar"));
    add(S, T("an.kProps"), d.props.length, T("an.kPropsSub", { p: d.acceptRate, o: d.pending }));
    add(S, T("an.kDays"), d.avgDays == null ? "" : d.avgDays);
    add(S, T("an.kCollected"), Math.round(d.collected), T("c.sar"));
    add(S, T("an.kCollectedOut"), Math.round(d.outstanding), T("c.sar"));
    d.months.forEach(function (m) { add(T("an.monthly"), m.date.toLocaleDateString(loc(), { month: "long", year: "numeric" }), m.n, T("an.won") + ": " + m.won); });
    d.funnel.forEach(function (f) { add(T("an.funnel"), NX.i18n.pick(f.s), f.n); });
    d.sources.forEach(function (s) { add(T("an.sources"), s.label, s.n, pct(s.n, d.leads.length) + "%"); });
    d.services.forEach(function (s) { add(T("an.services"), s.label, Math.round(s.v), T("an.kWonValueSub", { n: s.n })); });
    d.reasons.forEach(function (r) { add(T("an.lost"), r.label, r.n); });
    d.team.forEach(function (u) {
      add(T("an.team"), u.name, u.won, [T("an.leads") + ": " + u.leads, T("an.wonValue") + ": " + Math.round(u.wonValue), T("an.openFu") + ": " + u.open, T("an.overdueFu") + ": " + u.overdue].join(" | "));
    });
    var csv = NX.ui.csv(rows, [
      { label: T("an.csvSection"), key: "s" }, { label: T("an.csvItem"), key: "i" },
      { label: T("an.csvValue"), key: "v" }, { label: T("an.csvExtra"), key: "x" }
    ]);
    NX.ui.download("nexa-analysis-" + period + "-" + NX.fmt.today() + ".csv", csv, "text/csv;charset=utf-8");
  }

  NX.view("analysis", { order: 80, icon: "analysis", adminOnly: true, render: render });
})();
