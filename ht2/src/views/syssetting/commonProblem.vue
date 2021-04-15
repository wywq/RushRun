<template>
	<div class="commonProblem">
		<el-button type="primary" @click="addMerberClick">添加常见问题</el-button>
		<!--表格 -->
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}"
		 border style="margin-top:10px">
			<el-table-column label="问题ID" prop="id" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="名称" prop="title" :resizable="false" align="center">
			</el-table-column>
			<!-- <el-table-column label="内容" type="textarea" prop="content" :resizable="false" align="center">
			</el-table-column> -->
			<el-table-column label="添加时间" prop="addtime" :resizable="false" align="center">
			</el-table-column>
			<el-table-column label="状态" prop="is_show" :resizable="false" align="center">
				<template slot-scope="scope">
					<div type="primary" v-if="scope.row.is_show == 0">未显示在首页</div>
					<div type="primary" v-if="scope.row.is_show == 1">显示在首页</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" class="elcolumn" align="center" fixed="right" width="300px">
				<template slot-scope="scope" prop="admin">
					<el-button type="primary" @click="modifyClick(scope.row)" size="small" style="margin-left:10px;">修改信息</el-button>
					<el-button type="primary" @click="delClick(scope.row)" size="small" style="margin-left:10px;">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 添加修改管理员弹窗 -->
		<div class="mark" v-show="show">
			<div class="mark-content">
				<div class="hytj">添加常见问题</div>
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr>
							<td class="td1">问题名称:</td>
							<td class="td2">
								<el-input v-model="submitform.title" size="small" clearable></el-input>
							</td>
						</tr>
						<tr>
							<td class="td1">是否显示在首页:</td>
							<td class="td2">
								<el-radio v-model="submitform.resource" :label="1">显示在首页</el-radio>
								<el-radio v-model="submitform.resource" :label="0">未显示在首页</el-radio>
							</td>
						</tr>
						<tr>
							<td class="td1">问题答案:</td>
							<td class="td2">
								<div ref="editor" style="text-align:left" >
									<div class="" v-html="article.contentHtml"></div>
								</div>
							</td>
						</tr>
						<tr>
							<td></td>
							<td class="td2">
								<el-button type="primary" @click="onSubmitClick" size="small">提交</el-button>
								<el-button type="primary" @click="clone" size="small">返回</el-button>
							</td>
						</tr>
					</table>
				</el-form>
			</div>
		</div>
		<!-- 分页 -->
		<div class="block">
			<el-pagination @current-change="handleCurrentChange" layout="total, prev, pager, next, jumper" :total="shujuData.num"
			 :page-size="15">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import util from '@/utils/utils.js'
	import service from '@/service/service.js'
	import E from 'wangeditor'
	export default {
		data() {
			return {
				show:false,
				submitform:{
					title:"",
					content:"",
					resource:''
				},
				type:1,
				tabletwoData:[],
				shujuData:'',
				id:'',
				article: {
				  contentHtml: '',
				},
				editor:""
			}
		},
		async created() {
			this.question(1)
		},
		methods: {
			//转换成时间对象
			getDate(tm) {
				let date = new Date(tm);
				let year = date.getFullYear();
				let month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				let time = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
				let hours = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours())
				let fen = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes())
				let miao = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds())
				let tt = year + '-' + month + '-' + time + ' ' + hours + ':' + fen + ":" + miao;
				return tt;
			},
			//常见问题列表
			async question(page){
				const question = await service.question({
					page:page
				})
				if(question.data.status==1){
					this.shujuData = question.data.data
					const tabletwoData = question.data.data.list.map((item, index) => {
						item.addtime = this.getDate(item.time * 1000)
						return item
					})
					
					this.tabletwoData = tabletwoData
					this.shujuData = question.data.data
				}else {
					this.tabletwoData = []
					this.$message.error(question.data.info);
				}
			},
			//提交
			async onSubmitClick(row){
				// console.log(this.submitform.resource)
				// if (this.submitform.title == '') {
				// 	this.$message.error('请填写问题名称');
				// 	return
				// }
				// if (this.editor.txt.html('')) {
				// 	this.$message.error('请填写问题内容');
				// 	return
				// }else
				// {
					if(this.type==1){
						const addQuestion = await service.addQuestion({
							title:this.submitform.title,
							is_show:this.submitform.resource,
							content:this.editor.txt.html(),
							id:""
						})
						if(addQuestion.data.status==1){
							this.$message.success('添加成功');
							this.question()
							this.show = false
							this.submitform.title = ""
							this.submitform.resource = ''
							this.editor.txt.html('')
						}else{
							this.$message.error(addQuestion.data.info);
						}
					}
				 if(this.type==2){
							const addQuestion = await service.addQuestion({
							title:this.submitform.title,
							is_show:this.submitform.resource,
							content:this.editor.txt.html(),
							id:this.id
						})
						if(addQuestion.data.status==1){
							this.$message.success('修改成功');
							this.question()
							this.show = false
							this.submitform.title = ""
							this.submitform.resource = ''
							this.editor.txt.html('')
						}else{
							this.$message.error(addQuestion.data.info);
						}
					}
				// }
			},
			//返回
			clone(){
				this.show =false
				this.submitform.title = ""
				this.submitform.resource = ''
				this.editor.txt.html('')
			},
			//添加常见问题
			async addMerberClick(){
				this.show =true
				this.type = 1
			},
			//修改信息
			 async modifyClick(row){
				this.show = true
				this.submitform.title = row.title
				this.submitform.resource =row.is_show
				this.article.contentHtml = row.content
				this.editor.txt.html(this.article.contentHtml)
				this.type = 2
				this.id = row.id
			},
			//删除
			delClick(row){
				this.$confirm('是否继续删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					const delQuestion = await service.delQuestion({
						token: util.getCookie("token"),
						id: row.id
					})
					if (delQuestion.data.status == 1) {
						this.$message.success('删除成功');
					}
					this.question()
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			// 分页
			handleCurrentChange(val) {
				this.question(val)
			},
		},
				mounted() {
			let that = this
			var editor = new E(this.$refs.editor)
			this.editor = editor
			// var editor = new E(this.$refs.editor)
			//   editor.customConfig.onchange = (html) => {
			//     that.article.contentHtml = html
			//   }
			  editor.customConfig.uploadImgParamsWithUrl = true
			  editor.customConfig.uploadImgServer = '/admin/bank/uploadPic'  // 上传图片到服务器
			  editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
			  editor.customConfig.uploadImgMaxLength = 5;
			  editor.customConfig.uploadFileName = 'pic';
			  editor.customConfig.uploadImgParams = {
			  		token: util.getCookie('token'),
			  }
			  editor.customConfig.uploadImgHooks = {
			    success: function (xhr, editor, result) {
			      // 图片上传并返回结果，图片插入成功之后触发
			      // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
			    },
			    fail: function (xhr, editor, result) {
			      // 图片上传并返回结果，但图片插入错误时触发
			      // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
			    },
			    error: function (xhr, editor) {
			      // 图片上传出错时触发
			      // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
			    },
			    timeout: function (xhr, editor) {
			      // 图片上传超时时触发
			      // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
			    },
				 customInsert: function (insertImg, result, editor) {
				    // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
				    // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
				    // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
				    // result 必须是一个 JSON 格式字符串！！！否则报错
						var url =that.img_url + result.data;
				    insertImg(url);
						// 设置内容
						editor.txt.img(url);
						editor.txt.html(content);
						// 获取内容
						var url = editor.txt.img();
						var content = editor.txt.html();
				},
			
			  }
			editor.create()
		},
	}
</script>

<style scoped>
	.block {
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
