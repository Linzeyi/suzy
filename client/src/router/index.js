/* global Vue VueRouter */
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'default',
    component: () => import('@/views/Default.vue'),
    redirect: 'index',
    children: [
      {
        name: 'index',
        path: '/',
        component: () => import('@/pages/Index.vue')
      },
      {
        name: 'blog',
        path: '/blog',
        component: () => import('@/pages/Blog.vue')
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '*',
    redirect: '404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
