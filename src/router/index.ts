import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// Demo component (the live interactive examples)
import DemoHome from '../views/DemoHome.vue'

// Documentation components
import DocsIndex from '../views/docs/DocsIndex.vue'
import DocsPage from '../views/docs/DocsPage.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: DemoHome,
    meta: { title: 'EHMDS Design System | Architecture Patterns & Components' },
  },
  {
    path: '/docs',
    name: 'docs-index',
    component: DocsIndex,
    meta: { title: 'Documentation | EHMDS Architecture' },
  },
  {
    path: '/docs/architecture/:page',
    name: 'docs-architecture',
    component: DocsPage,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory('/ehmds-on-fkui-test/'),
  routes,
})

// Update document title based on route meta
router.beforeEach((to, from, next) => {
  const pageTitle = (to.meta.title as string) || 'EHMDS'
  document.title = pageTitle
  next()
})

export default router
