<template>
      <swiper :options="swiperOptions" class="banner">
        <swiper-slide class="cd">
          <div class="cd-wrapper">
            <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1578498007,3765440062&fm=26&gp=0.jpg" alt="">
          </div>
          <p>我是一句歌词，真的是歌词</p>
        </swiper-slide>
        <swiper-slide class="lyric">
          <ScrollView>
            <ul>
              <li>我是第1个li</li>
              <li>我是第2个li</li>
              <li>我是第3个li</li>
              <li>我是第4个li</li>
              <li>我是第5个li</li>
              <li>我是第6个li</li>
              <li>我是第7个li</li>
              <li>我是第8个li</li>
              <li>我是第9个li</li>
              <li>我是第10个li</li>
              <li>我是第11个li</li>
              <li>我是第12个li</li>
              <li>我是第13个li</li>
              <li>我是第14个li</li>
              <li>我是第15个li</li>
              <li>我是第16个li</li>
              <li>我是第17个li</li>
              <li>我是第18个li</li>
              <li>我是第19个li</li>
              <li>我是第20个li</li>
              <li>我是第21个li</li>
              <li>我是第22个li</li>
              <li>我是第23个li</li>
              <li>我是第24个li</li>
              <li>我是第25个li</li>
              <li>我是第26个li</li>
              <li>我是第27个li</li>
              <li>我是第28个li</li>
              <li>我是第29个li</li>
              <li>我是第30个li</li>
              <li>我是第31个li</li>
              <li>我是第32个li</li>
              <li>我是第33个li</li>
              <li>我是第34个li</li>
              <li>我是第35个li</li>
              <li>我是第36个li</li>
              <li>我是第37个li</li>
              <li>我是第38个li</li>
              <li>我是第39个li</li>
              <li>我是第40个li</li>
              <li>我是第41个li</li>
              <li>我是第42个li</li>
              <li>我是第43个li</li>
              <li>我是第44个li</li>
              <li>我是第45个li</li>
              <li>我是第46个li</li>
              <li>我是第47个li</li>
              <li>我是第48个li</li>
              <li>我是第49个li</li>
              <li>我是第50个li</li>
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
        }
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
      img{
        width: 100%;
        height: 100%;
      }
    }
    p{
      text-align: center;
      @include font_size($font_medium);
      @include font_color();
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
        padding-bottom: 100px;
      }
    }
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
