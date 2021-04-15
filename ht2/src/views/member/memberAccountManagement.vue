<template>

	<div class="member">
		<!-- 提交的表单 -->
		<form class="submitform" :model="submitform">
			<table style="width:100%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
				<tr style="background: #EEEEEE">
					<td style="text-align: center;">名称</td>
					<td style="text-align: center;">内容</td>
				</tr>
				<tr>
					<td class="td1">会员账号:</td>
					<td class="td2">
						<el-input v-model="submitform.name" size="small"></el-input>
					</td>
				</tr>
				<tr>
					<td class="td1">账户:</td>
					<td class="td2">
						<el-radio-group v-model="submitform.typeid" size="small">
							<el-radio :label="item.id" v-for="(item,index) in zhfl">{{item.name}}</el-radio>
						</el-radio-group>
					</td>
				</tr>
				<tr>
					<td class="td1">金额:</td>
					<td class="td2">
						<el-input v-model="submitform.price" size="small"></el-input>
					</td>
				</tr>
				<tr>
					<td></td>
					<td class="td2">
						<el-button type="primary" @click="onSubmitClick" size="small">提交</el-button>
					</td>
				</tr>
			</table>
		</form>
		<!-- 搜索的表单 -->
		<el-form :inline="true" :model="searchform" class="searchform">
			<el-form-item label="会员账号:">
				<el-input v-model="searchform.email" placeholder="关键字"></el-input>
			</el-form-item>
			<el-form-item label="会员ID:">
				<el-input v-model="searchform.searchid" placeholder="ID"></el-input>
			</el-form-item>

			<el-form-item label="会员名称:">
				<el-input v-model="searchform.searchname" placeholder="姓名"></el-input>
			</el-form-item>
			<el-form-item label="明细查找:">
				<el-select v-model="searchform.value" placeholder="请选择" style="width:150px">
					<el-option key="" label="全部" :value="qb"></el-option>
					<el-option v-for="item in zhfl" :key="item.value" :label="item.name" :value="item.id">
					</el-option>
				</el-select>
			</el-form-item>
			<el-input type="text" value="" v-model="searchform.searchprice" placeholder="金额"></el-input>
			<el-form-item>
				<el-button type="primary" @click="onSearchClick">搜索</el-button>
			</el-form-item>
		</el-form>

		<!-- 第一行表格 -->
		<el-table :data="tableone" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="总金币" prop="account_type_1" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="RMB" prop="account_type_2" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="贡献值" prop="account_type_3" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="活跃度" prop="account_type_4" :resizable="false" align="center">
			</el-table-column>
		</el-table>

		<!--会员管理用户信息 -->
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="会员ID" prop="code" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="真实姓名" prop="name" :resizable="false" align="center" width="160px">
			</el-table-column>
			<el-table-column label="会员账号" prop="phone" :resizable="false" align="center" width="160px">
			</el-table-column>
			<el-table-column label="推荐人账号" prop="tuijianmobile"  :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="金额" prop="rmb" :resizable="false" width="120px" align="center">
			</el-table-column>
			<el-table-column label="总金币" prop="zongjinbi" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="贡献值" prop="gongxianzhi" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="活跃度" prop="huoyuedu" :resizable="false" align="center">
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
	import Markdown from '../../components/markdown/markdown-editor'
	import initData from '../../markData.js'
	import util from '@/utils/utils.js'
	import service from '@/service/service.js'
	export default {
		name: 'member',
		data() {
			return {
				zhfl: [],
				ddd: 0,
				// 提交表单
				submitform: {
					name: '',
					price: '',
					typeid: '',
				},
				// 搜索表单
				searchform: {
					email: '',
					searchid: '',
					searchname: '',
					referrer: '',
					value: '',
					searchprice: '',
				},
				// 表格第一行
				tableone: [],
				tableoneData: [],
				// 表格第二行
				tabletwoData: [],
		shujuData:'',
		qb:'',
			}
		},

		async created() {
			// 请求账户管理类型
			const zhanghufenlei = await service.zhanghufenlei({})
			if (zhanghufenlei.data.status == 1) {
				this.zhfl = zhanghufenlei.data.data
			}
			// 会员账户信息
			const zhanghu = await service.zhanghu({})
			if (zhanghu.data.status == 1) {
				this.tableone = zhanghu.data.data
			}
			this.yonghuzhanghu(1)
		},
		methods: {
			// 会员账户列表
			async yonghuzhanghu(page) {
				const yonghuzhanghu = await service.yonghuzhanghu({
					phone:this.searchform.email,
					user_id: this.searchform.searchid,
					realname: this.searchform.searchname,
					mingxi: this.searchform.value,
					num: this.searchform.searchprice,
					page:page
				})
				if (yonghuzhanghu.data.status == 1) {
					this.tabletwoData = yonghuzhanghu.data.data.list
					this.shujuData = yonghuzhanghu.data.data
					this.$message.success(yonghuzhanghu.data.info);
				} else {
					this.tabletwoData =[]
					this.$message.error(yonghuzhanghu.data.info);
				}
			},
			// 会员账户管理提交
			async onSubmitClick() {
				if (this.submitform.name == '') {
					this.$message.error('请填写会员名称');
					return
				}
				if (this.submitform.typeid == '') {
					this.$message.error('请选择类型');
					return
				}
				if (this.submitform.price == '') {
					this.$message.error('请填写金额');
					return
				}
				const xinxiedit = await service.xinxiedit({
					phone: this.submitform.name,
					type: this.submitform.typeid,
					user_money: this.submitform.price
				})
				if (xinxiedit.data.status == 1) {
					this.submitform.name = ''
					this.submitform.price = ''
					this.yonghuzhanghu(1)
					this.$message.success(xinxiedit.data.info);
				} else {
					this.$message.error(xinxiedit.data.info);
				}
			},
			// 搜索表单
			 onSearchClick() {
				this.yonghuzhanghu(1)
			},
				// 分页
			handleCurrentChange(val) {
				this.yonghuzhanghu(val)
			}
		},
		mounted() {}
	}
</script>

<style scoped>
	/* 提交表单 */
	.submitform .el-input {
		margin-right: 10px;
		width: 270px;
		vertical-align: top;
	}

	tr {
		height: 50px;
		width: 100%;
		border: 1px lightgray dashed;
	}

	.td1 {
		text-align: right;
		padding-right: 10px;
	}

	.td2 {
		padding-left: 10px;
	}

	/* 搜索表单 */
	.searchform {
		margin-top: 20px;
	}

	.searchform .el-input {
		margin: 0 5px;
		width: 150px;
		vertical-align: top;
	}

	.elcolumn {
		text-align: center;
	}

	.el-table {
		text-align: center;
	}
	.block {
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
