<!-- 我的钱包 -->
<template>
  <view class="wallet">
    <view class="wallet-top">
      <!-- 页面头 -->
      <header-basic
        class="wallet-header"
        :icon="true"
        title="我的钱包"
      ></header-basic>
      <!-- 展示 -->
      <view class="wallet-wrap">
        <view class="wallet-show">
          <image
            class="wallet-bg"
            src="@/static/image/wd_wdqb_rmb_bg@2x (3).png"
          ></image>
          <view class="wallet-show-up">
            <view class="wallet-show-up-one">金币(个)</view>
            <view class="wallet-show-up-three">{{ coin }}</view>
          </view>
          <view class="wallet-show-down" @tap="handleJump">划转</view>
        </view>
      </view>
      <!-- 标题 -->
      <view class="wallet-title">收益明细</view>
    </view>
    <!-- 列表 -->
    <view class="wallet-list">
      <block v-for="w in withdrawList" :key="w.finance_id">
        <view class="wallet-item">
          <view class="wallet-item-left">
            <view class="wallet-item-left-title">{{ w.content }}</view>
            <view class="wallet-item-left-time">{{ w.add_time }}</view>
          </view>
          <view class="wallet-item-right">
            <template v-if="w.money_type == 1">
              <view class="wallet-item-right-plus">+{{ w.money }}</view>
            </template>
            <template v-if="w.money_type == 2">
              <view class="wallet-item-right-dis">-{{ w.money }}</view>
            </template>
          </view>
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import TabBar from "@/components/tabbar/index";
import { rmb, jinbiinfo } from "@/api/new.js";

export default {
  components: {
    HeaderBasic,
    TabBar,
  },
  data() {
    return {
      page: 1,
      coin: 0,
      // 收益列表
      withdrawList: [],
    };
  },
  onShow() {
    uni.startPullDownRefresh();
  },
  onPullDownRefresh() {
    this.page = 1;
    this.getRmb();
    this.getJinbiinfo();
  },
  onReachBottom() {
    this.page++;
    this.getRmb();
    this.getJinbiinfo();
  },
  methods: {
    //   用户资料
    getRmb() {
      rmb({}, res => {
        if (res.status > 0) {
          this.coin = res.data.account_type_1;
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
        uni.stopPullDownRefresh();
      });
    },
    //   收益明细
    getJinbiinfo() {
      jinbiinfo(
        {
          page: this.page,
        },
        res => {
          if (res.status > 0) {
            console.log(res.data);
            if (this.page == 1) {
              this.withdrawList = res.data;
            } else {
              this.withdrawList = this.withdrawList.concat(res.data);
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
    handleJump() {
      uni.navigateTo({
        url: "/pages/mine/transfer/index?money=" + this.coin,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.wallet {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: calc(566rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fff;
}
/*  #endif  */
/*  #ifdef  H5 */
.wallet {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: 591rpx;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fff;
}
/*  #endif  */
.wallet-top {
  @include flex(flex-start, center);
  flex-direction: column;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
}
.wallet-header {
  width: 100%;
}
.wallet-tab {
  width: 100%;
}
.wallet-wrap {
  padding: 30rpx 30rpx 0;
  box-sizing: border-box;
  width: 100%;
  background: #fff;
}
.wallet-title {
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0f6ccb;
  background: #fafafa;
}
.wallet-show {
  @include flex(center, center);
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 360rpx;
  z-index: 99;
}
.wallet-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.wallet-show-up {
  @include flex(center, center);
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  height: 100rpx;
}
.wallet-show-up-one {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 40rpx;
}
.wallet-show-up-two {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 40rpx;
}
.wallet-show-up-four {
  margin-bottom: 20rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.wallet-show-up-three {
  font-size: 54rpx;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  line-height: 76rpx;
}
.wallet-show-down {
  width: 100%;
  flex-shrink: 0;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  font-size: 36rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.1);
}
.wallet-list {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
}
.wallet-item {
  @include flex(space-between, center);
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 130rpx;
  border-bottom: 2rpx solid #eee;
}
.wallet-item-left {
  @include flex(center, flex-start);
  flex-direction: column;
}
.wallet-item-left-title {
  margin-bottom: 10rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.wallet-item-left-time {
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
.wallet-item-right {
  @include flex(flex-end, center);
}
.wallet-item-right-plus {
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #f7a702;
}
.wallet-item-right-dis {
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #0f6ccb;
}
</style>
