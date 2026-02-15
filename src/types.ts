/**
 * EHM Design System - Type Definitions
 *
 * This file contains type definitions for the EHMDS plugin, components,
 * and utilities.
 */

import type { App } from 'vue'
import type { PluginOptions, Theme } from './themes/types'

/**
 * EHMDS Plugin Interface
 * Extends Vue's Plugin interface with EHMDS-specific options
 */
export interface EHMDSPlugin {
  install: (app: App, options?: PluginOptions) => void
}

/**
 * Component types exported by EHMDS
 * These are the actual Vue component types
 */
export type {
  // Components will be typed when imported
  // EhmCard,
  // EhmTextField,
  // EhmSearchBox,
  // EhmBadge,
} from './components/wrapper/EhmCard.vue'

/**
 * Global properties injected by EHMDS
 * Extends Vue's ComponentCustomProperties
 */
export interface EHMDSGlobalProperties {
  $ehmds: {
    theme: Partial<Theme>
    version: string
  }
}

/**
 * Component instances
 * Use these for template ref typing
 */
export interface EHMDSInstance {
  $ehmds: EHMDSGlobalProperties['$ehmds']
}

/**
 * EHMDS provide/inject keys
 */
export const EHMDS_THEME_KEY = Symbol('ehmdsTheme') as InjectionKey<Partial<Theme>>

import type { InjectionKey } from 'vue'

/**
 * Re-export theme types for convenience
 */
export type {
  Theme,
  ThemeColors,
  ThemeTypography,
  ThemeSpacing,
  ThemeBorderRadius,
  ThemeShadows,
  ThemeAnimation,
  ThemeBreakpoints,
  ThemeZIndex,
  CSSVariables,
  PluginOptions,
} from './themes/types'

/**
 * Common component prop types used across EHMDS
 */
export type { CardVariant } from './components/wrapper/EhmCard.vue'
export type { InputType, TextFieldVariant } from './components/extension/EhmTextField.vue'
export type { BadgeStatus } from './components/token-override/EhmBadge.vue'
