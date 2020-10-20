<template>
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-wrapper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle></PlayerMiddle>
        <PlayerBottom></PlayerBottom>
      </div>
      <div class="player-bg">
        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1578498007,3765440062&fm=26&gp=0.jpg" alt="">
      </div>
    </div>
</template>

<script>
  import PlayerHeader from './PlayerHeader'
  import PlayerMiddle from './PlayerMiddle'
  import PlayerBottom from './PlayerBottom'
  import { mapGetters } from 'vuex'
  export default {
    name: "NormalPlayer",
    components: {
      PlayerHeader,
      PlayerMiddle,
      PlayerBottom
    },
    computed:{
          ...mapGetters([
            'isFullScreen'
          ])
    }
  }
</script>

<style scoped lang="scss">
.normal-player{
  @import "../../assets/css/mixin";
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .player-wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    z-index:999;
  }
  .player-bg{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    img{
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      filter:blur(10px);
    }
  }
}
</style>
