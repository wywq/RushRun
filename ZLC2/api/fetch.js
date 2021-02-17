import config from "@/config/index.js";
const baseUrl = config.baseUrl;
import Utils from "@/common/utils/index";
import Store from "@/store/index";
// import { RSA } from "@/common/utils/rsa.js";
/**
 * 请求数据封装方法
 * @param method 请求方式 GET POST PUT
 * @param url 请求地址（login/login）
 * @param data 请求对象
 * @param loading 是否展示loading
 * @param loadingTitle 展示loading文字
 * @returns {Promise<unknown>}
 */
function fetch(method, url, data, loading, loadingTitle) {
  console.log(url);
  return new Promise((resolve, reject) => {
    //显示加载动画
    if (loading) {
      uni.showLoading({
        title: loadingTitle,
        mask: true,
      });
    }
    const params = {};
    //获取token
    let me_id = uni.getStorageSync("me_id");
    data.me_id = me_id;
    let token = uni.getStorageSync("token") ? uni.getStorageSync("token") : 1;
    let isTourist = Store.state.identity;
    let obj = {
      token,
      me_id,
      isTourist,
    };
    //添加token
    Object.assign(params, data);
    Object.assign(params, obj);
    console.log(params);
    //发起请求
    uni.request({
      url,
      method,
      data: params,
      header: {
        // 数据被编码为名称/值对
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      success: res => {
        let code = res.data.code;
        let message = res.data.msg;
        //统一处理返回值
        if (loading) {
          setTimeout(() => {
            switch (Number(code)) {
              case 1:
                resolve(res.data.data);
                break;
              case 9998:
                Utils.bottomToast("您尚未登录，请去登录");
                setTimeout(() => {
                  // uni.reLaunch({
                  //   url: "/pages/Basic/Login/index",
                  // });
                  Utils.LogOut();
                }, 1500);
                break;
              case 9999:
                Utils.bottomToast("您的账号已离线，请重新登录");
                setTimeout(() => {
                  // uni.reLaunch({
                  //   url: "/pages/Basic/Login/index",
                  // });
                  Utils.LogOut();
                }, 1500);
                break;
              default:
                Utils.bottomToast(`${message}`);
                break;
            }
          }, 1500);
        } else {
          switch (Number(code)) {
            case 1:
              resolve(res.data.data);
              break;
            case 9998:
              Utils.bottomToast("您尚未登录，请去登录");
              setTimeout(() => {
                // uni.reLaunch({
                //   url: "/pages/Basic/Login/index",
                // });
                Utils.LogOut();
              }, 1500);
              break;
            case 9999:
              Utils.bottomToast("您的账号已离线，请重新登录");
              setTimeout(() => {
                // uni.reLaunch({
                //   url: "/pages/Basic/Login/index",
                // });
                Utils.LogOut();
              }, 1500);
              break;
            default:
              if (message) {
                Utils.bottomToast(`${message}`);
              } else {
                Utils.bottomToast("网络连接超时,刷新重试");
              }
              break;
          }
        }
      },
      fail: err => {
        reject(err);
      },
      complete: () => {
        setTimeout(function () {
          uni.stopPullDownRefresh(); //停止下拉刷新动画
        }, 1000);
        if (loading) {
          setTimeout(() => {
            uni.hideLoading();
          }, 1000);
        }
      },
    });
  });
}
export default {
  get(url, params, loading, loadingTitle) {
    return fetch("GET", baseUrl + url, params, loading, loadingTitle);
  },
  post(url, params, loading, loadingTitle) {
    return fetch("POST", baseUrl + url, params, loading, loadingTitle);
  },
  put(url, params, loading, loadingTitle) {
    return fetch("PUT", baseUrl + url, params, loading, loadingTitle);
  },
};
