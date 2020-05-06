// 时间工具类方法

//时间戳转日期
export function milliSecondToDate(msd) {
  var time = parseFloat(msd)
  if (null != time && '' != time) {
    var days = parseInt(msd / (1000 * 60 * 60 * 24))
    if (days == 0) {
      days = ''
    } else {
      days = days + '天'
    }
    var hours = parseInt((msd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    if (hours == 0) {
      hours = ''
    } else {
      hours = hours + '小时'
    }
    var minutes = parseInt((msd % (1000 * 60 * 60)) / (1000 * 60))
    if (minutes == 0) {
      minutes = ''
    } else {
      minutes = minutes + '分钟'
    }
    var seconds = parseInt((msd % (1000 * 60)) / 1000)
    if (seconds == 0) {
      seconds = ''
    } else {
      seconds = seconds + '秒'
    }
    time = days + hours + minutes + seconds
  }
  return time
}

//日期格式化，年月日-时分秒
export function DateFormat(time) {
  var date = new Date(time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var fmt = 'yyyy-MM-dd HH:mm:ss'
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'H+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}

//日期格式化，年月日
export function DateSimpleFormat(time) {
  var date = new Date(time) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var fmt = 'yyyy-MM-dd'
  var o = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate() //日
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

//与当前时刻相比较，超过返回true，未超时返回false
export function CheckIsAfterToday(sDate2) {
  var date1 = new Date()
  var date2 = new Date(sDate2)
  var diff = date2.getTime() - date1.getTime()
  return diff < 0 //若超时，返回true，未超时，返回false
}

//返回与当前时刻相差的天数
export function DateDiffFromNow(sDate2) {
  var date1 = new Date()
  var date2 = new Date(sDate2)
  var diff = date2.getTime() - date1.getTime()
  var days = Math.floor(diff / (24 * 3600 * 1000))
  return days //返回相差天数
}

//返回两个时刻的相差天数
export function DateDiff(sDate1, sDate2) {
  var date1 = new Date(sDate1)
  var date2 = new Date(sDate2)
  var diff = date2.getTime() - date1.getTime()
  var days = Math.floor(diff / (24 * 3600 * 1000))
  return days //返回相差天数
}

//获取某月里的天数
export function GetDaysOfMonth(year, month) {
  var d = new Date(year, month, 0)
  return d.getDate()
}
