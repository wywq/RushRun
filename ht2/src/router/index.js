import en from "../i18n/lang/en";
import Vue from "vue";
import Router from "vue-router";
import CommerViews from "@/views/commerViews";
import Login from "@/views/login/index";
import Layout from "@/views/layout/layout";
import HomeMain from "@/views/index/mainIndex";

// 不是必须加载的组件使用懒加载
const FinancialLog = () => import("@/views/financial/financialLog");
const MembershipPackage = () => import("@/views/financial/membershipPackage");
const DiscountRecord = () => import("@/views/financial/discountRecord");
const BankAccountList = () => import("@/views/financial/bankAccountList");
const Banklist = () => import("@/views/financial/banklist");
const NotFound = () => import("@/page404");

const pagePermissions = () => import("@/views/permissions/pagePermissions");
const btnPermissions = () => import("@/views/permissions/btnPermissions");
const Team = () => import("@/views/teammanagement/team");

const MemberList = () => import("@/views/member/memberList");
const MemberAccountManagement = () =>
  import("@/views/member/memberAccountManagement");
const MemberComplaint = () => import("@/views/member/memberComplaint");
const MemberAuthentication = () =>
  import("@/views/member/memberAuthentication");
const MembershipLevelList = () => import("@/views/member/membershipLevelList");
const ArticleClassification = () =>
  import("@/views/announcement/articleClassification");
const Darenlist = () => import("@/views/member/darenlist");
const Urban_Information = () => import("@/views/member/urban_Information");
const Feedback_type = () => import("@/views/member/feedback_type");

const CustomerServiceCenter = () =>
  import("@/views/syssetting/customerServiceCenter");
const Sharing_settings = () => import("@/views/syssetting/sharing_settings");
const Aboutme = () => import("@/views/syssetting/aboutme");
const Add_message = () => import("@/views/syssetting/add_message");
const CommonProblem = () => import("@/views/syssetting/commonProblem");
const System_management = () => import("@/views/syssetting/system_management");
const RegistrationAgreement = () =>
  import("@/views/syssetting/registrationAgreement");
const FunctionsSwitch = () => import("@/views/syssetting/functionsSwitch");

const Swiper = () => import("@/views/zodiacManagement/Swiper");
const AudioList = () => import("@/views/zodiacManagement/audioList");
const Videolist = () => import("@/views/zodiacManagement/videolist");
const TextualList = () => import("@/views/zodiacManagement/textualList");
const Advertising_management = () =>
  import("@/views/zodiacManagement/advertising_management");

const Club = () => import("@/views/matchingSystem/club");
const Taskscroll = () => import("@/views/matchingSystem/taskscroll");
const Tasklevellist = () => import("@/views/matchingSystem/tasklevellist");
const Conversionlist = () => import("@/views/matchingSystem/conversionlist");
const Matching = () => import("@/views/matchingSystem/matching");
const Screeningconditions = () =>
  import("@/views/matchingSystem/screeningconditions");
const Tasklist = () => import("@/views/matchingSystem/tasklist");
const Usertasklist = () => import("@/views/matchingSystem/usertasklist");

const renchouList = () => import("@/views/popular/renchou_list");
const shengcheng = () => import("@/views/popular/shengcheng");
const administrator = () => import("@/views/manage/administrator");
const Partnership = () => import("@/views/manage/partnership");
const AdministratorLog = () => import("@/views/manage/administratorLog");
const CityList = () => import("@/views/manage/cityList");
const pagePermissionss = () => import("@/views/permissionss/pagePermissions");
const btnPermissionss = () => import("@/views/permissionss/btnPermissions");

Vue.use(Router);
let routeNmae = en.routeNmae;
let defaultRouter = [
  {
    path: "/",
    redirect: "/index",
    hidden: true,
    children: []
  },

  {
    path: "/index",
    iconCls: "fa fa-dashboard", // 图标样式class
    name: "首页",
    component: Layout,
    alone: true,
    children: [
      // 	{
      // 	path: '/index',
      // 	iconCls: 'fa fa-dashboard  ', // 图标样式class
      // 	name: '首页',
      // 	component: HomeMain,
      // 	children: []
      // },
    ]
  },
  {
    path: "/404",
    component: NotFound,
    name: "404",
    hidden: true,
    children: []
  },
  {
    path: "/login",
    component: Login,
    name: "login",
    hidden: true,
    children: []
  }
];

let addRouter = [
  {
    path: "/",
    iconCls: "el-icon-user", // 图标样式class
    name: "会员管理", // 会员管理
    component: Layout,
    meta: {
      role: ["superAdmin"]
    },
    children: [
      {
        path: "/memberAccountManagement",
        iconCls: "el-icon-notebook-2", // 图标样式class
        name: "会员账户管理", // 会员账户管理
        component: MemberAccountManagement,
        children: []
      },
      {
        path: "/memberList",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "会员列表", // 会员列表
        component: MemberList,
        children: []
      },
      {
        path: "/memberComplaint",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "问题反馈", // 会员列表
        component: MemberComplaint,
        children: []
      },
      {
        path: "/memberAuthentication",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "实名认证", // 会员列表
        component: MemberAuthentication,
        children: []
      },
      {
        path: "/membershipLevelList",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "会员等级列表", // 会员列表
        component: MembershipLevelList,
        children: []
      },
      {
        path: "/darenlist",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "达人列表", // 会员列表
        component: Darenlist,
        children: []
      },
      {
        path: "/urban_Information",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "城市信息", // 会员列表
        component: Urban_Information,
        children: []
      },
      {
        path: "/feedback_type",
        iconCls: "el-icon-edit-outline", // 图标样式class
        name: "反馈类型", // 会员列表
        component: Feedback_type,
        children: []
      }
    ]
  },
  {
    path: "/",
    iconCls: "fa fa-paw", // 图标样式class
    name: "团队管理", // 团队管理
    component: Layout,
    meta: {
      role: ["superAdmin"]
    },
    children: [
      {
        path: "/team",
        iconCls: "fa fa-life-ring", // 图标样式class
        name: "团队信息", // 推广系铺
        component: Team,
        children: []
      }
    ]
  },
  {
    path: "/",
    iconCls: "fa fa-paw", // 图标样式class
    name: "广告管理",
    component: Layout,
    meta: {
      role: ["superAdmin"]
    },
    children: [
      {
        path: "/swiper",
        iconCls: "fa fa-life-ring", // 图标样式class
        name: "轮播图列表",
        component: Swiper,
        children: []
      },
      {
        path: "/audioList",
        iconCls: "fa fa-life-ring", // 图标样式class
        name: "音频列表",
        component: AudioList,
        children: []
      },
      {
        path: "/textualList",
        iconCls: "fa fa-life-ring", // 图标样式class
        name: "图文列表",
        component: TextualList,
        children: []
      },
      {
        path: "/videolist",
        iconCls: "fa fa-life-ring", // 图标样式class
        name: "视频列表",
        component: Videolist,
        children: []
      }
      // {
      // 	path: '/advertising_management',
      // 	iconCls: 'fa fa-life-ring', // 图标样式class
      // 	name: "广告列表",
      // 	component: Advertising_management,
      // 	children: []
      // }
    ]
  },

  {
    path: "/",
    iconCls: "el-icon-edit", // 图标样式class
    name: "财务管理",
    component: Layout,
    meta: {
      role: ["superAdmin"]
    },
    children: [
      {
        path: "/financialLog",
        iconCls: "fa fa-file-code-o", // 图标样式class
        name: "财务日志",
        component: FinancialLog,
        children: []
      },
      //   {
      //     path: "/membershipPackage",
      //     iconCls: "fa fa-file-code-o", // 图标样式class
      //     name: "会员套餐",
      //     component: MembershipPackage,
      //     children: []
      //   },
      //   {
      //     path: "/discountRecord",
      //     iconCls: "fa fa-file-code-o", // 图标样式class
      //     name: "提现记录",
      //     component: DiscountRecord,
      //     children: []
      //   },
      {
        path: "/bankAccountList",
        iconCls: "fa fa-file-code-o", // 图标样式class
        name: "支付方式列表",
        component: BankAccountList,
        children: []
      }
      //   {
      //     path: "/banklist",
      //     iconCls: "fa fa-file-code-o", // 图标样式class
      //     name: "银行列表",
      //     component: Banklist,
      //     children: []
      //   }
    ]
  },
  {
    path: "/",
    iconCls: "el-icon-edit", // 图标样式class
    name: "系统管理",
    component: Layout,
    meta: {
      role: ["superAdmin"]
    },
    children: [
      {
        path: "/customerServiceCenter",
        iconCls: "fa fa-expeditedssl", // 图标样式class
        name: "客服中心",
        component: CustomerServiceCenter,
        children: []
      },
      {
        path: "/aboutme",
        iconCls: "fa fa-expeditedssl", // 图标样式class
        name: "关于我们",
        component: Aboutme,
        children: []
      },
      {
        path: "/functionsSwitch",
        iconCls: "fa fa-expeditedssl", // 图标样式class
        name: "功能开关",
        component: FunctionsSwitch,
        children: []
      },
      {
        path: "/commonProblem",
        iconCls: "fa fa-expeditedssl", // 图标样式class
        name: "常见问题",
        component: CommonProblem,
        children: []
      },
      {
        path: "/system_management",
        iconCls: "fa fa-expeditedssl", // 图标样式class
        name: "系统设置",
        component: System_management,
        children: []
      },
      //   {
      //     path: "/add_message",
      //     iconCls: "fa fa-expeditedssl", // 图标样式class
      //     name: "发布消息",
      //     component: Add_message,
      //     children: []
      //   },
      {
        path: "/registrationAgreement",
        iconCls: "fa fa-expeditedssl", // 图标样式class
        name: "注册协议",
        component: RegistrationAgreement,
        children: []
      }
      //   {
      //     path: "/sharing_settings",
      //     iconCls: "fa fa-expeditedssl", // 图标样式class
      //     name: "分享设置",
      //     component: Sharing_settings,
      //     children: []
      //   }
    ]
  },
  {
    path: "/",
    iconCls: "el-icon-edit", // 图标样式class
    name: "公告管理",
    component: Layout,
    children: [
      {
        path: "/articleClassification",
        iconCls: "fa fa-file-code-o", // 图标样式class
        name: "公告列表",
        component: ArticleClassification,
        children: []
      }
    ]
  },
  {
    path: "/",
    iconCls: "fa fa-paw", // 图标样式class
    name: "娱乐任务",
    component: Layout,
    meta: {
      role: ["superAdmin"]
    },
    children: [
      //   {
      //     path: "/club",
      //     iconCls: "fa fa-life-ring", // 图标样式class
      //     name: "俱乐部",
      //     component: Club,
      //     children: []
      //   },
      {
        path: "/taskscroll",
        iconCls: "fa fa-life-ring", // 图标样式class
        name: "任务卷轴",
        component: Taskscroll,
        children: []
      },
      //   {
      //     path: "/tasklevellist",
      //     iconCls: "fa fa-life-ring", // 图标样式class
      //     name: "卷轴任务等级列表",
      //     component: Tasklevellist,
      //     children: []
      //   },
      {
        path: "/conversionlist",
        iconCls: "fa fa-life-ring", // 图标样式class
        name: "转换列表",
        component: Conversionlist,
        children: []
      },
      {
        path: "/matching",
        iconCls: "fa fa-life-ring", // 图标样式class
        name: "已匹配转换列表",
        component: Matching,
        children: []
      },
      {
        path: "/screeningconditions",
        iconCls: "fa fa-life-ring", // 图标样式class
        name: "转换中心筛选条件",
        component: Screeningconditions,
        children: []
      }
      //   {
      //     path: "/tasklist",
      //     iconCls: "fa fa-life-ring", // 图标样式class
      //     name: "任务列表",
      //     component: Tasklist,
      //     children: []
      //   },
      //   {
      //     path: "/usertasklist",
      //     iconCls: "fa fa-life-ring", // 图标样式class
      //     name: "用户完成任务列表",
      //     component: Usertasklist,
      //     children: []
      //   }
    ]
  },
  {
    path: "/",
    iconCls: "fa fa-universal-access", // 图标样式class
    name: "管理",
    component: Layout,
    meta: {
      role: ["superAdmin"]
    },
    children: [
      {
        path: "/administrator",
        iconCls: "fa fa-expeditedssl", // 图标样式class
        name: "管理员",
        component: administrator,
        children: []
      },
      {
        path: "/administratorLog",
        iconCls: "fa fa-expeditedssl", // 图标样式class
        name: "管理员日志",
        component: AdministratorLog,
        children: []
      },
      {
        path: "/partnership",
        iconCls: "fa fa-expeditedssl", // 图标样式class
        name: "升级合伙人",
        component: Partnership,
        children: []
      },
      {
        path: "/cityList",
        iconCls: "fa fa-expeditedssl", // 图标样式class
        name: "城市列表",
        component: CityList,
        children: []
      }
    ]
  },
  /* {
    path: '/',
    iconCls: 'fa fa-universal-access', // 图标样式class
    name: routeNmae.permissions,
    component: Layout,
    meta: {role: ['superAdmin']},
    children: [
      {
        path: '/pagePermissionss',
        iconCls: 'fa fa-expeditedssl', // 图标样式class
        name: routeNmae.pageControl,
        component: pagePermissionss,
        children: []
      },
      {
        path: '/btnPermissionss',
        iconCls: 'fa fa-toggle-on', // 图标样式class
        name: routeNmae.btnControl,
        component: btnPermissionss,
        children: []
      }
    ]
  }, */

  {
    path: "*",
    redirect: "/404",
    hidden: true,
    children: []
  }
];
export default new Router({
  routes: defaultRouter
});
export { defaultRouter, addRouter };
