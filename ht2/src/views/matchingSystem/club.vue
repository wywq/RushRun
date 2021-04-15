<template>
  <div class="club">
    <el-form :inline="true" :model="searchform" class="searchform">
      <el-form-item label="俱乐部名称:">
        <el-input v-model="searchform.name" placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearchClick">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tabletwoData"
      :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
      border
      style="margin-top:10px"
    >
      <el-table-column
        label="俱乐部ID"
        prop="id"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="俱乐部名称"
        prop="name"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="头像"
        prop="pic"
        width="200px"
        :resizable="false"
        align="center"
      >
        <template slot-scope="scope">
          <img class="scope-img" :src="scope.row.pic" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        label="地区"
        prop="address"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="简介"
        prop="content"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="创建人"
        prop="chuangjianren"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="人数"
        prop="renshu"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="活跃度"
        prop="huoyuedu"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="add_time"
        :resizable="false"
        align="center"
        width="200px"
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
            @click="delClick(scope.row)"
            size="small"
            style="margin-left:10px;"
            >删除</el-button
          >
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
            >查看成员</el-button
          >
          <!-- v-if="scope.row.xg == 0" -->
        </template>
      </el-table-column>
    </el-table>
    <div class="mark" v-show="show">
      <div class="mark-content">
        <div class="hytj">修改俱乐部信息</div>
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
              <td style="text-align: center;">俱乐部名称:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.name"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">俱乐部地址:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.address"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">俱乐部简介:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.jianjie"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">俱乐部头像:</td>
              <td class="td2 imgdw">
                <div class="sctp">
                  <input
                    id="load"
                    class="upload"
                    type="file"
                    @change="pushImg($event)"
                    accept="image/*"
                    value="上传头像"
                  />
                  <i
                    class="el-icon-plus avatar-uploader-icon"
                    v-if="img == ''"
                  ></i>
                  <img :src="img" alt="" v-else />
                </div>
              </td>
            </tr>
            <tr>
              <td style="text-align: center;">俱乐部人数:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.number"
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
        <div class="hytj">成员信息</div>
        <el-table
          :data="tableoneData"
          :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
          border
          style="margin-top:10px"
        >
          <el-table-column
            label="俱乐部名称"
            prop="club_name"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="成员名称"
            prop="nickname"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="成员等级"
            prop="level_name"
            :resizable="false"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="成员账号"
            prop="mobile"
            :resizable="false"
            align="center"
          >
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
      tabletwoData: [],
      shujuData: "",
      searchform: {
        name: ""
      },
      tableoneData: "",
      show: false,
      submitform: {
        name: "",
        address: "",
        jianjie: "",
        number: "",
        huoyue: ""
      },
      imageUrl: "",
      img: "",
      id: "",
      img_url: this.img_url,
      imageUrl: "",
      img: ""
    };
  },
  async created() {
    this.club(1);
  },
  methods: {
    //转换成时间对象
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
    async club(page) {
      const club = await service.club({
        name: this.searchform.name,
        page: page
      });
      if (club.data.status == 1) {
        this.shujuData = club.data.data;
        const tabletwoData = club.data.data.list.map((item, index) => {
          item.add_time = this.getDate(item.add_time * 1000);
          return item;
        });
        console.log(789, this.id);
        this.tabletwoData = tabletwoData;
      } else {
        this.shujuData = club.data.data;
      }
    },
    //搜索
    onSearchClick() {
      this.club(1);
    },
    //删除
    delClick(row) {
      this.$confirm("是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const deClub = await service.deClub({
            token: util.getCookie("token"),
            id: row.id
          });
          if (deClub.data.status == 1) {
            this.$message.success("删除成功");
          }
          this.club(1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 上传图片
    async pushImg(e) {
      let formData = new FormData();
      console.log(formData);
      formData.append("pic", e.target.files[0]);
      console.log(11, this.headers);
      formData.append("token", util.getCookie("token"));
      console.log(formData.get("pic"));
      await axios
        .post("http://118.190.174.163//admin/bank/uploadPic", formData, {
          //	await axios.post("http://gtyz.qianyiwangluo.com/admin/Goods/uploadPic",formData, {
          transformRequest: [data => data],
          headers: this.headers
        })
        .then(res => {
          this.img = res.data.data;
          (this.imageUrl = this.img_url + this.img), (this.imges = this.img);
          console.log(123, res.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //编辑
    modifyClick(row) {
      this.show = true;
      this.submitform.name = row.name;
      this.img = row.pic;
      (this.submitform.address = row.address),
        (this.submitform.jianjie = row.content),
        (this.submitform.number = row.renshu),
        (this.submitform.huoyue = row.huoyuedu);
      this.id = row.id;
      this.club(1);
    },
    //查看信息
    async lookClick(row) {
      this.is_show = true;
      const clubMmeberList = await service.clubMmeberList({
        club_id: row.id
      });
      if (clubMmeberList.data.status == 1) {
        this.tableoneData = clubMmeberList.data.data;
        console.log(clubMmeberList.data.data);
      }
    },
    //提交
    async onSubmitClick(row) {
      const updateClub = await service.updateClub({
        name: this.submitform.name,
        address: this.submitform.address,
        content: this.submitform.jianjie,
        pic: this.imges,
        renshu: this.submitform.number,
        huoyuedu: this.submitform.huoyue,
        id: this.id
      });
      if (updateClub.data.status == 1) {
        this.show = false;
        this.$message.success(updateClub.data.info);
        this.club(1);
      } else {
        this.$message.error(updateClub.data.info);
      }
    },
    //返回
    clone() {
      this.show = false;
    },
    fanhui() {
      this.is_show = false;
    },
    // 分页
    handleCurrentChange(val) {
      this.club(val);
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
