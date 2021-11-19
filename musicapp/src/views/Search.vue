<template>
<div class="search">
  <div class="searchTop" >
    <div class="searchTopNav">
      <div class="left">
        <svg class="icon" aria-hidden="true" @click="$router.back()">
          <use xlink:href="#icon-60fanhui-1"></use>
        </svg>
      </div>
      <div class="right">
        <input type="text" v-model="searchKeyword" :placeholder="placeholder" @keydown.enter="saveKeyWord">
      </div> 
    </div>
    <div class="history">
      <div class="historyLeft">历史</div>
      <div class="historyRight">
        <div class="keyWordItem" v-for="(item,i) in keyWordList" :key="i" @click="historySearch(item)">{{item}}</div>
        <div class="keyWordItem" @click="reset" v-show="keyWordList.length>0">删除</div>
      </div>
    </div>
    <div class="list">
      <MusicList 
        v-for="(item,i) in searchSongs.list" 
        :key="item.id" 
        :count="i+1"
        :name="item.name"
        :anthors="item.artists"
        :item="item"
        :isShow="true"
        ></MusicList>
    </div>
  </div>
</div>
  
</template>

<script>
import {reactive,ref} from 'vue'
import {searchMusic} from '@/api/imdex.js'
import store from '@/store/index.js'
import MusicList from '@/components/MusicList.vue'
export default {
  name:'Search',
  components :{
    MusicList
  },
  setup(){
    let placeholder=ref('群星')
    // 页面初始化加载localStorage.keyWordList的值
    let keyWordList=reactive(localStorage.keyWordList? JSON.parse(localStorage.keyWordList):[])
      
    // 搜索字段
    let searchKeyword=ref('')
    // 搜索结果
    let searchSongs=reactive({
      list:[]
    })

    async function saveKeyWord(){
      // 判断是否有重复的
      let isKeyWord=keyWordList.some((item) => searchKeyword.value == item)
      if(!isKeyWord){
        // 按下enter的时候保存搜索结果
        keyWordList.push(searchKeyword.value)
        // 最多保留5个
        if(keyWordList.length>5){
          // 删除数组中的第一个结果
          keyWordList.shift()
        }
        localStorage.keyWordList=JSON.stringify(keyWordList)
      } 
      // 获取搜索的音乐
      let {data}=await searchMusic(searchKeyword.value)
      searchSongs.list=data.result.songs
    }

    // 重置搜索历史
    function reset(){
      keyWordList.splice(0,5)
      localStorage.keyWordList=[]
    }

    // 点击历史执行搜索
    function historySearch(keyword){
      searchKeyword.value=keyword
      saveKeyWord()
    }
    

    return {
      placeholder,
      searchKeyword,
      keyWordList,
      searchSongs,
      saveKeyWord,
      reset,
      historySearch,
    }
  },
  

}
</script>

<style lang="less" scoped>
.searchTop{
  width:7.5rem;
  padding:1.2rem 0.2rem 0 0.2rem;
  .searchTopNav{
    display:flex;
    width:100%;
    padding:0 0.2rem;
    height:1.2rem;
    align-items:center;
    position: fixed;
    top:0;
    left:0;
    background-color:#fff;
    .left{
      .icon{
        width:0.5rem;
        height:0.5rem;
      }
    }
    .right{
      padding:0 0 0 0.3rem;
      flex:1;
      input{
        padding:0.1rem 0;
        width:100%;
        border:none;
        outline: none;
        border-bottom:1px solid #666;
      }
    }
  }
  // 历史的样式
  .history{
    display:flex;
    .historyLeft{
      font-weight:900;
      min-width:1rem;
      height:0.5rem;
      line-height:0.5rem;
    }
    .historyRight{
      color:#666;
      display:flex;
      flex-wrap: wrap;
      align-items: center;
      .keyWordItem{
        background-color:#eee;
        padding:0 0.3rem;
        height:0.5rem;
        line-height:0.5rem;
        border-radius:0.25rem;
        margin:0.08rem;
      }
    }
  }

  // 音乐列表样式
  .list{
    padding-bottom:1.3rem;
  }
}
</style>