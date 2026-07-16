# Extension Pattern

## Overview

The **Extension Pattern** extends an FKUI component's functionality while preserving all its original capabilities. The extension component:

- Uses FKUI components as the foundation
- Adds new props, slots, and features
- Preserves all FKUI functionality
- Coordinates between FKUI component and new features

## When to Use

Use the Extension pattern when:

- You need FKUI's features plus additional functionality
- You want to add utility features (char count, helpers, etc.)
- You need to enhance FKUI without breaking existing behavior
- You want to maintain full FKUI compatibility

## Implementation: EhmTextField

`EhmTextField` extends FKUI's `FTextField` component:

```vue
<template>
  <div class="ehm-text-field">
    <label>{{ label }}<span v-if="required">*</span></label>
    <div class="ehm-text-field__input-wrapper">
      <!-- EHMDS additions: prefix/suffix slots -->
      <span v-if="$slots.prefix" class="ehm-text-field__prefix">
        <slot name="prefix" />
      </span>

      <!-- Extended FKUI component -->
      <FTextField
        v-model="internalValue"
        v-bind="$attrs"
        @update:model-value="handleUpdate"
      />

      <!-- EHMDS additions: character count -->
      <span class="ehm-text-field__charcount">
        {{ currentLength }}/{{ maxLength }}
      </span>
    </div>

    <!-- EHMDS additions: helper and error text -->
    <p v-if="helperText">{{ helperText }}</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>
```

## Architecture Diagram

```mermaid
graph TD
    App[Application Code] -->|Uses| EHMDS[EhmTextField Component]
    EHMDS -->|Extends| FKUI[FTextField Component]
    EHMDS -->|Adds| Features[New Features]
    Features --> Prefix[Prefix Slot]
    Features --> Suffix[Suffix Slot]
    Features --> CharCount[Character Count]
    Features --> Helpers[Helper/Error Text]
    EHMDS -->|Preserves| FKUI_API[All FTextField API]

    style EHMDS fill:#e1f5fe,stroke:#0288d1
    style FKUI fill:#fff3e0,stroke:#f57c00
    style Features fill:#c8e6c9,stroke:#388e3c
    style App fill:#f5f5f5,stroke:#999
```

## Extended Features

| Feature | Type | Description |
|---------|------|-------------|
| `label` prop | New | Adds label element with required indicator |
| `helperText` prop | New | Adds helper text below input |
| `errorMessage` prop | New | Adds error message display |
| `maxLength` prop | New | Enforces character limit |
| `showCharacterCount` prop | New | Shows character counter |
| `#prefix` slot | New | Content before input |
| `#suffix` slot | New | Content after input |
| All FTextField props | Preserved | Full FKUI compatibility |

## Props Comparison

```javascript
// FKUI FTextField props
{
  id, modelValue, type, placeholder, disabled,
  readonly, required, inline, labelWidth,
  inputWidth, formatter, parser, ...
}

// EHMDS EhmTextField props (includes all FTextField props)
{
  // ... all FTextField props ...
  // Plus EHMDS extensions:
  label, helperText, errorMessage, hasError,
  maxLength, showCharacterCount, variant
}
```

## Pros and Cons

**Pros:**

- Preserves all FKUI functionality
- Adds new features without breaking changes
- Maintains FKUI compatibility
- Can layer multiple extensions

**Cons:**

- Larger component size
- More complex state management
- Potential for prop naming conflicts
- Must synchronize with FKUI updates

## Risks & When NOT to Use

**The name "Extension" carries OOP-inheritance baggage — beware the fragile base
class.** Extending a component you do not own means upstream changes to
`FTextField`'s internal behaviour can break your extension in subtle ways: a
renamed internal ref, a changed lifecycle hook, or a restructured template can
silently change what your extension renders or how it handles state. Unlike a
wrapper (which depends on FKUI's *public* surface) or a token override (which
depends on almost nothing), an extension often reaches into how the base
component actually behaves, so it is the pattern most exposed to this class of
bug.

**"Preserves all FKUI functionality" is an ideal, not a guarantee.** The
Pros list claims it, but if your extension suppresses any FKUI rendering it must
be documented honestly. `EhmTextField` is a concrete example: it uses `:deep()`
overrides to neutralise `FTextField`'s own label and renders its own label
element instead. That is a deliberate, useful choice — but it means the
extension does *not* pass through FTextField's label semantics untouched, and
consumers should not be told it does. If your extension suppresses, replaces, or
overrides any FKUI rendering, call it out explicitly rather than implying pure
additive behaviour.

**Do not use Extension when:**

- You only want to restyle a component — use **Token Override**.
- You want to simplify or reshape one component's API — use **Wrapper/Facade**,
  which is designed to change the API surface.
- You need to combine multiple components — use **Composition**.

## Code Example

```vue
<template>
  <!-- EHMDS Extended API - includes FKUI features plus more -->
  <EhmTextField
    v-model="name"
    label="Full Name"
    helperText="Enter your first and last name"
    :max-length="50"
    :show-character-count="true"
    :error-message="nameError"
    :has-error="!!nameError"
    placeholder="Jane Doe"
    required
  >
    <template #prefix>
      <icon-user />
    </template>
  </EhmTextField>
</template>
```

Compared to using FKUI directly:

```vue
<template>
  <!-- FKUI API - only has basic features -->
  <FTextField
    v-model="name"
    id="name-field"
    placeholder="Jane Doe"
  />
  <!-- Need to manually add: label, error, char count, etc. -->
</template>
```

## Extension Strategy

The extension pattern follows these principles:

1. **Preserve Original API**: All FKUI props work as-is
2. **Additive Changes**: Only add, never remove FKUI features
3. **Smart Defaults**: Provide sensible defaults for new props
4. **Coordination**: Manage state between FKUI and new features
5. **Accessibility**: Maintain WCAG compliance when adding features

## Industry Context: Component Augmentation

Nathan Curtis refers to this as "Relinquishing control by offering parts." Instead of one rigid component, we extend FKUI by providing **slots** or **composables** that add new behavior (e.g., validation logic or tooltips) without breaking the core component's contract.
