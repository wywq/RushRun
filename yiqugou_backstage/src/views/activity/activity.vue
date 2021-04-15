<template>
	<div>
		
		<el-card v-if="!isadd">
			<el-button type="success" size="small" @click="id='',isadd = true">添加砍价商品</el-button>
			 <el-tabs v-model="type" type="card" @tab-click="getlist">
				 <font style="color: #8C939D;">商品名称&nbsp;</font>
				 <el-input v-model="goods_name" placeholder="按商品名称搜索" clearable @change="page=1;getlist();" style="width: 200px;"></el-input>
			   <!-- <el-tab-pane label="砍价" name="1"></el-tab-pane>
			    <el-tab-pane label="竞拍" name="2"></el-tab-pane>
			    <el-tab-pane label="天天折扣" name="3"></el-tab-pane>
			    <el-tab-pane label="生鲜专区" name="4"></el-tab-pane> -->
			  </el-tabs><br/>
			<el-table :data="list" border style="width: 100%">
				<el-table-column prop="act_id" label="活动商品id">
				</el-table-column>
				<el-table-column prop="goods_id" label="商品id">
				</el-table-column>
				<el-table-column prop="goods_name" label="商品名称">
				</el-table-column>
				<el-table-column prop="money" label="原价">
				</el-table-column>
				<el-table-column prop="min_money" label="最低砍价格">
				</el-table-column>
				<el-table-column prop="num" label="允许砍价人数">
				</el-table-column>
				<el-table-column prop="one_money" label="单次砍价金额">
				</el-table-column>
				<el-table-column prop="kucun" label="库存数量">
				</el-table-column>
				<el-table-column prop="add_time" label="添加时间">
				</el-table-column>
				<el-table-column prop="status" label="状态" width="160px">
					<template slot-scope="scope">
						<el-switch :value="scope.row.status==1" @change="editStatus(scope.row.act_id)" active-text="上架" inactive-text="下架">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button @click="id=scope.row.act_id,isadd=true" type="primary" size="mini">编辑</el-button>
						<!-- <el-button @click="del(scope.row.act_id)" type="primary" size="mini">删除</el-button> -->
					</template>
				</el-table-column>
			</el-table>
			<div style="text-align: center;">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="15"
				 :current-page="page" :total="total" style="margin-top:10px;"></el-pagination>
			</div>
		</el-card>
		<el-card v-if="isadd">
			<el-button type="primary" size="small" @click="isadd = false,id= ''" >返回</el-button>
		</el-card>
		<el-card v-if="isadd">
			<activity-det :id="id" :type="type" @rels="isadd=false,getlist()"> </activity-det>
		</el-card>
	</div>
</template>

<script>
	import upload from '@/components/upload.vue'
	import activity_det from './components/activity_det.vue'
	export default {
		data() {
			return {
				list: [],
				id:'',
				type:'1',
				isadd:false,
				page: 1,
				total: 0,
				goods_name:'',
			}
		},
		components: {
			upload,
			'activity-det':activity_det
		},
		created() {
			this.getlist()
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val
				this.getlist();
			},
			async getlist(){
				let tiaojian = {
					type:this.type,
					goods_name:this.goods_name
				}
				let res = await this.$zcy.getAllActivity(tiaojian)
				if(res.status==1){
					this.list = res.data
				}
			},
			async del(id){
				let res = await this.$zcy.delact({act_id:id})
				if(res.status==1){
					this.$message.success('删除成功')			
					this.getlist()
				}
			},
			//修改状态
			async editStatus(id) {
				let res = await this.$zcy.editStatus({
					id:id
				})
				if (res.status == 1) {
					this.$message.success('修改成功')
					this.getlist()
				}
			},
			
		}
	};
</script>

<style>
</style>
