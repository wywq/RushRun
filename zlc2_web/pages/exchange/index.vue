<!-- 转换中心 -->
<template>
  <view class="exchange">
    <header-basic
      class="exchange-header"
      :icon="true"
      title="转换中心"
      subtitle="发布"
      @onRightButtonClick="onHandleRight"
    ></header-basic>
    <tabbar-icon
      class="exchange-tab"
      :active.sync="activeTab"
      :tabList="tabList"
      @changeTab="changeTab"
    ></tabbar-icon>
    <!-- 主体 -->
    <view class="exchange-body">
      <!-- 统计数值 -->
      <view class="exchange-value">
        <view class="exchange-value-column">
          <!-- 最低 -->
          <view class="exchange-value-item">
            <view class="exchange-value-item-title">最低</view>
            <view class="exchange-value-item-value">$0.18</view>
          </view>
          <!-- 最高 -->
          <view class="exchange-value-item">
            <view class="exchange-value-item-title">最高</view>
            <view class="exchange-value-item-value">$0.18</view>
          </view>
          <!-- 当前 -->
          <view class="exchange-value-item">
            <view class="exchange-value-item-title">当前</view>
            <view class="exchange-value-item-value">$0.18</view>
          </view>
        </view>
        <view class="exchange-value-column">
          <!-- 成交 -->
          <view class="exchange-value-item">
            <view class="exchange-value-item-title">成交</view>
            <view class="exchange-value-item-value">12000</view>
          </view>
          <!-- 买单 -->
          <view class="exchange-value-item">
            <view class="exchange-value-item-title">买单</view>
            <view class="exchange-value-item-value">12000</view>
          </view>
          <!-- 涨跌 -->
          <view class="exchange-value-item">
            <view class="exchange-value-item-title">涨跌</view>
            <view class="exchange-value-item-value">0.0%</view>
          </view>
        </view>
      </view>
      <!-- 统计图表 -->
      <view
        @click="echarts.onClick"
        class="exchange-chart"
        id="echarts"
        :prop="option"
        :change:prop="echarts.updateEcharts"
      ></view>
      <!-- 列表标题 -->
      <view class="exchange-title">
        <view class="exchange-title-one">卖家</view>
        <view class="exchange-title-two">金币</view>
        <view class="exchange-title-two">CNY</view>
        <view class="exchange-title-three">操作</view>
      </view>
      <!-- 列表 -->
      <view class="exchange-list">
        <block v-for="(i, index) in dataList" :key="index">
          <view class="exchange-list-item">
            <view class="exchange-item-one">
              <image
                class="exchange-item-one-icon"
                src="@/static/image/grxx_touxiang_img@2x.png"
              ></image>
              <view class="exchange-item-one-name">{{ i.name }}</view>
            </view>
            <view class="exchange-item-two">{{ i.coin }}</view>
            <view class="exchange-item-two">{{ i.CNY }}</view>
            <view class="exchange-item-three">
              <view class="exchange-item-btn">购买</view>
            </view>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
import dayjs from "dayjs";
import HeaderBasic from "@/components/header/index";
import TabbarIcon from "@/components/tabbar/tabbarIcon/index";

export default {
  components: {
    HeaderBasic,
    TabbarIcon,
  },
  data() {
    return {
      activeTab: 1,
      tabList: [
        { id: 1, name: "需求列表" },
        { id: 2, name: "转让列表" },
      ],
      option: {
        // 提示框
        tooltip: {},
        xAxis: {
          // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
          type: "category",
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: "#ffffff",
            },
          },
        },
        yAxis: {},
        series: [
          {
            name: "价格",
            type: "line",
            symbol: "circle",
            symbolSize: 6,
            data: [
              ["04-06", 5],
              ["04-07", 30],
              ["04-08", 20],
              ["04-09", 10],
              ["04-10", 10],
              ["04-11", 20],
              ["04-12", 20],
            ],
          },
          {
            name: "转让量",
            type: "line",
            symbol: "circle",
            symbolSize: 6,
            data: [
              ["04-06", 20],
              ["04-07", 20],
              ["04-08", 10],
              ["04-09", 10],
              ["04-10", 20],
              ["04-11", 36],
              ["04-12", 5],
            ],
          },
        ],
        color: ["#FF3E56", "#F7A702"],
      },
      dataList: [
        {
          id: 1,
          name: "WERAFYWERAFYWERAFYWERAFYWERAFY",
          coin: "50000",
          CNY: "30000",
        },
        { id: 2, name: "WERAFY", coin: "50000", CNY: "30000" },
        { id: 3, name: "WERAFY", coin: "50000", CNY: "30000" },
        { id: 4, name: "WERAFY", coin: "50000", CNY: "30000" },
        { id: 5, name: "WERAFY", coin: "50000", CNY: "30000" },
      ],
    };
  },
  computed: {},
  onLoad(opt) {},
  methods: {
    onHandleRight() {},
    onViewClick(options) {
      console.log(options);
    },
  },
};
</script>

<script module="echarts" lang="renderjs">
let myChart
export default {
	mounted() {
		if (typeof window.echarts === 'function') {
			this.initEcharts()
		} else {
			// 动态引入较大类库避免影响页面展示
			const script = document.createElement('script')
			// view 层的页面运行在 www 根目录，其相对路径相对于 www 计算
			script.src = 'static/js/echarts.js'
			script.onload = this.initEcharts.bind(this)
			document.head.appendChild(script)
		}
	},
	methods: {
		initEcharts() {
			myChart = echarts.init(document.getElementById('echarts'))
			// 观测更新的数据在 view 层可以直接访问到
			myChart.setOption(this.option)
		},
		updateEcharts(newValue, oldValue, ownerInstance, instance) {
			// 监听 service 层数据变更
			myChart.setOption(newValue)
		},
		onClick(event, ownerInstance) {
			// 调用 service 层的方法
			ownerInstance.callMethod('onViewClick', {
				test: 'test'
			})
		}
	}
}
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.exchange {
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
.exchange {
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
.exchange-header {
  position: fixed;
  top: 0;
  z-index: 9999;
}
/*  #ifdef  APP-PLUS */
.exchange-tab {
  position: fixed;
  top: calc(96rpx + var(--status-bar-height));
  z-index: 9999;
}
/*  #endif  */
/*  #ifdef  H5 */
.exchange-tab {
  position: fixed;
  top: 121rpx;
  z-index: 9999;
}
/*  #endif  */
.exchange-body {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
}
.exchange-value {
  @include flex(space-between, center);
  flex-direction: column;
  padding: 40rpx 0;
  box-sizing: border-box;
  width: 100%;
  height: 300rpx;
  background: #fff;
}
.exchange-value-column {
  @include flex(space-around, center);
  width: 100%;
}
.exchange-value-item {
  @include flex(center, center);
  flex-direction: column;
  width: calc(100% / 3);
}
.exchange-value-item-title {
  font-size: 26rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #95939f;
}
.exchange-value-item-value {
  font-size: 30rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.exchange-chart {
  margin-top: 20rpx;
  width: 100%;
  height: 430rpx;
  background: #fff;
}
.exchange-title {
  @include flex(flex-start, center);
  padding: 0 20rpx;
  box-sizing: border-box;
  width: 100%;
  height: 72rpx;
  background: #fafafa;
}
.exchange-title-one {
  flex-shrink: 0;
  width: 40%;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.exchange-title-two {
  flex-shrink: 0;
  width: 20%;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.exchange-title-three {
  flex-shrink: 0;
  width: 20%;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #3d3d3d;
}
.exchange-list {
  @include flex(flex-start, center);
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
  background: #fff;
}
.exchange-list-item {
  @include flex(flex-start, center);
  padding: 0 20rpx;
  box-sizing: border-box;
  width: 100%;
  height: 114rpx;
  background: #fff;
  border-bottom: 2rpx solid #eee;
}
.exchange-list-item:last-child {
  border-bottom: none;
}
.exchange-item-one {
  @include flex(flex-start, center);
  flex-shrink: 0;
  padding-right: 10rpx;
  box-sizing: border-box;
  width: 40%;
}
.exchange-item-one-icon {
  flex-shrink: 0;
  width: 70rpx;
  height: 70rpx;
  border-radius: 50%;
}
.exchange-item-one-name {
  @extend %text_cut_line;
  flex-grow: 1;
  text-align: left;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.exchange-item-two {
  @extend %text_cut_line;
  flex-shrink: 0;
  padding-right: 10rpx;
  box-sizing: border-box;
  width: 20%;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #3d3d3d;
}
.exchange-item-three {
  @include flex(center, center);
  flex-shrink: 0;
  width: 20%;
}
.exchange-item-btn {
  width: 110rpx;
  height: 60rpx;
  line-height: 60rpx;
  background: #e6344a;
  border-radius: 16rpx;
  text-align: center;
  font-size: 28rpx;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
}
</style>
