# Card

Cards contain content and actions about a single subject.

## Examples

### Basic Card

<DemoBlock>
  <EhmdsCard>
    <template #header>
      <h3>Card Title</h3>
    </template>
    <p>This is the card content. Cards can contain any type of content.</p>
    <template #footer>
      <EhmdsButton size="small">Action</EhmdsButton>
    </template>
  </EhmdsCard>
  
  <template #code>

```vue
<EhmdsCard>
  <template #header>
    <h3>Card Title</h3>
  </template>
  <p>This is the card content.</p>
  <template #footer>
    <EhmdsButton size="small">Action</EhmdsButton>
  </template>
</EhmdsCard>
```

  </template>
</DemoBlock>

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `elevated` | `boolean` | `false` | Add shadow elevation |
| `padding` | `string` | `'medium'` | Card padding size |

### Slots

| Slot | Description |
|------|-------------|
| `header` | Card header content |
| `default` | Card body content |
| `footer` | Card footer content |
