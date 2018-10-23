<template>
  <div class="top">
    <img :src='imgUrl' class="back_Icon">
    <ul class="inline_block tool_list">
      <li class="inline_block tool_item">文件(F)</li>
      <li class="inline_block tool_item">工具(T)</li>
      <li class="inline_block tool_item">帮助(H)</li>
    </ul>
    <div class="inline_block pull_right author_info">
      <img class="user" :src="userIcon">
      <span class="info">标注助手V2.0</span>
    </div>
  </div>
</template>

<script>
import Icon from '@/assets/label.png'
import UserIcon from '@/assets/user.png'
export default {
  name: 'NavTop',
  data () {
    return {
      imgUrl: Icon,
      userIcon: UserIcon
    }
  }
}
</script>

<style scoped>
.top {
  background-color: #535353;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #868686d6
}
.back_Icon {
  height: 30px;
  margin-top: -9px;
  margin-right: 20px;
}
.tool_list {
  font-size: 16px;
  color: #d1d3d4;
}
.tool_item {
  margin-right: 10px;
}
.tool_item:hover {
  color: white;
  cursor: pointer;
}
.user{
  width: 30px;
}
.info{
  font-size: 15px;
}
.author_info{
  margin-right: 20px;
  color: white;
}
</style>
