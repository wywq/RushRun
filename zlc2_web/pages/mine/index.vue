<!-- 个人中心 -->
<template>
  <view class="mine">
    <!-- 卡片 -->
    <view class="mine-header">
      <!-- 占位 -->
      <view class="mine-header-block"></view>
      <image
        class="mine-header-bg"
        src="@/static/image/wd_ddty_bg@2x.png"
      ></image>
      <view class="mine-header-card">
        <image
          class="mine-header-card-bg"
          src="@/static/image/wd_grzl_bg@2x.png"
        ></image>
        <image
          class="mine-header-card-setting"
          src="@/static/image/wd_shezhi_icon@2x.png"
        ></image>
        <view class="mine-card-up" @tap="handleJump(1)">
          <image class="mine-card-avatar" :src="mineData.pic"></image>
          <view class="mine-card-message">
            <view class="mine-card-message-up">
              <view class="mine-card-message-name">{{ mineData.nick }}</view>
              <image class="mine-card-message-icon" :src="levelIcon"></image>
            </view>
            <view class="mine-card-message-down">ID：{{ mineData.phone }}</view>
          </view>
          <image
            class="mine-card-icon"
            src="@/static/image/wd_jin_icon@2x.png"
          ></image>
        </view>
        <view class="mine-card-down">
          <view class="mine-card-item">
            <view class="mine-card-item-value">{{ mineData.level }}</view>
            <view class="mine-card-item-title">会员等级</view>
          </view>
          <view class="mine-card-item-line"></view>
          <view class="mine-card-item">
            <view class="mine-card-item-value">{{ mineData.huoyue }}</view>
            <view class="mine-card-item-title">活跃度</view>
          </view>
          <view class="mine-card-item-line"></view>
          <view class="mine-card-item">
            <view class="mine-card-item-value">{{ mineData.gongxian }}</view>
            <view class="mine-card-item-title">贡献值</view>
          </view>
        </view>
      </view>
    </view>
    <!-- 主体 -->
    <view class="mine-body">
      <!-- 订单 -->
      <view class="mine-order">
        <view class="mine-order-up" @tap="handleJump(8)">
          <view class="mine-order-up-title">全部订单</view>
          <image
            class="mine-order-up-icon"
            src="@/static/image/order_all_icon@2x.png"
          ></image>
        </view>
        <view class="mine-order-down">
          <block v-for="o in orderList" :key="o.id">
            <view class="mine-order-down-item">
              <image class="mine-order-item-icon" :src="o.image"></image>
              <view class="mine-order-item-title">{{ o.title }}</view>
            </view>
          </block>
        </view>
      </view>
      <!-- 功能 -->
      <view class="mine-column">
        <!-- 办理VIP -->
        <!-- <view class="mine-column-item">
          <image
            class="mine-column-item-icon"
            src="@/static/image/wd_blhy_icon@2x.png"
          ></image>
          <view class="mine-column-item-title">办理VIP</view>
          <image
            class="mine-column-item-go"
            src="@/static/image/order_all_icon@2x.png"
          ></image>
        </view> -->
        <!-- 钱包地址 -->
        <view class="mine-column-item">
          <image
            class="mine-column-item-icon"
            src="@/static/image/wd_qbdz_icon@2x.png"
          ></image>
          <view class="mine-column-item-title">钱包地址</view>
          <view class="mine-column-item-value">{{
            mineData.jinbi_address
          }}</view>
          <image
            class="mine-column-item-clip"
            src="@/static/image/wd_fuzhi_icon@2x.png"
            @tap="handleClip"
          ></image>
        </view>
        <!-- 总钱包 -->
        <view class="mine-column-item" @tap="handleJump(2)">
          <image
            class="mine-column-item-icon"
            src="@/static/image/wd_zqb_icon@2x.png"
          ></image>
          <view class="mine-column-item-title">总钱包</view>
          <image
            class="mine-column-item-go"
            src="@/static/image/order_all_icon@2x.png"
          ></image>
        </view>
        <!-- 转换订单 -->
        <!-- <view class="mine-column-item">
          <image
            class="mine-column-item-icon"
            src="@/static/image/wd_zhdd_icon@2x.png"
          ></image>
          <view class="mine-column-item-title">转换订单</view>
          <image
            class="mine-column-item-go"
            src="@/static/image/order_all_icon@2x.png"
          ></image>
        </view> -->
        <!-- 我的团队 -->
        <view class="mine-column-item" @tap="handleJump(4)">
          <image
            class="mine-column-item-icon"
            src="@/static/image/wd_edtd_icon@2x.png"
          ></image>
          <view class="mine-column-item-title">我的团队</view>
          <image
            class="mine-column-item-go"
            src="@/static/image/order_all_icon@2x.png"
          ></image>
        </view>
        <!-- 我的任务 -->
        <!-- <view class="mine-column-item">
          <image
            class="mine-column-item-icon"
            src="@/static/image/wd_wdrw_icon@2x.png"
          ></image>
          <view class="mine-column-item-title">我的任务</view>
          <image
            class="mine-column-item-go"
            src="@/static/image/order_all_icon@2x.png"
          ></image>
        </view> -->
        <!-- 我的消息 -->
        <view class="mine-column-item" @tap="handleJump(5)">
          <image
            class="mine-column-item-icon"
            src="@/static/image/wd_wdxiaox_icon@2x.png"
          ></image>
          <view class="mine-column-item-title">我的消息</view>
          <image
            class="mine-column-item-go"
            src="@/static/image/order_all_icon@2x.png"
          ></image>
        </view>
        <!-- 问题反馈 -->
        <view class="mine-column-item" @tap="handleJump(6)">
          <image
            class="mine-column-item-icon"
            src="@/static/image/wd_wtfankui_icon@2x.png"
          ></image>
          <view class="mine-column-item-title">问题反馈</view>
          <image
            class="mine-column-item-go"
            src="@/static/image/order_all_icon@2x.png"
          ></image>
        </view>
        <!-- 常见问题 -->
        <view class="mine-column-item" @tap="handleJump(7)">
          <image
            class="mine-column-item-icon"
            src="@/static/image/wd_cjwenti_icon@2x.png"
          ></image>
          <view class="mine-column-item-title">常见问题</view>
          <image
            class="mine-column-item-go"
            src="@/static/image/order_all_icon@2x.png"
          ></image>
        </view>
        <!-- 联系客服 -->
        <view class="mine-column-item">
          <image
            class="mine-column-item-icon"
            src="@/static/image/wd_lxkefu_icon@2x.png"
          ></image>
          <view class="mine-column-item-title">联系客服</view>
          <view class="mine-column-item-red">{{ mineData.kefu }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { myselfInfo } from "@/api/new.js";
export default {
  components: {},
  data() {
    return {
      orderList: [
        {
          id: 1,
          title: "待付款",
          image: require("@/static/image/wd_dfukuan_icon@2x.png"),
        },
        {
          id: 2,
          title: "待发货",
          image: require("@/static/image/wd_dfahuo_icon@2x.png"),
        },
        {
          id: 3,
          title: "待收货",
          image: require("@/static/image/wd_dshohuo_icon@2x.png"),
        },
        {
          id: 4,
          title: "待评价",
          image: require("@/static/image/wd_dpingjia_icon@2x.png"),
        },
        {
          id: 5,
          title: "退款",
          image: require("@/static/image/wd_tuikuan_icon@2x.png"),
        },
      ],
      // 个人信息
      mineData: {},
      //我的等级
      level: "",
    };
  },
  computed: {
    levelIcon() {
      switch (this.level) {
        case "LV1":
          return require("@/static/image/vip1@2x.png");
        case "LV2":
          return require("@/static/image/vip2@2x.png");
        case "LV3":
          return require("@/static/image/vip3@2x.png");
        case "LV4":
          return require("@/static/image/vip4@2x.png");
        case "LV5":
          return require("@/static/image/vip5@2x.png");
      }
    },
  },
  onLoad() {
    uni.hideTabBar();
    console.log("load");
  },
  onShow() {
    console.log("show");
    this.getMyselfInfo();
  },
  methods: {
    //   用户资料
    getMyselfInfo() {
      myselfInfo({}, res => {
        if (res.status > 0) {
          console.log(res.data);
          this.mineData = res.data;
          this.level = res.data.level;
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
        uni.stopPullDownRefresh();
      });
    },

    //跳转
    handleJump(val) {
      console.log(val);
      switch (Number(val)) {
        //   用户信息
        case 1:
          uni.navigateTo({
            url: "/pages/mine/message/index",
          });
          break;
        //   总钱包
        case 2:
          uni.navigateTo({
            url: "/pages/mine/wallet/index",
          });
          break;
        //   我的团队
        case 4:
          uni.navigateTo({
            url: "/pages/mine/team/index",
          });
          break;
        //   我的消息
        case 5:
          uni.navigateTo({
            url: "/pages/mine/news/index",
          });
          break;
        case 6:
          uni.navigateTo({
            url: "/pages/mine/question/index",
          });
          break;
        case 7:
          uni.navigateTo({
            url: "/pages/mine/questionNormal/index",
          });
          break;
        //  全部订单
        case 8:
          uni.navigateTo({
            url: "/pages/mine/orderList/index?Inv=1",
          });
          break;
      }
    },
    handleClip() {
      console.log("111");
      uni.setClipboardData({
        data: this.mineData.jinbi_address,
        success: res => {
          uni.showToast({
            title: "复制成功!",
            icon: "none",
          });
        },
        fail: err => {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.mine {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}
/*  #ifdef  APP-PLUS */
.mine-header-block {
  width: 100%;
  height: var(--status-bar-height);
}
/*  #endif  */
/*  #ifdef  H5 */
.mine-header-block {
  width: 100%;
  height: 25rpx;
}
/*  #endif  */
.mine-header {
  position: relative;
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 350rpx;
  z-index: 9;
}
.mine-header-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -9;
}
.mine-header-card {
  @include flex(space-between, center);
  flex-direction: column;
  position: relative;
  margin-top: 50rpx;
  padding: 84rpx 0 20rpx 0;
  box-sizing: border-box;
  width: 100%;
  height: 390rpx;
}
.mine-header-card-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.mine-header-card-setting {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  width: 40rpx;
  height: 40rpx;
  z-index: 1;
}
.mine-card-up {
  @include flex(flex-start, center);
  padding: 0 25rpx 0 50rpx;
  box-sizing: border-box;
  width: 100%;
}
.mine-card-avatar {
  margin-right: 20rpx;
  flex-shrink: 0;
  width: 140rpx;
  height: 140rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(189, 180, 222, 0.5);
}
.mine-card-message {
  @include flex(center, flex-start);
  flex-direction: column;
  flex-grow: 1;
}
.mine-card-message-up {
  @include flex(flex-start, center);
  margin-bottom: 10rpx;
  width: 100%;
}
.mine-card-message-name {
  margin-right: 10rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.mine-card-message-icon {
  width: 28rpx;
  height: 36rpx;
}
.mine-card-message-down {
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.mine-card-icon {
  margin-left: 20rpx;
  flex-shrink: 0;
  width: 12rpx;
  height: 24rpx;
}
.mine-card-down {
  @include flex(flex-start, center);
  width: 100%;
}
.mine-card-item {
  @include flex(center, center);
  flex-direction: column;
  padding: 0 10rpx;
  box-sizing: border-box;
  width: calc(100% / 3);
  flex-shrink: 1;
}
.mine-card-item-line {
  width: 2rpx;
  height: 36rpx;
  background: #fff;
}
.mine-card-item-value {
  @extend %text_cut_line;
  margin-bottom: 15rpx;
  width: 100%;
  text-align: center;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.mine-card-item-title {
  @extend %text_cut_line;
  width: 100%;
  text-align: center;
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.mine-body {
  @include flex(flex-start, center);
  flex-direction: column;
  flex-grow: 1;
  margin-top: 140rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
}
.mine-order {
  width: 100%;
  border-radius: 14rpx;
  background: #ffffff;
}
.mine-order-up {
  @include flex(space-between, center);
  padding: 30rpx 20rpx;
  box-sizing: border-box;
  width: 100%;
  height: 90rpx;
  border-bottom: 2rpx solid #eee;
}
.mine-order-up-title {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.mine-order-up-icon {
  width: 12rpx;
  height: 24rpx;
}
.mine-order-down {
  @include flex(space-between, center);
  padding: 25rpx 20rpx;
  box-sizing: border-box;
  width: 100%;
  height: 125rpx;
}
.mine-order-down-item {
  @include flex(space-between, center);
  flex-direction: column;
  height: 100%;
}
.mine-order-item-icon {
  width: 35rpx;
  height: 35rpx;
}
.mine-order-item-title {
  font-size: 24rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.mine-column {
  @include flex(flex-start, center);
  flex-direction: column;
  margin: 30rpx 0;
  width: 100%;
  background: #ffffff;
  border-radius: 14rpx;
}
.mine-column-item {
  @include flex(flex-start, center);
  padding: 25rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100rpx;
  border-bottom: 2rpx solid #eee;
}
.mine-column-item:last-child {
  border-bottom: none;
}
.mine-column-item-icon {
  flex-shrink: 0;
  margin-right: 16rpx;
  width: 50rpx;
  height: 50rpx;
}
.mine-column-item-title {
  flex-grow: 1;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.mine-column-item-value {
  @extend %text_cut_line;
  margin-left: 16rpx;
  flex-shrink: 0;
  width: 340rpx;
  text-align: right;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.mine-column-item-go {
  margin-left: 16rpx;
  flex-shrink: 0;
  width: 12rpx;
  height: 24rpx;
}
.mine-column-item-clip {
  margin-left: 16rpx;
  flex-shrink: 0;
  width: 32rpx;
  height: 32rpx;
}
.mine-column-item-red {
  @extend %text_cut_line;
  margin-left: 16rpx;
  flex-shrink: 0;
  width: 350rpx;
  text-align: right;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #42dbee;
}
</style>
