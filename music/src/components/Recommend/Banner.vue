<template>
  <swiper :options="swiperOptions" class="banner" v-if="banners.length > 0">
    <swiper-slide v-for="value in banners" :key="value.bannerId" class="item">
      <a :href="value.url">
        <!--<img :src="value.pic" alt="">-->
        <img v-lazy="value.pic" alt="">
      </a>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  import {Swiper, SwiperSlide,directive } from 'vue-awesome-swiper'
  // If you use Swiper 6.0.0 or higher
  import 'swiper/swiper-bundle.css'
  import Swiper2,{Navigation, Pagination} from 'swiper'; // 这行代码很关键
  Swiper2.use([Navigation, Pagination]); // 这行代码很关键

  export default {
    name: "Banner",
    data() {
      return {
        swiperOptions: {
          loop:true,//循环模式选项
          autoplay:{
            delay:1000,//自动切换的时间间隔
            stopOnLastSlide:false,//当切换到最后一个slide时，停止自动切换
            disableOnInteraction:false//用户操作swiper后，是否禁止autoplay
          },
          //需要分页器
          pagination: {
            el: '.swiper-pagination'
          },
          observer:true,
          observeParents:true,
          observeSlideChildren:true
        }
      }
    },
    props:{
      banners:{
        type:Array,
        default:()=>[],
        required:true
      }
    },
    components: {
      Swiper,
      SwiperSlide
    },
  }
</script>

<style scoped lang="scss">
  .banner{
      .item{
        img{
          width: 100%;
          height: 300px;
        }
      }

  }
</style>
<style lang="scss">
  @import "../../assets/css/mixin";
  /*如果想覆盖swiper的样式，那么style标签不能是scoped的，否则无法覆盖*/
  .banner{
    .swiper-pagination-bullet{
      width: 16px;
      height: 16px;
      background-color: #fff;
      opacity: 1;
    }
    .swiper-pagination-bullet-active{
        @include bg_color();
    }
  }
</style>
