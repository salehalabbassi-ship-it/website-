/* NEXA Admin — Conversations
 * Two-pane inbox-style log of all communication with leads/clients (list + chat-like thread).
 * Routes: #/conversations, #/conversations/<leadId>, #/conversations/project/<projectId>
 * Owns: NX.actions.logConversation(prefill), NX.actions.sendMessage({ lead, project, proposal, channel }) */
(function () {
  var CH = [
    { id: "whatsapp", icon: "whatsapp", tone: "green" },
    { id: "call", icon: "phone", tone: "blue" },
    { id: "email", icon: "mail", tone: "purple" },
    { id: "meeting", icon: "leads", tone: "gold" },
    { id: "sitevisit", icon: "pin", tone: "amber" },
    { id: "website", icon: "globe", tone: "gray" },
    { id: "other", icon: "dots", tone: "gray" }
  ];
  var state = { q: "", ch: "", listScroll: 0, drafts: {}, compChannel: "whatsapp", compDir: "out" };

  NX.i18n.add({
    en: {
      "conv.log": "Log conversation",
      "conv.edit": "Edit conversation",
      "conv.sub": "{n} contacts · {m} conversations",
      "conv.search": "Search name, phone or message…",
      "conv.allCh": "All",
      "conv.ch.whatsapp": "WhatsApp",
      "conv.ch.call": "Call",
      "conv.ch.email": "Email",
      "conv.ch.meeting": "Meeting",
      "conv.ch.sitevisit": "Site visit",
      "conv.ch.website": "Website",
      "conv.ch.other": "Other",
      "conv.in": "Incoming",
      "conv.out": "Outgoing",
      "conv.inShort": "In",
      "conv.outShort": "Out",
      "conv.contact": "Lead",
      "conv.project": "Project (optional)",
      "conv.channel": "Channel",
      "conv.direction": "Direction",
      "conv.when": "Date & time",
      "conv.summary": "Summary",
      "conv.summaryPh": "What was discussed? Any agreements or next steps?",
      "conv.by": "by {n}",
      "conv.you": "You",
      "conv.noConv": "No conversations yet.",
      "conv.noMatch": "No conversations match.",
      "conv.pick": "Select a contact to see the conversation.",
      "conv.emptyThread": "No conversations with {name} yet. Log the first one below.",
      "conv.composerPh": "Log a quick note…",
      "conv.saveNote": "Save note",
      "conv.logged": "Conversation logged",
      "conv.needContact": "Choose a lead or a project.",
      "conv.onlyCh": "Showing {ch} only",
      "conv.showAll": "Show all",
      "conv.yesterday": "Yesterday",
      "conv.today": "Today",
      "conv.notFound": "This contact no longer exists.",
      "conv.openLead": "Open lead",
      "conv.openProject": "Open project",
      "conv.followup": "Follow-up",
      "conv.noLeadsYet": "No leads yet",
      "conv.sendWa": "WhatsApp message",
      "conv.sendEmail": "Send email",
      "conv.tpl": "Template",
      "conv.blank": "Blank",
      "conv.to": "To",
      "conv.subject": "Subject",
      "conv.message": "Message",
      "conv.copy": "Copy text",
      "conv.openWa": "Open WhatsApp",
      "conv.send": "Send",
      "conv.noPhone": "This contact has no phone number. Add one on the lead page, or copy the text and send it another way.",
      "conv.noEmail": "No email address on file — type one below.",
      "conv.noTemplates": "No message templates for this channel yet. Add them under Templates.",
      "conv.waLogged": "WhatsApp opened · message logged",
      "conv.autoLog": "The message will be saved in the conversation history.",
      "conv.subjectLine": "Subject: {s}",
      "conv.msgCount": "{n} messages",
      "conv.newMsg": "New message"
    },
    ar: {
      "conv.log": "تسجيل محادثة",
      "conv.edit": "تعديل المحادثة",
      "conv.sub": "{n} جهة اتصال · {m} محادثة",
      "conv.search": "ابحث بالاسم أو الجوال أو نص الرسالة…",
      "conv.allCh": "الكل",
      "conv.ch.whatsapp": "واتساب",
      "conv.ch.call": "مكالمة",
      "conv.ch.email": "بريد إلكتروني",
      "conv.ch.meeting": "اجتماع",
      "conv.ch.sitevisit": "زيارة موقع",
      "conv.ch.website": "الموقع الإلكتروني",
      "conv.ch.other": "أخرى",
      "conv.in": "واردة",
      "conv.out": "صادرة",
      "conv.inShort": "وارد",
      "conv.outShort": "صادر",
      "conv.contact": "العميل",
      "conv.project": "المشروع (اختياري)",
      "conv.channel": "القناة",
      "conv.direction": "الاتجاه",
      "conv.when": "التاريخ والوقت",
      "conv.summary": "الملخص",
      "conv.summaryPh": "ما الذي تمت مناقشته؟ هل هناك اتفاقات أو خطوات تالية؟",
      "conv.by": "بواسطة {n}",
      "conv.you": "أنت",
      "conv.noConv": "لا توجد محادثات بعد.",
      "conv.noMatch": "لا توجد محادثات مطابقة.",
      "conv.pick": "اختر جهة اتصال لعرض المحادثة.",
      "conv.emptyThread": "لا توجد محادثات مع {name} بعد. سجّل أول محادثة بالأسفل.",
      "conv.composerPh": "سجّل ملاحظة سريعة…",
      "conv.saveNote": "حفظ الملاحظة",
      "conv.logged": "تم تسجيل المحادثة",
      "conv.needContact": "اختر عميلاً أو مشروعاً.",
      "conv.onlyCh": "عرض {ch} فقط",
      "conv.showAll": "عرض الكل",
      "conv.yesterday": "أمس",
      "conv.today": "اليوم",
      "conv.notFound": "جهة الاتصال هذه لم تعد موجودة.",
      "conv.openLead": "فتح صفحة العميل",
      "conv.openProject": "فتح المشروع",
      "conv.followup": "متابعة",
      "conv.noLeadsYet": "لا يوجد عملاء بعد",
      "conv.sendWa": "رسالة واتساب",
      "conv.sendEmail": "إرسال بريد إلكتروني",
      "conv.tpl": "القالب",
      "conv.blank": "رسالة فارغة",
      "conv.to": "إلى",
      "conv.subject": "الموضوع",
      "conv.message": "الرسالة",
      "conv.copy": "نسخ النص",
      "conv.openWa": "فتح واتساب",
      "conv.send": "إرسال",
      "conv.noPhone": "لا يوجد رقم جوال لجهة الاتصال. أضفه من صفحة العميل، أو انسخ النص وأرسله بطريقة أخرى.",
      "conv.noEmail": "لا يوجد بريد إلكتروني مسجّل — أدخله أدناه.",
      "conv.noTemplates": "لا توجد قوالب رسائل لهذه القناة بعد. يمكنك إضافتها من صفحة القوالب.",
      "conv.waLogged": "تم فتح واتساب وتسجيل الرسالة",
      "conv.autoLog": "سيتم حفظ الرسالة في سجل المحادثات.",
      "conv.subjectLine": "الموضوع: {s}",
      "conv.msgCount": "{n} رسائل",
      "conv.newMsg": "رسالة جديدة"
    }
  });

  /* ---------- helpers ---------- */
  var esc = NX.esc;
  function me() { return (NX.store.session || {}).email || ""; }
  function loc() { return NX.i18n.isAr ? "ar-SA-u-nu-latn-ca-gregory" : "en-GB"; }
  function chDef(id) { return CH.find(function (c) { return c.id === id; }) || CH[CH.length - 1]; }
  function chLabel(id) { return NX.t("conv.ch." + chDef(id).id); }
  function chIcon(id, size) { var c = chDef(id); return '<span class="cv-ch cv-ch-' + c.tone + '" title="' + esc(chLabel(c.id)) + '">' + NX.icon(c.icon, size || 14) + "</span>"; }
  function byName(a, b) { return String(a.name || "").localeCompare(String(b.name || ""), NX.i18n.lang); }
  function dateOf(c) { return c.date || c.createdAt || ""; }
  function ts(c) { var d = NX.fmt.toDate(dateOf(c)); return d ? d.getTime() : 0; }
  function dayDiff(d) {
    var a = NX.fmt.toDate(NX.fmt.iso(d)), b = NX.fmt.toDate(NX.fmt.today());
    return a && b ? Math.round((a - b) / 864e5) : 0;
  }
  function timeOf(d) { var x = NX.fmt.toDate(d); return x ? x.toLocaleTimeString(loc(), { hour: "2-digit", minute: "2-digit" }) : ""; }
  function listTime(d) {
    var x = NX.fmt.toDate(d); if (!x) return "";
    var n = dayDiff(d);
    if (n === 0) return timeOf(d);
    if (n === -1) return NX.t("conv.yesterday");
    if (n > -7 && n < 0) return x.toLocaleDateString(loc(), { weekday: "short" });
    return x.getFullYear() === new Date().getFullYear() ? NX.fmt.dateShort(d) : NX.fmt.date(d);
  }
  function dayLabel(d) {
    var n = dayDiff(d), x = NX.fmt.toDate(d);
    if (n === 0) return NX.t("conv.today");
    if (n === -1) return NX.t("conv.yesterday");
    return x ? x.toLocaleDateString(loc(), { weekday: "long", day: "numeric", month: "long", year: x.getFullYear() === new Date().getFullYear() ? undefined : "numeric" }) : "";
  }
  /* local "YYYY-MM-DDTHH:MM" for datetime-local inputs */
  function localDT(d) {
    var x = NX.fmt.toDate(d) || new Date(), p = function (n) { return String(n).padStart(2, "0"); };
    return x.getFullYear() + "-" + p(x.getMonth() + 1) + "-" + p(x.getDate()) + "T" + p(x.getHours()) + ":" + p(x.getMinutes());
  }
  function snippet(s, n) { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1).trim() + "…" : s; }
  function getLead(x) { return !x ? null : (typeof x === "string" ? NX.store.get("leads", x) : x); }
  function getProject(x) { return !x ? null : (typeof x === "string" ? NX.store.get("projects", x) : x); }

  /* ---------- contacts ---------- */
  function keyOf(c) {
    if (c.leadId && NX.store.get("leads", c.leadId)) return "l:" + c.leadId;
    if (c.projectId && NX.store.get("projects", c.projectId)) return "p:" + c.projectId;
    return null;
  }
  function resolve(key) {
    if (!key) return null;
    var kind = key.charAt(0), id = key.slice(2);
    if (kind === "l") {
      var l = NX.store.get("leads", id);
      if (!l) return null;
      return { key: key, kind: "lead", id: id, lead: l, project: null, name: l.name || "—", sub: l.company || "", phone: l.phone || "", email: l.email || "", href: "#/leads/" + id, route: "#/conversations/" + encodeURIComponent(id) };
    }
    var p = NX.store.get("projects", id);
    if (!p) return null;
    var pl = p.leadId ? NX.store.get("leads", p.leadId) : null;
    return { key: key, kind: "project", id: id, lead: pl, project: p, name: p.name || p.code || "—", sub: [p.code, p.client].filter(Boolean).join(" · "), phone: p.phone || (pl && pl.phone) || "", email: (pl && pl.email) || "", href: "#/projects/" + id, route: "#/conversations/project/" + encodeURIComponent(id) };
  }
  function keyFromParams(params) {
    if (!params || !params.length) return null;
    if (params[0] === "project") return params[1] ? "p:" + params[1] : null;
    return "l:" + params[0];
  }

  function buildContacts() {
    var map = {};
    NX.store.all("conversations").forEach(function (c) {
      var k = keyOf(c); if (!k) return;
      (map[k] = map[k] || []).push(c);
    });
    var out = [];
    Object.keys(map).forEach(function (k) {
      var ct = resolve(k); if (!ct) return;
      ct.convs = map[k].sort(function (a, b) { return ts(a) - ts(b); });
      out.push(ct);
    });
    return out;
  }

  function matches(ct, q) {
    if (!q) return true;
    var hay = [ct.name, ct.sub, ct.phone, NX.phone.intl(ct.phone), ct.email].join(" ").toLowerCase();
    if (hay.indexOf(q) > -1) return true;
    return (ct.convs || []).some(function (c) { return String(c.summary || "").toLowerCase().indexOf(q) > -1; });
  }

  function visibleContacts(all) {
    var q = state.q.trim().toLowerCase();
    var list = all.filter(function (ct) {
      if (state.ch && !ct.convs.some(function (c) { return c.channel === state.ch; })) return false;
      return matches(ct, q);
    }).map(function (ct) {
      var convs = state.ch ? ct.convs.filter(function (c) { return c.channel === state.ch; }) : ct.convs;
      ct.last = convs[convs.length - 1];
      return ct;
    }).sort(function (a, b) { return ts(b.last) - ts(a.last); });
    // While searching, also offer leads that have no conversations yet.
    if (q && !state.ch) {
      var have = {};
      all.forEach(function (ct) { have[ct.key] = 1; });
      NX.store.all("leads").filter(function (l) { return !have["l:" + l.id]; }).sort(byName).forEach(function (l) {
        var ct = resolve("l:" + l.id); ct.convs = []; ct.last = null;
        if (matches(ct, q)) list.push(ct);
      });
    }
    return list;
  }

  /* ---------- rendering ---------- */
  function contactAvatar(ct) {
    if (ct.kind === "project") return '<span class="nx-avatar cv-av-proj">' + NX.icon("projects", 16) + "</span>";
    return NX.ui.avatar(ct.name);
  }

  function contactItem(ct, active) {
    var last = ct.last;
    var snip = last
      ? chIcon(last.channel, 13) + (last.direction === "out" ? '<span class="cv-you">' + esc(NX.t("conv.you")) + ":</span> " : "") + '<span class="cv-snip-t" dir="auto">' + esc(snippet(last.summary, 90)) + "</span>"
      : '<span class="cv-snip-t nx-muted">' + esc(NX.t("conv.noConv")) + "</span>";
    return '<a class="cv-contact' + (active ? " is-active" : "") + '" href="' + esc(ct.route) + '"' + (active ? ' aria-current="true"' : "") + ">" +
      contactAvatar(ct) +
      '<span class="cv-c-main"><span class="cv-c-top"><b dir="auto">' + esc(ct.name) + "</b>" + (last ? '<time>' + esc(listTime(dateOf(last))) + "</time>" : "") + "</span>" +
      (ct.sub ? '<span class="cv-c-sub" dir="auto">' + esc(ct.sub) + "</span>" : "") +
      '<span class="cv-c-snip">' + snip + "</span></span></a>";
  }

  function messageHtml(c) {
    var out = c.direction === "out";
    var by = c.by ? NX.userName(c.by) : "";
    var proj = c.projectId && c.leadId ? NX.store.get("projects", c.projectId) : null;
    var tools = '<span class="cv-msg-tools">' +
      '<button type="button" class="cv-tool" data-act="edit-conv" title="' + esc(NX.t("c.edit")) + '" aria-label="' + esc(NX.t("c.edit")) + '">' + NX.icon("edit", 14) + "</button>" +
      (NX.store.isAdmin() ? '<button type="button" class="cv-tool" data-act="del-conv" title="' + esc(NX.t("c.delete")) + '" aria-label="' + esc(NX.t("c.delete")) + '">' + NX.icon("trash", 14) + "</button>" : "") +
      "</span>";
    return '<div class="cv-msg ' + (out ? "cv-out" : "cv-in") + '" data-cid="' + esc(c.id) + '">' +
      '<div class="cv-bubble">' +
      '<div class="cv-msg-top">' + chIcon(c.channel, 13) + "<span>" + esc(chLabel(c.channel)) + "</span>" +
      '<span class="cv-dir">' + NX.icon(out ? "out" : "in", 12) + esc(NX.t(out ? "conv.outShort" : "conv.inShort")) + "</span>" +
      (proj ? '<a class="cv-proj-tag" href="#/projects/' + esc(proj.id) + '">' + NX.icon("projects", 12) + esc(proj.code || proj.name) + "</a>" : "") +
      tools + "</div>" +
      '<div class="cv-text nx-pre" dir="auto">' + esc(c.summary || "") + "</div>" +
      '<div class="cv-msg-foot"><time class="nx-num" title="' + esc(NX.fmt.dateTime(dateOf(c))) + '">' + esc(timeOf(dateOf(c))) + "</time>" +
      (by ? "<span>· " + esc(NX.t("conv.by", { n: by })) + "</span>" : "") + "</div>" +
      "</div></div>";
  }

  function threadHtml(ct, explicit) {
    if (!ct) {
      return '<div class="cv-thread-empty">' + NX.icon("conversations", 34) + "<p>" + esc(NX.t(explicit ? "conv.notFound" : "conv.pick")) + "</p>" +
        (explicit ? '<a class="nx-btn nx-btn-ghost nx-btn-sm" href="#/conversations">' + NX.icon("back", 14) + "<span>" + esc(NX.t("c.back")) + "</span></a>" : "") + "</div>";
    }
    var convs = (ct.convs || []).slice();
    var filteredBy = state.ch && convs.some(function (c) { return c.channel !== state.ch; }) ? state.ch : "";
    if (filteredBy) convs = convs.filter(function (c) { return c.channel === filteredBy; });

    var stage = ct.kind === "lead" && ct.lead.stage ? NX.ui.stageBadge(ct.lead.stage) : (ct.kind === "project" && ct.project.status ? NX.ui.statusBadge("projectStatuses", ct.project.status) : "");
    var subBits = [ct.sub ? '<span dir="auto">' + esc(ct.sub) + "</span>" : "", ct.phone ? '<span class="nx-num" dir="ltr">' + esc(ct.phone) + "</span>" : ""].filter(Boolean).join('<i class="cv-sep">·</i>');

    var actions =
      NX.ui.btn({ label: NX.t("c.whatsapp"), icon: "whatsapp", act: "cv-wa", cls: "wa sm", title: NX.t("conv.sendWa") }) +
      NX.ui.btn({ label: NX.t("c.sendEmail"), icon: "mail", act: "cv-mail", cls: "ghost sm", title: NX.t("conv.sendEmail") }) +
      (ct.phone ? NX.ui.btn({ label: NX.t("c.call"), icon: "phone", href: NX.phone.tel(ct.phone), cls: "ghost sm", title: NX.t("c.call") }) : "") +
      (NX.actions.newFollowup ? NX.ui.btn({ label: NX.t("conv.followup"), icon: "followups", act: "cv-fu", cls: "ghost sm", title: NX.t("conv.followup") }) : "") +
      NX.ui.btn({ label: NX.t("conv.log"), icon: "plus", act: "cv-log", cls: "primary sm", title: NX.t("conv.log") });

    var head = '<div class="cv-th-head">' +
      '<a class="nx-btn nx-btn-icon cv-back" href="#/conversations" title="' + esc(NX.t("c.back")) + '" aria-label="' + esc(NX.t("c.back")) + '">' + NX.icon("back") + "</a>" +
      contactAvatar(ct) +
      '<div class="cv-th-id"><a href="' + esc(ct.href) + '" class="cv-th-name" title="' + esc(NX.t(ct.kind === "lead" ? "conv.openLead" : "conv.openProject")) + '"><b dir="auto">' + esc(ct.name) + "</b>" + NX.icon("arrow", 14).replace('class="nx-ic"', 'class="nx-ic nx-ic-flip"') + "</a>" +
      '<small class="cv-th-sub">' + subBits + (stage ? " " + stage : "") + "</small></div>" +
      '<div class="cv-th-actions">' + actions + "</div></div>";

    var msgs = "", lastDay = "";
    convs.forEach(function (c) {
      var day = NX.fmt.iso(dateOf(c));
      if (day !== lastDay) { msgs += '<div class="cv-day"><span>' + esc(dayLabel(dateOf(c))) + "</span></div>"; lastDay = day; }
      msgs += messageHtml(c);
    });
    if (!convs.length) msgs = '<div class="cv-thread-empty cv-thread-empty-sm">' + NX.icon("conversations", 28) + "<p>" + esc(NX.t("conv.emptyThread", { name: ct.name })) + "</p></div>";
    if (filteredBy) msgs = '<div class="cv-filter-note">' + chIcon(filteredBy, 13) + "<span>" + esc(NX.t("conv.onlyCh", { ch: chLabel(filteredBy) })) + '</span><button type="button" class="nx-link" data-act="cv-clear-ch">' + esc(NX.t("conv.showAll")) + "</button></div>" + msgs;

    var draft = state.drafts[ct.key] || "";
    var composer = '<div class="cv-composer">' +
      '<div class="cv-comp-opts">' +
      '<label class="cv-comp-ch">' + chIcon(state.compChannel, 14) + '<select data-cv-ch aria-label="' + esc(NX.t("conv.channel")) + '">' +
      CH.map(function (c) { return '<option value="' + c.id + '"' + (c.id === state.compChannel ? " selected" : "") + ">" + esc(chLabel(c.id)) + "</option>"; }).join("") + "</select></label>" +
      '<div class="nx-seg cv-dir-seg" role="group" aria-label="' + esc(NX.t("conv.direction")) + '">' +
      '<button type="button" data-cv-dir="in" class="' + (state.compDir === "in" ? "is-active" : "") + '">' + NX.icon("in", 13) + "<span>" + esc(NX.t("conv.in")) + "</span></button>" +
      '<button type="button" data-cv-dir="out" class="' + (state.compDir === "out" ? "is-active" : "") + '">' + NX.icon("out", 13) + "<span>" + esc(NX.t("conv.out")) + "</span></button>" +
      "</div></div>" +
      '<div class="cv-comp-row"><textarea class="cv-comp-text" data-cv-text rows="1" dir="auto" placeholder="' + esc(NX.t("conv.composerPh")) + '">' + esc(draft) + "</textarea>" +
      '<button type="button" class="nx-btn nx-btn-primary cv-comp-send" data-act="cv-save" title="' + esc(NX.t("conv.saveNote")) + '" aria-label="' + esc(NX.t("conv.saveNote")) + '"' + (draft.trim() ? "" : " disabled") + ">" + NX.icon("send", 17).replace('class="nx-ic"', 'class="nx-ic nx-ic-flip"') + "</button></div>" +
      "</div>";

    return head + '<div class="cv-msgs" data-cv-msgs>' + msgs + "</div>" + composer;
  }

  /* ---------- modals / actions ---------- */
  function leadOptions() {
    var list = NX.store.all("leads").slice().sort(byName);
    return [{ value: "", label: list.length ? NX.t("c.select") : NX.t("conv.noLeadsYet") }].concat(list.map(function (l) { return { value: l.id, label: l.name + (l.company ? " — " + l.company : "") }; }));
  }
  function projectOptions() {
    var list = NX.store.all("projects").slice().sort(byName);
    return [{ value: "", label: NX.t("c.none") }].concat(list.map(function (p) { return { value: p.id, label: (p.code ? p.code + " — " : "") + p.name }; }));
  }

  function channelPicker(value) {
    return '<div class="nx-field nx-full"><label>' + esc(NX.t("conv.channel")) + '</label><input type="hidden" name="channel" value="' + esc(value) + '" />' +
      '<div class="cv-chpick" role="radiogroup">' + CH.map(function (c) {
        return '<button type="button" role="radio" aria-checked="' + (c.id === value) + '" class="cv-chp' + (c.id === value ? " is-active" : "") + '" data-pick-ch="' + c.id + '">' + NX.icon(c.icon, 16) + "<span>" + esc(chLabel(c.id)) + "</span></button>";
      }).join("") + "</div></div>";
  }
  function dirPicker(value) {
    return '<div class="nx-field"><label>' + esc(NX.t("conv.direction")) + '</label><input type="hidden" name="direction" value="' + esc(value) + '" />' +
      '<div class="nx-seg cv-dir-pick">' +
      '<button type="button" data-pick-dir="in" class="' + (value === "in" ? "is-active" : "") + '">' + NX.icon("in", 14) + "<span>" + esc(NX.t("conv.in")) + "</span></button>" +
      '<button type="button" data-pick-dir="out" class="' + (value === "out" ? "is-active" : "") + '">' + NX.icon("out", 14) + "<span>" + esc(NX.t("conv.out")) + "</span></button>" +
      "</div></div>";
  }

  function logConversation(prefill) {
    prefill = prefill || {};
    var editing = !!prefill.id;
    var rec = Object.assign({ leadId: "", projectId: "", channel: state.compChannel || "whatsapp", direction: "out", date: "", summary: "" }, prefill);
    var body = '<div class="nx-form-grid">' +
      NX.ui.field({ name: "leadId", label: NX.t("conv.contact"), type: "select", options: leadOptions(), value: rec.leadId }) +
      NX.ui.field({ name: "projectId", label: NX.t("conv.project"), type: "select", options: projectOptions(), value: rec.projectId }) +
      channelPicker(chDef(rec.channel).id) +
      dirPicker(rec.direction === "in" ? "in" : "out") +
      NX.ui.field({ name: "date", label: NX.t("conv.when"), type: "datetime-local", required: true, value: localDT(rec.date || new Date()) }) +
      NX.ui.field({ name: "summary", label: NX.t("conv.summary"), type: "textarea", required: true, full: true, rows: 5, value: rec.summary, placeholder: NX.t("conv.summaryPh"), attrs: ' dir="auto"' }) +
      "</div>";
    var footer = editing && NX.store.isAdmin() ? NX.ui.btn({ label: NX.t("c.delete"), icon: "trash", act: "cv-del", cls: "text" }) : "";
    return NX.ui.modal({
      title: editing ? NX.t("conv.edit") : NX.t("conv.log"),
      size: "md",
      body: body,
      footer: footer,
      onOpen: function (f, m) {
        NX.ui.on(f, "click", "[data-pick-ch]", function (e, b) {
          f.querySelector('[name="channel"]').value = b.getAttribute("data-pick-ch");
          f.querySelectorAll("[data-pick-ch]").forEach(function (x) { x.classList.toggle("is-active", x === b); x.setAttribute("aria-checked", x === b); });
        });
        NX.ui.on(f, "click", "[data-pick-dir]", function (e, b) {
          f.querySelector('[name="direction"]').value = b.getAttribute("data-pick-dir");
          f.querySelectorAll("[data-pick-dir]").forEach(function (x) { x.classList.toggle("is-active", x === b); });
        });
        NX.ui.on(f, "click", "[data-act=cv-del]", function () { NX.ui.del("conversations", rec.id, function () { m.close(); }); });
        // Picking a project with a linked lead fills the lead if empty.
        f.querySelector('[name="projectId"]').addEventListener("change", function (e) {
          var p = NX.store.get("projects", e.target.value), leadSel = f.querySelector('[name="leadId"]');
          if (p && p.leadId && !leadSel.value && NX.store.get("leads", p.leadId)) leadSel.value = p.leadId;
        });
        if (!editing && (rec.leadId || rec.projectId)) setTimeout(function () { var s = f.querySelector('[name="summary"]'); if (s && window.innerWidth > 720) s.focus(); }, 40);
      },
      onSubmit: function (data, f) {
        if (!data.leadId && !data.projectId) {
          var fld = f.querySelector('[name="leadId"]').closest(".nx-field");
          fld.classList.add("is-invalid");
          NX.ui.toast(NX.t("conv.needContact"), "error");
          return false;
        }
        var d = NX.fmt.toDate(data.date);
        var out = Object.assign({}, rec, {
          leadId: data.leadId, projectId: data.projectId, channel: data.channel, direction: data.direction,
          date: (d || new Date()).toISOString(), summary: data.summary, by: rec.by || me()
        });
        return NX.ui.run(NX.store.save("conversations", out), editing ? NX.t("c.saved") : NX.t("conv.logged"));
      }
    });
  }

  function templatesFor(channel) {
    var ui = NX.i18n.lang;
    var rank = function (t) { return t.lang === ui ? 0 : (t.lang === "both" ? 1 : 2); };
    return NX.store.where("templates", function (t) {
      return t.kind === "message" && (!t.channel || t.channel === "any" || t.channel === channel);
    }).sort(function (a, b) { return rank(a) - rank(b) || String(a.name || "").localeCompare(String(b.name || ""), ui); });
  }

  function sendMessage(opts) {
    opts = opts || {};
    var proposal = opts.proposal || null;
    var project = getProject(opts.project);
    var lead = getLead(opts.lead) ||
      (proposal && proposal.leadId ? NX.store.get("leads", proposal.leadId) : null) ||
      (project && project.leadId ? NX.store.get("leads", project.leadId) : null);
    var channel = opts.channel === "email" ? "email" : "whatsapp";
    var phone = (lead && lead.phone) || (project && project.phone) || (proposal && proposal.phone) || "";
    var email = (lead && lead.email) || (proposal && proposal.email) || "";
    var name = (lead && lead.name) || (project && project.client) || (proposal && proposal.client) || "";
    var tpls = templatesFor(channel);
    var isWa = channel === "whatsapp";

    var tplChips = '<div class="cv-tpls" role="radiogroup">' +
      '<button type="button" class="cv-tpl is-active" data-tpl="" role="radio" aria-checked="true">' + NX.icon("edit", 14) + "<span>" + esc(NX.t("conv.blank")) + "</span></button>" +
      tpls.map(function (t) {
        return '<button type="button" class="cv-tpl" data-tpl="' + esc(t.id) + '" role="radio" aria-checked="false"><span dir="auto">' + esc(t.name || "—") + '</span><i class="cv-tpl-lang">' + esc(t.lang === "ar" ? "ع" : (t.lang === "en" ? "EN" : "EN/ع")) + "</i></button>";
      }).join("") + "</div>" +
      (tpls.length ? "" : '<small class="nx-hint">' + esc(NX.t("conv.noTemplates")) + "</small>");

    var recipient;
    if (isWa) {
      recipient = phone
        ? '<div class="cv-recipient">' + NX.icon("whatsapp", 16) + "<span>" + esc(NX.t("conv.to")) + ':</span> <b dir="auto">' + esc(name) + '</b> <span class="nx-num" dir="ltr">' + esc(phone) + "</span></div>"
        : '<div class="nx-note-box cv-warn">' + esc(NX.t("conv.noPhone")) + "</div>";
    } else {
      recipient = (email ? "" : '<div class="nx-note-box cv-warn">' + esc(NX.t("conv.noEmail")) + "</div>");
    }

    var body = recipient + '<div class="nx-form-grid cv-send-grid">' +
      '<div class="nx-field nx-full"><label>' + esc(NX.t("conv.tpl")) + "</label>" + tplChips + "</div>" +
      (isWa ? "" :
        NX.ui.field({ name: "to", label: NX.t("conv.to"), type: "email", required: true, full: true, value: email, attrs: ' autocomplete="off"' }) +
        NX.ui.field({ name: "subject", label: NX.t("conv.subject"), full: true, value: "", attrs: ' dir="auto"' })) +
      NX.ui.field({ name: "body", label: NX.t("conv.message"), type: "textarea", required: true, full: true, rows: 9, value: "", attrs: ' dir="auto"' }) +
      "</div>" +
      ((lead || project) ? '<p class="nx-hint cv-autolog">' + NX.icon("check", 13) + esc(NX.t("conv.autoLog")) + "</p>" : "");

    return NX.ui.modal({
      title: isWa ? NX.t("conv.sendWa") : NX.t("conv.sendEmail"),
      size: "md",
      body: body,
      submitLabel: isWa ? NX.t("conv.openWa") : NX.t("conv.send"),
      footer: NX.ui.btn({ label: NX.t("conv.copy"), icon: "copy", act: "cv-copy", cls: "ghost sm" }),
      onOpen: function (f) {
        var submit = f.querySelector('[type="submit"]');
        if (isWa) {
          submit.className = "nx-btn nx-btn-wa";
          submit.innerHTML = NX.icon("whatsapp", 16) + "<span>" + esc(NX.t("conv.openWa")) + "</span>";
          if (!phone) submit.disabled = true;
        } else {
          submit.innerHTML = NX.icon("send", 16).replace('class="nx-ic"', 'class="nx-ic nx-ic-flip"') + "<span>" + esc(NX.t("conv.send")) + "</span>";
        }
        NX.ui.on(f, "click", "[data-tpl]", function (e, b) {
          f.querySelectorAll("[data-tpl]").forEach(function (x) { x.classList.toggle("is-active", x === b); x.setAttribute("aria-checked", x === b); });
          var id = b.getAttribute("data-tpl");
          var t = id ? NX.store.get("templates", id) : null;
          var ctx = NX.templateContext({ lead: lead, proposal: proposal, project: project, lang: t && t.lang !== "both" ? t.lang : undefined });
          f.querySelector('[name="body"]').value = t ? NX.fill(t.body, ctx) : "";
          var subj = f.querySelector('[name="subject"]');
          if (subj) subj.value = t ? NX.fill(t.subject, ctx) : "";
          var bodyEl = f.querySelector('[name="body"]');
          bodyEl.closest(".nx-field").classList.remove("is-invalid");
        });
        NX.ui.on(f, "click", "[data-act=cv-copy]", function () {
          var subj = f.querySelector('[name="subject"]');
          var text = f.querySelector('[name="body"]').value;
          NX.ui.copy(subj && subj.value ? subj.value + "\n\n" + text : text);
        });
      },
      onSubmit: function (data) {
        var logIt = function (summary) {
          if (!lead && !project) return Promise.resolve(null);
          return NX.store.save("conversations", {
            leadId: lead ? lead.id : "", projectId: project ? project.id : "",
            channel: channel, direction: "out", date: new Date().toISOString(), summary: summary, by: me()
          });
        };
        if (isWa) {
          if (!phone) return false;
          window.open(NX.phone.wa(phone, data.body), "_blank", "noopener");
          return NX.ui.run(logIt(snippet(data.body, 200)), NX.t("conv.waLogged"));
        }
        var summary = (data.subject ? NX.t("conv.subjectLine", { s: data.subject }) + " — " : "") + snippet(data.body, 160);
        return NX.ui.run(NX.store.sendEmail({ to: data.to, subject: data.subject, body: data.body }), NX.t("c.emailSent"))
          .then(function () { return logIt(summary).catch(function (err) { NX.ui.toast(NX.t("c.error", { msg: err.message || err }), "error"); }); });
      }
    });
  }

  NX.actions.logConversation = logConversation;
  NX.actions.sendMessage = sendMessage;

  /* ---------- page ---------- */
  function saveComposer(ct, text) {
    text = String(text || "").trim();
    if (!text || !ct) return;
    var rec = {
      leadId: ct.kind === "lead" ? ct.id : "",
      projectId: ct.kind === "project" ? ct.id : "",
      channel: state.compChannel, direction: state.compDir, date: new Date().toISOString(), summary: text, by: me()
    };
    delete state.drafts[ct.key];
    return NX.ui.run(NX.store.save("conversations", rec), NX.t("conv.logged")).catch(function () { state.drafts[ct.key] = text; });
  }

  NX.view("conversations", {
    order: 70,
    icon: "conversations",
    render: function (el, params) {
      var all = buildContacts();
      var list = visibleContacts(all);
      var explicitKey = keyFromParams(params);
      var selected = null;
      if (explicitKey) {
        selected = all.find(function (c) { return c.key === explicitKey; }) || null;
        if (!selected) { selected = resolve(explicitKey); if (selected) { selected.convs = []; } }
      } else if (list.length) {
        selected = list[0];
      }
      var total = NX.store.all("conversations").length;

      var head = NX.ui.pageHead({
        title: NX.t("nav.conversations"),
        sub: esc(NX.t("conv.sub", { n: all.length, m: total })),
        actions: NX.ui.btn({ label: NX.t("conv.log"), icon: "plus", act: "cv-log-any", cls: "primary" })
      });

      var chips = '<div class="nx-chips cv-chips">' + [{ id: "", icon: "filter" }].concat(CH).map(function (c) {
        var n = c.id ? NX.store.where("conversations", function (x) { return x.channel === c.id; }).length : total;
        return '<button type="button" class="nx-chip' + (state.ch === c.id ? " is-active" : "") + '" data-cv-filter="' + c.id + '">' + NX.icon(c.icon, 14) + "<span>" + esc(c.id ? chLabel(c.id) : NX.t("conv.allCh")) + '</span> <span class="nx-chip-n">' + n + "</span></button>";
      }).join("") + "</div>";

      var listHtml = list.length
        ? list.map(function (ct) { return contactItem(ct, selected && ct.key === selected.key); }).join("")
        : '<div class="cv-list-empty">' + esc(NX.t(state.q || state.ch ? "conv.noMatch" : "conv.noConv")) + "</div>";

      el.innerHTML =
        '<div class="cv-page' + (explicitKey ? " cv-has-sel" : "") + '">' +
        '<div class="cv-top">' + head + '<div class="nx-toolbar cv-toolbar">' + NX.ui.searchBox(state.q, NX.t("conv.search")) + chips + "</div></div>" +
        '<div class="cv-layout">' +
        '<aside class="cv-list" data-cv-list>' + listHtml + "</aside>" +
        '<section class="cv-thread">' + threadHtml(selected, !!explicitKey) + "</section>" +
        "</div></div>";

      /* ----- after paint: restore list scroll, jump thread to newest ----- */
      setTimeout(function () {
        var lp = el.querySelector("[data-cv-list]");
        if (lp) lp.scrollTop = state.listScroll;
        var mp = el.querySelector("[data-cv-msgs]");
        if (mp) mp.scrollTop = mp.scrollHeight;
        var ta = el.querySelector("[data-cv-text]");
        if (ta) autoGrow(ta);
      }, 0);

      var lp = el.querySelector("[data-cv-list]");
      if (lp) lp.addEventListener("scroll", function () { state.listScroll = lp.scrollTop; }, { passive: true });

      /* ----- events ----- */
      NX.ui.on(el, "input", "[data-search]", function (e, t) { state.q = t.value; state.listScroll = 0; NX.app.rerender(); });
      NX.ui.on(el, "click", "[data-cv-filter]", function (e, t) { state.ch = t.getAttribute("data-cv-filter"); state.listScroll = 0; NX.app.rerender(); });
      NX.ui.on(el, "click", "[data-act=cv-clear-ch]", function () { state.ch = ""; NX.app.rerender(); });
      NX.ui.on(el, "click", "[data-act=cv-log-any]", function () {
        logConversation(selected ? { leadId: selected.kind === "lead" ? selected.id : "", projectId: selected.kind === "project" ? selected.id : "" } : {});
      });
      if (!selected) return;
      var ct = selected;
      NX.ui.on(el, "click", "[data-act=cv-log]", function () {
        logConversation({ leadId: ct.kind === "lead" ? ct.id : "", projectId: ct.kind === "project" ? ct.id : "", channel: state.compChannel, direction: state.compDir });
      });
      NX.ui.on(el, "click", "[data-act=cv-wa]", function () { sendMessage({ lead: ct.kind === "lead" ? ct.lead : null, project: ct.project, channel: "whatsapp" }); });
      NX.ui.on(el, "click", "[data-act=cv-mail]", function () { sendMessage({ lead: ct.kind === "lead" ? ct.lead : null, project: ct.project, channel: "email" }); });
      NX.ui.on(el, "click", "[data-act=cv-fu]", function () {
        NX.actions.newFollowup && NX.actions.newFollowup({ leadId: ct.kind === "lead" ? ct.id : (ct.project.leadId || ""), projectId: ct.kind === "project" ? ct.id : "" });
      });
      NX.ui.on(el, "click", "[data-act=edit-conv]", function (e, t) {
        var c = NX.store.get("conversations", t.closest("[data-cid]").getAttribute("data-cid"));
        if (c) logConversation(c);
      });
      NX.ui.on(el, "click", "[data-act=del-conv]", function (e, t) { NX.ui.del("conversations", t.closest("[data-cid]").getAttribute("data-cid")); });
      NX.ui.on(el, "change", "[data-cv-ch]", function (e, t) {
        state.compChannel = t.value;
        var wrap = t.closest(".cv-comp-ch"), ic = wrap.querySelector(".cv-ch");
        if (ic) ic.outerHTML = chIcon(state.compChannel, 14);
      });
      NX.ui.on(el, "click", "[data-cv-dir]", function (e, t) {
        state.compDir = t.getAttribute("data-cv-dir");
        el.querySelectorAll("[data-cv-dir]").forEach(function (b) { b.classList.toggle("is-active", b === t); });
      });
      NX.ui.on(el, "input", "[data-cv-text]", function (e, t) {
        state.drafts[ct.key] = t.value;
        autoGrow(t);
        var send = el.querySelector("[data-act=cv-save]");
        if (send) send.disabled = !t.value.trim();
      });
      NX.ui.on(el, "keydown", "[data-cv-text]", function (e, t) {
        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) { e.preventDefault(); saveComposer(ct, t.value); }
      });
      NX.ui.on(el, "click", "[data-act=cv-save]", function () {
        var ta = el.querySelector("[data-cv-text]");
        if (ta) saveComposer(ct, ta.value);
      });
    }
  });

  function autoGrow(ta) {
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight + 2, 140) + "px";
  }
})();
