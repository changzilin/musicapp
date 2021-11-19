<template>
  <div class="playList" v-show="playList.coverImgUrl">
    <div class="playListTop">
      <div class="playLeft">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <div>播放全部<span>(共{{countFormat(playList.tracks.length)}}首)</span></div>
      </div>
      <div class="btnR">
        + 收藏({{countFormat(playList.subscribedCount)}})
      </div>
    </div>
    <div class="list">
      <MusicList
      v-for="(item,i) in playList.tracks"
      :key="item.id"
      :count="i+1"
      :name="item.name"
      :anthors="item.ar"
      :item="item"
      :isShow="true"
      ></MusicList>
    </div>
  </div>
  
</template>

<script>
import store from '@/store/index.js'
import {countFormat} from '@/hooks/countFormat.js'
import MusicList from '@/components/MusicList.vue'
export default {
  name:'PlayList',
  props:['playList'],
  components:{
    MusicList
  },
  setup(){

    return {
      countFormat
    }
  }

}
</script>

<style lang="less" scoped>
.playList{
  padding:0 0.2rem;
  margin-top:0.2rem;
  background: #fff;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  .playListTop{
    display:flex;
    height:0.8rem;
    justify-content: space-between;
    align-items:center;
    .playLeft{
      display:flex;
      align-items:center;
      .icon{
        width:0.4rem;
        height:0.4rem;
      }
      div{
        margin-left: 0.3rem;
        font-size:0.29rem;
        font-weight: 700;
        span{
          font-size:0.2rem;
          color:#a7a7a7;
        }
      }
    }
    // 收藏样式
    .btnR{
      color:#fff;
      background-color:#ff6000;
      height:0.6rem;
      font-size:0.18rem;
      line-height:0.6rem;
      padding:0 0.1rem;
      border-radius:0.3rem;
    }
  }
  // 音乐项样式
  .list{
    padding-bottom:1.313rem;
    .playItem{
      display: flex;
      justify-content:space-between;
      align-items: center;
      padding:0.25rem 0;
      .ItemL{
        display: flex;
        align-items: center;
        .index{
          font-size:0.5rem;
          color:#e1dddd;
          min-width:0.53rem;
          text-align: center;
        }
        .content{
          margin-left: 0.2rem;
          display: flex;
          flex-direction: column;
          .title{
            
            overflow: hidden;
            text-overflow:ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .anthor{
            font-size:0.2rem;
            color:#a7a7a7;
          }
        }
      }
      .ItemR{
        width:0.9rem;
        display: flex;
        .icon{
          width:0.38rem;
          height:0.38rem;
        }
        .icon:nth-child(1){
          margin-right:0.1rem;
        }
      }
    }
  }
}

</style>