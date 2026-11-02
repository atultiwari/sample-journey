/* Sample Journey · Sketchbook: state, step runner, player and taps. The panel and phone layout are in sj-ui.js.
   The state is just where we are: the step, the active station `at`, the progress `u` in it. */

const SJ_DUR = { draw: 7, carry: 8, qc: 5, critical: 6.5, report: 6, sign: 4.5, check: 5 };
const SJ_DUR_DEFAULT = 3.6;
const sjDur = key => SJ_DUR[key] || SJ_DUR_DEFAULT;
const sjNow = () => performance.now() / 1000;
const sjFresh = () => ({ step: 0, at: 0, u: 0, busy: false, hop: null, held: false });
const st = { pal: 'mustard', playing: false, paused: false, loop: false, token: 0, whole: true, userWhole: false, ...sjFresh() };
let ui, sjLast = null;

/* ---------- the runner: a step is a list of stations; each eases u from 0 to 1 ---------- */
function sjRun(moves, done) {
  const token = st.token;
  let i = -1, mv = null, t = 0;
  const next = () => { if (++i >= moves.length) return false; mv = moves[i](); t = 0; return true; };
  next();
  ui.animate(dt => {
    if (token !== st.token) return false;
    if (st.paused) return true;
    t += dt; const u = Math.min(1, t / mv.dur); mv.step(u);
    if (u < 1) return true;
    if (next()) return true;
    done(); return false;
  });
}
const sjStationMove = key => () => {
  st.at = SJ.IDX[key]; st.u = 0; st.whole = false; st.hop = null;
  const s0 = SJ.STATIONS[st.at];
  sjNote(`${s0.num}. ${s0.name}`, s0.note, s0);
  return { dur: sjDur(key), step: u => { st.u = u; } };
};
/* the journey between two places, shown on the building sketch. It comes before its station and records nothing. */
const sjHopMove = key => () => {
  const H = SJ_HOPS[key];
  st.hop = { key, kind: H.kind, u: 0 }; st.whole = false;
  sjNote(H.title, H.text);
  return { dur: H.dur, step: u => { st.hop = { ...st.hop, u }; } };
};
const sjMovesFor = key => [...(SJ_HOPS[key] ? [sjHopMove(key)] : []), sjStationMove(key)];
const sjWait = (sec, then) => sjRun([() => ({ dur: sec, step: () => {} })], then);

function sjGo(n, after) {
  if (st.busy) return ui.flash('Wait for this step to finish');
  if (n < st.step) return ui.flash(`${SJ.STEPS[n].label} is already done`);
  if (n > st.step) return ui.flash(SJ.WHY_NOT[n]);
  const S1 = SJ.STEPS[n], here = S1.path.indexOf(SJ.STATIONS[st.at].key), from = st.held && here >= 0 ? here + 1 : 0;
  st.busy = true; st.held = false;
  sjRun(S1.path.slice(from).flatMap(sjMovesFor), () => {
    st.busy = false; st.step++;
    const s0 = SJ.STATIONS[st.at];
    sjNote(`Step ${n + 1} of ${SJ.STEPS.length}: ${S1.label}, done`, s0.done, s0);
    if (st.step >= SJ.STEPS.length) st.whole = true;
    if (after) after();
  });
}

/* ---------- taps on the drawing ---------- */
const sjStepOf = key => SJ.STEPS.findIndex(S1 => S1.path.includes(key));
function sjTapStation(i) {
  if (st.playing) return ui.flash('Autoplay is running: pause or stop it first');
  if (st.busy) return ui.flash('Wait for this step to finish');
  if (st.step >= SJ.STEPS.length) return ui.flash('All done: press Play or Stop to start over');
  const key = SJ.STATIONS[i].key, k = sjStepOf(key);
  if (k === st.step) return sjGo(st.step);
  if (k > st.step) return ui.flash(SJ.WHY_NOT[k]);
  const S1 = SJ.STEPS[st.step], first = SJ.STATIONS[SJ.IDX[S1.path[0]]];
  ui.flash(`Next: ${S1.label}. Tap ${first.label} (${first.num})`);
}

/* ---------- player ---------- */
function sjPlayNext() {
  if (!st.playing) return;
  if (st.step < SJ.STEPS.length) return sjGo(st.step, () => sjWait(1.2, sjPlayNext));
  if (st.loop) return sjWait(3, () => { sjResetState(); ui.render(); sjWait(1, sjPlayNext); });
  st.playing = false; sjSyncPlayer();
}
function sjPlay() {
  if (st.paused) { st.paused = false; return sjSyncPlayer(); }
  if (st.playing) return;
  if (st.step >= SJ.STEPS.length) sjResetState();
  st.playing = true; st.paused = false; sjSyncPlayer();
  if (!st.busy) sjPlayNext();
  else ui.flash('Autoplay picks up after this step');
}
function sjPause() { if (!(st.playing || st.busy) || st.paused) return; st.paused = true; sjSyncPlayer(); }
/* First, Previous, Next, Last: go straight to a station and hold there, so it can be read for as long as it takes. Nothing
   animates backwards: the picture simply changes. Play then carries on from the station after this one. */
const sjStarted = () => st.busy || st.u > 0 || st.step > 0;
function sjSeek(i) {
  const at = Math.max(0, Math.min(SJ.STATIONS.length - 1, i)), key = SJ.STATIONS[at].key, k = sjStepOf(key), path = SJ.STEPS[k].path;
  st.token++;
  Object.assign(st, { playing: false, paused: false, busy: false, hop: null, whole: false, at, u: 1, held: true, step: path[path.length - 1] === key ? k + 1 : k });
  sjShowWhole(false);
  const s0 = SJ.STATIONS[at];
  sjNote(`${s0.num}. ${s0.name}`, s0.note, s0);
  sjSyncPlayer(); ui.render();
}
const sjGoFirst = () => sjSeek(0);
const sjGoPrev = () => sjSeek(st.hop ? st.at : st.at - 1);
const sjGoNext = () => sjSeek(sjStarted() ? st.at + 1 : 0);
const sjGoLast = () => sjSeek(SJ.STATIONS.length - 1);
function sjStop() { st.token++; st.playing = false; st.paused = false; sjResetState(); sjSyncPlayer(); ui.render(); }
function sjResetState() {
  st.token++;
  Object.assign(st, sjFresh(), { whole: true });
  sjNote('Ready', 'One sample, from the doctor\'s order to the patient\'s report. Press Play, or press a step.');
}
function sjSyncPlayer() {
  const pb = document.getElementById('sjPlay');
  if (!pb) return;
  const run = (st.playing || st.busy) && !st.paused, label = run ? 'Playing' : st.paused ? 'Resume' : 'Play', last = SJ.STATIONS.length - 1;
  const enable = (id, on1) => { document.getElementById(id).disabled = !on1; };
  pb.querySelector('.lbl').textContent = label;
  pb.setAttribute('aria-label', label); pb.title = label;
  pb.disabled = run;
  pb.setAttribute('aria-pressed', String(run));
  enable('sjPause', run);
  enable('sjStop', sjStarted());
  enable('sjFirst', sjStarted() ? st.at > 0 || !!st.hop : true);
  enable('sjPrev', st.at > 0 || (!!st.hop && st.hop.kind !== 'enter'));
  enable('sjNext', !sjStarted() || st.at < last);
  enable('sjLast', !sjStarted() || st.at < last);
  document.getElementById('sjLoop').checked = st.loop;
}

/* ---------- ?at=draw&u=.5 (or ?step=4) opens at any moment, for screenshots and teaching ---------- */
function sjParams(s1, q) {
  const key = q.get('at'), n = q.get('step');
  if (key && SJ.IDX[key] != null) {
    const u = Math.max(0, Math.min(1, +(q.get('u') ?? 1)));
    Object.assign(s1, { at: SJ.IDX[key], u, step: Math.max(0, sjStepOf(key)), busy: false, whole: false });
  } else if (n != null && +n > 0) {
    const k = Math.min(SJ.STEPS.length, +n), last = SJ.STEPS[k - 1].path.slice(-1)[0];
    Object.assign(s1, { step: k, at: SJ.IDX[last], u: 1, whole: k >= SJ.STEPS.length });
  }
  if (q.get('whole') === '1') { s1.whole = true; s1.userWhole = true; }
}
