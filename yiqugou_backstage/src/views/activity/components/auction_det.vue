<template>
	<div>
		<el-card>
			<div style="width: 100%">
				<el-form ref="form" :model="form" label-width="140px">
					<el-form-item label="竞拍等级名称">
						<el-input v-model="form.name"></el-input>
					</el-form-item>
					<el-form-item label="拍卖参与人数">
						<el-input v-model="form.join_num"></el-input>
					</el-form-item>
					<el-form-item label="起拍价">
						<el-input v-model="form.min_price"></el-input>
					</el-form-item>
					<el-form-item label="封顶价格">
						<el-input v-model="form.max_price"></el-input>
					</el-form-item>
					<el-form-item label="每次加价">
						<el-input v-model="form.add_price"></el-input>
					</el-form-item>
					<el-form-item label="拍次奖励">
						<el-input v-model="form.price_reward"></el-input>
					</el-form-item>
					<el-form-item label="奖励比例">
						<el-input v-model="form.auction_reward"></el-input>
					</el-form-item>
					<el-form-item label="拍卖持续时间(分钟)">
						<el-input v-model="form.minute_long"></el-input>
					</el-form-item>
					<el-form-item style="text-align: center;">
						<el-button type="primary" @click="onSubmit">确定修改</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
	import upload from '@/components/upload.vue'
	export default {
		data() {
			return {
				form: {
					level_id: '',
					name:'',
					join_num:'',
					min_price:'',
					max_price:'',
					add_price:'',
					price_reward:'',
					auction_reward:'',
					minute_long:'',
				},
				goodslist: [],
				goodsactive: [],
				dialogVisible: false,
				pickerOptions: {
					shortcuts: [{
						text: '一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
							picker.$emit('pick', [start, end]);
						}
					}]
				},
			}
		},
		props: ['id'],
		components: {
			upload
		},
		async created() {
			this.auctionLevelInfo()
		},
		methods: {
			async auctionLevelInfo() {
				let res = await this.$zcy.auctionLevelInfo({
					id: this.id
				})
				if (res.status == 1) {
					this.form = res.data
				}
			},
			async onSubmit() {
				if (!this.form.name) {
					this.$message.error('竞拍等级名称不能为空')
					return
				}
				if (!this.form.join_num) {
					this.$message.error('拍卖参与人数不能为空')
					return
				}
				if (!this.form.min_price) {
					this.$message.error('起拍价不能为空')
					return
				}
				if (!this.form.max_price) {
					this.$message.error('封顶价格不能为空')
					return
				}
				if (!this.form.add_price) {
					this.$message.error('每次加价不能为空')
					return
				}
				if (!this.form.price_reward) {
					this.$message.error('拍次奖励不能为空')
					return
				}
				if (!this.form.auction_reward) {
					this.$message.error('奖励比例不能为空')
					return
				}
				if (!this.form.minute_long) {
					this.$message.error('拍卖持续时间不能为空')
					return
				}
				let postdata = {
					level_id:this.form.level_id,
					name:this.form.name,
					join_num:this.form.join_num,
					min_price:this.form.min_price,
					max_price:this.form.max_price,
					add_price:this.form.add_price,
					price_reward:this.form.price_reward,
					auction_reward:this.form.auction_reward,
					minute_long:this.form.minute_long,
				}
				let res = await this.$zcy.updateAuctionlevel(postdata)
				if (res.status == 1) {
					this.$message.success('修改成功')
					this.$emit('rels')
				} else {
					this.$message.error(res.info)
				}
			}
		}
	};
</script>

<style scoped>
	.line {
		text-align: center;
	}
</style>
