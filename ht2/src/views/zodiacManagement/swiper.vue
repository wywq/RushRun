<template>
  <div class="swiper">
    <!-- 搜索列表 -->
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
      <el-form-item>
        <el-button type="primary" @click="addMerberClick()"
          >添加轮播图</el-button
        >
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
        label="轮播图ID"
        prop="id"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="指向"
        prop="zhixiang_id"
        :resizable="false"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.zhixiang_id == 1">首页</div>
          <div v-if="scope.row.zhixiang_id == 2">任务</div>
          <div v-if="scope.row.zhixiang_id == 3">商圈</div>
        </template>
      </el-table-column>
      <el-table-column
        label="跳转"
        prop="type"
        :resizable="false"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.type == 1">图文</div>
          <div v-if="scope.row.type == 2">赏金任务</div>
          <div v-if="scope.row.type == 3">商品详情</div>
          <div v-if="scope.row.type == 4">外链</div>
        </template>
      </el-table-column>
      <el-table-column
        label="图片"
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
        label="是否在首页显示"
        prop="status"
        :resizable="false"
        align="center"
        width="160px"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1">显示</div>
          <div v-if="scope.row.status == 0">不显示</div>
        </template>
      </el-table-column>
      <el-table-column
        label="添加时间"
        prop="add_time"
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
    <!-- 添加会员弹窗 -->
    <div class="mark" v-show="show">
      <div class="mark-content">
        <div class="hytj" v-if="add == 1">轮播图添加</div>
        <div class="hytj" v-if="add == 2">轮播图编辑</div>
        <el-form class="submitform" :model="submitform">
          <table style="width:90%;height:80px;background:#F9F9F9" rules="all">
            <tr style="background: #EEEEEE">
              <td style="text-align: center;">名称</td>
              <td style="text-align: center;">内容</td>
            </tr>
            <tr>
              <td class="td1">添加图片</td>
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
              <td class="td3" style="text-align: center;">是否在前台显示:</td>
              <td class="td2">
                <el-radio v-model="submitform.resource" :label="1"
                  >显示</el-radio
                >
                <el-radio v-model="submitform.resource" :label="0"
                  >不显示</el-radio
                >
              </td>
            </tr>
            <tr>
              <td class="td3" style="text-align: center;">搜索指向</td>
              <td class="td2">
                <el-select
                  v-model="searchform.value"
                  placeholder="请选择"
                  style="width:150px"
                  @change="xuanzeClick"
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
              <td class="td3" style="text-align: center;">指向内容</td>
              <td class="td2">
                <el-select
                  v-model="searchform.zhixiang"
                  placeholder="请选择"
                  style="width:150px"
                  @change="zhixiangClick"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr v-show="is_sale">
              <td class="td3" style="text-align: center;">商品详情</td>
              <td class="td2">
                <el-select
                  v-model="searchform.xiangqing"
                  placeholder="请选择"
                  style="width:150px"
                >
                  <el-option
                    v-for="item in sale"
                    :key="item.value"
                    :label="item.goods_name"
                    :value="item.goods_id"
                  >
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr v-show="is_shang">
              <td class="td3" style="text-align: center;">任务</td>
              <td class="td2">
                <el-select
                  v-model="searchform.renwu"
                  placeholder="请选择"
                  style="width:150px"
                >
                  <el-option
                    v-for="item in shangjin"
                    :key="item.value"
                    :label="item.title"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </td>
            </tr>
            <tr v-show="inp">
              <td style="text-align: center;">外链地址</td>
              <td class="td2">
                <el-input v-model="submitform.name" size="small"></el-input>
              </td>
            </tr>
            <tr v-if="tuwen">
              <td style="text-align: center;">标题</td>
              <td class="td2">
                <el-input v-model="submitform.title" size="small"></el-input>
              </td>
            </tr>
            <tr v-show="tuwen">
              <td style="text-align: center;">编辑器</td>
              <td class="td2">
                <div ref="editor" style="text-align:left">
                  <div class="" v-html="article.contentHtml"></div>
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
      tabletwoData: [],
      shujuData: "",
      searchform: {
        value: "",
        zhixiang: "",
        sou: "",
        xiangqing: "",
        renwu: "",
        xiangqingid: ""
      },
      img_url: this.img_url,
      show: false,
      submitform: {
        id: 0,
        bankname: "",
        title: "",
        resource: "",
        name: ""
      },
      quizData: {
        quizId: 0,
        quizTitle: "",
        quizType: 0,
        updateTime: "2018-11-28T03:10:25.082Z"
      },
      imageUrl: "",
      img: "",
      type: 1,
      id: 0,
      zhfl: [
        {
          value: "1",
          name: "首页",
          id: 1
        },
        {
          value: "2",
          name: "任务",
          id: 2
        },
        {
          value: "3",
          name: "商圈",
          id: 3
        }
      ],
      options: [],
      qb: "",
      inp: false,
      sale: [],
      is_sale: false,
      is_shang: false,
      shangjin: [],
      add: 1,
      tuwen: false,
      editor: "",
      zhixiang_id: "",
      type1: "",
      img_url_bianji: ""
    };
  },
  async created() {
    this.lunbo_list(1);
    // setTimeout(()=>{
    // 	location.reload()
    // },1000)
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
      // this.article.contentHtml =''/
    },
    xuanzeClick(value) {
      console.log(123, this.searchform.value);
      if (this.searchform.value == 1 || this.searchform.value == 2) {
        this.options = [
          {
            value: "1",
            name: "图文",
            id: 1
          },
          {
            value: "2",
            name: "赏金任务",
            id: 2
          },
          {
            value: "3",
            name: "商品详情",
            id: 3
          },
          {
            value: "4",
            name: "外链",
            id: 4
          }
        ];
      } else if (this.searchform.value == 3) {
        this.options = [
          {
            value: "1",
            name: "图文",
            id: 1
          },
          {
            value: "3",
            name: "商品详情",
            id: 3
          }
        ];
      }
    },
    async zhixiangClick(value) {
      console.log(value, this.searchform.zhixiang);
      if (this.searchform.zhixiang == "") {
        this.is_shang = false;
        this.is_sale = false;
        this.inp = false;
        this.tuwen = false;
      }
      if (this.searchform.zhixiang == 1 || this.searchform.zhixiang == "图文") {
        this.is_shang = false;
        this.is_sale = false;
        this.inp = false;
        this.tuwen = true;
        console.log(this.tuwen);
      }
      if (
        this.searchform.zhixiang == 2 ||
        this.searchform.zhixiang == "赏金任务"
      ) {
        this.is_shang = true;
        this.is_sale = false;
        this.inp = false;
        this.tuwen = false;
        const lunboSearch = await service.lunboSearch();
        if (lunboSearch.data.status == 1) {
          this.shangjin = lunboSearch.data.data;
        }
      }
      if (
        this.searchform.zhixiang == 3 ||
        this.searchform.zhixiang == "商品详情"
      ) {
        this.is_sale = true;
        this.is_shang = false;
        this.inp = false;
        this.tuwen = false;
        const goodsInformation = await service.goodsInformation();
        if (goodsInformation.data.status == 1) {
          this.sale = goodsInformation.data.data;
        }
      }
      if (this.searchform.zhixiang == 4 || this.searchform.zhixiang == "外链") {
        this.inp = true;
        this.is_shang = false;
        this.is_sale = false;
        this.tuwen = false;
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
    async lunbo_list(page) {
      const lunbo_list = await service.lunbo_list({
        page: page,
        zhixiang: this.searchform.sou
      });
      console.log(this.zhixiang);
      if (lunbo_list.data.status == 1) {
        this.shujuData = lunbo_list.data.data;
        console.log(99999999, this.shujuData);
        const tabletwoData = lunbo_list.data.data.list.map(item => {
          item.add_time = this.getDate(item.add_time * 1000);
          return item;
        });
        this.tabletwoData = tabletwoData;
        this.$message.success(lunbo_list.data.info);
      } else {
        this.$message.error(lunbo_list.data.info);
      }
    },
    // 上传图片
    async pushImg(e) {
      let formData = new FormData();
      console.log(formData);
      formData.append("pic", e.target.files[0]);
      console.log(11, this.headers);
      formData.append("token", util.getCookie("token"));
      console.log(777, formData.get("pic"));
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
    //搜索
    onSearchClick() {
      this.lunbo_list(1);
    },
    //添加轮播图
    addMerberClick() {
      this.tuwen = false;
      this.submitform.title = "";
      this.show = true;
      this.img = "";
      this.imageUrl = "";
      this.searchform.zhixiang = "";
      this.searchform.value = "";
      this.imges = "";
      this.submitform.resource = "";
      this.article.contentHtml = "";
      this.searchform.xiangqing = "";
      this.submitform.name = "";
      // this.searchform.renwu.id =1
      this.submitform.title = "";
      this.editor.txt.html("");
      this.inp = false;
      this.is_shang = false;
      this.is_sale = false;

      this.type = 1;
      this.add = 1;
      // this.zhixiangClick()
      // this.xuanzeClick()
      console.log(555123);
    },
    //删除
    delClick(row) {
      this.$confirm("是否继续删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const delLunbo = await service.delLunbo({
            token: util.getCookie("token"),
            id: row.id
          });
          if (delLunbo.data.status == 1) {
            this.$message.success("删除成功");
          }
          this.lunbo_list(1);
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
      // this.searchform = row
      // console.log(row)
      this.show = true;
      this.add = 2;
      this.id = Number(row.id);
      this.type = 2;
      this.lunbo_list(1);
      // this.searchform.zhixiang = row.type
      if (row.type == 1) {
        this.searchform.zhixiang = "图文";
        this.inp = false;
        this.is_shang = false;
        this.is_sale = false;
        this.tuwen = true;
      }
      if (row.type == 2) {
        this.searchform.zhixiang = "赏金任务";
        this.inp = false;
        this.is_shang = true;
        this.is_sale = false;
        this.tuwen = false;
      }
      if (row.type == 3) {
        this.searchform.zhixiang = "商品详情";
        this.inp = false;
        this.is_shang = false;
        this.is_sale = true;
        this.tuwen = false;
      }
      if (row.type == 4) {
        this.searchform.zhixiang = "外部链接";
        this.inp = true;
        this.is_shang = false;
        this.is_sale = false;
        this.tuwen = false;
      }
      this.searchform.value = row.zhixiang_id;
      if (row.zhixiang_id == 1) {
        this.searchform.value = "首页";
      }
      if (row.zhixiang_id == 2) {
        this.searchform.value = "任务";
      }
      if (row.zhixiang_id == 3) {
        this.searchform.value = "商圈";
      }
      this.imageUrl = row.pic;
      this.img_url_bianji = row.pic;
      this.imges = row.pic;
      this.img = row.pic;
      this.submitform.resource = Number(row.status);
      this.article.contentHtml = row.content;
      this.editor.txt.html(this.article.contentHtml);
      this.submitform.title = row.title;
      console.log(333, row.title);
      this.searchform.xiangqing = row.goods_name;
      this.searchform.xiangqingid = row.goods_id;
      this.submitform.name = row.goods_id;
      this.searchform.renwu = row.goods_id;
      console.log(
        9,
        this.searchform.xiangqing,
        8,
        this.submitform.name,
        7,
        this.searchform.renwu
      );
      // this.zhixiangClick()
      // this.xuanzeClick()
      // this.inp = true
      // this.is_shang = true
      // this.is_sale = true
      // this.tuwen = true

      console.log(this.id);
    },
    //提交
    async onSubmitClick(row) {
      // this.zhixiang_id = row.zhixiang_id
      // this.type1 = row.type
      if (this.type == 1) {
        const addLunbo = await service.addLunbo({
          // == '首页'?1:'任务'?2:'商圈'?3:'',
          zhixiang_id: this.searchform.value,

          type: this.searchform.zhixiang,
          // == '图文'?1:'赏金任务'?2:'商品详情'?3:'外部链接'?4:''
          pic: this.imges,
          status: this.submitform.resource,
          content: this.editor.txt.html(),
          goods_id:
            this.searchform.xiangqing ||
            this.submitform.name ||
            this.searchform.renwu,
          title: this.submitform.title,
          id: ""
        });

        if (addLunbo.data.status == 1) {
          this.show = false;
          this.lunbo_list(1);
          this.$message.success(addLunbo.data.info);
          this.searchform.zhixiang = "";
          this.searchform.value = "";
          this.imges = "";
          this.submitform.resource = "";
          this.article.contentHtml = "";
          this.searchform.xiangqing = "";
          this.submitform.name = "";
          this.searchform.renwu = "";
          this.submitform.title = "";
          this.inp = false;
          this.is_shang = false;
          this.is_sale = false;
          this.tuwen = false;
          this.editor.txt.html("");
          setTimeout(() => {
            console.log(123456789456789465);
            this.$router.push({ path: "/swiper" });
          }, 100);
        } else {
          this.$message.error(addLunbo.data.info);
        }
      } else if (this.type == 2) {
        //bianji
        if (
          this.searchform.zhixiang == "赏金任务" ||
          this.searchform.zhixiang == 2
        ) {
          this.searchform.xiangqing = "";
          this.submitform.name = "";
        }
        if (
          this.searchform.zhixiang == "商品详情" ||
          this.searchform.zhixiang == 3
        ) {
          this.submitform.name = "";
          this.searchform.renwu = "";
        }
        if (
          this.searchform.zhixiang == "外部链接" ||
          this.searchform.zhixiang == 4
        ) {
          this.searchform.xiangqing = "";
          this.searchform.renwu = "";
        }
        const addLunbo = await service.addLunbo({
          zhixiang_id:
            this.searchform.value == "首页"
              ? 1
              : this.searchform.value == "任务"
              ? 2
              : this.searchform.value == "商圈"
              ? 3
              : this.searchform.value,
          type:
            this.searchform.zhixiang == "图文"
              ? 1
              : this.searchform.zhixiang == "赏金任务"
              ? 2
              : this.searchform.zhixiang == "商品详情"
              ? 3
              : this.searchform.zhixiang == "外部链接"
              ? 4
              : this.searchform.zhixiang,
          pic: this.imges || this.img_url_bianji,
          status: this.submitform.resource,
          content: this.editor.txt.html(),
          goods_id:
            this.searchform.xiangqing ||
            this.submitform.name ||
            this.searchform.renwu,
          title: this.submitform.title,
          id: this.id
        });
        console.log(
          8520,
          this.searchform.xiangqing,
          2580,
          this.submitform.name,
          222,
          this.searchform.renwu
        );
        if (addLunbo.data.status == 1) {
          this.show = false;
          this.$message.success(addLunbo.data.info);
          this.img_url_bianji = "";
          this.searchform.zhixiang = "";
          this.searchform.value = "";
          this.imges = "";
          this.submitform.resource = "";
          this.article.contentHtml = "";
          this.submitform.name = "";
          this.searchform.xiangqingid = "";
          this.searchform.xiangqing = "";
          this.submitform.title = "";
          this.editor.txt.html("");
          this.searchform.renwu = "";
          this.lunbo_list(1);
          console.log(
            333,
            this.searchform.xiangqing,
            222,
            this.submitform.name,
            55,
            this.searchform.renwu
          );
        } else {
          this.$message.error(addLunbo.data.info);
        }
      }
    },
    //返回
    clone() {
      this.show = false;
    },
    // 分页
    handleCurrentChange(val) {
      this.lunbo_list(val);
    }
  },
  mounted() {
    let that = this;
    var editor = new E(this.$refs.editor);
    this.editor = editor;
    // var editor = new E(this.$refs.editor)
    //   editor.customConfig.onchange = (html) => {
    //     that.article.contentHtml = html
    //   }
    editor.customConfig.uploadImgParamsWithUrl = true;
    editor.customConfig.uploadImgServer = "/admin/bank/uploadPic"; // 上传图片到服务器
    editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
    editor.customConfig.uploadImgMaxLength = 5;
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
.editor {
  width: 100%;
  height: 300px;
  margin-bottom: 40px;
}

.a-btn {
  padding-bottom: 80px;
}

.a-btn a {
  display: block;
  color: #fff;
  font-size: 16px;
  line-height: 30px;
  width: 100px;
  text-align: center;
  float: right;
  background: dodgerblue;
}

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
