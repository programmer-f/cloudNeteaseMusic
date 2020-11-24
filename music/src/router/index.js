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
const Detail = () => import('../views/Detail');
const Singer = () => import('../views/Singer');
const Rank = () => import('../views/Rank');
const Search = () => import('../views/Search');
const Account = () => import('../views/Account');
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
  { path: '/recommend',
    component: Recommend,
    children:[
      {
        // 注意点: 如果是嵌套路由(子路由), 那么不用写一级路径的地址, 并且也不用写/
        path:'detail/:id/:type',
        component:Detail
      }
    ]
  },
  { path: '/singer', component: Singer },
  { path: '/rank', component: Rank },
  { path: '/search', component: Search },
  {path:'/account',component:Account}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes // (缩写) 相当于 routes: routes
})

export default router
