<template>
  <!-- Token Override Pattern: Use FBadge as-is with CSS token overrides -->
  <FBadge
    v-bind="$attrs"
    :status="mappedStatus"
    :inverted="inverted"
    class="ehm-badge"
  >
    <slot />
  </FBadge>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FBadge } from "@fkui/vue";

type BadgeStatus =
  | "default"
  | "warning"
  | "error"
  | "success"
  | "info"
  | "brand"
  | "neutral";

/**
 * EhmBadge - Token Override Pattern
 *
 * This component uses FKUI's FBadge component AS-IS, only overriding
 * CSS custom properties (tokens) to change its appearance.
 *
 * Architecture: TOKEN OVERRIDE
 * - Uses: FBadge from @fkui/vue without modification
 * - Changes: Only CSS custom properties via scoped styles
 * - API: Same as FBadge, with optional EHMDS status mapping
 * - Use case: When you want FKUI behavior but different styling
 *
 * Key difference from other patterns:
 * - Wrapper: Changes API, may change implementation
 * - Extension: Adds new features to FKUI component
 * - Composition: Combines multiple FKUI components
 * - Token Override: ONLY changes CSS variables, same component
 */

defineOptions({
  name: "EhmBadge",
  inheritAttrs: true, // Pass all attrs through to FBadge
});

/**
 * EHMDS can optionally define its own status values
 * that map to FKUI's status values
 */
interface EhmBadgeProps {
  /**
   * EHMDS-specific status values (map to FKUI statuses)
   * EHMDS: 'brand' | 'info' | 'neutral'
   * FKUI: 'default' | 'warning' | 'error' | 'success' | 'info'
   */
  status?: BadgeStatus;
  /** Inverted color scheme (passed to FBadge) */
  inverted?: boolean;
}

const props = withDefaults(defineProps<EhmBadgeProps>(), {
  status: "default",
  inverted: false,
});

type FkuiBadgeStatus = "default" | "warning" | "error" | "success" | "info";

/**
 * Map EHMDS status values to FKUI status values
 * This allows EHMDS to have its own status naming convention
 * while using FBadge's implementation
 */
const mappedStatus = computed<FkuiBadgeStatus>(() => {
  const statusMap: Record<string, FkuiBadgeStatus> = {
    // EHMDS -> FKUI mapping
    brand: "default", // Use FBadge's default but override with brand colors
    neutral: "info", // Use FBadge's info but override with neutral colors
  };
  return statusMap[props.status] || (props.status as FkuiBadgeStatus);
});

defineEmits<{
  // FBadge doesn't emit events, but we include for consistency
}>();
</script>

<style scoped>
/**
 * TOKEN OVERRIDE PATTERN
 *
 * This component demonstrates the token override approach:
 * - FBadge component is used as-is
 * - Only CSS custom properties are overridden
 * - No props are transformed (except optional status mapping)
 * - Component behavior is identical to FKUI
 */

/* ============================================
   FKUI Token Overrides for EHMDS Brand Colors

   FKUI uses these CSS variables for badges:
   - --fkds-color-feedback-background-*
   - --fkds-color-text-primary
   - --fkds-color-text-inverted
   ============================================ */

/* Override FKUI badge styles when status="brand" (EHMDS custom) */
/* Note: FBadge renders with class like badge--default */
.ehm-badge:deep(.badge--default) {
  /* Token overrides for brand styling - override FKUI's neutral feedback colors */
  --fkds-color-feedback-background-neutral-strong: var(
    --ehmds-color-primary,
    #081130
  ) !important;
  --fkds-color-feedback-border-neutral-strong: var(
    --ehmds-color-primary,
    #081130
  ) !important;
  --fkds-color-text-primary: var(
    --ehmds-color-primary-contrast,
    #ffffff
  ) !important;
}

/* Override for neutral status (maps to FBadge's info) */
.ehm-badge:deep(.badge--info) {
  /* Token overrides for neutral styling */
  --fkds-color-feedback-background-info-strong: var(
    --ehmds-color-neutral-200,
    #d0d5e0
  ) !important;
  --fkds-color-feedback-border-info-strong: var(
    --ehmds-color-neutral-200,
    #d0d5e0
  ) !important;
  --fkds-color-text-inverted: var(
    --ehmds-color-text-primary,
    #081130
  ) !important;
}

/* Override for error status (use EHMDS error color) */
.ehm-badge:deep(.badge--error) {
  --fkds-color-feedback-background-negative-strong: var(
    --ehmds-color-error,
    #ef4444
  ) !important;
  --fkds-color-feedback-border-negative-strong: var(
    --ehmds-color-error,
    #ef4444
  ) !important;
}

/* Override for success status (use EHMDS success color) */
.ehm-badge:deep(.badge--success) {
  --fkds-color-feedback-background-positive-strong: var(
    --ehmds-color-success,
    #10b981
  ) !important;
  --fkds-color-feedback-border-positive-strong: var(
    --ehmds-color-success,
    #10b981
  ) !important;
}

/* Override for warning status (use EHMDS warning color) */
.ehm-badge:deep(.badge--warning) {
  --fkds-color-feedback-background-warning-strong: var(
    --ehmds-color-warning,
    #f59e0b
  ) !important;
  --fkds-color-feedback-border-warning-strong: var(
    --ehmds-color-warning,
    #f59e0b
  ) !important;
}

/* Inverted state overrides - default inverted */
.ehm-badge:deep(.badge--default-inverted) {
  --fkds-color-feedback-background-neutral: var(
    --ehmds-color-primary-light,
    #1a2a6c
  ) !important;
  --fkds-color-feedback-border-neutral: var(
    --ehmds-color-primary,
    #081130
  ) !important;
  --fkds-color-text-primary: var(
    --ehmds-color-primary-contrast,
    #ffffff
  ) !important;
}

/* Inverted state overrides - info inverted */
.ehm-badge:deep(.badge--info-inverted) {
  --fkds-color-feedback-background-info: var(
    --ehmds-color-neutral-100,
    #edf0f5
  ) !important;
  --fkds-color-feedback-border-info: var(
    --ehmds-color-neutral-300,
    #b0b8c9
  ) !important;
  --fkds-color-text-primary: var(
    --ehmds-color-text-primary,
    #081130
  ) !important;
}

/* Inverted state overrides - success inverted */
.ehm-badge:deep(.badge--success-inverted) {
  --fkds-color-feedback-background-positive: var(
    --ehmds-color-success-light,
    #34d399
  ) !important;
  --fkds-color-feedback-border-positive: var(
    --ehmds-color-success,
    #10b981
  ) !important;
  --fkds-color-text-primary: var(
    --ehmds-color-text-primary,
    #081130
  ) !important;
}

/* Additional EHMDS-specific styling (not token overrides, but cosmetic) */
.ehm-badge {
  /* Ensure EHMDS font stack is used */
  font-family: var(--ehmds-font-family, inherit);
  /* Optional: Slightly adjust border radius for EHMDS design */
  border-radius: var(--ehmds-border-radius-small, 4px);
}
</style>
