/**
 * EHMDS Default Theme Configuration
 *
 * This theme extends and customizes FKUI's design tokens
 * with EHMDS-specific styling and branding.
 */

import type { Theme, CSSVariables } from './types'

export const defaultTheme: Theme = {
  name: 'ehmds-default',

  // Brand Colors - Primary palette for EHMDS
  colors: {
    // Primary brand color (can override FKUI primary)
    primary: '#2563eb', // Blue-600
    primaryLight: '#3b82f6', // Blue-500
    primaryDark: '#1d4ed8', // Blue-700
    primaryContrast: '#ffffff',

    // Secondary brand color
    secondary: '#64748b', // Slate-500
    secondaryLight: '#94a3b8', // Slate-400
    secondaryDark: '#475569', // Slate-600
    secondaryContrast: '#ffffff',

    // Accent color for highlights and CTAs
    accent: '#f59e0b', // Amber-500
    accentLight: '#fbbf24', // Amber-400
    accentDark: '#d97706', // Amber-600
    accentContrast: '#ffffff',

    // Semantic colors
    success: '#10b981', // Emerald-500
    successLight: '#34d399', // Emerald-400
    successDark: '#059669', // Emerald-600

    warning: '#f59e0b', // Amber-500
    warningLight: '#fbbf24', // Amber-400
    warningDark: '#d97706', // Amber-600

    error: '#ef4444', // Red-500
    errorLight: '#f87171', // Red-400
    errorDark: '#dc2626', // Red-600

    // Neutral colors
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },

    // Focus color for accessibility
    focus: '#3b82f6',

    // Background colors
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
    },

    // Text colors
    text: {
      primary: '#0f172a',
      secondary: '#475569',
      tertiary: '#64748b',
      inverse: '#ffffff',
    },
  },

  // Typography scale
  typography: {
    fontFamily: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"Fira Code", "Monaco", "Cascadia Code", "Roboto Mono", monospace',
    },

    fontSize: {
      xs: '0.75rem', // 12px
      sm: '0.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
    },

    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },

    lineHeight: {
      tight: '1.25',
      normal: '1.5',
      relaxed: '1.75',
    },
  },

  // Spacing scale (follows 8px grid system)
  spacing: {
    0: '0',
    1: '0.25rem', // 4px
    2: '0.5rem', // 8px
    3: '0.75rem', // 12px
    4: '1rem', // 16px
    5: '1.25rem', // 20px
    6: '1.5rem', // 24px
    8: '2rem', // 32px
    10: '2.5rem', // 40px
    12: '3rem', // 48px
    16: '4rem', // 64px
    20: '5rem', // 80px
    24: '6rem', // 96px
  },

  // Border radius scale
  borderRadius: {
    none: '0',
    small: '0.25rem', // 4px
    medium: '0.375rem', // 6px
    large: '0.5rem', // 8px
    xl: '0.75rem', // 12px
    full: '9999px',
  },

  // Shadow system
  shadows: {
    small: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    large: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  // Animation and transitions
  animation: {
    transitionDuration: '150ms',
    transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDurationSlow: '300ms',
    transitionDurationFast: '75ms',
  },

  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index scale
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },
}

/**
 * Generate CSS custom properties from theme object
 * @param theme - Theme configuration object
 * @returns CSS custom properties
 */
export function generateCSSVariables(theme: Partial<Theme>): CSSVariables {
  const cssVars: CSSVariables = {}

  if (!theme.colors) return cssVars

  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        cssVars[`--ehmds-color-${key}-${subKey}`] = subValue as string
      })
    } else {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      cssVars[`--ehmds-color-${kebabKey}`] = value as string
    }
  })

  if (theme.typography) {
    // Typography
    Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
      cssVars[`--ehmds-font-family-${key}`] = value
    })

    Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
      cssVars[`--ehmds-font-size-${key}`] = value
    })

    Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
      cssVars[`--ehmds-font-weight-${key}`] = value
    })

    Object.entries(theme.typography.lineHeight).forEach(([key, value]) => {
      cssVars[`--ehmds-line-height-${key}`] = value
    })
  }

  if (theme.spacing) {
    // Spacing
    Object.entries(theme.spacing).forEach(([key, value]) => {
      cssVars[`--ehmds-spacing-${key}`] = value
    })
  }

  if (theme.borderRadius) {
    // Border radius
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      cssVars[`--ehmds-border-radius-${key}`] = value
    })
  }

  if (theme.shadows) {
    // Shadows
    Object.entries(theme.shadows).forEach(([key, value]) => {
      cssVars[`--ehmds-shadow-${key}`] = value
    })
  }

  if (theme.animation) {
    // Animation
    Object.entries(theme.animation).forEach(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      cssVars[`--ehmds-${kebabKey}`] = value
    })
  }

  // Add commonly used combinations
  if (theme.typography?.fontFamily) {
    cssVars['--ehmds-font-family'] = theme.typography.fontFamily.primary
  }
  if (theme.animation) {
    cssVars['--ehmds-transition-duration'] = theme.animation.transitionDuration
    cssVars['--ehmds-transition-timing'] = theme.animation.transitionTiming
  }

  return cssVars
}

export default defaultTheme
