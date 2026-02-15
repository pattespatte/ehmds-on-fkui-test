<template>
	<!-- Wrapper pattern: EhmCard wraps FCard, exposing a simplified custom API -->
	<FCard
		:id="id"
		:focus-ref="errorRef"
		:class="cardClasses"
	>
		<!-- Transform EHMDS's simpler slot API to FCard's slots -->
		<template v-if="$slots.header" #header>
			<slot name="header">
				<h3 v-if="title">{{ title }}</h3>
				<p v-if="subtitle">{{ subtitle }}</p>
			</slot>
		</template>

		<!-- Main content slot -->
		<slot />

		<!-- Footer slot with optional actions -->
		<template v-if="$slots.footer" #footer>
			<div class="ehm-card__footer">
				<slot name="footer" />
			</div>
		</template>

		<!-- Pass through other FCard slots (actions, etc.) -->
		<template v-if="$slots.actions" #actions>
			<slot name="actions" />
		</template>
	</FCard>
</template>

<script setup lang="ts">
import { computed, type HTMLElement } from "vue";
import { FCard } from "@fkui/vue";

type CardVariant = "default" | "bordered" | "elevated" | "compact";

/**
 * EhmCard - Wrapper/Facade Pattern
 *
 * This component WRAPS FKUI's FCard component, exposing a simplified
 * EHMDS-specific API while hiding FCard's complexity.
 *
 * Architecture: WRAPPER/FACADE
 * - Wraps: FCard from @fkui/vue
 * - Custom API: Simplified props, different naming conventions
 * - Slots: Maps EHMDS slots to FCard slots
 * - Events: Forwards FCard events without transformation
 */

defineOptions({
	name: "EhmCard",
	inheritAttrs: false,
});

/**
 * EHMDS Custom API - simplified compared to FCard
 */
interface EhmCardProps {
	/** Optional unique identifier */
	id?: string;
	/** Convenience prop for card title (rendered in header slot if no header slot provided) */
	title?: string;
	/** Convenience prop for card subtitle (rendered in header slot if no header slot provided) */
	subtitle?: string;
	/** Visual variant for the card - EHMDS custom variants (not in FCard) */
	variant?: CardVariant;
	/** Whether this card is in an error state - When true, sets focusRef for validation */
	hasError?: boolean;
	/** Element ref to focus when card is in error state - This maps to FCard's focusRef prop */
	errorRef?: HTMLElement | null;
}

const props = withDefaults(defineProps<EhmCardProps>(), {
	variant: "default",
	hasError: false,
	errorRef: null,
});

/**
 * Emit all standard events that consumers might expect
 * These are forwarded from FCard without transformation
 */
interface EhmCardEmits {
	click: [event: MouseEvent];
}

const emit = defineEmits<EhmCardEmits>();

/**
 * Compute classes based on EHMDS variant system
 * This transforms EHMDS's "variant" prop to CSS classes
 */
const cardClasses = computed(() => {
	return {
		"ehm-card": true,
		"ehm-card--bordered": props.variant === "bordered",
		"ehm-card--elevated": props.variant === "elevated",
		"ehm-card--compact": props.variant === "compact",
		"ehm-card--error": props.hasError,
	};
});
</script>

<style scoped>
/* Wrapper pattern styles - override FCard defaults with EHMDS design */
.ehm-card {
	/* Base styles override FCard */
	border-radius: var(--ehmds-border-radius-large, 8px);
}

/* EHMDS variant styles - these don't exist in FCard */
.ehm-card--bordered {
	border: 2px solid var(--ehmds-color-neutral-300, #cbd5e1);
}

.ehm-card--elevated {
	box-shadow: var(--ehmds-shadow-large, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
}

.ehm-card--compact {
	padding: var(--ehmds-spacing-3, 0.75rem);
}

.ehm-card--error {
	border-color: var(--ehmds-color-error, #ef4444);
	box-shadow: 0 0 0 1px var(--ehmds-color-error, #ef4444);
}

.ehm-card__footer {
	display: flex;
	gap: var(--ehmds-spacing-2, 0.5rem);
	justify-content: flex-end;
}
</style>
