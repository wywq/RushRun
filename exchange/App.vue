<script>
import utils from "@/common/utils/index.js";
export default {
  onLaunch: function () {
    console.log("App Launch");
    if (!uni.getStorageSync("zlc_token")) {
      setTimeout(() => {
        uni.reLaunch({
          url: "/pages/basic/login/index",
        });
      }, 1500);
    }
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
  methods: {},
};
</script>

<style>
@import "static/css/uni.css";
@import "static/css/global.css";
/*每个页面公共css */
</style>
