<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled || loading"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- Loading indicator -->
    <span v-if="loading" class="ehmds-button__loading" aria-hidden="true"></span>
    
    <!-- Icon slot - if provided -->
    <span v-if="$slots.icon && !loading" class="ehmds-button__icon">
      <slot name="icon" />
    </span>
    
    <!-- Button content -->
    <span class="ehmds-button__content" :class="{ 'ehmds-button__content--loading': loading }">
      <slot>{{ label }}</slot>
    </span>
  </button>
</template>

<script>
// Constants for validation - defined outside setup for use in validators
const FKUI_VARIANTS = ['primary', 'secondary', 'tertiary', 'success', 'warning', 'error']
const EHMDS_VARIANTS = ['ehmds-primary', 'ehmds-secondary', 'ehmds-accent']
const VALID_VARIANTS = [...FKUI_VARIANTS, ...EHMDS_VARIANTS]
const VALID_SIZES = ['small', 'medium', 'large']
const VALID_TYPES = ['button', 'submit', 'reset']
</script>

<script setup>
import { computed, toRefs } from 'vue'

// Component name for debugging
defineOptions({
  name: 'EhmdsButton',
  inheritAttrs: false
})

// Props with improved validation and JSDoc comments
const props = defineProps({
  /**
   * Button variant - extends FKUI variants with EHMDS custom variants
   * @type {'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'error' | 'ehmds-primary' | 'ehmds-secondary' | 'ehmds-accent'}
   */
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => {
      const isValid = VALID_VARIANTS.includes(value)
      if (!isValid) {
        console.warn(`[EhmdsButton] Invalid variant '${value}'. Expected one of: ${VALID_VARIANTS.join(', ')}`)
      }
      return isValid
    }
  },
  
  /**
   * Button size
   * @type {'small' | 'medium' | 'large'}
   */
  size: {
    type: String,
    default: 'medium',
    validator: (value) => {
      const isValid = VALID_SIZES.includes(value)
      if (!isValid) {
        console.warn(`[EhmdsButton] Invalid size '${value}'. Expected one of: ${VALID_SIZES.join(', ')}`)
      }
      return isValid
    }
  },
  
  /**
   * Button label text - used as fallback when no slot content is provided
   */
  label: {
    type: String,
    default: ''
  },
  
  /**
   * Button type attribute for form handling
   * @type {'button' | 'submit' | 'reset'}
   */
  type: {
    type: String,
    default: 'button',
    validator: (value) => {
      const isValid = VALID_TYPES.includes(value)
      if (!isValid) {
        console.warn(`[EhmdsButton] Invalid type '${value}'. Expected one of: ${VALID_TYPES.join(', ')}`)
      }
      return isValid
    }
  },
  
  /**
   * Disabled state
   */
  disabled: {
    type: Boolean,
    default: false
  },
  
  /**
   * Add rounded corners (EHMDS enhancement)
   */
  rounded: {
    type: Boolean,
    default: false
  },
  
  /**
   * Add shadow effect (EHMDS enhancement)
   */
  shadow: {
    type: Boolean,
    default: false
  },
  
  /**
   * Full width button
   */
  fullWidth: {
    type: Boolean,
    default: false
  },

  /**
   * Loading state - prevents interaction and shows loading indicator
   */
  loading: {
    type: Boolean,
    default: false
  }
})

// Events
const emit = defineEmits({
  /**
   * Emitted when button is clicked
   * @param {MouseEvent} event - The click event
   */
  click: (event) => event instanceof MouseEvent
})

// Reactive props for performance optimization
const { variant, disabled, rounded, shadow, fullWidth, loading, size } = toRefs(props)

/**
 * Computed classes for button styling
 * Optimized to avoid unnecessary recalculations
 */
const buttonClasses = computed(() => {
  const classes = [
    'ehmds-button',
    `ehmds-button--${variant.value}`,
    `ehmds-button--${size.value}`
  ]
  
  // Add conditional classes
  if (rounded.value) classes.push('ehmds-button--rounded')
  if (shadow.value) classes.push('ehmds-button--shadow')
  if (fullWidth.value) classes.push('ehmds-button--full-width')
  if (loading.value) classes.push('ehmds-button--loading')
  if (disabled.value) classes.push('ehmds-button--disabled')
  
  return classes
})

/**
 * Handle button click with enhanced logic
 * Prevents multiple clicks during loading state
 */
const handleClick = (event) => {
  // Prevent action if disabled or loading
  if (disabled.value || loading.value) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  
  emit('click', event)
}

// Expose methods for parent components if needed
defineExpose({
  focus: () => {
    // Could be used to programmatically focus the button
  }
})
</script>

<style scoped>
/* CSS Custom Properties with fallbacks */
.ehmds-button {
  /* Base button styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid transparent;
  border-radius: var(--ehmds-border-radius, 4px);
  cursor: pointer;
  font-family: var(--ehmds-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
  font-weight: var(--ehmds-font-weight-medium, 500);
  text-decoration: none;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  transition: all var(--ehmds-transition-duration, 0.2s) var(--ehmds-transition-timing, ease-in-out);
  position: relative;
  overflow: hidden;
}

.ehmds-button:focus {
  outline: none;
}

.ehmds-button:focus-visible {
  outline: 2px solid var(--ehmds-color-focus, #007bff);
  outline-offset: 2px;
  z-index: 1;
}

/* Button sizes */
.ehmds-button--small {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  line-height: 1.25;
}

.ehmds-button--medium {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
}

.ehmds-button--large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
}

/* Button variants - FKUI compatible */
.ehmds-button--primary {
  background-color: #007bff;
  border-color: #007bff;
  color: #ffffff;
}

.ehmds-button--primary:hover:not(:disabled):not(.ehmds-button--loading) {
  background-color: #0056b3;
  border-color: #0056b3;
}

.ehmds-button--primary:active:not(:disabled):not(.ehmds-button--loading) {
  background-color: #004085;
  border-color: #004085;
}

.ehmds-button--secondary {
  background-color: #6c757d;
  border-color: #6c757d;
  color: #ffffff;
}

.ehmds-button--secondary:hover:not(:disabled):not(.ehmds-button--loading) {
  background-color: #5a6268;
  border-color: #5a6268;
}

.ehmds-button--tertiary {
  background-color: transparent;
  border-color: #6c757d;
  color: #6c757d;
}

.ehmds-button--tertiary:hover:not(:disabled):not(.ehmds-button--loading) {
  background-color: #6c757d;
  color: #ffffff;
}

.ehmds-button--success {
  background-color: #28a745;
  border-color: #28a745;
  color: #ffffff;
}

.ehmds-button--success:hover:not(:disabled):not(.ehmds-button--loading) {
  background-color: #218838;
  border-color: #218838;
}

.ehmds-button--warning {
  background-color: #ffc107;
  border-color: #ffc107;
  color: #212529;
}

.ehmds-button--warning:hover:not(:disabled):not(.ehmds-button--loading) {
  background-color: #e0a800;
  border-color: #e0a800;
}

.ehmds-button--error {
  background-color: #dc3545;
  border-color: #dc3545;
  color: #ffffff;
}

.ehmds-button--error:hover:not(:disabled):not(.ehmds-button--loading) {
  background-color: #c82333;
  border-color: #c82333;
}

/* EHMDS Custom Variants */
.ehmds-button--ehmds-primary {
  background-color: var(--ehmds-color-primary, #2c5aa0);
  border-color: var(--ehmds-color-primary, #2c5aa0);
  color: var(--ehmds-color-primary-contrast, #ffffff);
}

.ehmds-button--ehmds-primary:hover:not(:disabled):not(.ehmds-button--loading) {
  background-color: var(--ehmds-color-primary-dark, #1e3a70);
  border-color: var(--ehmds-color-primary-dark, #1e3a70);
}

.ehmds-button--ehmds-secondary {
  background-color: var(--ehmds-color-secondary, #f0f4f8);
  border-color: var(--ehmds-color-secondary, #f0f4f8);
  color: var(--ehmds-color-secondary-contrast, #2c5aa0);
}

.ehmds-button--ehmds-secondary:hover:not(:disabled):not(.ehmds-button--loading) {
  background-color: var(--ehmds-color-secondary-dark, #e0e8f0);
  border-color: var(--ehmds-color-secondary-dark, #e0e8f0);
}

.ehmds-button--ehmds-accent {
  background-color: var(--ehmds-color-accent, #ff6b35);
  border-color: var(--ehmds-color-accent, #ff6b35);
  color: var(--ehmds-color-accent-contrast, #ffffff);
}

.ehmds-button--ehmds-accent:hover:not(:disabled):not(.ehmds-button--loading) {
  background-color: var(--ehmds-color-accent-dark, #e55a2b);
  border-color: var(--ehmds-color-accent-dark, #e55a2b);
}

/* Enhanced features */
.ehmds-button--rounded {
  border-radius: var(--ehmds-border-radius-large, 12px);
}

.ehmds-button--shadow {
  box-shadow: var(--ehmds-shadow-medium, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
}

.ehmds-button--shadow:hover:not(:disabled):not(.ehmds-button--loading) {
  box-shadow: var(--ehmds-shadow-large, 0 10px 15px -3px rgba(0, 0, 0, 0.1));
  transform: translateY(-1px);
}

.ehmds-button--full-width {
  width: 100%;
}

/* Loading state */
.ehmds-button--loading {
  pointer-events: none;
  position: relative;
}

.ehmds-button__loading {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1rem;
  height: 1rem;
  margin: -0.5rem 0 0 -0.5rem;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: ehmds-button-spin 1s linear infinite;
}

.ehmds-button__content--loading {
  opacity: 0;
}

.ehmds-button__icon {
  display: inline-flex;
  align-items: center;
}

@keyframes ehmds-button-spin {
  to {
    transform: rotate(360deg);
  }
}

/* Disabled state */
.ehmds-button:disabled,
.ehmds-button--disabled {
  cursor: not-allowed;
  opacity: 0.6;
  transform: none !important;
  box-shadow: none !important;
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .ehmds-button {
    border-width: 2px;
  }
  
  .ehmds-button:focus-visible {
    outline-width: 3px;
  }
}

/* Reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .ehmds-button {
    transition: none;
  }
  
  .ehmds-button--shadow:hover:not(:disabled):not(.ehmds-button--loading) {
    transform: none;
  }
  
  .ehmds-button__loading {
    animation: none;
  }
}
</style>