<template>
	<div class="membershipLevelList">
		<!--会员管理用户信息 -->
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="会员等级ID" prop="level_id" :resizable="false" align="center" width="330px">
			</el-table-column>
			<el-table-column label="等级名称" prop="level_name" :resizable="false" align="center" width="330px">
			</el-table-column>
			<el-table-column label="等级必要贡献值" prop="amount" :resizable="false" align="center" width="330px">
			</el-table-column>
			<el-table-column label="手续费" prop="discount" :resizable="false" align="center" width="330px">
			</el-table-column>
			<el-table-column label="操作" :resizable="false" align="center" width="350px">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="modifyClick(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 弹窗 -->
		<div class="mark" v-show="is_show">
			<div class="mark-content">
				<div class="hytj">修改信息</div>
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr style="background: #EEEEEE">
							<td style="text-align: center;">名称</td>
							<td style="text-align: center;">内容</td>
						</tr>
						<tr>
							<td style="text-align: center;">等级必要贡献值:</td>
							<td class="td2">
								<el-input v-model="submitform.amount" size="small" clearable></el-input>
							</td>
						</tr>
						<tr>
							<td style="text-align: center;">手续费:</td>
							<td class="td2">
								<el-input v-model="submitform.discount" size="small" clearable></el-input>
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
	</div>
</template>

<script>
	import util from '@/utils/utils.js'
	import service from '@/service/service.js'
	export default {
		data() {
			return {
				tabletwoData: [],
				is_show:false,
				submitform:{
					level:'',
					amount:'',
					discount:''
				},
				id:""
			}
		},
		async created() {
			const grade = await service.grade();
			if(grade.data.status==1){
				this.tabletwoData = grade.data.data
				this.$message.success(grade.data.info);
			}else{
				this.$message.error(grade.data.info);
			}
		},
		methods: {
			//编辑
			modifyClick(row){
				this.is_show = true
				this.id = row.level_id
				this.submitform.amount = row.amount
				this.submitform.discount = row.discount
			},
			//退出弹窗
			clone(){
				this.is_show = false
			},
			//提交
			async onSubmitClick(row){
				const updateGrade = await service.updateGrade({
					id:this.id,
					amount:this.submitform.amount,
					discount:this.submitform.discount
				})
				if(updateGrade.data.status==1){
					this.is_show = false
					this.$message.success('修改成功');
					const grade = await service.grade();
					if(grade.data.status==1){
						this.tabletwoData = grade.data.data
						this.submitform.amount =""
						this.submitform.discount = ""
					}
				}
			}
		},
		mounted() {}
	}
</script>

<style scoped>
	/* 遮罩 */
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
	
</style>
