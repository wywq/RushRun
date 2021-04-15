<template>
	<div class="matching">
		<el-form :inline="true" :model="searchform" class="searchform">
			<el-form-item label="搜索指向:">
				<el-select v-model="searchform.sou" placeholder="请选择" style="width:150px">
					<el-option key="" label="全部" :value="qb"></el-option>
					<el-option v-for="item in zhfl" :key="item.value" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
				<el-form-item label="订单号:">
					<el-input v-model="searchform.num" placeholder="关键字"></el-input>
				</el-form-item>
				<el-form-item label="出售用户id:">
					<el-input v-model="searchform.csid" placeholder="关键字"></el-input>
				</el-form-item>
				<el-form-item label="购买用户id:">
					<el-input v-model="searchform.gmid" placeholder="关键字"></el-input>
				</el-form-item>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearchClick">搜索</el-button>
			</el-form-item>
		</el-form>
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="订单ID" prop="order_id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="订单号" prop="order_number"  :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="出售用户id" prop="give_user_id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="出售用户名称" prop="give_user_name" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="购买用户id" prop="get_user_id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="购买用户名称" prop="get_user_name" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="匹配时间" prop="matching_time" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="订单状态" prop="status" :resizable="false" align="center">
				<template slot-scope="scope">
					<div type="primary" v-if="scope.row.status == 1">等待付款</div>
					<div type="primary" v-if="scope.row.status == 2">确认付款</div>
					<div type="primary" v-if="scope.row.status == 3">确认收款</div>
					<div type="primary" v-if="scope.row.status == 4">撤销</div>
				</template>
			</el-table-column>
			<el-table-column label="是否确认打款" prop="whether_give" :resizable="false" align="center">
				<template slot-scope="scope">
					<div type="primary" v-if="scope.row.whether_give == 0">未确认</div>
					<div type="primary" v-if="scope.row.whether_give == 1">已确认</div>
				</template>
			</el-table-column>
			<el-table-column label="确认付款时间" prop="confirm_give_time" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="是否确认收款" prop="whether_get" :resizable="false" align="center">
				<template slot-scope="scope">
					<div type="primary" v-if="scope.row.whether_get == 0">未确认</div>
					<div type="primary" v-if="scope.row.whether_get == 1">已确认</div>
				</template>
			</el-table-column>
			<el-table-column label="确认收款时间" prop="confirm_get_time" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="完成时间" prop="complete" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="单价" prop="price" :resizable="false" align="center" >
			</el-table-column>
			<el-table-column label="出售数量" prop="num"  :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="交易的手续费" prop="shouxufei" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="操作" prop="content" class="elcolumn" align="center" fixed="right" width="350px">
				<template slot-scope="scope" prop="xg">
					<el-button type="primary" @click="lookClick(scope.row)" size="small" style="margin-left:10px;" >查看凭证</el-button>
					<el-button type="primary" @click="payClick(scope.row)" size="small" style="margin-left:10px;" >查看用户支付信息</el-button>
					<el-button type="primary" @click="delClick(scope.row)" size="small" style="margin-left:10px;" v-if="scope.row.status == 1 || scope.row.status == 2">撤销</el-button>
				</template>
			</el-table-column>
		</el-table>
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
		<div class="mark" v-show="xianshi">
			<div class="mark-content">
				<div class="hytj">用户支付信息</div>
				<el-table :data="tableoneData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
					<el-table-column label="买卖双方" prop="type" :resizable="false" align="center">
					</el-table-column>
					<el-table-column label="真实姓名" prop="realname" :resizable="false" align="center">
					</el-table-column>
					<el-table-column label="身份证" prop="idcard" :resizable="false" align="center">
					</el-table-column>
					<el-table-column label="手机" prop="mobile" :resizable="false" align="center">
					</el-table-column>
					<el-table-column label="支付宝" prop="zhifubao" :resizable="false" align="center">
					</el-table-column>
					<el-table-column label="是否实名" prop="is_renzhen" :resizable="false" align="center">
						<template slot-scope="scope">
							<div type="primary" v-if="scope.row.is_renzhen == 0">未实名</div>
							<div type="primary" v-if="scope.row.is_renzhen == 1">已实名</div>
						</template>
					</el-table-column>
				</el-table>
				<el-button type="primary" @click="clone" size="small" class="fanhui" style="margin:20px 0 0 48%;">返回</el-button>
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
				searchform:{
					sou:'',
					num:'',
					csid:'',
					gmid:''
				},
				qb:'',
				zhfl:[
					{ value: '1',name: '等待付款',id:"1"},
					{ value: '2',name: '确认付款',id:"2"},
					{ value: '3',name: '确认收款',id:"3"},
					{ value: '4',name: '撤销',id:"4"},
				],
				shujuData:'',
				tabletwoData:[],
				tu:false,
				imgimg:'',
				dialogImageUrl: '',
				dialogVisible: false,
				fits:[],
				xianshi:false,
				tableoneData:[],
			}
		},
		async created() {
			this.pipeList(1)
		},
		methods: {
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
			async pipeList(page){
				const pipeList = await service.pipeList({
					page:page,
					status:this.searchform.sou,
					order_number:this.searchform.num,
					give_user_id:this.searchform.csid,
					get_user_id:this.searchform.gmid
				})
				
				if(pipeList.data.status == 1){
					this.shujuData = pipeList.data.data
					const tabletwoData = pipeList.data.data.list.map((item,index)=>{
						if(item.matching_time == ''){
							item.matching_time = "--"
						}else{
							item.matching_time = this.getDate(item.matching_time * 1000)
						}
						if(item.complete == ''){
							item.complete = '--'
						}else{
							item.complete = this.getDate(item.complete * 1000)
						}
						if(item.confirm_give_time == ''){
							item.confirm_give_time = '--'
						}else{
							item.confirm_give_time = this.getDate(item.confirm_give_time * 1000)
						}
						if(item.confirm_get_time == ''){
							item.confirm_get_time = '--'
						}else{
							item.confirm_get_time = this.getDate(item.confirm_get_time * 1000)
						}
						return item
					})
					this.tabletwoData = tabletwoData
					this.$message.success(pipeList.data.info);
				}else{
					this.tabletwoData = pipeList.data.data
					this.$message.error(pipeList.data.info);
				}
			},
			//用户支付信息
			async payClick(row){
				this.xianshi = true
				const getSellAndBugMember = await service.getSellAndBugMember({
					matching_id:row.id
				})
				if(getSellAndBugMember.data.status == 1){
					this.tableoneData = getSellAndBugMember.data.list
					console.log(9,getSellAndBugMember.data.list.buy_user)
				}
			},
			//支付信息返回
			clone(){
				this.xianshi = false
			},
			//撤销
			async delClick(row){
				const cexiao = await service.cexiao({
					matching_id:row.id
				})
				if(cexiao.data.status == 1){
					this.pipeList(1)
					this.$message.success(cexiao.data.info);
				}else{
					this.$message.error(cexiao.data.info);
				}
			},
			//查看凭证
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
			//搜索
			onSearchClick(){
				this.pipeList(1)
			},
			// 分页
			handleCurrentChange(val) {
				this.pipeList(val)
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
</style>
