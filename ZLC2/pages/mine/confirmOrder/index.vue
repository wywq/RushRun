<template>
  <view>
    <header-basic :icon="true" title="确认订单"></header-basic>
    <view class="index">
      <!-- 地址 -->
      <view class="index-ads" @tap="gopage">
        <!-- 已有地址 -->
        <view class="index-xinxi display_flex padding-top" v-if="addr_type">
          <view class="color_222 font_size_16">{{ allData.name }}</view>
          <view class="color_222 font_size_16 padding-left">
            {{ allData.phone }}
          </view>
        </view>
        <view
          class="index-adress color_888 font_size_12 padding-left"
          v-if="addr_type"
        >
          {{ allData.address }}
        </view>
        <!-- 未选择地址 -->
        <view
          class="index-type2 display_flex align_center margin-left"
          v-if="!addr_type"
        >
          <image
            class="index-header-img"
            src="/static/img/addadress.png"
          ></image>
          <view class="font_size_16 color_222 margin-left">请选择收货地址</view>
        </view>
        <image class="index-adr-img" src="/static/img/arrow_n@2x.png"></image>
      </view>
      <!-- 订单 -->
      <view class="index-main display_flex align_center">
        <image class="index-main-img" :src="goods_list.goods_pic"></image>
        <view class="index-main-text">
          <view class="font_size_16 color_333 index-wenxi">{{
            goods_list.goods_name
          }}</view>
          <view class="font_size_14 color_888">{{ goods_list.guige }}</view>
          <view class="display_flex flex_between align_center">
            <view class="font_size_16 color-E6344A"
              >{{ goods_list.goods_price }}
              <span class="color-E6344A font_size_12">元</span>
            </view>
            <view class="font_size_12 color_888">X&nbsp;1</view>
          </view>
        </view>
      </view>
      <view v-if="gm_type == 3" class="index-jp">
        <view class="color_888 font_size_12 padding-left padding-top"
          >最终拍卖人: {{ goods_list.member_name }}</view
        >
        <view class="color_888 font_size_12 padding-left padding-top"
          >本次成交价: {{ goods_list.this_price }}</view
        >
      </view>
      <!-- 合计 -->
      <view class="index-total text_right display_flex align_center flex_end">
        <view class="color_222 font_size_14 margin-right"
          >合计: <span class="color-E6344A font_size_18">{{ zongjia }}</span
          ><span class="color-E6344A font_size_12">元</span></view
        >
      </view>
      <!-- 支付方式 -->
      <!-- <view class="index-content">
        <view class="index-content-top">支付方式</view>
        <view class="index-content-down">
          <view class="index-content-left">
            <view
              class="index-content-view"
              v-if="type == 1"
              @click="changeClick"
            ></view>
            <image
              class="index-content-img"
              src="/static/img/gwc.png"
              v-if="type == 2"
              @click="changeClick"
            ></image>
            <view class="index-content-title">账户余额</view>
          </view>

          <view>{{ zhanghu }} 元</view>
        </view>
      </view> -->
      <!-- 确定按钮 -->
      <view class="display_flex align_center index-btns">
        <view class="display_flex align_center shifu" v-if="gm_type == 3">
          <view class="font_size_14 color_888 padding-left"
            >共一件, <span class="color_222">实付:</span></view
          >
          <view class="font_size_10 color-E6344A"
            ><span class="font_size_16 color-E6344A"
              >{{ goods_list.get_money }}元</span
            ></view
          >
        </view>
        <view
          class="color_white font_size_title display_flex flex_center align_center font-weight"
          :class="gm_type == 3 ? 'index-btn-confirms' : 'index-btn-confirm'"
          @click="confirmClick"
          >确认支付</view
        >
      </view>
    </view>

    <!-- 支付密码 -->
    <view class="paybox text_center" v-if="is_tanchu == true">
      <view class="paybox_back">
        <view
          class="index-redtitle color-E6344A font_size_21 font-weight-700 padding-top"
          >请输入支付密码</view
        >
        <view class="font_size_24 color_9B9B9B padding-top"
          >{{ zongjia }}元</view
        >
        <view class="code-input-main">
          <view class="code-input-main-item">{{ code[0] ? "*" : "" }}</view>
          <view class="code-input-main-item">{{ code[1] ? "*" : "" }}</view>
          <view class="code-input-main-item">{{ code[2] ? "*" : "" }}</view>
          <view class="code-input-main-item">{{ code[3] ? "*" : "" }}</view>
          <view class="code-input-main-item">{{ code[4] ? "*" : "" }}</view>
          <view class="code-input-main-item">{{ code[5] ? "*" : "" }}</view>
          <input
            class="code-input-input"
            v-model="code"
            maxlength="6"
            type="number"
            @input="yanzheng"
            style="width: 70%"
          />
        </view>
      </view>
      <image
        src="/static/img/close.png"
        class="paybox_comeback"
        @click="is_tanchu = false"
      ></image>
    </view>
  </view>
</template>

<script>
import { confirmAnorder, buyOrder } from "@/api/new.js";
import HeaderBasic from "@/components/header/index";
export default {
  data() {
    return {
      type: 1, //勾选切换 1未勾选 2已勾选
      goods_id: "",
      num: "",
      goods_list: [],
      zhanghu: "",
      zongjia: "",
      is_tanchu: false,
      code: "",
      gm_type: 1, //1是普通购买2砍价购买3拍卖购买
      order_id: "",
      //全部信息
      allData: {},
    };
  },
  computed: {
    addr_type() {
      if (this.allData.address && this.allData.address_id) {
        return true;
      }
    },
  },
  components: {
    HeaderBasic,
  },
  onLoad(e) {
    this.goods_id = uni.getStorageSync("goods_id");
    this.num = uni.getStorageSync("num");
    console.log(123, this.goods_id);
    this.auction_id = uni.getStorageSync("auction_id");
    this.gm_type = uni.getStorageSync("gm_type");
    if (this.gm_type == 2) {
      this.kanjia();
    } else if (this.gm_type == 3) {
      this.jingpai();
    } else {
      this.creates();
    }
  },
  onShow() {
    this.goods_id = uni.getStorageSync("goods_id");
    this.num = uni.getStorageSync("num");
    this.gm_type = uni.getStorageSync("gm_type");
    if (this.gm_type == 2) {
      this.kanjia();
    } else if (this.gm_type == 3) {
      this.jingpai();
    } else {
      this.creates();
    }
  },
  methods: {
    // 竞拍
    jingpai() {},
    // 砍价
    kanjia() {},
    creates() {
      let data = {
        goods_id: this.goods_id,
        num: this.num,
        action: 1,
      };
      confirmAnorder(data, res => {
        console.log("res", res.data);
        if (res.status == 1) {
          console.log(333, this.goods_list);
          this.allData = res.data;
          this.goods_list = res.data.shanghu[0].goods_info[0];
          this.zhanghu = res.data.zhanghu;
          this.zongjia = res.data.zongjia;
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
          setTimeout(() => {
            uni.navigateBack({
              delta: 1,
            });
          }, 2000);
        }
      });
    },
    // 勾选框
    changeClick() {
      if (Number(this.zhanghu) < Number(this.zongjia)) {
        this.type = 1;
        uni.showToast({
          title: "账户余额不足",
          icon: "none",
        });
      } else {
        if (this.type == 1) {
          this.type = 2;
        } else {
          this.type = 1;
        }
      }
    },
    // 输入密码
    async yanzheng() {
      if (this.code.length == 6) {
        this.is_tanchu = false;
        if (this.gm_type == 2) {
          console.log("kanjia");
        } else if (this.gm_type == 3) {
          console.log("jingpai");
        } else {
          let data = {
            zongjia: this.zongjia,
            num: this.num,
            goods_id: this.goods_id,
            address_id: this.allData.address_id,
            payPwd: this.code,
          };
          buyOrder(data, res => {
            if (res.status == 1) {
              uni.showToast({
                title: res.info,
                icon: "none",
              });
              uni.setStorageSync("order_id", res.data.order_id);
              var data = JSON.stringify(res.data);
              setTimeout(() => {
                uni.navigateTo({
                  url: "/pages/mine/payment/index?item=" + data + "&type=1",
                });
              }, 1000);
            } else {
              uni.showToast({
                title: res.info,
                icon: "none",
              });
            }
          });
        }
      }
    },
    gopage() {
      uni.navigateTo({
        url: "/pages/mine/address/index?order_id=" + this.order_id,
      });
    },
    // 确认收货
    confirmClick() {
      // if (this.type == 1) {
      //   uni.showToast({
      //     title: "请选择支付方式",
      //     icon: "none",
      //   });
      // }
      // else {
      this.is_tanchu = true;
      this.code = "";
      // }
    },
  },
};
</script>

<style scoped>
.index {
  padding-top: calc(93upx + 25rpx);
  /* background: url('/static/loginimg/dl_bg_img@2x.png'); */
  background: #f5f5f5;
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  height: 100%;
}
.index-main {
  width: 90%;
  height: 304upx;
  background: #ffffff;
  border-radius: 16upx;
  margin: 30upx auto 0;
  border-bottom: 2upx solid #eeeeee;
}
.index-jp {
  width: 90%;
  height: 100upx;
  margin: 0 auto;
  background: #ffffff;
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
.index-total {
  padding: 0 20rpx;
  box-sizing: border-box;
  width: 90%;
  height: 98upx;
  background: #ffffff;
  margin: 0 auto 32upx;
}
.index-content {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  padding: 30rpx;
  box-sizing: border-box;
  width: 90%;
  background: #ffffff;
  margin: 0 auto;
  border-radius: 16upx;
}
.index-content-top {
  margin-bottom: 30rpx;
}
.index-content-down {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.index-content-left {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.index-content-view {
  width: 32upx;
  height: 32upx;
  border-radius: 50upx;
  background: rgba(230, 52, 74, 0.3);
}
.index-content-img {
  width: 32upx;
  height: 32upx;
}
.index-content-title {
  margin-left: 20rpx;
}
.index-btn-confirm {
  width: 100%;
  height: 94upx;
  background: #0f6ccb;
}
.index-btn-confirms {
  width: 40%;
  height: 94upx;
  background: #0f6ccb;
}
.index-btns {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 94upx;
}
.shifu {
  width: 60%;
  height: 94upx;
  line-height: 94upx;
  background: #ffffff;
}
.index-wenxi {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.paybox {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}
.paybox_back {
  width: 590upx;
  height: 473upx;
  background: #ffffff;
  border-radius: 30upx;
  margin: 360upx auto 0;
}
.paybox_comeback {
  width: 72upx;
  height: 72upx;
  margin: 50upx auto 0;
}
.code-input-input {
  height: 104upx;
  position: absolute;
  width: 100%;
  outline: none;
  color: #222222;
  opacity: 0;
  margin-left: 0;
}
.code-input-main {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 85%;
  height: 104upx;
  background: #ffffff;
  margin: 30upx auto 0;
}
.code-input-main-item {
  width: 250upx;
  height: 104upx;
  line-height: 104upx;
  opacity: 0.8;
  margin: 0 5upx;
  text-align: center;
  padding-bottom: 0;
  font-size: 48upx;
  color: #222222;
  border: 2upx solid #d7d7d7;
}
</style>
<style lang="scss" scoped>
.index-ads {
  padding: 0 20rpx;
  box-sizing: border-box;
  width: 90%;
  height: 148upx;
  background: #ffffff;
  border-radius: 16upx;
  margin: 24upx auto;
  position: relative;
}
.index-type2 {
  height: 148upx;
}
.index-xinxi {
  width: 80%;
  padding-left: 5%;
}
.index-adress {
  width: 80%;
  padding-top: 14upx;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.index-adr-img {
  width: 14upx;
  height: 24upx;
  position: absolute;
  top: calc((148upx - 24upx) / 2);
  right: 5%;
}
.index-header-img {
  width: 40upx;
  height: 40upx;
}
</style>
