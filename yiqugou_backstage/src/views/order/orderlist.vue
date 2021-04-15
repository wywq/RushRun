<template>
	<div>
		<!-- 条件筛选 -->
		<el-card>
			<el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
				<el-form-item label="状态">
					<el-select v-model="form.type" placeholder="请选择" clearable size="mini">
						<el-option label="普通订单" value="1"></el-option>
						<el-option label="秒杀订单" value="2"></el-option>
                        <el-option label="拼团订单" value="3"></el-option>
					</el-select>
				</el-form-item>
                <el-form-item label="订单号">
					<el-input v-model="form.order_num" placeholder="按订单号搜索" clearable size="mini"></el-input>
				</el-form-item>
				<el-form-item label="手机号">
					<el-input v-model="form.phone" placeholder="按手机号搜索" clearable size="mini"></el-input>
				</el-form-item>
				</br>
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
		<el-card>
            <!-- <el-row :gutter="24">
                <el-col :span="6"><div class="grid-content bg-purple">本月开始时间：{{orderTime.yue_start | datetime_ymd}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">本月结束时间：{{orderTime.yue_end | datetime_ymd}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">本周开始时间：{{orderTime.zhou_start | datetime_ymd}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">本周结束时间：{{orderTime.zhou_end | datetime_ymd}}</div></el-col>
            </el-row> -->
            <el-row :gutter="24">
                <el-col :span="6"><div class="grid-content bg-purple">待付款数量：{{orderNum.dfh}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">全部数量：{{orderNum.all_num}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">商品数量：{{orderNum.goods_num}}</div></el-col>
                <el-col :span="6"><div class="grid-content bg-purple">昨天订单数量：{{orderNum.lastday}}</div></el-col>
            </el-row>
			<el-table :data="list" border style="width: 100%">
				<el-table-column prop="order_id" label="id" width="80px">
				</el-table-column>
				<el-table-column prop="order_num" label="订单号"></el-table-column>
				<el-table-column prop="ord_type" label="订单类型">
                    <template slot-scope="scope">{{getOrderType(scope.row.ord_type)}}</template>
                </el-table-column>
				<el-table-column prop="shop_id" label="店铺id"></el-table-column>
				<el-table-column prop="nickname" label="用户昵称"></el-table-column>
				<el-table-column prop="xiadan" label="下单时间"></el-table-column>
				<el-table-column prop="price" label="订单价格"></el-table-column>
				<el-table-column prop="status" label="订单状态">
					<template slot-scope="scope">{{getOrderStatus(scope.row.status)}}</template>
				</el-table-column>
				<el-table-column prop="" label="操作">
					<template slot-scope="scope">
						<el-button type="danger" size="small" @click="delOrder(scope.row.order_id)">删除</el-button>
                        <el-button type="success" size="small" @click="detail(scope.row.order_id)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="text-align: center;">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="10"
				 :current-page="page" :total="total" style="margin-top:10px;"></el-pagination>
			</div>

		</el-card>
	</div>
</template>

<script>
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
                    goods_name: ''
				},
				//商品id
				id:'',
				page: 1,
				total: 0,
				list: [],
				shoplist: [],
                fenleilist: [],
                //订单数据
                orderNum: {},
                //订单时间
                orderTime: {}
                
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
            //获取订单类型
            getOrderType(type){
                if(type == 1){
                    return "普通订单"
                }else if(type == 2){
                    return "秒杀订单"
                }else if(type == 3){
                    return "拼团订单"
                }
            },
            //获取订单状态类型
            getOrderStatus(status){
                if(status == 0){
                    return "待支付"
                }else if(status == 1){
                    return "已付款"
                }else if(status == 2){
                    return "待收货"
                }else if(status == 3){
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
					console.log("rid",id)
					let res = await this.$zcy.delOrd({"order_id":id})
					if (res.status == 1) {
						this.$message.success('删除成功')
						this.getlist()
					}
				}).catch(() => {});
            },
            //查看详情
            detail(id) {
                this.$router.push({path: '/orderDetail', query: {oid: id}})
            },
			refresh() {
				this.page = 1
				this.getlist()
			}
		}
	};
</script>

<style lang="scss">
    .el-form-item{
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
</style>
