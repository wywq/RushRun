<template>
	<div class="tasklevellist">
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="等级ID" prop="id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="等级名称" prop="name" :resizable="false" align="center" >
			</el-table-column>
			<el-table-column label="最多数量" prop="num" :resizable="false" align="center" >
			</el-table-column>
			<el-table-column label="操作" prop="content" class="elcolumn" align="center" fixed="right" width="300px">
				<template slot-scope="scope" prop="xg">
					<el-button type="primary" @click="modifyClick(scope.row)" size="small" style="margin-left:10px;" >修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="mark" v-show="show">
			<div class="mark-content">
				<div class="hytj">修改等级信息</div>
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr style="background: #EEEEEE">
							<td style="text-align: center;">名称</td>
							<td style="text-align: center;">内容</td>
						</tr>
						<tr>
							<td style="text-align: center;">等级名称:</td>
							<td class="td2">
								<el-input v-model="submitform.name" size="small" clearable ></el-input>
							</td>
						</tr>
						<tr>
							<td style="text-align: center;">等级数量:</td>
							<td class="td2">
								<el-input v-model="submitform.num" size="small" clearable ></el-input>
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
	import axios from 'axios'
	export default {
		data() {
			return {
				submitform:{
					name:"",
					num:'',
				},
				tabletwoData:[],
				show:false,
				id:'',
			}
		},
		async created() {
			this.allTaskLevel()
		},
		methods: {
			async allTaskLevel(){
				const allTaskLevel = await service.allTaskLevel()
				if(allTaskLevel.data.status==1){
					this.tabletwoData = allTaskLevel.data.data
				}else{
					this.tabletwoData = []
					this.$message.error(allTaskLevel.data.info);
				}
			},
			//点击修改
			async modifyClick(row){
				this.show = true
				this.submitform.name = row.name
				this.submitform.num = row.num
				this.id =row.id
			},
			//提交
			async onSubmitClick(row){
				const updateTaskLevel = await service.updateTaskLevel({
					id:this.id,
					name:this.submitform.name,
					num:this.submitform.num,
				})
				if(updateTaskLevel.data.status==1){
					this.$message.success('修改成功');
					this.show = false
					this.submitform.name = ''
					this.submitform.num = ''
					this.allTaskLevel()
				}else{
					this.$message.error(updateTaskLevel.data.info);
				}
			},
			//返回
			clone(){
				this.show =false
				this.submitform.name = ''
				this.submitform.num = ''
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
	/* 添加会员表单 */
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
		text-align: right;
		padding-right: 10px;
		width:30%;
		text-align: center;
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
