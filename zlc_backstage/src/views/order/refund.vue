<template>
  <div>
    <el-card>
      <el-table :data="list" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="下单时间">
                <span>{{ props.row.order.member_time }}</span>
              </el-form-item>
              <el-form-item label="支付时间">
                <span>{{ props.row.order.zftime }}</span>
              </el-form-item>
              <el-form-item label="申请时间">
                <span v-html="props.row.add_time"></span>
              </el-form-item>
              <el-form-item label="审核时间" v-if="props.row.status != 1">
                <span v-html="props.row.shenhe_time"></span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="订单号">
          <template slot-scope="scope">
            {{ scope.row.order.order_num }}
          </template>
        </el-table-column>
        <el-table-column label="退款商品" width="240px">
          <template slot-scope="scope">
            <div class="cont_ite">
              <el-tooltip
                effect="dark"
                :content="scope.row.goods_name"
                placement="top-start"
              >
                <div class="title">{{ scope.row.goods_name }}</div>
              </el-tooltip>
              <div class="lable">
                <span>¥{{ scope.row.order_details.price }}</span>
                <span> x{{ scope.row.order_details.num }}件 </span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="下单用户">
          <template slot-scope="scope">
            {{ scope.row.member.name }}
          </template>
        </el-table-column>
        <el-table-column prop="explain" label="退款说明" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="yuanyin" label="退款原因" show-overflow-tooltip>
        </el-table-column>
        <!-- <el-table-column label="支付方式">
          <template slot-scope="scope">
            {{ scope.row.order.pay_way == 1 ? "微信" : "支付宝" }}
          </template>
        </el-table-column> -->
        <el-table-column prop="money" label="退款金额"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{ scope.row.ord_status | statusFilter }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="160px">
          <template slot-scope="scope">
            <el-button @click="tui(scope.row.id, 1)" type="warning" size="mini"
              >同意</el-button
            >
            <el-button @click="tui(scope.row.id, 2)" type="danger" size="mini"
              >驳回</el-button
            >
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      id: "",
      total: 0,
      page: 1,
    };
  },
  filters: {
    statusFilter(val) {
      switch (Number(val)) {
        case 1:
          return "退款中";
        case 2:
          return "退款成功";
        case 3:
          return "退款失败";
      }
    },
  },
  created() {
    this.getlist();
  },
  methods: {
    async getlist() {
      let res = await this.$zcy.refundList({
        page: this.page,
        page_size: 10,
      });
      if (res.status == 1) {
        this.list = res.data;
        this.total = res.all_num;
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlist();
    },
    tui(detail_id, act) {
      this.$confirm("是否确认?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tuiapi(detail_id, act);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    async tuiapi(detail_id, act) {
      let res = await this.$zcy.refundExamine({
        detail_id,
        act,
      });
      if (res.status == 1) {
        this.$message.success(res.info);
        this.getlist();
      } else {
        this.$message.error(res.info);
      }
    },
  },
};
</script>

<style scoped>
.cont_ite {
  width: 200px;
  margin-left: 5px;
}

.title {
  width: 200px;
  height: 40px;
  line-height: 20px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.lable {
  font-size: 12px;
  color: #999;
  display: flex;
  justify-content: space-between;
}
</style>
