import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
	title: 'EHM Design System',
	description: 'Documentation for EHMDS - Enhanced Design System based on FKUI',
	base: '/ehmds-on-fkui-test/', // GitHub Pages base path

	themeConfig: {
		nav: [
			{ text: 'Guide', link: '/guide/getting-started' },
			{ text: 'Architecture', link: '/architecture/overview' },
			{ text: 'GitHub', link: 'https://github.com/pattespatte/ehmds-on-fkui-test' }
		],

		sidebar: {
			'/guide/': [
				{
					text: 'Introduction',
					items: [
						{ text: 'Getting Started', link: '/guide/getting-started' },
						{ text: 'Installation', link: '/guide/installation' },
						{ text: 'Contributing', link: '/guide/contributing' }
					]
				}
			],
			'/architecture/': [
				{
					text: 'Architecture Patterns',
					items: [
						{ text: 'Overview', link: '/architecture/overview' },
						{ text: 'Pattern Comparison', link: '/architecture/comparison' },
						{ text: 'Token Override', link: '/architecture/token-override' },
						{ text: 'Wrapper/Facade', link: '/architecture/wrapper' },
						{ text: 'Extension', link: '/architecture/extension' },
						{ text: 'Composition', link: '/architecture/composition' }
					]
				}
			]
		},

		search: {
			provider: 'local'
		}
	},

	vite: {
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('../../src', import.meta.url))
			}
		}
	}
})