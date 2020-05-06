
/* global Vue Vuex */
Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight
  },
  getters: {
    screenWidth: state => state.screenWidth,
    screenHeight: state => state.screenHeight
  },
  mutations: {
    setScreenWidth (state, value) {
      state.screenWidth = value
    },
    setScreenHeight (state, value) {
      state.screenHeight = value
    }
  },
  actions: {
    initWindowInfo (context) {
      console.log('监听并获取当前视窗数据，width:' + window.innerWidth + ', height: ' + window.innerHeight)
      window.onresize = () => {
        context.commit('setScreenWidth', window.innerWidth)
        context.commit('setScreenHeight', window.innerHeight)
      }
    }
  }
}