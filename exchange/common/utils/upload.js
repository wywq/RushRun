// import { AppServices } from "@/services";
import config from "@/config/index.js";
import utils from "@/common/utils/index.js";
// 前台上传图片接口
function uploadImg(callback) {
  uni.chooseImage({
    count: 1, //默认9
    sizeType: ["original", "compressed"], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ["album", "camera"], //从相册选择
    async success(res) {
      // console.log(res, config.imgUrl);
      uni.showLoading({
        title: "上传中",
        mask: true,
      });
      uni.uploadFile({
        // 需要上传的地址
        url: config.baseUrl + "/home/Index/uploadPics",
        // filePath  需要上传的文件
        filePath: res.tempFilePaths[0],
        name: "pic",
        formData: {
          token: uni.getStorageSync("zlc_token"),
          // token: "111",
        },
        success(res1) {
          // 显示上传信息
          const data = JSON.parse(res1.data);
          console.log("上传回调:", data);
          let code = data.status;
          let message = data.info;
          //统一处理返回值
          switch (Number(code)) {
            case 1:
              callback(data.data);
              break;
            case 9999:
              utils.bottomToast("您的账号已离线，请重新登录");
              setTimeout(() => {
                uni.reLaunch({
                  url: "/pages/basic/login/index",
                });
              }, 1500);
              break;
            default:
              utils.bottomToast(`${message}`);
              break;
          }
        },
        complete: () => {
          uni.hideLoading();
        },
      });
    },
  });
}
module.exports = {
  uploadImg,
};
