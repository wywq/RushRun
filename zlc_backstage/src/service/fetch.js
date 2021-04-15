import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
import store from '@/store/index.js';
import router from '../router';
import {
	Message
} from 'element-ui';
import {
	Loading
} from 'element-ui';
Vue.prototype.$message = Message;
Vue.prototype.$Loading = Loading;

let loadingInstance = '';
const instance = axios.create({
	baseURL: '',
	timeout: 50000,
	headers: {
		
	},
	transformRequest: [function(data = {}) {

		return qs.stringify(data, {
			arrayFormat: 'brackets'
		})
	}]
});

// axios请求之前要做的事情
instance.interceptors.request.use((config) => {
	let token = '';
	if (sessionStorage.getItem("token")) {
		token = sessionStorage.getItem("token")
	}
	config.data = {
		...config.data,
		token
	}
	loadingInstance = Loading.service({
		fullscreen: true
	});
	config.url = '/adminsc' + config.url
	return config;
});
// axios请求之后要做的事情
instance.interceptors.response.use(
	(response) => {
		// console.log(response)
		loadingInstance.close();
		if (response.data) {
			let msg = '';
			// 请求回来的数据 判断code是101（可变的）的返回值
			if(response.data.status==-999){
				sessionStorage.clear()
				Message.error('请重新登陆')
				setTimeout(()=> {
					router.push('/login')
				},500);
			}
		}
		return response.data;
	},
	(error) => {
		Message({
			showClose: true,
			message: error.msg || '请求失败'
		});
		return Promise.reject(error);
	}
);
export default instance;
