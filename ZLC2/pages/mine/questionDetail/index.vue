<!-- 问题反馈详情 -->
<template>
  <view class="detail">
    <header-basic
      class="detail-header"
      :icon="true"
      title="问题反馈"
    ></header-basic>
    <view class="detail-body">
      <!-- 详情上 -->
      <view class="detail-up">
        <!-- 姓名 -->
        <view class="detail-up-column">
          <view class="detail-up-column-title">姓名：</view>
          <view class="detail-up-column-value">{{ feedbackDetail.name }}</view>
        </view>
        <!-- 手机号码 -->
        <view class="detail-up-column">
          <view class="detail-up-column-title">手机号码：</view>
          <view class="detail-up-column-value">{{ feedbackDetail.phone }}</view>
        </view>
        <!-- 身份证 -->
        <view class="detail-up-column">
          <view class="detail-up-column-title">身份证：</view>
          <view class="detail-up-column-value">{{
            feedbackDetail.idcard
          }}</view>
        </view>
        <!-- 问题类型 -->
        <view class="detail-up-column">
          <view class="detail-up-column-title">问题类型：</view>
          <view class="detail-up-column-value">{{ feedbackDetail.type }}</view>
        </view>
        <!-- 问题详情 -->
        <view class="detail-up-column">
          <view class="detail-up-column-title">问题详情：</view>
          <view class="detail-up-column-value">{{
            feedbackDetail.content
          }}</view>
        </view>
        <!-- 图 -->
        <view class="detail-up-column">
          <block v-for="i in imgList" :key="i.id">
            <image class="detail-up-column-img" :src="i.pic"></image>
          </block>
        </view>
      </view>
      <!-- 标题 -->
      <view class="detail-title">回复</view>
      <!-- 回复 -->
      <view class="detail-down">{{ feedbackDetail.apply }}</view>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import { feddbackInfo } from "@/api/new.js";

export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      feedbackDetail: {},

      imgList: [],
    };
  },
  onLoad(options) {
    if (options.id) {
      this.getFeddbackInfo(options.id);
    }
  },
  methods: {
    getFeddbackInfo(feedback_id) {
      feddbackInfo(
        {
          feedback_id,
        },
        res => {
          if (res.status > 0) {
            console.log(res.data);
            this.feedbackDetail = res.data;
            this.imgList = res.data.pic_list;
          } else {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          }
          uni.stopPullDownRefresh();
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
}
.detail-header {
  flex-shrink: 0;
  width: 100%;
}
.detail-body {
  @include flex(flex-start, center);
  flex-direction: column;
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 50%;
  flex-grow: 1;
  background: #fafafa;
}
.detail-up {
  @include flex(flex-start, center);
  flex-direction: column;
  flex-shrink: 0;
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  background: #ffffff;
  border-radius: 14rpx;
}
.detail-up-column {
  @include flex(flex-start, flex-start);
  margin-bottom: 10rpx;
  width: 100%;
}
.detail-up-column-title {
  flex-shrink: 0;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0f6ccb;
}
.detail-up-column-value {
  flex-grow: 1;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.detail-up-column-img {
  margin-right: calc((100% - 600rpx) / 2);
  width: 200rpx;
  height: 200rpx;
  border-radius: 16rpx;
}
.detail-up-column-img:last-child {
  margin-right: 0;
}
.detail-title {
  padding: 30rpx 0;
  box-sizing: border-box;
  width: 100%;
  flex-shrink: 0;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0f6ccb;
}
.detail-down {
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 20%;
  flex-grow: 1;
  background: #ffffff;
  border-radius: 14rpx;
  overflow: hidden;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
</style>
