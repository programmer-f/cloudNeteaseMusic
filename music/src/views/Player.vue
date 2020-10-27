<template>
    <div class="player">
      <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
      <MiniPlayer></MiniPlayer>
      <ListPlayer></ListPlayer>
      <audio :src="currentSong.url" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
    </div>
</template>

<script>
 import NormalPlayer from '../components/Player/NormalPlayer'
 import MiniPlayer from '../components/Player/MiniPlayer'
 import ListPlayer from '../components/Player/ListPlayer'
 import {mapGetters,mapActions} from 'vuex'
 import modeType from '../store/modeType'
  export default {
    name: "Player",
    components:{
      NormalPlayer,
      MiniPlayer,
      ListPlayer
    },
    methods:{
      ...mapActions([
        'setCurrentIndex',
        'setFavoriteList'
      ]),
      timeupdate(e){
        this.currentTime = e.target.currentTime;
      },
      end(){
        //当歌曲播放完毕后判断modeType，来做出相应的设置
        if (this.modeType === modeType.loop){
          this.setCurrentIndex(this.currentIndex + 1);
        } else if(this.modeType === modeType.one){
          //单曲循环就再播放一遍
          this.$refs.audio.play();
        }else if(this.modeType === modeType.shuffle){
          //随机播放
          let index = this.getRandomIntInclusive(0,this.songs.length - 1);
          this.setCurrentIndex(index);
        }
      },
      //得到有范围的随机数函数
        getRandomIntInclusive(min, max) {
         min = Math.ceil(min);
         max = Math.floor(max);
         return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
       }
    },
    computed:{
        ...mapGetters([
          'currentSong',
          'isPlaying',
          'currentIndex',
          'curTime',
          'modeType',
          'songs',
          'favoriteList'
        ])
    },
    watch:{
      //若点击了播放修改isPlaying为true，则开始播放
      isPlaying(newValue,oldValue){
        if (newValue){
          this.$refs.audio.play();
        } else{
          this.$refs.audio.pause();
        }
      },
      //监听歌曲发生变化
      currentIndex(){
           this.$refs.audio.oncanplay = () =>{
             //切换歌曲重新获取时长
             this.totalTime = this.$refs.audio.duration;
             if (this.isPlaying){
               this.$refs.audio.play();
             }else{
               this.$refs.audio.pause();
             }
           }
      },
      curTime(newValue,oldValue){
        this.$refs.audio.currentTime = newValue;
      },
      //监听收藏列表的变化
      favoriteList(newValue,oldValue){
        window.localStorage.setItem('favoriteList',JSON.stringify(newValue));
      }
    },
    created(){
      let list = JSON.parse(window.localStorage.getItem('favoriteList'));
      //设置给favoriteList
      if (list === null) {return;}
      this.setFavoriteList(list);
    },
    mounted() {
      this.$refs.audio.oncanplay = () =>{
            this.totalTime = this.$refs.audio.duration;
      }
    },
    data(){
      return {
        totalTime:0,
        currentTime:0
      }
    }
  }
</script>

<style scoped lang="scss">
.player{

}
</style>
