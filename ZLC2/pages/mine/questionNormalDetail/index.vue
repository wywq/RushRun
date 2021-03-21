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
      <view class="quiz-body-title">{{ questionData.title }}</view>
      <view class="quiz-body-node" v-html="questionData.content"></view>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import { questions } from "@/api/new.js";

export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      questionData: {},
    };
  },
  onLoad(options) {
    if (options.id) {
      this.getQuestions(options.id);
    }
  },
  methods: {
    //   我的wenti
    getQuestions(id) {
      questions(
        {
          id,
        },
        res => {
          if (res.status > 0) {
            console.log(res.data);
            this.questionData = res.data;
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
  padding: 20rpx 36rpx;
  box-sizing: border-box;
  width: 100%;
  background: #fafafa;
}
.quiz-body-title {
  margin-bottom: 20rpx;
  width: 100%;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.quiz-body-node {
  width: 100%;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
  line-height: 44rpx;
}
</style>
