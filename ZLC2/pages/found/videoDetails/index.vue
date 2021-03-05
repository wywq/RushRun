<!-- 用户协议 -->
<template>
  <view class="video">
    <header-basic
      :icon="true"
      title="详情"
      subtitle="分享"
      @onRightButtonClick="onHandleRight"
    ></header-basic>
    <template v-if="isPlay">
      <video
        class="video-player"
        src="@/static/video/demo.mp4"
        autoplay
        :show-play-btn="false"
        @ended="onEnd"
      ></video>
    </template>
    <!-- 主体 -->
    <template v-else>
      <view class="video-body-cover">
        <image class="video-cover" src="@/static/image/sy_yj_bg@2x.png"></image>
        <image
          class="video-play"
          src="@/static/image/sxy_bf_icon@2x.png"
          @tap="handlePlay"
        ></image>
      </view>
    </template>
    <share ref="share"></share>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import share from "@/components/popup/share/index.vue";
export default {
  components: {
    HeaderBasic,
    share,
  },
  data() {
    return {
      isPlay: false,
    };
  },
  methods: {
    //分享
    onHandleRight() {
      console.log("nb2");
      this.$refs.share.openPopup();
    },
    // 播放
    handlePlay() {
      this.isPlay = true;
    },
    //播放结束
    onEnd() {
      console.log("nb");
      this.isPlay = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.video {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
  background: #fff;
}
.video-body-cover {
  position: relative;
  flex-grow: 1;
  width: 100%;
}
.video-player {
  flex-grow: 1;
  width: 100%;
}
.video-cover {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
}
.video-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100rpx;
  height: 100rpx;
  z-index: 999;
}
</style>
