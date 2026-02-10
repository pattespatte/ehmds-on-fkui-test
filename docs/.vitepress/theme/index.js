import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'

// Import component demo wrapper
import DemoBlock from './DemoBlock.vue'

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {})
	},
	enhanceApp({ app }) {
		// Register demo wrapper component
		app.component('DemoBlock', DemoBlock)
	}
}