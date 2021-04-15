<template>
  <div>
    <!-- 条件筛选 -->
    <el-card v-if="!isadd">
      <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
        <!-- <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="issort = true"
            v-if="!issort"
            >修改排序</el-button
          >
          <el-button type="primary" size="small" @click="suresort" v-if="issort"
            >完成排序</el-button
          >
        </el-form-item> -->
        <el-form-item>
          <el-button
            type="success"
            size="small"
            @click="(isadd = true), (id = '')"
            >添加商品</el-button
          >
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input
            v-model="form.goods_name"
            placeholder="按商品名称搜索"
            @change="
              page = 1;
              getlist();
            "
            clearable
            size="mini"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select
            v-model="form.status"
            placeholder="请选择"
            clearable
            @change="
              page = 1;
              getlist();
            "
            size="mini"
          >
            <el-option label="在售" value="1"></el-option>
            <el-option label="下架" value="2"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="支付状态">
          <el-select
            v-model="form.account_type"
            placeholder="请选择"
            clearable
            @change="
              page = 1;
              getlist();
            "
            size="mini"
            filterable
          >
            <el-option
              v-for="item in account"
              :key="item.account_type"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="店铺">
          <el-select
            v-model="form.shop_id"
            placeholder="请选择"
            clearable
            @change="
              page = 1;
              getlist();
            "
            size="mini"
            filterable
          >
            <el-option
              v-for="item in shoplist"
              :key="item.shop_id"
              :label="item.shopName"
              :value="item.shop_id"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="分类">
          <el-select
            v-model="form.type"
            placeholder="请选择"
            clearable
            @change="
              page = 1;
              getlist();
            "
            size="mini"
            filterable
          >
            <el-option
              v-for="item in fenleilist"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <!-- <el-cascader
            v-model="form.type"
            :options="fenleilist"
            :props="{ value: 'id', label: 'name' }"
            filterable
            @change="
              page = 1;
              getlist();
            "
            size="mini"
          ></el-cascader> -->
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" @click="refresh"
            >刷新</el-button
          >
        </el-form-item>
        <!-- <el-form-item>
          <el-button type="primary" size="small" @click="downloadExcel()"
            >导出表格</el-button
          >
        </el-form-item> -->
      </el-form>
    </el-card>
    <!-- 添加商品头部 -->
    <el-card v-if="isadd">
      <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
        <el-form-item>
          <el-button
            type="primary"
            size="small"
            @click="(isadd = false), (id = '')"
            >返回</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 添加商品内容 -->
    <el-card v-if="isadd">
      <goods :shoplist="shoplist" :id="id" @sure="refresh"></goods>
    </el-card>
    <!-- 表格 -->
    <el-card v-if="!isadd">
      <el-table :data="list" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="商品服务">
                <span>{{ props.row.fuwu }}</span>
              </el-form-item>
              <!-- <el-form-item label="商品简介">
								<span v-html="props.row.describe"></span>
							</el-form-item> -->
              <el-form-item label="商品详情">
                <span v-html="props.row.describe"></span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="sort" label="排序" width="160px">
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.sort"
              :min="0"
              v-if="issort"
              size="mini"
            ></el-input-number>
            <span v-else>{{ scope.row.sort }}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="name"
          label="商品名称"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <!-- <el-table-column prop="goods_sn" label="商品编号"></el-table-column> -->
        <!-- <el-table-column prop="yuanjia" label="原价"></el-table-column> -->
        <el-table-column prop="price" label="售价"></el-table-column>
        <el-table-column prop="pic" label="列表页图片">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.pic"
              :preview-src-list="[scope.row.pic]"
            >
            </el-image>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="account_type" label="支付类型">
          <template slot-scope="scope">{{
            accountType(scope.row.account_type)
          }}</template>
        </el-table-column> -->
        <el-table-column prop="post" label="运费"></el-table-column>
        <el-table-column prop="status" label="状态" width="160px">
          <template slot-scope="scope">
            <el-switch
              :value="scope.row.status == 1"
              @change="updatestatus(scope.row.goods_id)"
              active-text="在售"
              inactive-text="下架"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="sold_num" label="销量"></el-table-column>
        <el-table-column prop="jinjia" label="供货价"></el-table-column>
        <!-- <el-table-column prop="integral" label="积分"></el-table-column> -->
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button
              type="success"
              size="small"
              @click="(id = scope.row.goods_id), (isadd = true)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
        <!-- <el-table-column prop="" label="查看评价">
					<template slot-scope="scope">
						<el-button type="primary" size="small" @click="id=scope.row.goods_id,issee= true">查看</el-button>
					</template>
				</el-table-column> -->
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
    <el-drawer
      title="商品评价"
      :visible.sync="issee"
      direction="rtl"
      size="50%"
    >
      <evaluate :goods_id="id" v-if="issee"></evaluate>
    </el-drawer>
  </div>
</template>

<script>
import evaluate from "./components/evaluate.vue";
import goods from "./components/goods.vue";
export default {
  data() {
    return {
      //商品筛选
      form: {
        goods_name: "",
        status: "",
        shop_id: "",
        fenlei: "",
        account_type: "",
        type: "",
      },
      token: sessionStorage.getItem("token"),
      account: [
        {
          id: 1,
          name: "微信/支付宝",
        },
        {
          id: 3,
          name: "酷豆",
        },
        {
          id: 4,
          name: "贡献值",
        },
      ],
      //商品id
      id: "",
      page: 1,
      total: 0,
      list: [],
      shoplist: [],
      fenleilist: [],
      //排序
      issort: false,
      //是否添加商品
      isadd: false,
      issee: false,
    };
  },
  created() {
    this.getlist();
    this.getshoplist();
    this.getfenleilist();
  },
  components: {
    goods,
    evaluate,
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getlist();
    },
    //支付类型
    accountType(type) {
      if (type == 0) {
        return "微信/支付宝";
      } else if (type == 2) {
        return "酷豆";
      } else {
        return "贡献值";
      }
    },
    //导出表格
    downloadExcel() {
      let link = document.createElement("a");
      this.form.type = this.form.type[this.form.type.length - 1];
      console.log(this.form.type, "ad");
      link.style.display = "none";
      link.href =
        "http://8.210.140.123" +
        "/adminsc/Goods/daochu?token=" +
        this.token +
        "&goods_name=" +
        this.form.goods_name +
        "&status=" +
        this.form.status +
        "&shop_id=" +
        this.form.shop_id +
        "&type=" +
        this.form.type +
        "&account_type=" +
        this.form.account_type;
      document.body.appendChild(link);
      link.click();
    },

    //获取分类
    async getfenleilist() {
      let res = await this.$zcy.goodsFenlei({
        shop_id: this.form.shop_id,
      });
      if (res.status == 1) {
        let fenleilist = [];
        res.data.forEach(item => {
          if (item.pid == 0) {
            fenleilist.push({ ...item, children: [] });
          }
        });
        fenleilist.forEach(it => {
          res.data.forEach(item => {
            if (it.id == item.pid) {
              it.children.push(item);
            }
          });
        });
        this.fenleilist = fenleilist;
        console.log("fenlei", this.fenleilist);
      }
    },
    //获取全部店铺
    async getshoplist() {
      let res = await this.$zcy.Dian({
        ttype: 0,
      });
      if (res.status == 1) {
        this.shoplist = res.data;
      }
    },
    //获取商品
    async getlist() {
      let type = "";
      if (this.form.type) {
        // type=this.form.type
        type = this.form.type[this.form.type.length - 1];
      }
      let postdata = {
        ...this.form,
        type,
        page: this.page,
        page_num: 10,
      };
      let res = await this.$zcy.goodsList(postdata);
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
    //修改状态
    async updatestatus(id) {
      let res = await this.$zcy.updatestatus({
        id,
      });
      if (res.status == 1) {
        this.$message.success("修改成功");
        this.getlist();
      }
    },
    //修改排序
    async suresort() {
      if (this.list.length == 0) {
        this.$message.error("暂无数据可排");
        return;
      }
      let obj = {};
      this.list.forEach(item => {
        obj[item.goods_id] = item.sort;
      });
      let res = await this.$zcy.editSort({
        obj,
      });
      if (res.status == 1) {
        this.$message.success("修改成功");
        this.getlist();
      }
    },
    refresh() {
      this.form = {
        goods_name: "",
        status: "",
        shop_id: "",
        fenlei: "",
      };
      this.issort = false;
      this.isadd = false;
      this.page = 1;
      this.getlist();
    },
  },
};
</script>

<style></style>
