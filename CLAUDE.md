# CLAUDE.md

This file gives Claude Code (and other AI assistants) the context needed to work in this repository.

## What this repository actually is

This is **not** a conventional software project. There is no source code, no build
system, no package manager, no tests, and no dependencies. The entire repository
consists of two static, self-contained HTML files:

- `index.html` (~4.0 MB) — the current/canonical export.
- `MICRO AGRO-TECH (standalone) (1).html` (~1.0 MB) — an earlier or lower-resolution
  export of the same page (identical bootstrap loader, smaller embedded asset payload).
  Treat it as a secondary/backup copy of `index.html`, not a different page.

Both render the same page: **"MICRO AGRO-TECH — Prezentacja partnerska"** (Polish for
"MICRO AGRO-TECH — Partner Presentation"), a business/investor-style pitch presentation
for an agro-tech venture.

There is no README, license, CI config, `.gitignore`, or app source directory —
just these two files at the repo root.

## File format — read this before touching either HTML file

Each file is a **generated single-file website export**, not hand-authored markup.
The structure is:

1. A small bootstrap `<head>`/loading screen (`#__bundler_loading`,
   `#__bundler_thumbnail`, an inline SVG placeholder, and a `DOMContentLoaded`
   script that unpacks the bundle and reports status/errors).
2. A large `<script type="__bundler/manifest">` block: a JSON object keyed by
   UUIDs, each entry holding a `mime` type and base64 `data` for an embedded
   asset (images, JS chunks, etc.).
3. A `<script type="__bundler/template">` block and `<script type="__bundler/ext_resources">`
   block that describe how the page/template is assembled from those assets.
4. `<script src="{uuid}">` tags whose `src` is not a URL but a **key into the
   manifest** — the bootstrap script resolves these to inline/blob content at
   load time.

Practical implications:

- **The files are fully self-contained.** No network requests are made at
  runtime (verified — the only `http://` string in the file is an XML
  namespace URI, not a fetch target). They can be opened directly from disk
  in a browser (`file://…`) with no dev server required.
- **Do not attempt to "clean up," reformat, prettify, or manually edit the
  minified bundle/manifest content.** It is effectively a build artifact —
  editing the base64/JSON blobs by hand will corrupt the page. If line-count
  tools report ~192 lines per file, that's expected: nearly all content lives
  on a handful of extremely long lines (one line is ~3.9 MB).
- **There is no known build pipeline in this repo to regenerate these files.**
  They were produced by an external export/bundler tool and uploaded directly
  (see Git History below). If the presentation content needs to change, that
  change almost certainly needs to happen in the original authoring tool and
  be re-exported/re-uploaded here — Claude should not try to hand-patch the
  bundle to achieve content edits unless explicitly asked to attempt a
  surgical, well-understood change (e.g., patching a specific base64 asset or
  a specific string inside the manifest JSON).

## Development workflow

There is no build, lint, or test tooling. To "run" the project:

```bash
# Just open it in a browser — no server needed.
open index.html          # macOS
xdg-open index.html       # Linux
```

If you need to verify a change visually (e.g. after a targeted asset/string
patch), use the `run` skill / a headless browser (Playwright/Chromium is
pre-installed in this environment) to load the file via `file://` and take a
screenshot, since there's no dev server to point at.

## Git conventions observed in this repo

- History so far is three commits, all authored by `Woodys` with the message
  `Add files via upload` (GitHub web UI uploads on 2026-06-01/02) — there is no
  established commit-message convention beyond "keep it descriptive."
- `main` is the default branch; work happens on feature branches
  (e.g. `claude/claude-md-docs-*`) and is merged via PR.
- Given the file sizes involved, avoid unnecessary rewrites of these HTML
  files — every edit produces a large diff. Only touch them when a change is
  specifically requested, and prefer the smallest possible surgical edit.

## Guidance for AI assistants working here

- Default assumption for any request: the user wants either (a) documentation/
  repo-hygiene work (like this file), or (b) a specific, scoped change to the
  presentation content or embedded assets. Ask before doing broad rewrites of
  the HTML files.
- Before editing either HTML file, confirm exactly what needs to change and
  locate it precisely (e.g. via `grep -o` on short unique substrings) rather
  than reading the whole file — each file is multi-megabyte with ~4 MB single
  lines, and full reads will blow through context budgets for no benefit.
- If asked to reduce duplication, flag to the user that
  `MICRO AGRO-TECH (standalone) (1).html` looks like a stale duplicate of
  `index.html` and confirm before deleting/consolidating — don't do it
  unilaterally.
