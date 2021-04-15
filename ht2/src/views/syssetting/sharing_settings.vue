<template>
  <div class="sharing_settings">
    <!--表格 -->
    <el-table
      :data="tabletwoData"
      :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
      border
      style="margin-top:10px"
    >
      <el-table-column
        label="分享ID"
        prop="id"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="分享类型"
        prop="type"
        :resizable="false"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.type == 1">视频</div>
          <div v-if="scope.row.type == 2">文本</div>
          <div v-if="scope.row.type == 3">音频</div>
        </template>
      </el-table-column>
      <el-table-column
        label="分享标题"
        prop="title"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="分享图片"
        prop="pic"
        width="500px"
        :resizable="false"
        align="center"
      >
        <template slot-scope="scope">
          <img class="scope-img" :src="scope.row.pic" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        label="分享内容"
        prop="content"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="更新时间"
        prop="add_time"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        class="elcolumn"
        align="center"
        fixed="right"
        width="300px"
      >
        <template slot-scope="scope" prop="admin">
          <el-button
            type="primary"
            @click="lookClick(scope.row)"
            size="small"
            style="margin-left:10px;"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加会员弹窗 -->
    <div class="mark" v-show="show">
      <div class="mark-content">
        <div class="hytj">分享编辑</div>
        <el-form class="submitform" :model="submitform">
          <table style="width:90%;height:80px;background:#F9F9F9" rules="all">
            <tr style="background: #EEEEEE">
              <td style="text-align: center;">名称</td>
              <td style="text-align: center;">内容</td>
            </tr>
            <!-- <tr>
							<td class="td3" style="text-align: center;">分享类型</td>
							<td class="td2">
								<el-select v-model="searchform.value" placeholder="请选择" style="width:150px">
									<el-option v-for="item in zhfl" :key="item.value" :label="item.name" :value="item.id">
									</el-option>
								</el-select>
							</td>
						</tr> -->
            <tr>
              <td style="text-align: center;">分享标题</td>
              <td class="td2">
                <el-input v-model="submitform.title" size="small"></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">分享图片</td>
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
              <td style="text-align: center;">分享内容</td>
              <td class="td2">
                <el-input
                  type="textarea"
                  v-model="submitform.content"
                  size="small"
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
  </div>
</template>

<script>
import axios from "axios";
import util from "@/utils/utils.js";
import service from "@/service/service.js";
export default {
  data() {
    return {
      tabletwoData: [],
      show: false,
      submitform: {
        title: "",
        content: ""
      },
      searchform: {
        value: ""
      },
      imageUrl: "",
      img: "",
      zhfl: [
        {
          value: "1",
          name: "视频",
          id: "1"
        },
        {
          value: "2",
          name: "文本",
          id: "2"
        },
        {
          value: "3",
          name: "音频",
          id: "3"
        }
      ],
      id: ""
    };
  },
  created() {
    this.fenxianglist();
  },
  methods: {
    // 上传图片
    async pushImg(e) {
      let formData = new FormData();
      console.log(formData);
      formData.append("pic", e.target.files[0]);
      console.log(11, this.headers);
      formData.append("token", util.getCookie("token"));
      console.log(777, formData.get("pic"));
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
    async fenxianglist() {
      const fenxianglist = await service.fenxianglist();
      if (fenxianglist.data.status == 1) {
        const tabletwoData = fenxianglist.data.data.map(item => {
          item.add_time = this.getDate(item.add_time * 1000);
          return item;
        });
        this.tabletwoData = tabletwoData;
        this.$message.success(fenxianglist.data.info);
      } else {
        this.$message.error(fenxianglist.data.info);
      }
    },
    //提交
    async onSubmitClick(row) {
      const updateFenxiang = await service.updateFenxiang({
        id: this.id,
        type: this.searchform.value,
        title: this.submitform.title,
        pic: this.imges,
        content: this.submitform.content
      });
      if (updateFenxiang.data.status == 1) {
        this.$message.success(updateFenxiang.data.info);
        this.show = false;
        this.fenxianglist();
      } else {
        this.$message.error(updateFenxiang.data.info);
      }
    },
    //返回
    clone() {
      this.show = false;
    },
    //编辑
    lookClick(row) {
      this.show = true;
      this.id = row.id;
      // this.searchform.value= row.type
      // if(row.type == 1){
      // 	this.searchform.value = "视频"
      // }
      // if(row.type == 2){
      // 	this.searchform.value = "文本"
      // }
      // if(row.type == 3){
      // 	this.searchform.value = "音频"
      // }
      console.log(88, this.searchform.value);
      console.log(99, row.type);
      this.submitform.title = row.title;
      this.imageUrl = row.pic;
      this.img = row.pic;
      this.imges = row.pic;
      console.log(456, this.imageUrl);
      this.submitform.content = row.content;
      console.log(7777, row.content);
    }
  }
};
</script>

<style>
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
.scope-img {
  width: 60px;
  height: 60px;
}
.td1 {
  width: 30%;
  text-align: center;
  padding-top: 70px;
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
