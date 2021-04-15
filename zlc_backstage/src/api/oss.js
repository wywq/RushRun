let OSS = require('ali-oss');
let config = {
    region: 'oss-cn-huhehaote',
    accessKeyId: 'LTAI4GKf9Dw4zZpTNTUmfhWa',
    accessKeySecret: '8AvwB7e2aMZup3T5x76LxhDSW0NuzM',
    bucket: 'quyum',
	dir:'block'
};

/** 
 * 配置
 */
let init = ()=>{
    return new OSS(config);
}

/** 
 * 生成uuid
 */
let guid = ()=>{
    let S4 = ()=>{
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

/** 
 * 修改文件名字
 */
let fileName = (file)=>{
    let arr = file.name.split(".");
    var uuid = "oss"+guid();
    if(arr.length>1){
        return uuid+'.'+arr[arr.length-1];
    }else{
        return uuid;
    }
}

/**
 * 上传文件
 */
let ossPut = (file)=>{
	console.log(file)
    return new Promise((resolve, reject) => {
        let objectName = fileName(file);
        init().put(objectName, file).then(({res,url}) => {
            if (res && res.status == 200) {
                console.log('阿里云OSS上传文件成功回调', res,url);
                resolve(res,url);
            }
        }).catch((err) => {
            console.log('阿里云OSS上传文件失败回调', err);
            reject(err)
        });
    })
}

/**
 * 下载文件
 */
let ossGet = (name)=>{
    return new Promise((resolve, reject) => {
        init().get(name).then(({res}) => {
            if (res && res.status == 200) {
                console.log('阿里云OSS下载文件成功回调', res);
                resolve(res);
            }
        }).catch((err) => {
            console.log('阿里云OSS下载文件失败回调', err);
            reject(err)
        });
    })
}
export default {ossPut,ossGet}