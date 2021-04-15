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
        path: "/index",
        name: "index",
        component: () => import("@/views/index/index.vue"),
      },
      // {
      //   path: "/shop",
      //   name: "shop",
      //   component: () => import("@/views/shop/shop.vue"),
      // },
      {
        path: "/audit",
        name: "audit",
        component: () => import("@/views/shop/audit.vue"),
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
        path: "/activity",
        name: "activity",
        component: () => import("@/views/activity/activity.vue"),
      },
      {
        path: "/fupinList",
        name: "activity",
        component: () => import("@/views/activity/fupinList.vue"),
      },
      {
        path: "/porderlist",
        name: "porderlist",
        component: () => import("@/views/order/porderlist.vue"),
      },
      {
        path: "/morderlist",
        name: "morderlist",
        component: () => import("@/views/order/morderlist.vue"),
      },
      {
        path: "/torderlist",
        name: "torderlist",
        component: () => import("@/views/order/torderlist.vue"),
      },
      {
        path: "/evaluatelist",
        name: "evaluatelist",
        component: () => import("@/views/order/evaluatelist.vue"),
      },
      // {
      // 	path: '/orderDetail',
      // 	name: 'orderDetail',
      // 	component: () => import('@/views/order/orderDetail.vue')
      // },
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
        path: "/refund",
        name: "refund",
        component: () => import("@/views/order/refund.vue"),
      },
      {
        path: "/yijia",
        name: "yijia",
        component: () => import("@/views/yijia/yijia.vue"),
      },
      {
        path: "/fuwen",
        name: "fuwen",
        component: () => import("@/views/yijia/fuwen.vue"),
      },
      {
        path: "/questionList",
        name: "questionList",
        component: () => import("@/views/question/questionList.vue"),
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
