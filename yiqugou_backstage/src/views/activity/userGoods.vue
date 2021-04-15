<template>
  <div>
    <!-- 搜索 -->
    <el-card class="search">
      <el-form inline ref="form" :model="form">
        <el-form-item label="用户账号">
          <el-input
            v-model="form.loginName"
            placeholder="请输入用户账号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.type" size="small">
            <el-option
              v-for="t in typeList"
              :key="t.id"
              :value="t.id"
              :label="t.name"
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
          <el-button
            type="primary"
            size="small"
            @click="dialogVisibleAdd = true"
            >添加待售出商品</el-button
          >
          <el-button type="primary" size="small" @click="handleOpenUp('add')"
            >一键上架</el-button
          >
          <el-button type="primary" size="small" @click="handleOneCheck"
            >一键审核</el-button
          >
        </el-form-item>
        <el-form-item class="fee" label="今日应收手续费:">
          <div>{{ form.fee }}</div>
        </el-form-item>
        <el-form-item class="fee" label="今日交易额:">
          <div>{{ form.jye }}</div>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 实际手续费 -->
    <el-card>
      <el-form class="card-fee" inline ref="todayForm" :model="todayForm">
        <el-form-item label="请选择时间">
          <el-date-picker
            v-model="todayForm.time"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="small"
            @change="handleTime"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="应收手续费:">
          <div>{{ todayForm.fee ? todayForm.fee : 0 }}</div>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="phone" label="用户账号"></el-table-column>
        <el-table-column prop="nick" label="昵称"></el-table-column>
        <el-table-column prop="name" label="真实姓名"></el-table-column>
        <el-table-column prop="up_time" label="申请时间"></el-table-column>
        <el-table-column prop="shenhe_time" label="审核时间"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="get_money" label="获取金额"></el-table-column>
        <el-table-column prop="sell_money" label="出售金额"></el-table-column>
        <el-table-column prop="sxf" label="应收手续费"></el-table-column>
        <el-table-column prop="up_pic" label="打款凭证">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.up_pic"
              :preview-src-list="[scope.row.up_pic]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="status_x" label="状态"></el-table-column>
        <el-table-column label="操作" min-width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleDelete(scope.row.id)"
              >删除</el-button
            >
            <el-button
              v-if="scope.row.is_up == 2"
              type="primary"
              @click="handleOpenCheck(scope.row.id)"
              >审核</el-button
            >
            <el-button
              v-if="scope.row.is_allow == 1 && scope.row.is_up == 1"
              type="primary"
              @click="handleOpenUp(scope.row.id)"
              >上架</el-button
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
    <el-dialog
      title="上架"
      :visible.sync="dialogVisibleUp"
      width="30%"
      @close="onCloseUp"
    >
      <el-select v-model="act_id">
        <el-option
          v-for="item in activityList"
          :key="item.act_id"
          :value="item.act_id"
          :label="item.begin_time + '~' + item.end_time"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleUp = false">取 消</el-button>
        <el-button type="primary" @click="handleUp">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加" :visible.sync="dialogVisibleAdd" width="30%">
      <el-form
        class="addform"
        label-position="left"
        ref="addform"
        :model="addForm"
      >
        <el-form-item label="账号">
          <el-input
            class="equal"
            v-model="addForm.loginName"
            placeholder="请输入账号"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="金额">
          <el-input
            class="equal"
            v-model="addForm.money"
            placeholder="请输入金额"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="商品">
          <el-select class="equal" v-model="addForm.goods_id" size="small">
            <el-option
              v-for="item in goodsList"
              :key="item.goods_id"
              :value="item.goods_id"
              :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typeList: [
        { id: 0, name: "未申请上架" },
        { id: 1, name: "审核通过" },
        { id: 2, name: "待审核" },
      ],
      form: {
        loginName: "",
        type: "",
        fee: "",
        jye: "",
      },
      page: 1,
      total: 0,
      tableData: [],
      //审核
      dialogVisible: false,
      checkId: "",
      check: "",
      //上架
      dialogVisibleUp: false,
      upId: "",
      act_id: "",
      //活动列表
      activityList: [],
      //添加
      dialogVisibleAdd: false,
      goodsList: [],
      addForm: {
        loginName: "",
        money: "",
        goods_id: "",
      },
      todayForm: { time: "", fee: "" },
    };
  },
  filters: {
    statusFilter(val) {
      switch (Number(val)) {
        case 1:
          return "未匹配";
        case 2:
          return "已匹配";
      }
    },
  },
  created() {
    this.getYonghuzhanghu();
    this.getActivity();
    this.memberGoodsList();
  },
  components: {},
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getYonghuzhanghu();
    },
    //查询 用户商品
    async getYonghuzhanghu() {
      const postData = { ...this.form, page: this.page };
      let res = await this.$zcy.getGoodsUserList(postData);
      if (Number(res.status) > 0) {
        console.log(res.data.list);
        this.tableData = res.data.list;
        this.total = res.data.number;
        this.form.fee = res.data.sxf;
        this.form.jye = res.data.jye;
      } else {
        this.$message.error(res.info);
      }
    },
    //查询 用户商品
    async getActivity() {
      let res = await this.$zcy.getActivity({ type: 1 });
      if (Number(res.status) > 0) {
        console.log(res);
        this.activityList = res.data;
      } else {
        this.$message.error(res.info);
      }
    },
    //查询 所有商品
    async memberGoodsList() {
      let res = await this.$zcy.memberGoodsList();
      if (Number(res.status) > 0) {
        console.log(res);
        this.goodsList = res.data;
      } else {
        this.$message.error(res.info);
      }
    },
    //一键上架
    async getOneUp() {
      let res = await this.$zcy.oneUp({
        act_id: this.act_id,
      });
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.dialogVisibleUp = false;
    },
    //上架
    async getUp() {
      let res = await this.$zcy.activityGoods({
        id: this.upId,
        act_id: this.act_id,
      });
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.dialogVisibleUp = false;
    },
    handleSearch() {
      this.page = 1;
      this.getYonghuzhanghu();
    },
    handleRefresh() {
      this.page = 1;
      this.form.loginName = "";
      this.form.type = "";
      this.getYonghuzhanghu();
    },
    handleOpenCheck(id) {
      this.checkId = id;
      this.dialogVisible = true;
    },
    handleOpenUp(id) {
      this.upId = id;
      this.dialogVisibleUp = true;
    },
    async handleCheck() {
      let res = await this.$zcy.upShenhe({
        id: this.checkId,
        type: this.check,
      });
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.dialogVisible = false;
    },
    async handleUp() {
      if (this.upId == "add") {
        this.getOneUp();
      } else {
        this.getUp();
      }
    },
    async handleAdd() {
      let res = await this.$zcy.addCompleteGoods({ ...this.addForm });
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.dialogVisibleAdd = false;
      this.handleRefresh();
    },
    async handleDelete(id) {
      let res = await this.$zcy.delGoodsUser({ id });
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.getYonghuzhanghu();
    },
    //获取手续费
    async getTimeFee() {
      let res = await this.$zcy.sxfIndex({
        begin_time: this.todayForm.time[0],
        end_time: this.todayForm.time[0],
      });
      if (Number(res.status) > 0) {
        console.log(res);
        this.todayForm.fee = res.data.sxf;
      }
    },
    handleTime(e) {
      if (e === null) {
        this.todayForm.fee = 0;
        return;
      }
      this.getTimeFee();
    },
    onClose() {
      this.checkId = "";
      this.check = "";
      this.getYonghuzhanghu();
    },
    onCloseUp() {
      this.upId = "";
      this.act_id = "";
      this.getYonghuzhanghu();
    },
    // 一键审核
    async handleOneCheck() {
      let res = await this.$zcy.oneShenhe();
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
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
/* .addform ::v-deep .el-input .el-input--small {
  width: 50% !important;
}
.addform ::v-deep .el-select .el-select--small {
  width: 100%;
} */
.equal {
  width: 500px;
}
.fee {
  float: right;
}
.card-fee {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
