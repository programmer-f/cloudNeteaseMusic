<template>
  <!--<div class="header" @click="theme">-->
    <!--<div class="header-left"></div>-->
    <!--<p class="header-title">知播渔音乐</p>-->
    <!--<div class="header-right" @click.stop="accountClick"></div>-->
  <!--</div>-->
  <div class="header" @click="theme">
    <!--不能直接给插槽设置样式-->
    <div class="left">
      <slot name="left">left</slot>
    </div>
    <slot name="center">center</slot>
    <div class="right">
      <slot name="right">right</slot>
    </div>
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
    /*align-items: center;*/
    .left, .right {
      width: 84px;
      height: 84px;
      margin-top: 8px;
      *{
        width: 100%;
        height: 100%;
      }
    }
    /*
    .header-left{
      @include bg_img('../assets/images/logo')
    }
    .header-right{
      @include bg_img('../assets/images/account')
    }
    .header-title {
      text-align: center;
      line-height: 100px;
      color: #fff;
      font-weight: bold;
      @include font_size($font_medium)
    }
    */
  }
</style>
