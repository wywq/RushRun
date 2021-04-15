<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="serverUrl"
      :headers="header"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :before-upload="beforeUpload"
      name="file"
      :data="{ token }"
      multiple
    ></el-upload>
    <!-- <quill-editor
      v-model="content"
      :ref="'myQuillEditor'+mqindex"
      :options="editorOption"
      @change="onEditorChange($event)"
      :disabled="disabled"
      style="height: 300px;overflow: auto;"
    ></quill-editor> -->
    <quill-editor
      v-model="content"
      :ref="'myQuillEditor' + mqindex"
      :options="editorOption"
      @change="onEditorChange($event)"
      :disabled="disabled"
    ></quill-editor>
  </div>
</template>

<script>
let quill = "";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction
  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
  ["link", "image"],
  ["clean"],
];
export default {
  props: ["con", "disabled", "mqindex"],
  name: "myQuillEditor",
  data() {
    return {
      token: sessionStorage.getItem("token"),
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      content: null,
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              image: function(value) {
                if (value) {
                  quill = this.quill;
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
            },
          },
        },
      },
      serverUrl: this.baseurl + "/adminsc/Goods/uploadPic", // 这里写你要上传的图片服务器地址
      header: {
        // token: sessionStorage.token
      }, // 有的图片服务器要求请求头需要有token
      imgQuality: 0.5,
    };
  },
  created() {
    this.content = this.con;
  },
  watch: {
    con() {
      this.content = this.con;
    },
  },
  methods: {
    onEditorChange({ editor, html, text }) {
      //内容改变事件
      console.log("---内容改变事件---");
      this.content = html;
      // console.log(html);
      this.$emit("getContent", this.content);
    },
    //压缩图片用
    dataURItoBlob(dataURI, type) {
      var binary = atob(dataURI.split(",")[1]);
      var array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {
        type: type,
      });
    },
    // 富文本图片上传前

    beforeUpload(file) {
      // 显示loading动画
      console.log(this.mqindex, 111);
      this.quillUpdateImg = true;
      let _this = this;
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt4M = file.size / 1024 / 1024 < 4;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/png 格式!");
      }
      if (!isLt4M) {
        this.$message.error("上传头像图片大小不能超过 4MB!");
      }
      // if(file.size / 1024 / 1024 < 4 &&file.size / 1024 / 1024 < 2){
      // 	return new Promise(resolve => {
      // 		const reader = new FileReader()
      // 		const image = new Image()
      // 		image.onload = (imageEvent) => {
      // 			const canvas = document.createElement('canvas');
      // 			const context = canvas.getContext('2d');
      // 			const width = image.width * _this.imgQuality
      // 			const height = image.height * _this.imgQuality
      // 			canvas.width = width;
      // 			canvas.height = height;
      // 			context.clearRect(0, 0, width, height);
      // 			context.drawImage(image, 0, 0, width, height);
      // 			const dataUrl = canvas.toDataURL(file.type);
      // 			const blobData = _this.dataURItoBlob(dataUrl, file.type);
      // 			resolve(blobData)
      // 		}
      // 		reader.onload = (e => {
      // 			image.src = e.target.result;
      // 		});
      // 		reader.readAsDataURL(file);
      // 	})
      // }
      if (!isJPG || !isLt4M) {
        return isJPG && isLt4M;
      }
    },

    uploadSuccess(res, file) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      console.log(this.mqindex);
      let that = this;
      // let quill = that.$refs[myQuillEditor + this.mqindex].quill;
      console.log(quill);
      // 如果上传成功
      console.log(res);
      if (res.status == 1) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.img);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
  },
};
</script>
<style>
.ql-container {
  height: 200px;
}
</style>
