<template>
    <div class="detail">
      <SubHeader :title="playlist.name"></SubHeader>
      <DetailTop :path="playlist.coverImgUrl"></DetailTop>
      <DetailBottom :playlist="playlist.tracks"></DetailBottom>
    </div>
</template>

<script>
  import SubHeader from '../components/SubHeader'
  import DetailTop from '../components/DetailTop'
  import DetailBottom from '../components/DetailBottom'
  import {getPlayList} from "../api/index";

  export default {
    name: "Detail",
    components: {
      SubHeader,
      DetailTop,
      DetailBottom
    },
    data(){
      return{
        playlist:[]
      }
    },
    created() {
      getPlayList({id:this.$route.params.id})
        .then((data)=>{
          console.log(data);
          this.playlist = data.playlist;
        })
        .catch((err)=>{

        })
    }
  }
</script>

<style scoped lang="scss">
.detail{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /*background-color: skyblue;*/
}
</style>
