<template>
  <div class="taskscroll">
    <el-table
      :data="tabletwoData"
      :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
      border
      style="margin-top:10px"
    >
      <el-table-column
        label="卷轴任务ID"
        prop="id"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <!-- <el-table-column
        label="卷轴等级ID"
        prop="level_id"
        :resizable="false"
        align="center"
      >
      </el-table-column> -->
      <!-- <el-table-column
        label="是否是登录即送"
        prop="is_zengsong"
        :resizable="false"
        align="center"
        width="160px"
      >
        <template slot-scope="scope">
          <div type="primary" v-if="scope.row.is_zengsong == 0">否</div>
          <div type="primary" v-if="scope.row.is_zengsong == 1">是</div>
        </template>
      </el-table-column> -->
      <el-table-column
        label="是否为合伙人赠送卷轴"
        prop="is_hehuoren_zengsong"
        :resizable="false"
        align="center"
        width="160px"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.is_hehuoren_zengsong == 0">否</div>
          <div v-if="scope.row.is_hehuoren_zengsong == 1">是</div>
        </template>
      </el-table-column>
      <el-table-column
        label="兑换卷轴所需金币"
        prop="duihuan"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="总共奖励金币"
        prop="jiangli"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="锁仓时间(天)"
        prop="suochang"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="活跃度"
        prop="huoyue"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="等级名称"
        prop="level_name"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        prop="content"
        class="elcolumn"
        align="center"
        fixed="right"
        width="300px"
      >
        <template slot-scope="scope" prop="xg">
          <el-button
            type="primary"
            @click="modifyClick(scope.row)"
            size="small"
            style="margin-left:10px;"
            >修改</el-button
          >
          <el-button
            type="primary"
            @click="lookClick(scope.row)"
            size="small"
            style="margin-left:10px;"
            >查看会员卷轴信息</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="mark" v-show="show">
      <div class="mark-content">
        <div class="hytj">修改卷轴信息</div>
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
              <td style="text-align: center;">兑换卷轴所需要的金币:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.money"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <!-- <tr>
              <td style="text-align: center;">卷轴任务等级:</td>
              <td class="td2">
                <el-select
                  v-model="submitform.region"
                  placeholder="请选择"
                  size="small"
                >
                  <el-option
                    :label="item.name"
                    :value="item.id"
                    v-for="(item, index) in dengji"
                  ></el-option>
                </el-select>
              </td>
            </tr> -->
            <tr>
              <td style="text-align: center;">是否为合伙人赠送卷轴:</td>
              <td class="td2">
                <el-radio v-model="submitform.is_hehuo" :label="0">否</el-radio>
                <el-radio v-model="submitform.is_hehuo" :label="1">是</el-radio>
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">总共奖励金币:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.jiangli"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">锁仓时间(天):</td>
              <td class="td2">
                <el-input
                  v-model="submitform.suocang"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">活跃度:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.huoyue"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <!-- <tr>
              <td style="text-align: center;">是否是登录即送:</td>
              <td class="td2">
                <el-radio v-model="submitform.resource" :label="0">否</el-radio>
                <el-radio v-model="submitform.resource" :label="1">是</el-radio>
              </td>
            </tr> -->
            <tr>
              <td></td>
              <td>
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
    <div class="mark" v-if="is_show">
      <div class="mark-content">
        <div class="hytj">会员卷轴信息</div>
        <el-table
          :data="tableoneData"
          :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
          border
          style="margin-top:10px"
        >
          <el-table-column
            label="卷轴开始时间"
            prop="add_time"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="进行天数"
            prop="suocang_num"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="状态"
            prop="status"
            :resizable="false"
            align="center"
            width="160px"
          >
            <template slot-scope="scope">
              <div type="primary" v-if="scope.row.status == 0">未进行</div>
              <div type="primary" v-if="scope.row.status == 1">进行中</div>
              <div type="primary" v-if="scope.row.status == 2">已完成</div>
            </template>
          </el-table-column>
          <el-table-column
            label="已返还金币"
            prop="yifanhuan"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="会员名称"
            prop="user_name"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="会员ID"
            prop="code"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            prop="content"
            class="elcolumn"
            align="center"
            fixed="right"
            width="300px"
          >
            <template slot-scope="scope" prop="xg">
              <el-button
                type="primary"
                @click="deleteClick(scope.row)"
                size="small"
                style="margin-left:10px;"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="fanhui" size="small" class="fanhui"
          >返回</el-button
        >
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
import axios from "axios";
export default {
  data() {
    return {
      is_show: false,
      submitform: {
        money: "",
        jiangli: "",
        suocang: "",
        huoyue: "",
        resource: "",
        region: "",
        is_hehuo: ""
      },
      tabletwoData: [],
      shujuData: "",
      show: false,
      id: "",
      label: "",
      dengji: [],
      tableoneData: [],
      juanzhou_id: "",
      user_id: ""
    };
  },
  async created() {
    this.taskList(1);
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
    async taskList(page) {
      const taskList = await service.taskList({
        page: page
      });
      if (taskList.data.status == 1) {
        this.shujuData = taskList.data.data;
        this.tabletwoData = taskList.data.data.list;
      } else {
        this.tabletwoData = [];
        this.$message.error(taskList.data.info);
      }
    },
    // 查看等级列表
    async lookClick(row) {
      console.log(row);
      this.juanzhou_id = row.id;
      this.is_show = true;
      const memberTaskList = await service.memberTaskList({
        id: row.id
      });
      if (memberTaskList.data.status == 1) {
        const tableoneData = memberTaskList.data.data.map((item, index) => {
          item.add_time = this.getDate(item.start_time * 1000);
          return item;
        });
        this.tableoneData = tableoneData;
      }
    },
    // 返回
    fanhui() {
      this.is_show = false;
    },
    // 点击修改
    async modifyClick(row) {
      this.show = true;
      this.submitform.money = row.duihuan;
      this.submitform.jiangli = row.jiangli;
      this.submitform.suocang = row.suochang;
      this.submitform.huoyue = row.huoyue;
      this.submitform.resource = Number(row.is_zengsong);
      this.submitform.is_hehuo = Number(row.is_hehuoren_zengsong);
      this.submitform.region = row.level_id;
      console.log(this.submitform.resource);
      this.id = row.id;
      const allTaskLevel = await service.allTaskLevel();
      if (allTaskLevel.data.status == 1) {
        this.dengji = allTaskLevel.data.data;
      }
    },
    // 提交
    async onSubmitClick(row) {
      const updateTask = await service.updateTask({
        id: this.id,
        level_id: this.submitform.region,
        duihuan: this.submitform.money,
        jiangli: this.submitform.jiangli,
        suochang: this.submitform.suocang,
        huoyue: this.submitform.huoyue,
        is_zengsong: this.submitform.resource,
        is_hehuoren_zengsong: this.submitform.is_hehuo
      });
      if (updateTask.data.status == 1) {
        this.$message.success("修改成功");
        this.show = false;
        this.submitform.money = "";
        this.submitform.jiangli = "";
        this.submitform.suocang = "";
        this.submitform.huoyue = "";
        this.submitform.resource = "";
        this.submitform.renwu = "";
        this.submitform.is_hehuo = "";
        this.taskList(1);
      } else {
        this.$message.error(updateTask.data.info);
      }
    },
    // 删除
    async deleteClick(row) {
      this.user_id = row.user_id;
      console.log(this.id);
      const delMembertasklist = await service.delMembertasklist({
        user_id: this.user_id,
        juanzhou_id: this.juanzhou_id
      });
      if (delMembertasklist.data.status == 1) {
        this.$message.success(delMembertasklist.data.info);
        this.is_show = false;
      } else {
        this.$message.error(delMembertasklist.data.info);
      }
    },
    // 返回
    clone() {
      this.show = false;
      this.submitform.money = "";
      this.submitform.jiangli = "";
      this.submitform.suocang = "";
      this.submitform.huoyue = "";
      this.submitform.resource = "";
      this.submitform.renwu = "";
    },
    // 分页
    handleCurrentChange(val) {
      this.taskList(val);
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
.scope-img {
  width: 60px;
  height: 60px;
}
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

.hytj {
  color: #666666;
  padding: 15px 0;
  text-align: center;
  border-bottom: 1px solid #d7d7d7;
  font-size: 28px;
}
/* 添加会员表单 */
.submitform {
  margin: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submitform .el-input {
  margin-right: 10px;
  width: 270px;
  float: left;
  display: flex;
  align-items: center;
  height: 100%;
}

tr {
  height: 50px;
  width: 100%;
  border: 1px lightgray dashed;
}

.td1 {
  text-align: right;
  padding-right: 10px;
  width: 30%;
  text-align: center;
}

.td2 {
  padding-left: 10px;
  width: 70%;
}
.imgdw {
  position: relative;
  height: 150px;
  width: 150px;
}
#load {
  width: 112px;
  height: 112px;
  position: absolute;
  top: 0;
  opacity: 0;
  z-index: 999;
}

.sctp {
  width: 150px;
  height: 150px;
  position: absolute;
  top: 0;
  z-index: 1;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sctp img {
  width: 112px;
  height: 112px;
}
.fanhui {
  margin: 20px 0 0 48%;
}
</style>
