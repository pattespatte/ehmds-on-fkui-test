# Installation

Install EHMDS in your Vue 3 + TypeScript project.

## npm Installation

```bash
# Install from npm (when published)
npm install @ehmds/design-system
```

## Development Installation

For local development or contributing:

```bash
# Clone the repository
git clone https://github.com/pattespatte/ehmds-on-fkui-test.git
cd ehmds-on-fkui-test

# Install dependencies
npm install
```

## Usage

### Basic Setup

Import and use EHMDS in your Vue 3 application:

```vue
<!-- App.vue -->
<template>
  <EhmCard title="Welcome to EHMDS">
    <EhmBadge status="brand">Type-Safe</EhmBadge>
    <p>Build with TypeScript support!</p>
  </EhmCard>
</template>

<script setup lang="ts">
import { EhmCard, EhmBadge } from '@ehmds/design-system'
</script>
```

### Plugin Installation with Theme Options

```typescript
// main.ts
import { createApp } from 'vue'
import EHMDS from '@ehmds/design-system'
import type { PluginOptions } from '@ehmds/design-system'
import App from './App.vue'

const app = createApp(App)

// Configure EHMDS with custom theme
const options: PluginOptions = {
  theme: {
    name: 'custom',
    colors: {
      primary: '#custom-blue',
      secondary: '#custom-gray',
      // All theme properties are fully typed
    }
  }
}

app.use(EHMDS, options)
app.mount('#app')
```

### TypeScript Support

EHMDS provides comprehensive TypeScript support:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { EhmTextField } from '@ehmds/design-system'
import type { TextFieldVariant } from '@ehmds/design-system'

// Fully typed component props
const variant: TextFieldVariant = 'success'
const maxLength = 100

// Type-safe v-model
const textValue = ref<string>('')

// Type-safe event handlers
const handleSubmit = (): void => {
  console.log('Submitted:', textValue.value)
}
</script>

<template>
  <EhmTextField
    v-model="textValue"
    :variant="variant"
    :max-length="maxLength"
    label="Type-safe input"
    helper-text="All props are fully typed"
  />
</template>
```

### Import Individual Components

```typescript
// Import specific components and types
import {
  EhmCard,
  EhmTextField,
  EhmSearchBox,
  EhmBadge
} from '@ehmds/design-system'

// Import type definitions
import type {
  Theme,
  PluginOptions,
  CardVariant,
  TextFieldVariant,
  BadgeStatus
} from '@ehmds/design-system'
```

### CSS Import

EHMDS styles are automatically imported when using the plugin. For manual control:

```typescript
// Import styles separately if needed
import '@ehmds/design-system/dist/style.css'
```

## Peer Dependencies

EHMDS requires these peer dependencies:

```json
{
  "peerDependencies": {
    "vue": "^3.3.0"
  }
}
```

Ensure you have Vue 3.3+ installed in your project.

## Next Steps

- [Getting Started Guide](/guide/getting-started)
- [Component Documentation](/components/)
- [Architecture Patterns](/architecture/overview)
