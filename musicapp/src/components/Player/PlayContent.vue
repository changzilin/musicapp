<template>
  <div class="playMusic">
    <div class="bg" :style="{backgroundImage:`url(${picUrl})`}"></div>
    <div class="playTop">
      <div class="topLeft">
        <div class="back">
          <svg class="icon" aria-hidden="true" @click="$emit('back')">
            <use xlink:href="#icon-60fanhui-1"></use>
          </svg>
        </div>
        <div class="center">
          <div class="title">
            <div class="marquee">{{name}}</div>
          </div>
          <div class="author">    <!-- v-show="item.id>10" 避免出现空的作者，最多显示3位作者-->
            <div v-for="(item,i) in authors" :key="item.id" v-show="item.id>10 && i<3">{{item.name}}</div>
          </div>
        </div>
      </div>
      <div class="share">
        <svg class="icon" aria-hidden="true" @click="isShow=!isShow" :class="{activeIco:!isShow}">
          <use xlink:href="#icon-geciweidianji"></use>
        </svg>
      </div>
    </div>
    <div class="playContent" v-show="isShow">
      <img class="needle" :class="{active:flag}" src="@/assets/img/needle-ab.png" alt="图片请求错误">
      <img class="disc" :class="{rotate:flag}" src="@/assets/img/d7e4e3a244701ee85fecb5d4f6b5bd57.png" alt="图片请求错误">
      <img class="playImg" :class="{rotate:flag}" :src="picUrl" alt="图片请求错误">
    </div>
    <!-- 歌词部分 -->
    <div class="playLyric" v-show="!isShow" ref="playLyric">
      <p v-show="lyricList[0]" :class="{lyricNullActive:currentTime>=item.time}" v-for="(item,index) in lyricList" :key="index">{{item.lyric}}</p>
      <p v-show="!lyricList">无歌词</p>
    </div>
    <div class="playGress"></div>
    <div class="playFooter">
      <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <!-- 播放 -->
      <svg class="icon" aria-hidden="true" v-if="flag" @click="playMusic">
          <use xlink:href="#icon-bofang2"></use>
      </svg>
      <!-- 暂停 -->
      <svg class="icon" aria-hidden="true" v-else @click="playMusic">
          <use xlink:href="#icon-gl-playCircle"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="isShowList">
          <use xlink:href="#icon-gf-playlistMusic5"></use>
      </svg>
      
    </div>
  </div>
</template>

<script>
import {computed,ref,watch,onMounted} from 'vue'
import store from '@/store/index.js'
export default {
  name:'PlayContent',
  props:['picUrl','name','authors','isShowList'],
  setup(){
    // 切换显示歌词
    let isShow=ref(true)
    // 当前播放的音乐
    let nowPlay=computed(() => store.state.nowPlay)
    let flag=computed(() => store.state.flag)
    let isSwitch=computed(() => store.state.isSwitch)
    // 播放列表
    let playlist=computed(() => store.state.playlist)

    // 播放&暂停音乐
    function playMusic(){
      if(flag.value){
        store.dispatch('playMusic',{isPlay:false})
      }else{
        store.dispatch('playMusic',{isPlay:true,isPlayer:true})  
      }
    }

    // 获取歌词元素
    let playLyric=ref(null)

    // 歌词时间
    let currentTime=computed(() => store.state.currentTime)
    let lyricList=computed(() => store.getters.lyricList)
    let musicTime=computed(() => store.state.musicTime)
    
    // 监视音乐当前的播放状态
    onMounted(() =>{
        watch([flag,isSwitch],(newValue,oldValue) =>{
          if(flag.value){
            UpdateTime()
          }
        })
    })

    // 歌词现在的位置
    function UpdateTime(){
      let intervalId=setInterval(() =>{
        store.commit('setCurrentTime',store.state.audio.currentTime)
        let count=musicTime.value
        // 修改定时器的累加值
        store.commit('setMusicTime',++count)
        // 获取当前的歌词偏移位置
        let p=document.getElementsByClassName('lyricNullActive')
        if(p.length>0){
          // 获取最后一个p标签
          let offsetTop=p[p.length-1].offsetTop-100
          if(offsetTop<0 || offsetTop ==null){
            offsetTop=0
          }
          // 设置父级元素的偏移位置 父级元素不为空
          if(playLyric.value){
            playLyric.value.scrollTop=offsetTop
          }
        }
        //console.log("音乐时间：",store.state.audio.currentTime,"--定时器时间：",count)
        // currentTime 返回音频当前位置/秒，如果相差过大就停止播放
        if(musicTime.value-store.state.audio.currentTime>4){
          store.dispatch('playMusic',{isPlay:false,end:true})
        }
      },1000)
      // 设置定时器id
      store.commit('setIntervalId',intervalId)
    }

    // 切换歌曲
    function goPlay(count){
      let index=0
      playlist.value.forEach((item,i) =>{
        if(nowPlay.value.id==item.id){
          index=i
          return true
        }
      })
      // 前进&后退
      index+=count
      if(index>playlist.value.length-1){
        index=0
      }
      if(index<0){
        index=playlist.value.length-1
      }
      // 切换音乐
      store.commit('setNowPlay',playlist.value[index])
      store.dispatch('playMusic',{isPlay:true,isPlayer:false,id:playlist.value[index].id})
      
    }


    return {
      currentTime,
      playLyric,
      goPlay,
      lyricList,
      isShow,
      playMusic,
      flag
      
    }
  }
}
</script>

<style lang="less" scoped>
// 图片旋转
@keyframes rotation{
  from {-webkit-transform: rotate(0deg);}
  to {-webkit-transform: rotate(360deg);}
}
.playMusic{
  position:fixed;
  top:0;
  left:0;
  width:100vw;
  height:100vh;
  background-color:#c1b1b1;
  .bg{
    position:absolute;
    top:0;
    left:0;
    width:100vw;
    height:100vh;
    background-size: auto 100%;
    background-position:center;
    filter:blur(60px);
  }
  // 顶部样式
  .playTop{
    width:7.5rem;
    height:1rem;
    position:absolute;
    top:0;
    left: 0;
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
    color:#fff;
    padding-top:0.15rem;
    // 左侧样式
    .topLeft{
      display:flex;
      align-items: center;
      .back{
        margin-right:0.4rem;
        .icon{
          fill:#fff;
          width:0.5rem;
          height:0.5rem;
        } 
      }
      .center{
        .title{
          width:2.5rem;
          overflow: hidden;
          text-overflow:ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .author{
          font-size:0.2rem;
          color: #fff;
          display:flex;
          div{
            margin-right:0.1rem;
          }
        }
      }
      
    }
    // 分享图标样式
    .share{
      .icon{
        fill:#fff;
        width:0.5rem;
        height:0.5rem;
      }
      .activeIco{
        fill:#90ed0c;
      }
    } 
  }

  // 中间图片的样式
  .playContent{
    width:7.5rem;
    position:absolute;
    left:0;
    top:1rem;
    padding-top:0.15rem;
    .needle{
      width:2.5rem;
      height:auto;
      position:absolute;
      left:3.5rem;
      // 旋转远点方向
      transform-origin:0.3rem 0;
     
      transform:rotate(-15deg);
      // 过度效果
      transition:all 1s ;
      z-index:10;
    }
    .needle.active{
       transform:rotate(1deg);
      // 过度效果
      transition:all 1s ;
    }
    // 播放音乐的时候图片旋转
    .rotate{
      transform: rotate(360deg);
      animation: rotation 10s linear infinite;
    }
    .disc{
      position:absolute;
      width:5.5rem;
      height:auto;
      left: calc(50% - 2.75rem);
      top:2.3rem;
    }
    // 中间图片
    .playImg{
      width:3.6rem;
      height:3.6rem;
      border-radius:1.8rem;
      position:absolute;
      left: calc(50% - 1.8rem);
      top:3.25rem;
    }
  }

  // 底部样式
  .playFooter{
    width:7.5rem;
    height:1.3rem;
    position: absolute;
    left:0;
    bottom:0;
    display:flex;
    justify-content:space-around;
    align-items:center;
    padding:0 0.2rem 0.2rem 0.2rem;
    .icon{
      width:0.5rem;
      height:0.5rem;
      fill:#fff;
    }
    .icon:nth-child(3){
      width:0.9rem;
      height:0.9rem;
    }
  }
  // 歌词样式
  .playLyric{
    width:7.5rem;
    height:8rem;
    position:absolute;
    left:0;
    top:50%;
    transform:translateY(-50%);
    overflow:scroll;
    text-align:center;
    color:#fff;
    padding:0.2rem 0.4rem;
    font-size:0.32rem;
    .lyricNullActive{
      color:#90ed0c;
      
    }
  }
}
</style>