<template>
  <div>
    <!-- 条件筛选 -->
    <el-card>
      <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
        <el-form-item label="用户账号">
          <el-input
            v-model="form.email"
            placeholder="按用户账号搜索"
            @change="
              page = 1;
              getlist();
            "
            clearable
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户id">
          <el-input
            v-model="form.member_id"
            placeholder="按用户id搜索"
            @change="
              page = 1;
              getlist();
            "
            clearable
            size="small"
          ></el-input>
        </el-form-item>
        <el-form-item label="财务类型">
          <el-select v-model="form.type_id" placeholder="请选择" size="small">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="search"
            >搜索</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="refresh"
            >刷新</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格 -->
    <el-card>
      <el-table :data="list" border style="width: 100%">
        <el-table-column
          prop="finance_id"
          label="日志编号"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="member_id"
          label="用户编号"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="name" label="用户账号"></el-table-column>
        <el-table-column prop="type_name" label="财务类型"></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column prop="currency_name" label="币种"></el-table-column>
        <el-table-column prop="balance" label="余额"></el-table-column>
        <el-table-column prop="add_time" label="时间"></el-table-column>
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
        type_id: "",
      },

      //商品id
      id: "",
      page: 1,
      total: 0,
      list: [],
      shoplist: [],
      fenleilist: [],
      //财务日志类型
      typeList: [],
    };
  },
  created() {
    this.getlist();
    this.getFinType();
  },
  components: {},
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getlist();
    },

    //获取caiwuliebiao1
    async getlist() {
      let postdata = {
        page: this.page,
        email: this.form.email,
        member_id: this.form.member_id,
        type_id: this.form.type_id,
      };
      let res = await this.$zcy.financeIndex(postdata);
      if (res.status == 1) {
        this.list = res.data.list;
        this.issort = false;
        this.total = res.data.number;
      } else {
        this.list = [];
        this.issort = false;
        this.total = 0;
      }
    },

    //获取财务日志
    async getFinType() {
      let res = await this.$zcy.getFinType();
      if (res) {
        this.typeList = res.data;
        console.log(this.typeList);
      }
    },
    search() {
      this.page = 1;
      this.getlist();
    },
    refresh() {
      this.form = {
        email: "",
        member_id: "",
        type_id: "",
      };
      this.page = 1;
      this.getlist();
    },
  },
};
</script>

<style></style>
