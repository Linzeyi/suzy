/* global Vue VueRouter */
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'default',
    component: () => import('@/views/Default.vue'),
    redirect: 'home',
    children: [
      {
        name: 'home',
        path: '/',
        component: () => import('@/pages/Home')
      },
      {
        name: 'blog',
        path: '/blog',
        component: () => import('@/pages/Blog')
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

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
