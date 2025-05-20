# EHDS-on-FKUI-Test

A proof-of-concept for creating a design system based on [FKUI](https://github.com/Forsakringskassan/designsystem). This repository demonstrates how to build, package, and distribute a design system that integrates with Vue 2 and FKUI components.

## Table of Contents

- [EHDS-on-FKUI-Test](#ehds-on-fkui-test)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Build the Package](#build-the-package)
    - [Import Components](#import-components)
  - [Development](#development)
    - [Rollup Configuration](#rollup-configuration)
  - [Testing](#testing)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- **Modular Components:** Export individual components (e.g., `Button`) for targeted usage.
- **Theme Management:** Built-in support for theming (default theme and a `ThemeProvider`).
- **Rollup-based Build:** Bundles both CommonJS and ES Module formats.
- **Vue Integration:** Built and tested using Vue 2 and [FKUI Vue](https://www.npmjs.com/package/@fkui/vue).

## Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/ehmds-on-fkui-test.git
   cd ehmds-on-fkui-test
   ```

2. **Install Dependencies**

   Make sure you have [Node.js](https://nodejs.org/) installed, then run:

   ```bash
   npm install
   ```

3. **Peer Dependencies**

   This project requires Vue 2 and FKUI Vue. Ensure you have these installed in your consuming project:

   ```bash
   npm install vue @fkui/vue
   ```

## Usage

After building the package, you can import and use the components in your Vue application.

### Build the Package

To create the production build:

```bash
npm run build
```

The build creates the following files:

- `dist/index.js` - CommonJS bundle
- `dist/index.esm.js` - ES Module bundle
- `css/styles.css` - Compiled and minified CSS for the design system

### Import Components

For example, to import the `Button` component:

```js
// In your Vue application
import Vue from 'vue';
import { Button, ThemeProvider, defaultTheme } from 'ehmds-on-fkui-test';

Vue.component('Button', Button);

// Optionally wrap your application with ThemeProvider
new Vue({
  render: h => h(ThemeProvider, { props: { theme: defaultTheme } }, [
    h(App)
  ]),
}).$mount('#app');
```

Make sure your build system can handle Vue single-file components and CSS imports appropriately.

## Development

To start in development mode with live rebuilding:

```bash
npm run dev
```

This watches for file changes and rebuilds the project automatically using the Rollup configuration.

### Rollup Configuration

The build is configured with Rollup as defined in `rollup.config.js`, which includes:

- **Resolve & CommonJS:** Handling module resolution.
- **Babel:** Transpiling ES6 code.
- **Vue plugin:** Processing Vue components (including template compilation and CSS extraction).
- **PostCSS:** Extracting and minifying CSS.
- **Terser:** Code minification for production builds.

## Testing

Unit tests are written using [Jest](https://jestjs.io/). To run tests, execute:

```bash
npm run test
```

## Contributing

Contributions are welcome! If you encounter any bugs or have suggestions to improve the design system, please:

1. Open an issue to discuss your idea.
2. Fork the repository.
3. Create a feature branch.
4. Submit a pull request detailing your changes.

## License

This project is open source. See the [LICENSE](LICENSE) file for more information.