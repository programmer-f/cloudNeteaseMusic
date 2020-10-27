<template>
      <swiper :options="swiperOptions" class="banner">
        <swiper-slide class="cd">
          <div class="cd-wrapper" ref="cdWrapper">
            <img :src="currentSong.picUrl" alt="">
          </div>
          <p>{{getFirstLyric()}}</p>
        </swiper-slide>
        <swiper-slide class="lyric" ref="lyric">
          <ScrollView ref="scrollView">
            <ul>
              <li
                v-for="(value,key) in currentLyric"
                :key="key"
                :class="key === currentLineNum ? 'active' :''"
              >{{value}}</li>
            </ul>
          </ScrollView>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
</template>

<script>
  import {Swiper, SwiperSlide, directive} from 'vue-awesome-swiper'
  // If you use Swiper 6.0.0 or higher
  import 'swiper/swiper-bundle.css'
  import Swiper2, {Navigation, Pagination} from 'swiper'; // 这行代码很关键
  Swiper2.use([Navigation, Pagination]); // 这行代码很关键
  import ScrollView from '../ScrollView'
  import { mapGetters } from 'vuex'
  export default {
    name: "PlayerMiddle",
    components:{
      Swiper,
      SwiperSlide,
      ScrollView
    },
    data() {
      return {
        swiperOptions: {
          //需要分页器
          pagination: {
            el: '.swiper-pagination',
            bulletClass : 'my-bullet',//需设置.my-bullet样式
            bulletActiveClass: 'my-bullet-active',
          },
          observer:true,
          observeParents:true,
          observeSlideChildren:true
        },
        //当前一句歌词对应的时间
        currentLineNum:'0'
      }
    },
    computed:{
      ...mapGetters([
        'isPlaying',
        'currentSong',
        'currentLyric'
      ])
    },
    watch:{
      isPlaying(newValue,oldValue){
        if (newValue){
          this.$refs.cdWrapper.classList.add('active');
        } else{
          this.$refs.cdWrapper.classList.remove('active');
        }
      },
      currentTime(newValue,oldValue){
        //1.歌词高亮
        // let lineNum = Math.floor(newValue) + '';
        // let result = this.currentLyric[lineNum];
        // if (result !== undefined && result !== ''){
        //   this.currentLineNum = lineNum;
        //   //2.歌词高亮滚动
        //   let currentLineTop = document.querySelector('li.active').offsetTop;
        //   let lyricHeight = this.$refs.lyric.$el.offsetHeight;
        //   if (currentLineTop > lyricHeight / 2){
        //     //开始滚动
        //     this.$refs.scrollView.scrollTo(0,lyricHeight / 2 - currentLineTop,200);
        //   }
        // }

        //1.歌词高亮
        let lineNum = Math.floor(newValue) + '';
        this.currentLineNum = this.getActiveLineNum(lineNum);
        //2.歌词高亮滚动
          let currentLineTop = document.querySelector('li.active').offsetTop;
          let lyricHeight = this.$refs.lyric.$el.offsetHeight;
          if (currentLineTop > lyricHeight / 2){
            //开始滚动
            this.$refs.scrollView.scrollTo(0,lyricHeight / 2 - currentLineTop,200);
          }else{
            this.$refs.scrollView.scrollTo(0,0,200);
          }

      },
      currentLyric(newValue,oldValue){
        for (let key in newValue){
          //返回第一个key后return
          this.currentLineNum = key;
          return;
        }
      }
    },
    methods:{
      //获取第一句歌词
      getFirstLyric(){
        for(let key in this.currentLyric){
          return this.currentLyric[key];
        }
      },
      getActiveLineNum(lineNum){
        if (lineNum < 0){
          return this.currentLineNum;
        }
          let result = this.currentLyric[lineNum + ''];
          if (result === undefined || result === ''){
            lineNum--;
            return this.getActiveLineNum(lineNum);
          }else{
            return lineNum + '';
          }
      }
    },
    props:{
      currentTime:{
        type:Number,
        default:0,
        required:true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
.banner{
  position: fixed;
  top: 150px;
  left: 0;
  right: 0;
  bottom: 250px;
  .cd{
    .cd-wrapper{
      width: 500px;
      height: 500px;
      border-radius:50%;
      border: 30px solid #fff;
      margin: 0 auto;
      overflow: hidden;
      animation:sport 5s linear infinite;
      animation-play-state: paused;
      &.active{
        animation-play-state: running;
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    p{
      text-align: center;
      @include font_size($font_medium);
      //@include font_color();
      color: #fff;
      margin-top: 50px;
    }
  }
  .lyric{
    li{
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
      margin: 10px 0;
      &:last-of-type{
        padding-bottom: 50%;
      }
      &.active{
        color: #fff;
      }
    }
  }
}
  @keyframes sport {
    from{
      transform:rotate(0deg);
    }
    to{
      transform:rotate(360deg);
    }
  }
</style>
<style lang="scss">
@import "../../assets/css/mixin";
.my-bullet{
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius:10px;
  margin: 0 20px;
  background-color: #fff;
}
.my-bullet-active{
  width: 60px;
  @include bg_color();
}
</style>
