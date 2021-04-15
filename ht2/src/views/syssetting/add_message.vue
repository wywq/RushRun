<template>
	<div class="add_message">
		<el-button type="primary" @click="addMerberClick">添加发布消息</el-button>
		<div class="mark" v-show="show">
			<div class="mark-content">
				<div class="hytj">添加发布消息</div>
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr>
							<td class="td3" style="text-align: center;">账号:</td>
							<td class="td2">
								<el-input v-model="submitform.name" size="small" clearable></el-input>
							</td>
						</tr>
						<tr>
							<td class="td3" style="text-align: center;">标题:</td>
							<td class="td2">
								<el-input  v-model="submitform.title" size="small" clearable></el-input>
							</td>
						</tr>
						<tr>
							<td class="td3" style="text-align: center;">消息类型</td>
							<td class="td2">
								<el-select v-model="searchform.value" placeholder="请选择" style="width:150px">
									<el-option v-for="item in zhfl" :key="item.value" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr>
							<td class="td3" style="text-align: center;">消息内容:</td>
							<td class="td2">
								<el-input  type="textarea" v-model="submitform.content" size="small" clearable></el-input>
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
				show:false,
				submitform:{
					name:'',
					title:'',
					content:''
				},
				searchform:{
					value:''
				},
				zhfl: [{
						value: '1',
						name: '系统消息',
						id: "1"
					},
					{
						value: '2',
						name: '任务消息',
						id: "2"
					},
					{
						value: '3',
						name: '转换消息',
						id: "3"
					}
				],
			}
		},
		async created() {
			
		},
		methods: {
			//添加问题
			addMerberClick(){
				this.show = true
			},
			//提交
			async onSubmitClick(){
				const add_news = await service.add_news({
					phone:this.submitform.name,
					message:this.submitform.title,
					type:this.searchform.value,
					data:this.submitform.content
				})
				if(add_news.data.status == 1){
					this.show = false
					this.submitform.name=''
					this.submitform.title = ''
					this.searchform.value = ''
					this.submitform.content = ''
					this.$message.success(add_news.data.info);
				}else{
					this.$message.error(add_news.data.info);
				}
			},
			//返回
			clone(){
				this.show = false
			},
		}
	}
</script>

<style scoped>
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
		padding-top: 70px;
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
