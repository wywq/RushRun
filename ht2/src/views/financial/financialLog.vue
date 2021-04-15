<template>
	<div>
		<div class="cwrz">财务日志</div>

		<!-- 搜索的表单 -->
		<el-form :inline="true" :model="searchform" class="searchform">
			<el-form-item label="选择分类:">
				<el-select v-model="searchform.classification" placeholder="全部" style="width:150px">
					<el-option key="" label="全部" :value="qb"></el-option>

					<el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="用户:">
				<el-input v-model="searchform.phone" placeholder="手机号"></el-input>
			</el-form-item>
			<el-form-item label="用户ID:">
				<el-input v-model="searchform.nameid" placeholder="用户ID"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSearchClick">搜索</el-button>
			</el-form-item>
		</el-form>

		<!-- 表格 -->
		<!--列表信息 -->
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="日志编号" prop="id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="用户ID" prop="code" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="用户" prop="name" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="财务类型" prop="type" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="内容" prop="content" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="币种" prop="account_type" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="金额" prop="money" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="时间" prop="add_time" :resizable="false" align="center">
			</el-table-column>
		</el-table>

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
		name: 'financialLog',
		data() {
			return {
				// 搜索表单
				searchform: {
					nameid: '',
					phone: '',
					classification: '',
				},
				options: [],
				tabletwoData: [],
				shujuData: "",
				page: 1,
				qb:'',
			}
		},
		components: {},
		async created() {
			this.searchform.phone= this.$route.query.phone
			// 日志类型接口
			const financetype = await service.financetype({})
			if (financetype.data.status == 1) {
				this.options = financetype.data.data
			}

			this.financeList(1)
		},
		methods: {
			// 搜索
			onSearchClick() {
				this.financeList(1)
			},
			async financeList(page) {
				const that = this
				const financeList = await service.financeList({
					phone: this.searchform.phone,
					user_id: this.searchform.nameid,
					type: this.searchform.classification,
					page: page
				})
				if (financeList.data.status == 1) {
					this.$message.success('搜索成功');
					console.log(financeList.data.data)
					const tableData = financeList.data.data.list.map((item, index) => {
						item.add_time = that.getDate(item.add_time * 1000)
						return item
					})
					this.tabletwoData = tableData
					this.shujuData = financeList.data.data
					// this.searchform.phone = ''
					// this.searchform.nameid =''
					// this.searchform.classification = ''
				} else {
					this.tabletwoData = financeList.data.data
					this.$message.error(financeList.data.info);
				}
			},
			//转换成时间对象
			getDate(tm) {
				let date = new Date(tm);
				let year = date.getFullYear();
				let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				let time = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				let hours = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())
				let fen = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
				let miao = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
				let tt = year + '-' + month + '-' + time + ' ' + hours + ':' + fen + ":" + miao;
				return tt;
			},
			// 分页
			handleCurrentChange(val) {
				this.financeList(val)
			}
		}
	}
</script>

<style scoped>
	.searchform .el-input {
		margin: 0 5px;
		width: 150px;
		vertical-align: top;
	}

	.cwrz {
		border-bottom: 1px solid #D7D7D7;
		color: #666666;
		font-size: 28px;
		padding-bottom: 10px;
		margin-bottom: 20px;
	}

	.block {
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
