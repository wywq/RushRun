<!-- 用户协议 -->
<template>
  <uni-popup ref="popup" :maskClick="false" type="share">
    <view class="share">
      <view class="share-body">
        <view class="share-item" @tap="handleShare(1)">
          <image
            class="share-item-icon"
            src="@/static/image/sxy_fx_wx_icon@2x.png"
          ></image>
          <view class="share-item-title">微信</view>
        </view>
        <view class="share-item" @tap="handleShare(2)">
          <image
            class="share-item-icon"
            src="@/static/image/sxy_fx_pyq_icon@2x.png"
          ></image>
          <view class="share-item-title">朋友圈</view>
        </view>
        <view class="share-item" @tap="handleShare(3)">
          <image
            class="share-item-icon"
            src="@/static/image/sxy_fx_qq_icon@2x.png"
          ></image>
          <view class="share-item-title">QQ好友</view>
        </view>
      </view>
      <view class="share-footer" @tap="closePopup">取消</view>
    </view>
  </uni-popup>
</template>

<script>
import { shangfenxiang } from "@/api/new.js";

export default {
  components: {},
  props: {
    details: String,
  },
  data() {
    return {
      detailData: {},
    };
  },
  methods: {
    //分享成功
    getShangfenxiang(id) {
      shangfenxiang(
        {
          id,
        },
        res => {
          if (res.status > 0) {
            console.log("分享成功", res);
          } else {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          }
        }
      );
    },
    openPopup() {
      this.detailData = JSON.parse(this.details);
      console.log(this.detailData);
      this.$refs.popup.open();
    },
    closePopup() {
      this.$refs.popup.close();
    },
    handleShare(val) {
      switch (val) {
        case 1:
          uni.share({
            provider: "weixin",
            scene: "WXSceneSession",
            type: 0,
            href: this.detailData.shipin_code,
            summary: this.detailData.shipin_name,
            imageUrl: this.detailData.shipin_pic,
            success: res => {
              this.getShangfenxiang(this.details.shipin_id);
              console.log("success:" + JSON.stringify(res));
            },
            fail: err => {
              console.log("fail:" + JSON.stringify(err));
            },
          });
          break;
        case 2:
          uni.share({
            provider: "weixin",
            scene: "WXSenceTimeline",
            type: 0,
            href: this.detailData.shipin_code,
            summary: this.detailData.shipin_name,
            imageUrl: this.detailData.shipin_pic,
            success: res => {
              this.getShangfenxiang(this.details.shipin_id);
              console.log("success:" + JSON.stringify(res));
            },
            fail: err => {
              console.log("fail:" + JSON.stringify(err));
            },
          });
          break;
        case 3:
          uni.share({
            provider: "qq",
            title: this.detailData.shipin_name,
            href: this.detailData.shipin_code,
            summary: this.detailData.shipin_name,
            imageUrl: this.detailData.shipin_pic,
            success: res => {
              this.getShangfenxiang(this.details.shipin_id);
              console.log("success:" + JSON.stringify(res));
            },
            fail: err => {
              console.log("fail:" + JSON.stringify(err));
            },
          });
          break;
      }
      this.closePopup();
    },
  },
};
</script>

<style lang="scss" scoped>
.share {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  height: 360rpx;
}
.share-body {
  @include flex(space-around, center);
  width: 100%;
  flex-grow: 1;
  background: #ffffff;
}
.share-item {
  @include flex(center, center);
  flex-direction: column;
}
.share-item-icon {
  margin-bottom: 10rpx;
  width: 100rpx;
  height: 100rpx;
  border: 2rpx dashed #3d3d3d;
}
.share-item-title {
  font-size: 30rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.share-footer {
  flex-shrink: 0;
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  background: #e6344a;
  text-align: center;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
</style>
