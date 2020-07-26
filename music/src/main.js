import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//fastclick
import fastclick from 'fastclick'
fastclick.attach(document.body);
//初始化样式
import './assets/css/base.scss'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
