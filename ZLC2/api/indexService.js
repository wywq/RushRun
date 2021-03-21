import request from "@/service/request.js";
// 搜索历史
export function getSeekHistory(data, callback) {
  request.postAuth("zb/Index/getSeekHistory", data, res => {
    callback && callback(res);
  });
}
// 清空搜索历史
export function delHistory(data, callback) {
  request.postAuth("zb/Index/delHistory", data, res => {
    callback && callback(res);
  });
}
// 商品搜索
export function searchGoods(data, callback) {
  request.postAuth("zb/Index/searchGoods", data, res => {
    callback && callback(res);
  });
}
// 首页轮播图
export function getInxpic(data, callback) {
  request.postAuth("zb/Index/getInxpic", data, res => {
    callback && callback(res);
  });
}
// 公告
export function getInxgonggao(data, callback) {
  request.postAuth("zb/Index/getInxgonggao", data, res => {
    callback && callback(res);
  });
}
// 公告列表
export function getGongaoList(data, callback) {
  request.postAuth("zb/Index/getGongaoList", data, res => {
    callback && callback(res);
  });
}
// 公告详情
export function getGonggaoInfo(data, callback) {
  request.postAuth("zb/Index/getGonggaoInfo", data, res => {
    callback && callback(res);
  });
}
// 首页商品
export function getInxGoods(data, callback) {
  request.postAuth("zb/Index/getInxGoods", data, res => {
    callback && callback(res);
  });
}
// 商品详情
export function getGoodsDetails(data, callback) {
  request.postAuth("zb/store/getGoodsDetails", data, res => {
    callback && callback(res);
  });
}
// 确认订单
export function confirmAnorder(data, callback) {
  request.postAuth("zb/Store/confirmAnorder", data, res => {
    callback && callback(res);
  });
}
// 下单
export function buyOrder(data, callback) {
  request.postAuth("zb/Store/buyOrder", data, res => {
    callback && callback(res);
  });
}
// 首页分类和分类页面(传id就是子分类)
export function getTypeList(data, callback) {
  request.postAuth("zb/Index/getTypeList", data, res => {
    callback && callback(res);
  });
}
// 当前正在砍价的商品
export function getBargainList(data, callback) {
  request.postAuth("zb/Bargain/getBargainList", data, res => {
    callback && callback(res);
  });
}
// 砍价商品详情
export function bargainGoods(data, callback) {
  request.postAuth("zb/Bargain/bargainGoods", data, res => {
    callback && callback(res);
  });
}
// 我当前正在砍价的商品
export function getMyBargainList(data, callback) {
  request.postAuth("zb/Bargain/getMyBargainList", data, res => {
    callback && callback(res);
  });
}
// 砍价商品确认订单
export function bargainQueren(data, callback) {
  request.postAuth("zb/Bargain/bargainQueren", data, res => {
    callback && callback(res);
  });
}
// 根据砍价活动 获取剩余时间 和砍价日志
export function getBarLog(data, callback) {
  request.postAuth("zb/Bargain/getBarLog", data, res => {
    callback && callback(res);
  });
}
// 购买砍价商品
export function bargainBuy(data, callback) {
  request.postAuth("zb/Bargain/bargainBuy", data, res => {
    callback && callback(res);
  });
}
// 邀请好友砍价回来
export function bargainIng(data, callback) {
  request.postAuth("zb/Bargain/bargainIng", data, res => {
    callback && callback(res);
  });
}
// 邀请好友砍价弹出内容
export function shareSurplus(data, callback) {
  request.postAuth("zb/Bargain/shareSurplus", data, res => {
    callback && callback(res);
  });
}
// 砍价点击
export function allowShare(data, callback) {
  request.postAuth("zb/Bargain/allowShare", data, res => {
    callback && callback(res);
  });
}
// 当前价购买
export function nowMoneyBuy(data, callback) {
  request.postAuth("zb/Bargain/nowMoneyBuy", data, res => {
    callback && callback(res);
  });
}
// 订单确认提货
export function goDeliver(data, callback) {
  request.postAuth("zb/Order/goDeliver", data, res => {
    callback && callback(res);
  });
}
// 订单确认转寄售
export function goAuction(data, callback) {
  request.postAuth("zb/Order/goAuction", data, res => {
    callback && callback(res);
  });
}
// 解密
export function decryptStr(data, callback) {
  request.postAuth("zb/Bargain/decryptStr", data, res => {
    callback && callback(res);
  });
}

// 获取介绍
export function getJieshao(data, callback) {
  request.postAuth("/zb/Index/getJieshao", data, res => {
    callback && callback(res);
  });
}
// 获取介绍Info
export function getjieshaoInfo(data, callback) {
  request.postAuth("/zb/Index/getjieshaoInfo", data, res => {
    callback && callback(res);
  });
}
