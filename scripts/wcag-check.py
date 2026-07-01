#!/usr/bin/env python3
"""OKLCH -> sRGB -> WCAG 2.2 contrast checker for the Conservatory token palette.
No deps. Verifies key text/bg/accent pairs clear AA before they land in tokens.css.
AA: 4.5 normal text, 3.0 large text / UI components."""
import math

def oklch_to_linear_srgb(L, C, h_deg):
    h = math.radians(h_deg)
    a = C * math.cos(h); b = C * math.sin(h)
    l_ = L + 0.3963377774*a + 0.2158037573*b
    m_ = L - 0.1055613458*a - 0.0638541728*b
    s_ = L - 0.0894841775*a - 1.2914855480*b
    l, m, s = l_**3, m_**3, s_**3
    R = 4.0767416621*l - 3.3077115913*m + 0.2309699292*s
    G = -1.2684380046*l + 2.6097574011*m - 0.3413193965*s
    B = -0.0041960863*l - 0.7034186147*m + 1.7076147010*s
    return R, G, B

def wcag_lum(L, C, h):
    R, G, B = oklch_to_linear_srgb(L, C, h)
    R, G, B = (max(0.0, min(1.0, v)) for v in (R, G, B))
    return 0.2126*R + 0.7152*G + 0.0722*B

def contrast(fg, bg):
    l1, l2 = wcag_lum(*fg), wcag_lum(*bg)
    hi, lo = max(l1, l2), min(l1, l2)
    return (hi + 0.05) / (lo + 0.05)

# ---- proposed DARK palette (humus warm-black, brass, sage-green, magenta signal)
D = {
  "bg-deep":   (0.1400, 0.0070, 85),
  "bg-base":   (0.1780, 0.0090, 86),
  "bg-elev":   (0.2150, 0.0110, 88),
  "bg-subtle": (0.2520, 0.0130, 90),
  "text-pri":  (0.9480, 0.0090, 88),
  "text-sec":  (0.7680, 0.0150, 86),
  "text-mut":  (0.6050, 0.0150, 84),
  "brass":     (0.7200, 0.0900, 68),
  "brass-hov": (0.7780, 0.0850, 72),
  "green":     (0.6600, 0.0780, 150),
  "green-hov": (0.7150, 0.0720, 148),
  "signal":    (0.6634, 0.1052, 346.74),
  "border-st": (0.5000, 0.0150, 90),
}
# ---- proposed LIGHT palette (golden-hour sand/amber/sage)
Lt = {
  "bg-deep":   (0.9200, 0.0300, 80),
  "bg-base":   (0.9050, 0.0340, 78),
  "bg-elev":   (0.9450, 0.0240, 82),
  "text-pri":  (0.2200, 0.0150, 70),
  "text-sec":  (0.4200, 0.0180, 72),
  "text-mut":  (0.4800, 0.0180, 74),
  "brass":     (0.4850, 0.1150, 65),
  "green":     (0.4700, 0.0900, 145),
  "signal":    (0.5200, 0.1300, 346.74),
  "border-st": (0.5800, 0.0220, 72),
}

PAIRS = [
  ("text-pri","bg-deep",4.5),("text-pri","bg-base",4.5),("text-pri","bg-elev",4.5),
  ("text-sec","bg-base",4.5),("text-sec","bg-elev",4.5),
  ("text-mut","bg-base",4.5),("text-mut","bg-deep",4.5),
  ("brass","bg-deep",4.5),("brass","bg-base",4.5),("brass-hov","bg-base",4.5),
  ("green","bg-deep",4.5),("green","bg-base",4.5),("green-hov","bg-base",4.5),
  ("signal","bg-deep",4.5),
  ("border-st","bg-base",3.0),
]
PAIRS_L = [
  ("text-pri","bg-deep",4.5),("text-pri","bg-base",4.5),
  ("text-sec","bg-base",4.5),("text-mut","bg-base",4.5),
  ("brass","bg-deep",4.5),("brass","bg-base",4.5),
  ("green","bg-deep",4.5),("signal","bg-deep",4.5),
  ("border-st","bg-base",3.0),
]

def run(name, P, pairs):
    print(f"\n=== {name} ===")
    worst = True
    for fg, bg, thr in pairs:
        if fg not in P or bg not in P:
            print(f"  ? {fg} on {bg}: missing"); continue
        r = contrast(P[fg], P[bg])
        ok = r >= thr
        worst = worst and ok
        print(f"  {'PASS' if ok else 'FAIL'}  {fg:>10} on {bg:<8} {r:5.2f}  (need {thr})")
    print(f"  --> {'ALL PASS' if worst else 'HAS FAILURES'}")

run("DARK", D, PAIRS)
run("LIGHT", Lt, PAIRS_L)

# ============================================================
# LAB palette — labs.justinh.design ("The Reading Room", P1)
# Verifies the warm-humus re-hue (hue 270 -> 70) in
# design-system/lab-tokens.css. Warm hues carry more WCAG
# luminance than blue-violet at the same OKLCH L, so every
# text/accent pair is re-checked here rather than assumed.
# ============================================================
LAB_D = {
  "bg-deep":    (0.1700, 0.0080, 70),
  "bg-surface": (0.2050, 0.0110, 70),
  "bg-raised":  (0.2400, 0.0140, 70),
  "text-pri":   (0.9500, 0.0050, 80),
  "text-sec":   (0.7800, 0.0150, 78),
  "text-mut":   (0.6200, 0.0180, 76),
  "border-st":  (0.5000, 0.0180, 72),
  "terr-t1":    (0.7400, 0.1500, 295),
  "terr-t2":    (0.7400, 0.1200, 240),
  "terr-t3":    (0.7200, 0.1400, 15),
  "terr-t4":    (0.8200, 0.2000, 145),
  "up-draft":   (0.7800, 0.1300, 145),
  "up-resrch":  (0.7800, 0.1000, 80),
}
LAB_L = {
  "bg-deep":    (0.9650, 0.0140, 80),
  "bg-surface": (0.9450, 0.0180, 78),
  "bg-raised":  (0.9250, 0.0220, 76),
  "text-pri":   (0.2200, 0.0150, 70),
  "text-sec":   (0.4000, 0.0200, 68),
  "text-mut":   (0.5200, 0.0220, 70),
  "border-st":  (0.6200, 0.0260, 75),
  "terr-t1":    (0.4700, 0.1700, 295),
  "terr-t2":    (0.4800, 0.1400, 240),
  "terr-t3":    (0.4900, 0.1600, 15),
  "terr-t4":    (0.4600, 0.1500, 145),
  "up-draft":   (0.5050, 0.1100, 145),
  "up-resrch":  (0.5200, 0.0900, 70),
}
LAB_PAIRS = [
  ("text-pri","bg-deep",4.5),("text-pri","bg-surface",4.5),("text-pri","bg-raised",4.5),
  ("text-sec","bg-deep",4.5),("text-sec","bg-surface",4.5),
  ("text-mut","bg-deep",4.5),("text-mut","bg-surface",4.5),
  ("terr-t1","bg-deep",4.5),("terr-t2","bg-deep",4.5),
  ("terr-t3","bg-deep",4.5),("terr-t4","bg-deep",4.5),
  ("up-draft","bg-surface",4.5),("up-resrch","bg-surface",4.5),
  ("border-st","bg-deep",3.0),
]

run("LAB DARK", LAB_D, LAB_PAIRS)
run("LAB LIGHT", LAB_L, LAB_PAIRS)

# ============================================================
# Per-guide accents — each guide's frontmatter `accent`/`accentLight`
# renders as text (terms, links, active tab, catalog labels), so verify
# each against the lab background it sits on. `accent` publishes
# --guide-accent-dark (dark mode); `accentLight`, when curated, publishes
# --guide-accent-light (light mode). A guide with no `accentLight` falls
# back to the base --guide-accent-light token (checked elsewhere), so it
# is only reported here, not failed. Closes the 2026-07-01 audit gap.
# ============================================================
import re, glob, os

def hex_to_lum(hx):
    hx = hx.lstrip('#')
    srgb = [int(hx[i:i+2], 16) / 255 for i in (0, 2, 4)]
    lin = [c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4 for c in srgb]
    return 0.2126*lin[0] + 0.7152*lin[1] + 0.0722*lin[2]

def contrast_lum(a, b):
    hi, lo = max(a, b), min(a, b)
    return (hi + 0.05) / (lo + 0.05)

def check_guide_accents():
    print("\n=== LAB PER-GUIDE ACCENTS ===")
    bg_d, bg_l = wcag_lum(*LAB_D["bg-deep"]), wcag_lum(*LAB_L["bg-deep"])
    guide_dir = os.path.join(os.path.dirname(__file__), "..", "core", "lab", "guides")
    worst, uncurated = True, []
    for path in sorted(glob.glob(os.path.join(guide_dir, "*.md"))):
        parts = open(path, encoding="utf-8").read().split("---", 2)
        front = parts[1] if len(parts) >= 3 else ""
        slug = os.path.basename(path)[:-3]
        m_acc = re.search(r'(?m)^accent:\s*["\']?(#[0-9a-fA-F]{6})', front)
        m_lt = re.search(r'(?m)^accentLight:\s*["\']?(#[0-9a-fA-F]{6})', front)
        if m_acc:
            r = contrast_lum(hex_to_lum(m_acc.group(1)), bg_d)
            ok = r >= 4.5; worst = worst and ok
            print(f"  {'PASS' if ok else 'FAIL'}  {slug:<26} accent      {m_acc.group(1)} on dark   {r:5.2f}  (need 4.5)")
        if m_lt:
            r = contrast_lum(hex_to_lum(m_lt.group(1)), bg_l)
            ok = r >= 4.5; worst = worst and ok
            print(f"  {'PASS' if ok else 'FAIL'}  {slug:<26} accentLight {m_lt.group(1)} on light  {r:5.2f}  (need 4.5)")
        elif m_acc:
            uncurated.append(slug)
    if uncurated:
        print(f"  note: {len(uncurated)} guide(s) use the base light accent (no accentLight): {', '.join(uncurated)}")
    print(f"  --> {'ALL PASS' if worst else 'HAS FAILURES'}")

check_guide_accents()
