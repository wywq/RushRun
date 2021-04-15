<template>
	<div class="administrator">
		
		<el-button type="primary" @click="addMerberClick">添加管理员</el-button>
		<!-- <el-button type="primary" @click="addPartnerClick" style="background:#80b4ea;border:1px solid #80b4ea">添加合伙人</el-button> -->
		<!--表格 -->
		<el-table :row-class-name="tableRowClassName" :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}"
		 border style="margin-top:10px">
			<el-table-column label="ID" prop="admin_id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="管理员名称" prop="user_name" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="状态" prop="status" :resizable="false" align="center">
				<template slot-scope="scope">
					<div type="primary" v-if="scope.row.status == 0">可用</div>
					<div type="primary" v-if="scope.row.status == 1">不可用</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" class="elcolumn" align="center" fixed="right" width="300px">
				<template slot-scope="scope" prop="admin">
					<el-button type="primary" @click="modifyClick(scope.row)" size="small" style="margin-left:10px;">修改信息</el-button>
					<!-- <el-button type="primary" @click="permissionsClick(scope.row)" size="small" style="margin-left:10px;" v-if="scope.row.is_guanliyuan != 0">修改权限</el-button> -->
					<el-button type="primary" @click="delClick(scope.row)" size="small" style="margin-left:10px;" v-if="scope.row.admin == 0">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 添加修改管理员弹窗 -->
		<div class="mark" v-if="is_show == 1">
			<div class="mark-content">
				<div class="hytj">添加管理员</div>
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr>
							<td style="text-align: center;">管理员名称:</td>
							<td class="td2">
								<el-input v-model="submitform.name" size="small" clearable></el-input>
							</td>
						</tr>
						<tr v-if="ps_show == 0">
							<td style="text-align: center;">管理员密码:</td>
							<td class="td2">
								<el-input type="password" v-model="submitform.password" size="small" clearable :show-password="false"></el-input>
							</td>
						</tr>
						<tr v-if="ps_show == 0">
							<td style="text-align: center;">所属部门:</td>
							<td style="text-align: center;">
								<el-select v-model="submitform.value" placeholder="请选择" style="width:150px">
									<el-option key="" label="全部" :value="qb"></el-option>
									<el-option v-for="item in zhfl" :key="item.value" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr v-if="ps_show == 1">
							<td style="text-align: center;">所属部门:</td>
							<td style="text-align: center;">
								<el-select v-model="submitform.value" placeholder="请选择" style="width:150px">
									<el-option key="" label="全部" :value="qb"></el-option>
									<el-option v-for="item in zhfl" :key="item.value" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</td>
						</tr>
						<tr v-if="ps_show == 1">
							<td style="text-align: center;">管理员密码:</td>
							<td class="td2">
								<el-input v-model="submitform.pwd_show" size="small" clearable :disabled="true"></el-input>
							</td>
						</tr>
						<tr v-if="ps_show == 1">
							<td style="text-align: center;">管理员密码修改:</td>
							<td class="td2">
								<el-input type="password" v-model="submitform.password" size="small" clearable></el-input>
							</td>
						</tr>
						<tr>
							<td></td>
							<td style="text-align: center;">
								<el-button type="primary" @click="onSubmitClick" size="small">提交</el-button>
								<el-button type="primary" @click="clone" size="small">返回</el-button>
							</td>
						</tr>
					</table>
				</el-form>
			</div>
		</div>

		<!-- 添加合伙人弹窗 -->
		<div class="mark" v-if="is_show == 3">
			<div class="mark-content">
				<div class="hytj">添加合伙人</div>
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr>
							<td class="td1">合伙人名称:</td>
							<td class="td2">
								<el-input v-model="partnerform.name" size="small" clearable></el-input>
							</td>
						</tr>
						<tr v-if="ps_show == 0">
							<td class="td1">合伙人密码:</td>
							<td class="td2">
								<el-input type="password" v-model="partnerform.password" size="small" clearable :show-password="false"></el-input>
							</td>
						</tr>
						<tr v-if="ps_show == 1">
							<td class="td1">合伙人密码:</td>
							<td class="td2">
								<el-input v-model="partnerform.pwd_show" size="small" clearable :disabled="true"></el-input>
							</td>
						</tr>
						<tr v-if="ps_show == 1">
							<td class="td1">合伙人密码修改:</td>
							<td class="td2">
								<el-input type="password" v-model="partnerform.password" size="small" clearable></el-input>
							</td>
						</tr>
						<tr>
							<td></td>
							<td class="td2">
								<el-button type="primary" @click="onPartnerClick" size="small">提交</el-button>
								<el-button type="primary" @click="clone" size="small">返回</el-button>
							</td>
						</tr>
					</table>
				</el-form>
			</div>
		</div>

		<!-- 权限弹窗 -->
		<div class="mark" v-if="is_show == 2">
			<div class="mark-content">
				<div class="hytj">设置权限
					<el-button type="primary" @click="clone()" size="small" style="float: right;margin-right:15px">返回</el-button>
				</div>
				<div style="margin: 15px 0;"></div>
				<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" class="qx">
					<el-checkbox class="qxnr" v-for="(item,index) in cities" :label="item.nav_id" :key="index">{{item.nav_name}}</el-checkbox>
				</el-checkbox-group>
				<div style="margin: 10px; display: flex;justify-content: center;align-items: center;">
					<!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox> -->
					<el-button type="primary" @click="selectAllClick">全选</el-button>
					<el-button type="primary" @click="cancelAllElectionsClick">取消全选</el-button>
					<el-button type="primary" @click="onDetermineClick">确定</el-button>
				</div>
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
				is_show: 0,
				ps_show: 0,
				submitform: {
					name: '',
					password: '',
					pwd_show: '',
					admin_id: '',
					value:''
				},
				partnerform: {
					name: '',
					password: '',
					pwd_show: '',
					admin_id: ''
				},
				tabletwoData: [],
				shownavList: [],
				tableData: [],
				qxglxx: [],
				qxls: [],
				checkAll: false,
				checkedCities: [],
				cities: [],
				isIndeterminate: true,
				is_guanliyuan: '',
				qb:'',
				zhfl:[
					{
						value: '1',
						name: '管理员',
						id: 1
					},
					{
						value: '2',
						name: '客服',
						id: 2
					},
					{
						value: '3',
						name: '财务',
						id: 3
					},
				]
			}
		},
		components: {
			Title
		},
		created() {
			this.memberList()
		},
		methods: {
			tableRowClassName({
				row
			}) {
				if (row.is_guanliyuan == 0) {
					return 'warning-row';
				} 
				return '';
			},
			changeFun(val) {
				this.checkBoxData = val;
			},
			//添加合伙人弹窗
			addPartnerClick() {
				this.is_show = 3
			},
			// 管理员列表
			async memberList() {
				const index = await service.index({
					token: util.getCookie("token")
				})
				console.log(index)
				console.log(123, index.data.data.list.data)
				if (index.data.status == 1) {
					this.tabletwoData = index.data.data.list.data
					this.$message.success(index.data.info);
				}else{
					this.$message.error(index.data.info);
				}
			},
			// 添加管理员弹窗
			addMerberClick() {
				this.is_show = 1
				this.partnerform.name = ''
				this.partnerform.password = ''
			},
			//添加合伙人
			async onPartnerClick() {
				if (this.partnerform.name == '') {
					this.$message.error('请填写合伙人名称');
					return false
				}
				if (this.partnerform.password == '') {
					this.$message.error('请输入合伙人密码');
					return false
				}
				console.log(this.partnerform.name)
				const addPartner = await service.addPartner({
					token: util.getCookie("token"),
					user_name: this.partnerform.name,
					password: this.partnerform.password,
					admin_id: this.partnerform.admin_id
				})
				if (addPartner.data.status == 1) {
					this.is_show = 0
					this.partnerform.admin_id = ''
					this.ps_show = 0
					this.partnerform.name = ''
					this.partnerform.password = ''
					this.$message.success('添加成功');
					this.memberList()
				} else {
					this.$message.error(addPartner.data.info);
				}

			},
			// 添加修改管理员信息
			async onSubmitClick() {
				const addAdmin = await service.addAdmin({
					token: util.getCookie("token"),
					username: this.submitform.name,
					password: this.submitform.password,
					admin_id: this.submitform.admin_id,
					bumen:this.submitform.value
				})
				if (addAdmin.data.status == 1) {
					this.memberList()
					this.is_show = 0
					this.submitform.admin_id = ''
					this.ps_show = 0
					this.submitform.name = ''
					this.submitform.password = ''
					this.submitform.value = ''
					this.$message.success('添加成功');
				} else {
					this.$message.error(addAdmin.data.info);
				}
			},
			// 修改信息弹窗
			modifyClick(row) {
				console.log(row)
				this.is_show = 1
				this.ps_show = 1
				this.submitform.name = row.user_name
				this.submitform.pwd_show = row.pwd
				this.submitform.admin_id = row.admin_id
				this.submitform.value = row.bumen
			},
			// 删除管理员
			delClick(row) {
				this.$confirm('是否继续删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const delMember = await service.delMember({
						token: util.getCookie("token"),
						admin_id: row.admin_id
					})
					if (delMember.data.status == 1) {
						this.$message.success('删除成功');
					}
					this.memberList()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			// 管理员权限列表
			async permissionsClick(row) {
				this.is_show = 2
				const showNav = await service.showNav({
					token: util.getCookie('token'),
					admin_id: row.admin_id
				})
				if (showNav.data.status == 1) {
					let stock_id = []
					let qxglxx = []
					for (const item of showNav.data.data) {
						if (item.status == 1) {
							stock_id.push(item.nav_id)
						}
						qxglxx.push(item.nav_id)
					}
					this.checkedCities = stock_id
					this.qxglxx = qxglxx
					this.cities = showNav.data.data
					this.admin_id = row.admin_id
				}
			},
			// 确定修改管理员权限
			async onDetermineClick() {
				console.log(123456, this.checkedCities.toString())
				const saveNav = await service.saveNav({
					token: util.getCookie('token'),
					admin_id: this.admin_id,
					nav: this.checkedCities.toString()
				})
				if (saveNav.data.status == 1) {
					this.$message.success(saveNav.data.info);
					this.is_show = 0
				} else {
					this.$message.error(saveNav.data.info);
				}
			},
			// 返回
			clone() {
				this.is_show = 0
				this.ps_show = 0
				this.submitform.name = ''
				this.submitform.password = ''
				this.submitform.admin_id = ''
			},
			// 全选
			selectAllClick() {
				this.checkedCities = this.qxglxx;
				this.isIndeterminate = false;
			},
			// 取消全选
			cancelAllElectionsClick() {
				this.checkedCities = [];
				this.isIndeterminate = false;
			},
			// 选择事件
			handleCheckedCitiesChange(value) {
				this.qxls = value
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			}

		}
	}
</script>
<style>
.el-table .warning-row {
    background:#80b4ea;
  }
</style>
<style scoped>
	/* 遮罩 */
	.mark {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mark-content {
		width: 70%;
		height: 50%;
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
	}

	.td2 {
		padding-left: 10px;
	}

	.qx {
		width: 88%;
		display: flex;
		flex-wrap: wrap;
		margin: 0 auto;
		border-top: 1px solid grey;
		border-left: 1px solid grey;
	}

	.qxnr {
		border-right: 1px solid grey;
		border-bottom: 1px solid grey;
		width: 25%;
		text-align: left;
		padding: 10px 0;
		padding-left: 10.6px;
		margin-right: 0;
		box-sizing: border-box;
	}
</style>
