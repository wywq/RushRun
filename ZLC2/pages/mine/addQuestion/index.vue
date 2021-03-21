<!-- 发起反馈 -->
<template>
  <view class="add">
    <header-basic
      class="add-header"
      :icon="true"
      title="发起反馈"
    ></header-basic>
    <!-- 提现body -->
    <view class="add-body">
      <view class="add-card">
        <!-- 姓名 -->
        <view class="add-card-column">
          <view class="add-card-title">姓名</view>
          <input
            class="add-card-input"
            type="text"
            placeholder="请输入您的姓名"
            v-model="formData.name"
          />
        </view>
        <!-- 手机号码 -->
        <view class="add-card-column">
          <view class="add-card-title">手机号码</view>
          <input
            class="add-card-input"
            type="text"
            placeholder="请输入您的手机号码"
            v-model="formData.phone"
          />
        </view>
        <!-- 身份证 -->
        <view class="add-card-column">
          <view class="add-card-title">身份证</view>
          <input
            class="add-card-input"
            type="text"
            placeholder="请输入您的身份证"
            v-model="formData.idcard"
          />
        </view>
        <!-- 问题类型 -->
        <view class="add-card-column">
          <picker
            :range="typeList"
            range-key="name"
            :value="index"
            @change="onChangeType"
          >
            <view class="add-card-picker-title">问题类型</view>
          </picker>
          <view class="add-card-picker-right">
            <view class="add-card-title">{{
              index !== "" ? typeList[index].name : ""
            }}</view>
            <image
              class="add-card-icon"
              src="@/static/image/order_all_icon@2x.png"
            />
          </view>
        </view>
        <!-- 问题类型 -->
        <view class="add-card-column-grow">
          <textarea
            class="add-card-text"
            placeholder="请用文字描述一下APP程序出现的问题…"
            v-model="formData.content"
          ></textarea>
        </view>
        <!-- 页面截图 -->
        <view class="add-card-shot">页面截图</view>
        <!-- 截图 -->
        <view class="add-card-imgs">
          <block v-for="(i, index) in imgList" :key="index">
            <image class="add-card-img" :src="$url + i"></image>
          </block>
          <template v-if="imgList.length < 3">
            <image
              class="add-card-img"
              src="@/static/image/zhzx_scpz_tjtp_icon@2x.png"
              @tap="handleUpload"
            ></image>
          </template>
        </view>
      </view>
      <view class="add-btn" @tap="getFeedback">提交</view>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import WithdrawWay from "@/components/popup/withdrawWay/index.vue";
import { yijianfenlei, feedback } from "@/api/new.js";

export default {
  components: {
    HeaderBasic,
    WithdrawWay,
  },
  data() {
    return {
      imgList: [],
      // 问题类型
      typeList: [],
      index: "",
      formData: {
        name: "",
        phone: "",
        idcard: "",
        type: "",
        content: "",
        pic: [],
      },
    };
  },
  computed: {},
  onLoad(options) {
    this.getYijianfenlei();
  },
  methods: {
    //   问题反馈--类型
    getYijianfenlei() {
      yijianfenlei({}, res => {
        if (res.status > 0) {
          console.log(res.data);
          this.typeList = res.data;
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
        uni.stopPullDownRefresh();
      });
    },
    // 问题反馈tianjia
    getFeedback() {
      feedback(
        {
          ...this.formData,
        },
        res => {
          if (res.status > 0) {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
            console.log(res.data);
          } else {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          }
          setTimeout(() => {
            uni.navigateBack({
              delta: 1,
            });
          }, 1000);
          uni.stopPullDownRefresh();
        }
      );
    },
    onChangeType(e) {
      this.index = e.detail.value;
      this.formData.type = this.typeList[e.detail.value].id;
      console.log("111", e.detail.value, this.index);
    },
    //点击上传
    handleUpload() {
      this.$upload.uploadImg(async url => {
        this.imgList.push(url);
        this.formData.pic = this.imgList.join(",");
        console.log("url", url, this.imgList, this.formData.pic);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.add {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
  background: #fafafa;
}
.add-header {
  flex-shrink: 0;
}
.add-body {
  @include flex(flex-start, center);
  flex-direction: column;
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
}
.add-card {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
  background: #ffffff;
  border-radius: 14rpx;
}
.add-card-column {
  @include flex(space-between, center);
  flex-shrink: 0;
  padding: 0 24rpx;
  box-sizing: border-box;
  width: 100%;
  height: 94rpx;
  border-bottom: 2rpx solid #eee;
}
.add-card-column-grow {
  flex-grow: 1;
  padding: 24rpx;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2rpx solid #eee;
}
.add-card-text {
  width: 100%;
  height: 100%;
}
.add-card-title {
  flex-shrink: 0;
  margin-right: 30rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.add-card-picker-title {
  margin-right: 30rpx;
  width: 350rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.add-card-picker-right {
  @include flex(flex-end, center);
}
.add-card-input {
  flex-grow: 1;
  text-align: right;
}
.add-card-icon {
  width: 14rpx;
  height: 24rpx;
}
.add-card-shot {
  @include flex(flex-start, center);
  margin: 30rpx 0 20rpx 0;
  padding: 0 24rpx;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.add-card-imgs {
  @include flex(flex-start, center);
  margin-bottom: 100rpx;
  padding: 0 24rpx;
  box-sizing: border-box;
  flex-shrink: 0;
  width: 100%;
}
.add-card-img {
  margin-right: calc((100% - 600rpx) / 2);
  width: 200rpx;
  height: 200rpx;
  border-radius: 16rpx;
}
.add-card-img:last-child {
  margin-right: 0;
}
.add-btn {
  flex-shrink: 0;
  margin-top: 30rpx;
  width: 100%;
  height: 90rpx;
  line-height: 90rpx;
  text-align: center;
  border-radius: 22rpx;
  background: #e6344a;
  font-size: 32rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
</style>
