import { createRouter, createWebHistory } from 'vue-router';

// Demo component (the live interactive examples)
import DemoHome from '../views/DemoHome.vue';

// Documentation components
import DocsIndex from '../views/docs/DocsIndex.vue';
import DocsPage from '../views/docs/DocsPage.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: DemoHome,
	},
	{
		path: '/docs',
		name: 'docs-index',
		component: DocsIndex,
	},
	{
		path: '/docs/architecture/:page',
		name: 'docs-architecture',
		component: DocsPage,
		props: true,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
