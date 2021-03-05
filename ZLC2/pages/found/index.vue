<!-- 发现tab -->
<template>
  <view class="found">
    <header-basic class="found-header" title="发现"></header-basic>
    <tab-bar class="found-tab" :active.sync="activeTab"></tab-bar>
    <!-- 主体 -->
    <view class="found-body">
      <!-- 视频区 -->
      <template v-if="activeTab == 1">
        <block v-for="d in dataList" :key="d.id">
          <view class="found-item" @tap="handleJump(1, d.id)">
            <view class="found-item-left-one">
              <image
                class="found-left-cover"
                src="@/static/image/sy_yj_bg@2x.png"
              ></image>
              <image
                class="found-left-play"
                src="@/static/image/sxy_bf_icon@2x.png"
              ></image>
            </view>
            <view class="found-item-right-one">
              <view class="found-item-right-title-one">{{ d.title }}</view>
              <view class="found-item-right-subtitle-one"
                >发布时间：{{ d.time }}</view
              >
            </view>
          </view>
        </block>
      </template>
      <!-- 图文区 -->
      <template v-if="activeTab == 2">
        <block v-for="d in dataList" :key="d.id">
          <view class="found-item" @tap="handleJump(2, d.id)">
            <view class="found-item-left-one">
              <image
                class="found-left-cover"
                src="@/static/image/sy_yj_bg@2x.png"
              ></image>
            </view>
            <view class="found-item-right-one">
              <view class="found-item-right-title-one">{{ d.title }}</view>
              <view class="found-item-right-subtitle-one"
                >发布时间：{{ d.time }}</view
              >
            </view>
          </view>
        </block>
      </template>
      <!-- 音频区 -->
      <template v-if="activeTab == 3">
        <block v-for="d in dataList" :key="d.id">
          <view class="found-item" @tap="handleJump(3, d.id)">
            <image
              class="found-item-left-two"
              src="@/static/image/sxy_yup_bf_icon@2x.png"
            ></image>
            <view class="found-item-right-two">
              <view class="found-item-right-title-two">{{ d.title }}</view>
              <view class="found-item-right-subtitle-two"
                >发布时间：{{ d.time }}</view
              >
            </view>
          </view>
        </block>
      </template>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import TabBar from "@/components/tabbar/index";
export default {
  components: {
    HeaderBasic,
    TabBar,
  },
  data() {
    return {
      activeTab: 1,
      dataList: [
        { id: 1, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 2, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 3, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 4, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 5, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 6, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 7, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 8, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 9, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 10, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 11, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 12, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 13, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 14, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 15, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 16, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 17, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
        { id: 18, title: "趣任务，一个不一样的爱眼软件", time: "2019-04-04" },
      ],
    };
  },
  methods: {
    //跳转
    handleJump(type, id) {
      switch (Number(type)) {
        //   视频详情
        case 1:
          uni.navigateTo({
            url: "/pages/found/videoDetails/index",
          });
          break;
        //   图文详情
        case 2:
          uni.navigateTo({
            url: "/pages/basic/richtext/index",
          });
          break;
        //   音频详情
        case 3:
          uni.navigateTo({
            url: "/pages/found/audioDetails/index",
          });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.found {
  position: relative;
  padding-top: calc(168rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #fff;
}
/*  #endif  */
/*  #ifdef  H5 */
.found {
  position: relative;
  padding-top: 183rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #fff;
}
/*  #endif  */
.found-header {
  position: fixed;
  top: 0;
  z-index: 9999;
}
/*  #ifdef  APP-PLUS */
.found-tab {
  position: fixed;
  top: calc(96rpx + var(--status-bar-height));
  z-index: 9999;
}
/*  #endif  */
/*  #ifdef  H5 */
.found-tab {
  position: fixed;
  top: 121rpx;
  z-index: 9999;
}
/*  #endif  */
.found-body {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  background: #fff;
}
.found-item {
  @include flex(flex-start, center);
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2rpx solid #eee;
}
.found-item-left-one {
  position: relative;
  margin-right: 30rpx;
  flex-shrink: 0;
  width: 170rpx;
  height: 134rpx;
  border-radius: 16rpx;
  z-index: 0;
}
.found-left-cover {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
  z-index: 99;
}
.found-left-play {
  position: absolute;
  width: 50rpx;
  height: 50rpx;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.found-item-right-one {
  @include flex(flex-start, flex-start);
  flex-direction: column;
  flex-grow: 1;
  width: 50%;
  height: 134rpx;
}
.found-item-right-title-one {
  @extend %text_cut_line;
  margin-bottom: 10rpx;
  width: 100%;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.found-item-right-subtitle-one {
  @extend %text_cut_line;
  width: 100%;
  text-align: left;
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
.found-item-left-two {
  margin-right: 30rpx;
  flex-shrink: 0;
  width: 80rpx;
  height: 80rpx;
}
.found-item-right-two {
  @include flex(space-between, flex-start);
  flex-direction: column;
  flex-grow: 1;
  width: 50%;
  height: 80rpx;
}
.found-item-right-title-two {
  @extend %text_cut_line;
  width: 100%;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.found-item-right-subtitle-two {
  @extend %text_cut_line;
  width: 100%;
  text-align: left;
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
</style>
