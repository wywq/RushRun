// import { flyio } from "@/api/fly.js";
import fetch from "@/api/fetch";
export const Mine = {
  //个人资料
  index(data) {
    return fetch.post("/Member/index", { ...data }, false, "");
  },
  //修改头像
  updateHeadImg(data) {
    return fetch.post("/Member/updateHeadImg", { ...data }, false, "");
  },
  //修改昵称
  updateNick(data) {
    return fetch.post("/Member/updateNick", { ...data }, false, "");
  },
  //会员等级说明
  getMemberLevel(data) {
    return fetch.post("/Miner/getMemberLevel", { ...data }, false, "");
  },
  //我的邀请列表
  getInviteList(data) {
    return fetch.post("/Member/getInviteList", { ...data }, false, "");
  },
  //实名认证
  realNameAuthenticationByPath(data) {
    return fetch.post(
      "/Member/realNameAuthenticationByPath",
      { ...data },
      false,
      ""
    );
  },
  //重新认证
  reCertificationByPath(data) {
    return fetch.post("/Member/reCertificationByPath", { ...data }, false, "");
  },
  //获取实名信息
  realName(data) {
    return fetch.post("/Member/realName", { ...data }, false, "");
  },
  //修改登录密码
  updateLoginPwd(data) {
    return fetch.post("/Member/updateLoginPwd", { ...data }, false, "");
  },
  //修改支付密码
  updatePayPwd(data) {
    return fetch.post("/Member/updatePayPwd", { ...data }, false, "");
  },
  //更换手机号
  updatePhone(data) {
    return fetch.post("/Member/updatePhone", { ...data }, false, "");
  },
  //关于我们
  aboutUs(data) {
    return fetch.post("/Member/aboutUs", { ...data }, false, "");
  },
};
