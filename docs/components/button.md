# Button

Buttons trigger actions or navigate to new pages.

## Examples

### Basic Usage

<DemoBlock>
  <EhmdsButton>Default Button</EhmdsButton>
  <EhmdsButton variant="primary">Primary Button</EhmdsButton>
  <EhmdsButton variant="secondary">Secondary Button</EhmdsButton>
  
  <template #code>

```vue
<EhmdsButton>Default Button</EhmdsButton>
<EhmdsButton variant="primary">Primary Button</EhmdsButton>
<EhmdsButton variant="secondary">Secondary Button</EhmdsButton>
```

  </template>
</DemoBlock>

### Sizes

<DemoBlock>
  <EhmdsButton size="small">Small</EhmdsButton>
  <EhmdsButton size="medium">Medium</EhmdsButton>
  <EhmdsButton size="large">Large</EhmdsButton>
  
  <template #code>

```vue
<EhmdsButton size="small">Small</EhmdsButton>
<EhmdsButton size="medium">Medium</EhmdsButton>
<EhmdsButton size="large">Large</EhmdsButton>
```

  </template>
</DemoBlock>

### Disabled State

<DemoBlock>
  <EhmdsButton disabled>Disabled Button</EhmdsButton>
  
  <template #code>

```vue
<EhmdsButton disabled>Disabled Button</EhmdsButton>
```

  </template>
</DemoBlock>

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'default'` | `'default'` | Button style variant |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Button size |
| `disabled` | `boolean` | `false` | Disable button interaction |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted when button is clicked |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Button content |
| `icon` | Optional icon slot |

## Accessibility

- Uses semantic `<button>` element
- Supports keyboard navigation
- Includes proper ARIA attributes
- Focus indicators meet WCAG standards

## Best Practices

1. **Clear Labels**: Use descriptive text that explains the action
2. **Consistent Styling**: Use the same variant for similar actions
3. **Loading States**: Show loading indicator for async actions
4. **Error Handling**: Provide feedback when actions fail
