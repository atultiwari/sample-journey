/* Sample Journey · Sketchbook: the window. Left: the LIS screen, whose fields fill as the sample moves. Right: a close-up of
   what matters at this station. Everything about the patient is made up, and the screen says so. */

const SJ_W = { w: 640, h: 272, lisW: 296 };
const sjEsc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const sjT = (x, y, str, size = 13, col = '#231e16', weight = 500, anchor = 'start') =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${col}" font-weight="${weight}" text-anchor="${anchor}" font-family="ui-monospace,Menlo,monospace">${sjEsc(str)}</text>`;
const sjR = (x, y, w, h, fillCol = '#fff', r = 4, stroke = '#231e16', sw = 1.4) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fillCol}" stroke="${stroke}" stroke-width="${sw}"/>`;
const sjTick = (x, y, col = '#2e8a5c') => `<path d="M${x} ${y}l4 5l8 -11" fill="none" stroke="${col}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`;
/* A tube's vacuum draws a set volume and then stops, so blood never reaches the cap (BD, see Sources). fillTo = 1 is that volume.
   mark = the fill indicator etched on a citrate tube. */
const SJ_DRAW_FILL = .72;
const sjTube = (x, y, cap, h = 62, fillTo = 1, top = '#a8222f', bottom = null, mark = false) => {
  const wall = sjR(x, y + 10, 18, h, '#f6f4ec', 5), level = y + 10 + h * (1 - SJ_DRAW_FILL), fy = y + 10 + h * (1 - SJ_DRAW_FILL * fillTo), base = y + 10 + h;
  const liquid = fillTo > 0 ? `<rect x="${x + 1}" y="${fy}" width="16" height="${Math.max(0, base - fy - 1)}" rx="4" fill="${top}"/>` : '';
  const cells = bottom ? `<rect x="${x + 1}" y="${base - (base - level) * .5}" width="16" height="${(base - level) * .5 - 1}" rx="4" fill="${bottom}"/>` : '';
  const indicator = mark ? `<path d="M${x - 5} ${level}H${x + 23}" stroke="#231e16" stroke-width="2"/>` : '';
  return wall + liquid + cells + indicator + sjR(x - 1, y, 20, 12, cap, 3);
};
/* a made-up barcode: stripes from the demo ID only */
function sjBarcode(x, y, w, h, text) {
  let s = sjR(x, y, w, h + 16, '#fff', 3), cx = x + 6;
  for (const ch of text.repeat(3)) { const bw = 1 + (ch.charCodeAt(0) % 3); if (cx + bw > x + w - 6) break; s += `<rect x="${cx}" y="${y + 4}" width="${bw}" height="${h - 2}" fill="#231e16"/>`; cx += bw + 1 + (ch.charCodeAt(0) % 2); }
  return s + sjT(x + w / 2, y + h + 12, text, 10, '#231e16', 700, 'middle');
}

/* ---------- the LIS screen ---------- */
function sjLisRows(key) {
  const I = SJ.IDX, at = key ? I[key] : -1, T = SJ.TIMES, P1 = SJ.PATIENT, has = k => at >= I[k];
  return [
    ['Patient', has('register') ? P1.name : ''], ['PID', has('register') ? P1.pid : ''],
    ['Lab ID', has('register') ? P1.labId : ''], ['Ref. By', at >= 0 ? P1.refBy : ''],
    ['Registered', has('register') ? T.registered : ''], ['Collected', has('label') ? T.collected : ''],
    ['Collector', has('label') ? 'Staff DEMO-P1' : ''], ['Received', has('scan') ? `CBC ${T.receivedCbc.slice(0, 5)}, Serum ${T.receivedSerum.slice(0, 5)}` : ''],
    ['Status', has('accept') ? (has('sign') ? 'Authorised' : has('run') ? 'Results held' : 'Accepted') : ''],
    ['Approved', has('sign') ? `CBC ${T.approvedCbc.slice(0, 5)}, Renal ${T.approvedRenal.slice(0, 5)}` : ''],
    ['Critical call', has('critical') ? 'Logged, read-back done' : ''], ['Generated', has('report') ? T.generated : ''],
  ];
}
function sjLis(key, active) {
  const w = SJ_W.lisW, rows = sjLisRows(key);
  let s = sjR(1, 1, w, SJ_W.h - 2, '#f8fbf9', 8) + `<rect x="2" y="2" width="${w - 2}" height="24" fill="#2f5d62" rx="6"/>` + sjT(10, 19, `LIS · Shalby · ${SJ.PATIENT.date}`, 12, '#fff', 700);
  rows.forEach(([k, v], i) => {
    const y = 42 + i * 16.8;
    s += sjT(9, y, k, 11.5, '#5d6a64', 600) + (v ? sjT(102, y, v, 11.5, '#17332e', 700) : sjT(102, y, '-', 11.5, '#a8aea9', 500));
  });
  return s + `<rect x="2" y="${SJ_W.h - 22}" width="${w - 2}" height="20" fill="#fbe9c8"/>` + sjT(w / 2, SJ_W.h - 8, SJ.PATIENT.watermark, 10.5, '#8a3b1d', 800, 'middle');
}

/* ---------- close-ups: one small drawing per station, in a 324 x 270 box ---------- */
const SJ_CLOSE = {
  order: () => sjR(50, 18, 220, 232, '#fff') + sjT(160, 42, 'TEST REQUEST', 14, INK, 800, 'middle')
    + ['Patient: linked', 'Doctor: Ref. By', 'Tests: CBC, Renal,', '  Glucose, PT/INR,', '  Blood culture', 'Clinical details: yes', 'Priority: routine'].map((t, i) => sjT(66, 70 + i * 24, t, 13)).join(''),
  register: () => sjR(36, 46, 250, 150, '#eef6f3') + sjT(160, 76, 'ONE UNIQUE NUMBER', 13, INK, 800, 'middle') + sjT(160, 116, SJ.PATIENT.pid, 22, '#2f5d62', 800, 'middle') + sjT(160, 150, `Lab ID ${SJ.PATIENT.labId}`, 14, INK, 600, 'middle') + sjT(160, 178, `Registered ${SJ.TIMES.registered}`, 12, '#5d564a', 500, 'middle'),
  ready: () => sjT(160, 40, 'BEFORE THE NEEDLE', 14, INK, 800, 'middle') + ['Fasting needed?', 'Last dose time?', 'Timed sample?'].map((t, i) => sjR(40, 62 + i * 52, 240, 40, '#fff') + sjT(84, 88 + i * 52, t, 14, INK, 600) + sjTick(56, 84 + i * 52)).join(''),
  ids: () => sjT(160, 38, 'TWO IDENTIFIERS', 14, INK, 800, 'middle') + sjR(30, 58, 262, 66, '#fff') + sjT(46, 82, '1. Patient says name', 13, INK, 700) + sjT(46, 108, SJ.PATIENT.name, 14, '#2f5d62', 800) + sjTick(262, 92)
    + sjR(30, 136, 262, 66, '#fff') + sjT(46, 160, '2. PID matches request', 13, INK, 700) + sjT(46, 186, SJ.PATIENT.pid, 14, '#2f5d62', 800) + sjTick(262, 170) + sjT(160, 234, 'Two matches, or no needle', 13, '#8a3b1d', 800, 'middle'),
  consent: () => sjT(160, 38, 'CONSENT', 14, INK, 800, 'middle') + sjR(24, 56, 274, 80, '#eef6f3') + sjT(36, 82, 'Routine draw', 13, INK, 800) + sjT(36, 104, 'Inferred when arm is', 12.5) + sjT(36, 122, 'willingly offered', 12.5)
    + sjR(24, 148, 274, 94, '#fbe9c8') + sjT(36, 174, 'HIV test, invasive', 13, INK, 800) + sjT(36, 196, 'procedures: informed', 12.5) + sjT(36, 214, 'consent required', 12.5),
  draw: (u) => {
    const O = SJ.ORDER_OF_DRAW; let s = sjT(160, 30, 'ORDER OF DRAW', 14, INK, 800, 'middle') + sjT(160, 48, 'from CLSI, not NABL/NABH', 10.5, '#8a3b1d', 700, 'middle');
    const used = O.filter(t => t.used); let n = 0;
    O.forEach((t, i) => {
      const x = 16 + i * 50, idx = t.used ? n++ : -1, fillTo = t.used ? Math.min(1, Math.max(0, u * used.length - idx)) : 0;
      s += `<g opacity="${t.used ? 1 : .32}">` + sjTube(x + 6, 62, t.cap, 92, fillTo, '#a8222f', null, t.tube === 'Citrate') + sjT(x + 15, 186, i + 1, 13, INK, 800, 'middle') + '</g>' + sjT(x + 15, 204, t.tube.replace('Blood culture', 'Culture'), 8.5, INK, 700, 'middle');
    });
    return s + sjT(160, 218, 'Faded: not needed today', 10.5, '#5d564a', 600, 'middle') + sjT(160, 233, 'Blood stops by itself, below the cap.', 11, INK, 800, 'middle') + sjT(160, 247, 'Citrate: must reach the fill mark.', 11, INK, 800, 'middle') + sjT(160, 260, 'PRE02 text unverified', 9, '#8a3b1d', 600, 'middle');
  },
  label: () => sjTube(44, 40, SJ_CAPS.serum, 170, 1) + sjBarcode(92, 66, 200, 60, SJ.PATIENT.labId) + sjT(92, 176, 'Patient still in chair', 13, INK, 800) + sjT(92, 200, `Collected ${SJ.TIMES.collected}`, 13) + sjT(92, 224, 'By Staff DEMO-P1', 13),
  care: () => sjT(160, 38, 'AFTER THE DRAW', 14, INK, 800, 'middle') + ['Bleeding stopped?', 'Patient feels well?', 'Sharps in container?'].map((t, i) => sjR(36, 58 + i * 58, 250, 46, '#fff') + sjT(80, 87 + i * 58, t, 13.5, INK, 600) + sjTick(52, 84 + i * 58)).join(''),
  pack: () => sjT(160, 28, 'THREE LAYERS', 14, INK, 800, 'middle') + sjR(36, 44, 250, 200, '#a9c3e6') + sjT(160, 64, '3. Rigid box', 12.5, INK, 800, 'middle') + sjR(72, 74, 178, 150, '#e8f1f7') + sjT(160, 94, '2. Leak-proof bag', 12, INK, 800, 'middle') + sjTube(112, 106, SJ_CAPS.serum, 84, 1) + sjT(140, 150, '1. Tube', 12, INK, 800) + sjT(140, 170, '+ time log', 11, '#5d564a', 700),
  carry: (u) => {
    const z = Math.min(1, Math.max(0, (u - .14) / .7)), y = 236 - 206 * ease(z);
    let s = sjR(36, 22, 58, 226, '#e7edf0') + sjT(65, 38, '9', 15, '#b0472c', 800, 'middle') + sjT(65, 244, 'B', 15, '#b0472c', 800, 'middle');
    return s + sjR(44, y - 22, 42, 26, '#5b7fb5') + sjT(180, 90, 'By hand only', 15, INK, 800, 'middle') + sjT(180, 118, 'Basement to 9th floor', 13, INK, 600, 'middle') + sjT(180, 156, 'Time limit:', 13, INK, 700, 'middle') + sjT(180, 176, "per the lab's", 12, INK, 500, 'middle') + sjT(180, 194, 'documented policy', 12, INK, 500, 'middle');
  },
  scan: (u) => sjBarcode(52, 52, 220, 62, SJ.PATIENT.labId) + `<rect x="46" y="${58 + 60 * Math.abs(Math.sin(u * 6))}" width="232" height="3" fill="#d6502c"/>` + sjT(160, 170, `Collected ${SJ.TIMES.collected}`, 13.5, INK, 700, 'middle') + sjT(160, 194, `Received ${SJ.TIMES.receivedCbc} / ${SJ.TIMES.receivedSerum}`, 12, INK, 700, 'middle') + sjT(160, 226, 'STAT samples first', 13, '#8a3b1d', 800, 'middle'),
  accept: () => sjT(160, 34, 'A PERSON DECIDES', 14, INK, 800, 'middle') + ['Right tube', 'Enough volume', 'No clot, no haemolysis', 'Label correct', 'Within time'].map((t, i) => sjT(66, 70 + i * 36, t, 13.5, INK, 600) + sjTick(40, 66 + i * 36)).join('') + sjT(160, 252, 'Fail: reject, tell, recollect', 11.5, '#8a3b1d', 800, 'middle'),
  spin: (u) => { const s1 = u > .5; return sjT(160, 32, s1 ? 'AFTER SPINNING' : 'BEFORE SPINNING', 14, INK, 800, 'middle') + sjTube(90, 52, SJ_CAPS.serum, 160, 1, s1 ? '#efd98a' : '#a8222f', s1 ? '#8d1d27' : null) + sjTube(200, 52, SJ_CAPS.citrate, 160, 1, s1 ? '#efd98a' : '#a8222f', s1 ? '#8d1d27' : null) + sjT(99, 244, 'Serum', 12, INK, 700, 'middle') + sjT(209, 244, 'Citrate', 12, INK, 700, 'middle'); },
  send: () => [['Serum', 'Biochemistry', SJ_CAPS.serum], ['EDTA', 'Haematology', SJ_CAPS.edta], ['Citrate', 'Coagulation', SJ_CAPS.citrate], ['Culture', 'Microbiology', SJ_CAPS.culture]].map(([a, b, c], i) => sjR(24, 26 + i * 56, 274, 44, '#fff') + sjR(36, 34 + i * 56, 18, 28, c, 3) + sjT(66, 54 + i * 56, a, 13, INK, 800) + sjT(280, 54 + i * 56, b, 13, INK, 600, 'end')).join(''),
  qc: (u) => {
    const xs = [38, 72, 106, 140, 174, 208, 242, 276], ys = [0, -7, 9, 3, -5, 11, -2, 4], n = Math.ceil(xs.length * Math.min(1, u * 1.4 + .15));
    let s = sjT(160, 28, 'LEVEY-JENNINGS CHART', 13.5, INK, 800, 'middle') + sjR(20, 40, 284, 150, '#fff');
    [[115, 'Mean'], [70, '+2 SD'], [160, '-2 SD']].forEach(([y, t]) => { s += `<line x1="24" x2="300" y1="${y}" y2="${y}" stroke="#7d8a88" stroke-dasharray="${t === 'Mean' ? '0' : '5 4'}"/>` + sjT(298, y - 3, t, 9.5, '#5d6a64', 600, 'end'); });
    s += `<polyline fill="none" stroke="#2f5d62" stroke-width="2" points="${xs.slice(0, n).map((x, i) => `${x},${115 + ys[i] * 3}`).join(' ')}"/>` + xs.slice(0, n).map((x, i) => `<circle cx="${x}" cy="${115 + ys[i] * 3}" r="4" fill="#2f5d62"/>`).join('');
    return s + sjT(160, 214, 'Illustration, not real QC data', 10.5, '#8a3b1d', 700, 'middle') + sjT(160, 234, 'In control: results may go on', 13, '#2e8a5c', 800, 'middle') + sjT(160, 254, 'On a schedule, not per sample', 11.5, INK, 600, 'middle');
  },
  run: () => { const R = SJ.RESULTS.filter(r => ['Potassium', 'Creatinine', 'Glucose (R)', 'Haemoglobin'].includes(r.name)); return sjT(160, 30, 'RESULTS HELD IN LIS', 14, INK, 800, 'middle') + R.map((r, i) => sjR(24, 44 + i * 40, 274, 32, '#f2f2ee') + sjT(36, 65 + i * 40, r.name, 12.5, INK, 600) + sjT(286, 65 + i * 40, 'held', 12, '#8a3b1d', 800, 'end')).join('') + sjT(160, 224, 'PT/INR: not shown in this example', 10.5, '#5d564a', 600, 'middle') + sjT(160, 242, 'Blood culture: incubating', 12, '#5d564a', 700, 'middle'); },
  check: () => sjT(160, 28, 'TECHNICAL CHECK', 14, INK, 800, 'middle') + sjR(24, 42, 274, 86, '#fbe9c8') + sjT(36, 68, 'Potassium', 13, INK, 700) + sjT(286, 68, '6.91 mmol/L', 14, '#a12c1e', 800, 'end') + sjT(36, 92, 'Range', 12) + sjT(286, 92, '3.5 - 5.1', 12, INK, 600, 'end') + sjT(36, 116, 'Previous', 12) + sjT(286, 116, 'compare when on file', 11, INK, 600, 'end') + ['Analyser flags seen', 'Haemolysis looked for', 'Do not delay a true critical call'].map((t, i) => sjT(52, 156 + i * 28, t, i === 2 ? 11.5 : 13, i === 2 ? '#8a3b1d' : INK, 700) + sjTick(28, 152 + i * 28)).join(''),
  sign: () => sjT(160, 26, 'AUTHORISED REPORT', 14, INK, 800, 'middle') + SJ.RESULTS.slice(0, 5).map((r, i) => sjT(26, 52 + i * 22, r.name, 12.5, INK, r.critical ? 800 : 500) + sjT(214, 52 + i * 22, r.value, 13, r.critical ? '#a12c1e' : INK, 800, 'end') + sjT(296, 52 + i * 22, r.range, 10, '#5d564a', 500, 'end')).join('') + sjR(22, 170, 280, 76, '#eef6f3') + sjT(36, 194, `Approved On ${SJ.TIMES.approvedRenal}`, 13, INK, 700) + sjT(36, 216, SJ.PATIENT.authoriser, 13, '#2f5d62', 800) + sjT(36, 234, 'MD Pathology', 11, '#5d564a', 600),
  critical: () => sjT(160, 24, 'PHONE, NOW. NOT A MESSAGE', 12.5, '#a12c1e', 800, 'middle') + sjR(14, 34, 278, 62, '#fff', 8) + sjT(24, 54, 'Lab:', 11.5, INK, 800) + sjT(58, 54, 'Mr Demo Patient, PID', 11.5) + sjT(58, 70, 'SHLDEMO00001. Potassium', 11.5) + sjT(58, 86, '6.91 mmol/L. Critical.', 11.5, '#a12c1e', 800)
    + sjR(32, 102, 278, 46, '#e7f4ec', 8) + sjT(42, 122, 'Doctor:', 11.5, INK, 800) + sjT(96, 122, 'Reading back: Demo', 11.5) + sjT(96, 138, 'Patient, potassium 6.91.', 11.5) + sjT(14, 170, 'LOG', 12.5, INK, 800) + ['Date and time, who called', 'Who was told, result given', 'Read-back done, any difficulty'].map((t, i) => sjT(38, 190 + i * 20, t, 12, INK, 600) + sjTick(16, 187 + i * 20)).join('') + sjT(160, 258, "Critical limit: per the lab's documented policy", 9, '#5d564a', 700, 'middle'),
  report: () => sjR(10, 12, 148, 186, '#e7f4ec', 12) + sjT(84, 34, 'WhatsApp', 12.5, INK, 800, 'middle') + ['Report is ready.', 'Open secure link', 'with OTP.'].map((t, i) => sjT(20, 60 + i * 20, t, 11.5)).join('') + ['Opt-in recorded', 'Number confirmed'].map((t, i) => sjT(20, 140 + i * 22, t, 10.5, '#2f5d62', 700)).join('')
    + sjR(170, 12, 144, 186, '#fff8e6', 12) + sjT(242, 34, 'Hard copy', 12.5, INK, 800, 'middle') + ['Counter checks', 'identity first', 'then hands over,', 'logged'].map((t, i) => sjT(180, 60 + i * 20, t, 11.5)).join('') + sjT(160, 222, `Generated On ${SJ.TIMES.generated}`, 13, INK, 700, 'middle') + sjT(160, 244, 'Critical result: already phoned', 11.5, '#a12c1e', 800, 'middle'),
  store: () => sjT(160, 28, 'KEEP IT FINDABLE', 14, INK, 800, 'middle') + sjR(34, 42, 256, 96, '#eef3f6') + [0, 1, 2, 3, 4, 5, 6, 7].map(i => sjTube(50 + i * 29, 54, i === 2 ? SJ_CAPS.serum : '#c7cdd1', 50, i === 2 ? 1 : .4)).join('') + sjT(36, 164, 'Biochemistry: min 1 day, 2-8 °C', 11.5, INK, 700) + sjT(36, 186, 'CBC: up to 24 h, 2-8 °C', 11.5, INK, 700) + sjT(36, 208, 'Coagulation: up to 4 h, room temp', 10.5, INK, 700) + sjT(36, 236, 'Source: NABL 112A', 10.5, '#5d564a', 600),
  discard: () => `<path d="M112 80h100l-10 150h-80z" fill="#c8ced1" stroke="#231e16" stroke-width="1.6"/>` + sjR(102, 66, 120, 16, '#9aa2a6', 3) + sjT(160, 150, 'BMW', 22, '#fff', 800, 'middle') + sjT(160, 36, 'AS PER BMW RULES', 14, INK, 800, 'middle') + sjT(160, 252, 'Bin colours: unverified, see Sources', 10.5, '#8a3b1d', 700, 'middle'),
};

function sjDrawWindow(st) {
  const el = document.getElementById('sjWinArt');
  if (!el) return;
  const key = SJ.STATIONS[st.at].key, started = (st.busy || st.step > 0 || st.u > 0) && !(st.hop && st.hop.kind === 'enter');
  const close = started ? SJ_CLOSE[key](st.u) : sjT(160, 90, 'Press Play', 18, INK, 800, 'middle') + sjT(160, 122, 'Follow one sample from', 13, INK, 500, 'middle') + sjT(160, 142, 'the order to the report', 13, INK, 500, 'middle');
  el.innerHTML = sjLis(started ? key : null) + `<g transform="translate(${SJ_W.lisW + 12} 1)">${sjR(0, 0, 330, SJ_W.h - 2, '#fffdf6', 8)}<g transform="translate(3 0)">${close}</g></g>`;
}
