<template>
  <div>
    <el-form :inline="true" :model="searchform" class="searchform">
      <el-form-item label="搜索指向:">
        <el-select
          v-model="searchform.sou"
          placeholder="请选择"
          style="width:150px"
        >
          <el-option key="" label="全部" :value="qb"></el-option>
          <el-option
            v-for="item in zhfl"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearchClick">搜索</el-button>
      </el-form-item>
    </el-form>
    <!--会员管理用户信息 -->
    <el-table
      :data="tabletwoData"
      :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
      border
      style="margin-top:10px"
    >
      <el-table-column
        label="账号"
        prop="mobile"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="姓名"
        prop="xingming"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="手机号码"
        prop="phone"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="身份证"
        prop="shenfenzheng"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="问题类型"
        prop="fankui_type"
        :resizable="false"
        align="center"
        width="160px"
      >
      </el-table-column>
      <!-- <el-table-column label="订单ID" prop="order_id" :resizable="false" align="center" width="160px">
				<template slot-scope="scope">
					<div v-if="scope.row.order_id == 0">-</div>
					<div v-else>{{scope.row.order_id}}</div>
				</template>
			</el-table-column> -->
      <el-table-column
        label="反馈内容"
        prop="content"
        :resizable="false"
        align="center"
        width="400px;"
      >
      </el-table-column>
      <el-table-column
        label="是否回复反馈"
        prop="is_huifu"
        :resizable="false"
        align="center"
      >
        <template slot-scope="scope" prop="is_huifu">
          <div v-if="scope.row.is_huifu == 0">否</div>
          <div v-if="scope.row.is_huifu == 1">是</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        :resizable="false"
        align="center"
        width="400px"
      >
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="small" @click="lookClick(scope.row)"
            >查看凭证</el-button
          > -->
          <el-button type="primary" size="small" @click="replyClick(scope.row)"
            >回复反馈</el-button
          >
          <el-button type="primary" size="small" @click="delClick(scope.row)"
            >删除反馈</el-button
          >
          <!-- <el-button
            type="primary"
            size="small"
            @click="chakanClick(scope.row)"
            v-if="scope.row.order_id != 0"
            >查看订单</el-button
          > -->
        </template>
      </el-table-column>
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
    <!-- 图片放大 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="50%" :src="imgimg" />
    </el-dialog>
    <!-- 回复反馈 -->
    <div class="mark" v-show="show">
      <div class="mark-content">
        <div class="hytj">回复反馈</div>
        <!-- 提交的表单 -->
        <el-form class="submitform" :model="submitform">
          <table
            style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9"
            rules="all"
          >
            <tr style="background: #EEEEEE">
              <td style="text-align: center;">名称</td>
              <td style="text-align: center;">内容</td>
            </tr>
            <tr>
              <td class="td1">回复反馈:</td>
              <td class="td2" v-if="huifu == 0">
                <el-input
                  type="input"
                  v-model="submitform.content"
                  size="small"
                  clearable
                ></el-input>
              </td>
              <td class="td2" v-if="huifu == 1">
                <el-input
                  type="input"
                  v-model="submitform.content"
                  size="small"
                  clearable
                  :disabled="true"
                ></el-input>
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
    <!-- 查看订单 -->
    <div class="mark" v-show="dingd">
      <div class="mark-content">
        <div class="hytj">查看订单</div>
        <el-table
          :data="tableoneData"
          :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
          border
          style="margin-top:10px"
        >
          <el-table-column
            label="出售用户"
            prop="give_user_name"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="购买用户"
            prop="get_user_name"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="匹配时间"
            prop="matching_time"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="确认付款时间"
            prop="confirm_give_time"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status"
            :resizable="false"
            align="center"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.status == 1">等待付款</div>
              <div v-if="scope.row.status == 2">确认付款</div>
              <div v-if="scope.row.status == 3">确认收款</div>
              <div v-if="scope.row.status == 4">撤销</div>
            </template>
          </el-table-column>
          <el-table-column
            label="是否确认打款"
            prop="whether_give"
            :resizable="false"
            align="center"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.whether_give == 0">未确认</div>
              <div v-if="scope.row.whether_give == 1">已确认</div>
            </template>
          </el-table-column>
          <el-table-column
            label="是否确认收款"
            prop="whether_get"
            :resizable="false"
            align="center"
          >
            <template slot-scope="scope">
              <div v-if="scope.row.whether_get == 0">未确认</div>
              <div v-if="scope.row.whether_get == 1">已确认</div>
            </template>
          </el-table-column>
          <el-table-column
            label="确认收款时间"
            prop="confirm_get_time"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="完成时间"
            prop="complete"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="单价"
            prop="price"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="出售数量"
            prop="num"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="订单号"
            prop="order_number"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="交易的手续费"
            prop="shouxufei"
            :resizable="false"
            align="center"
          >
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="clone"
          size="small"
          style="margin:20px 0 0 48%"
          >返回</el-button
        >
      </div>
    </div>
    <!-- 凭证 -->
    <div class="mark" v-show="tu">
      <div class="mark-content ">
        <el-button
          type="primary"
          @click="cloneClick"
          size="small"
          style="margin:20px 0 20px 90%;"
          >返回</el-button
        >
        <div class="tan_box">
          <div
            class="tan "
            v-for="(item, index) in fits"
            :key="index"
            style="margin:10px 10px;"
            @click="lookpic(item, index)"
          >
            <!-- <el-image style="width: 100px; height: 100px" :src="img_url + item.pic" ></el-image> -->
            <img :src="item.pic" alt="" style="width:100%;height:100%;" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from "@/utils/utils.js";
import service from "@/service/service.js";
import axios from "axios";
export default {
  name: "memberList",
  data() {
    return {
      img_url: this.img_url,
      tu: false,
      tabletwoData: [],
      // loading: true,
      shujuData: "",
      dialogImageUrl: "",
      dialogVisible: false,
      fits: [],
      zhfl: [],
      searchform: {
        sou: ""
      },
      qb: "",
      imgimg: "",
      show: false,
      submitform: {
        content: ""
      },
      huifu: "",
      dingd: false,
      tableoneData: [],
      confirm_get_time: "",
      complete: ""
    };
  },
  async created() {
    this.getUserComplaints(1);
    const fankuiType = await service.fankuiType();
    if (fankuiType.data.status == 1) {
      this.zhfl = fankuiType.data.data;
    }
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
    async getUserComplaints(page) {
      const getUserComplaints = await service.getUserComplaints({
        page: page,
        type: this.searchform.sou
      });
      if (getUserComplaints.data.status == 1) {
        this.shujuData = getUserComplaints.data.data;
        const getUserComplaint = getUserComplaints.data.data.list.map(
          (item, index) => {
            item.add_time = this.getDate(item.add_time * 1000);
            // if (item.end_time == null) {
            // 	item.end_time = '申述未完成'
            // } else {
            // 	item.end_time = this.getDate(item.end_time * 1000)
            // }
            return item;
          }
        );
        console.log(888, this.shujuData);
        this.tabletwoData = getUserComplaint;
        this.$message.success(getUserComplaints.data.info);
      } else {
        this.shujuData = getUserComplaints.data.data;
        this.$message.error(getUserComplaints.data.info);
        this.tabletwoData = getUserComplaints.data.data;
      }
    },
    // 回复反馈
    replyClick(row) {
      this.show = true;
      this.id = row.id;
      this.submitform.content = row.huifu;
      this.huifu = row.is_huifu;
      console.log(this.huifu);
    },
    // 删除反馈
    async delClick(row) {
      const delFankui = await service.delFankui({
        id: row.id
      });
      if (delFankui.data.status == 1) {
        this.$message.success(delFankui.data.info);
        this.getUserComplaints(1);
      } else {
        this.$message.error(delFankui.data.info);
      }
    },
    // 提交
    async onSubmitClick(row) {
      const huifuFankui = await service.huifuFankui({
        id: this.id,
        huifu: this.submitform.content
      });
      if (huifuFankui.data.status == 1) {
        this.$message.success(huifuFankui.data.info);
        this.show = false;
        this.getUserComplaints(1);
      } else {
        this.$message.error(huifuFankui.data.info);
      }
    },
    clone() {
      this.show = false;
      this.dingd = false;
    },
    // 关闭弹窗
    cloneClick() {
      this.fits = "";
      this.tu = false;
    },
    // 分页
    handleCurrentChange(val) {
      this.getUserComplaints(val);
    },
    // 查看凭证
    async lookClick(row) {
      this.tu = true;
      const vouchers = await service.vouchers({
        id: row.id
      });
      if (vouchers.data.status == 1) {
        this.fits = vouchers.data.data;
      }
      this.getUserComplaints(1);
    },
    // 图片放大
    lookpic(item1, index1) {
      const cc = this.fits.map(item => {
        if (item1.id == item.id) {
          this.imgimg = item.pic;
        }
        return item;
      });
      this.dialogImageUrl = this.fits.pic;
      console.log(258, this.fits.pic);
      this.dialogVisible = true;
    },
    // 清除凭证
    clearImgInfoClick(row) {
      this.$confirm("是否清除凭证?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const clearImgInfo = await service.clearImgInfo({
            id: row.id
          });
          if (clearImgInfo.data.status == 1) {
            this.$message.success("清除凭证成功");
            this.getUserComplaints(1);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消清除凭证"
          });
        });
    },
    // 查看订单
    async chakanClick(row) {
      this.dingd = true;
      const chakanOrder = await service.chakanOrder({
        order_id: row.order_id
      });
      if (chakanOrder.data.status == 1) {
        const tableoneData = chakanOrder.data.data.map((item, index) => {
          item.confirm_get_time = this.getDate(item.confirm_get_time * 1000);
          item.complete = this.getDate(item.complete * 1000);
          item.matching_time = this.getDate(item.matching_time * 1000);
          item.confirm_give_time = this.getDate(item.confirm_give_time * 1000);
          return item;
        });
        this.tableoneData = tableoneData;
        console.log(789, this.tableoneData);
        this.$message.success(chakanOrder.data.info);
      } else {
        this.tableoneData = chakanOrder.data.data;
        this.$message.error(chakanOrder.data.info);
      }
    },
    // 搜索
    onSearchClick() {
      this.getUserComplaints(1);
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

/* 遮罩 */
.mark {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  padding-left: -20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mark-content {
  width: 70%;
  height: 80%;
  background: #f0f2f5;
  overflow: auto;
}
.tan {
  width: 200px;
  height: 200px;
  background: #000000;
}
.tan_box {
  width: 90%;
  height: 200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
