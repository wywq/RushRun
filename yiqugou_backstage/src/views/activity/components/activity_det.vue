<template>
	<div>
		<el-card>
			<div style="width: 100%">
				<el-form ref="form" :model="form" label-width="100px">
					<el-form-item label="原价">
						<el-input v-model="form.money"></el-input>
					</el-form-item>
					<el-form-item label="最低砍价格">
						<el-input v-model="form.min_money"></el-input>
					</el-form-item>
					<el-form-item label="允许砍价人数">
						<el-input v-model="form.num"></el-input>
					</el-form-item>
					<el-form-item label="库存数量">
						<el-input v-model="form.kucun"></el-input>
					</el-form-item>
					<el-form-item label="选择商品">
						<el-select v-model="form.goods_id"  filterable placeholder="请选择">
						    <el-option
						      v-for="item in kexuanList"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value"
							  >
						    </el-option>
						  </el-select>
					</el-form-item>
					<!-- <el-form-item label="商品信息">
						<el-table :data="form.goods" border style="width: 100%">
							<el-table-column prop="goods_name" label="商品名称">
							</el-table-column>
							<el-table-column prop="detson" label="规格名称" v-if="type==1">
							</el-table-column>
							<el-table-column label="佣金" width="160px" v-if="type==2">
								<template slot-scope="scope">
									<el-input-number v-model="scope.row.lirun" :min="0" size="mini" :precision="2" :step="0.1"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column label="拼图人数" width="160px" v-if="type==2">
								<template slot-scope="scope">
									<el-input-number v-model="scope.row.team_num" :min="0" size="mini"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column label="库存" width="160px">
								<template slot-scope="scope">
									<el-input-number v-model="scope.row.num" :min="1" size="mini"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column label="已销售数量" width="160px">
								<template slot-scope="scope">
									<el-input-number v-model="scope.row.sell_num" :min="0" size="mini"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column label="价格" width="160px">
								<template slot-scope="scope">
									<el-input-number v-model="scope.row.price" :min="0" size="mini" :precision="2" :step="0.1"></el-input-number>
								</template>
							</el-table-column>
							<el-table-column label="操作">
								<template slot-scope="scope">
									<el-button @click="del(scope.$index)" type="danger" size="mini">删除</el-button>
								</template>
							</el-table-column>

						</el-table>
						<el-button type="primary" @click="dialogVisible=true" style="margin-top: 10px;">添加活动商品</el-button>
					</el-form-item> -->
					<el-form-item style="text-align: center;">
						<el-button type="primary" @click="onSubmit">确定修改</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-dialog title="选择商品" :visible.sync="dialogVisible">
				<el-cascader v-model="goodsactive" :options="goodslist" :props="{value:type !=1?'goods_id':'id',label:'name',children:type != 1?'children':'guige_one'}"
				 filterable size="mini" clearable></el-cascader>
				<span slot="footer" class="dialog-footer">
					<el-button @click="dialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="add">确 定</el-button>
				</span>
			</el-dialog>
		</el-card>
	</div>
</template>

<script>
	import upload from '@/components/upload.vue'
	export default {
		data() {
			return {
				form: {
					money: '',
					min_money:'',
					num:'',
					kucun:'',
					name:'',
				},
				kexuanList:[],
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
		props: ['id', 'type'],
		components: {
			upload
		},
		async created() {
			this.getActivityInfo()
			this.keXuan()
		},
		methods: {
			async getActivityInfo() {
				let res = await this.$zcy.getActivityInfo({
					act_id: this.id
				})
				if (res.status == 1) {
					this.form = {
						act_id:res.data.act_id,
						money:res.data.money,
						min_money:res.data.min_money,
						num:res.data.num,
						kucun:res.data.kucun,
						goods_id:res.data.goods_id,
					}
					// this.getallgoods()
				}
			},
			//获取可选择的商品
			async keXuan(){
				let res = await this.$zcy.keXuan({act_id:this.id})
				if(res.status == 1)
				{
					this.kexuanList = res.data
				}else{
					this.$message.warning(res.info)
				}
			},
			del(index) {
				this.form.goods.splice(index, 1)
				// this.getallgoods()

			},
			// async getallgoods() {
			// 	if (this.type != 1) {
			// 		let type = {
			// 			type:this.type
			// 		}
			// 		let res = await this.$zcy.showSku(type)
			// 		if (res.status == 1) {
			// 			let goodslist = res.data
			// 			goodslist.forEach(item => {
			// 				this.form.goods.forEach(it => {
			// 					if (it.goods_id == item.goods_id) {
			// 						item.disabled = true
			// 					}

			// 				})
			// 			})
			// 			this.goodslist = goodslist


			// 		}
			// 	} else {
			// 		let res = await this.$zcy.getAllGoods()
			// 		if (res.status == 1) {
			// 			let goodslist = res.data
			// 			goodslist.forEach(item => {
			// 				item.id = item.goods_id
			// 			})
			// 			goodslist.forEach(item1 => {
			// 				if (item1.guige_one) {
			// 					item1.guige_one.forEach(item2 => {
			// 						if (item2.guige_one) {
			// 							item2.guige_one.forEach(item3 => {
			// 								this.form.goods.forEach(it => {
			// 									if (it.det_id == item3.id) {
			// 										item3.disabled = true
			// 									}
			// 								})
			// 							})
			// 						} else {
			// 							this.form.goods.forEach(it => {
			// 								if (it.det_id == item2.id) {
			// 									item2.disabled = true
			// 								}
			// 							})
			// 						}
			// 					})
			// 				} else {
			// 					this.form.goods.forEach(it => {
			// 						if (it.det_id == item1.id) {
			// 							item1.disabled = true
			// 						}
			// 					})
			// 				}
			// 			})
			// 			this.goodslist = goodslist
			// 		}
			// 	}
			// },
			add() {
				if (this.goodsactive.length == 0) {
					this.$message.error('请选择商品')
					return
				}
				//拼团添加
				if (this.type != 1 ) {
					let item = {}
					let i = 0
					this.goodslist.forEach((it, index) => {
						if (this.goodsactive[0] == it.goods_id) {
							item = it
							item.disabled = true
							i = index
						}

					})
					this.goodslist.splice(i, 1, item)
					let t = {
						act_id: '',
						add_time: '',
						det_id: '',
						detson: '',
						goods_id: item.goods_id,
						goods_name: item.name,
						lirun: 10,
						name: item.name,
						num: 999,
						price: item.price,
						sell_num: 0,
						team_num: 3,
						ms_gid: '',
						shop_id: item.shop_id
					}

					this.form.goods.push(t)
					this.goodsactive = []
					this.dialogVisible = false
				} else {
					let item = {}
					this.goodslist.forEach((it, index) => {
						if (this.goodsactive[0] == it.id) {
							item = it
							item.goods_name = it.name
							item.shop_id =it.shop_id
							if (this.goodsactive[1]) {
								it.guige_one.forEach((it1, index) => {
									if (this.goodsactive[1] == it1.id) {
										item = it1
										item.goods_name =  it.name
										item.shop_id =it.shop_id
										if (this.goodsactive[2]) {
											it1.guige_one.forEach((it2, index) => {
												if (this.goodsactive[2] == it2.id) {
													item = it2
													item.goods_name =  it.name
													item.name = it1.name + '/' + it2.name
													item.shop_id =it.shop_id
												}
											})
										}
									}
								})
							}
						}
					})
					console.log(item)
					let t = {
						act_id:this.id,
						add_time: '',
						det_id: item.id,
						detson: item.name,
						goods_id: item.goods_id,
						goods_name: item.goods_name,
						lirun: 0,
						name: item.name,
						num: item.num,
						price: item.price,
						sell_num: 0,
						team_num: 0,
						ms_gid: '',
						shop_id: item.shop_id
					}
					this.form.goods.push(t)
					this.goodsactive = []
					this.dialogVisible = false
					// this.getallgoods()
				}

			},
			async onSubmit() {
				if (!this.form.money) {
					this.$message.error('原价不能为空')
					return
				}
				if (!this.form.min_money) {
					this.$message.error('最低砍价格不能为空')
					return
				}
				if (!this.form.num) {
					this.$message.error('允许砍价人数不能为空')
					return
				}
				if (!this.form.kucun) {
					this.$message.error('库存不能为空')
					return
				}
				if(!this.form.goods_id)
				{
					this.$message.error('请选择商品')
					return
				}
				
				let postdata = {
					act_id:this.form.act_id,
					money:this.form.money,
					min_money:this.form.min_money,
					num:this.form.num,
					kucun:this.form.kucun,
					goods_id:this.form.goods_id,
				}
				// let postdata = {}
				// if (this.type == 2) {
				// 	postdata = {
				// 		name: this.form.name,
				// 		goods: JSON.stringify(this.form.goods),
				// 		begintime: '',
				// 		endtime: '',
				// 		ms_id: this.id,
				// 		type: this.type
				// 	}
				// }else if(this.type == 1){
				// 	if (this.form.time.length != 2) {
				// 		this.$message.error('请添加活动时间')
				// 		return
				// 	}
				// 	postdata = {
				// 		name: this.form.name,
				// 		goods: JSON.stringify(this.form.goods),
				// 		begintime: this.form.time[0],
				// 		endtime:  this.form.time[1],
				// 		ms_id: this.id,
				// 		type: this.type
				// 	}
				// }else{
				// 	postdata = {
				// 		name: this.form.name,
				// 		goods: JSON.stringify(this.form.goods),
				// 		begintime: '',
				// 		endtime: '',
				// 		ms_id: this.id,
				// 		type: this.type
				// 	}
				// }
				
				let res = await this.$zcy.addActivity(postdata)
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
