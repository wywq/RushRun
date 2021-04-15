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
            {
              name: "首页轮播图",
              rolue: "banner",
            },
          ],
        },
        // {
        //   title: "店铺",
        //   icon: "el-icon-office-building",
        //   child: [
        //     {
        //       name: "店铺列表",
        //       rolue: "shop",
        //     },
        //     // {
        //     // 	name: '店铺审核',
        //     // 	rolue: 'audit'
        //     // },
        //   ],
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
          icon: "el-icon-shopping-cart-full",
          child: [
            {
              name: "普通订单",
              rolue: "porderlist",
            },
            {
              name: "退款订单",
              rolue: "refund",
            },
            // {
            // 	name: '拼团订单',
            // 	rolue: 'torderlist'
            // },
          ],
        },
        // {
        //   title: "文本文档",
        //   icon: "el-icon-document",
        //   child: [
        //     {
        //       name: "新手指南",
        //       rolue: "questionList",
        //     },
        //   ],
        // },
        {
          title: "活动",
          icon: "el-icon-bell",
          child: [
            {
              name: "秒杀活动",
              rolue: "activity",
            },
            // {
            //   name: "扶贫",
            //   rolue: "fupinList",
            // },
          ],
        },

        // {
        // 	title: '益+',
        // 	icon: 'el-icon-discount',
        // 	child: [{
        // 		name: '益+列表',
        // 		rolue: 'yijia'
        // 	},
        // 	{
        // 		name: '宣传文案',
        // 		rolue: 'fuwen'
        // 	}
        // 	]
        // }
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
