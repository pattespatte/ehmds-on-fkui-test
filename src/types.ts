/**
 * EHM Design System - Type Definitions
 *
 * This file contains type definitions for the EHMDS plugin, components,
 * and utilities.
 */

import type { App } from "vue";
import type { PluginOptions, Theme } from "./themes/types";

/**
 * EHMDS Plugin Interface
 * Extends Vue's Plugin interface with EHMDS-specific options
 */
export interface EHMDSPlugin {
  install: (app: App, options?: PluginOptions) => void;
}

/**
 * Component types exported by EHMDS
 *
 * Note: Types defined inside <script setup> are not automatically exported.
 * Re-export shared types here when components use separate type files.
 */

/**
 * Global properties injected by EHMDS
 * Extends Vue's ComponentCustomProperties
 */
export interface EHMDSGlobalProperties {
  $ehmds: {
    theme: Partial<Theme>;
    version: string;
  };
}

/**
 * Component instances
 * Use these for template ref typing
 */
export interface EHMDSInstance {
  $ehmds: EHMDSGlobalProperties["$ehmds"];
}

/**
 * EHMDS provide/inject keys
 */
export const EHMDS_THEME_KEY = Symbol("ehmdsTheme") as InjectionKey<
  Partial<Theme>
>;

import type { InjectionKey } from "vue";

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
} from "./themes/types";

/**
 * Common component prop types used across EHMDS
 *
 * These types are defined here because <script setup> components
 * don't automatically export their local types for re-export.
 */
export type CardVariant = "default" | "bordered" | "elevated" | "compact";
export type InputType =
  | "text"
  | "email"
  | "tel"
  | "url"
  | "password"
  | "number"
  | "search";
export type TextFieldVariant = "default" | "success" | "warning" | "error";
export type BadgeStatus =
  | "default"
  | "warning"
  | "error"
  | "success"
  | "info"
  | "brand"
  | "neutral";
