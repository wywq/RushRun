<!-- 用户协议 -->
<template>
  <view class="census">
    <header-basic
      class="census-header"
      :icon="true"
      :title="title"
    ></header-basic>
    <!-- 统计 -->
    <view class="census-body">
      <image class="census-body-icon" :src="censusImage"></image>
      <view class="census-body-title">当前{{ title }}:</view>
      <view class="census-body-value">10+10.21</view>
    </view>
    <!-- 列表 -->
    <view class="census-list">
      <block v-for="d in dataList" :key="d.id">
        <view class="census-item">
          <view class="census-item-left">
            <view class="census-item-left-title">{{ d.title }}</view>
            <view class="census-item-left-time">{{ d.time }}</view>
          </view>
          <view class="census-item-right">{{ d.change }}</view>
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
      //type 1 贡献值 2 活跃度
      type: 0,
      //liebiao1
      dataList: [
        {
          id: 1,
          title: "俱乐部成员购买卷轴",
          time: "2019-01-22 12:01",
          change: "+0.02",
        },
        {
          id: 2,
          title: "俱乐部成员购买卷轴",
          time: "2019-01-22 12:01",
          change: "+0.02",
        },
        {
          id: 3,
          title: "俱乐部成员购买卷轴",
          time: "2019-01-22 12:01",
          change: "+0.02",
        },
        {
          id: 4,
          title: "俱乐部成员购买卷轴",
          time: "2019-01-22 12:01",
          change: "+0.02",
        },
      ],
    };
  },
  computed: {
    //标题
    title() {
      switch (Number(this.type)) {
        case 1:
          return "贡献值";
        case 2:
          return "活跃度";
      }
    },
    censusImage() {
      switch (Number(this.type)) {
        case 1:
          return require("@/static/image/sy_gx_gx_icon@2x.png");
        case 2:
          return require("@/static/image/sy_hyd_hyd_icon@2x.png");
      }
    },
  },
  onLoad(options) {
    if (options.type) {
      this.type = options.type;
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.census {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: calc(220rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}
.census-body {
  @include flex(center, center);
  position: fixed;
  top: calc(100rpx + var(--status-bar-height));
  z-index: 999;
  width: 100%;
  height: 124rpx;
  background: #fff;
}
/*  #endif  */
/*  #ifdef  H5 */
.census {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: 245rpx;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}
.census-body {
  @include flex(center, center);
  position: fixed;
  top: 125rpx;
  z-index: 999;
  width: 100%;
  height: 124rpx;
  background: #fff;
}
/*  #endif  */
.census-header {
  position: fixed;
  top: 0;
  z-index: 999;
}
.census-body-icon {
  margin-right: 6rpx;
  width: 36rpx;
  height: 36rpx;
}
.census-body-title {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.census-body-value {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #e6344a;
}
.census-list {
  @include flex(flex-start, center);
  flex-direction: column;
  margin-top: 20rpx;
  width: 100%;
  background: #fff;
}
.census-item {
  @include flex(space-between, center);
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2rpx solid #eee;
}
.census-item:last-child {
  border-bottom: none;
}
.census-item-left {
  @include flex(center, flex-start);
  flex-direction: column;
}
.census-item-left-title {
  margin-bottom: 15rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.census-item-left-time {
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
.census-item-right {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #e6344a;
}
</style>
