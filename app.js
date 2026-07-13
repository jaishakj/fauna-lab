/* ============================================================
   FAUNA LAB — APP LOGIC
   ============================================================ */
(function(){
"use strict";

/* ---------- helpers ---------- */
const $ = (sel, el=document) => el.querySelector(sel);
const $$ = (sel, el=document) => Array.from(el.querySelectorAll(sel));
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const byId = id => SPECIES.find(s => s.id === id);
const catInfo = key => CATEGORIES.find(c => c.key === key);
const hashOf = s => s.split('#')[1] ? '#'+s.split('#')[1] : s;

function strHash(str){ let h=0; for(let i=0;i<str.length;i++){ h = (h*31 + str.charCodeAt(i)) >>> 0; } return h; }

const CHIP_PALETTE = [
  {bg:'#DCEAF3', ink:'#3E6E93'}, {bg:'#E1EFDD', ink:'#4A7A3E'},
  {bg:'#F5DEDC', ink:'#A24B3E'}, {bg:'#F3E7C4', ink:'#8A6B1E'},
  {bg:'#E7DFF3', ink:'#6B4FA0'}, {bg:'#E8D9C8', ink:'#7A5231'},
];
const BADGE_PALETTE = [
  {bg:'#E7DFF3', ink:'#6B4FA0'}, {bg:'#F5DEDC', ink:'#A24B3E'},
  {bg:'#DCEAF3', ink:'#3E6E93'}, {bg:'#E1EFDD', ink:'#4A7A3E'},
  {bg:'#F3E7C4', ink:'#8A6B1E'},
];
const PH_GRADIENTS = {
  bees:['#D8A93F','#B07C1F'], butterflies:['#C2603A','#8F3F23'], moths:['#6E5A8B','#4A3A63'],
  beetles:['#6E8B5E','#476139'], dragonflies:['#3E8B93','#255E64'], wasps:['#BE6A2C','#8A4718'],
  ants:['#7A5B3E','#523C29'], hummingbirds:['#C2603A','#93472A'], songbirds:['#8B6E4C','#61492F'],
  raptors:['#5C6B4C','#3C4630'], owls:['#5B5240','#3A342A'], waterfowl:['#3E7A8B','#28535F'],
};

function chipStyle(text){ const p = CHIP_PALETTE[strHash(text)%CHIP_PALETTE.length]; return `background:${p.bg};color:${p.ink}`; }
function badgeStyle(text){ const p = BADGE_PALETTE[strHash(text)%BADGE_PALETTE.length]; return `background:${p.bg};color:${p.ink}`; }
function phGradient(catKey){ const g = PH_GRADIENTS[catKey]||['#8B7B5E','#61533C']; return `linear-gradient(150deg, ${g[0]}, ${g[1]})`; }
function commonsSearchUrl(q){ return `https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(q)}&title=Special:MediaSearch&type=image`; }

/* ---------- storage ---------- */
const Store = {
  notesKey: 'faunalab.notes.v1',
  compareKey: 'faunalab.compare.v1',
  getNotes(){ try{ return JSON.parse(localStorage.getItem(this.notesKey)) || {}; }catch(e){ return {}; } },
  saveNote(id, text){
    const all = this.getNotes();
    if(!all[id]) all[id] = [];
    all[id].unshift({ text, date: new Date().toISOString() });
    localStorage.setItem(this.notesKey, JSON.stringify(all));
  },
  deleteNoteAt(id, idx){
    const all = this.getNotes();
    if(all[id]){ all[id].splice(idx,1); if(!all[id].length) delete all[id]; }
    localStorage.setItem(this.notesKey, JSON.stringify(all));
  },
  getCompare(){ try{ return JSON.parse(localStorage.getItem(this.compareKey)) || []; }catch(e){ return []; } },
  setCompare(list){ localStorage.setItem(this.compareKey, JSON.stringify(list)); }
};

/* ---------- state ---------- */
const state = {
  view:'collection', speciesId:null, classFilter:null, categoryFilter:null, habitatFilter:null,
  query:'', sort:'guide', searchOpen:false,
  rotate:0, zoomIdx:1, scopeOn:false, autoRotateTimer:null, show3D:false,
  compare: Store.getCompare(), sidebarOpen:false, detailOpenMobile:false,
  openGroups:{Insects:true, Birds:true},
  quote: QUOTES[Math.floor(Math.random()*QUOTES.length)],
  discovery: DISCOVERIES[Math.floor(Math.random()*DISCOVERIES.length)],
};

/* ---------- routing ---------- */
function parseRoute(){
  const h = location.hash.replace(/^#\/?/, '');
  const parts = h.split('/').filter(Boolean);
  if(parts[0] === 'species' && parts[1]){ state.view='detail'; state.speciesId=decodeURIComponent(parts[1]); return; }
  if(parts[0] === 'notes'){ state.view='notes'; return; }
  if(parts[0] === 'learn'){ state.view='learn'; return; }
  state.view='collection';
  state.classFilter=null; state.categoryFilter=null; state.habitatFilter=null; state.query='';
  for(let i=1;i<parts.length;i+=2){
    const k=parts[i], v=decodeURIComponent(parts[i+1]||'');
    if(k==='cat') state.categoryFilter=v;
    if(k==='class') state.classFilter=v;
    if(k==='habitat') state.habitatFilter=v;
    if(k==='q') state.query=v;
  }
}
function go(hash){ location.hash = hash; }
window.addEventListener('hashchange', ()=>{ parseRoute(); resetViewerState(); render(); });

function resetViewerState(){ state.rotate=0; state.zoomIdx=1; state.scopeOn=false; state.show3D=false; stopAutoRotate(); }

/* ---------- App (exposed for inline onclick handlers) ---------- */
const App = {
  toggleSidebar(force){ state.sidebarOpen = force!==undefined?force:!state.sidebarOpen; renderShellChrome(); },
  toggleDetailMobile(force){ state.detailOpenMobile = force!==undefined?force:!state.detailOpenMobile; renderShellChrome(); },
  navHome(){ go('#/collection'); App.toggleSidebar(false); },
  navExplore(){ go('#/collection'); App.toggleSidebar(false); },
  navNotes(){ go('#/notes'); App.toggleSidebar(false); },
  navHabitat(){
    state.view='collection'; state.categoryFilter=null; state.classFilter=null; state.habitatFilter=null; state.query='';
    state.habitatMode=true;
    if(location.hash !== '#/collection') location.hash = '#/collection';
    App.toggleSidebar(false); render();
  },
  navLearn(){ go('#/learn'); App.toggleSidebar(false); },
  navMore(){ toggleAppMoreMenu(); },

  toggleClassGroup(cls){ state.openGroups[cls] = !state.openGroups[cls]; renderSidebar(); },
  selectCategory(key){ go('#/collection/cat/'+key); App.toggleSidebar(false); },
  clearFilters(){ go('#/collection'); },

  openSearch(){ state.searchOpen = !state.searchOpen; renderSidebar(); if(state.searchOpen) setTimeout(()=>{ const el=$('#sidebarSearch'); if(el) el.focus(); },10); },
  runSearch(val){
    state.query = val;
    if(val){ state.categoryFilter=null; state.classFilter=null; state.habitatFilter=null; }
    state.view = 'collection';
    const active = document.activeElement;
    const wasFocused = active && active.id === 'sidebarSearch';
    const caret = wasFocused ? active.selectionStart : null;
    renderSidebar();
    if(wasFocused){
      const el = $('#sidebarSearch');
      if(el){ el.focus(); if(caret!=null) el.setSelectionRange(caret, caret); }
    }
    renderMain();
  },
  cycleSort(){
    const order = ['guide','az','category'];
    state.sort = order[(order.indexOf(state.sort)+1)%order.length];
    renderMain();
  },

  selectSpecies(id){ go('#/species/'+id); },
  backToCollection(){ go('#/collection'); },

  setHabitatFilter(h){ go('#/collection/habitat/'+encodeURIComponent(h)); },

  rotateDelta(delta){
    state.rotate = Math.max(-180, Math.min(180, state.rotate+delta));
    applyViewerTransform();
  },
  rotateReset(){ state.rotate = 0; state.zoomIdx=1; applyViewerTransform(); },
  rotateFromSlider(val){ state.rotate = parseInt(val,10); applyViewerTransform(); },
  toggleCube(){
    const sp = byId(state.speciesId);
    if(sp && sp.model){ state.show3D = !state.show3D; renderMain(); }
    else{ App.toggleAutoRotate(); }
  },
  toggleAutoRotate(){
    if(state.autoRotateTimer){ stopAutoRotate(); }
    else{
      state.autoRotateTimer = setInterval(()=>{ state.rotate = (state.rotate+2); if(state.rotate>180) state.rotate-=360; applyViewerTransform(true); }, 40);
    }
    renderSideButtons();
  },
  cycleZoom(){ state.zoomIdx = (state.zoomIdx+1)%3; applyViewerTransform(); renderSideButtons(); },
  toggleScope(){
    state.scopeOn = !state.scopeOn; renderSideButtons();
    const img=$('#viewerImg'); if(img) img.style.cursor = state.scopeOn?'crosshair':'grab';
    if(!state.scopeOn) applyViewerTransform();
  },
  openFullscreen(){
    const sp = byId(state.speciesId); if(!sp) return;
    const lb = $('#lightbox');
    const img = $('#lightboxImg');
    if(sp.verified && sp.img){ img.style.display='block'; img.src = sp.img; $('#lightboxPh').style.display='none'; }
    else{ img.style.display='none'; const ph=$('#lightboxPh'); ph.style.display='flex'; ph.style.background=phGradient(sp.category); ph.querySelector('.ph-initial').textContent = sp.name[0]; }
    lb.classList.add('show');
  },
  closeLightbox(){ $('#lightbox').classList.remove('show'); },

  openNotebook(){
    const drawer = $('#notebookDrawer'); const overlay=$('#drawerOverlay');
    drawer.classList.add('show'); overlay.classList.add('show');
    renderNotebookDrawer();
  },
  closeNotebook(){ $('#notebookDrawer').classList.remove('show'); $('#drawerOverlay').classList.remove('show'); },
  saveNote(){
    const ta = $('#notebookText'); const val = ta.value.trim();
    if(!val) return;
    Store.saveNote(state.speciesId, val);
    ta.value='';
    renderNotebookDrawer();
    const hint = $('#savedHint'); hint.textContent='Saved.'; setTimeout(()=>{ if(hint) hint.textContent=''; },1600);
  },
  deleteNote(idx){ Store.deleteNoteAt(state.speciesId, idx); renderNotebookDrawer(); },
  goToNoteSpecies(id){ App.closeNotebook(); go('#/species/'+id); },

  toggleCompare(id, ev){
    if(ev) ev.stopPropagation();
    const i = state.compare.indexOf(id);
    if(i>-1) state.compare.splice(i,1);
    else{ if(state.compare.length>=4){ showToast('You can compare up to 4 species at a time.'); return; } state.compare.push(id); }
    Store.setCompare(state.compare);
    renderMain(); renderCompareTray();
  },
  removeCompare(id){ state.compare = state.compare.filter(x=>x!==id); Store.setCompare(state.compare); renderCompareTray(); renderCompareModal(); renderMain(); },
  openCompare(){ if(state.compare.length<2){ showToast('Pick at least 2 species to compare.'); return; } $('#compareModalWrap').classList.add('show'); renderCompareModal(); },
  closeCompare(){ $('#compareModalWrap').classList.remove('show'); },

  share(){
    const sp = byId(state.speciesId); if(!sp) return;
    const text = `${sp.name} (${sp.sci}) — ${sp.details}`;
    if(navigator.share){ navigator.share({title:sp.name, text}).catch(()=>{}); }
    else{
      navigator.clipboard && navigator.clipboard.writeText(text).then(()=>showToast('Copied to clipboard.'));
    }
  },
  toggleMore(){ toggleSpeciesMoreMenu(); },
  copyDetails(){
    const sp = byId(state.speciesId); if(!sp) return;
    const text = `${sp.name} (${sp.sci})\nFamily: ${sp.family}\n\n${sp.details}\n\nTraits: ${sp.traits}\nDiet: ${sp.diet}\nRange: ${sp.range}\nEcological role: ${sp.role}`;
    navigator.clipboard && navigator.clipboard.writeText(text).then(()=>{ showToast('Details copied.'); closeMoreMenu(); });
  },
  printPage(){ closeMoreMenu(); window.print(); },

  shuffleDiscovery(){ let d; do{ d = DISCOVERIES[Math.floor(Math.random()*DISCOVERIES.length)]; }while(d===state.discovery && DISCOVERIES.length>1); state.discovery=d; renderSidebar(); },
  jumpToDiscovery(){ if(state.discovery) go('#/species/'+state.discovery.id); },
  shuffleQuote(){ let q; do{ q = QUOTES[Math.floor(Math.random()*QUOTES.length)]; }while(q===state.quote && QUOTES.length>1); state.quote=q; $('.quote-strip .qtext').textContent = '\u201c'+q+'\u201d'; },

  showAbout(){
    closeAnyMenu();
    const verifiedCount = SPECIES.filter(s=>s.verified).length;
    $('#aboutModal').innerHTML = `
      <div class="compare-modal-head"><h2 style="font-size:18px;">About Fauna Lab</h2><button onclick="App.closeAbout()">${icon('close',20)}</button></div>
      <p style="font-size:13px;color:var(--ink-soft);line-height:1.65;">
        A field guide to ${SPECIES.length} insects and birds, built as a fully interactive, offline-friendly web app.
        Notes and comparisons are saved only in this browser, via <code>localStorage</code> — nothing is sent anywhere.
      </p>
      <p style="font-size:13px;color:var(--ink-soft);line-height:1.65;margin-top:10px;">
        ${verifiedCount} of ${SPECIES.length} entries carry a photo verified against Wikimedia Commons at build time
        (credited on each species page). The rest use an illustrated placeholder with a one-click link to search
        Commons for a real photo — open a species\u2019s <strong>More</strong> menu to grab one.
      </p>
    `;
    $('#aboutModalWrap').classList.add('show');
  },
  closeAbout(){ $('#aboutModalWrap').classList.remove('show'); },
  clearNotebookData(){
    closeAnyMenu();
    if(confirm('Clear all saved notebook entries? This can\u2019t be undone.')){
      localStorage.removeItem(Store.notesKey);
      showToast('Notebook cleared.');
      if(state.view==='notes') renderMain();
    }
  },

  showModelInfo(){
    closeAnyMenu();
    $('#modelInfoModal').innerHTML = `
      <div class="compare-modal-head"><h2 style="font-size:18px;">${icon('cube',18)} Add a real 3D model</h2><button onclick="App.closeModelInfo()">${icon('close',20)}</button></div>
      <p style="font-size:13px;color:var(--ink-soft);line-height:1.65;">
        Open <code>data.js</code>, find the species object you want, and add one <code>model</code> line. No other code changes needed \u2014 the viewer picks it up automatically and shows a real, orbit-able 3D model instead of the photo.
      </p>
      <p style="font-size:12px;font-weight:700;margin-top:14px;margin-bottom:6px;">Option A \u2014 Sketchfab (easiest, nothing to host)</p>
      <div class="code-block">model: { type:'sketchfab', id:'2b5e1e1a4a...' },</div>
      <p style="font-size:12px;color:var(--ink-soft);margin-top:8px;line-height:1.6;">
        Go to sketchfab.com, search the species, filter results by <strong>Downloadable</strong> (usually means embeddable/CC-licensed), open a model, click <strong>Embed</strong>, and copy the 32-character ID from the embed URL
        (<span style="white-space:nowrap;">sketchfab.com/models/<u>THIS PART</u>/embed</span>). Credit the artist per the license shown on the model page.
      </p>
      <p style="font-size:12px;font-weight:700;margin-top:14px;margin-bottom:6px;">Option B \u2014 self-hosted glTF/GLB file</p>
      <div class="code-block">model: { type:'glb', url:'models/honeybee.glb' },</div>
      <p style="font-size:12px;color:var(--ink-soft);margin-top:8px;line-height:1.6;">
        Any direct URL to a <code>.glb</code>/<code>.gltf</code> file works \u2014 a relative path to a file you place next to <code>index.html</code>, or a link to one hosted elsewhere. This renders through
        Google's <code>&lt;model-viewer&gt;</code>, already loaded in <code>index.html</code>, with full drag-to-orbit and auto-rotate built in.
      </p>
      <p style="font-size:12px;color:var(--ink-soft);margin-top:12px;line-height:1.6;">
        <strong>Where to find real models:</strong> Sketchfab (large free/CC library), Smithsonian 3D (si.edu/3d \u2014 public-domain specimen scans), or CGTrader/TurboSquid for paid, higher-detail work. Always check the license before self-hosting a file \u2014 Sketchfab embeds inherit the creator's permitted usage automatically, which is why it's the easiest starting point.
      </p>
    `;
    $('#modelInfoWrap').classList.add('show');
  },
  closeModelInfo(){ $('#modelInfoWrap').classList.remove('show'); },

  openAR(){ openARModal(); },
  closeAR(){ closeARModal(); },
  arGrow(){ arSize = Math.min(320, arSize+24); const s=$('#arSticker'); if(s) s.style.width=arSize+'px'; },
  arShrink(){ arSize = Math.max(60, arSize-24); const s=$('#arSticker'); if(s) s.style.width=arSize+'px'; },
};
window.App = App;

/* ---------- viewer transform ---------- */
function applyViewerTransform(auto){
  const img = $('#viewerImg');
  const zoomVals = [0.86, 1, 1.18];
  if(img){ img.style.transformOrigin = '50% 50%'; img.style.transform = `rotateY(${state.rotate}deg) scale(${zoomVals[state.zoomIdx]})`; }
  const pill = $('#degPill'); if(pill) pill.textContent = Math.round(state.rotate)+'\u00b0';
  const slider = $('#rotateSlider'); if(slider) slider.value = state.rotate;
}
function stopAutoRotate(){ if(state.autoRotateTimer){ clearInterval(state.autoRotateTimer); state.autoRotateTimer=null; } }

/* ---------- drag-to-rotate ---------- */
function attachDragRotate(){
  const img = $('#viewerImg'); if(!img) return;
  let dragging=false, startX=0, startRotate=0;
  img.addEventListener('pointerdown', e=>{
    dragging=true; startX=e.clientX; startRotate=state.rotate; img.setPointerCapture(e.pointerId);
    stopAutoRotate(); renderSideButtons();
  });
  img.addEventListener('pointermove', e=>{
    if(!dragging) return;
    const delta = (e.clientX-startX) * 0.6;
    state.rotate = Math.max(-180, Math.min(180, startRotate+delta));
    applyViewerTransform();
  });
  const end = ()=>{ dragging=false; };
  img.addEventListener('pointerup', end);
  img.addEventListener('pointerleave', end);
}

/* ---------- scope magnifier ---------- */
function attachScopeMagnifier(){
  const stage = $('.viewer-stage'); const img = $('#viewerImg'); if(!stage || !img) return;
  stage.addEventListener('pointermove', e=>{
    if(!state.scopeOn) return;
    const r = stage.getBoundingClientRect();
    const px = ((e.clientX-r.left)/r.width*100).toFixed(1);
    const py = ((e.clientY-r.top)/r.height*100).toFixed(1);
    img.style.transformOrigin = `${px}% ${py}%`;
    img.style.transform = `rotateY(${state.rotate}deg) scale(2.1)`;
  });
  stage.addEventListener('pointerleave', ()=>{ if(state.scopeOn) applyViewerTransform(); });
}

/* ---------- dropdown menu helper ---------- */
function buildDropdown(anchorEl, itemsHtml){
  closeAnyMenu();
  const m = document.createElement('div');
  m.className = 'dropdown-menu';
  m.id='activeMenu';
  m.style.cssText = 'position:absolute;z-index:30;background:var(--panel-solid);border:1px solid var(--border);border-radius:12px;box-shadow:var(--shadow-md);padding:6px;min-width:220px;';
  const rect = anchorEl.getBoundingClientRect();
  m.style.top = (rect.bottom+6+window.scrollY)+'px';
  m.style.right = Math.max(10, window.innerWidth-rect.right)+'px';
  m.innerHTML = itemsHtml;
  Array.from(m.querySelectorAll('button,a')).forEach(b=>{
    b.style.cssText += 'display:flex;gap:8px;align-items:center;width:100%;padding:9px 10px;border-radius:8px;font-size:12.5px;font-weight:600;text-align:left;';
    b.addEventListener('mouseenter',()=>b.style.background='var(--bg-soft)');
    b.addEventListener('mouseleave',()=>b.style.background='transparent');
  });
  document.body.appendChild(m);
  setTimeout(()=>document.addEventListener('click', closeMenuOnOutsideClick),0);
}
function closeMenuOnOutsideClick(e){
  const m = $('#activeMenu'); if(!m) return;
  if(!m.contains(e.target) && e.target.id!=='moreBtn' && e.target.id!=='sidebarMoreBtn' && !(e.target.closest && e.target.closest('#sidebarMoreBtn'))){ closeAnyMenu(); }
}
function closeAnyMenu(){ const m=$('#activeMenu'); if(m) m.remove(); document.removeEventListener('click', closeMenuOnOutsideClick); }
function closeMoreMenu(){ closeAnyMenu(); }

function toggleSpeciesMoreMenu(){
  const existing = $('#activeMenu'); if(existing){ closeAnyMenu(); return; }
  const sp = byId(state.speciesId);
  const btn = $('#moreBtn'); if(!btn) return;
  let extra = '';
  if(sp && !sp.verified){
    extra = `<a href="${commonsSearchUrl(sp.commonsQuery)}" target="_blank" rel="noopener" style="color:var(--sage-ink);">${icon('link',16)} Find a real photo on Commons</a>`;
  }
  buildDropdown(btn, `
    <button onclick="App.copyDetails()">${icon('notebook',16)} Copy field guide entry</button>
    <button onclick="App.printPage()">${icon('download',16)} Print / save as PDF</button>
    <button onclick="App.showModelInfo()">${icon('cube',16)} Add a real 3D model</button>
    ${extra}
  `);
}
function toggleAppMoreMenu(){
  const existing = $('#activeMenu'); if(existing){ closeAnyMenu(); return; }
  const btn = $('#sidebarMoreBtn'); if(!btn) return;
  buildDropdown(btn, `
    <button onclick="App.showAbout()">${icon('info',16)} About this guide</button>
    <button onclick="App.showModelInfo()">${icon('cube',16)} Add a real 3D model</button>
    <button onclick="App.clearNotebookData()">${icon('close',16)} Clear my saved notes</button>
  `);
}

/* ---------- toast ---------- */
function showToast(msg){
  const wrap = $('#toastWrap');
  const t = document.createElement('div');
  t.className='toast';
  t.innerHTML = `${icon('check',15)} <span>${msg}</span>`;
  wrap.appendChild(t);
  setTimeout(()=>{ t.style.opacity='0'; t.style.transition='opacity .25s'; setTimeout(()=>t.remove(),260); }, 2400);
}

/* ---------- AR ---------- */
let arStream = null, arSize = 150;
function openARModal(){
  const sp = byId(state.speciesId);
  const modal = $('#arModal'); modal.classList.add('show');
  $('#arError').style.display='none';
  const video = $('#arVideo');
  navigator.mediaDevices && navigator.mediaDevices.getUserMedia ?
    navigator.mediaDevices.getUserMedia({ video:{ facingMode:'environment' } }).then(stream=>{
      arStream = stream; video.srcObject = stream; video.style.display='block';
      setupSticker(sp);
    }).catch(()=>{ showAROnlyPreview(sp); })
    : showAROnlyPreview(sp);
}
function showAROnlyPreview(sp){
  $('#arVideo').style.display='none';
  $('#arError').style.display='flex';
  $('#arError').innerHTML = `<div>${icon('camera',30)}<p style="margin-top:10px;">Camera access isn\u2019t available in this browser/context.<br>Here\u2019s the field guide sticker on its own \u2014 drag it around.</p></div>`;
  setupSticker(sp);
}
function setupSticker(sp){
  const s = $('#arSticker');
  s.innerHTML = (sp.verified && sp.img) ? `<img src="${sp.img}" style="width:100%;display:block;filter:drop-shadow(0 8px 16px rgba(0,0,0,.45))" onerror="this.parentElement.style.background='${phGradient(sp.category).replace(/'/g,"\\'")}'; this.remove();">`
    : `<div style="width:${arSize}px;height:${arSize}px;border-radius:20px;background:${phGradient(sp.category)};display:flex;align-items:center;justify-content:center;color:#fff;font-family:var(--font-display);font-size:32px;">${sp.name[0]}</div>`;
  s.style.width = arSize+'px';
  s.style.left = '50%'; s.style.top='45%'; s.style.transform='translate(-50%,-50%)';
  let dragging=false, offX=0, offY=0;
  s.onpointerdown = (e)=>{ dragging=true; s.setPointerCapture(e.pointerId); const r=s.getBoundingClientRect(); offX=e.clientX-r.left; offY=e.clientY-r.top; s.style.transform='none'; };
  s.onpointermove = (e)=>{ if(!dragging) return; s.style.left = (e.clientX-offX)+'px'; s.style.top=(e.clientY-offY)+'px'; };
  s.onpointerup = ()=>{ dragging=false; };
}
function closeARModal(){
  $('#arModal').classList.remove('show');
  if(arStream){ arStream.getTracks().forEach(t=>t.stop()); arStream=null; }
}

/* ============================================================
   RENDER: SIDEBAR
   ============================================================ */
function renderSidebar(){
  const totalCount = SPECIES.length;
  const groups = ['Insects','Birds'];
  const groupsHtml = groups.map(cls=>{
    const cats = CATEGORIES.filter(c=>c.class===cls);
    const open = state.openGroups[cls];
    return `
    <div class="class-group ${open?'open':''}">
      <div class="class-group-head" onclick="App.toggleClassGroup('${cls}')">
        <span>${cls}</span>
        <span class="chev">${icon('chevron',14)}</span>
      </div>
      <div class="class-group-body">
        ${cats.map(c=>{
          const count = SPECIES.filter(s=>s.category===c.key).length;
          const active = state.categoryFilter===c.key;
          return `<div class="cat-row ${active?'active':''}" onclick="App.selectCategory('${c.key}')">
            <span class="cat-icon">${icon(c.icon,17)}</span>
            <span>
              <div class="cat-name">${c.label}</div>
              <div class="cat-count">${count} species</div>
            </span>
            <span class="chev">${icon('chevron',13)}</span>
          </div>`;
        }).join('')}
      </div>
    </div>`;
  }).join('');

  $('#sidebar').innerHTML = `
    <div class="brand">
      ${icon('leaf',26,'')}
      <div class="brand-text">
        <h1>Fauna <em>Lab</em></h1>
        <p>Explore &middot; Learn &middot; Protect</p>
      </div>
    </div>
    <nav class="nav-list">
      <div class="nav-item ${state.view==='collection'&&!state.categoryFilter?'active':''}" onclick="App.navHome()">${icon('home',18)}<span>Home</span></div>
      <div class="nav-item ${state.view==='collection'&&state.categoryFilter?'active':''}" onclick="App.navExplore()">${icon('explore',18)}<span>Explore</span></div>
      <div class="nav-item ${state.view==='notes'?'active':''}" onclick="App.navNotes()">${icon('notes',18)}<span>Notes</span></div>
      <div class="nav-item" onclick="App.navHabitat()">${icon('habitat',18)}<span>Habitat</span></div>
      <div class="nav-item ${state.view==='learn'?'active':''}" onclick="App.navLearn()">${icon('learn',18)}<span>Learn</span></div>
      <div class="nav-item" onclick="App.navMore()" id="sidebarMoreBtn">${icon('more',18)}<span>More</span></div>
    </nav>
    <div class="panel-card">
      <div class="species-panel-head">
        <h2>Species <span class="count">${totalCount}</span></h2>
        <div class="panel-tools">
          <button class="tool-btn ${state.searchOpen?'active':''}" onclick="App.openSearch()" title="Search">${icon('search',15)}</button>
          <button class="tool-btn" onclick="App.cycleSort()" title="Sort: ${state.sort}">${icon('sort',15)}</button>
        </div>
      </div>
      ${state.searchOpen ? `<div class="search-row"><input id="sidebarSearch" type="text" placeholder="Search species\u2026" value="${escapeAttr(state.query)}" oninput="App.runSearch(this.value)"></div>` : ''}
      ${groupsHtml}
    </div>
    <div class="panel-card discovery-mini">
      <div class="emoji" style="cursor:pointer" onclick="App.jumpToDiscovery()">\ud83c\udf3f</div>
      <div style="cursor:pointer" onclick="App.jumpToDiscovery()">
        <h3>Today\u2019s Discovery</h3>
        <p>${state.discovery ? state.discovery.text : ''}</p>
      </div>
      <button class="shuffle-btn" onclick="App.shuffleDiscovery()" title="Shuffle">${icon('shuffle',15)}</button>
    </div>
  `;
}

function escapeAttr(s){ return (s||'').replace(/"/g,'&quot;'); }
function escapeHtml(s){ return (s||'').replace(/[&<>]/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }

/* ============================================================
   RENDER: MAIN ROUTER
   ============================================================ */
function renderMain(){
  const main = $('#main');
  if(state.view==='detail'){ main.innerHTML = detailTemplate(state.speciesId); afterDetailRender(); return; }
  if(state.view==='notes'){ main.innerHTML = notesTemplate(); return; }
  if(state.view==='learn'){ main.innerHTML = learnTemplate(); return; }
  main.innerHTML = collectionTemplate();
}

/* ---------------- COLLECTION VIEW ---------------- */
function collectionTemplate(){
  let list = SPECIES.slice();
  let title = 'All Species', sub = `${SPECIES.length} insects & birds in the field guide`;

  if(state.categoryFilter){
    const c = catInfo(state.categoryFilter);
    list = list.filter(s=>s.category===state.categoryFilter);
    title = c ? c.label : title; sub = `${list.length} species in this group`;
  }
  if(state.classFilter){ list = list.filter(s=>s.class===state.classFilter); title = state.classFilter; }
  if(state.habitatFilter){ list = list.filter(s=>s.habitat===state.habitatFilter); title = state.habitatFilter; sub=`${list.length} species sharing this habitat`; }
  if(state.query){
    const q = state.query.toLowerCase();
    list = list.filter(s=> s.name.toLowerCase().includes(q) || s.sci.toLowerCase().includes(q) || s.family.toLowerCase().includes(q) || s.tags.join(' ').toLowerCase().includes(q));
    title = `Results for \u201c${state.query}\u201d`; sub = `${list.length} match${list.length===1?'':'es'}`;
  }
  if(state.sort==='az') list.sort((a,b)=>a.name.localeCompare(b.name));
  else if(state.sort==='category') list.sort((a,b)=> a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
  else list.sort((a,b)=>a.guideNo-b.guideNo);

  const habitats = Array.from(new Set(SPECIES.map(s=>s.habitat)));

  return `
    <div class="collection-view">
      <div class="collection-head">
        <div>
          <h1>${title}</h1>
          <p>${sub}</p>
        </div>
        <div class="collection-controls">
          <select class="select-input" onchange="location.hash = this.value ? '#/collection/class/'+this.value : '#/collection'">
            <option value="">All classes</option>
            <option value="Insects" ${state.classFilter==='Insects'?'selected':''}>Insects</option>
            <option value="Birds" ${state.classFilter==='Birds'?'selected':''}>Birds</option>
          </select>
          <select class="select-input" onchange="App.cycleSortTo && null">
            <option>Sorted by: ${state.sort==='guide'?'Guide No.':state.sort==='az'?'A\u2013Z':'Category'}</option>
          </select>
          ${ (state.categoryFilter||state.classFilter||state.habitatFilter||state.query) ? `<button class="select-input" onclick="App.clearFilters()">Clear filters</button>` : '' }
        </div>
      </div>
      ${ state.habitatMode ? `<div style="display:flex;flex-wrap:wrap;gap:7px;margin-bottom:18px;">
          ${habitats.map(h=>`<button class="select-input" style="border-radius:20px;font-size:12px;${state.habitatFilter===h?'background:var(--sage-bg);border-color:#cfe0bd;':''}" onclick="App.setHabitatFilter('${escapeAttr(h)}')">${h}</button>`).join('')}
        </div>` : '' }
      ${ list.length ? `<div class="grid">${list.map(gCard).join('')}</div>` : emptyState() }
    </div>
  `;
}

function emptyState(){
  return `<div class="empty-state">
    ${icon('search',30)}
    <h3 style="margin-top:10px;">No matches here</h3>
    <p>Try a different search term or clear your filters.</p>
  </div>`;
}

function gCard(s){
  const inCompare = state.compare.includes(s.id);
  const imgBlock = s.verified && s.img
    ? `<img src="${s.img}" alt="${s.name}" loading="lazy" onerror="this.parentElement.innerHTML=phInner('${s.category}','${escapeAttr(s.name[0])}')">`
    : phInner(s.category, s.name[0]);
  return `
  <div class="g-card" onclick="App.selectSpecies('${s.id}')">
    <div class="g-card-img">${imgBlock}</div>
    <div class="g-card-body">
      <h3>${s.name}</h3>
      <div class="sci">${s.sci}</div>
      <div class="g-card-foot">
        <span class="g-card-cat">${catInfo(s.category).label}</span>
        <button class="compare-add-btn ${inCompare?'on':''}" title="Add to compare" onclick="App.toggleCompare('${s.id}', event)">${icon(inCompare?'check':'plus',13)}</button>
      </div>
    </div>
  </div>`;
}
function phInner(catKey, initial){
  return `<div class="g-card-ph" style="background:${phGradient(catKey)}">${initial}</div>`;
}
window.phInner = phInner; // used in inline onerror string above

/* ---------------- LEARN VIEW ---------------- */
function learnTemplate(){
  const cards = [
    { t:'What is pollination?', i:'leaf', c:'Pollination is the transfer of pollen from a flower\u2019s male anther to its female stigma, letting a plant produce seeds and fruit. Roughly 75% of flowering plant species rely on animals \u2014 mostly insects \u2014 to do this transfer for them.' },
    { t:'Complete vs. incomplete metamorphosis', i:'info', c:'Beetles, moths, butterflies, wasps, ants and bees all go through complete metamorphosis: egg \u2192 larva \u2192 pupa \u2192 adult, four totally different body forms. Dragonflies instead go through incomplete metamorphosis, hatching as nymphs that gradually grow adult features across several molts with no pupal stage.' },
    { t:'Why insects migrate', i:'explore', c:'Unlike bird migration, many insect migrations \u2014 like the monarch butterfly\u2019s \u2014 span several generations. No single monarch completes the round trip; it takes four or five successive generations to finish one annual migratory cycle.' },
    { t:'Structural color vs. pigment', i:'cube', c:'Many of the most vivid colors in this guide, from a blue morpho\u2019s wings to a jewel beetle\u2019s shell, aren\u2019t pigment at all. Microscopic ridges and layers in the surface bend light at specific wavelengths, a phenomenon called structural color \u2014 which is why these colors can look different depending on the viewing angle.' },
    { t:'Ecological roles, in short', i:'map', c:'Species in this guide fill a handful of recurring ecological roles: pollinators move genetic material between plants; predators and parasitoids regulate the populations of other insects; decomposers like dung beetles and stag beetle larvae recycle nutrients back into soil; and apex predators like eagles and owls keep prey populations in balance.' },
    { t:'Why so many species are declining', i:'habitat', c:'Habitat loss, pesticide use and climate-driven shifts in bloom and migration timing are the three most consistently cited pressures on pollinator and songbird populations worldwide. Field guides like this one exist partly to build the kind of species-level familiarity that makes those declines legible in the first place.' },
  ];
  return `
    <div class="learn-view">
      <h1>Field Notes</h1>
      <p class="lede">Short, practical background for reading the rest of this guide.</p>
      ${cards.map(c=>`<div class="learn-card"><h3>${icon(c.i,17)} ${c.t}</h3><p>${c.c}</p></div>`).join('')}
    </div>`;
}

/* ---------------- NOTES VIEW ---------------- */
function notesTemplate(){
  const all = Store.getNotes();
  const ids = Object.keys(all);
  if(!ids.length){
    return `<div class="notes-view"><h1>Your Notebook</h1>${emptyState()}</div>`;
  }
  let rows = '';
  ids.forEach(id=>{
    const sp = byId(id); if(!sp) return;
    all[id].forEach((n,idx)=>{
      rows += `<div class="note-item" onclick="App.selectSpecies('${id}')">
        <h4>${sp.name} <span style="color:var(--ink-faint);font-weight:400;">\u00b7 ${new Date(n.date).toLocaleDateString()}</span></h4>
        <p>${escapeHtml(n.text)}</p>
      </div>`;
    });
  });
  return `<div class="notes-view"><h1>Your Notebook</h1>${rows}</div>`;
}

/* ---------------- DETAIL VIEW ---------------- */
function detailTemplate(id){
  const sp = byId(id);
  if(!sp){ return collectionTemplate(); }
  const showingModel = state.show3D && sp.model;
  return `
    <div class="topbar">
      <button class="back-link" onclick="App.backToCollection()"><span style="display:inline-flex;transform:scaleX(-1);">${icon('chevron',16)}</span> Back to Collection</button>
      <div class="name-tag">
        <span class="pin">${icon('pin',20)}</span>
        <h2>${sp.name}</h2>
        <p>${sp.sci}</p>
      </div>
      <div class="topbar-actions">
        <button class="action-btn" onclick="App.openNotebook()">${icon('notebook',18)}<span class="lbl">Notebook</span></button>
        <button class="action-btn ${state.compare.includes(sp.id)?'active':''}" onclick="App.toggleCompare('${sp.id}')">${icon('compare',18)}<span class="lbl">Compare</span></button>
        <button class="action-btn" onclick="App.share()">${icon('share',18)}<span class="lbl">Share</span></button>
        <div class="action-divider"></div>
        <button class="action-btn" id="moreBtn" onclick="App.toggleMore()">${icon('more',18)}<span class="lbl">More</span></button>
        <button class="action-btn info-toggle-mobile" onclick="App.toggleDetailMobile(true)">${icon('info',18)}<span class="lbl">Info</span></button>
      </div>
    </div>

    <div class="viewer">
      <div class="viewer-stage">
        ${showingModel ? modelEmbedHtml(sp) : `<div class="viewer-img-wrap" id="viewerImgWrap">${photoOrPlaceholderHtml(sp)}</div>`}
        <div class="viewer-side">${sideButtonsHtml(sp)}</div>
      </div>
    </div>
    ${showingModel ? `
    <div class="viewer-bottom">
      <span class="viewer-mode-pill">${icon('cube',13)} Real 3D model \u2014 drag to orbit</span>
      <button class="round-btn" onclick="App.toggleCube()" title="Back to photo">${icon('close',15)}</button>
    </div>` : `
    <div class="viewer-bottom">
      <button class="round-btn" onclick="App.rotateReset()" title="Reset">${icon('reset',16)}</button>
      <span class="deg-pill" id="degPill">${state.rotate}\u00b0</span>
      <input type="range" min="-180" max="180" value="${state.rotate}" class="rotate-slider" id="rotateSlider" oninput="App.rotateFromSlider(this.value)">
      <button class="round-btn" onclick="App.openFullscreen()" title="Fullscreen">${icon('fullscreen',15)}</button>
    </div>`}
    <div class="quote-strip"><span class="qtext">\u201c${state.quote}\u201d</span><button onclick="App.shuffleQuote()" title="New quote">${icon('shuffle',13)}</button></div>
  `;
}

function photoOrPlaceholderHtml(sp){
  return sp.verified && sp.img
    ? `<img class="viewer-img" id="viewerImg" src="${sp.img}" alt="${sp.name}" onerror="renderPlaceholderInViewer()">`
    : placeholderArtHtml(sp);
}

function modelEmbedHtml(sp){
  const m = sp.model;
  if(m && m.type === 'sketchfab'){
    return `<div class="model-embed-wrap">
      <span class="model-badge">${icon('cube',12)} Sketchfab 3D model</span>
      <iframe title="${sp.name} 3D model" src="https://sketchfab.com/models/${m.id}/embed?autostart=1&transparent=1&ui_theme=dark"
        allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking></iframe>
    </div>`;
  }
  if(m && m.type === 'glb'){
    return `<div class="model-embed-wrap">
      <span class="model-badge">${icon('cube',12)} 3D model</span>
      <model-viewer src="${m.url}" camera-controls auto-rotate shadow-intensity="1" alt="${sp.name} 3D model"></model-viewer>
    </div>`;
  }
  return `<div class="viewer-img-wrap" id="viewerImgWrap">${photoOrPlaceholderHtml(sp)}</div>`;
}

function sideButtonsHtml(sp){
  const hasModel = !!(sp && sp.model);
  return `
    <button class="side-btn ${(state.show3D&&hasModel)||state.autoRotateTimer?'active':''}" onclick="App.toggleCube()" title="${hasModel?'Toggle real 3D model':'Auto-rotate (no 3D model linked \u2014 see More menu)'}">${icon('cube',18)}<span>3D</span></button>
    <button class="side-btn ${state.zoomIdx!==1?'active':''}" onclick="App.cycleZoom()">${icon('ruler',18)}<span>Size</span></button>
    <button class="side-btn ${state.scopeOn?'active':''}" onclick="App.toggleScope()">${icon('crosshair',18)}<span>Scope</span></button>
    <button class="side-btn" onclick="App.openAR()">${icon('camera',18)}<span>AR View</span></button>
  `;
}

function placeholderArtHtml(sp){
  const cat = catInfo(sp.category);
  return `<div class="placeholder-art viewer-img" id="viewerImg" style="background:${phGradient(sp.category)}">
      <span class="ph-icon">${icon(cat.icon,44)}</span>
      <span class="ph-initial">${sp.name[0]}</span>
      <span class="ph-label">Illustrated placeholder</span>
    </div>
    <div class="placeholder-note">${icon('info',13)} No verified photo yet \u2014 <a href="${commonsSearchUrl(sp.commonsQuery)}" target="_blank" rel="noopener">find one on Wikimedia Commons</a></div>`;
}
window.renderPlaceholderInViewer = function(){
  const sp = byId(state.speciesId); if(!sp) return;
  const wrap = $('#viewerImgWrap'); if(!wrap) return;
  wrap.innerHTML = placeholderArtHtml(sp);
};

function afterDetailRender(){
  renderDetailPanel();
  applyViewerTransform();
  renderCompareTray();
  attachDragRotate();
  attachScopeMagnifier();
}

function renderSideButtons(){
  const sp = byId(state.speciesId); if(!sp) return;
  const wrap = $('.viewer-side'); if(!wrap) return;
  wrap.innerHTML = sideButtonsHtml(sp);
}

/* ---------------- DETAIL PANEL (right column) ---------------- */
function renderDetailPanel(){
  const panel = $('#detailPanel');
  const sp = byId(state.speciesId);
  if(!sp){ panel.innerHTML=''; return; }
  const rows = [
    ['info','Species Details', sp.details],
    ['leaf','Behavior & Traits', sp.traits],
    ['bee','Diet', sp.diet],
    ['map','Range', sp.range],
    ['explore','Ecological Role', sp.role],
  ];
  panel.innerHTML = `
    <button class="detail-close-mobile" style="position:absolute;top:14px;right:14px;" onclick="App.toggleDetailMobile(false)" aria-label="Close details">${icon('close',16)}</button>
    <div class="detail-top">
      <span class="family-badge" style="${badgeStyle(sp.family)}">${sp.family}</span>
      <div class="fieldguide-note">
        <div class="fg-label">Field Guide</div>
        <div class="fg-no">No. ${String(sp.guideNo).padStart(2,'0')}</div>
      </div>
    </div>
    <h2 class="detail-name">${sp.name}</h2>
    <div class="detail-sci">${sp.sci}</div>
    <div class="detail-tags">${sp.tags.map(t=>`<span class="tag-chip" style="${chipStyle(t)}">${t}</span>`).join('')}</div>
    <div class="detail-divider"></div>
    <div class="info-rows">
      ${rows.map(([ic,label,text])=>`
        <div class="info-row">
          <span class="info-icon" style="${badgeStyle(label)}">${icon(ic,15)}</span>
          <div><h4>${label}</h4><p>${text}</p></div>
        </div>`).join('')}
    </div>
    <div class="habitat-card">
      <div class="hc-label">${icon('habitat',13)} Habitat</div>
      <div class="habitat-visual" style="background:${phGradient(sp.category)}">${sp.habitat}</div>
    </div>
    <div class="notebook-btn-row">
      <button class="notebook-open-btn" onclick="App.openNotebook()">${icon('notebook',15)} Open field notebook</button>
    </div>
  `;
}

/* ---------------- NOTEBOOK DRAWER ---------------- */
function renderNotebookDrawer(){
  const sp = byId(state.speciesId);
  const drawer = $('#notebookDrawer');
  if(!sp){ drawer.innerHTML = `<div class="drawer-head"><h2>Notebook</h2><button onclick="App.closeNotebook()">${icon('close',18)}</button></div><p style="color:var(--ink-soft);font-size:13px;">Open a species first to take notes on it.</p>`; return; }
  const notes = (Store.getNotes()[sp.id]) || [];
  drawer.innerHTML = `
    <div class="drawer-head"><h2>Notes \u2014 ${sp.name}</h2><button onclick="App.closeNotebook()">${icon('close',18)}</button></div>
    <textarea id="notebookText" placeholder="Field notes, sightings, questions\u2026"></textarea>
    <button class="drawer-save" onclick="App.saveNote()">Save note</button>
    <div class="saved-hint" id="savedHint"></div>
    <div style="margin-top:18px;display:flex;flex-direction:column;gap:8px;">
      ${notes.map((n,idx)=>`
        <div style="background:var(--bg-soft);border:1px solid var(--border);border-radius:10px;padding:10px 12px;position:relative;">
          <p style="font-size:12.5px;white-space:pre-wrap;padding-right:20px;">${escapeHtml(n.text)}</p>
          <div style="font-size:10.5px;color:var(--ink-faint);margin-top:5px;">${new Date(n.date).toLocaleString()}</div>
          <button onclick="App.deleteNote(${idx})" style="position:absolute;top:8px;right:8px;color:var(--ink-faint);">${icon('close',13)}</button>
        </div>`).join('') || `<p style="font-size:12px;color:var(--ink-faint);">No notes yet for this species.</p>`}
    </div>
  `;
}

/* ---------------- COMPARE ---------------- */
function renderCompareTray(){
  const tray = $('#compareTray');
  if(!state.compare.length){ tray.classList.add('hide'); return; }
  tray.classList.remove('hide');
  tray.innerHTML = `
    ${state.compare.map(id=>{
      const sp = byId(id); if(!sp) return '';
      return `<div class="ct-thumb">${sp.verified&&sp.img?`<img src="${sp.img}" onerror="this.remove()">`:sp.name[0]}</div>`;
    }).join('')}
    <span style="font-size:12px;">${state.compare.length} selected</span>
    <button class="compare-tray-btn" onclick="App.openCompare()">Compare</button>
  `;
}
function renderCompareModal(){
  const wrap = $('#compareModalWrap');
  const list = state.compare.map(byId).filter(Boolean);
  if(!list.length){ wrap.classList.remove('show'); return; }
  const rows = [
    ['Family', s=>s.family],
    ['Habitat', s=>s.habitat],
    ['Diet', s=>s.diet],
    ['Range', s=>s.range],
    ['Ecological Role', s=>s.role],
  ];
  $('#compareModal').innerHTML = `
    <div class="compare-modal-head">
      <h2 style="font-size:18px;">Compare Species</h2>
      <button onclick="App.closeCompare()">${icon('close',20)}</button>
    </div>
    <div style="overflow-x:auto;">
    <table class="compare-table">
      <thead><tr><th></th>${list.map(s=>`<th>${s.name}<button class="compare-remove" onclick="App.removeCompare('${s.id}')" style="margin-left:8px;">${icon('close',12)}</button></th>`).join('')}</tr></thead>
      <tbody>
        ${rows.map(([label,fn])=>`<tr><td class="row-label">${label}</td>${list.map(s=>`<td>${fn(s)}</td>`).join('')}</tr>`).join('')}
      </tbody>
    </table>
    </div>
  `;
}

/* ============================================================
   SHELL / STATIC CHROME (sidebar overlay state, etc.)
   ============================================================ */
function renderShellChrome(){
  $('#sidebar').classList.toggle('show', state.sidebarOpen);
  $('#sidebarOverlay').classList.toggle('show', state.sidebarOpen);
  $('#detailPanel').classList.toggle('show', state.detailOpenMobile);
}

/* ============================================================
   MASTER RENDER
   ============================================================ */
function render(){
  renderSidebar();
  renderMain();
  renderShellChrome();
  renderCompareTray();
  closeMoreMenu();
}

/* ---------- init ---------- */
document.addEventListener('keydown', e=>{
  if(e.key !== 'Escape') return;
  closeAnyMenu();
  if($('#lightbox').classList.contains('show')) return App.closeLightbox();
  if($('#arModal').classList.contains('show')) return App.closeAR();
  if($('#compareModalWrap').classList.contains('show')) return App.closeCompare();
  if($('#modelInfoWrap').classList.contains('show')) return App.closeModelInfo();
  if($('#aboutModalWrap').classList.contains('show')) return App.closeAbout();
  if($('#notebookDrawer').classList.contains('show')) return App.closeNotebook();
  if(state.detailOpenMobile) return App.toggleDetailMobile(false);
  if(state.sidebarOpen) return App.toggleSidebar(false);
});

document.addEventListener('DOMContentLoaded', ()=>{
  parseRoute();
  render();
});
})();
