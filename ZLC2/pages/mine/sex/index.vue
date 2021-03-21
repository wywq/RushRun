<!-- 性别 -->
<template>
  <view class="sex">
    <header-basic :icon="true" title="性别"></header-basic>
    <!-- 主体 -->
    <view class="sex-body">
      <view class="sex-column">
        <block v-for="s in sexList" :key="s.id">
          <view class="sex-item" @tap="handleChangeSex(s.id)">
            <view class="sex-item-title" :class="s.id == sex ? 'active' : ''">{{
              s.title
            }}</view>
            <template v-if="s.id == sex">
              <image
                class="sex-item-img"
                src="@/static/image/xb_xuanze_icon@2x.png"
              ></image>
            </template>
          </view>
        </block>
      </view>
      <view class="sex-confirm" @tap="handleConfirm">确定</view>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import Utils from "@/common/utils/index.js";

export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      sex: 999,
      sexList: [
        { id: 1, title: "男" },
        { id: 0, title: "女" },
      ],
    };
  },
  onLoad(options) {
    if (options.sex) {
      this.sex = options.sex;
    }
  },
  methods: {
    handleChangeSex(id) {
      this.sex = id;
    },
    handleConfirm() {
      Utils.storage.set("zlc_sex", this.sex);
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.sex {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
  background: #fafafa;
}
.sex-body {
  @include flex(flex-start, center);
  flex-direction: column;
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
}
.sex-column {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  background: #ffffff;
  border-radius: 14rpx;
}
.sex-item {
  @include flex(space-between, center);
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2rpx solid #eee;
}
.sex-item:last-child {
  border-bottom: none;
}
.sex-item-title {
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.sex-item-img {
  width: 32rpx;
  height: 32rpx;
}
.sex-confirm {
  margin-top: 30rpx;
  width: 100%;
  height: 88rpx;
  line-height: 88rpx;
  text-align: center;
  background: #e6344a;
  border-radius: 22rpx;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
}
.active {
  color: #e6344a;
}
</style>
