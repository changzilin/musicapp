<template>
  <div class="listViewTop" v-show="playList.coverImgUrl">
    <img :src="playList.coverImgUrl" class="bg">
    <div class="listViewTopNav">
      <div class="left">
        <svg class="icon" aria-hidden="true" @click="$router.back()">
          <use xlink:href="#icon-60fanhui-1"></use>
        </svg>
        <span class="title">歌单</span>
      </div>
      <div class="right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sandian4"></use>
        </svg>
      </div> 
    </div>
    <div class="musicInfo">
      <div class="musicInfoLeft">
        <img :src="playList.coverImgUrl">
        <div class="count">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofang3"></use>
          </svg>
        <span>{{countFormat(playList.playCount)}}</span>
        </div>
      </div>
      <div class="musicInfoRight">
        <h3>{{playList.name}}</h3>
        <div class="author">
          <img :src="playList.creator.avatarUrl">
          <span>{{playList.creator.nickname}}</span>
        </div>
        <div class="authorInfo">
          <span>{{playList.description}}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
      </div>
    </div>
    <!-- 图标列表 -->
    <div class="iconList">
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31pinglun"></use>
        </svg>
        <span>{{countFormat(playList.commentCount)}}</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31fenxiang"></use>
        </svg>
        <span>{{countFormat(playList.shareCount)}}</span>
      </div>
      <div class="iconItem" @click="xiazai">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai_huiyuan_52"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="iconItem">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-quanxuan"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
  
</template>

<script>
import {countFormat} from '@/hooks/countFormat.js'
export default {
  name:'ListViewTop',
  props:['playList'],
  setup(){
    function xiazai(){
      window.location.href="https://bsppub.oss-cn-shanghai.aliyuncs.com/VKCEYUGU-92a5e82c-b257-4c8f-82ac-5b4a61ca3027/fd74c062-ffa8-48a6-a8a7-cd6cfd95b9e9.apk"
    }
    return {
      countFormat,
      xiazai
    }
  },
  
}
</script>

<style lang="less" scoped>
.listViewTop{
  padding:0 0.2rem;
  .bg{
    width: 100%;
    position: fixed;
    top:0;
    left:0;
    z-index:-1;
    filter:blur(40px)
  }
  .listViewTopNav{
    height:1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      display: flex;
      align-items: center;
      .icon{
        width:0.5rem;
        height:0.5rem;
        color:#fff;
      }
      .title{
        color:#fff;
        margin-left:0.4rem;
      }
    }

    .right{
      .icon{
        color:#fff;
        width:0.4rem;
        height:0.4rem;
      }
      .icon:nth-child(1){
        margin-right:0.4rem; 
      }

    }
  }
  .musicInfo{
    display: flex;
    justify-content: space-between;
    padding:0.2rem 0;
    .musicInfoLeft{
      position: relative;
      img{
        width:2.8rem;
        height:2.8rem;
        border-radius:0.08rem;
      }
      .count{
        position: absolute;
        right: 0.1rem;
        top: 0.1rem;
        font-size: 0.24rem;
        color:#efe6e6;
        display:flex;
        align-items:center;
        
     
      }
       
    }
    // 作者信息样式
    .musicInfoRight{
      width:4rem;
      display: flex;
      height:2.7rem;
      flex-direction:column;
      justify-content:space-between;
      h3{
        color:white;
        overflow: hidden;
        text-overflow:ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .author{
        display:flex;
        align-items: center;
        // margin:0.3rem 0;
        img{
          width:0.5rem;
          height:0.5rem;
          border-radius: 0.5rem;;
        }
        span{
          color: rgb(226, 224, 224);
          margin-left:0.07rem;
        }
      }
      // 歌单介绍
      .authorInfo{
        display: flex;
        align-items:center;
        span{
          font-size:0.2rem;
          color:#ccc;
          overflow: hidden;
          text-overflow:ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          width:3.5rem;
        }
        .icon{
          width:0.4rem;
          height:0.5rem;
        }
      }
    }
  }
  // 图标列表样式
  .iconList{
    display: flex;
    justify-content: space-around;
    .iconItem{
      display: flex;
      flex-direction:column;
      color:#fff;
      align-items:center;
      .icon{
        width:0.6rem;
        height:0.6rem;
        fill:#fff;
      }
      span{
        font-size:0.25rem;
      }
    }
  }
}

</style>