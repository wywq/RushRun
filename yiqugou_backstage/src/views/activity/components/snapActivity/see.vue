<template>
  <div>
    <el-dialog
      title="必不中用户"
      :visible.sync="visible"
      width="100%"
      @open="onOpen"
      @close="onClose"
    >
      <el-card class="search">
        <el-form inline ref="form" :model="form">
          <el-form-item label="账号">
            <el-input
              v-model="form.loginName"
              placeholder="请输入账号"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="handleAdd"
              >添加</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
      <el-table :data="dogList" border style="width: 100%">
        <el-table-column prop="member_id" label="用户id"></el-table-column>
        <el-table-column prop="nick" label="用户昵称"></el-table-column>
        <el-table-column prop="phone" label="用户账号"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleDelete(scope.row.member_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :page-size="page_num"
          :current-page="page"
          :total="total"
          style="margin-top:10px;"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    actId: [Number, String],
  },
  data() {
    return {
      form: {
        loginName: "",
      },
      page: 1,
      page_num: 5,
      total: 0,
      dogList: [],
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getDog();
    },
    //获取比不中名单
    async getDog() {
      const res = await this.$zcy.getFail({
        act_id: this.actId,
        page: this.page,
        page_num: this.page_num,
      });
      if (Number(res.status) > 0) {
        console.log(res.data);
        this.dogList = res.data;
        this.total = res.all_num;
      } else {
        this.$message.error(res.info);
      }
    },
    //添加必不中名单
    async handleAdd() {
      const res = await this.$zcy.addFail({
        act_id: this.actId,
        loginName: this.form.loginName,
      });
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.getDog();
    },
    async handleDelete(member_id) {
      const res = await this.$zcy.delFail({
        act_id: this.actId,
        member_id,
      });
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.getDog();
    },
    onOpen() {
      this.getDog();
    },
    onClose() {
      console.log(111);
      this.$emit("update:visible", false);
      this.$emit("update:actId", "");
    },
  },
};
</script>

<style scoped>
.search {
  margin-bottom: 20px;
}
</style>
