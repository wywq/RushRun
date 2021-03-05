<!-- 公告列表 -->
<template>
  <view class="notice">
    <header-basic
      class="notice-header"
      :icon="true"
      title="公告列表"
    ></header-basic>
    <!-- 主体 -->
    <view class="notice-body">
      <block v-for="n in noticeList" :key="n.id">
        <view class="notice-body-item" @tap="handleDetails">
          <view class="notice-body-item-title">{{ n.title }}</view>
          <view class="notice-body-item-time">{{ n.time }}</view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      //公告列表
      noticeList: [
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
      ],
    };
  },
  onLoad(options) {},
  methods: {
    handleDetails() {
      uni.navigateTo({
        url: "/pages/basic/richtext/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.notice {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: calc(96rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #eee;
  overflow: hidden;
}
/*  #endif  */
/*  #ifdef  H5 */
.notice {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: 121rpx;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #eee;
  overflow: hidden;
}
/*  #endif  */
.notice-header {
  position: fixed;
  top: 0;
  z-index: 9999;
}
.notice-body {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  background: #eee;
}
.notice-body-item {
  @include flex(center, flex-start);
  flex-direction: column;
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100rpx;
  border: 2rpx solid #eee;
  background: #fff;
}
.notice-body-item:last-child {
  border: none;
}
.notice-body-item-title {
  @extend %text_cut_line;
  margin-bottom: 10rpx;
  width: 100%;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.notice-body-item-time {
  @extend %text_cut_line;
  width: 100%;
  text-align: left;
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
</style>
