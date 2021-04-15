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
        <el-table-column prop="act_id" label="活动id"></el-table-column>
        <el-table-column prop="begin_time" label="开始时间"></el-table-column>
        <el-table-column prop="end_time" label="结束时间"></el-table-column>
        <el-table-column prop="is_end" label="是否结束">
          <template slot-scope="scope">
            {{ scope.row.is_end | endFilter }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="status" label="活动状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusFilter }}
          </template>
        </el-table-column> -->
        <el-table-column label="操作" fixed="right" min-width="150">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button type="primary" @click="handleGoods(scope.row.act_id)"
              >查看商品</el-button
            >
            <el-button type="primary" @click="handleMatch(scope.row.act_id)"
              >一键回收</el-button
            >
            <el-button type="primary" @click="handleSee(scope.row.act_id)"
              >查看必不中用户</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      title="修改"
      :visible.sync="dialogVisible"
      width="30%"
      @close="onClose"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="活动状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="2">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-time-picker
            v-model="form.begin"
            format="HH:mm"
            value-format="HH:mm"
            size="small"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-time-picker
            v-model="form.end"
            format="HH:mm"
            value-format="HH:mm"
            size="small"
          >
          </el-time-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleCheck">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加"
      :visible.sync="dialogVisibleAdd"
      width="30%"
      @close="onClose"
    >
      <el-form ref="form" :model="form">
        <el-form-item label="活动状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">开启</el-radio>
            <el-radio :label="2">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开始时间">
          <el-time-picker
            v-model="form.begin"
            format="HH:mm"
            value-format="HH:mm"
            size="small"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-time-picker
            v-model="form.end"
            format="HH:mm"
            value-format="HH:mm"
            size="small"
          >
          </el-time-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="商品"
      :visible.sync="dialogVisibleGoods"
      width="100%"
      @close="onGoodsClose"
    >
      <el-table :data="goodsList" border style="width: 100%">
        <el-table-column prop="goods_name" label="商品名称"></el-table-column>
        <el-table-column prop="money" label="商品价格"></el-table-column>
        <el-table-column prop="add_time" label="添加时间"></el-table-column>
        <el-table-column prop="up_time" label="审核时间">
          <template slot-scope="scope">
            {{ scope.row.up_time || "--" }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="商品状态">
          <template slot-scope="scope">
            {{ scope.row.status | statusFilter }}
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
    </el-dialog>
    <see-dog :visible.sync="seeDogVisible" :actId.sync="act_id"></see-dog>
  </div>
</template>

<script>
import SeeDog from "./components/snapActivity/see";
import upload from "@/components/upload.vue";
export default {
  data() {
    return {
      form: {
        status: "",
        begin: "",
        end: "",
      },
      typeList: [],
      coinList: [],
      total: 0,
      tableData: [],
      dialogVisible: false,
      dialogVisibleAdd: false,
      dialogVisibleGoods: false,
      goodsId: "",
      page: 1,
      total: 0,
      goodsList: [],
      editId: "",
      //必不中
      seeDogVisible: false,
      act_id: "",
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
    endFilter(val) {
      switch (Number(val)) {
        case 0:
          return "未结束";
        case 1:
          return "已结束";
      }
    },
  },
  created() {
    this.getYonghuzhanghu();
  },
  components: {
    upload,
    SeeDog,
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getActGoods(this.goodsId);
    },
    //查询 活动
    async getYonghuzhanghu() {
      let res = await this.$zcy.getActivity();
      if (Number(res.status) > 0) {
        console.log(res);
        this.tableData = res.data;
      } else {
        this.$message.error(res.info);
      }
    },
    //查询 商品
    async getActGoods(act_id) {
      let res = await this.$zcy.getActGoods({ act_id });
      if (Number(res.status) > 0) {
        this.dialogVisibleGoods = true;
        console.log(res);
        this.total = res.data.number;
        this.goodsList = res.data.list;
      } else {
        this.$message.error(res.info);
      }
    },
    //修改
    async cashShenhe() {
      const postData = { ...this.form, id: this.editId ? this.editId : "" };
      let res = await this.$zcy.upActivity(postData);
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.dialogVisible = false;
      this.dialogVisibleAdd = false;
    },
    async handleMatch(act_id) {
      let res = await this.$zcy.autoMatching({ act_id });
      if (Number(res.status) > 0) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.handleSearch();
    },
    handleSearch() {
      this.page = 1;
      this.getYonghuzhanghu();
    },
    handleEdit(row) {
      this.editId = row.act_id;
      this.form.status = row.status;
      this.form.begin = row.begin_time;
      this.form.end = row.end_time;
      this.dialogVisible = true;
    },
    handleGoods(id) {
      this.goodsId = id;
      this.getActGoods(id);
    },
    handleCheck() {
      this.cashShenhe();
    },
    handleAdd() {
      this.cashShenhe();
    },
    onClose() {
      this.editId = "";
      this.form.status = "";
      this.form.begin = "";
      this.form.end = "";
      this.getYonghuzhanghu();
    },
    onGoodsClose() {
      this.goodsId = "";
      this.page = 1;
    },
    handleSee(act_id) {
      this.seeDogVisible = true;
      this.act_id = act_id;
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
