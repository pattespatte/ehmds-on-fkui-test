# Getting Started

Welcome to EHMDS (Enhanced Design System), built on top of FKUI.

## What is EHMDS?

EHMDS is a Vue 3 + TypeScript component library that extends [FKUI, Försäkringskassan Design System](https://github.com/Forsakringskassan/designsystem) with additional components and enhanced functionality.

## Quick Start

### Prerequisites

- Node.js 16+
- Vue 3.3+
- TypeScript 5+

### Installation

```bash
npm install @ehmds/design-system
```

### Basic Usage

```vue
<template>
  <div>
    <EhmCard variant="elevated" title="Welcome">
      <EhmBadge status="brand">New</EhmBadge>
      <p>Get started with EHMDS components!</p>
    </EhmCard>
  </div>
</template>

<script setup lang="ts">
import { EhmCard, EhmBadge } from '@ehmds/design-system'
import type { CardVariant } from '@ehmds/design-system'

const cardVariant: CardVariant = 'elevated'
</script>
```

### Development Setup

For local development:

```bash
# Clone the repository
git clone https://github.com/pattespatte/ehmds-on-fkui-test.git
cd ehmds-on-fkui-test

# Install dependencies
npm install

# Start the demo server
npm run demo

# Run type checking
npm run type-check

# Build the library
npm run build
```

## TypeScript Support

EHMDS is built with TypeScript and provides full type definitions:

- **Component Props**: All component props are fully typed
- **Theme Types**: Theme configuration with comprehensive type safety
- **Plugin Types**: Type-safe plugin installation
- **Auto-completion**: Full IDE support for component APIs

```typescript
import EHMDS from '@ehmds/design-system'
import type { PluginOptions, Theme } from '@ehmds/design-system'

const options: PluginOptions = {
  theme: {
    name: 'custom',
    colors: {
      primary: '#custom-color',
      // ... fully typed theme configuration
    }
  }
}

app.use(EHMDS, options)
```

## Next Steps

- [Installation Guide](/guide/installation)
- [Architecture Patterns](/architecture/overview)
- [Contributing Guidelines](/guide/contributing)
- [Component Documentation](/components/)
