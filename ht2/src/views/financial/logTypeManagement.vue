<template>
	<div>
		<!--表格 -->
		<el-table :data="tabletwoData" :header-cell-style="{background:'#F9F9F9',color:'#606266'}" border style="margin-top:10px">
			<!-- 	<el-table-column v-for="(item,index) in tabletwo" :prop="item.prop" :label="item.label" class="elcolumn" align="center">
			</el-table-column> -->

			<el-table-column label="ID" prop="logid">
			</el-table-column>
			<el-table-column label="日志图标">
				<template slot-scope="scope" prop="img">
					<img :src="scope.row.img">
				</template>
			</el-table-column>
			<el-table-column label="名称" prop="username">

			</el-table-column>
			<el-table-column label="状态">
				<template slot-scope="scope" prop="type">
					<div style="color: green;" v-if="scope.row.type == 1">开启</div>
					<div style="color: red;" v-if="scope.row.type == 2">关闭</div>
				</template>
			</el-table-column>
			<el-table-column label="操作" class="elcolumn" align="center" fixed="right" width="200px">
				<template slot-scope="scope">
					<el-button type="primary" @click="modifyClick(scope.row)" size="small" style="margin-left:10px;">修改</el-button>
					<el-button type="primary" size="small" @click="switchClick(scope.row,scope.$index)">切换</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!-- 添加会员弹窗 -->
		<div class="mark" v-if="is_show == 1">
			<div class="mark-content">
				<div class="hytj">日志类型修改</div>
				<!-- 提交的表单 -->
				<el-form class="submitform" :model="submitform">
					<table style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9" rules="all">
						<tr>
							<td class="td1">名称:</td>
							<td class="td2">
								<el-input v-model="submitform.username" size="small" placeholder="积分转换" clearable></el-input>
							</td>
						</tr>
						<tr>
							<td class="td1">状态:</td>
							<td class="td2">
								<el-radio v-model="submitform.resource" label="1">不显示</el-radio>
								<el-radio v-model="submitform.resource" label="2">显示</el-radio>
							</td>
						</tr>
						<tr>
							<td class="td1">图片上传:</td>
							<td class="td2">
								<el-upload class="avatar-uploader" action="http://47.52.174.44/fzp/LayUiUploadController/queryUpliadPic.json"
								 :show-file-list="false" :on-success="success" :before-upload="beforeAvatarUpload">
									<img v-if="qrurl" :src="qrurl" class="avatar">
									<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								</el-upload>
							</td>
						</tr>
						<tr>
							<td></td>
							<td class="td2">
								<el-button type="primary" @click="onSubmitClick" size="small">提交</el-button>
								<el-button type="primary" @click="cloneClick" size="small">返回</el-button>
							</td>
						</tr>
					</table>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'financialLog',
		data() {
			return {
				is_show: 0,
				qrurl: '',
				tabletwo: [{
					prop: 'logid',
					label: "ID"
				}, {
					prop: 'img',
					label: "日志图标"
				}, {
					prop: 'name',
					label: "名称"
				}, {
					prop: 'content',
					label: "状态"
				}, ], // 提交表单
				submitform: {
					username: '',
					resource: '',
				},
				tabletwoData: [{
					logid: '123456ccc4',
					username: 'xxq',
					img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
					type: 1,
					id: 1
				}, {
					logid: '123456cc4',
					username: 'xxqcsac',
					img: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
					type: 2,
					id: 2
				}],
			}
		},
		components: {},
		methods: {
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
			},
			// 显示
			modifyClick(row) {
				this.is_show = 1

				this.submitform.username = row.username

				this.qrurl = row.img
				this.submitform.resource = row.type

			},
			// 关闭
			cloneClick() {
				this.is_show = 0
			},
			// 提交
			onSubmitClick() {
				console.log(this.submitform)
				console.log(this.qrurl)
			}
		}
	}
</script>

<style scoped>
	/* 遮罩 */
	.mark {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 999;
		padding-left: -20px;
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
		width: 150px;
		height: 150px;
		line-height: 178px;
		text-align: center;
		background-color: #f5f5f5;
		margin: 10px 0;
	}

	.avatar {
		width: 150px;
		height: 150px;
		display: block;
		margin: 10px 0;

	}
</style>
