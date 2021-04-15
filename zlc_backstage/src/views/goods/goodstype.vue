<template>
  <div>
    <el-card>
      <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
        <!-- <el-form-item>
					<el-select v-model="shopactive" filterable placeholder="请选择" @change="handleClick">
						<el-option v-for="item in shoplist" :key="item.shop_id" :label="item.shopName" :value="item.shop_id+''" >
						</el-option>
					</el-select>
				</el-form-item> -->
        <el-form-item>
          <el-button type="success" size="small" @click="add"
            >添加分类</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <!-- <el-tabs v-model="shopactive" type="card" @tab-click="handleClick">
				<el-tab-pane :label="item.shopName" :name="item.shop_id+''" v-for="item in shoplist"></el-tab-pane>
			</el-tabs> -->
      <el-table :data="list" border style="width: 100%">
        <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <el-table :data="props.row.children" border style="width: 100%">
              <el-table-column
                prop="name"
                label="名称"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column prop="pic" label="图片">
                <template slot-scope="scope">
                  <el-image
                    style="width: 30px; height: 30px"
                    :src="scope.row.pic"
                    :preview-src-list="[scope.row.pic]"
                  >
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" width="160px">
                <template slot-scope="scope">
                  <el-switch
                    v-model="scope.row.status"
                    @change="updatestatus(scope.row.id)"
                    active-text="开启"
                    inactive-text="关闭"
                    :active-value="1"
                  >
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click="bian(scope.row, 2)"
                    type="primary"
                    size="mini"
                    >编辑</el-button
                  >
                  <el-button
                    @click="del(scope.row.id)"
                    type="danger"
                    size="mini"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="name"
          label="名称"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <!-- <el-table-column prop="short_name" label="简称"></el-table-column> -->
        <el-table-column prop="pic" label="图片">
          <template slot-scope="scope">
            <el-image
              style="width: 30px; height: 30px"
              :src="scope.row.pic"
              :preview-src-list="[scope.row.pic]"
            >
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="160px">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              @change="updatestatus(scope.row.id)"
              active-text="开启"
              inactive-text="关闭"
              :active-value="1"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="bian(scope.row, 2)" type="primary" size="mini"
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
          :page-size="15"
          :current-page="page"
          :total="total"
          style="margin-top:10px;"
        ></el-pagination>
      </div>
      <el-drawer
        :title="id ? '修改分类' : '添加分类'"
        :visible.sync="dialog"
        direction="rtl"
        size="500px"
        custom-class="demo-drawer"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="addform" label-width="100px">
            <!-- <el-form-item label="店铺">
							<el-select v-model="addform.shop_id" placeholder="请选择" :disabled="id?true:false" size="mini" @change="addform.pid='',getfenleilist()">
								<el-option v-for="item in shoplist" :key="item.shop_id" :label="item.shopName" :value="item.shop_id"></el-option>
							</el-select>
						</el-form-item> -->
            <!-- <el-form-item label="分类等级">
              <el-radio
                v-model="addform.isp"
                label="1"
                border
                size="mini"
                :disabled="id ? true : false"
                >一级分类</el-radio
              >
              <el-radio
                v-model="addform.isp"
                label="2"
                border
                size="mini"
                :disabled="id ? true : false"
                >二级分类</el-radio
              >
            </el-form-item> -->
            <!-- <el-form-item label="选择父分类" v-show="addform.isp == 2">
              <el-select v-model="addform.pid" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in fenleilist"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="分类名称">
              <el-input v-model="addform.name" size="mini"></el-input>
            </el-form-item>
            <!-- <el-form-item label="分类简称">
							<el-input v-model="addform.short_name" size="mini"></el-input>
						</el-form-item> -->
            <el-form-item label="分类图片" v-if="addform.isp == 2">
              <upload :imgUrl="addform.pic" @getimg="getimg"></upload>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="dialog = false">取 消</el-button>
            <el-button type="primary" @click="sub">确定</el-button>
          </div>
        </div>
      </el-drawer>
    </el-card>
  </div>
</template>

<script>
import upload from "@/components/upload.vue";
export default {
  data() {
    return {
      shoplist: [],
      list: [],
      shopactive: 0,
      page: 1,
      total: 0,
      addform: {
        shop_id: "",
        name: "",
        // short_name: '',
        pic: "",
        pid: "",
        isp: "2",
      },
      id: "",
      dialog: false,
      fenleilist: [],
      form: {},
    };
  },
  components: {
    upload,
  },
  created() {
    if (this.$route.query.shop_id) {
      this.shopactive = this.$route.query.shop_id;
    }
    this.getshoplist();
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getlist();
    },
    getimg(val) {
      this.addform.pic = val;
    },
    add() {
      this.id = "";
      this.dialog = true;
      this.addform = {
        shop_id: this.shopactive * 1,
        name: "",
        // short_name: '',
        pic: "",
        pid: "",
        isp: "2",
      };
      this.getfenleilist();
    },
    async getfenleilist() {
      let res = await this.$zcy.goodsFenlei({
        shop_id: this.addform.shop_id,
      });
      if (res.status == 1) {
        let fenleilist = [];
        res.data.forEach(item => {
          if (item.pid == 0) {
            fenleilist.push(item);
          }
        });
        this.fenleilist = fenleilist;
      }
    },
    //获取全部店铺
    async getshoplist() {
      let res = await this.$zcy.Dian({
        ttype: 0,
      });
      if (res.status == 1) {
        this.shoplist = res.data;
        if (!this.shopactive) {
          this.shopactive = res.data[0].shop_id + "";
        }

        this.getlist();
      }
    },
    handleClick() {
      this.page = 1;
      this.getlist();
    },
    //获取分类
    async getlist() {
      let postdata = {
        page: this.page,
        page_num: 10,
        shop_id: this.shopactive,
      };
      let res = await this.$zcy.shopclass(postdata);
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
        this.list = fenleilist;
        this.issort = false;
        this.total = res.num;
      }
    },
    //修改状态
    async updatestatus(id) {
      let res = await this.$zcy.updateShopClassStatus({
        id,
      });
      if (res.status == 1) {
        this.$message.success("修改成功");
      }
    },
    //删除
    async del(id) {
      let res = await this.$zcy.delFenlei({
        id,
      });
      if ((res.status = 1)) {
        this.$message.success("删除成功");
        this.getlist();
      }
    },

    bian(item, i) {
      this.dialog = true;
      this.id = item.id;
      this.addform = {
        shop_id: this.shopactive * 1,
        name: item.name,
        // short_name: item.short_name,
        pic: item.pic,
        pid: item.pid,
        isp: "2",
      };
      this.getfenleilist();
    },
    //提交
    async sub() {
      if (!this.addform.name) {
        this.$message.error("请填写分类名称");
        return;
      }
      // if (!this.addform.short_name) {
      // 	this.$message.error('请填写分类简称')
      // 	return
      // }
      // if (!this.addform.pic) {
      // 	this.$message.error('请上传分类图片')
      // 	return
      // }
      //   if (this.addform.isp == 2 && !this.addform.pid) {
      //     this.$message.error("请选择父分类");
      //     return;
      //   }
      if (!this.id) {
        let postdata = {
          ...this.addform,
          pid: this.addform.isp == 1 ? 0 : this.addform.pid,
        };
        let res = await this.$zcy.addShopClass(postdata);
        if ((res.status = 1)) {
          this.$message.success("添加成功");
          this.getlist();
          this.dialog = false;
        }
      } else {
        let postdata = {
          id: this.id,
          ...this.addform,
          pid: this.addform.isp == 1 ? 0 : this.addform.pid,
        };
        let res = await this.$zcy.updateShopClass(postdata);
        if ((res.status = 1)) {
          this.$message.success("修改成功");
          this.getlist();
          this.dialog = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.demo-drawer__content {
  padding: 20px;
}

.demo-drawer__footer {
  text-align: center;
}
</style>
