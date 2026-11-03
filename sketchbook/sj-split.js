/* Sample Journey · Sketchbook: the two split scenes, drawn over their comic-strip pictures. Station 19: the call goes across
   the gutter and a projection of the treating doctor's mobile shows only the critical value. Station 20: the patient's copy
   is printed at the counter, and the doctor's mobile shows the full report arriving as a PDF. The phone screens are drawn here,
   not in the pictures, so every word on them is exact. Everything about the patient is made up. */

const SJ_SPLIT = {
  critical: { callFrom: [280, 262], callTo: [690, 258], mobile: [752, 318], card: [672, 136] },
  report: { mobile: [730, 318], card: [680, 120] },
};
const SJ_NAMEPLATE = { sign: [456, 437], critical: [232, 470] };
const SJ_HOLO = '#6fe3ff';
const sjSvgText = (x, y, str, size, col, weight = 700, anchor = 'middle') =>
  `<text x="${f(x)}" y="${f(y)}" font-size="${size}" fill="${col}" font-weight="${weight}" text-anchor="${anchor}" font-family="${SJ_MONO}">${sjEsc(str)}</text>`;

/* the light that rises from a phone to the card it projects, and the card's glowing frame */
function sjBeam([mx, my], [cx, cy], w, h, k) {
  const top = cy + h / 2;
  return `<path d="M${f(mx - 6)} ${f(my)}L${f(cx - w / 2)} ${f(top)}L${f(cx + w / 2)} ${f(top)}L${f(mx + 6)} ${f(my)}Z" fill="${SJ_HOLO}" opacity="${f(.16 * k)}"/>`
    + `<rect x="${f(cx - w / 2 - 4)}" y="${f(cy - h / 2 - 4)}" width="${f(w + 8)}" height="${f(h + 8)}" rx="12" fill="none" stroke="${SJ_HOLO}" stroke-width="5" opacity="${f(.35 * k)}"/>`;
}
const sjScanLines = (cx, cy, w, h, k, now) => {
  const drift = matchMedia('(prefers-reduced-motion:reduce)').matches ? 0 : (now * 14) % 8;
  let s = '';
  for (let y = cy - h / 2 + drift; y < cy + h / 2; y += 8) s += `<path d="M${f(cx - w / 2 + 3)} ${f(y)}h${f(w - 6)}" stroke="${SJ_HOLO}" stroke-width=".6" opacity="${f(.22 * k)}"/>`;
  return s;
};

/* station 19: only the critical value, as the doctor sees it on her mobile */
function sjCriticalCard(k, now) {
  const { mobile, card: [cx, cy] } = SJ_SPLIT.critical, w = 186, h = 150, P = SJ.PATIENT, K = SJ.RESULTS.find(r => r.critical);
  return `<g opacity="${f(k)}">` + sjBeam(mobile, [cx, cy], w, h, k)
    + `<rect x="${f(cx - w / 2)}" y="${f(cy - h / 2)}" width="${w}" height="${h}" rx="9" fill="#082a35" fill-opacity=".72" stroke="${SJ_HOLO}" stroke-width="1.6"/>`
    + sjScanLines(cx, cy, w, h, k, now)
    + `<rect x="${f(cx - w / 2)}" y="${f(cy - h / 2)}" width="${w}" height="24" rx="9" fill="#d6502c" opacity=".92"/>`
    + sjSvgText(cx, cy - h / 2 + 17, 'CRITICAL ALERT', 13, '#fff', 800)
    + sjSvgText(cx, cy - 32, 'Shalby Lab', 11.5, SJ_HOLO, 700)
    + sjSvgText(cx, cy - 14, P.name, 12, '#e8fbff', 700)
    + sjSvgText(cx, cy + 12, K.name, 13.5, '#e8fbff', 700)
    + sjSvgText(cx, cy + 36, `${K.value} ${K.unit}`, 19, '#ffb199', 800)
    + sjSvgText(cx, cy + 62, SJ.PATIENT.authoriser, 10.5, SJ_HOLO, 600) + '</g>';
}

/* station 20: a chat-app style screen with the full report as a PDF. Not a real app's screen. */
function sjReportCard(k) {
  const { mobile, card: [cx, cy] } = SJ_SPLIT.report, w = 190, h = 182, x0 = cx - w / 2, y0 = cy - h / 2;
  return `<g opacity="${f(k)}">` + sjBeam(mobile, [cx, cy], w, h, k)
    + `<rect x="${f(x0)}" y="${f(y0)}" width="${w}" height="${h}" rx="10" fill="#ece5dd" stroke="${SJ_HOLO}" stroke-width="1.6"/>`
    + `<rect x="${f(x0)}" y="${f(y0)}" width="${w}" height="34" rx="10" fill="#1f7a63"/><rect x="${f(x0)}" y="${f(y0 + 24)}" width="${w}" height="10" fill="#1f7a63"/>`
    + `<circle cx="${f(x0 + 18)}" cy="${f(y0 + 17)}" r="10" fill="#fff"/>` + sjSvgText(x0 + 18, y0 + 21, 'S', 11, '#1f7a63', 800)
    + sjSvgText(x0 + 34, y0 + 22, 'Shalby Lab Reports', 12, '#fff', 800, 'start')
    + `<rect x="${f(x0 + 12)}" y="${f(y0 + 48)}" width="${w - 24}" height="96" rx="8" fill="#fff" stroke="#c9c2b8"/>`
    + `<rect x="${f(x0 + 22)}" y="${f(y0 + 60)}" width="26" height="32" rx="3" fill="#d6402c"/>` + sjSvgText(x0 + 35, y0 + 80, 'PDF', 8.5, '#fff', 800)
    + sjSvgText(x0 + 56, y0 + 70, 'Mr Demo Patient', 11, '#1d1d1b', 700, 'start')
    + sjSvgText(x0 + 56, y0 + 86, 'Full Report.pdf', 11, '#1d1d1b', 700, 'start')
    + sjSvgText(x0 + 22, y0 + 112, 'PDF · 4 pages', 10, '#6b6b66', 600, 'start')
    + sjSvgText(x0 + w - 22, y0 + 134, `${SJ.TIMES.generated.toLowerCase()} ✓✓`, 10, '#4f8fbf', 700, 'end')
    + `<circle cx="${f(x0 + w - 14)}" cy="${f(y0 + 164)}" r="11" fill="#25a36f"/>` + sjSvgText(x0 + w - 14, y0 + 168, '1', 11, '#fff', 800)
    + sjSvgText(x0 + 14, y0 + 168, 'Not a real report', 9.5, '#8a3b1d', 700, 'start') + '</g>';
}

/* the call: a dashed line from his handset to hers, across the gutter, while the call is on */
function sjCallLine(k, now) {
  const { callFrom: [x0, y0], callTo: [x1, y1] } = SJ_SPLIT.critical, off = matchMedia('(prefers-reduced-motion:reduce)').matches ? 0 : -now * 30;
  return `<path d="M${x0} ${y0}Q${(x0 + x1) / 2} ${Math.min(y0, y1) - 120} ${x1} ${y1}" fill="none" stroke="#d6502c" stroke-width="3" stroke-dasharray="9 8" stroke-dashoffset="${f(off)}" opacity="${f(k)}"/>`;
}
const sjDoneChip = (x, y, str, on1) => on1 ? sjPill(x, y, `✓ ${str}`, { size: 12.5, bg: '#e7f4ec', pinned: true }) : '';

function sjDrawSplit(s1, now) {
  const key = SJ.STATIONS[s1.at].key, started = s1.busy || s1.step > 0 || s1.u > 0;
  if (s1.hop || !started || !SJ_SPLIT[key]) return '';
  const u = s1.u, k = sjRamp(u, .4, .55);
  if (key === 'critical') return sjCallLine(1 - sjRamp(u, .85, 1) * .6, now) + sjDoneChip(150, 518, 'Message sent', u > .4) + sjDoneChip(150, 552, 'Read-back done', u > .7) + sjCriticalCard(k, now);
  return sjPill(160, 430, 'Printed here, when the patient asks', { size: 12, bg: '#fffdf6', pinned: true }) + sjDoneChip(710, 540, 'Full report sent', u > .4) + sjReportCard(k);
}

/* his name on the desk, wherever he is in the picture */
function sjDrawNameplate(s1) {
  const at = SJ_NAMEPLATE[SJ.STATIONS[s1.at].key];
  if (!at || s1.hop) return '';
  return sjPill(at[0], at[1], SJ.PATIENT.authoriser, { size: 12, bg: '#5b3a20', col: '#f3d58a', sw: 1.4, pinned: true });
}
