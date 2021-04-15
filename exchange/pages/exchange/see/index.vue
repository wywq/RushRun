<!-- 划转 -->
<template>
  <view class="withdraw">
    <header-basic
      class="withdraw-header"
      :icon="true"
      title="查看凭证"
    ></header-basic>
    <!-- 提现body -->
    <view class="withdraw-body">
      <view class="withdraw-card">
        <view class="withdraw-card-body">
          <view class="add-card-imgs">
            <block v-for="(i, index) in imgList" :key="index">
              <image class="add-card-img" :src="i.pic"></image>
            </block>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { seeProof } from "@/api/new.js";
import HeaderBasic from "@/components/header/index";

export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      imgList: [],
      formData: {
        id: "",
      },
    };
  },
  computed: {},
  onLoad(opt) {
    if (opt.id) {
      this.formData.id = opt.id;
      this.getSeeProof();
    }
  },
  methods: {
    //   划转
    getSeeProof() {
      seeProof(this.formData, res => {
        if (res.status > 0) {
          console.log(res.data);
          this.imgList = res.data;
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
        uni.stopPullDownRefresh();
      });
    },
    //点击上传
    handleUpload() {
      this.$upload.uploadImg(async url => {
        this.imgList.push(url);
        this.formData.pic = this.imgList.join(",");
        console.log("url", url, this.imgList, this.formData.pic);
      });
    },
    handleConfirm() {
      this.getUploadProof();
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
  padding-bottom: 30rpx;
  box-sizing: border-box;
  width: 100%;
  text-align: left;
  font-size: 30rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
  border-bottom: 2rpx solid #eee;
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

.add-card-imgs {
  @include flex(flex-start, center);
  margin-top: 30rpx;
  flex-shrink: 0;
  width: 100%;
}
.add-card-img {
  margin-right: calc((100% - 600rpx) / 2);
  width: 200rpx;
  height: 200rpx;
  border-radius: 16rpx;
}
.add-card-img:last-child {
  margin-right: 0;
}
</style>
