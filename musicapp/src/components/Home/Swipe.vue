<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#00ffdd">
    <van-swipe-item v-for="(item,index) in arr.imgs" :key="index"><img :src="item.pic"></van-swipe-item>
  </van-swipe>
</template>

<script>
import {getBannerImg} from '@/api/imdex.js'
import {reactive} from 'vue'
export default {
  name:'Swipe',
  setup(){
    // 调用API方法获取轮播图片
    getBannerImg(1).then(res =>{
      arr.imgs=res.data.banners
    })
    // 轮播初始图片
    let arr = reactive({
      imgs:[
        {pic:require('@/assets/img/swipe1.jpeg')},
        {pic:require('@/assets/img/swipe2.jpg')},
        {pic:require('@/assets/img/swipe3.jpg')},
        {pic:require('@/assets/img/swipe4.jpeg')},
      ]
    })
  
    return {
      arr
    }
  }
}
</script>

<style lang="less" scoped>
.my-swipe{
  height:3rem;
  margin:0 0.2rem;
  border-radius: 0.2rem;
  }
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  img{
    width: 100%;
    height:3rem;
  }
}

</style>