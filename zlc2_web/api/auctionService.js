import request from '@/service/request.js'

// 拍卖列表查询
export function getAuctionList(data,callback) {
  request.postAuth('zb/auction/getAuctionList',data,(res)=>{
        callback&&callback(res)
  });
}
// 获取小时列表
export function getHoursList(data,callback) {
  request.postAuth('zb/auction/getHoursList',data,(res)=>{
        callback&&callback(res)
  });
}
// 拍卖商品页的详情
export function getAuctionDetails(data,callback) {
  request.postAuth('zb/auction/getAuctionDetails',data,(res)=>{
        callback&&callback(res)
  });
}
// 拍卖预约
export function reserveAuction(data,callback) {
  request.postAuth('zb/auction/reserveAuction',data,(res)=>{
        callback&&callback(res)
  });
}
// 正在拍卖规则（第一句话）
export function getAuctionRule(data,callback) {
  request.postAuth('zb/auction/getAuctionRule',data,(res)=>{
        callback&&callback(res)
  });
}
// 正在拍卖
export function getAuctionRoom(data,callback) {
  request.postAuth('zb/auction/getAuctionRoom',data,(res)=>{
        callback&&callback(res)
  });
}
// 拍卖加价
export function memberAddPrice(data,callback) {
  request.postAuth('zb/auction/memberAddPrice',data,(res)=>{
        callback&&callback(res)
  });
}
// 我的拍卖订单列表
export function getMemberOrderList(data,callback) {
  request.postAuth('zb/auction/getMemberOrderList',data,(res)=>{
        callback&&callback(res)
  });
}
// 支付拍卖订单
export function orderPay(data,callback) {
  request.postAuth('zb/auction/orderPay',data,(res)=>{
        callback&&callback(res)
  });
}
// 我的竞拍详情页
export function getOrderDetails(data,callback) {
  request.postAuth('zb/auction/getOrderDetails',data,(res)=>{
        callback&&callback(res)
  });
}
// 竞拍支付详情
export function getPayDetails(data,callback) {
  request.postAuth('zb/auction/getPayDetails',data,(res)=>{
        callback&&callback(res)
  });
}
// 我的寄售列表
export function getMemberAuctionList(data,callback) {
  request.postAuth('zb/auction/getMemberAuctionList',data,(res)=>{
        callback&&callback(res)
  });
}
// 我的寄售详情页
export function getMemberAuctionDetails(data,callback) {
  request.postAuth('zb/auction/getMemberAuctionDetails',data,(res)=>{
        callback&&callback(res)
  });
}