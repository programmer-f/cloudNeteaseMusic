import {
  SET_FULL_SCREEN,
  SET_MINI_PLAYER,
  SET_IS_PLAYING,
  SET_MODE_TYPE,
  SET_LIST_PLAYER,
  SET_SONG_DETAIL,
  SET_SONG_LYRIC,
  SET_DEL_SONG,
  SET_CURRENT_INDEX,
  SET_CURRENT_TIME,
  SET_FAVORITE_SONG,
  SET_FAVORITE_LIST,
  SET_HISTORY_SONG,
  SET_HISTORY_LIST
} from './mutations-type'


//actions里面的方法仅仅用来触发mutations里面的方法，所有的逻辑处理都在mutations里面
//在发送请求的方法里面可以进行数据的处理
import {
  getSongDetail,
  getSongLyric,
  getSongURL
} from '../api/index'
export default {
  setFullScreen({commit},flag){
    commit(SET_FULL_SCREEN,flag);
  },
  setMiniPlayer({commit},flag){
    commit(SET_MINI_PLAYER,flag);
  },
  setListPlayer({commit},flag){
    commit(SET_LIST_PLAYER,flag);
  },
  setIsPlaying({commit},flag){
    commit(SET_IS_PLAYING,flag);
  },
  setModeType({commit},flag){
    commit(SET_MODE_TYPE,flag);
  },
  async setSongDetail({commit},ids){
    //发送请求获取歌曲详情信息
    let result = await getSongDetail({ids:ids.join(',')});
    let urls = await getSongURL({id:ids.join(',')});
    let list = [];
    result.songs.forEach((value,index)=>{
      let obj = {};
      let singer = '';
      obj.id = value.id;
      obj.name = value.name;
      // obj.url = urls.data[index].url;
      for (let j = 0;j < urls.data.length;j++){
            let item = urls.data[j];
            if (value.id === item.id){
              obj.url = item.url;
              //赋完值之后就没有必要遍历了
              break;
            }
      }
      value['ar'].forEach((item,index)=>{
        if (index === 0){
          singer = item.name;
        } else{
          singer += '-' + item.name;
        }
      });
      obj.singer = singer;
      obj.picUrl = value['al'].picUrl;
      //添加到数组里面
      list.push(obj);
    });
    commit(SET_SONG_DETAIL,list);
  },
  async getSongLyric({commit},id){
    try{
      let result = await getSongLyric({id:id});
      let obj = parseLyric(result.lrc.lyric);
      commit(SET_SONG_LYRIC,obj);
    }catch(err){
      console.log('can not get lyric',err);
    }

  },
  setDelSong({commit},index){
    commit(SET_DEL_SONG,index);
  },
  setCurrentIndex({commit},index){
    commit(SET_CURRENT_INDEX,index);
  },
  setCurrentTime({commit},time){
    commit(SET_CURRENT_TIME,time);
  },
  setFavoriteSong({commit},song){
    commit(SET_FAVORITE_SONG,song);
  },
  setFavoriteList({commit},list){
    commit(SET_FAVORITE_LIST,list);
  },
  setHistorySong({commit},song){
    commit(SET_HISTORY_SONG,song);
  },
  setHistoryList({commit},list){
    commit(SET_HISTORY_LIST,list);
  }
}



// 格式化歌词方法
function parseLyric (lrc) {
  let lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  let reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  let reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  let reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  let lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    let minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    let secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    let time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    let text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
