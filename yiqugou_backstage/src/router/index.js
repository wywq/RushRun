import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "../views/Login.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/shop",
        name: "shop",
        component: () => import("@/views/shop/shop.vue"),
      },
      {
        path: "/goodslist",
        name: "goodslist",
        component: () => import("@/views/goods/goodslist.vue"),
      },
      {
        path: "/goodstype",
        name: "goodstype",
        component: () => import("@/views/goods/goodstype.vue"),
      },
      {
        path: "/goodpic",
        name: "goodpic",
        component: () => import("@/views/goods/goodpic.vue"),
      },
      {
        path: "/banner",
        name: "banner",
        component: () => import("@/views/index/banner.vue"),
      },
      {
        path: "/systems",
        name: "systems",
        component: () => import("@/views/index/systems.vue"),
      },
      {
        path: "/index",
        name: "index",
        component: () => import("@/views/index/index.vue"),
      },
      {
        path: "/snapActivity",
        name: "snapActivity",
        component: () => import("@/views/activity/snapActivity.vue"),
      },
      {
        path: "/userGoods",
        name: "userGoods",
        component: () => import("@/views/activity/userGoods.vue"),
      },
      {
        path: "/userGoodsSearch",
        name: "userGoodsSearch",
        component: () => import("@/views/activity/userGoodsSearch.vue"),
      },
      {
        path: "/match",
        name: "match",
        component: () => import("@/views/activity/match.vue"),
      },
      {
        path: "/fupinList",
        name: "activity",
        component: () => import("@/views/activity/fupinList.vue"),
      },
      {
        path: "/auctionLevel",
        name: "auctionLevel",
        component: () => import("@/views/activity/auctionLevel.vue"),
      },
      {
        path: "/orderlist",
        name: "orderlist",
        component: () => import("@/views/order/orderlist.vue"),
      },
      {
        path: "/porderlist",
        name: "porderlist",
        component: () => import("@/views/order/porderlist.vue"),
      },
      {
        path: "/evaluatelist",
        name: "evaluatelist",
        component: () => import("@/views/order/evaluatelist.vue"),
      },
      {
        path: "/orderDetail",
        name: "orderDetail",
        component: () => import("@/views/order/orderDetail.vue"),
      },
      {
        path: "/shopDetail",
        name: "shopDetail",
        component: () => import("@/views/shop/shopDetail.vue"),
      },
      {
        path: "/couponlist",
        name: "couponlist",
        component: () => import("@/views/coupon/couponlist.vue"),
      },
      {
        path: "/couponDetail",
        name: "couponDetail",
        component: () => import("@/views/coupon/couponDetail.vue"),
      },
      {
        path: "/couponGrantRecord",
        name: "couponGrantRecord",
        component: () => import("@/views/coupon/couponGrantRecord.vue"),
      },
      {
        path: "/protocol",
        name: "protocol",
        component: () => import("@/views/index/protocol.vue"),
      },
      {
        path: "/feedbackList",
        name: "feedbackList",
        component: () => import("@/views/feedback/feedbackList.vue"),
      },
      {
        path: "/addressList",
        name: "addressList",
        component: () => import("@/views/address/addressList.vue"),
      },
      {
        path: "/memberList",
        name: "memberList",
        component: () => import("@/views/member/memberList.vue"),
      },
      {
        path: "/accountManage",
        name: "accountManage",
        component: () => import("@/views/member/accountManage.vue"),
      },
      {
        path: "/configs",
        name: "configs",
        component: () => import("@/views/index/configs.vue"),
      },
      {
        path: "/gonggao",
        name: "gonggao",
        component: () => import("@/views/index/gonggao.vue"),
      },
      {
        path: "/financeList",
        name: "financeList",
        component: () => import("@/views/finance/financeList.vue"),
      },
      {
        path: "/withdrawList",
        name: "withdrawList",
        component: () => import("@/views/finance/withdrawList.vue"),
      },
      {
        path: "/withdrawList",
        name: "withdrawList",
        component: () => import("@/views/finance/withdrawList.vue"),
      },
      {
        path: "/carousel",
        name: "carousel",
        component: () => import("@/views/index/banner.vue"),
      },
      {
        path: "/cash",
        name: "cash",
        component: () => import("@/views/index/cash.vue"),
      },
      {
        path: "/manage",
        name: "manage",
        component: () => import("@/views/index/manage.vue"),
      },
      {
        path: "/space",
        name: "space",
        component: () => import("@/views/activity/spaceList.vue"),
      },
      {
        path: "/art",
        name: "art",
        component: () => import("@/views/activity/artList.vue"),
      },
    ],
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
