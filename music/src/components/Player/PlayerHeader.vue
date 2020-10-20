<template>
  <div class="header">
    <div class="header-left" @click="hideNormalPlayer"></div>
    <div class="header-title">
      <h3>演员</h3>
      <p>薛之谦</p>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: "Header",
    methods:{
      ...mapActions([
        'setFullScreen',
        'setMiniPlayer'
      ]),
      hideNormalPlayer(){
          this.setFullScreen(false);
          //显示miniPlayer
          this.setMiniPlayer(true);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../../assets/css/mixin';
  .header {
    width: 100%;
    height: 100px;
    //@include bg_color();
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
      @include bg_img('../../assets/images/down')
    }
    .header-right{
      /*@include bg_img('../../assets/images/more')*/
    }
    .header-title {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      /*text-align: center;*/
      color: #fff;
      @include font_size($font_medium);
      @include no-wrap();
    }
  }
</style>
