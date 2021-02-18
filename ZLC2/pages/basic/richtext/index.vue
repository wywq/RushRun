<!-- 用户协议 -->
<template>
  <view class="agreement">
    <header-basic
      title="用户协议"
      subtitle="dianji"
      @onRightButtonClick="onHandleRight"
    ></header-basic>
    <!-- 主体 -->
    <view class="agreement-body"></view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/custom/header/index";
export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {};
  },
  onLoad(options) {},
  methods: {
    onHandleRight() {
      console.log("nb2");
    },
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.agreement {
  position: relative;
  padding-top: calc(96rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #fff;
}
/*  #endif  */
/*  #ifdef  H5 */
.agreement {
  position: relative;
  padding-top: 121rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #fff;
}
/*  #endif  */
.agreement-body {
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  overflow-y: scroll;
}
</style>
