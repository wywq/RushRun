import qs from "qs";
import config from "@/config/index.js";
const baseUrl = config.baseUrl;
// POST方式请求
export function post(url, data, callback) {
  uni.request({
    url: baseUrl + url,
    method: "POST",
    data,
    dataType: "json",
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
    success: res => {
      console.log("源头", res);
      if (res.data.status == "tokenerror") {
        // #ifdef APP-PLUS
        plus.nativeUI.toast("授权失败", {
          verticalAlign: "top",
        });
        setTimeout(() => {
          uni.navigateTo({
            url: "/pages/basic/login/index",
          });
          // document.location = "testkey://openLogin";
        }, 2000);
        // #endif
        return;
      } else {
        callback && callback(res.data);
        console.log(res.data);
      }
    },
    fail: error => {
      console.log(error);
    },
  });
}

// 带token POST方式请求
export function postAuth(url, data, callback) {
  let token = uni.getStorageSync("zlc_token")
    ? uni.getStorageSync("zlc_token")
    : "";
  // let token = localStorage.getItem("zlc_token")
  //   ? localStorage.getItem("zlc_token")
  //   : "";
  let obj = {
    token,
  };
  //添加token
  Object.assign(data, obj);
  uni.request({
    method: "POST",
    url: baseUrl + url,
    data: qs.stringify(data),
    header: {
      // token: uni.getStorageSync("token") || "", //自定义请求头信息
      "content-type": "application/x-www-form-urlencoded",
    },
    success: res => {
      if (res.data.status == 1) {
        callback(res.data);
      } else if (res.data.status == -998 || res.data.status == -999) {
        uni.showToast({
          title: res.data.info,
          icon: "none",
        });
        setTimeout(() => {
          uni.reLaunch({
            url: "/pages/basic/login/index",
          });
          // document.location = "testkey://openLogin";
        }, 1500);
      } else {
        callback(res.data);
      }
    },
    fail: res => {
      // #ifdef APP-PLUS
      // plus.nativeUI.toast("授权失败", {
      //   verticalAlign: "top",
      // });
      // #endif
      // setTimeout(() => {
      //   uni.navigateTo({
      //     url: "/pages/login/login",
      //   });
      // }, 2000);
    },
  });
}

//上传图片
export function postFile(imageSrc, url, callback) {
  uni.uploadFile({
    url: baseUrl + url,
    filePath: imageSrc,
    fileType: "image",
    name: "pic_file",
    success: res => {
      res = JSON.parse(res.data);
      callback(res);
    },
    fail: err => {
      callback(err);
    },
  });
}

export default {
  post,
  postAuth,
  postFile,
};
