<template>
  <div>
    <!-- 搜索 -->
    <el-card class="search">
      <el-button type="primary" size="small" @click="dialogVisibleAdd = true"
        >添加</el-button
      >
    </el-card>
    <!-- 表格 -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="admin_id" label="管理员ID"></el-table-column>
        <el-table-column prop="user_name" label="管理员账号"></el-table-column>
        <el-table-column prop="pwd" label="管理员密码"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleDelete(scope.row.admin_id)"
              >删除</el-button
            >
            <el-button
              type="primary"
              @click="handleOpenChange(scope.row.admin_id)"
              >修改密码</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="text-align: center;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :page-size="15"
          :current-page="page"
          :total="total"
          style="margin-top:10px;"
        ></el-pagination>
      </div> -->
    </el-card>
    <el-dialog
      title="审核"
      :visible.sync="dialogVisibleChange"
      width="30%"
      @close="onCloseChange"
    >
      <el-form
        class="addform"
        label-position="left"
        ref="changeform"
        :model="changeform"
      >
        <el-form-item label="旧密码">
          <el-input
            class="equal"
            v-model="changeform.pwd_old"
            placeholder="请输入旧密码"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input
            class="equal"
            v-model="changeform.pwd_new"
            placeholder="请输入新密码"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="重复新密码">
          <el-input
            class="equal"
            v-model="changeform.pwd_2"
            placeholder="请再次输入密码"
            size="small"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleChange = false">取 消</el-button>
        <el-button type="primary" @click="handleChange">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisibleAdd"
      width="30%"
      @close="onClose"
    >
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
        <el-form-item label="密码">
          <el-input
            class="equal"
            v-model="addForm.password"
            placeholder="请输入密码"
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="重复密码">
          <el-input
            class="equal"
            v-model="addForm.pwd_2"
            placeholder="请再次输入密码"
            size="small"
          ></el-input>
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

      page: 1,
      total: 0,
      tableData: [],
      //Xiugai1
      dialogVisibleChange: false,
      changeform: {
        admin_id: "",
        pwd_old: "",
        pwd_new: "",
        pwd_2: "",
      },
      changeId: "",
      check: "",
      //活动列表
      activityList: [],
      //添加
      dialogVisibleAdd: false,
      goodsList: [],
      addForm: {
        loginName: "",
        password: "",
        pwd_2: "",
      },
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
  },
  components: {},
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getYonghuzhanghu();
    },
    //查询 用户商品
    async getYonghuzhanghu() {
      const postData = { page: this.page };
      let res = await this.$zcy.index(postData);
      if (Number(res.status) > 0) {
        console.log(res.data);
        this.tableData = res.data;
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
      this.getYonghuzhanghu();
    },
    handleOpenChange(id) {
      this.changeform.admin_id = id;
      this.dialogVisibleChange = true;
    },
    async handleChange() {
      let res = await this.$zcy.updateAdmin({ ...this.changeform });
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.dialogVisibleChange = false;
    },
    async handleAdd() {
      let res = await this.$zcy.addAdmin({ ...this.addForm });
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.dialogVisibleAdd = false;
    },
    async handleDelete(admin_id) {
      let res = await this.$zcy.delMember({ admin_id });
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.handleRefresh();
    },
    onClose() {
      this.addForm.loginName = "";
      this.addForm.password = "";
      this.addForm.pwd_2 = "";
      this.handleRefresh();
    },
    onCloseChange() {
      this.changeform.admin_id = "";
      this.changeform.pwd_old = "";
      this.changeform.pwd_new = "";
      this.changeform.pwd_2 = "";
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
/* .addform ::v-deep .el-input .el-input--small {
  width: 50% !important;
}
.addform ::v-deep .el-select .el-select--small {
  width: 100%;
} */
.equal {
  width: 500px;
}
</style>
