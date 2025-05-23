/**
 * EHMDS Design System Entry Point
 * 
 * This file exports all components, themes, and utilities
 * for the EHMDS design system.
 */

// Import global styles
import './assets/global.css'

// Import components
import Button from './components/Button.vue'

// Import themes and utilities
import { defaultTheme, generateCSSVariables } from './themes/default.js'

// Component exports
export { Button }

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
    
    // Register components globally
    app.component('EhmdsButton', Button)
    
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