<template>
  <div>
    <!-- 条件筛选 -->
    <el-card>
      <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input v-model="form.phone" placeholder="按手机号搜索" clearable size="mini"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="form.goods_name" placeholder="按商品名称搜索" clearable size="mini"></el-input>
        </el-form-item>
        <el-form-item label="评论开始时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.begin"
            style="width: 100%;"
            size="mini"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="评论结束时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.end"
            style="width: 100%;"
            size="mini"
            value-format="timestamp"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="refresh">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="id" label="id" width="70px"></el-table-column>
        <el-table-column prop="content" label="评论内容"></el-table-column>
        <el-table-column prop="add_time" label="评论时间"></el-table-column>
        <el-table-column prop="reply_content" label="回复内容"></el-table-column>
        <el-table-column prop="rate" label="评分" width="70px"></el-table-column>
        <el-table-column prop="user.nick" label="评价用户昵称"></el-table-column>
        <el-table-column prop="user.phone" label="评价用户电话"></el-table-column>
        <el-table-column prop="goods.pic" label="评价图片">
          <template slot-scope="scope">
            <el-image class="goods-pic" :src="scope.row.comment_pic[0].pic" :preview-src-list="getCommentPic(scope.row.comment_pic)"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="goods.name" label="商品名称"></el-table-column>
        <el-table-column prop="goods.pic" label="商品图片">
          <template slot-scope="scope">
            <el-image class="goods-pic" :src="scope.row.goods.pic" :preview-src-list="[scope.row.goods.pic]"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop label="操作">
          <template slot-scope="scope">
            <div class="display-flex">
              <el-button type="danger" size="small" @click="delComment(scope.row.id)">删除</el-button>
              <el-button type="success" size="small" @click="replyComment(scope.row.id)" v-if="scope.row.reply_content==''">回复</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="text-align: center;">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :page-size="10"
          :current-page="page"
          :total="total"
          style="margin-top:10px;"
        ></el-pagination>
      </div>
    </el-card>
    <evaluate-reply-dialog :value_show="showReplyDialog" :rid="id" @close="replyDialogClose"></evaluate-reply-dialog>
  </div>
</template>

<script>
import evaluateReplyDialog from "./evaluateReplyDialog.vue";
export default {
  name: "evaluatelist",
  components: {
    evaluateReplyDialog,
  },
  data() {
    return {
      //商品筛选
      form: {
        phone: "",
        begin: "",
        end: "",
        goods_name: "",
      },
      //评论id
      id: "",
      page: 1,
      total: 0,
      list: [],
      showReplyDialog: false,
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getlist();
    },
    //获取全部评价
    async getlist() {
      let postdata = {
        ...this.form,
        page: this.page,
        page_num: 10,
      };
      let res = await this.$zcy.getAllComment(postdata);
      console.log("comment", res);
      if (res.status == 1) {
        this.list = res.data;
        this.total = res.all_num;
      }
    },
    //删除评价
    async delComment(id) {
      this.$confirm("确认删除？")
        .then(async () => {
          console.log("rid", id);
          let res = await this.$zcy.delComment({ id: id });
          if (res.status == 1) {
            this.$message.success("删除成功");
            this.getlist();
          }
        })
        .catch(() => {});
    },
    //回复
    replyComment(id) {
      this.showReplyDialog = true;
      this.id = id + "";
    },
    refresh() {
      this.page = 1;
      this.getlist();
    },
    //关闭弹窗
    replyDialogClose() {
      this.showReplyDialog = false;
      this.page = 1;
      this.getlist();
    },
    //获取评价图片
    getCommentPic(arr){
      console.log("arr",arr)
      let newArr = []
      for(let i=0;i<arr.length;i++){
        newArr.push(arr[i].pic)
      }
      return newArr
    }
  },
};
</script>

<style lang="scss">
.el-form-item {
  margin-bottom: 10px;
}
.el-row {
  font-size: 14px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  text-align: left;
  padding-left: 10px;
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.goods-pic {
  width: 120px;
  height: 120px;
}
.display-flex {
  display: flex;
}
</style>
