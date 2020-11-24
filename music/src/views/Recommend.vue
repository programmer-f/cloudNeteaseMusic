<template>
    <div class="recommend">
      <ScrollView>
        <div>
          <Banner :banners="banners"></Banner>
          <Personalized
            :personalized="personalized"
            :title="'推荐歌单'"
            @select="fatherSelectItem"
            :type="`personalized`">
          </Personalized>
          <Personalized
            :personalized="albums"
            :title="'最新专辑'"
            @select="fatherSelectItem"
            :type="`albums`">
          </Personalized>
          <SongList :songs="songs"></SongList>
        </div>
      </ScrollView>
      <transition>
        <router-view></router-view>
      </transition>
    </div>
</template>

<script>
  import {getBanner,getPersonalized,getNewAlbum,getNewSong} from "../api/index";
  import Banner from '../components/Recommend/Banner'
  import Personalized from '../components/Recommend/Personalized'
  import SongList from '../components/Recommend/SongList'
  import ScrollView from '../components/ScrollView'

  export default {
    name: "Recommend",
    components:{
      Banner,
      Personalized,
      SongList,
      ScrollView
    },
    methods:{
      fatherSelectItem(id,type){
          this.$router.push({
            path:`/recommend/detail/${id}/${type}`
          })
      }
    },
    data(){
      return{
          banners:[],
          personalized:[],
          albums:[],
          songs:[]
      }
    },
    created() {
      getBanner()
        .then((data)=>{
          this.banners = data.banners;
        })
        .catch((err) => {
          console.log(err);
        });

      getPersonalized()
        .then((data)=>{
          this.personalized = data.result;
        })
        .catch((err)=>{
          console.log(err);
        });

      getNewAlbum()
        .then((data)=>{
          this.albums = data.albums.slice(0,6);
        })
        .catch((err)=>{
          console.log(err);
        });

      getNewSong()
        .then((data)=>{
          // this.songs = data.result;
          console.log(data.result);
          let list = [];
          data.result.forEach(value =>{
            let obj = {};
            obj.id = value.id;
            obj.name = value.name;
            obj.picUrl = value.picUrl;
            let singer = '';
            for (let i = 0; i < value.song['artists'].length; i++){
              if (i === 0){
                  singer = value.song['artists'][i].name;
              } else{
                  singer += '-' + value.song['artists'][i].name;
              }
            }
            obj.singer = singer;
            list.push(obj);
          });
          this.songs = list;
        })
        .catch((err)=>{
          console.log(err);
        });
    }
  }
  // var queryShopCommodityDetail = function queryShopCommodityDetail(param) {
  //   return _request2.default.get(Object.assign({}, { url: "/shopCommodity/queryShopCommodityDetail" }, param));
  // };
</script>

<style scoped lang="scss">
.recommend{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 184px;
  overflow: hidden;
}
.v-enter{
    transform:translateX(100%);
}
.v-enter-active{
    transition: transform 1s;
}
.v-enter-to{
  transform:translateX(0%);
}
.v-leave{
  transform:translateX(0%);
}
.v-leave-active{
  transition: transform 1s;
}
.v-leave-to{
  transform:translateX(100%);
}
</style>
