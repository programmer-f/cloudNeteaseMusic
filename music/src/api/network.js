import axios from  'axios'
import Vue from 'vue';

//进行一些全局配置
axios.defaults.baseURL = 'http://127.0.0.1:3000/';
// axios.defaults.baseURL = 'http://192.168.31.18:3000/';
axios.defaults.timeout = 3000;

let count = 0;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  count++;
  //显示loading
  Vue.showLoading();
  return config;
}, function (error) {
  // 对请求错误做些什么
  Vue.hideLoading();
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  count--;
  if(count === 0){
    //隐藏loading
    Vue.hideLoading();
  }

  return response;
}, function (error) {
  // 对响应错误做点什么
  Vue.hideLoading();
  return Promise.reject(error);
});

//封装自己的get和post方法
export default {
  get(path='',data={}){
      return new Promise((resolve, reject)=>{
          axios.get(path,{
            params:data
          })
            .then(function (response) {
              resolve(response.data);
            })
            .catch(function (error) {
              reject(error);
            })
      })
  },
  post(path='',data={}){
    return new Promise((resolve, reject)=>{
      axios.post(path,data)
        .then(function (response) {
          resolve(response.data);
        })
        .catch(function (error) {
          reject(error);
        })
    })
  },
  all(list){
    return new Promise((resolve,reject)=>{
      axios.all(list)
        .then(axios.spread(function (...result) {
          // 两个请求现在都执行完成
          resolve(result);
        }))
        .catch(err=>{
          reject(err);
        })
    })
  }
}

