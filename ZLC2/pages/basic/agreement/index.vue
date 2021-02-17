// 用户协议
<template>
  <view>
    <view class="" v-html="nodes"></view>
  </view>
</template>

<script>
import Utils from "@/common/utils/index.js";
export default {
  data() {
    return {
      //文本节点
      nodes: ``,
    };
  },
  filters: {
    timeFilter(val) {
      return Utils.tsToYMD(val);
    },
  },
  onLoad(options) {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
