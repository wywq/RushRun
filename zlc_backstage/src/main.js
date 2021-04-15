import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";

import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
Vue.config.productionTip = false;
import VueQuillEditor from "vue-quill-editor";

// require styles
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
Vue.use(VueQuillEditor);
Vue.filter("dataFormat", function(str, pattern = "") {
  let dt = new Date(str * 1000);
  // 获取年月日
  let y = dt.getFullYear();
  let m = (dt.getMonth() + 1).toString().padStart(2, "0");
  let d = dt
    .getDate()
    .toString()
    .padStart(2, "0");
  // 如果 传递进来的字符串类型，转为小写之后，等于 yyyy-mm-dd，那么就返回 年-月-日
  // 否则，就返回  年-月-日 时：分：秒
  if (pattern.toLowerCase() === "yyyy-mm-dd") {
    return `${y}-${m}-${d}`;
  } else {
    // 获取时分秒
    let hh = dt
      .getHours()
      .toString()
      .padStart(2, "0");
    let mm = dt
      .getMinutes()
      .toString()
      .padStart(2, "0");
    let ss = dt
      .getSeconds()
      .toString()
      .padStart(2, "0");
    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }
});
import baseurl from "@/common/baseurl.js";
import zcy from "@/api/zcy.js";
Vue.prototype.$zcy = zcy;
Vue.prototype.baseurl = baseurl;
// import oss from '@/api/oss.js';
// Vue.prototype.$oss = oss;
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
// require("echarts/lib/component/legend");
Vue.component("chart", ECharts);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
