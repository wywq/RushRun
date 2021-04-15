<script>
import utils from "@/common/utils/index.js";
export default {
  onLaunch: function () {
    console.log("App Launch");
    window["getToken"] = token => {
      this.getToken(token);
    };
    // if (!localStorage.getItem("zlc_token")) {
    if (!uni.getStorageSync("zlc_token")) {
      setTimeout(() => {
        // uni.reLaunch({
        //   url: "/pages/basic/login/index",
        // });
        document.location = "testkey://openLogin";
      }, 1500);
    }
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {
    //获取token
    getToken(token) {
      uni.setStorageSync("zlc_token", token);
    },
  },
};
</script>

<style>
@import "static/css/uni.css";
@import "static/css/global.css";
/*每个页面公共css */
.uni-tabbar {
  visibility: hidden !important;
}
</style>
