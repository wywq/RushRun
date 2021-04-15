<!-- 用户协议 -->
<template>
  <view class="census">
    <view class="census-top">
      <header-basic
        class="census-header"
        :icon="true"
        :title="title"
      ></header-basic>
      <!-- 统计 -->
      <view class="census-body">
        <image class="census-body-icon" :src="censusImage"></image>
        <view class="census-body-title">当前{{ title }}:</view>
        <view class="census-body-value">{{ active }}</view>
      </view>
    </view>
    <!-- 列表 -->
    <view class="census-list">
      <block v-for="(d, i) in dataList" :key="i">
        <view class="census-item">
          <view class="census-item-left">
            <view class="census-item-left-title">{{ d.content }}</view>
            <view class="census-item-left-time">{{ d.add_time }}</view>
          </view>
          <view class="census-item-right"
            >{{ d.money_type | typeFilter }}{{ d.money }}</view
          >
        </view>
      </block>
    </view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import { gongxian, huoyuedu } from "@/api/new.js";
export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      //type 1 贡献值 2 活跃度
      type: 0,
      //贡献值,活跃度
      active: "",
      //liebiao1
      dataList: [],
      page: 1,
    };
  },
  filters: {
    typeFilter(val) {
      switch (Number(val)) {
        case 1:
          return "+";
        case 2:
          return "-";
      }
    },
  },
  computed: {
    //标题
    title() {
      switch (Number(this.type)) {
        case 1:
          return "贡献值";
        case 2:
          return "活跃度";
      }
    },
    censusImage() {
      switch (Number(this.type)) {
        case 1:
          return require("@/static/image/sy_gx_gx_icon@2x.png");
        case 2:
          return require("@/static/image/sy_hyd_hyd_icon@2x.png");
      }
    },
  },
  onLoad(options) {
    if (options.type) {
      this.type = options.type;
      uni.startPullDownRefresh();
    }
  },
  onPullDownRefresh() {
    console.log("pull");
    this.page = 1;
    switch (Number(this.type)) {
      case 1:
        this.getGongxian();
        break;
      case 2:
        this.getHuoyuedu();
        break;
    }
  },
  onReachBottom() {
    this.page++;
    switch (Number(this.type)) {
      case 1:
        this.getGongxian();
        break;
      case 2:
        this.getHuoyuedu();
        break;
    }
  },
  methods: {
    //   贡献值
    getGongxian() {
      gongxian(
        {
          page: this.page,
        },
        res => {
          if (res.status > 0) {
            console.log("贡献值", res.gongxiandu);
            this.active = res.gongxiandu.gongxian;
            if (this.page == 1) {
              this.dataList = res.neirong;
            } else {
              this.dataList = this.dataList.concat(res.neirong);
            }
          } else {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          }
          uni.stopPullDownRefresh();
        }
      );
    },
    //   活跃度
    getHuoyuedu() {
      huoyuedu(
        {
          page: this.page,
        },
        res => {
          if (res.status > 0) {
            console.log("活跃度", res);
            this.active = res.huoyue.jichu + "+" + res.huoyue.huoyue;
            if (this.page == 1) {
              this.dataList = res.neirong;
            } else {
              this.dataList = this.dataList.concat(res.neirong);
            }
          } else {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          }
          uni.stopPullDownRefresh();
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.census {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: calc(220rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}
/*  #endif  */
/*  #ifdef  H5 */
.census {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: 245rpx;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}

/*  #endif  */
.census-top {
  @include flex(flex-start, center);
  flex-direction: column;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
}
.census-body {
  @include flex(center, center);
  width: 100%;
  height: 124rpx;
  background: #fff;
}
.census-header {
  width: 100%;
}
.census-body-icon {
  margin-right: 6rpx;
  width: 36rpx;
  height: 36rpx;
}
.census-body-title {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.census-body-value {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #42dbee;
}
.census-list {
  @include flex(flex-start, center);
  flex-direction: column;
  margin-top: 20rpx;
  width: 100%;
  background: #fff;
}
.census-item {
  @include flex(space-between, center);
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  border-bottom: 2rpx solid #eee;
}
.census-item:last-child {
  border-bottom: none;
}
.census-item-left {
  @include flex(center, flex-start);
  flex-direction: column;
}
.census-item-left-title {
  margin-bottom: 15rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.census-item-left-time {
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #95939f;
}
.census-item-right {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #42dbee;
}
</style>
