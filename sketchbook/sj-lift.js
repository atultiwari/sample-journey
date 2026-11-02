/* Sample Journey · Sketchbook: a ride in the lift, made from four still images and code, not from video.
   The doors are the closed-door picture cut in two and slid apart. For the ride the lobby gives way to a cut-away shaft: one
   storey of shaft repeated eleven times, moving behind the lift car, which never moves. This lift is generic: it does not say
   where the real lift is in the building. Units are plate units, and the car stays where the open doors show it. */

const SJ_LIFT = {
  door: { x0: 340, x1: 610, y0: 97, y1: 537 },
  display: [473, 42],
  storey: 396, slabTop: 368, slabH: 28, shaft: { x0: 361, w: 228 },
  floors: ['BASEMENT', 'GROUND FLOOR', 'FLOOR 1', 'FLOOR 2', 'FLOOR 3', 'FLOOR 4', 'FLOOR 5', 'FLOOR 6', 'FLOOR 7', 'FLOOR 8', '9TH FLOOR: LAB'],
  shut: { closeBy: .12, shaftIn: [.12, .18], shaftOut: [.8, .86], openFrom: .86 },
  ride: { from: .14, span: .7 },
  riders: { patient: { from: 1, to: 0 }, carrier: { from: 0, to: 10 } },
};

const sjSvgEl = (name, attrs = {}) => {
  const el = document.createElementNS('http://www.w3.org/2000/svg', name);
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  return el;
};
const sjRamp = (u, a, b) => Math.min(1, Math.max(0, (u - a) / (b - a)));
const sjPlateImage = (href, extra = {}) => sjSvgEl('image', { href, width: SJ_PLATE.w, height: SJ_PLATE.h, ...extra });

/* one storey of the shaft: its picture, a patch that carries the shaft through its floor slab, and the floor's name */
function sjStorey(i) {
  const { storey, slabTop, slabH, shaft, floors } = SJ_LIFT, top = 537 - slabTop - i * storey, g = sjSvgEl('g');
  g.appendChild(sjSvgEl('image', { href: 'scenes/lift-shaft.jpg', y: top, width: SJ_PLATE.w, height: storey, preserveAspectRatio: 'none' }));
  const patch = sjSvgEl('svg', { x: shaft.x0, y: top + slabTop, width: shaft.w, height: slabH + 2, viewBox: `${shaft.x0} 200 ${shaft.w} ${slabH + 2}`, preserveAspectRatio: 'none' });
  patch.appendChild(sjSvgEl('image', { href: 'scenes/lift-shaft.jpg', width: SJ_PLATE.w, height: storey, preserveAspectRatio: 'none' }));
  g.appendChild(patch);
  if (floors[i]) {
    const text = sjSvgEl('text', { x: 180, y: top + 140, 'text-anchor': 'middle', 'font-size': 21, 'font-weight': 800, fill: '#3a3f44', 'font-family': 'ui-monospace,Menlo,monospace' });
    text.textContent = floors[i];
    g.appendChild(text);
  }
  return g;
}

function sjBuildLift(layer) {
  const { door } = SJ_LIFT, w = door.x1 - door.x0, h = door.y1 - door.y0, mid = (door.x0 + door.x1) / 2, defs = sjSvgEl('defs');
  const clip = (id, x, width) => { const c = sjSvgEl('clipPath', { id }); c.appendChild(sjSvgEl('rect', { x, y: door.y0, width, height: h })); defs.appendChild(c); };
  clip('sjClipDoor', door.x0, w); clip('sjClipLeft', door.x0, w / 2); clip('sjClipRight', mid, w / 2);
  const group = sjSvgEl('g', { id: 'sjLift', opacity: 0 });
  group.dataset.place = 'lift';
  group.appendChild(defs);
  ['patient', 'carrier'].forEach(r => group.appendChild(sjPlateImage(`scenes/lift-${r}.jpg`, { id: `sjLobby-${r}` })));
  const doors = sjSvgEl('g', { id: 'sjDoors', 'clip-path': 'url(#sjClipDoor)' });
  [['Left', 'sjClipLeft'], ['Right', 'sjClipRight']].forEach(([side, c]) => {
    const panel = sjSvgEl('g', { id: `sjDoor${side}` });
    panel.appendChild(sjPlateImage('scenes/lift-closed.jpg', { 'clip-path': `url(#${c})` }));
    doors.appendChild(panel);
  });
  group.appendChild(doors);
  const shaft = sjSvgEl('g', { id: 'sjShaft', opacity: 0 }), scroll = sjSvgEl('g', { id: 'sjShaftScroll' });
  for (let i = -1; i <= SJ_LIFT.floors.length; i++) scroll.appendChild(sjStorey(i));
  shaft.appendChild(scroll);
  shaft.appendChild(sjSvgEl('path', { d: `M${mid - 20} 0V${door.y0}M${mid + 20} 0V${door.y0}`, stroke: '#2b2a27', 'stroke-width': 2.4 }));
  ['patient', 'carrier'].forEach(r => shaft.appendChild(sjPlateImage(`scenes/lift-${r}.jpg`, { id: `sjCar-${r}`, 'clip-path': 'url(#sjClipDoor)' })));
  shaft.appendChild(sjSvgEl('rect', { x: door.x0 - 3, y: door.y0 - 3, width: w + 6, height: h + 6, fill: 'none', stroke: '#2b2a27', 'stroke-width': 5, rx: 2 }));
  group.appendChild(shaft);
  layer.appendChild(group);
}

/* who is riding, and how far along the ride is: null when nobody is in the lift */
function sjLiftNow(s1) {
  if (s1.hop && s1.hop.kind === 'patient') return { rider: 'patient', u: s1.hop.u };
  if (!s1.hop && !s1.whole && !s1.userWhole && SJ.STATIONS[s1.at].key === 'carry') return { rider: 'carrier', u: s1.u };
  return null;
}
const sjLiftLevel = ({ rider, u }) => {
  const R = SJ_LIFT.riders[rider], t = ease(sjRamp(u, SJ_LIFT.ride.from, SJ_LIFT.ride.from + SJ_LIFT.ride.span));
  return R.from + (R.to - R.from) * t;
};
const sjFloorSign = level => { const n = Math.round(level) - 1; return n < 0 ? 'B' : n === 0 ? 'G' : String(n); };

/* every frame: move the doors and the shaft. Only attributes change, so nothing is redrawn. */
function sjSyncLift(s1) {
  const now = sjLiftNow(s1);
  if (!now) return;
  const { shut, door, storey } = SJ_LIFT, half = (door.x1 - door.x0) / 2, { rider, u } = now;
  const closed = u < shut.openFrom ? ease(sjRamp(u, 0, shut.closeBy)) : 1 - ease(sjRamp(u, shut.openFrom, 1));
  const inShaft = Math.min(sjRamp(u, ...shut.shaftIn), 1 - sjRamp(u, ...shut.shaftOut));
  const set = (id, name, v) => document.getElementById(id).setAttribute(name, v);
  ['patient', 'carrier'].forEach(r => { const show = r === rider ? 'inline' : 'none'; set(`sjLobby-${r}`, 'display', show); set(`sjCar-${r}`, 'display', show); });
  set('sjDoors', 'display', closed > 0 ? 'inline' : 'none');
  set('sjDoorLeft', 'transform', `translate(${f(-(1 - closed) * half)} 0)`);
  set('sjDoorRight', 'transform', `translate(${f((1 - closed) * half)} 0)`);
  set('sjShaft', 'opacity', inShaft.toFixed(3));
  set('sjShaftScroll', 'transform', `translate(0 ${f(sjLiftLevel(now) * storey)})`);
}

/* drawn over the lift each frame: the lit floor display and the words */
function sjDrawLift(s1) {
  const now = sjLiftNow(s1);
  if (!now) return '';
  const R = SJ_LIFT.riders[now.rider], arrow = R.to > R.from ? '▲' : '▼', moving = now.u > SJ_LIFT.ride.from && now.u < SJ_LIFT.ride.from + SJ_LIFT.ride.span;
  const [x, y] = SJ_LIFT.display, sign = sjFloorSign(sjLiftLevel(now));
  let s = sjPill(x, y, `${moving ? `${arrow} ` : ''}${sign}`, { size: 19, bg: '#17120d', col: '#ff5a3c', sw: 1.2 });
  if (s1.hop) s += sjPill(475, 600, SJ_HOPS[s1.hop.key].caption, { size: 15, bg: '#fffdf6' });
  else s += sjPill(475, 600, 'Sample carrier: by hand, box upright, never left alone', { size: 13.5, bg: '#fffdf6' });
  return s;
}
