<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" @tap="handleTap"></image>
    <view class="text-area">
      <text class="title" @tap="handleTap">{{ title }}</text>
    </view>
  </view>
</template>

<script>
import { huotirenzheng, writeXinxi } from "@/api/new.js";
export default {
  data() {
    return {
      title: "Hello",
    };
  },
  onLoad() {},
  methods: {
    getHuotirenzheng(results) {
      huotirenzheng(
        {
          metaInfo: JSON.stringify(results),
        },
        res => {
          if (Number(res.status) > 0) {
            console.log("res2", res);
            // uni.navigateTo({
            //   url:
            //     "/pages/index/webview?data=" + res.data.ResultObject.CertifyUrl,
            // });
            window.location.href = res.data.ResultObject.CertifyUrl;
          }
        }
      );
    },
    handleTap() {
      const results = getMetaInfo();
      console.log(JSON.stringify(results));
      writeXinxi(
        {
          realname: "王奎智",
          zhifubao: "18888888888",
          idcard: "210104199312214616",
        },
        res => {
          if (Number(res.status) > 0) {
            console.log("res1", res);
            this.getHuotirenzheng(results);
          }
        }
      );
      // this.getHuotirenzheng(results);
    },
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
