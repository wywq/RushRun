<!-- 首页tab -->
<template>
  <view class="home">
    <!-- 首页top -->
    <view class="home-top">
      <!-- 背景 -->
      <image class="home-bg" src="@/static/image/sy_top_img@2x.png" />
      <!-- 占位 -->
      <view class="home-block"></view>
      <!-- 背景标题 -->
      <view class="home-header">
        <view class="home-header-left"></view>
        <view class="home-header-title">首页</view>
        <view class="home-header-right"></view>
      </view>
      <!-- 封面 -->
      <swiper
        class="home-carousel"
        :indicator-dots="false"
        previous-margin="0px"
        next-margin="0px"
        :circular="true"
        :autoplay="true"
        :interval="5000"
        :duration="500"
      >
        <swiper-item v-for="b in bannerList" :key="b.id">
          <view>
            <image class="home-carousel-img" :src="b.pic"></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 行情 -->
    <view class="home-quotations">
      <!-- 行情页头 -->
      <image class="home-image" src="@/static/image/hq@2x.png"></image>
      <!-- 行情标题 -->
      <view class="home-title">
        <view class="home-title-item">币种</view>
        <view class="home-title-item">最新价格</view>
        <view class="home-title-item">币涨币跌</view>
      </view>
      <!-- 行情列表 -->
      <view class="home-list">
        <block v-for="(q, index) in quotationList" :key="index">
          <view class="home-list-column">
            <!-- item1 -->
            <view class="home-list-item">
              <view class="home-list-item-title">
                <view class="home-list-item-title-left">{{
                  q.cur_abbreviation
                }}</view>
                <view class="home-list-item-title-right">{{
                  q.to_cur_abbreviation
                }}</view>
              </view>
              <view class="home-list-item-value">24H量 {{ q.hours }}</view>
            </view>
            <!-- item2 -->
            <view class="home-list-item">
              <view class="home-list-item-title2">{{ q.to_usdt }}</view>
              <view class="home-list-item-value2">￥{{ q.cny }}</view>
            </view>
            <!-- item3 -->
            <view class="home-list-item">
              <template v-if="q.market_color == 1">
                <view class="home-list-btn-green">+{{ q.market }}%</view>
              </template>
              <template v-if="q.market_color == 2">
                <view class="home-list-btn-red">-{{ q.market }}%</view>
              </template>
            </view>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
import Utils from "@/common/utils/index.js";
import { lunboList, hangqing } from "@/api/new.js";
export default {
  data() {
    return {
      //轮播图列表
      bannerList: [],
      //行情列表
      quotationList: [1, 2, 3, 4, 5],
    };
  },
  onLoad() {
    this.getLunboList();
    this.getHangqing();
  },
  methods: {
    //   首页lunbotu
    getLunboList() {
      lunboList({}, res => {
        if (res.status > 0) {
          console.log("lunbo", res.data);
          this.bannerList = res.data;
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
      });
    },
    //   首页行情
    getHangqing() {
      hangqing({}, res => {
        if (res.status > 0) {
          console.log("首页行情", res.data);
          this.quotationList = res.data;
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
      });
    },
    handleToast() {
      uni.showToast({
        title: "暂未开放",
        icon: "none",
      });
    },
    //跳转
    handleJump(val) {
      switch (Number(val)) {
        // 会员等级
        case 2:
          uni.navigateTo({
            url: "/pages/home/memberLevel/index",
          });
          break;
        // 贡献值
        case 3:
          uni.navigateTo({
            url: `/pages/home/homeCensus/index?type=1`,
          });
          break;
        // 活跃度
        case 4:
          uni.navigateTo({
            url: `/pages/home/homeCensus/index?type=2`,
          });
          break;
        // 游戏
        case 5:
          uni.navigateTo({
            url: `/pages/home/game/index`,
          });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  width: 100%;
  min-height: 100vh;
}
.home-top {
  @include flex(flex-start, center);
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  width: 100%;
  z-index: 9;
}
/*  #ifdef  APP-PLUS */
.home-block {
  width: 100%;
  height: var(--status-bar-height);
}
/*  #endif  */
/*  #ifdef  H5 */
.home-block {
  width: 100%;
  height: 25rpx;
}
/*  #endif  */
.home-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 350rpx;
  z-index: -1;
}
.home-header {
  @include flex(space-between, center);
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;

  font-size: 36rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.home-header-left {
  @include flex(flex-start, center);
  width: 200rpx;
}
.home-header-left-icon {
  margin-right: 10rpx;
  width: 20rpx;
  height: 25rpx;
}
.home-header-left-city {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.home-header-title {
  font-size: 36rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.home-header-right {
  visibility: hidden;
  width: 200rpx;
  height: 30rpx;
}
.home-carousel {
  width: 690rpx;
  height: 300rpx;
}
.home-carousel-img {
  width: 100%;
  height: 300rpx;
  border-radius: 8rpx;
}
.home-quotations {
  @include flex(flex-start, center);
  flex-direction: column;
  margin-top: 20rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
}
.home-image {
  width: 100%;
  height: 30rpx;
}
.home-title {
  @include flex(space-between, center);
  margin-top: 20rpx;
  width: 100%;
}
.home-title-item {
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #333333;
}
.home-title-item:nth-child(1) {
  width: 35%;
  text-align: left;
}
.home-title-item:nth-child(2) {
  width: 30%;
  text-align: center;
}
.home-title-item:nth-child(3) {
  width: 35%;
  text-align: right;
}
.home-list {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
}
.home-list-column {
  @include flex(space-between, center);
  padding: 30rpx 0;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2rpx solid #eee;
}
.home-list-column:last-child {
  border-bottom: none;
}
.home-list-item:nth-child(1) {
  @include flex(center, flex-start);
  flex-direction: column;
  width: 35%;
}
.home-list-item:nth-child(2) {
  @include flex(center, flex-start);
  flex-direction: column;
  width: 30%;
}
.home-list-item:nth-child(3) {
  @include flex(center, flex-end);
  flex-direction: column;
  width: 35%;
}
.home-list-item-title {
  @include flex(flex-start, center);
  width: 100%;
}
.home-list-item-title-left {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.home-list-item-title-right {
  margin-left: 10rpx;
  font-size: 24rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #999999;
}
.home-list-item-value {
  margin-top: 10rpx;
  font-size: 24rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #999999;
}
.home-list-item-title2 {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #333333;
}
.home-list-item-value2 {
  margin-top: 10rpx;
  font-size: 24rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #999999;
}
.home-list-btn-red {
  width: 120rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  background: rgba(253, 41, 41, 0.1);
  border-radius: 8rpx;
  border: 2rpx solid #fd2929;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #fd2323;
}
.home-list-btn-green {
  width: 120rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  background: rgba(7, 177, 90, 0.1);
  border-radius: 8rpx;
  border: 2rpx solid #03af57;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #03af57;
}
.mg-bt-45 {
  margin-bottom: 45rpx;
}
</style>
