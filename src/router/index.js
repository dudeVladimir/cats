import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('../views/AllCats.vue'),
  },
  {
    path: '/liked-cats',
    component: () => import('../views/LikedCats.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
})

export default router
