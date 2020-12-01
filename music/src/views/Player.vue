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
 import { getRandomIntInclusive, setLocalStorage, getLocalStorage } from '../tools/tools'
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
        'setFavoriteList',
        'setHistorySong',
        'setHistoryList'
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
          let index = getRandomIntInclusive(0,this.songs.length - 1);
          this.setCurrentIndex(index);
        }
      },

    },
    computed:{
        ...mapGetters([
          'currentSong',
          'isPlaying',
          'currentIndex',
          'curTime',
          'modeType',
          'songs',
          'favoriteList',
          'historyList'
        ])
    },
    watch:{
      //若点击了播放修改isPlaying为true，则开始播放
      isPlaying(newValue,oldValue){
        if (newValue){
          this.setHistorySong(this.currentSong);
          this.$refs.audio.play();
        } else{
          this.$refs.audio.pause();
        }
      },
      //监听歌曲发生变化
      currentIndex(){
           this.$refs.audio.ondurationchange = () =>{
             //切换歌曲重新获取时长
             this.totalTime = this.$refs.audio.duration;
             //若点击了播放修改isPlaying为true，则开始播放
             if (this.isPlaying){
               this.setHistorySong(this.currentSong);
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
        //数据持久化
        // window.localStorage.setItem('favoriteList',JSON.stringify(newValue));
        setLocalStorage('favoriteList',newValue);
      },
      //监听历史歌曲列表变化
      historyList(newValue,oldValue){
        //数据持久化
        // window.localStorage.setItem('historyList',JSON.stringify(newValue));
        setLocalStorage('historyList',newValue);
      }
    },
    created(){
      //创建的时候获取持久化的数据
      // let favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'));
      let favoriteList = getLocalStorage('favoriteList');
      //设置给favoriteList
      if (favoriteList === null) {return;}
      this.setFavoriteList(favoriteList);

      // let historyList = JSON.parse(window.localStorage.getItem('historyList'));
      let historyList = getLocalStorage('historyList');
      //设置给historyList
      if (historyList === null){return;}
      this.setHistoryList(historyList);
    },
    mounted() {
      this.$refs.audio.ondurationchange = () =>{
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
