/* ============================================================================
   FIELD GUIDE · Vol. I — Insecta & Aves  (app.js · vanilla JS, no framework)
   ----------------------------------------------------------------------------
   Views:      #/  (home) · #/species/:id · #/notebook · #/compare
   Storage:    fieldguide.notes.v1   — per-species field notes
               fieldguide.compare.v1 — comparison tray (max 4)
   Data:       everything comes from data.js (SPECIES). Add a species there
               and every view below picks it up automatically.
   ============================================================================ */

"use strict";

/* -------------------------------------------------------------------------- */
/*  utilities                                                                  */
/* -------------------------------------------------------------------------- */

const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

const pad3 = (n) => String(n).padStart(3, "0");

const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode */ }
  },
};

let toastTimer;
function toast(msg) {
  let t = $(".toast");
  if (!t) {
    t = document.createElement("div");
    t.className = "toast";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  requestAnimationFrame(() => t.classList.add("show"));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

/* -------------------------------------------------------------------------- */
/*  data access                                                                */
/* -------------------------------------------------------------------------- */

const BY_ID = Object.fromEntries(SPECIES.map((s, i) => [s.id, { ...s, no: i + 1 }]));
const CLASSES = [...new Set(SPECIES.map((s) => s.class))];

const state = {
  query: "",
  sort: "catalog",
  compare: store.get("fieldguide.compare.v1", []),
  notes: store.get("fieldguide.notes.v1", {}),
};

const MAX_COMPARE = 4;

function sortedFiltered() {
  const q = state.query.trim().toLowerCase();
  let list = SPECIES.map((s, i) => ({ ...s, no: i + 1 }));
  if (q) {
    list = list.filter((s) =>
      [s.common, s.latin, s.family, s.order, s.class, ...(s.tags || [])]
        .join(" ").toLowerCase().includes(q)
    );
  }
  const byName = (a, b) => a.common.localeCompare(b.common);
  if (state.sort === "name-asc") list.sort(byName);
  if (state.sort === "name-desc") list.sort((a, b) => -byName(a, b));
  if (state.sort === "family") list.sort((a, b) => a.family.localeCompare(b.family) || byName(a, b));
  return list;
}

/* -------------------------------------------------------------------------- */
/*  illustrated plates (used when a species has no verified 3D model)          */
/* -------------------------------------------------------------------------- */

function plateSVG(cls) {
  if (cls === "Aves") {
    return `
    <svg viewBox="0 0 200 170" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <path d="M52 128 C60 96 84 74 116 66 C132 62 148 64 158 72"/>
      <path d="M158 72 L176 78 L159 84"/>
      <path d="M158 72 C160 88 152 104 134 116 C112 130 82 134 52 128 Z"/>
      <circle cx="150" cy="76" r="2.4" fill="currentColor" stroke="none"/>
      <path d="M84 84 C100 82 116 88 126 100 C112 104 96 102 84 96 Z" opacity=".65"/>
      <path d="M52 128 L22 142 M58 130 L34 150" opacity=".8"/>
      <path d="M98 130 L96 148 M110 128 L110 148"/>
      <path d="M88 148 H124" stroke-dasharray="3 4"/>
      <path d="M64 60 L136 60 M64 54 L136 54" opacity=".25"/>
    </svg>`;
  }
  return `
    <svg viewBox="0 0 200 170" fill="none" stroke="currentColor" stroke-width="2"
         stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <ellipse cx="100" cy="88" rx="7" ry="34"/>
      <circle cx="100" cy="46" r="8"/>
      <path d="M95 40 C86 26 76 22 68 20 M105 40 C114 26 124 22 132 20"/>
      <path d="M94 66 C64 40 34 42 30 70 C27 92 52 104 92 92 Z"/>
      <path d="M106 66 C136 40 166 42 170 70 C173 92 148 104 108 92 Z"/>
      <path d="M93 96 C72 108 62 126 74 134 C86 141 96 126 98 112 Z"/>
      <path d="M107 96 C128 108 138 126 126 134 C114 141 104 126 102 112 Z"/>
      <path d="M42 66 C56 62 74 68 88 82 M158 66 C144 62 126 68 112 82" opacity=".45"/>
      <path d="M40 150 H160" stroke-dasharray="3 5" opacity=".5"/>
    </svg>`;
}

/* -------------------------------------------------------------------------- */
/*  3D stage builders                                                          */
/* -------------------------------------------------------------------------- */

const sketchfabURL = (uid) =>
  `https://sketchfab.com/models/${uid}/embed?autostart=1&autospin=0.15&ui_infos=0&ui_stop=0&camera=0&dnt=1`;

const sketchfabPage = (uid) => `https://sketchfab.com/models/${uid}`;

/* Google's <model-viewer> is loaded on demand, only when a glb() entry exists. */
let mvPromise = null;
function ensureModelViewer() {
  if (!mvPromise) {
    mvPromise = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.type = "module";
      s.src = "https://cdn.jsdelivr.net/npm/@google/model-viewer@3/dist/model-viewer.min.js";
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  return mvPromise;
}

function stageHTML(s, { mini = false } = {}) {
  const m = s.model;
  if (m && m.type === "sketchfab") {
    return `<iframe title="3D model — ${esc(s.common)}" src="${sketchfabURL(m.uid)}"
      allow="autoplay; fullscreen; xr-spatial-tracking" allowfullscreen loading="lazy"></iframe>`;
  }
  if (m && m.type === "glb") {
    ensureModelViewer().catch(() => toast("Could not load the 3D viewer library"));
    return `<model-viewer src="${esc(m.src)}" camera-controls auto-rotate
      shadow-intensity="0.8" exposure="1" loading="lazy"
      aria-label="3D model — ${esc(s.common)}"></model-viewer>`;
  }
  if (mini) return `<div class="mini-plate">${plateSVG(s.class)}</div>`;
  const findURL = `https://sketchfab.com/search?type=models&q=${encodeURIComponent(s.latin)}`;
  return `
    <div class="plate">
      ${plateSVG(s.class)}
      <div class="plate-caption">Plate ${pad3(s.no)} · No verified 3D specimen on file</div>
      <a class="btn small" href="${findURL}" target="_blank" rel="noopener">Find a 3D model ↗</a>
      <div class="micro" style="color:var(--ink-soft); letter-spacing:.1em">
        found one? drop its UID into data.js — one line
      </div>
    </div>`;
}

function attributionHTML(s) {
  const m = s.model;
  if (!m) {
    return `<div class="attribution"><span>3D RECORD — pending · illustrated plate shown</span></div>`;
  }
  if (m.type === "sketchfab") {
    return `<div class="attribution">
      <span>3D MODEL — ${esc(m.author)} · license: ${esc(m.license)} · via Sketchfab</span>
      <a href="${sketchfabPage(m.uid)}" target="_blank" rel="noopener">model source ↗</a>
    </div>`;
  }
  return `<div class="attribution">
    <span>3D MODEL — ${esc(m.author)} · ${esc(m.license || "self-hosted glTF")}</span>
    <a href="${esc(m.src)}" target="_blank" rel="noopener">file ↗</a>
  </div>`;
}

/* -------------------------------------------------------------------------- */
/*  sidebar                                                                    */
/* -------------------------------------------------------------------------- */

function renderSidebar() {
  const nav = $("#nav");
  const list = sortedFiltered();
  const visible = new Set(list.map((s) => s.id));
  const route = currentRoute();

  const viewLink = (hash, label, key) =>
    `<a href="${hash}" class="${route.name === key ? "active" : ""}">${label}</a>`;

  let html = `<div class="nav-views">
    ${viewLink("#/", "Index", "home")}
    ${viewLink("#/notebook", "Notebook", "notebook")}
    ${viewLink("#/compare", `Compare${state.compare.length ? ` · ${state.compare.length}` : ""}`, "compare")}
  </div>`;

  if (!list.length) {
    html += `<div class="nav-empty">No specimens match “${esc(state.query)}”.<br>Try a family, a tag, or a Latin name.</div>`;
  }

  for (const cls of CLASSES) {
    const inClass = list.filter((s) => s.class === cls);
    if (!inClass.length) continue;
    const total = SPECIES.filter((s) => s.class === cls).length;
    html += `<div class="class-group">
      <div class="class-head">
        <span class="name">${esc(cls)}</span>
        <span class="rule"></span>
        <span class="count">${inClass.length}/${total}</span>
      </div>`;

    const families = [...new Set(inClass.map((s) => s.family))].sort();
    for (const fam of families) {
      html += `<span class="family-head">${esc(fam)}</span>`;
      for (const s of inClass.filter((x) => x.family === fam)) {
        const active = route.name === "species" && route.id === s.id;
        const inCmp = state.compare.includes(s.id);
        html += `
        <div class="species-row ${active ? "active" : ""}" data-go="#/species/${s.id}" role="link" tabindex="0">
          <span class="idx">${pad3(s.no)}</span>
          <span class="swap">
            <span class="common">${esc(s.common)}</span>
            <span class="latin">${esc(s.latin)}</span>
          </span>
          <button class="cmp-toggle ${inCmp ? "in" : ""}" data-compare="${s.id}"
            title="${inCmp ? "Remove from" : "Add to"} comparison" aria-pressed="${inCmp}">
            ${inCmp ? "−" : "+"}
          </button>
        </div>`;
      }
    }
    html += `</div>`;
  }

  nav.innerHTML = html;
  $("#matchCount").textContent =
    state.query || state.sort !== "catalog"
      ? `${list.length} of ${SPECIES.length} specimens`
      : `${SPECIES.length} specimens on file`;
}

/* -------------------------------------------------------------------------- */
/*  views                                                                      */
/* -------------------------------------------------------------------------- */

function viewHome() {
  const families = new Set(SPECIES.map((s) => s.family)).size;
  const withModels = SPECIES.filter((s) => s.model).length;
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 864e5);
  const spot = { ...SPECIES[dayOfYear % SPECIES.length] };
  spot.no = SPECIES.indexOf(SPECIES.find((x) => x.id === spot.id)) + 1;

  return `
  <section class="home-hero">
    <span class="micro">${esc(GUIDE_META.volume)} · compiled ${esc(GUIDE_META.compiled)}</span>
    <h1>A working cabinet of <em>insects</em> &amp; <em>birds</em>.</h1>
    <p class="lede">
      Every specimen in this drawer carries a real, orbit-able 3D model — drag it, turn it,
      get closer than the glass ever lets you. Species without a verified model keep an
      illustrated plate until one is found.
    </p>
  </section>

  <div class="stat-row">
    <div class="stat"><div class="n">${SPECIES.length}</div><div class="l">species on file</div></div>
    <div class="stat"><div class="n">${families}</div><div class="l">families</div></div>
    <div class="stat"><div class="n">${withModels}</div><div class="l">3D specimens</div></div>
  </div>

  <div class="how">
    <h2>How to work the cabinet</h2>
    <ol>
      <li><span><b>Browse the index.</b> The sidebar files species by class and family. Search by name, family or tag; sort with the dropdown. Press <b>/</b> to jump to search.</span></li>
      <li><span><b>Orbit the specimen.</b> On a species page, drag to rotate the 3D model, scroll to zoom. No model yet? The plate links straight to a search for one.</span></li>
      <li><span><b>Keep field notes.</b> Each species page has a notes card; everything is saved to this browser automatically and gathered under <b>Notebook</b>.</span></li>
      <li><span><b>Compare up to four.</b> Tap <b>+</b> beside any species to load the comparison tray, then open <b>Compare</b> for a side-by-side ledger — 3D included.</span></li>
    </ol>
  </div>

  <a class="spotlight" href="#/species/${spot.id}">
    <div>
      <span class="micro">Specimen of the day · № ${pad3(spot.no)}</span>
      <div class="name">${esc(spot.common)}</div>
      <div class="latin">${esc(spot.latin)}</div>
    </div>
    <span class="go">OPEN FILE →</span>
  </a>`;
}

function viewSpecies(id) {
  const s = BY_ID[id];
  if (!s) {
    return `<div class="empty-state"><div class="glyph">?</div>
      <p>№ “${esc(id)}” is not in this cabinet.</p>
      <a class="btn small" href="#/" style="margin-top:14px">Back to the index</a></div>`;
  }
  const i = SPECIES.findIndex((x) => x.id === id);
  const prev = SPECIES[(i - 1 + SPECIES.length) % SPECIES.length];
  const next = SPECIES[(i + 1) % SPECIES.length];
  const note = state.notes[id]?.text || "";
  const inCmp = state.compare.includes(id);
  const has3D = !!s.model;

  return `
  <div class="crumb micro">
    <span class="idx-no">№ ${pad3(s.no)}</span><span class="sep">/</span>
    <span>${esc(s.class)}</span><span class="sep">/</span>
    <span>${esc(s.order)}</span><span class="sep">/</span>
    <span>${esc(s.family)}</span>
  </div>

  <header class="species-head">
    <h1>${esc(s.common)}</h1>
    <div class="latin">${esc(s.latin)}</div>
    <div class="head-actions">
      <button class="btn ${inCmp ? "solid" : ""}" data-compare="${s.id}">
        ${inCmp ? "✓ In comparison" : "+ Compare"}
      </button>
      <a class="btn" href="#/notebook">Notebook</a>
    </div>
  </header>

  <div class="stage-wrap">
    <div class="stage">
      <span class="stage-label">${has3D ? `FIG. ${pad3(s.no)} — ORBIT VIEW` : `PLATE ${pad3(s.no)} — ILLUSTRATION`}</span>
      ${stageHTML(s)}
      ${has3D ? `<span class="stage-hint">drag to orbit · scroll to zoom</span>` : ""}
    </div>
    ${attributionHTML(s)}
  </div>

  <p class="blurb">${esc(s.blurb)}</p>

  <dl class="ledger">
    <div class="ledger-row"><dt>Family</dt><dd>${esc(s.family)} · <em>${esc(s.order)}</em></dd></div>
    <div class="ledger-row"><dt>Range</dt><dd>${esc(s.range)}</dd></div>
    <div class="ledger-row"><dt>Diet</dt><dd>${esc(s.diet)}</dd></div>
    <div class="ledger-row"><dt>Ecological role</dt><dd>${esc(s.role)}</dd></div>
    <div class="ledger-row"><dt>Field marks</dt>
      <dd><span class="tagset">
        <span class="tag class-chip">${esc(s.class)}</span>
        ${s.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}
      </span></dd>
    </div>
  </dl>

  <div class="notes-card">
    <div class="notes-head">
      <span class="micro">Field notes — ${esc(s.common)}</span>
      <span class="notes-status" id="noteStatus"></span>
    </div>
    <textarea id="noteArea" placeholder="Date, location, behaviour, weather…" spellcheck="false">${esc(note)}</textarea>
  </div>

  <nav class="pager">
    <a href="#/species/${prev.id}">← ${pad3(SPECIES.indexOf(prev) + 1)} · ${esc(prev.common)}</a>
    <a href="#/species/${next.id}">${pad3(SPECIES.indexOf(next) + 1)} · ${esc(next.common)} →</a>
  </nav>`;
}

function fmtWhen(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) +
    " · " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
}

function viewNotebook() {
  const entries = Object.entries(state.notes)
    .filter(([, n]) => n.text && n.text.trim())
    .sort((a, b) => b[1].updated - a[1].updated);

  let body;
  if (!entries.length) {
    body = `<div class="empty-state">
      <div class="glyph">✎</div>
      <p>No field notes yet.<br>Open any species and start writing — notes save automatically in this browser.</p>
      <a class="btn small" href="#/" style="margin-top:16px">Browse the index</a>
    </div>`;
  } else {
    body = entries.map(([id, n]) => {
      const s = BY_ID[id];
      if (!s) return "";
      return `<article class="note-entry">
        <div class="note-head">
          <span class="idx">№ ${pad3(s.no)}</span>
          <a href="#/species/${s.id}">${esc(s.common)}</a>
          <span class="when">${fmtWhen(n.updated)}</span>
          <button class="del" data-delnote="${esc(id)}">DELETE</button>
        </div>
        <div class="note-body">${esc(n.text)}</div>
      </article>`;
    }).join("");
  }

  return `
  <div class="view-head">
    <h1>Field notebook</h1>
    <div class="actions">
      ${entries.length ? `<button class="btn small" data-action="export-notes">Export .md</button>` : ""}
      ${entries.length ? `<button class="btn small danger" data-action="clear-notes">Clear all</button>` : ""}
    </div>
  </div>
  ${body}`;
}

function viewCompare() {
  const sel = state.compare.map((id) => BY_ID[id]).filter(Boolean);

  const picker = `<div class="cmp-picker">
    ${SPECIES.map((s, i) => {
      const inCmp = state.compare.includes(s.id);
      return `<button class="cmp-chip ${inCmp ? "in" : ""}" data-compare="${s.id}">
        ${pad3(i + 1)} ${esc(s.common)}</button>`;
    }).join("")}
  </div>
  <div class="cmp-hint">SELECT 2–4 SPECIMENS FOR THE LEDGER · ${sel.length}/${MAX_COMPARE} LOADED</div>`;

  if (sel.length < 2) {
    return `
    <div class="view-head"><h1>Comparison tray</h1></div>
    ${picker}
    <div class="empty-state">
      <div class="glyph">⧉</div>
      <p>${sel.length === 0
        ? "The tray is empty. Pick at least two specimens above, or tap + beside any species in the index."
        : "One specimen loaded — add at least one more to open the ledger."}</p>
    </div>`;
  }

  const rows = [
    ["Class", (s) => esc(s.class)],
    ["Order", (s) => esc(s.order)],
    ["Family", (s) => esc(s.family)],
    ["Range", (s) => esc(s.range)],
    ["Diet", (s) => esc(s.diet)],
    ["Ecological role", (s) => esc(s.role)],
    ["Field marks", (s) => `<span class="tagset">${s.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</span>`],
    ["3D record", (s) => s.model
      ? `${esc(s.model.author)} · <a class="cell-link" href="${s.model.type === "sketchfab" ? sketchfabPage(s.model.uid) : esc(s.model.src)}" target="_blank" rel="noopener">source ↗</a>`
      : "pending — plate on file"],
    ["File", (s) => `<a class="cell-link" href="#/species/${s.id}">open № ${pad3(s.no)} →</a>`],
  ];

  return `
  <div class="view-head"><h1>Comparison tray</h1></div>
  ${picker}
  <div class="cmp-scroll">
    <table class="compare">
      <thead><tr>
        <th class="row-label">Ledger</th>
        ${sel.map((s) => `
        <th class="col-head">
          <div class="mini-stage">
            <button class="col-x" data-compare="${s.id}" title="Remove">×</button>
            ${stageHTML(s, { mini: true })}
          </div>
          <div class="col-name">${esc(s.common)}</div>
          <div class="col-latin">${esc(s.latin)}</div>
        </th>`).join("")}
      </tr></thead>
      <tbody>
        ${rows.map(([label, fn]) => `
        <tr>
          <th class="row-label">${label}</th>
          ${sel.map((s) => `<td>${fn(s)}</td>`).join("")}
        </tr>`).join("")}
      </tbody>
    </table>
  </div>`;
}

/* -------------------------------------------------------------------------- */
/*  notes + compare actions                                                    */
/* -------------------------------------------------------------------------- */

function saveNote(id, text, statusEl) {
  if (statusEl) statusEl.textContent = "saving…";
  clearTimeout(saveNote._t);
  saveNote._t = setTimeout(() => {
    if (text.trim()) state.notes[id] = { text, updated: Date.now() };
    else delete state.notes[id];
    store.set("fieldguide.notes.v1", state.notes);
    if (statusEl) statusEl.textContent = text.trim() ? "— saved" : "";
  }, 350);
}

function toggleCompare(id) {
  const at = state.compare.indexOf(id);
  if (at >= 0) {
    state.compare.splice(at, 1);
  } else {
    if (state.compare.length >= MAX_COMPARE) {
      toast(`The tray holds ${MAX_COMPARE} specimens — remove one first`);
      return;
    }
    state.compare.push(id);
    const s = BY_ID[id];
    toast(`№ ${pad3(s.no)} ${s.common} → comparison tray`);
  }
  store.set("fieldguide.compare.v1", state.compare);
  render();
}

function exportNotes() {
  const lines = ["# Field notes — " + GUIDE_META.title + " " + GUIDE_META.volume, ""];
  Object.entries(state.notes)
    .filter(([, n]) => n.text && n.text.trim())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .forEach(([id, n]) => {
      const s = BY_ID[id];
      if (!s) return;
      lines.push(`## № ${pad3(s.no)} · ${s.common} (*${s.latin}*)`);
      lines.push(`_${fmtWhen(n.updated)}_`, "", n.text.trim(), "");
    });
  const blob = new Blob([lines.join("\n")], { type: "text/markdown" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "field-notes.md";
  a.click();
  URL.revokeObjectURL(a.href);
  toast("Notebook exported as field-notes.md");
}

/* -------------------------------------------------------------------------- */
/*  router                                                                     */
/* -------------------------------------------------------------------------- */

function currentRoute() {
  const h = location.hash.replace(/^#\/?/, "");
  if (h.startsWith("species/")) return { name: "species", id: h.slice(8) };
  if (h === "notebook") return { name: "notebook" };
  if (h === "compare") return { name: "compare" };
  return { name: "home" };
}

function render() {
  const route = currentRoute();
  const main = $("#view");
  if (route.name === "species") main.innerHTML = viewSpecies(route.id);
  else if (route.name === "notebook") main.innerHTML = viewNotebook();
  else if (route.name === "compare") main.innerHTML = viewCompare();
  else main.innerHTML = viewHome();

  const s = route.name === "species" ? BY_ID[route.id] : null;
  document.title = s
    ? `${s.common} · ${GUIDE_META.title}`
    : `${route.name === "home" ? GUIDE_META.title + " — " + GUIDE_META.volume
        : route.name[0].toUpperCase() + route.name.slice(1)} · ${GUIDE_META.title}`;

  renderSidebar();
  $("#main").scrollTop = 0;
  if (window.innerWidth <= 980) closeSidebar();
}

/* -------------------------------------------------------------------------- */
/*  events                                                                     */
/* -------------------------------------------------------------------------- */

function closeSidebar() {
  $("#sidebar").classList.remove("open");
  $("#scrim").classList.remove("on");
}

function bindEvents() {
  window.addEventListener("hashchange", render);

  $("#search").addEventListener("input", (e) => {
    state.query = e.target.value;
    renderSidebar();
  });

  $("#sort").addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderSidebar();
  });

  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "");
    if (e.key === "/" && !typing) {
      e.preventDefault();
      if (window.innerWidth <= 980) { $("#sidebar").classList.add("open"); $("#scrim").classList.add("on"); }
      $("#search").focus();
    }
    if (e.key === "Escape") {
      state.query = "";
      $("#search").value = "";
      renderSidebar();
      closeSidebar();
    }
  });

  $("#menuToggle").addEventListener("click", () => {
    const open = $("#sidebar").classList.toggle("open");
    $("#scrim").classList.toggle("on", open);
  });
  $("#scrim").addEventListener("click", closeSidebar);

  /* delegated clicks: navigation rows, compare toggles, note actions */
  document.addEventListener("click", (e) => {
    const cmpBtn = e.target.closest("[data-compare]");
    if (cmpBtn) {
      e.stopPropagation();
      toggleCompare(cmpBtn.dataset.compare);
      return;
    }
    const row = e.target.closest("[data-go]");
    if (row) { location.hash = row.dataset.go; return; }

    const del = e.target.closest("[data-delnote]");
    if (del) {
      delete state.notes[del.dataset.delnote];
      store.set("fieldguide.notes.v1", state.notes);
      render();
      toast("Note deleted");
      return;
    }
    const act = e.target.closest("[data-action]");
    if (act?.dataset.action === "export-notes") exportNotes();
    if (act?.dataset.action === "clear-notes") {
      if (confirm("Delete every field note in this browser?")) {
        state.notes = {};
        store.set("fieldguide.notes.v1", state.notes);
        render();
        toast("Notebook cleared");
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.matches?.("[data-go]")) location.hash = e.target.dataset.go;
  });

  /* notes textarea autosave (delegate, survives re-renders) */
  document.addEventListener("input", (e) => {
    if (e.target.id === "noteArea") {
      const route = currentRoute();
      if (route.name === "species") saveNote(route.id, e.target.value, $("#noteStatus"));
    }
  });
}

/* -------------------------------------------------------------------------- */
/*  boot                                                                       */
/* -------------------------------------------------------------------------- */

bindEvents();
render();
