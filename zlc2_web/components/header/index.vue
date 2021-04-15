<!-- 自定义头 -->
<template>
  <view class="header">
    <!-- 背景图 -->
    <image class="header-bg" src="@/static/image/top_img@2x.png" />
    <!-- 状态栏 -->
    <view class="header-bar"></view>
    <!-- 头 -->
    <view class="header-body">
      <template v-if="icon">
        <view class="header-body-left">
          <image
            class="header-body-icon"
            src="@/static/image/dl_fh_b_icon@2x.png"
            @tap="handleBack"
          />
        </view>
      </template>
      <template v-else>
        <view class="header-body-func"></view>
      </template>
      <view class="header-body-title">{{ title }}</view>
      <view class="header-body-func" @tap="handleSubtitle">{{ subtitle }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    icon: Boolean,
    title: String,
    subtitle: String,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    //  后退
    handleBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
    //  功能按钮
    handleSubtitle() {
      this.$emit("onRightButtonClick");
    },
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.header {
  position: relative;
  z-index: 9;
  width: 100%;
  height: calc(96rpx + var(--status-bar-height));
  background: #42dbee;
}
/*  #endif  */
/*  #ifdef  H5 */
.header {
  position: relative;
  z-index: 9;
  width: 100%;
  height: 121rpx;
  background: #42dbee;
}
/*  #endif  */
.header-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
/*  #ifdef  APP-PLUS */
.header-bar {
  width: 100%;
  height: var(--status-bar-height);
}
/*  #endif  */
/*  #ifdef  H5 */
.header-bar {
  width: 100%;
  height: 25rpx;
}
/*  #endif  */
.header-body {
  @include flex(space-between, center);
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 96rpx;
}
.header-body-left {
  @include flex(flex-start, center);
  width: 30%;
}
.header-body-icon {
  width: 22rpx;
  height: 42rpx;
}
.header-body-title {
  flex-shrink: 0;
  font-size: 36rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.header-body-func {
  width: 30%;
  text-align: right;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
</style>
