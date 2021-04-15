<template>
	<div class="banner">
		<el-card shadow="always" class="button-card">
			<el-button-group>
				<div class="user-search">
					<!-- <el-button type="primary" icon="el-icon-arrow-left" @click="add()">添加</el-button> -->
					<div class="sel">
						<span>
							<el-input type="text" v-model="selID" class="sel-input" auto-complete="off" placeholder="请输入二维码备注"></el-input>
						</span>
						<span>
							<el-button type="primary" @click="handleSel" class="sel-button">查询</el-button>
						</span>
					</div>
				</div>
				<el-button type="primary" icon="el-icon-circle-plus-outline" @click="Refresh">刷新</el-button>
			</el-button-group>
		</el-card>
		<!--用户表-->
		<el-card shadow="always">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="index" label="排序">
				</el-table-column>
				<el-table-column prop="deTailTypeText" label="分类">
				</el-table-column>
				<el-table-column prop="deTailInfo" label="内容">
					<template slot-scope="scope">
						<div style="width: 100%;height: 100%;" v-html="scope.row.deTailInfo"></div>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作">
					<template slot-scope="scope">
						<el-button type="text" @click="appendChange(scope.row,scope.$index)">编辑</el-button>
						<!-- <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button> -->
					</template>
				</el-table-column>
			</el-table>
			<!--分页-->
			<div class="block">
				<el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="pageSize" :current-page="1"
				 :total="total">
				</el-pagination>
			</div>
		</el-card>

		<!--编辑-->
		<el-dialog title="修改二维码" :visible.sync="dialogFormVisible" @close="close">
			<el-form status-icon label-width="100px" class="demo-ruleForm">
				<el-form status-icon label-width="100px" class="demo-ruleForm">
					<el-form-item label="内容" prop="deTailInfo">
						<quill-editor v-model="deTailInfo" ref="myQuillEditor" class="editer" :options="editorOption" @ready="onEditorReady($event)">
						</quill-editor>
					</el-form-item>
				</el-form>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="deleteClick">删 除</el-button>
				<el-button @click="cancel">取 消</el-button>
				<el-button type="primary" @click="changeSubmit()">确认</el-button>
			</div>
		</el-dialog>

		<!--添加-->
		<el-dialog title="添加二维码" :visible.sync="addDialogVisible" @close="close">
			<el-form status-icon label-width="100px" class="demo-ruleForm">
				<el-form-item label="分类" prop="deTailType">
					<el-select v-model="deTailType" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="内容" prop="deTailInfo">
					<quill-editor v-model="deTailInfo" ref="myQuillEditor" class="editer" :options="editorOption" @ready="onEditorReady($event)">
					</quill-editor>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleAdd()">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import {
		Message
	} from 'element-ui';
	import Vue from 'vue'
	import Store from "@/vuex/index"
	import {
		quillEditor
	} from 'vue-quill-editor' //调用编辑器
	export default {
		name: "classify",
		components: {
			//使用编辑器
			quillEditor
		},
		data() {
			return {
				value: [],
				data2: [],
				show: false,
				defaultProps: {
					children: 'children',
					label: 'label'
				},
				//          	当前页
				pageIndex: 1,
				//          	每页信息个数
				pageSize: 0,
				//          	总信息数
				total: 0,
				//          	添加页宽度
				formLabelWidth: '120px',
				//     			修改页
				dialogFormVisible: false,
				//          	搜索id
				selID: "",
				menu: [],
				//              添加页
				addDialogVisible: false,
				//				属性标题
				tableData: [],
				// 				添加页
				userId: "",
				//				修改页
				uname: "",
				menuId: [],
				// 编辑id
				sysRoleId: "",
				//  上传图片路径
				options: [{
					value: '1',
					label: '公司介绍'
				}, {
					value: '2',
					label: '安全保障'
				}, {
					value: '3',
					label: '受益模式'
				}, {
					value: '4',
					label: '联系我们'
				}, {
					value: '5',
					label: '收益分析'
				}],
				deTailType: "",
				deTailInfo: "",
				editorOption: {}
			}
		},
		created: function() {
			// this.getMenu()
		},
		mounted() {
			var _this = this
			this.querySysRoleInfoPageList(1, this.selID)
		},
		methods: {
			onEditorReady(editor) {},
			// 上传图片限制
			beforeAvatarUpload(file) {
				if (['image/jpeg', 'image/png', 'image/jpg'].indexOf(file.type) == -1) {
					this.$message.error('只可以上传图片');
					return false;
				}
			},
			// 上传图片
			success(file) {
				this.qrurl = file.data[0].filepath
				Message.success("图片/视频上传成功")
			},

			// 获取数据列表
			async querySysRoleInfoPageList(pageIndex, adminName) {
				const postData = {
					pageIndex,
				}
				setTimeout(async () => {
					const data = await this.$appApi.queryFzpDetailInfoPageList(postData)
					const tableData = data.records.map((item, index) => {
						if (pageIndex > 1) {
							item.index = index + 1 + 10 * (pageIndex - 1)
						} else {
							item.index = index + 1
						}
						switch (Number(item.deTailType)) {
							case 1:
								item.deTailTypeText = "公司介绍";
								break;
							case 2:
								item.deTailTypeText = "安全保障";
								break;
							case 3:
								item.deTailTypeText = "受益模式";
								break;
							case 4:
								item.deTailTypeText = "联系我们";
								break;
							case 5:
								item.deTailTypeText = "收益分析";
								break;
						}
						return item
					})
					if (data) {
						Vue.set(this, "tableData", tableData)
						if (pageIndex == 1) {
							Vue.set(this, "pageSize", data.pageSize)
							const size = data.pageSize
							const max = data.pageMaxSize
							const total = size * max
							Vue.set(this, "total", total)
						}
					}
				}, 1000)
			},
			//			刷新
			Refresh() {
				this.querySysRoleInfoPageList(1, this.selID)
			},

			// 打开 添加页面
			add() {
				this.addDialogVisible = true;
				this.deTailType = ""
				this.deTailInfo = ""
			},
			//		  	新增
			async handleAdd() {
				// console.log()
				// console.log(this.deTailInfo)
				// return
				if (this.deTailType == "") {
					Message.warning("分类不能为空")
				} else if (this.deTailInfo == "") {
					Message.warning("内容不能为空")
				} else {
					const postData = {
						deTailType: this.deTailType,
						deTailInfo: this.deTailInfo
					}
					const data = await this.$appApi.saveFzpDetailInfo(postData)
					if (data) {
						Message.success("添加成功")
						this.querySysRoleInfoPageList(1, this.selID)
						this.addDialogVisible = false
					}
				}
			},
			// 分页
			handleCurrentChange(val) {
				this.querySysRoleInfoPageList(val, this.selID)
			},
			// 关闭
			close() {
				this.$emit('update:addDialogVisible', false);
				this.$emit('update:addData', false);
			},
			// 查询
			handleSel() {
				if (this.selID == "") {
					Message.warning("角色名称不能为空")
				} else {
					this.querySysRoleInfoPageList(1, this.selID)
				}
			},
			// 打开删除
			delClick(row) {
				const _this = this;
				this.$confirm('确认删除此信息吗?', '提示', {
					//type: 'warning'
				}).then(async (res) => {
					const posData = {
						id: row.id
					}
					const data = await _this.$appApi.deleteFzpDetailInfo(posData)
					if (data) {
						Message.success('删除成功')
						_this.querySysRoleInfoPageList(1, _this.selID)
					}
				}).catch((error) => {});
			},

			// 编辑弹窗取消按钮
			cancel() {
				this.dialogFormVisible = false
			},
			// 编辑删除轮播图
			deleteClick() {
				this.qrurl = "";
			},
			// 修改
			async changeSubmit() {
				if (this.qrurl == "") {
					Message.warning("图片不能为空")
				} else {
					const postData = {
						id: this.sysRoleId,
						deTailType: this.deTailType,
						deTailInfo: this.deTailInfo
					}
					const data = this.$appApi.saveUpdateFzpDetailInfo(postData)
					if (data) {
						Message.success("修改成功")
						this.querySysRoleInfoPageList(1, this.selID)
						this.dialogFormVisible = false
					}
				}
			},
			// 编辑
			async appendChange(row) {
				this.dialogFormVisible = true
				this.deTailType = row.deTailType
				this.deTailInfo = row.deTailInfo
				this.sysRoleId = row.id
			},
		}
	}
</script>

<style scoped lang="scss">
	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}

	.button-card {
		text-align: justify;
		position: relative
	}

	.el-button-group {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.user-search {
		flex: 2;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.sel {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-left: 20px;
	}

	.checkbox {
		float: left;
		margin-right: 10px;
		border: 1px solid #DCDFE6;
		border-radius: 10%;
	}

	.scope-img {
		width: auto;
		height: 60px;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
		background-color: #f5f5f5;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
<style>
	.editer {
		height: 400px !important;
	}

	.ql-container {
		height: 300px !important;
	}
</style>
