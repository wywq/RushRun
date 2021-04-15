<template>
	<div>
		<el-card>
			<el-table :data="list" border style="width: 100%">
				<el-table-column prop="num" label="每日限量">
					<template slot-scope="scope">
						<el-input v-model="scope.row.num" @change="updateXian(scope.row.id,scope.row.num,scope.row.now_number)"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="now_number" label="当前剩余数量">
					<template slot-scope="scope">
						<el-input v-model="scope.row.now_number" @change="updateXian(scope.row.id,scope.row.num,scope.row.now_number)"></el-input>
					</template>
				</el-table-column>
				<el-table-column prop="update_time" label="修改时间">
					<template slot-scope="scope">
						<span>{{ scope.row.update_time }}</span>
					</template>
				</el-table-column>
				<!-- <el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="id=scope.row.id,img=scope.row.pic,dialogVisible=true" type="primary" size="mini">编辑</el-button>
					</template>
				</el-table-column> -->
			</el-table>
		</el-card>
		
	</div>
</template>

<script>
	import upload from '@/components/upload.vue'
	export default {
		data() {
			return {
				list:[],
				id:'',
				dialogVisible:false,
				img:''
			}
		},
		components: {
			upload
		},
		created() {
			this.getlist()
		},
		methods: {
			async getlist(){
				let res = await this.$zcy.xianLiang()
				if(res.status==1){
					this.list = res.data
				}
			},
			async updateXian(id,num,now_number){
				if(num == '' || now_number == '')
				{
					this.$message.error('请完善信息')
					return 
				}
				let res = await this.$zcy.updateXian({
					num:num,
					now_number:now_number,
					id:id
				});
				if(res.status == 1)
				{
					this.$message.success(res.info)
					this.getlist()
				}
			},
			
		}
	};
</script>

<style>
</style>
