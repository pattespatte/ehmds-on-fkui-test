# Contributing

We welcome contributions! This guide will help you get started.

## Development Setup

### Prerequisites

- **Node.js** 16 or higher
- **npm** or **yarn** package manager
- **TypeScript** knowledge (codebase uses TypeScript with strict mode)

### Getting Started

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/ehmds-on-fkui-test.git
cd ehmds-on-fkui-test

# 2. Install dependencies
npm install

# 3. Start the development server
npm run demo

# 4. In a new terminal, run type checking in watch mode
npm run type-check -- --watch
```

## Code Style

### TypeScript Requirements

All code must:
- Use **TypeScript** with `<script setup lang="ts">` for Vue components
- Pass **type checking** (`npm run type-check`)
- Follow **strict mode** rules (no `any` without justification)
- Include **proper type definitions** for props, emits, and refs

### Component Example

```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import { FTextField } from '@fkui/vue'

// Define prop types with interface
interface MyComponentProps {
  modelValue: string
  placeholder?: string
  maxLength?: number
}

const props = withDefaults(defineProps<MyComponentProps>(), {
  placeholder: '',
  maxLength: undefined,
})

// Define emit types
interface MyComponentEmits {
  'update:modelValue': [value: string]
  submit: []
}

const emit = defineEmits<MyComponentEmits>()

// Type your refs
const inputValue = ref(props.modelValue)

// Type your computed properties
const charCount = computed((): string => {
  return `${inputValue.value.length}/${props.maxLength || '∞'}`
})
</script>
```

### Pattern Guidelines

When adding new components:

1. **Choose the appropriate pattern**:
   - **Token Override**: Visual changes only (CSS variable overrides)
   - **Wrapper**: Simplified or different API
   - **Extension**: FKUI features + additional functionality
   - **Composition**: Multiple FKUI components combined

2. **Follow TypeScript conventions**:
   ```typescript
   // ✅ Good - Properly typed props
   interface ComponentProps {
     variant: 'default' | 'primary' | 'secondary'
   }

   // ❌ Bad - Untyped props
   const props = defineProps({
     variant: String
   })
   ```

3. **Document architecture decisions** in ADR format

## Workflow

### Making Changes

```bash
# 1. Create a feature branch
git checkout -b feature/my-component

# 2. Make your changes
# - Add/modify components
# - Update types as needed
# - Add/update tests

# 3. Run type checking
npm run type-check

# 4. Run linting
npm run lint
npm run lint:fix  # Auto-fix issues

# 5. Build the library
npm run build

# 6. Commit your changes
git add .
git commit -m "feat: add my new component"

# 7. Push to your fork
git push origin feature/my-component
```

### Pull Request Process

1. **Ensure all checks pass**:
   - `npm run type-check` ✅
   - `npm run lint` ✅
   - `npm run build` ✅

2. **Update documentation**:
   - Add component to catalog in README
   - Update relevant architecture docs
   - Include TypeScript types in API documentation

3. **Submit Pull Request**:
   - Describe the architectural pattern used
   - Explain TypeScript types added
   - Reference related issues

4. **Code Review**:
   - Address feedback from maintainers
   - Keep PRs focused and small

## Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm test -- --watch
```

## Architecture Documentation

When introducing new patterns or approaches, document them in `docs/architecture/`:

1. Create or update the relevant pattern documentation
2. Include code examples with TypeScript
3. Explain trade-offs and use cases
4. Compare with existing patterns

## Resources

- [Architecture Overview](/architecture/overview)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vue 3 TypeScript Guide](https://vuejs.org/guide/typescript/overview.html)
- [FKUI Documentation](https://designsystem.forsakringskassan.se/)

## Questions?

If you have questions or need guidance:

1. Check existing [Issues](https://github.com/pattespatte/ehmds-on-fkui-test/issues)
2. Review [Pull Requests](https://github.com/pattespatte/ehmds-on-fkui-test/pulls) for examples
3. [Open a new issue](https://github.com/pattespatte/ehmds-on-fkui-test/issues/new)

Thank you for contributing to EHMDS! 🚀
