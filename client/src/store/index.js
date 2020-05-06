import home from './modules/home/index'
import window from './modules/window/index'

/* global Vue Vuex */
Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    home,
    window
  }
})
