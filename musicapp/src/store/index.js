import { createStore } from 'vuex'
import {getLyric,phoneLogin,getPlayListInfo} from '@/api/imdex.js'

export default createStore({
  state: {
    // 保存歌词
    lyric:{lyric:'歌词'},
    // 音乐当前的位置/秒
    currentTime:0,
    // 定时器的id
    intervalId:0,
    // 用户是否登录
    user:{
      isLogin:false,
      userInfo:{}
    },
    // 当前播放状态
    flag:false,
    // 保存音乐列表
    musicList:{},
    // 数据是否更新完成
    isUpdate:false,
    // 保存播放的音乐
    audio:null,
    // 当前正在播放的音乐
    nowPlay:{
      name:'盛夏',
      id:569212211,
      al:{picUrl:'http://p4.music.126.net/vmCcDvD1H04e9gm97xsCqg==/109951163350929740.jpg'},
      ar:[{name:'毛不易'}]
    },
    // 保存好音乐
    goodList:[],
    // 初次播放
    first:true,
    // 音乐列表是否初次渲染
    isFirstMount:true,
    // 当前是否直接切歌
    isSwitch:false,
    // 定时器的累加值
    musicTime:0,
    // 播放列表
    playlist:[]
  },
  mutations: {
    // 清空音乐列表
    clearList(state,value){
      if(state.playlist.length>1){
        state.playlist.splice(0,state.playlist.length-1)
      }
    },
    // 设置播放列表
    addMusic(state,value){
      let result=state.playlist.some((item,i) =>{
        return item.id==value.id
      })
      result? '': state.playlist.push(value)
    },
    // 设置定时器的累加值
    setMusicTime(state,value){
      state.musicTime=value
    },
    // 修改定时器的id
    setIntervalId(state,value){
      state.intervalId=value
    },
    // 修改初次挂载状态
    setIsFirstMount(state,value){
      state.isFirstMount=false
    },
    // 修改好歌单
    setGoodList(state,value){
      state.goodList=value
    },
    // 修改歌词
    setLyric(state,value){
      state.lyric=value
    },
    // 设置时间
    setCurrentTime(state,value){
      state.currentTime=value
    },
    // 修改用户状态
    setUser(state,value){
      // 判断是否退出
      if(value.isQuit){
        state.user.isLogin=false
      }
      state.user.userInfo=value.info
      state.user.isLogin=value.isLogin
    },
    // 修改音乐列表
    setMusicList(state,value){
      state.musicList=value
      state.isUpdate=true
    },
    // 当前正在播放的音乐
    setNowPlay(state,value){
      state.nowPlay=value
      // 检测是否有重复
      let isValue=state.playlist.some((item) =>{
        return value.id==item.id
      })
      if(!isValue){
        // 添加到音乐列表
        state.playlist.push(value)
      }
    },


  },
  actions: {
    // 根据正在播放的音乐id请求歌词
    async requestLyric(content,payload){
      let result=await getLyric(payload)
      content.commit('setLyric',result.data.lrc)
    },
    // 登录
    async login(content,payload){
      let result=await phoneLogin(payload.phone.value,payload.password.value)
      if(result.data.code==200){
        content.state.user.isLogin=true
        content.state.user.userInfo=result.data
        // 把登录的用户信息存储到缓存
        localStorage.user=JSON.stringify(content.state.user)
      }
      return result
    },

    // 根据id调用获取推荐的音乐列表
    async getMusicList(content,payload){
      let musicList=await getPlayListInfo(payload)
      content.commit('setMusicList',musicList.data.playlist)
    },
    
    // 播放或暂停音乐
    playMusic(content,payload){
      let musicSrc=`https://music.163.com/song/media/outer/url?id=${payload.id}`
      // 当前的音乐id
      let nowId=content.state.nowPlay.id
      // 是否播放
      if(payload.isPlay){
        // 暂停后继续播放
        if(payload.isPlayer){
          // 初次播放
          if(content.state.first){
            content.state.audio=new Audio(`https://music.163.com/song/media/outer/url?id=${nowId}`)
            content.state.audio.play()
            content.state.first=false
            content.state.flag=true
            // 获取歌词
            content.dispatch('requestLyric',content.state.nowPlay.id)
          }else{
            content.state.audio.play()
            content.state.flag=true
          }
        }else{
          // 当点击播放后再判断当前播放状态，如果是播放就先暂停后重新播放另外一首
          if(content.state.audio != null){
            content.state.audio.pause()
            content.state.audio=null
          }
          content.state.audio=new Audio()
          content.state.audio.src=musicSrc
          content.state.audio.play()
          content.state.flag=true
          // 如果直接点击切换歌曲就重新启动定时器
          clearInterval(content.state.intervalId)
          content.state.isSwitch=!content.state.isSwitch
          content.commit('setMusicTime',0)
          // 获取歌词
          content.dispatch('requestLyric',payload.id)
        }
      }else{
        // 播放完毕自动结束
        if(payload.end){
          // 清除上一次的定时器
          clearInterval(content.state.intervalId)
          content.commit('setMusicTime',0)
          content.state.audio.pause()
          content.state.flag=false
        }else{
          // 暂停音乐
          clearInterval(content.state.intervalId)
          // 把定时器累加值修改为当前音乐的时间
          content.commit('setMusicTime',content.state.audio.currentTime)
          content.state.audio.pause()
          content.state.flag=false
        } 
      }
    }
  },
  modules: {
  },
  getters:{
    // 格式化歌词
    lyricList(state){
      let arr=state.lyric.lyric.split(/\n/igs).map((item,i,arr) =>{
        let min=parseInt(item.slice(1,3))
        let sec=parseInt(item.slice(4,6))
        let mill=parseInt(item.substr(7,item.indexOf("]")))
        // 上一个值
        return {min,sec,mill,lyric:item.slice(11,item.length),
          item,time:sec+min*60} 
      })
      return arr
    }
    
  }
})
