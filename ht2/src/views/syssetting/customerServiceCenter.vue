<template>
	<div class="customerServiceCenter">
		<!--客服列表 -->
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="客服"  prop="desc" :resizable="false" align="center" width="530px">
			</el-table-column>
			<el-table-column label="联系方式" prop="value" :resizable="false" align="center" width="530px">
			</el-table-column>
			<el-table-column label="操作" :resizable="false" align="center" width="530px">
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
							<td class="td1">电话:</td>
							<td class="td2">
								<el-input v-model="submitform.phone" size="small" clearable></el-input>
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
					phone:""
				}
			}
		},
		async created() {
			this.kefu()
		},
		methods: {
			async kefu(){
				const kefuList = await service.kefuList();
				if(kefuList.data.status==1){
					this.tabletwoData = kefuList.data.data
					console.log(this.tabletwoData)
					this.$message.success(kefuList.data.info);
				}
			},
			clone(){
				this.is_show = false
				this.kefu()
			},
			//编辑弹窗
			modifyClick(row){
				this.is_show = true
				this.submitform.phone = row.value
			},
			async onSubmitClick(row){
				const update = await service.update({
					kefu:this.submitform.phone
				})
				if(update.data.status==1){
					this.$message.success("修改成功");
				}
					this.is_show = false
				this.kefu()
			}
		},
		mounted() {}
	}
</script>

<style>
</style>
