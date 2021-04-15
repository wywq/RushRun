<!-- 转换中心 -->
<template>
  <view class="choose">
    <view class="choose-wrap">
      <view class="choose-item" @tap="handlePublish(1)">
        <image
          class="choose-item-img"
          src="@/static/image/zhzx_fbxq_icon@2x.png"
        ></image>
        <view class="choose-item-title">需求</view>
      </view>
      <view class="choose-item" @tap="handlePublish(2)">
        <image
          class="choose-item-img"
          src="@/static/image/zhzx_fbzr_icon@2x.png"
        ></image>
        <view class="choose-item-title">转让</view>
      </view>
    </view>
    <image
      class="choose-close"
      src="@/static/image/zhzx_gbi_icon@2x.png"
      @tap="handleBack"
    ></image>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  onLoad(opt) {},
  methods: {
    handleBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
    handlePublish(type) {
      uni.navigateTo({
        url: "/pages/exchange/publish/index?type=" + type,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.choose {
  @include flex(flex-end, center);
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
}
.choose-wrap {
  @include flex(space-around, center);
  margin-bottom: 260rpx;
  width: 100%;
}
.choose-close {
  margin-bottom: 76rpx;
  width: 50rpx;
  height: 50rpx;
}
.choose-item {
  @include flex(flex-end, center);
  flex-direction: column;
}
.choose-item-img {
  margin-bottom: 30rpx;
  width: 168rpx;
  height: 168rpx;
}
.choose-item-title {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
</style>
