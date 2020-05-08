/* global Vue */

//将js里自己写的通用方法注册到Vue.prototype中
//全局调用语句：this.$xxx.func()
export default {
  install(Vue) {
    Vue.prototype.$math = require('@/utils/math.js').default
    Vue.prototype.$verify = require('@/utils/verify.js').default
    Vue.prototype.$time = require('@/utils/time.js').default
    Vue.prototype.$fake = require('@/utils/fake.js').default
  }
}
