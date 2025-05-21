import { defineComponent, provide } from 'vue';

export default defineComponent({
	name: 'ThemeProvider',
	props: {
		theme: {
			type: Object,
			required: true
		}
	},
	setup(props, { slots }) {
		provide('theme', props.theme);
		return () => slots.default ? slots.default() : null;
	}
});