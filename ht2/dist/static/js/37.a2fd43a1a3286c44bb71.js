webpackJsonp([37],{"C+/k":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("Xxa5"),r=a.n(n),s=a("exGp"),i=a.n(s),l=(a("oAV5"),a("nHSH")),o=(a("mtWM"),{name:"memberList",data:function(){return{img_url:this.img_url,tu:!1,tabletwoData:[],shujuData:"",dialogImageUrl:"",dialogVisible:!1,fits:[],zhfl:[],searchform:{sou:""},qb:"",imgimg:"",show:!1,submitform:{content:""},huifu:"",dingd:!1,tableoneData:[],confirm_get_time:"",complete:""}},created:function(){var t=this;return i()(r.a.mark(function e(){var a;return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t.getUserComplaints(1),e.next=3,l.a.fankuiType();case 3:1==(a=e.sent).data.status&&(t.zhfl=a.data.data);case 5:case"end":return e.stop()}},e,t)}))()},methods:{getDate:function(t){var e=new Date(t);return e.getFullYear()+"-"+(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-"+(e.getDate()<10?"0"+e.getDate():e.getDate())+" "+(e.getHours()<10?"0"+e.getHours():e.getHours())+":"+(e.getMinutes()<10?"0"+e.getMinutes():e.getMinutes())+":"+(e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds())},getUserComplaints:function(t){var e=this;return i()(r.a.mark(function a(){var n,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,l.a.getUserComplaints({page:t,type:e.searchform.sou});case 2:1==(n=a.sent).data.status?(e.shujuData=n.data.data,s=n.data.data.list.map(function(t,a){return t.add_time=e.getDate(1e3*t.add_time),t}),console.log(888,e.shujuData),e.tabletwoData=s,e.$message.success(n.data.info)):(e.shujuData=n.data.data,e.$message.error(n.data.info),e.tabletwoData=n.data.data);case 4:case"end":return a.stop()}},a,e)}))()},replyClick:function(t){this.show=!0,this.id=t.id,this.submitform.content=t.huifu,this.huifu=t.is_huifu,console.log(this.huifu)},delClick:function(t){var e=this;return i()(r.a.mark(function a(){var n;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,l.a.delFankui({id:t.id});case 2:1==(n=a.sent).data.status?(e.$message.success(n.data.info),e.getUserComplaints(1)):e.$message.error(n.data.info);case 4:case"end":return a.stop()}},a,e)}))()},onSubmitClick:function(t){var e=this;return i()(r.a.mark(function t(){var a;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,l.a.huifuFankui({id:e.id,huifu:e.submitform.content});case 2:1==(a=t.sent).data.status?(e.$message.success(a.data.info),e.show=!1,e.getUserComplaints(1)):e.$message.error(a.data.info);case 4:case"end":return t.stop()}},t,e)}))()},clone:function(){this.show=!1,this.dingd=!1},cloneClick:function(){this.fits="",this.tu=!1},handleCurrentChange:function(t){this.getUserComplaints(t)},lookClick:function(t){var e=this;return i()(r.a.mark(function a(){var n;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.tu=!0,a.next=3,l.a.vouchers({id:t.id});case 3:1==(n=a.sent).data.status&&(e.fits=n.data.data),e.getUserComplaints(1);case 6:case"end":return a.stop()}},a,e)}))()},lookpic:function(t,e){var a=this;this.fits.map(function(e){return t.id==e.id&&(a.imgimg=e.pic),e});this.dialogImageUrl=this.fits.pic,console.log(258,this.fits.pic),this.dialogVisible=!0},clearImgInfoClick:function(t){var e=this;this.$confirm("是否清除凭证?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(i()(r.a.mark(function a(){return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,l.a.clearImgInfo({id:t.id});case 2:1==a.sent.data.status&&(e.$message.success("清除凭证成功"),e.getUserComplaints(1));case 4:case"end":return a.stop()}},a,e)}))).catch(function(){e.$message({type:"info",message:"已取消清除凭证"})})},chakanClick:function(t){var e=this;return i()(r.a.mark(function a(){var n,s;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e.dingd=!0,a.next=3,l.a.chakanOrder({order_id:t.order_id});case 3:1==(n=a.sent).data.status?(s=n.data.data.map(function(t,a){return t.confirm_get_time=e.getDate(1e3*t.confirm_get_time),t.complete=e.getDate(1e3*t.complete),t.matching_time=e.getDate(1e3*t.matching_time),t.confirm_give_time=e.getDate(1e3*t.confirm_give_time),t}),e.tableoneData=s,console.log(789,e.tableoneData),e.$message.success(n.data.info)):(e.tableoneData=n.data.data,e.$message.error(n.data.info));case 5:case"end":return a.stop()}},a,e)}))()},onSearchClick:function(){this.getUserComplaints(1)}}}),c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-form",{staticClass:"searchform",attrs:{inline:!0,model:t.searchform}},[a("el-form-item",{attrs:{label:"搜索指向:"}},[a("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择"},model:{value:t.searchform.sou,callback:function(e){t.$set(t.searchform,"sou",e)},expression:"searchform.sou"}},[a("el-option",{key:"",attrs:{label:"全部",value:t.qb}}),t._v(" "),t._l(t.zhfl,function(t){return a("el-option",{key:t.value,attrs:{label:t.name,value:t.id}})})],2)],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:t.onSearchClick}},[t._v("搜索")])],1)],1),t._v(" "),a("el-table",{staticStyle:{"margin-top":"10px"},attrs:{data:t.tabletwoData,"header-cell-style":{background:"#F9F9F9",color:"#606266"},border:""}},[a("el-table-column",{attrs:{label:"账号",prop:"mobile",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"姓名",prop:"xingming",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"手机号码",prop:"phone",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"身份证",prop:"shenfenzheng",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"问题类型",prop:"fankui_type",resizable:!1,align:"center",width:"160px"}}),t._v(" "),a("el-table-column",{attrs:{label:"反馈内容",prop:"content",resizable:!1,align:"center",width:"400px;"}}),t._v(" "),a("el-table-column",{attrs:{label:"是否回复反馈",prop:"is_huifu",resizable:!1,align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.is_huifu?a("div",[t._v("否")]):t._e(),t._v(" "),1==e.row.is_huifu?a("div",[t._v("是")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",resizable:!1,align:"center",width:"400px"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return t.replyClick(e.row)}}},[t._v("回复反馈")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:function(a){return t.delClick(e.row)}}},[t._v("删除反馈")])]}}])})],1),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{layout:"total, prev, pager, next, jumper",total:t.shujuData.num,"page-size":15},on:{"current-change":t.handleCurrentChange}})],1),t._v(" "),a("el-dialog",{attrs:{visible:t.dialogVisible},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("img",{attrs:{width:"50%",src:t.imgimg}})]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],staticClass:"mark"},[a("div",{staticClass:"mark-content"},[a("div",{staticClass:"hytj"},[t._v("回复反馈")]),t._v(" "),a("el-form",{staticClass:"submitform",attrs:{model:t.submitform}},[a("table",{staticStyle:{width:"90%",height:"80px",border:"1px dashed #000",background:"#F9F9F9"},attrs:{rules:"all"}},[a("tr",{staticStyle:{background:"#EEEEEE"}},[a("td",{staticStyle:{"text-align":"center"}},[t._v("名称")]),t._v(" "),a("td",{staticStyle:{"text-align":"center"}},[t._v("内容")])]),t._v(" "),a("tr",[a("td",{staticClass:"td1"},[t._v("回复反馈:")]),t._v(" "),0==t.huifu?a("td",{staticClass:"td2"},[a("el-input",{attrs:{type:"input",size:"small",clearable:""},model:{value:t.submitform.content,callback:function(e){t.$set(t.submitform,"content",e)},expression:"submitform.content"}})],1):t._e(),t._v(" "),1==t.huifu?a("td",{staticClass:"td2"},[a("el-input",{attrs:{type:"input",size:"small",clearable:"",disabled:!0},model:{value:t.submitform.content,callback:function(e){t.$set(t.submitform,"content",e)},expression:"submitform.content"}})],1):t._e()]),t._v(" "),a("tr",[a("td"),t._v(" "),a("td",{staticClass:"td2"},[a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.onSubmitClick}},[t._v("提交")]),t._v(" "),a("el-button",{attrs:{type:"primary",size:"small"},on:{click:t.clone}},[t._v("返回")])],1)])])])],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.dingd,expression:"dingd"}],staticClass:"mark"},[a("div",{staticClass:"mark-content"},[a("div",{staticClass:"hytj"},[t._v("查看订单")]),t._v(" "),a("el-table",{staticStyle:{"margin-top":"10px"},attrs:{data:t.tableoneData,"header-cell-style":{background:"#F9F9F9",color:"#606266"},border:""}},[a("el-table-column",{attrs:{label:"出售用户",prop:"give_user_name",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"购买用户",prop:"get_user_name",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"匹配时间",prop:"matching_time",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"确认付款时间",prop:"confirm_give_time",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"状态",prop:"status",resizable:!1,align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?a("div",[t._v("等待付款")]):t._e(),t._v(" "),2==e.row.status?a("div",[t._v("确认付款")]):t._e(),t._v(" "),3==e.row.status?a("div",[t._v("确认收款")]):t._e(),t._v(" "),4==e.row.status?a("div",[t._v("撤销")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"是否确认打款",prop:"whether_give",resizable:!1,align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.whether_give?a("div",[t._v("未确认")]):t._e(),t._v(" "),1==e.row.whether_give?a("div",[t._v("已确认")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"是否确认收款",prop:"whether_get",resizable:!1,align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[0==e.row.whether_get?a("div",[t._v("未确认")]):t._e(),t._v(" "),1==e.row.whether_get?a("div",[t._v("已确认")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"确认收款时间",prop:"confirm_get_time",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"完成时间",prop:"complete",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"单价",prop:"price",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"出售数量",prop:"num",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"订单号",prop:"order_number",resizable:!1,align:"center"}}),t._v(" "),a("el-table-column",{attrs:{label:"交易的手续费",prop:"shouxufei",resizable:!1,align:"center"}})],1),t._v(" "),a("el-button",{staticStyle:{margin:"20px 0 0 48%"},attrs:{type:"primary",size:"small"},on:{click:t.clone}},[t._v("返回")])],1)]),t._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.tu,expression:"tu"}],staticClass:"mark"},[a("div",{staticClass:"mark-content "},[a("el-button",{staticStyle:{margin:"20px 0 20px 90%"},attrs:{type:"primary",size:"small"},on:{click:t.cloneClick}},[t._v("返回")]),t._v(" "),a("div",{staticClass:"tan_box"},t._l(t.fits,function(e,n){return a("div",{key:n,staticClass:"tan ",staticStyle:{margin:"10px 10px"},on:{click:function(a){return t.lookpic(e,n)}}},[a("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:e.pic,alt:""}})])}),0)],1)])],1)},staticRenderFns:[]};var u=a("VU/8")(o,c,!1,function(t){a("tHHH")},"data-v-2dd0791e",null);e.default=u.exports},tHHH:function(t,e){}});
//# sourceMappingURL=37.a2fd43a1a3286c44bb71.js.map