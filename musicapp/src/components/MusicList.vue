<template>
  <!-- 音乐列表 -->
      <div class="playItem">
        <div class="ItemL">
          <div class="index">{{count}}</div>
          <div class="content">
            <div class="title">{{name}}</div>
            <div class="anthor" >   <!-- v-show="item.id>10" 避免出现空的作者，最多显示3位作者-->
              <div v-for="(item,i) in anthors" :key="item.id" v-show="item.id>10 && i<3">{{item.name}}</div>
            </div>
          </div>
        </div>
        <div class="ItemR">
          <svg class="icon" aria-hidden="true" @click="play(item.id,item)">
            <use xlink:href="#icon-kaishi"></use>
          </svg>
          <svg class="icon" aria-hidden="true" @click="addList(item)" v-if="isShow">
            <use xlink:href="#icon-tianjia"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-sandian2"></use>
          </svg>
        </div>
      </div>
</template>

<script>
import store from '@/store/index.js'
import {getAnthorInfo} from '@/api/imdex.js'
import { Toast } from 'vant'
export default {
  name:'MusicListtest',
  props:[
    'count',
    'name',
    'anthors',
    'item',
    'isShow'
  ],
  setup(){
    // 点击播放的时候，根据id播放对应的歌曲
    async function play(id,item){
      store.dispatch('playMusic',{id,isPlay:true,isPlayer:false})
      let musicObj={}
      // 判断当前要播放的音乐是搜索的音乐或推荐的音乐
      if(item.al){
        musicObj=item
      }else{
        // 获取搜索歌曲的歌手图片
        let {data} = await getAnthorInfo(item.artists[0].id)
        let url = data.data.artist.cover
        // 搜索的歌曲
        musicObj={
          al:{picUrl:url},
          name:item.name,
          ar:item.artists,
          id:item.id,
          arId:item.artists[0].id
        }
        
      }
      store.commit('setNowPlay',musicObj)
    }

    // 添加音乐
    function addList(item){
      store.commit('addMusic',item)
      Toast({
        message: '添加成功!',
        position: 'top',
        duration:800,
        icon:"passed",
      })
    }

    return {
      play,
      addList
    }
  }

}

</script>
<style lang="less" scoped>
// 音乐项样式
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
            display:flex;
            overflow: hidden;
            
            div{
              margin-right:0.1rem;
            }
          }
        }
      }
      .ItemR{
        display: flex;
        .icon{
          width:0.38rem;
          height:0.38rem;
          margin-left:0.15rem;
        }
      }
    }
</style>