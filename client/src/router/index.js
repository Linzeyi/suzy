import Main from '../pages/Main.vue'
import Blog from '../pages/Blog.vue'

/* global Vue VueRouter */
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'default',
    component: () => import('@/views/Default.vue'),
    redirect: 'main',
    children: [
      {
        name: 'main',
        path: '/main',
        component: Main
      },
      {
        name: 'blog',
        path: '/blog',
        component: Blog
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
