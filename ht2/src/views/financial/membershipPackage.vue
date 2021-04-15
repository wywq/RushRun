<template>
	<div class="membershipPackage">
		<!-- 列表 -->
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="套餐ID"  prop="id" :resizable="false" align="center" >
			</el-table-column>
			<el-table-column label="时长(天)" prop="num" :resizable="false" align="center" >
			</el-table-column>
			<el-table-column label="金额" prop="money" :resizable="false" align="center" >
			</el-table-column>
			<el-table-column label="操作" :resizable="false" align="center" >
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="modifyClick(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 弹窗 -->
		<div class="mark" v-show="is_show">
			<div class="mark-content">
				<div class="hytj">修改套餐</div>
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr style="background: #EEEEEE">
							<td style="text-align: center;">名称</td>
							<td style="text-align: center;">内容</td>
						</tr>
						<tr>
							<td class="td1">时长(天):</td>
							<td class="td2">
								<el-input v-model="submitform.time" size="small" clearable></el-input>
							</td>
						</tr>
						<tr>
							<td class="td1">金额:</td>
							<td class="td2">
								<el-input v-model="submitform.money" size="small" clearable></el-input>
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
				tabletwoData:[],
				is_show:false,
				submitform:{
					time:'',
					money:''
				},
				id:'',
			}
		},
		async created() {
			const setMeal = await service.setMeal();
			if(setMeal.data.status==1){
				this.tabletwoData = setMeal.data.data
				this.$message.success(setMeal.data.info);
			}else{
				this.$message.error(setMeal.data.info);
			}
		},
		methods: {
			//编辑
			modifyClick(row){
				this.is_show = true
				this.submitform.money = row.money
				this.submitform.time = row.num
				this.id = row.id
				
			},
			//提交
			 async onSubmitClick(row){
				const updateSetmeal = await service.updateSetmeal({
					id:this.id,
					money:this.submitform.money,
					time:this.submitform.time
				})
				if(updateSetmeal.data.status==1){
					this.$message.success('修改成功');
					this.is_show = false
					const setMeal = await service.setMeal();
					if(setMeal.data.status==1){
						this.tabletwoData = setMeal.data.data
						this.$message.success(setMeal.data.info);
					}else{
						this.$message.error(setMeal.data.info);
					}
				} else {
					this.$message.error(updateSetmeal.data.info);
				}
				
			},
			//返回()
			clone(){
				this.is_show = false
			}
		},
		mounted() {}
	}
</script>

<style scoped>
</style>
