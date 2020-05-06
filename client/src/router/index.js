import Default from '../views/Default.vue'
import Main from '../pages/Main.vue'
import Blog from '../pages/Blog.vue'

/* global Vue VueRouter */
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'default',
    component: Default,
    redirect: 'main',
    children: [
      {
        name: 'main',
        path: '/main',
        component: Main,
      },
      {
        name: 'blog',
        path: '/blog',
        component: Blog
      }
    ]
  },
  {
    path: '*',
    component: Default,
    redirect: 'main'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
