<template>
  <div class="iconList">
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shouyinjiguangbo"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-mugedan"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.iconList{
  display:flex;
  justify-content: space-between;
  padding:0.2rem;
  .iconItem{
    display:flex;
    flex-direction: column;
    align-items: center;
    .icon{
    width:0.9rem;
    height:0.9rem;
    }
    span{
      font-size: 0.26rem;
      margin-top: 0.07rem;
    }
  }
  
}

</style>