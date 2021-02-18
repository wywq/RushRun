<!-- 用户协议 -->
<template>
  <view class="agreement">
    <header-basic
      title="用户协议"
      subtitle="dianji"
      @onRightButtonClick="onHandleRight"
    ></header-basic>
    <!-- 主体 -->
    <view class="agreement-body"
      >据吉林长春市绿园区互联网信息中心30日15时19分通报，1月30日5时35分，市消防支队接报警，绿园区青春街与青林路交汇处杨家小区三栋四单元4楼一户居民家中燃气泄漏，引发爆燃及火灾。事故发生后，省、市领导立即作出批示，指导救援。
      时35分，市消防支队接报警，绿园区青春街与青林路交汇处杨家小区三栋四单元4楼一户居民家中燃气泄漏，引发爆燃及火灾。
      事故发生后，省、市领导立即作出批示，指导救援。市消防支队、公安局、公用局、120、燃气公司等部门迅速赶到现场抢险救援。
      目前，现场处置已全部结束，事故共造成8人死亡，3人受伤。专家初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。</view
    >
  </view>
</template>

<script>
import HeaderBasic from "@/components/custom/header/index";
export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {};
  },
  onLoad(options) {},
  methods: {
    onHandleRight() {
      console.log("nb2");
    },
  },
};
</script>

<style lang="scss" scoped>
/*  #ifdef  APP-PLUS */
.agreement {
  position: relative;
  padding-top: calc(96rpx + var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #fff;
}
/*  #endif  */
/*  #ifdef  H5 */
.agreement {
  position: relative;
  padding-top: 121rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #fff;
}
/*  #endif  */
.agreement-body {
  padding: 30rpx;
  box-sizing: border-box;
  width: 100%;
  overflow-y: scroll;
}
</style>
