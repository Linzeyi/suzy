/* global Vue */
import App from './App.vue'
import store from './store'
import router from './router'

//统一引入样式
import './style.js'

//拦截器
import './plugins/axios'

//注册全局组件
import components from './components.js'
Object.keys(components).forEach(key => {
  var name = key.replace(/(\w)/, v => v.toUpperCase())
  Vue.component(name, components[key])
})

//注入工具类
import util from '@/util.js'
Vue.use(util)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
