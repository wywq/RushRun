<template>
	<div>
		<!-- 优惠券详情 -->
		<el-card>
            <el-row :gutter="24" class="item-style">
			    <el-col :span="23" :offset="1">
                    <el-button type="success" size="small" @click="goBack">返回</el-button>
			    </el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>优惠券名称</div></el-col>
                <el-col :span="18"><div>{{couponDetail.coupon_name ? couponDetail.coupon_name : ''}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>抵扣金额</div></el-col>
                <el-col :span="18"><div>{{couponDetail.money}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>满多少可用</div></el-col>
                <el-col :span="18"><div>{{couponDetail.money_max}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>每个用户可领取数量</div></el-col>
                <el-col :span="18"><div>{{couponDetail.num}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>最大发放量</div></el-col>
                <el-col :span="18"><div>{{couponDetail.grant_num}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>当前发放量</div></el-col>
                <el-col :span="18"><div>{{couponDetail.grant_now}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>适用店铺名称</div></el-col>
                <el-col :span="18"><div>{{couponDetail.shopName}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>优惠券状态</div></el-col>
                <el-col :span="18">
                    <div v-if="couponDetail.status == 1">可用</div>
                    <div v-if="couponDetail.status == 2">已过期</div>
                </el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>可用商品数量</div></el-col>
                <el-col :span="16"><div>{{all_num}}</div></el-col>
                <el-col :span="2"></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style border" v-for="(item,index) in couponDetail.goods" :key="index">
                <el-col :span="5" :offset="1"><div>商品id：{{item.goods_id}}</div></el-col>
                <el-col :span="10" :offset="1"><div>商品名称：{{item.name}}</div></el-col>
                <el-col :span="6" :offset="1"><div>价格：{{item.price}}</div></el-col>
            </el-row>
		</el-card>
	</div>
</template>

<script>
	export default {
        name: "couponDetail",
		data() {
			return {
				//优惠券id
                cid:this.$route.query.cid,
                page: 1,
                total: 0,
                //订单信息
                couponDetail: {},
                //可用商品数量
                all_num: ''
			}
		},
		created() {
			this.getDetail();
		},
		methods: {
			//获取优惠券详情
			async getDetail() {
				let postdata = {
                    coupon_id: this.cid,
                    page: this.page,
                    page_num: 10
				}
                let res = await this.$zcy.getCouponInfo(postdata)
                console.log("优惠券详情",res.data)
				if (res.status == 1) {
                    this.couponDetail = res.data.data
                    this.all_num = res.data.all_num
                }
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
