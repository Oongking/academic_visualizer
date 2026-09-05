#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Validate chapter content files before building.

    python build/check.py

Catches the cross-reference mistakes that are easy to make once there are
twenty chapters: a node pointing at a method that does not exist, a method
with no generator, a trap fired by a generator but never defined, a
prerequisite pointing at a missing node, unbalanced brackets, and any
bilingual pair that is not exactly two strings.
"""
import io, os, re, sys, glob

BUILD = os.path.dirname(os.path.abspath(__file__))


def viz_types():
    """What a chapter's `viz:` may name — read from the engine, so the two can
    never drift apart.

    Two kinds. The VIZLIB entries are visualizers: a scene the reader drives.
    `table` is not one of them - it renders a reference table as content, with
    no controls - so it is picked up from its own branch in buildSections."""
    src = io.open(os.path.join(BUILD, "engine.js"), encoding="utf-8").read()
    kinds = set(re.findall(r'VIZLIB\.(\w+)\s*=', src))
    kinds |= set(re.findall(r'n\.viz\s*===\s*"(\w+)"', src))
    return kinds


VIZ_TYPES = viz_types()


def read(p):
    return io.open(p, encoding="utf-8").read()


def strip_strings(s):
    """Blank comments and string literals so bracket counting sees code only.

    This has to be one left-to-right scan. Blanking strings and comments in two
    passes cannot work in either order: comments-first eats the rest of a line
    after a namespace URL's "//", and strings-first treats the apostrophe in a
    comment's "don't" as a quote and swallows real brackets after it. Either
    way the counter invents an imbalance in code that parses perfectly well.

    Regex literals are recognised too, so a "/" inside a character class is not
    mistaken for the start of a comment.
    """
    REGEX_AFTER = "(,=:[!&|?{};+-*%<>~^"
    out, i, n = [], 0, len(s)
    prev = ""                          # last significant character of real code
    while i < n:
        c = s[i]
        two = s[i:i + 2]
        if two == "//":
            j = s.find("\n", i)
            i = n if j < 0 else j
        elif two == "/*":
            j = s.find("*/", i + 2)
            out.append(" ")
            i = n if j < 0 else j + 2
        elif c in "\"'`":
            j = i + 1
            while j < n and s[j] != c:
                j += 2 if s[j] == "\\" else 1
            out.append(c + c)
            prev = c
            i = j + 1
        elif c == "/" and (prev == "" or prev in REGEX_AFTER):
            j, klass = i + 1, False
            while j < n and (klass or s[j] != "/"):
                if s[j] == "\\":
                    j += 1
                elif s[j] == "[":
                    klass = True
                elif s[j] == "]":
                    klass = False
                j += 1
            out.append(" ")
            prev = "/"
            i = j + 1
        else:
            out.append(c)
            if not c.isspace():
                prev = c
            i += 1
    return "".join(out)


# --- language guard -------------------------------------------------------
# Text drawn inside a visualizer must come from an [en,th] pair, or it stays
# English no matter which language the reader picked. These spot the literals.
TEXT_LIT = re.compile(r'>([^<>\'"+]*[A-Za-z]{3,}[^<>\'"+]*)</text>')
AXIS_TITLE = re.compile(r'\btitle\s*:\s*"([^"]*[A-Za-z]{3,}[^"]*)"')
AXIS_LAB = re.compile(r'\b(xlab|ylab)\s*:\s*"([^"]*[A-Za-z]{3,}[^"]*)"')
# maths notation and unit labels read the same in both languages — leave them
NOT_PROSE = re.compile(u'^[\\s\\d.,;:()\\[\\]{}=+\\-*/^<>|&%°·√∫Σ'
                       u'πθλμ×÷≤≥≠≈'
                       u'∞…฀-๿]*$')
UNIT_LABEL = re.compile(u'^\\s*[a-zA-Z′″]+'
                        u'(\\s*\\(\\s*[a-zA-Z/²³]+\\s*\\))?'
                        u'(\\s*[θφ]\\s*)?$')

# Thai marks a question with a particle or an interrogative word, never with
# punctuation. These are the ones the scene questions actually use.
THAI_ASK = re.compile(u'ไหม|หรือ|ทำไม|อะไร|เท่าใด|เท่าไร|กี่|ใด|ไหน|'
                      u'เมื่อไร|เมื่อใด|อย่างไร|แค่ไหน|ยัง')


# --- art assets ------------------------------------------------------------
# Art is optional by contract, so a missing file is reported and never fails.
# What does fail is art that breaks one of the rules the contract does impose:
# a reference that escapes its chapter folder, or a plate carrying no text -
# which would put meaning in the pixels, where no translation can reach it.

ART_SRC = re.compile(r'\b(src|srcDark)\s*:\s*"([^"]*)"')
ART_DARK = re.compile(r'\bdark\s*:\s*"([^"]*)"')
DARK_OK = ("invert", "as-is")


def check_art(path, s, num, subject, bad):
    """Art references in one chapter file. Returns the notes to print."""
    notes = []
    root = os.path.dirname(BUILD)
    folder = os.path.join(root, subject, "assets", "ch" + num)
    for _, ref in ART_SRC.findall(s):
        if not ref:
            bad.append("art reference with an empty filename")
            continue
        if ref.startswith(("/", "\\", "http:", "https:", "data:")) or ".." in ref:
            bad.append("art '%s' must be a bare filename inside assets/ch%s/"
                       % (ref, num))
            continue
        if not os.path.exists(os.path.join(folder, ref)):
            notes.append("art not present yet: %s/assets/ch%s/%s"
                         % (subject, num, ref))
    for mode in ART_DARK.findall(s):
        if mode not in DARK_OK:
            bad.append("art dark:\"%s\" is not one of %s"
                       % (mode, " / ".join(DARK_OK)))

    # A plate is artwork standing in for a scene, so it has to say something in
    # text - otherwise the meaning exists only in the image.
    for blk in re.findall(r'\{\s*id:"[\w-]+",\s*x:.*?(?=\n\{\s*id:"|\n\],)', s, re.S):
        if 'viz:"plate"' not in blk:
            continue
        nid = re.search(r'id:"([\w-]+)"', blk).group(1)
        if "labels:" not in blk and "caption:" not in blk:
            bad.append("node '%s' is a plate with no labels and no caption - "
                       "its meaning would live only in the image" % nid)
    return notes


def check(path):
    s = read(path)
    name = os.path.basename(path)
    bad = []

    bare = strip_strings(s)
    for open_c, close_c in (("{", "}"), ("[", "]"), ("(", ")")):
        if bare.count(open_c) != bare.count(close_c):
            bad.append("unbalanced %s%s  (%d vs %d)"
                       % (open_c, close_c, bare.count(open_c), bare.count(close_c)))

    nodes = re.findall(r'\{\s*id:"([\w-]+)",\s*x:', s)
    if len(nodes) != len(set(nodes)):
        bad.append("duplicate node id")
    if not nodes:
        bad.append("no nodes found")

    methods = re.findall(r'\{id:"(M-\d+)",\s*name:', s)
    gens = re.findall(r'"(M-\d+)":\s*function', s)
    traps_def = set(re.findall(r'"(T-\d+)":\s*\[', s))
    # a trap counts as fired if its code appears anywhere beyond its own
    # definition key — generators may assign it literally (trap:"T-01") or
    # pull it from a data table (t:"T-02"), and both are legitimate.
    traps_used = set(c for c in traps_def
                     if len(re.findall(r'"' + c + r'"', s)) > 1)
    traps_used |= set(re.findall(r'trap:"(T-\d+)"', s))

    for m in methods:
        if m not in gens:
            bad.append("method %s has no generator" % m)
    for g in gens:
        if g not in methods:
            bad.append("generator %s is not declared in methods[]" % g)

    for blk in re.findall(r'methods:\[([^\]]*)\]', s):
        for m in re.findall(r'"(M-\d+)"', blk):
            if m not in methods:
                bad.append("node references undeclared method %s" % m)

    for blk in re.findall(r'requires:\[([^\]]*)\]', s):
        for r in re.findall(r'"([\w-]+)"', blk):
            if r not in nodes:
                bad.append("requires points at missing node '%s'" % r)

    for tr in sorted(traps_used - traps_def):
        bad.append("generator fires undefined trap %s" % tr)
    for tr in sorted(traps_def - traps_used):
        bad.append("trap %s defined but never fired" % tr)

    m = re.search(r'\bnum\s*:\s*"(\w+)"', s)
    num = m.group(1) if m else "00"
    m = re.search(r'\bsubject\s*:\s*"(\w+)"', s)
    subject = m.group(1) if m else "physics"
    notes = check_art(path, s, num, subject, bad)

    # every viz named by a node must be one the engine ships, or inline
    for v in re.findall(r'viz:"(\w+)"', s):
        if v not in VIZ_TYPES:
            bad.append("unknown viz type '%s'" % v)

    # bilingual pairs: title / name / flabel must hold exactly two strings
    for field in ("title", "name", "flabel", "formula"):
        for blk in re.findall(field + r':\[((?:\s*"(?:[^"\\]|\\.)*"\s*,?)+)\]', s):
            n = len(re.findall(r'"(?:[^"\\]|\\.)*"', blk))
            if n != 2:
                bad.append("%s: has %d strings, expected 2 (en, th)" % (field, n))

    # a node with a guide but no viz can never show it
    for blk in re.findall(r'\{\s*id:"[\w-]+",\s*x:.*?(?=\n\{\s*id:"|\n\],)', s, re.S):
        if "guide:[" in blk and "viz:" not in blk:
            nid = re.search(r'id:"([\w-]+)"', blk).group(1)
            bad.append("node '%s' has a guide but no viz to show it" % nid)

    # a scene lab must ask a question — see [[Visualizer Concepts]] §7
    for blk in re.findall(r'\{\s*id:"[\w-]+",\s*x:.*?(?=\n\{\s*id:"|\n\],)', s, re.S):
        if 'viz:"scene"' not in blk:
            continue
        nid = re.search(r'id:"([\w-]+)"', blk).group(1)
        qm = re.search(r'question\s*:\s*\[\s*"((?:[^"\\]|\\.)*)"\s*,\s*"((?:[^"\\]|\\.)*)"', blk)
        if not qm:
            bad.append("node '%s' uses a scene but asks no question" % nid)
        else:
            if not qm.group(1).rstrip().endswith("?"):
                bad.append("node '%s' English question must end in '?'" % nid)
            # Thai does not use a question mark — it marks questions with a
            # particle or an interrogative word, so look for one of those
            if not (qm.group(2).rstrip().endswith("?") or THAI_ASK.search(qm.group(2))):
                bad.append("node '%s' Thai question reads as a statement — "
                           "needs an interrogative (ไหม / ทำไม / อะไร / กี่ …)" % nid)
        if "scene:" not in blk:
            bad.append("node '%s' declares viz:\"scene\" but has no scene block" % nid)

    # English-only prose baked into a visualizer never switches with the language
    for kind, val in ([("caption", v) for v in TEXT_LIT.findall(s)]
                      + [("axes title", v) for v in AXIS_TITLE.findall(s)]
                      + [("axes " + k, v) for k, v in AXIS_LAB.findall(s)]):
        v = val.strip()
        if v and not NOT_PROSE.match(v) and not UNIT_LABEL.match(v):
            bad.append("English-only %s in a visualizer: %r — use an [en,th] pair"
                       % (kind, v[:60]))

    ok = not bad
    print("%s %-14s %d nodes  %d methods  %d traps"
          % ("PASS" if ok else "FAIL", name, len(nodes), len(methods), len(traps_def)))
    for b in bad:
        print("       - " + b)
    for n in notes:
        print("       . " + n)
    return ok


def check_engine():
    """The engine is concatenated into every page, so one stray bracket there
    breaks all 36 at once. Cheap to check, so always check."""
    p = os.path.join(BUILD, "engine.js")
    bare = strip_strings(read(p))
    bad = []
    for o, c in (("{", "}"), ("[", "]"), ("(", ")")):
        if bare.count(o) != bare.count(c):
            bad.append("unbalanced %s%s (%d vs %d)" % (o, c, bare.count(o), bare.count(c)))
    print("%s engine.js      %d visualizers: %s"
          % ("PASS" if not bad else "FAIL", len(VIZ_TYPES), ", ".join(sorted(VIZ_TYPES))))
    for b in bad:
        print("       - " + b)
    return not bad



# --- generated map geometry ----------------------------------------------
# The index maps are drawn by build.py rather than by hand, so the connector
# rules they follow can be checked mechanically. These catch the failures the
# rework was about: a diagonal or curved connector, a line crossing a chip or
# its caption, two lines drawn on top of each other, two connectors sharing one
# attach point, and a Thai caption shrunk below the size it stays legible at.

def _segments(d):
    """Straight runs of a path. Arc commands are corner fillets and hop bumps;
    only their endpoint matters for continuity."""
    out, prev = [], None
    for cmd, args in re.findall(r'([MLA])([^MLA]*)', d):
        n = [float(x) for x in args.replace(",", " ").split()]
        if cmd == "M":
            prev = (n[0], n[1])
        elif cmd == "L":
            out.append((prev, (n[0], n[1])))
            prev = (n[0], n[1])
        else:
            prev = (n[-2], n[-1])
    return out


def _spacing(s):
    import unicodedata
    return sum(0 if unicodedata.category(c) == "Mn" else 1 for c in s)


def _span(a0, a1, b0, b1):
    return min(a1, b1) - max(a0, b0)


def check_map(path):
    """Connector rules for one generated index map."""
    html = read(path)
    i = html.find('<svg viewBox')
    if i < 0:
        return True
    svg = html[i:html.index("</svg>", i)]
    chips = [tuple(map(float, m)) for m in re.findall(
        r'<g class="chip"[^>]*>.*?<rect x="(\d+)" y="(\d+)" '
        r'width="(\d+)" height="(\d+)"', svg)]
    edges = [d for _, d in re.findall(r'<path class="(tedge[^"]*)" d="([^"]+)"', svg)]
    if not chips:
        return True
    E = [_segments(d) for d in edges]
    bad = []

    for k, sg in enumerate(E):
        for p, q in sg:
            if abs(p[0] - q[0]) > .01 and abs(p[1] - q[1]) > .01:
                bad.append("edge %d is diagonal" % k)
            x0, x1 = sorted([p[0], q[0]])
            y0, y1 = sorted([p[1], q[1]])
            for (x, y, w, h) in chips:
                if x1 > x + 1 and x0 < x + w - 1 and y1 > y + 1 and y0 < y + h - 1:
                    bad.append("edge %d crosses the chip at (%d,%d)" % (k, x, y))

    flat = [(k, p, q) for k, sg in enumerate(E) for p, q in sg]
    for a in range(len(flat)):
        ka, p, q = flat[a]
        for b in range(a + 1, len(flat)):
            kb, r, t = flat[b]
            if ka == kb:
                continue
            if p[0] == q[0] == r[0] == t[0] and _span(
                    min(p[1], q[1]), max(p[1], q[1]), min(r[1], t[1]), max(r[1], t[1])) > 1:
                bad.append("edges %d and %d overlap at x=%g" % (ka, kb, p[0]))
            if p[1] == q[1] == r[1] == t[1] and _span(
                    min(p[0], q[0]), max(p[0], q[0]), min(r[0], t[0]), max(r[0], t[0])) > 1:
                bad.append("edges %d and %d overlap at y=%g" % (ka, kb, p[1]))

    att = {}
    for k, sg in enumerate(E):
        for e in (sg[0][0], sg[-1][1]):
            for (x, y, w, h) in chips:
                if (abs(e[0] - x) < .6 or abs(e[0] - (x + w)) < .6) and y - .6 <= e[1] <= y + h + .6:
                    att.setdefault(("V", x, y, round(e[0])), []).append(e[1])
                if (abs(e[1] - y) < .6 or abs(e[1] - (y + h)) < .6) and x - .6 <= e[0] <= x + w + .6:
                    att.setdefault(("H", x, y, round(e[1])), []).append(e[0])
    for key, v in att.items():
        v = sorted(set(v))
        for a, b in zip(v, v[1:]):
            if b - a < 8:
                bad.append("two connectors %.1fpx apart on one chip edge" % (b - a))

    verts = [(p[0], min(p[1], q[1]), max(p[1], q[1]))
             for sg in E for p, q in sg if p[0] == q[0]]
    for g in re.findall(r'<g class="chip".*?</g>', svg, re.S):
        m = re.search(r'<rect x="(\d+)" y="(\d+)"', g)
        num = re.search(r'class="cnum"[^>]*>(\d+)<', g)
        x, y = int(m.group(1)), int(m.group(2))
        cx, top, bot = x + 24, y + 44, y + 76
        room = 52
        for vx, v0, v1 in verts:
            if v1 > top and v0 < bot:
                room = min(room, abs(vx - cx) - 8)
        for cls, fs, txt in re.findall(
                r'cname-(\w+)"[^>]*font-size="([\d.]+)">([^<]*)<', g):
            n = _spacing(txt) if cls == "th" else len(txt)
            if n * float(fs) * 0.60 / 2 > room + 0.5:
                bad.append("ch%s caption '%s' reaches a connector"
                           % (num.group(1) if num else "?", txt))
            if cls == "th" and float(fs) < 10:
                bad.append("ch%s Thai caption set at %spx, below the 10px floor"
                           % (num.group(1) if num else "?", fs))
            if u"…" in txt:
                bad.append("ch%s caption truncated to '%s'"
                           % (num.group(1) if num else "?", txt))

    bad = sorted(set(bad))
    print("%s %-22s %2d chips, %2d connectors"
          % ("PASS" if not bad else "FAIL", os.path.basename(os.path.dirname(path))
             + "/index.html", len(chips), len(edges)))
    for b in bad[:8]:
        print("       - " + b)
    if len(bad) > 8:
        print("       - ... and %d more" % (len(bad) - 8))
    return not bad


def main():
    files = sorted(glob.glob(os.path.join(BUILD, "chapters", "*.js")))
    if not files:
        print("no chapter files found")
        return 1
    engine_ok = check_engine()
    root = os.path.dirname(BUILD)
    maps = [os.path.join(root, sub, "index.html") for sub in ("physics", "math")]
    maps_ok = all(check_map(m) for m in maps if os.path.exists(m))
    print("")
    results = [check(f) for f in files]
    n_ok = sum(1 for r in results if r)
    print("\n%d/%d chapters pass" % (n_ok, len(results)))
    return 0 if n_ok == len(results) and engine_ok and maps_ok else 1


if __name__ == "__main__":
    sys.exit(main())
