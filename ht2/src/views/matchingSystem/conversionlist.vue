<template>
	<div class="conversionlist">
		<el-form :inline="true" :model="searchform" class="searchform">
			<el-form-item label="搜索指向:">
				<el-select v-model="searchform.sou" placeholder="请选择" style="width:150px">
					<el-option key="" label="全部" :value="qb"></el-option>
					<el-option v-for="item in zhfl" :key="item.value" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="搜索订单状态:">
				<el-select v-model="searchform.ztz" placeholder="请选择" style="width:150px">
					<el-option key="" label="全部" :value="qt"></el-option>
					<el-option v-for="item in zt" :key="item.value" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearchClick">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="订单ID" prop="order_id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="单价" prop="price" :resizable="false" align="center" >
			</el-table-column>
			<el-table-column label="订单类型" prop="type" :resizable="false" align="center" width="160px">
				<template slot-scope="scope">
					<div type="primary" v-if="scope.row.type == 1">需求</div>
					<div type="primary" v-if="scope.row.type == 2">转让</div>
				</template>
			</el-table-column>
			<el-table-column label="数量" prop="num"  :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="提交时间" prop="addtime" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="订单状态" prop="status" :resizable="false" align="center" width="160px">
				<template slot-scope="scope">
					<div type="primary" v-if="scope.row.status == 1">我的挂单</div>
					<div type="primary" v-if="scope.row.status == 2">已匹配</div>
					<div type="primary" v-if="scope.row.status == 4">已完成</div>
					<div type="primary" v-if="scope.row.status == 5">撤销</div>
				</template>
			</el-table-column>
		<!-- 	<el-table-column label="用户ID" prop="user_id" :resizable="false" align="center">
			</el-table-column> -->
			<el-table-column label="用户名" prop="user_name" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="操作" prop="content" class="elcolumn" align="center" fixed="right" width="300px">
				<template slot-scope="scope" prop="xg">
					<el-button type="primary" @click="modifyClick(scope.row)" size="small" style="margin-left:10px;" >查看详情</el-button>
					<!-- <el-button type="primary" @click="lookClick(scope.row)" size="small" style="margin-left:10px;" >查看凭证</el-button> -->
				</template>
			</el-table-column>
		</el-table>
		<!-- 查看详情弹窗 -->
		<div class="mark" v-show="xianshi">
			<div class="mark-content">
				<div class="hytj">查看详情</div>
				<el-table :data="tableoneData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
					<el-table-column label="单价" prop="price" :resizable="false" align="center" >
					</el-table-column>
					<el-table-column label="订单类型" prop="type" :resizable="false" align="center">
						<template slot-scope="scope">
							<div type="primary" v-if="scope.row.type == 1">需求</div>
							<div type="primary" v-if="scope.row.type == 2">转让</div>
						</template>
					</el-table-column>
					<el-table-column label="数量" prop="num"  :resizable="false" align="center">
					</el-table-column>
					<el-table-column label="匹配时间" prop="matching_time" :resizable="false" align="center" width="120px">
					</el-table-column>
					<el-table-column label="是否确认收款" prop="whether_get" :resizable="false" align="center">
						<template slot-scope="scope">
							<div type="primary" v-if="scope.row.whether_get == 0">未确认</div>
							<div type="primary" v-if="scope.row.whether_get == 1">已确认</div>
						</template>
					</el-table-column>
					<el-table-column label="订单号" prop="order_number" :resizable="false" align="center">
					</el-table-column>
					<el-table-column label="出售用户id" prop="give_user_id" :resizable="false" align="center">
					</el-table-column>
					<el-table-column label="出售用户昵称" prop="nickname" :resizable="false" align="center" width="180px;">
					</el-table-column>
					<el-table-column label="购买用户id" prop="get_user_id" :resizable="false" align="center">
					</el-table-column>
					<el-table-column label="购买用户昵称" prop="get_user_name" :resizable="false" align="center">
					</el-table-column>
					<el-table-column label="完成时间" prop="complete" :resizable="false" align="center" width="120px">
						<template slot-scope="scope">
							<div type="primary" v-if="scope.row.complete == '' ">--</div>
							<div type="primary" v-else>{{scope.row.complete}}</div>
						</template>
					</el-table-column>
					<el-table-column label="银行卡号" prop="bank_card" :resizable="false" align="center" width="180px">
					</el-table-column>
					<el-table-column label="支付宝账号" prop="zhifubao" :resizable="false" align="center" width="120px">
					</el-table-column>
					<el-table-column label="微信账号" prop="weixin" :resizable="false" align="center" width="120px">
					</el-table-column>
				</el-table>
					<el-button type="primary" @click="clone" size="small" class="fanhui">返回</el-button>
			</div>		
		</div>
		<div class="mark" v-show="tu">
			<div class="mark-content ">
				<el-button type="primary" @click="cloneClick" size="small" style="margin:20px 0 20px 90%;">返回</el-button>
				<div class="tan_box">
					<div class="tan " v-for="(item,index) in fits" :key="index" style="margin:10px 10px;" @click="lookpic(item,index)">
						<!-- <el-image style="width: 100px; height: 100px" :src="img_url + item.pic" ></el-image> -->
						<img :src="item.pic" alt="" style="width:200px;height:200px;">
					</div>
				</div>
			</div>
		</div>
		<!-- 图片放大 -->
		<el-dialog :visible.sync="dialogVisible">
			<img width="50%" :src="imgimg">
		</el-dialog>
		<!-- 分页 -->
		<div class="block">
			<el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="shujuData.num"
			 :page-size="20">
			</el-pagination>
		</div>
	</div>
</template>

<script>
		import util from '@/utils/utils.js'
	import service from '@/service/service.js'
	import axios from 'axios'
	export default {
		data() {
			return {
				tu:false,
				img_url:this.img_url,
				is_show:false,
				searchform:{
					sou:'',
					ztz:''
				},
				xianshi:false,
				tabletwoData:[],
				shujuData:'',
				show:false,
				id:'',
				tableoneData:[],
				zhfl:[
					{ value: '1',name: '需求',id:"1"},
					{ value: '2',name: '转让',id:"2"}
				],
				options:[],
				qb:'',
				fits: [],
				zt:[
					{ value: '1',name: '我的挂单',id:"1"},
					{ value: '2',name: '已匹配',id:"2"},
					{ value: '4',name: '已完成',id:"4"},
					{ value: '5',name: '撤销',id:"5"},
				],
				qt:'',
				imgimg:'',
				dialogImageUrl: '',
				dialogVisible: false,
			}
		},
		async created() {
			
			this.transformation(1)
		},
		methods: {
			//搜索
			onSearchClick(){
				this.transformation(1)
			},
			//转换成时间对象
			getDate(tm) {
				let date = new Date(tm);
				let year = date.getFullYear();
				let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				let time = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				let hours = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())
				let fen = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
				let miao = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
				let tt = year + '-' + month + '-' + time + ' ' + hours + ':' + fen + ":" + miao;
				return tt;
			},
			async transformation(page,row){
				const transformation = await service.transformation({
					page:page,
					type:this.searchform.sou,
					status:this.searchform.ztz
				})
				if(transformation.data.status==1){
					this.shujuData = transformation.data.data
					const tabletwoData = transformation.data.data.list.map((item, index) => {
						item.addtime = this.getDate(item.add_time * 1000)
						item.complete = this.getDate(item.complete * 1000)
						return item
					})
					this.tabletwoData = tabletwoData
				}else{
					this.tabletwoData = []
					this.$message.error(transformation.data.info);
				}
			},
			//查看等级列表
			async lookClick(row){
				this.tu =true
				const voucher = await service.voucher({
					order_id: row.order_id
				})
				if (voucher.data.status == 1) {
					// this.dialogImageUrl = this.img_url + row.buy_img;
					// this.dialogVisible = true;
					this.fits = voucher.data.data
					this.$message.success(voucher.data.info);
				}else{
					this.$message.error(voucher.data.info);
				}
			},
			//查看凭证返回
			cloneClick(){
				this.tu = false
				this.fits = ''
			},
			//返回
			fanhui(){
				this.is_show =false
			},
			//点击查看详情
			async modifyClick(row){
				this.xianshi = true
				const conversionDetails = await service.conversionDetails({
					order_id:row.order_id
				})
				if(conversionDetails.data.status==1){
					const tableoneData = conversionDetails.data.data.list.map((item, index) =>{
						if(item.matching_time == ''){
							item.matching_time = '--'
						}else{
							item.matching_time = this.getDate(item.matching_time * 1000)
						}
						if(item.complete == ''){
							item.complete = '--'
						}else{
							item.complete = this.getDate(item.complete * 1000)
						}
						return item
					})
					this.tableoneData = tableoneData
				}
			},
			//返回
			clone(){
				this.xianshi = false
			},
			//图片放大
			lookpic(item1,index1){
				const cc = this.fits.map((item)=>{
					if(item1.id == item.id){
						this.imgimg = item.pic
					}
					return item
				})
				this.dialogImageUrl = this.fits.pic ;
				console.log(258,this.fits.pic)
				this.dialogVisible = true;
			},
			// 分页
			handleCurrentChange(val) {
				this.transformation(val)
			},
			
		},
		mounted() {}
	}
</script>

<style scoped> 
	.block {
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
		.scope-img {
		width: 60px;
		height: 60px;
	}
	.mark {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		padding-left: -20px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.mark-content {
		width: 70%;
		height: 80%;
		background: #f0f2f5;
		overflow: auto;
	}
	
	.hytj {
		color: #666666;
		padding: 15px 0;
		text-align: center;
		border-bottom: 1px solid #D7D7D7;
		font-size: 28px;
	
	}
	.submitform {
		margin: 15px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.submitform .el-input {
		margin-right: 10px;
		width: 270px;
		float: left;
		display: flex;
		align-items: center;
		height: 100%;
	}
	
	tr {
		height: 50px;
		width: 100%;
		border: 1px lightgray dashed;
	}
	
	.td1 {
		width:30%;
		text-align: center;
		padding-top:70px;
	}
	
	.td2 {
		padding-left: 10px;
		width:70%;
	}
	.imgdw {
		position: relative;
		height: 150px;
		width: 150px;
	}
	#load {
		width: 112px;
		height: 112px;
		position: absolute;
		top: 0;
		opacity: 0;
		z-index: 999;
	}
	
	.sctp {
		width: 150px;
		height: 150px;
		position: absolute;
		top: 0;
		z-index: 1;
		font-size: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.sctp img {
		width: 112px;
		height: 112px;
	}
	.fanhui{
		margin:20px 0 0 48%;
	}
	.tan{
		width:200px;
		height:200px;
		background: #000000;
	}
	.tan_box{
		width:90%;
		height:200px;
		margin:0 auto;
		display: flex;
		flex-wrap: wrap;
		justify-content:flex-start;
	}
</style>
