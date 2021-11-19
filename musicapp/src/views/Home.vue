<template>
  <div class="home">
    <TopNav></TopNav>
    <keep-alive include="Swipe"><Swipe/></keep-alive>
    <IconList></IconList>
    <keep-alive include="MusicSwipe">
    <MusicSwipe></MusicSwipe>
    </keep-alive>
  </div>
</template>

<script>
import TopNav from '@/components/Home/TopNav.vue'
import Swipe from '@/components/Home/Swipe.vue'
import IconList from '@/components/Home/IconList.vue'
import MusicSwipe from '@/components/Home/MusicSwipe.vue'

export default {
  name: 'Home',
  components: {
    TopNav,
    Swipe,
    IconList,
    MusicSwipe
  },
  setup(){
    
  }
}
</script>
<style lang="less" scoped>
#d1 {
  width: 3.75rem;
  height: 3.75rem;
  background-color: skyblue;
}

</style>
