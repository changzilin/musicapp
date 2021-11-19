<template>
  <router-view/>
  <Player></Player>
</template>
<script>
import Player from '@/components/Player/Player.vue'
import {useStore} from 'vuex'
import {reactive} from 'vue'
export default {
  name:'App',
  components:{
    Player,
  },
  setup(){
    // 使用eStore获取vuex中的数据
    const store = useStore()
    // 每次加载页面先获取本地的缓存是否有用户
    let userData=reactive(localStorage.user? JSON.parse(localStorage.user):{})
    store.commit('setUser',{info:userData.userInfo,isLogin:userData.isLogin})
  }
}
</script>

<style lang="less">
#app{
  margin-top: 0.15rem;
}
  *{
    margin:0;padding:0;box-sizing:border-box;font-family:'微软雅黑';
  }
</style>
