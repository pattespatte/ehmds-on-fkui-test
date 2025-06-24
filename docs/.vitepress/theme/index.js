import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import './custom.css'

// Import your EHMDS components
import EhmdsButton from '../../../src/components/Button.vue'
import EhmdsCard from '../../../src/components/Card.vue'

// Import component demo wrapper
import DemoBlock from './DemoBlock.vue'

export default {
	extends: DefaultTheme,
	Layout: () => {
		return h(DefaultTheme.Layout, null, {})
	},
	enhanceApp({ app }) {
		// Register EHMDS components globally for docs
		app.component('EhmdsButton', EhmdsButton)
		app.component('EhmdsCard', EhmdsCard)
		app.component('DemoBlock', DemoBlock)
	}
}