<template>
  <div class="advertising_management">
    <!-- 列表 -->
    <el-table
      :data="tabletwoData"
      :header-cell-style="{ background: '#F9F9F9', color: '#606266' }"
      border
      style="margin-top:10px"
    >
      <el-table-column
        label="广告ID"
        prop="id"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="指向ID"
        prop="zhixiang_id"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="审核状态"
        prop="status"
        :resizable="false"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.status == 1">审核通过</div>
          <div v-if="scope.row.status == 5">待审核</div>
        </template>
      </el-table-column>
      <el-table-column
        label="位置"
        prop="type"
        :resizable="false"
        align="center"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.type == 1">首页</div>
          <div v-if="scope.row.type == 2">任务</div>
          <div v-if="scope.row.type == 3">商圈</div>
        </template>
      </el-table-column>
      <el-table-column
        label="图片"
        prop="pic"
        :resizable="false"
        align="center"
      >
        <template slot-scope="scope">
          <img class="scope-img" :src="scope.row.pic" alt="" />
        </template>
      </el-table-column>
      <el-table-column
        label="内容"
        prop="content"
        :resizable="false"
        align="center"
      >
        <template slot-scope="scope">
          <div v-html="scope.row.content" class="img_box"></div>
        </template>
      </el-table-column>
      <el-table-column
        label="添加时间"
        prop="add_time"
        :resizable="false"
        align="center"
        width="200px"
      >
      </el-table-column>
      <el-table-column
        label="标题"
        prop="title"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="合伙人账号"
        prop="hehuoren_name"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="合伙人城市"
        prop="city"
        :resizable="false"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="操作"
        :resizable="false"
        align="center"
        width="300px"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="delClick(scope.row)"
            size="small"
            style="margin-left:10px;"
            >审核不通过</el-button
          >
          <el-button type="primary" size="small" @click="modifyClick(scope.row)"
            >审核通过</el-button
          >
          <el-button type="primary" size="small" @click="delClick(scope.row)"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import util from "@/utils/utils.js";
import service from "@/service/service.js";
import axios from "axios";
export default {
  data() {
    return {
      tabletwoData: [],
      id: "",
      hehuoren_id: ""
    };
  },
  async created() {
    this.advertisement();
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
    async advertisement(page, row) {
      const advertisement = await service.advertisement();
      if (advertisement.data.status == 1) {
        const tabletwoData = advertisement.data.data.map(item => {
          item.add_time = this.getDate(item.add_time * 1000);
          return item;
        });
        this.tabletwoData = tabletwoData;
        this.$message.success(advertisement.data.info);
      } else {
        this.tabletwoData = advertisement.data.data;
        this.$message.error(advertisement.data.info);
      }
    },
    //刪除
    async delClick(row) {
      const delGuanggao = await service.delGuanggao({
        id: row.id
      });
      if (delGuanggao.data.status == 1) {
        this.advertisement();
        this.$message.success(delGuanggao.data.info);
      } else {
        this.$message.error(delGuanggao.data.info);
      }
    },
    //审核成功
    async modifyClick(row) {
      this.id = row.id;
      this.hehuoren_id = row.hehuoren_id;
      const shenheyes = await service.shenheyes({
        id: this.id,
        hehuoren_id: this.hehuoren_id
      });
      if (shenheyes.data.status == 1) {
        this.$message.success(shenheyes.data.info);
        this.advertisement();
      } else {
        this.$message.error(shenheyes.data.info);
        this.advertisement();
      }
    },
    //审核不通过
    async delClick(row) {
      this.id = row.id;
      this.hehuoren_id = row.hehuoren_id;
      const shenheno = await service.shenheno({
        id: this.id,
        hehuoren_id: this.hehuoren_id
      });
      if (shenheno.data.status == 1) {
        this.$message.success(shenheno.data.info);
        this.advertisement();
      } else {
        this.advertisement();
        this.tabletwoData = [""];
        this.$message.error(shenheno.data.info);
      }
    }
  },
  mounted() {}
};
</script>

<style scoped>
.img_box >>> img {
  width: 80px !important;
}
</style>
