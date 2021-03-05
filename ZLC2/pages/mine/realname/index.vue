<!-- 用户协议 -->
<template>
  <view class="real">
    <header-basic :icon="true" title="实名认证"></header-basic>
    <!-- 主体 -->
    <view class="real-body">
      <view class="real-column">
        <!-- 姓名 -->
        <view class="real-item">
          <view class="real-item-title">姓名</view>
          <view class="real-item-point">*</view>
          <input
            class="real-item-value"
            type="text"
            v-model="name"
            placeholder="请输入您的真实姓名"
          />
        </view>
        <!-- 身份证号 -->
        <view class="real-item">
          <view class="real-item-title">身份证号</view>
          <view class="real-item-point">*</view>
          <input
            class="real-item-value"
            type="text"
            v-model="name"
            placeholder="请输入您的身份证号"
          />
        </view>
        <!-- 银行名称 -->
        <view class="real-item">
          <view class="real-item-title">银行名称(选填)</view>
          <view class="real-item-value">请选择银行</view>
          <image
            class="real-item-icon"
            src="@/static/image/sy_zhzx_icon@2x.png"
          ></image>
        </view>
        <!-- 银行卡号 -->
        <view class="real-item">
          <view class="real-item-title">银行卡号(选填)</view>
          <input
            class="real-item-value"
            type="text"
            v-model="name"
            placeholder="银行卡号一经填写，不能修改"
          />
        </view>
        <!-- 支付宝号 -->
        <view class="real-item">
          <view class="real-item-title">支付宝号</view>
          <view class="real-item-point">*</view>
          <input
            class="real-item-value"
            type="text"
            v-model="name"
            placeholder="请输入您的支付宝账号"
          />
        </view>
        <!-- 人脸识别 -->
        <view class="real-item">
          <view class="real-item-title">人脸识别</view>
          <view class="real-item-point">*</view>
          <view class="real-item-value">未识别</view>
        </view>
      </view>
      <view class="real-point">*为必填项，未填写不可完成认证</view>
      <view class="real-confirm">认证</view>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      name: "",
      wechat: "",
    };
  },
  onLoad(options) {},
  methods: {
    //跳转
    handleJump(val) {
      switch (Number(val)) {
        case 2:
          uni.navigateTo({
            url: "/pages/mine/sex/index",
          });
          break;
        case 4:
          uni.navigateTo({
            url: "/pages/mine/sex/index",
          });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.real {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #fafafa;
}
.real-body {
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
}
.real-column {
  @include flex(flex-start, center);
  flex-direction: column;
  margin-bottom: 30rpx;
  width: 100%;
  background: #ffffff;
  border-radius: 14rpx;
}
.real-item {
  @include flex(flex-start, center);
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2rpx solid #eee;
}
.real-item:last-child {
  border-bottom: none;
}
.real-item-title {
  margin-right: 10rpx;
  flex-shrink: 0;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.real-item-point {
  flex-shrink: 0;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ff3e56;
}
.real-item-value {
  flex-grow: 1;
  margin-left: 16rpx;
  text-align: right;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.real-item-red {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #e6344a;
}
.real-item-icon {
  flex-shrink: 0;
  margin-left: 10rpx;
  width: 12rpx;
  height: 24rpx;
}
.real-point {
  margin-bottom: 30rpx;
  width: 100%;
  text-align: left;
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #e6344a;
}
.real-confirm {
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  background: #e6344a;
  border-radius: 22rpx;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
</style>
