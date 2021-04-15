<template>
  <view class="index">
    <view class="index-top">
      <header-basic :icon="true" title="我的订单"></header-basic>
      <view class="inv-h-w">
        <view
          class="inv-h position_relative"
          :class="['inv-h', Inv == item.type ? 'inv-h-se' : '']"
          @tap="tabClicik(item.type)"
          v-for="(item, index) in list"
          >{{ item.title }}

          <view :class="['inv-h', Inv == item.type ? 'index-gang' : '']"></view>
        </view>
      </view>
    </view>
    <!-- 暂无收货信息 -->
    <!-- <view class="text_center">
				<image class="back-img" src="/static/img/wddd_wdd_icon@2x.png"></image>
				<view class="font_size_14 color_888 margin-top padding-top">还没有订单呦～</view>
			</view> -->

    <!-- 全部 -->
    <view v-for="(item, index) in textlist" :key="index">
      <view
        :class="
          item.status == 3 && item.ord_consign == 1
            ? 'index-main1'
            : 'index-main'
        "
      >
        <view class="index-main-header display_flex align_center flex_between">
          <view class="color_222 font_size_14"
            >订单编号:{{ item.order_num }}</view
          >
          <view
            class="color-E6344A font_size_14"
            v-if="item.ord_consign == 0 && item.status == 1"
            >已付款</view
          >
          <view
            class="color-E6344A font_size_14"
            v-if="item.ord_consign == 1 && item.status == 1"
            >待发货</view
          >
          <view
            class="color-E6344A font_size_14"
            v-if="item.status == 2 && item.ord_consign == 1"
            >待收货</view
          >
          <view
            class="color-E6344A font_size_14"
            v-if="item.status == 3 && item.ord_consign == 1"
            >已完成</view
          >
        </view>
        <view
          class="index-content display_flex align_center"
          @click="
            gopage(
              '/pages/mine/orderDetails?Inv=' +
                Inv +
                '&order_id=' +
                item.order_id
            )
          "
        >
          <image class="index-content-img" :src="item.pic"></image>
          <view class="index-content-text">
            <view class="font_size_14 color_222 inex-main-tot">{{
              item.goods_name
            }}</view>
            <!-- <view class="font_size_12 color_888 margin yxuan">已选:1000g</view> -->
            <view class="display_flex align_center flex_between pricenum">
              <view class="font_size_14 color_333">￥{{ item.danjia }}</view>
              <view class="font_size_12 color_888">X{{ item.num }}</view>
            </view>
          </view>
        </view>
        <view
          class="display_flex flex_end align_center color_333 font_size_12 index-main-heji"
          >共{{ item.num }}件商品 合计:￥{{ item.price }}</view
        >
        <!-- 按钮 -->
        <view class="index-btn-text display_flex align_center flex_end">
          <!-- 全部，已付款 -->
          <!-- <view class="index-btn display_flex flex_center align_center color-E6344A font_size_14" @click="cancellationOrder(item.order_id)" v-if="item.ord_consign == 0 && item.status == 1">取消订单</view> -->
          <!-- <view
              class="index-btn1 display_flex flex_center align_center color_white font_size_14 margin-left-20"
              v-if="item.ord_consign == 0 && item.status == 1"
              @click="
                gopage(
                  '/pages/index/directDelivery?ord_consign=1' +
                    '&order_id=' +
                    item.order_id +
                    '&status=1',
                  item,
                  1
                )
              "
              >提货</view
            >
            <view
              class="index-btn1 display_flex flex_center align_center color_white font_size_14 margin-left-20"
              v-if="item.ord_consign == 0 && item.status == 1"
              @click="
                gopage(
                  '/pages/index/consignment?ord_consign=2' +
                    '&order_id=' +
                    item.order_id +
                    '&status=1',
                  item,
                  2
                )
              "
              >转寄售</view
            > -->
          <!-- 待发货 -->
          <view
            class="index-btn1 display_flex flex_center align_center color_white font_size_14 margin-left-20"
            v-if="item.ord_consign == 1 && item.status == 1"
            @click="
              gopage(
                '/pages/mine/orderDetails?Inv=' +
                  Inv +
                  '&order_id=' +
                  item.order_id
              )
            "
            >查看订单</view
          >
          <!-- 待收货 -->
          <view
            class="index-btn1 display_flex flex_center align_center color_white font_size_14 margin-left-20"
            v-if="item.status == 2 && item.ord_consign == 1"
            @click="
              gopage('/pages/mine/viewLogistics?order_id=' + item.order_id)
            "
            >查看物流</view
          >
          <view
            class="index-btn1 display_flex flex_center align_center color_white font_size_14 margin-left-20"
            v-if="item.status == 2 && item.ord_consign == 1"
            @click="
              gopage(
                '/pages/mine/orderDetails?Inv=' +
                  Inv +
                  '&order_id=' +
                  item.order_id
              )
            "
            >确认订单</view
          >
          <!-- 已完成没有按钮 -->
        </view>
      </view>
    </view>

    <!-- 取消订单弹窗 -->
    <view class="index-tan text_center" v-if="is_cancellationOrder == true">
      <view class="index-tan-box">
        <view
          class="color-E6344A font_size_21 font-weight padding-top padding-bottom"
          >提示</view
        >
        <view
          class="margin-top padding-top padding-bottom color_929292 font_size_16"
          >是否确认取消订单？</view
        >
        <view
          class="index-tan-btn display_flex flex_center align_center color_white font_size_title margin-top"
          @click="cancellationOrderClick"
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
</template>

<script>
import { myOrderList, offOrder } from "@/api/mineService.js";
import HeaderBasic from "@/components/header/index";
export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      Inv: 1,
      list: [
        { title: "全部", type: 1 },
        // { title: "已付款", type: 2 },
        { title: "待发货", type: 3 },
        { title: "待收货", type: 4 },
        { title: "已完成", type: 5 },
      ],
      is_cancellationOrder: false, //true显示弹窗 false关闭弹窗
      page: 1,
      textlist: [],
      order_id: "",
    };
  },

  onLoad(e) {
    this.Inv = Number(e.Inv);
    console.log(123, this.Inv);
    this.page = 1;
    this.textlist = "";
    this.creates();
  },

  methods: {
    creates() {
      let data = {
        page: this.page,
        page_num: 5,
        status: this.Inv,
      };
      myOrderList(data, res => {
        if (res.status == 1) {
          if (this.page == 1) {
            this.textlist = res.data.data;
            console.log(111, this.textlist);
          } else {
            this.textlist = this.textlist.concat(res.data.data);
          }
        }
      });
    },
    // 取消订单
    // cancellationOrder(order_id){
    // 	this.is_cancellationOrder = true
    // 	this.order_id = order_id
    // },
    // cancellationOrderClick(){
    // 	let data = {
    // 		order_id:this.order_id
    // 	}
    // 	offOrder(data,res=>{
    // 		if(res.status == 1){
    // 			this.is_cancellationOrder = false
    // 			uni.showToast({
    // 				title:res.info,
    // 				icon: 'none'
    // 			})
    // 			this.page = 1
    // 			this.creates()
    // 		}else{
    // 			uni.showToast({
    // 				title:res.info,
    // 				icon: 'none'
    // 			})
    // 		}
    // 	})
    // },
    // 切换
    tabClicik(type) {
      this.Inv = type;
      this.textlist = "";
      this.page = 1;
      this.creates();
    },
    // 跳页
    gopage(url) {
      uni.navigateTo({
        url: url,
      });
      // console.log(5555,item)
      // uni.setStorageSync('order_id',item.order_id)
      // uni.setStorageSync('ord_consign',type)
      // console.log(6666,item.type)
    },
  },
  onReachBottom() {
    this.page++;
    this.creates();
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.index {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: calc(186rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}
/*  #endif  */
/*  #ifdef  H5 */
.index {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: 211rpx;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}

/*  #endif  */
.pricenum {
  margin-top: 60upx;
}
.index-top {
  @include flex(flex-start, center);
  flex-direction: column;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
}
.inv-h-w {
  width: 100%;
  height: 90upx;
  display: flex;
  margin: 0 auto;
  align-items: center;
  background: #ffffff;
}

.inv-h {
  font-size: 32upx;
  flex: 1;
  text-align: center;
  color: #3d3d3d;
  height: 54upx;
  line-height: 54upx;
}

.inv-h-se {
  color: #42dbee;
}

.index-gang {
  color: #42dbee;
  position: absolute;
  bottom: -15upx;
  left: 35%;
  background: #42dbee;
  width: 30%;
  height: 6upx;
}
.back-img {
  width: 502upx;
  height: 372upx;
  margin-top: 144upx;
}
.index-main {
  width: 90%;
  height: 458upx;
  background: #ffffff;
  margin: 28upx auto 0;
  border-radius: 4upx;
}
.index-main1 {
  width: 90%;
  height: 350upx;
  background: #ffffff;
  margin: 28upx auto 0;
  border-radius: 4upx;
}
.index-main-header {
  width: 94%;
  height: 72upx;
  border-bottom: 2upx solid #eeeeee;
  margin: 0 auto;
}
.index-content {
  width: 100%;
  height: 194upx;
}
.index-content-img {
  width: 150upx;
  height: 150upx;
  margin: 0 20upx;
}
.inex-main-tot {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.index-main-heji {
  width: 94%;
  height: 82upx;
  border-bottom: 2upx solid #eeeeee;
  margin: 0 auto;
}
.index-btn-text {
  width: 90%;
  height: 100upx;
  margin: 0 auto;
}
.index-btn {
  width: 156upx;
  height: 60upx;
  background: #fad6db;
  border-radius: 32upx;
}
.index-btn1 {
  width: 156upx;
  height: 60upx;
  background: #42dbee;
  border-radius: 32upx;
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
</style>
