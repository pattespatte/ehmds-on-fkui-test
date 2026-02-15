# EHM Design System

**Vue 3 + TypeScript** Enhanced Design System based on FKUI - Build consistent and accessible applications with full type safety.

## Quick Start

```vue
<script setup lang="ts">
import { EhmCard, EhmBadge } from '@ehmds/design-system'
import type { CardVariant } from '@ehmds/design-system'
</script>

<template>
  <EhmCard title="Welcome" variant="elevated">
    <EhmBadge status="brand">Type-Safe</EhmBadge>
  </EhmCard>
</template>
```

## Documentation

### Guides

- [Getting Started](guide/getting-started.md) - Quick start guide with TypeScript examples
- [Installation](guide/installation.md) - Installation and setup instructions
- [Contributing](guide/contributing.md) - Contribution guidelines and development setup

### Architecture

- [Architecture Overview](architecture/overview.md) - High-level architecture overview
- [Architecture Theory](architecture/architecture-theory.md) - Architectural foundations
- [Pattern Comparison](architecture/comparison.md) - Compare all four patterns
- [Token Override Pattern](architecture/token-override.md) - CSS token overrides
- [Wrapper/Facade Pattern](architecture/wrapper.md) - API simplification pattern
- [Extension Pattern](architecture/extension.md) - Feature extension pattern
- [Composition Pattern](architecture/composition.md) - Component composition pattern
- [Accessibility Guidelines](architecture/accessibility.md) - WCAG compliance guide
- [FKUI Update Strategy](architecture/fkui-updates.md) - Managing FKUI dependencies

## TypeScript Support

EHMDS is built with **TypeScript** and provides:

- ✅ **Fully typed components** with IntelliSense support
- ✅ **Type-safe props** with validation
- ✅ **Typed theme system** with comprehensive definitions
- ✅ **Plugin type safety** for configuration
- ✅ **Declaration files** for IDE autocomplete

## Tech Stack

- **Vue 3** (Composition API + `<script setup>`)
- **TypeScript** (Strict mode enabled)
- **Vite** (Build tool + dev server)
- **FKUI** (Foundation design system)

## Component Catalog

| Component | Pattern | Status |
|-----------|---------|--------|
| `EhmBadge` | Token Override | ✅ |
| `EhmCard` | Wrapper | ✅ |
| `EhmTextField` | Extension | ✅ |
| `EhmSearchBox` | Composition | ✅ |
