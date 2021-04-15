<!-- 个人中心 -->
<template>
  <view class="mine">
    <!-- 卡片 -->
    <view class="mine-header">
      <!-- 占位 -->
      <view class="mine-header-block"></view>
      <image
        class="mine-header-bg"
        src="@/static/image/wd_ddty_bg copy@2x.png"
      ></image>
      <view class="mine-header-card">
        <image
          class="mine-header-card-bg"
          src="@/static/image/wd_grzl_bg@2x.png"
        ></image>
        <image
          class="mine-header-card-setting"
          src="@/static/image/wd_shezhi_icon@2x.png"
          @tap="handleSelect"
        ></image>
        <view class="mine-card-up">
          <image class="mine-card-avatar" :src="mineData.pic"></image>
          <view class="mine-card-message">
            <view class="mine-card-message-up">
              <view class="mine-card-message-name">{{ mineData.nick }}</view>
            </view>
            <view class="mine-card-message-down">ID：{{ mineData.phone }}</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 主体 -->
    <view class="mine-body">
      <!-- 功能 -->
      <view class="mine-column">
        <!-- 总钱包 -->
        <view class="mine-column-item">
          <image
            class="mine-column-item-icon"
            src="@/static/image/wd_zqb_icon@2x.png"
          ></image>
          <view class="mine-column-item-title">金币数量</view>
          <view class="mine-column-item-value">{{ mineData.jinbi }}</view>
        </view>
        <!-- 钱包地址 -->
        <view class="mine-column-item">
          <image
            class="mine-column-item-icon"
            src="@/static/image/wd_qbdz_icon@2x.png"
          ></image>
          <view class="mine-column-item-title">金币地址</view>
          <view class="mine-column-item-value">{{ mineData.address }}</view>
          <!-- <image
            class="mine-column-item-clip"
            src="@/static/image/wd_fuzhi_icon@2x.png"
            @tap="handleClip"
          ></image> -->
        </view>
      </view>
      <!-- 功能 -->
      <view class="mine-column">
        <!-- 钱包地址 -->
        <view class="mine-column-item" @tap="handleJump">
          <image
            class="mine-column-item-icon"
            src="@/static/image/wd_wdrw_icon@2x.png"
          ></image>
          <view class="mine-column-item-title">我的订单</view>
          <image
            class="mine-column-item-go"
            src="@/static/image/order_all_icon@2x.png"
          ></image>
        </view>
      </view>
      <view class="mine-btn" @tap="handleTransfer">划转</view>
    </view>
  </view>
</template>

<script>
import { waipanSelf } from "@/api/new.js";
import {
  setClipboardData,
  getClipboardData,
} from "@/uni_modules/u-clipboard/js_sdk";
export default {
  components: {},
  data() {
    return {
      // 个人信息
      mineData: {},
      //我的等级
      level: "",
    };
  },
  computed: {},
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  beforeMount() {
    console.log("beforeMount");
  },
  mounted() {
    console.log("mounted");
  },
  onLoad() {
    console.log("onLoad");
  },
  onShow() {
    console.log("onShow");
    this.getWaipanSelf();
  },
  methods: {
    //   用户资料
    getWaipanSelf() {
      waipanSelf({}, res => {
        if (res.status > 0) {
          console.log(res.data);
          this.mineData = res.data;
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
        uni.stopPullDownRefresh();
      });
    },

    //跳转
    handleJump() {
      uni.navigateTo({
        url: "/pages/exchange/orderList/index",
      });
    },
    handleSelect() {
      uni.navigateTo({
        url: "/pages/mine/select/index",
      });
    },
    handleClip() {
      // uni.setClipboardData({
      //   data: this.mineData.jinbi_address,
      //   success: res => {
      //     uni.showToast({
      //       title: "复制成功!",
      //       icon: "none",
      //     });
      //   },
      //   fail: err => {
      //     uni.showToast({
      //       title: res.info,
      //       icon: "none",
      //     });
      //   },
      // });
      setClipboardData(this.mineData.jinbi_address).then(() => {
        uni.showToast({
          title: "复制成功!",
          icon: "none",
        });
      });
    },
    handleTransfer() {
      uni.navigateTo({
        url: "/pages/mine/transfer/index?money=" + this.mineData.jinbi,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mine {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}
/*  #ifdef  APP-PLUS */
.mine-header-block {
  width: 100%;
  height: var(--status-bar-height);
}
/*  #endif  */
/*  #ifdef  H5 */
.mine-header-block {
  width: 100%;
  height: 25rpx;
}
/*  #endif  */
.mine-header {
  position: relative;
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 300rpx;
  z-index: 9;
}
.mine-header-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -9;
}
.mine-header-card {
  @include flex(space-between, center);
  flex-direction: column;
  position: relative;
  margin-top: 80rpx;
  padding: 84rpx 0 20rpx 0;
  box-sizing: border-box;
  width: 100%;
  height: 300rpx;
}
.mine-header-card-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.mine-header-card-setting {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 40rpx;
  height: 40rpx;
  z-index: 1;
}
.mine-card-up {
  @include flex(flex-start, center);
  padding: 0 25rpx 0 50rpx;
  box-sizing: border-box;
  width: 100%;
}
.mine-card-avatar {
  margin-right: 20rpx;
  flex-shrink: 0;
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(189, 180, 222, 0.5);
}
.mine-card-message {
  @include flex(center, flex-start);
  flex-direction: column;
  flex-grow: 1;
}
.mine-card-message-up {
  @include flex(flex-start, center);
  margin-bottom: 10rpx;
  width: 100%;
}
.mine-card-message-name {
  margin-right: 10rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.mine-card-message-icon {
  width: 28rpx;
  height: 36rpx;
}
.mine-card-message-down {
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.mine-card-icon {
  margin-left: 20rpx;
  flex-shrink: 0;
  width: 12rpx;
  height: 24rpx;
}
.mine-card-down {
  @include flex(flex-start, center);
  width: 100%;
}
.mine-card-item {
  @include flex(center, center);
  flex-direction: column;
  padding: 0 10rpx;
  box-sizing: border-box;
  width: calc(100% / 3);
  flex-shrink: 1;
}
.mine-card-item-line {
  width: 2rpx;
  height: 36rpx;
  background: #fff;
}
.mine-card-item-value {
  @extend %text_cut_line;
  margin-bottom: 15rpx;
  width: 100%;
  text-align: center;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.mine-card-item-title {
  @extend %text_cut_line;
  width: 100%;
  text-align: center;
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.mine-body {
  @include flex(flex-start, center);
  flex-direction: column;
  flex-grow: 1;
  margin-top: 130rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
}
.mine-order {
  width: 100%;
  border-radius: 14rpx;
  background: #ffffff;
}
.mine-order-up {
  @include flex(space-between, center);
  padding: 30rpx 20rpx;
  box-sizing: border-box;
  width: 100%;
  height: 90rpx;
  border-bottom: 2rpx solid #eee;
}
.mine-order-up-title {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.mine-order-up-icon {
  width: 12rpx;
  height: 24rpx;
}
.mine-order-down {
  @include flex(space-between, center);
  padding: 25rpx 60rpx;
  box-sizing: border-box;
  width: 100%;
  height: 125rpx;
}
.mine-order-down-item {
  @include flex(space-between, center);
  flex-direction: column;
  height: 100%;
}
.mine-order-item-icon {
  width: 35rpx;
  height: 35rpx;
}
.mine-order-item-title {
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.mine-column {
  @include flex(flex-start, center);
  flex-direction: column;
  margin-bottom: 30rpx;
  width: 100%;
  background: #ffffff;
  border-radius: 14rpx;
}
.mine-column-item {
  @include flex(flex-start, center);
  padding: 25rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100rpx;
  border-bottom: 2rpx solid #eee;
}
.mine-column-item:last-child {
  border-bottom: none;
}
.mine-column-item-icon {
  flex-shrink: 0;
  margin-right: 16rpx;
  width: 50rpx;
  height: 50rpx;
}
.mine-column-item-title {
  flex-grow: 1;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.mine-column-item-value {
  @extend %text_cut_line;
  margin-left: 16rpx;
  flex-shrink: 0;
  width: 340rpx;
  text-align: right;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.mine-column-item-go {
  margin-left: 16rpx;
  flex-shrink: 0;
  width: 12rpx;
  height: 24rpx;
}
.mine-column-item-clip {
  margin-left: 16rpx;
  flex-shrink: 0;
  width: 32rpx;
  height: 32rpx;
}
.mine-column-item-red {
  @extend %text_cut_line;
  margin-left: 16rpx;
  flex-shrink: 0;
  width: 350rpx;
  text-align: right;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0f6ccb;
}
.mine-btn {
  margin-bottom: 30rpx;
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
