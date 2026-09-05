# Art assets

Sibling art for the chapter packages in this folder. The rules come from
`Project Concept.md` §3, §4, §9 and §11 — that note is the source of truth; this
file only says how to wire an asset up.

```
physics/
  ch03-force-and-motion.html     <- the package
  assets/
    ch03/
      drafting-grid.png          <- art for chapter 03
```

## The three rules that constrain everything

**1 · Art is never required.** Every page must work with this whole folder
deleted — it just looks plainer. Nothing here may carry information the reader
needs. Verify with `python build/check.py`, and by moving `assets/` aside and
reloading a chapter.

**2 · No meaning lives only in an image.** A label a reader needs is `<text>` in
the DOM sitting *over* the art, never baked into the pixels. This is what makes
the site bilingual at all — a PNG cannot be translated. Every caption and
hotspot is an `[en, th]` pair.

**3 · The accent belongs to the interface.** Do not use `#E63946` in artwork.
Assets may assume a **light ground**; the engine deals with the dark theme.

## Naming

`assets/ch<NN>/<name>.<ext>` — the folder is `ch` plus the chapter number, for
both subjects (`math/assets/ch16/`, not `ma16`). SVG for anything to be
animated, labelled or recoloured; PNG for raster; WebM for motion.

## Wiring a PNG into a chapter

In `build/chapters/ch<NN>.js`, on any node that has a visualizer:

```js
viz:"vector",
vizcfg:{
  art:{ src:"drafting-grid.png",   // resolved against assets/ch03/
        opacity:0.55,
        dark:"invert",             // see "The dark theme" below
        alt:["drafting grid","กระดาษตาราง"] },
  caption:["Fig 03.1 — vectors add head to tail",
           "รูป 03.1 — เวกเตอร์รวมแบบหัวต่อหาง"]
}
```

`art` paints **behind** the visualizer; `artTop` paints in front. Both default
to filling the visualizer's own `viewBox`, so a filename is usually all you
need. `x`, `y`, `w`, `h` and `fit` (a `preserveAspectRatio` value) override
that.

The picture lives on its own SVG layer that is painted once, so an animating
visualizer never re-decodes it and the art holds still while the scene moves.

## Art as the whole scene

`viz:"plate"` makes the artwork the visualizer, with real text over it:

```js
viz:"plate",
vizcfg:{
  art:{ src:"inclined-plane.png", alt:["a block on a slope","วัตถุบนพื้นเอียง"] },
  labels:[
    { x:180, y:96,  text:["normal force","แรงตั้งฉาก"], pin:[210,140] },
    { x:300, y:250, text:["mg sin θ","mg sin θ"], anchor:"start" }
  ],
  caption:["Fig 04.2 — the slope resolves the weight",
           "รูป 04.2 — พื้นเอียงแตกน้ำหนักออกเป็นสองแนว"]
}
```

`pin` draws a leader from the label to the point it names. A plate must carry at
least one label or a caption — a plate with no text puts meaning in the pixels,
which rule 2 forbids, and `check.py` fails it.

## The dark theme

§11.5 relieves the artist of any dark-matting duty, so the engine handles it.
On the dark theme the engine, in order:

| | |
|---|---|
| `srcDark:"name-dark.png"` | shows that file instead |
| `dark:"invert"` | flips the light asset — right for neutral textures, wrong for artwork |
| `dark:"as-is"` | shows it unchanged |
| *(nothing given)* | **shows no art at all** |

Hiding is the default because inverting real artwork misrepresents it, and a
missing decoration is a state the page already has to survive.

## Weight

These files are downloaded alongside the package, not embedded in it. Keep a
decorative plate under ~200 KB; the packages themselves are ~120 KB each.
