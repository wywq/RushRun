// import { flyio } from "@/api/fly.js";
import fetch from "@/api/fetch";
export const Basic = {
  //注册
  register(data) {
    return fetch.post("/Login/register", { ...data }, false, "");
  },
  //矿威服务协议条款
  protocol(data) {
    return fetch.post("/Login/protocol", { ...data }, false, "");
  },
  //找回密码
  retrievePwd(data) {
    return fetch.post("/Login/retrievePwd", { ...data }, false, "");
  },
  //登录
  login(data) {
    return fetch.post("/Login/login", { ...data }, false, "");
  },
  //发送短信
  getPhoneCode(data) {
    return fetch.post("/Login/getPhoneCode", { ...data }, false, "");
  },
};
