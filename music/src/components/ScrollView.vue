<template>
  <div id="wrapper" ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
  import IScroll from 'iscroll/build/iscroll-probe'

  export default {
    name: "ScrollView",
    mounted() {
      //mouted是最早能拿到街面上元素的时候
        this.iscroll = new IScroll(this.$refs.wrapper,{
          mouseWheel: true,
          scrollbars: false,//不需要显示滚动条
          probeType:3,//像素级触发scroll事件
          //解决拖拽卡顿问题
          scrollX:false,
          scrollY:true,
        });

      // setTimeout(()=>{
      //   console.log(this.iscroll.maxScrollY);
      //   this.iscroll.refresh();
      //   console.log(this.iscroll.maxScrollY);
      // },3000)
      //1.创建一个观察者对象
      /*
      MutationObserver构造函数只要监听到了指定内容发生变化，就会执行传入的会回调函数
      mutationList：发生变化的数组
      observer：观察者对象
       */
      let observer = new MutationObserver((mutationList, observer)=> {
          // console.log(this.iscroll.maxScrollY);
          this.iscroll.refresh();//每次监听到子节点发生变化都会重新计算滚动范围
          // console.log(this.iscroll.maxScrollY);
      });
      //2.告诉观察者对象需要观察什么内容
      let config = {
        childList: true,  // 观察目标子节点的变化，是否有添加或者删除
        subtree: true,     // 观察后代节点，默认为 false
        attributeFilter:['height','offsetHeight']//观察特定属性
      };
      //3.告诉观察者对象，需要观察那个元素，观察什么内容
      /*
      第一个参数：告诉观察者对象我们需要观察谁
      第二个参数：告诉观察者对象我们需要观察什么内容
       */
      observer.observe(this.$refs.wrapper,config);

    },
    methods:{
      //提供一个监听滚动距离的方法给外界使用
      scrolling(fn){
            this.iscroll.on('scroll',function () {
              fn(this.y)
            })
      }
    }
  }
</script>

<style scoped lang="scss">
#wrapper{
  width: 100%;
  height: 100%;
}
</style>
