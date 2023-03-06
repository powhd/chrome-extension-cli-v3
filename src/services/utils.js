function completeDate(value) {
  return value < 10 ? "0" + value : value;
}

export const getNowFormatDay = (nowDate) => {
  var char = "-";
  if (nowDate == null) {
    nowDate = new Date();
  }
  var day = nowDate.getDate();
  var month = nowDate.getMonth() + 1; //注意月份需要+1
  var year = nowDate.getFullYear();
  return year + char + completeDate(month) + char + completeDate(day);
};
export const getNowFormatTime = () => {
  var nowDate = new Date();
  var colon = ":";
  var h = nowDate.getHours();
  var m = nowDate.getMinutes();
  var s = nowDate.getSeconds();
  return (
    getNowFormatDay(nowDate) +
    " " +
    completeDate(h) +
    colon +
    completeDate(m) +
    colon +
    completeDate(s)
  );
};

export const throttle = (func, delay) => {
  var prev = Date.now();
  return () => {
    var args = arguments;
    var now = Date.now();
    if (now - prev >= delay) {
      prev = Date.now();
      return func.apply(this, args);
    }
  };
};
