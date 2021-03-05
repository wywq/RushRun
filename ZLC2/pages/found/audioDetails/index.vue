<!-- 用户协议 -->
<template>
  <view class="audio">
    <header-basic
      :icon="true"
      title="详情"
      subtitle="分享"
      @onRightButtonClick="onHandleRight"
    ></header-basic>
    <!-- 主体 -->
    <view class="audio-body">
      <view class="audio-body-cover">
        <image
          class="audio-body-img"
          src="@/static/image/sy_yj_bg@2x.png"
        ></image>
        <template v-if="isPlay">
          <image
            class="audio-body-play"
            src="@/static/image/zt_icon@2x.png"
            @tap="handlePalse"
          ></image>
        </template>
        <template v-else>
          <image
            class="audio-body-play"
            src="@/static/image/sxy_bf_icon@2x.png"
            @tap="handlePlay"
          ></image>
        </template>
      </view>
      <view class="audio-body-title">趣任务，一个不一样的爱眼软件</view>
      <view class="audio-body-control">
        <slider
          class="audio-body-slide"
          :min="audioStartStamp"
          :max="audioEndStamp"
          :step="1000000"
          :value="currentPlayStamp"
          activeColor="#E6344A"
          :block-size="14"
          block-color="#E6344A"
          @change="handleDragSilder"
        />
      </view>
      <view class="audio-body-time">
        <view class="audio-body-point">{{ audioStartTime }}</view>
        <view class="audio-body-point">{{ audioEndTime }}</view>
      </view>
    </view>
    <share ref="share"></share>
  </view>
</template>

<script>
import dayjs from "dayjs";
import HeaderBasic from "@/components/header/index";
import share from "@/components/popup/share/index.vue";
export default {
  components: {
    HeaderBasic,
    share,
  },
  data() {
    return {
      //音频实例
      audioInstance: null,
      //定时器实例
      timer: null,
      //是否正在播放
      isPlay: false,
      //音频起点(秒*1000000)
      audioStartStamp: 0,
      //音频终点(秒*1000000)
      audioEndStamp: 0,
      //当前播放(秒*1000000)
      currentPlayStamp: 0,
      //开始时间(mm:ss)
      audioStartTime: "00:00",
      //结束时间(mm:ss)
      audioEndTime: "",
    };
  },
  computed: {},
  onLoad() {
    this.audioInit();
    this.$on("hook:onUnload", () => {
      this.audioInstance.destroy();
      this.destroy();
      console.log("关了");
    });
  },
  methods: {
    //初始化音频实例
    audioInit() {
      this.audioInstance = uni.createInnerAudioContext();
      this.audioInstance.src = require("@/static/audio/theSunAlsoRises.mp3");
      this.audioInstance.onCanplay(() => {
        // 设定音频终点
        this.audioEndStamp = this.audioInstance.duration * 1000000;
        // 设定结束时间
        this.audioEndTime = dayjs(this.audioEndStamp / 1000).format("mm:ss");
      });
      this.audioInstance.onEnded(() => {
        console.log(11111);
        this.clean();
      });
    },
    //分享
    onHandleRight() {
      this.$refs.share.openPopup();
    },
    // 播放
    handlePlay() {
      this.isPlay = true;
      this.audioInstance.play();
      this.timer = setInterval(() => {
        // 赋值当前播放
        this.currentPlayStamp = this.audioInstance.currentTime * 1000000;
        // 赋值开始时间
        this.audioStartTime = dayjs(this.currentPlayStamp / 1000).format(
          "mm:ss"
        );
        console.log("currentPlayStamp", this.currentPlayStamp);
      }, 1000);
    },
    //暂停
    handlePalse() {
      this.isPlay = false;
      this.audioInstance.pause();
      clearInterval(this.timer);
    },
    //拖动
    handleDragSilder(e) {
      console.log(e.detail.value);
      // 赋值开始时间
      this.audioStartTime = dayjs(e.detail.value / 1000).format("mm:ss");
      // 改变播放点
      this.audioInstance.seek(e.detail.value / 1000000);
    },
    //重置播放条
    clean() {
      clearInterval(this.timer);
      this.isPlay = false;
      this.audioStartStamp = 0;
      this.currentPlayStamp = 0;
      this.audioStartTime = "00:00";
      console.log(this.currentPlayStamp);
    },
  },
};
</script>

<style lang="scss" scoped>
.audio {
  @include flex(flex-start, center);
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100vh;
  background: #fff;
}
.audio-body {
  @include flex(flex-start, center);
  flex-direction: column;
  width: 100%;
  flex-grow: 1;
}
.audio-body-cover {
  position: relative;
  margin-top: 260rpx;
  width: 264rpx;
  height: 264rpx;
  border-radius: 40rpx;
}
.audio-body-img {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border-radius: 40rpx;
  z-index: 9;
}
.audio-body-play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85rpx;
  height: 85rpx;
  z-index: 99;
}
.audio-body-title {
  margin-top: 60rpx;
  font-size: 32rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #33364a;
}
.audio-body-control {
  margin-top: 60rpx;
  padding: 0 56rpx;
  box-sizing: border-box;
  width: 100%;
}
.audio-body-slide {
  margin: 0;
  width: 100%;
}
// 修改进度条粗细
.audio-body-slide ::v-deep .uni-slider-handle-wrapper {
  height: 12rpx;
}
.audio-body-time {
  @include flex(space-between, center);
  margin-top: 10rpx;
  padding: 0 30rpx;
  box-sizing: border-box;
  width: 100%;
}
.audio-body-point {
  font-size: 28rpx;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #33364a;
}
</style>
