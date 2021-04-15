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
    <el-card v-if="!showlog">
      <el-table :data="list" border style="width: 100%">
        <el-table-column
          prop="id"
          label="公告ID"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="title" label="公告标题"></el-table-column>
        <el-table-column prop="keyword" label="关键字"></el-table-column>
        <el-table-column prop="status" label="状态" width="160px">
          <template slot-scope="scope">
            <el-switch
              :value="scope.row.status == 2"
              @change="updatestatus(scope.row.id)"
              active-text="显示"
              inactive-text="不显示"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="add_time" label="添加时间"></el-table-column>
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
    <orderDetail
      v-if="showlog"
      ref="od"
      @close="(showlog = false), getlist()"
      :oid="id"
      @seeping="issee = true"
      @changeadd="dialogFormVisible = true"
    >
    </orderDetail>

    <el-dialog
      title="编辑道具信息"
      :visible.sync="dialogFormVisible"
      @close="onClose"
    >
      <el-form :model="addform">
        <el-form-item label="公告标题" label-width="120px">
          <el-input v-model="addform.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="关键字" label-width="120px">
          <el-input v-model="addform.keyword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="120px">
          <el-radio v-model="addform.status" label="1" border>不显示</el-radio>
          <el-radio v-model="addform.status" label="2" border>显示</el-radio>
        </el-form-item>
        <el-form-item label="封面" label-width="120px">
          <upload :imgUrl="addform.pic" @getimg="getimg"></upload>
        </el-form-item>
        <el-form-item
          label="公告内容"
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
            <el-button type="success" size="small" @click="updateProp(addform)"
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
      //商品筛选
      form: {
        id: "",
        status: "1",
        title: "",
        content: "",
        time: "",
        pic: [],
      },
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
        title: "",
        keyword: "",
        status: "1",
        content: "",
        id: "",
        pic: "",
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
        this.addform.title = item.title;
        this.addform.content = item.content;
        this.addform.keyword = item.keyword;
        this.addform.status = item.status.toString();
        this.addform.id = item.id;
        this.addform.pic = item.pic;
      } else {
        this.addform.title = "";
        this.addform.content = "";
        this.addform.keyword = "";
        this.addform.status = "1";
        this.addform.id = "";
        this.addform.pic = "";
      }
      console.log(this.addform.status);
      this.dialogFormVisible = true;
      this.getlist();
    },
    onClose() {
      this.addform.title = "";
      this.addform.content = "";
      this.addform.keyword = "";
      this.addform.status = "1";
      this.addform.id = "";
      this.addform.pic = "";
    },
    //获公告
    async getlist() {
      let postdata = {
        page: this.page,
      };
      let res = await this.$zcy.gonggaoList(postdata);
      if (res.status == 1) {
        this.list = res.data;
        this.issort = false;
        this.total = res.num;
      } else {
        this.list = [];
        this.issort = false;
        this.total = 0;
      }
    },

    //修改公告状态
    async updatestatus(id) {
      let res = await this.$zcy.updateStatusG({
        id: id,
      });
      if (res.status == 1) {
        this.getlist();
      } else {
        this.$message.error(res.info);
      }
    },

    //删除资讯
    async delOrder(id) {
      let postdata = {
        id: id,
      };
      let res = await this.$zcy.delGonggao(postdata);
      if ((res.status = 1)) {
        this.$message.success(res.info);
        this.getlist();
      } else {
        this.$message.error(res.info);
      }
    },
    //添加/修改公告
    async updateProp(data) {
      if (data.title == "") {
        this.$message.error("请输入标题");
        return;
      }
      if (data.keyword == "") {
        this.$message.error("请输入关键字");
        return;
      }
      if (data.status != 1 && data.status != 2) {
        this.$message.error("请选择状态");
        return;
      }
      let neirong = {
        title: data.title,
        content: data.content,
        keyword: data.keyword,
        status: data.status,
        id: data.id,
        pic: data.pic,
      };
      let res = await this.$zcy.updateGonggao(neirong);
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
      this.form = {
        id: "",
        status: "",
        title: "",
        conetnt: "",
        time: "",
      };
      this.page = 1;
      this.getlist();
    },
  },
};
</script>

<style></style>
