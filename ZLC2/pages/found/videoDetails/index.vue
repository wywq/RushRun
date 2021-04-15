<!-- 用户协议 -->
<template>
  <view class="video">
    <header-basic :icon="true" title="详情"></header-basic>
    <template v-if="isPlay">
      <video
        class="video-player"
        :src="videoDetail.shipin_code"
        autoplay
        :show-play-btn="false"
        @ended="onEnd"
      ></video>
    </template>
    <!-- 主体 -->
    <template v-else>
      <view class="video-body-cover">
        <image class="video-cover" :src="videoDetail.shipin_pic"></image>
        <image
          class="video-play"
          src="@/static/image/sxy_bf_icon@2x.png"
          @tap="handlePlay"
        ></image>
      </view>
    </template>
    <share ref="share" :details="details"></share>
  </view>
</template>

<script>
import HeaderBasic from "@/components/header/index";
import share from "@/components/popup/share/index.vue";
import { shangDetail } from "@/api/new.js";

export default {
  components: {
    HeaderBasic,
    share,
  },
  data() {
    return {
      isPlay: false,
      //视频详情
      videoDetail: {},
    };
  },
  computed: {
    details() {
      return JSON.stringify(this.videoDetail);
    },
  },
  onLoad(opt) {
    if (opt.id) {
      this.getShangDetail(opt.id);
    }
  },
  methods: {
    //商学院详情
    getShangDetail(shipin_id) {
      shangDetail(
        {
          shipin_id,
        },
        res => {
          if (res.status > 0) {
            console.log("商学院详情", res.data);
            this.videoDetail = res.data;
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
