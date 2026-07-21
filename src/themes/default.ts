/**
 * EHMDS Default Theme Configuration
 *
 * Visual design based on EHMDS design system.
 * Extends and customizes FKUI's design tokens
 * with EHMDS-specific styling and branding.
 */

import type { Theme, CSSVariables } from "./types";

export const defaultTheme: Theme = {
  name: "ehmds-default",

  colors: {
    // Primary brand color (EHM blue-950 — saturated navy, distinct from FKUI)
    primary: "#05264C",
    primaryLight: "#02478A",
    primaryDark: "#021A3A",
    primaryContrast: "#ffffff",

    // Secondary brand color (cool slate)
    secondary: "#4a5568",
    secondaryLight: "#718096",
    secondaryDark: "#2d3748",
    secondaryContrast: "#ffffff",

    // Accent color (EHM blue-700 — action blue)
    accent: "#0053A7",
    accentLight: "#02478A",
    accentDark: "#05264C",
    accentContrast: "#ffffff",

    // Semantic colors (EHM functional palette — red/green/yellow families).
    // Base values are chosen so BOTH white-on-color AND color-on-page-bg
    // (#f5f7fa, not pure white — which pushes borderline grays below threshold)
    // pass WCAG 1.4.3 (4.5:1). The ONE exception is `warning` (EHM yellow-400
    // #FFC108), which is vivid and only passes as a background with white text;
    // for warning text/borders on light surfaces use `warningDark` (yellow-800
    // #943D0C). Sources: green-700/500/900, yellow-400/100/800, red-700/500/800.
    // These must match src/assets/global.css :root — the two are a shared source
    // of truth for the theme.
    success: "#217424",
    successLight: "#34B339",
    successDark: "#1B4C1E",

    warning: "#FFC108",
    warningLight: "#FFF3C6",
    warningDark: "#943D0C",

    error: "#C7311A",
    errorLight: "#F35840",
    errorDark: "#9C2A18",

    // Neutral colors (cool blue-gray)
    neutral: {
      50: "#f8f9fc",
      100: "#edf0f5",
      200: "#d0d5e0",
      300: "#b0b8c9",
      400: "#8892a6",
      500: "#636e85",
      600: "#3d4663",
      700: "#2a3150",
      800: "#1a2040",
      900: "#05264C", // tracks primary
    },

    // Focus color for accessibility
    focus: "#05264C",

    // Background colors
    background: {
      primary: "#ffffff",
      secondary: "#f5f7fa",
      tertiary: "#edf0f5",
    },

    // Text colors
    text: {
      primary: "#05264C", // tracks primary
      secondary: "#3d4663",
      tertiary: "#636e85",
      inverse: "#ffffff",
    },
  },

  // Typography scale (EHMDS-based)
  typography: {
    fontFamily: {
      primary:
        '"Public Sans", "Noto Sans", Arial, system-ui, -apple-system, "Segoe UI", "Helvetica Neue", sans-serif',
      mono: '"Fira Code", "Monaco", "Cascadia Code", "Roboto Mono", monospace',
    },

    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "2.375rem", // 38px (EHMDS display-lg)
      "4xl": "2.25rem", // 36px
      "5xl": "3rem", // 48px
    },

    fontWeight: {
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },

    lineHeight: {
      tight: "1.25",
      normal: "1.5",
      relaxed: "1.75",
    },
  },

  // Spacing scale (4px base, EHMDS standard)
  spacing: {
    0: "0",
    1: "0.25rem", // 4px
    2: "0.5rem", // 8px
    3: "0.75rem", // 12px
    4: "1rem", // 16px
    5: "1.25rem", // 20px
    6: "1.5rem", // 24px
    8: "2rem", // 32px
    10: "2.5rem", // 40px
    12: "3rem", // 48px
    16: "4rem", // 64px
    20: "5rem", // 80px
    24: "6rem", // 96px
  },

  // Border radius scale (8px standard per EHMDS)
  borderRadius: {
    none: "0",
    small: "0.25rem", // 4px
    medium: "0.5rem", // 8px
    large: "0.5rem", // 8px (same as medium)
    xl: "0.75rem", // 12px
    full: "9999px",
  },

  // Shadow system
  shadows: {
    small: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    medium:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    large:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },

  // Animation and transitions
  animation: {
    transitionDuration: "150ms",
    transitionTiming: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDurationSlow: "300ms",
    transitionDurationFast: "75ms",
  },

  // Breakpoints for responsive design
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },

  // Z-index scale
  zIndex: {
    hide: -1,
    auto: "auto",
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
};

/**
 * Generate CSS custom properties from theme object
 * @param theme - Theme configuration object
 * @returns CSS custom properties
 */
export function generateCSSVariables(theme: Partial<Theme>): CSSVariables {
  const cssVars: CSSVariables = {};

  if (!theme.colors) return cssVars;

  // Colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        cssVars[`--ehmds-color-${key}-${subKey}`] = subValue as string;
      });
    } else {
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      cssVars[`--ehmds-color-${kebabKey}`] = value as string;
    }
  });

  if (theme.typography) {
    // Typography
    Object.entries(theme.typography.fontFamily).forEach(([key, value]) => {
      cssVars[`--ehmds-font-family-${key}`] = value;
    });

    Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
      cssVars[`--ehmds-font-size-${key}`] = value;
    });

    Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
      cssVars[`--ehmds-font-weight-${key}`] = value;
    });

    Object.entries(theme.typography.lineHeight).forEach(([key, value]) => {
      cssVars[`--ehmds-line-height-${key}`] = value;
    });
  }

  if (theme.spacing) {
    // Spacing
    Object.entries(theme.spacing).forEach(([key, value]) => {
      cssVars[`--ehmds-spacing-${key}`] = value;
    });
  }

  if (theme.borderRadius) {
    // Border radius
    Object.entries(theme.borderRadius).forEach(([key, value]) => {
      cssVars[`--ehmds-border-radius-${key}`] = value;
    });
  }

  if (theme.shadows) {
    // Shadows
    Object.entries(theme.shadows).forEach(([key, value]) => {
      cssVars[`--ehmds-shadow-${key}`] = value;
    });
  }

  if (theme.animation) {
    // Animation
    Object.entries(theme.animation).forEach(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      cssVars[`--ehmds-${kebabKey}`] = value;
    });
  }

  // Add commonly used combinations
  if (theme.typography?.fontFamily) {
    cssVars["--ehmds-font-family"] = theme.typography.fontFamily.primary;
  }
  if (theme.animation) {
    cssVars["--ehmds-transition-duration"] = theme.animation.transitionDuration;
    cssVars["--ehmds-transition-timing"] = theme.animation.transitionTiming;
  }

  return cssVars;
}

export default defaultTheme;
