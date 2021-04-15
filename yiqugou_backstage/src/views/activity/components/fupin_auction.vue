<template>
	<div>
		<el-card>
			<div style="width: 100%">
				<el-table :data="list" border style="width: 100%">
					<el-table-column prop="scene_id" label="拍卖ID">
					</el-table-column>
					<el-table-column prop="member_id" label="竞拍用户ID">
					</el-table-column>
					<el-table-column prop="member_name" label="竞拍用户昵称">
					</el-table-column>
					<el-table-column prop="get_money" label="竞拍价格">
					</el-table-column>
					<el-table-column prop="reward_money" label="参与竞拍报价的奖励">
					</el-table-column>
					<el-table-column prop="add_time" label="报价时间">
						<template slot-scope="scope">
							{{scope.row.add_time | dataFormat}}
						</template>
					</el-table-column>
					<!-- <el-table-column label="操作"  width="160px">
						<template slot-scope="scope">
							<el-button @click="del(scope.row.list_id)" type="danger" size="mini">删除</el-button>
						</template>
					</el-table-column> -->
				</el-table>
				<div style="text-align: center;">
					<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="20"
					 :current-page="page" :total="total" style="margin-top:10px;"></el-pagination>
				</div>
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
					title: '',
					keywords:'',
					content:'',
					goods_id:'',
					guige:'',
					pic:''
					
				},
				list: [],
				page:1,
				total:0,
			}
		},
		props: ['id','item'],
		components: {
			upload,
			myQuillEditor
		},
		
		async created() {
			this.auctionIng()
			console.log(this.item)
			for(let k in this.form){
				if(this.item[k]){
					this.form[k] = this.item[k]
				}
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val
				this.getlist();
			},
			async auctionIng(){
				let res = await this.$zcy.auctionIng({id:this.id})
				if (res.status == 1) {
					this.list =res.data
				}else{
					this.$message.error(res.info)
				}
			},
			async onSubmit() {
				if (!this.form.title) {
					this.$message.error('扶贫标题不能为空')
					return
				}
				if (!this.form.keywords) {
					this.$message.error('扶贫简介不能为空')
					return
				}
				if (!this.form.guige) {
					this.$message.error('扶贫规格不能为空')
					return
				}
				if (!this.form.goods_id) {
					this.$message.error('请选择扶贫商品')
					return
				}
				if (!this.form.pic) {
					this.$message.error('请上传列表图')
					return
				}
				if (!this.form.content) {
					this.$message.error('扶贫内容不能为空')
					return
				}
				let res = await this.$zcy.addfuPin({...this.form,id:this.id})
				if (res.status == 1) {
					this.$message.success('成功')
					this.$emit('rels')
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
