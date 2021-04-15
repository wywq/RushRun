<template>
	<div class="functionsSwitch">
		<Title>
			<div slot="title">功能开关</div>
		</Title>
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
							<td style="text-align: center;">选择:</td>
							<td class="td2">
								<el-radio v-model="submitform.resource" :label="1">是</el-radio>
								<el-radio v-model="submitform.resource" :label="2">否</el-radio>
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
	import Title from '@/components/title'
	import util from '@/utils/utils.js'
	import service from '@/service/service.js'
	export default {
		data() {
			return {
				tabletwoData:[],
				submitform:{
					content:'',
					resource:''
				},
				show:false
			}
		},
		components: {Title},
		async created() {
			this.gongneng()
		},
		methods: {
			async gongneng(){
				const gongneng = await service.gongneng();
				if(gongneng.data.status == 1){
					this.tabletwoData = gongneng.data.data
					this.$message.success(gongneng.data.info);
				}else{
					this.$message.error(gongneng.data.info);
				}
			},
			//提交
			async onSubmitClick(){
				const updateGongneng = await service.updateGongneng({
					name:this.name,
					value:this.submitform.resource
				})
				if(updateGongneng.data.status == 1){
					this.show = false
					this.gongneng()
					this.$message.success(updateGongneng.data.info);
				}else{
					this.$message.error(updateGongneng.data.info);
				}
			},
			//返回
			clone(){
				this.show = false
			},
			//修改
			xiugaiClick(row){
				this.show = true
				this.submitform.content = row.desc
				this.name = row.name
				this.submitform.resource = Number(row.value)
			},
		},
	}
</script>

<style>
</style>
