import { createRouter, createWebHistory } from 'vue-router'
import AccountsPage from '@/pages/AccountsPage.vue'

const routes = [{ path: '/', component: AccountsPage }]
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
