# Scripts

Build-time and maintenance scripts. All are `.ts` files executed through `tsx`; each has a matching npm script in `package.json`.

## Site generation

| Script | npm alias | Purpose |
| --- | --- | --- |
| `generate-og-images.ts` | `npm run generate:og` | Render per-page Open Graph images via Satori + Sharp. |
| `generate-favicons.ts` | `npm run generate:favicons` | Produce favicons and apple-touch-icons from the source art. |
| `generate-sitemap.ts` | `npm run generate:sitemap` | Write `public/sitemap.xml` from the case-study manifest. |

## Lab maintenance

### `report-orphan-terms.ts` — orphan-terms audit

`npm run audit:orphans`

Walks `core/lab/guides/*.md`, parses each through `core/lab/parse-guide.ts`, and captures every `|term|` marker that has no matching frontmatter glossary entry. Emits a dated report at `vector/audits/orphan-terms-<YYYY-MM-DD>.md` shaped to be pasted directly into the external authoring Claude project.

**Paste-back workflow:**

1. `npm run audit:orphans` — writes today's report.
2. Open the report and paste the **Prompt for Claude project** and **Orphans by guide** sections into the external Claude project that authors the guides.
3. Paste the YAML response back.
4. For each slug in the response, open `core/lab/guides/<slug>.md` and merge the new terms into the `glossary:` block.
5. Re-run `npm run dev` — console orphan warnings should clear.

Re-running the script overwrites today's report. Older dated reports stay on disk as a history trail — useful for tracking how quickly authoring cleanup keeps pace with ingestion.

### `migrate-jsx-guide.ts` — one-shot JSX → markdown migration

`npx tsx scripts/migrate-jsx-guide.ts <input.jsx> <output.md> --territory T1|T2|T3|T4 --status draft|in-progress|complete --description "..." [--kicker "..."] [--order N]`

Converts a legacy JSX research guide (`const SECTIONS = [...]` + a React component rendering a header) into a `.md` file matching the schema in `core/lab/parse-guide.ts`. Walks the AST with `@babel/parser`, rebuilds SECTIONS as a JS value, scans the JSX tree for the first `<h1>` and sibling source line, and extracts the first non-neutral hex color as the accent.

Glossary terms dedupe across paragraphs into the frontmatter map; term conflicts log a warning and keep the last occurrence.

One-off tool — not wired to an npm alias. Retain until the legacy JSX guides are fully retired.
