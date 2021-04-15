<template>
	<div class="system_management">
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border
		 style="margin-top:10px">
			<el-table-column label="ID" prop="id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="配置的val值" prop="value" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="描述" prop="desc" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="操作" :resizable="false" align="center" width="400px">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="xiugaiClick(scope.row)">修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="mark" v-show="show">
			<div class="mark-content">
				<div class="hytj">修改</div>
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px;background:#F9F9F9" rules="all">
						<tr style="background: #EEEEEE">
							<td style="text-align: center;">名称</td>
							<td style="text-align: center;">内容</td>
						</tr>
						<tr>
							<td style="text-align: center;">描述</td>
							<td class="td2">
								<el-input v-model="submitform.content" size="small" :disabled="true"></el-input>
							</td>
						</tr>
						<tr>
							<td style="text-align: center;">配置的val值</td>
							<td class="td2">
								<el-input v-model="submitform.val" size="small"></el-input>
							</td>
						</tr>
						<tr>
							<td></td>
							<td class="td2">
								<el-button type="primary" @click="onSubmitClick" size="small">提交</el-button>
								<el-button type="primary" @click="clone" size="small">返回</el-button>
							</td>
						</tr>
					</table>
				</el-form>
			</div>
		</div>
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
				shujuData:'',
				show:false,
				submitform:{
					id:'',
					val:'',
					content:''
				},
				id:''
			}
		},
		async created() {
			this.systemManagement(1)
		},
		methods: {
			async systemManagement(page){
				const systemManagement = await service.systemManagement({
					page:page
				})
				if(systemManagement.data.status==1){
					this.shujuData = systemManagement.data.data
					this.tabletwoData = systemManagement.data.data.list
					this.$message.success(systemManagement.data.info);
				}else{
					this.$message.error(systemManagement.data.info);
				}
			},
			//提交
			async onSubmitClick(row){
				const updateSystemManagement = await service.updateSystemManagement({
					id:this.id,
					value:this.submitform.val,
				})
				if(updateSystemManagement.data.status==1){
					this.show = false
					this.$message.success(updateSystemManagement.data.info);
					this.systemManagement(1)
				}else{
					this.$message.error(updateSystemManagement.data.info);
				}
			},
			//返回
			clone(){
				this.show = false
			},
			//修改
			xiugaiClick(row){
				this.show = true
				this.id = row.id
				this.submitform.id = row.id
				this.submitform.val = row.value
				this.submitform.content = row.desc
			},
			// 分页
			handleCurrentChange(val) {
				this.systemManagement(val)
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
</style>
