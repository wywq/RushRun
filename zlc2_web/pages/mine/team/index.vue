<!-- 我的团队 -->
<template>
  <view class="team">
    <view class="team-top">
      <!-- 页面头 -->
      <header-basic
        class="team-header"
        :icon="true"
        title="我的团队"
        subtitle="团队招募"
        @onRightButtonClick="onRightButtonClick"
      ></header-basic>
      <!-- 统计 -->
      <view class="team-census">
        <!-- 团队总人数 -->
        <view class="team-census-item">
          <view class="team-census-item-value">{{
            teamData.zongrenshu ? teamData.zongrenshu : 0
          }}</view>
          <view class="team-census-item-title">团队总人数</view>
        </view>
        <!-- 团队总活跃度 -->
        <view class="team-census-item">
          <view class="team-census-item-value">{{
            teamData.zonghuoyue ? teamData.zonghuoyue : 0
          }}</view>
          <view class="team-census-item-title">团队总活跃度</view>
        </view>
        <!-- 大区活跃度 -->
        <view class="team-census-item">
          <view class="team-census-item-value">{{
            teamData.bighuoyue ? teamData.bighuoyue : 0
          }}</view>
          <view class="team-census-item-title">大区活跃度</view>
        </view>
        <!-- 小区活跃度 -->
        <view class="team-census-item">
          <view class="team-census-item-value">{{
            teamData.littlehuoyue ? teamData.littlehuoyue : 0
          }}</view>
          <view class="team-census-item-title">小区活跃度</view>
        </view>
      </view>
      <!-- 推荐 -->
      <view class="team-recommend">
        <view class="team-avatar">
          <image
            class="team-icon"
            :src="
              teamData.tuijianren_pic
                ? teamData.tuijianren_pic
                : '@/static/image/wd_grxx_dr_icon@2x.png'
            "
          />
          <view class="team-mark-red">推荐人</view>
        </view>
        <view class="team-recommend-title">我的推荐人：</view>
        <view class="team-recommend-value">{{
          teamData.tuijianren_nick ? teamData.tuijianren_nick : "--"
        }}</view>
      </view>
      <!-- tab -->
      <tab-bar
        class="team-tab"
        :active.sync="activeTab"
        :tabList="tabList"
        @changeTab="changeTab"
      ></tab-bar>
    </view>
    <!-- 列表 -->
    <view class="team-list">
      <block v-for="(i, index) in teamList" :key="index">
        <view class="team-item">
          <view class="team-avatar-small-margin">
            <image class="team-icon" :src="i.head_pic" />
            <template v-if="i.real_state == 3">
              <view class="team-mark-red">已实名</view>
            </template>
            <template v-else>
              <view class="team-mark-grey">未实名</view>
            </template>
          </view>
          <view class="team-right">
            <!-- 昵称 -->
            <view class="team-right-item">
              <view class="team-right-item-title">昵称</view>
              <view class="team-right-item-value">{{ i.nick }}</view>
            </view>
            <!-- 活跃度 -->
            <view class="team-right-item">
              <view class="team-right-item-title">活跃度</view>
              <view class="team-right-item-value">{{ i.huoyuedu }}</view>
            </view>
            <!-- 团队人数 -->
            <view class="team-right-item">
              <view class="team-right-item-title">团队人数</view>
              <view class="team-right-item-value">{{ i.team_num }}</view>
            </view>
            <!-- 团队活跃度 -->
            <view class="team-right-item">
              <view class="team-right-item-title">团队活跃度</view>
              <view class="team-right-item-value">{{ i.team_huoyue }}</view>
            </view>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import TabBar from "@/components/tabbar/index";
import { getMyTeamInfo, getMyTeamUserList } from "@/api/new.js";
export default {
  components: {
    HeaderBasic,
    TabBar,
  },
  data() {
    return {
      page: 1,
      activeTab: 3,
      tabList: [
        { id: 3, name: "全部队员" },
        { id: 1, name: "实名队员" },
        { id: 2, name: "未实名队员" },
      ],
      //我的团队信息
      teamData: {},
      teamList: [],
    };
  },
  onLoad(options) {
    uni.startPullDownRefresh();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.getMyTeamInfo();
    this.getMyTeamUserList();
  },
  onReachBottom() {
    this.page++;
    this.getMyTeamInfo();
    this.getMyTeamUserList();
  },
  methods: {
    //   我的团队shang
    getMyTeamInfo() {
      getMyTeamInfo({}, res => {
        if (res.status > 0) {
          console.log("我的团队shang", res.data);
          this.teamData = res.data;
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
        uni.stopPullDownRefresh();
      });
    },
    //   我的团队xia
    getMyTeamUserList() {
      let formData = {};
      if (this.activeTab != 3) {
        formData.is_renzhen = this.activeTab;
      }
      getMyTeamUserList(
        {
          ...formData,
          page: this.page,
        },
        res => {
          if (res.status > 0) {
            console.log("我的团队xia", res.data);
            if (this.page == 1) {
              this.teamList = res.data;
            } else {
              this.teamList = this.teamList.concat(res.data);
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
      this.getMyTeamUserList();
    },
    onRightButtonClick() {
      uni.navigateTo({
        url: "/pages/mine/teamCollect/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.team {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: calc(456rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}

/*  #endif  */
/*  #ifdef  H5 */
.team {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: 481rpx;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}
/*  #endif  */
.team-top {
  @include flex(flex-start, center);
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}
.team-header {
  width: 100%;
}
.team-census {
  @include flex(flex-start, center);
  width: 100%;
  height: 144rpx;
  background: #fafafa;
}
.team-recommend {
  @include flex(flex-start, center);
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 144rpx;
  background: #fff;
}
.team-tab {
  width: 100%;
}
.team-census-item {
  @include flex(center, center);
  flex-direction: column;
  width: 25%;
}
.team-census-item-value {
  margin-bottom: 14rpx;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: #42dbee;
  line-height: 44rpx;
}
.team-census-item-title {
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
  line-height: 34rpx;
}
.team-avatar {
  @include flex(flex-end, center);
  flex-direction: column;
  position: relative;
  margin-right: 30rpx;
  flex-shrink: 0;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  z-index: 99;
  border: 2rpx solid #42dbee;
}
.team-avatar-small-margin {
  @include flex(flex-end, center);
  flex-direction: column;
  position: relative;
  margin-right: 10rpx;
  flex-shrink: 0;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  z-index: 99;
}
.team-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.team-mark-red {
  margin-bottom: -10rpx;
  padding: 5rpx 10rpx;
  text-align: center;
  background: #42dbee;
  border-radius: 15rpx;
  font-size: 24rpx;
  transform: scale(0.8);
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.team-mark-grey {
  margin-bottom: -10rpx;
  padding: 5rpx 10rpx;
  text-align: center;
  background: #95939f;
  border-radius: 15rpx;
  font-size: 24rpx;
  transform: scale(0.8);
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 400;
  color: #222222;
}
.team-recommend-title {
  font-size: 28rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #95939f;
}
.team-recommend-value {
  font-size: 28rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #3d3d3d;
}
.team-list {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  width: 100%;
  z-index: 99;
}
.team-item {
  @include flex(flex-start, center);
  padding-left: 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 150rpx;
  background: #fff;
  border-bottom: 2rpx solid #eee;
}
.team-item:last-child {
  border-bottom: none;
}
.team-right {
  @include flex(space-around, center);
  flex-grow: 1;
  width: 50%;
}
.team-right-item {
  @include flex(center, center);
  flex-direction: column;
  width: 25%;
}
.team-right-item-title {
  margin-bottom: 10rpx;
  font-size: 24rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #95939f;
  line-height: 34rpx;
}
.team-right-item-value {
  @extend %text_cut_line;
  width: 100%;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #3d3d3d;
  line-height: 40rpx;
}
</style>
