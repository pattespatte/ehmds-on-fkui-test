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

<script setup>
import { computed } from "vue";
import { FBadge } from "@fkui/vue";

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
const props = defineProps({
	/**
	 * EHMDS-specific status values (map to FKUI statuses)
	 * EHMDS: 'brand' | 'info' | 'neutral'
	 * FKUI: 'default' | 'warning' | 'error' | 'success' | 'info'
	 */
	status: {
		type: String,
		required: false,
		default: "default",
		validator: (value) => {
			// Accept both FKUI and EHMDS status values
			const validValues = [
				// FKUI values (pass through)
				"default",
				"warning",
				"error",
				"success",
				"info",
				// EHMDS values (map to FKUI)
				"brand",
				"neutral",
			];
			return validValues.includes(value);
		},
	},

	/**
	 * Inverted color scheme (passed to FBadge)
	 */
	inverted: {
		type: Boolean,
		required: false,
		default: false,
	},
});

/**
 * Map EHMDS status values to FKUI status values
 * This allows EHMDS to have its own status naming convention
 * while using FBadge's implementation
 */
const mappedStatus = computed(() => {
	const statusMap = {
		// EHMDS -> FKUI mapping
		brand: "default", // Use FBadge's default but override with brand colors
		neutral: "info", // Use FBadge's info but override with neutral colors
	};
	return statusMap[props.status] || props.status;
});

defineEmits({
	// FBadge doesn't emit events, but we include for consistency
});
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
   ============================================ */

/* Override FKUI badge styles when status="brand" (EHMDS custom) */
/* Note: FBadge renders with class like c-badge--status-default */
.ehm-badge:deep(.c-badge--status-default) {
	/* Token overrides for brand styling */
	--fk-badge-background: var(--ehmds-color-primary, #2563eb) !important;
	--fk-badge-color: var(--ehmds-color-primary-contrast, #ffffff) !important;
}

/* Override for neutral status (maps to FBadge's info) */
.ehm-badge:deep(.c-badge--status-info) {
	/* Token overrides for neutral styling */
	--fk-badge-background: var(--ehmds-color-neutral-200, #e2e8f0) !important;
	--fk-badge-color: var(--ehmds-color-text-primary, #0f172a) !important;
}

/* Override for error status (use EHMDS error color) */
.ehm-badge:deep(.c-badge--status-error) {
	--fk-badge-background: var(--ehmds-color-error, #ef4444) !important;
	--fk-badge-color: var(--ehmds-color-error-contrast, #ffffff) !important;
}

/* Override for success status (use EHMDS success color) */
.ehm-badge:deep(.c-badge--status-success) {
	--fk-badge-background: var(--ehmds-color-success, #10b981) !important;
	--fk-badge-color: var(--ehmds-color-success-contrast, #ffffff) !important;
}

/* Override for warning status (use EHMDS warning color) */
.ehm-badge:deep(.c-badge--status-warning) {
	--fk-badge-background: var(--ehmds-color-warning, #f59e0b) !important;
	--fk-badge-color: var(--ehmds-color-warning-contrast, #212529) !important;
}

/* Inverted state overrides */
.ehm-badge:deep(.c-badge--inverted) {
	/* Swap foreground/background for inverted state */
	--fk-badge-background: var(--ehmds-color-background-primary, #ffffff) !important;
	--fk-badge-color: var(--ehmds-color-primary, #2563eb) !important;
}

/* Additional EHMDS-specific styling (not token overrides, but cosmetic) */
.ehm-badge {
	/* Ensure EHMDS font stack is used */
	font-family: var(--ehmds-font-family, inherit);
	/* Optional: Slightly adjust border radius for EHMDS design */
	border-radius: var(--ehmds-border-radius-small, 4px);
}
</style>
