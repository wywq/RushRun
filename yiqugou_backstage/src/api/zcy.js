import fetch from "@/service/fetch";

export default {
  //登录
  checkLogin(data) {
    return fetch.post("/Login/checkLogin", { ...data });
  },
  //修改密码
  updateAdmin(data) {
    return fetch.post("/manage/updateAdmin", { ...data });
  },
  //首页统计
  orderStatistics(data) {
    return fetch.post("/Statistics/orderStatistics", { ...data });
  },
  indexStatistics(data) {
    return fetch.post("/Statistics/indexStatistics", { ...data });
  },
  shopStatistics(data) {
    return fetch.post("/Statistics/shopStatistics", { ...data });
  },
  saleStatistics(data) {
    return fetch.post("/Statistics/saleStatistics", { ...data });
  },
  orderStatisticsByCon(data) {
    return fetch.post("/Statistics/orderStatisticsByCon", { ...data });
  },
  //商品列表
  goodsList(data) {
    return fetch.post("/Goods/goodsList", { ...data });
  },
  //所有店铺
  Dian(data) {
    return fetch.post("/Goods/Dian", { ...data });
  },
  //分类
  goodsFenlei(data) {
    return fetch.post("/Goods/goodsFenlei", { ...data });
  },
  //修改商品上架下架状态（商品列表页）
  updatestatus(data) {
    return fetch.post("/Goods/updatestatus", { ...data });
  },
  //修改商品是否是首页推荐（商品列表页）
  updateinx(data) {
    return fetch.post("/Goods/updateinx", { ...data });
  },
  //更新排序
  editSort(data) {
    return fetch.post("/Goods/editSort", { ...data });
  },
  //商品详情
  editGoods(data) {
    return fetch.post("/Goods/editGoods", { ...data });
  },
  //图片库分类
  picAll(data) {
    return fetch.post("/Goods/picAll", { ...data });
  },
  //图片库分类图片
  picType(data) {
    return fetch.post("/Goods/picType", { ...data });
  },
  //修改/添加商品
  updateGoods(data) {
    return fetch.post("/Goods/updateGoods", { ...data });
  },
  //商品分类列表
  shopclass(data) {
    return fetch.post("/ShopClass/shopclass", { ...data });
  },
  //商品分类---列表页修改分类是否显示
  updateShopClassStatus(data) {
    return fetch.post("/ShopClass/updateShopClassStatus", { ...data });
  },
  //商品分类---添加商品分类
  addShopClass(data) {
    return fetch.post("/ShopClass/addShopClass", { ...data });
  },
  //删除分类
  delFenlei(data) {
    return fetch.post("/ShopClass/delFenlei", { ...data });
  },
  //修改分类
  updateShopClass(data) {
    return fetch.post("/ShopClass/updateShopClass", { ...data });
  },
  //给图片库添加图片
  delpic(data) {
    return fetch.post("/Goods/delpic", { ...data });
  },
  //删除图片图分类
  delType(data) {
    return fetch.post("/Goods/delType", { ...data });
  },
  //添加图片图分类
  addType(data) {
    return fetch.post("/Goods/addType", { ...data });
  },
  //首页轮播图
  lnxLunbo(data) {
    return fetch.post("/Goods/lnxLunbo", { ...data });
  },
  //删除轮播图
  delLunbo(data) {
    return fetch.post("/Goods/delLunbo", { ...data });
  },
  //添加修改轮播图
  updateLunbo(data) {
    return fetch.post("/Goods/updateLunbo", { ...data });
  },
  //每日限量
  xianLiang(data) {
    return fetch.post("/GoodsOrder/xianLiang", { ...data });
  },
  //修改每日限量
  updateXian(data) {
    return fetch.post("/GoodsOrder/updateXian", { ...data });
  },
  //获取砍价商品
  getAllActivity(data) {
    return fetch.post("/Activity/getAllActivity", { ...data });
  },
  //获取砍价活动可选择的商品
  keXuan(data) {
    return fetch.post("/Activity/keXuan", { ...data });
  },
  //修改砍价活动状态
  editStatus(data) {
    return fetch.post("/Activity/editStatus", { ...data });
  },
  //添加/修改砍价活动商品
  addActivity(data) {
    return fetch.post("/Activity/addActivity", { ...data });
  },
  //删除砍价活动商品
  delact(data) {
    return fetch.post("/Activity/delact", { ...data });
  },
  //砍价活动详情
  getActivityInfo(data) {
    return fetch.post("/Activity/getActivityInfo", { ...data });
  },
  //获取全部商品
  getAllGoods(data) {
    return fetch.post("/GoodsOrder/getAllGoods", { ...data });
  },
  //拼图全部商品
  showSku(data) {
    return fetch.post("/activity/showSku", { ...data });
  },
  //活动提交
  updateActGoods(data) {
    return fetch.post("/Activity/updateActGoods", { ...data });
  },
  //竞拍列表
  jingpaiList(data) {
    return fetch.post("/Activity/jingpaiList", { ...data });
  },
  //删除竞拍
  delAcution(data) {
    return fetch.post("/Activity/delAcution", { ...data });
  },
  //查看竞拍预约
  auctionYyue(data) {
    return fetch.post("/Activity/auctionYyue", { ...data });
  },
  //查看参与竞拍
  auctionIng(data) {
    return fetch.post("/Activity/auctionIng", { ...data });
  },
  //竞拍等级列表
  auctionLevel(data) {
    return fetch.post("/Activity/auctionLevel", { ...data });
  },
  //发起竞拍
  addAuction(data) {
    return fetch.post("/Activity/addAuction", { ...data });
  },
  //竞拍等级详情
  auctionLevelInfo(data) {
    return fetch.post("/Activity/auctionLevelInfo", { ...data });
  },
  //修改竞拍等级信息
  updateAuctionlevel(data) {
    return fetch.post("/Activity/updateAuctionlevel", { ...data });
  },
  //扶贫状态
  xiugaiFupin(data) {
    return fetch.post("/Activity/xiugaiFupin", { ...data });
  },
  //删除
  delFupin(data) {
    return fetch.post("/Activity/delFupin", { ...data });
  },
  //竞拍商品
  getGoodsList(data) {
    return fetch.post("/Activity/getGoodsList", { ...data });
  },
  //扶贫添加
  addfuPin(data) {
    return fetch.post("/Activity/addfuPin", { ...data });
  },

  /* 订单 */
  //删除评价
  delComment(data) {
    return fetch.post("/GoodsOrder/delComment", { ...data });
  },
  //回复评价
  addReply(data) {
    return fetch.post("/GoodsOrder/addReply", { ...data });
  },
  //获取全部评价
  getAllComment(data) {
    return fetch.post("/GoodsOrder/getAllComment", { ...data });
  },
  //发货
  editPost(data) {
    return fetch.post("/GoodsOrder/editPost", { ...data });
  },
  //获取订单详情
  getOrderInfo(data) {
    return fetch.post("/GoodsOrder/getOrderInfo", { ...data });
  },
  //删除订单
  delOrd(data) {
    return fetch.post("/GoodsOrder/delOrd", { ...data });
  },
  //订单列表
  getAllorders(data) {
    return fetch.post("/GoodsOrder/getAllorders", { ...data });
  },
  //获取快递公司
  getPost(data) {
    return fetch.post("/GoodsOrder/getPost", { ...data });
  },

  /* 店铺 */
  //店铺审核状态
  upApproval(data) {
    return fetch.post("/Shop/upApproval", { ...data });
  },
  //修改店铺状态(开关状态)
  updateShopStatus(data) {
    return fetch.post("/Shop/updateShopStatus", { ...data });
  },
  //添加店铺
  addShop(data) {
    return fetch.post("/Shop/addShop", { ...data });
  },
  //商城后台店铺列表
  shopList(data) {
    return fetch.post("/Shop/shopList", { ...data });
  },
  //修改店铺
  shopUpdate(data) {
    return fetch.post("/Shop/shopUpdate", { ...data });
  },
  //获取店铺详情
  getShopInfo(data) {
    return fetch.post("/Shop/getShopInfo", { ...data });
  },

  /* 优惠券 */
  //发放优惠券操作
  couponGrant(data) {
    return fetch.post("/Coupon/couponGrant", { ...data });
  },
  //根据手机号选择要发放的用户
  getMember(data) {
    return fetch.post("/Coupon/getMember", { ...data });
  },
  //查看优惠券发放记录
  getGrantLog(data) {
    return fetch.post("/Coupon/getGrantLog", { ...data });
  },
  //优惠券详情
  getCouponInfo(data) {
    return fetch.post("/Coupon/getCouponInfo", { ...data });
  },
  //优惠券列表
  getAllCoupon(data) {
    return fetch.post("/Coupon/getAllCoupon", { ...data });
  },
  //根据店铺获取上架商品
  getGoods(data) {
    return fetch.post("/Coupon/getGoods", { ...data });
  },
  //所有开启的店铺
  getShop(data) {
    return fetch.post("/Coupon/getShop", { ...data });
  },
  //添加修改优惠券
  addCoupon(data) {
    return fetch.post("/Coupon/addCoupon", { ...data });
  },
  //规则协议
  protocol(data) {
    return fetch.post("/Art/protocol", { ...data });
  },
  //修改规则协议
  updateProtocol(data) {
    return fetch.post("/Art/updateProtocol", { ...data });
  },
  //意见反馈列表
  feedbackList(data) {
    return fetch.post("/Goods/feedbackList", { ...data });
  },
  //删除意见反馈
  delfeedback(data) {
    return fetch.post("/Goods/delfeedback", { ...data });
  },
  //用户地址列表
  memberAddress(data) {
    return fetch.post("/GoodsOrder/memberAddress", { ...data });
  },
  //修改用户默认地址
  uopdateMo(data) {
    return fetch.post("/GoodsOrder/uopdateMo", { ...data });
  },
  //删除用户收货地址
  delAddress(data) {
    return fetch.post("/GoodsOrder/delAddress", { ...data });
  },
  //用户列表
  memberList(data) {
    return fetch.post("/Member/memberList", { ...data });
  },
  //修改用户状态
  udpdaetStatus(data) {
    return fetch.post("/Member/udpdaetStatus", { ...data });
  },
  //修改用户登录/支付密码
  updateLogin(data) {
    return fetch.post("/Member/updateLogin", { ...data });
  },
  //获取用户等级
  getLevel(data) {
    return fetch.post("/Member/getLevel", { ...data });
  },
  //添加修改用户信息
  addMember(data) {
    return fetch.post("/Member/addMember", { ...data });
  },
  //修改用户订单地址
  modifyAddress(data) {
    return fetch.post("/GoodsOrder/modifyAddress", { ...data });
  },
  //参数配置
  configsAll(data) {
    return fetch.post("/GoodsOrder/configsAll", { ...data });
  },
  //修改参数配置
  updateConfig(data) {
    return fetch.post("/GoodsOrder/updateConfig", { ...data });
  },
  //公告列表
  gonggaoList(data) {
    return fetch.post("/Goods/gonggaoList", { ...data });
  },
  //修改公告状态
  updateStatusG(data) {
    return fetch.post("/Goods/updateStatusG", { ...data });
  },
  //删除公告
  delGonggao(data) {
    return fetch.post("/Goods/delGonggao", { ...data });
  },
  //添加/修改公告
  updateGonggao(data) {
    return fetch.post("/Goods/updateGonggao", { ...data });
  },
  //财务日志列表
  financeIndex(data) {
    return fetch.post("/member/Finance_index", { ...data });
  },
  //财务日志类型
  getFinType(data) {
    return fetch.post("/member/getFinType", { ...data });
  },
  //账户分类
  zhanghufenlei(data) {
    return fetch.post("/member/zhanghufenlei", { ...data });
  },
  //用户账户信息
  yonghuzhanghu(data) {
    return fetch.post("/member/yonghuzhanghu", { ...data });
  },
  //账户类型总和
  zhanghu(data) {
    return fetch.post("/member/zhanghu", { ...data });
  },
  //充值
  xinxiedit(data) {
    return fetch.post("/member/xinxiedit", { ...data });
  },
  //体现列表
  cashList(data) {
    return fetch.post("/member/cashList", { ...data });
  },
  //体现深恶黑
  cashShenhe(data) {
    return fetch.post("/member/cashShenhe", { ...data });
  },
  //获取抢购活动列表
  getActivity(data) {
    return fetch.post("/member/getActivity", { ...data });
  },
  //修改
  upActivity(data) {
    return fetch.post("/member/upActivity", { ...data });
  },
  //抢购活动商品
  getActGoods(data) {
    return fetch.post("/member/getActGoods", { ...data });
  },
  //获取用户商品信息
  getGoodsUserList(data) {
    return fetch.post("/member/getGoodsUserList", { ...data });
  },
  //审核用户商品信息
  upShenhe(data) {
    return fetch.post("/member/upShenhe", { ...data });
  },
  //上架
  activityGoods(data) {
    return fetch.post("/member/activityGoods", { ...data });
  },
  //添加成熟宠物
  addCompleteGoods(data) {
    return fetch.post("/member/addCompleteGoods", { ...data });
  },
  //匹配列表
  getMatchingList(data) {
    return fetch.post("/member/getMatchingList", { ...data });
  },
  //商品列表
  memberGoodsList(data) {
    return fetch.post("/member/goodsList", { ...data });
  },
  //一键回收
  autoMatching(data) {
    return fetch.post("/GoodsOrder/autoMatching", { ...data });
  },
  //获取收款码
  shoukuanCode(data) {
    return fetch.post("/Art/shoukuanCode", { ...data });
  },
  //gengxin收款码
  updateshoukuanCode(data) {
    return fetch.post("/Art/updateshoukuanCode", { ...data });
  },
  //申诉
  appealAllow(data) {
    return fetch.post("/member/appealAllow", { ...data });
  },
  //see dog
  getFail(data) {
    return fetch.post("/member/getFail", { ...data });
  },
  //add dog
  addFail(data) {
    return fetch.post("/member/addFail", { ...data });
  },
  //delFail
  delFail(data) {
    return fetch.post("/member/delFail", { ...data });
  },
  //delGoodsUser
  delGoodsUser(data) {
    return fetch.post("/member/delGoodsUser", { ...data });
  },
  // 管理员列表
  index(data) {
    return fetch.post("/Manage/index", { ...data });
  },
  // 添加管理员
  addAdmin(data) {
    return fetch.post("/Manage/addAdmin", { ...data });
  },
  // 删除管理员
  delMember(data) {
    return fetch.post("/Manage/delMember", { ...data });
  },
  // 修改管理员密码
  updateAdmin(data) {
    return fetch.post("/Manage/updateAdmin", { ...data });
  },
  // 获取介绍
  jieshaoList(data) {
    return fetch.post("/Goods/jieshaoList", { ...data });
  },
  // 修改新增介绍
  updateJieshao(data) {
    return fetch.post("/Goods/updateJieshao", { ...data });
  },
  // 删除介绍
  delJieshao(data) {
    return fetch.post("/Goods/delJieshao", { ...data });
  },
  // 获取手续费（按时间）
  sxfIndex(data) {
    return fetch.post("/Member/sxfIndex", { ...data });
  },

  // 一键上架
  oneUp(data) {
    return fetch.post("/Member/oneUp", { ...data });
  },
  // 一键审核
  oneShenhe(data) {
    return fetch.post("/Member/oneShenhe", { ...data });
  },
  // 用户商品搜索
  getGoodsUserLists(data) {
    return fetch.post("/Member/getGoodsUserLists", { ...data });
  },
};
