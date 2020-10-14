<template>
  <div class="header" @click="theme">
    <div class="header-left" @click.stop="back"></div>
    <p class="header-title">{{title}}</p>
    <div class="header-right"></div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data(){
      return{
        themes:['theme','theme1','theme2'],
        index:0
      }
    },
    methods:{
      theme(){
        this.index++;
        if (this.index >= this.themes.length){
          this.index = 0;
        }
        document.documentElement.setAttribute('data-theme',this.themes[this.index]);
      },
      back(){
        window.history.back();
      }
    },
    props:{
      title:{
        type:String,
        default:'',
        required:true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  .header {
    width: 100%;
    height: 100px;
    @include bg_color();
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index:999;

    .header-left, .header-right {
      width: 84px;
      height: 84px;
      /*background-color: #000000;*/
    }
    .header-left{
      @include bg_img('../assets/images/back')
    }
    .header-right{
      @include bg_img('../assets/images/more')
    }

    .header-title {
      text-align: center;
      line-height: 100px;
      color: #fff;
      font-weight: bold;
      @include font_size($font_medium);
      @include no-wrap();
    }
  }
</style>
