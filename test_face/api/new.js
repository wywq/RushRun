import request from "@/service/request.js";
//发起认证请求
export function huotirenzheng(data, callback) {
  request.postAuth("home/Shequn/huotirenzheng", data, res => {
    callback && callback(res);
  });
}
//获取实名认证状态
export function getRealinfo(data, callback) {
  request.postAuth("home/Spec/getRealinfo", data, res => {
    callback && callback(res);
  });
}
//点击实名认证
export function writeXinxi(data, callback) {
  request.postAuth("home/Spec/writeXinxi", data, res => {
    callback && callback(res);
  });
}
//查讯认证结果
export function findrenzheng(data, callback) {
  request.postAuth("home/Shequn/findrenzheng", data, res => {
    callback && callback(res);
  });
}
//实名认证--去支付
export function renzhengzhifu(data, callback) {
  request.postAuth("home/Shequn/renzhengzhifu", data, res => {
    callback && callback(res);
  });
}
