/* Sample Journey · Sketchbook: the page around the figure. Panel (window, active card, notes, cards), player, footer, the
   phone "follow the action" layout, and mounting. Layout rules: pradarshan references/ui.md. */

const SJ_PHONE_CSS = `    .sj-deck{flex:1 1 100%}
    .actions{flex-wrap:nowrap!important;overflow-x:auto;scroll-snap-type:x proximity;padding-bottom:6px;-webkit-overflow-scrolling:touch}
    .actions .stepwrap{scroll-snap-align:start;flex:0 0 auto}
    .act{min-height:40px;font-size:13px!important}
    .scope-panel{grid-template-columns:1fr;gap:6px}
    .player{position:sticky;bottom:0;z-index:5;background:var(--paper);border-top:1px solid var(--rule);padding:8px 0 calc(8px + env(safe-area-inset-bottom));margin:0 0 10px;justify-content:space-between;flex-wrap:wrap;row-gap:6px}
    .player button{flex:1 1 auto;padding:8px 10px;font-size:13px;white-space:nowrap;min-height:40px}
    .toast{position:fixed!important;left:12px!important;right:12px;top:auto!important;bottom:78px;max-width:none!important}
    header{display:none}
    .actions{position:sticky;top:0;z-index:6;background:var(--paper);margin:0 -12px!important;padding:6px 12px 6px!important;scroll-behavior:smooth}
    .sj-cam{position:relative;width:100%}
    #fig{height:44vh;overflow:hidden!important;border:1.5px solid var(--rule);border-radius:12px;background:color-mix(in srgb,var(--paper) 70%,#fff)}
    .sj-rail{display:flex!important}
    .now-chip{position:static!important;width:100%;margin:8px 0 4px}
    .now-chip .v{font-size:14px} .now-chip .n{width:26px;height:26px;font-size:12px}
    .sj-inset{display:block!important}
    .sj-times{display:flex!important}
    .scope-panel>.win{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}
    .note p.txt{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
    .note .xtra{display:none}
    .note.open p.txt{display:block} .note.open .xtra{display:block}
    .sj-more{display:inline-block!important}
    .player label{display:none!important}
    .sj-qr-link{position:static;margin:10px auto 0;width:max-content}
    .sj-qr-link .sj-qr{display:none}
    .sj-qr-link span{font-size:13px;color:var(--ink);text-decoration:underline;letter-spacing:.02em}`;
const SJ_CSS = `
  header{display:none!important}
  .player{width:100%;display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:2px 0 6px;container-type:inline-size}
  .sj-deck{display:flex;border:2px solid var(--ink);border-radius:12px;overflow:hidden;background:#fffdf6;box-shadow:2px 2px 0 var(--ink)}
  .player .sj-deck button{display:flex;flex:1 1 auto;align-items:center;justify-content:center;gap:6px;margin:0;border:0;border-left:1.5px solid var(--rule);border-radius:0;background:transparent;box-shadow:none;transform:none;padding:6px 11px}
  .player .sj-deck button:first-child{border-left:0}
  .player .sj-deck button:not(:disabled):hover{background:color-mix(in srgb,var(--accent,#f4b829) 30%,transparent)}
  .player .sj-deck button:focus-visible{outline:2px solid var(--ink);outline-offset:-3px}
  .player .sj-deck button[aria-pressed=true]{background:var(--ink);color:var(--paper)}
  .player .sj-deck button svg{flex:0 0 auto}
  @container (max-width:790px){.player .sj-deck button:not(.main) .lbl{display:none}}
  @container (max-width:470px){.player .sj-deck button .lbl{display:none}.sj-deck{flex:1 1 100%}}
  .player button{font-size:13px;padding:6px 14px;min-height:36px}
  .player button[aria-pressed=true]{background:var(--ink);color:var(--paper)}
  .player button:disabled{opacity:.38;cursor:not-allowed}
  .player #sjPlay:disabled{opacity:1;cursor:default}
  .player label{display:flex;align-items:center;gap:6px;color:var(--muted);text-transform:uppercase;font-size:11px;letter-spacing:.08em}
  .player input{width:18px;height:18px;accent-color:var(--ink)}
  .sj-spacer{margin-left:auto}
  .scope-panel{width:100%;display:grid;grid-template-columns:1fr;gap:7px;align-content:start}
  .scope-panel svg{width:100%;height:auto;display:block}
  .note .k{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
  .note h2{font-size:14px;margin:1px 0 3px;font-weight:800}
  .note p{margin:0;font-size:13px;line-height:1.42}
  .note .meta{margin-top:4px;font-size:11.5px;color:#4d463c;line-height:1.35}
  .note .meta b{font-weight:800;color:var(--ink)}
  .sj-idea{margin:0;font-size:12.5px;line-height:1.38}
  .sj-idea b{font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-right:6px}
  .sj-cards{display:flex;flex-wrap:wrap;gap:5px;align-items:center;min-height:30px}
  .sj-cards .k{font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--muted);width:100%}
  .sj-cards button{font-size:12px;padding:3px 9px;min-height:28px;background:#fff4d6;border-radius:9px}
  .sj-cards button.always{background:transparent}
  .sj-times{display:none;flex-wrap:wrap;gap:5px}
  .sj-times span{border:1.5px solid var(--ink);border-radius:9px;padding:2px 7px;font-size:11.5px;background:#fffdf6}
  .sj-times b{font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-right:4px}
  .now-chip{position:relative;z-index:2;display:flex;align-items:center;gap:10px;background:var(--paper);border:2px solid var(--ink);border-radius:14px;box-shadow:3px 3px 0 var(--ink);padding:6px 12px 6px 10px;margin:0 4px 2px 0}
  .now-chip.busy{border-left:8px solid var(--accent,#f4b829)}
  .now-chip .n{flex:0 0 auto;width:30px;height:30px;border-radius:50%;background:var(--ink);color:var(--paper);display:grid;place-items:center;font-weight:800;font-size:13px}
  .now-chip .k{display:block;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}
  .now-chip .v{display:block;font-size:14.5px;font-weight:800;line-height:1.2}
  .actions{position:static!important;flex-direction:row!important;flex-wrap:wrap;gap:4px!important;max-width:none!important;margin:2px 0 4px}
  .actions .cap{display:none}
  .act{padding:3px 9px!important;font-size:12px}
  .act.next{background:var(--accent,#f4b829);animation:sjPulse 1.4s ease-in-out infinite}
  .act.done{opacity:.5}
  @keyframes sjPulse{50%{box-shadow:0 0 0 4px color-mix(in srgb,var(--accent,#f4b829) 45%,transparent)}}
  .controls,.made-with,#readout,.stats{display:none!important}
  .sj-footer{width:100%;text-align:center;font-size:12px;letter-spacing:.04em;color:var(--muted);margin-top:2px;position:relative;min-height:20px}
  .sj-footer .heart{color:#d63a4a;font-size:14px}
  .sj-qr-link{position:absolute;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;gap:2px;color:var(--muted);text-decoration:none;font-size:10px;letter-spacing:.06em}
  .sj-qr-link .sj-qr{width:76px;height:76px;background:#fbf8f0;border:1.5px solid var(--ink);border-radius:8px;padding:4px}
  dialog.sj-dlg{max-width:min(640px,92vw);max-height:84vh;border:2px solid var(--ink);border-radius:14px;box-shadow:4px 4px 0 var(--ink);background:var(--paper);color:var(--ink);padding:14px 18px;font:13px/1.45 ui-monospace,SFMono-Regular,Menlo,monospace}
  dialog.sj-dlg::backdrop{background:rgba(35,30,22,.35)}
  dialog.sj-dlg h3{margin:0 0 6px;font-size:15px}
  dialog.sj-dlg p{margin:0 0 8px}
  dialog.sj-dlg .src{font-size:12px;color:#4d463c}
  dialog.sj-dlg table{border-collapse:collapse;width:100%;font-size:12px}
  dialog.sj-dlg td{border-top:1px solid var(--rule);padding:4px 6px;vertical-align:top}
  dialog.sj-dlg ul{margin:0 0 8px;padding-left:18px}
  dialog.sj-dlg button{float:right;margin-left:8px}
  @media (min-width:900px){header,.stage,#fig,.player,.scope-panel,.sj-footer{max-width:1040px!important}}
  @media (min-width:1100px){
    body{display:grid!important;grid-template-columns:minmax(0,1.42fr) minmax(0,1fr);column-gap:28px;align-items:start;padding:12px max(28px,calc((100vw - 1560px) / 2)) 10px!important}
    .site-bar{grid-row:1;margin-bottom:4px!important}
    header{grid-column:1 / 3;grid-row:2;display:none}
    .stage{grid-column:1;grid-row:3}
    #fig{height:calc(100vh - 262px);border:1.5px solid var(--rule);border-radius:12px;background:color-mix(in srgb,var(--paper) 70%,#fff);margin:0 0 6px;overflow:hidden}
    .player{grid-column:1;grid-row:4}
    .scope-panel{grid-column:2;grid-row:3 / span 2;padding-bottom:0}
    .sj-footer{grid-column:1 / 3;grid-row:5;padding-right:0;min-height:18px}
    header,.stage,#fig,.player,.scope-panel,.sj-footer{max-width:none!important}
    .sj-qr-link{position:fixed;right:max(28px,calc((100vw - 1560px) / 2));bottom:8px}
    .sj-idea{padding-right:92px}
    .sj-cards{padding-right:92px}
  }
  @media (min-width:1100px) and (max-height:860px){ .note p{font-size:12.5px} .note .meta{font-size:11px} .sj-idea{font-size:12px} .scope-panel{gap:5px} #fig{height:calc(100vh - 240px)} .sj-qr-link .sj-qr{width:64px;height:64px} }
  @media (prefers-reduced-motion:reduce){.act.next{animation:none}}
  @media (max-width:560px){
${SJ_PHONE_CSS}
  }
  @media (orientation:landscape) and (max-height:500px) and (min-width:561px){
    body{padding:10px 16px 16px!important}
    .act{font-size:12px;padding:4px 11px}
${SJ_PHONE_CSS}
    #fig{height:64vh}
  }
  .sj-rail,.sj-inset,.sj-more{display:none}
  .sj-rail{gap:5px;overflow-x:auto;padding:8px 2px 4px;scroll-behavior:smooth;-webkit-overflow-scrolling:touch}
  .sj-rail button{flex:0 0 auto;width:34px;height:34px;padding:0;border-radius:9px;font:inherit;font-size:12px;font-weight:800;color:var(--ink);border:1.5px solid var(--ink);background:#fff4d6}
  .sj-rail button.done{opacity:.45}
  .sj-rail button.on{outline:3px solid var(--accent,#f4b829);outline-offset:1px}
  .sj-inset{position:absolute;top:8px;right:8px;width:62px;height:62px;padding:0;border:1.5px solid var(--ink);border-radius:50%;overflow:hidden;background:#fffdf6;z-index:3;transition:width .25s,height .25s,border-radius .25s}
  .sj-inset svg{width:100%;height:100%;display:block}
  .sj-inset.big{width:calc(100% - 16px);height:auto;aspect-ratio:640/272;border-radius:10px;box-shadow:2px 2px 0 var(--ink)}
  .sj-more{font:inherit;font-size:12px;border:0;background:none;padding:2px 0;color:var(--ink);text-decoration:underline;min-height:0}
  @media (prefers-reduced-motion:reduce){.sj-rail,.actions{scroll-behavior:auto}.sj-inset{transition:none}}`;

function sjNote(title, text, s0) {
  const t = document.getElementById('sjNoteTitle');
  if (!t) return;
  t.textContent = title;
  document.getElementById('sjNoteText').textContent = text;
  document.getElementById('sjMeta').innerHTML = s0
    ? `<b>Records:</b> ${sjEsc(s0.records)}<br><b>Can go wrong:</b> ${sjEsc(s0.risk)}<br><b>Source:</b> ${sjEsc(s0.src)}`
    : '';
}

/* ---------- dialogs: problem cards, the always-running panel, sources ---------- */
function sjOpenDialog(html) {
  const d = document.getElementById('sjDlg');
  d.innerHTML = `<button id="sjDlgClose">Close</button>${html}`;
  document.getElementById('sjDlgClose').onclick = () => d.close();
  d.showModal();
}
const sjOpenCard = c => sjOpenDialog(`<h3>${sjEsc(c.title)}</h3><p>${sjEsc(c.text)}</p><p class="src"><b>Source:</b> ${sjEsc(c.src)}</p>`);
const sjOpenAlways = () => sjOpenDialog(`<h3>Always running: not per sample</h3><p>These protect every result, but they do not sit on one sample's path.</p><table>${SJ.ALWAYS.map(a => `<tr><td><b>${sjEsc(a.what)}</b></td><td>${sjEsc(a.when)}</td><td class="src">${sjEsc(a.src)}</td></tr>`).join('')}</table>`);
const sjOpenSources = () => sjOpenDialog(`<h3>Sources</h3><ul>${SJ.SITE.sources.map(s => `<li>${sjEsc(s)}</li>`).join('')}</ul><p>${sjEsc(SJ.ORDER_NOTE)}</p><p class="src">Teaching figure for ${sjEsc(SJ.SITE.hospital)}. Patient details are made up. Lab values are from a sample report.</p>`);
function sjSyncCards() {
  const key = SJ.STATIONS[st.at].key, started = st.busy || st.step > 0 || st.u > 0, list = started ? SJ.CARDS.filter(c => c.at === key) : [];
  const box1 = document.getElementById('sjCards'), sig = key + started;
  if (box1.dataset.sig === sig) return;
  box1.dataset.sig = sig;
  box1.innerHTML = list.length ? '<span class="k">If something goes wrong: tap</span>' : '';
  list.forEach(c => { const b = document.createElement('button'); b.textContent = c.title; b.onclick = () => sjOpenCard(c); box1.appendChild(b); });
  [['Always running', sjOpenAlways], ['Sources', sjOpenSources]].forEach(([t, fn]) => { const b = document.createElement('button'); b.className = 'always'; b.textContent = t; b.onclick = fn; box1.appendChild(b); });
}

function sjShowWhole(on1) {
  st.userWhole = on1;
  const wholeBtn = document.getElementById('sjWhole');
  if (wholeBtn) wholeBtn.textContent = on1 ? '⊡ Follow the sample' : '⊞ The building';
}

/* the row of buttons, like an old cassette player. A short label where there is room, always the icon. */
const SJ_DECK_ICON = {
  first: 'M3 2.5h2v11H3zM13.5 2.5v11L8 8zM8 2.5v11L5.5 8z',
  prev: 'M8 2.5v11L1.5 8zM14.5 2.5v11L8 8z',
  play: 'M4 2.5v11L13.5 8z',
  pause: 'M3.5 2.5h3.2v11H3.5zM9.3 2.5h3.2v11H9.3z',
  stop: 'M3 3h10v10H3z',
  next: 'M1.5 2.5v11L8 8zM8 2.5v11L14.5 8z',
  last: 'M13 2.5h-2v11h2zM2.5 2.5v11L8 8zM8 2.5v11L10.5 8z',
};
const SJ_DECK = [
  { id: 'sjFirst', icon: 'first', label: 'First', title: 'First station' },
  { id: 'sjPrev', icon: 'prev', label: 'Previous', title: 'Previous station' },
  { id: 'sjPlay', icon: 'play', label: 'Play', title: 'Play', main: true },
  { id: 'sjPause', icon: 'pause', label: 'Pause', title: 'Pause', main: true },
  { id: 'sjStop', icon: 'stop', label: 'Stop', title: 'Stop and start over', main: true },
  { id: 'sjNext', icon: 'next', label: 'Next', title: 'Next station' },
  { id: 'sjLast', icon: 'last', label: 'Last', title: 'Last station' },
];
const sjDeckButton = b => `<button id="${b.id}" class="${b.main ? 'main' : ''}" title="${b.title}" aria-label="${b.title}"><svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true"><path d="${SJ_DECK_ICON[b.icon]}" fill="currentColor"/></svg><span class="lbl">${b.label}</span></button>`;

function sjBuildPanel() {
  const style = document.createElement('style'); style.textContent = SJ_CSS; document.head.appendChild(style);
  const player = document.createElement('div'); player.className = 'player'; player.setAttribute('role', 'group'); player.setAttribute('aria-label', 'Animation');
  player.innerHTML = `<div class="sj-deck" role="group" aria-label="Move through the stations">${SJ_DECK.map(sjDeckButton).join('')}</div><button id="sjWhole">⊞ The building</button><label><input type="checkbox" id="sjLoop"> Loop</label>`;
  const panel = document.createElement('section'); panel.className = 'scope-panel';
  panel.innerHTML = `<div class="win"><svg id="sjWin" viewBox="0 0 ${SJ_W.lisW + 344} ${SJ_W.h}" role="img" aria-label="The lab software screen and a close-up of this station"><g id="sjWinArt"></g></svg></div>`
    + `<div class="sj-times" id="sjTimes"></div>`
    + `<div class="note" aria-live="polite"><div class="k">What is happening</div><h2 id="sjNoteTitle"></h2><p class="txt" id="sjNoteText"></p><p class="meta xtra" id="sjMeta"></p></div>`
    + `<div class="sj-cards" id="sjCards"></div>`
    + `<p class="sj-idea"><b>The big idea</b>${SJ.SITE.bigIdea}</p>`;
  const stage = document.querySelector('.stage');
  const chip = document.createElement('div'); chip.className = 'now-chip'; chip.setAttribute('aria-live', 'polite');
  chip.innerHTML = '<span class="n" id="sjNowNum">1</span><span><span class="k" id="sjNowK">Start</span><span class="v" id="sjNow"></span></span>';
  stage.after(player); player.after(panel);
  const placeChip = () => { if (sjIsPhone()) document.querySelector('.sj-rail').after(chip); else panel.prepend(chip); };
  matchMedia('(max-width:560px), (orientation:landscape) and (max-height:500px)').addEventListener('change', placeChip);
  sjPlaceChip = placeChip;
  Object.entries({ sjFirst: sjGoFirst, sjPrev: sjGoPrev, sjPlay, sjPause, sjStop, sjNext: sjGoNext, sjLast: sjGoLast }).forEach(([id, fn]) => { document.getElementById(id).onclick = fn; });
  document.getElementById('sjLoop').onchange = e => { st.loop = e.target.checked; };
  const wholeBtn = document.getElementById('sjWhole');
  wholeBtn.onclick = () => { sjShowWhole(!st.userWhole); ui.render(); };
  const dlg = document.createElement('dialog'); dlg.id = 'sjDlg'; dlg.className = 'sj-dlg'; document.body.appendChild(dlg);
  const foot = document.createElement('footer'); foot.className = 'sj-footer';
  foot.innerHTML = 'Made with <span class="heart" aria-label="love">&#9829;</span> and a passion for teaching pathology · Dr. Atul Tiwari'
    + `<a class="sj-qr-link" href="${SJ.SITE.url}" target="_blank" rel="noopener"><img class="sj-qr" src="../shared/qr.svg" alt="QR code for atultiwari.com" width="76" height="76"><span>atultiwari.com</span></a>`;
  document.body.appendChild(foot);
}

function sjSyncPanel() {
  const s0 = SJ.STATIONS[st.at], chip = document.querySelector('.now-chip'), hop = st.hop && SJ_HOPS[st.hop.key];
  const started = (st.busy || st.u > 0 || st.step > 0) && !(st.hop && st.hop.kind === 'enter');
  document.getElementById('sjNowNum').textContent = hop ? '→' : started ? s0.num : '▶';
  document.getElementById('sjNow').textContent = hop ? hop.caption : started ? s0.name : 'Press Play to begin';
  document.getElementById('sjNowK').textContent = hop ? 'On the way' : started ? `Station ${s0.num} of ${SJ.STATIONS.length} · ${s0.who}` : `${SJ.SITE.hospital}, ${SJ.SITE.place}`;
  chip.classList.toggle('busy', st.busy);
  document.querySelectorAll('#btns .act').forEach((b, i) => {
    b.classList.toggle('done', i < st.step);
    b.classList.toggle('next', i === st.step && !st.busy);
  });
  const rows = sjLisRows(started ? s0.key : null).filter(([k]) => ['Registered', 'Collected', 'Received', 'Approved', 'Generated'].includes(k));
  document.getElementById('sjTimes').innerHTML = rows.map(([k, v]) => `<span><b>${k}</b>${sjEsc(v || '-')}</span>`).join('');
  sjSyncCards();
  sjSyncPlayer();
  sjPhoneSync();
}

/* ---------- the camera: follows the sample on every screen; the whole hospital on demand ---------- */
const sjIsPhone = () => matchMedia('(max-width:560px), (orientation:landscape) and (max-height:500px)').matches;
let sjVB = null;
/* the sketches live in their own layer inside the figure, so they share its camera and never redraw */
function sjBuildPlates() {
  const svg = document.getElementById('fig'), NS = 'http://www.w3.org/2000/svg', layer = document.createElementNS(NS, 'g');
  layer.id = 'sjPlates';
  SJ_PICTURES.forEach(name => {
    const im = document.createElementNS(NS, 'image');
    im.setAttribute('href', `scenes/${name}.jpg`);
    im.setAttribute('width', SJ_PLATE.w); im.setAttribute('height', SJ_PLATE.h);
    im.setAttribute('opacity', name === 'building' ? 1 : 0);
    im.dataset.place = name;
    layer.appendChild(im);
  });
  svg.insertBefore(layer, document.getElementById('art'));
}
function sjFadePlates(place, a) {
  document.querySelectorAll('#sjPlates image').forEach(im => {
    const now = +im.getAttribute('opacity'), want = im.dataset.place === place ? 1 : 0, next = now + (want - now) * a;
    im.setAttribute('opacity', Math.abs(next - want) < .01 ? want : next.toFixed(3));
  });
}
function sjCam() {
  const svg = document.getElementById('fig');
  if (!svg) return;
  const r = svg.getBoundingClientRect(), aspect = r.width && r.height ? r.width / r.height : 4 / 3;
  const wish = sjCamWish(st, sjIsPhone()), target = sjClampFrame(wish.c[0], wish.c[1], wish.w, aspect);
  const still = matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (!sjVB) sjVB = { ...target };
  const a = still ? 1 : .09, next = {};
  for (const k of ['x', 'y', 'w', 'h']) next[k] = sjVB[k] + (target[k] - sjVB[k]) * a;
  sjVB = next;
  svg.setAttribute('viewBox', `${f(sjVB.x)} ${f(sjVB.y)} ${f(sjVB.w)} ${f(sjVB.h)}`);
  INK_K = sjVB.w / INK_REF_VB;
  sjFadePlates(sjPictureNow(st), still ? 1 : .16);
}
function sjCentre(container, el) {
  if (!container || !el) return;
  const left = el.offsetLeft - (container.clientWidth - el.offsetWidth) / 2;
  container.scrollTo({ left: Math.max(0, left), behavior: matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth' });
}
function sjBuildPhone() {
  const svg = document.getElementById('fig'), cam = document.createElement('div'); cam.className = 'sj-cam';
  svg.before(cam); cam.appendChild(svg);
  const inset = document.createElement('button'); inset.className = 'sj-inset'; inset.setAttribute('aria-label', 'The lab software screen and close-up: tap to enlarge');
  inset.innerHTML = `<svg id="sjInsetSvg" viewBox="310 0 330 272"><use href="#sjWinArt"/></svg>`;
  inset.onclick = () => { const big = inset.classList.toggle('big'); document.getElementById('sjInsetSvg').setAttribute('viewBox', big ? `0 0 ${SJ_W.lisW + 344} ${SJ_W.h}` : '310 0 330 272'); };
  cam.appendChild(inset);
  const rail = document.createElement('div'); rail.className = 'sj-rail'; rail.setAttribute('aria-label', 'Stations 1 to 22');
  SJ.STATIONS.forEach((s0, i) => {
    const b = document.createElement('button');
    b.textContent = s0.num; b.title = `${s0.num}. ${s0.name}`;
    b.onclick = () => sjTapStation(i);
    rail.appendChild(b);
  });
  cam.after(rail);
  const more = document.createElement('button'); more.className = 'sj-more'; more.textContent = 'More';
  more.onclick = () => { const n = document.querySelector('.note'); n.classList.toggle('open'); more.textContent = n.classList.contains('open') ? 'Less' : 'More'; };
  document.getElementById('sjNoteText').after(more);
}
let sjLastActive = -1, sjLastStep = -1, sjPlaceChip = () => {};
function sjPhoneSync() {
  const rail = document.querySelector('.sj-rail');
  if (!rail) return;
  [...rail.children].forEach((b, i) => { b.classList.toggle('on', i === st.at && (st.busy || st.u > 0)); b.classList.toggle('done', i < st.at); });
  if (!sjIsPhone()) return;
  if (st.at !== sjLastActive) { sjLastActive = st.at; sjCentre(rail, rail.children[st.at]); }
  if (st.step !== sjLastStep) { sjLastStep = st.step; const acts = document.querySelectorAll('#btns .stepwrap'); sjCentre(document.getElementById('btns'), acts[Math.min(st.step, acts.length - 1)]); }
}

/* ---------- mount ---------- */
ui = mountFigure({
  fig: '01', title: 'Sample Journey', hint: '',
  size: [100, 100, 100], palette: 'mustard', state: st,
  scene: () => { sjLast = sjScene(st, sjNow()); return sjLast.svg; },
  buttonsLabel: 'Steps',
  buttons: SJ.STEPS.map((S1, n) => ({ label: `${n + 1}. ${S1.label}`, onClick: () => st.playing ? ui.flash('Autoplay is running: pause or stop it first') : sjGo(n) })),
  acts: { station: (s1, el) => { if (el.dataset.i != null) sjTapStation(+el.dataset.i); } },
  params: sjParams,
});
OX = OY = 0;
const sjBaseRender = ui.render;
ui.render = () => { sjCam(); sjBaseRender(); sjSyncPanel(); sjDrawWindow(st); };
sjBuildPlates();
sjBuildPanel();
sjBuildPhone();
sjPlaceChip();
document.title = 'Sample Journey · Shalby';
if (st.step || st.u) { const s0 = SJ.STATIONS[st.at]; sjNote(`${s0.num}. ${s0.name}`, s0.note, s0); }
else sjNote('Ready', 'One sample, from the doctor\'s order to the patient\'s report. Press Play, or press a step.');
sjSyncPlayer(); ui.render();
setInterval(() => { if (!st.busy || st.paused) ui.render(); }, 60);
const sjAuto = new URLSearchParams(location.search).get('autoplay');
if (sjAuto === '1') { st.loop = true; sjSyncPlayer(); sjPlay(); }
else if (sjAuto !== '0' && !st.step && !st.u) setTimeout(() => { if (!st.playing && !st.busy && !st.step) sjPlay(); }, 800);
