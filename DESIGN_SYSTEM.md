# Education Web UI design system

This is the implementation guide for an AI agent building content that should
look and behave like the high-school course at
https://edu.gradual-lab.dev/high-school/ and the site's linear algebra and
differential equations courses. It covers layout, type, interaction, diagrams,
and reading themes. Follow the source files linked below when a detail here
and the code differ.

## Where to work

- **New high-school chapter:** edit the appropriate `build/chapters/chNN.js`
  (physics) or `build/chapters/maNN.js` (math), and its manifest in `build/`.
  `build/shell.html` and `build/engine.js` render the chapter. The generated
  `physics/*.html` and `math/*.html` are outputs. Run the checks and build
  after editing source. Use `build/chapters/ch02.js` as a chapter example.
- **High-school page or shared component:** edit its `build/*.template.html`
  and, for visual changes shared across pages, `build/course-theme.css`.
  Base structure and interaction styles live in `build/engine.css`. The build
  embeds both stylesheets and `build/course-theme.js` in each output file so
  downloaded chapters work offline.
- **Page elsewhere on edu.gradual-lab.dev:** use this visual language. For a
  page in the main site's own source tree, load the site's existing
  `assets/reading-themes.js` with the correct relative path. Do not add a
  second theme script to a page that already loads it. If you use the
  high-school templates or create a self-contained high-school page, use
  `build/course-theme.js` instead. Both use the `edu-reading-theme`
  localStorage key and the same four names.

Do not edit the live HTML as the sole source of a change. Keep the source
template or chapter data and its generated page in sync.

## Visual character

Use a calm reading surface with clear hierarchy. A page is a centered column;
white or light panels sit on a tinted page background. Cards have a thin
border, 12–14 px corners, and generous padding. Headings are bold sans-serif.
Blue marks the primary action or concept, pink marks a second stage or a
guided note, green marks completion or a third stage, and yellow marks
caution. Let text, diagrams, and the user's interaction carry the page.

Use the system sans-serif stack from `--f-ui` for English and Thai. Body copy
is 16 px with a 1.6 line height. A page heading is roughly 30–40 px, a card
heading 18–24 px, and a small uppercase kicker 12 px with wider letter
spacing. Formulae can use Cambria or Times New Roman inside a bordered panel;
the existing high-school chapter engine uses this styled-text approach. Use
KaTeX for new mathematical notation as described below. Avoid changing the
main reading text to a serif face. Use at most 760 px for
long introductory prose and keep dense explanatory text in a readable column.

The high-school implementation uses a `1120px` maximum `.shell`, with 24 px
desktop and 14 px mobile side padding. Cards use 16 px grid gaps and roughly
22 px internal padding. Responsive grids collapse to one column; figures and
tables scroll horizontally only when they truly cannot fit. Controls stay
usable by touch. The shared card hover rises 3 px, while reduced-motion users
get no movement.

## Colors and themes

Use CSS variables for HTML and SVG interface colors. These are the values in
`build/course-theme.css` as of 2026-09-26. It is the source of truth for
future changes; copy or import the real stylesheet rather than maintaining a
second palette.

| Token | Paper (default) | Warm | Soft Blue | Dark | Use |
| --- | --- | --- | --- | --- | --- |
| `--ground` | `#f4f6f8` | `#f5efdf` | `#e9f1f8` | `#141b26` | Page canvas |
| `--surface` | `#ffffff` | `#fffbef` | `#f6faff` | `#202b3b` | Cards and panels |
| `--ink` | `#202b38` | `#332d23` | `#1c3047` | `#f3f6fa` | Main text |
| `--ink-soft` | `#425268` | `#594e3b` | `#3e536b` | `#c2ccda` | Supporting text |
| `--rule` | `#8996a7` | `#9b8b70` | `#8197b0` | `#7b8ca4` | Borders and axes |
| `--accent` | `#1a6183` | same | same | `#9cd8ff` | Links, primary action, key data |
| `--accent2` | `#96314d` | same | same | `#f4a9bc` | Secondary stage, guided note |
| `--good` | `#216c3e` | same | same | `#a6e4b5` | Complete or positive state |
| `--warn` | `#805d12` | same | same | `#f5d48b` | Caution or comparison |

Also use `--ink-faint` for metadata, `--tint` for a subtle blue panel,
`--pink-tint` for a guided note, `--card-hover` for a hover surface, and
`--on-accent` for text on a solid primary-color button. Those values vary by
theme. Do not place dark text directly on `--accent` in Dark theme.

Paper is the default. Theme values are exactly `paper`, `warm`, `blue`, and
`dark`. The high-school script sets `data-reading-theme` to one of these on
`<html>` and sets `data-theme="dark"` only for Dark. It reads and writes the
shared `edu-reading-theme` localStorage key, falls back to
`linear-algebra-reading-theme`, and handles blocked storage. On a theme
change it emits `readingthemechange`; redraw SVG or Canvas content that
calculated colors in JavaScript. CSS using `var(...)` recolors automatically.
Keep any intentionally independent scientific Canvas palette separate from
the reading colors; the site's shared theme script does this too.

## Page anatomy

Use this reading order:

1. A small path back to the parent course or hub.
2. A kicker, one `h1`, and a brief explanation of what the learner will do.
3. If meaningful, a compact row of progress or chapter facts.
4. The map, simulation, or main content in a bordered panel.
5. Supporting explanation and navigation to the next lesson.

Use rounded panels, pill buttons, and small badges consistently. `way` cards
serve subject choices; `card` serves chapter choices. Learn/Forge switches
are tab-like pill controls with a filled selected state. Guided notes use a
pink tinted background and a pink left border. Do not use color alone to
communicate availability, completion, or a correct answer: pair it with text,
shape, fill, or an icon. Provide keyboard focus with a visible accent outline.

For bilingual high-school content, use `[English, Thai]` pairs in chapter data
and `data-en`/`data-th` attributes in templates. Keep diagrams, captions,
controls, readouts, explanations, and questions bilingual, not just headings.
The root `lang` attribute changes with the language control. Keep existing
progress storage keys intact when extending content.

## Mathematical notation

The linear algebra and differential equations lessons use **KaTeX** to
typeset mathematical equations. Follow that convention for new pages with
fractions, matrices, Greek letters, or multi-line derivations. Use
`\(...\)` for inline math and `\[...\]` for display math. Load the KaTeX
stylesheet, KaTeX script, and auto-render script, then render the reading
content after it is inserted into the DOM. The existing lessons use KaTeX
`0.16.11` from cdnjs; match the site's loaded version when extending them.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/katex.min.css">
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/katex.min.js"></script>
<script defer src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.11/contrib/auto-render.min.js"></script>
```

```js
document.addEventListener('DOMContentLoaded', () => {
  renderMathInElement(document.querySelector('main'), {
    delimiters: [
      {left: '\\[', right: '\\]', display: true},
      {left: '\\(', right: '\\)', display: false}
    ],
    ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
    throwOnError: false
  });
});
```

Call `renderMathInElement` again on newly inserted math content, such as a
generated exercise; theme or language changes may also replace that content.
Keep display equations in a horizontally scrollable panel on narrow screens,
and check their contrast in every reading theme. For an offline lesson,
package KaTeX assets locally or render the equations at build time; the CDN
example needs a network connection.

The current high-school `build/engine.js` does **not** load KaTeX or interpret
LaTeX in chapter `formula` strings. Those strings are shown as text in
`.formula` panels. Adding LaTeX to a high-school chapter therefore needs an
explicit rendering change in the engine or pre-rendered markup, plus offline
KaTeX assets if the single-file chapter must still work without a connection.

## Visualizations and learning interactions

### Rendering technology

The high-school visualizer engine uses SVG elements and JavaScript, with
`requestAnimationFrame` for animated scenes. Its maps, graphs, lab drawings,
and cross-subject matrix are SVG. The main site's 2D simulations also use
HTML Canvas 2D in places. A few 3D linear algebra lessons use **WebGL** in
the browser, through p5.js (`p.WEBGL`) or Three.js
(`THREE.WebGLRenderer`). The web pages do not call the desktop OpenGL API
directly. Examples in the site's source include
`linear-algebra/determinant_3d.html` (p5.js) and
`linear-algebra/omni_wheel_transformation_explorer.html` (Three.js).

For new work, use the existing SVG engine for high-school concepts and 2D
plots. Canvas 2D is suitable for dense or continuously redrawn 2D motion.
Use WebGL only when the learner needs to rotate or inspect a genuinely 3D
object. A new WebGL page still uses the same page typography, panels,
controls, captions, and reading themes around its canvas. Resize the canvas
with its container, support touch and mouse input, give it a text explanation
or labeled alternative, and handle a browser without WebGL gracefully.
Treat camera, lighting, axes, and data colors as part of the scientific
visualization; check their legibility in all four themes.

Build a visualization to answer a concrete question. Show the situation first,
then let the learner change a parameter and see what changed. Pair a diagram
with a short caption, named controls, numeric readouts with units, and an
explanation that connects the picture to the equation. Avoid a static chart
when adjusting a parameter would teach the relationship better.

For high-school chapters, use an existing visualizer in `build/engine.js` where
it fits (`motion`, `plot`, `vector`, `wave`, `bars`, `numline`, `tri`, `grid`,
`scale`, `fbd`, `stack`, `scene`, or `plate`). `table` renders reference data
without interactive controls. A node's `viz`, `vizcfg`, and optional `guide`
define its lab; see `build/chapters/ch02.js`. Use a range slider for a quantity
and named choice buttons for a small set of categories. Guided mode should
step through meaningful states; sandbox mode lets the learner explore. Update
the figure and readouts together. Offer Play/Reset only when animation exists.

Use SVG with a `viewBox` for diagrams that must scale on phones. Use semantic
strokes and fills such as `var(--accent)`, `var(--rule)`, `var(--ink-soft)`;
label axes and units, keep gridlines quiet, and draw the important curve or
vector more strongly. Include a `<title>` and `<desc>` or an appropriate
accessible label. Interactive SVG nodes need focus, keyboard activation, and
an accessible explanation of their state. For content that needs a wide
matrix, provide a horizontal scroll container rather than shrinking labels
until they cannot be read. Do not put arbitrary page colors inside SVG or
Canvas drawing code: light and dark theme changes must remain legible.

## Minimal new-page pattern

For a page **inside this repository**, the build embeds `engine.css` followed
by `course-theme.css` and embeds `course-theme.js` in `<head>` before content.
The theme control below is required by `course-theme.js`; preserve the `id`
and the four option values. A standalone page can use this same pattern by
loading the three source files with the correct relative paths; embed them at
build time if the page must work offline. `engine.css` provides the base
button and panel rules; `course-theme.css` overrides its older palette.

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lesson title</title>
  <link rel="stylesheet" href="build/engine.css">
  <link rel="stylesheet" href="build/course-theme.css">
  <script src="build/course-theme.js"></script>
</head>
<body>
  <div class="shell">
    <header class="mast">
      <div class="mast-id">
        <a class="ch home" href="index.html">← All courses</a>
        <h1>Lesson title</h1>
      </div>
      <div class="mast-tools">
        <label class="reading-theme">Theme
          <select id="readingTheme" aria-label="Reading theme">
            <option value="paper">Paper</option>
            <option value="warm">Warm</option>
            <option value="blue">Soft Blue</option>
            <option value="dark">Dark</option>
          </select>
        </label>
      </div>
    </header>
    <main>
      <p class="lede">What the learner will discover.</p>
      <figure class="plate">
        <svg viewBox="0 0 640 360" role="img" aria-labelledby="viz-title viz-desc">
          <title id="viz-title">Concept diagram</title>
          <desc id="viz-desc">Describe what the lines and labels mean.</desc>
          <!-- Diagram using var(--rule), var(--ink), var(--accent). -->
        </svg>
        <figcaption>What the learner should notice.</figcaption>
      </figure>
    </main>
  </div>
</body>
</html>
```

The paths in the example are relative to a file at the repository root; adjust
them for nested pages. Do not use this local theme script alongside the site's
`assets/reading-themes.js` on one page.

## Completion checks for an agent

- Check Paper, Warm, Soft Blue, and Dark, including the selected control,
  page background, text contrast, SVG labels, and any Canvas redraw.
- Check at a phone width and a desktop width. Long Thai labels, equations,
  maps, controls, and tables must remain usable.
- Use a keyboard to reach cards, tabs, controls, and interactive diagram nodes.
  Check focus indication and reduced-motion behavior.
- Confirm that changing a parameter updates the drawing and readouts, and
  that explanations, captions, and units remain correct in English and Thai.
- In this repo, run `python -X utf8 build/check.py` and
  `python -X utf8 build/build.py`; check that generated pages have no broken
  links or unresolved build tokens. Changes to a deployed site require a
  separate deployment and live verification.
