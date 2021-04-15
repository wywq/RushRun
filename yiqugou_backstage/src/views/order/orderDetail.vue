<template>
	<div>
		<!-- 订单详情 -->
		<el-card>
            <el-row :gutter="24" class="item-style">
			    <el-col :span="23" :offset="1">
                    <el-button type="success" size="small" @click="goBack">返回</el-button>
                    <el-button type="success" size="small" @click="showPostDialog = true" v-if="orderDetail.orderInfo.status == 1">编辑快递信息</el-button>
			    </el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>用户昵称</div></el-col>
                <el-col :span="18"><div>{{orderDetail.memberInfo ? orderDetail.memberInfo.nick : ''}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>商品名称</div></el-col>
                <el-col :span="18"><div>{{orderDetail.ordergoods[0].goods_name}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>商品规格</div></el-col>
                <el-col :span="18"><div>{{orderDetail.ordergoods[0].guige}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>价格</div></el-col>
                <el-col :span="18"><div>{{orderDetail.ordergoods[0].all_price}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>购买数量</div></el-col>
                <el-col :span="18"><div>{{orderDetail.ordergoods[0].num}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>订单总价格</div></el-col>
                <el-col :span="18"><div>{{orderDetail.orderInfo.price}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>下单IP</div></el-col>
                <el-col :span="18"><div>{{orderDetail.orderInfo.order_ip}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>快递公司名称</div></el-col>
                <el-col :span="18"><div>{{orderDetail.orderInfo.post_name}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>快递单号</div></el-col>
                <el-col :span="18"><div>{{orderDetail.orderInfo.post_number}}</div></el-col>
            </el-row>
		</el-card>
        <edit-post-dialog :value_show="showPostDialog" :order_id="oid" @close="postDialogClose"></edit-post-dialog>
	</div>
</template>

<script>
	import editPostDialog from './editPostDialog.vue'
	export default {
        name: "orderDetail",
        components: {
            editPostDialog
        },
		data() {
			return {
				//订单id
                oid:this.$route.query.oid,
                //订单信息
                orderDetail: {},
                //编辑弹窗
                showPostDialog: false,
                //快递公司
                postList: []
			}
		},
		created() {
			this.getDetail();
		},
		methods: {
			//获取订单详情
			async getDetail() {
				let postdata = {
                    "order_id": this.oid
				}
                let res = await this.$zcy.getOrderInfo(postdata)
                console.log("订单详情",res)
				if (res.status == 1) {
                    this.orderDetail = res.data
                }
            },
            postDialogClose(){
                this.showPostDialog = false
                this.getDetail();
            },
            goBack(){
                this.$router.go(-1)
            }
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
