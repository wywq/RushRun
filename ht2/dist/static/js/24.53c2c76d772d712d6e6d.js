webpackJsonp([24],{Y9ij:function(e,t){},"fO/l":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),i=a.n(r),l=a("exGp"),n=a.n(l),s=(a("oAV5"),a("nHSH")),o=(a("mtWM"),{data:function(){return{searchform:{sou:"",num:"",csid:"",gmid:""},qb:"",zhfl:[{value:"1",name:"等待付款",id:"1"},{value:"2",name:"确认付款",id:"2"},{value:"3",name:"确认收款",id:"3"},{value:"4",name:"撤销",id:"4"}],shujuData:"",tabletwoData:[],tu:!1,imgimg:"",dialogImageUrl:"",dialogVisible:!1,fits:[],xianshi:!1,tableoneData:[]}},created:function(){var e=this;return n()(i.a.mark(function t(){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.pipeList(1);case 1:case"end":return t.stop()}},t,e)}))()},methods:{getDate:function(e){var t=new Date(e);return t.getFullYear()+"-"+(t.getMonth()+1<10?"0"+(t.getMonth()+1):t.getMonth()+1)+"-"+(t.getDate()<10?"0"+t.getDate():t.getDate())+" "+(t.getHours()<10?"0"+t.getHours():t.getHours())+":"+(t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes())+":"+(t.getSeconds()<10?"0"+t.getSeconds():t.getSeconds())},pipeList:function(e){var t=this;return n()(i.a.mark(function a(){var r,l;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,s.a.pipeList({page:e,status:t.searchform.sou,order_number:t.searchform.num,give_user_id:t.searchform.csid,get_user_id:t.searchform.gmid});case 2:1==(r=a.sent).data.status?(t.shujuData=r.data.data,l=r.data.data.list.map(function(e,a){return""==e.matching_time?e.matching_time="--":e.matching_time=t.getDate(1e3*e.matching_time),""==e.complete?e.complete="--":e.complete=t.getDate(1e3*e.complete),""==e.confirm_give_time?e.confirm_give_time="--":e.confirm_give_time=t.getDate(1e3*e.confirm_give_time),""==e.confirm_get_time?e.confirm_get_time="--":e.confirm_get_time=t.getDate(1e3*e.confirm_get_time),e}),t.tabletwoData=l,t.$message.success(r.data.info)):(t.tabletwoData=r.data.data,t.$message.error(r.data.info));case 4:case"end":return a.stop()}},a,t)}))()},payClick:function(e){var t=this;return n()(i.a.mark(function a(){var r;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.xianshi=!0,a.next=3,s.a.getSellAndBugMember({matching_id:e.id});case 3:1==(r=a.sent).data.status&&(t.tableoneData=r.data.list,console.log(9,r.data.list.buy_user));case 5:case"end":return a.stop()}},a,t)}))()},clone:function(){this.xianshi=!1},delClick:function(e){var t=this;return n()(i.a.mark(function a(){var r;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,s.a.cexiao({matching_id:e.id});case 2:1==(r=a.sent).data.status?(t.pipeList(1),t.$message.success(r.data.info)):t.$message.error(r.data.info);case 4:case"end":return a.stop()}},a,t)}))()},lookClick:function(e){var t=this;return n()(i.a.mark(function a(){var r;return i.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t.tu=!0,a.next=3,s.a.voucher({order_id:e.order_id});case 3:1==(r=a.sent).data.status?(t.fits=r.data.data,t.$message.success(r.data.info)):t.$message.error(r.data.info);case 5:case"end":return a.stop()}},a,t)}))()},cloneClick:function(){this.tu=!1,this.fits=""},lookpic:function(e,t){var a=this;this.fits.map(function(t){return e.id==t.id&&(a.imgimg=t.pic),t});this.dialogImageUrl=this.fits.pic,console.log(258,this.fits.pic),this.dialogVisible=!0},onSearchClick:function(){this.pipeList(1)},handleCurrentChange:function(e){this.pipeList(e)}},mounted:function(){}}),c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"matching"},[a("el-form",{staticClass:"searchform",attrs:{inline:!0,model:e.searchform}},[a("el-form-item",{attrs:{label:"搜索指向:"}},[a("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择"},model:{value:e.searchform.sou,callback:function(t){e.$set(e.searchform,"sou",t)},expression:"searchform.sou"}},[a("el-option",{key:"",attrs:{label:"全部",value:e.qb}}),e._v(" "),e._l(e.zhfl,function(e){return a("el-option",{key:e.value,attrs:{label:e.name,value:e.id}})})],2),e._v(" "),a("el-form-item",{attrs:{label:"订单号:"}},[a("el-input",{attrs:{placeholder:"关键字"},model:{value:e.searchform.num,callback:function(t){e.$set(e.searchform,"num",t)},expression:"searchform.num"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"出售用户id:"}},[a("el-input",{attrs:{placeholder:"关键字"},model:{value:e.searchform.csid,callback:function(t){e.$set(e.searchform,"csid",t)},expression:"searchform.csid"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"购买用户id:"}},[a("el-input",{attrs:{placeholder:"关键字"},model:{value:e.searchform.gmid,callback:function(t){e.$set(e.searchform,"gmid",t)},expression:"searchform.gmid"}})],1)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.onSearchClick}},[e._v("搜索")])],1)],1),e._v(" "),a("el-table",{staticStyle:{"margin-top":"10px"},attrs:{data:e.tabletwoData,"header-cell-style":{background:"#F9F9F9",color:"#606266"},border:""}},[a("el-table-column",{attrs:{label:"订单ID",prop:"order_id",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"订单号",prop:"order_number",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"出售用户id",prop:"give_user_id",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"出售用户名称",prop:"give_user_name",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"购买用户id",prop:"get_user_id",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"购买用户名称",prop:"get_user_name",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"匹配时间",prop:"matching_time",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"订单状态",prop:"status",resizable:!1,align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?a("div",{attrs:{type:"primary"}},[e._v("等待付款")]):e._e(),e._v(" "),2==t.row.status?a("div",{attrs:{type:"primary"}},[e._v("确认付款")]):e._e(),e._v(" "),3==t.row.status?a("div",{attrs:{type:"primary"}},[e._v("确认收款")]):e._e(),e._v(" "),4==t.row.status?a("div",{attrs:{type:"primary"}},[e._v("撤销")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"是否确认打款",prop:"whether_give",resizable:!1,align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.whether_give?a("div",{attrs:{type:"primary"}},[e._v("未确认")]):e._e(),e._v(" "),1==t.row.whether_give?a("div",{attrs:{type:"primary"}},[e._v("已确认")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"确认付款时间",prop:"confirm_give_time",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"是否确认收款",prop:"whether_get",resizable:!1,align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.whether_get?a("div",{attrs:{type:"primary"}},[e._v("未确认")]):e._e(),e._v(" "),1==t.row.whether_get?a("div",{attrs:{type:"primary"}},[e._v("已确认")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"确认收款时间",prop:"confirm_get_time",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"完成时间",prop:"complete",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"单价",prop:"price",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"出售数量",prop:"num",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"交易的手续费",prop:"shouxufei",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{staticClass:"elcolumn",attrs:{label:"操作",prop:"content",align:"center",fixed:"right",width:"350px"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small"},on:{click:function(a){return e.lookClick(t.row)}}},[e._v("查看凭证")]),e._v(" "),a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small"},on:{click:function(a){return e.payClick(t.row)}}},[e._v("查看用户支付信息")]),e._v(" "),1==t.row.status||2==t.row.status?a("el-button",{staticStyle:{"margin-left":"10px"},attrs:{type:"primary",size:"small"},on:{click:function(a){return e.delClick(t.row)}}},[e._v("撤销")]):e._e()]}}])})],1),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.tu,expression:"tu"}],staticClass:"mark"},[a("div",{staticClass:"mark-content "},[a("el-button",{staticStyle:{margin:"20px 0 20px 90%"},attrs:{type:"primary",size:"small"},on:{click:e.cloneClick}},[e._v("返回")]),e._v(" "),a("div",{staticClass:"tan_box"},e._l(e.fits,function(t,r){return a("div",{key:r,staticClass:"tan ",staticStyle:{margin:"10px 10px"},on:{click:function(a){return e.lookpic(t,r)}}},[a("img",{staticStyle:{width:"200px",height:"200px"},attrs:{src:t.pic,alt:""}})])}),0)],1)]),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:e.xianshi,expression:"xianshi"}],staticClass:"mark"},[a("div",{staticClass:"mark-content"},[a("div",{staticClass:"hytj"},[e._v("用户支付信息")]),e._v(" "),a("el-table",{staticStyle:{"margin-top":"10px"},attrs:{data:e.tableoneData,"header-cell-style":{background:"#F9F9F9",color:"#606266"},border:""}},[a("el-table-column",{attrs:{label:"买卖双方",prop:"type",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"真实姓名",prop:"realname",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"身份证",prop:"idcard",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"手机",prop:"mobile",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"支付宝",prop:"zhifubao",resizable:!1,align:"center"}}),e._v(" "),a("el-table-column",{attrs:{label:"是否实名",prop:"is_renzhen",resizable:!1,align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.is_renzhen?a("div",{attrs:{type:"primary"}},[e._v("未实名")]):e._e(),e._v(" "),1==t.row.is_renzhen?a("div",{attrs:{type:"primary"}},[e._v("已实名")]):e._e()]}}])})],1),e._v(" "),a("el-button",{staticClass:"fanhui",staticStyle:{margin:"20px 0 0 48%"},attrs:{type:"primary",size:"small"},on:{click:e.clone}},[e._v("返回")])],1)]),e._v(" "),a("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[a("img",{attrs:{width:"50%",src:e.imgimg}})]),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{layout:"total, prev, pager, next, jumper",total:e.shujuData.num,"page-size":20},on:{"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]};var u=a("VU/8")(o,c,!1,function(e){a("Y9ij")},"data-v-65041664",null);t.default=u.exports}});
//# sourceMappingURL=24.53c2c76d772d712d6e6d.js.map