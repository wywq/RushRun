import request from "@/config";
// import fetch from './fetch';
// 网络监听
const NetWork = {
  // 网络状态
  isConnect: false,
  // 监听网络状态
  On() {
    // 获取当前网络状态
    uni.getNetworkType({
      success: res => {
        if (res.networkType !== "none") {
          this.isConnect = true;
          return;
        }
        uni.showToast({
          icon: "none",
          title: "请先连接网络",
        });
      },
    });
    // 监听网络状态变化
    uni.onNetworkStatusChange(res => {
      this.isConnect = res.isConnected;
      if (!res.isConnected) {
        uni.showToast({
          icon: "none",
          title: "您目前处于断网状态",
        });
      }
    });
  },
};
//是否更新
function isUpdate(online, underline, type, url) {
  if (online > underline) {
    uni.showModal({
      //提醒用户更新
      title: "提示",
      content: "新版本更新",
      showCancel: false,
      success: () => {
        if (type == 2) {
          plus.runtime.openURL(url);
        } else {
          plus.runtime.openURL(
            `itms-services://?action=download-manifest&url=${url}`
          );
        }
      },
    });
  } else {
    callback && callback();
  }
}
// app更新
function Update(callback) {
  // #ifdef APP-PLUS
  let type = 0;
  let os = uni.getSystemInfoSync().platform;
  if (os == "android") {
    type = 2;
  } else {
    type = 1;
  }
  var server = request.baseUrl + "Login/getVersionNumber"; //检查更新地址
  uni.request({
    url: server,
    data: {},
    method: "POST",
    dataType: "json",
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
    success: res => {
      console.log(res.data);
      let url = res.data.data.app_url;
      plus.runtime.getProperty(plus.runtime.appid, wgtinfo => {
        console.log("线下版本", wgtinfo.version);
        let xianshangAndroid = Number(
          res.data.data.database_version_android.replace(/[.]/g, "")
        );
        let xianshangIos = Number(
          res.data.data.database_version_ios.replace(/[.]/g, "")
        );
        let xianxia = Number(wgtinfo.version.replace(/[.]/g, ""));
        console.log("计算", xianshangAndroid, xianshangIos, xianxia);
        if (type == 1) {
          isUpdate(xianshangIos, xianxia, type, url);
        } else if (type == 2) {
          isUpdate(xianshangAndroid, xianxia, type, url);
        }
      });
    },
  });
  // #endif
}

export default {
  NetWork,
  Update,
};
