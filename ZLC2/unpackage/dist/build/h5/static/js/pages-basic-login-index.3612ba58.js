(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-basic-login-index"],{"01da":function(e,i,t){"use strict";var n;t.d(i,"b",(function(){return a})),t.d(i,"c",(function(){return o})),t.d(i,"a",(function(){return n}));var a=function(){var e=this,i=e.$createElement,t=e._self._c||i;return t("v-uni-view",{staticClass:"indexdiffrent"},[t("v-uni-view",{staticClass:"index-height"}),t("v-uni-view",{staticClass:"header display_flex align_center"},[t("v-uni-view",{staticClass:"index-header-img margin-left margin-right"}),t("v-uni-view",{staticClass:"font_size_title color_white headertitle text_center"},[e._v("登录")]),t("v-uni-view",{staticClass:"color_white font_size_14",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.gopage("/pages/basic/register/index")}}},[e._v("注册账号")])],1),t("v-uni-view",{staticClass:"text_center"},[t("v-uni-image",{staticClass:"logo",attrs:{src:"/static/img/logo_img@2x.png"}})],1),t("v-uni-view",{staticClass:"index-main display_flex align_center"},[t("v-uni-image",{staticClass:"index-main-img",attrs:{src:"/static/img/shoujihao-6@2x.png"}}),t("v-uni-view",{staticClass:"index-main-phone"},[t("v-uni-input",{staticClass:"input font_size_14 color_white",attrs:{placeholder:"请输入手机号","placeholder-style":"color:#ffffff",maxlength:"11"},model:{value:e.reg_phone,callback:function(i){e.reg_phone=i},expression:"reg_phone"}})],1)],1),t("v-uni-view",{staticClass:"index-main-pwd display_flex align_center"},[t("v-uni-image",{staticClass:"index-main-img",attrs:{src:"/static/img/mima-9@2x.png"}}),t("v-uni-view",{staticClass:"index-main-phone"},[t("v-uni-input",{staticClass:"input font_size_14 color_white",attrs:{type:"password",placeholder:"请输入密码","placeholder-style":"color:#ffffff"},model:{value:e.reg_pwd,callback:function(i){e.reg_pwd=i},expression:"reg_pwd"}})],1)],1),t("v-uni-view",{staticClass:"inedx-btn color-E6344A font_size_title display_flex flex_center align_center",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.loginClick.apply(void 0,arguments)}}},[e._v("立即登录")]),t("v-uni-view",{staticClass:"font_size_14 color_white text_center wjmm",on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.gopage("/pages/basic/forget/index")}}},[e._v("忘记密码")]),t("v-uni-view",{staticClass:"index-footer"})],1)},o=[]},"222e":function(e,i,t){"use strict";t.r(i);var n=t("4b80"),a=t.n(n);for(var o in n)"default"!==o&&function(e){t.d(i,e,(function(){return n[e]}))}(o);i["default"]=a.a},4216:function(e,i,t){"use strict";var n=t("adce"),a=t.n(n);a.a},"4b80":function(e,i,t){"use strict";var n=t("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0,t("96cf");var a=n(t("1da1")),o=t("5f1d"),r={data:function(){return{reg_phone:"",reg_pwd:""}},components:{},onShow:function(){return(0,a.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},methods:{returnClick:function(){uni.navigateBack({delta:1})},gopage:function(e){uni.navigateTo({url:e})},loginClick:function(){var e=this;if(""==this.reg_phone)uni.showToast({title:"请输入手机号",icon:"none"});else if(/^1[3456789]\d{9}$/.test(this.reg_phone))if(""==this.reg_pwd)uni.showToast({title:"请输入密码",icon:"none"});else{var i={loginName:this.reg_phone,loginPwd:this.reg_pwd};(0,o.check)(i,(function(i){console.log("登录之后:",i),1==i.status?(uni.setStorageSync("zlc_token",i.token),uni.setStorageSync("zlc_phone",e.reg_phone),uni.setStorageSync("zlc_userId",i.userId),uni.showToast({title:i.info,duration:2e3,icon:"none"}),uni.switchTab({url:"/pages/index"})):uni.showToast({title:i.info,duration:2e3,icon:"none"})}))}else uni.showToast({title:"请输入正确的手机号",icon:"none"})}}};i.default=r},"74a7":function(e,i,t){var n=t("24fb");i=n(!1),i.push([e.i,".indexdiffrent[data-v-f0f88bb0]{width:100%;height:100vh;background:#0f6ccb}.header[data-v-f0f88bb0]{width:100%;height:%?93?%}.index-header-img[data-v-f0f88bb0]{width:%?22?%;height:%?40?%}.headertitle[data-v-f0f88bb0]{width:65%}.logo[data-v-f0f88bb0]{width:%?300?%;height:%?200?%;margin:%?130?% auto 0}.index-logo-center[data-v-f0f88bb0]{font-size:%?42?%;font-weight:800}.index-main[data-v-f0f88bb0]{width:80%;height:%?94?%;border:%?2?% solid #fff;-webkit-border-radius:%?16?%;border-radius:%?16?%;opacity:.6;margin:%?106?% auto %?22?%}.index-main-pwd[data-v-f0f88bb0]{width:80%;height:%?94?%;border:%?2?% solid #fff;-webkit-border-radius:%?16?%;border-radius:%?16?%;opacity:.6;margin:0 auto}.index-main-img[data-v-f0f88bb0]{width:%?45?%;height:%?50?%;margin:0 %?30?% 0 %?32?%}.index-main-phone[data-v-f0f88bb0]{width:60%;height:%?70?%;overflow:hidden;padding-left:%?40?%;border-left:%?2?% solid #fff}.inedx-btn[data-v-f0f88bb0]{width:80%;height:%?94?%;position:fixed;bottom:%?278?%;left:10%;z-index:2;-webkit-border-radius:%?16?%;border-radius:%?16?%;background:#fff;font-weight:800}.index-footer[data-v-f0f88bb0]{width:100%;height:%?354?%;background:url(/static/img/11@2x.png) no-repeat;background-size:100% 100%;position:fixed;bottom:0;left:0;z-index:1}.wjmm[data-v-f0f88bb0]{position:fixed;bottom:%?216?%;left:calc((100% - 16%) / 2);z-index:2}",""]),e.exports=i},adce:function(e,i,t){var n=t("74a7");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=t("4f06").default;a("113bd11e",n,!0,{sourceMap:!1,shadowMode:!1})},cdf7:function(e,i,t){"use strict";t.r(i);var n=t("01da"),a=t("222e");for(var o in a)"default"!==o&&function(e){t.d(i,e,(function(){return a[e]}))}(o);t("4216");var r,s=t("f0c5"),d=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"f0f88bb0",null,!1,n["a"],r);i["default"]=d.exports}}]);