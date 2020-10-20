<template>
    <ul class="detail-bottom">
        <li class="bottom-top">
            <div class="bottom-icon"></div>
            <div class="bottom-title">播放全部</div>
        </li>
        <li v-for="value in playlist" :key="value.id" class="item" @click="selectMusic">
            <h3>{{value.name}}</h3>
            <p>{{value.al.name}}-{{value.ar[0].name}}</p>
        </li>
    </ul>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: "DetailBottom",
    props: {
      playlist: {
        type: Array,
        default: () => [],
        required: true
      }
    },
    methods:{
      ...mapActions([
            'setFullScreen',//将 `this.setFullScreen()` 映射为 `this.$store.dispatch('setFullScreen')`
      ]),
      selectMusic(){
          //触发actions里面的方法
          // this.$store.dispatch('setFullScreen',true);
          this.setFullScreen(true);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';
  @import '../../assets/css/variable';
  .detail-bottom{
    width: 100%;
    li{
      width: 100%;
      height: 100px;
      padding: 20px;
      box-sizing: border-box;
      @include bg_sub_color();
      border: 1px solid #ccc;
  }
    .bottom-top{
      border-top-left-radius: 50px;
      border-top-right-radius: 50px;
      display: flex;
      align-items: center;
      .bottom-icon{
        width: 60px;
        height: 60px;
        margin-right: 20px;
        @include bg_img('../../assets/images/small_play')
      }
      .bottom-title{
        @include font_color();
        @include font_size($font_large)
      }
    }
    .item{
      h3{
        @include font_color();
        @include font_size($font_medium);
      }
      p{
        @include font_color();
        @include font_size($font_small);
        /*margin-top: 10px;*/
        opacity: 0.8;
      }
    }
  }
</style>
