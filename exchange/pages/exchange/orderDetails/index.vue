<!-- 转换中心 -->
<template>
  <view class="order">
    <header-basic
      class="order-header"
      :icon="true"
      title="转换中心"
    ></header-basic>
    <!-- 主体 -->
    <view class="order-body">
      <view class="order-column-group">
        <!-- 类型 -->
        <view class="order-column">
          <view class="order-column-title">类型</view>
          <view class="order-column-value">{{ response.type }}</view>
        </view>
        <!-- 交易金额 -->
        <view class="order-column">
          <view class="order-column-title">交易金额</view>
          <view class="order-column-value">{{ response.zongjia }}</view>
        </view>
        <!-- 单价 -->
        <view class="order-column">
          <view class="order-column-title">单价</view>
          <view class="order-column-value">{{ response.price }}</view>
        </view>
        <!-- 出售数量 -->
        <view class="order-column">
          <view class="order-column-title">出售数量</view>
          <view class="order-column-value">{{ response.num }}</view>
        </view>
        <!-- 订单号 -->
        <view class="order-column">
          <view class="order-column-title">订单号</view>
          <view class="order-column-value">{{ response.order_number }}</view>
        </view>
        <!-- 交易时间 -->
        <view class="order-column">
          <view class="order-column-title">交易时间</view>
          <view class="order-column-value">{{ response.matching_time }}</view>
        </view>
      </view>
      <view class="order-column-group">
        <!-- 交易卖家 -->
        <view class="order-column">
          <view class="order-column-title">交易卖家</view>
          <view class="order-column-wrap">
            <image class="order-column-avatar" :src="response.user_head_pic" />
          </view>
          <view class="order-column-name">{{ response.user_nickname }}</view>
        </view>
        <!-- 收款信息 -->
        <view class="order-column">
          <view class="order-column-title">收款信息</view>
          <view class="order-column-value">{{ response.user_real_name }}</view>
        </view>
        <!-- 银行卡 -->
        <view class="order-column">
          <view class="order-column-title">银行卡</view>
          <view class="order-column-value">{{ response.bank_card }}</view>
        </view>
        <!-- 微信账号 -->
        <view class="order-column">
          <view class="order-column-title">微信账号</view>
          <view class="order-column-value">{{ response.weixin }}</view>
        </view>
        <!-- 支付宝账号 -->
        <view class="order-column">
          <view class="order-column-title">支付宝账号</view>
          <view class="order-column-value">{{ response.zhifubao }}</view>
        </view>
      </view>
    </view>
    <!-- 按钮 -->
    <template v-if="response.matching_status == 1">
      <view class="order-btn-group">
        <view class="order-btn-half-grey">等待收款</view>
      </view>
    </template>
    <template v-if="response.matching_status == 2">
      <view class="order-btn-group">
        <view class="order-btn-half-white" @tap="handleJump(1)">上传凭证</view>
        <view class="order-btn-half-blue" @tap="handleCancel">取消订单</view>
      </view>
    </template>
    <template v-if="response.matching_status == 3">
      <view class="order-btn-group">
        <view class="order-btn-half-white" @tap="handleJump(2)">查看凭证</view>
        <view class="order-btn-half-blue" @tap="handleConfirm">确认收款</view>
      </view>
    </template>
    <template v-if="response.matching_status == 5">
      <view class="order-btn-group">
        <view class="order-btn-half-white" @tap="handleJump(2)">查看凭证</view>
        <!-- <view class="order-btn-half-blue" @tap="handleDelete">删除订单</view> -->
      </view>
    </template>
  </view>
</template>

<script>
import dayjs from "dayjs";
import HeaderBasic from "@/components/header/index";
import { matchingInfo, confirmReceipt, cancelOrder } from "@/api/new.js";

export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      response: {},
    };
  },
  filters: {
    timeFilter(val) {
      return dayjs(Number(val) * 1000).format("YYYY-MM-DD HH:mm");
    },
  },
  computed: {},
  onLoad(opt) {
    this.getMatchingInfo(opt.id);
  },
  methods: {
    //接口获取订单详情
    getMatchingInfo(id) {
      matchingInfo({ id }, res => {
        if (res.status > 0) {
          console.log(res.data);
          this.response = res.data;
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
      });
    },
    //接口确认订单
    getConfirmReceipt(id) {
      confirmReceipt({ id }, res => {
        if (res.status > 0) {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
          setTimeout(() => {
            uni.navigateBack({
              delta: 1,
            });
          }, 1000);
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
      });
    },
    //接口取消订单
    getCancelOrder(id) {
      cancelOrder({ id }, res => {
        if (res.status > 0) {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
          setTimeout(() => {
            uni.navigateBack({
              delta: 1,
            });
          }, 1000);
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
      });
    },
    handleJump(val) {
      switch (Number(val)) {
        case 1:
          uni.navigateTo({
            url: "/pages/exchange/upload/index?id=" + this.response.id,
          });
          break;
        case 2:
          uni.navigateTo({
            url: "/pages/exchange/see/index?id=" + this.response.id,
          });
          break;
      }
    },
    handleConfirm() {
      this.getConfirmReceipt(this.response.id);
    },
    handleCancel() {
      this.getCancelOrder(this.response.id);
    },
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.order {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: calc(96rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}
/*  #endif  */
/*  #ifdef  H5 */
.order {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: 121rpx;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}
/*  #endif  */
.order-header {
  position: fixed;
  top: 0;
  z-index: 9999;
}
.order-body {
  @include flex(flex-start, center);
  flex-direction: column;
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
}
.order-column-group {
  @include flex(flex-start, center);
  flex-direction: column;
  margin-top: 20rpx;
  width: 100%;
  background: #ffffff;
  border-radius: 14rpx;
}
.order-column {
  @include flex(space-between, center);
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 90rpx;
  border-bottom: 2rpx solid #eee;
}
.order-column:last-child {
  border-bottom: none;
}
.order-column-title {
  margin-right: 30rpx;
  flex-shrink: 0;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.order-column-value {
  @extend %text_cut_line;
  flex-grow: 1;
  text-align: right;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.order-btn-group {
  position: fixed;
  bottom: 30rpx;
  @include flex(center, center);
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
}
.order-column-wrap {
  @include flex(flex-end, center);
  margin: 0 20rpx;
  flex-grow: 1;
}
.order-column-avatar {
  width: 50rpx;
  height: 50rpx;
  border-radius: 50%;
}
.order-column-name {
  @extend %text_cut_line;
  flex-shrink: 0;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.order-btn-half-white {
  margin-right: 30rpx;
  flex-grow: 1;
  width: 40%;
  height: 88rpx;
  line-height: 88rpx;
  background: #ffffff;
  border-radius: 22rpx;
  border: 2rpx solid #0f6ccb;
  text-align: center;
  font-size: 32rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0f6ccb;
}
.order-btn-half-blue {
  flex-grow: 1;
  width: 40%;
  height: 88rpx;
  line-height: 88rpx;
  background: #0f6ccb;
  border-radius: 22rpx;
  border: 2rpx solid #0f6ccb;
  text-align: center;
  font-size: 32rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.order-btn-half-grey {
  flex-grow: 1;
  width: 40%;
  height: 88rpx;
  line-height: 88rpx;
  background: #0f6ccb;
  border-radius: 22rpx;
  border: 2rpx solid #0f6ccb;
  text-align: center;
  font-size: 32rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  opacity: 0.3;
}
</style>
