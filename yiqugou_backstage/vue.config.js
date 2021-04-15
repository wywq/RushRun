module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  runtimeCompiler: true,
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: 9527,
    open: true,
    proxy: {
      "/adminsc": {
		target: 'http://118.190.174.163/',
        ws: true, //是否启用websocket
        changeOrigin: true, //是否开启代理
        pathRewrite: {
          "/adminsc": "/adminsc",
        },
		// pathRewrite: {
		//  	'/adminsc':'http://www.fengjijituan.com'	//填写需要跨域的地址
		// }
      },
    },
  },
};