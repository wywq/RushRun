<template>
	<div>
		<el-card v-if="!isadd && !ischa && !isauction">
			<el-button @click="id='',item={},isadd=true" type="primary">发起竞拍</el-button>
			<el-button type="primary" size="small" @click="refresh">刷新</el-button>
		</el-card>
		<el-card v-if="!isadd && !ischa && !isauction">
			<el-table :data="list" border style="width: 100%">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" class="demo-table-expand">
							<el-form-item label="发起竞拍人ID">
								<span v-html="props.row.member_id"></span>
							</el-form-item>
							<el-form-item label="发起竞拍人账号">
								<span v-html="props.row.phone"></span>
							</el-form-item>
							<el-form-item label="竞拍商品">
								<span v-html="props.row.goods_name"></span>
							</el-form-item>
							<el-form-item label="下单时间">
								<template slot-scope="scope">
									{{props.row.member_time | dataFormat}}
								</template>
							</el-form-item>
							<el-form-item label="发起时间">
								<template slot-scope="scope">
									{{props.row.add_time | dataFormat}}
								</template>
							</el-form-item>
							
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="auction_id" label="竞拍ID">
				</el-table-column>
				<el-table-column prop="name" label="发起竞拍人">
				</el-table-column>
				<!-- <el-table-column prop="goods_name" label="商品名称">
				</el-table-column> -->
				<el-table-column prop="start_price" label="起拍价">
				</el-table-column>
				<el-table-column prop="top_price" label="封顶价格">
				</el-table-column>
				<el-table-column prop="auction_type" label="类型">
				</el-table-column>
				<el-table-column prop="ensure_money" label="竞拍保证金">
				</el-table-column>
				<el-table-column prop="level_name" label="竞拍等级">
				</el-table-column>
				<el-table-column prop="auction_status" label="竞拍状态">
				</el-table-column>
				<el-table-column prop="pic" label="开始时间">
					<template slot-scope="scope">
						{{scope.row.start_time | dataFormat}}
					</template>
				</el-table-column>
				<el-table-column prop="pic" label="结束时间">
					<template slot-scope="scope">
						{{scope.row.end_time | dataFormat}}
					</template>
				</el-table-column>
				
				<el-table-column label="操作"  width="200px">
					<template slot-scope="scope">
						<el-button @click="id=scope.row.auction_id,item = scope.row,isadd=true" type="primary" size="mini">编辑</el-button>
						<el-button @click="id=scope.row.auction_id,item = scope.row,ischa=true" type="primary" size="mini">查看预约</el-button>
						<el-button @click="id=scope.row.auction_id,item = scope.row,isauction=true" type="primary" size="mini">查看竞拍</el-button>
						<!-- <el-button @click="det(scope.row.id)" type="danger" size="mini">删除</el-button> -->
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-card v-if="isadd">
			<el-button type="primary" size="small" @click="isadd = false,id= ''" >返回</el-button>
		</el-card>
		<el-card v-if="isadd">
			<fupin-det :id="id" :item="item" @rels="isadd=false,getlist()"> </fupin-det>
		</el-card>
		<el-card v-if="ischa">
			<el-button type="primary" size="small" @click="ischa = false,id= ''" >返回</el-button>
		</el-card>
		<el-card v-if="ischa">
			<fupin-chakan :id="id" :item="item" @rels="ischa=false,getlist()"> </fupin-chakan>
		</el-card>
		<el-card v-if="isauction">
			<el-button type="primary" size="small" @click="isauction = false,id= ''" >返回</el-button>
		</el-card>
		<el-card v-if="isauction">
			<fupin-auction :id="id" :item="item" @rels="isauction=false,getlist()"> </fupin-auction>
		</el-card>
		<div style="text-align: center;" v-if="!isadd && !ischa && !isauction">
			<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="20"
			 :current-page="page" :total="total" style="margin-top:10px;"></el-pagination>
		</div>
	</div>
</template>

<script>
	import upload from '@/components/upload.vue'
	import fupin_det from './components/fupin_det.vue'
	import fupin_chakan from './components/fupin_chakan.vue'
	import fupin_auction from './components/fupin_auction.vue'
	export default {
		data() {
			return {
				list: [],
				id:'',
				isadd:false,
				ischa:false,
				isauction:false,
				item:{},
				page:1,
				total:0,
			}
		},
		components: {
			upload,
			'fupin-det':fupin_det,
			'fupin-chakan':fupin_chakan,
			'fupin-auction':fupin_auction
		},
		created() {
			this.getlist()
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val
				this.getlist();
			},
			refresh(){
				this.getlist()
			},
			async getlist(){
				let res = await this.$zcy.jingpaiList()
				if(res.status==1){
					this.list = res.data
					this.list.forEach(function(item,index){
						if(item.auction_type == 1)
						{
							item.auction_type = '首拍'
						}else{
							item.auction_type = '复拍'
						}
						if(item.auction_status == 1)
						{
							item.auction_status = '挂卖中'
						}else if(item.auction_status == 2)
						{
							item.auction_status = '正在拍卖'
						}else if(item.auction_status == 3)
						{
							item.auction_status = '拍卖完成'
						}else{
							item.auction_status = '流拍'
						}
						// item.start_time = item.start_time / 1000 
					})
				}else{
					this.list=[]
				}
			},
			async det(id) {
				let res = await this.$zcy.delAcution({
					id,
				})
				if (res.status == 1) {
					this.$message.success('删除成功')
					this.getlist()
				}
			},
		}
	};
</script>

<style>
</style>
