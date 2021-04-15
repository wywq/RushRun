<template>
  <div class="audioList">
    <el-form :inline="true" :model="searchform" class="searchform">
      <el-form-item>
        <el-button type="primary" @click="addMerberClick()"
          >添加音频列表</el-button
        >
      </el-form-item>
    </el-form>
    <el-table
      :data="tabletwoData"
      :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
      border
      style="margin-top:10px"
    >
      <el-table-column
        label="音频ID"
        prop="shipin_id"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="测试音频标题"
        prop="shipin_name"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="音频"
        prop="shipin_code"
        :resizable="false"
        align="center"
        width="350px"
      >
        <template slot-scope="scope">
          <audio :src="scope.row.shipin_code" controls="controls"></audio>
        </template>
      </el-table-column>
      <el-table-column
        label="链接地址"
        prop="shipin_url"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <!-- <el-table-column label="分享获得贡献值" prop="gongxianzhi" :resizable="false" align="center">
			</el-table-column> -->
      <el-table-column
        label="音频封面图片"
        prop="shipin_pic"
        :resizable="false"
        align="center"
      >
        <template slot-scope="scope">
          <img class="scope-img" :src="scope.row.shipin_pic" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        label="是否是链接"
        prop="is_lianjie"
        :resizable="false"
        align="center"
        width="160px"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.is_lianjie == 1">是</div>
          <div v-if="scope.row.is_lianjie == 0">不是</div>
        </template>
      </el-table-column>
      <el-table-column
        label="发布时间"
        prop="start_time"
        :resizable="false"
        align="center"
      >
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
    <div class="mark" v-show="show">
      <div class="mark-content">
        <div class="hytj" v-if="is_show == 1">添加音频</div>
        <div class="hytj" v-if="is_show == 2">修改音频</div>
        <!-- 提交的表单 -->
        <el-form class="submitform" :model="submitform">
          <table
            style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9"
            rules="all"
          >
            <tr>
              <td class="td1">音频标题:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.title"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">链接:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.url"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">是否是链接:</td>
              <td class="td2">
                <el-radio v-model="submitform.resource" :label="1">是</el-radio>
                <el-radio v-model="submitform.resource" :label="0"
                  >不是</el-radio
                >
              </td>
            </tr>
            <!-- <tr>
							<td class="td1">贡献值:</td>
							<td class="td2">
								<el-input v-model="submitform.gongxianzhi" size="small" clearable></el-input>
							</td>
						</tr> -->
            <tr>
              <td class="td1">音频:</td>
              <td class="td2 imgdw">
                <div class="sctp">
                  <input
                    id="load"
                    class="upload"
                    type="file"
                    @change="pushImg1($event)"
                    accept="audio/mpeg, audio/mp3"
                    value="上传音频"
                  />
                  <i
                    class="el-icon-plus avatar-uploader-icon"
                    v-if="audioUrl == ''"
                  ></i>
                  <audio
                    class="audio_box"
                    :src="audioUrl"
                    alt=""
                    controls="controls"
                    v-else
                  ></audio>
                </div>
              </td>
            </tr>
            <tr>
              <td class="td1">详情图片:</td>
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
                    v-if="imageUrl == ''"
                  ></i>
                  <img :src="imageUrl" alt="" v-else />
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
export default {
  data() {
    return {
      searchform: {},
      tabletwoData: [],
      shujuData: "",
      shipin_code: [],
      show: false,
      submitform: {
        title: "",
        url: "",
        resource: "",
        gongxianzhi: "",
        shipin_code: ""
      },
      imageUrl: "",
      img: "",
      audioUrl: "",
      audios: "",
      id: "",
      is_show: 1
    };
  },
  async created() {
    this.yinpinqu(1);
    // const yinpinAll = await service.yinpinAll();
    // if(yinpinAll.data.status==1){
    // 	this.shipin_code = yinpinAll.data.data
    // }
    // console.log(this.shipin_code)
  },
  methods: {
    // 上传图片
    async pushImg(e) {
      let formData = new FormData();
      console.log(formData);
      formData.append("pic", e.target.files[0]);
      console.log(11, this.headers);
      formData.append("token", util.getCookie("token"));
      console.log(formData.get(555, "pic"));
      await axios
        .post("http://118.190.174.163//admin/bank/uploadPic", formData, {
          //	await axios.post("http://gtyz.qianyiwangluo.com/admin/Goods/uploadPic",formData, {
          transformRequest: [data => data],
          headers: this.headers
        })
        .then(res => {
          this.img = res.data.data;
          (this.imageUrl = this.img), (this.imges = this.img);
          console.log(123, res.data.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
    //上传音频
    async pushImg1(e) {
      let audioData = new FormData();
      audioData.append("shipin_code", e.target.files[0]);
      console.log(11, this.headers);
      audioData.append("token", util.getCookie("token"));
      await axios
        .post("http://118.190.174.163//admin/art/uploadCode", audioData, {
          //	await axios.post("http://gtyz.qianyiwangluo.com/admin/Goods/uploadPic",formData, {
          transformRequest: [data => data],
          headers: this.headers
        })
        .then(res => {
          this.audio = res.data.data;
          (this.audioUrl = this.audio), (this.audios = this.audio);
          console.log(123, res.data.data);
          // consoloe.log(456,)
        })
        .catch(error => {
          console.log(error);
        });
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
    async yinpinqu(page, row) {
      const yinpinqu = await service.yinpinqu({
        page: page
      });
      if (yinpinqu.data.status == 1) {
        this.shujuData = yinpinqu.data.data;
        const tabletwoData = yinpinqu.data.data.list.map(item => {
          item.start_time = this.getDate(item.start_time * 1000);
          this.shipin_code = item.shipin_code;
          return item;
        });
        console.log(123, this.shipin_code);
        this.tabletwoData = tabletwoData;
        this.$message.success(yinpinqu.data.info);
      } else {
        this.tabletwoData = yinpinqu.data.data;
        this.$message.error(yinpinqu.data.info);
      }
    },
    //添加
    async addMerberClick(row) {
      this.is_show = 1;
      this.show = true;
      (this.submitform.title = ""),
        (this.submitform.url = ""),
        (this.submitform.resource = ""),
        (this.submitform.gongxianzhi = ""),
        (this.audioUrl = ""),
        (this.audios = ""),
        (this.imges = ""),
        (this.imageUrl = "");
    },
    //编辑
    modifyClick(row) {
      this.is_show = 2;
      this.id = row.shipin_id;
      console.log(this.id);
      this.show = true;
      this.submitform.title = row.shipin_name;
      this.submitform.url = row.shipin_url;
      this.submitform.resource = row.is_lianjie;
      this.submitform.gongxianzhi = row.gongxianzhi;
      this.audioUrl = row.shipin_code;
      this.imageUrl = row.shipin_pic;
      this.img = row.shipin_pic;
      this.audios = row.shipin_code;
      this.yinpinqu(1);
    },
    //删除
    delClick(row) {
      this.id = row.shipin_id;
      this.$confirm("是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const delyinpin = await service.delyinpin({
            token: util.getCookie("token"),
            shipin_id: this.id
          });
          if (delyinpin.data.status == 1) {
            this.$message.success("删除成功");
          }
          this.yinpinqu(1);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //提交
    async onSubmitClick(row) {
      if (this.is_show == 1) {
        const addYinpin = await service.addYinpin({
          shipin_name: this.submitform.title,
          shipin_url: this.submitform.url,
          is_lianjie: this.submitform.resource,
          gongxianzhi: this.submitform.gongxianzhi,
          shipin_code: this.audios,
          pic: this.imges,
          shipin_id: ""
        });
        if (addYinpin.data.status == 1) {
          this.show = false;
          this.$message.success(addYinpin.data.info);
          (this.submitform.title = ""),
            (this.submitform.url = ""),
            (this.submitform.resource = ""),
            (this.submitform.gongxianzhi = ""),
            (this.audios = ""),
            (this.imges = ""),
            (this.imageUrl = "");
          this.yinpinqu(1);
        } else {
          this.$message.error(addYinpin.data.info);
        }
      } else if (this.is_show == 2) {
        const addYinpin = await service.addYinpin({
          shipin_name: this.submitform.title,
          shipin_url: this.submitform.url,
          is_lianjie: this.submitform.resource,
          gongxianzhi: this.submitform.gongxianzhi,
          shipin_code: this.audios,
          pic: this.imges,
          shipin_id: this.id
        });
        if (addYinpin.data.status == 1) {
          this.show = false;
          this.$message.success(addYinpin.data.info);
          (this.submitform.title = ""),
            (this.submitform.url = ""),
            (this.submitform.resource = ""),
            (this.submitform.gongxianzhi = ""),
            (this.audios = ""),
            (this.imges = ""),
            (this.imageUrl = "");
          this.yinpinqu(1);
        } else {
          this.$message.error(addYinpin.data.info);
        }
      }
    },
    //返回
    clone() {
      this.show = false;
    },
    // 分页
    handleCurrentChange(val) {
      this.yinpinqu(val);
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
  height: 150px;
  width: 150px;
}

#load {
  width: 350px;
  height: 112px;
  position: absolute;
  top: 0;
  opacity: 0;
  z-index: 999;
  padding-left: 180px;
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
.audio_box {
  width: 350px;
}
</style>
