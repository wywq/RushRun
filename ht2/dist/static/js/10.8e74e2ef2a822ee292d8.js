webpackJsonp([10],{"9YAx":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Xxa5"),s=i.n(a),n=i("exGp"),r=i.n(n),o=i("sYY+"),l=i.n(o),c=i("oAV5"),u=i("nHSH"),m=i("mtWM"),d=i.n(m),f={data:function(){return{article:{contentHtml:""},searchform:{},tabletwoData:[],shujuData:"",shipin_code:[],show:!1,submitform:{title:"",url:"",gongxianzhi:"",shipin_code:"",resource:""},imageUrl:"",img:"",audioUrl:"",audios:"",id:"",tw:1,type:1,editor:""}},created:function(){var t=this;return r()(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.tuwen(1);case 1:case"end":return e.stop()}},e,t)}))()},methods:{querySearch:function(t,e){var i=this.restaurants;e(t?i.filter(this.createFilter(t)):i)},createFilter:function(t){return function(e){return 0===e.value.toLowerCase().indexOf(t.toLowerCase())}},loadAll:function(){return[{value:"vue"},{value:"node.js"}]},handleSelect:function(t){console.log(t)},getContent:function(){alert(this.article.contentHtml)},pushImg:function(t){var e=this;return r()(s.a.mark(function i(){var a;return s.a.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return a=new FormData,console.log(a),a.append("pic",t.target.files[0]),console.log(11,e.headers),a.append("token",c.a.getCookie("token")),console.log(a.get(555,"pic")),i.next=8,d.a.post("http://118.190.174.163//admin/type/ossType",a,{transformRequest:[function(t){return t}],headers:e.headers}).then(function(t){e.img=t.data.data,e.imageUrl=e.img_url+e.img,e.imges=e.img,console.log(123,t.data.data)}).catch(function(t){console.log(t)});case 8:case"end":return i.stop()}},i,e)}))()},getDate:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate())+" "+(e.getHours()<10?"0"+e.getHours():e.getHours())+":"+(e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":"+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())},tuwen:function(t,e){var i=this;return r()(s.a.mark(function e(){var a,n;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,u.a.tuwen({page:t});case 2:1==(a=e.sent).data.status?(i.shujuData=a.data.data,n=a.data.data.list.map(function(t){return t.start_time=i.getDate(1e3*t.start_time),i.shipin_code=t.shipin_code,t}),console.log(123,i.shipin_code),i.tabletwoData=n,i.$message.success(a.data.info)):i.$message.error(a.data.info);case 4:case"end":return e.stop()}},e,i)}))()},addMerberClick:function(t){var e=this;return r()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.show=!0,e.tw=1,e.imageUrl="",e.type=1,e.submitform.title="",e.article.contentHtml="",e.submitform.gongxianzhi="",e.imges="",e.img="",e.submitform.url="",e.submitform.resource="";case 11:case"end":return t.stop()}},t,e)}))()},modifyClick:function(t){this.id=t.shipin_id,console.log(this.id),this.show=!0,this.tw=2,this.type=2,this.submitform.title=t.shipin_name,this.article.contentHtml=t.shipin_code,this.submitform.gongxianzhi=t.gongxianzhi,this.imageUrl=t.pic,this.img=t.pic,console.log(666,this.imageUrl),this.submitform.url=t.shipin_url,this.submitform.resource=t.is_lianjie,this.tuwen(1)},delClick:function(t){var e=this;this.id=t.shipin_id,this.$confirm("是否继续删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(r()(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.deltuwen({token:c.a.getCookie("token"),shipin_id:e.id});case 2:1==t.sent.data.status&&e.$message.success("删除成功"),e.tuwen(1);case 5:case"end":return t.stop()}},t,e)}))).catch(function(){e.$message({type:"info",message:"已取消删除"})})},onSubmitClick:function(t){var e=this;return r()(s.a.mark(function t(){var i,a;return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(1!=e.type){t.next=7;break}return t.next=3,u.a.addtuwen({shipin_name:e.submitform.title,gongxianzhi:e.submitform.gongxianzhi,shipin_code:e.editor.txt.html(),pic:e.imges,shipin_url:e.submitform.url,is_lianjie:e.submitform.resource,shipin_id:""});case 3:1==(i=t.sent).data.status?(e.show=!1,e.$message.success(i.data.info),e.submitform.title="",e.article.contentHtml="",e.submitform.gongxianzhi="",e.imges="",e.submitform.url="",e.submitform.resource="",e.tuwen(1)):e.$message.error(i.data.info),t.next=13;break;case 7:if(2!=e.type){t.next=13;break}return t.next=10,u.a.addtuwen({shipin_name:e.submitform.title,gongxianzhi:e.submitform.gongxianzhi,shipin_code:e.editor.txt.html(),pic:e.imges,shipin_url:e.submitform.url,is_lianjie:e.submitform.resource,shipin_id:e.id});case 10:a=t.sent,console.log(e.shipin_id),1==a.data.status?(e.show=!1,e.$message.success(a.data.info),e.tuwen(1)):e.$message.error(a.data.info);case 13:case"end":return t.stop()}},t,e)}))()},clone:function(){this.show=!1},handleCurrentChange:function(t){this.tuwen(t)}},mounted:function(){var t=this,e=new l.a(this.$refs.editor);this.editor=e,e.customConfig.uploadImgParamsWithUrl=!0,e.customConfig.pasteIgnoreImg=!0,e.customConfig.pasteFilterStyle=!1,e.customConfig.uploadImgServer="/admin/bank/uploadPic",e.customConfig.showLinkImg=!1,e.customConfig.uploadFileName="pic",e.customConfig.uploadImgParams={token:c.a.getCookie("token")},e.customConfig.uploadImgHooks={success:function(t,e,i){},fail:function(t,e,i){},error:function(t,e){},timeout:function(t,e){},customInsert:function(e,i,a){e(s=t.img_url+i.data),a.txt.img(s),a.txt.html(n);var s=a.txt.img(),n=a.txt.html()}},e.create()}},p={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"textualList"},[i("el-form",{staticClass:"searchform",attrs:{inline:!0,model:t.searchform}},[i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.addMerberClick()}}},[t._v("添加图文")])],1)],1),t._v(" "),i("el-table",{staticStyle:{"margin-top":"10px"},attrs:{data:t.tabletwoData,"header-cell-style":{background:"#F9F9F9",color:"#606266"},border:""}},[i("el-table-column",{attrs:{label:"图文ID",prop:"shipin_id",resizable:!1,align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:"图文标题",prop:"shipin_name",resizable:!1,align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:"链接地址",prop:"shipin_url",resizable:!1,align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:"图文列表图片",prop:"pic",resizable:!1,align:"center"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("img",{staticClass:"scope-img",attrs:{src:t.row.pic,alt:""}})]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"是否是链接",prop:"is_lianjie",resizable:!1,align:"center",width:"160px"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.is_lianjie?i("div",[t._v("是")]):t._e(),t._v(" "),0==e.row.is_lianjie?i("div",[t._v("不是")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"发布时间",prop:"start_time",resizable:!1,align:"center"}}),t._v(" "),i("el-table-column",{attrs:{label:"操作",resizable:!1,align:"center",width:"350px"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small"},on:{click:function(i){return t.delClick(e.row)}}},[t._v("删除")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(i){return t.modifyClick(e.row)}}},[t._v("编辑")])]}}])})],1),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"mark"},[i("div",{staticClass:"mark-content"},[1==t.tw?i("div",{staticClass:"hytj"},[t._v("添加图文")]):t._e(),t._v(" "),2==t.tw?i("div",{staticClass:"hytj"},[t._v("编辑图文")]):t._e(),t._v(" "),i("el-form",{staticClass:"submitform",attrs:{model:t.submitform}},[i("table",{staticStyle:{width:"90%",height:"80px",border:"1px dashed #000",background:"#F9F9F9"},attrs:{rules:"all"}},[i("tr",[i("td",{staticClass:"td1"},[t._v("图文标题:")]),t._v(" "),i("td",{staticClass:"td2"},[i("el-input",{attrs:{size:"small",clearable:""},model:{value:t.submitform.title,callback:function(e){t.$set(t.submitform,"title",e)},expression:"submitform.title"}})],1)]),t._v(" "),i("tr",[i("td",{staticClass:"td1"},[t._v("图文内容:")]),t._v(" "),i("td",{staticClass:"td2"},[i("div",{ref:"editor",staticStyle:{"text-align":"left"}},[i("div",{domProps:{innerHTML:t._s(t.article.contentHtml)}})])])]),t._v(" "),i("tr",[i("td",{staticClass:"td1"},[t._v("链接地址:")]),t._v(" "),i("td",{staticClass:"td2"},[i("el-input",{attrs:{size:"small",clearable:""},model:{value:t.submitform.url,callback:function(e){t.$set(t.submitform,"url",e)},expression:"submitform.url"}})],1)]),t._v(" "),i("tr",[i("td",{staticClass:"td1"},[t._v("是否是链接:")]),t._v(" "),i("td",{staticClass:"td2"},[i("el-radio",{attrs:{label:1},model:{value:t.submitform.resource,callback:function(e){t.$set(t.submitform,"resource",e)},expression:"submitform.resource"}},[t._v("是")]),t._v(" "),i("el-radio",{attrs:{label:0},model:{value:t.submitform.resource,callback:function(e){t.$set(t.submitform,"resource",e)},expression:"submitform.resource"}},[t._v("不是")])],1)]),t._v(" "),i("tr",[i("td",{staticClass:"td1"},[t._v("列表页图片:")]),t._v(" "),i("td",{staticClass:"td2 imgdw"},[i("div",{staticClass:"sctp"},[i("input",{staticClass:"upload",attrs:{id:"load",type:"file",accept:"image/*",value:"上传头像"},on:{change:function(e){return t.pushImg(e)}}}),t._v(" "),""==t.img?i("i",{staticClass:"el-icon-plus avatar-uploader-icon"}):i("img",{attrs:{src:t.img,alt:""}})])])]),t._v(" "),i("tr",[i("td"),t._v(" "),i("td",{staticClass:"td2"},[i("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.onSubmitClick}},[t._v("提交")]),t._v(" "),i("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.clone}},[t._v("返回")])],1)])])])],1)]),t._v(" "),i("div",{staticClass:"block"},[i("el-pagination",{attrs:{layout:"total, prev, pager, next, jumper",total:t.shujuData.num,"page-size":15},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var g=i("VU/8")(f,p,!1,function(t){i("Ynhe")},"data-v-fe2dabec",null);e.default=g.exports},Ynhe:function(t,e){}});
//# sourceMappingURL=10.8e74e2ef2a822ee292d8.js.map