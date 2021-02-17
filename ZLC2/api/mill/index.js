import fetch from "@/api/fetch";
export const Mill = {
  //矿机详情
  getMiner(data) {
    return fetch.post("/Miner/getMiner", { ...data }, false, "");
  },
  //矿机购买
  buyMiner(data) {
    return fetch.post("/Miner/buyMiner", { ...data }, false, "");
  },
};
