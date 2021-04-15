<template>
	<div>
		<el-card>
			<el-table :data="list" border style="width: 100%">
				<!-- <el-table-column prop="shop_id" label="店铺id" width="70px"></el-table-column> -->
				<el-table-column prop="star" label="购买等级">
					<template slot-scope="scope">
						{{scope.row.star==0?'标准版':scope.row.star==1?'专业版':'旗舰版'}}
					</template>
				</el-table-column>
				<el-table-column prop="name" label="联系人"></el-table-column>
				<el-table-column prop="phone" label="电话"></el-table-column>
				<el-table-column prop="idcard" label="身份证号" show-overflow-tooltip></el-table-column>
				<!-- <el-table-column prop="shopName" label="店名" show-overflow-tooltip></el-table-column> -->
				
				<el-table-column prop="regTime" label="添加时间" ></el-table-column>
				<el-table-column prop="" label="审核" fixed="right" width="180px" >
					<template slot-scope="scope">
						<el-button type="success"  size="mini" @click="audit(scope.row.shop_id,1)">通过</el-button>
						<el-button type="danger"  size="mini"  @click="audit(scope.row.shop_id,2)">拒绝</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="text-align: center;">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="5"
				 :current-page="page" :total="total" style="margin-top:10px;"></el-pagination>
			</div>
		</el-card>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				id:'',
				total:0,
				page:1
			}
		},
		created() {
			this.getlist()
		},
		methods: {
			async getlist(){
				let res = await this.$zcy.examineList({page:this.page,page_size:5})
				if(res.code==200){
					this.list = res.data.data
					this.total =res.data.num
				}
			},
			handleCurrentChange(val){
				this.page = val
				this.getlist()
			},
			async audit(shop_id,type){
				this.$confirm('确认审核').then(async () => {
					let res = await this.$zcy.upApproval({shop_id,type})
					if(res.status==1){
						this.$message.success(res.info)
						this.getlist()
					}else{
						this.$message.error(res.info)
					}
				}).catch(async () => {});
				
			}
		}
	};
</script>

<style>
</style>
