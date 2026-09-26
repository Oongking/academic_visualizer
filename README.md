# High-School Course Hub

Live at https://edu.gradual-lab.dev/high-school/ and linked from the main
education hub. Includes 20 physics chapters, 16 mathematics chapters, and
a cross-subject map, with English and Thai content.

## Build and check

```sh
python -X utf8 build/check.py
python -X utf8 build/build.py
node build/check_math.js
```

The build generates both `index.html` (the directory entry point) and
`home.html` (retained for existing navigation), plus the subject pages.
UTF-8 mode also avoids console encoding errors on Windows.

## Course design

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for the agent-facing style and
visualization guide. New agents in this repository are directed there by
`AGENTS.md`.

`build/course-theme.css` supplies the shared course styling for the hub,
subject maps, chapter readers, and cross-subject page. Its typography, cards,
and reading palettes follow the linear algebra and differential equation
courses. `build/course-theme.js` shares their `edu-reading-theme` preference
(Paper, Warm, Soft Blue, Dark); Paper is the default. Both files are embedded
at build time so chapters continue to work offline. Language and learning
progress retain their existing storage keys.

Chapter equations are typeset with bundled KaTeX 0.16.11. `build/math-notation.js`
handles existing formula strings, prose equations, and equations in generated questions;
`build/vendor/katex/` provides the MIT-licensed script, CSS, and fonts.
The build inlines those assets into chapter HTML to preserve offline use.

## Hosting

Static files are hosted at `/var/www/edu/high-school` on the existing education
server. Publish `index.html`, `home.html`, `bridge.html`, `math/`, and `physics/`.
Build scripts and repository metadata are not needed on the public site.

The initial deployment on 2026-09-26 added a high-school card to the existing
homepage and preserved the three existing robotics course routes. The original
homepage is backed up on the server at
`/var/backups/edu/20260926T065238Z/index.html`.

`build/prepare_deploy.py` validates local page links and prepares the initial
deployment archive in ignored `.deploy/`. It expects a downloaded copy of the
pre-deployment homepage in ignored `hub-original.html`; it deliberately refuses
to add a duplicate card. Future course-only updates should preserve the live
homepage and back up the existing course directory before replacing it.

The course redesign was deployed on 2026-09-26. The preceding course is backed
up at `/var/backups/edu/20260926T082140Z-high-school-redesign/high-school`.
All 41 published HTML pages were verified against the local build by SHA256;
the main hub, existing course indexes, and shared reading-theme script were
also verified unchanged.

KaTeX equation rendering was deployed on 2026-09-26. The previous high-school
pages are backed up at
`/var/backups/edu/20260926T091444Z-high-school-katex-final/high-school`.
The final 41 public HTML pages and five other-site resources were verified
against local SHA256 hashes.
