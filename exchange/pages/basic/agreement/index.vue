<!-- 用户协议 -->
<template>
  <view class="agreement">
    <header-basic
      class="agreement-header"
      :icon="true"
      title="用户协议"
    ></header-basic>
    <!-- 主体 -->
    <view class="agreement-body" v-html="nodes"></view>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
export default {
  components: {
    HeaderBasic,
  },
  data() {
    return {
      nodes:
        "初步判断，事故因居民使用燃气不当初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。初步判断，事故因居民使用燃气不当造成。具体原因调查及后续工作正在进行。正在进行。造成。具体原因调查及后续工作正在进行。正在进行。",
    };
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
  @include flex(flex-start, center);
  flex-direction: column;
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
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  padding-top: 121rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  background: #fff;
}
/*  #endif  */
.agreement-body {
  margin: 30rpx 0;
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
.agreement-header {
  position: fixed;
  top: 0;
  z-index: 9999;
}
</style>
