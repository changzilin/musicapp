<template>
  <div class="listView" v-if="isUpdate">
    <MusicListTop :playList="list"></MusicListTop>
    <PlayList :playList="list"></PlayList>
  </div>
</template>

<script>
import store from '@/store/index.js'
import { computed} from 'vue'
import MusicListTop from '@/components/Music/MusicListTop.vue'
import PlayList from '@/components/Music/PlayList.vue'
export default {
  name:'ListView',
  components:{
    MusicListTop,
    PlayList
  },
  setup(){
 
    // 更新状态
    let isUpdate=computed(() => store.state.isUpdate)

    // 获取的音乐列表
    let list=computed(() => store.state.musicList)
      
    return{
      list,
      isUpdate
    }
  }
}
</script>

<style lang="less" scoped>

</style>