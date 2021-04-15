<template>
	<div>
		<!-- 优惠券发放记录 -->
		<el-card>
            <el-row :gutter="24" class="item-style">
			    <el-col :span="24">
                    <el-button type="success" size="small" @click="goBack">返回</el-button>
			    </el-col>
            </el-row>
			<el-table :data="list" border style="width: 100%">
				<el-table-column prop="coupon_det" label="id"></el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        {{scope.row.status == 1 ? "有效" : ""}}
                        {{scope.row.status == 2 ? "已结束" : ""}}
                    </template>
                </el-table-column>
				<el-table-column prop="add" label="发放时间"></el-table-column>
				<el-table-column prop="phone" label="用户手机号"></el-table-column>
				<el-table-column prop="nick" label="用户昵称"></el-table-column>
                <el-table-column prop="used" label="使用时间"></el-table-column>
			</el-table>
            <div style="text-align: center;">
				<el-pagination background @current-change="handleCurrentChange" layout="prev, pager, next" :page-size="10"
				 :current-page="page" :total="total" style="margin-top:10px;"></el-pagination>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
        name: "couponGrantRecord",
		data() {
			return {
				//优惠券id
                coupon_id:this.$route.query.cid,
                page: 1,
                total: 0,
                list: []
			}
		},
		created() {
			this.getlist();
		},
		methods: {
			//获取优惠券发放记录
			async getlist() {
				let postdata = {
                    coupon_id: this.coupon_id,
                    page: this.page,
                    page_num: 10
				}
                let res = await this.$zcy.getGrantLog(postdata)
                console.log("优惠券记录",res.data)
				if (res.status == 1) {
                    this.list = res.data.data
                    this.total = res.data.all_num
                }
            },
            goBack(){
                this.$router.go(-1)
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getlist();
            },
		}
	};
</script>

<style lang="scss">
    .el-form-item{
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
  .item-style{
      padding: 20px;
  }
</style>
