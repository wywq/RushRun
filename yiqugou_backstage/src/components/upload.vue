<template>
  <el-upload
    class="avatar-uploader1"
    name="file"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :action="baseurl + '/adminsc/Goods/uploadPic'"
    :data="{ token }"
  >
    <img v-if="imgUrl" :src="imgUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
export default {
  name: "upload",
  props: {
    imgUrl: String,
  },
  data() {
    return {
      token: sessionStorage.getItem("token"),
    };
  },
  created() {},
  methods: {
    handleAvatarSuccess(res, file) {
      this.$message.success(res.info);
      this.$emit("getimg", res.img);
    },
  },
};
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
