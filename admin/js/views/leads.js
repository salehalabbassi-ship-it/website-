/* NEXA Workspace — Leads (pipeline board, list, lead page, lead form)
 * Owns: NX.actions.newLead(prefill), NX.actions.editLead(lead) */
(function () {
  var esc = NX.esc;
  /* User text in an isolated direction box so English inside Arabic (and vice versa) keeps its punctuation in place. */
  function bdi(s) { return "<bdi>" + esc(s) + "</bdi>"; }

  NX.i18n.add({
    en: {
      "lead.new": "New lead",
      "lead.edit": "Edit lead",
      "lead.sub": "{n} leads · open pipeline {v}",
      "lead.searchPh": "Search name, company, phone, email, city…",
      "lead.open": "Open",
      "lead.allServices": "All services",
      "lead.allOwners": "All owners",
      "lead.mine": "Mine",
      "lead.unassigned": "Unassigned",
      "lead.board": "Board",
      "lead.list": "List",
      "lead.exportCsv": "Export CSV",
      "lead.noMatch": "No leads match these filters.",
      "lead.noLeads": "No leads yet. Add your first lead to start the pipeline.",
      "lead.dropHere": "Drop a lead here",
      "lead.colEmpty": "No leads",
      "lead.moveTo": "Move to stage",
      "lead.movedTo": "Moved to {stage}",
      "lead.updatedOn": "Last update: {d}",
      "lead.openLead": "Open lead",
      "lead.company": "Company",
      "lead.sector": "Sector",
      "lead.area": "Area (m²)",
      "lead.areaShort": "Area",
      "lead.areaV": "{n} m²",
      "lead.estValue": "Estimated value (SAR)",
      "lead.estValueShort": "Estimated value",
      "lead.lostReason": "Lost reason",
      "lead.secContact": "Contact",
      "lead.secProject": "Project",
      "lead.secPipeline": "Pipeline",
      "lead.phoneHint": "Phone or email — at least one is needed.",
      "lead.needContact": "Add a phone number or an email.",
      "lead.addFu": "Add a follow-up in {n} days",
      "lead.fuTitle": "First contact: {name}",
      "lead.dupPhone": "Another lead already has this phone number: {name}",
      "lead.dupOpen": "Open it",
      "lead.created": "Lead created",
      "lead.notFound": "This lead doesn't exist or was deleted.",
      "lead.backToLeads": "Back to leads",
      "lead.newProposal": "New proposal",
      "lead.addFollowup": "Add follow-up",
      "lead.logConv": "Log conversation",
      "lead.details": "Details",
      "lead.timeline": "Timeline",
      "lead.timelineEmpty": "No activity yet. Log a call or WhatsApp message to start the history.",
      "lead.openFus": "Open follow-ups",
      "lead.noFus": "No open follow-ups.",
      "lead.proposals": "Proposals",
      "lead.noProps": "No proposals yet.",
      "lead.projects": "Projects",
      "lead.noProjects": "No projects yet.",
      "lead.createProject": "Create project",
      "lead.markDone": "Mark as done",
      "lead.doneOn": "Done {d}",
      "lead.due": "Due {d}",
      "lead.followup": "Follow-up",
      "lead.proposal": "Proposal",
      "lead.unavailable": "This section isn't available yet.",
      "lead.lostTitle": "Mark as lost",
      "lead.lostAsk": "Why didn't {name} go ahead?",
      "lead.lostQuick": "Quick pick",
      "lead.lr.budget": "Budget too low",
      "lead.lr.competitor": "Went with a competitor",
      "lead.lr.noReply": "No response",
      "lead.lr.timing": "Postponed / bad timing",
      "lead.lr.scope": "Not a fit for our services",
      "lead.wonTitle": "Lead won 🎉",
      "lead.wonAsk": "{name} is won. Create a project for it now?",
      "lead.noPhone": "No phone number",
      "lead.noEmail": "No email",
      "lead.days": "{n}d",
      "lead.inOut.in": "Incoming",
      "lead.inOut.out": "Outgoing",
      "lead.ch.whatsapp": "WhatsApp",
      "lead.ch.call": "Call",
      "lead.ch.email": "Email",
      "lead.ch.meeting": "Meeting",
      "lead.ch.sitevisit": "Site visit",
      "lead.ch.website": "Website",
      "lead.ch.other": "Other",
      "lead.ps.draft": "Draft",
      "lead.ps.sent": "Sent",
      "lead.ps.accepted": "Accepted",
      "lead.ps.rejected": "Rejected",
      "lead.csv.created": "Created",
      "lead.csv.updated": "Updated"
    },
    ar: {
      "lead.new": "عميل جديد",
      "lead.edit": "تعديل العميل",
      "lead.sub": "{n} عميل · قيمة الفرص المفتوحة {v}",
      "lead.searchPh": "ابحث بالاسم أو الشركة أو الجوال أو البريد أو المدينة…",
      "lead.open": "مفتوحة",
      "lead.allServices": "كل الخدمات",
      "lead.allOwners": "كل المسؤولين",
      "lead.mine": "عملائي",
      "lead.unassigned": "بدون مسؤول",
      "lead.board": "لوحة",
      "lead.list": "قائمة",
      "lead.exportCsv": "تصدير CSV",
      "lead.noMatch": "لا يوجد عملاء مطابقون لهذه الفلاتر.",
      "lead.noLeads": "لا يوجد عملاء بعد. أضف أول عميل لتبدأ مسار المبيعات.",
      "lead.dropHere": "أفلت العميل هنا",
      "lead.colEmpty": "لا يوجد عملاء",
      "lead.moveTo": "نقل إلى مرحلة",
      "lead.movedTo": "تم النقل إلى {stage}",
      "lead.updatedOn": "آخر تحديث: {d}",
      "lead.openLead": "فتح العميل",
      "lead.company": "الشركة",
      "lead.sector": "القطاع",
      "lead.area": "المساحة (م²)",
      "lead.areaShort": "المساحة",
      "lead.areaV": "{n} م²",
      "lead.estValue": "القيمة التقديرية (ر.س)",
      "lead.estValueShort": "القيمة التقديرية",
      "lead.lostReason": "سبب الخسارة",
      "lead.secContact": "بيانات التواصل",
      "lead.secProject": "المشروع",
      "lead.secPipeline": "مسار المبيعات",
      "lead.phoneHint": "الجوال أو البريد — واحد منهما على الأقل.",
      "lead.needContact": "أضف رقم جوال أو بريداً إلكترونياً.",
      "lead.addFu": "إضافة متابعة بعد {n} أيام",
      "lead.fuTitle": "التواصل الأول: {name}",
      "lead.dupPhone": "يوجد عميل آخر بنفس رقم الجوال: {name}",
      "lead.dupOpen": "فتحه",
      "lead.created": "تمت إضافة العميل",
      "lead.notFound": "هذا العميل غير موجود أو تم حذفه.",
      "lead.backToLeads": "العودة إلى العملاء",
      "lead.newProposal": "عرض سعر جديد",
      "lead.addFollowup": "إضافة متابعة",
      "lead.logConv": "تسجيل محادثة",
      "lead.details": "التفاصيل",
      "lead.timeline": "السجل الزمني",
      "lead.timelineEmpty": "لا يوجد نشاط بعد. سجّل مكالمة أو رسالة واتساب لبدء السجل.",
      "lead.openFus": "المتابعات المفتوحة",
      "lead.noFus": "لا توجد متابعات مفتوحة.",
      "lead.proposals": "عروض الأسعار",
      "lead.noProps": "لا توجد عروض أسعار بعد.",
      "lead.projects": "المشاريع",
      "lead.noProjects": "لا توجد مشاريع بعد.",
      "lead.createProject": "إنشاء مشروع",
      "lead.markDone": "تحديد كمنجزة",
      "lead.doneOn": "أُنجزت {d}",
      "lead.due": "الموعد {d}",
      "lead.followup": "متابعة",
      "lead.proposal": "عرض سعر",
      "lead.unavailable": "هذا القسم غير متاح بعد.",
      "lead.lostTitle": "تحديد كخسارة",
      "lead.lostAsk": "لماذا لم يكمل {name}؟",
      "lead.lostQuick": "اختيار سريع",
      "lead.lr.budget": "الميزانية منخفضة",
      "lead.lr.competitor": "اختار منافساً آخر",
      "lead.lr.noReply": "لا يوجد رد",
      "lead.lr.timing": "تأجيل / توقيت غير مناسب",
      "lead.lr.scope": "خارج نطاق خدماتنا",
      "lead.wonTitle": "تم الفوز بالعميل 🎉",
      "lead.wonAsk": "تم الفوز بـ {name}. هل تريد إنشاء مشروع له الآن؟",
      "lead.noPhone": "لا يوجد رقم جوال",
      "lead.noEmail": "لا يوجد بريد",
      "lead.days": "{n} يوم",
      "lead.inOut.in": "وارد",
      "lead.inOut.out": "صادر",
      "lead.ch.whatsapp": "واتساب",
      "lead.ch.call": "مكالمة",
      "lead.ch.email": "بريد",
      "lead.ch.meeting": "اجتماع",
      "lead.ch.sitevisit": "زيارة موقع",
      "lead.ch.website": "الموقع الإلكتروني",
      "lead.ch.other": "أخرى",
      "lead.ps.draft": "مسودة",
      "lead.ps.sent": "مُرسل",
      "lead.ps.accepted": "مقبول",
      "lead.ps.rejected": "مرفوض",
      "lead.csv.created": "تاريخ الإنشاء",
      "lead.csv.updated": "آخر تحديث"
    }
  });

  /* Common sectors (stored in English; shown in the user's language). */
  var SECTORS = [
    ["Residential", "سكني"], ["Commercial", "تجاري"], ["Clinics & Healthcare", "العيادات والرعاية الصحية"],
    ["Office & Corporate", "المكاتب والشركات"], ["Mixed-Use", "متعدد الاستخدامات"], ["High-Rise Buildings", "الأبراج والمباني العالية"],
    ["Booth Design", "تصميم الأجنحة"], ["Roads Bridges & Tunnels", "الطرق والجسور والأنفاق"], ["Hospitality", "الضيافة والفنادق"], ["Retail", "التجزئة"]
  ];
  function sectorLabel(s) {
    if (!s || !NX.i18n.isAr) return s || "";
    var hit = SECTORS.find(function (x) { return x[0].toLowerCase() === String(s).toLowerCase(); });
    return hit ? hit[1] : s;
  }

  /* ---------- Module state (survives re-renders) ---------- */
  var state = { q: "", stage: "all", service: "", owner: "", view: null, boardScroll: 0 };
  function getView() {
    if (state.view) return state.view;
    var v = null;
    try { v = localStorage.getItem("nx_leads_view"); } catch (e) {}
    state.view = (v === "board" || v === "list") ? v : (window.innerWidth < 720 ? "list" : "board");
    return state.view;
  }
  function setView(v) { state.view = v; try { localStorage.setItem("nx_leads_view", v); } catch (e) {} }

  /* ---------- Helpers ---------- */
  function me() { return (NX.store.session && NX.store.session.email) || ""; }
  function stages() { return NX.list("stages"); }
  function stageObj(id) { return stages().find(function (s) { return s.id === id; }) || null; }
  function isWon(id) { var s = stageObj(id); return s ? !!s.won : id === "won"; }
  function isLost(id) { var s = stageObj(id); return s ? (!!s.closed && !s.won) : id === "lost"; }
  function isOpen(id) { var s = stageObj(id); return s ? !s.closed : (id !== "won" && id !== "lost"); }
  function defaultStage() { return stageObj("new") ? "new" : ((stages()[0] || {}).id || "new"); }
  function ageDays(l) {
    var t = NX.fmt.toDate(l.updatedAt || l.createdAt);
    return t ? Math.max(0, Math.floor((Date.now() - t.getTime()) / 864e5)) : 0;
  }
  function ageLabel(n) { return n === 0 ? NX.t("c.today") : NX.t("lead.days", { n: n }); }
  function ts(x) { var d = NX.fmt.toDate(x); return d ? d.getTime() : 0; }
  function byUpdated(a, b) { return String(b.updatedAt || b.createdAt || "").localeCompare(String(a.updatedAt || a.createdAt || "")); }
  function digits(p) { return String(p || "").replace(/\D/g, ""); }
  function dupOf(phone, exceptId) {
    var n = NX.phone.intl(phone);
    if (!n || n.length < 7) return null;
    return NX.store.all("leads").find(function (l) { return l.id !== exceptId && l.phone && NX.phone.intl(l.phone) === n; }) || null;
  }
  function call(name, arg) {
    if (NX.actions[name]) return NX.actions[name](arg);
    NX.ui.toast(NX.t("lead.unavailable"), "error");
  }
  function ownerAvatar(email) {
    if (!email) return '<span class="nx-avatar ld-av-empty" title="' + esc(NX.t("lead.unassigned")) + '">' + NX.icon("user", 13) + "</span>";
    return '<span class="ld-av" title="' + esc(NX.userName(email)) + '">' + NX.ui.avatar(NX.userName(email)) + "</span>";
  }

  /* ---------- Filtering ---------- */
  function matchesBase(l) {
    var q = state.q.trim().toLowerCase();
    if (q) {
      var hit = ["name", "company", "phone", "email", "city"].some(function (k) { return String(l[k] || "").toLowerCase().indexOf(q) > -1; });
      var qd = digits(q);
      if (!hit && qd.length >= 3) hit = digits(l.phone).indexOf(qd) > -1 || NX.phone.intl(l.phone).indexOf(qd) > -1;
      if (!hit) return false;
    }
    if (state.service && l.service !== state.service) return false;
    if (state.owner === "mine" && l.owner !== me()) return false;
    if (state.owner === "none" && l.owner) return false;
    if (state.owner && state.owner !== "mine" && state.owner !== "none" && l.owner !== state.owner) return false;
    return true;
  }
  function matchesStage(l) {
    if (state.stage === "all") return true;
    if (state.stage === "open") return isOpen(l.stage);
    return l.stage === state.stage;
  }

  /* ---------- Stage changes (shared by board, select, stepper) ---------- */
  function changeStage(lead, stageId) {
    if (!lead || !stageId || lead.stage === stageId) return;
    if (isLost(stageId)) { askLost(lead, stageId); return; }
    var rec = Object.assign({}, lead, { stage: stageId, lostReason: "" });
    return NX.ui.run(NX.store.save("leads", rec), NX.t("lead.movedTo", { stage: NX.opt("stages", stageId) })).then(function (saved) {
      if (isWon(stageId)) offerProject(saved);
    }, function () {});
  }

  function askLost(lead, stageId) {
    var reasons = ["budget", "competitor", "noReply", "timing", "scope"].map(function (k) { return NX.t("lead.lr." + k); });
    NX.ui.modal({
      title: NX.t("lead.lostTitle"), size: "sm", submitLabel: NX.t("lead.lostTitle"),
      body: '<p class="ld-lost-ask">' + esc(NX.t("lead.lostAsk", { name: lead.name })) + "</p>" +
        '<div class="ld-reasons" aria-label="' + esc(NX.t("lead.lostQuick")) + '">' + reasons.map(function (r) {
          return '<button type="button" class="nx-chip" data-reason="' + esc(r) + '">' + esc(r) + "</button>";
        }).join("") + "</div>" +
        NX.ui.field({ name: "lostReason", label: NX.t("lead.lostReason"), type: "textarea", rows: 2, required: true, value: lead.lostReason || "" }),
      onOpen: function (f) {
        var sb = f.querySelector('[type="submit"]'); if (sb) sb.className = "nx-btn nx-btn-danger";
        NX.ui.on(f, "click", "[data-reason]", function (e, b) {
          var ta = f.querySelector("[name=lostReason]");
          ta.value = b.getAttribute("data-reason");
          f.querySelectorAll("[data-reason]").forEach(function (x) { x.classList.toggle("is-active", x === b); });
          ta.closest(".nx-field").classList.remove("is-invalid");
        });
      },
      onSubmit: function (d) {
        var rec = Object.assign({}, lead, { stage: stageId, lostReason: d.lostReason });
        return NX.ui.run(NX.store.save("leads", rec), NX.t("lead.movedTo", { stage: NX.opt("stages", stageId) }));
      }
    });
  }

  function offerProject(lead) {
    if (!NX.actions.newProject || !lead) return;
    if (NX.store.where("projects", function (p) { return p.leadId === lead.id; }).length) return;
    setTimeout(function () {
      NX.ui.confirm(NX.t("lead.wonAsk", { name: lead.name }), { title: NX.t("lead.wonTitle"), okLabel: NX.t("lead.createProject") }).then(function (ok) {
        if (ok && NX.actions.newProject) NX.actions.newProject({ leadId: lead.id });
      });
    }, 60);
  }

  function completeFu(fu) {
    if (NX.actions.completeFollowup) return NX.actions.completeFollowup(fu);
    return NX.ui.run(NX.store.save("followups", Object.assign({}, fu, { status: "done", doneAt: new Date().toISOString() })));
  }

  /* ---------- Lead form (new / edit) ---------- */
  function leadForm(lead, prefill) {
    var isNew = !lead;
    var base = { stage: defaultStage(), city: "Jeddah", owner: me(), service: "", source: "" };
    var v = Object.assign({}, base, isNew ? (prefill || {}) : lead);
    var fuDays = Number(NX.store.settings.followupDefaultDays) || 3;
    var none = [{ value: "", label: NX.t("c.select") }];
    var sec = function (key) { return '<div class="nx-form-section">' + esc(NX.t(key)) + "</div>"; };
    var F = NX.ui.field;
    var body =
      '<div class="nx-form-grid ld-form">' +
      sec("lead.secContact") +
      F({ name: "name", label: NX.t("c.name"), required: true, value: v.name, attrs: ' autocomplete="off"' }) +
      F({ name: "company", label: NX.t("lead.company"), value: v.company, attrs: ' autocomplete="off"' }) +
      F({ name: "phone", label: NX.t("c.phone"), type: "tel", value: v.phone, placeholder: "05xxxxxxxx", attrs: ' inputmode="tel" autocomplete="off"' }) +
      F({ name: "email", label: NX.t("c.email"), type: "email", value: v.email, attrs: ' autocomplete="off"' }) +
      '<p class="ld-form-hint nx-full">' + esc(NX.t("lead.phoneHint")) + "</p>" +
      '<div class="ld-dup nx-note-box nx-full" hidden></div>' +
      sec("lead.secProject") +
      F({ name: "service", label: NX.t("c.service"), type: "select", options: none.concat(NX.opts("services")), value: v.service }) +
      F({ name: "sector", label: NX.t("lead.sector"), value: v.sector, attrs: ' list="ld-sectors" autocomplete="off"' }) +
      F({ name: "value", label: NX.t("lead.estValue"), type: "number", min: 0, step: "any", value: v.value, attrs: ' inputmode="decimal"' }) +
      F({ name: "area", label: NX.t("lead.area"), type: "number", min: 0, step: "any", value: v.area, attrs: ' inputmode="decimal"' }) +
      F({ name: "city", label: NX.t("c.city"), value: v.city }) +
      F({ name: "source", label: NX.t("c.source"), type: "select", options: none.concat(NX.opts("sources")), value: v.source }) +
      sec("lead.secPipeline") +
      F({ name: "stage", label: NX.t("c.stage"), type: "select", options: NX.opts("stages"), value: v.stage }) +
      F({ name: "owner", label: NX.t("c.owner"), type: "select", options: NX.userOpts(true), value: v.owner }) +
      F({ name: "lostReason", label: NX.t("lead.lostReason"), value: v.lostReason, full: true }) +
      F({ name: "notes", label: NX.t("c.notes"), type: "textarea", rows: 3, value: v.notes, full: true }) +
      (isNew ? F({ name: "addFu", label: NX.t("lead.addFu", { n: fuDays }), type: "checkbox", value: true, full: true }) : "") +
      "</div>" +
      '<datalist id="ld-sectors">' + SECTORS.map(function (s) {
        return '<option value="' + esc(s[0]) + '"' + (NX.i18n.isAr ? ' label="' + esc(s[1]) + '"' : "") + "></option>";
      }).join("") + "</datalist>";

    NX.ui.modal({
      title: NX.t(isNew ? "lead.new" : "lead.edit"), size: "md", body: body,
      submitLabel: isNew ? NX.t("c.add") : NX.t("c.save"),
      onOpen: function (f) {
        var stageSel = f.querySelector("[name=stage]"), lr = f.querySelector("[name=lostReason]").closest(".nx-field");
        var syncLost = function () { lr.classList.toggle("nx-hide", !isLost(stageSel.value)); };
        stageSel.addEventListener("change", syncLost); syncLost();
        var ph = f.querySelector("[name=phone]"), em = f.querySelector("[name=email]"), dupBox = f.querySelector(".ld-dup");
        var checkDup = function () {
          var d = dupOf(ph.value, lead && lead.id);
          dupBox.hidden = !d;
          if (d) dupBox.innerHTML = esc(NX.t("lead.dupPhone", { name: d.name + (d.company ? " (" + d.company + ")" : "") })) +
            ' <a class="nx-link" href="#/leads/' + esc(d.id) + '" data-close>' + esc(NX.t("lead.dupOpen")) + "</a>";
        };
        ph.addEventListener("input", checkDup); checkDup();
        var clearBad = function () { [ph, em].forEach(function (x) { x.closest(".nx-field").classList.remove("is-invalid"); }); };
        ph.addEventListener("input", clearBad); em.addEventListener("input", clearBad);
        // [data-close] links also need to navigate
        NX.ui.on(f, "click", "a[data-close]", function (e, a) { location.hash = a.getAttribute("href"); });
      },
      onSubmit: function (d, f) {
        if (!d.phone && !d.email) {
          ["phone", "email"].forEach(function (n) { f.querySelector("[name=" + n + "]").closest(".nx-field").classList.add("is-invalid"); });
          f.querySelector("[name=phone]").focus();
          NX.ui.toast(NX.t("lead.needContact"), "error");
          return false;
        }
        var addFu = !!d.addFu; delete d.addFu;
        var rec = Object.assign({}, lead || {}, d);
        if (!isLost(rec.stage)) rec.lostReason = "";
        var becameWon = isWon(rec.stage) && (isNew || !isWon(lead.stage));
        var dup = dupOf(rec.phone, rec.id);
        return NX.ui.run(NX.store.save("leads", rec), isNew ? NX.t("lead.created") : undefined).then(function (saved) {
          if (dup) setTimeout(function () { NX.ui.toast(NX.t("lead.dupPhone", { name: dup.name }), "error"); }, 400);
          var next = Promise.resolve(saved);
          if (isNew && addFu) {
            next = NX.store.save("followups", {
              leadId: saved.id, title: NX.t("lead.fuTitle", { name: saved.name }), type: "call",
              dueDate: NX.fmt.addDays(NX.fmt.today(), fuDays), dueTime: "", status: "open", owner: saved.owner || me(), notes: ""
            }).then(function () { return saved; }, function () { return saved; });
          }
          return next.then(function (s) {
            if (becameWon) offerProject(s);
            if (isNew && NX.app.current && NX.app.current.id === "leads" && !(NX.app.current.params || []).length) NX.go("leads/" + s.id);
            return s;
          });
        });
      }
    });
  }

  NX.actions.newLead = function (prefill) { return leadForm(null, prefill); };
  NX.actions.editLead = function (lead) {
    if (typeof lead === "string") lead = NX.store.get("leads", lead);
    if (!lead) return;
    return leadForm(lead);
  };

  /* ---------- List page ---------- */
  function renderList(el) {
    var all = NX.store.all("leads");
    var base = all.filter(matchesBase);
    var rows = base.filter(matchesStage).sort(byUpdated);
    var view = getView();
    var openAll = all.filter(function (l) { return isOpen(l.stage); });
    var openVal = openAll.reduce(function (s, l) { return s + (Number(l.value) || 0); }, 0);

    var chipItems = [
      { value: "all", label: NX.t("c.all"), count: base.length },
      { value: "open", label: NX.t("lead.open"), count: base.filter(function (l) { return isOpen(l.stage); }).length }
    ].concat(stages().map(function (s) {
      return { value: s.id, label: NX.i18n.pick(s), count: base.filter(function (l) { return l.stage === s.id; }).length };
    }));

    var ownerOpts = [{ value: "", label: NX.t("lead.allOwners") }, { value: "mine", label: NX.t("lead.mine") }]
      .concat(NX.userOpts(false).filter(function (u) { return u.value !== me(); }))
      .concat([{ value: "none", label: NX.t("lead.unassigned") }]);
    var sel = function (attr, opts, cur, label) {
      return '<select class="nx-select-sm ld-filter" data-' + attr + ' aria-label="' + esc(label) + '">' + opts.map(function (o) {
        return '<option value="' + esc(o.value) + '"' + (String(o.value) === String(cur) ? " selected" : "") + ">" + esc(o.label) + "</option>";
      }).join("") + "</select>";
    };

    var head = NX.ui.pageHead({
      title: NX.t("nav.leads"),
      sub: esc(NX.t("lead.sub", { n: all.length, v: NX.fmt.money(openVal) })),
      actions: NX.ui.btn({ label: NX.t("lead.exportCsv"), icon: "download", act: "csv", cls: "ghost", attrs: ' data-ld-csv' }) +
        NX.ui.btn({ label: NX.t("lead.new"), icon: "plus", act: "new-lead", cls: "primary" })
    });

    var toolbar =
      '<div class="nx-toolbar ld-toolbar">' + NX.ui.searchBox(state.q, NX.t("lead.searchPh")) +
      '<div class="ld-tools">' +
      sel("service", [{ value: "", label: NX.t("lead.allServices") }].concat(NX.opts("services")), state.service, NX.t("c.service")) +
      sel("owner", ownerOpts, state.owner, NX.t("c.owner")) +
      '<div class="nx-seg ld-seg" role="group">' +
      '<button type="button" data-view="board" class="' + (view === "board" ? "is-active" : "") + '" aria-pressed="' + (view === "board") + '">' + NX.icon("board", 15) + "<span>" + esc(NX.t("lead.board")) + "</span></button>" +
      '<button type="button" data-view="list" class="' + (view === "list" ? "is-active" : "") + '" aria-pressed="' + (view === "list") + '">' + NX.icon("list", 15) + "<span>" + esc(NX.t("lead.list")) + "</span></button>" +
      "</div></div></div>" +
      '<div class="ld-chips">' + NX.ui.chips(chipItems, state.stage, "stage") + "</div>";

    var content;
    if (!all.length) content = NX.ui.card("", NX.ui.empty(NX.t("lead.noLeads"), NX.ui.btn({ label: NX.t("lead.new"), icon: "plus", act: "new-lead", cls: "primary" })));
    else if (view === "board") content = board(base);
    else content = NX.ui.card("", NX.ui.table({
      rows: rows, empty: NX.t("lead.noMatch"),
      rowAttr: function (l) { return 'data-id="' + esc(l.id) + '"'; },
      cols: [
        { label: NX.t("c.name"), render: function (l) { return '<span class="nx-cell-title">' + bdi(l.name) + '</span><span class="nx-cell-sub">' + bdi(l.company || l.phone || l.email || "") + "</span>"; } },
        { label: NX.t("c.stage"), render: function (l) { return NX.ui.stageBadge(l.stage); } },
        { label: NX.t("c.service"), render: function (l) { return esc(NX.opt("services", l.service)) || '<span class="nx-muted">—</span>'; } },
        { label: NX.t("c.source"), render: function (l) { return esc(NX.opt("sources", l.source)) || '<span class="nx-muted">—</span>'; } },
        { label: NX.t("c.value"), cls: "nx-right", render: function (l) { return l.value ? '<span class="nx-num">' + esc(NX.fmt.money(l.value)) + "</span>" : '<span class="nx-muted">—</span>'; } },
        { label: NX.t("c.owner"), render: function (l) { return l.owner ? '<span class="ld-owner">' + NX.ui.avatar(NX.userName(l.owner)) + "<span>" + esc(NX.userName(l.owner)) + "</span></span>" : '<span class="nx-muted">' + esc(NX.t("lead.unassigned")) + "</span>"; } },
        { label: NX.t("c.updated"), cls: "nx-nowrap", render: function (l) { return '<span class="nx-muted" title="' + esc(NX.fmt.dateTime(l.updatedAt)) + '">' + esc(NX.fmt.rel(l.updatedAt || l.createdAt)) + "</span>"; } }
      ]
    }), { flush: true, cls: "ld-list-card" });

    el.innerHTML = head + toolbar + content;
    wireList(el, rows);

    var b = el.querySelector(".ld-board");
    if (b) {
      requestAnimationFrame(function () { b.scrollLeft = state.boardScroll; });
      b.addEventListener("scroll", function () { state.boardScroll = b.scrollLeft; }, { passive: true });
    }
  }

  function board(base) {
    var list = stages();
    if (state.stage === "open") list = list.filter(function (s) { return !s.closed; });
    else if (state.stage !== "all") list = list.filter(function (s) { return s.id === state.stage; });
    var known = {}; stages().forEach(function (s) { known[s.id] = true; });
    var firstId = (stages()[0] || {}).id;
    var groups = {};
    base.slice().sort(byUpdated).forEach(function (l) {
      var sid = known[l.stage] ? l.stage : firstId;
      (groups[sid] = groups[sid] || []).push(l);
    });
    var stageOpts = stages();
    var cols = list.map(function (s) {
      var items = groups[s.id] || [];
      var sum = items.reduce(function (t, l) { return t + (Number(l.value) || 0); }, 0);
      return '<section class="ld-col ld-col-' + esc(s.color || "gray") + '" data-col="' + esc(s.id) + '">' +
        '<header class="ld-col-head"><span class="nx-dot nx-dot-' + esc(s.color || "gray") + '"></span><h3>' + esc(NX.i18n.pick(s)) + '</h3><span class="ld-col-n nx-num">' + items.length + "</span>" +
        '<span class="ld-col-sum nx-num" title="' + esc(NX.fmt.money(sum)) + '">' + esc(NX.fmt.compact(sum)) + " " + esc(NX.t("c.sar")) + "</span></header>" +
        '<div class="ld-col-body">' + (items.length ? items.map(function (l) { return card(l, stageOpts); }).join("") : '<div class="ld-col-empty">' + esc(NX.t("lead.colEmpty")) + "</div>") + "</div>" +
        "</section>";
    }).join("");
    var total = list.reduce(function (n, s) { return n + (groups[s.id] || []).length; }, 0);
    return '<div class="ld-board' + (list.length === 1 ? " ld-board-one" : "") + '">' + cols + "</div>" +
      (!total && (state.q || state.service || state.owner) ? '<p class="ld-board-note nx-muted">' + esc(NX.t("lead.noMatch")) + "</p>" : "");
  }

  function card(l, stageOpts) {
    var d = ageDays(l);
    var stale = isOpen(l.stage) && d >= 7;
    var move = '<label class="ld-move" title="' + esc(NX.t("lead.moveTo")) + '">' + '<span class="nx-ic-flip">' + NX.icon("arrow", 14) + "</span>" +
      '<select data-move="' + esc(l.id) + '" aria-label="' + esc(NX.t("lead.moveTo")) + '">' + stageOpts.map(function (s) {
        return '<option value="' + esc(s.id) + '"' + (s.id === l.stage ? " selected" : "") + ">" + esc(NX.i18n.pick(s)) + "</option>";
      }).join("") + "</select></label>";
    return '<article class="ld-card" draggable="true" tabindex="0" role="link" data-card="' + esc(l.id) + '" aria-label="' + esc(NX.t("lead.openLead") + ": " + l.name) + '">' +
      '<div class="ld-card-top"><b class="ld-card-name">' + bdi(l.name) + "</b>" +
      '<span class="ld-age' + (stale ? " is-stale" : "") + '" title="' + esc(NX.t("lead.updatedOn", { d: NX.fmt.date(l.updatedAt || l.createdAt) })) + '">' + NX.icon("followups", 12) + esc(ageLabel(d)) + "</span></div>" +
      (l.company ? '<div class="ld-card-co">' + bdi(l.company) + "</div>" : "") +
      '<div class="ld-card-meta">' + (l.service ? '<span class="ld-svc">' + esc(NX.opt("services", l.service)) + "</span>" : "") +
      (l.value ? '<span class="ld-val nx-num">' + esc(NX.fmt.money(l.value)) + "</span>" : "") + "</div>" +
      (isLost(l.stage) && l.lostReason ? '<div class="ld-card-lost">' + bdi(l.lostReason) + "</div>" : "") +
      '<div class="ld-card-foot">' + ownerAvatar(l.owner) +
      '<span class="ld-card-acts">' +
      (l.phone ? '<a class="ld-ic ld-ic-wa" href="' + esc(NX.phone.wa(l.phone)) + '" target="_blank" rel="noopener" title="' + esc(NX.t("c.whatsapp")) + '" aria-label="' + esc(NX.t("c.whatsapp")) + '">' + NX.icon("whatsapp", 16) + "</a>" +
        '<a class="ld-ic" href="' + esc(NX.phone.tel(l.phone)) + '" title="' + esc(NX.t("c.call")) + '" aria-label="' + esc(NX.t("c.call")) + '">' + NX.icon("phone", 15) + "</a>" : "") +
      move + "</span></div>" +
      "</article>";
  }

  function wireList(el, rows) {
    NX.ui.on(el, "click", "[data-act=new-lead]", function () { NX.actions.newLead(); });
    NX.ui.on(el, "click", "[data-ld-csv]", function () { exportCsv(rows); });
    NX.ui.on(el, "input", "[data-search]", function (e, i) { state.q = i.value; NX.app.rerender(); });
    NX.ui.on(el, "change", "[data-service]", function (e, s) { state.service = s.value; NX.app.rerender(); });
    NX.ui.on(el, "change", "[data-owner]", function (e, s) { state.owner = s.value; NX.app.rerender(); });
    NX.ui.on(el, "click", "[data-stage]", function (e, b) { state.stage = b.getAttribute("data-stage"); NX.app.rerender(); });
    NX.ui.on(el, "click", "[data-view]", function (e, b) { setView(b.getAttribute("data-view")); NX.app.rerender(); });
    NX.ui.on(el, "click", "tr[data-id]", function (e, tr) { if (e.target.closest("a,button")) return; NX.go("leads/" + tr.getAttribute("data-id")); });

    // Board: open card
    NX.ui.on(el, "click", "[data-card]", function (e, c) {
      if (e.target.closest("a,select,label,button")) return;
      NX.go("leads/" + c.getAttribute("data-card"));
    });
    NX.ui.on(el, "keydown", "[data-card]", function (e, c) {
      if (e.key === "Enter" && e.target === c) NX.go("leads/" + c.getAttribute("data-card"));
    });
    // Board: move with select (works on phones)
    NX.ui.on(el, "click", "[data-move]", function (e) { e.stopPropagation(); });
    NX.ui.on(el, "change", "[data-move]", function (e, s) {
      var lead = NX.store.get("leads", s.getAttribute("data-move"));
      var to = s.value;
      if (lead) s.value = lead.stage; // keep showing the real stage until saved
      changeStage(lead, to);
    });
    // Board: HTML5 drag & drop (desktop)
    var dragId = null;
    NX.ui.on(el, "dragstart", "[data-card]", function (e, c) {
      if (e.target.closest && e.target !== c && e.target.closest("a,select")) { e.preventDefault(); return; }
      dragId = c.getAttribute("data-card");
      try { e.dataTransfer.setData("text/plain", dragId); e.dataTransfer.effectAllowed = "move"; } catch (x) {}
      setTimeout(function () { c.classList.add("is-dragging"); el.querySelector(".ld-board") && el.querySelector(".ld-board").classList.add("is-drag"); }, 0);
    });
    NX.ui.on(el, "dragend", "[data-card]", function (e, c) {
      c.classList.remove("is-dragging");
      el.querySelectorAll(".ld-col.is-over").forEach(function (x) { x.classList.remove("is-over"); });
      var b = el.querySelector(".ld-board"); if (b) b.classList.remove("is-drag");
      dragId = null;
    });
    // Auto-scroll the board when dragging near its left/right edge (columns off-screen on smaller desktops).
    NX.ui.on(el, "dragover", ".ld-board", function (e, b) {
      if (!dragId) return;
      var r = b.getBoundingClientRect(), edge = 70, step = 0;
      if (e.clientX < r.left + edge) step = -Math.ceil((r.left + edge - e.clientX) / 4);
      else if (e.clientX > r.right - edge) step = Math.ceil((e.clientX - (r.right - edge)) / 4);
      if (step) b.scrollLeft += step;
    });
    NX.ui.on(el, "dragover", "[data-col]", function (e, col) {
      if (!dragId) return;
      e.preventDefault();
      try { e.dataTransfer.dropEffect = "move"; } catch (x) {}
      if (!col.classList.contains("is-over")) {
        el.querySelectorAll(".ld-col.is-over").forEach(function (x) { x.classList.remove("is-over"); });
        col.classList.add("is-over");
      }
    });
    NX.ui.on(el, "dragleave", "[data-col]", function (e, col) {
      if (!col.contains(e.relatedTarget)) col.classList.remove("is-over");
    });
    NX.ui.on(el, "drop", "[data-col]", function (e, col) {
      e.preventDefault();
      var id = dragId;
      try { id = id || e.dataTransfer.getData("text/plain"); } catch (x) {}
      col.classList.remove("is-over");
      var lead = id && NX.store.get("leads", id);
      if (lead) changeStage(lead, col.getAttribute("data-col"));
    });
  }

  function exportCsv(rows) {
    var cols = [
      { label: NX.t("c.name"), key: "name" },
      { label: NX.t("lead.company"), key: "company" },
      { label: NX.t("c.phone"), key: "phone" },
      { label: NX.t("c.email"), key: "email" },
      { label: NX.t("c.stage"), value: function (l) { return NX.opt("stages", l.stage); } },
      { label: NX.t("c.service"), value: function (l) { return NX.opt("services", l.service); } },
      { label: NX.t("lead.sector"), key: "sector" },
      { label: NX.t("c.source"), value: function (l) { return NX.opt("sources", l.source); } },
      { label: NX.t("lead.estValue"), key: "value" },
      { label: NX.t("c.city"), key: "city" },
      { label: NX.t("lead.area"), key: "area" },
      { label: NX.t("c.owner"), value: function (l) { return NX.userName(l.owner); } },
      { label: NX.t("lead.lostReason"), key: "lostReason" },
      { label: NX.t("c.notes"), key: "notes" },
      { label: NX.t("lead.csv.created"), value: function (l) { return l.createdAt ? NX.fmt.iso(l.createdAt) : ""; } },
      { label: NX.t("lead.csv.updated"), value: function (l) { return l.updatedAt ? NX.fmt.iso(l.updatedAt) : ""; } }
    ];
    NX.ui.download("nexa-leads-" + NX.fmt.today() + ".csv", NX.ui.csv(rows, cols), "text/csv;charset=utf-8");
  }

  /* ---------- Lead page ---------- */
  var CH_ICON = { whatsapp: "whatsapp", call: "phone", email: "mail", meeting: "calendar", sitevisit: "pin", website: "globe", other: "conversations" };
  var PS_TONE = { draft: "gray", sent: "blue", accepted: "green", rejected: "red" };
  function chLabel(c) { return NX.t("lead.ch." + (CH_ICON[c] ? c : "other")); }
  function psBadge(s) { return NX.ui.badge(NX.t("lead.ps." + (PS_TONE[s] ? s : "draft")), PS_TONE[s] || "gray"); }
  function fuWhen(f) { return NX.fmt.date(f.dueDate) + (f.dueTime ? " · " + f.dueTime : ""); }

  function renderDetail(el, id) {
    var l = NX.store.get("leads", id);
    if (!l) {
      el.innerHTML = '<a class="nx-back" href="#/leads">' + NX.icon("back", 16) + esc(NX.t("lead.backToLeads")) + "</a>" +
        NX.ui.card("", NX.ui.empty(NX.t("lead.notFound"), '<a class="nx-btn nx-btn-ghost" href="#/leads">' + esc(NX.t("lead.backToLeads")) + "</a>"));
      return;
    }
    var today = NX.fmt.today();
    var convs = NX.store.where("conversations", function (c) { return c.leadId === id; });
    var fus = NX.store.where("followups", function (f) { return f.leadId === id; });
    var openFus = fus.filter(function (f) { return f.status !== "done"; }).sort(function (a, b) { return String(a.dueDate || "9").localeCompare(String(b.dueDate || "9")); });
    var props = NX.store.where("proposals", function (p) { return p.leadId === id; });
    var projs = NX.store.where("projects", function (p) { return p.leadId === id; });

    /* Header */
    var head = '<a class="nx-back" href="#/leads">' + NX.icon("back", 16) + esc(NX.t("nav.leads")) + "</a>" +
      '<div class="nx-page-head ld-head"><div class="ld-head-main"><div class="ld-head-title"><h1>' + bdi(l.name) + "</h1>" + NX.ui.stageBadge(l.stage) + "</div>" +
      '<p class="nx-sub">' + [l.company, l.city].filter(Boolean).map(bdi).join(" · ") + (l.company || l.city ? " · " : "") +
      '<span title="' + esc(NX.fmt.dateTime(l.updatedAt)) + '">' + esc(NX.t("c.updated")) + " " + esc(NX.fmt.rel(l.updatedAt || l.createdAt)) + "</span></p></div>" +
      '<div class="nx-page-actions ld-head-acts">' +
      NX.ui.btn({ label: NX.t("c.edit"), icon: "edit", act: "edit", cls: "ghost sm" }) +
      (NX.store.isAdmin() ? NX.ui.btn({ icon: "trash", act: "delete", cls: "icon sm", title: NX.t("c.delete"), attrs: ' data-danger' }) : "") +
      "</div></div>";

    /* Big action buttons */
    var dis = function (icon, label, title) { return '<button type="button" class="nx-btn nx-btn-ghost ld-act" disabled title="' + esc(title) + '">' + NX.icon(icon, 18) + "<span>" + esc(label) + "</span></button>"; };
    var actBtn = function (act, icon, label) { return '<button type="button" class="nx-btn nx-btn-ghost ld-act" data-act="' + act + '">' + NX.icon(icon, 18) + "<span>" + esc(label) + "</span></button>"; };
    var acts = '<div class="ld-actions">' +
      (l.phone ? '<a class="nx-btn nx-btn-wa ld-act" href="' + esc(NX.phone.wa(l.phone)) + '" target="_blank" rel="noopener" data-act="wa">' + NX.icon("whatsapp", 18) + "<span>" + esc(NX.t("c.whatsapp")) + "</span></a>" : dis("whatsapp", NX.t("c.whatsapp"), NX.t("lead.noPhone"))) +
      (l.phone ? '<a class="nx-btn nx-btn-primary ld-act" href="' + esc(NX.phone.tel(l.phone)) + '">' + NX.icon("phone", 18) + "<span>" + esc(NX.t("c.call")) + "</span></a>" : dis("phone", NX.t("c.call"), NX.t("lead.noPhone"))) +
      (l.email ? '<a class="nx-btn nx-btn-ghost ld-act" href="' + esc(NX.phone.mailto(l.email)) + '" data-act="email">' + NX.icon("mail", 18) + "<span>" + esc(NX.t("c.sendEmail")) + "</span></a>" : dis("mail", NX.t("c.sendEmail"), NX.t("lead.noEmail"))) +
      actBtn("proposal", "proposals", NX.t("lead.newProposal")) +
      actBtn("followup", "followups", NX.t("lead.addFollowup")) +
      actBtn("log", "conversations", NX.t("lead.logConv")) +
      "</div>";

    /* Stage stepper */
    var list = stages(), curIdx = list.findIndex(function (s) { return s.id === l.stage; });
    var curClosed = curIdx > -1 && list[curIdx].closed;
    var stepper = '<nav class="ld-stepper" aria-label="' + esc(NX.t("c.stage")) + '"><ol>' + list.map(function (s, i) {
      var cls = s.id === l.stage ? " is-current" : (!s.closed && (i < curIdx) && (!curClosed || isWon(l.stage)) ? " is-done" : "");
      if (s.id === l.stage && isLost(s.id)) cls += " is-lost";
      if (s.id === l.stage && isWon(s.id)) cls += " is-won";
      return '<li><button type="button" class="ld-step' + cls + '" data-step="' + esc(s.id) + '"' + (s.id === l.stage ? ' aria-current="step"' : "") + ">" +
        '<span class="ld-step-n">' + (cls.indexOf("is-done") > -1 || (s.id === l.stage && isWon(s.id)) ? NX.icon("check", 13) : (s.id === l.stage && isLost(s.id) ? NX.icon("close", 13) : (i + 1))) + "</span>" +
        '<span class="ld-step-l">' + esc(NX.i18n.pick(s)) + "</span></button></li>";
    }).join("") + "</ol></nav>";

    /* Details */
    var dash = '<span class="nx-muted">—</span>';
    var details = NX.ui.dl([
      [NX.t("c.phone"), l.phone ? '<a href="' + esc(NX.phone.tel(l.phone)) + '" dir="ltr" class="ld-ltr">' + esc(l.phone) + "</a>" : dash],
      [NX.t("c.email"), l.email ? '<a href="mailto:' + esc(l.email) + '" dir="ltr" class="ld-ltr">' + esc(l.email) + "</a>" : dash],
      [NX.t("c.service"), esc(NX.opt("services", l.service)) || dash],
      [NX.t("lead.sector"), esc(sectorLabel(l.sector)) || dash],
      [NX.t("c.source"), esc(NX.opt("sources", l.source)) || dash],
      [NX.t("c.city"), esc(l.city) || dash],
      [NX.t("lead.areaShort"), l.area ? '<span class="nx-num">' + esc(NX.t("lead.areaV", { n: NX.fmt.num(l.area) })) + "</span>" : dash],
      [NX.t("lead.estValueShort"), l.value ? '<span class="nx-num ld-strong">' + esc(NX.fmt.money(l.value)) + "</span>" : dash],
      [NX.t("c.owner"), l.owner ? '<span class="ld-owner">' + NX.ui.avatar(NX.userName(l.owner)) + "<span>" + esc(NX.userName(l.owner)) + "</span></span>" : '<span class="nx-muted">' + esc(NX.t("lead.unassigned")) + "</span>"],
      [NX.t("c.created"), esc(NX.fmt.date(l.createdAt)) || dash],
      isLost(l.stage) || l.lostReason ? [NX.t("lead.lostReason"), l.lostReason ? '<span class="ld-lost-reason">' + bdi(l.lostReason) + "</span>" : dash] : null
    ]) + (l.notes ? '<div class="ld-notes"><h4>' + esc(NX.t("c.notes")) + '</h4><p class="nx-pre">' + bdi(l.notes) + "</p></div>" : "");

    /* Timeline */
    var items = [];
    convs.forEach(function (c) {
      items.push({ t: ts(c.date || c.createdAt), icon: CH_ICON[c.channel] || "conversations", tone: c.channel === "whatsapp" ? "green" : "gray",
        title: chLabel(c.channel), extra: c.direction ? '<span class="ld-dir">' + NX.icon(c.direction === "in" ? "in" : "out", 12) + esc(NX.t("lead.inOut." + (c.direction === "in" ? "in" : "out"))) + "</span>" : "",
        when: NX.fmt.dateTime(c.date || c.createdAt), text: c.summary, by: c.by ? NX.userName(c.by) : "" });
    });
    fus.forEach(function (f) {
      var done = f.status === "done";
      var overdue = !done && f.dueDate && f.dueDate < today;
      items.push({ t: done ? ts(f.doneAt || f.dueDate) : ts((f.dueDate || today) + "T" + (f.dueTime || "09:00")), icon: done ? "check" : "followups", tone: done ? "green" : (overdue ? "red" : "gold"),
        title: NX.t("lead.followup") + " · " + chLabel(f.type === "call" || CH_ICON[f.type] ? f.type : "other"),
        extra: done ? '<span class="ld-tl-tag nx-tone-green">' + esc(NX.t("lead.doneOn", { d: NX.fmt.dateShort(f.doneAt || f.dueDate) })) + "</span>" : (overdue ? '<span class="ld-tl-tag nx-tone-red">' + esc(NX.t("c.overdue")) + "</span>" : ""),
        when: done ? NX.fmt.date(f.doneAt || f.dueDate) : NX.t("lead.due", { d: fuWhen(f) }), text: f.title + (f.notes ? " — " + f.notes : ""), by: f.owner ? NX.userName(f.owner) : "",
        fu: done ? null : f, dim: done });
    });
    props.forEach(function (p) {
      items.push({ t: ts(p.sentAt || p.date || p.createdAt), icon: "proposals", tone: "gold", title: NX.t("lead.proposal") + " " + (p.number || ""), titleHtml: esc(NX.t("lead.proposal")) + " " + bdi(p.number || ""), extra: psBadge(p.status),
        when: NX.fmt.date(p.sentAt || p.date || p.createdAt), text: "x", html: (p.title ? bdi(p.title) + " · " : "") + '<span class="nx-num">' + esc(NX.fmt.money(NX.calc.proposal(p).total)) + "</span>", href: "#/proposals/" + p.id });
    });
    items.sort(function (a, b) { return b.t - a.t; });
    items.push({ t: ts(l.createdAt), icon: "plus", tone: "gray", title: NX.t("lead.created"), when: NX.fmt.dateTime(l.createdAt), text: l.source ? NX.t("c.source") + ": " + NX.opt("sources", l.source) : "", by: l.createdBy ? NX.userName(l.createdBy) : "", dim: true });
    var tl = '<ol class="ld-tl">' + items.map(function (it) {
      return '<li class="ld-tl-item' + (it.dim ? " is-dim" : "") + '"><span class="ld-tl-ic nx-tone-' + it.tone + '">' + NX.icon(it.icon, 15) + "</span>" +
        '<div class="ld-tl-main"><div class="ld-tl-head"><b>' + (it.href ? '<a href="' + esc(it.href) + '">' + (it.titleHtml || esc(it.title)) + "</a>" : esc(it.title)) + "</b>" + (it.extra || "") +
        '<time class="ld-tl-when">' + esc(it.when) + "</time></div>" +
        (it.text ? '<p class="ld-tl-text">' + (it.html || bdi(it.text)) + "</p>" : "") +
        (it.by ? '<small class="nx-muted">' + esc(it.by) + "</small>" : "") + "</div>" +
        (it.fu ? '<button type="button" class="ld-done-btn" data-done="' + esc(it.fu.id) + '" title="' + esc(NX.t("lead.markDone")) + '" aria-label="' + esc(NX.t("lead.markDone")) + '">' + NX.icon("check", 16) + "</button>" : "") +
        "</li>";
    }).join("") + "</ol>";
    if (items.length === 1) tl = '<p class="ld-tl-empty nx-muted">' + esc(NX.t("lead.timelineEmpty")) + "</p>" + tl;

    /* Side cards */
    var smallAdd = function (act, label) { return '<button type="button" class="nx-btn nx-btn-text nx-btn-sm" data-act="' + act + '">' + NX.icon("plus", 14) + "<span>" + esc(label) + "</span></button>"; };
    var fuCard = NX.ui.card(NX.t("lead.openFus"), openFus.length ? '<ul class="nx-list">' + openFus.map(function (f) {
      var overdue = f.dueDate && f.dueDate < today, isToday = f.dueDate === today;
      return '<li><button type="button" class="ld-done-btn" data-done="' + esc(f.id) + '" title="' + esc(NX.t("lead.markDone")) + '" aria-label="' + esc(NX.t("lead.markDone")) + '">' + NX.icon("check", 16) + "</button>" +
        '<div class="nx-list-main"><b>' + bdi(f.title) + '</b><small class="' + (overdue ? "ld-red" : isToday ? "ld-gold" : "") + '">' + NX.icon(CH_ICON[f.type] || "followups", 12) + " " +
        esc(overdue ? NX.t("c.overdue") + " · " + fuWhen(f) : isToday ? NX.t("c.today") + (f.dueTime ? " · " + f.dueTime : "") : fuWhen(f)) + "</small></div></li>";
    }).join("") + "</ul>" : '<p class="ld-side-empty">' + esc(NX.t("lead.noFus")) + "</p>", { flush: true, actions: smallAdd("followup", NX.t("c.add")), cls: "ld-side-card" });

    var propCard = NX.ui.card(NX.t("lead.proposals"), props.length ? '<ul class="nx-list">' + props.map(function (p) {
      return '<li><a class="ld-li-link" href="#/proposals/' + esc(p.id) + '"><div class="nx-list-main"><b><bdi class="nx-num">' + esc(p.number || "") + "</bdi> " + bdi(p.title || "") + "</b>" +
        '<small class="nx-num">' + esc(NX.fmt.money(NX.calc.proposal(p).total)) + " · " + esc(NX.fmt.date(p.date || p.createdAt)) + "</small></div>" + psBadge(p.status) + "</a></li>";
    }).join("") + "</ul>" : '<p class="ld-side-empty">' + esc(NX.t("lead.noProps")) + "</p>", { flush: true, actions: smallAdd("proposal", NX.t("c.new")), cls: "ld-side-card" });

    var projCard = NX.ui.card(NX.t("lead.projects"), projs.length ? '<ul class="nx-list">' + projs.map(function (p) {
      return '<li><a class="ld-li-link" href="#/projects/' + esc(p.id) + '"><div class="nx-list-main"><b>' + bdi(p.name || "") + '</b><small><bdi class="nx-num">' + esc(p.code || "") + "</bdi>" +
        (p.dueDate ? " · " + esc(NX.fmt.date(p.dueDate)) : "") + "</small></div>" + NX.ui.statusBadge("projectStatuses", p.status) + "</a></li>";
    }).join("") + "</ul>" : '<div class="ld-side-empty">' + esc(NX.t("lead.noProjects")) +
      (isWon(l.stage) && NX.actions.newProject ? "<div>" + NX.ui.btn({ label: NX.t("lead.createProject"), icon: "projects", act: "project", cls: "gold sm" }) + "</div>" : "") + "</div>",
      { flush: true, cls: "ld-side-card" });

    el.innerHTML = head + acts + stepper +
      '<div class="nx-split ld-detail">' +
      '<div class="nx-stack">' + NX.ui.card(NX.t("lead.details"), details) +
      NX.ui.card(NX.t("lead.timeline"), tl, { actions: smallAdd("log", NX.t("lead.logConv")), cls: "ld-tl-card" }) + "</div>" +
      '<div class="nx-stack">' + fuCard + propCard + projCard + "</div>" +
      "</div>";

    /* Events */
    NX.ui.on(el, "click", "[data-act=edit]", function () { NX.actions.editLead(l); });
    NX.ui.on(el, "click", "[data-act=delete]", function () { NX.ui.del("leads", l.id, function () { NX.go("leads"); }); });
    NX.ui.on(el, "click", "[data-act=wa]", function (e) {
      if (NX.actions.sendMessage) { e.preventDefault(); NX.actions.sendMessage({ lead: l, channel: "whatsapp" }); }
    });
    NX.ui.on(el, "click", "[data-act=email]", function (e) {
      if (NX.actions.sendMessage) { e.preventDefault(); NX.actions.sendMessage({ lead: l, channel: "email" }); }
    });
    NX.ui.on(el, "click", "[data-act=proposal]", function () { call("newProposal", { leadId: l.id }); });
    NX.ui.on(el, "click", "[data-act=followup]", function () { call("newFollowup", { leadId: l.id }); });
    NX.ui.on(el, "click", "[data-act=log]", function () { call("logConversation", { leadId: l.id }); });
    NX.ui.on(el, "click", "[data-act=project]", function () { call("newProject", { leadId: l.id }); });
    NX.ui.on(el, "click", "[data-step]", function (e, b) { changeStage(l, b.getAttribute("data-step")); });
    NX.ui.on(el, "click", "[data-done]", function (e, b) {
      var f = NX.store.get("followups", b.getAttribute("data-done"));
      if (f) { b.disabled = true; completeFu(f); }
    });

    // Keep the current step visible on phones
    requestAnimationFrame(function () {
      var cur = el.querySelector(".ld-step.is-current"), wrap = el.querySelector(".ld-stepper");
      if (cur && wrap && wrap.scrollWidth > wrap.clientWidth) {
        var r = cur.getBoundingClientRect(), w = wrap.getBoundingClientRect();
        wrap.scrollLeft += (r.left + r.width / 2) - (w.left + w.width / 2);
      }
    });
  }

  /* ---------- Register ---------- */
  NX.view("leads", {
    order: 20,
    icon: "leads",
    render: function (el, params) {
      if (params && params[0]) renderDetail(el, params[0]);
      else renderList(el);
    }
  });
})();
