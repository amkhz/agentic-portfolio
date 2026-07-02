# Backfill Survey Signals — Step 2 & Step 3 Detail

Read this when you begin Step 2 of invest-backfill. Work from highest-signal to lowest-signal sources.

## Step 2: Survey the Project

### 2a. Identity Signals — What the project IS

1. **README.md** — Read entirely. Extract: project name, description, purpose, audience, stated tech stack, contribution guidelines, project structure if documented, stated principles or philosophy.

2. **Package manifest** — Read the first one found:
   - JavaScript/TypeScript: `package.json`
   - Python: `pyproject.toml` or `requirements.txt` or `setup.py`
   - Rust: `Cargo.toml`
   - Go: `go.mod`
   - Ruby: `Gemfile`
   - PHP: `composer.json`

   Extract: project name, dependencies, scripts/commands, build tools, test framework.

3. **Existing documentation** — Read any `.md` files at the project root: CONTRIBUTING.md, CHANGELOG.md, any task/planning files. These reveal process, priorities, and maturity.

4. **License** — Note the license type. This informs constraints.

### 2b. Architecture Signals — How it is built

5. **Config files** — Read in order of informativeness:
   - Build: `vite.config.*`, `next.config.*`, `astro.config.*`, `webpack.config.*`, `rollup.config.*`, `tsconfig.json`
   - Deploy: `netlify.toml`, `vercel.json`, `Dockerfile`, `fly.toml`, `.github/workflows/*.yml`
   - Lint/format: `.eslintrc.*`, `.prettierrc`, `biome.json`
   - Framework: `tailwind.config.*`, `postcss.config.*`

6. **Directory structure** — List the top two levels of the project tree. Ignore: `node_modules/`, `.git/`, `dist/`, `build/`, `.next/`, `.cache/`, `__pycache__/`, `.venv/`, `target/`. Record every source directory and its file count.

7. **Entry points** — Identify and read the application entry point(s):
   - `src/main.jsx/tsx`, `src/index.js/ts`, `src/App.jsx/tsx`
   - `pages/_app.tsx`, `src/app/layout.tsx` (Next.js)
   - `app.py`, `api/main.py`, `server.js`
   - `index.html` at root or in `src/`

8. **Style architecture** — Determine the styling approach:
   - Look for: `tokens.css`, `variables.css`, `:root` CSS custom property blocks
   - Check for: Tailwind config, CSS modules (`.module.css`), styled-components/emotion imports
   - Check for: single monolith CSS file vs. component-scoped files
   - Read the first 100 lines of the main CSS file if one exists

9. **State management** — Scan imports across source files for:
   - Context/useReducer patterns, Context directories
   - Redux/Zustand/Jotai/Recoil/Pinia/Vuex imports
   - Custom store files

### 2c. Convention Signals — How code is written

10. **Naming conventions** — Sample 10-15 source filenames across the project. Determine dominant patterns:
    - PascalCase vs. camelCase vs. kebab-case vs. snake_case
    - File extensions (.jsx/.tsx/.js/.ts/.vue/.svelte/.py/.go/.rs)
    - Test file pattern: `*.test.*`, `*.spec.*`, `__tests__/`, `tests/`

11. **Import patterns** — Read 3-5 representative source files. Note:
    - Absolute vs. relative imports
    - Path aliases (`@/`, `~/`, `#/`)
    - Barrel exports (`index.js` re-exports)
    - Import grouping conventions

### 2d. Agent Signals — Embedded AI instructions

12. **Inline system prompts** — Scan for:
    - Variables named `SYSTEM_PROMPT`, `systemPrompt`, `system_prompt`, `SYSTEM_MESSAGE`
    - Large string literals containing instruction language ("You are...", "Your role is...", "RULES:", "BOUNDARIES:", "INSTRUCTIONS:")
    - AI SDK usage: `new Anthropic`, `new OpenAI`, `openai.chat.completions`, `anthropic.messages`
    - Any existing `.claude/` directory

    For each prompt found, record: file path, approximate length, what persona/voice it defines, whether it is function-specific or project-wide.

### 2e. Process Signals — How the project develops

13. **Git history** — Run `git log --oneline -20`. Infer:
    - Commit style (conventional commits, free-form, emoji-prefixed)
    - Activity (recent or dormant)
    - Solo or multi-author

14. **Git remotes and branches** — Run `git remote -v` and `git branch -a`. Note deployment branch, branching strategy.

## Step 3: Analyze and Classify

Take all signals from Step 2 and produce structured analysis.

### 3a. Stack Classification

Map the project to a technology profile:

| Layer | Technology | Source | Confidence |
|-------|-----------|--------|------------|
| Frontend | [framework + version] | [where you found it] | HIGH/MEDIUM/LOW |
| Build | [tool] | [config file] | HIGH/MEDIUM/LOW |
| Styling | [approach] | [evidence] | HIGH/MEDIUM/LOW |
| State | [library or pattern] | [evidence] | HIGH/MEDIUM/LOW |
| Backend | [framework or "serverless" or "none"] | [evidence] | HIGH/MEDIUM/LOW |
| Database | [if applicable] | [evidence] | HIGH/MEDIUM/LOW |
| Testing | [framework or "none detected"] | [evidence] | HIGH/MEDIUM/LOW |
| Deployment | [platform] | [config] | HIGH/MEDIUM/LOW |

**Confidence levels:**
- **HIGH** — Found in config file or package manifest. Unambiguous.
- **MEDIUM** — Inferred from code patterns. Likely correct but could be legacy or unused.
- **LOW** — Guessed from directory names or partial evidence. Needs operator confirmation.

### 3b. Layer Mapping

Map the project's actual directory structure to an architecture layer model.

**Rules:**
- Start with what EXISTS on disk, not with the Investiture four-layer default.
- Each top-level source directory is a candidate layer.
- If the project has clear separation already, describe it as-is.
- If the project is a monolith (everything in one directory), describe the sub-directory structure as implicit layers.
- **Never force a project into exactly four layers.** Three is fine. Seven is fine. Describe what is real.
- Note where the project's actual structure aligns with or diverges from the Investiture default pattern.

Produce a mapping table:

| Layer | Location | Contents | Investiture Analog |
|-------|----------|----------|-------------------|
| [descriptive name] | [path] | [what lives here] | [closest Investiture layer, or "no direct analog"] |

### 3c. Convention Extraction

From file samples, summarize observed conventions:
- **Naming:** What casing for what file types
- **Imports:** Absolute/relative, aliases, grouping
- **Styling:** CSS approach, class naming patterns (BEM, utility, custom prefix)
- **Testing:** Framework, file location, naming pattern — or "none detected"

### 3d. Inline Agent Inventory

For each embedded system prompt found:

| File | Purpose | Length | Scope |
|------|---------|--------|-------|
| [path] | [what it does] | [~chars] | Project-wide voice / Function-specific |

Prompts that define the PROJECT's voice or personality are CLAUDE.md candidates. Prompts that define a specific function's behavior stay where they are. Note both.

## Edge Cases

**Monorepo:** If the project root contains `packages/`, `apps/`, or a `workspaces` field in package.json, report: "This appears to be a monorepo. Investiture doctrine is typically per-package. Consider running `/invest-backfill` in each package directory." Generate root-level doctrine only if the operator confirms.

**No README:** Fall back to package manifest description. If that is also empty, report: "No project description found. VECTOR.md identity sections will require manual writing." Generate what can be inferred from code alone.

**Python/Go/Rust projects:** Read the appropriate package manifest. Layer mapping looks for framework-specific patterns:
- Python: `app/`, `api/`, `models/`, `services/`, `tests/`, `templates/`
- Go: `cmd/`, `internal/`, `pkg/`, `api/`
- Rust: `src/`, `tests/`, `benches/`

**Next.js / Astro / SvelteKit:** Recognize framework-specific routing patterns. Do not force separation that the framework intentionally collocates (e.g., Next.js App Router colocates layouts, pages, and loading states).

**TypeScript vs. JavaScript:** Detect from `tsconfig.json` presence and file extensions. Naming conventions in ARCHITECTURE.md should use the extensions actually present (`.tsx` not `.jsx` if the project uses TypeScript).

**Very large projects:** Do not read every file. Sample. Read entry points, config files, and 5-10 representative source files. The directory walk is comprehensive but file reading is selective.
