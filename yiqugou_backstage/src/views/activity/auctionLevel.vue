<template>
	<div>
		<el-card v-if="!isadd">
			<el-table :data="list" border style="width: 100%">
				<el-table-column prop="level_id" label="竞拍等级ID">
				</el-table-column>
				<el-table-column prop="name" label="竞拍等级名称">
				</el-table-column>
				<el-table-column prop="join_num" label="参与拍卖人数">
				</el-table-column>
				<el-table-column prop="min_price" label="起拍价">
				</el-table-column>
				<el-table-column prop="max_price" label="封顶价格">
				</el-table-column>
				<el-table-column prop="add_price" label="每次加价">
				</el-table-column>
				<el-table-column prop="price_reward" label="拍次奖励">
				</el-table-column>
				<el-table-column prop="auction_reward" label="奖励比例">
				</el-table-column>
				<el-table-column prop="minute_long" label="拍卖持续时间(分钟)">
				</el-table-column>
				<el-table-column label="操作"  width="160px">
					<template slot-scope="scope">
						<el-button @click="id=scope.row.level_id,item = scope.row,isadd=true" type="primary" size="mini">编辑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-card v-if="isadd">
			<el-button type="primary" size="small" @click="isadd = false,id= ''" >返回</el-button>
		</el-card>
		<el-card v-if="isadd">
			<auction-det :id="id" :item="item" @rels="isadd=false,getlist()"> </auction-det>
		</el-card>
	</div>
</template>

<script>
	import upload from '@/components/upload.vue'
	import auction_det from './components/auction_det.vue'
	export default {
		data() {
			return {
				list: [],
				id:'',
				isadd:false,
				item:{}
			}
		},
		components: {
			upload,
			'auction-det':auction_det
		},
		created() {
			this.getlist()
		},
		methods: {
			async getlist(){
				let res = await this.$zcy.auctionLevel()
				if(res.status==1){
					this.list = res.data
				}else{
					this.list=[]
				}
			},
		}
	};
</script>

<style>
</style>
