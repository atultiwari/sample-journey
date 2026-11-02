// node --test tests/   The page's data must match docs/spec.md, keep moving forward, and hold no real patient data.
import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const SJ = createRequire(import.meta.url)('../shared/sj-spec.js');
const specMd = readFileSync(new URL('../docs/spec.md', import.meta.url), 'utf8');
const dataText = readFileSync(new URL('../shared/sj-spec.js', import.meta.url), 'utf8');

test('22 stations in 9 steps, each station used once, in order', () => {
  assert.equal(SJ.STATIONS.length, 22);
  assert.equal(SJ.STEPS.length, 9);
  const walked = SJ.STEPS.flatMap(s => s.path);
  assert.deepEqual(walked, SJ.STATIONS.map(s => s.key));
  SJ.STATIONS.forEach((s, i) => assert.equal(s.num, i + 1));
});

test('every station label and full name is the one in the spec', () => {
  for (const s of SJ.STATIONS) {
    assert.ok(specMd.includes(`| ${s.num} | ${s.label} | ${s.name} |`), `station ${s.num} ${s.label}: "${s.name}" not in spec`);
  }
});

test('every station has who, records, problems, source, note and done line', () => {
  for (const s of SJ.STATIONS) {
    for (const k of ['who', 'records', 'risk', 'src', 'note', 'done']) assert.ok(s[k], `${s.key} lacks ${k}`);
  }
});

test('every problem card has an action and a source', () => {
  assert.ok(SJ.CARDS.length >= 15);
  const keys = new Set(SJ.STATIONS.map(s => s.key));
  for (const c of SJ.CARDS) {
    assert.ok(keys.has(c.at), `${c.title} is at an unknown station`);
    assert.ok(c.title && c.text && c.src, `${c.title} is incomplete`);
  }
});

test('the gaps Dr. Tiwari listed each have a card', () => {
  for (const want of ['Difficult draw', 'Haemolysis', 'Wrong tube', 'Underfill', 'Faint', 'Spill', 'Reject', 'QC fails', 'Amended report', 'WhatsApp', 'Doctor unreachable']) {
    assert.ok(SJ.CARDS.some(c => c.title.includes(want)), `no card for ${want}`);
  }
});

test('critical alert and routine report are separate stations, critical first', () => {
  const crit = SJ.STATIONS.find(s => s.key === 'critical'), rep = SJ.STATIONS.find(s => s.key === 'report');
  assert.ok(crit.num < rep.num);
  assert.match(crit.name, /read-back/i);
  assert.doesNotMatch(rep.name, /critical/i);
});

test('QC, calibration and EQA are placed correctly', () => {
  assert.ok(!SJ.STATIONS.some(s => /calibrat|EQA|proficiency/i.test(s.label + s.name)), 'calibration and EQA are not stations');
  const panel = SJ.ALWAYS.map(a => a.what).join(' ');
  assert.match(panel, /Calibration/); assert.match(panel, /EQA/);
  assert.match(SJ.STATIONS.find(s => s.key === 'qc').note, /schedule/i);
});

test('no number that the spec leaves to policy is invented', () => {
  const policy = dataText.toLowerCase();
  assert.ok(policy.includes("per the lab's documented policy"));
  assert.doesNotMatch(dataText, /critical limit[^.]{0,30}\d/i);
  assert.doesNotMatch(dataText, /within \d+ (minutes|min)\b/i);
});

test('the fictional patient is clearly fictional, and no real identifier is present', () => {
  assert.equal(SJ.PATIENT.name, 'Mr Demo Patient');
  assert.equal(SJ.PATIENT.pid, 'SHLDEMO00001');
  assert.match(SJ.PATIENT.watermark, /NOT A REAL REPORT/);
});

/* The real identifiers live only in a local file that git ignores, so this public repo never holds them. One per line. */
const realListUrl = new URL('./real-identifiers.private.txt', import.meta.url);
test('no real patient identifier anywhere in the project', { skip: !existsSync(realListUrl) && 'no local identifier list on this machine' }, () => {
  const real = readFileSync(realListUrl, 'utf8').split('\n').map(t => t.trim()).filter(Boolean);
  assert.ok(real.length >= 4);
  const files = ['docs/spec.md', 'shared/sj-spec.js', 'README.md', 'assets/generated/README.md', 'sketchbook/sj-app.js', 'sketchbook/sj-ui.js', 'sketchbook/sj-places.js', 'sketchbook/sj-overlay.js', 'sketchbook/sj-window.js', 'tests/spec-data.test.mjs'];
  for (const f of files) {
    const text = readFileSync(new URL(`../${f}`, import.meta.url), 'utf8');
    for (const t of real) assert.ok(!text.includes(t), `real identifier found in ${f}`);
  }
});

test('report values match the spec', () => {
  const k = SJ.RESULTS.find(r => r.name === 'Potassium');
  assert.equal(k.value, '6.91'); assert.equal(k.range, '3.5 - 5.1');
  assert.equal(SJ.TIMES.collected, '03:00 PM');
  assert.equal(SJ.TIMES.generated, '04:11 PM');
});

test('hospital spelling is the one on the reports', () => {
  assert.ok(dataText.includes('Shalby'));
  assert.ok(!dataText.includes('Shelby'));
});

test('order of draw is marked as CLSI, separate from NABL', () => {
  assert.deepEqual(SJ.ORDER_OF_DRAW.map(t => t.tube), ['Blood culture', 'Citrate', 'Serum', 'Heparin', 'EDTA', 'Fluoride']);
  assert.match(SJ.ORDER_NOTE, /CLSI/); assert.match(SJ.ORDER_NOTE, /unverified/i);
});

test('each wrong-order reason names a real step', () => {
  assert.equal(SJ.WHY_NOT.length, SJ.STEPS.length);
  SJ.WHY_NOT.forEach((w, i) => { if (i) assert.ok(w.length > 10, `step ${i} has no reason`); });
});

test('every station except the carry has its own scene, and the page names none that is missing', () => {
  const missing = SJ.STATIONS.filter(s => s.key !== 'carry' && !existsSync(new URL(`../sketchbook/scenes/${s.key}.jpg`, import.meta.url))).map(s => s.key);
  assert.deepEqual(missing, []);
  for (const still of ['building', 'lift-patient', 'lift-carrier', 'lift-closed', 'lift-shaft']) assert.ok(existsSync(new URL(`../sketchbook/scenes/${still}.jpg`, import.meta.url)), still);
});
