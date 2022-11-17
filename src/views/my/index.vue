<template>
  <div class="my">
    <!-- 已登录头部 -->
    <!-- 访问vuex如果state中有token就证明登录成功 -->
   <div v-if="user" class="box my-one">
    <div class="urseUrl">
      <div class="left">
        <van-image
        class="touxian"
        round
        fit="cover"
        :src="everyList.photo"
      />
        <span class="name">{{everyList.name}}</span>
      </div>
      <div class="right">
        <van-button
         class="bianji"
          round
          to="/user-amend"
          >编辑资料</van-button>
      </div>
    </div>
    <div class="wend">
      <div class="data-item">
        <span class="count">{{everyList.like_count}}</span>
        <span class="text">粉丝</span>
      </div>
       <div class="data-item">
        <span class="count">{{everyList.follow_count}}</span>
        <span class="text">关注</span>
      </div>
       <div class="data-item">
        <span class="count">{{everyList.fans_count}}</span>
        <span class="text">粉丝</span>
      </div>
       <div class="data-item">
        <span class="count">{{everyList.art_count}}</span>
        <span class="text">获赞</span>
      </div>
    </div>
   </div>
   <!-- 已登录头部 -->

    <!-- 未登录头部 -->
   <div v-else class="box my-not" >
    <!-- 点击登录图片盒子跳转登录页面 -->
      <div  class="my-btn" @click="$router.push('/login')">
      <img class="my-img" src="~@/assets/mobile.png" alt="">
      <span class="text">登录 / 注册</span>
      </div>
   </div>
   <!-- 未登录头部 -->

   <!-- 导航 -->
   <van-grid class="grid-nav" :column-num="2" clickable>
  <van-grid-item class="grid-item">
    <i slot="icon" class="iconfont icon-shoucang"></i>
    <span slot="text" class="text">收藏</span>
  </van-grid-item>
  <van-grid-item class="grid-item">
    <i slot="icon" class="iconfont icon-lishi"></i>
    <span slot="text" class="text">历史</span>
  </van-grid-item>
  </van-grid>
    <!-- 导航 -->

    <!-- 下部区域 -->
  <van-cell title="消息通知" is-link />
  <van-cell class="userName" title="小智同学" is-link />
  <van-cell v-if="user" class="out-btn" title="退出登录" @click="outFn"  />
    <!-- 下部区域 -->
  </div>

</template>

<script>
// 引入vuex方法
import { mapState } from 'vuex'
import { everyName } from '@/api/user'

export default {
  name: 'myIndx',
  data () {
    return {
      // 准备数组接收登录用户信息
      everyList: {}
    }
  },
  computed: {
    // 根据有无token 判断用户页面的显示隐藏
    ...mapState(['user'])
  },
  methods: {
    outFn () {
      // eslint-disable-next-line no-undef
      // vant提示框组件要改全局使用
      this.$dialog.confirm({
        title: '确认退出？'
      })
        .then(() => {
          // 调用commit方法 直接删除vuex里面要储存的值
          this.$store.commit('setUser', null)
        // on confirm
        })
        .catch(() => {
        // on cancel
        })
    },
    // 发起请求 获得登录用户数据
    async everyInfo () {
      const { data } = await everyName()
      this.everyList = data.data
      console.log(this.everyList)
      // console.log(data)
    }
  },
  created () {
    // 定义方法 发起请求 判断有无token
    if (this.user) {
      this.everyInfo()
    }
  }
}
</script>

<style scoped lang="less">
.my {
  .box {
    height: 180px;
    background: url("../../assets/banner.png");
    // 图片占满盒子
    background-size:cover ;
  }

    .my-not {
      display: flex;
      justify-content: center;
      align-items: center;
    .my-btn{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      }

      .my-img {
        width: 66px;
        height: 66px;
      }
      .text {
                font-size: 14px;
                color: #fff;
      }
    }
    .my-one {
      .urseUrl {
      height: 65px;
      // background-color: pink;
      padding: 38px 16px 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        .touxian {
          width: 65px;
          height: 65px;
        }
        .name {
          color:#fff;
          font-size: 15px;
          padding-left: 12px;
        }
      }
      .right {
        .bianji{
          // width: px;
          // font-size: 6px;
          height: 20px;
          line-height: 20px;
        }
      }
      }
      .wend{
        // height: 65px;
        // background-color: skyblue;
        display: flex;
        .data-item {
          height: 65px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          .count {
            font-size: 15px;
            padding-bottom: 8px;
          }
          .text {
            font-size: 12px;
          }
        }
      }
    }
    .grid-nav{
      margin-bottom: 15px;
      .grid-item {
        height: 70px;
        i.iconfont  {
          font-size: 22px;
        }
        .icon-shoucang{
          color: #eb5253;
        }
        .icon-lishi {
          color: #ff9d1d;
        }
        span.text {
          font-size: 14px;
        }
      }
    }
      .userName {
          margin-bottom: 10px;
        }
      .out-btn {
        text-align: center;
        color: red;
      }
}
</style>
