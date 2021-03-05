<!-- 用户协议 -->
<template>
  <view class="message">
    <header-basic :icon="true" title="个人信息"></header-basic>
    <!-- 主体 -->
    <view class="message-body">
      <view class="message-column">
        <!-- 头像 -->
        <view class="message-item">
          <view class="message-item-title">头像</view>
          <image
            class="message-item-avatar"
            src="@/static/image/sy_zhzx_icon@2x.png"
          ></image>
        </view>
        <!-- ID -->
        <view class="message-item">
          <view class="message-item-title">ID</view>
          <view class="message-item-value">2154889</view>
        </view>
        <!-- 姓名 -->
        <view class="message-item">
          <view class="message-item-title">姓名</view>
          <input
            class="message-item-value"
            type="text"
            v-model="name"
            placeholder="请输入您的姓名"
          />
        </view>
        <!-- 性别 -->
        <view class="message-item" @tap="handleJump(2)">
          <view class="message-item-title">性别</view>
          <view class="message-item-value">女</view>
          <image
            class="message-item-icon"
            src="@/static/image/sy_zhzx_icon@2x.png"
          ></image>
        </view>
        <!-- 微信 -->
        <view class="message-item">
          <view class="message-item-title">微信</view>
          <input
            class="message-item-value"
            type="text"
            v-model="wechat"
            placeholder="请输入您的微信账号"
          />
        </view>
        <!-- 等级信息 -->
        <view class="message-item">
          <view class="message-item-title">等级信息</view>
          <view class="message-item-value" @tap="handleJump(3)">一星达人</view>
        </view>
      </view>
      <view class="message-column">
        <!-- 实名认证 -->
        <view class="message-item" @tap="handleJump(4)">
          <view class="message-item-title">实名认证</view>
          <view class="message-item-red">已实名</view>
          <image
            class="message-item-icon"
            src="@/static/image/sy_zhzx_icon@2x.png"
          ></image>
        </view>
      </view>
      <view class="message-confirm">提交</view>
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
        case 3:
          uni.navigateTo({
            url: "/pages/mine/level/index",
          });
          break;
        case 4:
          uni.navigateTo({
            url: "/pages/mine/realname/index",
          });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #fafafa;
}
.message-body {
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
}
.message-column {
  @include flex(flex-start, center);
  flex-direction: column;
  margin-bottom: 30rpx;
  width: 100%;
  background: #ffffff;
  border-radius: 14rpx;
}
.message-item {
  @include flex(flex-start, center);
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2rpx solid #eee;
}
.message-item:last-child {
  border-bottom: none;
}
.message-item-title {
  flex-grow: 1;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.message-item-avatar {
  flex-shrink: 0;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
}
.message-item-value {
  flex-shrink: 0;
  margin-left: 16rpx;
  text-align: right;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.message-item-red {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #e6344a;
}
.message-item-icon {
  flex-shrink: 0;
  margin-left: 10rpx;
  width: 12rpx;
  height: 24rpx;
}
.message-confirm {
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
