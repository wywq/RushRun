/*
  请求入口文件
*/
import { Basic } from "./basic/index";
import { Home } from "./home/index";
import { Mill } from "./mill/index";
import { Hashrate } from "./hashrate/index";
import { Information } from "./information/index";
import { Wallet } from "./wallet/index";
import { Mine } from "./mine/index";
export const Api = {
  ...Basic,
  ...Home,
  ...Mill,
  ...Hashrate,
  ...Information,
  ...Wallet,
  ...Mine,
};
