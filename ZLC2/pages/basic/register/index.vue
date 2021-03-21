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
        >注册</view
      >
      <view
        class="color_white font_size_14"
        @click="gopage('/pages/basic/login/index')"
        >登录账号</view
      >
    </view>
    <!-- 账号信息 -->
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
          placeholder="密码8-16位，包含数字或字母"
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
    <view class="index-main1 display_flex align_center color_white">
      <view class="index-user font_size_15">支付密码</view>
      <view class="index-box font_size_15 margin-left">
        <input
          type="password"
          class="index-inp font_size_15"
          placeholder="支付密码为6位数字"
          placeholder-style="color:#ffffff;opacity:0.5"
          v-model="reg_paypwd"
        />
      </view>
    </view>
    <view class="index-main1 display_flex align_center color_white">
      <view class="index-user font_size_15">邀请码</view>
      <view class="index-box font_size_15 margin-left">
        <input
          class="index-inp font_size_15"
          placeholder="请输入邀请码"
          placeholder-style="color:#ffffff;opacity:0.5"
          v-model="reg_invcode"
        />
      </view>
    </view>
    <!-- 立即注册 -->
    <view
      class="index-btn font_size_title color-E6344A display_flex flex_center align_center"
      @click="registerClick"
      >立即注册</view
    >
    <!-- 用户协议勾选框 -->
    <view class="index-agreement display_flex flex_center align_center">
      <view class="position_relative index-position">
        <view
          class="index-agreement-view"
          v-if="type == 1"
          @click="changeClick"
        ></view>
        <image
          class="index-agreement-img"
          src="/static/img/gwc_xz_icon@2x.png"
          v-if="type == 2"
          @click="changeClick"
        ></image>
      </view>
      <view class="index-agreement-text color_white font_size_14" @click="yhxy"
        >注册即表示同意《用户协议》</view
      >
    </view>
    <!-- 弹出用户协议 -->
    <view class="index-UseragreementBox" v-if="show == true">
      <view class="index-Useragreement">
        <view
          class="color-E6344A font_size_21 font-weight text_center padding-top"
          >用户协议</view
        >
        <view
          class="index-indextext font_size_16 color_grey"
          v-html="content"
        ></view>
        <view
          class="index-agree-btn color_white font_size_title display_flex flex_center align_center"
          @click="agreeClick"
          >同意</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import { regrule, add, smsSend } from "@/api/new.js";
export default {
  data() {
    return {
      reg_phone: "", //手机号
      reg_pwd: "", //密码
      reg_pwdagein: "", //确认密码
      reg_invcode: "", //邀请码
      reg_code: "", //验证码
      countDown: "", //验证码倒计时
      isPhoneCode: true, //获取验证码
      type: 1, // 切换 1未勾选 2勾选
      content: "协议内容协议内容协议内容", //协议内容
      show: false,
      reg_paypwd: "", //支付密码
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
    // 同意用户协议
    agreeClick() {
      this.type = 2;
      this.show = false;
    },
    // 点击用户协议
    async yhxy() {
      this.show = true;
      let data = {};
      regrule({}, res => {
        if (res.status == 1) {
          this.content = res.data.rule;
        }
      });
    },
    // 返回上一页
    returnClick() {
      uni.navigateBack({
        delta: 1,
      });
    },
    // 立即注册
    registerClick() {
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
          title: "密码需8到16位",
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
      } else if (this.reg_paypwd == "") {
        uni.showToast({
          title: "请设置支付密码",
          icon: "none",
        });
      } else if (!/^\d{6}$/.test(this.reg_paypwd)) {
        uni.showToast({
          title: "支付密码位6位数字",
          icon: "none",
        });
      } else if (this.reg_invcode == "") {
        uni.showToast({
          title: "请输入邀请码",
          icon: "none",
        });
      } else if (this.type == 1) {
        uni.showToast({
          title: "请注册并表示同意《用户协议》",
          icon: "none",
        });
      } else {
        let data = {
          phone: this.reg_phone,
          phone_code: this.reg_code,
          loginPwd: this.reg_pwd,
          loginPwd_two: this.reg_pwdagein,
          code: this.reg_invcode,
          payPwd: this.reg_paypwd,
        };
        add(data, res => {
          if (res.status == 1) {
            console.log(res);
            uni.showToast({
              title: res.info,
              icon: "none",
            });
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/basic/login/index",
              });
            }, 1500);
          } else {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          }
        });
      }
    },
    // 切换用户协议
    changeClick() {
      if (this.type == 1) {
        this.type = 2;
      } else {
        this.type = 1;
      }
    },
    // 验证码
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
  background: #e6344a;
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
  background: #ffffff;
  border-radius: 12upx;
  margin: 170upx auto 34upx;
  font-weight: 800;
}
.index-agreement-img {
  width: 32upx;
  height: 32upx;
  position: absolute;
  top: 0;
  right: 0;
}
.index-agreement-view {
  width: 32upx;
  height: 32upx;
  background: rgba(251, 251, 251, 0.4);
  border-radius: 50upx;
  position: absolute;
  top: 0;
  right: 0;
}
.index-position {
  width: 32upx;
  height: 35upx;
  margin-right: 20upx;
}
.index-Useragreement {
  width: 80%;
  height: 698upx;
  background: #ffffff;
  border-radius: 36upx;
  margin: 360upx auto 0;
}
.index-UseragreementBox {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.index-indextext {
  height: 342upx;
  overflow-y: scroll;
  width: 80%;
  margin: 0 auto;
  padding-top: 48upx;
}
.index-agree-btn {
  width: 298upx;
  height: 94upx;
  background: #e6344a;
  border-radius: 8upx;
  margin: 50upx auto 0;
}
</style>
