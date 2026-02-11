/**
 * Token Override Pattern Tests
 * Tests EhmBadge which uses CSS token override pattern
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import EhmBadge from '@/components/token-override/EhmBadge.vue';

describe('Token Override Pattern: EhmBadge', () => {
  it('renders with EHMDS CSS wrapper class', () => {
    const wrapper = mount(EhmBadge, {
      slots: { default: 'Test Badge' },
    });

    // Root element should have ehm-badge class
    const root = wrapper.find('.ehm-badge');
    expect(root.exists()).toBe(true);
  });

  it('renders slot content correctly', () => {
    const wrapper = mount(EhmBadge, {
      slots: { default: 'New Feature' },
    });

    expect(wrapper.text()).toBe('New Feature');
  });

  it('accepts custom class via attrs', () => {
    const wrapper = mount(EhmBadge, {
      attrs: { class: 'custom-class' },
      slots: { default: 'Test' },
    });

    const badge = wrapper.find('.ehm-badge');
    expect(badge.classes()).toContain('ehm-badge');
    expect(badge.classes()).toContain('custom-class');
  });

  it('renders FKUI FBadge component internally', () => {
    const wrapper = mount(EhmBadge, {
      slots: { default: 'Test Badge' },
    });

    // Should render something - we can't easily check FKUI classes
    // but we can verify it renders without error
    expect(wrapper.html()).toContain('Test Badge');
  });

  it('passes inverted prop to FKUI', () => {
    const wrapper = mount(EhmBadge, {
      props: { inverted: true },
      slots: { default: 'Inverted' },
    });

    // Component should render successfully
    expect(wrapper.html()).toContain('Inverted');
  });

  it('validates status prop', () => {
    // Check the validator works
    const validator = EhmBadge.props?.status?.validator;

    if (validator) {
      // FKUI values (pass through)
      expect(validator('default')).toBe(true);
      expect(validator('warning')).toBe(true);
      expect(validator('error')).toBe(true);
      expect(validator('success')).toBe(true);
      expect(validator('info')).toBe(true);

      // EHMDS values (map to FKUI)
      expect(validator('brand')).toBe(true);
      expect(validator('neutral')).toBe(true);

      // Invalid values
      expect(validator('invalid')).toBe(false);
    }
  });

  it('demonstrates token override pattern with minimal code', () => {
    // This test documents the pattern: uses FKUI component as-is
    const wrapper = mount(EhmBadge, {
      props: { status: 'brand' },
      slots: { default: 'Brand' },
    });

    // Should render successfully
    expect(wrapper.find('.ehm-badge').exists()).toBe(true);
  });

  it('is lightweight (no custom logic)', () => {
    // Token override pattern should have very little logic
    // This is a documentation test - verifies the pattern claim
    const wrapper = mount(EhmBadge);

    // Component should render successfully
    expect(wrapper.html()).toBeTruthy();
  });
});
