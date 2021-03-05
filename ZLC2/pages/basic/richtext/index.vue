<!-- 富文本 -->
<template>
  <view class="rich">
    <header-basic
      class="rich-header"
      :icon="true"
      :title="title"
    ></header-basic>
    <!-- 主体 -->
    <view class="rich-body">
      <view class="rich-body-top">
        <view class="rich-body-top-title">趣任务,一个不一样的爱眼软件</view>
        <view class="rich-body-top-subtitle">发布时间：2019-04-04 12:01</view>
      </view>
      <view class="rich-body-down" v-html="nodes"></view>
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
      title: "详情",
      nodes:
        "，享有法人资格的各种公司纷纷设立，按章程从事自身的生产经营活动。 清 魏源 《筹海篇四》：“西洋互市广东 者十馀国，皆散商无公司，享有法人资格的各种公司纷纷设立，按章程从事自身的生产经营活动。 清 魏源 《筹海篇四》：“西洋互市广东 者十馀国，皆散商无公司，享有法人资格的各种公司纷纷设立，按章程从事自身的生产经营活动。 清 魏源 《筹海篇四》：“西洋互市广东 者十馀国，皆散商无公司，享有法人资格的各种公司纷纷设立，按章程从事自身的生产经营活动。 清 魏源 《筹海篇四》：“西洋互市广东 者十馀国，皆散商无公司，享有法人资格的各种公司纷纷设立，按章程从事自身的生产经营活动。 清 魏源 《筹海篇四》：“西洋互市广东 者十馀国，皆散商无公司，享有法人资格的各种公司纷纷设立，按章程从事自身的生产经营活动。 清 魏源 《筹海篇四》：“西洋互市广东 者十馀国，皆散商无公司，享有法人资格的各种公司纷纷设立，按章程从事自身的生产经营活动。 清 魏源 《筹海篇四》：“西洋互市广东 者十馀国，皆散商无公司，享有法人资格的各种公司纷纷设立，按章程从事自身的生产经营活动。 清 魏源 《筹海篇四》：“西洋互市广东 者十馀国，皆散商无公司，享有法人资格的各种公司纷纷设立，按章程从事自身的生产经营活动。 清 魏源 《筹海篇四》：“西洋互市广东 者十馀国，皆散商无公司，享有法人资格的各种公司纷纷设立，按章程从事自身的生产经营活动。 清 魏源 《筹海篇四》：“西洋互市广东 者十馀国，皆散商无公司，享有法人资格的各种公司纷纷设立，按章程从事自身的生产经营活动。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西。 清 魏源 《筹海篇四》：“西洋互市广东 者十馀国，皆散商无公司",
    };
  },
  onLoad(options) {},
  methods: {
    onHandleRight() {
      console.log("nb2");
    },
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.rich {
  position: relative;
  padding-top: calc(96rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #fff;
  overflow: hidden;
}
/*  #endif  */
/*  #ifdef  H5 */
.rich {
  position: relative;
  padding-top: 121rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #fff;
  overflow: hidden;
}
/*  #endif  */
.rich-header {
  position: fixed;
  top: 0;
  z-index: 9999;
}
.rich-body {
  @include flex(flex-start, center);
  flex-direction: column;
  padding-left: 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
.rich-body-top {
  @include flex(center, flex-start);
  flex-direction: column;
  flex-shrink: 0;
  padding: 30rpx 30rpx 30rpx 0;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2rpx solid #eeeeee;
}
.rich-body-top-title {
  @extend %text_cut_line;
  margin-bottom: 10rpx;
  width: 100%;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.rich-body-top-subtitle {
  @extend %text_cut_line;
  width: 100%;
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
.rich-body-down {
  flex-grow: 1;
  margin: 30rpx 0;
  padding-right: 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
</style>
