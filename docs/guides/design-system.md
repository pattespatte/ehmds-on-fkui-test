---
title: Design System
visible: true
---

# EHMDS Design System

The EHMDS Design System is built on top of FKUI (Försäkringskassans UI) and provides a set of reusable Vue 3 components.

## Architecture

The design system is structured as follows:

- **Components**: Reusable Vue 3 components
- **Themes**: Design tokens and styling
- **Assets**: Global styles and variables

## FKUI Integration

This design system leverages several FKUI packages:

- `@fkui/vue` - Vue 3 components
- `@fkui/design` - Design tokens
- `@fkui/logic` - Business logic utilities
- `@fkui/date` - Date handling utilities
- `@fkui/theme-default` - Default theme

## Component Development

When creating new components:

1. Follow Vue 3 Composition API patterns
2. Use FKUI design tokens for consistency
3. Ensure accessibility (WCAG 2.2 AA)
4. Include comprehensive documentation
5. Add unit tests

## Example Component Structure

```vue
<template>
  <div class="ehmds-component" :class="componentClasses">
    <slot />
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'secondary'].includes(value)
  }
});

const componentClasses = computed(() => ({
  [`ehmds-component--${props.variant}`]: true
}));
</script>

<style lang="scss" scoped>
.ehmds-component {
  // Component styles using FKUI design tokens
}
</style>
