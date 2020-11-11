import modeType from "./modeType";

export default {
  isFullScreen:false,
  isShowMiniPlayer:false,
  isShowListPlayer:false,
  isPlaying:false,
  modeType:modeType.loop,
  //保存所有获取到的歌曲详情信息
  songs:[],
  currentSong:{},
  currentIndex:0,
  currentLyric:{},
  curTime:0,
  //收藏的歌曲
  favoriteList:[],
  //历史播放的歌曲
  historyList:[]
}
