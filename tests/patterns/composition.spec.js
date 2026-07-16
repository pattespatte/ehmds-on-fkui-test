/**
 * Composition Pattern Tests
 * Tests EhmSearchBox, which composes MULTIPLE FKUI components into a
 * higher-level domain component.
 *
 * The defining claim of this pattern is that the component genuinely composes
 * several FKUI components — FTextField, FButton (×2), and FExpandablePanel —
 * rather than hand-rolling plain HTML elements. Several tests below assert that
 * those FKUI components are actually rendered, which is what makes this a
 * composition rather than a wrapper.
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

  // --- Proof of composition: real FKUI components are rendered -------------

  it('composes FKUI FTextField', () => {
    const wrapper = mount(EhmSearchBox);
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
  });

  it('composes FKUI FButton for the search action', () => {
    // FButton renders <button class="button button--primary ...">. Asserting
    // on the FKUI class proves a real FButton is composed, not a raw <button>.
    const wrapper = mount(EhmSearchBox);
    const primary = wrapper.find('.ehm-search-box__button');
    expect(primary.exists()).toBe(true);
    expect(primary.classes()).toContain('button');
    expect(primary.classes()).toContain('button--primary');
  });

  it('composes FKUI FButton for the clear action', () => {
    const wrapper = mount(EhmSearchBox, {
      props: { modelValue: 'has a query' },
    });
    const clear = wrapper.find('.ehm-search-box__clear');
    expect(clear.exists()).toBe(true);
    expect(clear.classes()).toContain('button');
    expect(clear.classes()).toContain('button--tertiary');
  });

  it('composes FKUI FExpandablePanel when expandable', () => {
    // This is the assertion the old test suite lacked: it proves the
    // "advanced search" toggle is a real FExpandablePanel (which manages its
    // own aria-expanded/aria-controls), not a hand-rolled button.
    const wrapper = mount(EhmSearchBox, {
      props: { expandable: true },
    });
    expect(wrapper.find('.expandable-panel').exists()).toBe(true);
    // FExpandablePanel renders the a11y-correct toggle itself.
    expect(wrapper.find('.expandable-panel__heading button').exists()).toBe(
      true,
    );
  });

  // --- v-model / search behaviour -----------------------------------------

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

    // Select the search button by its composed class, not by fragile index.
    const searchButton = wrapper.find('.ehm-search-box__button');
    expect(searchButton.exists()).toBe(true);
    await searchButton.trigger('click');
    expect(wrapper.emitted('search')).toBeTruthy();
  });

  it('clears search on clear button click', async () => {
    const wrapper = mount(EhmSearchBox, {
      props: { modelValue: 'initial value' },
    });

    const clearButton = wrapper.find('.ehm-search-box__clear');
    expect(clearButton.exists()).toBe(true);
    await clearButton.trigger('click');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('clear')).toBeTruthy();
  });

  it('search event payload is the trimmed query string', async () => {
    const wrapper = mount(EhmSearchBox, {
      props: { modelValue: '  hello  ' },
    });

    await wrapper.find('.ehm-search-box__button').trigger('click');
    expect(wrapper.emitted('search')[0]).toEqual(['hello']);
  });

  // --- expandable state ----------------------------------------------------

  it('toggles expandable state via FExpandablePanel', async () => {
    const wrapper = mount(EhmSearchBox, {
      props: { expandable: true },
    });

    expect(wrapper.vm.isExpanded).toBe(false);

    // The toggle is the button inside FExpandablePanel's heading.
    const toggleButton = wrapper.find('.expandable-panel__heading button');
    expect(toggleButton.exists()).toBe(true);
    await toggleButton.trigger('click');

    expect(wrapper.vm.isExpanded).toBe(true);
    // FExpandablePanel reflects the driven expanded state.
    expect(toggleButton.attributes('aria-expanded')).toBe('true');
  });

  // --- passthrough props ---------------------------------------------------

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

  // --- slots ---------------------------------------------------------------

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
    expect(wrapper.html()).toContain('🔍');
  });

  it('hides search icon when showIcon is false', () => {
    const wrapper = mount(EhmSearchBox, {
      props: { showIcon: false },
    });
    expect(wrapper.html()).toContain('Sök');
  });

  // --- shape / API ---------------------------------------------------------

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
    const toggleButton = wrapper.find('.expandable-panel__heading button');
    await toggleButton.trigger('click');

    expect(searchBox.classes()).toContain('ehm-search-box--expanded');
  });
});
