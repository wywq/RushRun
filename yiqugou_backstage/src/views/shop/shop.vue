<template>
	<div>
		<!-- 条件筛选 -->
		<el-card>
			<el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
				<el-form-item>
					<el-button type="success" size="small" @click="addShop">添加店铺</el-button>
				</el-form-item>
				<el-form-item label="店铺名称">
					<el-input v-model="form.shop_name" placeholder="按店铺名称搜索" clearable size="mini"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="refresh">搜索</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<!-- 表格 -->
		<el-card>
			<el-table :data="list" border style="width: 100%">
				<el-table-column prop="shop_id" label="店铺id" width="70px"></el-table-column>
				<el-table-column prop="logo" label="店铺logo">
					<template slot-scope="scope">
						<img :src="scope.row.logo" class="logo-icon" />
					</template>
				</el-table-column>
				<el-table-column prop="name" label="姓名"></el-table-column>
				<el-table-column prop="phone" label="电话"></el-table-column>
				<el-table-column prop="IDcard" label="身份证号"></el-table-column>
				<el-table-column prop="shopName" label="店铺名"></el-table-column>
				<el-table-column prop="place" label="地址"></el-table-column>
				<el-table-column prop="shopStatus" label="店铺状态">
					<template slot-scope="scope">
						<el-switch :value="scope.row.shopStatus==1" @change="updateShopStatus(scope.row.shopStatus)">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="shopStatus" label="审核状态">
					<template slot-scope="scope">
						<div v-if="scope.row.is_approval == 0">未审核</div>
						<div v-else-if="scope.row.is_approval == 1">审核成功</div>
						<div v-else-if="scope.row.is_approval == 2">审核失败</div>
					</template>
				</el-table-column>
				<el-table-column prop="shopMiaoshu" label="店铺描述"></el-table-column>
				<el-table-column prop="apply_time" label="申请时间">
					<template slot-scope="scope">
						{{scope.row.apply_time | dataFormat}}
					</template>
				</el-table-column>
				<el-table-column prop="updateTime" label="修改时间">
					<template slot-scope="scope">
						{{scope.row.updateTime | dataFormat}}
					</template>
				</el-table-column>
				<el-table-column prop="regTime" label="注册时间">
					<template slot-scope="scope">
						{{scope.row.regTime | dataFormat}}
					</template>
				</el-table-column>

				<el-table-column prop="shopLevel" label="店铺等级" fixed="right" width="160px">
					
					<template slot-scope="scope">
						<el-rate v-model="scope.row.shopLevel" disabled show-score text-color="#ff9900" >
						</el-rate>
					</template>
				</el-table-column>
				<el-table-column prop="" label="操作" fixed="right" width="75px">
					<template slot-scope="scope">
						<div>
							<el-button type="success" size="small" @click="$router.push('/goodstype?shop_id=' +scope.row.shop_id)">分类</el-button>
						</div>
						<div style="margin-top:10px;">
							<el-button type="success" size="small" @click="modify(scope.row.shop_id,scope.row)">修改</el-button>
						</div>
						<div style="margin-top:10px;">
							<el-button type="success" size="small" @click="detail(scope.row.shop_id)">详情</el-button>
						</div>
						<div style="margin-top:10px;" v-if="scope.row.is_approval == 0">
							<el-button type="success" size="small" @click="reviewClick(scope.row.shop_id)">审核</el-button>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div style="text-align: center;">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="10"
				 :current-page="page" :total="total" style="margin-top:10px;"></el-pagination>
			</div>
		</el-card>
		<!-- 审核 -->
		<el-dialog title="店铺审核" :visible.sync="reviewDialog" width="30%">
			<span>
				<el-radio v-model="reviewStd" label="1">通过</el-radio>
				<el-radio v-model="reviewStd" label="2">拒绝</el-radio>
			</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="reviewDialog = false">取 消</el-button>
				<el-button type="primary" @click="upApproval">确 定</el-button>
			</span>
		</el-dialog>
		<shop-add-dialog :value_show="showAddDialog" @close="closeAdd"></shop-add-dialog>
		<shop-edit-dialog :value_show="showEditDialog" :sid="id" @close="closeEdit" :item="item" v-if="showEditDialog"></shop-edit-dialog>
	</div>
</template>

<script>
	import shopAddDialog from './shopAddDialog.vue'
	import shopEditDialog from './shopEditDialog.vue'
	export default {
		name: "shop",
		components: {
			shopAddDialog,
			shopEditDialog
		},
		data() {
			return {
				//商品筛选
				form: {
					shop_name: ''
				},
				item: {},
				//评论id
				id: '',
				page: 1,
				total: 0,
				list: [],
				showReplyDialog: false,
				showAddDialog: false,
				showEditDialog: false,
				reviewDialog: false,
				reviewStd: '1',
				shopid: ''
			}
		},
		created() {
			this.getlist();
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val
				this.getlist();
			},
			//获取店铺列表
			async getlist() {
				let postdata = {
					...this.form,
					page: this.page,
					page_num: 10
				}
				let res = await this.$zcy.shopList(postdata)
				console.log("shopList", res)
				if (res.status == 1) {
					this.list = res.data
					this.total = res.all_num
				}
			},
			//添加店铺
			addShop() {
				this.showAddDialog = true
			},
			//修改店铺
			modify(id, item) {
				this.id = id + ""
				console.log(item)
				this.item = item
				this.showEditDialog = true
			},
			//关闭编辑
			closeEdit() {
				this.showEditDialog = false
				this.page = 1
				this.getlist();
			},
			//关闭添加
			closeAdd() {
				this.showAddDialog = false
				this.page = 1
				this.getlist();
			},
			//店铺详情
			detail(id) {
				this.$router.push({
					path: '/shopDetail',
					query: {
						sid: id
					}
				})
			},
			refresh() {
				this.page = 1
				this.getlist()
			},
			//关闭弹窗
			replyDialogClose() {
				this.showReplyDialog = false
				this.page = 1
				this.getlist();
			},
			//修改状态
			async updateShopStatus(id) {
				let res = await this.$zcy.updateShopStatus({
					shop_id: id
				})
				if (res.status == 1) {
					this.$message.success('修改成功')
					this.getlist()
				} else {
					this.$message.error(res.info)
				}
			},
			reviewClick(id) {
				this.shopid = id
				this.reviewDialog = true
			},
			//修改审核状态
			async upApproval(id) {
				console.log("reviewStd", this.reviewStd)
				this.$confirm('通过审核？').then(async () => {
					let res = await this.$zcy.upApproval({
						shop_id: id,
						type: this.reviewStd
					})
					if (res.status == 1) {
						this.$message.success('审核成功')
						this.getlist()
					} else {
						this.$message.error(res.info)
					}
				}).catch(async () => {});

			}
		}
	};
</script>

<style lang="scss">
	.el-form-item {
		margin-bottom: 10px;
	}

	.el-row {
		font-size: 14px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		text-align: left;
		padding-left: 10px;
		border-radius: 4px;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.goods-pic {
		width: 120px;
		height: 120px;
	}

	.display-flex {
		display: flex;
	}

	.logo-icon {
		width: 100%;
		height: 100%;
	}
</style>
