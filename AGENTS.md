# AGENTS.md

Workspace guide for ZCode agents in `ehmds-on-fkui-test`.

> Read `CLAUDE.md` and `README.md` for full architectural background. This file
> captures project-specific facts, corrections, and gotchas not obvious from
> those docs.

## What this is

EHMDS (EHM Design System) — a **proof-of-concept** Vue 3 design system layered
on FKUI (Försäkringskassan Design System). It demonstrates four architectural
patterns for building one design system on top of another:

1. **Token Override** — FKUI components as-is, override only CSS variables (`EhmBadge`)
2. **Wrapper/Facade** — wrap FKUI with a simplified EHMDS API (`EhmCard`)
3. **Extension** — extend FKUI components with extra features (`EhmTextField`)
4. **Composition** — compose multiple FKUI components into a domain component (`EhmSearchBox`)

Components **actually instantiate FKUI at runtime** (not just a CSS dependency).
FKUI imports come from `@fkui/vue`.

Formerly referenced internally as "Helix"; renamed to "EHMDS" (see commit
`2534366`). Do not reintroduce the "Helix" name.

## Stack

Vue 3 (Composition API + `<script setup>`), TypeScript, Vite, Vitest + jsdom,
ESLint (flat config) + Prettier, Sass. FKUI packages all at `^6.39.0`.

## Commands (source of truth: `package.json`)

```bash
npm run demo           # Dev server (demo app + in-app docs) — uses demo/vite.config.ts
npm run build          # Type-checks then builds the demo APP (root vite.config.ts). NOT the library.
npm run build:lib      # Build the PUBLISHABLE library (demo/vite.config.ts, lib mode → dist/ehmds.{es,umd}.js)
npm run build:all      # Demo app + library + type-check, in one go
npm run type-check     # vue-tsc --noEmit
npm run lint           # eslint src --ext .vue,.js,.ts
npm run lint:fix
npm run update:fkui-deps   # node scripts/update-fkui-deps.js
```

**Tests have no npm script.** Run vitest directly:

```bash
npx vitest                 # or: bunx vitest
npx vitest run             # single run (no watch)
npx vitest run tests/patterns/wrapper.spec.js   # one spec
```

### ⚠️ Doc/repo discrepancies to know

- **Source is TypeScript.** Files are `src/main.ts`, `src/index.ts`,
  `src/themes/default.ts`. `CLAUDE.md` and `index.html` reference `.js`
  equivalents that do not exist — trust the filesystem, not those references.
- **`npm run build` builds the demo app**, not the publishable library. The
  library build (`demo/vite.config.ts`, lib mode, outputs `ehmds.es.js` /
  `ehmds.umd.js`) is **not wired to any npm script**. To build the library:
  `npx vite build --config demo/vite.config.ts`. Note `package.json` `main`/
  `module`/`exports` point at `dist/ehmds.*.js`, which only the library build
  produces.
- **No `docs:dev` / `docs:build` / `docs:preview` scripts** (despite
  CLAUDE.md/README listing them). VitePress is **not** used. Docs are markdown
  under `docs/` served in-app via the custom `plugins/static-docs.ts` plugin,
  routed under `/docs` (see the `routes` list in `vite.config.ts`).
- Base path is `/ehmds-on-fkui-test/` (GitHub Pages). Live demo:
  https://pattespatte.github.io/ehmds-on-fkui-test/

## Project structure

```
src/
  components/{wrapper,extension,composition,token-override}/Ehm*.vue  # one pattern per dir
  assets/global.css        # CSS :root variables (theme source of truth #1)
  assets/variables.scss
  themes/default.ts        # generateCSSVariables() (theme source of truth #2)
  themes/types.ts          # Theme / CSSVariables / PluginOptions types
  views/ + router/         # demo app pages + in-app docs routes
  index.ts                 # design-system entry (Vue plugin, component exports)
  main.ts                  # demo app entry
plugins/static-docs.ts     # serves docs/*.md as in-app routes
tests/patterns/*.spec.js   # one spec per architectural pattern
docs/architecture/         # pattern docs (overview, comparison, per-pattern, accessibility, fkui-updates)
scripts/update-fkui-deps.{js,sh}
```

Path alias: `@` → `src` (configured in `tsconfig.demo.json`, root
`vite.config.ts`, `demo/vite.config.ts`, `vitest.config.js`).

## Architecture & edit rules

- **One pattern per directory.** Place new components in
  `src/components/{pattern}/` matching the pattern they demonstrate.
- **Register new components** in `src/index.ts` (import, named export, and
  `install()` global registration) and add a demo in `src/App.vue`.
- **Prefix all EHMDS components** with `Ehm` (e.g. `EhmButton`); CSS variables
  with `--ehmds-` (e.g. `--ehmds-color-primary`).
- **Always use `<style scoped>`** in components.
- **Import FKUI from `@fkui/vue`** (named imports), never from subpaths.
- **Preserve FKUI's WCAG/accessibility** when wrapping or extending — don't
  strip aria attributes, roles, or keyboard handling.

## Security & accessibility rules

- **Sanitize any HTML before `v-html`.** `marked`/Mermaid output is never
  trusted raw — wrap with `DOMPurify.sanitize(...)` first (see
  `src/utils/markdown.ts` and `DocsPage.vue`). This is the project's safe-v-html
  pattern; don't bypass it when adding new doc/content surfaces.
- **Never set `outline: none` without a replacement `:focus-visible` style.**
  Removing the focus ring without a substitute violates WCAG 2.4.7 (Focus
  Visible). The project convention is the high-contrast ring
  `box-shadow: 0 0 0 2px #fff, 0 0 0 4px #000;` (see `EhmSearchBox`).
- **Links must be distinguishable without color alone (WCAG 1.4.1).** All
  `<a>`/`<router-link>` elements use `text-decoration: underline` in the
  resting state — not only on hover. Color is a secondary cue, never the sole
  one.
- **State must not be indicated by color alone (WCAG 1.4.1).** Success and
  warning states need a text/icon/ARIA cue in addition to color.
  `EhmTextField` renders a ✓/⚠ glyph + `aria-live` for its success/warning
  variants; `EhmCard` sets `role="alert"` when in error. Do not introduce a new
  state that relies on border/background color only.
- **Text must meet 4.5:1 contrast (WCAG 1.4.3).** The semantic tokens
  (`--ehmds-color-success/warning/error`) were darkened from their Tailwind
  500-shade defaults to meet this. When introducing a color, verify the ratio
  against the actual background (note: the page bg is `#f5f7fa`, not pure
  white, which pushes borderline grays below threshold).
- **Interactive elements must be keyboard-accessible (WCAG 2.4.1).** Use
  `<button>`/`<a>` for actions/navigation — never a `<div>`/`<span>` with only
  `@click`. If a non-semantic element is unavoidable, add `tabindex="0"`,
  `role="button"`, and a `@keyup.enter`/`@keydown.space` handler.
- **FKUI slot surface is the source of truth.** Before forwarding a slot in a
  wrapper/extension/composition component, confirm the FKUI component actually
  declares it (check `@fkui/vue`). FCard's real slots, for example, are
  `header`, `error-message`, `default`, `footer` — there is no `actions` slot,
  so EhmCard intentionally does not forward one. Forwarding a non-existent slot
  is dead code that teaches the wrong thing about the pattern.

## Theme: two sources of truth

Theme values live in **both** `src/assets/global.css` (`:root`) and
`src/themes/default.ts` (`generateCSSVariables()`). When changing a token,
update **both** to keep them consistent.

Current visual direction (recent commits): **navy + beige palette**, rounded
corners — EHMDS is intentionally differentiated from FKUI defaults. Follow this
when styling new components.

## Testing conventions

- Vitest, jsdom, globals enabled; setup in `tests/setup.js`.
- Specs in `tests/patterns/*.spec.js`, one per pattern.
- **Do not mock or stub FKUI components** — tests mount real components to
  verify actual FKUI integration (this is deliberate; see `tests/setup.js`).
- Use `@/...` imports and `@vue/test-utils` `mount`/`shallowMount`.

## Type-checking & lint notes

- `vue-tsc --noEmit` (`npm run type-check`) is authoritative; `npm run build`
  runs it too. TypeScript is strict (`strict`, `noUnusedLocals`,
  `noUnusedParameters`).
- Prefix intentionally-unused vars/args with `_` to satisfy the unused-vars
  rule. `no-explicit-any` is a warning, not an error.
- ESLint lints `src` only (`.vue`, `.js`, `.ts`); flat config in
  `eslint.config.js`. Prettier formatting applied via
  `@vue/eslint-config-prettier`.
