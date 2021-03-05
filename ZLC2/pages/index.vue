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
        <view class="home-header-left">
          <image
            class="home-header-left-icon"
            src="@/static/image/nav_hy_icon@2x.png"
          />
          <view class="home-header-left-city">沈阳市</view>
        </view>
        <view class="home-header-title">首页</view>
        <view class="home-header-right"></view>
      </view>
      <!-- 封面 -->
      <image class="home-cover" src="@/static/image/sy_img@2x.png" />
    </view>
    <!-- 首页公告 -->
    <view class="home-notice">
      <!-- 公告icon -->
      <image class="home-notice-icon" src="@/static/image/sy_lb_icon@2x.png" />
      <swiper
        class="home-notice-swiper"
        :indicator-dots="false"
        :vertical="true"
        :circular="true"
        :autoplay="true"
        :interval="4000"
        :duration="500"
      >
        <!-- <swiper-item
          class="home-notice-title"
          v-for="n in noticeList"
          :key="n.no_id"
        >
          {{ n.no_title }}
        </swiper-item> -->
        <swiper-item class="home-notice-title"
          >关于推广规范网络推广，宣传等公告的宣传等公告的宣传等公告的宣传等公告的宣传等公告的宣传等公告的宣传等公告的</swiper-item
        >
      </swiper>
      <view class="home-notice-more" @tap="handleJump(1)">更多</view>
    </view>
    <!-- 首页模块 -->
    <view class="home-module">
      <view class="home-module-item">
        <image
          class="home-module-item-icon"
          src="@/static/image/sy_jlb_icon@2x.png"
        />
        <view class="home-module-item-title">抢购</view>
      </view>
      <view class="home-module-item">
        <image
          class="home-module-item-icon"
          src="@/static/image/sy_zhzx_icon@2x.png"
        />
        <view class="home-module-item-title">转换中心</view>
      </view>
      <view class="home-module-item">
        <image
          class="home-module-item-icon"
          src="@/static/image/sy_sxy_icon@2x.png"
        />
        <view class="home-module-item-title">众创空间</view>
      </view>
      <view class="home-module-item">
        <image
          class="home-module-item-icon"
          src="@/static/image/sy_rwjz_icon@2x.png"
        />
        <view class="home-module-item-title">游戏</view>
      </view>
    </view>
    <!-- 首页跑步图 -->
    <view class="home-run">
      <!-- 封面 -->
      <image class="home-run-bg" src="@/static/image/sy_yj_bg@2x.png" />
      <view class="home-census">
        <view class="home-census-item mg-bt-45" @tap="handleJump(2)">
          <view class="home-item-up">
            <image
              class="home-item-up-icon"
              src="@/static/image/sy_hydj_icon@2x.png"
            />
            <view class="home-item-up-title">会员等级</view>
          </view>
          <view class="home-item-down">LV3</view>
        </view>
        <view class="home-census-item mg-bt-45" @tap="handleJump(3)">
          <view class="home-item-up">
            <image
              class="home-item-up-icon"
              src="@/static/image/sy_gxz_icon@2x.png"
            />
            <view class="home-item-up-title">贡献值</view>
          </view>
          <view class="home-item-down">1586</view>
        </view>
        <view class="home-census-item" @tap="handleJump(4)">
          <view class="home-item-up">
            <image
              class="home-item-up-icon"
              src="@/static/image/sy_hyd_icon@2x.png"
            />
            <view class="home-item-up-title">活跃度</view>
          </view>
          <view class="home-item-down">10+0.85</view>
        </view>
        <view class="home-census-item">
          <view class="home-item-up">
            <image
              class="home-item-up-icon"
              src="@/static/image/sy_zjb_icon@2x.png"
            />
            <view class="home-item-up-title">总金币</view>
          </view>
          <view class="home-item-down">100.5986231</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Utils from "@/common/utils/index.js";
export default {
  data() {
    return {};
  },
  onLoad(options) {},
  methods: {
    //跳转
    handleJump(val) {
      switch (Number(val)) {
        // 公告列表
        case 1:
          uni.navigateTo({
            url: "/pages/home/noticeList/index",
          });
          break;
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
  height: 100vh;
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
.home-cover {
  width: 690rpx;
  height: 300rpx;
}
.home-notice {
  @include flex(flex-start, center);
  flex-shrink: 0;
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2rpx solid #eee;
}
.home-notice-icon {
  margin-right: 20rpx;
  flex-shrink: 0;
  width: 32rpx;
  height: 32rpx;
}
.home-notice-swiper {
  flex-grow: 1;
  height: 40rpx;
}
.home-notice-title {
  @extend %text_cut_line;
  width: 100%;
  height: 40rpx;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
  line-height: 40rpx;
}
.home-notice-more {
  margin-left: 50rpx;
  padding-left: 30rpx;
  box-sizing: border-box;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #e6344a;
  border-left: 2rpx solid #eee;
}
.home-module {
  @include flex(space-between, center);
  flex-shrink: 0;
  padding: 30rpx 60rpx;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 20rpx solid #fafafa;
}
.home-module-item {
  @include flex(center, center);
  flex-direction: column;
}
.home-module-item-icon {
  margin-bottom: 16rpx;
  width: 80rpx;
  height: 80rpx;
}
.home-module-item-title {
  font-size: 30rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.home-run {
  @include flex(flex-end, center);
  flex-direction: column;
  position: relative;
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
  z-index: 9;
}
.home-run-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.home-census {
  @include flex(flex-start, center);
  flex-wrap: wrap;
  padding: 30rpx 60rpx;
  box-sizing: border-box;
  width: 100%;
  background: #ffffff;
  border-radius: 16rpx;
}
.home-census-item {
  @include flex(center, flex-start);
  flex-direction: column;
  width: 50%;
}
.home-item-up {
  @include flex(flex-start, center);
  margin-bottom: 20rpx;
}
.home-item-up-icon {
  margin-right: 10rpx;
  width: 45rpx;
  height: 45rpx;
}
.home-item-up-title {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.home-item-down {
  @extend %text_cut_line;
  width: 100%;
  font-size: 36rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #3d3d3d;
}
.mg-bt-45 {
  margin-bottom: 45rpx;
}
</style>
