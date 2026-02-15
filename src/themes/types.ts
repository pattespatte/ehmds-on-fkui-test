/**
 * EHMDS Theme Type Definitions
 */

export interface ThemeColors {
  primary: string
  primaryLight: string
  primaryDark: string
  primaryContrast: string
  secondary: string
  secondaryLight: string
  secondaryDark: string
  secondaryContrast: string
  accent: string
  accentLight: string
  accentDark: string
  accentContrast: string
  success: string
  successLight: string
  successDark: string
  warning: string
  warningLight: string
  warningDark: string
  error: string
  errorLight: string
  errorDark: string
  neutral: Record<number, string>
  focus: string
  background: {
    primary: string
    secondary: string
    tertiary: string
  }
  text: {
    primary: string
    secondary: string
    tertiary: string
    inverse: string
  }
}

export interface ThemeTypography {
  fontFamily: {
    primary: string
    mono: string
  }
  fontSize: Record<string, string>
  fontWeight: {
    light: string
    normal: string
    medium: string
    semibold: string
    bold: string
  }
  lineHeight: {
    tight: string
    normal: string
    relaxed: string
  }
}

export interface ThemeSpacing {
  0: string
  1: string
  2: string
  3: string
  4: string
  5: string
  6: string
  8: string
  10: string
  12: string
  16: string
  20: string
  24: string
}

export interface ThemeBorderRadius {
  none: string
  small: string
  medium: string
  large: string
  xl: string
  full: string
}

export interface ThemeShadows {
  small: string
  medium: string
  large: string
  xl: string
}

export interface ThemeAnimation {
  transitionDuration: string
  transitionTiming: string
  transitionDurationSlow: string
  transitionDurationFast: string
}

export interface ThemeBreakpoints {
  sm: string
  md: string
  lg: string
  xl: string
  '2xl': string
}

export interface ThemeZIndex {
  hide: number
  auto: string
  base: number
  docked: number
  dropdown: number
  sticky: number
  banner: number
  overlay: number
  modal: number
  popover: number
  skipLink: number
  toast: number
  tooltip: number
}

export interface Theme {
  name: string
  colors: ThemeColors
  typography: ThemeTypography
  spacing: ThemeSpacing
  borderRadius: ThemeBorderRadius
  shadows: ThemeShadows
  animation: ThemeAnimation
  breakpoints: ThemeBreakpoints
  zIndex: ThemeZIndex
}

export type CSSVariables = Record<string, string>

export interface PluginOptions {
  theme?: Partial<Theme>
}
