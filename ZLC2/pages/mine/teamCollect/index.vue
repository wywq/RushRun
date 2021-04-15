<!-- 团队招募 -->
<template>
  <view class="collect">
    <header-basic
      class="collect-header"
      :icon="true"
      title="团队招募"
    ></header-basic>
    <!-- 团队招募body -->
    <view class="collect-body">
      <image class="collect-body-bg" src="@/static/image/wd_td_zm_bg@2x.png" />
      <!-- <view class="collect-body-title">鱼之缘</view> -->
      <!-- <view class="collect-body-subtitle">一部手机就可以赚钱</view> -->
      <view class="collect-body-code">邀请码:{{ code }}</view>
      <image class="collect-body-qr" :src="qrImg" />
      <view class="collect-body-btn">扫码注册</view>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import { teamRecruit } from "@/api/new.js";
import QR from "@/common/utils/wxqrcode.js";

export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      code: "",
      qrImg: "",
    };
  },
  onLoad(options) {
    this.getTeamRecruit();
  },
  methods: {
    //  我的团队--团队招募
    getTeamRecruit() {
      teamRecruit({}, res => {
        if (res.status > 0) {
          console.log("团队招募", res.data);
          this.code = res.data.code;
          this.qrCodeImg(res.data.dizhi);
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
      });
    },
    //生成分享二维码
    qrCodeImg(code) {
      this.qrImg = QR.createQrCodeImg(code, {
        typeNumber: 10,
        size: parseInt(300),
      });
      console.log(this.qrImg);
    },
  },
};
</script>

<style lang="scss" scoped>
.collect {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  height: 100vh;
}
.collect-header {
  flex-shrink: 0;
  width: 100%;
}
.collect-body {
  @include flex(flex-end, center);
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 50%;
  flex-grow: 1;
  border: none;
}
.collect-body-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.collect-body-title {
  margin-bottom: 320rpx;
  font-size: 108rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.collect-body-subtitle {
  margin-bottom: 60rpx;
  font-size: 48rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.collect-body-code {
  margin-bottom: 60rpx;
  font-size: 40rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.collect-body-qr {
  margin-bottom: 60rpx;
  width: 320rpx;
  height: 320rpx;
}
.collect-body-btn {
  @include flex(center, center);
  margin-bottom: 60rpx;
  width: 350rpx;
  height: 90rpx;
  border-radius: 40rpx;
  border: 4rpx solid #fdc96e;
  font-size: 32rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  background: #0f6ccb;
}
</style>
