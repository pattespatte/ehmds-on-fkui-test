# FKUI Update Strategy

## Overview

EHMDS depends on FKUI as a peer dependency. When FKUI releases updates, EHMDS components may be affected depending on the architectural pattern used. This document provides guidance for managing FKUI updates.

## Quarterly Review Cycle

### Monthly Checks

```bash
# Check for outdated FKUI packages
npm outdated @fkui/*

# Or check individual packages
npm outdated @fkui/vue @fkui/design @fkui/logic @fkui/date
```

### Review Checklist

- [ ] Review FKUI [changelog](https://github.com/Forsakringskassan/designsystem/blob/main/CHANGELOG.md)
- [ ] Identify breaking changes that affect EHMDS components
- [ ] Check for deprecated FKUI components used by EHMDS
- [ ] Note new features that could simplify EHMDS implementations

## Pattern Impact Assessment

| Pattern | Update Risk | Testing Required | Breaking Change Susceptibility |
|---------|-------------|------------------|--------------------------------|
| Token Override | ⭐ Low | Visual review only | Very Low |
| Wrapper | ⭐⭐ Low-Medium | API contract tests | Low (slot/prop changes) |
| Extension | ⭐⭐⭐ Medium | Full test suite + behavior tests | Medium (internal changes) |
| Composition | ⭐⭐⭐⭐ High | Integration tests | High (API changes affect coordination) |

### Token Override Pattern

**Impact:** CSS token names or internal DOM structure changes

**Testing:**

```bash
# Run visual regression tests
npm run test:visual

# Manual review in demo app
npm run demo
```

**What to check:**

- CSS custom property names unchanged
- Targeted CSS selectors still match
- Visual appearance unchanged

### Wrapper Pattern

**Impact:** Props, slots, or events change in wrapped FKUI component

**Testing:**

```bash
# Run component tests
npm run test -- src/components/wrapper

# Check prop types match FKUI
npm run test:types
```

**What to check:**

- Slot names still exist
- Props still accepted by FKUI component
- Event names unchanged
- Optional: update wrapper to expose new FKUI features

### Extension Pattern

**Impact:** Internal implementation changes, props added/removed, behavior changes

**Testing:**

```bash
# Run full component test suite
npm run test -- src/components/extension

# Test new FKUI features
npm run test:coverage
```

**What to check:**

- All EHMDS props still work
- New features don't conflict with EHMDS additions
- Character counts, helpers, etc. still function
- v-model binding still works

### Composition Pattern

**Impact:** API changes in any composed FKUI component

**Testing:**

```bash
# Run integration tests
npm run test -- src/components/composition

# Test component coordination
npm run test:e2e
```

**What to check:**

- All composed components still work together
- State coordination unchanged
- Events still fire correctly
- Component orchestration logic still valid

## Update Process

### 1. Preparation

```bash
# Create feature branch for FKUI update
git checkout -b update-fkui-x.y.z

# Update FKUI dependencies
npm run update:fkui-deps
```

### 2. Install and Test

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Run all tests
npm test

# Run demo app
npm run demo
```

### 3. Visual Regression

```bash
# Build for comparison
npm run build

# If you have visual regression tests:
npm run test:visual
```

### 4. Document Changes

Create a migration note if breaking changes were found:

```markdown
## FKUI X.Y.Z Migration Notes

### Affected Components

- `EhmCard` - FCard slot change requires update
- `EhmTextField` - New validation props from FKUI

### Required Updates

1. Update EhmCard slot mapping
2. Test EhmTextField with new FKUI validation
3. Update snapshots

### Optional Enhancements

- Leverage new FKUI auto-save feature in EhmTextField
```

### 5. Commit and Tag

```bash
# Commit changes
git add .
git commit -m "chore: update FKUI to X.Y.Z

- Update EhmCard for new FCard slots
- Add tests for new FKUI features
- Update migration notes"

# Tag release
git tag v1.x.z
git push origin main --tags
```

## Breaking Change Mitigation

### Pin to Minor Versions

```json
{
  "peerDependencies": {
    "@fkui/vue": "^8.0.0",
    "@fkui/design": "^8.0.0",
    "@fkui/logic": "^8.0.0",
    "@fkui/date": "^8.0.0"
  }
}
```

### Use Overrides for Consistency

```json
{
  "overrides": {
    "@fkui/vue": "8.2.1",
    "@fkui/design": "8.2.1",
    "@fkui/logic": "8.2.1",
    "@fkui/date": "8.2.1"
  }
}
```

### Compatibility Matrix

Maintain a matrix of tested FKUI versions:

| EHMDS Version | FKUI Version | Status |
|---------------|--------------|--------|
| 1.0.0 | 8.0.0 | ✅ Tested |
| 1.0.1 | 8.1.0 | ✅ Tested |
| 1.1.0 | 8.2.0 | ✅ Tested |
| 1.2.0 | 8.2.1 | ✅ Current |

## Rollback Strategy

If an FKUI update causes issues:

1. **Revert to previous FKUI version:**

   ```bash
   npm install @fkui/vue@previous.version
   ```

2. **Document the issue:**

   ```markdown
   ## FKUI X.Y.Z Known Issues

   ### Issue: EhmTextField character count breaks
   - FKUI version: X.Y.Z
   - EHMDS component: EhmTextField
   - Status: Investigating, pinned to X.Y.(Z-1)
   ```

3. **Report upstream:**
   - Check if issue exists in FKUI repo
   - Report if it's an FKUI regression
   - Document workaround for EHMDS users

## Automated Checks

### Pre-Update Script

```javascript
// scripts/check-fkui-compatibility.js
import { readFile } from 'fs/promises';

const pkg = JSON.parse(await readFile('package.json', 'utf-8'));
const fkuiVersions = Object.entries(pkg.dependencies)
  .filter(([name]) => name.startsWith('@fkui/'));

console.log('Current FKUI Dependencies:');
fkuiVersions.forEach(([name, version]) => {
  console.log(`  ${name}: ${version}`);
});

const versions = new Set(fkuiVersions.map(([, v]) => v));
if (versions.size > 1) {
  console.warn('⚠️  Warning: Multiple FKUI versions detected!');
  process.exit(1);
}
```

### Post-Update Script

```javascript
// scripts/verify-fkui-update.js
// Runs tests and checks for regressions
import { execSync } from 'child_process';

console.log('Running FKUI update verification...');

try {
  execSync('npm test', { stdio: 'inherit' });
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ FKUI update verified successfully!');
} catch (error) {
  console.error('❌ FKUI update verification failed!');
  process.exit(1);
}
```

## Best Practices

1. **Stay one major version behind** for production stability
2. **Test in isolation** before merging to main
3. **Document all breaking changes** in migration notes
4. **Maintain compatibility matrix** for reference
5. **Pin FKUI versions** to avoid accidental updates
6. **Automate checks** for version consistency

## Resources

- [FKUI Changelog](https://github.com/Forsakringskassan/designsystem/blob/main/CHANGELOG.md)
- [FKUI GitHub Issues](https://github.com/Forsakringskassan/designsystem/issues)
- [FKUI Release Notes](https://github.com/Forsakringskassan/designsystem/releases)
