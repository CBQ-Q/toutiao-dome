<template>
   <div>
    <!-- 子路由入口 -->
    <router-view />
    <!-- 子路由入口 -->
    <van-tabbar route>
  <van-tabbar-item  to="/home" >
    <i slot="icon" class="iconfont icon-shouye"></i>
     首页</van-tabbar-item>
  <van-tabbar-item  to="/wenda" >
    <i slot="icon" class="iconfont icon-wenda"></i>
     问答</van-tabbar-item>
  <van-tabbar-item  to="/video" >
    <i slot="icon" class="iconfont icon-shipin"></i>
     视频</van-tabbar-item>
  <van-tabbar-item  to="/my" >
    <i slot="icon" class="iconfont icon-wode"></i>
    <!-- 只是用一次就可以直接访问 vuex 数据 -->
     {{$store.state.user ? '我的' : '未登录'}}</van-tabbar-item>
</van-tabbar>
   </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {

    }
  },

  mounted () {}

}
</script>
<style lang='css' scoped>

</style>
