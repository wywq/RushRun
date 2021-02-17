import fetch from "@/api/fetch";
export const Wallet = {
  //资产首页
  getWalletIndex(data) {
    return fetch.post("/Wallet/getWalletIndex", { ...data }, false, "");
  },
  //资产详情
  getWalletDetails(data) {
    return fetch.post("/Wallet/getWalletDetails", { ...data }, false, "");
  },
  //获取财务类型
  getFinanceType(data) {
    return fetch.post("/Finance/getFinanceType", { ...data }, false, "");
  },
  //获取全部币种信息
  getAllCurrency(data) {
    return fetch.post("/Wallet/getAllCurrency", { ...data }, false, "");
  },
  //获取充币地址
  coinCharging(data) {
    return fetch.post("/Wallet/coinCharging", { ...data }, false, "");
  },
  //提币页面展示数据
  getCoinWithdrawIndex(data) {
    return fetch.post("/Wallet/getCoinWithdrawIndex", { ...data }, false, "");
  },
  //提币处理
  setCoinWithdraw(data) {
    return fetch.post("/Wallet/setCoinWithdraw", { ...data }, false, "");
  },
  //获取充提币交易记录
  getWithdrawalMoneyList(data) {
    return fetch.post("/Wallet/getWithdrawalMoneyList", { ...data }, false, "");
  },
  //划转页面展示
  TransferPage(data) {
    return fetch.post("/Transfer/TransferPage", { ...data }, false, "");
  },
  //划转处理
  executeTransfer(data) {
    return fetch.post("/Transfer/executeTransfer", { ...data }, false, "");
  },
  //划转押金页面展示
  getYjIndex(data) {
    return fetch.post("/Transfer/getYjIndex", { ...data }, false, "");
  },
  //划转处理
  executeTransferYj(data) {
    return fetch.post("/Transfer/executeTransferYj", { ...data }, false, "");
  },
  //划转记录
  getTransferRecord(data) {
    return fetch.post("/Transfer/getTransferRecord", { ...data }, false, "");
  },
  //获取地址簿
  getAddress(data) {
    return fetch.post("/Wallet/getAddress", { ...data }, false, "");
  },
  //添加地址簿
  addAddress(data) {
    return fetch.post("/Wallet/addAddress", { ...data }, false, "");
  },
  //删除地址簿
  delAddress(data) {
    return fetch.post("/Wallet/delAddress", { ...data }, false, "");
  },
};
