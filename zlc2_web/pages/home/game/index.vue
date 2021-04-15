<!-- 用户协议 -->
<template>
  <view class="message">
    <web-view class="webview" :src="src" @message="getH5Message"></web-view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      token: "",
    };
  },
  computed: {
    src() {
      return "http://118.190.174.163/web-mobile/?token=" + this.token;
    },
  },
  onLoad(options) {
    this.token = uni.getStorageSync("zlc_token");
  },
  onShow() {},
  methods: {
    getH5Message(e) {
      console.log("来自webview的消息", e.detail.data);
      const val = e.detail.data;
      if (val && val[0].action == "switchTabToIndex") {
        uni.switchTab({
          url: "/pages/index",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  position: relative;
  width: 100%;
  height: 100vh;
}
.webview {
  width: 100%;
  height: 100%;
}
</style>
