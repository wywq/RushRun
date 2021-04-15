<!-- 转换中心 -->
<template>
  <view class="publish">
    <header-basic
      class="publish-header"
      :icon="true"
      :title="title"
    ></header-basic>
    <!-- 统计 -->
    <view class="publish-census">
      <view class="publish-census-price">
        <view class="publish-census-price-title"
          >￥{{ responseData.pingjun }}</view
        >
        <view class="publish-census-price-value">今日价格</view>
      </view>
      <view class="publish-census-line"></view>
      <view class="publish-census-area">
        <view class="publish-census-area-title"
          >￥{{ responseData.zuixiao }}~{{ responseData.zuida }}</view
        >
        <view class="publish-census-area-value">价格区间</view>
      </view>
    </view>
    <!-- 发布 -->
    <view class="publish-select">
      <view class="publish-select-all">总额：￥{{ allAmount }}</view>
      <view class="publish-select-number">
        <view class="publish-select-number-title">单价</view>
        <input
          class="publish-select-number-input"
          placeholder="请输入交易价格"
          v-model="formData.price"
          type="digit"
        />
      </view>
      <view class="publish-select-number">
        <view class="publish-select-number-title">数量</view>
        <input
          class="publish-select-number-input"
          placeholder="请输入交易数量"
          v-model="formData.num"
        />
      </view>
    </view>
    <!-- 按钮 -->
    <view class="publish-btn" @tap="handlePublish">{{ title }}</view>
    <!-- 说明 -->
    <view class="publish-intro">
      <!-- 说明标题 -->
      <view class="publish-intro-title">交易说明</view>
      <view class="publish-intro-content" v-html="responseData.rule"></view>
    </view>
    <pay-pwd ref="pay" @getPassword="getPassword"></pay-pwd>
  </view>
</template>

<script>
import { Decimal } from "decimal.js";
import { pingjun, fubuSell, fubuNeed } from "@/api/new.js";
import HeaderBasic from "@/components/header/index";
import PayPwd from "@/components/popup/password/index";

export default {
  components: {
    HeaderBasic,
    PayPwd,
  },
  data() {
    return {
      title: "",
      type: "",
      formData: {
        price: "",
        num: "",
        paypwd: "",
      },
      responseData: {},
    };
  },
  computed: {
    allAmount() {
      if (this.formData.price && this.formData.num) {
        return this.calculateAll(this.formData.price, this.formData.num);
      } else {
        return 0;
      }
    },
  },
  onLoad(opt) {
    this.getPingjun();
    if (opt.type) {
      this.pageInit(opt.type);
    }
  },
  methods: {
    //接口获取价格
    getPingjun() {
      pingjun({}, res => {
        if (res.status > 0) {
          this.responseData = res.data;
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
      });
    },
    //接口发布转让
    getFubuSell() {
      fubuSell(this.formData, res => {
        if (res.status > 0) {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
          setTimeout(() => {
            uni.navigateBack({ delta: 2 });
          }, 1000);
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
      });
    },
    //接口发布需求
    getFubuNeed() {
      fubuNeed(this.formData, res => {
        if (res.status > 0) {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
          setTimeout(() => {
            uni.navigateBack({ delta: 2 });
          }, 1000);
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
      });
    },
    //初始化
    pageInit(e) {
      this.type = e;
      switch (Number(e)) {
        case 1:
          this.title = "发布需求";
          break;
        case 2:
          this.title = "发布转让";
          break;
      }
    },
    //发布
    onPublish() {
      switch (Number(this.type)) {
        case 1:
          this.getFubuNeed();
          break;
        case 2:
          this.getFubuSell();
          break;
      }
    },
    // 计算总额
    calculateAll(a, b) {
      const money = new Decimal(a)
        .mul(new Decimal(b))
        .toFixed(2, Decimal.ROUND_DOWN);
      return money;
    },
    //发布
    handlePublish() {
      this.$refs.pay.openPopup();
    },
    //获取支付密码
    getPassword(e) {
      this.formData.paypwd = e;
      this.onPublish();
    },
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.publish {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  padding: calc(96rpx + var(--status-bar-height)) 30rpx 30rpx 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #fafafa;
}
/*  #endif  */
/*  #ifdef  H5 */
.publish {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  padding: 121rpx 30rpx 30rpx 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #fafafa;
}
/*  #endif  */
.publish-header {
  position: fixed;
  top: 0;
  z-index: 9999;
}
.publish-census {
  @include flex(center, center);
  margin-top: 30rpx;
  width: 100%;
  height: 144rpx;
  background: #ffffff;
  border-radius: 16rpx;
}
.publish-census-price,
.publish-census-area {
  @include flex(center, center);
  flex-direction: column;
  padding: 0 10rpx;
  box-sizing: border-box;
  flex-grow: 1;
  width: 40%;
}
.publish-census-price-title,
.publish-census-area-title {
  @extend %text_cut_line;
  margin-bottom: 15rpx;
  width: 100%;
  text-align: center;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #0f6ccb;
}
.publish-census-price-value,
.publish-census-area-value {
  width: 100%;
  text-align: center;
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.publish-census-line {
  flex-shrink: 0;
  width: 2rpx;
  height: 36rpx;
  background-color: #eee;
}
.publish-select {
  @include flex(flex-start, center);
  flex-direction: column;
  margin-top: 30rpx;
  width: 100%;
  background: #ffffff;
  border-radius: 14rpx;
}
.publish-select-all {
  @extend %text_cut_line;
  @include flex(center, center);
  padding: 0 20rpx;
  box-sizing: border-box;
  width: 100%;
  height: 150rpx;
  font-size: 36rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #0f6ccb;
}
.publish-select-number {
  @include flex(flex-start, center);
  padding-right: 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 90rpx;
  border-top: 2rpx solid #eee;
}
.publish-select-number-title {
  flex-shrink: 0;
  width: 120rpx;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
  line-height: 90rpx;
}
.publish-select-number-input {
  flex-grow: 1;
}
.publish-btn {
  margin-top: 30rpx;
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  background: #0f6ccb;
  border-radius: 22rpx;
  font-size: 32rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.publish-intro {
  @include flex(flex-start, center);
  flex-direction: column;
  margin-top: 30rpx;
  width: 100%;
}
.publish-intro-title {
  width: 100%;
  text-align: left;
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.publish-intro-content {
  margin-top: 18rpx;
  width: 100%;
  text-align: left;
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
</style>
