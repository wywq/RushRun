import fetch from "@/api/fetch";
export const Hashrate = {
  //我的算力首页
  getMyMiner(data) {
    return fetch.post("/Miner/getMyMiner", { ...data }, false, "");
  },
  //矿机详情
  getMyMinerOrderOne(data) {
    return fetch.post("/Miner/getMyMinerOrderOne", { ...data }, false, "");
  },
  //收益记录
  getMyMinerReward(data) {
    return fetch.post("/Miner/getMyMinerReward", { ...data }, false, "");
  },
};
