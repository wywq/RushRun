<template>
  <div class="banklist">
    <!-- 搜索的表单 -->
    <el-form :inline="true" :model="searchform" class="searchform">
      <el-form-item label="银行名称:">
        <el-input
          v-model="searchform.bankname"
          placeholder="银行名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearchClick">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addMerberClick()">添加银行</el-button>
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
        label="银行ID"
        prop="id"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="银行名称"
        prop="name"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="图片"
        prop="logo"
        width="500px"
        :resizable="false"
        align="center"
      >
        <template slot-scope="scope">
          <img class="scope-img" :src="scope.row.logo" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        :resizable="false"
        align="center"
        width="350px"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="delClick(scope.row)"
            size="small"
            style="margin-left:10px;"
            >删除</el-button
          >
          <el-button type="primary" size="small" @click="modifyClick(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加会员弹窗 -->
    <div class="mark" v-show="show">
      <div class="mark-content">
        <div class="hytj">银行添加</div>
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
              <td class="td1">银行名称:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.bankname"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">银行logo:</td>
              <td class="td2 imgdw">
                <div class="sctp">
                  <input
                    id="load"
                    class="upload"
                    type="file"
                    @change="pushImg($event)"
                    accept="image/*"
                    value="上传头像"
                    enctype="multipart/form-data"
                    ref="upload"
                    multiple="true"
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
import axios from "axios";
import Exif from "exif-js";
export default {
  data() {
    return {
      tabletwoData: [],
      shujuData: "",
      searchform: {
        bankname: ""
      },
      img_url: this.img_url,
      show: false,
      submitform: {
        id: "",
        bankname: ""
      },
      imageUrl: "",
      img: "",
      type: 1,
      id: ""
    };
  },
  async created() {
    this.bank_list(1);
  },
  methods: {
    async bank_list(page) {
      const banklist = await service.banklist({
        name: this.searchform.bankname,
        page: page
      });
      if (banklist.data.status == 1) {
        this.shujuData = banklist.data.data;
        this.tabletwoData = banklist.data.data.list;
        this.$message.success(banklist.data.info);
      } else {
        this.$message.error(banklist.data.info);
      }
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
    //搜索
    onSearchClick() {
      this.bank_list(1);
    },
    //添加银行
    addMerberClick() {
      this.show = true;
      this.type = 1;
      this.submitform.bankname = "";
      this.imges = "";
      this.imageUrl = "";
      this.img = "";
    },
    //删除
    delClick(row) {
      this.$confirm("是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const delBank = await service.delBank({
            token: util.getCookie("token"),
            id: row.id
          });
          if (delBank.data.status == 1) {
            this.$message.success("删除成功");
          }
          this.bank_list(1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑
    modifyClick(row) {
      this.show = true;
      this.submitform.bankname = row.name;
      this.imageUrl = row.logo;
      this.img = row.logo;
      this.imges = row.logo;
      this.id = row.id;
      this.type = 2;
      this.bank_list(1);
    },
    //提交
    async onSubmitClick(row) {
      if (this.type == 1) {
        const addBank = await service.addBank({
          name: this.submitform.bankname,
          logo: this.imges,
          id: ""
        });
        console.log(this.imageUrl);
        if (addBank.data.status == 1) {
          this.show = false;
          this.submitform.bankname = "";
          this.imges = "";
          this.imageUrl = "";
          this.$message.success(addBank.data.info);
          this.bank_list(1);
        } else {
          this.$message.error(addBank.data.info);
        }
      } else if (this.type == 2) {
        const addBank = await service.addBank({
          name: this.submitform.bankname,
          logo: this.imges,
          id: this.id
        });
        console.log(this.imageUrl);
        if (addBank.data.status == 1) {
          this.show = false;
          this.$message.success(addBank.data.info);
          this.bank_list(1);
        } else {
          this.$message.error(addBank.data.info);
        }
      }
    },
    //返回
    clone() {
      this.show = false;
    },
    // 分页
    handleCurrentChange(val) {
      this.bank_list(val);
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
</style>
