<template>
	<div>
		<el-card>
			<div class="top">
				<div class="item_top" style="background: #32cc7f;">
					<div class="item_top_num" style="color: #fff;">
						<span>{{top.volume}}</span>
						<div>本月销量</div>
					</div>
					<div class="item_top_logo">
						<img src="../../assets/yuebuzu@2x.png" alt="">
					</div>
				</div>
				<div class="item_top" style="background: #e4eaec;">
					<div class="item_top_num">
						<span style="color: #32cc7f;">{{top.order_num}}</span>
						<div>订单总数</div>
					</div>
					<div class="item_top_logo">
						<img src="../../assets/2.png" alt="">
					</div>
				</div>
				<div class="item_top" style="background: #e4eaec;">
					<div class="item_top_num">
						<span style="color: #6c6fbf;">{{top.goods_num}}</span>
						<div>商品发布(个)</div>
					</div>
					<div class="item_top_logo">
						<img src="../../assets/3.png" alt="">
					</div>
				</div>
				<div class="item_top" style="background: #6c6fbf;">
					<div class="item_top_num" style="color: #fff;">
						<span>{{top.order_com}}</span>
						<div>已完成交易(单)</div>
					</div>
					<div class="item_top_logo">
						<img src="../../assets/4.png" alt="">
					</div>
				</div>
			</div>
		</el-card>
		<el-row :gutter="20" style="margin-bottom: 20px;">
			<el-col :span="12">
				<el-card>
					<h3 class="mid_title"><i class="el-icon-s-opportunity" style="color: orange;margin-right: 10px;"></i>商品提示</h3>
					<div class="mid_fenge"></div>
					<div class="mid_cont">
						<!-- <div>
							<span>{{midleft.on_sale}}</span>
							<div>店铺数</div>
						</div> -->
						<div>
							<span>{{midleft.goods_on}}</span>
							<div>上架商品数</div>
						</div>
						<div>
							<span>{{midleft.goods_off}}</span>
							<div>下架商品数</div>
						</div>
						<div>
							<span>{{midleft.stock_warn}}</span>
							<div>库存预警</div>
						</div>
					</div>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card>
					<h3 class="mid_title"><i class="el-icon-date" style="color: blue;margin-right: 10px;"></i>销售情况统计</h3>
					<div class="mid_fenge"></div>
					<div class="xiaoliang">
						<div class="xiao_item">
							<div class="xiao_title">昨日销量</div>
							<div class="xiao_contnet">订单量(件)：{{midright.order_yesterday}}</div>
							<div class="xiao_contnet">订单金额(元)：{{midright.price_yesterday}}</div>
						</div>
						<div class="xiao_item">
							<div class="xiao_title">本月销量</div>
							<div class="xiao_contnet">订单量(件)：{{midright.order_month}}</div>
							<div class="xiao_contnet">订单金额(元)：{{midright.price_month}}</div>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-row :gutter="20" style="margin-bottom: 20px;">
			<el-col :span="4">
				<el-card class="food_item">
					<img src="../../assets/order1.png" alt="" class="food_logo">
					<div class="food_status">未确认订单</div>
					<div class="head_num">{{foot.wqr}}</div>
				</el-card>
			</el-col>
			<el-col :span="4">
					<el-card class="food_item">
					<img src="../../assets/order2.png" alt="" class="food_logo">
					<div class="food_status">待发货订单</div>
					<div class="head_num">{{foot.dfh}}</div>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card class="food_item">
					<img src="../../assets/order3.png" alt="" class="food_logo">
					<div class="food_status">已发货订单</div>
					<div class="head_num">{{foot.yfh}}</div>
				</el-card>
			</el-col>
			<el-col :span="4">
				<el-card class="food_item">
					<img src="../../assets/order4.png" alt="" class="food_logo">
					<div class="food_status">已收货订单</div>
					<div class="head_num">{{foot.ysh}}</div>
				</el-card>
			</el-col>
			<!-- <el-col :span="4">
				<el-card class="food_item">
					<img src="../../assets/order5.png" alt="" class="food_logo">
					<div class="food_status">已完成订单</div>
					<div class="head_num">{{foot.ywc}}</div>
				</el-card>
			</el-col> -->
			<!-- <el-col :span="4">
				<el-card class="food_item">
					<img src="../../assets/order6.png" alt="" class="food_logo">
					<div class="food_status">退款中订单</div>
					<div class="head_num">{{foot.tkz}}</div>
				</el-card>
			</el-col> -->
		</el-row>
		<!-- <el-card>
			<h3 class="mid_title"><i class="el-icon-date" style="color: green;margin-right: 10px;"></i>订单总数统计</h3>
			<div class="mid_fenge"></div>
			<el-tabs v-model="activeName" type="card" @tab-click="handleClick" stretch>
			    <el-tab-pane label="今日" name="today"></el-tab-pane>
			    <el-tab-pane label="昨日" name="yesterday"></el-tab-pane>
			    <el-tab-pane label="本周" name="week"></el-tab-pane>
			    <el-tab-pane label="本月" name="month"></el-tab-pane>
			  </el-tabs>
			<chart ref="chart1" :options="option" :auto-resize="true" style="width: 100%;height: 400px;"></chart>
		</el-card> -->

	</div>
</template>

<script>
	export default {
		data() {
			return {
				top: {},
				midleft: {},
				midright:{},
				foot:{},
				 option:{
				    xAxis: {
				        type: 'category',
				        data: this.xdata
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [{
				        data: this.ydata,
				        type: 'line'
				    }]
				},
				ydata:[],
				xdata:[],
				alldata:[],
				activeName:'today'
			}
		},
		created() {
			this.gettop()
			this.getmidleft()
			this.getmidright()
			this.getfoot()
			this.getopt()
		},
		methods: {
			async gettop() {
				let res = await this.$zcy.indexStatistics()
				if (res.status == 1) {
					this.top = res.data
				}
			},
			async getmidleft() {
				let res = await this.$zcy.shopStatistics()
				if (res.status == 1) {
					this.midleft = res.data
				}

			},
			async getmidright(){
				let res = await this.$zcy.saleStatistics()
				if (res.status == 1) {
					this.midright = res.data
				}
				
			},
			async getfoot(){
				let res = await this.$zcy.orderStatistics()
				if (res.status == 1) {
					this.foot = res.data
				}
				
			},
			async getopt(){
				let res = await this.$zcy.orderStatisticsByCon()
				if (res.status == 1) {
					this.alldata = res.data
					this.handleClick()
				}
				
			},
			handleClick(){
				this.xdata=[]
				this.ydata = []
				this.alldata[this.activeName].forEach(item=>{
					this.ydata.push(item.count*1)
					let key =''
					if(this.activeName=='today' ||this.activeName=='yesterday' ){
						key = 'hours'
						this.xdata.push(item[key]+'时')
					}
					if(this.activeName=='month' ){
						key = 'months'
						this.xdata.push(item[key].replace(/[^\d]/g,'')+'号')
					}
					if(this.activeName=='week' ){
						key = 'weeks'
						this.xdata.push('星期' + item[key])
					}
				})
				this.option={
				    xAxis: {
				        type: 'category',
				        data: this.xdata
				    },
				    yAxis: {
				        type: 'value'
				    },
				    series: [{
				        data: this.ydata,
				        type: 'line'
				    }]
				},
				console.log(this.ydata)
			}
			
		}
	};
</script>

<style scoped>
	.top {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.item_top {
		width: 23%;
		height: 130px;
		display: flex;
		justify-content: space-between;
		padding: 0 20px;
		box-sizing: border-box;
		align-items: center;
		border-radius: 8px;
	}

	.item_top:hover {
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	}

	.item_top_logo {
		width: 75px;
	}

	.item_top_logo img {
		width: 100%;
		height: auto;
	}

	.item_top_num {
		text-align: center;
	}

	.item_top_num span {
		font-size: 26px;
	}

	.mid_fenge {
		height: 1px;
		width: 100%;
		margin: 10px 0;
		background: #eee;
	}

	.mid_cont {
		height: 160px;
		display: flex;
		text-align: center;
		justify-content: space-between;
		align-items: center;
		font-size: 14px;
		color: #707070;
		padding: 0 20px;
		width: 100%;
		box-sizing: border-box;
	}

	.mid_cont span {
		font-size: 26px;
		margin-bottom: 20px;
	}

	.xiao_item {
		width: 45%;
		background: #f7f7f7;

	}

	.xiaoliang {
		display: flex;
		justify-content: space-between;
	}

	.xiao_title {
		font-size: 16px;
		color: #272727;
		width: 175px;
		text-align: center;
		border-bottom: 1px solid #dedede;
		padding-bottom: 25px;
		padding-top: 25px;
		margin: 0 auto 20px;

	}

	.xiao_contnet {
		font-size: 14px;
		color: #858585;
		width: 100%;
		text-align: center;
		margin-bottom: 15px;
	}
	.food_item{
		text-align: center;
		padding-bottom: 20px;
	}
	.food_logo{
		width: 55px;
		height: 55px;
		margin: 20px 0;
	}
	.head_num{
		margin-top: 20px;
		font-size: 28px;
		color: orange;
	}
</style>
