# Whizlabs optical redesign — bounded Gauntlet batch

## Goal and reference
- THING: existing German AB-620 learning website on `beta`; main remains untouched.
- REFERENCE: https://www.whizlabs.com/ for hierarchy, spacing, warm palette and clear learning-entry actions, not its brand assets, ratings or subscription business model.
- STACK: existing static HTML/CSS/JS and unchanged `AB620_CONTENT` data.
- Visual target: concise split hero, original agent-learning illustration, coherent learning surfaces, no badge/text wall.
- Functional target: every existing learning item reachable, sources visible, scrolling and keyboard navigation work, themes/search/labs/exam preserved.
- Streams: shell/hero (`index.html`, `redesign-shell.css`, original SVG), learning surfaces (`redesign-learning.css`). Lead owns app integration and regression tests. Separate critic inspects integrated rendered output.

## Reference provenance and limitations
The live Whizlabs document returned a Cloudflare challenge in the Chromium test browser. The user supplied a text extraction, and the original hero asset is accessible:
https://www.whizlabs.com/_next/static/media/home-hero-banner-desktop.8cdd1272.webp

A real archived page was rendered in Chromium from:
https://web.archive.org/web/20260804120647/https://www.whizlabs.com/
Snapshot date **2026-08-04**. Its styles load, but its hero image and some branding do not. This is a partial historical visual reference, not the current full site. Do not treat broken archival image gaps as quality advantages. No complete live Whizlabs blind A/B claim is justified.

Current local evidence (not committed binary assets): `/home/pkostelnik/ab620-visual-evidence/`. Baseline/reference screenshots carry distinct filenames. Critic comparisons must explicitly state that source identity is known, unless truly randomized and masked by a separate party.

## Verification
Real Chromium regression: `gauntlet/regression.cjs`. Requires Node >=20 and Playwright, plus `playwright install chromium`. Optional `PLAYWRIGHT_MODULE` can point at an existing package; `PLAYWRIGHT_BROWSERS_PATH` selects its browser installation; `QA_OUTPUT` selects an output directory. Run:

```sh
node gauntlet/regression.cjs https://snat.ovh/AB-620-beta/
```

The test follows every actual learning text in the current data, writes the visited ID list, exercises search, mark-read, exam answers/result review, themes and viewport overflow. It is not a factual audit of Microsoft Learn sources or a certification of WCAG conformance.

## Constraints
- Up to three cycles per invocation, not an unbounded loop.
- No fabricated ratings, users, partner badges or executed-test claims inferred from stored QA rows.
- No pushes to main, no updates to `/AB-620/`, no GitHub Pages branch changes.
- Never compare exam domain weight to answer accuracy as a passing target.
- Reading through cards is not automatic evidence of mastering or completing a domain.
