(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-home-game-index"],{"22b3":function(a,n,t){"use strict";t.r(n);var b=t("9584"),r=t("6123");for(var e in r)"default"!==e&&function(a){t.d(n,a,(function(){return r[a]}))}(e);t("4a55");var d,i=t("f0c5"),v=Object(i["a"])(r["default"],b["b"],b["c"],!1,null,"52bb1368",null,!1,b["a"],d);n["default"]=v.exports},4737:function(a,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var b={components:{},data:function(){return{token:""}},computed:{src:function(){return"http://118.190.174.163/web-mobile/?token="+this.token}},onLoad:function(a){this.token=uni.getStorageSync("zlc_token")},onShow:function(){},methods:{getH5Message:function(a){console.log("来自webview的消息",a.detail.data);var n=a.detail.data;n&&"switchTabToIndex"==n[0].action&&uni.switchTab({url:"/pages/index"})}}};n.default=b},"4a55":function(a,n,t){"use strict";var b=t("7ee9"),r=t.n(b);r.a},6123:function(a,n,t){"use strict";t.r(n);var b=t("4737"),r=t.n(b);for(var e in b)"default"!==e&&function(a){t.d(n,a,(function(){return b[a]}))}(e);n["default"]=r.a},"7ee9":function(a,n,t){var b=t("adac");"string"===typeof b&&(b=[[a.i,b,""]]),b.locals&&(a.exports=b.locals);var r=t("4f06").default;r("0c951478",b,!0,{sourceMap:!1,shadowMode:!1})},9584:function(a,n,t){"use strict";var b;t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return e})),t.d(n,"a",(function(){return b}));var r=function(){var a=this,n=a.$createElement,t=a._self._c||n;return t("v-uni-view",{staticClass:"message"},[t("v-uni-web-view",{staticClass:"webview",attrs:{src:a.src},on:{message:function(n){arguments[0]=n=a.$handleEvent(n),a.getH5Message.apply(void 0,arguments)}}})],1)},e=[]},adac:function(a,n,t){var b=t("24fb");n=b(!1),n.push([a.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色 */\r\n/* 尺寸 */\r\n/* 透明度 */\r\n/* 颜色 */\r\n/* 尺寸 */\r\n/* 透明度 */\r\n/* 颜色 */\r\n/* 尺寸 */\r\n/* 透明度 */\r\n/* 颜色 */\r\n/* 尺寸 */\r\n/* 透明度 */\r\n/* 颜色 */\r\n/* 尺寸 */\r\n/* 透明度 */\r\n/* 颜色 */\r\n/* 尺寸 */\r\n/* 透明度 */\r\n/* css重置样式表 */\r\n/* 通用 */html[data-v-52bb1368],\r\nbody[data-v-52bb1368],\r\ndiv[data-v-52bb1368],\r\nuni-view[data-v-52bb1368],\r\nspan[data-v-52bb1368],\r\nobject[data-v-52bb1368],\r\niframe[data-v-52bb1368],\r\nh1[data-v-52bb1368],\r\nh2[data-v-52bb1368],\r\nh3[data-v-52bb1368],\r\nh4[data-v-52bb1368],\r\nh5[data-v-52bb1368],\r\nh6[data-v-52bb1368],\r\np[data-v-52bb1368],\r\nblockquote[data-v-52bb1368],\r\npre[data-v-52bb1368],\r\nabbr[data-v-52bb1368],\r\naddress[data-v-52bb1368],\r\ncite[data-v-52bb1368],\r\ncode[data-v-52bb1368],\r\ndel[data-v-52bb1368],\r\ndfn[data-v-52bb1368],\r\nem[data-v-52bb1368],\r\nimg[data-v-52bb1368],\r\nins[data-v-52bb1368],\r\nkbd[data-v-52bb1368],\r\nq[data-v-52bb1368],\r\nsamp[data-v-52bb1368],\r\nsmall[data-v-52bb1368],\r\nstrong[data-v-52bb1368],\r\nsub[data-v-52bb1368],\r\nsup[data-v-52bb1368],\r\nvar[data-v-52bb1368],\r\nb[data-v-52bb1368],\r\ni[data-v-52bb1368],\r\ndl[data-v-52bb1368],\r\ndt[data-v-52bb1368],\r\ndd[data-v-52bb1368],\r\nol[data-v-52bb1368],\r\nul[data-v-52bb1368],\r\nli[data-v-52bb1368],\r\nfieldset[data-v-52bb1368],\r\nuni-form[data-v-52bb1368],\r\nuni-label[data-v-52bb1368],\r\nlegend[data-v-52bb1368],\r\ntable[data-v-52bb1368],\r\ncaption[data-v-52bb1368],\r\ntbody[data-v-52bb1368],\r\ntfoot[data-v-52bb1368],\r\nthead[data-v-52bb1368],\r\ntr[data-v-52bb1368],\r\nth[data-v-52bb1368],\r\ntd[data-v-52bb1368],\r\narticle[data-v-52bb1368],\r\naside[data-v-52bb1368],\r\nuni-canvas[data-v-52bb1368],\r\ndetails[data-v-52bb1368],\r\nfigcaption[data-v-52bb1368],\r\nfigure[data-v-52bb1368],\r\nfooter[data-v-52bb1368],\r\nheader[data-v-52bb1368],\r\nhgroup[data-v-52bb1368],\r\nmenu[data-v-52bb1368],\r\nnav[data-v-52bb1368],\r\nsection[data-v-52bb1368],\r\nsummary[data-v-52bb1368],\r\ntime[data-v-52bb1368],\r\nmark[data-v-52bb1368],\r\nuni-audio[data-v-52bb1368],\r\nuni-video[data-v-52bb1368]{margin:0;padding:0;border:0;outline:0;font-size:100%;vertical-align:baseline;background:transparent}uni-image[data-v-52bb1368]{vertical-align:bottom}h1[data-v-52bb1368],\r\nh2[data-v-52bb1368],\r\nh3[data-v-52bb1368],\r\nh4[data-v-52bb1368],\r\nh5[data-v-52bb1368],\r\nh6[data-v-52bb1368],\r\nem[data-v-52bb1368],\r\ni[data-v-52bb1368]{font-weight:100;font-style:normal}ul[data-v-52bb1368],\r\nol[data-v-52bb1368],\r\nli[data-v-52bb1368]{list-style-type:none}uni-view[data-v-52bb1368]{-webkit-box-sizing:border-box;box-sizing:border-box}.input-placeholder[data-v-52bb1368],\r\n.textarea-placeholder[data-v-52bb1368]{font-size:%?28?%;font-family:PingFangSC-Regular,PingFang SC;font-weight:400;color:#9b9b9b;line-height:%?40?%}.uni-tabbar[data-v-52bb1368]{visibility:hidden!important}.gray[data-v-52bb1368]{filter:gray;-webkit-filter:grayscale(100%)}\r\n/* 颜色 */\r\n/* 尺寸 */\r\n/* 透明度 */\r\n/* 颜色 */\r\n/* 尺寸 */\r\n/* 透明度 */.message[data-v-52bb1368]{position:relative;width:100%;height:100vh}.webview[data-v-52bb1368]{width:100%;height:100%}',""]),a.exports=n}}]);