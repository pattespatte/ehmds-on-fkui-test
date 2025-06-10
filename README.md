# EHMDS Design System

> **Note:** EHMDS is built on top of [FKUI, Försäkringskassan Design System](https://github.com/Forsakringskassan/designsystem). For more details about the underlying design principles and components, see the official FKUI repository.

## 📑 Table of Contents

- [EHMDS Design System](#ehmds-design-system)
  - [📑 Table of Contents](#-table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Basic Setup](#basic-setup)
    - [Usage Examples](#usage-examples)
      - [Global Registration](#global-registration)
      - [Individual Component Import](#individual-component-import)
  - [Components](#components)
    - [Button](#button)
      - [Props](#props)
      - [Variants](#variants)
      - [Example](#example)
    - [Card](#card)
  - [Theming](#theming)
    - [Default Theme](#default-theme)
    - [Custom Themes](#custom-themes)
    - [CSS Custom Properties](#css-custom-properties)
  - [Development](#development)
    - [Prerequisites](#prerequisites)
    - [Local Development](#local-development)
    - [Project Structure](#project-structure)
    - [Available Scripts](#available-scripts)
  - [Integration Guide](#integration-guide)
    - [Creating a New Vue App](#creating-a-new-vue-app)
    - [Installing EHMDS](#installing-ehmds)
    - [Configuration](#configuration)
    - [Building Your UI](#building-your-ui)
  - [Contributing](#contributing)
  - [Support](#support)
  - [License](#license)

## Overview

EHMDS is a Vue 3 design system built on top of FKUI (Försäkringskassan Design System). It provides enhanced components with additional styling options while maintaining full compatibility with FKUI's design tokens and principles.

## Features

- **Vue 3 Components**: Modern composition API with full TypeScript support
- **FKUI Foundation**: Built on the robust FKUI design system
- **Custom Theming**: Flexible theming system with CSS custom properties
- **Vite Powered**: Fast development server and optimized production builds
- **Accessible**: WCAG compliant components with focus management
- **Responsive**: Mobile-first responsive design patterns
- **Tree Shakeable**: Import only the components you need

## Getting Started

### Installation

```bash
# Install from npm (when published)
npm install @ehmds/design-system

# Or install directly from repository
npm install git+https://github.com/pattespatte/ehmds-design-system.git
```

### Basic Setup

Import and use EHMDS in your Vue 3 application:

```javascript
// main.js
import { createApp } from 'vue'
import EHMDS from '@ehmds/design-system'
import App from './App.vue'

const app = createApp(App)

// Install with default theme
app.use(EHMDS)

// Or install with custom theme
app.use(EHMDS, {
  theme: {
    colors: {
      primary: '#2563eb'
    }
  }
})

app.mount('#app')
```

### Usage Examples

#### Global Registration

After installing the plugin, all components are available globally:

```vue
<template>
  <div>
    <EhmdsButton label="Click me" variant="ehmds-primary" />
    <EhmdsCard header="Welcome">
      <p>Card content goes here</p>
    </EhmdsCard>
  </div>
</template>
```

#### Individual Component Import

For better tree-shaking, import components individually:

```vue
<script>
import { Button, Card } from '@ehmds/design-system'

export default {
  components: {
    Button,
    Card
  }
}
</script>
```

## Components

### Button

Enhanced button component based on FKUI's button with additional styling options.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | String | `'primary'` | Button variant (includes FKUI variants + EHMDS custom variants) |
| `size` | String | `'medium'` | Button size: `'small'`, `'medium'`, `'large'` |
| `label` | String | `''` | Button text content |
| `disabled` | Boolean | `false` | Disabled state |
| `rounded` | Boolean | `false` | Apply rounded corners (EHMDS enhancement) |
| `shadow` | Boolean | `false` | Apply shadow effect (EHMDS enhancement) |
| `fullWidth` | Boolean | `false` | Make button full width |

#### Variants

**FKUI Variants:** `primary`, `secondary`, `tertiary`, `success`, `warning`, `error`

**EHMDS Custom Variants:** `ehmds-primary`, `ehmds-secondary`, `ehmds-accent`

#### Example

```vue
<EhmdsButton 
  variant="ehmds-primary" 
  size="large"
  rounded
  shadow
  @click="handleClick"
>
  Enhanced Button
</EhmdsButton>
```

### Card

Card component for displaying content with optional header and footer.

```vue
<EhmdsCard 
  header="Card Title" 
  footer="Card Footer" 
  elevation="medium"
>
  <p>Card content</p>
</EhmdsCard>
```

## Theming

### Default Theme

The default theme includes:

- **Colors**: Primary, secondary, accent, and semantic color palettes
- **Typography**: Inter font family with responsive type scale
- **Spacing**: 8px grid system for consistent layouts
- **Shadows**: Elevation system for depth and hierarchy
- **Border Radius**: Consistent rounded corner system

### Custom Themes

Create custom themes by extending the default:

```javascript
import { defaultTheme } from '@ehmds/design-system'

const customTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#2563eb',      // FKUI Blue-600
    primaryLight: '#3b82f6', // FKUI Blue-500
    primaryDark: '#1d4ed8',  // FKUI Blue-700
  }
}

app.use(EHMDS, { theme: customTheme })
```

### CSS Custom Properties

All theme values are available as CSS custom properties:

```css
.my-component {
  background-color: var(--ehmds-color-primary);
  padding: var(--ehmds-spacing-4);
  border-radius: var(--ehmds-border-radius-large);
  box-shadow: var(--ehmds-shadow-medium);
}
```

## Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone https://github.com/pattespatte/ehmds-design-system.git
cd ehmds-design-system

# Install dependencies
npm install

# Start development server
npm run dev
```

### Project Structure

```
src/
├── components/          # Vue components
│   ├── Button.vue       # Enhanced button component
│   └── Card.vue         # Card component
├── assets/              # Global styles and assets
│   ├── global.css       # Global CSS with custom properties
│   └── variables.scss   # SCSS variables and mixins
├── themes/              # Theme configurations
│   └── default.js       # Default EHMDS theme
└── index.js             # Main entry point
```

### Available Scripts

```bash
npm run dev             # Start Vite dev server
npm run build           # Build for production
npm run preview         # Preview production build
npm run build:watch     # Build in watch mode
npm run lint            # Lint code
npm run lint:fix        # Fix linting issues
npm run test            # Run unit tests (if tests are present)
npm run test:watch      # Run unit tests in watch mode (if tests are present)
npm run update:fkui     # Update FKUI dependencies (runs scripts/update-fkui-deps.js)
```

- **npm run update:fkui**: Updates FKUI dependencies to the latest compatible versions by running `scripts/update-fkui-deps.js`. Use this to keep EHMDS in sync with upstream FKUI changes.

> **Note:** Some scripts (like `test` and `test:watch`) may only be available if test setup exists in your project.

## Integration Guide

### Creating a New Vue App

```bash
npm init vite@latest my-app -- --template vue
cd my-app
npm install
```

### Installing EHMDS

```bash
npm install git+https://github.com/pattespatte/ehmds-design-system.git
```

### Configuration

Configure your app to use EHMDS with FKUI theme compatibility:

```javascript
// main.js
import { createApp } from 'vue'
import EHMDS, { defaultTheme } from '@ehmds/design-system'
import App from './App.vue'

// Customize theme to match FKUI guidelines
const customTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#2563eb',      // FKUI Blue-600
    primaryLight: '#3b82f6', // FKUI Blue-500
    primaryDark: '#1d4ed8',  // FKUI Blue-700
  }
}

const app = createApp(App)
app.use(EHMDS, { theme: customTheme })
app.mount('#app')
```

### Building Your UI

```vue
<template>
  <div class="app">
    <h1>Welcome to EHMDS</h1>
    
    <EhmdsButton 
      label="Get Started" 
      variant="ehmds-primary" 
      rounded 
      shadow 
    />
    
    <EhmdsCard header="Features" elevation="medium">
      <p>Built on FKUI with enhanced components</p>
    </EhmdsCard>
  </div>
</template>

<style>
/* Import FKUI base styles if needed */
@import "~@fkui/design/dist/styles.css";

.app {
  padding: 2rem;
  font-family: var(--ehmds-font-family);
}
</style>
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For detailed guidelines, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Support

- 📚 [Documentation](https://pattespatte.github.io/ehmds-design-system)
- 🐛 [GitHub Issues](https://github.com/pattespatte/ehmds-design-system/issues)
- 💬 [Discussions](https://github.com/pattespatte/ehmds-design-system/discussions)
- 📧 Email: <design-system@pattespatte.com>

## License

MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by the EHMDS Team
