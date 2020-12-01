<template>
  <div class="rank">
    <ScrollView>
      <ul>
        <li v-for="(value,key) in category.titles" :key="key">
          <h3 class="group-title">{{value}}</h3>
          <ul class="normal-group" v-if="value === '官方榜'">
            <li v-for="obj in category[key]" :key="obj.rank.id" @click.stop="selectedItem(obj.rank.id)">
              <div class="rank-left">
                <img v-lazy="obj.rank.coverImgUrl" alt="">
                <p>{{obj.rank.updateFrequency}}</p>
              </div>
              <div class="rank-right">
                <p v-for="(song,index) in obj.rank.tracks" :key="index">
                  {{index}}.{{song.first}}-{{song.second}}
                </p>
              </div>
            </li>
          </ul>
          <ul class="other-group" v-else>
            <li v-for="obj in category[key]" :key="obj.rank.id" @click.stop="selectedItem(obj.rank.id)">
              <div class="rank-top">
                <img v-lazy="obj.rank.coverImgUrl" alt="">
                <p>{{obj.rank.updateFrequency}}</p>
              </div>
              <div class="rank-bottom">
                <p>{{obj.rank.name}}</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </ScrollView>
    <transition>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {getTopListDetail} from '../api/index'
  import ScrollView from '../components/ScrollView'
  export default {
    name: "Rank",
    components:{
      ScrollView
    },
    data(){
      return{
        category:{}
      }
    },
    methods:{
      selectedItem(id){
        this.$router.push(`/rank/detail/${id}/rank`);
      }
    },
    created() {
      getTopListDetail()
        .then(res => {
          this.category = res;
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  @import '../assets/css/variable';
.rank{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  @include bg_sub_color();
  .group-title{
    padding: 10px 20px;
    @include font_size($font_large);
    @include font_color();
    font-weight: bold;
  }
  .normal-group{
    li{
      display: flex;
      align-items: center;
      padding: 10px 20px;
      box-sizing: border-box;
      .rank-left{
        position: relative;
        img{
          width: 200px;
          height: 200px;
          border-radius:10px;
        }
        p{
          position: absolute;
          left: 10px;
          bottom: 10px;
          color: #fff;
          @include font_size($font_medium_s)
        }
      }
      .rank-right{
        margin-left: 20px;
        p{
          @include font_color();
          @include font_size($font_medium_s);
          padding: 10px 0;
        }
      }
    }
  }
  .other-group{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    li{
      padding: 10px 20px;
      box-sizing: border-box;
      .rank-top{
        position: relative;
        img{
          width: 200px;
          height: 200px;
          border-radius:10px;
        }
        p{
          position: absolute;
          left: 10px;
          bottom: 10px;
          color: #fff;
          @include font_size($font_medium_s)
        }
      }
      .rank-bottom{
        width: 200px;
        @include no-wrap();
        text-align: center;
        p{
          @include font_color();
          @include font_size($font_medium_s);
          padding: 10px 0;
        }
      }
    }
  }
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
