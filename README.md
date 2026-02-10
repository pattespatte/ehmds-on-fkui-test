# EHMDS - Layered Design System on FKUI

> **Proof-of-concept** exploring architectural approaches for building one design system on top of another. EHMDS demonstrates four distinct patterns for layering a design system on FKUI (Försäkringskassan Design System).

**Repository:** <https://github.com/pattespatte/ehmds-on-fkui-test>

## Overview

EHMDS (EHM Design System) is a **proof-of-concept design system** built on top of [FKUI](https://github.com/Forsakringskassan/designsystem). Its purpose is to explore, demonstrate, and compare architectural approaches for building one design system on another.

**Primary Hypothesis:** A layered architecture is the most effective pattern for building a design system on top of another design system.

## The Four Architectural Patterns

EHMDS demonstrates four distinct patterns for building on FKUI:

| Pattern | Complexity | Flexibility | Maintenance | Best For |
|---------|------------|-------------|-------------|----------|
| **Token Override** | ⭐ Very Low | ⭐ Low | ⭐ Very Low | Visual changes only |
| **Wrapper/Facade** | ⭐⭐ Low-Medium | ⭐⭐⭐ High | ⭐⭐ Medium | API simplification |
| **Extension** | ⭐⭐⭐ Medium-High | ⭐⭐ Medium | ⭐⭐ Medium | Adding features |
| **Composition** | ⭐⭐⭐⭐ High | ⭐⭐⭐⭐ Very High | ⭐⭐⭐ High | Domain components |

### 1. Token Override Pattern 🎨

**Minimal code, visual changes only**

Uses FKUI components as-is, only overriding CSS custom properties.

- **Component:** `EhmBadge` (wraps `FBadge`)
- **Code:** ~10 lines (mostly CSS)
- **Use Case:** When you only need to change colors, fonts, or spacing
- **Maintenance:** Very low - automatic FKUI updates

### 2. Wrapper/Facade Pattern 📦

**Simplified API, same component**

Wraps FKUI components with a simplified, customized EHMDS API.

- **Component:** `EhmCard` (wraps `FCard`)
- **Code:** ~50 lines
- **Use Case:** When you want a simpler or different API than FKUI
- **Maintenance:** Low - may need testing on FKUI updates

### 3. Extension Pattern ➕

**FKUI features + EHMDS enhancements**

Extends FKUI components with additional features while preserving all original functionality.

- **Component:** `EhmTextField` (extends `FTextField`)
- **Code:** ~100 lines
- **Use Case:** When you need FKUI's features plus additional functionality
- **Maintenance:** Medium - may need updates on FKUI changes

### 4. Composition Pattern 🧩

**Multiple FKUI components, one domain component**

Combines multiple FKUI components into a higher-level, domain-specific component.

- **Component:** `EhmSearchBox` (composes `FTextField` + `FCrudButton` + `FExpandable`)
- **Code:** ~150 lines
- **Use Case:** When you need to combine multiple FKUI components into a pattern
- **Maintenance:** High - likely needs updates on FKUI changes

## Tech Stack

- **Vue 3** (Composition API + `<script setup>`)
- **TypeScript**
- **Vite** (build tool + dev server)
- **Vue Router** (routing for demo and docs)
- **FKUI packages:** `@fkui/vue`, `@fkui/design`, `@fkui/logic`, `@fkui/date`, `@fkui/theme-default`

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/pattespatte/ehmds-on-fkui-test.git
cd ehmds-on-fkui-test

# Install dependencies
npm install
```

### Running the Demo

```bash
# Start the demo app (includes component demos and documentation)
npm run demo

# Build for production
npm run build
```

The demo app serves both:
- **Interactive component demos** at `/`
- **Documentation pages** at `/docs/*`

## Project Structure

```
src/
├── components/
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
```

## Available Scripts

```bash
npm install              # Install dependencies
npm run demo             # Start demo app (includes demos and docs)
npm run build            # Build design system for production
npm run preview          # Preview production build
npm run lint             # Lint code (ESLint)
npm run lint:fix         # Auto-fix linting issues
npm run update:fkui-deps # Update FKUI dependencies to latest
```

## Component Catalog

| EHMDS Component | Pattern | FKUI Component(s) | Status |
|-----------------|---------|-------------------|--------|
| `EhmBadge` | Token Override | `FBadge` | ✅ Implemented |
| `EhmCard` | Wrapper | `FCard` | ✅ Implemented |
| `EhmTextField` | Extension | `FTextField` | ✅ Implemented |
| `EhmSearchBox` | Composition | `FTextField` + `FCrudButton` + `FExpandable` | ✅ Implemented |

## FKUI Integration

**Important:** EHMDS components actually USE FKUI components at runtime. This is not just a CSS dependency - the FKUI Vue components are instantiated and rendered.

FKUI components are imported from `@fkui/vue`:

```javascript
import { FCard, FTextField, FCrudButton, FExpandable, FBadge } from '@fkui/vue';
```

## Documentation

Detailed architecture documentation is available in the `/docs` directory:

- [Architecture Overview](./docs/architecture/overview.md)
- [Pattern Comparison](./docs/architecture/comparison.md)
- [Token Override Pattern](./docs/architecture/token-override.md)
- [Wrapper Pattern](./docs/architecture/wrapper.md)
- [Extension Pattern](./docs/architecture/extension.md)
- [Composition Pattern](./docs/architecture/composition.md)

## Design Decisions

See [Architecture Overview](./docs/architecture/overview.md) for detailed ADRs (Architecture Decision Records):

1. **Layered Architecture** - EHMDS sits between app and FKUI
2. **Multiple Patterns** - Demonstrate all four patterns, not just one
3. **Prefix Convention** - `Ehm` prefix distinguishes from FKUI components
4. **Real FKUI Usage** - Components actually instantiate FKUI, not just CSS

## Contributing

When adding new components to EHMDS:

1. **Choose the appropriate pattern** based on your needs
2. **Follow the conventions** for that pattern
3. **Document your decision** in an ADR (Architecture Decision Record)
4. **Add to this catalog** with the pattern used
5. **Test against FKUI updates** to ensure compatibility

## Resources

- [FKUI Documentation](https://designsystem.forsakringskassan.se/)
- [FKUI GitHub](https://github.com/Forsakringskassan/designsystem)
- [Vue 3 Documentation](https://vuejs.org/)

## License

MIT - see [LICENSE](LICENSE) for details.

---

Built with ❤️ as a proof-of-concept for layered design system architecture
