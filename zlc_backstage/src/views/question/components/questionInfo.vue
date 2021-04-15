<template>
	<div style="width: 800px">
		<el-tabs type="card">
			<el-tab-pane label="指南信息">
				<el-form ref="form" :model="form" label-width="100px">
					<el-form-item label="指南标题">
						<el-input v-model="form.title"></el-input>
					</el-form-item>
					<el-form-item label="指南内容">
						<textarea v-model="form.content"  style="border: 1px solid #DCDFE6; width: 600px;height: 300px;"></textarea>
					</el-form-item>
					<el-form-item label="指南图片">
						<el-button type="primary" @click="isshow = true" style="margin-bottom: 10px;">打开图库添加</el-button>
						<div class="imgarr">
							<div v-for="(item,index) in form.banner_imgs_list">
								<i class="el-icon-error" @click="detimagarr(index)"></i>
								<el-image style="width: 100px; height: 100px" :src="item.pic" :preview-src-list="[item.pic]">
								</el-image>
							</div>
						</div>
					</el-form-item>
				</el-form>
			</el-tab-pane>
				
			</el-tab-pane>
		</el-tabs>

		<el-form ref="form" :model="form" label-width="80px" style="margin-top: 40px;">
			<el-form-item>
				<el-button type="primary" @click="onSubmit">保存</el-button>
			</el-form-item>

		</el-form>
		<el-drawer title="商品图库" :visible.sync="isshow" direction="rtl" :wrapperClosable="false" size="50%">
			<el-tabs v-model="imgactive" type="card" @tab-click="handleClick">
				<el-tab-pane label="全部" name="0"></el-tab-pane>
				<el-tab-pane :label="item.name" :name="item.id+''" v-for="(item,index) in imgtypearr" :key="index"></el-tab-pane>
			</el-tabs>
			<div class="imgarr imgarr1">
				<div v-for="(item,index) in imgarr" @click="selectimg(item,index)" :class="item.select?'active' :'' ">
					<el-image style="width: 100px; height: 100px" :src="item.pic">
					</el-image>
				</div>
			</div>
			<div class="demo-drawer__footer">
				<el-button type="primary" @click="changebanner_imgs_list">确认选择</el-button>
			</div>
		</el-drawer>
	</div>
</template>
<script>
	function doExchange(arr) {
		var len = arr.length;
		// 当数组大于等于2个的时候
		if (len >= 2) {
			var len1 = arr[0].length;
			var len2 = arr[1].length;
			var lenBoth = len1 * len2;
			var items = new Array(lenBoth);
			var index = 0;
			for (var i = 0; i < len1; i++) {
				for (var j = 0; j < len2; j++) {
					items[index] = arr[0][i] + "|" + arr[1][j];
					index++;
				}
			}
			var newArr = new Array(len - 1);
			for (var i = 2; i < arr.length; i++) {
				newArr[i - 1] = arr[i];
			}
			newArr[0] = items;
			return doExchange(newArr);
		} else {
			return arr[0];
		}
	}
	import upload from '@/components/upload.vue'
	import myQuillEditor from '@/components/myQuillEditor.vue'
	export default {
		props: ['questionlist', 'id'],
		data() {
			return {
				form: {
					id:'',
					title:'',
					content:'',
					banner_imgs_list:[],
				},
				guige_title: [

				],
				type: '1',
				fenleilist: [],
				imgtypearr: [],
				imgarr: [],
				imgactive: '0',
				isshow: false,
				checked: '',
				guige: [],
				guiisshow: false,
				guiimgactive: '',
				guiactive: 0
			}
		},

		components: {
			upload,
			myQuillEditor
		},
		async created() {
			this.getimgtypearr()
			this.handleClick()
			if (this.id) {
				let res = await this.$zcy.editQuestion({
					id: this.id
				})
				if (res.status == 1) {
					this.form = res.data
					if(res.data.pic == '')
					{
						this.form.banner_imgs_list = []
					}
				}
				console.log(this.form.banner_imgs_list,'这个')
			}
		},
		methods: {
			
			objectSpanMethod() {
				return {
					rowspan: 2,
					colspan: 1
				};
			},
			getname(i, index) {
				let k = this.guige_title[i].title
				return this.guige[index][k]

			},
			async onSubmit() {
				if(this.form.banner_imgs_list != '')
				{
					let pic = [];
					this.form.banner_imgs_list.forEach(function(item,index)
					{
						pic.push(item.pic) 
					})
					this.form.pic = pic.join(",")
				}
				let tiaojian = {
					id:this.form.id,
					title:this.form.title,
					content:this.form.content,
					pic:this.form.pic,
				}
				let res = await this.$zcy.updateQuestion(tiaojian)
				if(res.status == 1)
				{
					this.$message.success(res.info)
					this.$emit('sure')
				}else{
					this.$message.error(res.info)
				}

			},
			getContent(val) {
				this.form.describe = val
			},
			getimg(val) {
				console.log(val)
				this.form.pic = val
			},
				
			detimagarr(index) {
				this.form.banner_imgs_list.splice(index, 1)
			},
			async getimgtypearr() {
				let res = await this.$zcy.picAll()
				if (res.status == 1) {
					this.imgtypearr = res.data
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
			selectimg(item, index) {
				let it = item
				item.select = !item.select
				this.imgarr.splice(index, 1, item)

			},
			changebanner_imgs_list() {
				let banner = []
				this.imgarr.forEach(item => {
					if (item.select) {
						banner.push({
							pic: item.pic
						})
					}
				})
				if (banner.length == 0) {
					this.$message.error('请选择图片')
					return
				}
				this.form.banner_imgs_list = [...this.form.banner_imgs_list, ...banner]
				this.isshow = false
				this.imgarr.forEach(item => {
					item.select = false
				})
			},
			//添加父级规格
			addguige_title() {
				let obj = {
					title: '',
					child: [{
						title: '',
						pic: '',
						num: 0,
						price: 0
					}]
				}
				this.guige_title.push(obj)
			},
			//删除父级规格
			detguige_title(index) {
				this.guige_title.splice(index, 1)
			},
			//添加自己规格
			add_child(index) {
				let obj = this.guige_title[index]
				obj.child.push({
					title: '',
					pic: '',
					num: 0,
					price: 0
				})
				this.guige_title.splice(index, 1, obj)
			},
			det_child(index, i) {
				let obj = this.guige_title[index]
				obj.child.splice(i, 1)
				this.guige_title.splice(index, 1, obj)
			},
			changeguiimg() {
				this.guige_title[0].child[this.guiactive].pic = this.imgarr[this.guiimgactive].pic
				this.guiisshow = false
			}
		}
	}
</script>

<style scoped>
	.imgarr {
		display: flex;
		flex-wrap: wrap;

	}

	.imgarr1 {
		height: 500px;
		overflow-y: scroll;
		align-items: flex-start;
	}

	.imgarr>div {
		margin: 15px;
		border: 2px solid #eee;
		position: relative;
		width: 100px;
		height: 102px;
	}

	.imgarr i {
		position: absolute;
		right: -10px;
		top: -10px;
		font-size: 20px;
		cursor: pointer;
		z-index: 6;
	}

	.spgg_r_04 {
		padding-left: 20px;
		margin-bottom: 20px;
	}

	.imgarr .active {
		border: 2px solid #409EFF;
	}

	.demo-drawer__footer {
		text-align: center;
		margin: 60px auto 0;
	}

	.head {
		padding: 10px;
		background: #f8f8f8;
		margin-bottom: 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;

	}

	.title {
		font-size: 14px;
		margin-bottom: 15px;
	}

	.head_input {
		width: 200px;
	}

	.body {
		display: flex;
		flex-wrap: wrap;
	}

	.items {
		margin: 10px;
		text-align: center;
		width: 150px;
	}

	.input {
		width: 100%;
		position: relative;
	}

	.input i {
		position: absolute;
		right: -10px;
		top: -10px;
		font-size: 20px;
		z-index: 8;
		color: #aaa;
		cursor: pointer;
	}

	.avatars {
		width: 150px;
		height: 150px;
		margin-top: 20px;
		line-height: 150px;
		border: 1px dashed #aaa;
		background-color: #fbfdff;
		margin-bottom: 20px;

	}

	.table {
		display: flex;
	}

	.thead {
		padding: 10px;
		border: 1px solid #eee;
		color: #666;
		height: 20px;
	}
</style>
