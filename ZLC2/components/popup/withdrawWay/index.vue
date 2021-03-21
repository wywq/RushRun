<!-- 选择提现方式 -->
<template>
  <uni-popup ref="popup" :maskClick="false" type="bottom">
    <view class="way">
      <!-- header -->
      <view class="way-head">
        <image
          class="way-head-icon"
          src="@/static/image/tx_back_icon@2x.png"
          @tap="closePopup"
        />
        <view class="way-head-title">选择提现方式</view>
        <view class="way-head-fake"></view>
      </view>
      <!-- body -->
      <view class="way-body">
        <block v-for="w in wayList" :key="w.id">
          <view class="way-item">
            <image class="way-item-icon" :src="w.icon" />
            <view class="way-item-title">{{ w.title }}</view>
            <template v-if="w.id == check">
              <image
                class="way-item-check"
                src="@/static/image/xb_xuanze_icon@2x.png"
              />
            </template>
          </view>
        </block>
      </view>
      <!-- footer -->
      <view class="way-foot">
        <view class="way-btn">确定</view>
      </view>
    </view>
  </uni-popup>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      check: 1,
      wayList: [
        {
          id: 1,
          title: "建设银行储蓄卡",
          icon: require("@/static/image/tx_card@2x.png"),
        },
        {
          id: 2,
          title: "微信",
          icon: require("@/static/image/tx_weixin@2x.png"),
        },
        {
          id: 3,
          title: "支付宝",
          icon: require("@/static/image/tx_zfb@2x.png"),
        },
      ],
    };
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
.way {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  background: #fff;
}
.way-head {
  @include flex(space-between, center);
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 90rpx;
  border-bottom: 2rpx solid #eee;
}
.way-head-icon {
  width: 28rpx;
  height: 28rpx;
}
.way-head-title {
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.way-head-fake {
  visibility: hidden;
  width: 28rpx;
  height: 28rpx;
}
.way-body {
  @include flex(flex-start, center);
  flex-direction: column;
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
}
.way-item {
  @include flex(flex-start, center);
  width: 100%;
  height: 100rpx;
  border-bottom: 2rpx solid #fafafa;
}
.way-item-icon {
  margin-right: 20rpx;
  flex-shrink: 0;
  width: 52rpx;
  height: 52rpx;
}
.way-item-title {
  width: 50%;
  flex-grow: 1;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.way-item-check {
  margin-left: 20rpx;
  flex-shrink: 0;
  width: 32rpx;
  height: 32rpx;
}
.way-foot {
  margin: 170rpx 0 30rpx 0;
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
}
.way-btn {
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  background: #e6344a;
  border-radius: 20rpx;
}
</style>
