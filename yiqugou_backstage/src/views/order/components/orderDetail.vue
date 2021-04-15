<template>
	<div>
		<!-- 订单详情 -->
		<el-card>
			<el-row :gutter="24" class="item-style">
				<el-col :span="23" :offset="1">
					<el-button type="success" size="small" @click="$emit('close')">返回</el-button>
				</el-col>
			</el-row>
		</el-card>
		<el-card>
			<el-steps :active="orderDetail.orderInfo.status" align-center finish-status="success">
				<el-step title="买家下单" :description="orderDetail.orderInfo.member_time"></el-step>
				<el-step title="买家付款" :description="orderDetail.orderInfo.status>=1?orderDetail.orderInfo.zftime:''"></el-step>
				<el-step title="商家发货" :description="orderDetail.orderInfo.status>=2?orderDetail.orderInfo.daodian_time:''"></el-step>
				<el-step title="交易完成" :description="orderDetail.orderInfo.status>=3?orderDetail.orderInfo.over_time:''"></el-step>
			</el-steps>
		</el-card>
		<el-card>
			<el-row>
				<el-col :span="6">
					<el-card>
						<div class="title1">订单信息</div>
						<div class="item1">
							<div class="lable1">订单编号：</div>
							<div class="cont1">{{orderDetail.orderInfo.order_num}}</div>
						</div>
						<div class="item1">
							<div class="lable1">订单类型：</div>
							<div class="cont1">{{orderDetail.orderInfo.ord_type==1?'普通订单':orderDetail.orderInfo.ord_type==2?'砍价订单':'拍卖订单'}}</div>
						</div>
						<!-- <div class="item1">
							<div class="lable1">付款方式：</div>
							<div class="cont1">{{orderDetail.orderInfo.pay_way==1?'微信支付':'支付宝支付'}}</div>
						</div> -->
						<div class="item1">
							<div class="lable1">买家：</div>
							<div class="cont1">{{orderDetail.memberInfo.nick}}</div>
						</div>
						<!-- <div class="item1">
							<div class="lable1">店铺名称：</div>
							<div class="cont1">{{orderDetail.shop.shopName}}</div>
						</div> -->
						<div class="item1">
							<div class="lable1">订单总价：</div>
							<div class="cont1">{{orderDetail.orderInfo.price}}</div>
						</div>
						<div class="item1">
							<div class="lable1">收货人姓名：</div>
							<div class="cont1">{{orderDetail.address.member_name}}</div>
						</div>
						<div class="item1">
							<div class="lable1">收货人电话：</div>
							<div class="cont1">{{orderDetail.address.member_phone}}</div>
						</div>
						<div class="item1">
							<div class="lable1">下单地址：</div>
							<div class="cont1">{{orderDetail.address.detail}}</div>
						</div>
						<div class="item1">
							<div class="lable1">详细信息：</div>
							<div class="cont1">{{orderDetail.address.pro}}</div>
						</div>
						<div class="item1">
							<div class="lable1">快递名称：</div>
							<div class="cont1">{{orderDetail.orderInfo.post_name}}</div>
						</div>
						<div class="item1">
							<div class="lable1">快递单号：</div>
							<div class="cont1">{{orderDetail.orderInfo.post_number}}</div>
						</div>
						
						<!-- <div class="item1">
							<div class="lable1">订单备注：</div>
							<div class="cont1">{{orderDetail.orderInfo.remarks}}</div>
						</div> -->
						
					</el-card>
				</el-col>
				<el-col :span="18">
					<el-card>
						<div style="margin-bottom: 20px;font-size: 18px;">
							<i class="el-icon-info"></i>
							订单状态：{{state(orderDetail.orderInfo.status)}}
						</div>
						<div>
							<!-- <el-button size="mini" type="primary" v-if="orderDetail.orderInfo.status>=4" @click="$emit('seeping')">查看评价</el-button> -->
							<el-button size="mini" type="primary" v-if="orderDetail.orderInfo.status==1 && orderDetail.orderInfo.ord_consign == 1" @click="$emit('fahuo')">发货</el-button>
							<!-- <el-button size="mini" type="primary" v-if="orderDetail.orderInfo.status>=2">查看物流</el-button> -->
							<!-- <el-button size="mini" type="primary" v-if="orderDetail.orderInfo.status==1" @click="$emit('changeadd')">修改地址</el-button> -->
							<!-- <el-button size="mini" type="primary" v-if="orderDetail.orderInfo.status==1" @click="$emit('tuikuan',orderDetail.ordergoods)">退款</el-button> -->
						</div>
					</el-card>
					<el-card>
						<div style="margin-bottom: 20px;font-size: 18px;">
							订单商品
						</div>
						<div>
							<el-table :data="orderDetail.ordergoods" style="width: 100%">
								<el-table-column prop="goods_name" label="商品名称" show-overflow-tooltip>
								</el-table-column>
								<el-table-column prop="pic" label="商品图片" >
									<template slot-scope="scope">
										<el-image style="width: 50px; height: 50px" :src="scope.row.pic" :preview-src-list="[scope.row.pic]">
										</el-image>
									</template>
								</el-table-column>
								<!-- <el-table-column prop="guige" label="商品规格" show-overflow-tooltip>
								</el-table-column> -->
								<el-table-column prop="num" label="数量" >
								</el-table-column>
								<el-table-column prop="price" label="单价" >
								</el-table-column>
								<el-table-column prop="all_price" label="总价" >
								</el-table-column>
							</el-table>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>

<script>
	export default {
		name: "orderDetail",
		props: ['oid'],
		data() {
			return {
				orderDetail: {},
				detail:'111',
				state(s){
					if(s==0){
						return '待支付'
					}else if(s==1){
						return '待发货'
					}else if(s==2){
						return '待收货'
					}else{
						return '交易完成'
					}
				}
			}
		},
		created() {
			this.getDetail();
			console.log('哈哈哈')
		},
		methods: {
			//获取订单详情
			async getDetail() {
				console.log('zheli')
				let postdata = {
					order_id: this.oid
				}
				console.log('here')
				let res = await this.$zcy.getOrderInfo(postdata)
				console.log("订单详情", res)
				if (res.status == 1) {
					this.orderDetail = res.data
				}
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

	.item-style {
		padding: 20px;
	}

	.title1 {
		margin-bottom: 20px;
	}

	.item1 {
		display: flex;
		font-size: 14px;
		margin-bottom: 10px;
		color: #999;
	}
</style>
