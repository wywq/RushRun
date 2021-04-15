<template>
  <view class="indexdiffrent">
    <image class="index-bg" src="@/static/image/registerbg.png" />
    <view class="index-height"></view>
    <view class="header display_flex align_center">
      <!-- <view class="index-header-img margin-left margin-right"></view> -->
      <!-- <image class="index-header-img margin-left margin-right" src="/static/img/fanhui_icon@2x.png" @click="returnClick"></image> -->
      <view class="font_size_title color_white headertitle text_center"
        >登录</view
      >
      <!-- <view
        class="color_white font_size_14"
        @click="gopage('/pages/basic/register/index')"
        >注册账号</view
      > -->
    </view>
    <!-- logo和slogan -->
    <view class="text_center">
      <view class="logo"></view>
    </view>
    <!-- <view class="index-logo-center text_center color_white">ZLC</view>
    <view class="margin-top-10 font_size_14 color_white text_center"
      >鱼之缘</view
    > -->
    <!-- 输入框 -->
    <view class="index-main display_flex align_center">
      <image
        src="/static/img/shoujihao-6@2x.png"
        class="index-main-img"
      ></image>
      <view class="index-main-phone">
        <input
          class="input font_size_14 color_white"
          placeholder="请输入手机号"
          placeholder-style="color:#ffffff"
          v-model="reg_phone"
          maxlength="11"
        />
      </view>
    </view>
    <view class="index-main-pwd display_flex align_center">
      <image src="/static/img/mima-9@2x.png" class="index-main-img"></image>
      <view class="index-main-phone">
        <input
          type="password"
          class="input font_size_14 color_white"
          placeholder="请输入密码"
          placeholder-style="color:#ffffff"
          v-model="reg_pwd"
        />
      </view>
    </view>
    <!-- 立即登录 -->
    <view
      class="inedx-btn color-E6344A font_size_title display_flex flex_center align_center"
      @click="loginClick"
      >立即登录</view
    >
    <!-- <view
      class="font_size_14 color_white text_center wjmm"
      @click="gopage('/pages/basic/forget/index')"
      >忘记密码</view
    > -->
    <view class="index-footer"></view>
  </view>
</template>

<script>
import { check } from "@/api/new.js";
export default {
  data() {
    return {
      reg_phone: "", //手机号
      reg_pwd: "", //密码
    };
  },
  components: {},
  async onShow() {},
  methods: {
    // 返回上一页
    returnClick() {
      uni.navigateBack({
        delta: 1,
      });
    },
    // 立即注册
    gopage(url) {
      uni.navigateTo({ url: url });
    },
    // 立即登录
    loginClick() {
      if (this.reg_phone == "") {
        uni.showToast({
          title: "请输入手机号",
          icon: "none",
        });
      } else if (!/^1[3456789]\d{9}$/.test(this.reg_phone)) {
        uni.showToast({
          title: "请输入正确的手机号",
          icon: "none",
        });
      } else if (this.reg_pwd == "") {
        uni.showToast({
          title: "请输入密码",
          icon: "none",
        });
      } else {
        let data = {
          loginName: this.reg_phone,
          loginPwd: this.reg_pwd,
        };
        check(data, res => {
          console.log("登录之后:", res);
          if (res.status == 1) {
            uni.setStorageSync("zlc_token", res.token);
            uni.setStorageSync("zlc_phone", this.reg_phone);
            uni.setStorageSync("zlc_userId", res.userId);
            uni.showToast({
              title: res.info,
              duration: 2000,
              icon: "none",
            });
            uni.switchTab({
              url: "/pages/index",
            });
          } else {
            uni.showToast({
              title: res.info,
              duration: 2000,
              icon: "none",
            });
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.indexdiffrent {
  position: relative;
  width: 100%;
  height: 100vh;
  /* background: #0f6ccb; */
  z-index: 9;
}
.index-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.header {
  width: 100%;
  height: 93upx;
}
.index-header-img {
  width: 22upx;
  height: 40upx;
}
.headertitle {
  width: 100%;
}
.logo {
  width: 300rpx;
  height: 200rpx;
  margin: 130upx auto 0;
}
.index-logo-center {
  font-size: 42upx;
  font-weight: 800;
}
.index-main {
  width: 80%;
  height: 94upx;
  border: 2upx solid #ffffff;
  border-radius: 16upx;
  opacity: 0.6;
  margin: 106upx auto 22upx;
}
.index-main-pwd {
  width: 80%;
  height: 94upx;
  border: 2upx solid #ffffff;
  border-radius: 16upx;
  opacity: 0.6;
  margin: 0 auto;
}
.index-main-img {
  width: 45upx;
  height: 50upx;
  margin: 0 30upx 0 32upx;
}
.index-main-phone {
  width: 60%;
  height: 70upx;
  overflow: hidden;
  padding-left: 40upx;
  border-left: 2upx solid #ffffff;
}
.inedx-btn {
  width: 80%;
  height: 94upx;
  position: fixed;
  bottom: 278upx;
  left: 10%;
  z-index: 2;
  border-radius: 16upx;
  background: #ffffff;
  font-weight: 800;
}
.index-footer {
  width: 100%;
  height: 354upx;
  background: url(/static/img/11@2x.png) no-repeat;
  background-size: 100% 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1;
}
.wjmm {
  position: fixed;
  bottom: 216upx;
  left: calc((100% - 16%) / 2);
  z-index: 2;
}
</style>
