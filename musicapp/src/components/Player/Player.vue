<template>
  <div class="playController" v-if="list">
    <div class="ControllerItem">
      <div class="ItemL" @click="show=!show">
        <img :src="list.al.picUrl" />
        <div class="content">
          <div class="name">{{list.name}}</div>
          <div class="info">横滑可切换上下首</div>
        </div>
      </div>
      <div class="ItemR">
        <svg class="icon" aria-hidden="true" v-if="flag" @click="playMusic">
          <use xlink:href="#icon-bofangbeifen14"></use>
        </svg>
        <svg class="icon" aria-hidden="true" v-else @click="playMusic">
          <use xlink:href="#icon-bofangbeifen13"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="isShowList">
          <use xlink:href="#icon-yinlebofangqi"></use>
        </svg>
        <van-popup
          v-model:show="showList"
          closeable
          position="bottom"
          :style="{ height: '60%' }"
        >
          <div class="list">
            <div>
              <svg class="iconClear" aria-hidden="true" @click="clearList" >
                <use xlink:href="#icon-shanchu"></use>
              </svg>
            </div>
            <MusicList 
            v-for="(item,i) in playlist"
            :key="i"
            :count="++i"
            :name="item.name"
            :anthors="item.ar"
            :item="item"
            >
            </MusicList>
            
          </div>
        </van-popup>
      </div>
      <PlayContent 
      v-show="show"
      :picUrl="list.al.picUrl"
      :name="list.name"
      :authors="list.ar"
      :isShowList="isShowList"
      :isShow="false"
      @back="show=!show">
      </PlayContent>
    </div>
  </div>
</template>

<script>
import {computed,ref} from 'vue'
import PlayContent from '@/components/Player/PlayContent.vue'
import MusicList from '@/components/MusicList.vue'
import store from '@/store/index.js'
export default {
  name:'Player',
  components:{
    PlayContent,
    MusicList
  },
  setup(){
    // 是否显示歌单
    let showList=ref(false)
    // 当前播放状态
    let flag=computed(() => store.state.flag)
    // 当前正在播放的音乐
    let list=computed(() => store.state.nowPlay)
    // 音乐列表
    let playlist=computed(() => store.state.playlist)
    

    let show=ref(show)
    // 创建之前加载歌词
    store.dispatch('requestLyric',list.value.id)

    // 显示/隐藏音乐列表
    function isShowList(){
      showList.value=!showList.value
    }

    // 播放&暂停音乐
    function playMusic(){
      if(flag.value){
        store.dispatch('playMusic',{isPlay:false,id:list.value.id})
      }else{
        store.dispatch('playMusic',{isPlay:true,isPlayer:true,id:list.value.id})
      }
    }

    // 清空音乐列表
    function clearList(){
      store.commit('clearList')
    }
   
    return {
      list,
      showList,
      flag,
      show,
      playlist,
      isShowList,
      clearList,
      playMusic
    }
  },
}
</script>

<style lang="less" scoped>
.playController {
  position: fixed;
  bottom: 0;
  padding: 0 0.2rem;
  background-color: #fff;
  box-shadow: -3px 2px 4px #888888;
  z-index:2;
  .ControllerItem {
    width: 7.1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.15rem 0;
    height:1.3rem;
    .ItemL {
      display: flex;
      align-items: center;
      img {
        width: 1rem;
        height: 1rem;
        border-radius: 0.5rem;
      }
      .content {
        margin-left: 0.2rem;
        display: flex;
        flex-direction: column;
        .name {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .info {
          font-size: 0.2rem;
          color: #a7a7a7;
        }
      }
    }
    .ItemR {
      display: flex;
      .icon {
        width: 0.8rem;
        height: 0.8rem;
      }
      .icon:nth-child(1) {
        margin-right: 0.24rem;
      }
      .list{
        padding:0.3rem 0.2rem 0 0.2rem;
        div{
          .iconClear{
            width:0.45rem;
            height:0.45rem;
          }
        }
      }
    }
  }
}
</style>
