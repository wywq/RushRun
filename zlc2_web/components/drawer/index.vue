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
            <input class="drawer-input" type="text" />
          </view>
          <view class="drawer-input-line"></view>
          <view class="drawer-input-wrap">
            <input class="drawer-input" type="text" />
          </view>
        </view>
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
      console.log(e);
      if (!e) {
        this.$emit("update:visible", false);
      } else {
        this.$emit("update:visible", true);
      }
    },
    handleChangeActive(e) {
      this.formData.activeNumber = e;
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
  color: #e6344a;
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
</style>
