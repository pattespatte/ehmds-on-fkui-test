<template>
  <!--
    Token Override Pattern: FBadge is used AS-IS.
    No props are declared, no API is transformed — every prop/attr the consumer
    passes (status, inverted, ...) falls through to FBadge unchanged. The ONLY
    thing this component does is attach a class hook (`ehm-badge`) so the scoped
    <style> below can override FKUI's CSS custom properties.
  -->
  <FBadge class="ehm-badge">
    <slot />
  </FBadge>
</template>

<script setup lang="ts">
import { FBadge } from "@fkui/vue";

/**
 * EhmBadge - Token Override Pattern
 *
 * This component uses FKUI's FBadge component AS-IS. It declares no props of
 * its own and performs no API transformation — `status`, `inverted` and any
 * other attribute pass straight through to FBadge via Vue's attribute
 * fall-through (`inheritAttrs` is at its default of `true`).
 *
 * The ONLY thing this component adds is a class hook (`ehm-badge`) so that the
 * scoped <style> block can override FKUI's CSS custom properties (tokens) to
 * change FBadge's appearance to the EHMDS visual direction.
 *
 * Architecture: TOKEN OVERRIDE
 * - Uses: FBadge from @fkui/vue, unmodified
 * - Changes: Only CSS custom properties via scoped `:deep()` overrides
 * - API: Identical to FBadge — there is no EHMDS API surface at all
 * - Use case: When you want FBadge's behaviour but different styling
 *
 * Key difference from the other patterns:
 * - Wrapper:    reshapes the API (EhmCard)
 * - Extension:  adds new features (EhmTextField)
 * - Composition: combines multiple FKUI components (EhmSearchBox)
 * - Token Override (this): changes ONLY CSS variables, same component, same API
 */
defineOptions({
  name: "EhmBadge",
});
</script>

<style scoped>
/**
 * TOKEN OVERRIDE PATTERN
 *
 * FBadge is rendered exactly as FKUI ships it. We only override the CSS custom
 * properties (tokens) that FBadge consumes, so its appearance shifts to the
 * EHMDS navy/beige direction without touching its markup, props, or behaviour.
 *
 * FKUI emits a class per status: `badge--default`, `badge--info`,
 * `badge--success`, `badge--warning`, `badge--error` (and `*-inverted`).
 * These are the real class names as of @fkui/vue 6.x.
 */

/* --- status="default" → EHMDS brand (navy) ------------------------------ */
.ehm-badge :deep(.badge--default) {
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

/* --- status="info" → EHMDS neutral ------------------------------------- */
.ehm-badge :deep(.badge--info) {
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

/* --- status="error" ---------------------------------------------------- */
.ehm-badge :deep(.badge--error) {
  --fkds-color-feedback-background-negative-strong: var(
    --ehmds-color-error,
    #dc2626
  ) !important;
  --fkds-color-feedback-border-negative-strong: var(
    --ehmds-color-error,
    #dc2626
  ) !important;
}

/* --- status="success" -------------------------------------------------- */
.ehm-badge :deep(.badge--success) {
  --fkds-color-feedback-background-positive-strong: var(
    --ehmds-color-success,
    #059669
  ) !important;
  --fkds-color-feedback-border-positive-strong: var(
    --ehmds-color-success,
    #059669
  ) !important;
}

/* --- status="warning" -------------------------------------------------- */
.ehm-badge :deep(.badge--warning) {
  --fkds-color-feedback-background-warning-strong: var(
    --ehmds-color-warning,
    #d97706
  ) !important;
  --fkds-color-feedback-border-warning-strong: var(
    --ehmds-color-warning,
    #d97706
  ) !important;
}

/* --- inverted variants ------------------------------------------------- */
.ehm-badge :deep(.badge--default-inverted) {
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

.ehm-badge :deep(.badge--info-inverted) {
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

.ehm-badge :deep(.badge--success-inverted) {
  --fkds-color-feedback-background-positive: var(
    --ehmds-color-success-light,
    #34d399
  ) !important;
  --fkds-color-feedback-border-positive: var(
    --ehmds-color-success,
    #059669
  ) !important;
  --fkds-color-text-primary: var(
    --ehmds-color-text-primary,
    #081130
  ) !important;
}
</style>
