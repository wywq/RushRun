<template>
	<div>
		<el-card>
			<el-button type="success" size="small" @click="add">添加</el-button>
		</el-card>
		<el-card>
			<el-tabs v-model="type" type="card" @tab-click="handleClick" stretch>
				<el-tab-pane label="爱心助农" name="1"></el-tab-pane>
				<el-tab-pane label="公益直通车" name="2"></el-tab-pane>
				<el-tab-pane label="爱心公益" name="3"></el-tab-pane>
			</el-tabs>
			<el-table :data="list" border style="width: 100%">
				<el-table-column type="expand">
					<template slot-scope="props">
						<el-form label-position="left" class="demo-table-expand">
							<el-form-item label="内容">
								<span v-html="props.row.content "></span>
							</el-form-item>
							<el-form-item label="绑定商品名称" v-if="type==1">
								<span>{{ props.row.goods.name }}</span>
							</el-form-item>
							<el-form-item label="绑定商品图片" v-if="type==1">
								<el-image style="width: 50px; height: 50px" :src="props.row.goods.pic" :preview-src-list="[props.row.goods.pic]">
								</el-image>
							</el-form-item>
						</el-form>
					</template>
				</el-table-column>
				<el-table-column prop="title" label="标题" show-overflow-tooltip></el-table-column>
				<el-table-column prop="pic" label="列表图片">
					<template slot-scope="scope">
						<el-image style="width: 50px; height: 50px" :src="scope.row.pic" :preview-src-list="[scope.row.pic]">
						</el-image>
					</template>
				</el-table-column>
				<el-table-column prop="keywords" label="列表小标题" show-overflow-tooltip></el-table-column>
				<el-table-column prop="pic" label="详情图片">
					<template slot-scope="scope">
						<el-image style="width: 50px; height: 50px" :src="scope.row.banner" :preview-src-list="[scope.row.banner]">
						</el-image>
					</template>
				</el-table-column>
				<el-table-column prop="add_time" label="添加时间"  width="160px"></el-table-column>
				<el-table-column prop="count" label="参与人" v-if="type==3"></el-table-column>
				<el-table-column prop="count" label="浏览量" v-if="type==2"></el-table-column>
				<el-table-column prop="end_time" label="结束时间" v-if="type==3"  width="160px"></el-table-column>
				<el-table-column label="操作" width="160px">
					<template slot-scope="scope">
						<el-button @click="change(scope.row)" type="primary" size="mini">编辑</el-button>
						<el-button @click="del(scope.row.id)" type="danger" size="mini">删除</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="" label="查看评价"  v-if="type==3">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" @click="id=scope.row.id,issee= true">查看</el-button>
					</template>
				</el-table-column>
				<el-table-column prop="" label="查看参与" v-if="type==3">
					<template slot-scope="scope">
						<el-button type="primary" size="mini" @click="id=scope.row.id,canyusee= true">查看</el-button>
					</template>
				</el-table-column>
				
			</el-table>
			<div style="text-align: center;">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="5"
				 :current-page="page" :total="total" style="margin-top:10px;"></el-pagination>
			</div>
		</el-card>
		<el-dialog :title="id?'修改':'添加'" :visible.sync="dialogVisible">
			<el-form ref="form" :model="form" label-width="120px">
				<el-form-item label="类型" v-if="!id">
					<el-select v-model="form.type" placeholder="请选择" clearable>
						<el-option label="爱心助农" value="1"></el-option>
						<el-option label="公益直通车" value="2"></el-option>
						<el-option label="爱心公益" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="标题">
					<el-input v-model="form.title"></el-input>
				</el-form-item>
				<el-form-item label="列表图片">
					<upload :imgUrl="form.pic" @getimg="getimg"></upload>
				</el-form-item>
				<el-form-item label="小标题">
					<el-input v-model="form.keywords"></el-input>
				</el-form-item>
				<el-form-item label="详情图片">
					<upload :imgUrl="form.banner" @getimg="getbanner"></upload>
				</el-form-item>
				<el-form-item label="详情内容">
						<myQuillEditor :con="form.content" @getContent="getContent"></myQuillEditor>
				</el-form-item>
				<el-form-item label="结束时间"  v-if="form.type==3">
						<el-date-picker
						      v-model="form.end_time"
						      type="datetime"
						      placeholder="选择日期时间"
							  value-format="timestamp">
						</el-date-picker>
				</el-form-item>
				<el-form-item label="选择商品" v-if="form.type==1">
					<el-select v-model="form.goods_id" placeholder="请选择" clearable>
						<el-option v-for="item in goodslist" :key="item.goods_id" :label="item.name" :value="item.goods_id*1"></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="sure">确 定</el-button>
			</span>
		</el-dialog>
		<el-drawer
		  title="评论列表"
		  :visible.sync="issee"
		  direction="rtl"
		  size="50%">
			<common :oneplus_id="id" v-if="issee"></common>
		</el-drawer>
		<el-drawer
		  title="参与列表"
		  :visible.sync="canyusee"
		  direction="rtl"
		  size="50%">
			<partList :oneplus_id="id" v-if="canyusee"></partList>
		</el-drawer>
		
	</div>
</template>

<script>
	import upload from '@/components/upload.vue'
	import myQuillEditor from '@/components/myQuillEditor.vue'
	import common from './components/common.vue'
	import partList from './components/partList.vue'
	
	export default {
		data() {
			return {
				list: [],
				id: '',
				dialogVisible: false,
				page: 1,
				type: '1',
				total: 0,
				goodslist: [],
				form: {
					title:'',
					pic: '',
					keywords:'',
					banner:'',
					type: '',
					content:'',
					end_time:'',
					goods_id: '',
				},
				issee:false,
				canyusee:false,
				
			}
		},
		components: {
			upload,
			myQuillEditor,
			common,
			partList
		},
		created() {
			this.getlist()
			this.getgoodlist()
		},
		methods: {
			async getlist() {
				let res = await this.$zcy.informationList({
					page: this.page,
					page_size: 5,
					type: this.type

				})
				if (res.status == 1) {
					this.list = res.data
					this.total = res.all_num

				}
			},
			async del(oneplus_id) {
				let res = await this.$zcy.informationDel({
					oneplus_id
				})
				if (res.status == 1) {
					this.$message.success('删除成功')
					this.getlist()

				}

			},
			getimg(val) {
				this.form.pic = val
			},
			getbanner(val){
				this.form.banner = val
			},
			getContent(val){
				this.form.content = val
			},
			async getgoodlist() {
				let res = await this.$zcy.showSku()
				if (res.status == 1) {
					this.goodslist = res.data
				}
			},
			async sure() {
				let res = await this.$zcy.informationAdd({
					oneplus_id: this.id,
					...this.form,
					end_time:this.form.end_time/1000
				})
				if (res.status == 1) {
					this.$message.success(res.info)
					this.dialogVisible = false
					this.getlist()
				} else {
					this.$message.error(res.info)
				}
			},
			handleCurrentChange(val) {
				this.page = val
				this.getlist()
			},
			handleClick() {
				this.page = 1
				this.getlist()
			},
			change(item) {
				for(let k in this.form){
					this.form[k] = item[k]
				}
				this.id = item.id
				this.dialogVisible = true
			},
			add() {
				for(let k in this.form){
					this.form[k] = ''
				}
				this.id = ''
				this.dialogVisible = true
			}
		}
	};
</script>

<style>
</style>
