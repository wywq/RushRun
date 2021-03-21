<!-- 我的消息 -->
<template>
  <view class="news">
    <view class="news-top">
      <!-- 页面头 -->
      <header-basic
        class="news-header"
        :icon="true"
        title="我的消息"
      ></header-basic>
      <!-- 页面tab -->
      <tab-bar
        class="news-tab"
        :active.sync="activeTab"
        :tabList="tabList"
        @changeTab="changeTab"
      ></tab-bar>
    </view>
    <!-- 列表 -->
    <view class="news-list">
      <block v-for="(w, i) in withdrawList" :key="i">
        <view class="news-item">
          <view class="news-item-head">
            <template v-if="w.status == 0">
              <view class="news-item-head-status"></view>
            </template>
            <view class="news-item-head-title">{{ w.message }}</view>
            <view class="news-item-head-time">{{ w.addtime }}</view>
          </view>
          <view class="news-item-body">{{ w.data }}</view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import TabBar from "@/components/tabbar/index";
import { myNews } from "@/api/new.js";

export default {
  components: {
    HeaderBasic,
    TabBar,
  },
  data() {
    return {
      activeTab: 1,
      page: 1,
      tabList: [
        { id: 1, name: "系统消息" },
        { id: 2, name: "任务消息" },
        { id: 3, name: "转换消息" },
      ],
      // 收益列表
      withdrawList: [],
    };
  },

  onLoad() {
    uni.startPullDownRefresh();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.getMyNews(this.activeTab);
  },
  onReachBottom() {
    this.page++;
    this.getMyNews(this.activeTab);
  },
  methods: {
    handleJump() {
      uni.navigateTo({
        url: "/pages/mine/withdraw/index",
      });
    },
    //   我的消息
    getMyNews(category) {
      myNews(
        {
          category,
          page: this.page,
          page_num: 8,
        },
        res => {
          if (res.status > 0) {
            console.log(res.data);
            this.withdrawList = res.data;
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
    changeTab() {
      uni.startPullDownRefresh();
    },
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.news {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: calc(168rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}
/*  #endif  */
/*  #ifdef  H5 */
.news {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: 193rpx;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}
/*  #endif  */
.news-top {
  @include flex(flex-start, center);
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}
.news-list {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
}
.news-item {
  @include flex(flex-start, center);
  flex-direction: column;
  padding: 24rpx 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 186rpx;
  background: #fff;
  border-bottom: 1rpx solid #eee;
}
.news-item-head {
  @include flex(flex-start, center);
  margin-bottom: 26rpx;
  flex-shrink: 0;
  width: 100%;
}
.news-item-head-status {
  flex-shrink: 0;
  margin-right: 10rpx;
  width: 16rpx;
  height: 16rpx;
  border-radius: 50%;
  background: #ff3e56;
}
.news-item-head-title {
  flex-grow: 1;
  width: 20%;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.news-item-head-time {
  margin-left: 10rpx;
  flex-shrink: 0;
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
.news-item-body {
  width: 100%;
  flex-grow: 1;
  text-align: left;
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
</style>
