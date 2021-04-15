<template>
  <div>
    <!-- 条件筛选 -->
    <el-card>
      <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-button type="success" size="small" @click="addCoupon">添加优惠券</el-button>
        </el-form-item>
        <el-form-item label="店铺名称">
          <el-select v-model="form.shop_id" placeholder="请选择" size="mini">
            <el-option
              v-for="item in shoplist"
              :key="item.shop_id"
              :label="item.shopName"
              :value="item.shop_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优惠券名称">
          <el-input v-model="form.coupon_name" placeholder="按优惠券名称搜索" clearable size="mini"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="refresh">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="coupon_id" label="优惠券id" width="80px"></el-table-column>
        <el-table-column prop="coupon_name" label="优惠券名称"></el-table-column>
        <el-table-column prop="money" label="抵扣金额"></el-table-column>
        <el-table-column prop="money_max" label="满多少可用"></el-table-column>
        <el-table-column prop="num" label="每个用户最多可领取数量"></el-table-column>
        <el-table-column prop="grant_num" label="发放总数量"></el-table-column>
        <el-table-column prop="grant_now" label="当前已发放数量">
          <template slot-scope="scope">
              {{scope.row.status == 1 ? "有效" : ""}}
              {{scope.row.status == 2 ? "已结束" : ""}}
          </template>
        </el-table-column>
        <el-table-column prop="shop_name" label="店铺名称">
        </el-table-column>
        <el-table-column prop="begin" label="可用开始时间"></el-table-column>
        <el-table-column prop="end" label="可用结束时间"></el-table-column>
        <el-table-column prop="add" label="添加时间"></el-table-column>
        <el-table-column prop="update" label="修改时间"></el-table-column>
        <el-table-column prop label="操作" fixed="right" width="110px" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="success" size="small" @click="modify(scope.row.coupon_id,scope.row)">修改</el-button>
            </div>
            <div style="margin-top:10px;">
              <el-button type="success" size="small" @click="detail(scope.row.coupon_id)">详情</el-button>
            </div>
            <div style="margin-top:10px;">
              <el-button type="success" size="small" @click="issueCoupons(scope.row.coupon_id)">发放优惠券</el-button>
            </div>
            <div style="margin-top:10px;">
              <el-button type="success" size="small" @click="viewRecord(scope.row.coupon_id)">发放记录</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :page-size="10"
          :current-page="page"
          :total="total"
          style="margin-top:10px;"
        ></el-pagination>
      </div>
    </el-card>
    <coupon-add-edit-dialog v-if="showEditDialog" :value_show="showEditDialog" :type="type" :coupon_id="coupon_id" :data="coupon_data" @close="closeCoupon"></coupon-add-edit-dialog>
    <issue-coupons-dialog v-if="showIssueDialog" :value_show="showIssueDialog" :coupon_id="coupon_id" @close="closeIssue"></issue-coupons-dialog>
  </div>
</template>

<script>
import couponAddEditDialog from './couponAddEditDialog.vue'
import issueCouponsDialog from './issueCouponsDialog.vue'
export default {
  name: "couponlist",
  components: {
    couponAddEditDialog,
    issueCouponsDialog
  },
  data() {
    return {
      //商品筛选
      form: {
        coupon_name: '',
        shop_id: ''
      },
      //评论id
      id: "",
      page: 1,
      total: 0,
      shoplist: [],
      list: [],
      showReplyDialog: false,
      showEditDialog: false,
      showIssueDialog: false,
      shopid: "",
      coupon_id: 0,
      coupon_data: {},
      type: 1
    };
  },
  created() {
    this.getShopList();
    this.getlist();
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getlist();
    },
    //店铺列表
    async getShopList() {
      let res = await this.$zcy.getShop();
      console.log("shoplist", res.data);
      if (res.status == 1) {
        this.shoplist = res.data;
      }
    },
    //获取优惠券列表
    async getlist() {
      let postdata = {
        ...this.form,
        page: this.page,
        page_num: 10,
      };
      let res = await this.$zcy.getAllCoupon(postdata);
      console.log("coupon", res.data.data);
      if (res.status == 1) {
        this.list = res.data.data;
        this.total = res.data.all_num;
      }
    },
    //添加优惠券
    addCoupon() {
      this.type = 1
      this.showEditDialog = true;
    },
    //修改优惠券
    modify(id,data) {
      this.type = 2
      this.coupon_id = id
      this.coupon_data = data
      this.showEditDialog = true;
    },
    //关闭优惠券弹窗
    closeCoupon() {
      this.showEditDialog = false;
      this.page = 1;
      this.getlist();
    },
    //关闭发放弹窗
    closeIssue() {
      this.showIssueDialog = false;
      this.page = 1;
      this.getlist();
    },
    //店铺详情
    detail(id) {
      this.$router.push({ path: "/couponDetail", query: { cid: id } });
    },
    refresh() {
      this.page = 1;
      this.getlist();
    },
    //发放优惠券
    issueCoupons(id){
      this.coupon_id = id
      this.showIssueDialog = true
    },
    //发放记录
    viewRecord(id){
      this.$router.push({ path: "/couponGrantRecord", query: { cid: id } });
    },
    //关闭弹窗
    replyDialogClose() {
      this.showReplyDialog = false;
      this.page = 1;
      this.getlist();
    },
    //修改状态
    async updateShopStatus(id) {
      let res = await this.$zcy.updateShopStatus({ shop_id: id });
      if (res.status == 1) {
        this.$message.success("修改成功");
        this.getlist();
      } else {
        this.$message.error(res.info);
      }
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
  width: 120px;
  height: 120px;
}
.display-flex {
  display: flex;
}
.logo-icon {
  width: 100%;
  height: 100%;
}
</style>
