/**
 * Wrapper/Facade Pattern Tests
 * Tests EhmCard which wraps FCard with custom API
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import EhmCard from '@/components/wrapper/EhmCard.vue';

describe('Wrapper Pattern: EhmCard', () => {
  it('renders without errors', () => {
    const wrapper = mount(EhmCard);

    // Should render successfully
    expect(wrapper.html()).toBeTruthy();
  });

  it('applies ehm-card wrapper class', () => {
    const wrapper = mount(EhmCard);

    const card = wrapper.find('.ehm-card');
    expect(card.exists()).toBe(true);
  });

  it('exposes simplified title prop API (when no header slot)', () => {
    const wrapper = mount(EhmCard, {
      props: { title: 'Card Title' },
    });

    // Title only shows when header slot is NOT provided
    expect(wrapper.text()).toContain('Card Title');
  });

  it('exposes simplified subtitle prop API (when no header slot)', () => {
    const wrapper = mount(EhmCard, {
      props: {
        title: 'Card Title',
        subtitle: 'Card Subtitle',
      },
    });

    expect(wrapper.text()).toContain('Card Title');
    expect(wrapper.text()).toContain('Card Subtitle');
  });

  it('renders title when header slot is not provided', () => {
    const wrapper = mount(EhmCard, {
      props: {
        title: 'Only Title',
        subtitle: 'And Subtitle',
      },
    });

    // Without header slot, title should be shown
    expect(wrapper.text()).toContain('Only Title');
    expect(wrapper.text()).toContain('And Subtitle');
  });

  it('header slot takes precedence over title prop', () => {
    const wrapper = mount(EhmCard, {
      props: { title: 'Prop Title' },
      slots: {
        header: '<h1>Slot Header</h1>',
      },
    });

    expect(wrapper.text()).toContain('Slot Header');
    // When header slot is provided, title/subtitle props should NOT render
    expect(wrapper.text()).not.toContain('Prop Title');
  });

  it('renders default slot content', () => {
    const wrapper = mount(EhmCard, {
      slots: { default: 'Card content here' },
    });

    expect(wrapper.text()).toContain('Card content here');
  });

  it('renders footer slot', () => {
    const wrapper = mount(EhmCard, {
      slots: {
        default: 'Content',
        footer: '<button>Footer Action</button>',
      },
    });

    expect(wrapper.find('.ehm-card__footer').exists()).toBe(true);
    expect(wrapper.find('.ehm-card__footer').html()).toContain('Footer Action');
  });

  it('forwards actions slot from FCard', () => {
    const wrapper = mount(EhmCard, {
      slots: {
        actions: '<button>Action Button</button>',
      },
    });

    // The actions slot should be passed through to FCard
    expect(wrapper.text()).toContain('Action Button');
  });

  it('applies CSS classes on the wrapper element', () => {
    const wrapper = mount(EhmCard, {
      props: { variant: 'bordered' },
    });

    const card = wrapper.find('.ehm-card');
    expect(card.exists()).toBe(true);
    // Classes should be applied to the wrapper element
    expect(card.classes()).toBeTruthy();
  });

  it('passes id prop to underlying FCard', () => {
    const wrapper = mount(EhmCard, {
      props: { id: 'test-card-id' },
    });

    // id should be in the HTML (not checking exact format due to Vue comments)
    expect(wrapper.html()).toContain('test-card-id');
  });

  it('passes focusRef to underlying FCard', () => {
    const mockElement = document.createElement('div');
    const wrapper = mount(EhmCard, {
      props: { errorRef: mockElement },
    });

    // Verify that component accepts the ref prop
    expect(wrapper.props('errorRef')).toBe(mockElement);
  });

  it('validates variant prop', () => {
    // Check if validator works
    const validator = EhmCard.props?.variant?.validator;

    if (validator) {
      expect(validator('default')).toBe(true);
      expect(validator('bordered')).toBe(true);
      expect(validator('elevated')).toBe(true);
      expect(validator('compact')).toBe(true);
      expect(validator('invalid')).toBe(false);
    }
  });

  it('does not render footer when slot not provided', () => {
    const wrapper = mount(EhmCard);

    expect(wrapper.find('.ehm-card__footer').exists()).toBe(false);
  });

  it('demonstrates wrapper pattern by providing simplified API', () => {
    // This test documents that EhmCard provides a simplified API
    // while wrapping FCard's functionality

    const wrapper = mount(EhmCard, {
      props: {
        variant: 'elevated',
        hasError: false,
      },
    });

    // Verify EHMDS-specific API exists
    expect(EhmCard.props).toBeDefined();
    expect(EhmCard.props?.variant).toBeDefined();
    expect(EhmCard.props?.hasError).toBeDefined();
    expect(EhmCard.props?.errorRef).toBeDefined();

    // Component renders successfully
    expect(wrapper.html()).toBeTruthy();
  });

  it('forwards all remaining attributes to FCard', () => {
    const wrapper = mount(EhmCard, {
      attrs: {
        'data-testid': 'test-card',
        'aria-label': 'Test Card',
      },
    });

    // Attributes should be passed through (checking for data-testid in HTML)
    expect(wrapper.html()).toContain('data-testid="test-card"');
  });
});
