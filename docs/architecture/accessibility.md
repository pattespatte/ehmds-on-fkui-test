# Accessibility in EHMDS

## Overview

EHMDS components inherit FKUI's accessibility features, but each architectural pattern introduces different considerations for maintaining WCAG 2.1 Level AA compliance.

## FKUI Accessibility Foundation

FKUI components provide:

- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA attributes
- Focus management

## Pattern-Specific Accessibility

### Token Override Pattern ✅

**Accessibility Risk: Very Low**

Token override components use FKUI components as-is with only CSS changes. All FKUI accessibility features are preserved.

```vue
<!-- EhmBadge - No accessibility concerns -->
<EhmBadge status="brand">New Feature</EhmBadge>
```

**Testing Requirements:**

- Visual review only (verify colors meet contrast requirements)

**Considerations:**

- Ensure EHMDS color tokens meet WCAG AA contrast ratios (4.5:1 for text)
- Test color overrides in both light and dark modes

### Wrapper/Facade Pattern ⚠️

**Accessibility Risk: Low-Medium**

Wrapper components provide a simplified API but must preserve FKUI's accessibility features.

```vue
<!-- EhmCard - Verify slot content maintains accessibility -->
<EhmCard title="Card Title">
  <!-- Slot content must maintain accessibility -->
  <button>Action</button>
</EhmCard>
```

**Testing Requirements:**

- Verify all FKUI slots are properly forwarded
- Test keyboard navigation through wrapper
- Ensure ARIA attributes are preserved
- Check that slot content doesn't break accessibility

**Considerations:**

- Convenience props (like `title`) must generate proper heading structure
- Slot passthrough must not break focus order
- Custom CSS classes must not hide focus indicators

### Extension Pattern ⚠️

**Accessibility Risk: Medium**

Extension components add new features that must be made accessible.

```vue
<!-- EhmTextField - Test new features for accessibility -->
<EhmTextField
  v-model="name"
  label="Full Name"
  :max-length="50"
  show-character-count
  helper-text="Enter your name"
/>
```

**Testing Requirements:**

- Test all new features with screen reader
- Verify character count is announced
- Ensure helper text is properly associated
- Test auto-save functionality with keyboard

**Considerations:**

- Character counter must be readable by screen readers (`aria-live`)
- Helper text must use `aria-describedby`
- Error messages must be properly associated
- New features must not interfere with FKUI's accessibility

### Composition Pattern ⚠️

**Accessibility Risk: Medium-High**

Composition components orchestrate multiple FKUI components and must manage focus, ARIA, and keyboard interactions.

```vue
<!-- EhmSearchBox - Ensure component orchestration maintains accessibility -->
<EhmSearchBox
  v-model="query"
  @search="handleSearch"
>
  <template #filters="{ query }">
    <FCheckbox v-model="filters.active">Active only</FCheckbox>
  </template>
</EhmSearchBox>
```

**Testing Requirements:**

- Full keyboard navigation testing
- Screen reader testing of entire interaction
- Focus management verification
- ARIA attribute validation
- Test expandable filters with screen reader

**Considerations:**

- Focus must move correctly between orchestrated components
- Expanded/collapsed state must be announced
- Search results must be properly associated with search input
- Keyboard shortcuts must not conflict with browser/AT defaults

## Testing Checklist

### Visual Testing

- [ ] Focus indicators are visible on all interactive elements
- [ ] Color contrast meets WCAG AA (4.5:1 for text, 3:1 for large text)
- [ ] Text can be resized up to 200% without breaking layout
- [ ] No reliance on color alone to convey information

### Keyboard Testing

- [ ] All interactive elements are reachable via Tab key
- [ ] Tab order follows logical visual flow
- [ ] Focus indicators are clearly visible
- [ ] Enter/Space keys activate buttons and links
- [ ] Escape key closes modals/dropdowns
- [ ] Arrow keys work within composite widgets (lists, radios)

### Screen Reader Testing

- [ ] All interactive elements have accessible labels
- [ ] State changes are announced (expand/collapse, errors, etc.)
- [ ] Form inputs have associated labels
- [ ] Error messages are announced
- [ ] Dynamic content updates use `aria-live` regions

### ARIA Testing

- [ ] No redundant ARIA (don't repeat what HTML already provides)
- [ ] `aria-hidden` used appropriately (hide decorative content)
- [ ] `aria-label` or `aria-labelledby` for icon-only buttons
- [ ] `aria-describedby` for additional descriptive text
- [ ] `aria-expanded` for toggleable content

## Automated Testing

### Vitest with Axe Core

```javascript
import { axe } from 'vitest-axe';

describe('Accessibility', () => {
  it('EhmCard meets WCAG standards', async () => {
    const wrapper = mount(EhmCard, {
      props: { title: 'Test' },
      slots: { default: 'Content' }
    });

    const results = await axe(wrapper.element);
    expect(results).toHaveNoViolations();
  });
});
```

### ESLint Plugin

```json
{
  "plugins": ["eslint-plugin-jsx-a11y"],
  "rules": {
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error"
  }
}
```

## Accessibility Tools

| Tool | Purpose |
|------|---------|
| [Axe DevTools](https://www.deque.com/axe/devtools/) | Browser extension for testing |
| [WAVE](https://wave.webaim.org/) | Visual accessibility evaluation |
| [Lighthouse](https://developers.google.com/web/tools/lighthouse) | Built-in Chrome auditing |
| [NVDA / JAWS](https://www.nvaccess.org/) | Screen reader testing |
| [Voice Control](https://www.apple.com/accessibility/voice-over/) | Voice control testing |

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [FKUI Accessibility Documentation](https://designsystem.forsakringskassan.se/accessibility)
- [Vue A11y Guide](https://vuejs.org/guide/best-practices/accessibility.html)
