<template>
  <div>
    <!-- 条件筛选 -->
    <el-card>
      <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" size="small" @click="openaddress"
            >添加</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="refresh"
            >刷新</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 表格 -->
    <el-card>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="phone" label="联系方式"></el-table-column>
        <el-table-column prop="place" label="地址"></el-table-column>
        <el-table-column prop="miaoshu" label="描述"></el-table-column>
        <el-table-column prop="pic" label="封面">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.pic"
              :preview-src-list="[scope.row.pic]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="success" size="small" @click="id=scope.row,showlog=true">编辑</el-button> -->
            <el-button
              type="success"
              size="small"
              @click="openaddress(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="small"
              @click="delOrder(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :page-size="15"
          :current-page="page"
          :total="total"
          style="margin-top:10px;"
        ></el-pagination>
      </div>
    </el-card>

    <el-dialog
      title="编辑道具信息"
      :visible.sync="dialogFormVisible"
      @close="onClose"
    >
      <el-form :model="addform">
        <el-form-item label="名称" label-width="120px">
          <el-input v-model="addform.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" label-width="120px">
          <el-input v-model="addform.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" label-width="120px">
          <el-input v-model="addform.place" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" label-width="120px">
          <el-input v-model="addform.miaoshu" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="封面" label-width="120px">
          <upload :imgUrl="addform.pic" @getimg="getimg"></upload>
        </el-form-item>
        <el-form-item
          label="内容"
          label-width="120px"
          style="text-align: center;"
        >
          <myQuillEditor
            :con="addform.content"
            @getContent="getContent"
          ></myQuillEditor>
        </el-form-item>
        <el-form-item label="操作" label-width="120px">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="updateProp()"
              >确认</el-button
            >
          </template>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import upload from "@/components/upload.vue";
import myQuillEditor from "@/components/myQuillEditor.vue";
export default {
  data() {
    return {
      showlog: false,
      dialogFormVisible: false,
      //商品id
      id: "",
      page: 1,
      total: 0,
      list: [],
      shoplist: [],
      fenleilist: [],
      addform: {
        name: "",
        phone: "",
        place: "",
        miaoshu: "",
        content: "",
        id: "",
        pic: "",
        type: 2,
      },
    };
  },
  created() {
    this.getlist();
  },
  components: {
    upload,
    myQuillEditor,
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getlist();
    },
    //富文本
    getContent(val) {
      this.addform.content = val;
      console.log(val, "val");
    },
    getimg(val) {
      console.log(val);
      this.addform.pic = val;
    },
    openaddress(item) {
      console.log(item);
      if (item.id != "" && item.id != undefined) {
        this.addform.name = item.name;
        this.addform.phone = item.phone;
        this.addform.place = item.place;
        this.addform.miaoshu = item.miaoshu;
        this.addform.content = item.content;
        this.addform.id = item.id;
        this.addform.pic = item.pic;
      } else {
        this.addform.name = "";
        this.addform.phone = "";
        this.addform.place = "";
        this.addform.miaoshu = "";
        this.addform.content = "";
        this.addform.id = "";
        this.addform.pic = "";
      }
      this.dialogFormVisible = true;
      this.getlist();
    },
    onClose() {
      this.addform.name = "";
      this.addform.phone = "";
      this.addform.place = "";
      this.addform.miaoshu = "";
      this.addform.content = "";
      this.addform.id = "";
      this.addform.pic = "";
    },
    //获公告
    async getlist() {
      let postdata = {
        page: this.page,
        type: 2,
      };
      let res = await this.$zcy.jieshaoList(postdata);
      if (res.status == 1) {
        this.list = res.data;
        this.total = res.num;
      } else {
        this.list = [];
        this.total = 0;
      }
    },
    //删除资讯
    async delOrder(id) {
      let postdata = {
        id,
      };
      let res = await this.$zcy.delJieshao(postdata);
      if ((res.status = 1)) {
        this.$message.success(res.info);
        this.getlist();
      } else {
        this.$message.error(res.info);
      }
    },
    //添加/修改公告
    async updateProp() {
      //   if (data.title == "") {
      //     this.$message.error("请输入标题");
      //     return;
      //   }
      //   if (data.keyword == "") {
      //     this.$message.error("请输入关键字");
      //     return;
      //   }
      //   if (data.status != 1 && data.status != 2) {
      //     this.$message.error("请选择状态");
      //     return;
      //   }
      //   let neirong = {
      //     title: data.title,
      //     content: data.content,
      //     keyword: data.keyword,
      //     status: data.status,
      //     id: data.id,
      //     pic: data.pic,
      //   };
      let res = await this.$zcy.updateJieshao(this.addform);
      if (res.status == 1) {
        this.$message.success(res.info);
        this.showlog = false;
        this.dialogFormVisible = false;
        this.getlist();
      } else {
        this.$message.error(res.info);
      }
    },

    refresh() {
      this.page = 1;
      this.getlist();
    },
  },
};
</script>

<style></style>
