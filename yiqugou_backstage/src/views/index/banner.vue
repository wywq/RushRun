<template>
  <div>
    <el-card>
      <el-button
        type="success"
        size="small"
        @click="(dialogVisible = true), (img = ''), (id = '')"
        >添加轮播图</el-button
      >
    </el-card>
    <el-card>
      <el-table :data="list" border style="width: 100%">
        <el-table-column prop="pic" label="图片">
          <template slot-scope="scope">
            <el-image
              style="width: 200px; height: 80px"
              :src="scope.row.pic"
              :preview-src-list="[scope.row.pic]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="add_time" label="添加时间">
          <template slot-scope="scope">
            {{ scope.row.add_time | dataFormat() }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品名称"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="primary" size="mini"
              >编辑</el-button
            >
            <el-button @click="del(scope.row.id)" type="danger" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="id ? '修改轮播图' : '添加轮播图'"
      :visible.sync="dialogVisible"
      @close="onClose"
    >
      <upload :imgUrl="img" @getimg="getimg"></upload>
      <el-select style="margin-top:50px;" v-model="goods_id">
        <el-option
          v-for="item in goodsList"
          :key="item.goods_id"
          :value="item.goods_id"
          :label="item.name"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import upload from "@/components/upload.vue";
export default {
  data() {
    return {
      list: [],
      id: "",
      dialogVisible: false,
      img: "",
      goods_id: "",
      //商品列表
      goodsList: [],
    };
  },
  components: {
    upload,
  },
  created() {
    this.getGoodsList();
    this.getlist();
  },
  methods: {
    //获取商品列表
    async getGoodsList() {
      let res = await this.$zcy.memberGoodsList();
      if (res.status == 1) {
        this.goodsList = res.data.map(i => {
          i.goods_id = i.goods_id + "";
          return i;
        });
        console.log(res.data);
      }
    },
    //通过商品id获取商品名称
    async getlist() {
      let res = await this.$zcy.lnxLunbo({});
      if (res.status == 1) {
        this.list = res.data.map(i => {
          for (let g of this.goodsList) {
            if (i.goods_id == g.goods_id) {
              i.name = g.name;
            }
          }
          return i;
        });
        console.log("tao", this.list);
      }
    },
    async del(id) {
      let res = await this.$zcy.delLunbo({ id });
      if (res.status == 1) {
        this.$message.success("删除成功");
        this.getlist();
      }
    },
    getimg(val) {
      this.img = val;
    },
    async sure() {
      if (!this.img) {
        this.$message.error("请上传图片");
        return;
      }
      if (!this.goods_id) {
        this.$message.error("请选择商品");
        return;
      }
      let res = await this.$zcy.updateLunbo({
        id: this.id,
        pic: this.img,
        goods_id: this.goods_id,
      });
      if (res.status == 1) {
        this.$message.success(res.info);
        this.dialogVisible = false;
        this.getlist();
      }
    },
    handleEdit(val) {
      console.log(1, val);
      this.id = val.id;
      this.img = val.pic;
      this.goods_id = val.goods_id;
      this.dialogVisible = true;
      console.log(2, this.goods_id);
    },
    onClose() {
      this.id = "";
      this.img = "";
      this.goods_id = "";
    },
  },
};
</script>

<style></style>
