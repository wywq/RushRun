<template>
	<div>
		<!-- 条件筛选 -->
		<el-card>
			<el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
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
								<span>{{ props.row.loginName }}</span>
							</el-form-item>
							
							<el-form-item label="反馈内容">
								<span v-html="props.row.content"></span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="id" label="反馈ID" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column prop="name" label="用户名称"></el-table-column>
				<el-table-column prop="loginName" label="用户账号"></el-table-column>
				<el-table-column prop="phone" label="手机号"></el-table-column>
				<!-- <el-table-column prop="status" label="回复状态">
				 <template slot-scope="scope">
				      {{scope.row.status == 1 ? "未回复" : ""}}
				      {{scope.row.status == 2 ? "已回复" : ""}}
				  </template>
				</el-table-column> -->
				<el-table-column prop="add_time" label="反馈时间"></el-table-column>
				<el-table-column prop="" label="操作">
					<template slot-scope="scope">
						<!-- <el-button type="success" size="small" @click="edit(scope.row)">编辑</el-button> -->
						<el-button type="danger" size="small" @click="delOrder(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
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
					id: '',
					status: '',
					title: '',
					content: '',
					time:'',
					pic:[],
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
			
			//获取反馈
			async getlist() {
				let postdata = {
					page: this.page
				}
				let res = await this.$zcy.feedbackList(postdata)
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
			
			//修改
			edit(zixun){
				 this.$router.push({path: '/reply', query: {key:zixun}})
			},
			//删除资讯
			async delOrder(id){
				let postdata = {
					id:id
				}
				let res = await this.$zcy.delfeedback(postdata)
				if(res.status = 1)
				{
					this.$message.success(res.info)
					this.getlist()
				}else{
					this.$message.error(res.info)
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
