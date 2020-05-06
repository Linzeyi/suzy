const path = require('path');
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "~@/assets/styles/_variable.scss";
        `
      }
    }
  },
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'jquery': '$',
      'vue-router': 'VueRouter',
      'axios': 'axios',
      'vuex': 'Vuex'
    }
  }
}