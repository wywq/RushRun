<template>
  <div>
    <el-card>
      <div style="width: 100%">
        <el-form ref="form" :model="form" label-width="100px">
          <el-tabs v-model="form.type" type="card" @tab-click="shoukuanCode">
            <el-tab-pane label="支付宝收款码" name="1"></el-tab-pane>
            <el-tab-pane label="微信收款码" name="2"></el-tab-pane>
          </el-tabs>
          <upload :imgUrl="form.content" @getimg="getimg"></upload>
          <el-form-item style="text-align: center;">
            <el-button type="primary" @click="onSubmit">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import upload from "@/components/upload.vue";
import myQuillEditor from "@/components/myQuillEditor.vue";
export default {
  data() {
    return {
      isshow: false,
      imgactive: "0",
      imgtypearr: [],
      imgarr: [],
      form: {
        type: "1",
        content: "",
      },
      content: "",
      type: "1",
    };
  },
  components: {
    upload,
    myQuillEditor,
  },
  async created() {
    this.shoukuanCode();
  },
  methods: {
    async shoukuanCode() {
      let postdata = {
        type: this.form.type,
      };
      let res = await this.$zcy.shoukuanCode(postdata);
      if (res.status == 1) {
        this.form.content = res.data;
        console.log(456, this.form.content);
      } else {
        this.$message.error(res.info);
      }
    },
    //富文本
    getimg(val) {
      this.form.content = val;
      console.log(val, "val");
    },

    //修改
    async onSubmit() {
      let postdata = {
        type: this.form.type,
        content: this.form.content,
      };
      let res = await this.$zcy.updateshoukuanCode(postdata);
      if (res.status == 1) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
      this.shoukuanCode();
    },
  },
};
</script>

<style scoped>
.line {
  text-align: center;
}
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
.imgarr .active {
  border: 2px solid #409eff;
}
.demo-drawer__footer {
  text-align: center;
  margin: 60px auto 0;
}
</style>
