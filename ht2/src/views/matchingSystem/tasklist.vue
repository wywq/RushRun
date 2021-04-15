<template>
  <div class="tasklist">
    <!-- 搜索的表单 -->
    <el-form :inline="true" :model="searchform" class="searchform">
      <el-form-item label="明细查找:">
        <el-select
          v-model="searchform.value"
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
      <el-form-item label="发布人姓名:">
        <el-input v-model="searchform.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="单次赏金:">
        <el-input v-model="searchform.money" placeholder="赏金"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearchClick">搜索</el-button>
        <el-button type="primary" @click="fabuClick">发布任务</el-button>
      </el-form-item>
    </el-form>

    <!-- 添加会员弹窗 -->
    <div class="mark" v-if="is_show == 1">
      <div class="mark-content">
        <div class="hytj">发布任务</div>
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
              <td class="td1" style="text-align: center;">任务标题:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.title"
                  size="small"
                  clearable
                  style="text-align:center;"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1" style="text-align: center;">任务步骤:</td>
              <td class="td2">
                <el-input
                  type="textarea"
                  v-model="submitform.content"
                  size="small"
                  clearable
                  style="text-align:center;"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1" style="text-align: center;">任务次数:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.num"
                  size="small"
                  clearable
                  style="text-align:center;"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1" style="text-align: center;">单次赏金:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.reward"
                  size="small"
                  clearable
                  style="text-align:center;"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1" style="text-align: center;">任务类型:</td>
              <td class="td2">
                <el-select
                  v-model="searchform.value"
                  placeholder="请选择"
                  style="width:150px"
                >
                  <el-option
                    v-for="item in zhfl"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr>
              <td class="td1" style="text-align: center;">任务链接:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.renwu_url"
                  size="small"
                  clearable
                  style="text-align:center;"
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1" style="text-align: center;">是否置顶:</td>
              <td class="td2">
                <el-radio v-model="submitform.is_zhiding" :label="1"
                  >是</el-radio
                >
                <el-radio v-model="submitform.is_zhiding" :label="0"
                  >不是</el-radio
                >
              </td>
            </tr>
            <tr>
              <td class="td1" style="text-align: center;">添加图片</td>
              <td class="td2 imgdw">
                <div class="images" v-for="(item, index) in files">
                  <img :src="img_url + item" alt="" />
                  <div class="del-icon" @click.stop="deleteImg(index)">
                    <img src="static/img/qingchu_icon@2x.png" />
                  </div>
                </div>
                <div class="sctp" v-if="files.length < 9">
                  <input
                    id="load"
                    class="upload"
                    type="file"
                    @change="pushImg($event)"
                    multiple="multiple"
                    accept="image/*"
                    value="上传头像"
                  />
                  <i class="el-icon-plus avatar-uploader-icon"></i>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td class="td2">
                <el-button type="primary" @click="SubmitClick" size="small"
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
    <el-table
      :data="tabletwoData"
      :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
      border
      style="margin-top:10px"
    >
      <el-table-column
        label="任务列表ID"
        prop="id"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="标题"
        prop="title"
        :resizable="false"
        align="center"
        width="160px"
      >
      </el-table-column>
      <el-table-column
        label="任务步骤"
        prop="content"
        :resizable="false"
        align="center"
        width="210px"
      >
      </el-table-column>
      <el-table-column
        label="任务次数"
        prop="num"
        :resizable="false"
        align="center"
        width="210px"
      >
      </el-table-column>
      <el-table-column
        label="单次赏金"
        prop="reward"
        :resizable="false"
        align="center"
        width="210px"
      >
      </el-table-column>
      <!-- <el-table-column label="任务类型" prop="tasktype" :resizable="false" align="center" width="210px">
			</el-table-column> -->
      <el-table-column
        label="任务链接"
        prop="renwu_url"
        :resizable="false"
        align="center"
        width="210px"
      >
      </el-table-column>
      <el-table-column
        label="发布时间"
        prop="add_time"
        :resizable="false"
        align="center"
        width="210px"
      >
      </el-table-column>
      <el-table-column
        label="是否置顶"
        prop="is_zhiding"
        :resizable="false"
        align="center"
        width="160px"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.is_zhiding == 0">不是</div>
          <div v-if="scope.row.is_zhiding == 1">是</div>
        </template>
      </el-table-column>
      <el-table-column
        label="任务状态"
        prop="status"
        :resizable="false"
        align="center"
        width="160px"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1">进行中</div>
          <div v-if="scope.row.status == 2">已结束</div>
          <div v-if="scope.row.status == 3">已取消</div>
          <div v-if="scope.row.status == 5">刚发布</div>
          <div v-if="scope.row.status == 6">失败</div>
        </template>
      </el-table-column>
      <el-table-column
        label="接单人数"
        prop="jiedan_num"
        :resizable="false"
        align="center"
        width="180px"
      >
      </el-table-column>
      <el-table-column
        label="用户名称"
        prop="user_name"
        :resizable="false"
        align="center"
        width="180px"
      >
      </el-table-column>
      <el-table-column
        label="任务类型名称"
        prop="type_name"
        :resizable="false"
        align="center"
        width="180px"
      >
      </el-table-column>
      <el-table-column
        label="用户账号"
        prop="user_mobile"
        :resizable="false"
        align="center"
        width="180px"
      >
      </el-table-column>
      <el-table-column
        label="审核状态"
        prop="is_shenhe"
        :resizable="false"
        align="center"
        width="160px"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.is_shenhe == 0">未审核</div>
          <div v-if="scope.row.is_shenhe == 1">审核通过</div>
          <div v-if="scope.row.is_shenhe == 2">审核失败</div>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        :resizable="false"
        align="center"
        width="550px"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="quxiaoClick(scope.row)"
            >取消任务</el-button
          >
          <el-button type="primary" size="small" @click="yesClick(scope.row)"
            >同意任务发布</el-button
          >
          <el-button type="primary" size="small" @click="noClick(scope.row)"
            >不同意任务发布</el-button
          >
          <el-button type="primary" size="small" @click="lookClick(scope.row)"
            >任务发布上传的图片</el-button
          >
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
          >
            <!-- <el-image style="width: 100px; height: 100px" :src="img_url + item.pic" ></el-image> -->
            <img
              :src="img_url + item.pic"
              alt=""
              style="width:100%;height:100%;"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import util from "@/utils/utils.js";
import service from "@/service/service.js";
export default {
  data() {
    return {
      searchform: {
        value: "",
        name: "",
        money: ""
      },
      submitform: {
        title: "",
        content: "",
        num: "",
        reward: "",
        renwu_url: "",
        is_zhiding: ""
      },
      zhfl: [],
      qb: "",
      tabletwoData: [],

      shujuData: "",
      // loading:true,
      tu: false,
      img_url: this.img_url,
      fits: [],
      is_show: 0,
      imageUrl: "",
      imges: "",
      pic: "",
      files: []
    };
  },
  async created() {
    this.renwu(1);
    const renwuType = await service.renwuType();
    if (renwuType.data.status == 1) {
      this.zhfl = renwuType.data.data;
    }
  },
  methods: {
    // 删除图片
    deleteImg(img_index) {
      this.files.splice(img_index, 1);
      console.log(this.files);
    },
    // 上传图片
    async pushImg(e) {
      let formData = new FormData();
      console.log(formData);
      console.log();
      // let files = []

      for (let item of e.target.files) {
        console.log(item);
        formData.append("pic", item);
        console.log(11, this.headers);
        formData.append("token", util.getCookie("token"));
        console.log(777, formData.get("pic"));
        if (this.files.length < 9) {
          await axios
            .post("http://118.190.174.163//admin/bank/uploadPic", formData, {
              //	await axios.post("http://gtyz.qianyiwangluo.com/admin/Goods/uploadPic",formData, {
              transformRequest: [data => data],
              headers: this.headers
            })
            .then(res => {
              this.img = res.data.data;
              (this.imageUrl = this.img_url + this.img),
                (this.imges = this.img);
              console.log(123, res.data.data);
              Vue.set(this, "files", this.files.concat(this.img));
            })
            .catch(error => {
              console.log(error);
            });
        }
      }
    },
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
    async renwu(page) {
      const renwu = await service.renwu({
        page: page,
        type: this.searchform.value,
        user_name: this.searchform.name,
        money: this.searchform.money
      });
      if (renwu.data.status == 1) {
        this.shujuData = renwu.data.data;
        const tabletwoData = renwu.data.data.list.map(item => {
          item.add_time = this.getDate(item.add_time * 1000);
          return item;
        });
        this.tabletwoData = tabletwoData;
        // this.loading=false
      }
    },
    //任务发布
    fabuClick() {
      this.is_show = 1;
    },
    //取消任务
    async quxiaoClick(row) {
      const quxiao = await service.quxiao({
        id: row.id
      });
      if (quxiao.data.status == 1) {
        this.$message.success("取消任务成功");
        this.renwu(1);
      } else {
        this.$message.success(quxiao.data.info);
      }
    },
    //提交
    async SubmitClick() {
      // console.log(this.files.join(","))
      // return
      const release = await service.release({
        title: this.submitform.title,
        content: this.submitform.content,
        num: this.submitform.num,
        reward: this.submitform.reward,
        tasktype: this.searchform.value,
        renwu_url: this.submitform.renwu_url,
        is_zhiding: this.submitform.is_zhiding,
        pic: this.files.join(",")
      });
      if (release.data.status == 1) {
        this.$message.success(release.data.info);
        this.is_show = 0;
        this.files = "";
        this.submitform.is_zhiding = "";
        this.submitform.renwu_url = "";
        this.searchform.value = "";
        this.submitform.reward = "";
        this.submitform.num = "";
        this.submitform.content = "";
        this.submitform.title = "";
        this.renwu(1);
      } else {
        this.$message.error(release.data.info);
      }
    },
    //返回
    clone() {
      this.is_show = 0;
      this.files = "";
      this.submitform.is_zhiding = "";
      this.submitform.renwu_url = "";
      this.searchform.value = "";
      this.submitform.reward = "";
      this.submitform.num = "";
      this.submitform.content = "";
      this.submitform.title = "";
    },
    //同意任务发布
    async yesClick(row) {
      const agree = await service.agree({
        id: row.id
      });
      if (agree.data.status == 1) {
        this.$message.success(agree.data.info);
        this.renwu(1);
      } else {
        this.$message.error(agree.data.info);
      }
    },
    //不同意任务发布
    async noClick(row) {
      const disagree = await service.disagree({
        id: row.id
      });
      if (disagree.data.status == 1) {
        this.$message.success(disagree.data.info);
        this.renwu(1);
      } else {
        this.$message.error(disagree.data.info);
      }
    },
    //搜索
    onSearchClick() {
      this.renwu(1);
    },
    async lookClick(row) {
      this.tu = true;
      const renwuPic = await service.renwuPic({
        id: row.id
      });
      if (renwuPic.data.status == 1) {
        // this.dialogImageUrl = this.img_url + row.buy_img;
        // this.dialogVisible = true;
        this.fits = renwuPic.data.data;
      }
      this.renwu(1);
    },
    //返回
    cloneClick() {
      this.tu = false;
      this.fit = "";
    },
    // 分页
    handleCurrentChange(val) {
      this.renwu(val);
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
/* 遮罩 */

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
  width: 30%;
  text-align: center;
}

.td2 {
  padding-left: 10px;
  width: 70%;
}

.imgdw {
  position: relative;
  min-height: 150px;
  width: calc(100% - 10px);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
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
  /* position: absolute;
		top: 0; */
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
/*  */
.images {
  width: 80px;
  height: 80px;
  position: relative;
}
.del-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
}
.images img {
  width: 100%;
  height: auto;
}
</style>
