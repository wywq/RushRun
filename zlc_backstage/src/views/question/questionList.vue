<template>
	<div>
		<!-- 条件筛选 -->
		<el-card v-if="!isadd">
			<el-form :inline="true" ref="form"  class="demo-form-inline">
				<el-form-item>
					<el-button type="success" size="small" @click="id='',isadd = true">添加指南</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<!-- 添加商品头部 -->
		<el-card v-if="isadd">
			<el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
				<el-form-item>
					<el-button type="primary" size="small" @click="isadd = false , id= ''" >返回</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<!-- 添加商品内容 -->
		<el-card v-if="isadd">
			<questionInfo :questionlist="form" :id="id" @sure="refresh"></questionInfo>
		</el-card>
		<!-- 表格 -->
		<el-card v-if="!isadd">
			<el-table :data="form" border style="width: 100%">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" class="demo-table-expand">
							<el-form-item label="指南内容">
								<span>{{ props.row.content }}</span>
							</el-form-item>
							<el-form-item label="指南图片">
								<div class="imgarr">
									<div class="tupian" v-for="(item,index) in props.row.img">
										<!-- <i class="el-icon-error" @click="detimagarr(index)"></i> -->
										<el-image style="width: 100px; height: 100px" :src="item" :preview-src-list="[item]">
										</el-image>
									</div>
								</div>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="id" label="指南ID" :show-overflow-tooltip="true"></el-table-column>
				<el-table-column prop="title" label="指南标题"></el-table-column>
				<el-table-column prop="" label="操作">
					<template slot-scope="scope">
						<el-button type="success" size="small" @click="id=scope.row.id,isadd= true">编辑</el-button>
						<el-button type="error" size="small" @click="delquestion(scope.row.id)">删除</el-button>
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
	import questionInfo from './components/questionInfo.vue'
	export default {
		data() {
			return {
				form:[],
				//商品id
				id:'',
				page: 1,
				total: 0,
				list: [],
				//排序
				issort:false,
				//是否添加商品
				isadd:false,
				issee:false
			}
		},
		created() {
			console.log('fdsgrfb')
			this.question();
		},
		components:{
			questionInfo
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val
				this.question();
			},
			async question(){
				let res = await this.$zcy.question();
				if(res.status = 1)
				{
					this.form = res.data
					res.data.forEach(function(item,index){
						if(item.pic == '' || item.pic == null)
						{
							item.img = []
						}
					})
					console.log(this.form.img,'img')
				}else{
					this.$message.error(res.info)
				}
			},
			async delquestion(id){
				let res = await this.$zcy.delquestion({id:id});
				if(res.status == 1)
				{
					this.$message.success(res.info)
					this.question()
				}else{
					this.$message.error(res.info)
				}
			},
			
			
			refresh() {
				this.form = [],
				// this.form = {
				// 	id: '',
				// 	status: '',
				// 	shop_id: '',
				// 	fenlei: ''
				// }
				this.issort = false
				this.isadd = false
				this.page = 1
				this.question()
			}
		}
	};
</script>

<style>
	.tupian{
		width: 200px;
		position: relative;
	}
	.imgarr {
		display: flex;
		flex-wrap: wrap;
	
	}
</style>
