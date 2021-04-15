<template>
	<div>
		<el-card v-if="!isadd">
			<el-button @click="id='',item={},isadd=true" type="primary">新建扶贫项目</el-button>
		</el-card>
		<el-card v-if="!isadd">
			<el-table :data="list" border style="width: 100%">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" class="demo-table-expand">
							<el-form-item label="内容">
								<span v-html="props.row.content"></span>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="title" label="标题">
				</el-table-column>
				<el-table-column prop="keywords" label="简介">
				</el-table-column>
				<el-table-column prop="pic" label="列表页图片">
					<template slot-scope="scope">
						<el-image style="width: 50px; height: 50px" :src="scope.row.pic" :preview-src-list="[scope.row.pic]">
						</el-image>
					</template>
				</el-table-column>
				<el-table-column prop="pic" label="添加时间">
					<template slot-scope="scope">
						{{scope.row.add_time | dataFormat}}
					</template>
				</el-table-column>
				<el-table-column prop="goods_name" label="商品名称">
				</el-table-column>
				<el-table-column prop="guige" label="商品规格">
				</el-table-column>
				<el-table-column prop="status" label="状态" width="160px">
					<template slot-scope="scope">
						<el-switch :value="scope.row.status==1" @change="editStatus(scope.row.id,scope.row.status)" active-text="开启" inactive-text="关闭">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column label="操作"  width="160px">
					<template slot-scope="scope">
						<el-button @click="id=scope.row.id,item = scope.row,isadd=true" type="primary" size="mini">编辑</el-button>
						<el-button @click="det(scope.row.id)" type="danger" size="mini">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<el-card v-if="isadd">
			<el-button type="primary" size="small" @click="isadd = false,id= ''" >返回</el-button>
		</el-card>
		<el-card v-if="isadd">
			<fupin-det :id="id" :item="item" @rels="isadd=false,getlist()"> </fupin-det>
		</el-card>
	</div>
</template>

<script>
	import upload from '@/components/upload.vue'
	import fupin_det from './components/fupin_det.vue'
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
			'fupin-det':fupin_det
		},
		created() {
			this.getlist()
		},
		methods: {
			async getlist(){
				let res = await this.$zcy.fupinList()
				if(res.status==1){
					this.list = res.data
				}else{
					this.list=[]
				}
			},
			async del(id){
				let res = await this.$zcy.delLunbo({id})
				if(res.status==1){
					this.$message.success('删除成功')			
					this.getlist()
				}
			},
			//修改状态
			async editStatus(id,status) {
				let res = await this.$zcy.xiugaiFupin({
					id,
					status:status==1?2:1
				})
				if (res.status == 1) {
					this.$message.success('修改成功')
					this.getlist()
				}
			},
			
			async det(id) {
				let res = await this.$zcy.delFupin({
					id,
				})
				if (res.status == 1) {
					this.$message.success('删除成功')
					this.getlist()
				}
			},
		}
	};
</script>

<style>
</style>
