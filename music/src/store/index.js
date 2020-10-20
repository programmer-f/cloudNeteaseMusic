import Vue from 'vue'
import Vuex from 'vuex'
//导入需要的js文件
import state from './state.js'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex);

export default new Vuex.Store({
  state:state,
  mutations:mutations,
  actions:actions,
  getters:getters
})

/*export default new Vuex.Store({
  // state: 用于保存全局共享数据
  // 不推荐直接修改state里面保存的值，而是通过mutations中的方法来修改
  state: {
      isFullScreen:false,//控制默认播放界面的显示和隐藏
  },
  //mutations: 用于保存修改共享数据的方法
  // 注意点: mutations中的方法都有一个默认的参数state
  mutations: {
      changeFullScreen(state,flag){
          state.isFullScreen = flag;
      }
  },
  //actions：用于保存触发mutations中保存方法的方法
  actions: {
      setFullScreen({commit},flag){
        commit('changeFullScreen',flag);
      }
  },
  getters:{
    isFullScreen(state){
      return state.isFullScreen;
    }
  },
  modules: {

  }
})*/
