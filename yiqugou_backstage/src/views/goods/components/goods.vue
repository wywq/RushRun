<template>
  <div style="width: 800px">
    <el-tabs type="card">
      <el-tab-pane label="商品基本信息">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <!-- <el-form-item label="商品编号">
            <el-input v-model="form.goods_sn"></el-input>
          </el-form-item> -->
          <el-form-item label="商品类型">
            <el-radio v-model="type" label="1" border>实物商品(物流)</el-radio>
          </el-form-item>
          <!-- <el-form-item label="店铺">
						<el-select v-model="form.shop_id" placeholder="请选择" clearable @change="form.type='';getfenleilist();">
							<el-option v-for="item in shoplist" :key="item.shop_id" :label="item.shopName" :value="item.shop_id"></el-option>
						</el-select>
					</el-form-item> -->
          <el-form-item label="分类" v-show="form.shop_id">
            <el-cascader
              v-model="form.type"
              :options="fenleilist"
              :props="{ value: 'id', label: 'name' }"
              filterable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="商品简介">
            <el-input v-model="form.describe"></el-input>
          </el-form-item>
          <!-- 
					<el-form-item label="商品服务">
						<el-input v-model="form.fuwu"></el-input>
					</el-form-item> -->
          <!-- <el-form-item label="积分">
						<el-input-number v-model="form.integral" :min="0"></el-input-number>
					</el-form-item> -->
          <el-form-item label="商品列表图">
            <upload :imgUrl="form.pic" @getimg="getimg"></upload>
          </el-form-item>
          <el-form-item label="商品轮播图">
            <el-button
              type="primary"
              @click="isshow = true"
              style="margin-bottom: 10px;"
              >打开图库添加</el-button
            >
            <div class="imgarr">
              <div v-for="(item, index) in form.banner_imgs_list">
                <i class="el-icon-error" @click="detimagarr(index)"></i>
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item.pic"
                  :preview-src-list="[item.pic]"
                >
                </el-image>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <el-form ref="form" :model="form" label-width="80px" :inline="true">
          <el-form-item label="售价">
            <el-input-number
              v-model="form.price"
              :precision="2"
              :step="0.1"
              :min="0"
              size="small"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="原价">
            <el-input-number
              v-model="form.yuanjia"
              :precision="2"
              :step="0.1"
              :min="0"
              size="small"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="运费">
            <el-input-number
              v-model="form.post"
              :precision="2"
              :step="0.1"
              :min="0"
              size="small"
            ></el-input-number>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品规格">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="有无规格">
            <el-radio v-model="form.show_sku" :label="0" border>无</el-radio>
            <!-- <el-radio v-model="form.show_sku" :label="1" border>有</el-radio> -->
          </el-form-item>
          <el-form
            ref="form"
            :model="form"
            label-width="80px"
            :inline="true"
            v-show="form.show_sku == 0"
          >
            <el-form-item label="基础销量">
              <el-input-number
                v-model="form.sold_num"
                :min="0"
                size="small"
              ></el-input-number>
            </el-form-item>
            <el-form-item label="总库存">
              <el-input-number
                v-model="form.current_inventory"
                :min="1"
                size="small"
              ></el-input-number>
            </el-form-item>
          </el-form>
          <el-card v-show="form.show_sku == 1">
            <div class="title">商品规格</div>
            <div v-for="(item, index) in guige_title" :key="index">
              <div class="head">
                <el-input
                  size="mini"
                  class="head_input"
                  placeholder="规格名"
                  v-model="item.title"
                ></el-input>
                <el-checkbox v-model="checked" v-if="index == 0"
                  >添加规格图片</el-checkbox
                >
                <i
                  class="el-icon-error"
                  style="font-size: 20px;cursor: pointer;"
                  @click="detguige_title(index)"
                ></i>
              </div>

              <div class="body">
                <div class="items" v-for="(it, i) in item.child">
                  <div class="input">
                    <i class="el-icon-error" @click="det_child(index, i)"></i>
                    <el-input
                      size="mini"
                      placeholder="属性名"
                      v-model="it.title"
                    ></el-input>
                  </div>
                  <div
                    class="avatars"
                    v-if="checked && index == 0"
                    @click="(guiactive = i), (guiisshow = true)"
                  >
                    <img
                      v-if="it.pic"
                      :src="it.pic"
                      style="width: 100%;height: 150px;"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </div>
                </div>
                <el-button
                  size="mini"
                  style="width: 80px;height: 30px;margin: 10px;"
                  @click="add_child(index)"
                  >添加</el-button
                >
              </div>
              <div class="spgg_r_04" v-if="checked && index == 0">
                仅支持为第一组规格设置规格图片，建议尺寸：160*160像素
              </div>
            </div>
            <div class="head">
              <el-button
                size="mini"
                :disabled="guige_title.length >= 2"
                @click="addguige_title"
                >添加规格项目</el-button
              >
            </div>
            <div v-if="guige_title.length != 0">
              <div class="title">商品价格及库存</div>
              <div>
                <div class="table">
                  <div
                    class="t_item"
                    :style="'width:' + 100 / (guige_title.length + 2) + '%'"
                    v-for="(item, index) in guige_title"
                    :key="index"
                  >
                    <div class="thead">{{ item.title }}</div>
                  </div>
                  <div
                    class="t_item"
                    :style="'width:' + 100 / (guige_title.length + 2) + '%'"
                  >
                    <div class="thead">价格</div>
                  </div>
                  <div
                    class="t_item"
                    :style="'width:' + 100 / (guige_title.length + 2) + '%'"
                  >
                    <div class="thead">库存</div>
                  </div>
                </div>
                <div class="table" v-for="(item, index) in guige">
                  <div
                    class="t_item"
                    :style="'width:' + 100 / (guige_title.length + 2) + '%'"
                    v-for="(it, i) in guige_title"
                  >
                    <div class="thead">{{ getname(i, index) }}</div>
                  </div>
                  <div
                    class="t_item"
                    :style="'width:' + 100 / (guige_title.length + 2) + '%'"
                  >
                    <div class="thead">
                      <el-input-number
                        v-model="item.price"
                        :precision="2"
                        :step="0.1"
                        :min="0"
                        size="small"
                      ></el-input-number>
                    </div>
                  </div>
                  <div
                    class="t_item"
                    :style="'width:' + 100 / (guige_title.length + 2) + '%'"
                  >
                    <div class="thead">
                      <el-input-number
                        v-model="item.num"
                        :min="0"
                        size="small"
                      ></el-input-number>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品详情">
        <myQuillEditor
          :con="form.content"
          @getContent="getContent"
        ></myQuillEditor>
      </el-tab-pane>
    </el-tabs>

    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      style="margin-top: 40px;"
    >
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
    <el-drawer
      title="商品图库"
      :visible.sync="isshow"
      direction="rtl"
      :wrapperClosable="false"
      size="50%"
    >
      <el-tabs v-model="imgactive" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0"></el-tab-pane>
        <el-tab-pane
          :label="item.name"
          :name="item.id + ''"
          v-for="(item, index) in imgtypearr"
          :key="index"
        ></el-tab-pane>
      </el-tabs>
      <div class="imgarr imgarr1">
        <div
          v-for="(item, index) in imgarr"
          @click="selectimg(item, index)"
          :class="item.select ? 'active' : ''"
        >
          <el-image style="width: 100px; height: 100px" :src="item.pic">
          </el-image>
        </div>
      </div>
      <div class="demo-drawer__footer">
        <el-button type="primary" @click="changebanner_imgs_list"
          >确认选择</el-button
        >
      </div>
    </el-drawer>

    <el-drawer
      title="商品图库"
      :visible.sync="guiisshow"
      direction="rtl"
      :wrapperClosable="false"
      size="50%"
    >
      <el-tabs v-model="imgactive" type="card" @tab-click="handleClick">
        <el-tab-pane label="全部" name="0"></el-tab-pane>
        <el-tab-pane
          :label="item.name"
          :name="item.id + ''"
          v-for="(item, index) in imgtypearr"
          :key="index"
        ></el-tab-pane>
      </el-tabs>
      <div class="imgarr imgarr1">
        <div
          v-for="(item, index) in imgarr"
          @click="guiimgactive = index"
          :class="index == guiimgactive ? 'active' : ''"
        >
          <el-image style="width: 100px; height: 100px" :src="item.pic">
          </el-image>
        </div>
      </div>
      <div class="demo-drawer__footer">
        <el-button type="primary" @click="changeguiimg">确认选择</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
function doExchange(arr) {
  var len = arr.length;
  // 当数组大于等于2个的时候
  if (len >= 2) {
    var len1 = arr[0].length;
    var len2 = arr[1].length;
    var lenBoth = len1 * len2;
    var items = new Array(lenBoth);
    var index = 0;
    for (var i = 0; i < len1; i++) {
      for (var j = 0; j < len2; j++) {
        items[index] = arr[0][i] + "|" + arr[1][j];
        index++;
      }
    }
    var newArr = new Array(len - 1);
    for (var i = 2; i < arr.length; i++) {
      newArr[i - 1] = arr[i];
    }
    newArr[0] = items;
    return doExchange(newArr);
  } else {
    return arr[0];
  }
}
import upload from "@/components/upload.vue";
import myQuillEditor from "@/components/myQuillEditor.vue";
export default {
  props: ["shoplist", "id"],
  data() {
    return {
      form: {
        name: "",
        // goods_sn: "",
        shop_id: "1",
        type: "",
        describe: "",
        fuwu: "",
        price: 0,
        yuanjia: 0,
        post: 0,
        integral: "",
        pic: "",
        banner_imgs_list: [],
        show_sku: 0,
        sold_num: 1,
        current_inventory: 0,
        content: "",
      },
      guige_title: [],
      type: "1",
      fenleilist: [],
      imgtypearr: [],
      imgarr: [],
      imgactive: "0",
      isshow: false,
      checked: "",
      guige: [],
      guiisshow: false,
      guiimgactive: "",
      guiactive: 0,
    };
  },

  components: {
    upload,
    myQuillEditor,
  },
  watch: {
    // guige_title: { //监听的对象
    // 	deep: true, //深度监听设置为 true
    // 	immediate: true,
    // 	handler: function(newV, oldV) {
    // 	}
    // }
  },
  async created() {
    this.getimgtypearr();
    this.handleClick();
    this.getfenleilist();
    if (this.id) {
      let res = await this.$zcy.editGoods({
        id: this.id,
      });
      if (res.status == 1) {
        for (let k in this.form) {
          this.form[k] = res.data[k];
        }
        let guige_title = [];
        if (this.form.show_sku == 1) {
          if (res.data.detail_one) {
            let obj = {
              title: res.data.detail_one,
              child: [],
            };

            res.data.guige.forEach(item => {
              let is = true;
              obj.child.forEach(it => {
                if (it.title == item[res.data.detail_one]) {
                  is = false;
                }
              });
              if (is) {
                obj.child.push({
                  title: item[res.data.detail_one],
                  pic: item.pic,
                  num: item.num,
                  price: item.price,
                });
              }
            });
            guige_title.push(obj);
          }
          if (res.data.detail_two) {
            let obj = {
              title: res.data.detail_two,
              child: [],
            };
            res.data.guige.forEach(item => {
              let is = true;
              obj.child.forEach(it => {
                if (it.title == item[res.data.detail_two]) {
                  is = false;
                }
              });
              if (is) {
                obj.child.push({
                  title: item[res.data.detail_two],
                  pic: item.pic,
                  num: item.num,
                  price: item.price,
                });
              }
            });
            guige_title.push(obj);
          }
          this.guige_title = guige_title;
          this.guige = res.data.guige;
          this.wat();
        } else {
          this.wat();
        }
        this.getfenleilist();
      }
    } else {
      this.wat();
    }
  },
  methods: {
    wat() {
      this.$watch("guige_title", {
        handler(newV) {
          if (newV.length <= 0) {
            return;
          }
          let K = [];
          let arr = [];
          newV.forEach(item => {
            K.push(item.title);
            let arritem = [];
            item.child.forEach(it => {
              arritem.push(
                item.title +
                  ":" +
                  it.title +
                  "&" +
                  JSON.stringify({
                    pic: it.pic,
                    num: it.num,
                    price: it.price,
                  })
              );
            });
            arr.push(arritem);
          });
          let karr = [];
          doExchange(arr).forEach(item => {
            let is = true;
            let obj = {};
            let pic = "";
            item.split("|").forEach(it => {
              if (
                JSON.parse(it.split("&")[1]).num == 0 &&
                JSON.parse(it.split("&")[1]).price == 0
              ) {
                if (JSON.parse(it.split("&")[1]).pic) {
                  pic = JSON.parse(it.split("&")[1]).pic;
                }
                is = false;
                obj = JSON.parse(it.split("&")[1]);
              }
            });
            if (is) {
              obj = JSON.parse(item.split("|")[0].split("&")[1]);
              if (JSON.parse(item.split("|")[0].split("&")[1]).pic) {
                pic = JSON.parse(item.split("|")[0].split("&")[1]).pic;
              }
            }
            item.split("|").forEach(it => {
              obj[it.split(":")[0]] = it.split(":")[1].split("&")[0];
            });
            obj.pic = pic;
            karr.push(obj);
          });

          this.guige = karr;
          console.log(this.guige);
        },
        deep: true,
      });
    },
    objectSpanMethod() {
      return {
        rowspan: 2,
        colspan: 1,
      };
    },
    getname(i, index) {
      let k = this.guige_title[i].title;
      return this.guige[index][k];
    },
    async onSubmit() {
      this.form.show_sku = 0;
      if (!this.form.name) {
        this.$message.error("请输入商品名称");
        return;
      }
      // if (!this.form.goods_sn) {
      //   this.$message.error("请输入商品编号");
      //   return;
      // }
      if (!this.form.shop_id) {
        this.$message.error("请选择商品店铺");
        return;
      }
      if (!this.form.type) {
        this.$message.error("请选择商品分类");
        return;
      }
      if (!this.form.describe) {
        this.$message.error("请输入商品简介");
        return;
      }
      if (this.form.show_sku == 1 && this.guige.length == 0) {
        this.$message.error("请添加规格");
        return;
      }
      if (!this.form.pic) {
        this.$message.error("请上传商品列表图");
        return;
      }
      let img = [];
      this.form.banner_imgs_list.forEach(item => {
        img.push(item.pic);
      });
      let keys = [];
      this.guige_title.forEach(item => {
        keys.push(item.title);
      });
      let form = {
        ...this.form,
        type: this.form.type[this.form.type.length - 1],
        banner_imgs_list: "",
        id: this.id,
        img: img.join(","),
        guige: JSON.stringify(this.guige),
        keys: keys.join(","),
      };
      let res = await this.$zcy.updateGoods(form);
      if (res.status == 1) {
        this.$message.success(res.info);
        this.$emit("sure");
      } else {
        this.$message.error(res.info);
      }
    },
    getContent(val) {
      this.form.content = val;
    },
    getimg(val) {
      console.log(val);
      this.form.pic = val;
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
      } else {
        this.fenleilist = [];
      }
    },
    detimagarr(index) {
      this.form.banner_imgs_list.splice(index, 1);
    },
    async getimgtypearr() {
      let res = await this.$zcy.picAll();
      if (res.status == 1) {
        this.imgtypearr = res.data;
      }
    },
    async handleClick() {
      let res = await this.$zcy.picType({
        type: this.imgactive,
      });
      if (res.status == 1) {
        let imgarr = res.data;
        imgarr.forEach(item => {
          item.select = false;
        });
        this.imgarr = imgarr;
      }
    },
    selectimg(item, index) {
      let it = item;
      item.select = !item.select;
      this.imgarr.splice(index, 1, item);
    },
    changebanner_imgs_list() {
      let banner = [];
      this.imgarr.forEach(item => {
        if (item.select) {
          banner.push({
            pic: item.pic,
          });
        }
      });
      if (banner.length == 0) {
        this.$message.error("请选择图片");
        return;
      }
      this.form.banner_imgs_list = [...this.form.banner_imgs_list, ...banner];
      this.isshow = false;
      this.imgarr.forEach(item => {
        item.select = false;
      });
    },
    //添加父级规格
    addguige_title() {
      let obj = {
        title: "",
        child: [
          {
            title: "",
            pic: "",
            num: 0,
            price: 0,
          },
        ],
      };
      this.guige_title.push(obj);
    },
    //删除父级规格
    detguige_title(index) {
      this.guige_title.splice(index, 1);
    },
    //添加自己规格
    add_child(index) {
      let obj = this.guige_title[index];
      obj.child.push({
        title: "",
        pic: "",
        num: 0,
        price: 0,
      });
      this.guige_title.splice(index, 1, obj);
    },
    det_child(index, i) {
      let obj = this.guige_title[index];
      obj.child.splice(i, 1);
      this.guige_title.splice(index, 1, obj);
    },
    changeguiimg() {
      this.guige_title[0].child[this.guiactive].pic = this.imgarr[
        this.guiimgactive
      ].pic;
      this.guiisshow = false;
    },
  },
};
</script>

<style scoped>
.imgarr {
  display: flex;
  flex-wrap: wrap;
}

.imgarr1 {
  height: 500px;
  overflow-y: scroll;
  align-items: flex-start;
}

.imgarr > div {
  margin: 15px;
  border: 2px solid #eee;
  position: relative;
  width: 100px;
  height: 102px;
}

.imgarr i {
  position: absolute;
  right: -10px;
  top: -10px;
  font-size: 20px;
  cursor: pointer;
  z-index: 6;
}

.spgg_r_04 {
  padding-left: 20px;
  margin-bottom: 20px;
}

.imgarr .active {
  border: 2px solid #409eff;
}

.demo-drawer__footer {
  text-align: center;
  margin: 60px auto 0;
}

.head {
  padding: 10px;
  background: #f8f8f8;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 14px;
  margin-bottom: 15px;
}

.head_input {
  width: 200px;
}

.body {
  display: flex;
  flex-wrap: wrap;
}

.items {
  margin: 10px;
  text-align: center;
  width: 150px;
}

.input {
  width: 100%;
  position: relative;
}

.input i {
  position: absolute;
  right: -10px;
  top: -10px;
  font-size: 20px;
  z-index: 8;
  color: #aaa;
  cursor: pointer;
}

.avatars {
  width: 150px;
  height: 150px;
  margin-top: 20px;
  line-height: 150px;
  border: 1px dashed #aaa;
  background-color: #fbfdff;
  margin-bottom: 20px;
}

.table {
  display: flex;
}

.thead {
  padding: 10px;
  border: 1px solid #eee;
  color: #666;
  height: 20px;
}
</style>
