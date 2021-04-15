<template>
	<div>
		<!-- 条件筛选 -->
		<el-card>
			<el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
				<el-form-item label="用户账号">
					<el-input v-model="form.phone" placeholder="按用户账号搜索" @change="page=1;getlist();" clearable size="mini"></el-input>
				</el-form-item>
				<el-form-item label="收货人手机号">
					<el-input v-model="form.member_phone" placeholder="按收货人手机号搜索" @change="page=1;getlist();" clearable size="mini"></el-input>
				</el-form-item>
				<el-form-item label="收货人姓名">
					<el-input v-model="form.member_name" placeholder="按收货人姓名搜索" @change="page=1;getlist();" clearable size="mini"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" size="small" @click="refresh">刷新</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		
		<!-- 表格 -->
		<el-card >
			<el-table :data="list" border style="width: 100%">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" class="demo-table-expand">
							<el-form-item label="用户账号">
								<span>{{ props.row.phone }}</span>
							</el-form-item>
							
							<el-form-item label="收货地址">
								<span v-html="props.row.address"></span>
							</el-form-item>
							<el-form-item label="是否被用户删除">
								<span style="color: #42B983;">{{props.row.status == 1 ? "删除" : ""}}</span> 
								<span style="color: #409EFF;">{{props.row.status == 0 ? "正常" : ""}}</span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="address_id" label="地址ID" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column prop="phone" label="用户账号"></el-table-column>
				<el-table-column prop="member_phone" label="收货人电话"></el-table-column>
				<el-table-column prop="member_name" label="收货人姓名"></el-table-column>
				<el-table-column prop="status" label="默认地址" width="160px">
					<template slot-scope="scope">
						<el-switch :value="scope.row.state==1" @change="updatestatus(scope.row.address_id)" active-text="默认" inactive-text="非默认">
						</el-switch>
					</template>
				</el-table-column>
				<!-- <el-table-column prop="status" label="是否被用户删除">
				 <template slot-scope="scope">
				      {{scope.row.status == 1 ? "删除" : ""}}
				      {{scope.row.status == 0 ? "正常" : ""}}
				  </template>
				</el-table-column> -->
				<el-table-column prop="updatetime" label="修改时间"></el-table-column>
				<!-- <el-table-column prop="" label="操作">
					<template slot-scope="scope">
						<el-button type="success" size="small" @click="edit(scope.row)">编辑</el-button>
						<el-button type="danger" size="small" @click="delOrder(scope.row.address_id,scope.row.status)">删除</el-button>
					</template>
				</el-table-column> -->
			</el-table>
			<div style="text-align: center;">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="15"
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
					phone:'',
				},
				
				//商品id
				id:'',
				page: 1,
				total: 0,
				list: [],
				shoplist: [],
				fenleilist: [],
			}
		},
		created() {
			this.getlist();
		},
		components:{
			
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val
				this.getlist();
			},
			
			//获取用户地址
			async getlist() {
				let postdata = {
					page: this.page,
					phone:this.form.phone,
					member_name:this.form.member_name,
					member_phone:this.form.member_phone
				}
				let res = await this.$zcy.memberAddress(postdata)
				if (res.status == 1) {
					this.list = res.data
					this.issort = false
					this.total =res.num
				}else{
					this.list = []
					this.issort = false
					this.total =0 
				}
			},
			//修改用户默认地址
			async updatestatus(id)
			{
				let postdata = {
					id:id
				}
				let res = await this.$zcy.uopdateMo(postdata)
				if(res.status == 1)
				{
					this.$message.success(res.info)
					this.getlist()
				}else{
					this.$message.error(res.info)
				}
			},
			
			//修改
			edit(zixun){
				 this.$router.push({path: '/reply', query: {key:zixun}})
			},
			//删除地址
			async delOrder(id,status){
				if(status == 0)
				{
					this.$confirm('该地址用户未删除,确认删除？').then(async () => {
					let res = await this.$zcy.delAddress({"id":id})
					if (res.status == 1) {
						this.$message.success('删除成功')
						this.getlist()
					}
				}).catch(() => {});
				}else{
					this.$confirm('确认删除？').then(async () => {
						let res = await this.$zcy.delAddress({"id":id})
						if (res.status == 1) {
							this.$message.success('删除成功')
							this.getlist()
						}
					}).catch(() => {});
				}
			},
			
			
			refresh() {
				this.form = {
					id: '',
					status: '',
					title: '',
					conetnt: '',
					time:''
				}
				this.page = 1
				this.getlist()
			}
		}
	};
</script>

<style>
</style>
