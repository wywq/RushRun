// 全局本地存储方法
const storage = {
  set(key, value) {
    uni.setStorageSync(key, value);
  },
  get(key) {
    return uni.getStorageSync(key);
  },
  remove(key) {
    uni.removeStorageSync(key);
  },
};
// 全局提示方法
function toast(title) {
  uni.showToast({
    title: title,
    duration: 2000,
    icon: "none",
  });
}
// 全局底部提示方法
function bottomToast(title) {
  uni.showToast({
    title: title,
    icon: "none",
    position: "bottom",
  });
}
//倒计时
function countDown(time, doop) {
  doop = 60;
  time = setInterval(() => {
    doop--;
    console.log(doop);
    if (doop <= 0) {
      clearInterval(time);
    }
  }, 1000);
}
//退出登录
function LogOut() {
  storage.remove("zlc_token");
  storage.remove("zlc_phone");
  storage.remove("zlc_userId");
  uni.reLaunch({
    url: "/pages/basic/login/index",
  });
}
//时间戳转星期
function tsToWeek(timestamp) {
  let date = new Date(timestamp * 1000);
  var week;
  switch (Number(date.getDay())) {
    case 0:
      week = "星期日";
      break;
    case 1:
      week = "星期一";
      break;
    case 2:
      week = "星期二";
      break;
    case 3:
      week = "星期三";
      break;
    case 4:
      week = "星期四";
      break;
    case 5:
      week = "星期五";
      break;
    case 6:
      week = "星期六";
      break;
  }
  return week;
}
//时间戳转年月日
function tsToYMD(timestamp) {
  let date = new Date(timestamp * 1000);
  let year = date.getFullYear();
  let mon = date.getMonth() + 1;
  let day = date.getDate();
  if (mon < 10) {
    mon = "0" + mon;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return `${year}年${mon}月${day}日`;
}
//时间戳转日期
function tsToDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let mon = date.getMonth() + 1;
  let day = date.getDate();
  if (mon < 10) {
    mon = "0" + mon;
  }
  if (day < 10) {
    day = "0" + day;
  }
  return `${mon}月${day}日`;
}
//时间戳转时分
function tsToTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let hou = date.getHours();
  let min = date.getMinutes();
  if (hou < 10) {
    hou = "0" + hou;
  }
  if (min < 10) {
    min = "0" + min;
  }
  return `${hou}:${min}`;
}
//获取时间戳距现在时间
function getTimeBefore(timestamp) {
  let curTime = Date.parse(new Date());
  let duration = Number(curTime) - Number(timestamp * 1000);
  // 少于一分钟
  let time = duration / 1000;
  if (time < 60) {
    return "刚刚";
  }
  // 秒转分钟
  let minuies = time / 60;
  if (minuies < 60) {
    return Math.floor(minuies) + "分钟前";
  }

  // 秒转小时
  let hours = time / 3600;
  if (hours < 24) {
    return Math.floor(hours) + "小时前";
  }
  //秒转天数
  let days = time / 3600 / 24;
  if (days < 30) {
    return Math.floor(days) + "天前";
  }
  //秒转月
  let months = time / 3600 / 24 / 30;
  if (months < 12) {
    return Math.floor(months) + "月前";
  }
  //秒转年
  let years = time / 3600 / 24 / 30 / 12;
  return Math.floor(years) + "年前";
}
//科学计数法转小数
function toNonExponential(num) {
  if (isNaN(num)) {
    return num;
  }
  var str = "" + num;
  if (!/e/i.test(str)) {
    return num;
  }
  return num.toFixed(8).replace(/\.?0+$/, "");
}
//
function toolNumber(num_str) {
  num_str = num_str.toString();
  if (num_str.indexOf("+") != -1) {
    num_str = num_str.replace("+", "");
  }
  if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
    var resValue = "",
      power = "",
      result = null,
      dotIndex = 0,
      resArr = [],
      sym = "";
    var numStr = num_str.toString();
    if (numStr[0] == "-") {
      // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
      numStr = numStr.substr(1);
      sym = "-";
    }
    if (numStr.indexOf("E") != -1 || numStr.indexOf("e") != -1) {
      var regExp = new RegExp(
        "^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$",
        "ig"
      );
      result = regExp.exec(numStr);
      if (result != null) {
        resValue = result[2];
        power = result[5];
        result = null;
      }
      if (!resValue && !power) {
        return false;
      }
      dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");
      resValue = resValue.replace(".", "");
      resArr = resValue.split("");
      if (Number(power) >= 0) {
        var subres = resValue.substr(dotIndex);
        power = Number(power);
        //幂数大于小数点后面的数字位数时，后面加0
        for (var i = 0; i <= power - subres.length; i++) {
          resArr.push("0");
        }
        if (power - subres.length < 0) {
          resArr.splice(dotIndex + power, 0, ".");
        }
      } else {
        power = power.replace("-", "");
        power = Number(power);
        //幂数大于等于 小数点的index位置, 前面加0
        for (var i = 0; i < power - dotIndex; i++) {
          resArr.unshift("0");
        }
        var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
        resArr.splice(n, 0, ".");
      }
    }
    resValue = resArr.join("");

    return sym + resValue;
  } else {
    return num_str;
  }
}
module.exports = {
  storage,
  LogOut,
  countDown,
  toast,
  bottomToast,
  tsToYMD,
  tsToWeek,
  tsToDate,
  tsToTime,
  getTimeBefore,
  toNonExponential,
  toolNumber,
};
