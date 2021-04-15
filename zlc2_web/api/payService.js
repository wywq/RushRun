import request from "@/service/request.js";

// 图片上传
export function uploadPic(data, callback) {
  request.postAuth("zb/User/uploadPic", data, res => {
    callback && callback(res);
  });
}

// 微信账户列表
export function getWeixinAccount(data, callback) {
  request.postAuth("zb/Pay/getWeixinAccount", data, res => {
    callback && callback(res);
  });
}
// 支付宝账户列表
export function getZhiFuAccount(data, callback) {
  request.postAuth("zb/Pay/getZhiFuAccount", data, res => {
    callback && callback(res);
  });
}
// 银行卡账户列表
export function getBankAccount(data, callback) {
  request.postAuth("zb/Pay/getBankAccount", data, res => {
    callback && callback(res);
  });
}
// 添加微信
export function addWeixin(data, callback) {
  request.postAuth("zb/Pay/addWeixin", data, res => {
    callback && callback(res);
  });
}
// 添加支付宝
export function addZhifubao(data, callback) {
  request.postAuth("zb/Pay/addZhifubao", data, res => {
    callback && callback(res);
  });
}
// 添加银行
export function addBank(data, callback) {
  request.postAuth("zb/Pay/addBank", data, res => {
    callback && callback(res);
  });
}
// 抢购列表
export function getSellList(data, callback) {
  request.postAuth("zb/Yuyueqiang/getSellList", data, res => {
    callback && callback(res);
  });
}
// 抢购列表
export function RushB(data, callback) {
  request.postAuth("zb/Yuyueqiang/RushB", data, res => {
    callback && callback(res);
  });
}
// 抢购订单列表
export function getRushDingdan(data, callback) {
  request.postAuth("zb/Yuyueqiang/getRushDingdan", data, res => {
    callback && callback(res);
  });
}
// 获取付款信息
export function getOtherMemberPay(data, callback) {
  request.postAuth("zb/Marry/getOtherMemberPay", data, res => {
    callback && callback(res);
  });
}
// 去付款
export function yes(data, callback) {
  request.postAuth("zb/Marry/yes", data, res => {
    callback && callback(res);
  });
}
// 放行
export function shoukuannew(data, callback) {
  request.postAuth("zb/Marry/shoukuannew", data, res => {
    callback && callback(res);
  });
}
// 上架信息
export function getAppPay(data, callback) {
  request.postAuth("zb/Marry/getAppPay", data, res => {
    callback && callback(res);
  });
}
// 去上架
export function onShelf(data, callback) {
  request.postAuth("zb/Marry/onShelf", data, res => {
    callback && callback(res);
  });
}
// 去上架
export function test(data, callback) {
  request.postAuth("zb/Test/getSellList", data, res => {
    callback && callback(res);
  });
}
