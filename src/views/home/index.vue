<template>
  <div class="home">
    <!-- 子路由出口 -->
    <keep-alive exclude="UserIndex">
      <router-view />
    </keep-alive>
    <!-- 子路由出口 -->

    <!-- Tabbar 标签栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item replace to="/" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item replace to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item replace to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item replace to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>

</style>
