import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
	title: 'EHM Design System',
	description: 'Documentation for EHMDS - Enhanced Design System based on FKUI',
	base: '/ehmds-on-fkui-test/', // GitHub Pages base path

	themeConfig: {
		nav: [
			{ text: 'Guide', link: '/guide/getting-started' },
			{ text: 'Components', link: '/components/button' },
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
			'/components/': [
				{
					text: 'Components',
					items: [
						{ text: 'Button', link: '/components/button' },
						{ text: 'Card', link: '/components/card' }
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