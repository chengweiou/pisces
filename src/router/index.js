import { createRouter, createWebHistory } from 'vue-router'
import { store } from '@/store'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      components: { full: () => import('./full.vue') },
      children: [
        { name: 'log', path: 'log', component: () => import('@/view/log/index.vue') },
        { name: 'refresh', path: 'refresh', component: () => import('@/view/refresh.vue') },
        { name: 'login', path: '', component: () => import('@/view/login/index.vue') },
      ],
    },
    {
      path: '/pisces',
      components: { full: () => import('./admin.vue') },
      children: [
        { name: 'dashboard', path: 'dashboard', component: () => import('@/view/dashboard/index.vue') },
        { name: 'personList', path: 'person', component: () => import('@/view/person/list.vue') },
        { name: 'personAdd', path: 'person/add', component: () => import('@/view/person/add.vue') },
        { name: 'person', path: 'person/:id', component: () => import('@/view/person/detail/index.vue') },
        { name: 'petList', path: 'pet', component: () => import('@/view/pet/list.vue') },
        { name: 'petAdd', path: 'pet/add', component: () => import('@/view/pet/add.vue') },
        { name: 'pet', path: 'pet/:id', component: () => import('@/view/pet/detail/index.vue') },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  let hasAuth = store.state.me.user.type == 'SUPER'
  if (to.name !== 'login' && !hasAuth) next({ name: 'login' })
  else next()
})
