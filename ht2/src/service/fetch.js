import axios from 'axios';
import qs from 'qs';
import Vue from 'vue'
import router from '../router'
import util from '../utils/utils.js'
import {LoadingPlugin} from 'vux'
import Cookies from 'js-cookie'

Vue.use(LoadingPlugin)

const instance = axios.create({
  baseURL: '/admin',
  timeout: 50000,
  transformRequest: [function (params = {}) {
    return qs.stringify(params, {arrayFormat: 'brackets'})
  }]
});
instance.defaults.withCredentials = true;
// 请求之前
instance.interceptors.request.use((config) => {
  
  return config;
});
instance.interceptors.response.use((response) => {
  if (response.data.status == '-998' || response.data.status == '-999') {
    Vue.$vux.toast.text(response.data.info)
    util.delCookie('token');
    Cookies.remove('token');
    location.reload()
    /*router.push({path: '/login'})*/

  }
  return response;
});

export default instance;
