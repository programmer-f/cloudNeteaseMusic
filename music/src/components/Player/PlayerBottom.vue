<template>
    <div class="player-bottom">
      <div class="bottom-progress">
        <span ref="eleCurrentTime">00:00</span>
        <div class="progress-bar" @click="progressClick" ref="progressBar">
          <div class="progress-line" ref="progressLine">
            <div class="progress-dot"></div>
          </div>
        </div>
        <span ref="eleTotalTime">00:00</span>
      </div>
      <div class="bottom-control">
        <div class="mode loop" @click="mode" ref="mode"></div>
        <div class="prev" @click="prev"></div>
        <div class="play" @click="play" ref="play"></div>
        <div class="next" @click="next"></div>
        <div class="favorite" @click="favorite" :class="{'active':isFavorite(currentSong)}"></div>
      </div>
    </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'
  import modeType from '../../store/modeType'
  import { formatTime } from '../../tools/tools'
  export default {
    name: "PlayerBottom",
    methods: {
      ...mapActions([
        'setIsPlaying',
        'setModeType',
        'setCurrentIndex',
        'setCurrentTime',
        'setFavoriteSong'
      ]),
      play() {
          this.setIsPlaying(!this.isPlaying);
      },
      prev(){
          this.setCurrentIndex(this.currentIndex - 1);
      },
      next(){
        this.setCurrentIndex(this.currentIndex + 1);
      },
      mode(){
        if (this.modeType === modeType.loop){
          this.setModeType(modeType.one);
        } else if(this.modeType === modeType.one){
          this.setModeType(modeType.shuffle);
        }else if(this.modeType === modeType.shuffle){
          this.setModeType(modeType.loop);
        }
      },
      favorite(){
        this.setFavoriteSong(this.currentSong);
      },
      //判断当前歌曲是否被收藏
      isFavorite(song){
        let result = this.favoriteList.find(currentValue =>{
          return currentValue.id === song.id;
        });
        return result !== undefined;
      },
      progressClick(e){
        //1.计算进度条的位置

        //进度条距离左边的距离
        // let normalLeft = e.target.offsetLeft;
        let normalLeft = this.$refs.progressBar.offsetLeft;
        //鼠标点击距离左边的距离
        let eventLeft = e.pageX;
        //计算出来的距离
        let clickLeft = eventLeft - normalLeft;
        //进度条的总宽度
        // let progressWidth = e.target.offsetWidth;
        let progressWidth = this.$refs.progressBar.offsetWidth;
        //计算出来的距离 / 进度条的总宽度
        let value = clickLeft / progressWidth;
        // console.log('这里有bug',value * 100 + '%');
        this.$refs.progressLine.style.width = value * 100 + '%';


        //2.计算从什么地方开始播放
        let currentTime = this.totalTime * value;
        this.setCurrentTime(currentTime);
        // console.log(currentTime);
      },

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
        'isPlaying',
        'modeType',
        'currentIndex',
        'currentSong',
        'favoriteList'
      ])
    },
    watch:{
      isPlaying(newValue,oldValue){
        if (newValue){
          this.$refs.play.classList.add('active');
        } else{
          this.$refs.play.classList.remove('active');
        }
      },
      modeType(newValue,oldValue){
        if (newValue === modeType.loop) {
            this.$refs.mode.classList.remove('shuffle');
            this.$refs.mode.classList.add('loop');
        }else if(newValue === modeType.one){
          this.$refs.mode.classList.remove('loop');
          this.$refs.mode.classList.add('one');
          console.log('remove loop add one');
        }else if(newValue === modeType.shuffle){
          this.$refs.mode.classList.remove('one');
          this.$refs.mode.classList.add('shuffle');
        }
      },
      totalTime(newValue,oldValue){
        let time = formatTime(newValue);
        this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second;
      },
      currentTime(newValue,oldValue){
        //1.格式化当前播放的时间
        let time = formatTime(newValue);
        this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second;
        //2.根据当前播放时间计算控制进度条的宽度比例
        let value = newValue / this.totalTime * 100;
        this.$refs.progressLine.style.width = value + '%';
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/css/mixin";
.player-bottom{
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  .bottom-progress{
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
      @include font_size($font_small);
      //@include font_color();
      color: #fff;
    }
    .progress-bar{
      width: 100%;
      height: 10px;
      background-color: #fff;
      margin: 0 10px;
      .progress-line{
        width: 0;
        height: 100%;
        background-color: #ccc;
        position: relative;
        .progress-dot{
          width: 20px;
          height: 20px;
          background-color: #fff;
          border-radius:50%;
          position: absolute;
          left: 100%;
          top: 50%;
          transform:translateY(-50%);
        }
      }
    }
  }
  .bottom-control{
    width: 80%;
    margin: 0 auto;
    padding: 50px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div {
      width: 84px;
      height: 84px;
    }
      .mode{
          &.loop{
            @include bg_img('../../assets/images/loop');
          }
          &.one{
            @include bg_img('../../assets/images/one');
          }
          &.shuffle{
            @include bg_img('../../assets/images/shuffle');
          }
      }
      .prev{
          @include bg_img('../../assets/images/prev');
      }
      .play{
          @include bg_img('../../assets/images/play');
          &.active{
            @include bg_img('../../assets/images/pause');
          }
      }
      .next{
        @include bg_img('../../assets/images/next');
      }
      .favorite{
        @include bg_img('../../assets/images/un_favorite');
        &.active{
          @include bg_img('../../assets/images/favorite');
        }
      }
  }
}
</style>
