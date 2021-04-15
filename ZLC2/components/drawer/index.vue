<!-- 选择提现方式 -->
<template>
  <uni-drawer
    class="level"
    ref="popup"
    mode="right"
    @change="onChange"
    :width="285"
  >
    <view class="drawer">
      <view class="drawer-title">数量</view>
      <view class="drawer-select">
        <block v-for="n in numberList" :key="n.id">
          <view
            class="drawer-item"
            :class="n.id == formData.activeNumber ? 'active' : ''"
            @tap="handleChangeActive(n.id)"
            >{{ n.title }}</view
          >
        </block>
      </view>
      <view class="drawer-duration">
        <view class="drawer-duration-title">价格区间</view>
        <view class="drawer-input-group">
          <view class="drawer-input-wrap">
            <input
              class="drawer-input"
              type="text"
              placeholder="最低价"
              v-model="formData.xiao"
            />
          </view>
          <view class="drawer-input-line"></view>
          <view class="drawer-input-wrap">
            <input
              class="drawer-input"
              type="text"
              placeholder="最高价"
              v-model="formData.da"
            />
          </view>
        </view>
      </view>
      <view class="drawer-btn-wrap">
        <view class="drawer-btn" @tap="handleConfirm">确定</view>
      </view>
    </view>
  </uni-drawer>
</template>

<script>
export default {
  components: {},
  props: {
    visible: Boolean,
  },
  watch: {
    visible(val) {
      if (val) {
        this.openPopup();
      } else {
        this.closePopup();
      }
    },
  },
  data() {
    return {
      formData: {
        activeNumber: 1,
        xiao: "",
        da: "",
      },
      numberList: [
        { id: 1, title: "1-10", isMargin: true },
        { id: 2, title: "10-50", isMargin: true },
        { id: 3, title: "50-100", isMargin: false },
        { id: 4, title: "100-200", isMargin: true },
        { id: 5, title: "200以上", isMargin: true },
      ],
    };
  },
  methods: {
    openPopup() {
      this.$refs.popup.open();
    },
    closePopup() {
      this.$refs.popup.close();
    },
    onChange(e) {
      if (!e) {
        this.$emit("update:visible", false);
        console.log(e);
        this.formData.xiao = "";
        this.formData.da = "";
      } else {
        this.$emit("update:visible", true);
      }
    },
    handleChangeActive(e) {
      this.formData.activeNumber = e;
    },
    handleConfirm() {
      this.$emit("onSearch", this.formData);
      this.closePopup();
    },
  },
};
</script>

<style lang="scss" scoped>
.level {
  z-index: 10000;
}
.drawer {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
}
/*  #ifdef  APP-PLUS */
.drawer-title {
  @include flex(flex-start, flex-end);
  padding: 0 0 30rpx 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: calc(96rpx + var(--status-bar-height));
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
/*  #endif  */
/*  #ifdef  H5 */
.drawer-title {
  @include flex(flex-start, flex-end);
  padding: 0 0 30rpx 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 121rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
/*  #endif  */
.drawer-select {
  @include flex(flex-start, center);
  flex-wrap: wrap;
  padding: 0 30rpx 10rpx 30rpx;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2rpx solid #eee;
}
.drawer-item {
  margin-right: 20rpx;
  margin-bottom: 20rpx;
  flex-shrink: 0;
  width: calc((100% - 40rpx) / 3);
  height: 84rpx;
  line-height: 84rpx;
  background: #f5f5f5;
  border-radius: 16rpx;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.drawer-item:nth-child(3) {
  margin-right: 0rpx;
}
.active {
  background: #ffe6e9;
  color: #0f6ccb;
}
.drawer-duration {
  @include flex(flex-start, center);
  flex-direction: column;
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2rpx solid #eee;
}
.drawer-duration-title {
  width: 100%;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
.drawer-input-group {
  @include flex(center, center);
  margin-top: 30rpx;
  width: 100%;
}
.drawer-input-wrap {
  @extend %text_cut_line;
  padding: 0 10rpx;
  box-sizing: border-box;
  flex-grow: 1;
  height: 84rpx;
  background: #f5f5f5;
  border-radius: 16rpx;
}
.drawer-input {
  width: 100%;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.drawer-input-line {
  margin: 0 16rpx;
  flex-shrink: 0;
  width: 18rpx;
  height: 1rpx;
  background: #9b9b9b;
}
.drawer-btn-wrap {
  @include flex(flex-end, center);
  margin-top: 30rpx;
  width: 100%;
}
.drawer-btn {
  margin-right: 30rpx;
  width: 190rpx;
  height: 84rpx;
  line-height: 84rpx;
  text-align: center;
  background: #0f6ccb;
  border-radius: 200rpx;
  font-size: 32rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
</style>
