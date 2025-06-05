# EHMDS Design System

## 📑 Table of Contents

- [EHMDS Design System](#ehmds-design-system)
  - [📑 Table of Contents](#-table-of-contents)
  - [🚀 Features](#-features)
  - [📦 Installation](#-installation)
  - [🛠️ Usage](#️-usage)
    - [Global Installation (Recommended)](#global-installation-recommended)
    - [Individual Component Imports](#individual-component-imports)
    - [Using Components](#using-components)
  - [🎨 Theming](#-theming)
    - [Default Theme](#default-theme)
    - [Custom Themes](#custom-themes)
    - [CSS Custom Properties](#css-custom-properties)
  - [🧩 Components](#-components)
    - [Button](#button)
      - [Props](#props)
      - [Variants](#variants)
      - [Events](#events)
    - [Card](#card)
  - [🏗️ Development](#️-development)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Available Scripts](#available-scripts)
    - [Project Structure](#project-structure)
  - [🚦 Browser Support](#-browser-support)
  - [📄 License](#-license)
  - [🤝 Contributing](#-contributing)
    - [Development Workflow](#development-workflow)
  - [📚 Documentation](#-documentation)
  - [🆘 Support](#-support)

> **Note:** EHMDS is built on top of [FKUI, Försäkringskassan Design System](https://github.com/Forsakringskassan/designsystem). For more details about the underlying design principles and components, see the official FKUI repository.

## 🚀 Features

- **Vue 3 Components**: Modern composition API with full TypeScript support
- **FKUI Foundation**: Built on the robust FKUI design system
- **Custom Theming**: Flexible theming system with CSS custom properties
- **Vite Powered**: Fast development server and optimized production builds
- **Accessible**: WCAG compliant components with focus management
- **Responsive**: Mobile-first responsive design patterns
- **Tree Shakeable**: Import only the components you need

## 📦 Installation

```bash
npm install
```

## 🛠️ Usage

### Global Installation (Recommended)

```javascript
import { createApp } from 'vue'
import EHMDS from '@ehmds/design-system'
import App from './App.vue'

const app = createApp(App)

// Install EHMDS with default theme
app.use(EHMDS)

// Or install with custom theme options
app.use(EHMDS, {
  theme: {
    colors: {
      primary: '#your-brand-color'
    }
  }
})

app.mount('#app')
```

### Individual Component Imports

```javascript
import { Button } from '@ehmds/design-system'

export default {
  components: {
    Button
  }
}
```

### Using Components

```vue
<template>
  <div>
    <!-- Basic button -->
    <Button label="Click me" @click="handleClick" />
    
    <!-- EHMDS custom variant with enhancements -->
    <Button 
      variant="ehmds-primary" 
      size="large"
      rounded
      shadow
      @click="handleClick"
    >
      Enhanced Button
    </Button>
    
    <!-- Full width button -->
    <Button 
      label="Full Width"
      variant="ehmds-accent"
      full-width
    />
  </div>
</template>
```

## 🎨 Theming

EHMDS uses CSS custom properties for theming, making it easy to customize colors, typography, and spacing.

### Default Theme

The default theme includes:

- **Colors**: Primary, secondary, accent, and semantic color palettes
- **Typography**: Inter font family with responsive type scale
- **Spacing**: 8px grid system for consistent layouts
- **Shadows**: Elevation system for depth and hierarchy
- **Border Radius**: Consistent rounded corner system

### Custom Themes

Create your own theme by extending the default:

```javascript
import { defaultTheme } from '@ehmds/design-system'

const customTheme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    primary: '#your-primary-color',
    secondary: '#your-secondary-color'
  }
}
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

## 🧩 Components

### Button

Enhanced button component based on FKUI's button with additional EHMDS styling options.

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

**FKUI Variants:**

- `primary`, `secondary`, `tertiary`
- `success`, `warning`, `error`

**EHMDS Custom Variants:**

- `ehmds-primary` - EHMDS primary brand color
- `ehmds-secondary` - EHMDS secondary brand color  
- `ehmds-accent` - EHMDS accent color

#### Events

| Event | Description |
|-------|-------------|
| `click` | Emitted when button is clicked |

### Card

Card component for displaying content with optional header and footer.

## 🏗️ Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Setup

```bash
# Clone the repository
git clone https://github.com/pattespatte/ehmds-design-system.git
cd ehmds-design-system

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run build:watch  # Build in watch mode

# Code Quality
npm run lint         # Lint code
npm run lint:fix     # Fix linting issues
```

### Project Structure

```
src/
├── components/          # Vue components
│   └── Button.vue       # Enhanced button component
│   └── Card.vue         # Card component
├── assets/              # Global styles and assets
│   ├── global.css       # Global CSS with custom properties
│   └── variables.scss   # SCSS variables and mixins
├── themes/              # Theme configurations
│   └── default.js       # Default EHMDS theme
└── index.js             # Main entry point
```

## 🚦 Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

We welcome contributions!

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Run linting and tests
6. Submit a pull request

## 📚 Documentation

For detailed documentation and examples, visit our [Storybook](https://pattespatte.github.io/ehmds-design-system).

## 🆘 Support

- [GitHub Issues](https://github.com/pattespatte/ehmds-design-system/issues)
- [Discussions](https://github.com/pattespatte/ehmds-design-system/discussions)
- Email: <design-system@pattespatte.com>

---

Built with ❤️ by the EHMDS Team
