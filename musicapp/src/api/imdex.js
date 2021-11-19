import axios from 'axios'
// 配置默认路径
axios.defaults.baseURL = 'http://localhost:3000'

// 获取轮播图的API
export function getBannerImg(type){
  return axios.get(`/banner?type=${type}`)
}

// 获取推荐歌单
export function getMusicList(limit){
  return axios.get(`/personalized?limit=${limit}`)
}

// 获取歌单的详情
export function getPlayListInfo(id){
  return axios.get(`/playlist/detail?id=${id}`)
}

// 获取歌歌词
export function getLyric(id){
  return axios.get(`/lyric?id=${id}`)
}

// 搜索歌曲
export function searchMusic(keyword){
  return axios.get(`/search?keywords=${keyword}`)
}

// 手机登录
export function phoneLogin(phone,password){
  return axios.get(`/login/cellphone?phone=${phone}&password=${password}`)
}

// 获取用户详情
export function getUserInfo(uid){
  return axios.get(`/user/detail?uid=${uid}`)
}

// 获取歌手详情
export function getAnthorInfo(id){
  return axios.get(`/artist/detail?id=${id}`)
}