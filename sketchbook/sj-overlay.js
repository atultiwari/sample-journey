/* Sample Journey · Sketchbook: what is laid over a scene. Printed station labels, the ring, the department names and the route
   through the building. The scenes themselves stay in their own layer, so they never redraw. */

const SJ_MONO = 'ui-monospace,Menlo,monospace';
const sjStateOf = (i, s1) => {
  const started = s1.busy || s1.step > 0 || s1.u > 0;
  if (!started) return i === 0 ? 'next' : 'wait';
  if (i === s1.at && !s1.hop) return 'on';
  return i < s1.at || (i === s1.at && s1.u >= 1) ? 'done' : 'wait';
};
/* a label is never cut by the edge of the view: it slides inside the frame */
const sjInView = (x, y, halfW, halfH) => {
  if (!sjVB) return [x, y];
  const pad = 4 * INK_K;
  return [Math.max(sjVB.x + halfW + pad, Math.min(sjVB.x + sjVB.w - halfW - pad, x)), Math.max(sjVB.y + halfH + pad, Math.min(sjVB.y + sjVB.h - halfH - pad, y))];
};
const sjPill = (x0, y0, str, { size = 13, bg = '#fff4d6', col = INK, sw = 1.3, weight = 800 } = {}) => {
  const w = String(str).length * size * .62 + size * 1.2, h = size * 1.9, [x, y] = sjInView(x0, y0, w / 2, h / 2);
  return `<rect x="${f(x - w / 2)}" y="${f(y - h / 2)}" width="${f(w)}" height="${f(h)}" rx="${f(h * .22)}" fill="${bg}" stroke="${INK}" stroke-width="${sw}"/>`
    + `<text x="${f(x)}" y="${f(y + size * .35)}" font-size="${size}" text-anchor="middle" fill="${col}" font-weight="${weight}" font-family="${SJ_MONO}">${sjEsc(str)}</text>`;
};

/* the printed label of a station, with a badge number. Tap it to run its step. */
function sjTag(s0, state) {
  const [x, y] = sjSpotOf(s0.key).tag, on1 = state === 'on', done = state === 'done';
  const bg = on1 || state === 'next' ? 'var(--accent,#f4b829)' : done ? '#e6dfcd' : '#fff4d6';
  return act('station', sjPill(x, y, `${s0.num} ${s0.label}`, { bg, col: done ? '#7b7466' : INK, sw: on1 ? 2 : 1.2 }), `data-i="${s0.num - 1}" style="cursor:pointer"`);
}

const sjFormArt = (x, y) => `<rect x="${f(x - 11)}" y="${f(y - 14)}" width="22" height="28" rx="1.5" fill="#fffdf6" stroke="${INK}" stroke-width="1.2"/>`
  + [-7, -2, 3, 8].map(d => `<path d="M${f(x - 7)} ${f(y + d)}h14" stroke="#7d756a" stroke-width="1"/>`).join('');

function sjDrawRing(s1, now) {
  if (!(s1.busy || s1.step > 0 || s1.u > 0) || s1.hop) return '';
  const S0 = sjSpotOf(SJ.STATIONS[s1.at].key);
  if (!S0.spot) return '';
  const r = 42 * (matchMedia('(prefers-reduced-motion:reduce)').matches ? 1 : 1 + .06 * Math.sin(now * 5));
  return `<ellipse cx="${f(S0.spot[0])}" cy="${f(S0.spot[1])}" rx="${f(r)}" ry="${f(r * .72)}" fill="none" stroke="#d6502c" stroke-width="2.4"/>`;
}

/* the building: which floor is which, and the report on its way down. The curve is the report's path, not a lift. */
const sjPins = () => SJ_PINS.map(p => {
  const [x, y] = p.at, w = p.text.length * 7.4 + 16;
  return `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="${INK}" stroke-width="1.6"/><path d="M${x} ${y}H${x - 22}" stroke="${INK}" stroke-width="1.2"/>` + sjPill(x - 22 - w / 2, y, p.text, { size: 11.5, bg: '#fffdf6' });
}).join('');
function sjDrawBuilding(s1, now) {
  if (!s1.hop || s1.hop.kind !== 'report') return sjPins();
  const [a, b] = [SJ_PINS[0].at, SJ_PINS[1].at], u = ease(s1.hop.u), bow = [660, (a[1] + b[1]) / 2];
  const at = t => [0, 1].map(i => (1 - t) * (1 - t) * a[i] + 2 * t * (1 - t) * bow[i] + t * t * b[i]), [x, y] = at(u);
  const off = matchMedia('(prefers-reduced-motion:reduce)').matches ? 0 : -now * 26;
  return sjPins() + `<path d="M${a[0]} ${a[1]}Q${bow[0]} ${bow[1]} ${b[0]} ${b[1]}" fill="none" stroke="#3f8f6a" stroke-width="3" stroke-dasharray="8 7" stroke-dashoffset="${f(off)}"/>` + sjFormArt(x, y);
}

function sjScene(s1, now) {
  const place = sjPlaceNow(s1);
  if (place === 'lift') {
    const tag = s1.hop ? '' : sjTag(SJ.STATIONS[SJ.IDX.carry], sjStateOf(SJ.IDX.carry, s1));
    return { svg: sjDrawLift(s1) + tag };
  }
  if (place === 'building') {
    const caption = s1.hop ? SJ_HOPS[s1.hop.key].caption : '';
    const show = s1.hop && s1.hop.kind === 'enter' ? '' : sjDrawBuilding(s1, now);
    const y0 = sjVB ? sjVB.y + sjVB.h - 24 : 600, x0 = sjVB ? sjVB.x + sjVB.w / 2 : 475;
    return { svg: show + (caption ? sjPill(x0, y0, caption, { size: 14 * Math.max(1, (sjVB ? sjVB.w : 950) / 760), bg: '#fffdf6' }) : '') };
  }
  // a phone shows only the active label: the rail below holds the others, and a small view would crowd them
  const shown = SJ.STATIONS.filter(s0 => sjSpotOf(s0.key).place === place && (!sjIsPhone() || sjStateOf(s0.num - 1, s1) === 'on'));
  const tags = shown.map(s0 => sjTag(s0, sjStateOf(s0.num - 1, s1))).join('');
  const signs = place === 'departments' ? SJ_SIGNS.map(g => sjPill(g.at[0], g.at[1], g.text, { size: 11, bg: '#fffdf6' })).join('') : '';
  return { svg: signs + tags + sjDrawRing(s1, now) };
}
