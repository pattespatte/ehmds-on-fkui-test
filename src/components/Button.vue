<template>
  <FButton
    :class="buttonClasses"
    :variant="variant"
    :size="size"
    :disabled="disabled"
    :type="type"
    v-bind="$attrs"
    @click="handleClick"
  >
    <!-- Icon slot - if provided -->
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    
    <!-- Default slot for button content -->
    <slot>{{ label }}</slot>
  </FButton>
</template>

<script>
import { FButton } from '@fkui/vue'
import { computed } from 'vue'

export default {
  name: 'EhmdsButton',
  components: {
    FButton
  },
  inheritAttrs: false,
  props: {
    /**
     * Button variant - extends FKUI variants with EHMDS custom variants
     */
    variant: {
      type: String,
      default: 'primary',
      validator: (value) => [
        'primary', 'secondary', 'tertiary', 'success', 'warning', 'error',
        'ehmds-primary', 'ehmds-secondary', 'ehmds-accent'
      ].includes(value)
    },
    
    /**
     * Button size
     */
    size: {
      type: String,
      default: 'medium',
      validator: (value) => ['small', 'medium', 'large'].includes(value)
    },
    
    /**
     * Button label text
     */
    label: {
      type: String,
      default: ''
    },
    
    /**
     * Button type attribute
     */
    type: {
      type: String,
      default: 'button',
      validator: (value) => ['button', 'submit', 'reset'].includes(value)
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
    }
  },
  
  emits: ['click'],
  
  setup(props, { emit }) {
    /**
     * Computed classes for EHMDS enhancements
     */
    const buttonClasses = computed(() => {
      return [
        'ehmds-button',
        {
          'ehmds-button--rounded': props.rounded,
          'ehmds-button--shadow': props.shadow,
          'ehmds-button--full-width': props.fullWidth,
          [`ehmds-button--${props.variant}`]: props.variant.startsWith('ehmds-')
        }
      ]
    })
    
    /**
     * Handle button click with custom logic if needed
     */
    const handleClick = (event) => {
      if (!props.disabled) {
        emit('click', event)
      }
    }
    
    return {
      buttonClasses,
      handleClick
    }
  }
}
</script>

<style scoped>
.ehmds-button {
  /* Base EHMDS button styles */
  transition: all var(--ehmds-transition-duration) var(--ehmds-transition-timing);
  font-family: var(--ehmds-font-family);
  font-weight: var(--ehmds-font-weight-medium);
}

/* Rounded corners enhancement */
.ehmds-button--rounded {
  border-radius: var(--ehmds-border-radius-large) !important;
}

/* Shadow enhancement */
.ehmds-button--shadow {
  box-shadow: var(--ehmds-shadow-medium);
}

.ehmds-button--shadow:hover:not(:disabled) {
  box-shadow: var(--ehmds-shadow-large);
  transform: translateY(-1px);
}

/* Full width */
.ehmds-button--full-width {
  width: 100%;
}

/* EHMDS Custom Variants */
.ehmds-button--ehmds-primary {
  background-color: var(--ehmds-color-primary);
  color: var(--ehmds-color-primary-contrast);
  border-color: var(--ehmds-color-primary);
}

.ehmds-button--ehmds-primary:hover:not(:disabled) {
  background-color: var(--ehmds-color-primary-dark);
  border-color: var(--ehmds-color-primary-dark);
}

.ehmds-button--ehmds-secondary {
  background-color: var(--ehmds-color-secondary);
  color: var(--ehmds-color-secondary-contrast);
  border-color: var(--ehmds-color-secondary);
}

.ehmds-button--ehmds-secondary:hover:not(:disabled) {
  background-color: var(--ehmds-color-secondary-dark);
  border-color: var(--ehmds-color-secondary-dark);
}

.ehmds-button--ehmds-accent {
  background-color: var(--ehmds-color-accent);
  color: var(--ehmds-color-accent-contrast);
  border-color: var(--ehmds-color-accent);
}

.ehmds-button--ehmds-accent:hover:not(:disabled) {
  background-color: var(--ehmds-color-accent-dark);
  border-color: var(--ehmds-color-accent-dark);
}

/* Focus states for accessibility */
.ehmds-button:focus-visible {
  outline: 2px solid var(--ehmds-color-focus);
  outline-offset: 2px;
}
</style>