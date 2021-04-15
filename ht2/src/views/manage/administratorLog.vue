<template>
	<div>
		<el-form :inline="true" :model="searchform" class="searchform">
			<el-form-item label="管理员名称:">
				<el-input v-model="searchform.name" placeholder="管理员名称"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearchClick">搜索</el-button>
			</el-form-item>
		</el-form>
		<!--表格 -->
		<el-table  :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="ID" prop="admin_id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="管理员名称" prop="user_name" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="内容" prop="log_info" :resizable="false" align="center" width="500px">
			</el-table-column>
			<el-table-column label="添加时间" prop="log_time" :resizable="false" align="center">
			</el-table-column>
			<!-- <el-table-column label="操作" class="elcolumn" align="center" fixed="right" width="300px">
				<template slot-scope="scope" prop="admin">
					<el-button type="primary" @click="modifyClick(scope.row)" size="small" style="margin-left:10px;">修改信息</el-button>
					<el-button type="primary" @click="permissionsClick(scope.row)" size="small" style="margin-left:10px;">修改权限</el-button>
					<el-button type="primary" @click="delClick(scope.row)" size="small" style="margin-left:10px;" v-if="scope.row.admin == 0">删除</el-button>
				</template>
			</el-table-column> -->
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
				searchform:{
					name:''
				},
				tabletwoData: [],
				shujuData:'',
			}
		},
		created() {
			this.getAdminLog(1)
		},
		methods: {
			//搜索
			onSearchClick(){
				this.getAdminLog(1)
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
			async getAdminLog(page){
				const administratorLog = await service.administratorLog({
					page:page,
					user_name:this.searchform.name
				})
				if(administratorLog.data.status == 1){
					this.shujuData = administratorLog.data.data
					console.log(administratorLog.data.data)
					const tabletwoData = administratorLog.data.data.list.map((item, index) => {
						item.log_time = this.getDate(item.log_time * 1000)
						return item
					})
					this.tabletwoData = tabletwoData
					this.$message.success(administratorLog.data.info);
				}else{
					this.$message.error(administratorLog.data.info);
				}
			},
		// 分页
			handleCurrentChange(val) {
				this.getAdminLog(val)
			}, 
		},
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
