/**
 * EHM Design System Entry Point
 *
 * This file exports all components, themes, and utilities
 * for the EHM Design System.
 */

import type { Plugin, App } from 'vue'
import type { PluginOptions } from './themes/types'

// Import global styles
import './assets/global.css'

// Import architectural pattern components
import EhmCard from './components/wrapper/EhmCard.vue'
import EhmTextField from './components/extension/EhmTextField.vue'
import EhmSearchBox from './components/composition/EhmSearchBox.vue'
import EhmBadge from './components/token-override/EhmBadge.vue'

// Import themes and utilities
import { defaultTheme, generateCSSVariables } from './themes/default'

// Architectural pattern component exports
export { EhmCard, EhmTextField, EhmSearchBox, EhmBadge }

// Theme exports
export { defaultTheme, generateCSSVariables }
export type { Theme, CSSVariables, PluginOptions } from './themes/types'

// Default export for install function (Vue plugin pattern)
const EHMDSPlugin: Plugin = {
  install(app: App, options: PluginOptions = {}) {
    // Merge user options with default theme
    const theme = { ...defaultTheme, ...options.theme }

    // Generate and apply CSS variables
    const cssVars = generateCSSVariables(theme)

    // Apply CSS variables to document root
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      Object.entries(cssVars).forEach(([property, value]) => {
        root.style.setProperty(property, value)
      })
    }

    // Register architectural pattern components globally
    app.component('EhmCard', EhmCard)
    app.component('EhmTextField', EhmTextField)
    app.component('EhmSearchBox', EhmSearchBox)
    app.component('EhmBadge', EhmBadge)

    // Provide theme context
    app.provide('ehmdsTheme', theme)

    // Add global properties
    // @ts-expect-error - Adding custom property to Vue app
    app.config.globalProperties.$ehmds = {
      theme,
      version: (globalThis as any).__EHMDS_VERSION__ || '1.0.0',
    }
  },
}

export default EHMDSPlugin

// Named exports for component library
export const components = {
  EhmCard,
  EhmTextField,
  EhmSearchBox,
  EhmBadge,
}

export const themes = {
  default: defaultTheme,
}

export const utils = {
  generateCSSVariables,
}

// Version
export const version = (globalThis as any).__EHMDS_VERSION__ || '1.0.0'
