import config from "@/config/index.js";
const baseUrl = config.baseUrl;
import utils from "@/common/utils.js";

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
    //获取token
    // let member_id = uni.getStorageSync("sj_member_id") ? uni.getStorageSync("sj_member_id") : '';
    let token = uni.getStorageSync("token") ? uni.getStorageSync("token") : "";
    // data.member_id = member_id
    let obj = {
      token,
      // member_id
    };
    //添加token
    Object.assign(data, obj);
    //发起请求
    uni.request({
      url,
      method,
      data,
      header: {
        // 数据被编码为名称/值对
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      success: res => {
        console.log(res);
        let code = res.data.status;
        let message = res.data.info;
        //结束加载动画
        //统一处理返回值
        if (loading) {
          setTimeout(() => {
            switch (Number(code)) {
              case 1:
                resolve(res.data);
                break;
              //   case -999:
              //     utils.toast("您的账号已离线，请重新登录");
              //     setTimeout(() => {
              //       uni.reLaunch({
              //         url: "/pages/login/login",
              //       });
              //     }, 1500);
              //     break;
              default:
                utils.toast(`${message}`);
                break;
            }
          }, 1500);
        } else {
          switch (Number(code)) {
            case 1:
              resolve(res);
              break;
            // case -999:
            //   utils.toast("您的账号已离线，请重新登录");
            //   setTimeout(() => {
            //     uni.reLaunch({
            //       url: "/pages/login/login",
            //     });
            //   }, 1500);
            //   break;
            default:
              utils.toast(`${message}`);
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
  get(url, params) {
    return fetch("GET", baseUrl + url, params, false, "");
  },
  post(url, params) {
    return fetch("POST", baseUrl + url, params, false, "");
  },
  put(url, params) {
    return fetch("PUT", baseUrl + url, params, false, "");
  },
};
