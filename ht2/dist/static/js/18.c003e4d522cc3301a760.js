webpackJsonp([18],{"8MER":function(t,e){},caOw:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Xxa5"),r=a.n(s),n=a("exGp"),i=a.n(n),o=a("oAV5"),c=a("nHSH"),u=a("sYY+"),l=a.n(u),m={data:function(){return{show:!1,submitform:{title:"",content:"",resource:""},type:1,tabletwoData:[],shujuData:"",id:"",article:{contentHtml:""},editor:""}},created:function(){var t=this;return i()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.question(1);case 1:case"end":return e.stop()}},e,t)}))()},methods:{getDate:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate())+" "+(e.getHours()<10?"0"+e.getHours():e.getHours())+":"+(e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":"+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())},question:function(t){var e=this;return i()(r.a.mark(function a(){var s,n;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,c.a.question({page:t});case 2:1==(s=a.sent).data.status?(e.shujuData=s.data.data,n=s.data.data.list.map(function(t,a){return t.addtime=e.getDate(1e3*t.time),t}),e.tabletwoData=n,e.shujuData=s.data.data):(e.tabletwoData=[],e.$message.error(s.data.info));case 4:case"end":return a.stop()}},a,e)}))()},onSubmitClick:function(t){var e=this;return i()(r.a.mark(function t(){var a,s;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(1!=e.type){t.next=5;break}return t.next=3,c.a.addQuestion({title:e.submitform.title,is_show:e.submitform.resource,content:e.editor.txt.html(),id:""});case 3:1==(a=t.sent).data.status?(e.$message.success("添加成功"),e.question(),e.show=!1,e.submitform.title="",e.submitform.resource="",e.editor.txt.html("")):e.$message.error(a.data.info);case 5:if(2!=e.type){t.next=10;break}return t.next=8,c.a.addQuestion({title:e.submitform.title,is_show:e.submitform.resource,content:e.editor.txt.html(),id:e.id});case 8:1==(s=t.sent).data.status?(e.$message.success("修改成功"),e.question(),e.show=!1,e.submitform.title="",e.submitform.resource="",e.editor.txt.html("")):e.$message.error(s.data.info);case 10:case"end":return t.stop()}},t,e)}))()},clone:function(){this.show=!1,this.submitform.title="",this.submitform.resource="",this.editor.txt.html("")},addMerberClick:function(){var t=this;return i()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t.show=!0,t.type=1;case 2:case"end":return e.stop()}},e,t)}))()},modifyClick:function(t){var e=this;return i()(r.a.mark(function a(){return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:e.show=!0,e.submitform.title=t.title,e.submitform.resource=t.is_show,e.article.contentHtml=t.content,e.editor.txt.html(e.article.contentHtml),e.type=2,e.id=t.id;case 7:case"end":return a.stop()}},a,e)}))()},delClick:function(t){var e=this;this.$confirm("是否继续删除?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(i()(r.a.mark(function a(){return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,c.a.delQuestion({token:o.a.getCookie("token"),id:t.id});case 2:1==a.sent.data.status&&e.$message.success("删除成功"),e.question();case 5:case"end":return a.stop()}},a,e)}))).catch(function(){e.$message({type:"info",message:"已取消删除"})})},handleCurrentChange:function(t){this.question(t)}},mounted:function(){var t=this,e=new l.a(this.$refs.editor);this.editor=e,e.customConfig.uploadImgParamsWithUrl=!0,e.customConfig.uploadImgServer="/admin/bank/uploadPic",e.customConfig.uploadImgMaxSize=3145728,e.customConfig.uploadImgMaxLength=5,e.customConfig.uploadFileName="pic",e.customConfig.uploadImgParams={token:o.a.getCookie("token")},e.customConfig.uploadImgHooks={success:function(t,e,a){},fail:function(t,e,a){},error:function(t,e){},timeout:function(t,e){},customInsert:function(e,a,s){e(r=t.img_url+a.data),s.txt.img(r),s.txt.html(n);var r=s.txt.img(),n=s.txt.html()}},e.create()}},d={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"commonProblem"},[a("el-button",{attrs:{type:"primary"},on:{click:t.addMerberClick}},[t._v("添加常见问题")]),t._v(" "),a("el-table",{staticStyle:{"margin-top":"10px"},attrs:{data:t.tabletwoData,"header-cell-style":{background:"#F9F9F9",color:"#606266"},border:""}},[a("el-table-column",{attrs:{label:"问题ID",prop:"id",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"名称",prop:"title",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"添加时间",prop:"addtime",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",prop:"is_show",resizable:!1,align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.is_show?a("div",{attrs:{type:"primary"}},[t._v("未显示在首页")]):t._e(),t._v(" "),1==e.row.is_show?a("div",{attrs:{type:"primary"}},[t._v("显示在首页")]):t._e()]}}])}),t._v(" "),a("el-table-column",{staticClass:"elcolumn",attrs:{label:"操作",align:"center",fixed:"right",width:"300px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small"},on:{click:function(a){return t.modifyClick(e.row)}}},[t._v("修改信息")]),t._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small"},on:{click:function(a){return t.delClick(e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"mark"},[a("div",{staticClass:"mark-content"},[a("div",{staticClass:"hytj"},[t._v("添加常见问题")]),t._v(" "),a("el-form",{staticClass:"submitform",attrs:{model:t.submitform}},[a("table",{staticStyle:{width:"90%",height:"80px",border:"1px dashed #000",background:"#F9F9F9"},attrs:{rules:"all"}},[a("tr",[a("td",{staticClass:"td1"},[t._v("问题名称:")]),t._v(" "),a("td",{staticClass:"td2"},[a("el-input",{attrs:{size:"small",clearable:""},model:{value:t.submitform.title,callback:function(e){t.$set(t.submitform,"title",e)},expression:"submitform.title"}})],1)]),t._v(" "),a("tr",[a("td",{staticClass:"td1"},[t._v("是否显示在首页:")]),t._v(" "),a("td",{staticClass:"td2"},[a("el-radio",{attrs:{label:1},model:{value:t.submitform.resource,callback:function(e){t.$set(t.submitform,"resource",e)},expression:"submitform.resource"}},[t._v("显示在首页")]),t._v(" "),a("el-radio",{attrs:{label:0},model:{value:t.submitform.resource,callback:function(e){t.$set(t.submitform,"resource",e)},expression:"submitform.resource"}},[t._v("未显示在首页")])],1)]),t._v(" "),a("tr",[a("td",{staticClass:"td1"},[t._v("问题答案:")]),t._v(" "),a("td",{staticClass:"td2"},[a("div",{ref:"editor",staticStyle:{"text-align":"left"}},[a("div",{domProps:{innerHTML:t._s(t.article.contentHtml)}})])])]),t._v(" "),a("tr",[a("td"),t._v(" "),a("td",{staticClass:"td2"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.onSubmitClick}},[t._v("提交")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.clone}},[t._v("返回")])],1)])])])],1)]),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{layout:"total, prev, pager, next, jumper",total:t.shujuData.num,"page-size":15},on:{"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var f=a("VU/8")(m,d,!1,function(t){a("8MER")},"data-v-7e64e09c",null);e.default=f.exports}});
//# sourceMappingURL=18.c003e4d522cc3301a760.js.map