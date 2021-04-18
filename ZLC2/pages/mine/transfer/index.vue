<!-- 提现 -->
<template>
  <view class="withdraw">
    <header-basic
      class="withdraw-header"
      :icon="true"
      title="划转"
    ></header-basic>
    <!-- 提现body -->
    <view class="withdraw-body">
      <view class="withdraw-card">
        <!-- <view class="withdraw-card-head">
          <view class="withdraw-card-head-title">提现至</view>
          <image
            class="withdraw-card-head-icon"
            src="@/static/image/wd_jin_icon@2x.png"
          ></image>
        </view> -->
        <view class="withdraw-card-body">
          <view class="withdraw-card-body-title">数量</view>
          <view class="withdraw-card-body-type">
            <input
              class="withdraw-card-body-input"
              placeholder="请输入数量"
              v-model="formData.money"
            />
          </view>
          <view class="withdraw-card-body-tips">剩余数量：{{ coin }}</view>
          <view class="withdraw-card-body-btn" @tap="handleConfirm">确认</view>
        </view>
      </view>
    </view>
    <withdraw-way ref="way"></withdraw-way>
    <pay-pwd ref="pay" @getPassword="getPassword"></pay-pwd>
  </view>
</template>

<script>
import { huazhuan } from "@/api/new.js";
import HeaderBasic from "@/components/header/index";
import WithdrawWay from "@/components/popup/withdrawWay/index.vue";
import PayPwd from "@/components/popup/password/index";

export default {
  components: {
    HeaderBasic,
    WithdrawWay,
    PayPwd,
  },
  data() {
    return {
      coin: 0,
      money: "",
      formData: {
        paypwd: "",
        money: "",
      },
    };
  },
  computed: {},
  onLoad(opt) {
    if (opt.money) {
      this.coin = opt.money;
    }
  },
  onUnload() {
    this.formData.paypwd = "";
    this.formData.money = "";
  },
  methods: {
    //   用户资料
    getHuazhuan() {
      huazhuan(this.formData, res => {
        if (res.status > 0) {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
          setTimeout(() => {
            uni.navigateBack({
              delta: 1,
            });
          }, 1000);
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
      });
    },
    //分享
    handleConfirm() {
      this.$refs.pay.openPopup();
    },
    getPassword(e) {
      console.log(e);
      this.formData.paypwd = e;
      this.getHuazhuan();
    },
  },
};
</script>

<style lang="scss" scoped>
.withdraw {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
  background: #fafafa;
}
.withdraw-header {
  flex-shrink: 0;
}
.withdraw-body {
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 50%;
  flex-grow: 1;
  background: #fafafa;
}
.withdraw-card {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  border-radius: 20rpx;
  background: #fff;
}
.withdraw-card-head {
  @include flex(space-between, center);
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  background: #0f6ccb;
  border-radius: 20rpx 20rpx 0 0;
}
.withdraw-card-head-title {
  font-size: 30rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.withdraw-card-head-icon {
  width: 14rpx;
  height: 24rpx;
}
.withdraw-card-body {
  @include flex(flex-start, center);
  flex-direction: column;
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
}
.withdraw-card-body-title {
  margin-bottom: 40rpx;
  width: 100%;
  text-align: left;
  font-size: 30rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.withdraw-card-body-type {
  @include flex(flex-start, center);
  padding-bottom: 40rpx;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2rpx solid #eee;
}
.withdraw-card-body-unit {
  margin-right: 20rpx;
  flex-shrink: 0;
  font-size: 96rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.withdraw-card-body-input {
  flex-grow: 1;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.withdraw-card-body-tips {
  margin-top: 20rpx;
  width: 100%;
  text-align: left;
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
.withdraw-card-body-btn {
  margin-top: 70rpx;
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  background: #0f6ccb;
  border-radius: 24rpx;
  font-size: 36rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
</style>
