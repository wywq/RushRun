import Vue from "vue";
import App from "./App";
import config from "@/config/index.js";
import Upload from "@/common/utils/upload.js";

Vue.prototype.$url = config.baseUrl;
Vue.prototype.$upload = Upload;
Vue.config.productionTip = false;

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
