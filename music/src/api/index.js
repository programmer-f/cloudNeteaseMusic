//这个文件就是用来管理请求各种接口地址的
import Network from './network'


export const getBanner = ()=> Network.get('banner?type=2');
export const getPersonalized = ()=> Network.get('personalized?limit=6');
export const getNewAlbum = ()=> Network.get('album/newest');
export const getNewSong = ()=> Network.get('personalized/newsong');
export const getPlayList = (data)=> Network.get('playlist/detail',data);//歌单 榜单用的都是这个接口
export const getAlbum = (data)=> Network.get('album',data);
export const getSongDetail = (data)=> Network.get('song/detail',data);
export const getSongLyric = (data)=> Network.get('lyric',data);
export const getSongURL = (data)=> Network.get('song/url',data);
export const getArtistsSongs = (data)=> Network.get('artists',data);
export const getSearchList = (data)=> Network.get('search?type=1',data);
export const getSearchHot = ()=> Network.get('search/hot');
export const getHotArtists = ()=> {
  return new Promise(((resolve, reject) => {
    Network.get('/top/artists?offset=0&limit=5')
      .then(({artists})=>{
          resolve(artists);
      })
      .catch(err=>{
          reject(err);
      })
  }))
};
export const getLetterArtists = (letter)=>{
  return new Promise(((resolve, reject) => {
    let letterArtists = [];
      Network.all([
        Network.get(`/artist/list?offset=0&limit=5&type=1&area=7&initial=${letter}`),
        Network.get(`/artist/list?offset=0&limit=5&type=2&area=7&initial=${letter}`),
        Network.get(`/artist/list?offset=0&limit=5&type=3&area=7&initial=${letter}`),
        Network.get(`/artist/list?offset=0&limit=5&type=1&area=96&initial=${letter}`),
        Network.get(`/artist/list?offset=0&limit=5&type=2&area=96&initial=${letter}`),
        Network.get(`/artist/list?offset=0&limit=5&type=3&area=96&initial=${letter}`),
      ])
        .then(res=>{
          res.forEach(item =>{
            letterArtists.push(...item.artists);
          });
          resolve(letterArtists);
        })
        .catch(err=>{
          reject(err);
        })
  }))
};
export const getAllArtists = ()=>{
  return new Promise((resolve,reject)=>{
    let keys = ['热'];
    let list = [getHotArtists()];
    for (let i = 65; i < 91; i++){
      let char = String.fromCharCode(i);
      keys.push(char);
      list.push(getLetterArtists(char));
    }
    Network.all(list)
      .then(res=>{
        // resolve(res);
        // console.log(res);
        let obj = {};
        obj.keys = keys;
        obj.list = res;
        resolve(obj);
      })
      .catch(err=>{
        reject(err);
      })
  });

};
export const getTopListDetail = ()=>{
  return new Promise((resolve,reject)=>{
    let category = {
      officialList: [
        { name: '云音乐飙升榜'},
        { name: '云音乐新歌榜'},
        { name: '网易原创歌曲榜'},
        { name: '云音乐热歌榜'}
      ],
      recList: [
        { name: '云音乐说唱榜'},
        { name: '云音乐电音榜'},
        { name: '云音乐欧美新歌榜'},
        { name: '抖音排行榜'},
        { name: '云音乐ACG音乐榜'},
        { name: '云音乐古典音乐榜'}
      ],
      globalList: [
        { name: '美国Billboard周榜'},
        { name: 'UK排行榜周榜'},
        { name: 'Beatport全球电子舞曲榜'},
        // { name: '日本Oricon周榜', id: 10 },
        { name: '日本Oricon数字单曲周榜'},
        { name: 'iTunes榜'},
        { name: '英国Q杂志中文版周榜'}
      ],
      otherList: [
        { name: 'KTV唛榜'},
        { name: '法国 NRJ Vos Hits 周榜'},
        { name: '新声榜'},
        { name: '云音乐韩语榜'},
        { name: '电竞音乐榜'},
        { name: '云音乐欧美热歌榜'}
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    };
    Network.get('toplist/detail')
      .then(data=>{
        data.list.forEach(obj=>{
          let flag = false;
          for (let key in category){
            for (let i =0; i< category[key].length;i++){
              if (category[key][i].name === obj.name){
                category[key][i].rank = obj;
                flag = true;
                break;
              }
            }
            if (flag){
              break;
            }
          }
        });
        for (let key in category){
          if (key !== 'titles') {
                category[key].forEach((item,index)=>{
                  if (item.rank === undefined){
                    category[key].splice(index,1);
                    // console.log('没有该榜单数据');
                  }
                })
          }
        }
        resolve(category);
      })
      .catch(err=>{
        reject(err);
      })
  })
};
