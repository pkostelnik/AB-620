/* ==========================================================================
   AB-620 Prüfungsvorbereitung — Applikationslogik
   ThemeManager, ProgressTracker, Rendering (Domänen/Unterthemen/Lerninhalte),
   Exam-Simulator (75er Pool, 30 Fragen, 45 Minuten)
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------- Safe localStorage wrapper (defensive against
     SecurityError in sandboxed/opaque-origin contexts, private mode, etc.) ---------------- */
  const SafeStorage = {
    _memory: {},
    getItem(key) {
      try { return localStorage.getItem(key); }
      catch (e) { return (key in this._memory) ? this._memory[key] : null; }
    },
    setItem(key, value) {
      try { localStorage.setItem(key, value); }
      catch (e) { this._memory[key] = value; }
    }
  };

  /* ---------------- ThemeManager ---------------- */
  const ThemeManager = {
    key: "ab620-theme",
    init() {
      const saved = SafeStorage.getItem(this.key) || "auto";
      this.apply(saved);
      const select = document.getElementById("theme-select");
      if (select) {
        select.value = saved;
        select.addEventListener("change", (e) => this.apply(e.target.value));
      }
      try {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
          if ((SafeStorage.getItem(this.key) || "auto") === "auto") {
            document.documentElement.setAttribute("data-theme", "auto");
          }
        });
      } catch (e) { /* matchMedia not available in this environment: non-fatal */ }
    },
    apply(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      SafeStorage.setItem(this.key, theme);
      Announcer.say("Farbschema geändert auf " + theme);
    }
  };

  /* ---------------- Announcer (ARIA live) ---------------- */
  const Announcer = {
    say(msg) {
      const el = document.getElementById("aria-announcer");
      if (el) { el.textContent = ""; requestAnimationFrame(() => { el.textContent = msg; }); }
    }
  };

  /* ---------------- ProgressTracker ----------------
     Fortschritt wird jetzt auf Ebene der subDomains (gelesen/nicht gelesen)
     sowie weiterhin auf Ebene der Labs erfasst. */
  const ProgressTracker = {
    key: "ab620-progress",
    _read() {
      try {
        const parsed = JSON.parse(SafeStorage.getItem(this.key));
        const data = parsed && typeof parsed === "object" ? parsed : {};
        // Migrate/normalise older or partially written progress records safely.
        data.subDomains = data.subDomains && typeof data.subDomains === "object" ? data.subDomains : {};
        data.labs = data.labs && typeof data.labs === "object" ? data.labs : {};
        return data;
      } catch (e) { return { subDomains: {}, labs: {} }; }
    },
    _write(data) { SafeStorage.setItem(this.key, JSON.stringify(data)); },
    markSubDomainRead(subDomainId) {
      const data = this._read();
      data.subDomains[subDomainId] = true;
      this._write(data);
      Dashboard.refresh();
    },
    isSubDomainRead(subDomainId) {
      return !!this._read().subDomains[subDomainId];
    },
    markLabDone(labId) {
      const data = this._read();
      data.labs[labId] = true;
      this._write(data);
      Dashboard.refresh();
    },
    isLabDone(labId) {
      return !!this._read().labs[labId];
    },
    readSubDomainCount() {
      const data = this._read();
      return Object.keys(data.subDomains).filter(k => data.subDomains[k]).length;
    },
    percentComplete() {
      const subDomains = Array.isArray(AB620_CONTENT.subDomains) ? AB620_CONTENT.subDomains : [];
      const labs = Array.isArray(AB620_CONTENT.labs) ? AB620_CONTENT.labs : [];
      const total = subDomains.length + labs.length;
      const data = this._read();
      const doneSubDomains = subDomains.filter(sd => data.subDomains[sd.id]).length;
      // Only count labs that exist in the current content (stale localStorage is ignored).
      const doneLabs = labs.filter(lab => data.labs[lab.id]).length;
      return total === 0 ? 0 : Math.round(((doneSubDomains + doneLabs) / total) * 100);
    }
  };

  /* ---------------- Dashboard ---------------- */
  const Dashboard = {
    refresh() {
      const pct = ProgressTracker.percentComplete();
      const ring = document.getElementById("dashboard-progress");
      if (ring) {
        ring.style.setProperty("--pct", pct);
        const valueEl = ring.querySelector(".score-ring__value");
        if (valueEl) valueEl.textContent = pct + "%";
      }
      const statLine = document.getElementById("sidebar-progress-stat");
      if (statLine) {
        const readCount = ProgressTracker.readSubDomainCount();
        statLine.textContent = readCount + " von " + AB620_CONTENT.subDomains.length +
          " Unterthemen gelernt (" + AB620_CONTENT.learningItems.length + " Lerninhalte gesamt, " +
          AB620_CONTENT.labs.length + " Labs)";
      }
    }
  };

  /* ---------------- Helpers ---------------- */
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function domainLabel(domainId) {
    const d = AB620_CONTENT.domains.find(x => x.id === domainId);
    return d ? d.title : domainId;
  }

  function subDomainLabel(subDomainId) {
    const s = AB620_CONTENT.subDomains.find(x => x.id === subDomainId);
    return s ? s.title : subDomainId;
  }

  /* ---------------- Presenter-Zustand pro Domäne (welcher Lerninhalt-Index gerade angezeigt wird) ---------------- */
  const PresenterState = {}; // { [domainId]: { active: bool, index: number, items: [...] } }

  /* ---------------- Lernpfad rendering: Domänen > Übersicht/Presenter > Lerninhalte ---------------- */
  function renderModules(filterText) {
    const container = document.getElementById("module-list");
    if (!container) return;
    const filter = (filterText || "").toLowerCase();

    const filteredItems = AB620_CONTENT.learningItems.filter(item => {
      if (!filter) return true;
      const haystack = (item.topic + " " + item.content + " " + subDomainLabel(item.subDomainId)).toLowerCase();
      return haystack.includes(filter);
    });

    if (filter && filteredItems.length === 0) {
      container.innerHTML = '<p role="status">Keine Lerninhalte gefunden für „' + escapeHtml(filterText) + '“.</p>';
      return;
    }

    const html = AB620_CONTENT.domains.map(domain => {
      const subDomains = AB620_CONTENT.subDomains.filter(sd => sd.domainId === domain.id);
      const domainItemCount = AB620_CONTENT.learningItems.filter(it => it.domainId === domain.id).length;

      /* -------- Suchmodus: klassische Akkordeon-Liste (Übersicht/Presenter ergibt bei Filtern keinen Sinn) -------- */
      if (filter) {
        const subDomainsHtml = subDomains.map(sd => {
          const items = filteredItems.filter(item => item.subDomainId === sd.id);
          if (items.length === 0) return "";
          return `
          <details class="module-card" data-subdomain-id="${sd.id}" open>
            <summary class="module-card__header">
              <span class="module-card__number" aria-hidden="true">${items.length}</span>
              <span class="module-card__title-group">
                <p class="module-card__title">${escapeHtml(sd.title)}</p>
                <span class="module-card__meta">${escapeHtml(domain.title)} · ${items.length} Treffer</span>
              </span>
              <svg class="module-card__chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </summary>
            <div class="module-card__body">
              <div class="module-card__section">
                ${items.map(item => `
                  <article class="learning-item" data-item-id="${item.id}" style="margin-bottom: var(--space-4, 16px);">
                    <h4 style="text-transform:none; letter-spacing:normal; font-size:1rem; color:inherit;">${escapeHtml(item.topic)}</h4>
                    <p>${escapeHtml(item.content)}</p>
                    <p><a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">Quelle: ${escapeHtml(item.sourceTitle)} ↗</a></p>
                  </article>`).join("")}
              </div>
            </div>
          </details>`;
        }).join("");

        return `
          <details class="domain-block domain-accordion" data-domain-id="${domain.id}" open>
            <summary class="domain-accordion__header" aria-label="Domäne ${escapeHtml(domain.title)} auf-/zuklappen">
              <span class="domain-accordion__title-group">
                <h3 id="domain-title-${domain.id}" style="margin:0;">${escapeHtml(domain.title)} <span class="badge">${escapeHtml(domain.weightPercent)}</span></h3>
                <span class="module-card__meta">Suchtreffer in dieser Domäne</span>
              </span>
              <svg class="module-card__chevron domain-accordion__chevron" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </summary>
            <div class="domain-accordion__body">
              ${subDomainsHtml || '<p role="status">Keine Treffer in dieser Domäne.</p>'}
            </div>
          </details>`;
      }

      /* -------- Normalmodus: Übersicht mit "Weiter"-Button, dann geführter Karten-Presenter -------- */
      const flatItems = subDomains.flatMap(sd =>
        AB620_CONTENT.learningItems.filter(it => it.subDomainId === sd.id).map(it => ({ ...it, subDomainTitle: sd.title }))
      );
      if (!PresenterState[domain.id]) PresenterState[domain.id] = { active: false, index: 0 };
      const state = PresenterState[domain.id];
      const readSubDomains = subDomains.filter(sd => ProgressTracker.isSubDomainRead(sd.id)).length;

      const overviewHtml = `
        <div class="domain-overview" data-domain-id="${domain.id}" ${state.active ? 'hidden' : ""}>
          <p>${escapeHtml(domain.description)}</p>
          <ul class="domain-overview__stats">
            <li>${subDomains.length} Unterthemen</li>
            <li>${domainItemCount} Lerninhalte</li>
            <li>${readSubDomains} von ${subDomains.length} Unterthemen als gelesen markiert</li>
          </ul>
          <button type="button" class="btn btn--primary domain-presenter-start-btn" data-domain-id="${domain.id}">
            Weiter →
          </button>
        </div>`;

      const presenterHtml = `
        <div class="domain-presenter" data-domain-id="${domain.id}" ${state.active ? "" : "hidden"}>
          <div class="domain-presenter__card-slot" data-domain-id="${domain.id}"></div>
        </div>`;

      return `
        <details class="domain-block domain-accordion" data-domain-id="${domain.id}">
          <summary class="domain-accordion__header" aria-label="Domäne ${escapeHtml(domain.title)} auf-/zuklappen">
            <span class="domain-accordion__title-group">
              <h3 id="domain-title-${domain.id}" style="margin:0;">${escapeHtml(domain.title)} <span class="badge">${escapeHtml(domain.weightPercent)}</span></h3>
              <span class="module-card__meta">${subDomains.length} Unterthemen · ${domainItemCount} Lerninhalte</span>
            </span>
            <svg class="module-card__chevron domain-accordion__chevron" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </summary>
          <div class="domain-accordion__body">
            ${overviewHtml}
            ${presenterHtml}
          </div>
        </details>`;
    }).join("");

    container.innerHTML = html;

    if (!filter) {
      AB620_CONTENT.domains.forEach(domain => {
        const subDomains = AB620_CONTENT.subDomains.filter(sd => sd.domainId === domain.id);
        const flatItems = subDomains.flatMap(sd =>
          AB620_CONTENT.learningItems.filter(it => it.subDomainId === sd.id).map(it => ({ ...it, subDomainTitle: sd.title }))
        );
        if (PresenterState[domain.id] && PresenterState[domain.id].active) {
          renderPresenterCard(container, domain.id, flatItems);
        }
      });

      container.querySelectorAll(".domain-presenter-start-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const domainId = btn.getAttribute("data-domain-id");
          const subDomains = AB620_CONTENT.subDomains.filter(sd => sd.domainId === domainId);
          const flatItems = subDomains.flatMap(sd =>
            AB620_CONTENT.learningItems.filter(it => it.subDomainId === sd.id).map(it => ({ ...it, subDomainTitle: sd.title }))
          );
          PresenterState[domainId] = { active: true, index: 0 };
          const domainEl = container.querySelector('.domain-accordion[data-domain-id="' + domainId + '"]');
          if (domainEl) {
            domainEl.querySelector(".domain-overview").hidden = true;
            const presenterEl = domainEl.querySelector(".domain-presenter");
            presenterEl.hidden = false;
            renderPresenterCard(container, domainId, flatItems);
          }
          Announcer.say("Geführte Lernkarten gestartet: " + domainLabel(domainId));
        });
      });
    }

    container.querySelectorAll(".domain-accordion").forEach(dom => {
      dom.addEventListener("toggle", () => {
        if (dom.open) Announcer.say("Domäne geöffnet: " + dom.querySelector("h3").textContent);
        else Announcer.say("Domäne geschlossen: " + dom.querySelector("h3").textContent);
      });
    });

    container.querySelectorAll(".module-card").forEach(card => {
      card.addEventListener("toggle", () => {
        if (card.open) Announcer.say("Unterthema geöffnet: " + card.querySelector(".module-card__title").textContent);
      });
    });

    container.querySelectorAll(".subdomain-read-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const sdId = btn.getAttribute("data-subdomain-id");
        ProgressTracker.markSubDomainRead(sdId);
        btn.textContent = "✓ Als gelesen markiert";
        btn.setAttribute("aria-pressed", "true");
        Announcer.say("Unterthema als gelesen markiert.");
      });
    });
  }

  /* ---------------- Presenter-Karte: rendert EINEN Lerninhalt im 2/3-Erklärung + 1/3-Quelle Layout,
     mit Weiter / Zurück / Übersicht Navigation ---------------- */
  function renderPresenterCard(container, domainId, flatItems) {
    const state = PresenterState[domainId];
    if (!state) return;
    const slot = container.querySelector('.domain-presenter__card-slot[data-domain-id="' + domainId + '"]');
    if (!slot) return;

    const total = flatItems.length;
    if (total === 0) {
      slot.innerHTML = '<p role="status">Keine Lerninhalte in dieser Domäne.</p>';
      return;
    }
    if (state.index < 0) state.index = 0;
    if (state.index > total - 1) state.index = total - 1;
    const item = flatItems[state.index];
    const isFirst = state.index === 0;
    const isLast = state.index === total - 1;

    slot.innerHTML = `
      <div class="presenter-card" role="group" aria-label="Lerninhalt ${state.index + 1} von ${total}">
        <div class="presenter-card__progress">
          <span class="presenter-card__counter">Lerninhalt ${state.index + 1} von ${total}</span>
          <span class="presenter-card__subdomain badge">${escapeHtml(item.subDomainTitle)}</span>
        </div>
        <div class="presenter-card__explanation">
          <h4 class="presenter-card__topic">${escapeHtml(item.topic)}</h4>
          <p class="presenter-card__content">${escapeHtml(item.content)}</p>
        </div>
        <div class="presenter-card__source">
          <span class="presenter-card__source-label">Quelle</span>
          <a href="${escapeHtml(item.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.sourceTitle)} ↗</a>
        </div>
        <div class="presenter-card__nav">
          <button type="button" class="btn btn--outline presenter-back-btn" data-domain-id="${domainId}" ${isFirst ? "disabled" : ""}>← Zurück</button>
          <button type="button" class="btn btn--secondary presenter-overview-btn" data-domain-id="${domainId}">Übersicht</button>
          <button type="button" class="btn btn--primary presenter-next-btn" data-domain-id="${domainId}" ${isLast ? "disabled" : ""}>Weiter →</button>
        </div>
      </div>`;

    const backBtn = slot.querySelector(".presenter-back-btn");
    const nextBtn = slot.querySelector(".presenter-next-btn");
    const overviewBtn = slot.querySelector(".presenter-overview-btn");

    if (backBtn) backBtn.addEventListener("click", () => {
      if (state.index > 0) {
        state.index--;
        renderPresenterCard(container, domainId, flatItems);
        Announcer.say("Vorheriger Lerninhalt: " + flatItems[state.index].topic);
      }
    });
    if (nextBtn) nextBtn.addEventListener("click", () => {
      if (state.index < total - 1) {
        state.index++;
        renderPresenterCard(container, domainId, flatItems);
        Announcer.say("Nächster Lerninhalt: " + flatItems[state.index].topic);
      }
    });
    if (overviewBtn) overviewBtn.addEventListener("click", () => {
      state.active = false;
      state.index = 0;
      const domainEl = container.querySelector('.domain-accordion[data-domain-id="' + domainId + '"]');
      if (domainEl) {
        domainEl.querySelector(".domain-overview").hidden = false;
        domainEl.querySelector(".domain-presenter").hidden = true;
      }
      Announcer.say("Zurück zur Übersicht: " + domainLabel(domainId));
    });
  }

  /* ---------------- Lab rendering (20-Lab-Architektur, mit Legacy-Fallbacks) ---------------- */
  const LabViewState = { topic: "", domain: "" };
  function labArray(value) { return Array.isArray(value) ? value : (value == null ? [] : [value]); }
  function labText(value, fallback) { return value == null || value === "" ? (fallback || "") : String(value); }

  function renderLabs(filterText) {
    const container = document.getElementById("lab-list");
    if (!container) return;
    const allLabs = Array.isArray(AB620_CONTENT.labs) ? AB620_CONTENT.labs.slice() : [];
    const filter = (filterText || "").toLowerCase().trim();
    const domains = Array.isArray(AB620_CONTENT.domains) ? AB620_CONTENT.domains : [];
    const topics = Array.from(new Set(allLabs.map(l => labText(l.topic, l.title || "")).filter(Boolean))).sort();
    const domainIds = Array.from(new Set(allLabs.map(l => l.domainId || l.domain).filter(Boolean)));
    const visible = allLabs.filter(l => {
      const topic = labText(l.topic, l.title);
      const haystack = [l.title, topic, l.objective, l.prerequisites, l.verification,
        ...labArray(l.steps), ...labArray(l.artifacts), ...labArray(l.msLearnReferences)]
        .filter(Boolean).join(" ").toLowerCase();
      return (!filter || haystack.includes(filter)) &&
        (!LabViewState.topic || topic === LabViewState.topic) &&
        (!LabViewState.domain || (l.domainId || l.domain) === LabViewState.domain);
    }).sort((a, b) => (Number(a.sequence) || 999) - (Number(b.sequence) || 999));

    const selectOptions = (values, selected, label) => `<option value="">Alle ${label}</option>` +
      values.map(v => `<option value="${escapeHtml(v)}" ${v === selected ? "selected" : ""}>${escapeHtml(v)}</option>`).join("");
    const topicSelect = `<label class="lab-filter">Topic <select id="lab-topic-filter" aria-label="Labs nach Topic filtern">${selectOptions(topics, LabViewState.topic, "Topics")}</select></label>`;
    const domainSelect = `<label class="lab-filter">Domäne <select id="lab-domain-filter" aria-label="Labs nach Domäne filtern">` +
      `<option value="">Alle Domänen</option>` + domainIds.map(id => `<option value="${escapeHtml(id)}" ${id === LabViewState.domain ? "selected" : ""}>${escapeHtml(domainLabel(id))}</option>`).join("") + `</select></label>`;
    const controls = `<div class="lab-navigation" aria-label="Lab-Navigation"><span>${visible.length} von ${allLabs.length} Labs</span>${topicSelect}${domainSelect}</div>`;
    if (!visible.length) { container.innerHTML = controls + `<p role="status">Keine Labs gefunden für „${escapeHtml(filterText || "die gewählten Filter")}“.</p>`; bindLabFilters(container, filterText); return; }

    const indexById = new Map(allLabs.map((l, i) => [l.id, i]));
    const html = visible.map(l => {
      const sequence = Number(l.sequence) || indexById.get(l.id) + 1;
      const topic = labText(l.topic, l.title || "Lab");
      const domainId = l.domainId || l.domain || "";
      const prerequisites = labArray(l.prerequisites || l.prerequisite).filter(Boolean);
      const previous = allLabs.find(candidate => Number(candidate.sequence) === sequence - 1);
      const done = ProgressTracker.isLabDone(l.id);
      const steps = labArray(l.steps);
      const artifacts = labArray(l.artifacts || l.deliverables);
      const refs = labArray(l.msLearnReferences || l.microsoftLearnReferences || l.msLearnUrls || l.references).filter(Boolean);
      const repo = l.repositoryUrl || l.repositoryLink || l.repository || l.repoUrl || l.githubUrl;
      const dependency = previous && !ProgressTracker.isLabDone(previous.id) ?
        `<div class="alert alert--warning lab-dependency" role="note"><strong>Vorausgesetztes Lab:</strong> ${escapeHtml(labText(previous.topic, previous.title))} (Lab ${Number(previous.sequence) || sequence - 1}) ist noch nicht erledigt.</div>` :
        (prerequisites.length ? `<div class="alert alert--info lab-dependency"><strong>Voraussetzungen:</strong> ${prerequisites.map(escapeHtml).join(", ")}</div>` : "");
      return `<details class="lab-card ${done ? "is-complete" : ""}" data-lab-id="${escapeHtml(l.id)}" data-sequence="${sequence}" data-topic="${escapeHtml(topic)}" data-domain="${escapeHtml(domainId)}">
        <summary class="lab-card__summary"><span class="badge">Lab ${sequence}</span><span class="lab-card__title">${escapeHtml(l.title || topic)}</span><span class="badge ${done ? "badge--success" : ""}">${done ? "Abgeschlossen" : escapeHtml(domainLabel(domainId))}</span></summary>
        <div class="lab-card__body">
        <p class="lab-card__topic"><strong>Topic:</strong> ${escapeHtml(topic)}</p>
        ${l.objective ? `<p><strong>Ziel:</strong> ${escapeHtml(l.objective)}</p>` : ""}
        ${dependency}
        ${steps.length ? `<h4>Schritte</h4><ol>${steps.map(s => `<li>${escapeHtml(s)}</li>`).join("")}</ol>` : ""}
        ${artifacts.length ? `<h4>Artefakte</h4><ul>${artifacts.map(a => `<li>${escapeHtml(a)}</li>`).join("")}</ul>` : ""}
        ${l.codeSnippet ? `<pre class="code-block"><code>${escapeHtml(l.codeSnippet)}</code></pre>` : ""}
        ${l.verification ? `<div class="alert alert--info"><strong>Verifikation:</strong>&nbsp;${escapeHtml(l.verification)}</div>` : ""}
        ${repo ? `<p><a href="${escapeHtml(repo)}" target="_blank" rel="noopener noreferrer">Repository öffnen ↗</a></p>` : ""}
        ${refs.length ? `<h4>Microsoft Learn</h4><ul>${refs.map(ref => { const url = typeof ref === "string" ? ref : (ref.url || ref.href); const title = typeof ref === "string" ? ref : (ref.title || ref.name || url); return url ? `<li><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(title)} ↗</a></li>` : ""; }).join("")}</ul>` : ""}
        <div class="lab-card__actions"><button type="button" class="btn btn--secondary lab-done-btn" data-lab-id="${escapeHtml(l.id)}" aria-pressed="${done}">${done ? "✓ Als abgeschlossen markiert" : "Als abgeschlossen markieren"}</button></div>
        </div>
      </details>`;
    }).join("");
    container.innerHTML = controls + html;
    bindLabFilters(container, filterText);
    container.querySelectorAll(".lab-done-btn").forEach(btn => btn.addEventListener("click", () => {
      ProgressTracker.markLabDone(btn.getAttribute("data-lab-id"));
      renderLabs(filterText);
      Announcer.say("Lab als abgeschlossen markiert.");
    }));
  }

  function bindLabFilters(container, filterText) {
    const topic = container.querySelector("#lab-topic-filter");
    const domain = container.querySelector("#lab-domain-filter");
    if (topic) topic.addEventListener("change", e => { LabViewState.topic = e.target.value; renderLabs(filterText); });
    if (domain) domain.addEventListener("change", e => { LabViewState.domain = e.target.value; renderLabs(filterText); });
  }

  /* ---------------- Exam Simulator ---------------- */
  const ExamSimulator = {
    durationSeconds: 45 * 60,
    questionCount: 30,
    state: null,
    timerHandle: null,

    init() {
      const startBtn = document.getElementById("exam-start-btn");
      if (startBtn) startBtn.addEventListener("click", () => this.start());
    },

    pickQuestions() {
      const pool = (Array.isArray(AB620_CONTENT.examBank) ? AB620_CONTENT.examBank : []).filter(q => q && q.id);
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      return pool.slice(0, Math.min(this.questionCount, pool.length));
    },

    start() {
      this.state = {
        questions: this.pickQuestions(),
        currentIndex: 0,
        answers: {},
        remainingSeconds: this.durationSeconds
      };
      document.getElementById("exam-start-btn").hidden = true;
      const timerEl = document.getElementById("exam-timer");
      if (timerEl) timerEl.hidden = false;
      document.getElementById("exam-results").innerHTML = "";
      this.renderQuestion();
      this.startTimer();
      Announcer.say("Prüfungssimulation gestartet. " + this.state.questions.length + " Fragen, 45 Minuten Zeit.");
    },

    startTimer() {
      clearInterval(this.timerHandle);
      this.updateTimerDisplay();
      this.timerHandle = setInterval(() => {
        this.state.remainingSeconds--;
        this.updateTimerDisplay();
        if (this.state.remainingSeconds <= 0) {
          clearInterval(this.timerHandle);
          this.finish(true);
        }
      }, 1000);
    },

    updateTimerDisplay() {
      const el = document.getElementById("exam-timer");
      if (!el) return;
      const s = Math.max(0, this.state.remainingSeconds);
      const m = Math.floor(s / 60);
      const sec = s % 60;
      el.textContent = `⏱ ${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
      el.classList.toggle("is-critical", s <= 120);
    },

    renderQuestion() {
      const area = document.getElementById("exam-question-area");
      if (!area) return;
      const total = this.state.questions.length;
      const idx = this.state.currentIndex;
      const q = this.state.questions[idx];
      if (!q) {
        area.innerHTML = '<p role="status">Keine Prüfungsfragen verfügbar.</p>';
        return;
      }
      const selected = this.state.answers[q.id];
      const questionOptions = Array.isArray(q.options) ? q.options : [];

      area.innerHTML = `
        <div class="exam-progress">
          <span class="exam-question-counter">Frage ${idx + 1} von ${total}</span>
          <span class="badge">${escapeHtml(domainLabel(q.domain))}</span>
        </div>
        <div class="quiz-card">
          <p class="quiz-card__question">${escapeHtml(q.question)}</p>
          <div class="quiz-options" role="radiogroup" aria-label="Antwortoptionen Frage ${idx + 1}">
            ${questionOptions.map((opt, oi) => `
              <button type="button" class="quiz-option" role="radio"
                aria-checked="${selected === oi ? "true" : "false"}"
                data-option-index="${oi}" tabindex="${oi === 0 ? "0" : "-1"}">
                ${escapeHtml(opt)}
              </button>`).join("")}
          </div>
        </div>
        <div style="display:flex; justify-content:space-between; margin-top:16px; gap:8px; flex-wrap:wrap;">
          <button type="button" class="btn btn--secondary" id="exam-prev-btn" ${idx === 0 ? "disabled" : ""}>← Zurück</button>
          <button type="button" class="btn btn--primary" id="exam-next-btn">
            ${idx === total - 1 ? "Prüfung abgeben" : "Weiter →"}
          </button>
        </div>
      `;

      const options = Array.from(area.querySelectorAll(".quiz-option"));
      options.forEach((btn, oi) => {
        btn.addEventListener("click", () => {
          this.state.answers[q.id] = oi;
          options.forEach(o => o.setAttribute("aria-checked", "false"));
          btn.setAttribute("aria-checked", "true");
        });
        btn.addEventListener("keydown", (e) => {
          const idxOpt = options.indexOf(document.activeElement);
          if (["ArrowDown", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
            const next = options[(idxOpt + 1) % options.length];
            options.forEach(o => o.setAttribute("tabindex", "-1"));
            next.setAttribute("tabindex", "0"); next.focus();
          } else if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
            e.preventDefault();
            const prev = options[(idxOpt - 1 + options.length) % options.length];
            options.forEach(o => o.setAttribute("tabindex", "-1"));
            prev.setAttribute("tabindex", "0"); prev.focus();
          } else if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            document.activeElement.click();
          }
        });
      });

      document.getElementById("exam-prev-btn").addEventListener("click", () => {
        this.state.currentIndex = Math.max(0, this.state.currentIndex - 1);
        this.renderQuestion();
      });
      document.getElementById("exam-next-btn").addEventListener("click", () => {
        if (this.state.currentIndex < total - 1) {
          this.state.currentIndex++;
          this.renderQuestion();
        } else {
          this.finish(false);
        }
      });
    },

    finish(timedOut) {
      clearInterval(this.timerHandle);
      const area = document.getElementById("exam-question-area");
      const timerEl = document.getElementById("exam-timer");
      if (area) area.innerHTML = "";
      if (timerEl) timerEl.hidden = true;

      const questions = this.state.questions;
      const answers = this.state.answers;
      let correctCount = 0;
      const byDomain = {};

      questions.forEach(q => {
        const domain = q.domain;
        if (!byDomain[domain]) byDomain[domain] = { correct: 0, total: 0 };
        byDomain[domain].total++;
        const given = answers[q.id];
        const isCorrect = given === q.correctIndex;
        if (isCorrect) { correctCount++; byDomain[domain].correct++; }
      });

      const scaledScore = questions.length ? Math.round((correctCount / questions.length) * 1000) : 0;
      const passed = scaledScore >= 700;

      const domainRows = Object.keys(byDomain).map(dId => {
        const d = byDomain[dId];
        const pct = Math.round((d.correct / d.total) * 100);
        return `
          <div class="exam-results__domain-row">
            <span style="min-width:220px;">${escapeHtml(domainLabel(dId))}</span>
            <div class="exam-results__domain-bar"><div class="exam-results__domain-fill" style="width:${pct}%"></div></div>
            <span>${d.correct}/${d.total}</span>
          </div>`;
      }).join("");

      const reviewHtml = questions.map((q, i) => {
        const qOptions = Array.isArray(q.options) ? q.options : [];
        const given = answers[q.id];
        const isCorrect = given === q.correctIndex;
        return `
          <div class="review-item">
            <p><span class="review-item__status ${isCorrect ? "correct" : "incorrect"}">${isCorrect ? "✓ Richtig" : "✗ Falsch"}</span> — Frage ${i + 1}: ${escapeHtml(q.question)}</p>
            <p>Ihre Antwort: ${given !== undefined ? escapeHtml(qOptions[given] || "(unbekannte Antwort)") : "(keine Antwort)"}</p>
            ${!isCorrect ? `<p>Korrekte Antwort: ${escapeHtml(qOptions[q.correctIndex] || "(nicht angegeben)")}</p>` : ""}
            <p>${escapeHtml(q.explanation)}</p>
            <p><a href="${escapeHtml(q.msLearnUrl)}" target="_blank" rel="noopener noreferrer">Microsoft Learn Referenz ↗</a></p>
          </div>`;
      }).join("");

      const resultsEl = document.getElementById("exam-results");
      resultsEl.innerHTML = `
        ${timedOut ? '<div class="alert alert--warning">Die Zeit ist abgelaufen. Ihre bisherigen Antworten wurden gewertet.</div>' : ""}
        <div class="exam-results__score">
          <div class="score-ring" style="--pct:${questions.length ? Math.round((correctCount/questions.length)*100) : 0}">
            <span class="score-ring__value">${scaledScore}</span>
          </div>
          <div>
            <h3>${passed ? "Bestanden ✓" : "Nicht bestanden"}</h3>
            <p>${scaledScore} von 1000 Punkten (Bestehensgrenze: 700) — ${correctCount} von ${questions.length} Fragen richtig.</p>
          </div>
        </div>
        <h4>Ergebnis nach Domäne</h4>
        ${domainRows}
        <h4 style="margin-top:24px;">Vollständiger Review</h4>
        ${reviewHtml}
        <button type="button" class="btn btn--primary" id="exam-restart-btn" style="margin-top:16px;">Neue Prüfungssimulation starten</button>
      `;

      document.getElementById("exam-restart-btn").addEventListener("click", () => {
        document.getElementById("exam-start-btn").hidden = false;
        resultsEl.innerHTML = "";
      });

      Announcer.say(`Prüfung beendet. Ergebnis: ${scaledScore} von 1000 Punkten. ${passed ? "Bestanden." : "Nicht bestanden."}`);
    }
  };

  /* ---------------- Search ---------------- */
  function initSearch() {
    const input = document.getElementById("search-input");
    if (!input) return;
    input.addEventListener("input", () => {
      renderModules(input.value);
      renderLabs(input.value);
    });
  }

  /* ---------------- Bootstrap ---------------- */
  document.addEventListener("DOMContentLoaded", () => {
    try { ThemeManager.init(); } catch (e) { console.error("ThemeManager.init failed:", e); }
    try { renderModules(""); } catch (e) { console.error("renderModules failed:", e); }
    try { renderLabs(""); } catch (e) { console.error("renderLabs failed:", e); }
    try { ExamSimulator.init(); } catch (e) { console.error("ExamSimulator.init failed:", e); }
    try { initSearch(); } catch (e) { console.error("initSearch failed:", e); }
    try { Dashboard.refresh(); } catch (e) { console.error("Dashboard.refresh failed:", e); }
  });

  window.AB620_APP = { ThemeManager, ProgressTracker, ExamSimulator, renderModules, renderLabs };
})();
