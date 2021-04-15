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
          <view class="order-column-value">{{
            response.add_time | timeFilter
          }}</view>
        </view>
      </view>
      <view class="order-column-group">
        <!-- 交易卖家 -->
        <view class="order-column">
          <view class="order-column-title">交易卖家</view>
          <image class="order-column-avatar" :src="response.user_head_pic" />
          <view class="order-column-value">{{ response.user_real_name }}</view>
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
        <view class="order-btn-half-white">上传凭证</view>
        <view class="order-btn-half-blue">取消订单</view>
      </view>
    </template>
    <template v-if="response.matching_status == 2">
      <view class="order-btn-group">
        <view class="order-btn-half-white">上传凭证</view>
        <view class="order-btn-half-blue">取消订单</view>
      </view>
    </template>
    <!-- <view class="order-btn-group">
      <view class="order-btn-half-white">查看凭证</view>
      <view class="order-btn-half-blue">删除订单</view>
    </view> -->
  </view>
</template>

<script>
import dayjs from "dayjs";
import HeaderBasic from "@/components/header/index";
import { matchingInfo } from "@/api/new.js";

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
</style>
