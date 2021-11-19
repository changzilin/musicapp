import store from '@/store/index.js'
import {getPlayListInfo} from '@/api/imdex.js'
export function randomMusic(){
  let list=[]
  // 歌单
  let goodMusic=store.state.goodList
  // 歌单长度
  let length=goodMusic.length
  // 随机的歌单id
  let goodId=goodMusic[parseInt(Math.random()*length)].id
  // 根据随机的歌单id，随机获取音乐
  getPlayListInfo(goodId).then((res) =>{
    list=res.data.playlist.tracks
    let index=parseInt(Math.random()*list.length)
    store.commit('setNowPlay',list[index])
  })
  
}