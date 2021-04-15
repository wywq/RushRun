import Vue from 'vue'
import Router from 'vue-router'
import router from '../router'
import CryptoJS from 'crypto-js'

import { ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
//cookie
//获取cookie、
function getCookie(name) {
	let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)){
		return (arr[2]);
	}else{
		return null;
	}
}
//设置cookie,增加到vue实例方便全局调用
function setCookie (c_name, value) {
	const expiredays = 1000 * 60 * 60 * 24 * 3;
	let exdate = new Date();
	exdate.setTime(exdate.getTime() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

function delCookie (name) {
 var exp = new Date();
 exp.setTime(exp.getTime() - 1);
 var cval = getCookie(name);
 if (cval != null)
  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

//无效token,返回登录
function goback(status,info){
	if(status == '-998' || status == '-999'){
		delCookie("token");
		Vue.$vux.toast.text(info,"middle");
		setTimeout(()=>{
		 	router.push({ path: '/login'})
		},1000)
	}else{
		Vue.$vux.toast.show({
			type: "text",
			text: info,
			position: "niddle",
			width: "9em"
		})
	}
}
function gotoLogin(){
	const token = JSON.parse(unescape(getCookie('token')));
	if(!token){
		Vue.$vux.toast.text("请先登录", "middle");
		router.push({ path: 'login'})
		return true;
	}
}
function encode(s) {
    return encodeURIComponent(s);
}

function decode(s) {
    return decodeURIComponent(s);
}
// function encrypt(word, keyStr){
//     keyStr = keyStr ? keyStr : 'qazwsxedc~!@';
//     var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
//     var srcs = CryptoJS.enc.Utf8.parse(word);
//     var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
//     return encrypted.toString();
// }
//   //解密
// function  decrypt(word, keyStr){
//     keyStr = keyStr ? keyStr : 'qazwsxedc~!@';
//     var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
//     var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
//     return CryptoJS.enc.Utf8.stringify(decrypt).toString();
// }
export default {
	getCookie,
	setCookie,
	delCookie,
	goback,
	gotoLogin
}
