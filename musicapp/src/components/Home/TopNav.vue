<template>
  <div class="topNav">
    <div class="topLeft">
      <svg class="icon" aria-hidden="true" @click="about">
        <use xlink:href="#icon-24gl-playlistHeart2"></use>
      </svg>
    </div>
    <div class="topCenter">
      <span class="navBtn" @click="$router.push('/me')">我的</span>
      <span class="navBtn active">发现</span>
      <span class="navBtn">云村</span>
      <span class="navBtn">视频</span>
    </div>
    <div class="topRight">
      <svg class="icon search" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  name:'TopNav',
  setup(){
    // 关于
    function about(){
      Dialog({ 
        title:'网易云音乐Node.js版',
        allowHtml:true,
        message: '58890733@qq.com\n<a href="https://github.com/58890733/musicapp" target="_blank">github仓库</a>\n<a href="https://neteasecloudmusicapi.vercel.app" target="_blank">参考</a>\n<a href="https://bsppub.oss-cn-shanghai.aliyuncs.com/VKCEYUGU-92a5e82c-b257-4c8f-82ac-5b4a61ca3027/fd74c062-ffa8-48a6-a8a7-cd6cfd95b9e9.apk">下载应用</a>',
      })
    }

    return{
      about
    }
  }
}
</script>

<style lang="less" scoped>
  .topNav{
    height:1rem ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.2rem;
    .icon{
      width:0.5rem;
      height:0.5rem;
    }
    .search{
      width:0.45rem;
      height:0.45rem;
    }
    .topCenter{
      line-height: 0.5rem;
      width:4.5rem;
      display:flex;
      justify-content:space-around;
      .active{
        font-weight:700;
        font-size: 0.35rem;
      }
    }
  }

</style>
