// src/components/Button.js
import { defineComponent, h } from 'vue';
import { FkButton } from '@fkui/vue';

export const Button = defineComponent({
	name: 'EhButton',

	props: {
		// Extend FKUI button props
		variant: {
			type: String,
			default: 'primary',
			validator: (value) => ['primary', 'secondary', 'tertiary', 'danger'].includes(value)
		},
		size: {
			type: String,
			default: 'medium',
			validator: (value) => ['small', 'medium', 'large'].includes(value)
		},
		disabled: {
			type: Boolean,
			default: false
		},
		fullWidth: {
			type: Boolean,
			default: false
		},
		icon: {
			type: String,
			default: null
		},
		// Add custom props specific to your design system
		rounded: {
			type: Boolean,
			default: false
		},
		elevation: {
			type: Number,
			default: 0,
			validator: (value) => value >= 0 && value <= 3
		}
	},

	setup(props, { slots, attrs, emit }) {
		return () => {
			// Prepare custom classes based on your design system's props
			const customClasses = [
				props.rounded ? 'eh-button--rounded' : '',
				props.elevation ? `eh-button--elevation-${props.elevation}` : ''
			].filter(Boolean).join(' ');

			// Merge classes with any passed from parent
			const mergedClass = attrs.class
				? `${attrs.class} ${customClasses}`
				: customClasses;

			// Create new attrs object with merged classes
			const newAttrs = {
				...attrs,
				class: mergedClass || undefined
			};

			// Pass props to FkButton, but filter out custom props
			const fkProps = {
				variant: props.variant,
				size: props.size,
				disabled: props.disabled,
				fullWidth: props.fullWidth,
				icon: props.icon
			};

			// Return the rendered FkButton with our customizations
			return h(FkButton, {
				...fkProps,
				...newAttrs,
				onClick: (event) => emit('click', event)
			}, slots);
		};
	}
});

export default Button;