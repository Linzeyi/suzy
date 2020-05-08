// 计算工具类方法
export default {
  // 获取范围随机数
  GetRandom(min, max) {
    if (min > max) {
      let swap
      swap = min
      min = max
      max = swap
    }
    max++
    return Math.floor(Math.random() * (max - min)) + min
  }
}
