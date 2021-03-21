<!-- 发现tab -->
<template>
  <view class="found">
    <header-basic class="found-header" title="发现"></header-basic>
    <tab-bar
      class="found-tab"
      :active.sync="activeTab"
      :tabList="tabList"
      @changeTab="changeTab"
    ></tab-bar>
    <!-- 主体 -->
    <view class="found-body">
      <!-- 视频区 -->
      <template v-if="activeTab == 1">
        <block v-for="d in dataList" :key="d.shipin_id">
          <view class="found-item" @tap="handleJump(1, d.shipin_id)">
            <view class="found-item-left-one">
              <image class="found-left-cover" :src="d.shipin_pic"></image>
              <image
                class="found-left-play"
                src="@/static/image/sxy_bf_icon@2x.png"
              ></image>
            </view>
            <view class="found-item-right-one">
              <view class="found-item-right-title-one">{{
                d.shipin_name
              }}</view>
              <view class="found-item-right-subtitle-one"
                >发布时间：{{ d.start_time }}</view
              >
            </view>
          </view>
        </block>
      </template>
      <!-- 图文区 -->
      <template v-if="activeTab == 2">
        <block v-for="d in dataList" :key="d.shipin_id">
          <view class="found-item" @tap="handleJump(2, d.shipin_id)">
            <view class="found-item-left-one">
              <image class="found-left-cover" :src="d.shipin_pic"></image>
            </view>
            <view class="found-item-right-one">
              <view class="found-item-right-title-one">{{
                d.shipin_name
              }}</view>
              <view class="found-item-right-subtitle-one"
                >发布时间：{{ d.start_time }}</view
              >
            </view>
          </view>
        </block>
      </template>
      <!-- 音频区 -->
      <template v-if="activeTab == 3">
        <block v-for="d in dataList" :key="d.shipin_id">
          <view class="found-item" @tap="handleJump(3, d.shipin_id)">
            <image
              class="found-item-left-two"
              src="@/static/image/sxy_yup_bf_icon@2x.png"
            ></image>
            <view class="found-item-right-two">
              <view class="found-item-right-title-two">{{
                d.shipin_name
              }}</view>
              <view class="found-item-right-subtitle-two"
                >发布时间：{{ d.start_time }}</view
              >
            </view>
          </view>
        </block>
      </template>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import TabBar from "@/components/tabbar/index";
import { shangVideo, shangArt, shangRadio } from "@/api/new.js";
export default {
  components: {
    HeaderBasic,
    TabBar,
  },
  data() {
    return {
      activeTab: 1,
      tabList: [
        { id: 1, name: "视频区" },
        { id: 2, name: "图文区" },
        { id: 3, name: "音频区" },
      ],
      page: 1,
      dataList: [],
    };
  },
  onLoad() {
    uni.startPullDownRefresh();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.getList();
  },
  onReachBottom() {
    this.page++;
    this.getList();
  },
  methods: {
    //分类请求
    getList() {
      switch (Number(this.activeTab)) {
        case 1:
          this.getShangVideo();
          break;
        case 2:
          this.getShangArt();
          break;
        case 3:
          this.getShangRadio();
          break;
      }
    },
    //视频区
    getShangVideo() {
      shangVideo(
        {
          page: this.page,
          page_num: 7,
        },
        res => {
          if (res.status > 0) {
            console.log("视频区", res.data);
            this.dataList = res.data;
            if (this.page == 1) {
              this.dataList = res.data;
            } else {
              this.dataList = this.dataList.concat(res.data);
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
    //图文区
    getShangArt() {
      shangArt(
        {
          page: this.page,
          page_num: 7,
        },
        res => {
          if (res.status > 0) {
            console.log("图文区", res.data);
            if (this.page == 1) {
              this.dataList = res.data;
            } else {
              this.dataList = this.dataList.concat(res.data);
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
    //音频区
    getShangRadio() {
      shangRadio(
        {
          page: this.page,
          page_num: 7,
        },
        res => {
          if (res.status > 0) {
            console.log("音频区", res.data);
            if (this.page == 1) {
              this.dataList = res.data;
            } else {
              this.dataList = this.dataList.concat(res.data);
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
    changeTab() {
      uni.startPullDownRefresh();
    },
    //跳转
    handleJump(type, id) {
      switch (Number(type)) {
        //   视频详情
        case 1:
          uni.navigateTo({
            url: "/pages/found/videoDetails/index?id=" + id,
          });
          break;
        //   图文详情
        case 2:
          uni.navigateTo({
            url: "/pages/basic/richtext/index?type=2&id=" + id,
          });
          break;
        //   音频详情
        case 3:
          uni.navigateTo({
            url: "/pages/found/audioDetails/index?id=" + id,
          });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.found {
  position: relative;
  padding-top: calc(168rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #fff;
}
/*  #endif  */
/*  #ifdef  H5 */
.found {
  position: relative;
  padding-top: 183rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #fff;
}
/*  #endif  */
.found-header {
  position: fixed;
  top: 0;
  z-index: 9999;
}
/*  #ifdef  APP-PLUS */
.found-tab {
  position: fixed;
  top: calc(96rpx + var(--status-bar-height));
  z-index: 9999;
}
/*  #endif  */
/*  #ifdef  H5 */
.found-tab {
  position: fixed;
  top: 121rpx;
  z-index: 9999;
}
/*  #endif  */
.found-body {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  background: #fff;
}
.found-item {
  @include flex(flex-start, center);
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2rpx solid #eee;
}
.found-item-left-one {
  position: relative;
  margin-right: 30rpx;
  flex-shrink: 0;
  width: 170rpx;
  height: 134rpx;
  border-radius: 16rpx;
  z-index: 0;
}
.found-left-cover {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
  z-index: 99;
}
.found-left-play {
  position: absolute;
  width: 50rpx;
  height: 50rpx;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
.found-item-right-one {
  @include flex(flex-start, flex-start);
  flex-direction: column;
  flex-grow: 1;
  width: 50%;
  height: 134rpx;
}
.found-item-right-title-one {
  @extend %text_cut_line;
  margin-bottom: 10rpx;
  width: 100%;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.found-item-right-subtitle-one {
  @extend %text_cut_line;
  width: 100%;
  text-align: left;
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
.found-item-left-two {
  margin-right: 30rpx;
  flex-shrink: 0;
  width: 80rpx;
  height: 80rpx;
}
.found-item-right-two {
  @include flex(space-between, flex-start);
  flex-direction: column;
  flex-grow: 1;
  width: 50%;
  height: 80rpx;
}
.found-item-right-title-two {
  @extend %text_cut_line;
  width: 100%;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.found-item-right-subtitle-two {
  @extend %text_cut_line;
  width: 100%;
  text-align: left;
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
</style>
