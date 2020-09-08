import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
//定义组件
// import Singer from '../views/Singer'
// import Recommend from '../views/Recommend'
// import Rank from '../views/Rank'
// import Search from '../views/Search'
// 实现组件的按需加载
const Recommend = () => import('../views/Recommend');
const Singer = () => import('../views/Singer');
const Rank = () => import('../views/Rank');
const Search = () => import('../views/Search');
// const Recommend = (reslove)=>{
//   import('../views/Recommend').then((module)=>{
//       reslove(module);
//   })
// };
// const Singer = (reslove)=>{
//   import('../views/Singer').then((module)=>{
//       reslove(module);
//   })
// };
// const Rank = (reslove)=>{
//   import('../views/Rank').then((module)=>{
//       reslove(module);
//   })
// };
// const Search = (reslove)=>{
//   import('../views/Search').then((module)=>{
//       reslove(module);
//   })
// };

//定义路由
const routes = [
  { path: '/', redirect: '/recommend' },
  { path: '/recommend', component: Recommend },
  { path: '/singer', component: Singer },
  { path: '/rank', component: Rank },
  { path: '/search', component: Search },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes // (缩写) 相当于 routes: routes
})

export default router
