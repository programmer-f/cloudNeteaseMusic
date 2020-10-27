<template>
  <transition
    @enter="enter"
    @leave="leave"
    :css="false"
  >
    <div class="normal-player" v-show="this.isFullScreen">
      <div class="player-wrapper">
        <PlayerHeader></PlayerHeader>
        <PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
        <PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
      </div>
      <div class="player-bg">
        <img :src="currentSong.picUrl" alt="">
      </div>
    </div>
  </transition>
</template>

<script>
  import PlayerHeader from './PlayerHeader'
  import PlayerMiddle from './PlayerMiddle'
  import PlayerBottom from './PlayerBottom'
  import { mapGetters,mapActions } from 'vuex'
  import Velocity from 'velocity-animate'
  import 'velocity-animate/velocity.ui.js'
  export default {
    name: "NormalPlayer",
    components: {
      PlayerHeader,
      PlayerMiddle,
      PlayerBottom
    },
    props:{
      totalTime:{
        type:Number,
        default:0,
        required:true
      },
      currentTime:{
        type:Number,
        default:0,
        required:true
      }
    },
    computed:{
          ...mapGetters([
            'isFullScreen',
            'currentSong'
          ])
    },
    methods:{
      ...mapActions([
        'getSongLyric'
      ]),
      enter(el, done){
        Velocity(el, "transition.bounceUpIn", { duration: 300 },function () {
          done();
        })
      },
      leave(el, done){
        Velocity(el,"transition.bounceDownOut", { duration: 300 },function () {
          done();
        })
      }
    },
    watch:{
      //当监听到当前歌曲发生改变就去获取新的歌词
      currentSong(newValue,oldValue){
        if (newValue.id === undefined) return;
        //如果没有id，则不会去获取歌词，避免报错
        this.getSongLyric(newValue.id);
      }
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
