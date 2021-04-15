<template>
  <div>
    <!-- 充值 -->
    <el-card class="recharge">
      <!-- label-position="top" -->
      <el-form inline ref="recharge" :model="recharge">
        <el-form-item label="会员账号">
          <el-input
            v-model="recharge.name"
            placeholder="请输入会员账号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="账户">
          <el-radio-group v-model="recharge.id">
            <el-radio
              v-for="item in typeList"
              :key="item.id"
              :label="item.id"
              >{{ item.name }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="金额">
          <el-input
            v-model="recharge.money"
            placeholder="请输入金额"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleRecharge"
            >充值</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
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
    <!-- 表格1 -->
    <el-card>
      <el-table :data="coinList" border style="width: 100%">
        <el-table-column prop="name" label="币种名称"></el-table-column>
        <el-table-column prop="count" label="币种数量"></el-table-column>
      </el-table>
    </el-card>
    <!-- 表格 -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="member_id" label="会员id"></el-table-column>
        <el-table-column prop="nick" label="会员昵称"></el-table-column>
        <el-table-column prop="phone" label="会员账号"></el-table-column>
        <el-table-column
          prop="tuijian.phone"
          label="推荐人账号"
        ></el-table-column>
        <el-table-column prop="jintie" label="津贴"></el-table-column>
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
      page: 1,
    };
  },
  created() {
    this.zhanghufenlei();
    this.zhanghu();
    this.getYonghuzhanghu();
  },
  components: {},
  methods: {
    handleCurrentChange(val) {
      this.page = val;
    },
    //账户分类
    async zhanghufenlei() {
      let res = await this.$zcy.zhanghufenlei();
      if (Number(res.status) > 0) {
        console.log(res.type);
        this.typeList = res.type;
      }
    },
    //账户类型总和
    async zhanghu() {
      let res = await this.$zcy.zhanghu();
      if (Number(res.status) > 0) {
        console.log(res);
        this.coinList = res.type;
      }
    },
    //充值
    async handleRecharge() {
      let res = await this.$zcy.xinxiedit(this.recharge);
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
    },
    //查询
    async getYonghuzhanghu() {
      const postData = { ...this.form, page: this.page };
      let res = await this.$zcy.yonghuzhanghu(postData);
      if (Number(res.status) > 0) {
        console.log(res);
        this.tableData = res.data;
        this.total = res.all_num;
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
      this.form.email = "";
      this.form.member_id = "";
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
