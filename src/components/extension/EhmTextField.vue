<template>
	<!-- Extension pattern: EhmTextField extends FTextField's functionality -->
	<div class="ehm-text-field" :class="fieldClasses">
		<label v-if="label" :for="inputId" class="ehm-text-field__label">
			{{ label }}
			<span v-if="required" class="ehm-text-field__required">*</span>
		</label>

		<!-- Extend FTextField with additional wrapper for EHMDS features -->
		<div class="ehm-text-field__input-wrapper">
			<!-- Prefix slot (EHMDS enhancement) -->
			<span v-if="$slots.prefix" class="ehm-text-field__prefix">
				<slot name="prefix" />
			</span>

			<!-- The extended FTextField component -->
			<FTextField
				:id="inputId"
				v-model="internalValue"
				:type="type"
				:placeholder="placeholder"
				:disabled="disabled"
				:readonly="readonly"
				:required="required"
				:inline="inline"
				:model-value="modelValue"
				@update:model-value="handleUpdate"
				@blur="handleBlur"
				@focus="handleFocus"
			/>

			<!-- Suffix slot (EHMDS enhancement) -->
			<span v-if="$slots.suffix" class="ehm-text-field__suffix">
				<slot name="suffix" />
			</span>

			<!-- Character count (EHMDS enhancement) -->
			<span
				v-if="showCharacterCount && maxLength"
				class="ehm-text-field__charcount"
			>
				{{ characterCountText }}
			</span>
		</div>

		<!-- Helper text (EHMDS enhancement) -->
		<p v-if="helperText && !hasError" class="ehm-text-field__helper">
			{{ helperText }}
		</p>

		<!-- Error message (EHMDS enhancement extending validation) -->
		<p v-if="hasError && errorMessage" class="ehm-text-field__error">
			{{ errorMessage }}
		</p>
	</div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { FTextField } from "@fkui/vue";

/**
 * EhmTextField - Extension Pattern
 *
 * This component EXTENDS FKUI's FTextField component with additional
 * EHMDS-specific features while preserving all FTextField functionality.
 *
 * Architecture: EXTENSION
 * - Extends: FTextField from @fkui/vue
 * - Adds: Character count, helper text, error states, prefix/suffix slots
 * - Preserves: All FTextField props, events, and behavior
 * - Use case: When you need FTextField's features plus additional functionality
 */

defineOptions({
	name: "EhmTextField",
	inheritAttrs: false,
});

/**
 * EHMDS Extended API - includes FTextField props plus EHMDS additions
 */
const props = defineProps({
	// === FTextField props (forwarded) ===
	/** Unique identifier for the input */
	id: {
		type: String,
		required: false,
		default: undefined,
	},
	/** Input value (v-model) */
	modelValue: {
		type: [String, Number],
		required: false,
		default: undefined,
	},
	/** Input type */
	type: {
		type: String,
		required: false,
		default: "text",
		validator: (value) =>
			["text", "email", "tel", "url", "password", "number", "search"].includes(
				value,
			),
	},
	/** Placeholder text */
	placeholder: {
		type: String,
		required: false,
		default: "",
	},
	/** Disabled state */
	disabled: {
		type: Boolean,
		required: false,
		default: false,
	},
	/** Readonly state */
	readonly: {
		type: Boolean,
		required: false,
		default: false,
	},
	/** Required field */
	required: {
		type: Boolean,
		required: false,
		default: false,
	},
	/** Display inline */
	inline: {
		type: Boolean,
		required: false,
		default: false,
	},

	// === EHMDS extensions ===
	/** Label text */
	label: {
		type: String,
		required: false,
		default: "",
	},
	/** Helper text displayed below input */
	helperText: {
		type: String,
		required: false,
		default: "",
	},
	/** Error message */
	errorMessage: {
		type: String,
		required: false,
		default: "",
	},
	/** Error state */
	hasError: {
		type: Boolean,
		required: false,
		default: false,
	},
	/** Maximum character length */
	maxLength: {
		type: Number,
		required: false,
		default: null,
	},
	/** Show character count */
	showCharacterCount: {
		type: Boolean,
		required: false,
		default: false,
	},
	/** Variant styling */
	variant: {
		type: String,
		required: false,
		default: "default",
		validator: (value) =>
			["default", "success", "warning", "error"].includes(value),
	},
});

const emit = defineEmits({
	"update:modelValue": (value) => true,
	focus: (event) => event instanceof FocusEvent,
	blur: (event) => event instanceof FocusEvent,
});

// === State ===
const isFocused = ref(false);
const internalValue = ref(props.modelValue);

// === Computed ===
const inputId = computed(() => props.id || `ehm-text-field-${Math.random().toString(36).slice(2, 11)}`);

const fieldClasses = computed(() => {
	return {
		"ehm-text-field--disabled": props.disabled,
		"ehm-text-field--readonly": props.readonly,
		"ehm-text-field--focused": isFocused.value,
		"ehm-text-field--error": props.hasError,
		"ehm-text-field--success": props.variant === "success",
		"ehm-text-field--warning": props.variant === "warning",
	};
});

const characterCountText = computed(() => {
	const currentLength = String(internalValue.value || "").length;
	return `${currentLength}/${props.maxLength}`;
});

// === Methods ===
const handleUpdate = (value) => {
	internalValue.value = value;
	emit("update:modelValue", value);
};

const handleFocus = (event) => {
	isFocused.value = true;
	emit("focus", event);
};

const handleBlur = (event) => {
	isFocused.value = false;
	emit("blur", event);
};

// === Watchers ===
// Keep internal value in sync with modelValue prop
watch(() => props.modelValue, (newValue) => {
	internalValue.value = newValue;
});

// Enforce maxLength
watch(internalValue, (newValue) => {
	if (props.maxLength && String(newValue || "").length > props.maxLength) {
		internalValue.value = String(newValue).slice(0, props.maxLength);
		emit("update:modelValue", internalValue.value);
	}
});
</script>

<style scoped>
/* Extension pattern styles - build upon FTextField base */
.ehm-text-field {
	display: flex;
	flex-direction: column;
	gap: var(--ehmds-spacing-1, 0.25rem);
	width: 100%;
}

.ehm-text-field__label {
	font-size: var(--ehmds-font-size-sm, 0.875rem);
	font-weight: var(--ehmds-font-weight-medium, 500);
	color: var(--ehmds-color-text-primary, #0f172a);
	display: flex;
	align-items: center;
	gap: var(--ehmds-spacing-1, 0.25rem);
}

.ehm-text-field__required {
	color: var(--ehmds-color-error, #ef4444);
}

.ehm-text-field__input-wrapper {
	display: flex;
	align-items: center;
	position: relative;
}

.ehm-text-field__prefix,
.ehm-text-field__suffix {
	display: flex;
	align-items: center;
	padding: 0 var(--ehmds-spacing-3, 0.75rem);
	color: var(--ehmds-color-text-tertiary, #64748b);
	background-color: var(--ehmds-color-neutral-100, #f1f5f9);
	border: 1px solid var(--ehmds-color-neutral-300, #cbd5e1);
	height: 100%;
}

.ehm-text-field__prefix {
	border-right: none;
	border-radius: var(--ehmds-border-radius-medium, 6px) 0 0 var(--ehmds-border-radius-medium, 6px);
}

.ehm-text-field__suffix {
	border-left: none;
	border-radius: 0 var(--ehmds-border-radius-medium, 6px) var(--ehmds-border-radius-medium, 6px) 0;
}

.ehm-text-field__charcount {
	position: absolute;
	right: var(--ehmds-spacing-3, 0.75rem);
	bottom: var(--ehmds-spacing-3, 0.75rem);
	font-size: var(--ehmds-font-size-xs, 0.75rem);
	color: var(--ehmds-color-text-tertiary, #64748b);
	background-color: var(--ehmds-color-background-primary, #ffffff);
	padding: var(--ehmds-spacing-1, 0.25rem) var(--ehmds-spacing-2, 0.5rem);
	border-radius: var(--ehmds-border-radius-small, 4px);
}

.ehm-text-field__helper,
.ehm-text-field__error {
	font-size: var(--ehmds-font-size-sm, 0.875rem);
	margin: 0;
}

.ehm-text-field__helper {
	color: var(--ehmds-color-text-secondary, #475569);
}

.ehm-text-field__error {
	color: var(--ehmds-color-error, #ef4444);
}

/* Variant states */
.ehm-text-field--error :deep(*) {
	border-color: var(--ehmds-color-error, #ef4444) !important;
}

.ehm-text-field--success :deep(*) {
	border-color: var(--ehmds-color-success, #10b981) !important;
}

.ehm-text-field--warning :deep(*) {
	border-color: var(--ehmds-color-warning, #f59e0b) !important;
}
</style>
