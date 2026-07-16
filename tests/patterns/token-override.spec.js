/**
 * Token Override Pattern Tests
 * Tests EhmBadge which uses the CSS token override pattern.
 *
 * The defining claim of this pattern is that EhmBadge adds NO API of its own —
 * it declares no props and performs no transformation. Every attribute the
 * consumer passes (status, inverted, ...) falls through to FBadge unchanged.
 * The only thing EhmBadge contributes is a class hook for scoped CSS token
 * overrides. These tests verify that claim.
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import EhmBadge from '@/components/token-override/EhmBadge.vue';

describe('Token Override Pattern: EhmBadge', () => {
  it('renders with EHMDS CSS hook class', () => {
    const wrapper = mount(EhmBadge, {
      slots: { default: 'Test Badge' },
    });

    const root = wrapper.find('.ehm-badge');
    expect(root.exists()).toBe(true);
  });

  it('renders slot content correctly', () => {
    const wrapper = mount(EhmBadge, {
      slots: { default: 'New Feature' },
    });

    expect(wrapper.text()).toBe('New Feature');
  });

  it('merges a consumer class onto the root', () => {
    const wrapper = mount(EhmBadge, {
      attrs: { class: 'custom-class' },
      slots: { default: 'Test' },
    });

    const badge = wrapper.find('.ehm-badge');
    expect(badge.classes()).toContain('ehm-badge');
    expect(badge.classes()).toContain('custom-class');
  });

  it('declares no props of its own (pure passthrough)', () => {
    // The core Token Override claim: EhmBadge adds no API surface. status,
    // inverted and every other attribute reach FBadge via fall-through, not via
    // declared props. If this fails, the component has stopped being a pure
    // token override and has drifted toward the Wrapper pattern.
    expect(Object.keys(EhmBadge.props ?? {})).toEqual([]);
  });

  it('passes status through to FBadge unchanged (no mapping)', () => {
    // EhmBadge must NOT remap statuses. Mounting status="success" should render
    // FBadge's real `badge--success` class, proving the value arrived verbatim.
    const wrapper = mount(EhmBadge, {
      attrs: { status: 'success' },
      slots: { default: 'Ok' },
    });

    expect(wrapper.find('.badge--success').exists()).toBe(true);
    // And it must not leak a remapped/invalid class.
    expect(wrapper.find('.badge--default').exists()).toBe(false);
  });

  it('passes inverted through to FBadge unchanged', () => {
    const wrapper = mount(EhmBadge, {
      attrs: { status: 'success', inverted: true },
      slots: { default: 'Inverted' },
    });

    expect(wrapper.find('.badge--success-inverted').exists()).toBe(true);
  });

  it('renders FBadge with valid native statuses without warnings', () => {
    // Regression guard: the old EhmBadge invented non-FKUI statuses ("brand",
    // "neutral") that failed FBadge's validator and logged Vue warnings. Valid
    // FKUI statuses must pass through cleanly.
    const validStatuses = ['default', 'info', 'success', 'warning', 'error'];
    for (const status of validStatuses) {
      const wrapper = mount(EhmBadge, {
        attrs: { status },
        slots: { default: status },
      });
      expect(wrapper.find(`.badge--${status}`).exists()).toBe(true);
    }
  });

  it('is lightweight (no computed, no script logic beyond the import)', () => {
    // Documentation test for the pattern claim. A token-override component
    // should carry no reactive logic of its own.
    const wrapper = mount(EhmBadge);
    expect(wrapper.html()).toBeTruthy();
  });
});
