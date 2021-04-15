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
// 下载地址
export function xiazai(data, callback) {
  request.postAuth("home/reg/xiazai", data, res => {
    callback && callback(res);
  });
}
