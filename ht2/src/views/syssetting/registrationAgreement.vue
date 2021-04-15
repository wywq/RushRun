<template>
	<div class="registrationAgreement">
		<el-form ref="article" :inline="true" :model="article" label-width="80px">
			<!-- <el-form-item label="文章标题">
        <el-input class="title" v-model="article.title"></el-input>
      </el-form-item> -->
			<!-- <el-form-item label="标签">
        <el-autocomplete
          class="inline-input"
          v-model="article.sort"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          @select="handleSelect"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="是否置顶">
        <el-switch v-model="article.top"></el-switch>
      </el-form-item> -->
			<el-form-item>
				<el-button class="subBtn" type="primary" @click="submitArticle">发布</el-button>
				<!-- <el-button class="subBtn" type="primary" @click="getContent">获取内容</el-button> -->
			</el-form-item>

		</el-form>
		<div ref="editor" style="text-align:left" id="editor">
			<div class="" v-html="article.contentHtml"></div>
		</div>
	</div>
</template>

<script>
	import E from 'wangeditor'
	import util from '@/utils/utils.js'
	import service from '@/service/service.js'
	import axios from 'axios'
	import qs from 'qs'
	export default {
		name: 'addArticle',
		data() {
			return {
				article: {
					title: '文章测试-标题',
					sort: '',
					top: true,
					contentHtml: '',
				},
				initData: "",
				restaurants: [],
				img_url: this.img_url,
				url: '',
				editor:'',
			}
		},
		async created() {
				this.xianshi()
		},
		methods: {
			async xianshi(){
				const zhucexuke = await service.zhucexuke();
				console.log(1111,zhucexuke.data.data)
				if (zhucexuke.data.status == 1) {
					this.article.contentHtml= zhucexuke.data.data
					
					this.$message.success(zhucexuke.data.info);
				}else{
					this.$message.error(zhucexuke.data.info);
				}
				this.restaurants = this.loadAll()
			},
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
				return [{
						'value': 'vue'
					},
					{
						'value': 'node.js'
					}
				]
			},
			handleSelect(item) {
				console.log(item)
			},
			getContent: function() {
				console.log(this.article.contentHtml)
				// this.article.contentHtml =''/
			},
			async submitArticle() {
				const updatezhuce = await service.updatezhuce({
					value:this.editor.txt.html()
				})
				console.log(this.article.contentHtml)
				if (updatezhuce.data.status == 1) {
					this.$message.success('提交成功');
				} else {
					this.$message.error(updatezhuce.data.info);
				}
			}
		},
		async mounted() {
			let that = this
			var editor = new E(this.$refs.editor)
			this.editor = editor
			// editor.customConfig.onchange = (html) => {
			// 	console.log(1231445, html)
			// 	that.article.contentHtml = html
			// }
			editor.customConfig.uploadImgParamsWithUrl = true
			editor.customConfig.uploadImgServer = '/admin/bank/uploadPic' // 上传图片到服务器
			editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
			editor.customConfig.uploadImgMaxLength = 5;
			editor.customConfig.uploadFileName = 'pic';
			editor.customConfig.uploadImgParams = {
				token: util.getCookie('token'),
			}

			editor.customConfig.uploadImgHooks = {
					before: function(xhr, editor, files) {
						// 图片上传之前触发
						// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

						// 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
						// return {
						//     prevent: true,
						//     msg: '放弃上传'
						// }
						// alert("前奏");
					},
					success: function(xhr, editor, result) {
						// 图片上传并返回结果，图片插入成功之后触发
						// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
						console.log(555, result)
						console.log(999, result.data)
						console.log(888, that.article.contentHtml)
					},
					fail: function(xhr, editor, result) {
						console.log(123, xhr)
						console.log(456, editor)
						console.log(789, result)
						// 图片上传并返回结果，但图片插入错误时触发
						// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
					},
					error: function(xhr, editor) {
						// 图片上传出错时触发
						// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
						console.log(666, result)
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
				},

				editor.create()
		}
	}
</script>

<style scoped>
	.title {
		width: 1000px;
	}

	.subBtn {
		width: 100px;
		margin: 0 auto;
	}
</style>
<style>
	.el-autocomplete-suggestion {
		z-index: 10010 !important;
	}

	.w-e-text-container {
		height: 600px !important;
	}
</style>
