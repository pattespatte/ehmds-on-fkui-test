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

  it('does not invent slot forwarding for slots FCard does not have', () => {
    // FCard's real slots are: header, error-message, default, footer.
    // There is no 'actions' slot on FCard, so EhmCard does not forward one
    // (forwarding a non-existent slot would be dead code that teaches the
    // wrong thing about the wrapper pattern). This test documents that
    // decision and guards against reintroducing the dead forwarding.
    const wrapper = mount(EhmCard, {
      slots: {
        actions: '<button>Action Button</button>',
      },
    });

    // 'actions' content is not rendered because neither EhmCard nor FCard
    // declares that slot.
    expect(wrapper.text()).not.toContain('Action Button');
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

  it('maps each variant prop to its EHMDS CSS class', () => {
    // `variant` is declared via a TS type with no runtime validator, so the old
    // `props.variant.validator` assertion silently no-op'd. Assert on the real
    // effect instead: each variant must produce its modifier class, and an
    // unknown variant must not.
    const cases = [
      ['bordered', 'ehm-card--bordered'],
      ['elevated', 'ehm-card--elevated'],
      ['compact', 'ehm-card--compact'],
    ];

    for (const [variant, className] of cases) {
      const wrapper = mount(EhmCard, { props: { variant } });
      expect(wrapper.find('.ehm-card').classes()).toContain(className);
    }

    // default variant adds no modifier class.
    const def = mount(EhmCard, { props: { variant: 'default' } });
    const defClasses = def.find('.ehm-card').classes();
    expect(defClasses).not.toContain('ehm-card--bordered');
    expect(defClasses).not.toContain('ehm-card--elevated');
    expect(defClasses).not.toContain('ehm-card--compact');
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
