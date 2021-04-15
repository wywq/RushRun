<template>
  <view class="test">
    <web-view :webview-styles="webviewStyles" :src="src"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      webviewStyles: {
        progress: {
          color: "#FF3333",
        },
      },
      src: "",
    };
  },
  onLoad(opt) {
    if (opt.data) {
      this.src = opt.data;
    }
  },
};
</script>

<style>
.test {
  width: 100%;
  height: 100vh;
}
</style>
