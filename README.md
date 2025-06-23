# EHM Design System

> **Note:** EHMDS is built on top of [FKUI, Försäkringskassan Design System](https://github.com/Forsakringskassan/designsystem). For more details about the underlying design principles and components, see the official FKUI repository.

## 📑 Table of Contents

- [EHM Design System](#ehm-design-system)
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
  - [How EHMDS Relies on FKUI](#how-ehmds-relies-on-fkui)
    - [1. **CSS Dependencies Only**](#1-css-dependencies-only)
    - [2. **Design Token Compatibility**](#2-design-token-compatibility)
    - [3. **Package Dependencies**](#3-package-dependencies)
  - [What Happens If You Remove FKUI Entirely?](#what-happens-if-you-remove-fkui-entirely)
    - [1. **Button Component** ✅](#1-button-component-)
    - [2. **Card Component** ✅](#2-card-component-)
    - [3. **Theme System** ✅](#3-theme-system-)
  - [What the Components Will Look Like Without FKUI](#what-the-components-will-look-like-without-fkui)
    - [Button Component](#button-component)
    - [Card Component](#card-component)
  - [To Remove FKUI Completely](#to-remove-fkui-completely)
  - [Conclusion](#conclusion)
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
npm run build             # Build for production (Vite)
npm run build:watch       # Build in watch mode
npm run preview           # Preview production build
npm run demo              # Start demo app (Vite, demo config)
npm run demo:preview      # Preview demo app production build
npm run lint              # Lint code (ESLint for .vue, .js, .ts)
npm run lint:fix          # Fix linting issues
npm run docs:dev          # Start local docs server (VitePress)
npm run docs:build        # Build documentation (VitePress)
npm run docs:preview      # Preview built documentation
npm run docs:deploy       # Deploy documentation to GitHub Pages
npm run update:fkui-deps  # Update FKUI dependencies (runs scripts/update-fkui-deps.js)
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

## How EHMDS Relies on FKUI

The EHM Design System has a **minimal dependency** on FKUI, which is primarily **cosmetic and structural** rather than functional:

### 1. **CSS Dependencies Only**

The main FKUI dependencies are in `src/assets/global.css`:

```css
@import "@fkui/design/lib/fkui.css";
@import "@fkui/theme-default/dist/fkui-css-variables.css";
```

### 2. **Design Token Compatibility**

- The Button component defines `FKUI_VARIANTS` that include standard FKUI button variants: `['primary', 'secondary', 'tertiary', 'success', 'warning', 'error']`
- The theme system is designed to be "FKUI compatible" but uses its own CSS custom properties
- No actual FKUI components are imported or used in the Vue components

### 3. **Package Dependencies**

The `package.json` includes FKUI packages as dependencies:

- `@fkui/date`, `@fkui/design`, `@fkui/logic`, `@fkui/theme-default`, `@fkui/vue`

## What Happens If You Remove FKUI Entirely?

**The components will continue to work perfectly!** Here's why:

### 1. **Button Component** ✅

- **All styling is self-contained** in the component's `<style scoped>` section
- Uses EHMDS CSS custom properties (e.g., `--ehmds-color-primary`, `--ehmds-border-radius`)
- FKUI variants are just string constants for validation
- **No FKUI imports or dependencies** in the actual component logic

### 2. **Card Component** ✅

- **Completely self-contained** with its own styling
- Uses EHMDS CSS custom properties
- **No FKUI dependencies whatsoever**

### 3. **Theme System** ✅

- The `default.js` theme is completely independent
- Generates EHMDS-specific CSS variables
- **No FKUI theme imports or dependencies**

## What the Components Will Look Like Without FKUI

### Button Component

```vue
<!-- This will work exactly the same -->
<EhmdsButton variant="primary">Primary Button</EhmdsButton>
<EhmdsButton variant="ehmds-primary">EHMDS Primary</EhmdsButton>
<EhmdsButton variant="success" rounded shadow>Success Button</EhmdsButton>
```

**Visual Result**: Identical appearance because:

- All colors are defined in EHMDS CSS variables
- All styling is in the component's scoped styles
- FKUI variants just map to the same EHMDS color variables

### Card Component

```vue
<!-- This will work exactly the same -->
<EhmdsCard title="My Card">
  <p>Card content</p>
</EhmdsCard>
```

**Visual Result**: Identical appearance because:

- All styling is self-contained
- Uses EHMDS design tokens
- No FKUI dependencies

## To Remove FKUI Completely

You would need to:

1. **Remove FKUI imports from `global.css`**:

```css
/* Remove these lines */
@import "@fkui/design/lib/fkui.css";
@import "@fkui/theme-default/dist/fkui-css-variables.css";
```

2. **Remove FKUI dependencies from `package.json`**:

```json
// Remove these lines
"@fkui/date": "^6.9.0",
"@fkui/design": "^6.9.0", 
"@fkui/logic": "^6.9.0",
"@fkui/theme-default": "^6.9.0",
"@fkui/vue": "^6.9.0"
```

3. **Update the demo config** to remove FKUI external dependency

## Conclusion

**EHMDS is essentially a standalone design system** that:

- Uses FKUI as a **design inspiration** and **naming convention**
- Maintains **FKUI compatibility** for easy migration
- Has **zero functional dependencies** on FKUI components
- Will work **identically** with or without FKUI installed

The FKUI dependency is more of a **branding and compatibility choice** rather than a technical requirement. Your components will look and function exactly the same if you remove FKUI entirely.

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
