<!-- 问题反馈列表 -->
<template>
  <view class="quiz">
    <header-basic
      class="quiz-header"
      :icon="true"
      title="问题反馈"
      subtitle="发起反馈"
      @onRightButtonClick="onRightButtonClick"
    ></header-basic>
    <!-- 主体 -->
    <view class="quiz-body">
      <block v-for="n in noticeList" :key="n.feedback_id">
        <view class="quiz-body-item" @tap="handleDetails(n.feedback_id)">
          <view class="quiz-body-item-title">{{ n.name }}</view>
          <view class="quiz-body-item-time">{{ n.add_time }}</view>
          <template v-if="n.status == 1">
            <view class="quiz-body-item-status">未回复</view>
          </template>
          <template v-if="n.status == 2">
            <view class="quiz-body-item-status">已回复</view>
          </template>
          <image
            class="quiz-body-item-icon"
            src="@/static/image/order_all_icon@2x.png"
          ></image>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import { fankuilia } from "@/api/new.js";

export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      //公告列表
      noticeList: [],
    };
  },
  onLoad() {},
  onShow() {
    uni.startPullDownRefresh();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.getFankuilia();
  },
  onReachBottom() {
    this.page++;
    this.getFankuilia();
  },
  methods: {
    onRightButtonClick() {
      uni.navigateTo({
        url: "/pages/mine/addQuestion/index",
      });
    },
    handleDetails(id) {
      uni.navigateTo({
        url: "/pages/mine/questionDetail/index?id=" + id,
      });
    },
    //   我的wenti
    getFankuilia() {
      fankuilia(
        {
          page: this.page,
          page_num: 11,
        },
        res => {
          if (res.status > 0) {
            console.log(res.data);
            if (this.page == 1) {
              this.noticeList = res.data;
            } else {
              this.noticeList = this.noticeList.concat(res.data);
            }
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
/*  #ifdef  APP-PLUS */
.quiz {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: calc(96rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
  overflow: hidden;
}
/*  #endif  */
/*  #ifdef  H5 */
.quiz {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: 121rpx;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
  overflow: hidden;
}
/*  #endif  */
.quiz-header {
  position: fixed;
  top: 0;
  z-index: 9999;
}
.quiz-body {
  @include flex(flex-start, center);
  flex-direction: column;
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  background: #fafafa;
}
.quiz-body-item {
  @include flex(flex-start, center);
  margin-bottom: 30rpx;
  padding: 0 24rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100rpx;
  background: #fff;
  border-radius: 14rpx;
}
.quiz-body-item-title {
  flex-shrink: 0;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.quiz-body-item-time {
  margin-right: 40rpx;
  flex-grow: 1;
  text-align: right;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.quiz-body-item-status {
  margin-right: 10rpx;
  flex-shrink: 0;
  width: 124rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  border-radius: 30rpx;
  background: #0f6ccb;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.quiz-body-item-icon {
  width: 12rpx;
  height: 24rpx;
}
</style>
