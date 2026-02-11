/**
 * Extension Pattern Tests
 * Tests EhmTextField which extends FTextField with additional features
 */

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import EhmTextField from '@/components/extension/EhmTextField.vue';

describe('Extension Pattern: EhmTextField', () => {
  it('renders without errors', () => {
    const wrapper = mount(EhmTextField, {
      props: { modelValue: '' },
    });

    expect(wrapper.html()).toBeTruthy();
  });

  it('preserves FKUI v-model binding', async () => {
    const wrapper = mount(EhmTextField, {
      props: { modelValue: '' },
    });

    const input = wrapper.find('input');
    await input.setValue('test value');

    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['test value']);
  });

  it('passes through FKUI props like placeholder', () => {
    const wrapper = mount(EhmTextField, {
      props: {
        modelValue: '',
        placeholder: 'Enter text here',
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('placeholder')).toBe('Enter text here');
  });

  it('adds character count feature', () => {
    const wrapper = mount(EhmTextField, {
      props: {
        modelValue: 'test',
        maxLength: 100,
        showCharacterCount: true,
      },
    });

    expect(wrapper.html()).toContain('4');
    expect(wrapper.html()).toContain('100');
  });

  it('adds label feature', () => {
    const wrapper = mount(EhmTextField, {
      props: {
        modelValue: '',
        label: 'Full Name',
      },
    });

    expect(wrapper.find('.ehm-text-field__label').exists()).toBe(true);
    expect(wrapper.find('.ehm-text-field__label').text()).toBe('Full Name');
  });

  it('adds helper text feature', () => {
    const wrapper = mount(EhmTextField, {
      props: {
        modelValue: '',
        helperText: 'Enter your full name including middle name',
      },
    });

    expect(wrapper.find('.ehm-text-field__helper').exists()).toBe(true);
    expect(wrapper.find('.ehm-text-field__helper').text()).toContain(
      'Enter your full name including middle name',
    );
  });

  it('renders prefix slot', () => {
    const wrapper = mount(EhmTextField, {
      props: { modelValue: '' },
      slots: {
        prefix: '<span class="prefix-icon">@</span>',
      },
    });

    expect(wrapper.html()).toContain('prefix-icon');
  });

  it('renders suffix slot', () => {
    const wrapper = mount(EhmTextField, {
      props: { modelValue: '' },
      slots: {
        suffix: '<span class="suffix-icon">.com</span>',
      },
    });

    expect(wrapper.html()).toContain('suffix-icon');
  });

  it('preserves FKUI disabled state', () => {
    const wrapper = mount(EhmTextField, {
      props: {
        modelValue: '',
        disabled: true,
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('disabled')).toBeDefined();
  });

  it('preserves FKUI readonly state', () => {
    const wrapper = mount(EhmTextField, {
      props: {
        modelValue: 'readonly value',
        readonly: true,
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('readonly')).toBeDefined();
  });

  it('shows error state when hasError is true', () => {
    const wrapper = mount(EhmTextField, {
      props: {
        modelValue: '',
        hasError: true,
        errorMessage: 'This field is required',
      },
    });

    expect(wrapper.find('.ehm-text-field__error').exists()).toBe(true);
  });

  it('character count updates with input', async () => {
    const wrapper = mount(EhmTextField, {
      props: {
        modelValue: '',
        maxLength: 10,
        showCharacterCount: true,
      },
    });

    const input = wrapper.find('input');
    await input.setValue('hello');

    expect(wrapper.find('.ehm-text-field__charcount').text()).toContain('5');
    expect(wrapper.find('.ehm-text-field__charcount').text()).toContain('10');
  });

  it('respects FKUI type prop', () => {
    const wrapper = mount(EhmTextField, {
      props: {
        modelValue: '',
        type: 'email',
      },
    });

    const input = wrapper.find('input');
    expect(input.attributes('type')).toBe('email');
  });

  it('shows required asterisk when required is true', () => {
    const wrapper = mount(EhmTextField, {
      props: {
        modelValue: '',
        label: 'Email',
        required: true,
      },
    });

    expect(wrapper.find('.ehm-text-field__required').exists()).toBe(true);
  });

  it('does not show helper text when in error state', () => {
    const wrapper = mount(EhmTextField, {
      props: {
        modelValue: '',
        helperText: 'Enter email',
        hasError: true,
        errorMessage: 'Invalid email',
      },
    });

    // Error message should show, not helper text
    expect(wrapper.find('.ehm-text-field__error').exists()).toBe(true);
    expect(wrapper.find('.ehm-text-field__helper').exists()).toBe(false);
  });

  it('enforces maxLength by truncating input', async () => {
    const wrapper = mount(EhmTextField, {
      props: {
        modelValue: '',
        maxLength: 5,
      },
    });

    const input = wrapper.find('input');
    await input.setValue('this is way too long');

    // Should be truncated to maxLength
    const emitted = wrapper.emitted('update:modelValue');
    expect(emitted).toBeTruthy();
    const lastEmittedValue = emitted[emitted.length - 1][0];
    expect(String(lastEmittedValue).length).toBeLessThanOrEqual(5);
  });

  it('demonstrates extension pattern by adding value', () => {
    // This test documents that EhmTextField extends FTextField
    // by adding features that FKUI doesn't provide out-of-the-box

    const wrapper = mount(EhmTextField, {
      props: {
        modelValue: 'test',
        label: 'Label',
        helperText: 'Helper',
        maxLength: 50,
        showCharacterCount: true,
      },
    });

    // Verify all EHMDS additions are present
    expect(wrapper.find('.ehm-text-field__label').exists()).toBe(true); // EHMDS feature
    expect(wrapper.find('.ehm-text-field__helper').exists()).toBe(true); // EHMDS feature
    expect(wrapper.find('.ehm-text-field__charcount').exists()).toBe(true); // EHMDS feature

    const label = wrapper.find('.ehm-text-field__label');
    expect(label.text()).toBe('Label');

    const helper = wrapper.find('.ehm-text-field__helper');
    expect(helper.text()).toBe('Helper');

    const charCount = wrapper.find('.ehm-text-field__charcount');
    expect(charCount.text()).toContain('4'); // Current length
    expect(charCount.text()).toContain('50'); // Max length
  });

  it('emits focus event', async () => {
    const wrapper = mount(EhmTextField, {
      props: { modelValue: '' },
    });

    await wrapper.find('input').trigger('focus');

    expect(wrapper.emitted('focus')).toBeTruthy();
  });

  it('validates type prop', () => {
    const validator = EhmTextField.props?.type?.validator;

    if (validator) {
      expect(validator('text')).toBe(true);
      expect(validator('email')).toBe(true);
      expect(validator('tel')).toBe(true);
      expect(validator('url')).toBe(true);
      expect(validator('password')).toBe(true);
      expect(validator('number')).toBe(true);
      expect(validator('search')).toBe(true);
      expect(validator('invalid')).toBe(false);
    }
  });

  it('validates variant prop', () => {
    const validator = EhmTextField.props?.variant?.validator;

    if (validator) {
      expect(validator('default')).toBe(true);
      expect(validator('success')).toBe(true);
      expect(validator('warning')).toBe(true);
      expect(validator('error')).toBe(true);
      expect(validator('invalid')).toBe(false);
    }
  });
});
