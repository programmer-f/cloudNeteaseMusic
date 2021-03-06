<template>
  <div class="singer">
    <div class="singer-wrapper">
      <ScrollView ref="scrollView">
        <ul class="list-wrapper">
          <li class="list-group" v-for="(value,index) in list" :key="index" ref="group">
            <h2 class="group-title">{{keys[index]}}</h2>
            <ul>
              <li class="group-item" v-for="(obj,index) in list[index]" :key="index" @click.stop="switchSinger(obj.id)">
                <img v-lazy="obj.img1v1Url" alt="">
                <p>{{obj.name}}</p>
              </li>
            </ul>
          </li>
        </ul>
      </ScrollView>
      <ul class="list-keys">
        <li
          v-for="(key,index) in keys"
          :key="key"
          :data-index="index"
          @touchstart.stop.prevent="touchstart"
          @touchmove.stop.prevent="touchmove"
          :class="{'active':currentIndex === index}"
        >{{key}}</li>
      </ul>
      <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">{{fixTitle}}</div>
    </div>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import { getAllArtists } from "../api/index";
  import ScrollView from '../components/ScrollView'
  export default {
    name: "Singer",
    data(){
        return{
          keys:[],
          list:[],
          groupsTop:[],
          currentIndex:0,
          beginOffsetY:0,
          moveOffsetY:0,
          scrollY:0
        }
    },
    components:{
      ScrollView
    },
    created() {
      getAllArtists()
        .then(res=>{
          this.keys = res.keys;
          this.list = res.list;
        })
        .catch(err=>{
          console.log(err);
        })
    },
    mounted(){
      this.$refs.scrollView.scrolling((y)=>{
        this.scrollY = y;
        //处理第一个区域
        if(y >= 0){
          this.currentIndex = 0;
          return;
        }
        //处理中间的区域
        for (let i = 0; i < this.groupsTop.length -1 ;i++){
          let preTop = this.groupsTop[i];
          let nextTop = this.groupsTop[i + 1];
          if (-y >= preTop && -y <= nextTop){
              this.currentIndex = i;
              //1.用下一组标题的偏移位 + 当前滚动出去的偏移位
              let diffOffsetY = nextTop + y;
              let fixTitleOffsetY = 0;
              //2.判断计算结果是否在 0 ~ 分组标题高度的值之间
              if (diffOffsetY >= 0 && diffOffsetY <= this.fixTitleHeight){
                fixTitleOffsetY = diffOffsetY - this.fixTitleHeight;
              }else{
                fixTitleOffsetY = 0;
              }
              if (fixTitleOffsetY === this.fixTitleOffsetY){
                  return;
              }
              this.fixTitleOffsetY = fixTitleOffsetY;
              this.$refs.fixTitle.style.transform = `translateY(${fixTitleOffsetY}px)`;
              return;
          }
        }
        //处理最后一个区域
        this.currentIndex = this.groupsTop.length - 1;
        // console.log(y);
      })
    },
    computed:{
        fixTitle(){
          if (this.scrollY > 0){
            return ''
          } else{
            return this.keys[this.currentIndex]
          }
        }
    },
    methods:{
      _keyDown(index){
        this.currentIndex = index;
        let offsetY = this.groupsTop[index];
        this.$refs.scrollView.scrollTo(0,-offsetY);
      },
      touchstart(e){
        // console.log(e.target.dataset.index);
        let index = parseInt(e.target.dataset.index);
        this._keyDown(index);
        // console.log(e);
        this.beginOffsetY = e.touches[0].pageY;
      },
      touchmove(e){
        this.moveOffsetY = e.touches[0].pageY;
        let offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight;
        // console.log(offsetY);
        let index = parseInt(e.target.dataset.index) + Math.floor(offsetY);
        if (index < 0){
          index = 0;
        } else if(index > this.list.length - 1){
          index = this.list.length - 1;
        }
        this._keyDown(index);
      },
      switchSinger(id){
        this.$router.push(`/singer/detail/${id}/singer`);
      }
    },
    watch:{
      list(){
        //注意点：watch只能监听数据的变化，数据变化的时候不一定一定渲染完了
        //所以为了保证是渲染完成之后再去获取，我们可以借助Vue提供的$nextTick方法来实现
        //也就是说在$nextTick回调函数中一定能拿到渲染完成的数据（元素），因为$nextTick的回调函数只有在数据渲染完成后才调用
        this.$nextTick(()=>{
          this.$refs.group.forEach(group =>{
            this.groupsTop.push(group.offsetTop);
          })
        })
      },
      fixTitle (){
        //渲染出来了才有高度
        this.$nextTick(()=>{
          this.fixTitleHeight = this.$refs.fixTitle.offsetHeight;
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  @import '../assets/css/variable';
.singer{
  width: 100%;
  height: 100%;
  .singer-wrapper{
    position:fixed;
    left: 0;
    right: 0;
    top: 184px;
    bottom: 0;
    overflow: hidden;
    @include bg_sub_color();
    .list-wrapper{
      .list-group{
        .group-title{
          @include bg_color();
          @include font_size($font_medium);
          color: #fff;
          padding: 10px 20px;
          box-sizing: border-box;
        }
        .group-item{
          display: flex;
          padding: 10px 20px;
          border-bottom: 1px solid #ccc;
          img{
            width: 100px;
            height: 100px;
            border-radius:50%;
            overflow: hidden;
          }
          p{
            @include font_size($font_medium);
            @include font_color();
            display: flex;
            justify-content: center;
            align-items: center;
            margin-left: 20px;
          }
        }
      }
    }
    .list-keys{
      position: fixed;
      right: 10px;
      top: 60%;
      transform:translateY(-50%);
      li{
        @include font_color();
        @include font_size($font_medium_s);
        padding: 3px 0;
        &.active{
          text-shadow: 0 0 10px #000;
        }
      }
    }
    .fix-title{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      padding: 10px 20px;
      box-sizing: border-box;
      color: #fff;
      @include font_size($font_medium);
      @include bg_color();
    }
  }

}
  .v-enter{
    transform:translateX(100%);
  }
  .v-enter-active{
    transition: transform 1s;
  }
  .v-enter-to{
    transform:translateX(0%);
  }
  .v-leave{
    transform:translateX(0%);
  }
  .v-leave-active{
    transition: transform 1s;
  }
  .v-leave-to{
    transform:translateX(100%);
  }
</style>
