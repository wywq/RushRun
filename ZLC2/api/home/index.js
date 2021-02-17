import fetch from "@/api/fetch";
export const Home = {
  //首页
  homePage(data) {
    return fetch.post("/Index/homePage", { ...data }, false, "");
  },
  //大客户
  bigCustomer(data) {
    return fetch.post("/Index/bigCustomer", { ...data }, false, "");
  },
  //帮助列表
  noticeListHelp(data) {
    return fetch.post("/Index/noticeListHelp", { ...data }, false, "");
  },
  //帮助详情
  noticeDetailsHelp(data) {
    return fetch.post("/Index/noticeDetailsHelp", { ...data }, false, "");
  },
  //公告列表
  NoticeList(data) {
    return fetch.post("/Index/NoticeList", { ...data }, false, "");
  },
  //公告详情
  noticeDetails(data) {
    return fetch.post("/Index/noticeDetails", { ...data }, false, "");
  },
  //帮助中心
  getPrivacyPolicy(data) {
    return fetch.post("/Index/getPrivacyPolicy", { ...data }, false, "");
  },
  /**********CTC**********/
  //获取交易列表
  getMinerCtcList(data) {
    return fetch.post("/Miner/getMinerCtcList", { ...data }, false, "");
  },
  //成交买
  MinerCtcBuy(data) {
    return fetch.post("/Miner/MinerCtcBuy", { ...data }, false, "");
  },
  //成交卖
  MinerCtcSell(data) {
    return fetch.post("/Miner/MinerCtcSell", { ...data }, false, "");
  },
  //矿机ctc买卖页面
  getMinerCtcInfo(data) {
    return fetch.post("/Miner/getMinerCtcInfo", { ...data }, false, "");
  },
  //根据矿机id获取订单id
  getMinerOrderByMinerId(data) {
    return fetch.post("/Miner/getMinerOrderByMinerId", { ...data }, false, "");
  },
  //挂买单
  MinerBuy(data) {
    return fetch.post("/Miner/MinerBuy", { ...data }, false, "");
  },
  //挂单卖
  MinerSell(data) {
    return fetch.post("/Miner/MinerSell", { ...data }, false, "");
  },
  //我的委托
  getMyMinerCtc(data) {
    return fetch.post("/Miner/getMyMinerCtc", { ...data }, false, "");
  },
  //我的委托订单详情
  getMyMinerCtcOne(data) {
    return fetch.post("/Miner/getMyMinerCtcOne", { ...data }, false, "");
  },
  //撤单
  MinerCtcCd(data) {
    return fetch.post("/Miner/MinerCtcCd", { ...data }, false, "");
  },
  //历史订单
  getMyMinerHistory(data) {
    return fetch.post("/Miner/getMyMinerHistory", { ...data }, false, "");
  },
};
