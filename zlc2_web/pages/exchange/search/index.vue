<!-- 转换中心 -->
<template>
  <view class="search">
    <header-basic
      class="search-header"
      :icon="true"
      title="搜索"
    ></header-basic>
    <!-- 主体 -->
    <view class="search-body">
      <!-- 搜索框 -->
      <view class="search-column">
        <view class="search-column-inside">
          <image
            class="search-column-icon"
            src="@/static/image/Group@2x.png"
          ></image>
          <input
            class="search-column-input"
            type="text"
            placeholder="请输入您要搜索的电话号"
          />
          <view class="search-column-right" @tap="handleScreen">
            <view class="search-column-text">筛选</view>
            <image
              class="search-column-img"
              src="@/static/image/shaixuan.png"
            ></image>
          </view>
        </view>
      </view>
      <!-- 列表标题 -->
      <view class="search-title">
        <view class="search-title-one">买家</view>
        <view class="search-title-two">金币</view>
        <view class="search-title-two">CNY</view>
        <view class="search-title-three">操作</view>
      </view>
      <!-- 列表 -->
      <view class="search-list">
        <block v-for="(i, index) in dataList" :key="index">
          <view class="search-list-item">
            <view class="search-item-one">
              <image
                class="search-item-one-icon"
                src="@/static/image/grxx_touxiang_img@2x.png"
              ></image>
              <view class="search-item-one-name">{{ i.name }}</view>
            </view>
            <view class="search-item-two">{{ i.coin }}</view>
            <view class="search-item-two">{{ i.CNY }}</view>
            <view class="search-item-three">
              <view class="search-item-btn">购买</view>
            </view>
          </view>
        </block>
      </view>
    </view>
    <select-drawer :visible.sync="visible"></select-drawer>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import SelectDrawer from "@/components/drawer/index";

export default {
  components: {
    HeaderBasic,
    SelectDrawer,
  },
  data() {
    return {
      visible: false,
      dataList: [
        {
          id: 1,
          name: "WERAFYWERAFYWERAFYWERAFYWERAFY",
          coin: "50000",
          CNY: "30000",
        },
        { id: 2, name: "WERAFY", coin: "50000", CNY: "30000" },
        { id: 3, name: "WERAFY", coin: "50000", CNY: "30000" },
        { id: 4, name: "WERAFY", coin: "50000", CNY: "30000" },
        { id: 5, name: "WERAFY", coin: "50000", CNY: "30000" },
      ],
    };
  },
  computed: {},
  onLoad(opt) {},
  methods: {
    handleScreen() {
      console.log(11111);
      this.visible = true;
    },
    onViewClick(options) {
      console.log(options);
    },
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.search {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: calc(96rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
}
/*  #endif  */
/*  #ifdef  H5 */
.search {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: 121rpx;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
}
/*  #endif  */
.search-header {
  position: fixed;
  top: 0;
  z-index: 9999;
}
.search-body {
  @include flex(flex-start, center);
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  background: #fafafa;
}
.search-column {
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 130rpx;
}
.search-column-inside {
  @include flex(flex-start, center);
  padding: 20rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #ffffff;
  border-radius: 16rpx;
}
.search-column-icon {
  flex-shrink: 0;
  margin-right: 16rpx;
  width: 32rpx;
  height: 32rpx;
}
.search-column-input {
  flex-grow: 1;
}
.search-column-right {
  @include flex(flex-end, center);
  margin-left: 16rpx;
  padding-left: 26rpx;
  box-sizing: border-box;
  border-left: 2rpx solid #eee;
}
.search-column-text {
  margin-right: 10rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #e6344a;
}
.search-column-img {
  width: 28rpx;
  height: 26rpx;
}
.search-title {
  @include flex(flex-start, center);
  padding: 0 20rpx;
  box-sizing: border-box;
  width: 100%;
  height: 72rpx;
  background: #fff;
  border-bottom: 2rpx solid #eee;
}
.search-title-one {
  flex-shrink: 0;
  width: 40%;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.search-title-two {
  flex-shrink: 0;
  width: 20%;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.search-title-three {
  flex-shrink: 0;
  width: 20%;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.search-list {
  @include flex(flex-start, center);
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  background: #fff;
}
.search-list-item {
  @include flex(flex-start, center);
  padding: 0 20rpx;
  box-sizing: border-box;
  width: 100%;
  height: 114rpx;
  background: #fff;
  border-bottom: 2rpx solid #eee;
}
.search-list-item:last-child {
  border-bottom: none;
}
.search-item-one {
  @include flex(flex-start, center);
  flex-shrink: 0;
  padding-right: 10rpx;
  box-sizing: border-box;
  width: 40%;
}
.search-item-one-icon {
  flex-shrink: 0;
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
}
.search-item-one-name {
  @extend %text_cut_line;
  flex-grow: 1;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.search-item-two {
  @extend %text_cut_line;
  flex-shrink: 0;
  padding-right: 10rpx;
  box-sizing: border-box;
  width: 20%;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.search-item-three {
  @include flex(center, center);
  flex-shrink: 0;
  width: 20%;
}
.search-item-btn {
  width: 110rpx;
  height: 60rpx;
  line-height: 60rpx;
  background: #e6344a;
  border-radius: 16rpx;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
</style>
