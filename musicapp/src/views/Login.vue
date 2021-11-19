<template>
<van-nav-bar
  title=""
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
<div class="login">
  <van-form @submit="onSubmit">
  <van-cell-group inset>
    <van-field
      v-model="phone"
      name="用户名"
      label="手机号码"
      placeholder="您的手机号码"
      validate-trigger="onSubmit"
      :rules="[{ required: true, message: '请填写手机号码' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="密码"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
  </van-cell-group>
  <div style="margin: 16px;">
    <van-button round block type="primary" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>
</div>
</template>

<script>
import { ref } from 'vue'
import { Toast } from 'vant'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
export default {
  name:'Login',
  setup(){
    // 创建当前路由对象
		let router = useRouter()
    // 使用store获取vuex中的数据
    const store = useStore()
    // 手机号
    let phone=ref('')
    // 密码
    let password=ref('')

    // 登录
    async function onSubmit(){
      let result=await store.dispatch('login',{phone,password})
      // 用户未注册
      if(result.data.code==200){
        Toast({message: '登录成功！',position: 'top',duration:1000,icon:'passed'})
        router.push('/me')
      }else if(result.data.code==400){
        Toast({message: '登录成功！',position: 'top',duration:1000,icon:'close'})
      }
    }

    // 返回上一级
    const onClickLeft = () => {
      router.push('/')
    }
    
    return {
      phone,
      password,
      onSubmit,
      onClickLeft
    }
  }
}
</script>

<style lang="less" scoped>


</style>