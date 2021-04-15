<template>
  <view class="indexdiffrent">
    <view class="index-height"></view>
    <view class="header display_flex align_center">
      <image
        class="index-header-img margin-left margin-right"
        src="/static/img/fanhui_icon@2x.png"
        @click="returnClick"
      ></image>
      <view class="font_size_title color_white headertitle text_center"
        >忘记密码</view
      >
      <view
        class="color_white font_size_14"
        @click="gopage('/pages/basic/login/index')"
        >登录账号</view
      >
    </view>
    <view class="index-main display_flex align_center color_white">
      <view class="index-user font_size_15">手机号</view>
      <view class="index-box font_size_15 margin-left">
        <input
          class="index-inp font_size_15"
          placeholder="请输入手机号"
          placeholder-style="color:#ffffff;opacity:0.5"
          v-model="reg_phone"
          maxlength="11"
        />
      </view>
    </view>
    <view class="index-main1 display_flex align_center color_white">
      <view class="index-user font_size_15">验证码</view>
      <view class="index-box font_size_15 margin-left">
        <input
          class="index-inp font_size_15"
          placeholder="请输入验证码"
          placeholder-style="color:#ffffff;opacity:0.5"
          v-model="reg_code"
        />
      </view>
      <view
        class="index-text-code font_size_12 color-E6344A display_flex align_center flex_center"
        v-if="isPhoneCode"
        @tap="sendCode"
        >获取验证码</view
      >
      <view
        class="index-text-code font_size_14 color-E6344A display_flex align_center flex_center"
        v-else
        >{{ countDown }}s</view
      >
    </view>
    <view class="index-main1 display_flex align_center color_white">
      <view class="index-user font_size_15">设置密码</view>
      <view class="index-box font_size_15 margin-left">
        <input
          type="password"
          class="index-inp font_size_15"
          placeholder="密码8-16位,包含数字和字母"
          placeholder-style="color:#ffffff;opacity:0.5"
          v-model="reg_pwd"
        />
      </view>
    </view>
    <view class="index-main1 display_flex align_center color_white">
      <view class="index-user font_size_15">确认密码</view>
      <view class="index-box font_size_15 margin-left">
        <input
          type="password"
          class="index-inp font_size_15"
          placeholder="请重复密码"
          placeholder-style="color:#ffffff;opacity:0.5"
          v-model="reg_pwdagein"
        />
      </view>
    </view>
    <view
      class="index-btn font-weight color-F5442D font_size_title display_flex flex_center align_center"
      @click="confirmClick"
      >确认重置密码</view
    >
    <view class="index-footer"></view>
    <view v-if="is_show == true" class="index-tip">
      <view class="indexTips">
        <view
          class="color-F5442D font_size_21 font-weight text_center index-tips-title"
          >温馨提示</view
        >
        <view class="color_grey font_size_16 padding-left padding-right"
          >密码设置成功,点击确定直接去登录吧</view
        >
        <view
          class="display_flex flex_center align_center color_white font_size_17 font-weight index-tips-btn"
          @click="yserClick"
          >确定</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import { smsSend, findpwd } from "@/api/new.js";
export default {
  data() {
    return {
      reg_phone: "", //手机号
      reg_pwd: "", //密码
      reg_code: "", //验证码
      reg_pwdagein: "", //确认密码
      countDown: "", //验证码倒计时
      isPhoneCode: true, //获取验证码
      is_show: false, //成功弹窗
    };
  },
  components: {},
  async onShow() {},
  methods: {
    gopage(url) {
      uni.navigateTo({
        url: url,
      });
    },
    // 点确定去登录
    yserClick() {
      this.is_show = false;
      uni.navigateTo({
        url: "/pages/basic/login/index",
      });
    },
    // 确认重置
    confirmClick() {
      if (this.reg_code == "") {
        uni.showToast({
          title: "请输入验证码",
          icon: "none",
        });
      } else if (this.reg_pwd == "") {
        uni.showToast({
          title: "请设置密码",
          icon: "none",
        });
      } else if (this.reg_pwd.length < 8 || this.reg_pwd.length > 16) {
        uni.showToast({
          title: "密码需为8到16位",
          icon: "none",
        });
      } else if (this.reg_pwdagein == "") {
        uni.showToast({
          title: "请确认密码",
          icon: "none",
        });
      } else if (this.reg_pwd != this.reg_pwdagein) {
        uni.showToast({
          title: "两次密码输入不一致",
          icon: "none",
        });
      } else {
        let data = {
          phone: this.reg_phone,
          loginPwd: this.reg_pwd,
          loginPwd_again: this.reg_pwdagein,
          phone_code: this.reg_code,
        };
        findpwd(data, res => {
          if (res.status == 1) {
            this.is_show = true;
          } else {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          }
        });
      }
    },
    // 返回上一页
    returnClick() {
      uni.navigateBack({
        delta: 1,
      });
    },
    // 获取验证码
    sendCode() {
      if (this.reg_phone == "") {
        uni.showToast({
          title: "请输入手机号",
          icon: "none",
        });
        return false;
      }
      if (!/^1[3456789]\d{9}$/.test(this.reg_phone)) {
        uni.showToast({
          title: "手机号码输入有误",
          icon: "none",
        });
      } else {
        let data = {
          phone: this.reg_phone,
        };
        smsSend(data, res => {
          if (res.status == 1) {
            this.countDown = 60;
            this.isPhoneCode = false;
            this.timeId = setInterval(() => {
              this.countDown--;
              if (this.countDown <= 0) {
                clearInterval(this.timeId);
                this.isPhoneCode = true;
              }
            }, 1000);
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          } else {
            uni.showToast({
              title: res.info,
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
  width: 100%;
  height: 100vh;
  background: #0f6ccb;
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
  width: 65%;
}
.index-main {
  width: 80%;
  height: 98upx;
  border-bottom: 2upx solid rgba(255, 255, 255, 0.5);
  margin: 182upx auto 0;
}
.index-main1 {
  width: 80%;
  height: 98upx;
  border-bottom: 2upx solid rgba(255, 255, 255, 0.5);
  margin: 0 auto;
}
.index-user {
  width: 20%;
}
.index-text-code {
  width: 150upx;
  height: 42upx;
  background: #ffffff;
  border-radius: 12upx;
}
.index-box {
  width: 54%;
}
.index-btn {
  width: 80%;
  height: 94upx;
  border-radius: 8upx;
  background: #ffffff;
  margin: 272upx auto 0;
  position: fixed;
  bottom: 276upx;
  left: 10%;
  z-index: 2;
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
.index-tip {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.indexTips {
  width: 60%;
  height: 444upx;
  background: #ffffff;
  border-radius: 30upx;
  margin: 360upx auto 0;
}
.index-tips-title {
  margin-bottom: 42upx;
  padding-top: 56upx;
}
.index-tips-btn {
  width: 298upx;
  height: 94upx;
  background: #0f6ccb;
  margin: 36upx auto 0;
  border-radius: 8upx;
}
</style>
