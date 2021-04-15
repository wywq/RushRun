<template>
	<div>
		<el-card>
			<div style="width: 500px">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="扶贫标题">
						<el-input v-model="form.title"></el-input>
					</el-form-item>
					<el-form-item label="简介">
						<el-input v-model="form.keywords"></el-input>
					</el-form-item>
					<el-form-item label="商品规格">
						<el-input v-model="form.guige"></el-input>
					</el-form-item>
					<el-form-item label="选择商品">
						<el-select v-model="form.goods_id" placeholder="请选择" clearable>
							<el-option v-for="item in goodslist" :key="item.goods_id" :label="item.name" :value="item.goods_id*1"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="列表图">
						<upload :imgUrl="form.pic" @getimg="getimg"></upload>
					</el-form-item>
				</el-form>
			</div>
			<div style="width: 100%">
				<el-form ref="form" :model="form" label-width="80px">
					<el-form-item label="扶贫内容">
						<myQuillEditor :con="form.content" @getContent="getContent"></myQuillEditor>
					</el-form-item>
					<el-form-item style="text-align: center;">
						<el-button type="primary" @click="onSubmit">确定修改</el-button>
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
					title: '',
					keywords:'',
					content:'',
					goods_id:'',
					guige:'',
					pic:''
					
				},
				goodslist: [],
			}
		},
		props: ['id','item'],
		components: {
			upload,
			myQuillEditor
		},
		
		async created() {
			this.getGoodsList()
			console.log(this.item)
			for(let k in this.form){
				if(this.item[k]){
					this.form[k] = this.item[k]
				}
			}
		},
		methods: {
			async getGoodsList(){
				let res = await this.$zcy.getGoodsList()
				if (res.status == 1) {
					this.goodslist =res.data
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
