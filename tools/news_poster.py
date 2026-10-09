"""Moving poster for "כותרות המהדורה המרכזית": a news-channel title card with a live ticker.

Writes media/news-poster.mp4 (a seamless loop) and media/news-poster.jpg (its first frame);
node build.js copies media/ into docs/media/.
Run from anywhere: python3 tools/news_poster.py   (needs Pillow with libraqm, numpy and ffmpeg).
"""
import os
import subprocess

import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = os.path.join(ROOT, 'tools', 'fonts')
OUT = os.path.join(ROOT, 'media')
W, H, FPS = 540, 960, 25
RED, NAVY, WHITE = (214, 28, 40), (12, 22, 60), (255, 255, 255)

TITLE = ['כותרות', 'המהדורה', 'המרכזית']
TICKER = 'סיכום שנה 2026'
STEP = 4            # ticker speed in px per frame (100 px/s)
GAP = 70            # space between ticker items, with a bullet in the middle


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)


def he(d, xy, text, fnt, fill, anchor='mm'):
    d.text(xy, text, font=fnt, fill=fill, anchor=anchor, direction='rtl', language='he')


def background():
    """Navy studio gradient with a soft light, diagonal stripes and a vignette."""
    t = np.linspace(0, 1, H)[:, None, None]
    a = np.array((20, 50, 120), np.float32) * (1 - t) + np.array((4, 10, 32), np.float32) * t
    a = np.repeat(a, W, axis=1)
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    d = np.sqrt(((xx - W * .75) / (W * .6)) ** 2 + ((yy - H * .25) / (W * .6)) ** 2)
    a += (np.exp(-d ** 2 * 1.6) * .25)[..., None] * np.array((90, 150, 255), np.float32)
    a += ((((xx + yy * .6) // 22) % 2) * 5)[..., None] * np.array((.3, .5, 1.0), np.float32)
    v = np.sqrt(((xx - W / 2) / (W / 2)) ** 2 + ((yy - H / 2) / (H / 2)) ** 2)
    a *= (1 - .45 * np.clip(v - .45, 0, 1) ** 1.4)[..., None]
    return Image.fromarray(np.clip(a, 0, 255).astype(np.uint8))


def main():
    title, tab = font('Heebo-Black.ttf', 64), font('Heebo-Black.ttf', 30)
    tick, mono = font('Heebo-Bold.ttf', 30), font('SpaceMono-Bold.ttf', 28)

    # everything that stays still
    still = background()
    d = ImageDraw.Draw(still)
    d.rectangle([34, 40, 160, 86], fill=RED)
    d.text((72, 63), 'LIVE', font=mono, anchor='lm', fill=WHITE)
    d.text((W - 34, 63), '20:00', font=mono, anchor='rm', fill=(235, 240, 255))
    y0 = int(H * .47)
    d.rectangle([28, y0 - 50, 150, y0], fill=RED)
    d.text((89, y0 - 25), '2026', font=tab, anchor='mm', fill=WHITE)
    d.rectangle([28, y0, W - 28, y0 + 236], fill=(250, 250, 252))
    d.rectangle([28, y0 + 236, W - 28, y0 + 244], fill=RED)
    for k, line in enumerate(TITLE):
        he(d, (W / 2, y0 + 46 + k * 70), line, title, NAVY)
    ty = H - 120
    d.rectangle([0, ty, W, ty + 64], fill=(8, 14, 40))
    d.rectangle([0, ty, W, ty + 3], fill=RED)

    # the ticker repeats one item; a loop moves it by exactly one item, so it never jumps
    tw = d.textlength(TICKER, font=tick, direction='rtl', language='he')
    cell = int(np.ceil((tw + GAP) / STEP)) * STEP
    gap = cell - tw
    frames = cell // STEP
    blinks = max(1, round(frames / FPS))

    os.makedirs(OUT, exist_ok=True)
    mp4 = os.path.join(OUT, 'news-poster.mp4')
    enc = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24',
                            '-s', '%dx%d' % (W, H), '-r', str(FPS), '-i', '-', '-c:v', 'libx264', '-preset', 'slow',
                            '-tune', 'animation', '-crf', '20', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
                            '-an', mp4], stdin=subprocess.PIPE)
    for i in range(frames):
        im = still.copy()
        d = ImageDraw.Draw(im)
        if (i * blinks / frames) % 1 < .6:
            d.ellipse([48, 56, 62, 70], fill=WHITE)
        # Hebrew tickers run left to right
        off = i * STEP
        for k in range(-1, W // cell + 2):
            x0 = off + k * cell
            he(d, (x0 + cell, ty + 34), TICKER, tick, WHITE, anchor='rm')
            d.text((x0 + gap / 2, ty + 34), '•', font=tick, anchor='mm', fill=(255, 255, 255))
        if i == 0:
            im.save(os.path.join(OUT, 'news-poster.jpg'), quality=88, optimize=True, progressive=True)
        enc.stdin.write(im.tobytes())
    enc.stdin.close()
    enc.wait()
    print('%d frames, %.2f s, %d KB' % (frames, frames / FPS, os.path.getsize(mp4) // 1024))


if __name__ == '__main__':
    main()
