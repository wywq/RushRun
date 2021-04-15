<template>
	<div>
		<!-- 条件筛选 -->
		<el-card v-if="!showlog">
			<el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
				<!-- <el-form-item label="状态">
					<el-select v-model="form.type" placeholder="请选择" clearable size="mini">
						<el-option label="普通订单" value="1"></el-option>
						
						<el-option label="秒杀订单" value="2"></el-option>
                        <el-option label="拼团订单" value="3"></el-option>
					</el-select>
				</el-form-item> -->

				<el-form-item label="订单号">
					<el-input v-model="form.order_num" placeholder="按订单号搜索" clearable size="mini"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="form.phone" placeholder="按手机号搜索" clearable size="mini"></el-input>
				</el-form-item>
				<!-- </br> -->
				<el-form-item label="下单开始时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.begin" style="width: 100%;" size="mini" value-format="timestamp"></el-date-picker>
				</el-form-item>
				<el-form-item label="下单结束时间">
					<el-date-picker type="date" placeholder="选择日期" v-model="form.end" style="width: 100%;" size="mini" value-format="timestamp"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="refresh">搜索</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<!-- 表格 -->
		<el-card v-if="!showlog">
			<el-row :gutter="24">
				<!-- <el-col :span="6">
					<div class="grid-content bg-purple">待付款数量：{{orderNum.dfh}}</div>
				</el-col> -->
				<el-col :span="6">
					<div class="grid-content bg-purple">全部数量：{{orderNum.all_num}}</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple">商品数量：{{orderNum.goods_num}}</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple">昨天订单数量：{{orderNum.lastday}}</div>
				</el-col>
			</el-row>
			<el-tabs v-model="form.order_status" type="card" @tab-click="refresh">
				<el-tab-pane label="全部" name=""></el-tab-pane>
				<!-- <el-tab-pane label="待付款" name="1"></el-tab-pane> -->
				<el-tab-pane label="待发货" name="2"></el-tab-pane>
				<el-tab-pane label="待收货" name="3"></el-tab-pane>
				<el-tab-pane label="完成" name="4"></el-tab-pane>
			</el-tabs>
			<el-table :data="list" border style="width: 100%">
				<!-- <el-table-column prop="order_id" label="id" width="80px">
				</el-table-column> -->

				<el-table-column prop="order_num" label="订单号"></el-table-column>
				<el-table-column prop="info" label="订单商品" width="300px">
					<template slot-scope="scope">
						<div class="goods_item" v-for="(item,i) in scope.row.info" :key="i" :class="i==scope.row.info.length-1?'border0':''">
							<el-image style="width: 60px; height: 60px" :src="item.pic" :preview-src-list="[item.pic]">
							</el-image>
							<div class="cont_ite">
								<el-tooltip effect="dark" :content="item.goods_name" placement="top-start">
									<div class="title">{{item.goods_name}}</div>
								</el-tooltip>
								<div class="lable">
									<!-- <span>{{item.guige}}</span> -->
									<span>{{item.price}}元 x{{item.num}}件 </span>
								</div>
							</div>
						</div>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="ord_type" label="订单类型">
                    <template slot-scope="scope">{{getOrderType(scope.row.ord_type)}}</template>
                </el-table-column> -->
				<!-- <el-table-column prop="shop_id" label="店铺id"></el-table-column> -->
				<el-table-column prop="nickname" label="用户昵称"></el-table-column>
				<el-table-column prop="xiadan" label="下单时间"></el-table-column>
				<el-table-column prop="price" label="订单价格"></el-table-column>
				<el-table-column prop="ord_type" label="订单来源">
					<template slot-scope="scope">{{getOrdertype(scope.row.ord_type)}}</template>
				</el-table-column>
				<el-table-column prop="ord_consign" label="订单状态">
					<template slot-scope="scope">{{getOrdconsign(scope.row.ord_consign)}}</template>
				</el-table-column>
				<el-table-column prop="" label="操作" width="140px">
					<template slot-scope="scope">
						<el-dropdown trigger="click" split-button size="mini" type="primary">
							<span class="el-dropdown-link">
								下拉菜单
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item style="text-align: center;" v-if="scope.row.ord_consign == 1">
									<el-button type="primary" size="mini" @click="id=scope.row.order_id,showlog=true" style="margin: 5px 0;">详情</el-button>
								</el-dropdown-item style="text-align: center;">
								<el-dropdown-item v-if="scope.row.status==1 && scope.row.ord_consign == 1" style="text-align: center;" >
									<el-button size="mini" @click="id=scope.row.order_id,showPostDialog= true" style="margin: 5px 0;">发货</el-button>
								</el-dropdown-item>
								<!-- <el-dropdown-item v-if="scope.row.status==1" style="text-align: center;">
									<el-button size="mini" type="warning" @click="openaddress(scope.row)" style="margin: 5px 0;">修改地址</el-button>
								</el-dropdown-item> -->
							</el-dropdown-menu>
						</el-dropdown>
						<!-- <el-button type="danger" size="mini" @click="delOrder(scope.row.order_id)">删除</el-button> -->

					</template>
				</el-table-column>
			</el-table>
			<div style="text-align: center;">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="10"
				 :current-page="page" :total="total" style="margin-top:10px;"></el-pagination>
			</div>

		</el-card>
		<orderDetail v-if="showlog"
		 @close="showlog=false,getlist()" 
		 :oid="id" 
		 @seeping="issee= true"
		 @changeadd="dialogFormVisible=true"
		 @tuikuan="tuikuan"
		 @fahuo="showPostDialog= true">
		</orderDetail>
		<el-drawer title="订单评价" :visible.sync="issee" direction="rtl" size="50%">
			<evaluate :order_id="id" v-if="issee"></evaluate>
		</el-drawer>
		<!-- 发货 -->
		<editPostDialog :value_show="showPostDialog" :order_id="id" @close="showPostDialog=false,showlog=false,getlist()"></editPostDialog>
		<!-- 更改收货地址 -->
		<el-dialog title="更改收货地址" :visible.sync="dialogFormVisible">
			<el-form :model="addform">
				<el-form-item label="收货人" label-width="120px">
					<el-input v-model="addform.member_name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="电话" label-width="120px">
					<el-input v-model="addform.member_phone" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="详细地址" label-width="120px">
					<el-input v-model="addform.detail" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="changaddress">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 退款 -->
		<el-dialog title="退款" :visible.sync="tuishow">
			<el-form :model="tuiform">
				<el-form-item label="" label-width="0">
					 <el-table
					    ref="multipleTable"
					    :data="tuikuanlist"
					    tooltip-effect="dark"
					    style="width: 100%"
					    @selection-change="handleSelectionChange">
					    <el-table-column
					      type="selection"
					      width="55">
					    </el-table-column>
					    <el-table-column prop="goods_name" label="商品名称" show-overflow-tooltip>
					    </el-table-column>
					    <el-table-column prop="pic" label="商品图片" >
					    	<template slot-scope="scope">
					    		<el-image style="width: 50px; height: 50px" :src="scope.row.pic" :preview-src-list="[scope.row.pic]">
					    		</el-image>
					    	</template>
					    </el-table-column>
					    <el-table-column prop="guige" label="商品规格" show-overflow-tooltip>
					    </el-table-column>
					    <el-table-column prop="num" label="数量" >
					    </el-table-column>
					    <el-table-column prop="price" label="单价" >
					    </el-table-column>
					    <el-table-column prop="all_price" label="总价" >
					    </el-table-column>
					  </el-table>
				</el-form-item>
				<el-form-item label="退款说明" label-width="80px">
					<el-input v-model="tuiform.explain" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="退款原因" label-width="80px">
					<el-input v-model="tuiform.reason" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="tuiform = false">取 消</el-button>
				<el-button type="primary" @click="changetui">确 定</el-button>
			</div>
			
		</el-dialog>
	</div>
</template>

<script>
	import evaluate from './components/evaluate.vue'
	import editPostDialog from './editPostDialog.vue'
	import logistics from './components/logistics.vue'
	import orderDetail from './components/orderDetail.vue'

	export default {
		data() {
			return {
				//商品筛选
				form: {
					type: '1',
					order_num: '',
					begin: '',
					end: '',
					phone: '',
					goods_name: '',
					order_status: ''
				},
				//商品id
				id: '',
				page: 1,
				total: 0,
				list: [],
				shoplist: [],
				fenleilist: [],
				issee: false,
				//订单数据
				orderNum: {},
				//订单时间
				orderTime: {},
				showPostDialog: false,
				showlog: false,
				dialogFormVisible: false,
				addform: {
					member_name: '',
					member_phone: '',
					detail: ''
				},
				tuikuanlist:[],
				tuishow:false,
				tuiform:{
					detail_id:'',
					explain:'',
					reason:''
				}

			}
		},
		components: {
			evaluate,
			editPostDialog,
			logistics,
			orderDetail
		},
		created() {
			this.getlist();
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val
				this.getlist();
			},
			//获取订单类型
			getOrderType(type) {
				if (type == 1) {
					return "普通订单"
				} else if (type == 2) {
					return "秒杀订单"
				} else if (type == 3) {
					return "拼团订单"
				}
			},
			//订单来源
			getOrdertype(type){
				if(type == 1)
				{
					return "正常订单"
				}else if(type==2)
				{
					return "砍价订单"
				}else{
					return "拍卖寄售"
				}
			},
			//获取订单状态类型
			getOrdconsign(type) {
				if (type == 0) {
					return "默认"
				} else if (type == 1) {
					return "提货"
				} else{
					return "寄售"
				}
			},
			//获取订单状态类型
			getOrderStatus(status) {
				if (status == 0) {
					return "待支付"
				} else if (status == 1) {
					return "已付款"
				} else if (status == 2) {
					return "待收货"
				} else if (status == 3) {
					return "已完成"
				}
			},
			//获取订单
			async getlist() {
				let postdata = {
					...this.form,
					page: this.page,
					page_num: 10
				}
				let res = await this.$zcy.getAllorders(postdata)

				if (res.status == 1) {
					this.list = res.data.order
					this.orderNum = res.data.num
					this.orderTime = res.shijian
					this.total = res.all_num
				}
			},
			//删除订单
			async delOrder(id) {
				this.$confirm('确认删除？').then(async () => {
					console.log("rid", id)
					let res = await this.$zcy.delOrd({
						"order_id": id
					})
					if (res.status == 1) {
						this.$message.success('删除成功')
						this.getlist()
					}
				}).catch(() => {});
			},
			async changetui(){
				
				if (!this.tuiform.detail_id) {
					this.$message.error('请选择退款商品')
					return
				}
				let res = await this.$zcy.refund(this.tuiform)
				if (res.status == 1) {
					this.dialogFormVisible = false
					this.$message.success('退款成功')
				} else {
					this.$message.error(res.info)
				}
			},
			openaddress(item) {
				this.id = item.order_id
				this.dialogFormVisible = true
			},
			async changaddress() {
				if (!this.addform.member_name) {
					this.$message.error('请输入收货人')
					return
				}
				if (!this.addform.member_phone) {
					this.$message.error('请输入收货电话')
					return
				}
				if (!this.addform.detail) {
					this.$message.error('请输入详细地址')
					return
				}
				let res = await this.$zcy.modifyAddress({ ...this.addform,
					order_id: this.id
				})
				if (res.status == 1) {
					this.dialogFormVisible = false
					this.$message.success('修改成功')
				} else {
					this.$message.error(res.info)
				}
			},
			refresh() {
				this.page = 1
				this.getlist()
			},
			tuikuan(list){
				this.tuikuanlist = list
				this.tuishow = true
			},
			 handleSelectionChange(val) {
				 let idarr = []
				 val.forEach(item=>{
					 idarr.push(item.id)
				 })
				 this.tuiform.detail_id=idarr.join(',')
			  }
		}
	};
</script>

<style lang="scss" scoped>
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

	.goods_item {
		padding: 5px 0;
		border-bottom: 2px solid #eee;
		display: flex;
	}

	.border0 {
		border: 0;
	}

	.cont_ite {
		width: 200px;
		margin-left: 5px;
	}

	.title {
		width: 200px;
		height: 40px;
		line-height: 20px;
		font-size: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box; //作为弹性伸缩盒子模型显示。
		-webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
		-webkit-line-clamp: 2; //显示的行
	}

	.lable {
		font-size: 12px;
		color: #999;
		display: flex;
		justify-content: space-between;

	}
</style>
