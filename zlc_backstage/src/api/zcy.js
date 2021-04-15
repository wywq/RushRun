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
  //获取全部活动
  getAllActivity(data) {
    return fetch.post("/Activity/getAllActivity", { ...data });
  },
  //修改活动状态
  editStatus(data) {
    return fetch.post("/Activity/editStatus", { ...data });
  },
  //活动详情
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
  //扶贫
  fupinList(data) {
    return fetch.post("/Activity/fupinList", { ...data });
  },
  //扶贫状态
  xiugaiFupin(data) {
    return fetch.post("/Activity/xiugaiFupin", { ...data });
  },
  //删除
  delFupin(data) {
    return fetch.post("/Activity/delFupin", { ...data });
  },
  //扶贫商品
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
  //店铺审核列表
  examineList(data) {
    return fetch.post("/Shop/examineList", { ...data });
  },
  //发货
  deliverGoods(data) {
    return fetch.post("/GoodsOrder/deliverGoods", { ...data });
  },
  //查看订单物流
  logisticsView(data) {
    return fetch.post("/GoodsOrder/logisticsView", { ...data });
  },
  //修改地址
  modifyAddress(data) {
    return fetch.post("/GoodsOrder/modifyAddress", { ...data });
  },
  //退款
  refund(data) {
    return fetch.post("/GoodsOrder/refund", { ...data });
  },
  //退款列表
  refundList(data) {
    return fetch.post("/GoodsOrder/refundList", { ...data });
  },
  //退款审核
  refundExamine(data) {
    return fetch.post("/GoodsOrder/refundExamine", { ...data });
  },
  //首页订单及商品统计
  indexStatistics(data) {
    return fetch.post("/Statistics/indexStatistics", { ...data });
  },
  shopStatistics(data) {
    return fetch.post("/Statistics/shopStatistics", { ...data });
  },
  saleStatistics(data) {
    return fetch.post("/Statistics/saleStatistics", { ...data });
  },
  orderStatistics(data) {
    return fetch.post("/Statistics/orderStatistics", { ...data });
  },
  orderStatisticsByCon(data) {
    return fetch.post("/Statistics/orderStatisticsByCon", { ...data });
  },
  //轮播图列表
  rotationList(data) {
    return fetch.post("/Rotation/rotationList", { ...data });
  },
  //删除轮播图
  rotationDel(data) {
    return fetch.post("/Rotation/rotationDel", { ...data });
  },
  //添加修改轮播图
  rotationAdd(data) {
    return fetch.post("/Rotation/rotationAdd", { ...data });
  },
  //资讯列表
  informationList(data) {
    return fetch.post("/Oneplus/informationList", { ...data });
  },
  //添加修改
  informationAdd(data) {
    return fetch.post("/Oneplus/informationAdd", { ...data });
  },
  //删除
  informationDel(data) {
    return fetch.post("/Oneplus/informationDel", { ...data });
  },
  //评论列表
  commentList(data) {
    return fetch.post("/Oneplus/commentList", { ...data });
  },
  //评论列表
  commentDel(data) {
    return fetch.post("/Oneplus/commentDel", { ...data });
  },
  //评论列表
  partList(data) {
    return fetch.post("/Oneplus/partList", { ...data });
  },
  //获取文本
  onePlusWriter(data) {
    return fetch.post("/Oneplus/onePlusWriter", { ...data });
  },
  //修改文本
  updateWriter(data) {
    return fetch.post("/Oneplus/updateWriter", { ...data });
  },
  //新手指南列表
  question(data) {
    return fetch.post("/Goods/question", { ...data });
  },
  //添加修改新手指南
  updateQuestion(data) {
    return fetch.post("/Goods/updateQuestion", { ...data });
  },
  //修改新手指南页面
  editQuestion(data) {
    return fetch.post("/Goods/editQuestion", { ...data });
  },
  //删除新手指南
  delquestion(data) {
    return fetch.post("/Goods/delquestion", { ...data });
  },
  //出售的商品
  goodsLists(data) {
    return fetch.post("/Rotation/goodslist", { ...data });
  },
};
