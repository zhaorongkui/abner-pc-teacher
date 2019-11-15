function findComponentUpward (context, componentName, componentNames) {
  if (typeof componentName === 'string') {
    componentNames = [componentName]
  } else {
    componentNames = componentName
  }
  let parent = context.$parent
  let name = parent.$options.name
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent
    if (parent) name = parent.$options.name
  }
  return parent
}
// 只能处理0-99
function toChinesNum(num) {
  num = Number(num);
  var upperCaseNumber = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿'];
  var length = String(num).length;
  if (length == 1) {
    return upperCaseNumber[num];
  } else if (length == 2) {
    if (num == 10) {
      return upperCaseNumber[num];
    } else if (num > 10 && num < 20) {
      return '十' + upperCaseNumber[String(num).charAt(1)];
    } else {
      return upperCaseNumber[String(num).charAt(0)] + '十' + upperCaseNumber[String(num).charAt(1)].replace('零', '');
    }
  }
}
// 计算两个时间差几天
function getDateDiff( date1, date2) {    //sDate1和sDate2是20180518格式
  //根据年 . 月 . 日的值创建Date对象
  var date1Obj = new Date(date1);
  var date2Obj = new Date(date2);
  var t1 = date1Obj.getTime();
  var t2 = date2Obj.getTime();
  var dateTime = 1000*60*60*24; //每一天的毫秒数
  var minusDays = Math.floor(((t2-t1)/dateTime));//计算出两个日期的天数差
  var days = Math.abs(minusDays);//取绝对值
  return days;
};

export {findComponentUpward, toChinesNum, getDateDiff};
