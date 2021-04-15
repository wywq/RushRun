<template>
	<div>
		<!-- 店铺详情 -->
		<el-card>
            <el-row :gutter="24" class="item-style">
			    <el-col :span="23" :offset="1">
                    <el-button type="success" size="small" @click="goBack">返回</el-button>
			    </el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>店铺id</div></el-col>
                <el-col :span="18"><div>{{shopDetail.shop_id}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>店铺logo</div></el-col>
                <el-col :span="18">
                    <div><img :src="shopDetail.logo" class="shop-pic" /></div>
                </el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>姓名</div></el-col>
                <el-col :span="18"><div>{{shopDetail.name}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>电话</div></el-col>
                <el-col :span="18"><div>{{shopDetail.phone}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>身份证号</div></el-col>
                <el-col :span="18"><div>{{shopDetail.IDcard}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>店铺名</div></el-col>
                <el-col :span="18"><div>{{shopDetail.shopName}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>地址</div></el-col>
                <el-col :span="18"><div>{{shopDetail.place}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>店铺状态</div></el-col>
                <el-col :span="18"><div>{{shopDetail.shopStatus == '1' ? '开启' : '关闭'}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>店铺描述</div></el-col>
                <el-col :span="18"><div>{{shopDetail.shopMiaoshu}}</div></el-col>
            </el-row>
            <!-- <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>店铺详情</div></el-col>
                <el-col :span="18"><div v-html="shopDetail.shopDescribeinfo"></div></el-col>
            </el-row> -->
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>申请时间</div></el-col>
                <el-col :span="18"><div>{{shopDetail.apply_time  | dataFormat}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>修改时间</div></el-col>
                <el-col :span="18"><div>{{shopDetail.updateTime | dataFormat}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>注册时间</div></el-col>
                <el-col :span="18"><div>{{shopDetail.regTime  | dataFormat}}</div></el-col>
            </el-row>
            <el-row :gutter="24" class="item-style">
                <el-col :span="3" :offset="1"><div>店铺等级</div></el-col>
                <el-col :span="18"><div>{{shopDetail.shopLevel}}</div></el-col>
            </el-row>
		</el-card>
	</div>
</template>

<script>
	export default {
        name: "shopDetail",
		data() {
			return {
				//店铺id
                sid:this.$route.query.sid,
                //订单信息
                shopDetail: {},
                //编辑弹窗
                showPostDialog: false
			}
		},
		created() {
			this.getDetail();
		},
		methods: {
			//获取订单详情
			async getDetail() {
                console.log("cjekje")
				let postdata = {
                    "id": this.sid
				}
                let res = await this.$zcy.getShopInfo(postdata)
                console.log("店铺详情",res)
				if (res.status == 1) {
                    this.shopDetail = res.data
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
    .shop-pic{
		width: 120px;
		height: 120px;
	}
</style>
