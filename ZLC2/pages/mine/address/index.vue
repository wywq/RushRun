<template>
  <view>
    <header-basic :icon="true" title="选择收货地址"></header-basic>
    <view class="index">
      <!-- 暂无收货地址 -->
      <template v-if="list == ''">
        <view class="index-receiving-address-back position_relative">
          <image
            class="index-receiving-address"
            src="/static/img/zwsj.png"
          ></image>
        </view>
        <view class="font_size_21 color_888 text_center margin-top"
          >还没有数据哦~</view
        >
      </template>

      <!-- 有收货地址 -->
      <template v-else>
        <view class="index-content">
          <view
            class="index-main display_flex align_center"
            v-for="(item, index) in list"
            :key="index"
          >
            <image
              class="index-img margin-left"
              src="/static/img/Shape@2x.png"
              v-if="item.status == 1"
              @click="change(item)"
            ></image>
            <image
              class="index-img margin-left"
              src="/static/img/gwc.png"
              v-if="item.status == 2"
              @click="change(item)"
            ></image>
            <view class="index-indextext">
              <view class="display_flex align_center padding-left">
                <view
                  class="index-moren display_flex flex_center align_center font_size_10 color-E6344A"
                  v-if="item.state == 1"
                  >默认</view
                >
                <view
                  class="index-name font_size_14 color_222 padding-right-10"
                  >{{ item.member_name }}</view
                >
                <view class="font_size_14 color_222">{{
                  item.member_phone
                }}</view>
              </view>
              <view
                class="font_size_12 color_888 padding-left index-main-adress"
                >{{ item.detail }}{{ item.pro }}</view
              >
            </view>
            <image
              class="index-text-img margin-right-15"
              src="/static/img/Shape@2x (1).png"
              @click="editClick(item)"
            ></image>
            <image
              class="index-text-img"
              src="/static/img/laji.png"
              @click="delClick(item.address_id)"
            ></image>
          </view>
        </view>
      </template>

      <view
        class="index-btn font_size_title color_white display_flex flex_center align_center font-weight"
        @click="gopage"
        >新增收货地址</view
      >
    </view>
  </view>
</template>

<script>
import { addresslist, deladdress } from "@/api/new.js";
import HeaderBasic from "@/components/header/index";
export default {
  data() {
    return {
      type: 1, //2没有收货地址，1已有收货地址
      page: 1,
      list: [],
      order_id: "",
      is_fanhui: "",
    };
  },
  components: {
    HeaderBasic,
  },
  onLoad(e) {
    this.order_id = e.order_id;
    this.is_fanhui = e.is_fanhui;
    if (this.list == "") {
      uni.removeStorageSync("address_id");
    }
    this.page = 1;
    this.creates();
  },
  onShow() {
    if (this.list == "") {
      uni.removeStorageSync("address_id");
    }
    this.page = 1;
    this.creates();
  },
  methods: {
    // 编辑
    editClick(item) {
      var data = JSON.stringify(item);
      uni.navigateTo({
        url: "/pages/mine/addAddress/index?data=" + data + "&type=1",
      });
    },
    // 删除
    delClick(address_id) {
      let data = { address_id: address_id };
      deladdress(data, res => {
        if (res.status == 1) {
          this.creates();
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
      });
    },
    // 页面显示
    creates() {
      let data = {
        page: this.page,
        page_num: 10,
      };
      addresslist(data, res => {
        // if(res.data == ''){
        // 	console.log(res.data)
        // 	this.type = 2
        // }else{
        const list = res.data.map((item, index) => {
          item.status = 1;
          if (item.state == 1) {
            item.status = 2;
          }
          return item;
        });
        if (this.page == 1) {
          this.list = list;
        } else {
          this.list = this.list.concat(list);
        }
        // }
      });
    },

    gopage() {
      uni.navigateTo({
        url: "/pages/mine/addAddress/index?type=2",
      });
    },
    change(item) {
      if (this.is_fanhui == 1) {
      } else {
        if (item.status == 1) {
          item.status = 2;
          uni.setStorageSync("address_id", item.address_id);
          console.log(item.status);
          uni.navigateTo({
            url: "/pages/index/directDelivery?order_id=" + this.order_id,
          });
        } else {
          item.status = 1;
        }
      }
    },
  },
  onReachBottom() {
    this.page++;
    this.creates();
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
  padding-bottom: 200upx;
}
.index-receiving-address-back {
  width: 502upx;
  height: 372upx;
  margin: 152upx auto 0;
  background: url(/static/img/shouhuo.png) no-repeat;
  background-size: 100% 100%;
}
.index-receiving-address {
  width: 134upx;
  height: 138upx;
  position: absolute;
  top: calc((372upx - 100upx) / 2);
  left: calc((502upx - 100upx) / 2);
}
.index-btn {
  width: 588upx;
  height: 94upx;
  background: #0f6ccb;
  border-radius: 8upx;
  position: fixed;
  bottom: 78upx;
  left: calc((100% - 588upx) / 2);
}
.index-main {
  width: 90%;
  height: 152upx;
  background: #ffffff;
  margin: 26upx auto 0;
  border-radius: 8upx;
}
.index-img {
  width: 32upx;
  height: 32upx;
}
.index-text-img {
  width: 36upx;
  height: 36upx;
}
.index-indextext {
  width: 70%;
}
.index-main-adress {
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-top: 6upx;
}
.index-moren {
  width: 70upx;
  height: 32upx;
  border: 2upx solid #0f6ccb;
  border-radius: 8upx;
  margin-right: 10upx;
}
</style>
