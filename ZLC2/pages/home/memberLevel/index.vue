<!-- 会员等级 -->
<template>
  <view class="level">
    <header-basic :icon="true" title="会员等级"></header-basic>
    <!-- 当前等级 -->
    <view class="level-now">
      <view class="level-card">
        <!-- 等级图片 -->
        <image class="level-card-bg" :src="levelImg"></image>
        <!-- 等级标签 -->
        <view class="level-card-sign">当前等级</view>
        <!-- 等级标题 -->
        <view class="level-card-title">当前会员等级:LV1</view>
        <!-- 等级统计 -->
        <view class="level-card-census">
          <view class="level-card-contribution">当前贡献值:500</view>
          <view class="level-card-commission">当前交易手续费:50%</view>
        </view>
        <!-- 等级进度 -->
        <view class="level-card-progress">
          <view class="level-card-progress-left">{{ min }}</view>
          <view class="level-card-progress-middle">
            <slider
              class="level-card-slider"
              :min="min"
              :max="max"
              :step="1"
              :value="current"
              :activeColor="activeColor"
              block-color="#fff"
              disabled
            />
          </view>
          <view class="level-card-progress-right">{{ max }}</view>
        </view>
      </view>
    </view>
    <!-- 等级列表 -->
    <view class="level-list">
      <block v-for="item in levelList" :key="item.id">
        <view class="level-item">
          <view class="level-item-left">
            <view class="level-item-up">
              <image class="level-item-up-bg" :src="item.img"></image>
              <view class="level-item-up-words">用户等级:{{ item.level }}</view>
            </view>
            <view class="level-item-down">{{ item.subscribe }}</view>
          </view>
          <view class="level-item-right">{{ item.commission }}</view>
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
      //会员等级
      level: 1,
      //贡献值最小值
      min: 500,
      //贡献值最大值
      max: 1500,
      //当前贡献值
      current: 1200,
      //等级列表
      levelList: [
        {
          id: 1,
          level: "LV0",
          subscribe: "注册未实名认证通过的用户",
          commission: "不能交易",
          img: require("@/static/image/sy_yhdj_lj_icon@2x.png"),
        },
        {
          id: 2,
          level: "LV1",
          subscribe: "注册并实名认证通过的用户",
          commission: "交易手续费50%",
          img: require("@/static/image/sy_yhdj_yj_icon@2x.png"),
        },
        {
          id: 3,
          level: "LV2",
          subscribe: "贡献值≥100点",
          commission: "交易手续费35%",
          img: require("@/static/image/sy_yhdj_erj_icon@2x.png"),
        },
        {
          id: 4,
          level: "LV3",
          subscribe: "贡献值≥200点",
          commission: "交易手续费30%",
          img: require("@/static/image/sy_yhdj_sanj_icon@2x.png"),
        },
        {
          id: 5,
          level: "LV4",
          subscribe: "贡献值≥2000点",
          commission: "交易手续费28%",
          img: require("@/static/image/sy_yhdj_sij_icon@2x.png"),
        },
        {
          id: 6,
          level: "LV0",
          subscribe: "贡献值≥5000点",
          commission: "交易手续费25%",
          img: require("@/static/image/sy_yhdj_wuj_icon@2x.png"),
        },
      ],
    };
  },
  computed: {
    //等级背景图片
    levelImg() {
      switch (Number(this.level)) {
        case 0:
          return require("@/static/image/sy_yhdj_lingj_bg@2x.png");
        case 1:
          return require("@/static/image/sy_yhdj_yij_bg@2x.png");
        case 2:
          return require("@/static/image/sy_yhdj_erj_bg@2x.png");
        case 3:
          return require("@/static/image/sy_yhdj_sanj_bg@2x.png");
        case 4:
          return require("@/static/image/sy_yhdj_sij_bg@2x.png");
        case 5:
          return require("@/static/image/sy_yhdj_wuj_bg@2x.png");
      }
    },
    //等级进度条颜色
    activeColor() {
      switch (Number(this.level)) {
        case 0:
          return "#2F43A3";
        case 1:
          return "#2F43A3";
        case 2:
          return "#2F43A3";
        case 3:
          return "#2F43A3";
        case 4:
          return "#2F43A3";
        case 5:
          return "#2F43A3";
      }
    },
  },
  onLoad(options) {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.level {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
  background: #fafafa;
}
.level-now {
  flex-shrink: 0;
  margin-bottom: 20rpx;
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 350rpx;
  background: #fff;
}
.level-card {
  @include flex(flex-end, center);
  flex-direction: column;
  position: relative;
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  z-index: 9;
}
.level-card-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.level-card-sign {
  position: absolute;
  top: 30rpx;
  left: 0;
  width: 134rpx;
  height: 50rpx;
  line-height: 50rpx;
  text-align: center;
  background: rgba(51, 54, 74, 0.46);
  border-radius: 0px 16rpx 16rpx 0px;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.level-card-title {
  margin-bottom: 40rpx;
  font-size: 36rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.level-card-census {
  @include flex(center, center);
  margin-bottom: 30rpx;
  width: 100%;
}
.level-card-contribution {
  @extend %text_cut_line;
  padding-right: 30rpx;
  box-sizing: border-box;
  width: 50%;
  text-align: right;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.level-card-commission {
  @extend %text_cut_line;
  padding-left: 30rpx;
  box-sizing: border-box;
  width: 50%;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  border-left: 2rpx solid #fff;
}
.level-card-progress {
  @include flex(center, center);
  margin-bottom: 20rpx;
  width: 100%;
}
.level-card-progress-left {
  flex-shrink: 0;
  margin-right: 10rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.level-card-progress-middle {
  flex-grow: 1;
}
.level-card-slider {
  margin: 0;
  width: 100%;
}
// 修改进度条粗细
.level-card-slider ::v-deep .uni-slider-handle-wrapper {
  height: 10rpx;
}
//隐藏拖拽
.level-card-slider ::v-deep .uni-slider-handle,
.level-card-slider ::v-deep .uni-slider-thumb {
  display: none;
}
.level-card-progress-right {
  flex-shrink: 0;
  margin-left: 10rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.level-list {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  background: #fff;
}
.level-item {
  @include flex(space-between, center);
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 20%;
  border-bottom: 2rpx solid #eee;
}
.level-item:last-child {
  border-bottom: none;
}
.level-item-left {
  @include flex(space-between, flex-start);
  flex-direction: column;
  height: 100%;
}
.level-item-up {
  position: relative;
  width: 274rpx;
  height: 70rpx;
  z-index: 9;
}
.level-item-up-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}
.level-item-up-words {
  position: absolute;
  right: 20rpx;
  bottom: 8rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  z-index: 9;
}
.level-item-down {
  font-size: 26rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #95939f;
}
.level-item-right {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
</style>
