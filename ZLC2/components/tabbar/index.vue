<!-- 用户协议 -->
<template>
  <view class="tabbar">
    <block v-for="t in tabList" :key="t.id">
      <view class="tabbar-item" @tap="handleTab(t.id)">
        <view class="tabbar-item-fake"></view>
        <view
          class="tabbar-item-title"
          :class="t.id == active ? 'active' : ''"
          >{{ t.name }}</view
        >
        <view
          class="tabbar-item-fake"
          :class="t.id == active ? 'active' : ''"
        ></view>
      </view>
    </block>
  </view>
</template>

<script>
export default {
  props: {
    active: [Number, String],
  },
  data() {
    return {
      //tabList
      tabList: [
        { id: 1, name: "视频区" },
        { id: 2, name: "图文区" },
        { id: 3, name: "音频区" },
      ],
    };
  },
  methods: {
    handleTab(id) {
      this.$emit("update:active", id);
    },
  },
};
</script>

<style lang="scss" scoped>
.tabbar {
  @include flex(space-around, center);
  width: 100%;
  height: 72rpx;
  background: #fafafa;
}
.tabbar-item {
  @include flex(space-between, center);
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}
.tabbar-item-fake {
  visibility: hidden;
  width: 40rpx;
  height: 4rpx;
  background: #e6344a;
  border-radius: 4rpx;
}
.tabbar-item-title {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.active {
  visibility: visible;
  color: #e6344a;
}
</style>
