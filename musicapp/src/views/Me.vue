<template>
  <section class="aui-flexView">
	<header class="aui-navBar aui-navBar-fixed">
		<a href="javascript:;" class="aui-navBar-item">
			<i class="icon icon-return" @click="revert"></i>
		</a>
		<div class="aui-center">
			<span class="aui-center-title"></span>
		</div>
		<a href="javascript:;" class="aui-navBar-item">
			<i class="icon icon-user" @click="quitLogin"></i>
		</a>
	</header>
	<section class="aui-scrollView" v-if="userInfo.profile">
		<div class="aui-chang-box"></div>
		<div class="aui-chang-list">
			<div class="aui-user-img">
				<img :src="userInfo.profile.avatarUrl" alt="">
			</div>
			<div class="aui-user-text">
				<h1>{{userInfo.profile.nickname}}</h1>
				<span>{{userInfo.profile.signature}}</span>
				<button>开通会员</button>
			</div>
			<div class="aui-jf">积分50</div>
		</div>
		<div class="aui-palace aui-palace-one">
			<a href="javascript:;" class="aui-palace-grid">
				<div class="aui-palace-grid-icon">
					<img src="../assets/img/nav-001.png" alt="">
				</div>
				<div class="aui-palace-grid-text">
					<h2>客户关系</h2>
				</div>
			</a>
			<a href="javascript:;" class="aui-palace-grid">
				<div class="aui-palace-grid-icon">
					<img src="../assets/img/nav-002.png" alt="">
				</div>
				<div class="aui-palace-grid-text">
					<h2>客户管理</h2>
				</div>
			</a>
			<a href="javascript:;" class="aui-palace-grid">
				<div class="aui-palace-grid-icon">
					<img src="../assets/img/nav-003.png" alt="">
				</div>
				<div class="aui-palace-grid-text">
					<h2>任务监控</h2>
				</div>
			</a>
			<a href="javascript:;" class="aui-palace-grid">
				<div class="aui-palace-grid-icon">
					<img src="../assets/img/nav-004.png" alt="">
				</div>
				<div class="aui-palace-grid-text">
					<h2>数据统计</h2>
				</div>
			</a>
		</div>
		<div class="divHeight"></div>
		<div class="aui-list-item">
			<a href="javascript:;" class="aui-flex b-line">
				<div class="aui-cou-img">
					<img src="../assets/img/icon-001.png" alt="">
				</div>
				<div class="aui-flex-box">
					<p>用户协议</p>
				</div>
			</a>
			<a href="javascript:;" class="aui-flex b-line">
				<div class="aui-cou-img">
					<img src="../assets/img/icon-002.png" alt="">
				</div>
				<div class="aui-flex-box">
					<p>常见问题</p>
				</div>
			</a>
			<a href="javascript:;" class="aui-flex b-line">
				<div class="aui-cou-img">
					<img src="../assets/img/icon-003.png" alt="">
				</div>
				<div class="aui-flex-box">
					<p>联系客服</p>
				</div>
			</a>
			<div class="divHeight b-line"></div>
			<a href="javascript:;" class="aui-flex b-line">
				<div class="aui-cou-img">
					<img src="../assets/img/icon-004.png" alt="">
				</div>
				<div class="aui-flex-box">
					<p>关于我们</p>
				</div>
			</a>
		</div>
		<div class="divHeight b-line"></div>

	</section>
	
</section>
</template>

<script>
import '@/assets/css/me.css'
import store from '@/store/index.js'
import {useRouter} from 'vue-router'
import {computed,ref} from 'vue'
import { Dialog } from 'vant'
export default {
  name:'Me',
  setup(){
		// 创建当前路由对象
		let router = useRouter()
		let userInfo=computed(() =>store.state.user.userInfo)
    let isLogin=computed(() =>store.state.user.isLogin)

		// 退出登录
		function quitLogin(){
			Dialog.confirm({
  			message: '确定退出吗?',
			})
  		.then(() => {
    		// on confirm
				// 清除数据
				store.commit('setUser',{info:{},isQuit:true,isLogin:false})
				localStorage.user=''
				router.push('/')
				
  		})
  		.catch(() => {
    		// on cancel
  		});
		}

		// 返回上一页
		function revert(){
			if(isLogin){
				router.push('/')
			}else{
				router.back()
			}
		}

    return {
      userInfo,
			revert,
			quitLogin
    }
  }
}
</script>

<style>

</style>