<template>
    <div class="account-bottom">
        <div class="bottom-play" @click.stop="selectAllMusic">
          <span></span>
          <span>播放全部</span>
        </div>
      <div class="wrapper">
        <ScrollView>
          <SongListItem :songs="switchNum === 0 ? favoriteList : historyList "></SongListItem>
        </ScrollView>
      </div>
    </div>
</template>

<script>
  import { mapGetters , mapActions ,mapMutations } from 'vuex'
  import ScrollView from '../ScrollView'
  import SongListItem from '../SongListItem'

  export default {
    name: "AccountBottom",
    components: {
      ScrollView,
      SongListItem
    },
    props:{
      switchNum:{
        type:Number,
        default:0,
        required:true
      }
    },
    computed:{
      ...mapGetters([
        'historyList',
        'favoriteList'
      ])
    },
    methods:{
      ...mapActions([
        'setFullScreen',
        'setSongDetail',
        'setCurrentIndex'
      ]),
      ...mapMutations([
        'SET_SONG_DETAIL'
      ]),
      selectAllMusic(){
        // let ids = [];
        if(this.switchNum === 0){
            // ids = this.favoriteList.map(item => item.id);
          this.SET_SONG_DETAIL(this.favoriteList);
        }else{
            // ids = this.historyList.map(item => item.id);
          this.SET_SONG_DETAIL(this.historyList);
        }
        // this.setSongDetail(ids);
        this.setFullScreen(true);
        this.setCurrentIndex(0);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/mixin";
  @import "../../assets/css/variable";
.account-bottom{
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  bottom: 0;
  .bottom-play{
    width: 260px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    border: 1px solid #000;
    @include border_color();
    border-radius:30px;
    span{
        &:nth-of-type(1){
          width: 46px;
          height: 46px;
          @include bg_img('../../assets/images/small_play');
          margin-right: 20px;
        }
    }
  }
  .wrapper{
    overflow: hidden;
    position: fixed;
    top: 200px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
