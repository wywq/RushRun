<template>
	<div class="feedback_type">
		<el-button type="primary" @click="addMerberClick()">添加反馈类型</el-button>
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="反馈类型id" prop="id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="反馈类型" prop="name" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="操作" :resizable="false" align="center" width="400px">
				<template slot-scope="scope">
					<el-button type="primary" size="small" @click="delClick(scope.row)">删除</el-button>
					<el-button type="primary" size="small" @click="bianjiClick(scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="mark" v-show="show">
			<div class="mark-content">
				<div class="hytj" v-if="is_show == 1">添加反馈类型</div>
				<div class="hytj" v-if="is_show == 2">修改反馈类型</div>
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr>
							<td style="text-align: center;">反馈类型:</td>
							<td class="td2">
								<el-input v-model="submitform.type" size="small" clearable></el-input>
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
				show:false,
				is_show:1,
				submitform:{
					id:'',
					type:''
				},
				id:''
			}
		},
		async created() {
			this.fankuiType()
		},
		methods: {
			async fankuiType(){
				const fankuiType = await service.fankuiType();
				if(fankuiType.data.status == 1){
					this.tabletwoData = fankuiType.data.data
				}
			},
			//删除
			async delClick(row){
				const delFankuitype = await service.delFankuitype({
					id:row.id
				})
				if(delFankuitype.data.status == 1){
					this.$message.success(delFankuitype.data.info);
					this.fankuiType()
				}else{
					this.$message.error(delFankuitype.data.info);
				}
			},
			//添加反馈类型
			addMerberClick(){
				this.show = true
				this.is_show = 1
				this.submitform.id = ''
				this.submitform.type = ''
			},
			//提交
			async onSubmitClick(){
				if(this.is_show == 1){
				  const updateFankui = await service.updateFankui({
					  id:'',
					  name:this.submitform.type
				  })
				  if(updateFankui.data.status == 1){
					  this.show = false
					  this.$message.success(updateFankui.data.info);
					  this.submitform.id = ''
					  this.submitform.type = ''
					  this.fankuiType()
				  }else{
					    this.$message.error(updateFankui.data.info);
				  }
				}else if(this.is_show == 2){
					const updateFankui = await service.updateFankui({
						id:this.submitform.id,
						name:this.submitform.type,
					})
					if(updateFankui.data.status == 1){
						this.show = false
						this.$message.success(updateFankui.data.info);
						this.fankuiType()
					}else{
						this.$message.error(updateFankui.data.info);
					}
				}
			},
			//编辑
			bianjiClick(row){
				this.show = true
				this.is_show = 2
				this.id = row.id
				this.submitform.id = row.id
				this.submitform.type = row.name
			},
			//返回
			clone(){
				this.show = false
			},
		},
	}
</script>

<style>
	.block {
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.scope-img{
		width:60px;
		height:60px;
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
		width: 30%;
		text-align: center;
	}
	
	.td2 {
		padding-left: 10px;
		width: 70%;
	}
	
	.imgdw {
		position: relative;
		height: 150px;
		width: 150px;
	}
	
	#load {
		width: 350px;
		height: 112px;
		position: absolute;
		top: 0;
		opacity: 0;
		z-index: 999;
		padding-left:180px;
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
	.audio_box{
		width:350px;
	}
</style>
