import request from '@/service/request.js'


//登录（不携带token）
export function check(data,callback) {
  request.post('zb/Login/check',data,(res)=>{
        callback&&callback(res)
  });
}
// 发送短信
export function smsSend(data,callback) {
  request.post('zb/Reg/smsSend',data,(res)=>{
        callback&&callback(res)
  });
}
// 注册协议
export function regrule(data,callback) {
  request.post('zb/Reg/regrule',data,(res)=>{
        callback&&callback(res)
  });
}
// 注册
export function add(data,callback) {
  request.post('zb/Reg/add',data,(res)=>{
        callback&&callback(res)
  });
}
// 找回密码
export function findpwd(data,callback) {
  request.post('zb/Login/findpwd',data,(res)=>{
        callback&&callback(res)
  });
}

