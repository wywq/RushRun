<template>
  <view>
    <headerBar :is_show="true">订单详情</headerBar>
    <view class="index">
      <!-- 商品信息 -->
      <view
        class="index-main-status"
        v-if="Inv == 1 || Inv == 3 || Inv == 4 || Inv == 5"
      >
        <view
          class="index-main-status-inv3 display_flex align_center flex_center color_white font_size_18"
          v-if="list.ord_consign == 1 && list.status == 1"
        >
          <image class="index-inv3-img" src="/static/img/wnc.png"></image>
          <view class="padding-left-10 font-weight">等待平台发货</view>
        </view>

        <view
          class="index-main-status-inv3 display_flex align_center flex_center color_white font_size_18"
          v-if="list.ord_consign == 1 && list.status == 2"
        >
          <image class="index-inv3-img" src="/static/img/cheche.png"></image>
          <view class="padding-left-10 font-weight">卖家已发货</view>
          <view class="padding-left-10 font-weight">{{ list.over_num }}</view>
        </view>

        <view
          class="index-main-status-inv3 display_flex align_center flex_center color_white font_size_18"
          v-if="list.ord_consign == 1 && list.status == 3"
        >
          <image class="index-inv3-img" src="/static/img/liwu.png"></image>
          <view class="padding-left-10 font-weight">订单已完成</view>
        </view>
      </view>

      <!-- 地址 -->
      <view
        class="index-adr padding-top"
        v-if="Inv == 1 || Inv == 3 || Inv == 4 || Inv == 5"
      >
        <view class="color_333 font_size_16 display_flex">
          <view>{{ list.name }}</view>
          <view class="padding-left">{{ list.phone }}</view>
        </view>
        <view class="font_size_12 color_888">{{ list.address }}</view>
      </view>
      <view class="box"></view>
      <!-- 显示 -->
      <view class="index-main">
        <view
          class="color_222 font_size_16 font-weight-500 padding-top padding-left"
          v-if="Inv == 1"
          >商品信息</view
        >
        <view class="main display_flex align_center">
          <image class="index-main-img" :src="list.pic"></image>
          <view class="index-main-text">
            <view class="font_size_16 color_333 index-wenzi padding-bottom">{{
              list.goods_name
            }}</view>
            <!-- <view class="font_size_14 color_888">A套装</view> -->
            <view class="display_flex flex_between align_center goods">
              <view class="font_size_16 color-E6344A"
                >{{ list.danjia }}
                <span class="color-E6344A font_size_12">元</span>
              </view>
              <view class="font_size_12 color_888">X&nbsp;{{ list.num }}</view>
            </view>
          </view>
        </view>
        <view
          class="display_flex flex_end align_center color-3D3D3D font_size_16 padding-right"
          v-if="Inv == 3 || Inv == 4 || Inv == 5"
        >
          实际支付:
          <span class="color-E6344A font_size_16">{{ list.all_price }}</span>
          <span class="color-E6344A font_size_12">元</span>
        </view>
      </view>
      <view class="box"></view>
      <view
        class="index-tip font_size_12 color_888 padding-left padding-top margin-top"
        >订单编号：{{ list.order_num }}</view
      >
      <view class="index-tip font_size_12 color_888 padding-left padding-top"
        >付款时间：{{ list.time }}
      </view>

      <template v-if="Inv == 4 || Inv == 5">
        <view class="box"></view>
        <view
          class="index-tip font_size_12 color_888 padding-left padding-top margin-top"
          >物流公司:{{ list.post }}</view
        >
        <view class="index-tip font_size_12 color_888 padding-left padding-top"
          >物流单号:{{ list.post_num }}</view
        >
      </template>

      <view
        class="index-footer display_flex align_center flex_between"
        v-if="list.ord_consign == 0 && list.status == 1"
      >
        <view
          class="index-footer-btn display_flex flex_center align_center font-weight color-E6344A font_size_title"
          @click="
            gopage(
              '/pages/index/directDelivery?ord_consign=1' +
                '&order_id=' +
                order_id,
              1
            )
          "
          >直接提货</view
        >
        <view
          class="index-footer-btn1 display_flex flex_center align_center font-weight color_white font_size_title"
          @click="
            gopage(
              '/pages/index/consignment?ord_consign=2' +
                '&order_id=' +
                order_id,
              2
            )
          "
          >转为寄售</view
        >
      </view>

      <view
        class="shouhuo-btn display_flex flex_center align_center font_size_title color_white font-weight"
        v-if="Inv == 4"
        @click="shouhuo()"
        >确认收货</view
      >

      <!-- 是否确认收货 -->
      <view class="index-tan text_center" v-if="is_cancellationOrder == true">
        <view class="index-tan-box">
          <view
            class="color-E6344A font_size_21 font-weight padding-top padding-bottom"
            >提示</view
          >
          <view
            class="margin-top padding-top padding-bottom color_929292 font_size_16"
            >是否确认收货？</view
          >
          <view
            class="index-tan-btn display_flex flex_center align_center color_white font_size_title margin-top"
            @click="overClick"
            >确定</view
          >
        </view>
        <image
          class="inex-close"
          src="/static/img/close.png"
          @click="is_cancellationOrder = false"
        ></image>
      </view>
    </view>
  </view>
</template>

<script>
import { myOrderInfo, affrimOrder } from "../../api/mineService.js";
import headerBar from "../../components/header_bar.vue";
export default {
  data() {
    return {
      Inv: "",
      is_cancellationOrder: false,
      order_id: "",
      list: "",
    };
  },
  components: {
    headerBar,
  },
  onLoad(e) {
    this.Inv = e.Inv;
    this.order_id = e.order_id;
    console.log(777, this.order_id);
    this.creates();
  },
  methods: {
    shouhuo() {
      this.is_cancellationOrder = true;
    },
    overClick() {
      let data = {
        order_id: this.order_id,
      };
      affrimOrder(data, res => {
        if (res.status == 1) {
          this.is_cancellationOrder = false;
          uni.showToast({
            title: res.info,
            icon: "none",
          });
          setTimeout(() => {
            uni.switchTab({
              url: "/pages/mine/index",
            });
          }, 500);
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
      });
    },
    creates() {
      let data = {
        order_id: this.order_id,
      };
      myOrderInfo(data, res => {
        if (res.status == 1) {
          this.list = res.data;
        }
      });
    },
    gopage(url, type) {
      uni.navigateTo({
        url: url,
      });
      uni.setStorageSync("order_id", this.order_id);
      uni.setStorageSync("ord_consign", type);
    },
  },
};
</script>

<style scoped>
.index {
  padding-top: calc(93upx + var(--status-bar-height));
  /* background: url('/static/loginimg/dl_bg_img@2x.png'); */
  background: #ffffff;
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  height: 100%;
}
.index-main {
  width: 100%;
  height: 364upx;
  background: #ffffff;
}
.main {
  width: 100%;
  height: 280upx;
  background: #ffffff;
  border-radius: 16upx;
  margin: 0 auto 0;
}
.index-main-img {
  width: 200upx;
  height: 202upx;
  margin: 0 0 0 30upx;
}
.index-main-text {
  width: 60%;
  height: 202upx;
  margin-left: 20upx;
}
.box {
  width: 100%;
  height: 18upx;
  background: #f5f5f5;
}
.index-footer {
  width: 90%;
  height: 94upx;
  position: fixed;
  bottom: 50upx;
  left: 5%;
}
.index-footer-btn {
  width: 304upx;
  height: 94upx;
  border: 2upx solid #42dbee;
  border-radius: 8upx;
}
.index-footer-btn1 {
  width: 304upx;
  height: 94upx;
  border-radius: 8upx;
  background: #42dbee;
}
.index-main-status {
  width: 100%;
  height: 164upx;
  background: url(/static/img/juse.png) no-repeat;
  background-size: 100% 100%;
}
.index-main-status-inv3 {
  width: 100%;
  height: 164upx;
}
.index-inv3-img {
  width: 46upx;
  height: 46upx;
}
.index-adr {
  width: 90%;
  height: 120upx;
  margin: 0 auto;
}
.shouhuo-btn {
  width: 100%;
  height: 94upx;
  background: #42dbee;
  position: fixed;
  left: 0;
  bottom: 0;
}
.index-tan {
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.index-tan-box {
  width: 70%;
  height: 444upx;
  background: #ffffff;
  border-radius: 30upx;
  margin: 360upx auto 34upx;
}
.inex-close {
  width: 72upx;
  height: 72upx;
}
.index-tan-btn {
  width: 298upx;
  height: 94upx;
  background: #42dbee;
  border-radius: 8upx;
  margin: 50upx auto 0;
}
.goods {
  margin-top: 70upx;
}
</style>
