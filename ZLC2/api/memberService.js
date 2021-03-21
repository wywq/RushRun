import request from "@/service/request.js";
// 会员中心
export function memberCenter(data, callback) {
  request.postAuth("zb/User/memberCenter", data, res => {
    callback && callback(res);
  });
}
// 已提现列表
export function cashList(data, callback) {
  request.postAuth("zb/User/cashList", data, res => {
    callback && callback(res);
  });
}
// 提现
export function cashOut(data, callback) {
  request.postAuth("zb/User/cashOut", data, res => {
    callback && callback(res);
  });
}
// 我的粉丝
export function teamInfo(data, callback) {
  request.postAuth("zb/User/teamInfo", data, res => {
    callback && callback(res);
  });
}
// 推广订单
export function tuiguangOrd(data, callback) {
  request.postAuth("zb/User/tuiguangOrd", data, res => {
    callback && callback(res);
  });
}
// 推广佣金
export function tuiguangJiang(data, callback) {
  request.postAuth("zb/User/tuiguangJiang", data, res => {
    callback && callback(res);
  });
}
// 累计补贴
export function leijiButie(data, callback) {
  request.postAuth("zb/User/leijiButie", data, res => {
    callback && callback(res);
  });
}
// 今日补贴
export function dayButie(data, callback) {
  request.postAuth("zb/User/dayButie", data, res => {
    callback && callback(res);
  });
}
