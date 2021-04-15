<template>
  <view :class="[type == 1 ? 'index' : 'indexs']">
    <image class="index-bg" src="@/static/image/registerbg.png" />
    <view
      class="display_flex align_center position_relative flex_center index-padd"
    >
      <image
        class="headerleft"
        src="/static/img/fanhui.png"
        @click="headerClick"
      ></image>
      <view class="color_white font_size_title font-weight-500" v-if="type == 1"
        >确认订单</view
      >
      <view class="color_white font_size_title font-weight-500" v-if="type == 2"
        >寄售成功</view
      >
      <view class="color_white font_size_title font-weight-500" v-if="type == 3"
        >提货成功</view
      >
    </view>
    <view class="text_center">
      <image class="success-img" src="/static/img/dui.png"></image>
    </view>
    <view
      class="text_center font-weight-500 color_white font_size_21 margin-bottom"
      v-if="type == 1"
      >恭喜您已支付成功!</view
    >
    <view
      class="text_center font-weight-500 color_white font_size_21 margin-bottom"
      v-if="type == 2"
      >恭喜您已寄售成功!</view
    >
    <view
      class="text_center font-weight-500 color_white font_size_21 margin-bottom"
      v-if="type == 3"
      >恭喜您已提货成功!</view
    >
    <!-- 商品信息 -->
    <view class="index-main">
      <view class="display_flex align_center margin-top padding-top">
        <view class="index-main-box margin-right-15 margin-left"></view>
        <view class="font_size_14 color_222 font-weight-500">商品信息</view>
      </view>
      <view class="font_size_14 color_222 margin-left margin-top num"
        >订单编号：{{ list.order_num }}</view
      >
      <view class="font_size_14 color_222 margin-left margin-top-10 num"
        >商品信息：{{ list.goods_name }}</view
      >
      <view class="font_size_14 color_222 margin-left margin-top-10 num"
        >购买数量：1</view
      >
      <view class="font_size_14 color_222 margin-left margin-top-10 num"
        >支付时间：{{ list.pay_time }}</view
      >
    </view>
    <!-- 按钮 -->
    <view class="index-btn display_flex align_center" v-if="type == 1">
      <view
        class="index-btn-left display_flex flex_center align_center font_size_title color-E6344A font-weight"
        @tap="handleOrder"
        >查看订单</view
      >
      <view
        class="index-btn-right display_flex flex_center align_center font_size_title color_white font-weight"
        @tap="handleSee"
        >继续逛逛</view
      >
    </view>
    <!-- 寄售成功寄售信息 -->
    <view class="index-main1" v-if="type == 2">
      <view class="display_flex align_center margin-top padding-top">
        <view class="index-main-box margin-right-15 margin-left"></view>
        <view class="font_size_14 color_222 font-weight-500">寄售信息</view>
      </view>
      <view class="font_size_14 color_222 margin-left margin-top num"
        >拍卖参与等级：VIP{{ auclist.name }}</view
      >
      <view class="font_size_14 color_222 margin-left margin-top-10 num"
        >参与人数：{{ auclist.join_num }}人</view
      >
      <view class="font_size_14 color_222 margin-left margin-top-10 num"
        >本次封顶价：{{ auclist.fengding }} ATC</view
      >
      <view class="font_size_14 color_222 margin-left margin-top-10 num"
        >本次起拍价：{{ auclist.qipai }} ATC</view
      >
      <view class="font_size_14 color_222 margin-left margin-top-10 num"
        >每次拍价：{{ auclist.add_price }}</view
      >
      <view class="font_size_14 color_222 margin-left margin-top-10 num"
        >拍次奖励：{{ money }}（每次拍价*{{ auclist.price_reward }}%）</view
      >
      <view class="font_size_14 color_222 margin-left margin-top-10 num"
        >拍成奖励：本次成交价{{
          auclist.auction_reward
        }}%（奖励给本次成交人）</view
      >
      <view class="font_size_14 color_222 margin-left margin-top-10 num"
        >拍卖持续时间：{{ auclist.minute_long }}</view
      >
      <view class="font_size_14 color_222 margin-left margin-top-10 num"
        >拍卖开始时间：{{ auclist.time }}</view
      >
    </view>
    <!-- 提货成功 -->
    <view class="index-main1" v-if="type == 3">
      <view class="display_flex align_center margin-top padding-top">
        <view class="index-main-box margin-right-15 margin-left"></view>
        <view class="font_size_14 color_222 font-weight-500">提货信息</view>
      </view>
      <view class="font_size_14 color_222 margin-left margin-top num"
        >收货人：{{ list.memberName }}</view
      >
      <view class="font_size_14 color_222 margin-left margin-top-10 num"
        >手机：{{ list.phone }}</view
      >
      <view class="font_size_14 color_222 margin-left margin-top-10 num"
        >地址：{{ list.address }}</view
      >
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      type: 1, //1确认订单成功 2确认寄售成功 3提货成功
      list: "",
      goods_id: "",
      auclist: "",
      money: "",
      order_id: "",
    };
  },
  components: {},
  onLoad(e) {
    this.type = e.type;
    this.list = JSON.parse(e.item); //把json字符串转回对象
    this.auclist = this.list.auc;
    uni.getStorageSync("order_id");
    if (e.status == 1) {
      this.list.goods_name = e.goods_name;
    }
    this.money = (
      (Number(this.auclist.add_price) * Number(this.auclist.price_reward)) /
      100
    ).toFixed(2);
    console.log(456456, this.list);
  },
  methods: {
    headerClick() {
      if (this.type == 1) {
        console.log(123);
        uni.switchTab({
          url: "/pages/mine/index",
        });
      } else if (this.type == 2 || this.type == 3) {
        uni.switchTab({
          url: "/pages/mine/index",
        });
      }
    },
    gopage() {
      uni.setStorageSync("ord_consign", 2);
      // uni.setStorageSync('order_id',this.list.order_id)
      uni.navigateTo({
        url: "/pages/index/consignment?order_id=" + this.list.order_id,
      });
    },
    gopagetihuo() {
      uni.setStorageSync("ord_consign", 1);
      // uni.setStorageSync('order_id',this.list.order_id)
      console.log(111, this.list.order_id);
      uni.navigateTo({
        url: "/pages/index/directDelivery?order_id=" + this.list.order_id,
      });
    },
    handleOrder() {
      uni.navigateTo({
        url: "/pages/mine/orderList/index?Inv=1",
      });
    },
    handleSee() {
      uni.navigateTo({
        url: "/pages/mine/shop/index",
      });
    },
  },
};
</script>

<style scoped>
.index {
  position: relative;
  width: 100%;
  min-height: 100vh;
  z-index: 9;
}
.indexs {
  position: relative;
  width: 100%;
  min-height: 100vh;
  padding-bottom: 30upx;
  z-index: 9;
}
.index-bg {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
.index-padd {
  padding-top: 100upx;
}
.headerleft {
  width: 22upx;
  height: 39upx;
  position: absolute;
  left: 5%;
  top: 100upx;
}
.success-img {
  width: 256upx;
  height: 256upx;
  margin: 130upx auto 38upx;
}
.index-main {
  width: 90%;
  height: 374upx;
  border-radius: 16upx;
  background: #ffffff;
  margin: 72upx auto 0;
}
.index-main-box {
  width: 8upx;
  height: 30upx;
  background: #0f6ccb;
  border-radius: 16upx;
}
.num {
  margin-left: 55upx;
}
.index-btn {
  position: fixed;
  bottom: 64upx;
  left: 0;
  width: 100%;
  height: 94upx;
}
.index-btn-left {
  width: 40%;
  height: 94upx;
  background: #ffffff;
  border-radius: 16upx;
  margin: 0 5% 0 5%;
}
.index-btn-right {
  width: 40%;
  height: 93upx;
  background: #0f6ccb;
  border-radius: 16upx;
  margin: 0 0 0 5%;
}
.index-main1 {
  width: 90%;
  border-radius: 16upx;
  background: #ffffff;
  margin: 32upx auto 0;
  padding-bottom: 30upx;
}
</style>
