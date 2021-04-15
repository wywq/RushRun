import request from "@/service/request.js";

// 修改昵称头像
export function updateNickOrPic(data, callback) {
  request.postAuth("zb/User/updateNickOrPic", data, res => {
    callback && callback(res);
  });
}
// 个人信息
export function getMyInfo(data, callback) {
  request.postAuth("zb/User/getMyInfo", data, res => {
    callback && callback(res);
  });
}
// 规则说明
export function getRule(data, callback) {
  request.postAuth("zb/User/getRule", data, res => {
    callback && callback(res);
  });
}
// 修改密码
export function updateLoginPwd(data, callback) {
  request.postAuth("zb/User/updateLoginPwd", data, res => {
    callback && callback(res);
  });
}
// 意见反馈
export function addOpinion(data, callback) {
  request.postAuth("zb/User/addOpinion", data, res => {
    callback && callback(res);
  });
}
// 收货地址列表
export function addresslist(data, callback) {
  request.postAuth("zb/User/addresslist", data, res => {
    callback && callback(res);
  });
}
// 删除收货地址
export function deladdress(data, callback) {
  request.postAuth("zb/User/deladdress", data, res => {
    callback && callback(res);
  });
}
// 修改收货地址
export function doeditaddress(data, callback) {
  request.postAuth("zb/User/doeditaddress", data, res => {
    callback && callback(res);
  });
}
// 添加收货地址
export function addaddress(data, callback) {
  request.postAuth("zb/User/addaddress", data, res => {
    callback && callback(res);
  });
}
// 实名认证
export function realName(data, callback) {
  request.postAuth("zb/User/realName", data, res => {
    callback && callback(res);
  });
}
// vip中心
export function myVip(data, callback) {
  request.postAuth("zb/User/myVip", data, res => {
    callback && callback(res);
  });
}
// 开通会员
export function handleVip(data, callback) {
  request.postAuth("zb/User/handleVip", data, res => {
    callback && callback(res);
  });
}
// 我的资产
export function myZichan(data, callback) {
  request.postAuth("zb/User/myZichan", data, res => {
    callback && callback(res);
  });
}
// 日志类型
export function getFinanceType(data, callback) {
  request.postAuth("zb/User/getFinanceType", data, res => {
    callback && callback(res);
  });
}
// 我的推广
export function myTeamUser(data, callback) {
  request.postAuth("zb/User/myTeamUser", data, res => {
    callback && callback(res);
  });
}
// 团队详情
export function getMyteam(data, callback) {
  request.postAuth("zb/User/getMyteam", data, res => {
    callback && callback(res);
  });
}
// 我的订单
export function myOrderList(data, callback) {
  request.postAuth("home/Order/myOrderList", data, res => {
    callback && callback(res);
  });
}
// 订单详情
export function myOrderInfo(data, callback) {
  request.postAuth("home/Order/myOrderInfo", data, res => {
    callback && callback(res);
  });
}
// 提货或转寄售
export function deliver(data, callback) {
  request.postAuth("home/Order/deliver", data, res => {
    callback && callback(res);
  });
}
// 获取收货地址
export function getStateAddress(data, callback) {
  request.postAuth("home/Order/getStateAddress", data, res => {
    callback && callback(res);
  });
}
//取消订单
export function offOrder(data, callback) {
  request.postAuth("home/Order/offOrder", data, res => {
    callback && callback(res);
  });
}
// 确认收货
export function affrimOrder(data, callback) {
  request.postAuth("home/Order/affrimOrder", data, res => {
    callback && callback(res);
  });
}
// 邀请码
export function teamRecruit(data, callback) {
  request.postAuth("zb/User/teamRecruit", data, res => {
    callback && callback(res);
  });
}
// 我的竞拍个人中心显示
export function getUserAuctionNumber(data, callback) {
  request.postAuth("zb/auction/getUserAuctionNumber", data, res => {
    callback && callback(res);
  });
}
