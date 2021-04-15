<template>
  <div class="bankAccountList">
    <!-- 搜索的表单 -->
    <el-form :inline="true" :model="searchform" class="searchform">
      <el-form-item label="银行名称:">
        <el-input
          v-model="searchform.bankname"
          placeholder="银行名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名称:">
        <el-input
          v-model="searchform.username"
          placeholder="用户真实姓名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearchClick">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table
      :data="tabletwoData"
      :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
      border
      style="margin-top:10px"
    >
      <el-table-column
        label="用户ID"
        prop="code"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="真实姓名"
        prop="realname"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="银行名称"
        prop="bank_name"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="银行卡号"
        prop="bank_card"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="微信账号"
        prop="weixin"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="支付宝账号"
        prop="zhifubao"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        :resizable="false"
        align="center"
        width="280px;"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="delClick(scope.row)"
            size="small"
            style="margin-left:10px;"
            >修改</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="mark" v-show="show">
      <div class="mark-content">
        <div class="hytj">修改支付方式</div>
        <el-form class="submitform" :model="submitform">
          <table style="width:90%;height:80px;background:#F9F9F9" rules="all">
            <tr style="background: #EEEEEE">
              <td style="text-align: center;">名称</td>
              <td style="text-align: center;">内容</td>
            </tr>
            <tr>
              <td style="text-align: center;">支付宝</td>
              <td class="td2">
                <el-input v-model="submitform.zhifubao" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">银行卡</td>
              <td class="td2">
                <el-input
                  v-model="submitform.bank_card"
                  size="small"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">微信</td>
              <td class="td2">
                <el-input v-model="submitform.weixin" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td3" style="text-align: center;">银行名称</td>
              <td class="td2">
                <el-select
                  v-model="searchform.bank_name"
                  placeholder="请选择"
                  style="width:150px"
                  @change="xuanClick"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="td2">
                <el-button type="primary" @click="onSubmitClick" size="small"
                  >提交</el-button
                >
                <el-button type="primary" @click="clone" size="small"
                  >返回</el-button
                >
              </td>
            </tr>
          </table>
        </el-form>
      </div>
    </div>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next, jumper"
        :total="shujuData.num"
        :page-size="15"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import util from "@/utils/utils.js";
import service from "@/service/service.js";
export default {
  data() {
    return {
      searchform: {
        bankname: "",
        username: "",
        bank_name: ""
      },
      tabletwoData: [],
      shujuData: "",
      show: false,
      submitform: {
        zhifubao: "",
        bank_card: "",
        weixin: ""
      },
      options: []
    };
  },
  async created() {
    this.zhifu(1);
    const bankAll = await service.bankAll();
    if (bankAll.data.status == 1) {
      this.options = bankAll.data.data;
    }
  },
  methods: {
    // 改变银行名称
    xuanClick(value) {
      console.log(value);
      this.searchform.bank_name = value;
    },
    // 提交
    async onSubmitClick(row) {
      const updatezhifu = await service.updatezhifu({
        user_id: this.user_id,
        zhifubao: this.submitform.zhifubao,
        bank_card: this.submitform.bank_card,
        weixin: this.submitform.weixin,
        bank_name: this.searchform.bank_name
      });
      if (updatezhifu.data.status == 1) {
        this.$message.success(updatezhifu.data.info);
        this.show = false;
        this.zhifu(1);
        this.submitform.zhifubao = "";
        this.submitform.bank_card = "";
        this.submitform.weixin = "";
        this.searchform.bank_name = "";
      } else {
        this.$message.error(updatezhifu.data.info);
      }
    },
    // 返回
    clone() {
      this.show = false;
    },
    // 修改
    async delClick(row) {
      this.show = true;
      this.user_id = row.user_id;
      this.submitform.zhifubao = row.zhifubao;
      this.submitform.bank_card = row.bank_card;
      this.submitform.weixin = row.weixin;
      this.searchform.bank_name = row.bank_name;
    },
    async zhifu(page) {
      const skzh = await service.skzh({
        bank_name: this.searchform.bankname,
        user_name: this.searchform.username,
        page: page
      });
      if (skzh.data.status == 1) {
        this.tabletwoData = skzh.data.data.list;
        this.shujuData = skzh.data.data;
      } else {
        this.$message.error(skzh.data.info);
      }
    },
    // 搜索
    onSearchClick() {
      this.zhifu();
    },
    // 分页
    handleCurrentChange(val) {
      this.zhifu(val);
    }
  },
  mounted() {}
};
</script>

<style scoped>
.block {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
