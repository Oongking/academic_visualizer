#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Build self-contained chapter packages plus the index that links them.

    python build/build.py            # everything
    python build/build.py 02 03      # only these chapters (index still rebuilt)

Each  build/chapters/chNN.js  defines a global CHAPTER object.
Output:  <subject>/chNN-<slug>.html  and  <subject>/index.html
Every output is one file with no dependencies, openable offline.
"""
import io, os, re, sys, json, glob, base64
from functools import lru_cache

ROOT  = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BUILD = os.path.join(ROOT, "build")


@lru_cache(maxsize=1)
def katex_css():
    """Embed WOFF2 assets so each generated chapter still opens offline."""
    vendor = os.path.join(BUILD, "vendor", "katex")
    css = read(os.path.join(vendor, "katex.min.css"))
    pattern = (r'src:url\(fonts/([^)]*\.woff2)\) format\("woff2"\),'
               r'url\(fonts/[^)]+\) format\("woff"\),'
               r'url\(fonts/[^)]+\) format\("truetype"\)')
    def inline(match):
        with open(os.path.join(vendor, "fonts", match.group(1)), "rb") as font:
            encoded = base64.b64encode(font.read()).decode("ascii")
        return 'src:url(data:font/woff2;base64,%s) format("woff2")' % encoded
    css, count = re.subn(pattern, inline, css)
    if count != 20 or "url(fonts/" in css:
        raise ValueError("Unexpected KaTeX font stylesheet; offline package incomplete")
    return css


def read(p):
    return io.open(p, encoding="utf-8").read()


def write(p, s):
    d = os.path.dirname(p)
    if d and not os.path.isdir(d):
        os.makedirs(d)
    io.open(p, "w", encoding="utf-8", newline="\n").write(s)
    return len(s.encode("utf-8"))


def field(src, name):
    m = re.search(r'\b' + name + r'\s*:\s*("(?:[^"\\]|\\.)*"|\[[^\]]*\])', src)
    return m.group(1) if m else None


def unquote(v):
    return v[1:-1] if v and v.startswith('"') else v


def map_geometry(src):
    ys = [int(n) for n in re.findall(r'\by\s*:\s*(\d+)', src)]
    xs = [int(n) for n in re.findall(r'\bx\s*:\s*(\d+)', src)]
    if not ys:
        return "0 0 470 500", 235, 486
    maxy, maxx = max(ys), (max(xs) if xs else 470)
    return "0 0 %d %d" % (max(470, maxx + 100), maxy + 76), max(470, maxx + 100) // 2, maxy + 62


# ---------------------------------------------------------------- page nav
#
# One reading order over the whole package, so back and forward mean the same
# thing on every page:
#
#   home -> physics index -> physics 01..20 -> maths index -> maths 01..16
#        -> the cross-subject sheet
#
# Chapters already carried prev/next, but only in the footer - on a chapter
# that scrolls for several screens you had to reach the bottom to move on.
# This puts the same three moves at the top of every page, and adds the one
# that was missing everywhere: up, to the page that contains this one.

SITE_TITLE = {"en": "Physics and Mathematics", "th": u"ฟิสิกส์และคณิตศาสตร์"}
BRIDGE_TITLE = {"en": u"Physics × Mathematics", "th": u"ฟิสิกส์ × คณิตศาสตร์"}


def site_pages(subs):
    """Every built page, in reading order."""
    pages = [{"path": "home.html", "title": SITE_TITLE, "up": None}]
    for s in ("physics", "math"):
        if s not in subs:
            continue
        man, fm = subs[s]["man"], subs[s]["filemap"]
        idx = "%s/index.html" % s
        pages.append({"path": idx, "title": man["subjectTitle"], "up": "home.html"})
        for ch in man["chapters"]:
            if ch["num"] in fm:
                pages.append({"path": "%s/%s" % (s, fm[ch["num"]][0]),
                              "title": ch["title"], "up": idx})
    pages.append({"path": "bridge.html", "title": BRIDGE_TITLE, "up": "home.html"})
    return pages


def _rel(from_path, to_path):
    """Link from one page to another, both named from the package root."""
    d = os.path.dirname(from_path)
    if not d:
        return to_path
    if to_path.startswith(d + "/"):
        return to_path[len(d) + 1:]
    return "../" + to_path


def page_nav(pages, path):
    """The top strip for one page: previous, up, next."""
    i = next((k for k, p in enumerate(pages) if p["path"] == path), None)
    if i is None:
        return ""
    cur = pages[i]
    bits = []

    if i > 0:
        p = pages[i - 1]
        bits.append('<a class="pn prev" href="%s" rel="prev">'
                    '<span class="pn-k" data-en="Back" data-th="ย้อนกลับ"></span>'
                    '<span class="pn-t" data-en="%s" data-th="%s"></span></a>'
                    % (esc(_rel(path, p["path"])),
                       esc(p["title"]["en"]), esc(p["title"]["th"])))
    else:
        bits.append('<span class="pn empty"></span>')

    if cur["up"]:
        up = next((p for p in pages if p["path"] == cur["up"]), None)
        bits.append('<a class="pn up" href="%s">'
                    '<span class="pn-t" data-en="%s" data-th="%s"></span></a>'
                    % (esc(_rel(path, cur["up"])),
                       esc(up["title"]["en"]) if up else "Up",
                       esc(up["title"]["th"]) if up else u"ขึ้น"))
    else:
        bits.append('<span class="pn empty"></span>')

    if i < len(pages) - 1:
        p = pages[i + 1]
        bits.append('<a class="pn next" href="%s" rel="next">'
                    '<span class="pn-k" data-en="Forward" data-th="ถัดไป"></span>'
                    '<span class="pn-t" data-en="%s" data-th="%s"></span></a>'
                    % (esc(_rel(path, p["path"])),
                       esc(p["title"]["en"]), esc(p["title"]["th"])))
    else:
        bits.append('<span class="pn empty"></span>')

    return ('<nav class="pagenav" aria-label="page">%s</nav>' % "".join(bits))


# ---------------------------------------------------------------- chapters

def build_chapter(path, css, engine, shell, filemap, order, nav=""):
    src = read(path)
    num = unquote(field(src, "num"))
    slug = unquote(field(src, "slug"))
    subject = unquote(field(src, "subject")) or "physics"
    tm = re.search(r'title\s*:\s*\[\s*"((?:[^"\\]|\\.)*)"', src)
    title = tm.group(1) if tm else slug

    vb, cx, exty = map_geometry(src)

    # The footer nav used to be English whatever the reader had chosen: a
    # hardcoded "All chapters" and the neighbours under their English titles.
    i = order.index(num) if num in order else -1
    bits = []
    if i > 0 and order[i - 1] in filemap:
        p = filemap[order[i - 1]]
        bits.append('<a href="%s" data-en="&larr; %s" data-th="&larr; %s"></a>'
                    % (p[0], esc(p[1]), esc(p[2])))
    bits.append('<a href="index.html" data-en="All chapters" '
                'data-th="ทุกบท"></a>')
    if 0 <= i < len(order) - 1 and order[i + 1] in filemap:
        n = filemap[order[i + 1]]
        bits.append('<a href="%s" data-en="%s &rarr;" data-th="%s &rarr;"></a>'
                    % (n[0], esc(n[1]), esc(n[2])))

    out = shell
    for tok, val in (("__PAGENAV__", nav),
                     ("__TITLE__", title), ("__MAPVB__", vb), ("__MAPCX__", str(cx)),
                     ("__MAPEXTY__", str(exty)), ("__NAV__", " &nbsp;·&nbsp; ".join(bits)),
                     ("__CSS__", css),
                     ("__KATEX_CSS__", katex_css()),
                     ("__KATEX_JS__", read(os.path.join(BUILD, "vendor", "katex", "katex.min.js"))),
                     ("__MATH_JS__", read(os.path.join(BUILD, "math-notation.js"))),
                     ("__COURSE_CSS__", read(os.path.join(BUILD, "course-theme.css"))),
                     ("__COURSE_THEME__", read(os.path.join(BUILD, "course-theme.js"))),
                     ("__CHAPTER__", src), ("__ENGINE__", engine)):
        out = out.replace(tok, val)

    dest = os.path.join(ROOT, subject, "ch%s-%s.html" % (num, slug))
    return dest, write(dest, out), len(re.findall(r'\{\s*id:"[\w-]+",\s*x:', src)), \
           len(re.findall(r'\{id:"M-\d+"', src))


# ---------------------------------------------------------------- index

CW, CH, PITCH, X0, ROW0, ROWH = 48, 40, 136, 144, 48, 136

# Routing channels, measured upward from a row's chip top.
# Stacked upward from a row's chip top, each 12px clear of the next:
#   -16 / -28  arrival - cross-track edges, before dropping into a chip
#   -40 / -52  bypass  - same-track edges arcing over the chips they skip
#   -64        the caption of the row above ends at or before here
CH_ARRIVE = 16
CH_BYPASS = 40
ELB = 8          # connector elbow radius
# Lane offsets within a corridor. The gutter has 88px of clear space, so five
# lanes fit; each channel holds two before it would reach the row above. Gutter
# lanes take the far side first, which leaves the left neighbour's caption the
# room it needs more often than a symmetric order would.
LANE = 12                  # clear distance between two parallel runs
CHANNEL_LANES = (0, 1)     # a channel holds two lanes before it reaches the row above
LBL_EN, LBL_TH = 11.0, 10.0   # label sizes; 10px is the Thai legibility floor
ADV = 0.60       # advance width per character, as a fraction of font size
TH_COLS = 17     # fallback spacing-character budget for a Thai line


def th_spacing(s):
    """Thai width is driven by spacing characters only.

    Tone marks and the vowels that sit above or below the base line are
    nonspacing: they add height, never length. Counting them - which is what
    len() does - oversizes the estimate by up to a third and made the old
    autofit shrink labels to 6.8px for no reason."""
    import unicodedata
    return sum(0 if unicodedata.category(c) == "Mn" else 1 for c in s)


def wrap_label(title, width, lines=2):
    """Word-wrap an English title to fit under a chip."""
    out, cur = [], ""
    for w in title.split():
        t = (cur + " " + w).strip()
        if len(t) <= width or not cur:
            cur = t
        else:
            out.append(cur)
            cur = w
    if cur:
        out.append(cur)
    if len(out) > lines:
        out = out[:lines]
        out[-1] = out[-1][:max(1, width - 1)] + u"…"
    return out


def wrap_thai(title, width=TH_COLS, hint=None):
    """Break a Thai title onto two lines without guessing at segmentation.

    Thai has no inter-word spaces, so the old code shrank the font instead of
    wrapping - which is why one label ended up at 6.8px. Breaking on character
    count would cut syllables mid-cluster, so we only ever break where a word
    boundary is known: an explicit `thWrap` pair in the manifest, or before the
    conjunction 'lae' (and). A title that fits neither stays on one line at the
    10px floor and is reported by the geometry check rather than shrunk."""
    if th_spacing(title) <= width:
        return [title]
    if hint and len(hint) == 2 and all(th_spacing(h) <= width for h in hint):
        return list(hint)
    cut = title.find(u"และ", 1)      # lae
    if cut > 0:
        head, tail = title[:cut], title[cut:]
        if th_spacing(head) <= width and th_spacing(tail) <= width:
            return [head, tail]
    return [title]


def chip_label(cx, top, title, cls, half=52, thai=False, hint=None):
    """Centred caption under a chip, for one language.

    `half` is how far the caption may spread either side of the chip centre
    before it would touch a connector descending the neighbouring gutter, so
    chips beside a busy gutter wrap earlier than chips in open space."""
    size = LBL_TH if thai else LBL_EN
    cols = max(6, int(half * 2 / (size * ADV) + 0.05))
    if thai:
        lines, step = wrap_thai(title, cols, hint), 14
    else:
        lines, step = wrap_label(title, cols, 2), 12
    return "".join('<text class="cname %s" x="%d" y="%d" font-size="%.1f">%s</text>'
                   % (cls, cx, top + i * step, size, esc(line))
                   for i, line in enumerate(lines))


# ---- orthogonal router -------------------------------------------------
#
# Every connector is built as a polyline whose segments alternate horizontal
# and vertical, then rendered with quarter-arc corners. Three routes cover the
# whole graph (both manifests are acyclic and no edge ever points upward):
#
#   near    adjacent chips in one track  - straight across, or one jog
#   bypass  same track, chips in between - arcs over them in the bypass channel
#   cross   different tracks             - out to a gutter, down, in from above
#
# Nothing is routed through a chip or through the label band beneath it.


def _sgn(a):
    return (a > 0) - (a < 0)


def elbow(pts, r=ELB):
    """Render an orthogonal polyline with quarter-arc corners.

    The radius shrinks on short segments so a tight jog stays a clean S rather
    than overshooting into the next bend."""
    pts = _dedupe(pts)
    if len(pts) < 2:
        return ""
    d = ["M%g %g" % pts[0]]
    for i in range(1, len(pts) - 1):
        (x0, y0), (x1, y1), (x2, y2) = pts[i - 1], pts[i], pts[i + 1]
        dx1, dy1 = _sgn(x1 - x0), _sgn(y1 - y0)
        dx2, dy2 = _sgn(x2 - x1), _sgn(y2 - y1)
        if (dx1, dy1) == (dx2, dy2):
            continue                                   # collinear, no corner
        rr = min(r, (abs(x1 - x0) + abs(y1 - y0)) / 2.0,
                 (abs(x2 - x1) + abs(y2 - y1)) / 2.0)
        if rr < 1:
            continue
        sweep = 1 if (dx1 * dy2 - dy1 * dx2) > 0 else 0
        d.append("L%g %g" % (x1 - dx1 * rr, y1 - dy1 * rr))
        d.append("A%g %g 0 0 %d %g %g"
                 % (rr, rr, sweep, x1 + dx2 * rr, y1 + dy2 * rr))
    d.append("L%g %g" % pts[-1])
    return " ".join(d)


def _dedupe(pts):
    out = []
    for p in pts:
        if not out or (abs(p[0] - out[-1][0]) > .01 or abs(p[1] - out[-1][1]) > .01):
            out.append(p)
    return out


def _segments(pts):
    return [(pts[i], pts[i + 1]) for i in range(len(pts) - 1)]


def _hop(pts, hops, r=ELB):
    """Elbow path with a small bump wherever this line crosses another.

    Only vertical runs hop, so at every crossing exactly one of the two lines is
    interrupted and the reader can still trace both. A bump is placed by its
    distance along the run and is skipped unless it clears both corner arcs -
    measuring in y instead lets a bump overrun a corner and double back."""
    pts = _dedupe(pts)
    hops = sorted(set(hops))
    if not hops or len(pts) < 2:
        return elbow(pts, r)
    n = len(pts)

    def rad(i):
        """Corner radius at pts[i], matching elbow()."""
        if i <= 0 or i >= n - 1:
            return 0.0
        (x0, y0), (x1, y1), (x2, y2) = pts[i - 1], pts[i], pts[i + 1]
        return min(r, (abs(x1 - x0) + abs(y1 - y0)) / 2.0,
                   (abs(x2 - x1) + abs(y2 - y1)) / 2.0)

    d = ["M%g %g" % pts[0]]
    for i in range(1, n):
        (x0, y0), (x1, y1) = pts[i - 1], pts[i]
        pre, post = rad(i - 1), rad(i)
        if x0 == x1:                                   # vertical - may carry hops
            step = _sgn(y1 - y0)
            span = abs(y1 - y0)
            placed = []
            for hx, hy in hops:
                if abs(hx - x0) > .5:
                    continue
                t = abs(hy - y0)
                if not (pre + r < t < span - post - r):
                    continue
                if any(abs(t - u) < 2 * r for u in placed):
                    continue
                placed.append(t)
            for t in sorted(placed):
                hy = y0 + step * t
                sweep = 0 if step > 0 else 1        # bump always bulges east
                d.append("L%g %g" % (x0, hy - step * r))
                d.append("A%g %g 0 0 %d %g %g" % (r, r, sweep, x0, hy + step * r))
        if i < n - 1:                                  # stop short, corner follows
            dx, dy = _sgn(x1 - x0), _sgn(y1 - y0)
            nx, ny = pts[i + 1]
            ex, ey = _sgn(nx - x1), _sgn(ny - y1)
            d.append("L%g %g" % (x1 - dx * post, y1 - dy * post))
            sweep = 1 if (dx * ey - dy * ex) > 0 else 0
            d.append("A%g %g 0 0 %d %g %g"
                     % (post, post, sweep, x1 + ex * post, y1 + ey * post))
        else:
            d.append("L%g %g" % (x1, y1))
    return " ".join(d)


def _best_two_line(title):
    """Longest line of the narrowest two-line wrap of an English title.

    Not the longest word: 'Relations and Functions' has no word over nine
    characters, but no two-line arrangement of it is narrower than thirteen,
    and sizing the column to the word is what pushed it into an ellipsis."""
    w = title.split()
    if len(w) < 2:
        return len(title)
    return min(max(len(" ".join(w[:i])), len(" ".join(w[i:])))
               for i in range(1, len(w)))


def caption_need(man, rows):
    """Half-width each column's captions genuinely need, in px.

    A caption can only wrap where a word boundary exists, so its narrowest
    legal form is set by its longest unbreakable line - the longest English
    word, or the longer half of a Thai title's one known break. Gutters are
    then placed in what is left over, which is what stops a busy gutter from
    squeezing a caption it happens to sit beside."""
    need, col = {}, {}
    for ch in man["chapters"]:
        r = rows[ch["group"]]
        i = col.get(r, 0)
        col[r] = i + 1
        en = _best_two_line(ch["title"]["en"]) * LBL_EN * ADV
        th = ch["title"]["th"]
        parts = ch["title"].get("thWrap")
        if not parts:
            k = th.find(u"และ", 1)
            parts = [th[:k], th[k:]] if k > 0 else [th]
        thw = max(th_spacing(p) for p in parts) * LBL_TH * ADV
        need[i] = max(need.get(i, 0), en / 2.0, thw / 2.0)
    # round up to the grid so the gutter never lands a fraction of a character
    # short of what the caption needs
    return dict((k, 4 * int(v / 4.0 + 0.999)) for k, v in need.items())


def _lane(intervals):
    """Greedy interval colouring, returned as a per-item offset.

    Several connectors want the same gutter or the same arrival channel. Two of
    them may share it only if their spans do not touch; where they do, each gets
    its own lane so no run is ever drawn on top of another."""
    order = sorted(range(len(intervals)), key=lambda i: intervals[i][0])
    lanes, out = [], [0] * len(intervals)
    for i in order:
        lo, hi = intervals[i]
        for k, end in enumerate(lanes):
            if lo >= end - 0.5:
                lanes[k], out[i] = hi, k
                break
        else:
            lanes.append(hi)
            out[i] = len(lanes) - 1
    return out, len(lanes)


def _skeleton(e):
    """Corridor assignment for one edge, at nominal (un-laned) positions."""
    if e["ra"] == e["rb"] and abs(e["cb"] - e["ca"]) == 1:
        return "near", None, None
    if e["ra"] == e["rb"]:
        return "bypass", None, e["ay"] - CH_BYPASS
    gcol = e["ca"] if e["cb"] >= e["ca"] else e["ca"] - 1
    return "cross", gcol, e["by"] - CH_ARRIVE


def _route(e):
    """Polyline for one edge, once its ports and lanes are fixed."""
    ax, ay, bx, by = e["ax"], e["ay"], e["bx"], e["by"]
    if e["kind"] == "near":
        sx = ax + CW if e["cb"] > e["ca"] else ax
        ex = bx if e["cb"] > e["ca"] else bx + CW
        if abs(e["p0"] - e["p1"]) < .01:
            return [(sx, e["p0"]), (ex, e["p1"])]
        mid = (sx + ex) / 2.0
        return [(sx, e["p0"]), (mid, e["p0"]), (mid, e["p1"]), (ex, e["p1"])]
    if e["kind"] == "bypass":
        return [(e["p0"], ay), (e["p0"], e["chy"]), (e["p1"], e["chy"]), (e["p1"], by)]
    sx = ax + CW if e["cb"] >= e["ca"] else ax
    return [(sx, e["p0"]), (e["gx"], e["p0"]),
            (e["gx"], e["chy"]), (e["p1"], e["chy"]), (e["p1"], by)]


def route_edges(raw, need):
    """Turn classified edges into polylines: ports, lanes, then crossings.

    Ports are fanned per chip *edge*, pooling arrivals and departures together -
    a chip's left edge can both receive a connector from the previous chapter
    and send one down to another track, and those two must not land on the same
    point."""
    for e in raw:
        e["kind"], e["gcol"], e["chy"] = _skeleton(e)
        if e["kind"] == "near":
            e["s0"], e["s1"] = ("R", "L") if e["cb"] > e["ca"] else ("L", "R")
        elif e["kind"] == "bypass":
            e["s0"] = e["s1"] = "T"
        else:
            e["s0"], e["s1"] = ("R" if e["cb"] >= e["ca"] else "L"), "T"

    # --- ports: every endpoint on one chip edge gets its own attach point ---
    pool = {}
    for e in raw:
        pool.setdefault((e["a"], e["s0"]), []).append((e, 0))
        pool.setdefault((e["b"], e["s1"]), []).append((e, 1))
    for (node, side), lst in pool.items():
        lst.sort(key=lambda t: (t[1], t[0]["rb"], t[0]["cb"]))
        n = len(lst)
        span, base = (CW, "ax") if side == "T" else (CH, "ay")
        for k, (e, end) in enumerate(lst, 1):
            org = (e["ax"] if end == 0 else e["bx"]) if side == "T" else \
                  (e["ay"] if end == 0 else e["by"])
            e["p%d" % end] = org + span * k / float(n + 1)

    # --- lanes: parallel runs in one corridor get their own line ---
    gut = {}
    for e in raw:
        if e["kind"] == "cross":
            gut.setdefault(e["gcol"], []).append(e)
    for gcol, lst in gut.items():
        spans = [(min(e["p0"], e["chy"]), max(e["p0"], e["chy"])) for e in lst]
        idx, n = _lane(spans)
        base = X0 + gcol * PITCH + CW / 2.0
        lo = base + need.get(gcol, 0) + 8              # clear the left caption
        hi = base + PITCH - need.get(gcol + 1, 0) - 8  # clear the right caption
        half = (n - 1) * LANE / 2.0
        mid = 4 * round((lo + hi) / 8.0)                # centre, on the 4px grid
        if hi - lo >= 2 * half:                        # keep the bundle inside
            mid = min(max(mid, lo + half), hi - half)
        else:
            mid = (lo + hi) / 2.0
        for e, k in zip(lst, idx):
            e["gx"] = mid + (k - (n - 1) / 2.0) * LANE

    chan = {}
    for e in raw:
        if e["kind"] != "near":
            chan.setdefault(e["chy"], []).append(e)
    for cy, lst in chan.items():
        spans = []
        for e in lst:
            a = e["gx"] if e["kind"] == "cross" else e["p0"]
            spans.append((min(a, e["p1"]), max(a, e["p1"])))
        idx, n = _lane(spans)
        for e, k in zip(lst, idx):
            e["chy"] = cy - min(k, len(CHANNEL_LANES) - 1) * LANE

    for e in raw:
        e["pts"] = _route(e)
        e["hops"] = []

    # --- crossings: bump the dashed cross-track line, never both ---
    for i, e in enumerate(raw):
        for j in range(i + 1, len(raw)):
            f = raw[j]
            if e["cross"] == f["cross"]:
                bend, other = (f, e)              # deterministic: the later one
            else:
                bend, other = (e, f) if e["cross"] else (f, e)
            for p0, p1 in _segments(bend["pts"]):
                if p0[0] != p1[0]:
                    continue
                for q0, q1 in _segments(other["pts"]):
                    if q0[1] != q1[1]:
                        continue
                    x, y = p0[0], q0[1]
                    if (min(q0[0], q1[0]) < x - .5 and x + .5 < max(q0[0], q1[0])
                            and min(p0[1], p1[1]) < y - .5
                            and y + .5 < max(p0[1], p1[1])):
                        bend["hops"].append((x, y))
    return raw


def label_room(chips, raw, cap=52):
    """How wide each chip's caption may be before it touches a connector.

    A gutter run descends past the captions of the rows it crosses, so the
    budget is per chip, not global: measure the nearest vertical run that
    actually passes through this caption's band and stop short of it."""
    room = {}
    verts = []
    for e in raw:
        for p0, p1 in _segments(e["pts"]):
            if p0[0] == p1[0]:
                verts.append((p0[0], min(p0[1], p1[1]), max(p0[1], p1[1])))
    for num, (x, y) in chips.items():
        cx = x + CW / 2.0
        top, bot = y + CH + 4, y + CH + 32
        lim = cap
        for vx, v0, v1 in verts:
            if v1 > top and v0 < bot:
                lim = min(lim, abs(vx - cx) - 8)
        room[num] = max(28, lim)
    return room

def tracks_svg(man, built, slug):
    rows = {g["id"]: g["row"] for g in man["groups"]}
    pos, per_row = {}, {}
    for ch in man["chapters"]:
        r = rows[ch["group"]]
        i = per_row.get(r, 0)
        per_row[r] = i + 1
        pos[ch["num"]] = (X0 + i * PITCH, ROW0 + r * ROWH, r, i)

    # --- classify every edge, then fan the attach points -----------------
    raw = []
    for ch in man["chapters"]:
        bx, by, rb, cb = pos[ch["num"]]
        for req in ch.get("requires", []):
            if req not in pos:
                continue
            ax, ay, ra, ca = pos[req]
            if ra == rb and abs(cb - ca) == 1:
                exit_side, entry_side = ("R", "L") if cb > ca else ("L", "R")
            elif ra == rb:
                exit_side, entry_side = "T", "T"
            else:
                exit_side, entry_side = ("R" if cb >= ca else "L"), "T"
            raw.append(dict(a=req, b=ch["num"], ax=ax, ay=ay, bx=bx, by=by,
                            ra=ra, rb=rb, ca=ca, cb=cb, cross=(ra != rb)))

    route_edges(raw, caption_need(man, rows))
    room = label_room({c["num"]: pos[c["num"]][:2] for c in man["chapters"]}, raw)

    edges = []
    for g in man["groups"]:
        y = ROW0 + g["row"] * ROWH + CH / 2
        for lang in ("en", "th"):
            edges.append('<text class="lane lane-%s" x="16" y="%.0f" '
                         'dominant-baseline="middle">%s</text>'
                         % (lang, y, esc(g["name"][lang])))
    for e in raw:
        cls = "tedge cross" if e["cross"] else "tedge"
        edges.append('<path class="%s" d="%s" marker-end="url(#tah-%s)"/>'
                     % (cls, _hop(e["pts"], e["hops"]), slug))

    # --- chips ----------------------------------------------------------
    fan = {}
    for e in raw:
        fan[e["a"]] = fan.get(e["a"], 0) + 1
    key = max(fan, key=lambda n: (fan[n], -int(n))) if fan else None

    chips = []
    for ch in man["chapters"]:
        x, y, _, _ = pos[ch["num"]]
        on = ch["num"] in built
        href = ' data-href="%s"' % built[ch["num"]][0] if on else ""
        cx, n = x + CW // 2, fan.get(ch["num"], 0)
        badge = ""
        if n >= 2:
            badge = ('<text class="fan" x="%d" y="%d">%d</text>'
                     % (x + CW - 9, y + 14, n))
        chips.append('<g class="chip" data-on="%d" data-key="%d"%s>'
                     '<title data-en="%s" data-th="%s">%s</title>'
                     '<rect x="%d" y="%d" width="%d" height="%d"/>'
                     '%s<text class="cnum" x="%d" y="%d">%s</text>'
                     '%s%s</g>'
                     % (1 if on else 0, 1 if ch["num"] == key else 0, href,
                        esc(ch["title"]["en"]), esc(ch["title"]["th"]),
                        esc(ch["title"]["en"]),
                        x, y, CW, CH, badge, cx, y + CH // 2 + 6, ch["num"],
                        chip_label(cx, y + CH + 14, ch["title"]["en"], "cname-en",
                                   room[ch["num"]]),
                        chip_label(cx, y + CH + 16, ch["title"]["th"], "cname-th",
                                   room[ch["num"]], True,
                                   ch["title"].get("thWrap"))))

    width = X0 + (max(per_row.values()) - 1) * PITCH + CW + 64
    height = ROW0 + (max(rows.values())) * ROWH + CH + 36
    return ("0 0 %d %d" % (width, height), "\n    ".join(edges + chips),
            key, fan.get(key, 0))


def cards_html(man, built, stats):
    out = []
    for g in man["groups"]:
        chs = [c for c in man["chapters"] if c["group"] == g["id"]]
        if not chs:
            continue
        out.append('<section class="grp">')
        out.append('<h2 data-en="%s" data-th="%s"></h2><hr>' % (g["name"]["en"], g["name"]["th"]))
        out.append('<div class="cards">')
        for c in chs:
            num, en, th = c["num"], c["title"]["en"], c["title"]["th"]
            need = ", ".join(c.get("requires", []))
            # one language at a time — the title swaps with everything else
            title = '<h3 data-en="%s" data-th="%s"></h3>' % (esc(en), esc(th))
            if num in built:
                href = built[num][0]
                nodes, methods = stats.get(num, (0, 0))
                foot = ('<span class="pill live" data-en="Ready" data-th="พร้อม"></span>'
                        '<span>%d <span data-en="nodes" data-th="โหนด"></span></span>'
                        '<span>%d <span data-en="methods" data-th="วิธี"></span></span>'
                        % (nodes, methods))
                out.append('<a class="card" href="%s"><span class="n">%s</span>'
                           '%s<div class="foot">%s</div></a>'
                           % (href, num, title, foot))
            else:
                foot = '<span class="pill" data-en="Planned" data-th="ยังไม่สร้าง"></span>'
                if need:
                    foot += '<span><span data-en="needs" data-th="ต้องรู้ก่อน"></span> %s</span>' % need
                out.append('<div class="card soon"><span class="n">%s</span>'
                           '%s<div class="foot">%s</div></div>'
                           % (num, title, foot))
        out.append('</div></section>')
    return "\n".join(out)


def track_legend(man, built, key, keyn):
    """Figure caption under the map.

    Kept in HTML rather than inside the SVG: a legend drawn into the artwork
    collides with the diagram at narrow widths, and the house style already
    frames every plate with a caption beneath it. Reflows and switches language
    with the rest of the page for free."""
    kt = next((c["title"] for c in man["chapters"] if c["num"] == key), None)
    items = [
        ('<span class="sw sw-on"></span>',
         "Chapter you can open now", u"บทที่เปิดอ่านได้แล้ว"),
        ('<span class="sw sw-off"></span>',
         "Not written yet", u"ยังไม่ได้เขียน"),
        ('<svg class="sw" viewBox="0 0 26 8"><path d="M0 4 H22" '
         'stroke="var(--ink-faint)" stroke-width="1.4" fill="none"/></svg>',
         "Needs the chapter it points from, same track",
         u"ชี้จากบทที่ต้องอ่านก่อน · สายเดียวกัน"),
        ('<svg class="sw" viewBox="0 0 26 8"><path d="M0 4 H22" '
         'stroke="var(--ink-faint)" stroke-width="1.4" stroke-dasharray="3 3" '
         'fill="none"/></svg>',
         "Needs it from another track", u"ชี้จากบทที่ต้องอ่านก่อน · ข้ามสาย"),
        ('<span class="sw sw-fan">n</span>',
         "How many later chapters need this one",
         u"มีกี่บทข้างหน้าที่ต้องใช้บทนี้"),
    ]
    if key:
        items.append(('<span class="sw sw-key"></span>',
                      "%s - the chapter most others depend on (%d)"
                      % (kt["en"], keyn),
                      u"%s · บทที่บทอื่นต้องใช้มากที่สุด (%d บท)" % (kt["th"], keyn)))
    return "\n  ".join(
        '<span class="lg"><span class="lgsw">%s</span>%s</span>'
        % (sw, bi("span", {"en": en, "th": th}))
        for sw, en, th in items)


def spellbook_html(man, built):
    """The spellbook: one card per stage lab ("spell") in the subject, in
    chapter order. Each card links to its section; the page's script fills in
    trials mastered and foresight from that chapter's saved progress."""
    cards = []
    for ch in man["chapters"]:
        num = ch["num"]
        if num not in built:
            continue
        fname, path = built[num][0], built[num][3]
        src = read(path)
        chid = unquote(field(src, "id")) or ("ch" + num)
        starts = [m.start() for m in re.finditer(r'\{\s*id:"[\w-]+",\s*x:', src)]
        for i, a in enumerate(starts):
            seg = src[a:(starts[i + 1] if i + 1 < len(starts) else len(src))]
            if 'viz:"stage"' not in seg:
                continue
            nid = re.match(r'\{\s*id:"([\w-]+)"', seg).group(1)
            sm = re.search(r'spellName:\["((?:[^"\\]|\\.)*)","((?:[^"\\]|\\.)*)"\]', seg)
            tm = re.search(r'title:\["((?:[^"\\]|\\.)*)","((?:[^"\\]|\\.)*)"\]', seg)
            if not sm or not tm:
                continue
            has_trials = "trials:{" in seg
            has_pred = "predict:{" in seg
            cards.append(
                '<a class="spell-card" href="%s#sec-%s" data-ch="%s" data-node="%s" data-trials="%d" data-pred="%d">'
                '<span class="sp-ch" data-en="Chapter %s · %s" data-th="บทที่ %s · %s"></span>'
                '<b class="sp-topic" data-en="%s" data-th="%s"></b>'
                '<span class="sp-name" data-en="%s" data-th="%s"></span>'
                '<span class="sp-stats"><span class="sp-m"></span><span class="sp-f"></span></span></a>'
                % (fname, nid, chid, nid, has_trials, has_pred,
                   int(num), esc(ch["title"]["en"]), int(num), esc(ch["title"]["th"]),
                   esc(tm.group(1)), esc(tm.group(2)), esc(sm.group(1)), esc(sm.group(2))))
    if not cards:
        return ""
    return ('<section class="spellbook" aria-labelledby="sb-title">'
            '<span class="label" data-en="The spellbook" data-th="ตำราเวท"></span>'
            '<h2 id="sb-title" data-en="Physics is the knowledge that makes the magic work" '
            'data-th="ฟิสิกส์คือความรู้ที่ทำให้เวทมนตร์ได้ผล"></h2>'
            '<p class="sb-lede" data-en="Every spell below is a formula you can drive by hand. Master its trials and '
            'foresee its outcome before you cast; your progress is kept in this browser." '
            'data-th="เวททุกบทด้านล่างคือสูตรที่คุณควบคุมได้ด้วยมือ ผ่านบททดสอบและทำนายผลก่อนร่าย '
            'ความคืบหน้าถูกเก็บไว้ในเบราว์เซอร์นี้"></p>'
            '<p class="sb-sum" id="sbSum"></p>'
            '<div class="spells">%s</div></section>' % "".join(cards))


def build_index(man, built, stats, css, nav=""):
    tpl = read(os.path.join(BUILD, "index.template.html"))
    slug = man["subject"]
    vb, tracks, key, keyn = tracks_svg(man, built, slug)
    nb, nt = len(built), len(man["chapters"])
    nodes = sum(v[0] for v in stats.values())
    methods = sum(v[1] for v in stats.values())
    out = tpl
    kt = next((c["title"] for c in man["chapters"] if c["num"] == key), None)
    desc_en = ("Dependency map of %d %s chapters arranged in %d tracks. Arrows "
               "run from a chapter to the later chapters that need it; dashed "
               "arrows cross between tracks.%s"
               % (nt, man["subjectTitle"]["en"].lower(), len(man["groups"]),
                  (" %s is the most depended-on chapter, required by %d others."
                   % (kt["en"], keyn)) if key else ""))
    desc_th = (u"แผนผังลำดับก่อนหลังของ %d บท จัดเป็น %d สาย "
               u"ลูกศรชี้จากบทหนึ่งไปยังบทถัดไปที่ต้องใช้บทนั้น "
               u"เส้นประคือความเชื่อมโยงข้ามสาย%s"
               % (nt, len(man["groups"]),
                  (u" %s เป็นบทที่บทอื่นต้องใช้มากที่สุด คือ %d บท"
                   % (kt["th"], keyn)) if key else ""))
    for tok, val in (("__PAGENAV__", nav),
                     ("__CSS__", css),
                     ("__COURSE_CSS__", read(os.path.join(BUILD, "course-theme.css"))),
                     ("__COURSE_THEME__", read(os.path.join(BUILD, "course-theme.js"))),
                     ("__TRACKVB__", vb), ("__TRACKS__", tracks),
                     ("__SLUG__", slug),
                     ("__TRACKDESC_EN__", esc(desc_en)),
                     ("__TRACKDESC_TH__", esc(desc_th)),
                     ("__TRACKLEGEND__", track_legend(man, built, key, keyn)),
                     ("__CARDS__", cards_html(man, built, stats)),
                     ("__SPELLBOOK__", spellbook_html(man, built)),
                     ("__SRC_EN__", esc(man.get("source", {}).get("en", ""))),
                     ("__SRC_TH__", esc(man.get("source", {}).get("th", ""))),
                     ("__SUBJECT__", man["subjectTitle"]["en"]),
                     ("__SUBJ_EN__", man["subjectTitle"]["en"]),
                     ("__SUBJ_TH__", man["subjectTitle"]["th"]),
                     ("__LEVEL_EN__", man["level"]["en"]), ("__LEVEL_TH__", man["level"]["th"]),
                     ("__BUILT__", str(nb)), ("__TOTAL__", str(nt)),
                     ("__NODES__", str(nodes)), ("__METHODS__", str(methods)),
                     ("__PCT__", "%.0f" % (100.0 * nb / nt))):
        out = out.replace(tok, val)
    dest = os.path.join(ROOT, man["subject"], "index.html")
    return dest, write(dest, out)


# ---------------------------------------------------------------- bridge
#
# One page above both subjects, generated from build/bridge.json, showing which
# maths chapter each physics chapter actually depends on and what for.

MLAB, MCELL, MROWH, MTOP = 192, 28, 24, 48


def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;")
             .replace(">", "&gt;").replace('"', "&quot;"))


def bi(tag, pair, cls=""):
    """An element the language toggle swaps in place."""
    c = ' class="%s"' % cls if cls else ""
    return '<%s%s data-en="%s" data-th="%s"></%s>' % (
        tag, c, esc(pair["en"]), esc(pair["th"]), tag)


def matrix_svg(data, subs):
    """Incidence matrix: which maths chapter each physics chapter leans on.

    Level is carried by ink weight, not by hue - a filled square is
    load-bearing, a hollow one is supporting. The earlier version filled all
    34 load-bearing cells with the accent, which spends the one red this house
    style allows on 34 places at once and so marks nothing. The accent now goes
    to a single column: the maths chapter the most physics chapters depend on.
    """
    ph = subs["physics"]["man"]["chapters"]
    ma = subs["math"]["man"]["chapters"]

    grid, tally = {}, {}
    for link in data["links"]:
        for u in link["uses"]:
            grid[(link["ph"], u["ma"])] = u["core"]
            if u["core"]:
                tally[u["ma"]] = tally.get(u["ma"], 0) + 1
    key = max(tally, key=lambda n: (tally[n], -int(n))) if tally else None

    w = MLAB + len(ma) * MCELL + 16
    rows_bottom = MTOP + len(ph) * MROWH
    h = rows_bottom + 12
    bands, marks = [], []

    marks.append('<text class="mhead" x="0" y="18" data-en="PHYSICS" data-th="ฟิสิกส์"></text>')
    marks.append('<text class="mhead" x="%d" y="18" data-en="MATHEMATICS" data-th="คณิตศาสตร์"></text>' % MLAB)
    for j, c in enumerate(ma):
        x = MLAB + j * MCELL
        on = c["num"] == key
        if on:                                   # the one accent: the spine column
            bands.append('<rect class="mkeycol" x="%d" y="%d" width="%d" height="%d"/>'
                         % (x, MTOP - 20, MCELL, rows_bottom - MTOP + 20))
        marks.append('<text class="mcol%s" x="%d" y="%d">%s</text>'
                     % (" key" if on else "", x + MCELL // 2, MTOP - 12, c["num"]))
        if j:
            bands.append('<line class="mgrid" x1="%d" y1="%d" x2="%d" y2="%d"/>'
                         % (x, MTOP - 4, x, rows_bottom))

    for i, p in enumerate(ph):
        y = MTOP + i * MROWH
        if i % 2 == 0:
            bands.insert(0, '<rect class="mband" x="0" y="%d" width="%d" height="%d"/>'
                            % (y, w, MROWH))
        marks.append('<text class="mlab n" x="0" y="%d" dominant-baseline="middle">%s</text>'
                     % (y + MROWH // 2, p["num"]))
        marks.append('<text class="mlab" x="28" y="%d" dominant-baseline="middle" '
                     'data-en="%s" data-th="%s"></text>'
                     % (y + MROWH // 2, esc(p["title"]["en"]), esc(p["title"]["th"])))
        for j, c in enumerate(ma):
            core = grid.get((p["num"], c["num"]))
            if core is None:
                continue
            cx, cy = MLAB + j * MCELL + MCELL / 2.0, y + MROWH / 2.0
            sz = 12 if core else 10
            tip_en = "Physics %s %s  →  Maths %s %s  ·  %s" % (
                p["num"], p["title"]["en"], c["num"], c["title"]["en"],
                "load-bearing" if core else "supporting")
            tip_th = "ฟิสิกส์ %s %s  →  คณิต %s %s  ·  %s" % (
                p["num"], p["title"]["th"], c["num"], c["title"]["th"],
                "รับน้ำหนักหลัก" if core else "สนับสนุน")
            marks.append('<rect class="%s" x="%.1f" y="%.1f" width="%d" height="%d">'
                         '<title data-en="%s" data-th="%s">%s</title></rect>'
                         % ("core" if core else "sup", cx - sz / 2.0, cy - sz / 2.0, sz, sz,
                            esc(tip_en), esc(tip_th), esc(tip_en)))

    kt = next((c["title"] for c in ma if c["num"] == key), None)
    return ("0 0 %d %d" % (w, h), "\n      ".join(bands + marks), key,
            tally.get(key, 0), kt)


def chapter_link(subject, num, filemap, titles):
    """A link to a built chapter. The label swaps with the language, so the
    page never shows two languages at once."""
    t = titles[num]
    attrs = 'data-en="%s" data-th="%s"' % (esc(t["en"]), esc(t["th"]))
    if num in filemap:
        return '<a href="%s/%s" %s></a>' % (subject, filemap[num][0], attrs)
    return '<span %s></span>' % attrs


def rows_html(data, subs):
    pht = dict((c["num"], c["title"]) for c in subs["physics"]["man"]["chapters"])
    mat = dict((c["num"], c["title"]) for c in subs["math"]["man"]["chapters"])
    phf, maf = subs["physics"]["filemap"], subs["math"]["filemap"]

    out = []
    for link in data["links"]:
        n = link["ph"]
        t = pht[n]
        head = chapter_link("physics", n, phf, pht)
        out.append('<article class="phb">')
        out.append('  <div class="phb-head"><span class="phb-n">PHYSICS %s</span>'
                   '<h3>%s</h3></div>' % (n, head))
        for u in link["uses"]:
            m = u["ma"]
            out.append('  <div class="use">')
            out.append('    <div class="use-l"><span class="man">MATHS %s</span>%s%s</div>'
                       % (m, chapter_link("math", m, maf, mat),
                          bi("span", {"en": "Load-bearing", "th": "รับน้ำหนักหลัก"}, "tag core")
                          if u["core"] else
                          bi("span", {"en": "Supporting", "th": "สนับสนุน"}, "tag")))
            out.append('    <div>%s%s</div>' % (bi("p", u["what"], "use-what"),
                                                bi("p", u["why"], "use-why")))
            out.append('  </div>')
        out.append('</article>')
    return "\n".join(out)


def reverse_html(data, subs):
    pht = dict((c["num"], c["title"]) for c in subs["physics"]["man"]["chapters"])
    mat = dict((c["num"], c["title"]) for c in subs["math"]["man"]["chapters"])
    phf, maf = subs["physics"]["filemap"], subs["math"]["filemap"]

    back = {}
    for link in data["links"]:
        for u in link["uses"]:
            back.setdefault(u["ma"], []).append((link["ph"], u["core"]))

    out = ['<div class="rev">']
    for m in sorted(back):
        users = back[m]
        chips = []
        for n, core in users:
            href = "physics/%s" % phf[n][0] if n in phf else None
            cls = ' class="core"' if core else ""
            tip = esc(pht[n]["en"])
            chips.append('<a%s href="%s" title="%s">%s</a>' % (cls, href or "#", tip, n)
                         if href else '<span title="%s">%s</span>' % (tip, n))
        title = chapter_link("math", m, maf, mat)
        out.append('<div class="rev-c">')
        out.append('  <span class="man">MATHS %s</span>' % m)
        out.append('  <h4>%s</h4>' % title)
        out.append('  <span class="rev-n">%d %s</span>'
                   % (len(users), bi("span", {"en": "physics chapters", "th": "บทฟิสิกส์"})))
        out.append('  <div class="chips">%s</div>' % "".join(chips))
        out.append('</div>')
    out.append('</div>')
    return "\n".join(out)


def unused_html(data, subs):
    mat = dict((c["num"], c["title"]) for c in subs["math"]["man"]["chapters"])
    maf = subs["math"]["filemap"]
    out = ['<div class="unused">']
    for u in data["unused"]:
        m = u["ma"]
        title = chapter_link("math", m, maf, mat)
        out.append('<div class="unused-c">')
        out.append('  <span class="man">MATHS %s</span>' % m)
        out.append('  <h4>%s</h4>' % title)
        out.append('  %s' % bi("p", u["note"]))
        out.append('</div>')
    out.append('</div>')
    return "\n".join(out)


# ---------------------------------------------------------------- home
#
# The front door. Every other page is reachable from a subject index or from
# the bridge, but the package root had no page of its own: opening the folder
# landed on bridge.html, which is a cross-subject reference rather than a way
# in. This gives the collection an actual entry point.

WAY_BLURB = {
    "physics": ["Motion, force and energy through to waves, fields and the atom.",
                u"การเคลื่อนที่ แรงและพลังงาน ไปจนถึงคลื่น สนาม และอะตอม"],
    "math": ["Sets and logic through to calculus, and the tools every physics chapter borrows.",
             u"เซตและตรรกศาสตร์ ไปจนถึงแคลคูลัส และเครื่องมือที่ทุกบทฟิสิกส์หยิบไปใช้"],
}


def way(href, eyebrow, title, blurb, foot, go):
    """One destination plate on the front page.

    The title switches with everything else. It used to show the Latin name
    with the Thai standing under it in both views, which put two languages on
    screen at once - the one thing the reader chose against. Bodoni carries no
    Thai, so the Thai title falls to the utility face, exactly as the subject
    pages already do with their own heading."""
    return ('<a class="way" href="%s">'
            '<span class="label" data-en="%s" data-th="%s"></span>'
            '<h2 data-en="%s" data-th="%s"></h2>'
            '<p class="what" data-en="%s" data-th="%s"></p>'
            '<div class="foot">%s</div>'
            '<span class="go" data-en="%s" data-th="%s"></span>'
            '</a>'
            % (href, esc(eyebrow["en"]), esc(eyebrow["th"]),
               esc(title["en"]), esc(title["th"]),
               esc(blurb[0]), esc(blurb[1]), foot,
               esc(go["en"]), esc(go["th"])))


def build_home(subs, css, nav=""):
    """The package root page: pick a subject, or read the cross-subject sheet."""
    tpl = read(os.path.join(BUILD, "home.template.html"))

    order = [s for s in ("physics", "math") if s in subs]
    tot_ch = tot_nodes = tot_methods = built_ch = 0
    plates = []
    for s in order:
        man, stats = subs[s]["man"], subs[s]["stats"]
        nb, nt = len(subs[s]["filemap"]), len(man["chapters"])
        nodes = sum(v[0] for v in stats.values())
        methods = sum(v[1] for v in stats.values())
        tot_ch += nt
        built_ch += nb
        tot_nodes += nodes
        tot_methods += methods
        foot = ("<span>%d <span data-en=\"chapters\" data-th=\"บท\"></span></span>"
                "<span>%d <span data-en=\"nodes\" data-th=\"โหนด\"></span></span>"
                "<span>%d <span data-en=\"methods\" data-th=\"วิธี\"></span></span>"
                % (nt, nodes, methods))
        plates.append(way(
            "%s/index.html" % man["subject"],
            {"en": "Subject", "th": u"วิชา"},
            man["subjectTitle"],
            WAY_BLURB.get(s, ["", ""]),
            foot,
            {"en": "Open the map →", "th": u"เปิดแผนที่ →"}))

    nlink = 0
    bj = os.path.join(BUILD, "bridge.json")
    if os.path.exists(bj):
        data = json.loads(read(bj))
        nlink = sum(len(l["uses"]) for l in data["links"])

    ways = '<section class="ways">%s</section>' % "".join(plates)
    if nlink and len(order) == 2:
        ways += ('<section class="ways cross">%s</section>' % way(
            "bridge.html",
            {"en": "Cross-subject", "th": u"ข้ามวิชา"},
            BRIDGE_TITLE,
            ["Which maths each physics chapter actually leans on, and how hard.",
             u"บทฟิสิกส์แต่ละบทต้องใช้คณิตบทไหน และใช้มากแค่ไหน"],
            "<span>%d <span data-en=\"links\" data-th=\"ความเชื่อมโยง\"></span></span>" % nlink,
            {"en": "Read the matrix →", "th": u"ดูตาราง →"}))

    lvl = subs[order[0]]["man"]["level"]
    out = tpl
    for tok, val in (("__PAGENAV__", nav),
                     ("__CSS__", css),
                     ("__COURSE_CSS__", read(os.path.join(BUILD, "course-theme.css"))),
                     ("__COURSE_THEME__", read(os.path.join(BUILD, "course-theme.js"))),
                     ("__WAYS__", ways),
                     ("__SITE_EN__", "Physics and Mathematics"),
                     ("__SITE_TH__", u"ฟิสิกส์และคณิตศาสตร์"),
                     ("__LEVEL_EN__", esc(lvl["en"])), ("__LEVEL_TH__", esc(lvl["th"])),
                     ("__CHAPTERS__", str(tot_ch)), ("__NODES__", str(tot_nodes)),
                     ("__METHODS__", str(tot_methods)), ("__LINKS__", str(nlink)),
                     ("__PCT__", "%.0f" % (100.0 * built_ch / tot_ch if tot_ch else 0))):
        out = out.replace(tok, val)

    # Deliberately not index.html: three files by that name - this one and
    # the two subject indexes - is a needless way to lose your place.
    write(os.path.join(ROOT, "index.html"), out)
    dest = os.path.join(ROOT, "home.html")
    return dest, write(dest, out)


def build_bridge(subs, css, nav=""):
    if "physics" not in subs or "math" not in subs:
        return None, 0
    data = json.loads(read(os.path.join(BUILD, "bridge.json")))
    tpl = read(os.path.join(BUILD, "bridge.template.html"))

    edges = [u for link in data["links"] for u in link["uses"]]
    used = set(u["ma"] for u in edges)
    vb, matrix, key, keyn, kt = matrix_svg(data, subs)
    ncore = sum(1 for u in edges if u["core"])
    desc_en = ("Grid of %d physics chapters against %d maths chapters. A filled "
               "square marks a load-bearing dependency, a hollow one a "
               "supporting use.%s"
               % (len(data["links"]), len(subs["math"]["man"]["chapters"]),
                  (" %s is the maths chapter the most physics chapters lean on, "
                   "load-bearing in %d of them." % (kt["en"], keyn)) if key else ""))
    desc_th = (u"ตารางระหว่างฟิสิกส์ %d บทกับคณิตศาสตร์ %d บท "
               u"สี่เหลี่ยมทึบคือคณิตที่ขาดไม่ได้ สี่เหลี่ยมโปร่งคือที่ใช้ช่วยบางส่วน%s"
               % (len(data["links"]), len(subs["math"]["man"]["chapters"]),
                  (u" %s เป็นบทคณิตที่ฟิสิกส์พึ่งพามากที่สุด เป็นหลักใน %d บท"
                   % (kt["th"], keyn)) if key else ""))

    out = tpl
    for tok, val in (("__PAGENAV__", nav),
                     ("__CSS__", css),
                     ("__COURSE_CSS__", read(os.path.join(BUILD, "course-theme.css"))),
                     ("__COURSE_THEME__", read(os.path.join(BUILD, "course-theme.js"))),
                     ("__MATRIXVB__", vb), ("__MATRIX__", matrix),
                     ("__MDESC_EN__", esc(desc_en)), ("__MDESC_TH__", esc(desc_th)),
                     ("__MKEY_EN__", esc(kt["en"] if kt else "")),
                     ("__MKEY_TH__", esc(kt["th"] if kt else "")),
                     ("__MKEYN__", str(keyn)),
                     ("__ROWS__", rows_html(data, subs)),
                     ("__REVERSE__", reverse_html(data, subs)),
                     ("__UNUSED__", unused_html(data, subs)),
                     ("__TITLE_EN__", esc(data["title"]["en"])),
                     ("__TITLE_TH__", esc(data["title"]["th"])),
                     ("__LEDE_EN__", esc(data["lede"]["en"])),
                     ("__LEDE_TH__", esc(data["lede"]["th"])),
                     ("__NPH__", str(len(data["links"]))),
                     ("__NLINK__", str(len(edges))),
                     ("__NCORE__", str(sum(1 for u in edges if u["core"]))),
                     ("__NUSED__", str(len(used)))):
        out = out.replace(tok, val)

    dest = os.path.join(ROOT, "bridge.html")
    return dest, write(dest, out)


# ---------------------------------------------------------------- engine

def assemble_engine():
    """engine.js with the stage layer and every art skin spliced in at its
    /*@@STAGE@@*/ marker - after the visualizer library it builds on, before
    the page code that renders labs. A skin is one file in build/skins/; adding
    a file there is all it takes to offer a new art style. models.js, the
    shared physics, goes first so every stage lab can reach it."""
    engine = read(os.path.join(BUILD, "engine.js"))
    marker = "/*@@STAGE@@*/"
    if engine.count(marker) != 1:
        raise ValueError("engine.js must contain exactly one %s marker" % marker)
    skins = sorted(glob.glob(os.path.join(BUILD, "skins", "*.js")))
    parts = [read(os.path.join(BUILD, "models.js")), read(os.path.join(BUILD, "stage.js"))] + \
            [read(p) for p in skins]
    return engine.replace(marker, "\n".join(parts))


# ---------------------------------------------------------------- main

def main():
    css = read(os.path.join(BUILD, "engine.css"))
    # stage labs only live in chapters, so only chapters carry their styles
    chapter_css = css + "\n" + read(os.path.join(BUILD, "stage.css"))
    engine = assemble_engine()
    shell = read(os.path.join(BUILD, "shell.html"))

    manifests = sorted(glob.glob(os.path.join(BUILD, "manifest-*.json")))
    if not manifests:
        print("no manifest-<subject>.json found in build/")
        return 1

    every = sorted(glob.glob(os.path.join(BUILD, "chapters", "*.js")))
    if not every:
        print("no chapter files in build/chapters/")
        return 1

    want = sys.argv[1:]
    grand = 0
    subs = {}

    for mpath in manifests:
        man = json.loads(read(mpath))
        subject = man["subject"]

        # a chapter belongs to whichever subject its own file declares
        files = [f for f in every if unquote(field(read(f), "subject")) == subject]
        if not files:
            continue

        order = [c["num"] for c in man["chapters"]]
        filemap, stats = {}, {}
        for f in files:
            s = read(f)
            num, slug = unquote(field(s, "num")), unquote(field(s, "slug"))
            tm = re.search(r'title\s*:\s*\[\s*"((?:[^"\\]|\\.)*)"', s)
            tt = re.search(r'title\s*:\s*\[\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"', s)
            filemap[num] = ("ch%s-%s.html" % (num, slug),
                            tt.group(1) if tt else (tm.group(1) if tm else slug),
                            tt.group(2) if tt else (tm.group(1) if tm else slug),
                            f)
            stats[num] = (len(re.findall(r'\{\s*id:"[\w-]+",\s*x:', s)),
                          len(re.findall(r'\{id:"M-\d+"', s)))

        subs[subject] = {"man": man, "filemap": filemap, "stats": stats,
                         "order": order, "files": files}

    # Back and forward are positions in one reading order over the whole
    # package, so nothing can be written until every subject has been read.
    pages = site_pages(subs)

    for subject in [s for s in ("physics", "math") if s in subs]:
        d = subs[subject]
        man, filemap, order, files = d["man"], d["filemap"], d["order"], d["files"]
        todo = [f for f in files if not want or any(w in os.path.basename(f) for w in want)]

        print("%s" % subject)
        total = 0
        for f in todo:
            num = unquote(field(read(f), "num"))
            here = "%s/%s" % (subject, filemap[num][0]) if num in filemap else ""
            dest, size, _, _ = build_chapter(f, chapter_css, engine, shell, filemap, order,
                                             page_nav(pages, here))
            total += size
            print("  %-46s %6.1f KB" % (os.path.relpath(dest, ROOT).replace("\\", "/"), size / 1024.0))

        dest, size = build_index(man, filemap, d["stats"], css,
                                 page_nav(pages, "%s/index.html" % subject))
        total += size
        print("  %-46s %6.1f KB" % (os.path.relpath(dest, ROOT).replace("\\", "/"), size / 1024.0))
        print("  %d built · %.1f KB · %d/%d chapters exist\n"
              % (len(todo), total / 1024.0, len(filemap), len(man["chapters"])))
        grand += total

    dest, size = build_bridge(subs, css, page_nav(pages, "bridge.html"))
    if dest:
        print("cross-subject")
        print("  %-46s %6.1f KB" % (os.path.relpath(dest, ROOT).replace("\\", "/"), size / 1024.0))
        grand += size
        print("")

    if subs:
        dest, size = build_home(subs, css, page_nav(pages, "home.html"))
        print("front door")
        print("  %-46s %6.1f KB" % (os.path.relpath(dest, ROOT).replace("\\", "/"), size / 1024.0))
        grand += size
        print("")

    print("total %.1f KB" % (grand / 1024.0))
    return 0


if __name__ == "__main__":
    sys.exit(main())
