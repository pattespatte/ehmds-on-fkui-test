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
 * FBadge renders a single `<span class="badge badge--{status}">`. Because the
 * `class="ehm-badge"` hook we put on <FBadge> falls through to that SAME span
 * (FBadge has a single-root element), the override selectors below must use a
 * COMPOUND selector (`.ehm-badge.badge--default`) — NOT a descendant selector.
 *
 * A previous version used `.ehm-badge :deep(.badge--default)`, which compiles
 * to `.ehm-badge[data-v-x] .badge--default` (descendant combinator). That never
 * matched, because `.badge--default` is on the same element as `.ehm-badge`,
 * not nested inside it. The override was a silent no-op.
 *
 * The scoped-style data attribute lands on the last compound in the chain, so
 * `.ehm-badge.badge--default` compiles to `.ehm-badge.badge--default[data-v-x]`
 * and matches correctly. `!important` is still needed to win against FKUI's own
 * `.badge--default { background-color: ... }` rule (equal specificity, but the
 * scoped attribute would otherwise lose to load order in edge cases).
 *
 * FKUI emits a class per status: `badge--default`, `badge--info`,
 * `badge--success`, `badge--warning`, `badge--error` (and `*-inverted`).
 * These are the real class names as of @fkui/vue 6.x.
 */

/* --- status="default" → EHMDS brand (EHM blue-950 navy) ----------------- */
.ehm-badge.badge--default {
  --fkds-color-feedback-background-neutral-strong: var(
    --ehmds-color-primary,
    #05264c
  ) !important;
  --fkds-color-feedback-border-neutral-strong: var(
    --ehmds-color-primary,
    #05264c
  ) !important;
  --fkds-color-text-primary: var(
    --ehmds-color-primary-contrast,
    #ffffff
  ) !important;
}

/* --- status="info" → EHMDS blue (EHM blue-700) ------------------------- */
.ehm-badge.badge--info {
  --fkds-color-feedback-background-info-strong: var(
    --ehmds-color-accent,
    #0053a7
  ) !important;
  --fkds-color-feedback-border-info-strong: var(
    --ehmds-color-accent,
    #0053a7
  ) !important;
  --fkds-color-text-inverted: var(
    --ehmds-color-primary-contrast,
    #ffffff
  ) !important;
}

/* --- status="error" → EHM red-700 -------------------------------------- */
.ehm-badge.badge--error {
  --fkds-color-feedback-background-negative-strong: var(
    --ehmds-color-error,
    #c7311a
  ) !important;
  --fkds-color-feedback-border-negative-strong: var(
    --ehmds-color-error,
    #c7311a
  ) !important;
}

/* --- status="success" → EHM green-700 ---------------------------------- */
.ehm-badge.badge--success {
  --fkds-color-feedback-background-positive-strong: var(
    --ehmds-color-success,
    #217424
  ) !important;
  --fkds-color-feedback-border-positive-strong: var(
    --ehmds-color-success,
    #217424
  ) !important;
}

/* --- status="warning" → EHM yellow-400 (white text for 4.5:1) ----------- */
.ehm-badge.badge--warning {
  --fkds-color-feedback-background-warning-strong: var(
    --ehmds-color-warning,
    #ffc108
  ) !important;
  --fkds-color-feedback-border-warning-strong: var(
    --ehmds-color-warning,
    #ffc108
  ) !important;
}

/* --- inverted variants ------------------------------------------------- */
.ehm-badge.badge--default-inverted {
  --fkds-color-feedback-background-neutral: var(
    --ehmds-color-primary-light,
    #02478a
  ) !important;
  --fkds-color-feedback-border-neutral: var(
    --ehmds-color-primary,
    #05264c
  ) !important;
  --fkds-color-text-primary: var(
    --ehmds-color-primary-contrast,
    #ffffff
  ) !important;
}

.ehm-badge.badge--info-inverted {
  --fkds-color-feedback-background-info: #e7f2ff !important; /* EHM blue-50 */
  --fkds-color-feedback-border-info: var(
    --ehmds-color-accent,
    #0053a7
  ) !important;
  --fkds-color-text-primary: var(--ehmds-color-primary, #05264c) !important;
}

.ehm-badge.badge--success-inverted {
  /* green-100 (#E0F8E0) instead of the success-light token (green-500 #34B339):
     the EHM palette has no green-300, and green-500 was too dark to read as
     "bright success" on an inverted badge. Hardcoded here (not a token) per
     the "just fix success-inverted" decision — the success-light token stays
     green-500 for other consumers. Contrast: 13.45:1 with the navy text. */
  --fkds-color-feedback-background-positive: #e0f8e0 !important;
  --fkds-color-feedback-border-positive: var(
    --ehmds-color-success,
    #217424
  ) !important;
  --fkds-color-text-primary: var(
    --ehmds-color-text-primary,
    #05264c
  ) !important;
}
</style>
