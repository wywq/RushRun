// 用户协议
<template>
  <view>
    <view class="rich-text-one">
      <view class="rich-text-one-words" v-html="nodes"></view>
    </view>
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
