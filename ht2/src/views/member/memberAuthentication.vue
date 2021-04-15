<template>
  <div>
    <!-- 搜索的表单 -->
    <el-form :inline="true" :model="searchform" class="searchform">
      <el-form-item label="用户手机号:">
        <el-input
          v-model="searchform.accountnumber"
          placeholder="用户账号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearchClick">搜索</el-button>
      </el-form-item>
    </el-form>

    <!--表格 -->
    <el-table
      :data="tabletwoData"
      :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
      border
      style="margin-top:10px"
    >
      <el-table-column
        label="用户账号"
        prop="mobile"
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
        label="身份证号"
        prop="idcard"
        :resizable="false"
        align="center"
      >
      </el-table-column>

      <!-- <el-table-column label="状态" prop="is_renzhen" :resizable="false" align="center">
				<template slot-scope="scope">
					<div v-if="scope.row.is_renzhen == 0">未认证</div>
					<div v-if="scope.row.is_renzhen == 1">已认证</div>
				</template>
			</el-table-column> -->

      <el-table-column
        label="添加时间"
        prop="add_time"
        :resizable="false"
        align="center"
        width="180px"
      >
      </el-table-column>
      <!-- <el-table-column label="操作时间" prop="auth_time" :resizable="false" align="center" width="180px">
			</el-table-column>
			<el-table-column label="操作" class="elcolumn" align="center" fixed="right" width="250px">
				<template slot-scope="scope">
					<el-button type="primary" @click="yesshenheClick(scope.row)" size="small" style="margin-left:10px;">审核通过</el-button>
					<el-button type="primary" size="small" @click="nosshenheClick(scope.row,scope.$index)">审核驳回</el-button>
				</template>
			</el-table-column> -->
    </el-table>
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
      // 搜索表单
      searchform: {
        accountnumber: ""
      },

      tabletwoData: [],
      shujuData: ""
    };
  },

  async created() {
    this.getUserAuthList(1);
  },
  methods: {
    // 转换成时间对象
    getDate(tm) {
      let date = new Date(tm);
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let time = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let fen =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let miao =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      let tt =
        year + "-" + month + "-" + time + " " + hours + ":" + fen + ":" + miao;
      return tt;
    },
    async getUserAuthList(page) {
      const getUserAuthList = await service.getUserAuthList({
        page: page,
        mobile: this.searchform.accountnumber
      });
      if (getUserAuthList.data.status == 1) {
        console.log(getUserAuthList.data.data);
        this.shujuData = getUserAuthList.data.data;

        const getUserAuthList1 = getUserAuthList.data.data.list.map(item => {
          item.add_time = this.getDate(item.reg_time * 1000);
          if (item.auth_time == 0) {
            item.auth_time = "未认证";
          } else {
            item.auth_time = this.getDate(item.reg_time * 1000);
          }
          return item;
        });
        this.tabletwoData = getUserAuthList1;
      } else {
        this.$message.error(getUserAuthList.data.info);
      }
    },

    // 查找
    onSearchClick() {
      this.getUserAuthList(1);
      console.log(this.searchform);
    },
    async setAuthStatus(status, id) {
      const setAuthStatus = await service.setAuthStatus({
        status,
        id
      });
      if (setAuthStatus.data.status == 1) {
        this.$message.success(setAuthStatus.data.info);
        this.getUserAuthList(1);
      } else {
        this.$message.error(setAuthStatus.data.info);
      }
    },

    // 审核通过
    yesshenheClick(row) {
      this.setAuthStatus(1, row.id);
      // console.log('删除')
    },
    // 审核驳回
    nosshenheClick(row) {
      this.setAuthStatus(2, row.id);
    },
    // 分页
    handleCurrentChange(val) {
      this.getUserAuthList(val);
    }
  }
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
