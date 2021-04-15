<template>
  <div>
    <!-- 搜索 -->
    <el-card class="search">
      <el-form inline ref="form" :model="form">
        <el-form-item label="用户账号">
          <el-input
            v-model="form.email"
            placeholder="请输入用户账号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户id">
          <el-input
            v-model="form.member_id"
            placeholder="请输入用户id"
            size="small"
          ></el-input>
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
        <el-table-column prop="id" label="提现id"></el-table-column>
        <el-table-column prop="member_id" label="会员id"></el-table-column>
        <el-table-column prop="name" label="会员昵称"></el-table-column>
        <el-table-column prop="phone" label="会员账号"></el-table-column>
        <el-table-column prop="money" label="提现金额"></el-table-column>
        <el-table-column prop="zfb_name" label="支付宝昵称"></el-table-column>
        <el-table-column
          prop="zfb_account"
          label="支付宝账号"
        ></el-table-column>
        <el-table-column prop="add_time" label="提现时间"></el-table-column>
        <el-table-column prop="shenhe_time" label="审核时间">
          <template slot-scope="scope">
            {{ scope.row.shenhe_time || "--" }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="提现状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status == 0"
              type="primary"
              @click="handleOpenCheck(scope.row.id)"
              >审核</el-button
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
      title="审核"
      :visible.sync="dialogVisible"
      width="30%"
      @close="onClose"
    >
      <el-radio-group v-model="check">
        <el-radio :label="1">通过</el-radio>
        <el-radio :label="2">拒绝</el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCheck">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //商品筛选
      form: {
        email: "",
        member_id: "",
      },
      recharge: {
        name: "",
        money: "",
        id: "",
      },
      typeList: [],
      coinList: [],
      total: 0,
      tableData: [],
      dialogVisible: false,
      page: 1,
      checkId: "",
      check: "",
    };
  },
  filters: {
    statusFilter(val) {
      switch (Number(val)) {
        case 0:
          return "待审核";
        case 1:
          return "已通过";
        case 2:
          return "已拒绝";
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
    //查询
    async getYonghuzhanghu() {
      const postData = { ...this.form, page: this.page };
      let res = await this.$zcy.cashList(postData);
      if (Number(res.status) > 0) {
        console.log(res);
        this.tableData = res.data.list;
        this.total = res.data.number;
      } else {
        this.$message.error(res.info);
      }
    },
    //查询
    async cashShenhe() {
      const postData = { type: this.check, id: this.checkId };
      let res = await this.$zcy.cashShenhe(postData);
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.dialogVisible = false;
    },
    handleSearch() {
      this.page = 1;
      this.getYonghuzhanghu();
    },
    handleRefresh() {
      this.page = 1;
      this.form.email = "";
      this.form.member_id = "";
      this.getYonghuzhanghu();
    },
    handleOpenCheck(id) {
      this.checkId = id;
      this.dialogVisible = true;
    },
    handleCheck() {
      this.cashShenhe();
    },
    onClose() {
      this.check = "";
      this.checkId = "";
      this.handleRefresh();
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
