<template>
	<div>
		<!-- 表格 -->
		<el-card>
			<el-table :data="list" border style="width: 100%">
				<el-table-column prop="add_time" label="参与时间"></el-table-column>
				<el-table-column prop="member.nick" label="参与者用户昵称"></el-table-column>
				<el-table-column prop="member.name" label="参与者姓名"></el-table-column>
				<el-table-column prop="goods.pic" label="参与图片">
					<template slot-scope="scope">
						<el-image class="goods-pic" :src="scope.row.pic" :preview-src-list="[scope.row.pic]"></el-image>
					</template>
				</el-table-column>
				<!-- <el-table-column prop label="操作">
          <template slot-scope="scope">
            <div class="display-flex">
              <el-button type="danger" size="small" @click="delComment(scope.row.id)">删除</el-button>
              <el-button type="success" size="small" @click="replyComment(scope.row.id)" v-if="scope.row.reply_content==''">回复</el-button>
            </div>
          </template>
        </el-table-column> -->
			</el-table>
			<div style="text-align: center;">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="10"
				 :current-page="page" :total="total" style="margin-top:10px;"></el-pagination>
			</div>
		</el-card>
		<!-- <evaluate-reply-dialog :value_show="showReplyDialog" :rid="id" @close="replyDialogClose"></evaluate-reply-dialog> -->
	</div>
</template>
<script>
	import evaluateReplyDialog from "../../order/evaluateReplyDialog.vue";
	export default {
		props: ['oneplus_id'],
		data() {
			return {
				//评论id
				id: "",
				page: 1,
				total: 0,
				list: [],
				showReplyDialog: false,
			};
		},
		created() {
			this.getlist();
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getlist();
			},
			//获取全部评价
			async getlist() {
				let postdata = {
					oneplus_id: this.oneplus_id,
					page: this.page,
					page_size: 10,
				};
				let res = await this.$zcy.partList(postdata);
				console.log("comment", res);
				if (res.status == 1) {
					this.list = res.data;
					this.total = res.all_num;
				}
			},
			//删除评价
			async delComment(comment_id) {
				this.$confirm("确认删除？")
					.then(async () => {
						console.log(123)
						let res = await this.$zcy.commentDel({
							comment_id
						});
						if (res.status == 1) {
							this.$message.success("删除成功");
							this.getlist();
						}
					})
					.catch(() => {});
			},
			//回复
			replyComment(id) {
				this.showReplyDialog = true;
				this.id = id + "";
			},
			refresh() {
				this.page = 1;
				this.getlist();
			},
			//关闭弹窗
			replyDialogClose() {
				this.showReplyDialog = false;
				this.page = 1;
				this.getlist();
			},
			//获取评价图片
			getCommentPic(arr) {
				console.log("arr", arr)
				let newArr = []
				for (let i = 0; i < arr.length; i++) {
					newArr.push(arr[i].pic)
				}
				return newArr
			}
		},
	};
</script>

<style lang="scss">
	.el-form-item {
		margin-bottom: 10px;
	}

	.el-row {
		font-size: 14px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		text-align: left;
		padding-left: 10px;
		border-radius: 4px;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.goods-pic {
		width: 40px;
		height: 40px;
	}

	.display-flex {
		display: flex;
	}
</style>
