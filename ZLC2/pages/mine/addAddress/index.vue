<template>
  <view>
    <header-basic :icon="true" :title="title"></header-basic>
    <view class="index">
      <view class="index-main">
        <view class="index-user display_flex align_center">
          <view class="index-shouhuo position_relative font_size_14 color_222"
            >收货人
            <view class="color-E6344A index-star">*</view>
          </view>
          <view class="index-shouhuo-inp margin-left-20">
            <input
              type="text"
              maxlength="6"
              class="index-shouhuo-input color_888 font_size_14"
              placeholder="请输入收货人姓名"
              v-model="name"
            />
          </view>
        </view>
        <view class="index-user display_flex align_center">
          <view class="index-shouhuo position_relative font_size_14 color_222"
            >手机号
            <view class="color-E6344A index-star">*</view>
          </view>
          <view class="index-shouhuo-inp margin-left-20">
            <input
              type="text"
              class="index-shouhuo-input color_888 font_size_14"
              placeholder="请输入收货人联系电话"
              v-model="phone"
            />
          </view>
        </view>
        <view class="index-user display_flex align_center" @click="btnClick">
          <view class="index-shouhuo position_relative font_size_14 color_222"
            >所在地
            <view class="color-E6344A index-star">*</view>
          </view>
          <view class="index-shouhuo-inp1 margin-left-20 color_888">
            <view v-if="address == ''" class="color_888">请选择省市区</view>
            <span v-for="(item, index) in address" :key="index">{{
              item
            }}</span>
          </view>
          <image class="jianjiao" src="/static/img/arrow_n@2x.png"></image>
        </view>
        <view class="index-adress display_flex">
          <view class="index-shouhuo position_relative font_size_14 color_222"
            >详细地址
            <view class="color-E6344A index-star">*</view>
          </view>
          <textarea
            class="index-textarea font_size_14"
            placeholder="如道路、门牌号、小区、楼栋、单元等"
            v-model="text"
          ></textarea>
        </view>
        <view
          class="input_item display_flex justify_between align_center font_size_28 color_333"
        >
          <view class="input_item_title">设为默认地址</view>
          <view
            class="input_item_img display_flex justify_center align_center"
            @click="change"
          >
            <image src="/static/img/gwc.png" mode="" v-if="is_xz == 1"></image>
            <image
              src="/static/img/Shape@2x.png"
              mode=""
              v-if="is_xz == 0"
            ></image>
          </view>
        </view>
      </view>
      <view
        class="index-baocun display_flex flex_center align_center font_size_title color_white font-weight"
        @click="baocunClick"
        >保存</view
      >
      <!-- 地址三级联动 -->
      <selectAddress
        ref="selectAddress"
        @selectAddress="successSelectAddress"
      ></selectAddress>
    </view>
  </view>
</template>

<script>
import { doeditaddress, addaddress } from "@/api/new.js";
import selectAddress from "@/components/popup/yixuan-selectAddress/yixuan-selectAddress.vue";
import HeaderBasic from "@/components/header/index";

export default {
  data() {
    return {
      address: "请选择省市区",
      is_xz: 1, //是否默认地址 1是默认 0不是默认
      name: "",
      phone: "",
      text: "",
      type: 1, //1编辑收货地址 ， 添加收货地址
      title: "",
      address_id: "",
    };
  },
  components: {
    HeaderBasic,
    selectAddress,
  },
  onLoad(e) {
    this.type = Number(e.type);
    console.log(333, this.type);
    if (this.type == 1) {
      var i = JSON.parse(e.data);
      this.address_id = i.address_id;

      this.title = "编辑收货地址";
      this.name = i.member_name;
      this.phone = i.member_phone;
      this.address = i.detail.split(",");
      console.log(369, this.address);
      this.text = i.pro;
      if (i.state == 1) {
        this.is_xz = 1;
      } else {
        this.is_xz = 0;
      }
    } else {
      this.title = "添加收货地址";
    }
  },
  methods: {
    change() {
      if (this.is_xz == 1) {
        this.is_xz = 0;
      } else {
        this.is_xz = 1;
      }
    },
    // 保存
    baocunClick() {
      if (this.type == 1) {
        if (this.name == "") {
          uni.showToast({
            title: "请输入收货人姓名",
            icon: "none",
          });
        } else if (this.phone == "") {
          uni.showToast({
            title: "请输入收货人联系电话",
            icon: "none",
          });
        } else if (this.address == "") {
          uni.showToast({
            title: "请选择省市区",
            icon: "none",
          });
        } else if (this.text == "") {
          uni.showToast({
            title: "请输入详细地址",
            icon: "none",
          });
        } else {
          let data = {
            address_id: this.address_id,
            member_name: this.name,
            member_phone: this.phone,
            detail: this.address.join(","),
            pro: this.text,
            state: this.is_xz,
          };
          doeditaddress(data, res => {
            if (res.status == 1) {
              uni.showToast({
                title: res.info,
                icon: "none",
              });
              uni.navigateBack({
                delta: 1,
              });
            } else {
              uni.showToast({
                title: res.info,
                icon: "none",
              });
            }
          });
        }
      }
      if (this.type == 2) {
        if (this.name == "") {
          uni.showToast({
            title: "请输入收货人姓名",
            icon: "none",
          });
        } else if (this.phone == "") {
          uni.showToast({
            title: "请输入收货人联系电话",
            icon: "none",
          });
        } else if (this.address == "") {
          uni.showToast({
            title: "请选择省市区",
            icon: "none",
          });
        } else if (this.text == "") {
          uni.showToast({
            title: "请输入详细地址",
            icon: "none",
          });
        } else {
          let data = {
            name: this.name,
            phone: this.phone,
            detail: this.address.join(","),
            pro: this.text,
            state: this.is_xz,
          };
          addaddress(data, res => {
            if (res.status == 1) {
              uni.showToast({
                title: res.info,
                icon: "none",
              });
              uni.navigateBack({
                delta: 1,
              });
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
    // 三级联动显示
    btnClick() {
      this.$refs.selectAddress.show();
    },
    //选择成功
    successSelectAddress(address) {
      //选择成功回调
      this.address = address;
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
  height: 268upx;
  background: #ffffff;
  margin: 26upx auto 80upx;
}

.index-user {
  width: 100%;
  height: 88upx;
  border-bottom: 2upx solid #eeeeee;
}

.index-star {
  position: absolute;
  top: 8upx;
  right: 5upx;
}

.index-shouhuo {
  width: 20%;
  height: 88upx;
  line-height: 88upx;
  text-align: center;
}

.jianjiao {
  width: 14upx;
  height: 24upx;
}

.index-shouhuo-inp1 {
  width: 70%;
}

.index-adress {
  width: 100%;
  height: 204upx;
  background: #ffffff;
  margin: 0 auto;
}

.index-textarea {
  width: 75%;
  height: 176upx;
  margin-top: 28upx;
  padding-left: 4%;
}

.index-baocun {
  width: 588upx;
  height: 94upx;
  margin: 380upx auto 0;
  background: #0f6ccb;
  border-radius: 50upx;
}

.input_item {
  padding: 24upx 30upx;
  border-top: 1upx solid #eeeeee;
  background: #ffffff;
}

.input_item_title {
  margin-right: 32upx;
}

.input_item_img image {
  width: 36upx;
  height: 36upx;
}
</style>
