<template>
	<div>
		<el-card>
			<el-button type="success" size="small" @click="add">添加图片分类</el-button>
		</el-card>
		<el-card>
			<el-tabs v-model="imgactive" type="card" @tab-click="handleClick" @edit="tabrem">
				<el-tab-pane label="全部" name="0"></el-tab-pane>
				<el-tab-pane :label="item.name" :name="item.id+''" v-for="(item,index) in imgtypearr" :key="index" closable></el-tab-pane>
			</el-tabs>
			<el-upload class="upload-demo" name="file" :show-file-list="false" :on-success="handleAvatarSuccess" action="http://118.190.174.163/adminsc/Goods/addPic"
			 :data="{token,type:imgactive}">
				<el-button type="success" size="small">添加该分类图片</el-button>
			</el-upload>
			<div class="content">
				<div v-for="item in imgarr" class="items">
					<el-image style="width: 100px; height: 100px;margin-bottom: 10px;" :src="item.pic" :preview-src-list="[item.pic]">
					</el-image>
					<br>
					<el-button type="danger" plain size="mini" style="width: 100%;" @click="detimg(item.id)">删除</el-button>
				</div>
			</div>
		</el-card>
	</div>
</template>

<script>
	import upload from '@/components/upload.vue'
	export default {
		data() {
			return {
				imgtypearr: [],
				imgarr: [],
				imgactive: '0',
				token: sessionStorage.getItem('token')
			}
		},
		components: {
			upload
		},
		created() {
			this.getimgtypearr()
			this.handleClick()

		},
		methods: {
			// 添加标签
			add() {
				this.$prompt('请输入标签名称', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(({
					value
				}) => {
					this.addType(value)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消添加'
					});
				});
			},
			async addType(name){
				let res = await this.$zcy.addType({
					name
				})
				if (res.status == 1) {
					this.$message.success(res.info)
					this.imgactive = '0'
					this.getimgtypearr()
				}
			},
			//添加图片
			handleAvatarSuccess(res, file) {
				this.$message.success(res.info)
				this.handleClick()
			},
			//删除标签
			async tabrem(id, action) {
				if (action != 'remove') {
					return
				}
				let res = await this.$zcy.delType({
					id
				})
				if (res.status == 1) {
					this.$message.success(res.info)
					this.imgactive = '0'
					this.getimgtypearr()
				}

			},
			//删除图片
			async detimg(id) {
				let res = await this.$zcy.delpic({
					id
				})
				if (res.status == 1) {
					this.$message.success(res.info)
					this.handleClick()
				}
			},
			async handleClick() {
				let res = await this.$zcy.picType({
					type: this.imgactive
				})

				if (res.status == 1) {
					let imgarr = res.data
					imgarr.forEach(item => {
						item.select = false
					})
					this.imgarr = imgarr
				}
			},
			async getimgtypearr() {
				let res = await this.$zcy.picAll()
				if (res.status == 1) {
					this.imgtypearr = res.data
				}
			},
		}
	};
</script>

<style scoped>
	.content {
		display: flex;
		flex-wrap: wrap;
	}

	.items {
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		padding: 10px;
		text-align: center;
		overflow: hidden;
		margin: 20px;
	}
</style>
