<!-- 用户协议 -->
<template>
  <uni-popup ref="popup" :maskClick="false" type="share">
    <view class="share">
      <view class="share-body">
        <view class="share-item">
          <image
            class="share-item-icon"
            src="@/static/image/sxy_fx_wx_icon@2x.png"
          ></image>
          <view class="share-item-title">微信</view>
        </view>
        <view class="share-item">
          <image
            class="share-item-icon"
            src="@/static/image/sxy_fx_pyq_icon@2x.png"
          ></image>
          <view class="share-item-title">朋友圈</view>
        </view>
        <view class="share-item">
          <image
            class="share-item-icon"
            src="@/static/image/sxy_fx_qq_icon@2x.png"
          ></image>
          <view class="share-item-title">QQ好友</view>
        </view>
      </view>
      <view class="share-footer" @tap="closePopup">取消</view>
    </view>
  </uni-popup>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  methods: {
    openPopup() {
      this.$refs.popup.open();
    },
    closePopup() {
      this.$refs.popup.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.share {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  height: 360rpx;
}
.share-body {
  @include flex(space-around, center);
  width: 100%;
  flex-grow: 1;
  background: #ffffff;
}
.share-item {
  @include flex(center, center);
  flex-direction: column;
}
.share-item-icon {
  margin-bottom: 10rpx;
  width: 100rpx;
  height: 100rpx;
  border: 2rpx dashed #3d3d3d;
}
.share-item-title {
  font-size: 30rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.share-footer {
  flex-shrink: 0;
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: #e6344a;
  text-align: center;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
</style>
