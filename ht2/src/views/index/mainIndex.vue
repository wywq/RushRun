<template>
	<div>
		<!--  -->
		<div class="warning">当前登录管理员: {{name.user_name}}</div>
		<!-- <div class="tjsj">统计数据</div> -->
		<!-- <mailTable :tableData="tableData" :tableStyle="{ width:'100%' }"></mailTable> -->
	</div>
</template>

<script>
	import mailTable from '@/components/biaodan'
	import util from '@/utils/utils.js'
	import service from '@/service/service.js'
	export default {
		name: 'mainIndex',
		data() {
			return {
				name:[],
				tableData: [
				],
			}
		},
		components: {
			mailTable
		},
		async created(){
			const firstindex = await service.firstindex();
			if(firstindex.data.status==1){
				this.name = firstindex.data.data
			}
			console.log(this.name)
		},
		/*mounted() {
			util.delCookie('token');
		},*/
		methods: {

		}
	}
</script>

<style lang="scss">
	.warning {
		border: 1px solid #E6DB55;
		background: #56a9ff;
		padding: 10px;
		margin-bottom: 20px;
		color: #fff;
	}

	.tjsj {
		border-bottom: 1px solid #D7D7D7;
		color: #666666;
		font-size: 16px;
		padding-bottom: 10px;
		margin-bottom: 15px;
	}


	.mailTable,
	.mailTable tr,
	.mailTable tr td {
		border: 1px solid #E6EAEE;
		width:100%;
	}

	.mailTable {
		font-size: 12px;
		color: #71787E;
		width:100%;

	}

	.mailTable tr td {
		border: 1px solid #E6EAEE;
		width: 25%;
		height: 35px;
		line-height: 35px;
		box-sizing: border-box;
		padding: 0 10px;
	}

	.mailTable tr td.column {
		background-color: #EFF3F6;
		color: #393C3E;
	}
</style>
