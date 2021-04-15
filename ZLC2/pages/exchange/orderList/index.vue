<!-- 转换中心 -->
<template>
  <view class="list">
    <header-basic
      class="list-header"
      :icon="true"
      title="转换订单"
    ></header-basic>
    <tab-bar
      class="list-tab"
      :active.sync="activeTab"
      :tabList="tabList"
      @changeTab="changeTab"
    ></tab-bar>
    <!-- 主体 -->
    <view class="list-body">
      <template v-if="dataList.length != 0">
        <view class="list-main">
          <view class="list-title">
            <view class="list-title-words">类型</view>
            <view class="list-title-words">价格</view>
            <view class="list-title-words">数量</view>
            <view class="list-title-words">时间</view>
            <template v-if="activeTab == 1">
              <view class="list-title-words">操作</view>
            </template>
          </view>
          <view class="list-group">
            <block v-for="(d, index) in dataList" :key="index">
              <view class="list-column" @tap="handleDetails(d.order_id)">
                <view
                  class="list-column-item"
                  :class="d.type == 1 ? 'blue' : d.type == 2 ? 'yellow' : ''"
                  >{{ d.type | typeFilter }}</view
                >
                <view class="list-column-item">{{ d.price }}</view>
                <view class="list-column-item">{{ d.num }}</view>
                <view class="list-column-item">{{ d.matching_time }}</view>
                <template v-if="activeTab == 1">
                  <view class="list-column-item">
                    <template v-if="d.status == 1">
                      <view
                        class="list-column-item-btn"
                        @tap.stop="handleCancel(d.order_id)"
                        >撤单</view
                      >
                    </template>
                    <template v-else>
                      <view class="list-column-item-btn gray">撤单</view>
                    </template>
                  </view>
                </template>
              </view>
            </block>
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<script>
import {
  myGuadan,
  userZhuanrangList,
  userXuqiuList,
  userWanchengList,
  cexiao,
} from "@/api/new.js";
import dayjs from "dayjs";
import HeaderBasic from "@/components/header/index";
import TabBar from "@/components/tabbar/index";
import Template from "../../template.vue";

export default {
  components: {
    HeaderBasic,
    TabBar,
  },
  data() {
    return {
      page: 1,
      activeTab: 1,
      tabList: [
        { id: 1, name: "我的挂单" },
        { id: 2, name: "待收款" },
        { id: 3, name: "待付款" },
        { id: 4, name: "已完成" },
      ],
      dataList: [],
    };
  },
  filters: {
    typeFilter(val) {
      switch (Number(val)) {
        case 1:
          return "需求";
        case 2:
          return "转让";
      }
    },
  },
  computed: {},
  onPullDownRefresh() {
    this.page = 1;
    this.getIndex(this.activeTab);
  },
  onReachBottom() {
    this.page++;
    this.getIndex(this.activeTab);
  },
  onLoad(opt) {
    uni.startPullDownRefresh();
  },
  methods: {
    //接口我的挂单
    getMyGuadan() {
      myGuadan(
        {
          page: this.page,
        },
        res => {
          if (res.status > 0) {
            console.log(res);
            this.dataList = res.data;
          } else {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          }
        }
      );
    },
    //接口待收款列表
    getUserZhuanrangList() {
      userZhuanrangList(
        {
          page: this.page,
        },
        res => {
          if (res.status > 0) {
            console.log(res);
            this.dataList = res.data;
          } else {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          }
        }
      );
    },
    //接口待付款列表
    getUserXuqiuList() {
      userXuqiuList(
        {
          page: this.page,
        },
        res => {
          if (res.status > 0) {
            console.log(res);
            this.dataList = res.data;
          } else {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          }
        }
      );
    },
    //接口已完成订单
    getuserWanchengList() {
      userWanchengList(
        {
          page: this.page,
        },
        res => {
          if (res.status > 0) {
            console.log(res);
            this.dataList = res.data;
          } else {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          }
        }
      );
    },
    //撤单
    getCexiao(id) {
      cexiao(
        {
          id,
        },
        res => {
          if (res.status > 0) {
            uni.startPullDownRefresh();
          } else {
            uni.showToast({
              title: res.info,
              icon: "none",
            });
          }
        }
      );
    },
    //请求入口
    getIndex(e) {
      this.dataList = [];
      switch (Number(e)) {
        case 1:
          this.getMyGuadan();
          break;
        case 2:
          this.getUserZhuanrangList();
          break;
        case 3:
          this.getUserXuqiuList();
          break;
        case 4:
          this.getuserWanchengList();
          break;
      }
      uni.stopPullDownRefresh();
    },
    //切换分页
    changeTab() {
      console.log(this.activeTab);
      this.getIndex(this.activeTab);
    },
    //撤单
    handleCancel(id) {
      this.getCexiao(id);
    },
    //详情
    handleDetails(id) {
      if (this.activeTab == 1 || this.activeTab == 4) {
        return;
      }
      uni.navigateTo({
        url: "/pages/exchange/orderDetails/index?id=" + id,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.list {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: calc(168rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}
/*  #endif  */
/*  #ifdef  H5 */
.list {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: 183rpx;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  background: #fafafa;
}
/*  #endif  */
.list-header {
  position: fixed;
  top: 0;
  z-index: 9999;
}
/*  #ifdef  APP-PLUS */
.list-tab {
  position: fixed;
  top: calc(96rpx + var(--status-bar-height));
  z-index: 9999;
  background: #fff;
}
/*  #endif  */
/*  #ifdef  H5 */
.list-tab {
  position: fixed;
  top: 121rpx;
  z-index: 9999;
  background: #fff;
}
/*  #endif  */
.list-body {
  @include flex(flex-start, center);
  flex-direction: column;
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
}
.list-main {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  background: #ffffff;
  border-radius: 14rpx;
}
.list-title {
  @include flex(flex-start, center);
  width: 100%;
  height: 56rpx;
}
.list-title-words {
  @extend %text_cut_line;
  flex-shrink: 0;
  flex-grow: 1;
  width: 15%;
  text-align: center;
  font-size: 26rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.list-title-words:nth-child(4) {
  flex-shrink: 0;
  flex-grow: 1;
  width: 35%;
}
.list-title-words:nth-child(5) {
  @include flex(center, center);
  flex-shrink: 0;
  flex-grow: 1;
  width: 20%;
}
.list-group {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  background: #ffffff;
}
.list-column {
  @include flex(flex-start, center);
  width: 100%;
  height: 104rpx;
  border-bottom: 2rpx solid #eee;
}
.list-column:last-child {
  border-bottom: none;
}
.list-column-item {
  @extend %text_cut_line;
  flex-grow: 1;
  flex-shrink: 0;
  width: 15%;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.list-column-item:nth-child(4) {
  flex-grow: 1;
  flex-shrink: 0;
  width: 35%;
}
.list-column-item:nth-child(5) {
  @include flex(center, center);
  flex-grow: 1;
  flex-shrink: 0;
  width: 20%;
}
.list-column-item-btn {
  width: 110rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  background: #0f6ccb;
  border-radius: 16rpx;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
.blue {
  color: #0f6ccb;
}
.yellow {
  color: #f7a702;
}
</style>
