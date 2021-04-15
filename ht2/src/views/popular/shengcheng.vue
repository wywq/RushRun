<template>
	<div class="shengcheng">
		<Title>
			<div slot="title">生成认筹码</div>
		</Title>
		<form class="submitform" :model="submitform">
			<table style="width:100%;border:1px dashed #000;background:#F9F9F9;margin-bottom: 50px;" rules="all">
				<tr>
					<td class="td1">名称</td>
					<td class="td2">内容</td>
				</tr>
				<tr>
					<td class="td1_content">分配给的用户是?：</td>
					<td class="td2_content">
						<el-input v-model="submitform.content" size="small"></el-input>
					</td>
				</tr>
				<tr>
					<td class="td1_content">生成几个?：	</td>
					<td class="td2_content">
						<el-input v-model="submitform.few" size="small" style="width: 30%;"></el-input>
						<p class="tishi">为空默认生成10个</p>
					</td>
				</tr>
				<tr>
					<td></td>
					<td class="td2_content">
						<el-button type="primary" @click="onSubmitClick" size="small">提交</el-button>
					</td>
				</tr>
			</table>
		</form>
	</div>
</template>

<script>
	import Title from '@/components/title'
	export default{
		data(){
			return{
				submitform:{
					content:"",
					few:"",
				},
			}
		},
		components: {
			Title
		},
		methods: {
			onSubmitClick(){
				console.log(this.submitform)
			},
		}
	}
</script>

<style scoped>
	/* 提交表单 */
	.submitform .el-input {
		margin-right: 10px;
		width: 40%;
		vertical-align: top;
	}

	tr {
		/* height: 50px; */
		width:90%;
		border: 1px lightgray dashed;
	}

	.td1 {
		text-align: center;
		padding-right: 10px;
		background: #EEEEEE;
		width: 15%;
	}

	.td2 {
		padding-left: 10px;
		line-height: 50px;
		text-align: center;
		background: #EEEEEE;
	}
	.td1_content{
		text-align:right;
		padding-right: 10px;
		width: 15%;
	}
	.td2_content{
		padding-left: 10px;
		line-height: 50px;
		text-align: left;
	}
	.tishi{
		color:red;
		display: inline-block;
	}
</style>
