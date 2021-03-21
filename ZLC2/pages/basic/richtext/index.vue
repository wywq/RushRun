<!-- 富文本 -->
<template>
  <view class="rich">
    <header-basic
      class="rich-header"
      :icon="true"
      :title="title"
    ></header-basic>
    <!-- 主体 -->
    <template v-if="type == 1">
      <view class="rich-body">
        <view class="rich-body-top">
          <view class="rich-body-top-title">{{ dataDetails.title }}</view>
          <view class="rich-body-top-subtitle"
            >发布时间：{{ dataDetails.add_time }}</view
          >
        </view>
        <view class="rich-body-down" v-html="dataDetails.content"></view>
      </view>
    </template>
    <template v-if="type == 2">
      <view class="rich-body">
        <view class="rich-body-top">
          <view class="rich-body-top-title">{{ dataDetails.shipin_name }}</view>
          <view class="rich-body-top-subtitle"
            >发布时间：{{ dataDetails.start_time }}</view
          >
        </view>
        <view class="rich-body-down" v-html="dataDetails.shipin_code"></view>
      </view>
    </template>
  </view>
</template>

<script>
import { gonggaoInfo, shangDetail } from "@/api/new.js";
import HeaderBasic from "@/components/header/index";
export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      dataDetails: {},
      title: "详情",
      type: 0,
    };
  },
  onLoad(options) {
    // type 1 公告列表 2 多媒体详情
    if (options.type) {
      this.type = options.type;
      switch (Number(options.type)) {
        case 1:
          this.getGonggaoInfo(options.id);
          break;
        case 2:
          this.getShangDetail(options.id);
          break;
      }
    }
  },
  methods: {
    //公告详情
    getGonggaoInfo(id) {
      gonggaoInfo(
        {
          id,
        },
        res => {
          if (res.status > 0) {
            this.dataDetails = res.data;
          } else {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          }
        }
      );
    },
    //多媒体详情
    getShangDetail(shipin_id) {
      shangDetail(
        {
          shipin_id,
        },
        res => {
          if (res.status > 0) {
            console.log("多媒体详情", res.data);
            this.dataDetails = res.data;
          } else {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          }
        }
      );
    },
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
