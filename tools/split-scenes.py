# Two scenes side by side, like a comic strip: each panel a crop of its own scene, a white gutter, an ink border.
import sys
from PIL import Image, ImageDraw
K = 1400 / 950                      # pixels per plate unit
PANELS = [(8, 8, 471, 623), (479, 8, 942, 623)]
def crop(src, cx0, cy0, w):
    im = Image.open(src).convert('RGB'); s = im.width / 950
    h = w * (PANELS[0][3] - PANELS[0][1]) / (PANELS[0][2] - PANELS[0][0])
    return im.crop((int(cx0 * s), int(cy0 * s), int((cx0 + w) * s), int((cy0 + h) * s)))
def split(out, left, right):
    page = Image.new('RGB', (1400, round(631 * K)), '#fbf8ef'); d = ImageDraw.Draw(page)
    for (x0, y0, x1, y1), (src, cx, cy, w) in zip(PANELS, (left, right)):
        box = [round(v * K) for v in (x0, y0, x1, y1)]
        page.paste(crop(src, cx, cy, w).resize((box[2] - box[0], box[3] - box[1]), Image.LANCZOS), box[:2])
        d.rectangle(box, outline='#231e16', width=5)
    page.save(out, quality=82)
G = 'assets/generated/scenes/'
split('sketchbook/scenes/critical.jpg', (G + 'critical-left.png', 290, 18, 380), (G + 'clinician-call.png', 243, 40, 330))
split('sketchbook/scenes/report.jpg', (G + 'report.png', 300, 80, 400), (G + 'clinician-mobile.png', 243, 40, 330))
