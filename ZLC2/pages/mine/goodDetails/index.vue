<template>
  <view class="indexback">
    <view class="index-back position_relative">
      <image
        class="index-fanhui-img"
        src="/static/img/fanhui.png"
        @click="headerClick"
      ></image>
      <!-- <image class="index-fanhui-fx" src="/static/img/cun.png" @click="is_fx = true"></image> -->
      <swiper
        class="swiper position_relative"
        :circular="true"
        :indicator-dots="true"
        :autoplay="true"
        indicator-active-color="#000000"
        indicator-color="#B3B3B3"
        @change="onChange"
      >
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <image :src="item.pic" mode="" class="index-image"></image>
        </swiper-item>
      </swiper>
      <view class="index-allnum display_flex flex_center align_center">
        <span class="color_white font_size_15">{{ current + 1 }}</span>
        <span class="font_size_13 color_DFDFDF">/{{ swiperList.length }}</span>
      </view>
    </view>
    <view class="index-main" v-if="gm_type == 1">
      <view
        class="index-main-title font_size_16 color_333 padding-top padding-left padding-right"
        >{{ list.name }}</view
      >
      <view
        class="index-main-text display_flex flex_between align_center padding-top"
      >
        <view class="index-main-left font_size_20 color-E6344A padding-left"
          >{{ list.price }}
          <span class="font_size_14 color-E6344A">元</span></view
        >
        <view class="index-main-num">库存：{{ list.kucun }}</view>
        <view class="index-main-right padding-right"
          >{{ list.sold_num }}人购买</view
        >
      </view>
    </view>

    <view class="index-main" v-if="gm_type == 2">
      <view class="index-main-left font_size_20 color-E6344A padding-left"
        ><span class="color_grey font_size_14">最低价至 </span
        >{{ list.min_money
        }}<span class="font_size_14 color-E6344A">ATC</span></view
      >
      <view class="index-main-text display_flex flex_between align_center">
        <view class="index-main-num padding-left color_grey"
          >当前{{ list.money }}ATC</view
        >
        <view class="index-main-right padding-right color_grey"
          >库存:{{ list.kucun }}</view
        >
      </view>
      <view
        class="index-main-title font_size_16 color_333 padding-left padding-right"
        >{{ list.name }}</view
      >
    </view>

    <view class="color_888 font_size_14 text_center padding-top padding-bottom"
      >宝贝详情</view
    >
    <!-- 详情 -->
    <rich-text :nodes="content" class="index-content"></rich-text>
    <!-- 按钮 -->
    <view
      class="index-btn display_flex flex_center align_center color_white font_size_title font-weight"
      @click="determine"
      >立即购买</view
    >
    <!-- 弹出规格-->
    <popup-layer ref="popupRef" :direction="'top'">
      <view class="index-goodsmain position_relative">
        <view class="dingwei">
          <image :src="list.pic" class="index-goodmain-img"></image>
          <view class="font_size_20 color-E6344A index-money-goods"
            >{{ list.price }}
            <span class="font_size_14 color-E6344A">ATC</span></view
          >
          <view class="color_888 font_size_14 index-kc-goods"
            >库存 {{ list.kucun }}</view
          >
          <!-- 购买数量 -->
          <view
            class="display_flex flex_between padding-left padding-right indx-top"
          >
            <view class="color_222 font_size_14">购买数量</view>
            <view class="display_flex">
              <view
                class="index-jian display_flex flex_center align_center"
                @click="reduceClick"
                >-</view
              >
              <view class="index-shu display_flex flex_center align_center">{{
                num
              }}</view>
              <view
                class="index-jia display_flex flex_center align_center"
                @click="plusClick"
                >+</view
              >
            </view>
          </view>
          <!-- 确定购买 -->
          <view
            class="index-goumai-btn color_white font_size_title font-weight display_flex flex_center align_center"
            @click="determine"
            >确定</view
          >
        </view>
      </view>
    </popup-layer>
    <!-- 分享弹出 -->
    <!-- <view class="index-fx-vack text_center" v-if="is_fx == true">
			<view class="index-fx-box">
				<view class="color-E6344A font_size_21 padding-top padding-bottom font-weight">分享</view>
				<view class="display_flex">
					<image class="index-pyq-img" src="/static/img/pyq.png"></image>
					<image class="index-pyq-img" src="/static/img/wx.png"></image>
				</view>
				<view class="display_flex">
					<view class="color_grey font_size_12 index-pya-text">分享到朋友圈</view>
					<view class="color_grey font_size_12 index-pya-text">分享到微信好友</view>
				</view>
			</view>
			<image class="index-fx-x margin-top" src="/static/img/close.png" @click="is_fx = false"></image>
		</view> -->
  </view>
</template>

<script>
import { getGoodsDetails } from "@/api/new.js";
import popupLayer from "@/components/popup/popup-layer/popup-layer.vue";
export default {
  data() {
    return {
      swiperList: [], //轮播图
      content: "", //商品详情富文本
      is_show: 0, //为1时弹出规格
      num: 1, //购买个数，最低为1
      is_fx: false, //分享弹出
      gm_type: 1, //1普通商品 2砍价商品
      goods_id: "",
      list: "",
      current: 0,
      act_id: "",
      is_buy: "",
    };
  },
  components: {
    popupLayer,
  },
  onLoad(e) {
    this.goods_id = e.goods_id;
    uni.setStorageSync("goods_id", this.goods_id);
    this.act_id = e.act_id;
    if (this.gm_type == 2) {
      console.log(12);
    } else {
      this.creates();
    }
  },
  methods: {
    onChange(index) {
      this.current = index.detail.current;
    },
    creates() {
      let data = {
        goods_id: this.goods_id,
      };
      getGoodsDetails(data, res => {
        if (res.status == 1) {
          this.swiperList = res.data.lunbo;
          this.list = res.data;
          this.content = res.data.content.replace(
            /\<img/gi,
            '<img style="max-width:100%;height:auto"'
          );
          this.is_buy = res.is_buy;
        }
      });
    },
    // 确定购买
    determine() {
      uni.setStorageSync("num", this.num);
      uni.setStorageSync("gm_type", this.gm_type);
      uni.setStorageSync("act_id", this.act_id);
      console.log(6666, this.num, this.gm_type);
      if (this.is_buy == 1) {
        if (this.list.kucun == 0) {
          uni.showToast({
            title: "该商品暂无库存",
            icon: "none",
          });
          return;
        }
        uni.navigateTo({
          url:
            "/pages/mine/confirmOrder/index?goods_id=" +
            this.list.goods_id +
            "&num=" +
            this.num +
            "&act_id=" +
            this.act_id,
        });
      } else {
        uni.showToast({
          title: "您VIP等级本月购买次数已达上限",
          icon: "none",
        });
      }
    },
    // 减购买个数
    reduceClick() {
      if (Number(this.num) > 1) {
        this.num = Number(this.num) - 1;
      } else {
        this.num = 1;
      }
    },
    // 加购买个数
    plusClick() {
      this.num = Number(this.num) + 1;
    },
    // 返回
    headerClick() {
      uni.navigateBack({
        delta: 1,
      });
    },
    // 立即购买
    gmClick() {
      this.$refs.popupRef.show();
    },
    // 分享
    fxClick() {},
  },
};
</script>
<style scoped>
.indexback {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 150upx;
}
.swiper {
  width: 100%;
  height: 748upx;
}
.index-fanhui-img {
  width: 24upx;
  height: 40upx;
  position: absolute;
  top: 60upx;
  left: 5%;
  z-index: 999;
}
.index-fanhui-fx {
  width: 39upx;
  height: 37upx;
  position: absolute;
  top: 60upx;
  right: 5%;
  z-index: 999;
}
.index-image {
  width: 100%;
  height: 748upx;
}
.index-allnum {
  width: 80upx;
  height: 46upx;
  border-radius: 22upx;
  background: #b3b3b3;
  position: absolute;
  right: 5%;
  bottom: 10upx;
}
.index-main {
  width: 100%;
  height: 230upx;
  background: #ffffff;
}
.index-main-title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.index-btn {
  width: 100%;
  height: 94upx;
  background: #0f6ccb;
  position: fixed;
  bottom: 0;
  left: 0;
}
.index-content {
  width: 100%;
}
.index-goodsmain {
  width: 100%;
  height: 656upx;
}
.index-goodmain-img {
  width: 284upx;
  height: 284upx;
  position: absolute;
  top: -60upx;
  left: 28upx;
  z-index: 9999;
}
.dingwei {
  position: absolute;
  width: 100%;
  height: 596upx;
  background: #ffffff;
  bottom: 0;
  border-radius: 32upx 32upx 0px 0px;
}
.index-money-goods {
  margin: 96upx 0 0 50%;
}
.index-kc-goods {
  margin: 10upx 0 0 50%;
}
.indx-top {
  margin: 110upx 0 82upx 0;
}
.index-jian {
  width: 48upx;
  height: 40upx;
  background: #eeeeee;
}
.index-shu {
  width: 64upx;
  height: 40upx;
  background: #eeeeee;
}
.index-jia {
  width: 50upx;
  height: 40upx;
  background: #eeeeee;
}
.index-goumai-btn {
  width: 80%;
  height: 94upx;
  background: #0f6ccb;
  border-radius: 8upx;
  position: absolute;
  bottom: 46upx;
  left: 10%;
}
.index-fx-vack {
  width: 100%;
  min-height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
}
.index-fx-box {
  width: 510upx;
  height: 444upx;
  background: #ffffff;
  border-radius: 30upx;
  margin: 360upx auto 0;
}
.index-fx-x {
  width: 72upx;
  height: 72upx;
}
.index-pyq-img {
  width: 148upx;
  height: 148upx;
  margin: 0 10% 0 10%;
}
.index-pya-text {
  margin: 22upx 8% 0 10%;
}
</style>
