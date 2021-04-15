<template>
  <div class="root">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      style="height: 100%;"
    >
      <el-submenu :index="i + ''" v-for="(val, i) in action" :key="i">
        <template slot="title">
          <i :class="val.icon"></i>
          <span>{{ val.title }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="'/' + item.rolue"
            v-for="(item, index) in val.child"
            :key="index"
          >
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      action: [
        {
          title: "首页",
          icon: "el-icon-copy-document",
          child: [
            {
              name: "首页统计",
              rolue: "index",
            },
            // {
            // 	name: '首页轮播图',
            // 	rolue: 'banner'
            // }
          ],
        },
        {
          title: "用户管理",
          icon: "el-icon-user",
          child: [
            {
              name: "用户列表",
              rolue: "memberList",
            },
            {
              name: "账户管理",
              rolue: "accountManage",
            },
            {
              name: "管理员管理",
              rolue: "manage",
            },
          ],
        },
        // {
        // 	title: '店铺',
        // 	icon: 'el-icon-office-building',
        // 	child: [{
        // 		name: '店铺列表',
        // 		rolue: 'shop'
        // 	}]
        // },
        {
          title: "商品",
          icon: "el-icon-present",
          child: [
            {
              name: "商品列表",
              rolue: "goodslist",
            },
            {
              name: "商品分类",
              rolue: "goodstype",
            },
            {
              name: "商品图片库",
              rolue: "goodpic",
            },
          ],
        },
        {
          title: "订单",
          icon: "el-icon-office-building",
          child: [
            {
              name: "订单列表",
              rolue: "porderlist", //orderlist
            },
            // {
            // 	name: '评价列表',
            // 	rolue: 'evaluatelist'
            // }
          ],
        },
        {
          title: "活动",
          icon: "el-icon-bell",
          child: [
            {
              name: "抢购活动",
              rolue: "snapActivity",
            },
            {
              name: "用户商品",
              rolue: "userGoods",
            },
            {
              name: "用户商品查询",
              rolue: "userGoodsSearch",
            },
            {
              name: "匹配列表",
              rolue: "match",
            },
            {
              name: "空间列表",
              rolue: "space",
            },
            {
              name: "书画列表",
              rolue: "art",
            },
            // {
            //   name: "砍价活动",
            //   rolue: "activity",
            // },
            // {
            //   name: "竞拍活动",
            //   rolue: "fupinList",
            // },
            // {
            //   name: "竞拍等级",
            //   rolue: "auctionLevel",
            // },
          ],
        },
        {
          title: "规则协议",
          icon: "el-icon-tickets",
          child: [
            {
              name: "规则协议",
              rolue: "protocol",
            },
            {
              name: "收款方式",
              rolue: "cash",
            },
            {
              name: "参数配置",
              rolue: "configs",
            },
            {
              name: "公告列表",
              rolue: "gonggao",
            },
            {
              name: "轮播图",
              rolue: "carousel",
            },
          ],
        },
        // {
        // 	title: '优惠券',
        // 	icon: 'el-icon-discount',
        // 	child: [{
        // 		name: '优惠券列表',
        // 		rolue: 'couponlist'
        // 	}]
        // },
        {
          title: "意见反馈",
          icon: "el-icon-chat-dot-round",
          child: [
            {
              name: "意见反馈",
              rolue: "feedbackList",
            },
          ],
        },
        {
          title: "地址管理",
          icon: "el-icon-location-information",
          child: [
            {
              name: "地址管理",
              rolue: "addressList",
            },
          ],
        },
        {
          title: "财务日志",
          icon: "el-icon-coin",
          child: [
            {
              name: "财务日志列表",
              rolue: "financeList",
            },
            {
              name: "提现列表",
              rolue: "withdrawList",
            },
          ],
        },
      ],
    };
  },
  mounted() {},
  methods: {
    logout() {
      this.$confirm("此操作将退出管理系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          sessionStorage.clear(); //清除所有缓存
          this.$router.push({
            path: "/login",
          });
          this.$message({
            type: "success",
            message: "退出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  min-height: 100vh;
}
</style>
