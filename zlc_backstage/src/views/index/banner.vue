<template>
  <div>
    <el-card>
      <el-button type="success" size="small" @click="add">添加轮播图</el-button>
    </el-card>
    <el-card>
      <!-- <el-tabs v-model="type" type="card" @tab-click="handleClick" stretch>
        <el-tab-pane label="App首页" name="1"></el-tab-pane>
        <el-tab-pane label="商城首页" name="2"></el-tab-pane>
      </el-tabs> -->
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
          <font></font>
        </el-table-column>
        <el-table-column prop="add_time" label="添加时间"></el-table-column>
        <!-- <el-table-column label="绑定商品名称">
					<template slot-scope="scope">
						{{scope.row.goods.name}}
					</template>
				</el-table-column> -->
        <!-- <el-table-column label="绑定商品图片">
					<template slot-scope="scope">
						<el-image style="width: 80px; height: 80px" :src="scope.row.goods.pic" :preview-src-list="[scope.row.goods.pic]">
						</el-image>
					</template>
				</el-table-column> -->
        <!-- <el-table-column label="绑定商品价格">
					<template slot-scope="scope">
						¥{{scope.row.goods.price}}
					</template>
				</el-table-column> -->

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="change(scope.row)" type="primary" size="mini"
              >编辑</el-button
            >
            <el-button @click="del(scope.row.id)" type="danger" size="mini"
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
          :page-size="5"
          :current-page="page"
          :total="total"
          style="margin-top:10px;"
        ></el-pagination>
      </div>
    </el-card>
    <el-dialog
      :title="id ? '修改轮播图' : '添加轮播图'"
      :visible.sync="dialogVisible"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <!-- <el-form-item label="位置">
          <el-select v-model="form.type" placeholder="请选择" clearable>
            <el-option label="App首页" value="1"></el-option>
            <el-option label="商城首页" value="2"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="选择商品">
					<el-select v-model="form.goods_id" placeholder="请选择" clearable>
						<el-option v-for="item in goodslist" :key="item.goods_id" :label="item.name" :value="item.goods_id*1"></el-option>
					</el-select>
				</el-form-item> -->
        <el-form-item label="图片">
          <upload :imgUrl="form.pic" @getimg="getimg"></upload>
          <font v-if="this.form.type == 1" style="color: #999999;">
            <!-- 建议图片大小 宽:全屏的90%(一般为337左右)  高:155左右 -->
            建议图片大小 337(全屏的90%)*155
          </font>
          <font v-if="this.form.type == 2" style="color: #999999;">
            <!-- 建议图片 宽:全屏(一般为375左右)  高:180左右 -->
            建议图片大小 375(全屏)*180
          </font>
        </el-form-item>
        <el-form-item label="选择商品" v-if="form.type == 2">
          <template>
            <el-select v-model="form.goods_id" placeholder="请选择">
              <el-option
                v-for="item in goodslist"
                :key="item.goods_id"
                :label="item.label"
                :value="item.value"
                :disabled="item.status == 2"
              >
              </el-option>
            </el-select>
          </template>
        </el-form-item>
      </el-form>
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
      page: 1,
      type: "1",
      total: 0,
      goodslist: [],
      form: {
        pic: "",
        type: "",
        goods_id: "",
      },
    };
  },
  components: {
    upload,
  },
  created() {
    this.getlist();
    this.getgoodlist();
  },
  methods: {
    async getlist() {
      let res = await this.$zcy.rotationList({
        page: this.page,
        page_size: 5,
        type: this.type,
      });
      if (res.status == 1) {
        this.list = res.data;
        this.total = res.all_num;
      }
    },
    async del(rotation_id) {
      let res = await this.$zcy.rotationDel({
        rotation_id,
      });
      if (res.status == 1) {
        this.$message.success("删除成功");
        this.getlist();
      }
    },
    getimg(val) {
      this.form.pic = val;
    },
    async getgoodlist() {
      let res = await this.$zcy.goodsLists();
      if (res.status == 1) {
        this.goodslist = res.data;
      }
    },
    async sure() {
      if (!this.form.pic) {
        this.$message.error("请上传图片");
        return;
      }
      //   if (!this.form.type) {
      //     this.$message.error("请选择轮播图位置");
      //     return;
      //   }
      if (this.form.type == 2 && this.form.goods_id == "") {
        this.$message.error("请选择跳转的商品");
        return;
      }
      let res = await this.$zcy.rotationAdd({
        rotation_id: this.id,
        ...this.form,
      });
      if (res.status == 1) {
        this.$message.success(res.info);
        this.dialogVisible = false;
        this.getlist();
      } else {
        this.$message.error(res.info);
      }
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getlist();
    },
    handleClick() {
      this.page = 1;
      this.getlist();
    },
    change(item) {
      this.form.pic = item.pic;
      this.form.type = item.type + "";
      this.form.goods_id = item.goods_id * 1;
      this.id = item.id;
      this.dialogVisible = true;
    },
    add() {
      this.form.pic = "";
      this.form.type = "";
      this.form.goods_id = "";
      this.id = "";
      this.dialogVisible = true;
    },
  },
};
</script>

<style></style>
