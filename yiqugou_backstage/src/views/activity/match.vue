<template>
  <div>
    <!-- 搜索 -->
    <el-card class="search">
      <el-form inline ref="form" :model="form">
        <el-form-item label="购买者账号">
          <el-input
            v-model="form.buy_phone"
            placeholder="请输入购买者账号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input
            v-model="form.order_no"
            placeholder="请输入订单号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status" size="small">
            <el-option
              v-for="i in statusList"
              :key="i.id"
              :value="i.id"
              :label="i.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleSearch"
            >搜索</el-button
          >
          <el-button type="primary" size="small" @click="handleRefresh"
            >刷新</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="order_no" label="订单号"></el-table-column>
        <el-table-column
          prop="buy_loginName"
          label="购买账号"
        ></el-table-column>
        <el-table-column prop="buy_name" label="购买姓名"></el-table-column>
        <el-table-column
          prop="sell_loginName"
          label="卖出账号"
        ></el-table-column>
        <el-table-column prop="sell_name" label="卖出姓名"></el-table-column>
        <el-table-column prop="money" label="交易金额"></el-table-column>
        <el-table-column
          prop="matching_time"
          label="匹配时间"
        ></el-table-column>
        <el-table-column
          prop="confirm_buy_time"
          label="付款时间"
        ></el-table-column>
        <el-table-column
          prop="confirm_sell_time"
          label="收货时间"
        ></el-table-column>
        <el-table-column
          prop="confirm_sell_time"
          label="收货时间"
        ></el-table-column>
        <el-table-column prop="buy_img" label="付款凭证">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.buy_img"
              :preview-src-list="[scope.row.buy_img]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 4"
              type="primary"
              @click="handleOpenAppeal(scope.row.id)"
              >申诉处理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :page-size="15"
          :current-page="page"
          :total="total"
          style="margin-top:10px;"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog
      title="申诉处理"
      :visible.sync="dialogVisible"
      width="30%"
      @close="onClose"
    >
      <el-radio-group v-model="postData.type">
        <el-radio :label="1">卖家</el-radio>
        <el-radio :label="2">买家</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAppeal">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        buy_phone: "",
        order_no: "",
        status: "",
      },
      postData: {
        matching_id: "",
        type: "",
      },
      statusList: [
        { id: 1, name: "待付款" },
        { id: 2, name: "待收款" },
        { id: 3, name: "已完成" },
        { id: 4, name: "申诉中" },
      ],
      page: 1,
      total: 0,
      tableData: [],
      dialogVisible: false,
    };
  },
  filters: {
    statusFilter(val) {
      switch (Number(val)) {
        case 1:
          return "待付款";
        case 2:
          return "待收款";
        case 3:
          return "已完成";
        case 4:
          return "申诉中";
      }
    },
  },
  created() {
    this.getYonghuzhanghu();
  },
  components: {},
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getYonghuzhanghu();
    },
    // shensu
    async handleAppeal() {
      let res = await this.$zcy.appealAllow(this.postData);
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.dialogVisible = false;
    },
    //查询 用户商品
    async getYonghuzhanghu() {
      const postData = { ...this.form, page: this.page };
      let res = await this.$zcy.getMatchingList(postData);
      if (Number(res.status) > 0) {
        console.log(res.data.list);
        this.tableData = res.data;
        this.total = res.all_count;
      } else {
        this.$message.error(res.info);
      }
    },
    handleSearch() {
      this.page = 1;
      this.getYonghuzhanghu();
    },
    handleRefresh() {
      this.page = 1;
      this.form.buy_phone = "";
      this.form.order_no = "";
      this.form.status = "";
      this.getYonghuzhanghu();
    },
    handleOpenAppeal(id) {
      this.postData.matching_id = id;
      this.dialogVisible = true;
    },
    onClose() {
      this.postData.matching_id = "";
      this.postData.type = "";
      this.getYonghuzhanghu();
    },
  },
};
</script>

<style scoped>
.recharge ::v-deep .el-form-item {
  margin-right: 100px;
  margin-bottom: 0;
}
.el-form-item {
  margin-bottom: 0;
}
.el-card {
  margin-bottom: 20px;
}
</style>
