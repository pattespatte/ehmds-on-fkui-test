/**
 * EHM Design System Entry Point
 * 
 * This file exports all components, themes, and utilities
 * for the EHM Design System.
 */

// Import global styles
import './assets/global.css'

// Import components
import Button from './components/Button.vue'
import Card from './components/Card.vue'

// Import architectural pattern components
import EhmCard from './components/wrapper/EhmCard.vue'
import EhmTextField from './components/extension/EhmTextField.vue'
import EhmSearchBox from './components/composition/EhmSearchBox.vue'
import EhmBadge from './components/token-override/EhmBadge.vue'

// Import themes and utilities
import { defaultTheme, generateCSSVariables } from './themes/default.js'

// Component exports
export { Button, Card }

// Architectural pattern component exports
export { EhmCard, EhmTextField, EhmSearchBox, EhmBadge }

// Theme exports
export { defaultTheme, generateCSSVariables }

// Default export for install function (Vue plugin pattern)
export default {
  install(app, options = {}) {
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

    // Register original components globally
    app.component('EhmdsButton', Button)
    app.component('EhmdsCard', Card)

    // Register architectural pattern components globally
    app.component('EhmCard', EhmCard)
    app.component('EhmTextField', EhmTextField)
    app.component('EhmSearchBox', EhmSearchBox)
    app.component('EhmBadge', EhmBadge)

    // Provide theme context
    app.provide('ehmdsTheme', theme)

    // Add global properties
    app.config.globalProperties.$ehmds = {
      theme,
      version: __EHMDS_VERSION__ || '1.0.0'
    }
  }
}

// Named exports for component library
export const components = {
  Button
}

export const themes = {
  default: defaultTheme
}

export const utils = {
  generateCSSVariables
}

// Version
export const version = __EHMDS_VERSION__ || '1.0.0'