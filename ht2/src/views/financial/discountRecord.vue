<template>
	<div class="discountRecord">
		<!-- 搜索的表单 -->
		<el-form :inline="true" :model="searchform" class="searchform">
			<el-form-item label="真实姓名:">
				<el-input v-model="searchform.username" placeholder="用户真实姓名"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearchClick">搜索</el-button>
			</el-form-item>
		</el-form>
		<!-- 列表 -->
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="提现ID"  prop="id" :resizable="false" align="center" >
			</el-table-column>
			<el-table-column label="提现用户姓名" prop="realname" :resizable="false" align="center" >
			</el-table-column>
			<el-table-column label="金额" prop="money" :resizable="false" align="center" >
			</el-table-column>
			<el-table-column label="提现至" prop="bank_name" :resizable="false" align="center" >
			</el-table-column>
			<el-table-column label="账号" prop="bank_card" :resizable="false" align="center" width="300px">
			</el-table-column>
			<el-table-column label="申请时间" prop="add_time" :resizable="false" align="center" >
			</el-table-column>
			<el-table-column label="状态" prop="status" :resizable="false" align="center" width="160px">
				<template slot-scope="scope">
					<div v-if="scope.row.status == -2">删除作废</div>
					<div v-if="scope.row.status == -1">审核失败</div>
					<div v-if="scope.row.status == 0">申请中</div>
					<div v-if="scope.row.status == 1">审核通过</div>
					<div v-if="scope.row.status == 2">付款成功</div>
					<div v-if="scope.row.status == 3">付款失败</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" :resizable="false" align="center" width="300px">
				<template slot-scope="scope">
					<el-button type="primary" @click="delClick(scope.row)" size="small" style="margin-left:10px;">删除</el-button>
					<el-button type="primary" @click="yesshenheClick(scope.row)" size="small" style="margin-left:10px;">审核通过</el-button>
					<el-button type="primary" size="small" @click="nosshenheClick(scope.row,scope.$index)">审核失败</el-button>
				</template>
				
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="block">
			<el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="shujuData.num"
			 :page-size="15">
			</el-pagination>
		</div>
		
	</div>
</template>

<script>
	import util from '@/utils/utils.js'
	import service from '@/service/service.js'
	export default {
		data() {
			return {
				tabletwoData:[],
				is_show:false,
				searchform:{
					username:''
				},
				shujuData:''
			}
		},
		async created() {
			this.tixian(1)
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
			async tixian(page){
				const tixian = await service.tixian({
					page:page,
					name:this.searchform.username
				})
				if(tixian.data.status==1){
					this.$message.success('搜索成功');
					this.shujuData = tixian.data.data
					const tixians =  tixian.data.data.list.map((item)=>{
						item.add_time = this.getDate(item.create_time * 1000)
						return item
					})
					this.tabletwoData = tixians
				}else{
					this.tabletwoData = tixian.data.data
					this.$message.error(tixian.data.info);
				}
			},
			//搜索
			onSearchClick(){
				this.tixian(1)
			},
			//删除
			delClick(row){
				this.$confirm('是否继续删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const delTixian = await service.delTixian({
						token: util.getCookie("token"),
						id: row.id
					})
					if (delTixian.data.status == 1) {
						this.$message.success('删除成功');
					}
					this.tixian()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			async shenhe(type,id){
				const tixianSuccess = await service.tixianSuccess({
					id,
					type
				})
				if(tixianSuccess.data.status==1){
					this.$message.success(tixianSuccess.data.info); 
					this.tixian(1)
				}else{
					this.$message.error(tixianSuccess.data.info);
				}
				
			},
			//审核通过
			yesshenheClick(row){
				this.shenhe(1,row.id)
			},
			//审核失败
			nosshenheClick(row){
				this.shenhe(2,row.id)
			},
			// 分页
			handleCurrentChange(val) {
				this.tixian(val)
			}
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
