<template>
	<div class="memberList">
		<Title>
			<div slot="title">公告列表</div>
		</Title>

		<el-button type="primary" @click="addArticleClick">新增公告</el-button>
		<!-- <el-button type="primary" @click="addClassificationClick">新增分类</el-button> -->
		<!--表格 -->
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<el-table-column label="名称" prop="title" :resizable="false" align="center">
			</el-table-column>
			<!-- <el-table-column label="内容" prop="content" :resizable="false" align="center">
			</el-table-column> -->
			<el-table-column label="添加时间" prop="add_time" :resizable="false" align="center">
			</el-table-column>
			<!-- <el-table-column label="公告状态" prop="status" :resizable="false" align="center" width="160px">
				<template slot-scope="scope">
					<div v-if="scope.row.status == 0">未审核</div>
					<div v-if="scope.row.status == 1">已审核</div>
				</template>
			</el-table-column> -->
			<el-table-column label="操作" prop="content" class="elcolumn" align="center" fixed="right" width="400px">
				<template slot-scope="scope" prop="xg">
					<!-- <el-button type="primary" @click="okClick(scope.row)" size="small" style="margin-left:10px;">审核成功</el-button>
					<el-button type="primary" @click="noClick(scope.row)" size="small" style="margin-left:10px;">审核失败</el-button> -->
					<el-button type="primary" @click="delClick(scope.row)" size="small" style="margin-left:10px;">删除</el-button>
					<el-button type="primary" @click="modifyClick(scope.row)" size="small" style="margin-left:10px;">修改</el-button>
					<!-- v-if="scope.row.xg == 0" -->
				</template>
			</el-table-column>
		</el-table>
		<!-- 添加文章弹窗 -->
		<div class="mark" v-show="show">
			<div class="mark-content">
				<div class="hytj" v-if="is_show == 2">添加公告</div>
				<div class="hytj" v-if="is_show == 1">修改公告</div>
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr>
							<td class="td1">标题:</td>
							<td class="td2">
								<el-input v-model="submitform.jypassword" size="small" clearable></el-input>
								<div style="color:red ;display: flex;align-items: center; height: 100%;" v-show="jypassword">请输入用户名</div>
							</td>
						</tr>
						<tr>
							<td class="td1">图文内容:</td>
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
	import E from 'wangeditor'
	import Title from '@/components/title'
	import util from '@/utils/utils.js'
	import service from '@/service/service.js'
	import axios from 'axios'
	import qs from 'qs'
	export default {
		data() {
			return {
				article: {
					contentHtml: '',
				},
				is_show: 0,
				tabletwoData: [],
				submitform: {
					jypassword: '',
				},
				shujuData: "",
				jypassword: "",
				page: 1,
				id: "",
				editor: "",
				show:false
			}
		},
		components: {
			Title,
			E
		},
		async created() {
			this.getAdminLog(1)
		},
		methods: {
			 querySearch(queryString, cb) {
			  var restaurants = this.restaurants
			  var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
			  // 调用 callback 返回建议列表的数据
			  cb(results)
			},
			createFilter(queryString) {
			  return (restaurant) => {
			    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
			  }
			},
			loadAll() {
			  return [
			    {'value': 'vue'},
			    {'value': 'node.js'}
			  ]
			},
			handleSelect(item) {
			  console.log(item)
			},
			getContent: function () {
			  alert(this.article.contentHtml)
			},
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
			//公告列表
			async getAdminLog(page) {
				const announcements = await service.announcements({
					token: util.getCookie("token"),
					page: page
				})
				if (announcements.data.status == 1) {
					this.shujuData = announcements.data.data
					console.log(announcements.data.data)
					const tabletwoData = announcements.data.data.list.map((item, index) => {
						item.add_time = this.getDate(item.add_time * 1000)
						this.id = item.id
						return item
					})
					console.log(789, this.id)
					this.tabletwoData = tabletwoData
					this.$message.success(announcements.data.info);
				}else{
					this.$message.error(announcements.data.info);
				}
			},
			// 分页
			handleCurrentChange(val) {
				this.getAdminLog(val)
			},
			// 删除
			async delClick(row) {
				console.log(row)
				const del = await service.del({
					id: row.id
				})
				if (del.data.status == 1) {
					this.$message.success('删除成功');
					this.getAdminLog(1)
				}
			},
			//修改
			async modifyClick(row) {
				this.is_show = 1
				this.show = true
				this.submitform.jypassword = row.title
				this.article.contentHtml = row.content
				this.id = row.id
				console.log(row)
			},
			//审核成功
			async okClick(row){
				const auditSuccess = await service.auditSuccess({
					id:row.id
				})
				if(auditSuccess.data.status == 1){
					console.log(this.id)
					this.$message.success('审核成功');
					this.getAdminLog(1)
				}else{
					this.$message.error(auditSuccess.data.info);
				}
			},
			//审核失败
			async noClick(row){
				const auditError = await service.auditError({
					id:row.id
				})
				if(auditError.data.status == 1){
					console.log(this.id)
					this.$message.success('审核失败');
					this.getAdminLog(1)
				}else{
					this.$message.error(auditError.data.info);
				}
			},
			// 新增公告
			async addArticleClick() {
				this.is_show = 2
				this.show = true
				this.submitform.jypassword = ''
				this.article.contentHtml = ''
				this.editor.txt.html("")
			},
			// 新增公告
			async onSubmitClick() {
				if(this.is_show == 2){
					const addgonggao = await service.addgonggao({
						token: util.getCookie("token"),
						title: this.submitform.jypassword,
						content: this.editor.txt.html(),
						id: ""
					})
					if (addgonggao.data.status == 1) {
						this.show = false
						this.$message.success('添加成功');
						this.getAdminLog(1)
					} else {
						this.$message.error(addgonggao.data.info);
					}
				}else if(this.is_show == 1){
					const addgonggao = await service.addgonggao({
						token: util.getCookie("token"),
						title: this.submitform.jypassword,
						content: this.editor.txt.html(),
						id: this.id
					})
					console.log(this.tabletwoData.id)
					if (addgonggao.data.status == 1) {
						this.show = false
						this.tabletwoData.title = this.submitform.jypassword
						this.tabletwoData.content = this.article.contentHtml
						this.getAdminLog(1)
						this.$message.success('修改成功');
					}else{
						this.$message.success(addgonggao.data.info);
					}
				}
			},
			// 关闭
			clone() {
				this.show = false
			},
		},
		async mounted(){
			console.log("adsf")
			console.log(this.$refs.editor)
			let that = this
			var editor = new E(this.$refs.editor)
			this.editor = editor
			// editor.customConfig.onchange = (html) => {
			//   that.article.contentHtml = html
			// }

			editor.customConfig.uploadImgParamsWithUrl = true
			editor.customConfig.pasteIgnoreImg = true
			editor.customConfig.pasteFilterStyle = false
			editor.customConfig.uploadImgServer = '/admin/bank/uploadPic' // 上传图片到服务器
			editor.customConfig.showLinkImg = false;
			editor.customConfig.uploadFileName = 'pic';
			editor.customConfig.uploadImgParams = {
				token: util.getCookie('token'),
			}
			editor.customConfig.uploadImgHooks = {
				success: function(xhr, editor, result) {
					// 图片上传并返回结果，图片插入成功之后触发
					// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
				},
				fail: function(xhr, editor, result) {
					// 图片上传并返回结果，但图片插入错误时触发
					// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
				},
				error: function(xhr, editor) {
					// 图片上传出错时触发
					// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
				},
				timeout: function(xhr, editor) {
					// 图片上传超时时触发
					// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
				},
				customInsert: function(insertImg, result, editor) {
					// 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
					// insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
					// 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
					// result 必须是一个 JSON 格式字符串！！！否则报错
					var url = that.img_url + result.data;
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
		}
	}
</script>
<style>
	.el-textarea__inner {
		height: 200px !important;
	}

	.el-input__inner {
		text-align: center !important;
		width: 100% !important;
	}

	.submitform .el-input {
		width: 80% !important;
		padding-left: 10% !important;
	}
</style>

<style scoped>
	.block {
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	tr {
		height: 50px;
		width: 100%;
		border: 1px lightgray dashed;
	}

	.td1 {
		text-align: center;
		padding-right: 10px;
		background: #eee;
		width: 30%;
	}

	.td2 {
		width: 30%;
		line-height: 50px;
		text-align: left;
		margin-left: 10px;
		background: #eee;
	}

	.td3 {
		width: 30%;
		text-align: center;
		background: #eee;
	}

	.td3 {
		height: 200px;
		width: 100%;
	}

	.td_content1,
	.td_content2,
	.td_content3 {
		text-align: center;
	}

	/* 遮罩 */
	.mark {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mark-content {
		width: 70%;
		height: 80%;
		background: #f0f2f5;
		overflow: auto;
	}

	.hytj {
		color: #666666;
		padding: 15px 0;
		text-align: center;
		border-bottom: 1px solid #D7D7D7;
		font-size: 28px;

	}

	/* 添加会员表单 */
	.submitform {
		margin: 15px 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.submitform .el-input {
		margin-right: 10px;
		width: 270px;
		float: left;
		display: flex;
		align-items: center;
		height: 100%;
	}

	tr {
		height: 50px;
		width: 100%;
		border: 1px lightgray dashed;
	}

	.td1 {
		text-align: right;
		padding-right: 10px;
	}

	.td2 {
		padding-left: 10px;
	}
	.el-autocomplete-suggestion {
		z-index: 10010 !important;
	}
	
	.w-e-text-container {
		height: 600px !important;
	}
	.w-e-toolbar{
  flex-wrap:wrap;
}
</style>
