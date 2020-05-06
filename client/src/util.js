/* global Vue */
import * as MathUtils from '@/utils/math.js'
import * as JudgeUtils from '@/utils/judge.js'
import * as TimeUtils from '@/utils/time.js'

import * as FakeUtils from '@/utils/fake.js'

//将js里自己写的通用方法注册到Vue.prototype中
//全局调用语句：this.xxxUtils.func()
export default {
  install(Vue) {
    Vue.prototype.MathUtils = MathUtils
    Vue.prototype.JudgeUtils = JudgeUtils
    Vue.prototype.TimeUtils = TimeUtils
    Vue.prototype.FakeUtils = FakeUtils
  }
}
