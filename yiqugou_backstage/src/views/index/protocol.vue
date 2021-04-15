<template>
  <div>
    <el-card>
      <div style="width: 100%">
        <el-form ref="form" :model="form" label-width="100px">
          <el-tabs v-model="type" type="card" @tab-click="protocol">
            <el-tab-pane label="用户协议" name="1"></el-tab-pane>
            <!-- <el-tab-pane label="寄售规则" name="2"></el-tab-pane> -->
            <!-- <el-tab-pane label="砍价规则" name="3"></el-tab-pane> -->
            <!-- <el-tab-pane label="拍卖规则" name="4"></el-tab-pane> -->
            <el-tab-pane label="关于我们" name="5"></el-tab-pane>
            <!-- <el-tab-pane label="邀请规则" name="6"></el-tab-pane> -->
            <!-- <el-tab-pane label="vip规则" name="7"></el-tab-pane> -->
            <!-- <el-tab-pane label="拍卖房间规则" name="8"></el-tab-pane> -->
          </el-tabs>
          <myQuillEditor
            :con="content"
            @getContent="getContent"
          ></myQuillEditor>
          <el-form-item style="text-align: center;">
            <el-button type="primary" @click="onSubmit">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
// import upload from '@/components/upload.vue'
import myQuillEditor from "@/components/myQuillEditor.vue";
export default {
  data() {
    return {
      isshow: false,
      imgactive: "0",
      imgtypearr: [],
      imgarr: [],
      form: {},
      content: "",
      type: "1",
    };
  },
  components: {
    // upload,
    myQuillEditor,
  },
  async created() {
    this.protocol();
  },
  methods: {
    async protocol() {
      if (this.type == "" || this.type == undefined) {
        this.type = 1;
      }
      let postdata = {
        type: this.type,
      };
      let res = await this.$zcy.protocol(postdata);
      if (res.status == 1) {
        this.content = res.data;
        console.log(456, this.content);
      } else {
        this.$message.error(res.info);
      }
    },
    //富文本
    getContent(val) {
      this.content = val;
      console.log(val, "val");
    },

    //修改
    async onSubmit() {
      let postdata = {
        type: this.type,
        content: this.content,
      };
      let res = await this.$zcy.updateProtocol(postdata);
      if (res.status == 1) {
        this.$message.success(res.info);
      } else {
        this.$message.error(res.info);
      }
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
