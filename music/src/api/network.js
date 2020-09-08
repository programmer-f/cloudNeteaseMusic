import axios from  'axios'

//进行一些全局配置
axios.defaults.baseURL = 'http://127.0.0.1:3000/';
axios.defaults.timeout = 3000;


//封装自己的get和post方法
export default {
  get(path='',data={}){
      return new Promise((resolve, reject)=>{
          axios.get(path,{
            params:data
          })
            .then(function (response) {
              resolve(response);
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
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        })
    })
  },
}

