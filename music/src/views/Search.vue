<template>
  <div class="search">
    <div class="search-box">
      <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
      <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="keywords" v-throttle="search">
    </div>
    <div class="search-suggest" v-show="keywords !== ''">
      <ScrollView>
        <ul>
          <li v-for="item in songs" :key="item.id" @click.stop="selectMusic(item.id)">
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==" alt="">
            <p>{{item.name}} - {{item.artists[0].name}}</p>
          </li>
        </ul>
      </ScrollView>

    </div>
    <div class="search-hot">
      <h3>热门搜索</h3>
      <ul>
        <li v-for="value in hotSongs" :key="value.first" @click.stop="selectedHot(value.first)">{{value.first}}</li>
      </ul>
    </div>
    <ul class="search-history">
      <li v-for="value in searchHistory" :key="value">
        <div class="history-left">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+" alt="">
          <p>{{value}}</p>
        </div>
        <div class="history-right">
          <img @click.stop="delHistory(value)" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjOTk5ODk5IiBkPSJNMTMuMzc5IDEybDEwLjMzOCAxMC4zMzdhLjk3NS45NzUgMCAxIDEtMS4zNzggMS4zNzlMMTIuMDAxIDEzLjM3OCAxLjY2MyAyMy43MTZhLjk3NC45NzQgMCAxIDEtMS4zNzgtMS4zNzlMMTAuNjIzIDEyIC4yODUgMS42NjJBLjk3NC45NzQgMCAxIDEgMS42NjMuMjg0bDEwLjMzOCAxMC4zMzhMMjIuMzM5LjI4NGEuOTc0Ljk3NCAwIDEgMSAxLjM3OCAxLjM3OEwxMy4zNzkgMTIiLz48L3N2Zz4=" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import ScrollView from '../components/ScrollView'
  import { getSearchList,getSearchHot } from '../api/index'
  import { setLocalStorage,getLocalStorage } from "../tools/tools";

  export default {
    name: "Search",
    components: {
      ScrollView
    },
    data(){
      return{
        keywords:'',
        songs:[],
        hotSongs:[],
        searchHistory:[]
      }
    },
    methods:{
      ...mapActions([
        'setFullScreen',
        'setSongDetail'
      ]),
      selectedHot(value){
        this.keywords = value;
        this.search();
      },
      selectMusic(id){
        this.setFullScreen(true);
        this.setSongDetail([id]);
        if (this.searchHistory.includes(this.keywords)){
          return;
        }
        this.searchHistory.push(this.keywords);
        setLocalStorage('searchHistory',this.searchHistory);
        this.keywords = '';
      },
      search(){
        getSearchList({keywords:this.keywords})
          .then(data =>{
            this.songs = data.result.songs;
          })
          .catch(err=>{
            console.log(err);
          })
      },
      delHistory(value){
        this.searchHistory = this.searchHistory.filter(item =>{
          return item !== value;
        });
        setLocalStorage('searchHistory',this.searchHistory);
      }
    },
    created(){
      getSearchHot()
        .then(data=>{
          console.log(data);
          this.hotSongs = data.result.hots;
        })
        .catch(err=>{
          console.log(err);
        });

      if (getLocalStorage('searchHistory') === undefined || getLocalStorage('searchHistory') === null){
        return;
      }
      this.searchHistory = getLocalStorage('searchHistory');
    },
    directives: {
      throttle: {
        // 指令的定义
        inserted: function (el,obj) {
          let timerId = null;
          let flag = true;
          el.addEventListener('input',()=>{
            if (!flag) return;
            flag = false;
            timerId && clearTimeout(timerId);
            timerId = setTimeout(()=>{
              flag = true;
              // console.log(obj.value);
              obj.value();//相当于调用了传递的参数search()
            },1000)
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import '../assets/css/mixin';
  @import '../assets/css/variable';
.search{
  position: fixed;
  top: 184px;
  left: 0;
  right: 0;
  bottom: 0;
  @include bg_sub_color();
  .search-box{
    display: flex;
    align-items: center;
    margin: 40px 20px;
    background-color: #ebecec;
    border-radius:30px;
    border-bottom: 1px solid #ccc;
    img{
      width: 40px;
      height: 40px;
      margin-left: 20px;
    }
    input{
      height: 60px;
      width: 80%;
      margin-left: 20px;
      border:none;
      outline: none;
      background:transparent;
      @include font_size($font_medium);
    }
  }
  .search-suggest{
    overflow: hidden;
    position: fixed;
    left: 0;
    right: 0;
    top: 320px;
    bottom: 0;
    @include bg_sub_color();
    li{
      display: flex;
      align-items: center;
      padding: 20px 40px;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      img{
        width: 40px;
        height: 40px;
      }
      p{
        margin-left: 20px;
        @include font_color();
        @include font_size($font_medium);
      }
    }

  }
  .search-hot{
    h3{
      @include font_color();
      @include font_size($font_medium);
      padding: 10px 20px;
    }
    ul{
      display: flex;
      flex-wrap: wrap;
      li{
        height: 60px;
        line-height: 60px;
        border: 1px solid #ccc;
        border-radius:30px;
        padding: 0 20px;
        margin: 10px;
        @include font_color();
        @include font_size($font_medium_s);
      }
    }
  }
  .search-history{
    margin-top: 20px;
    li{
      padding: 30px 20px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      .history-left{
        display: flex;
        align-items: center;
        img{
          width: 40px;
          height: 40px;
        }
        p{
          @include font_color();
          @include font_size($font_medium_s);
          margin-left: 20px;
        }
      }
      .history-right{
        img{
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
