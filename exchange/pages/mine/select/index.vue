<!-- 设置 -->
<template>
  <view class="select">
    <header-basic
      class="select-header"
      :icon="true"
      title="设置"
    ></header-basic>
    <!-- 设置 -->
    <view class="select-btn" @tap="handleLogout">退出登录</view>
  </view>
</template>

<script>
import Utils from "@/common/utils/index.js";
import HeaderBasic from "@/components/header/index";

export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {};
  },
  computed: {},
  onLoad() {},
  methods: {
    handleLogout() {
      uni.showToast({
        title: "退出成功",
        icon: "none",
      });
      setTimeout(() => {
        Utils.LogOut();
      }, 1500);
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
  background: #fafafa;
}
.select-header {
  flex-shrink: 0;
}
.select-btn {
  margin-top: 50rpx;
  width: 690rpx;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  border-radius: 20rpx;
  background: #0f6ccb;
  font-size: 32rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
</style>
