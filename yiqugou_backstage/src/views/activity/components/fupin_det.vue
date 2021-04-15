<template>
	<div>
		<el-card>
			<div style="width: 500px">
				<el-form ref="form" :model="form" label-width="120px">
					<el-form-item label="发起竞拍人账号">
						<el-input v-model="form.phone" v-if="form.id == ''"></el-input>
						<el-input v-model="form.phone" v-else disabled></el-input>
					</el-form-item>
					<el-form-item label="起拍价">
						<el-input v-model="form.start_price" disabled></el-input>
					</el-form-item>
					<el-form-item label="封顶价格">
						<el-input v-model="form.top_price" disabled></el-input>
					</el-form-item>
					<!-- <el-form-item label="拍卖类型">
						<el-select v-model="form.auction_type" placeholder="请选择" clearable>
							<el-option label="首拍" value="1"></el-option>
							<el-option label="复拍" value="2"></el-option>
						</el-select>
					</el-form-item> -->
					<el-form-item label="竞拍保证金">
						<el-input v-model="form.ensure_money" disabled></el-input>
					</el-form-item>
					<el-form-item label="竞拍等级">
						<el-input v-model="form.level_name" disabled></el-input>
					</el-form-item>
					<el-form-item label="竞拍商品">
						<el-select v-model="form.goods_id" placeholder="请选择" clearable v-if="form.id == ''">
							<el-option v-for="item in getGoodsList" :key="item.goods_id" :label="item.name" :value="item.goods_id*1"></el-option>
						</el-select>
						<el-input v-model="form.goods_name" disabled v-else></el-input>
					</el-form-item>
					<el-form-item label="商品价值">
						<el-input v-model="form.goods_money" @input="zheg(form.goods_money)" v-if="form.id == ''"></el-input>
						<el-input v-model="form.goods_money" disabled v-else></el-input>
					</el-form-item>
					<el-form-item label="开始时间">
						<!-- <el-time-picker
						    v-model="form.start_time"
							value-format = 'timestamp'
						    placeholder="任意时间点">
						  </el-time-picker>	 -->	
						  <div class="block">
							  <el-date-picker
								v-model="form.start_time"
								type="datetime"
								placeholder="选择日期时间"
								value-format="timestamp">
							  </el-date-picker>
							</div>
					</el-form-item>
				</el-form>
			</div>
			<div style="width: 100%">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item style="text-align: center;">
						<el-button type="primary" @click="onSubmit">确定</el-button>
					</el-form-item>
				</el-form>
				
			</div>
			
		</el-card>
	</div>
</template>

<script>
	import upload from '@/components/upload.vue'
	import myQuillEditor from '@/components/myQuillEditor.vue'
	export default {
		data() {
			return {
				form: {
					id:'',
					phone: '',
					start_price:'',
					top_price:'',
					cost_price:'',
					ensure_money:'',
					auction_level:'',
					start_time:'',
					goods_id:'',
					goods_money:0,
					level_name:'',
					goods_name:'',
					level_id:''
				},
				//竞拍等级
				level:[],
				auc_level:'',
				config:{},
				goodslist: [],
				getGoodsList:[],
				pickerOptions: {
				          shortcuts: [{
				            text: '今天',
				            onClick(picker) {
				              picker.$emit('pick', new Date());
				            }
				          }, {
				            text: '昨天',
				            onClick(picker) {
				              const date = new Date();
				              date.setTime(date.getTime() - 3600 * 1000 * 24);
				              picker.$emit('pick', date);
				            }
				          }, {
				            text: '一周前',
				            onClick(picker) {
				              const date = new Date();
				              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
				              picker.$emit('pick', date);
				            }
				          }]
				        },
			}
		},
		props: ['id','item'],
		components: {
			upload,
			myQuillEditor
		},
		
		async created() {
			this.GoodsList()
			this.auctionLevel()
			this.form.id = this.id
			for(let k in this.form){
				if(this.item[k]){
					this.form[k] = this.item[k]
				}
			}
			this.form.start_time = this.form.start_time * 1000
		},
		methods: {
			zheg(goods_money){
				let max_money = (goods_money / this.config.caps_parameter).toFixed(2)
				let newlevel = []
				this.level.forEach(function(item,index){
					if(Number(item.max_price) >= Number(max_money))
					{
						newlevel.push(item)
					}
				})
				if(newlevel.length == 0)
				{
					this.level.sort(function(x,y){
						return x.max_price;
					})
					newlevel = this.level
					this.auc_level = newlevel[5]
				}else{
					this.auc_level = newlevel[0]
				}
				this.form.top_price = max_money
				this.form.start_price = (this.config.start_price_parameter * max_money * 0.01).toFixed(2)
				if(this.auc_level.margin == 0)
				{
					this.form.ensure_money = this.form.top_price * this.auc_level.margin_ratio * 0.01
				}else{
					this.form.ensure_money = this.auc_level.margin
				}
				this.form.level_name = this.auc_level.name
				this.form.level_id = this.auc_level.level_id
				 
				// console.log('max_money',xv)
			},
			//获取所有的竞拍等级
			async auctionLevel(){
				let res = await this.$zcy.auctionLevel()
				if(res.status == 1)
				{
					this.level = res.data
					this.config.caps_parameter = res.config.caps_parameter
					this.config.start_price_parameter = res.config.start_price_parameter
				}
			},
			
			//所有商品
			async GoodsList(){
				let res = await this.$zcy.getGoodsList()
				if(res.status == 1)
				{
					this.getGoodsList = res.data
				}else{
					this.$message.error(res.info)
				}
			},
			
			
			//发起竞拍
			async onSubmit() {
				if (!this.form.phone) {
					this.$message.error('竞拍人账号不能为空')
					return
				}
				if (!this.form.start_time) {
					this.$message.error('请选择开始时间')
					return
				}
				console.log('id',this.form.id)
				let res = await this.$zcy.addAuction({
					id:this.form.id,
					phone:this.form.phone,
					money:this.form.goods_money,
					start_time:this.form.start_time,
					goods_id:this.form.goods_id
				})
				if (res.status == 1) {
					this.$message.success('成功')
					this.$emit('rels')
				}else{
					this.$message.error(res.info)
				}
				
				
			},
			getimg(val){
				this.form.pic = val
			},
			getContent(val){
				this.form.content = val
			}
		}
	};
</script>

<style scoped>
	.line {
		text-align: center;
	}
</style>
