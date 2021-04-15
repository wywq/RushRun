<template>
  <view class="index">
    <view class="header display_flex justify_between align_center">
      <image
        class="index-header-fanhui margin-left-20"
        src="/static/img/fanhui_icon@2x.png"
        @click="headerClick"
      ></image>
      <view
        class="header_ss color_999 font_size_28 display_flex justify_start align_center margin-right margin-left-20"
      >
        <image src="/static/img/Group@2x.png" mode=""></image>
        <input
          type="text"
          value=""
          placeholder="搜索商品"
          v-model="ssname"
          @confirm="yesClick"
        />
      </view>
    </view>
    <view class="index-titlebox display_flex align_center">
      <view class="display_flex margin-left index-box-left">
        <view class="font_size_16 color_222 padding-left-10">价格</view>
        <view class="margin-left-20">
          <image
            class="index-shang"
            src="/static/img/shangjianjiao.png"
            @click="shunxu(1)"
          ></image>
          <image
            class="index-shang margin-top-6"
            src="/static/img/xiajianjiao.png"
            @click="shunxu(2)"
          ></image>
        </view>
      </view>
      <view class="display_flex align_center" @click="shaixClick">
        <view class="font_size_16 color_222 padding-right-10">筛选</view>
        <image class="index-shaixuan" src="/static/img/shaixuan.png"></image>
      </view>
    </view>
    <view v-if="list != ''">
      <view
        class="index-main display_flex align_center"
        v-for="(item, index) in list"
        :key="index"
        @click="goodsClick(item.goods_id)"
      >
        <image class="index-main-img" :src="item.pic"></image>
        <view class="index-main-text">
          <view class="font_size_16 color_333 index-wenzi">{{
            item.name
          }}</view>
          <view class="font_size_14 color_888"
            >库存{{ item.current_inventory }}</view
          >
          <view class="display_flex flex_between align_center">
            <view class="font_size_16 color-E6344A"
              >{{ item.price }}<span class="color-E6344A font_size_12">元</span>
            </view>
            <view class="font_size_12 color_333 margin-top-6"
              >{{ item.sold_num }}人购买</view
            >
          </view>
        </view>
      </view>
    </view>
    <view class="text_center margin-top padding-top" v-else>
      <view class="font_size_title color_333">暂无数据</view>
    </view>
    <!-- 筛选 -->
    <lee-popup ref="popup" type="right" padding="0upx">
      <view class="index-popupRef-back">
        <view
          class="color_white font_size_title font-weight-500 padding-left index-title-pop"
          >当前分类:{{ flname }}</view
        >
      </view>
      <view class="index-main-popup">
        <view
          class="color_222 font_size_title font-weight padding-bottom padding-left"
          >一级分类</view
        >
        <view class="index-main-content display_flex flex_wrap">
          <view
            class="font_size_12 display_flex flex_center align_center margin-right-15 margin-bottom"
            @click="yjflClick(item, 1)"
            v-for="(item, index) in firstlist"
            :key="index"
            :class="item.status == 1 ? 'index-main-wxz' : 'index-main-yxz'"
            >{{ item.name }}</view
          >
        </view>
      </view>
      <view class="index-main-popuptwo" v-show="is_show == true">
        <view
          class="color_222 font_size_title font-weight padding-bottom padding-left"
          >二级分类</view
        >
        <view class="index-main-content display_flex flex_wrap">
          <view
            class="font_size_12 display_flex flex_center align_center margin-right-15 margin-bottom"
            @click="yjflClick(item, 2)"
            v-for="(item, index) in seconedlist"
            :key="index"
            :class="item.status == 1 ? 'index-main-wxz' : 'index-main-yxz'"
            >{{ item.name }}</view
          >
        </view>
      </view>
      <!-- 筛选分类 -->
      <view class="index-main-sx display_flex align_center flex_center">
        <view class="index-main-sx-left text_center margin-right-15">
          <input
            type="text"
            maxlength="6"
            placeholder="最低价"
            class="index-sx-inp color_9B9B9B font_size_12"
            v-model="min"
          />
        </view>
        <view class="index-main-sx-center"></view>
        <view class="index-main-sx-left text_center">
          <input
            type="text"
            maxlength="6"
            placeholder="最高价"
            class="index-sx-inp color_9B9B9B font_size_12"
            v-model="max"
          />
        </view>
      </view>

      <!-- 按钮 -->
      <view
        class="index-sxfooter display_flex align_center flex_center flex_between"
      >
        <view
          class="index-sx-footerbtn display_flex flex_center align_center font-weight-500 color_white font_size_title margin-right"
          @click="closeClick"
          >返回</view
        >
        <view
          class="index-sx-footerbtn display_flex flex_center align_center font-weight-500 color_white font_size_title"
          @click="conClick"
          >确定</view
        >
      </view>
    </lee-popup>
  </view>
</template>

<script>
import { searchGoods, getTypeList } from "@/api/new.js";
import LeePopup from "@/components/popup/lee-popup/lee-popup.vue";
export default {
  data() {
    return {
      firstlist: [], //筛选一级匪类
      seconedlist: [], //筛选二级匪类
      list: [],
      ssname: "", //搜索内容
      typeid: "", //全部分类带过来的id
      page: 1,
      is_show: false,
      flname: "无",
      min: "",
      max: "",
      fenleiid: "",
      type: 0,
    };
  },
  components: {
    LeePopup,
  },
  onLoad(options) {
    this.page = 1;
    if (options.id) {
      this.fenleiid = options.id;
    } else {
      this.ssname = options.name;
    }
    this.yesClick();
  },
  methods: {
    shunxu(type) {
      this.list = "";
      if (type == 1) {
        this.type = 1;
      } else if (type == 2) {
        this.type = 2;
      }
      console.log(888, type);
      this.yesClick();
    },
    //搜索确定
    yesClick() {
      let data = {
        type: this.type,
        fenlei: this.fenleiid,
        keywords: this.ssname,
        page: this.page,
        page_num: 6,
        min: this.min,
        max: this.max,
      };
      searchGoods(data, res => {
        if (res.status == 1) {
          if (this.page == 1) {
            this.list = res.data;
          } else {
            this.list = this.list.concat(res.data);
          }
        }
      });
    },
    // 一级分类点击哦
    yjflClick(item, type) {
      if (type == 1) {
        const firstlist = this.firstlist.map((i, index) => {
          if (item.id == i.id) {
            i.status = 2;
            this.is_show = true;

            // 二级分类
            if (this.is_show == true) {
              let data = {
                id: item.id,
              };
              getTypeList(data, res => {
                if (res.status == 1) {
                  this.seconedlist = res.data;
                  res.data.map((item, index) => {
                    item.status = 1;
                    console.log(item.status);
                  });
                }
              });
            }
          } else {
            i.status = 1;
          }
          return i;
        });
        this.firstlist = firstlist;
      }
      if (type == 2) {
        const seconedlist = this.seconedlist.map((i, index) => {
          console.log(987, item.id, i.id);

          if (item.id == i.id) {
            console.log(369, i.name);
            this.flname = i.name;
            this.fenleiid = item.id;
            i.status = 2;
          } else {
            i.status = 1;
          }
          return i;
        });
        this.seconedlist = seconedlist;
      }
    },
    // 筛选确定
    conClick() {
      this.page = 1;
      this.list = "";
      let data = {
        type: this.type,
        min: this.min,
        max: this.max,
        keywords: this.ssname,
        fenlei: this.fenleiid,
        page: this.page,
        page_num: 6,
      };
      searchGoods(data, res => {
        if (res.status == 1) {
          this.$refs.popup.close();
          // this.list = ''
          // this.yesClick()
          this.list = res.data;
        } else {
          uni.showToast({
            title: res.info,
            icon: "none",
          });
        }
      });
    },
    // 筛选返回
    closeClick() {
      this.$refs.popup.close();
    },
    // 点击弹出筛选
    shaixClick() {
      this.$refs.popup.open();
      this.seconedlist = "";
      let data = {
        id: "",
      };
      getTypeList(data, res => {
        if (res.status == 1) {
          this.firstlist = res.data;
          res.data.map((item, index) => {
            item.status = 1;
            console.log(item.status);
          });
        }
      });
    },
    // 头部返回
    headerClick() {
      uni.navigateBack({
        delta: 1,
      });
    },
    // 点击商品
    goodsClick(goods_id) {
      uni.navigateTo({
        url:
          "/pages/mine/goodDetails/index?goods_id=" + goods_id + "&gm_type=1",
      });
    },
  },
  onReachBottom() {
    this.page++;
    this.yesClick();
  },
};
</script>
<style scoped>
.index {
  background: #ffffff;
}

/*  #ifdef  APP-PLUS */
.header {
  width: 100%;
  height: 132upx;
  background: #0f6ccb;
  padding-top: var(--status-bar-height);
  border-bottom: 1upx solid #eeeeee;
}
/*  #endif  */
/*  #ifdef  H5 */
.header {
  width: 100%;
  height: 132upx;
  background: #0f6ccb;
  padding-top: 25rpx;
  border-bottom: 1upx solid #eeeeee;
}
/*  #endif  */
.header_ss {
  margin-top: 8upx;
  background: rgba(245, 245, 245, 1);
  border-radius: 8upx;
  padding: 10upx 0;
  padding-left: 10upx;
  width: 80%;
}

.header_ss input {
  font-size: 28upx;
  width: 90%;
}

.header image {
  width: 35upx;
  height: 35upx;
  margin-right: 10upx;
}

.index-header-fanhui {
  width: 35upx !important;
  height: 40upx !important;
}

.index-titlebox {
  width: 100%;
  height: 80upx;
  border-bottom: 2upx solid #d7d7d7;
}

.index-shang {
  width: 15upx;
  height: 15upx;
  display: block;
  margin-top: 10upx;
}

.index-shaixuan {
  width: 26upx;
  height: 26upx;
}

.index-box-left {
  width: 75%;
}

.index-main {
  width: 90%;
  height: 266upx;
  background: #ffffff;
  border-radius: 16upx;
  margin: 0 auto 0;
  border-bottom: 2upx solid #eeeeee;
}

.index-main-img {
  width: 200upx;
  height: 202upx;
  margin: 0 0 0 30upx;
}

.index-main-text {
  width: 60%;
  height: 202upx;
  margin-left: 20upx;
}
.index-wenzi {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.index-popupRef-back {
  width: 100%;
  height: 224upx;
  background: url(/static/image/top_img@2x.png) no-repeat;
  background-size: 100% 100%;
}

.index-title-pop {
  padding-top: 66upx;
}

.index-main-popup {
  width: 100%;
  padding-top: 44upx;
  padding-bottom: 44upx;
  border-bottom: 2upx solid #d7d7d7;
}

.index-main-popuptwo {
  width: 100%;
  padding-top: 44upx;
  padding-bottom: 44upx;
}

.index-main-content {
  width: 95%;
  height: 100%;
  margin: 0 auto;
}

.index-main-wxz {
  width: 124upx;
  height: 52upx;
  background: #d7d7d7;
  border-radius: 12upx;
  color: #888888;
}

.index-main-yxz {
  width: 124upx;
  height: 52upx;
  background: #0f6ccb;
  border-radius: 12upx;
  color: #ffffff;
}
.index-main-sx {
  margin-top: 15upx;
}
.index-main-sx-left {
  width: 158upx;
  height: 60upx;
  border-radius: 10upx;
  border: 2upx solid #d7d7d7;
  overflow: hidden;
}

.index-sx-inp {
  width: 100%;
  height: 60upx;
}

.index-main-sx-center {
  width: 18upx;
  height: 3upx;
  background: #929292;
  margin-right: 15upx;
}

.index-sxfooter {
  width: 90%;
  position: absolute;
  left: 5%;
  bottom: 60upx;
}

.index-sx-footerbtn {
  width: 194upx;
  height: 72upx;
  background: #0f6ccb;
}
</style>
