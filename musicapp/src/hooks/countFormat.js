// 格式化数字
export function countFormat(num){
  if(num>=100000000){
    // 保留一位小数
    return (num/10000).toFixed(1)+'亿'
  }else if(num>=10000){
    return (num/10000).toFixed(1)+'万'
  }else{
    return num
  }
}