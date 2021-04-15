<!-- 等级信息 -->
<template>
  <view class="level">
    <header-basic :icon="true" title="等级信息"></header-basic>
    <!-- 主体 -->
    <view class="level-body">
      <view class="level-column">
        <!-- <view class="level-item">
          <image
            class="level-item-avatar"
            src="@/static/image/wd_grxx_qz_icon@2x.png"
          ></image>
          <view class="level-item-name">圈主</view>
        </view> -->
        <view class="level-item">
          <template v-if="is_shangjia == 1">
            <image
              class="level-item-avatar"
              src="@/static/image/wd_grxx_sj_icon@2x.png"
            ></image>
          </template>
          <template v-else>
            <image
              class="level-item-avatar"
              src="@/static/image/wd_grxx_wdl_icon@2x.png"
            ></image>
          </template>
          <view class="level-item-name">商家</view>
        </view>
        <view class="level-item">
          <template v-if="star == 1">
            <image
              class="level-item-avatar"
              src="@/static/image/wd_grxx_dr_icon@2x.png"
            ></image>
          </template>
          <template v-else>
            <image
              class="level-item-avatar"
              src="@/static/image/wd_grxx_wdl_icon@2x.png"
            ></image>
          </template>
          <view class="level-item-name">达人</view>
        </view>
      </view>
      <view class="level-column">
        <view class="level-item">
          <template v-if="is_hehuoren == 1">
            <image
              class="level-item-avatar"
              src="@/static/image/wd_grxx_hhr_icon@2x.png"
            ></image>
          </template>
          <template v-else>
            <image
              class="level-item-avatar"
              src="@/static/image/wd_grxx_wdl_icon@2x.png"
            ></image>
          </template>
          <view class="level-item-name">合伙人</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import { levelXinxi } from "@/api/new.js";

export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      levelData: {},
    };
  },
  onLoad(options) {
    this.getLevelXinxi();
  },
  methods: {
    //   用户资料
    getLevelXinxi() {
      levelXinxi({}, res => {
        if (res.status > 0) {
          console.log(res.data);
          this.levelData = res.data;
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.level {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
  background: #fff;
}
.level-body {
  @include flex(flex-start, center);
  flex-direction: column;
  flex-grow: 1;
  padding: 110rpx 90rpx 0 90rpx;
  box-sizing: border-box;
  width: 100%;
}
.level-column {
  @include flex(space-between, center);
  margin-bottom: 80rpx;
  width: 100%;
}
.level-item {
  @include flex(flex-start, center);
  flex-direction: column;
}
.level-item-avatar {
  margin-bottom: 20rpx;
  width: 200rpx;
  height: 200rpx;
}
.level-item-name {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
</style>
