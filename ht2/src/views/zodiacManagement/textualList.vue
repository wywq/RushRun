<template>
  <div class="textualList">
    <el-form :inline="true" :model="searchform" class="searchform">
      <el-form-item>
        <el-button type="primary" @click="addMerberClick()">添加图文</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tabletwoData"
      :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
      border
      style="margin-top:10px"
    >
      <el-table-column
        label="图文ID"
        prop="shipin_id"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="图文标题"
        prop="shipin_name"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="链接地址"
        prop="shipin_url"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <!-- <el-table-column label="分享贡献值" prop="gongxianzhi" :resizable="false" align="center">
			</el-table-column> -->
      <el-table-column
        label="图文列表图片"
        prop="pic"
        :resizable="false"
        align="center"
      >
        <template slot-scope="scope">
          <img class="scope-img" :src="scope.row.pic" alt="" />
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
        <div class="hytj" v-if="tw == 1">添加图文</div>
        <div class="hytj" v-if="tw == 2">编辑图文</div>
        <!-- 提交的表单 -->
        <el-form class="submitform" :model="submitform">
          <table
            style="width:90%;height:80px; border:1px dashed #000;background:#F9F9F9"
            rules="all"
          >
            <tr>
              <td class="td1">图文标题:</td>
              <td class="td2">
                <el-input
                  v-model="submitform.title"
                  size="small"
                  clearable
                ></el-input>
              </td>
            </tr>
            <tr>
              <td class="td1">图文内容:</td>
              <td class="td2">
                <div ref="editor" style="text-align:left">
                  <div class="" v-html="article.contentHtml"></div>
                </div>
              </td>
            </tr>
            <!-- 	<tr>
							<td class="td1">贡献值:</td>
							<td class="td2">
								<el-input v-model="submitform.gongxianzhi" size="small" clearable></el-input>
							</td>
						</tr> -->
            <tr>
              <td class="td1">链接地址:</td>
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
            <tr>
              <td class="td1">列表页图片:</td>
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
import E from "wangeditor";
import util from "@/utils/utils.js";
import service from "@/service/service.js";
import axios from "axios";
export default {
  data() {
    return {
      article: {
        contentHtml: ""
      },
      searchform: {},
      tabletwoData: [],
      shujuData: "",
      shipin_code: [],
      show: false,
      submitform: {
        title: "",
        url: "",
        gongxianzhi: "",
        shipin_code: "",
        resource: ""
      },
      imageUrl: "",
      img: "",
      audioUrl: "",
      audios: "",
      id: "",
      tw: 1,
      type: 1,
      // 富文本
      editor: ""
    };
  },
  async created() {
    this.tuwen(1);
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [{ value: "vue" }, { value: "node.js" }];
    },
    handleSelect(item) {
      console.log(item);
    },
    getContent: function() {
      alert(this.article.contentHtml);
    },
    // 上传图片
    async pushImg(e) {
      let formData = new FormData();
      console.log(formData);
      formData.append("pic", e.target.files[0]);
      console.log(11, this.headers);
      formData.append("token", util.getCookie("token"));
      console.log(formData.get(555, "pic"));
      await axios
        .post("http://118.190.174.163//admin/type/ossType", formData, {
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
    async tuwen(page, row) {
      const tuwen = await service.tuwen({
        page: page
      });
      if (tuwen.data.status == 1) {
        this.shujuData = tuwen.data.data;
        const tabletwoData = tuwen.data.data.list.map(item => {
          item.start_time = this.getDate(item.start_time * 1000);
          this.shipin_code = item.shipin_code;
          return item;
        });
        console.log(123, this.shipin_code);
        this.tabletwoData = tabletwoData;
        this.$message.success(tuwen.data.info);
      } else {
        this.$message.error(tuwen.data.info);
      }
    },
    //添加
    async addMerberClick(row) {
      this.show = true;
      this.tw = 1;
      this.imageUrl = "";
      this.type = 1;
      this.submitform.title = "";
      this.article.contentHtml = "";
      this.submitform.gongxianzhi = "";
      this.imges = "";
      this.img = "";
      this.submitform.url = "";
      this.submitform.resource = "";
    },
    //编辑
    modifyClick(row) {
      this.id = row.shipin_id;
      console.log(this.id);
      this.show = true;
      this.tw = 2;
      this.type = 2;
      this.submitform.title = row.shipin_name;
      this.article.contentHtml = row.shipin_code;
      this.submitform.gongxianzhi = row.gongxianzhi;
      this.imageUrl = row.pic;
      this.img = row.pic;
      console.log(666, this.imageUrl);
      this.submitform.url = row.shipin_url;
      this.submitform.resource = row.is_lianjie;
      this.tuwen(1);
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
          const deltuwen = await service.deltuwen({
            token: util.getCookie("token"),
            shipin_id: this.id
          });
          if (deltuwen.data.status == 1) {
            this.$message.success("删除成功");
          }
          this.tuwen(1);
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
      if (this.type == 1) {
        const addtuwen = await service.addtuwen({
          shipin_name: this.submitform.title,
          gongxianzhi: this.submitform.gongxianzhi,
          // shipin_code:this.article.contentHtml,
          shipin_code: this.editor.txt.html(),
          pic: this.imges,
          shipin_url: this.submitform.url,
          is_lianjie: this.submitform.resource,
          shipin_id: ""
        });
        if (addtuwen.data.status == 1) {
          this.show = false;
          this.$message.success(addtuwen.data.info);
          (this.submitform.title = ""),
            (this.article.contentHtml = ""),
            (this.submitform.gongxianzhi = ""),
            (this.imges = "");
          this.submitform.url = "";
          this.submitform.resource = "";
          this.tuwen(1);
        } else {
          this.$message.error(addtuwen.data.info);
        }
      } else if (this.type == 2) {
        const addtuwen = await service.addtuwen({
          shipin_name: this.submitform.title,
          gongxianzhi: this.submitform.gongxianzhi,
          // shipin_code:this.article.contentHtml,
          shipin_code: this.editor.txt.html(),
          pic: this.imges,
          shipin_url: this.submitform.url,
          is_lianjie: this.submitform.resource,
          shipin_id: this.id
        });
        console.log(this.shipin_id);
        if (addtuwen.data.status == 1) {
          this.show = false;
          this.$message.success(addtuwen.data.info);

          this.tuwen(1);
        } else {
          this.$message.error(addtuwen.data.info);
        }
      }
    },
    //返回
    clone() {
      this.show = false;
    },
    // 分页
    handleCurrentChange(val) {
      this.tuwen(val);
    }
  },
  mounted() {
    let that = this;
    var editor = new E(this.$refs.editor);
    this.editor = editor;
    // editor.customConfig.onchange = (html) => {
    //   that.article.contentHtml = html
    // }

    editor.customConfig.uploadImgParamsWithUrl = true;
    editor.customConfig.pasteIgnoreImg = true;
    editor.customConfig.pasteFilterStyle = false;
    editor.customConfig.uploadImgServer = "/admin/bank/uploadPic"; // 上传图片到服务器
    editor.customConfig.showLinkImg = false;
    editor.customConfig.uploadFileName = "pic";
    editor.customConfig.uploadImgParams = {
      token: util.getCookie("token")
    };
    editor.customConfig.uploadImgHooks = {
      success: function(xhr, editor, result) {
        // 图片上传并返回结果，图片插入成功之后触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      fail: function(xhr, editor, result) {
        // 图片上传并返回结果，但图片插入错误时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
      },
      error: function(xhr, editor) {
        // 图片上传出错时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      timeout: function(xhr, editor) {
        // 图片上传超时时触发
        // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
      },
      customInsert: function(insertImg, result, editor) {
        // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
        // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
        // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
        // result 必须是一个 JSON 格式字符串！！！否则报错
        var url = that.img_url + result.data;
        insertImg(url);
        // 设置内容
        editor.txt.img(url);
        editor.txt.html(content);
        // 获取内容
        var url = editor.txt.img();
        var content = editor.txt.html();
      }
    };
    editor.create();
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
