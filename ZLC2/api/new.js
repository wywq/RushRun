import request from "@/service/request.js";
//登录（不携带token）
export function check(data, callback) {
  request.post("home/Login/check", data, res => {
    callback && callback(res);
  });
}
// 发送短信
export function smsSend(data, callback) {
  request.post("home/Reg/smsSend", data, res => {
    callback && callback(res);
  });
}
// 注册
export function add(data, callback) {
  request.post("home/Reg/add", data, res => {
    callback && callback(res);
  });
}
// 注册协议
export function regrule(data, callback) {
  request.post("home/Reg/regrule", data, res => {
    callback && callback(res);
  });
}

// 找回密码
export function findpwd(data, callback) {
  request.post("home/Login/findpwd", data, res => {
    callback && callback(res);
  });
}
// 首页轮播图
export function lunboList(data, callback) {
  request.postAuth("home/index/lunboList", data, res => {
    callback && callback(res);
  });
}
// 首页公告
export function gonggaoList(data, callback) {
  request.postAuth("home/index/gonggaoList", data, res => {
    callback && callback(res);
  });
}
// 公告列表
export function newslist(data, callback) {
  request.postAuth("home/index/newslist", data, res => {
    callback && callback(res);
  });
}
// 公告详情
export function gonggaoInfo(data, callback) {
  request.postAuth("home/index/gonggaoInfo", data, res => {
    callback && callback(res);
  });
}
// 首页我的信息
export function myData(data, callback) {
  request.postAuth("home/index/myData", data, res => {
    callback && callback(res);
  });
}
// 用户等级
export function huiyaun(data, callback) {
  request.postAuth("home/Spec/huiyaun", data, res => {
    callback && callback(res);
  });
}
// 贡献值
export function gongxian(data, callback) {
  request.postAuth("home/Spec/gongxian", data, res => {
    callback && callback(res);
  });
}
// 活跃度
export function huoyuedu(data, callback) {
  request.postAuth("home/Spec/huoyuedu", data, res => {
    callback && callback(res);
  });
}
// 视频区
export function shangVideo(data, callback) {
  request.postAuth("home/Index/shangVideo", data, res => {
    callback && callback(res);
  });
}
// 图文区
export function shangArt(data, callback) {
  request.postAuth("home/Index/shangArt", data, res => {
    callback && callback(res);
  });
}
// 音频区
export function shangRadio(data, callback) {
  request.postAuth("home/Index/shangRadio", data, res => {
    callback && callback(res);
  });
}
// 多媒体详情
export function shangDetail(data, callback) {
  request.postAuth("home/Index/shangDetail", data, res => {
    callback && callback(res);
  });
}
// 多媒体分享
export function shangfenxiang(data, callback) {
  request.postAuth("home/Index/shangfenxiang", data, res => {
    callback && callback(res);
  });
}
// 用户资料
export function ziliao(data, callback) {
  request.postAuth("home/Spec/ziliao", data, res => {
    callback && callback(res);
  });
}
// 修改资料
export function editgerenziliao(data, callback) {
  request.postAuth("home/Spec/editgerenziliao", data, res => {
    callback && callback(res);
  });
}
// 达人信息
export function levelXinxi(data, callback) {
  request.postAuth("home/Index/levelXinxi", data, res => {
    callback && callback(res);
  });
}

// 我的--页面信息
export function myselfInfo(data, callback) {
  request.postAuth("home/Index/myselfInfo", data, res => {
    callback && callback(res);
  });
}

// 我的订单
// export function myOrderList(data, callback) {
//   request.postAuth("home/Index/myOrderList", data, res => {
//     callback && callback(res);
//   });
// }
// 我的钱包
export function rmb(data, callback) {
  request.postAuth("home/Spec/rmb", data, res => {
    callback && callback(res);
  });
}
// 我的钱包 收益明细
export function jinbiinfo(data, callback) {
  request.postAuth("home/Spec/jinbiinfo", data, res => {
    callback && callback(res);
  });
}
// 划转
export function huazhuan(data, callback) {
  request.postAuth("home/Spec/huazhuan", data, res => {
    callback && callback(res);
  });
}
// 我的团队.上面栏信息
export function getMyTeamInfo(data, callback) {
  request.postAuth("home/Index/getMyTeamInfo", data, res => {
    callback && callback(res);
  });
}
// 我的团队--会员列表
export function getMyTeamUserList(data, callback) {
  request.postAuth("home/Index/getMyTeamUserList", data, res => {
    callback && callback(res);
  });
}
// 我的团队--团队招募
export function teamRecruit(data, callback) {
  request.postAuth("home/Index/teamRecruit", data, res => {
    callback && callback(res);
  });
}
// 我的消息
export function myNews(data, callback) {
  request.postAuth("home/Spec/myNews", data, res => {
    callback && callback(res);
  });
}
// 反馈记录
export function fankuilia(data, callback) {
  request.postAuth("home/Spec/fankuilia", data, res => {
    callback && callback(res);
  });
}
// 问题反馈--类型
export function yijianfenlei(data, callback) {
  request.postAuth("home/Spec/yijianfenlei", data, res => {
    callback && callback(res);
  });
}
// 问题反馈tianjia
export function feedback(data, callback) {
  request.postAuth("home/Spec/feedback", data, res => {
    callback && callback(res);
  });
}
// 反馈详情
export function feddbackInfo(data, callback) {
  request.postAuth("home/Spec/feddbackInfo", data, res => {
    callback && callback(res);
  });
}
// 常见问题
export function question(data, callback) {
  request.postAuth("home/Spec/question", data, res => {
    callback && callback(res);
  });
}
// 常见问题的详情
export function questions(data, callback) {
  request.postAuth("home/Spec/questions", data, res => {
    callback && callback(res);
  });
}
/**
 * 商城部分
 */
// 商品搜索
export function searchGoods(data, callback) {
  request.postAuth("home/Index/searchGoods", data, res => {
    callback && callback(res);
  });
}
// 首页分类和分类页面(传id就是子分类)
export function getTypeList(data, callback) {
  request.postAuth("home/Index/getTypeList", data, res => {
    callback && callback(res);
  });
}
// 商品详情
export function getGoodsDetails(data, callback) {
  request.postAuth("home/store/getGoodsDetails", data, res => {
    callback && callback(res);
  });
}
// 砍价商品详情
export function bargainGoods(data, callback) {
  request.postAuth("home/Bargain/bargainGoods", data, res => {
    callback && callback(res);
  });
}
// 确认订单
export function confirmAnorder(data, callback) {
  request.postAuth("home/Store/confirmAnorder", data, res => {
    callback && callback(res);
  });
}
// 下单
export function buyOrder(data, callback) {
  request.postAuth("home/Store/buyOrder", data, res => {
    callback && callback(res);
  });
}
// 收货地址列表
export function addresslist(data, callback) {
  request.postAuth("home/User/addresslist", data, res => {
    callback && callback(res);
  });
}
// 删除收货地址
export function deladdress(data, callback) {
  request.postAuth("home/User/deladdress", data, res => {
    callback && callback(res);
  });
}
// 修改收货地址
export function doeditaddress(data, callback) {
  request.postAuth("home/User/doeditaddress", data, res => {
    callback && callback(res);
  });
}
// 添加收货地址
export function addaddress(data, callback) {
  request.postAuth("home/User/addaddress", data, res => {
    callback && callback(res);
  });
}
// 订单详情
export function myOrderInfo(data, callback) {
  request.postAuth("home/Order/myOrderInfo", data, res => {
    callback && callback(res);
  });
}
// 确认收货
export function affrimOrder(data, callback) {
  request.postAuth("home/Order/affrimOrder", data, res => {
    callback && callback(res);
  });
}
// 转让中心--发布页的价格区间以及平均价格
export function pingjun(data, callback) {
  request.postAuth("home/Index/pingjun", data, res => {
    callback && callback(res);
  });
}
// 转换中心--发布转让
export function fubuSell(data, callback) {
  request.postAuth("home/Index/fubuSell", data, res => {
    callback && callback(res);
  });
}
// 转换中心--发布需求
export function fubuNeed(data, callback) {
  request.postAuth("home/Index/fubuNeed", data, res => {
    callback && callback(res);
  });
}
// 转换订单列表--我的挂单
export function myGuadan(data, callback) {
  request.postAuth("home/Index/myGuadan", data, res => {
    callback && callback(res);
  });
}
// 待收款列表
export function userZhuanrangList(data, callback) {
  request.postAuth("home/Index/userZhuanrangList", data, res => {
    callback && callback(res);
  });
}
// 待付款列表
export function userXuqiuList(data, callback) {
  request.postAuth("home/Index/userXuqiuList", data, res => {
    callback && callback(res);
  });
}
// 已完成订单
export function userWanchengList(data, callback) {
  request.postAuth("home/Index/userWanchengList", data, res => {
    callback && callback(res);
  });
}
// 撤单
export function cexiao(data, callback) {
  request.postAuth("home/Index/cexiao", data, res => {
    callback && callback(res);
  });
}
// 订单详情
export function matchingInfo(data, callback) {
  request.postAuth("home/Index/matchingInfo", data, res => {
    callback && callback(res);
  });
}
// 当日
export function todayInfo(data, callback) {
  request.postAuth("home/Index/todayInfo", data, res => {
    callback && callback(res);
  });
}
// 需求列表
export function needList(data, callback) {
  request.postAuth("home/Index/needList", data, res => {
    callback && callback(res);
  });
}
// 转让列表
export function sellList(data, callback) {
  request.postAuth("home/Index/sellList", data, res => {
    callback && callback(res);
  });
}
