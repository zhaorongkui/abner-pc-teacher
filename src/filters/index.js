function dateFtt(fmt, date) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}
export function formatDate(value, format = 'yyyy-MM-dd hh:mm:ss') {
  var crtTime = new Date(value)
  return dateFtt(format, crtTime)
}
export function formatDates(value, format = 'MM月dd日作业') {
  var crtTime = new Date(value)
  return dateFtt(format, crtTime)
}
export function p(number) {
  return number < 10 ? '0' + number : number
}
export function getWeekOfYear() {
  var today = new Date()
  var firstDay = new Date(today.getFullYear(), 0, 1)
  var dayOfWeek = firstDay.getDay()
  var spendDay = 1
  if (dayOfWeek != 0) {
    spendDay = 7 - dayOfWeek + 1
  }
  firstDay = new Date(today.getFullYear(), 0, 1 + spendDay)
  var d = Math.ceil((today.valueOf() - firstDay.valueOf()) / 86400000)
  var result = Math.ceil(d / 7)
  return result + 1
}
export function relativeTime(value) {
  let time = value * 1000
  if (time > 0) {
    let d, h, m, s
    let str = ''
    d = Math.floor(time / 1000 / 60 / 60 / 24)
    h = Math.floor(time / 1000 / 60 / 60 % 24)
    m = Math.floor(time / 1000 / 60 % 60)
    s = Math.floor(time / 1000 % 60)
    if (d) str += d + '天'
    if (h) str += h + '小时'
    if (m) str += m + '分'
    if (s) str += s + '秒'
    return str
  } else {
    return '--'
  }
}

export function statusName(val) {
  let statusName = ''
  switch (val) {
    case 1: {
      statusName = '单选'
      break
    }
    case 2: {
      statusName = '多选'
      break
    }
    case 3: {
      statusName = '判断'
      break
    }
    case 4: {
      statusName = '题组'
      break
    }
    case 5: {
      statusName = '填空'
      break
    }
    case 6: {
      statusName = '主观题'
      break
    }
  }
  return statusName
}

export function grade(val) {
  let grade = ''
  switch (val) {
    case 1: {
      grade = '一年级'
      break
    }
    case 2: {
      grade = '二年级'
      break
    }
    case 3: {
      grade = '三年级'
      break
    }
    case 4: {
      grade = '四年级'
      break
    }
    case 5: {
      grade = '五年级'
      break
    }
    case 6: {
      grade = '六年级'
      break
    }
    case 7: {
      grade = '七年级'
      break
    }
    case 8: {
      grade = '八年级'
      break
    }
    case 9: {
      grade = '九年级'
      break
    }
    case 10: {
      grade = '高一'
      break
    }
    case 11: {
      grade = '高二'
      break
    }
    case 12: {
      grade = '高三'
      break
    }
  }
  return grade
}
