<!-- 用户协议 -->
<template>
  <uni-popup ref="popup" :maskClick="true" type="center" @change="onChange">
    <view class="password">
      <view class="password-title">请输入支付密码</view>
      <view class="code-input-main">
        <view class="code-input-main-item">{{ code[0] ? "*" : "" }}</view>
        <view class="code-input-main-item">{{ code[1] ? "*" : "" }}</view>
        <view class="code-input-main-item">{{ code[2] ? "*" : "" }}</view>
        <view class="code-input-main-item">{{ code[3] ? "*" : "" }}</view>
        <view class="code-input-main-item">{{ code[4] ? "*" : "" }}</view>
        <view class="code-input-main-item">{{ code[5] ? "*" : "" }}</view>
        <input
          class="code-input-input"
          v-model="code"
          maxlength="6"
          type="number"
          @input="onInput"
          style="width: 70%"
        />
      </view>
    </view>
  </uni-popup>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      code: "",
    };
  },
  methods: {
    openPopup() {
      this.$refs.popup.open();
    },
    closePopup() {
      this.$refs.popup.close();
    },
    onChange(e) {
      if (!e.show) {
        this.code = "";
      }
    },
    onInput() {
      if (this.code.length == 6) {
        console.log("111");
        this.$emit("getPassword", this.code);
        this.closePopup();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.password {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 590rpx;
  height: 473rpx;
  background: #ffffff;
  border-radius: 30rpx;
  //   margin: 360upx auto 0;
}
.password-title {
  margin-top: 30rpx;
  width: 100%;
  text-align: center;
  font-size: 36rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #0f6ccb;
}

.code-input-input {
  height: 104upx;
  position: absolute;
  width: 100%;
  outline: none;
  color: #222222;
  opacity: 0;
  margin-left: 0;
}
.code-input-main {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 85%;
  height: 104upx;
  background: #ffffff;
  margin: 30upx auto 0;
}
.code-input-main-item {
  width: 250upx;
  height: 104upx;
  line-height: 104upx;
  opacity: 0.8;
  margin: 0 5upx;
  text-align: center;
  padding-bottom: 0;
  font-size: 48upx;
  color: #222222;
  border: 2upx solid #d7d7d7;
}
</style>
