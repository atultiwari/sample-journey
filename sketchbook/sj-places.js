/* Sample Journey · Sketchbook: the real places. Each station is one hand-inked scene with its people (scenes/), and everything
   laid over it is in plate units: 950 x 631, the scene's own proportions. spot = where the action is: the ring goes there.
   tag = the printed station label. cam = how much of the scene the camera shows, in plate units. */

const SJ_PLATE = { w: 950, h: 631 };
const SJ_CAPS = { culture: '#8d7bb5', citrate: '#3f8fd0', serum: '#e0a92e', edta: '#a65fb0' };

const SJ_SPOTS = {
  order: { place: 'consult', spot: [404, 338], tag: [300, 205], cam: 700 },
  register: { place: 'reception', spot: [612, 278], tag: [650, 345], cam: 700 },
  ready: { place: 'collection', spot: [309, 284], tag: [130, 110], cam: 760 },
  ids: { place: 'collection', spot: [330, 275], tag: [420, 130], cam: 760 },
  consent: { place: 'collection', spot: [522, 354], tag: [300, 590], cam: 760 },
  draw: { place: 'collection', spot: [499, 338], tag: [500, 590], cam: 620 },
  label: { place: 'collection', spot: [534, 315], tag: [115, 190], cam: 620 },
  care: { place: 'collection', spot: [754, 368], tag: [790, 250], cam: 700 },
  pack: { place: 'collection', spot: [588, 254], tag: [690, 590], cam: 700 },
  carry: { place: 'lift', spot: null, tag: [120, 60] },
  scan: { place: 'receiving', spot: [356, 284], tag: [640, 260], cam: 700 },
  accept: { place: 'receiving', spot: [410, 211], tag: [215, 400], cam: 700 },
  spin: { place: 'processing', spot: [261, 223], tag: [255, 140], cam: 700 },
  send: { place: 'departments', spot: [505, 380], tag: [430, 590], cam: 900 },
  qc: { place: 'analyser', spot: [338, 208], tag: [640, 420], cam: 760 },
  run: { place: 'analyser', spot: [202, 308], tag: [180, 470], cam: 700 },
  check: { place: 'analyser', spot: [902, 272], tag: [885, 130], cam: 700 },
  sign: { place: 'cabin', spot: [362, 280], tag: [620, 240], cam: 860 },
  critical: { place: 'cabin', spot: [470, 285], tag: [690, 470], cam: 860 },
  report: { place: 'counter', spot: [475, 304], tag: [500, 420], cam: 800 },
  store: { place: 'storage', spot: [205, 250], tag: [400, 420], cam: 800 },
  discard: { place: 'storage', spot: [710, 290], tag: [480, 520], cam: 800 },
};

/* department names sit on the blank sign plates of the lab corridor sketch */
const SJ_SIGNS = [
  { at: [165, 52], text: 'HAEMATOLOGY' }, { at: [312, 135], text: 'BIOCHEMISTRY' },
  { at: [632, 135], text: 'COAGULATION' }, { at: [785, 75], text: 'MICROBIOLOGY' },
];

/* floors on the building sketch: which floor is which, and no more. Where the real lift is, is not known, so no route is drawn. */
const SJ_DOOR = [631, 480];
const SJ_PINS = [
  { at: [440, 190], text: 'LAB: 9TH FLOOR' },
  { at: [425, 500], text: 'GROUND FLOOR' },
  { at: [425, 545], text: 'BASEMENT: COLLECTION' },
];

/* the journeys between places. They are not stations: nothing is recorded, the sample's chain does not change. */
const SJ_HOPS = {
  order: { kind: 'enter', dur: 2.6, title: 'Arriving at the hospital', text: 'Mr Demo Patient comes in through the main entrance. The OPD and registration are on the ground floor.', caption: 'To the OPD, ground floor' },
  ready: { kind: 'patient', dur: 6, title: 'The patient goes down in the lift', text: 'After registration, the patient takes the lift from the ground floor down to the sample collection room in the basement.', caption: 'Patient: ground floor to basement' },
  report: { kind: 'report', dur: 3.2, title: 'The report leaves the lab', text: 'The authorised report is released. The hard copy is collected at the report counter on the ground floor. The sample itself stays in the lab.', caption: 'Report: 9th floor to ground floor' },
};

const sjSpotOf = key => SJ_SPOTS[key];
const sjClampFrame = (cx, cy, wish, aspect) => {
  const w = Math.min(wish, SJ_PLATE.w, SJ_PLATE.h * aspect), h = w / aspect;
  const clamp = (v, half, max) => Math.max(half, Math.min(max - half, v));
  return { x: clamp(cx, w / 2, SJ_PLATE.w) - w / 2, y: clamp(cy, h / 2, SJ_PLATE.h) - h / 2, w, h };
};

/* which picture is showing, and which place that is. The stations in one room share its place and its labels. */
const SJ_PICTURES = ['building', ...SJ.STATIONS.map(s0 => s0.key).filter(key => key !== 'carry')];
function sjPictureNow(s1) {
  const key = SJ.STATIONS[s1.at].key;
  if (s1.whole || s1.userWhole) return 'building';
  if (s1.hop) return s1.hop.kind === 'patient' ? 'lift' : 'building';
  return key === 'carry' ? 'lift' : key;
}
const sjPlaceNow = s1 => { const pic = sjPictureNow(s1); return pic === 'building' || pic === 'lift' ? pic : sjSpotOf(pic).place; };

/* what the camera wants, in plate units */
function sjCamWish(s1, phone) {
  const whole = { c: [SJ_PLATE.w / 2, SJ_PLATE.h / 2], w: SJ_PLATE.w };
  if (s1.whole || s1.userWhole) return whole;
  if (sjPictureNow(s1) === 'lift') return { c: [475, 320], w: phone ? 620 : SJ_PLATE.w };
  if (s1.hop) {
    if (s1.hop.kind !== 'enter') return whole;
    const t = ease(s1.hop.u), [dx, dy] = SJ_DOOR;
    return { c: [whole.c[0] + (dx - whole.c[0]) * t, whole.c[1] + (dy - whole.c[1]) * t], w: whole.w + (300 - whole.w) * t };
  }
  const key = SJ.STATIONS[s1.at].key, S0 = sjSpotOf(key);
  return { c: S0.spot, w: phone ? Math.min(S0.cam, 460) : S0.cam };
}
