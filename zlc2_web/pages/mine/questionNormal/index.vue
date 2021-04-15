<!-- 常见问题列表 -->
<template>
  <view class="quiz">
    <header-basic
      class="quiz-header"
      :icon="true"
      title="常见问题"
    ></header-basic>
    <!-- 主体 -->
    <view class="quiz-body">
      <block v-for="n in noticeList" :key="n.id">
        <view class="quiz-body-item" @tap="handleDetails(n.id)">
          {{ n.id }}.{{ n.title }}
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import { question } from "@/api/new.js";

export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      page: 1,
      //公告列表
      noticeList: [],
    };
  },
  onLoad() {
    uni.startPullDownRefresh();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.getQuestion();
  },
  onReachBottom() {
    this.page++;
    this.getQuestion();
  },
  methods: {
    handleDetails(id) {
      uni.navigateTo({
        url: "/pages/mine/questionNormalDetail/index?id=" + id,
      });
    },
    //   我的wenti
    getQuestion() {
      question(
        {
          page: this.page,
          page_num: 16,
        },
        res => {
          if (res.status > 0) {
            console.log(res.data);
            this.noticeList = res.data;
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
  width: 100%;
  background: #fafafa;
}
.quiz-body-item {
  @extend %text_cut_line;
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 84rpx;
  line-height: 84rpx;
  text-align: left;
  background: #fff;
  border-bottom: 2rpx solid #eee;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.quiz-body-item:last-child {
  border-bottom: none;
}
</style>
