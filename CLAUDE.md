# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

EHMDS (EHM Design System) is a **proof-of-concept design system** that explores architectural approaches for building one design system on top of another. It is **genuinely layered on FKUI** (Försäkringskassan Design System), demonstrating four distinct architectural patterns:

1. **Token Override** - Uses FKUI components as-is, overriding only CSS variables
2. **Wrapper/Facade** - Wraps FKUI components with a simplified EHMDS API
3. **Extension** - Extends FKUI components with additional features
4. **Composition** - Composes multiple FKUI components into domain components

**Primary hypothesis:** A layered architecture is the most effective pattern for this relationship.

**Repo:** https://github.com/pattespatte/ehmds-on-fkui-test

## Tech Stack

- Vue 3 (Composition API + `<script setup>`)
- TypeScript
- Vite (build tool + dev server)
- VitePress (documentation)
- FKUI packages: `@fkui/vue`, `@fkui/design`, `@fkui/logic`, `@fkui/date`, `@fkui/theme-default`

## Project Structure

```
src/
├── components/
│   ├── Button.vue              # Legacy standalone components (pre-architecture)
│   ├── Card.vue                # Legacy standalone components
│   ├── wrapper/                # Wrapper/Facade pattern
│   │   └── EhmCard.vue         # Wraps FCard with custom API
│   ├── extension/              # Extension pattern
│   │   └── EhmTextField.vue    # Extends FTextField with features
│   ├── composition/            # Composition pattern
│   │   └── EhmSearchBox.vue    # Composes FTextField + FCrudButton + FExpandable
│   └── token-override/         # Token Override pattern
│       └── EhmBadge.vue        # FBadge with CSS token overrides
├── assets/
│   └── global.css              # Global styles, FKUI imports, EHMDS CSS variables
├── themes/
│   └── default.js              # Theme configuration with generateCSSVariables()
├── App.vue                     # Demo app showcasing all components
├── main.js                     # App entry point
└── index.js                    # Design system entry point (plugin exports)
docs/
└── architecture/               # Architecture pattern documentation
    ├── overview.md             # High-level overview
    ├── comparison.md           # Pattern comparison
    ├── token-override.md       # Token override pattern docs
    ├── wrapper.md              # Wrapper pattern docs
    ├── extension.md            # Extension pattern docs
    └── composition.md          # Composition pattern docs
demo/
└── vite.config.js              # Vite config for demo app
```

## Commands

```bash
npm install              # Install dependencies
npm run demo             # Start demo app dev server
npm run build            # Build design system for production
npm run preview          # Preview production build
npm run lint             # Lint code (ESLint)
npm run lint:fix         # Auto-fix linting issues
npm run docs:dev         # Start VitePress docs server
npm run docs:build       # Build documentation
npm run docs:preview     # Preview built docs
npm run update:fkui-deps # Update FKUI dependencies to latest
```

## The Four Architectural Patterns

### 1. Token Override Pattern

**Minimal code, visual changes only**

Uses FKUI components as-is, only overriding CSS custom properties.

**Example:** `EhmBadge` wraps `FBadge`
```vue
<template>
  <FBadge v-bind="$attrs" class="ehm-badge">
    <slot />
  </FBadge>
</template>

<style scoped>
.ehm-badge:deep(.c-badge) {
  --fk-badge-background: var(--ehmds-color-primary) !important;
}
</style>
```

**When to use:** Only visual changes needed

**Documentation:** `docs/architecture/token-override.md`

---

### 2. Wrapper/Facade Pattern

**Simplified API, same component**

Wraps FKUI components with a customized EHMDS API.

**Example:** `EhmCard` wraps `FCard`
```vue
<template>
  <FCard :id="id" :focus-ref="errorRef" :class="cardClasses">
    <template #header><slot name="header" /></template>
    <slot />
    <template #footer><slot name="footer" /></template>
  </FCard>
</template>

<script setup>
// Custom EHMDS API, different from FCard
const props = defineProps({
  variant: { type: String, default: "default" }, // EHMDS variants
  hasError: { type: Boolean, default: false },   // Semantic prop
  errorRef: { type: HTMLElement, default: null }
});
</script>
```

**When to use:** Want a simpler or different API than FKUI

**Documentation:** `docs/architecture/wrapper.md`

---

### 3. Extension Pattern

**FKUI features + EHMDS enhancements**

Extends FKUI components with additional features.

**Example:** `EhmTextField` extends `FTextField`
```vue
<template>
  <div class="ehm-text-field">
    <label>{{ label }}</label>
    <div class="ehm-text-field__input-wrapper">
      <slot name="prefix" />
      <FTextField v-model="internalValue" v-bind="$attrs" />
      <span class="char-count">{{ length }}/{{ max }}</span>
    </div>
    <p class="helper">{{ helperText }}</p>
  </div>
</template>

<script setup>
// Preserves all FTextField props, adds EHMDS features
const props = defineProps({
  // ... all FTextField props are preserved
  label: String,           // EHMDS addition
  helperText: String,      // EHMDS addition
  maxLength: Number,       // EHMDS addition
});
</script>
```

**When to use:** Need FKUI features plus additional functionality

**Documentation:** `docs/architecture/extension.md`

---

### 4. Composition Pattern

**Multiple FKUI components, one domain component**

Combines multiple FKUI components into a domain-specific component.

**Example:** `EhmSearchBox` composes `FTextField` + `FCrudButton` + `FExpandable`
```vue
<template>
  <div class="ehm-search-box">
    <FExpandable v-model:is-open="isExpanded">
      <FTextField v-model="searchQuery" @keyup.enter="handleSearch" />
      <FCrudButton :action="'search'" @click="handleSearch" />
      <FCrudButton :action="'delete'" @click="handleClear" />
    </FExpandable>
    <slot name="results" :query="searchQuery" />
  </div>
</template>

<script setup>
// Coordinates state between multiple FKUI components
const searchQuery = ref("");
const isExpanded = ref(false);
const handleSearch = () => emit("search", searchQuery.value);
</script>
```

**When to use:** Need to combine multiple FKUI components

**Documentation:** `docs/architecture/composition.md`

---

## Component Architecture

### Plugin Pattern

The design system exports a Vue 3 plugin (`src/index.js`):

```javascript
import EHMDS from '@ehmds/design-system'
app.use(EHMDS, { theme: customTheme })
```

The plugin:
- Registers all components globally
- Applies theme CSS variables to `:root`
- Provides theme context

### Component Catalog

| EHMDS Component | Pattern | FKUI Component(s) | File |
|-----------------|---------|-------------------|------|
| `EhmBadge` | Token Override | `FBadge` | `src/components/token-override/EhmBadge.vue` |
| `EhmCard` | Wrapper | `FCard` | `src/components/wrapper/EhmCard.vue` |
| `EhmTextField` | Extension | `FTextField` | `src/components/extension/EhmTextField.vue` |
| `EhmSearchBox` | Composition | `FTextField` + `FCrudButton` + `FExpandable` | `src/components/composition/EhmSearchBox.vue` |

### FKUI Dependencies

FKUI components are imported from `@fkui/vue`:

```javascript
import { FCard, FTextField, FCrudButton, FExpandable, FBadge } from '@fkui/vue';
```

**Important:** EHMDS components actually USE FKUI components at runtime. This is not just a CSS dependency - the FKUI Vue components are instantiated and rendered.

## CSS Variables

Two sources of truth:
1. `src/assets/global.css` - CSS variables defined directly in `:root`
2. `src/themes/default.js` - JavaScript theme object with `generateCSSVariables()` utility

**Important:** When adding theme values, update both files to maintain consistency.

## Build Configuration

**Library build** (`vite.config.js`):
- Entry: `src/index.js`
- Outputs: `dist/ehmds.es.js` (ES module), `dist/ehmds.umd.js` (UMD)
- External dependencies: `vue`, `@fkui/vue`
- Rollup globals mapping for UMD build

**Demo app** (`demo/vite.config.js`):
- Separate Vite config for running the demo
- Alias `@` to `../src`

## Documentation

VitePress configuration in `docs/.vitepress/config.js`:
- Base path: `/ehmds-on-fkui-test/` (GitHub Pages)
- Architecture documentation in `docs/architecture/`

## Coding Conventions

- **Component names:** Prefix with `Ehm` (e.g., `EhmCard`, `EhmTextField`)
- **File organization:** Group by pattern in `src/components/{pattern}/`
- **CSS variables:** Prefix with `--ehmds-` (e.g., `--ehmds-color-primary`)
- **Scoped styles:** Always use scoped styles in components
- **FKUI imports:** Import from `@fkui/vue`, not individual files
- **Accessibility:** Preserve FKUI's WCAG compliance when wrapping/extending

## Development Workflow

### Adding a New Component

1. **Choose the pattern** based on requirements (see pattern comparison in `docs/architecture/comparison.md`)
2. **Create file** in appropriate `src/components/{pattern}/` directory
3. **Import FKUI components** from `@fkui/vue`
4. **Export from `src/index.js`**
5. **Register in plugin's `install()` function**
6. **Add demo in `src/App.vue`**
7. **Document architecture decision** if introducing new pattern variations

### Example: Adding a Wrapper Component

```bash
# 1. Create file
mkdir -p src/components/wrapper
touch src/components/wrapper/EhmButton.vue

# 2. Implement wrapper pattern
# Import FKUI component, wrap with custom API

# 3. Export from index.js
# Add: import EhmButton from './components/wrapper/EhmButton.vue'
# Add: export { EhmButton }
# Add to install(): app.component('EhmButton', EhmButton)
```

### Updating Theme

1. Modify `src/themes/default.js`
2. Mirror changes in `src/assets/global.css` `:root` variables
3. Test in both light and dark modes

### Updating FKUI Dependencies

```bash
npm run update:fkui-deps
```

This runs `scripts/update-fkui-deps.js` which updates all FKUI packages to latest compatible versions.

## Key Architectural Decisions

See `docs/architecture/overview.md` for detailed ADRs (Architecture Decision Records):

1. **Layered Architecture** - EHMDS sits between app and FKUI
2. **Multiple Patterns** - Demonstrate all four patterns, not just one
3. **Prefix Convention** - `Ehm` prefix distinguishes from FKUI components
4. **Real FKUI Usage** - Components actually instantiate FKUI, not just CSS

## Resources

- [Architecture Overview](../../docs/architecture/overview.md)
- [Pattern Comparison](../../docs/architecture/comparison.md)
- [FKUI Documentation](https://designsystem.forsakringskassan.se/)
- [FKUI GitHub](https://github.com/Forsakringskassan/designsystem)
