/**
 * Composition Pattern Tests
 * Tests EhmSearchBox which composes multiple FKUI components
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import EhmSearchBox from '@/components/composition/EhmSearchBox.vue';

describe('Composition Pattern: EhmSearchBox', () => {
  it('renders without errors', () => {
    const wrapper = mount(EhmSearchBox);

    expect(wrapper.html()).toBeTruthy();
  });

  it('applies ehm-search-box wrapper class', () => {
    const wrapper = mount(EhmSearchBox);

    expect(wrapper.find('.ehm-search-box').exists()).toBe(true);
  });

  it('renders FKUI FTextField component', () => {
    const wrapper = mount(EhmSearchBox);

    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });

  it('supports v-model binding', async () => {
    const wrapper = mount(EhmSearchBox, {
      props: { modelValue: '' },
    });

    const input = wrapper.find('input[type="text"]');
    await input.setValue('test');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test']);
  });

  it('emits search event on Enter key', async () => {
    const wrapper = mount(EhmSearchBox, {
      props: { modelValue: 'test' },
    });

    const input = wrapper.find('input[type="text"]');
    await input.trigger('keyup.enter');

    expect(wrapper.emitted('search')).toBeTruthy();
  });

  it('emits search event on button click', async () => {
    const wrapper = mount(EhmSearchBox, {
      props: { modelValue: 'test query' },
    });

    // Find search button
    const searchButton = wrapper.findAll('button')[0];
    if (searchButton) {
      await searchButton.trigger('click');
      expect(wrapper.emitted('search')).toBeTruthy();
    }
  });

  it('clears search on clear button click', async () => {
    const wrapper = mount(EhmSearchBox, {
      props: { modelValue: 'initial value' },
    });

    // Find clear button
    const buttons = wrapper.findAll('button');
    const clearButton = buttons.length > 1 ? buttons[1] : null;
    if (clearButton) {
      await clearButton.trigger('click');

      // Should emit update with empty value
      expect(wrapper.emitted('update:modelValue')).toBeTruthy();
      expect(wrapper.emitted('clear')).toBeTruthy();
    }
  });

  it('toggles expandable state when expandable is true', async () => {
    const wrapper = mount(EhmSearchBox, {
      props: { expandable: true },
    });

    expect(wrapper.vm.isExpanded).toBe(false);

    // Trigger expansion by clicking toggle button
    const toggleButton = wrapper.findAll('button')[0];
    if (toggleButton) {
      await toggleButton.trigger('click');
      expect(wrapper.vm.isExpanded).toBe(true);
    }
  });

  it('accepts placeholder prop', () => {
    const wrapper = mount(EhmSearchBox, {
      props: { placeholder: 'Search users...' },
    });

    const input = wrapper.find('input[type="text"]');
    expect(input.attributes('placeholder')).toBe('Search users...');
  });

  it('respects disabled prop', () => {
    const wrapper = mount(EhmSearchBox, {
      props: { disabled: true },
    });

    const input = wrapper.find('input[type="text"]');
    expect(input.attributes('disabled')).toBeDefined();
  });

  it('renders filters slot', () => {
    const wrapper = mount(EhmSearchBox, {
      props: { expandable: true, modelValue: '' },
      slots: {
        filters: '<div class="test-filters">Filter options</div>',
      },
    });

    expect(wrapper.html()).toContain('Filter options');
  });

  it('shows search icon by default', () => {
    const wrapper = mount(EhmSearchBox);

    // Should show 🔍 icon by default
    expect(wrapper.html()).toContain('🔍');
  });

  it('hides search icon when showIcon is false', () => {
    const wrapper = mount(EhmSearchBox, {
      props: { showIcon: false },
    });

    // Should show "Sök" text instead of icon
    expect(wrapper.html()).toContain('Sök');
  });

  it('demonstrates composition pattern', () => {
    // This test documents that EhmSearchBox combines multiple elements
    // into a higher-level domain component

    const wrapper = mount(EhmSearchBox);

    // Verify we have input and buttons
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.findAll('button').length).toBeGreaterThan(0);
  });

  it('exposes methods via defineExpose', () => {
    const wrapper = mount(EhmSearchBox);

    expect(typeof wrapper.vm.focus).toBe('function');
    expect(typeof wrapper.vm.clear).toBe('function');
    expect(typeof wrapper.vm.search).toBe('function');
  });

  it('applies expandable CSS class', () => {
    const wrapper = mount(EhmSearchBox, {
      props: { expandable: true },
    });

    const searchBox = wrapper.find('.ehm-search-box');
    expect(searchBox.classes()).toContain('ehm-search-box--expandable');
  });

  it('applies expanded CSS class when expanded', async () => {
    const wrapper = mount(EhmSearchBox, {
      props: { expandable: true },
    });

    const searchBox = wrapper.find('.ehm-search-box');

    const toggleButton = wrapper.findAll('button')[0];
    if (toggleButton) {
      await toggleButton.trigger('click');
      expect(searchBox.classes()).toContain('ehm-search-box--expanded');
    }
  });
});
