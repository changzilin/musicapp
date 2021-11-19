<template>
  <div class="musicList">
    <div class="musicList-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="myList">
      <van-swipe :loop="false" :width="w" :show-indicators="false">
        <!-- <van-swipe-item v-for="item in mList.musicList" :key="item.id" @click="resetIndex"> -->
        <van-swipe-item v-for="item in mList.musicList" :key="item.id" @click="getList(item.id)">
          <router-link to="/ListView">
            <img :src="item.picUrl" :alt="item.name" />
            <div class="name">{{ item.name }}</div>
            <div class="count">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-bofang3"></use>
              </svg>
              {{ countFormat(item.playCount) }}
            </div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import store from '@/store/index.js'
import { getMusicList } from '@/api/imdex.js'
import { reactive, ref } from 'vue'
import { countFormat } from '@/hooks/countFormat.js'
import { getScreenSize } from '@/hooks/getWiindowSize.js'
import { randomMusic } from '@/hooks/randomMusic.js'
export default {
  name: 'MusicSwipe',
  setup() {
    let w = ref(getScreenSize())

    // 屏幕宽度变换的时候
    window.addEventListener('resize', () => {
      w.value = getScreenSize()
    })

    let mList = reactive({
      musicList: []
    })

    // 调用API获取音乐列表名称及图片和播放量
    getMusicList(10).then((result) => {
      mList.musicList = result.data.result
      store.commit('setGoodList', mList.musicList)
      // 判断是否初次挂载，初次就改变值。避免重复改变现在播放的音乐
      if (store.state.isFirstMount) {
        store.commit('setIsFirstMount')
        // 获取歌单后调用方法随机获取歌曲
        randomMusic()
      }
    })

    // 点击的时候调用API获取推荐音乐列表
    function getList(id) {
      store.dispatch('getMusicList', id)
    }

    return {
      w,
      mList,
      getList,
      countFormat
    }
  }
}
</script>

<style lang="less" scoped>
.musicList {
  padding: 0 0.2rem;
  // margin-bottom:1rem;
  .musicList-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.8rem;
    .title {
      font-size: 0.4rem;
      font-weight: 800;
    }
    .more {
      border: 0.02rem solid #ccc;
      padding: 0.06rem;
      border-radius: 0.2rem;
      font-size: 0.2rem;
      text-align: center;
    }
  }
  .myList {
    margin-bottom: 1.5rem;
    .van-swipe {
      .van-swipe-item {
        margin-right: 0.28rem;
        width: 2rem;
        display: flex;
        flex-direction: column;
        position: relative;
        img {
          width: 100%;
          height: auto;
          border: 1px solid #e7e5e5;
        }
        .name {
          width: 100%;
          font-size: 0.2rem;
          line-height: 0.35rem;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          margin-top: 0.1rem;
          color: #333;
        }
        .count {
          position: absolute;
          right: 0.1rem;
          top: 0.1rem;
          font-size: 0.24rem;
          color: #efe6e6;
          display: flex;
          align-items: center;
          .icon {
            color: #ccc;
          }
        }
      }
    }
  }
}
</style>
