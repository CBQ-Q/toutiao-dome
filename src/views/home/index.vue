<template>
  <div class="shouye">
    <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
    >
    <van-button
    class="SouSearch"
     slot="title"
     type="info"
     size="small"
     round
     icon="search"
     to="/search"
     >搜索</van-button>
    </van-nav-bar>
    <!-- 导航栏 -->

    <!-- 标签栏 -->
<van-tabs class="biaoqian" v-model="active" animated swipeable>
  <van-tab
   :title="item.name"
   v-for="item in channel"
   :key="item.id"
   >
   <!-- 文章列表组件 -->
   <!-- 为什么要传文章列表的过去 应为要拿到id 获取后台的对应id文章 -->
   <ArcitleList :channel="item"></ArcitleList>
   <!-- 文章列表组件 -->
   </van-tab>
  <div slot="nav-right" class="zhanwei"></div>
  <div slot="nav-right" class="hambuoge-btn" @click="popupshow = true">
  <i class="icon-font"><van-icon name="wap-nav" /></i>
  </div>
   </van-tabs>
    <!-- 标签栏 -->
    <!-- 弹出层 -->
    <van-popup
    v-model="popupshow"
    closeable
    position="bottom"
    :style="{ height: '100%' }"
    >
    <ChannelPopup :channels="channel" :active="active" @mirror="mirrored"></ChannelPopup>
    </van-popup>
    <!-- 弹出层 -->
  </div>
</template>

<script>
import { getUserChannle } from '@/api/user'
import ArcitleList from '@/views/home/components/arcitle-list.vue'
import ChannelPopup from '@/views/home/components/channel-popup.vue'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'homeIndex',
  components: {
    ArcitleList,
    ChannelPopup
  },
  data () {
    return {
      active: 0,
      channel: [],
      popupshow: false
    }
  },
  created () {
    this.getChannle()
  },
  // 获取文章列表数据
  methods: {
    // 初始获得
    // async getChannle () {
    //   try {
    //     const { data } = await getUserChannle()
    //     console.log(data)
    //     this.channel = data.data.channels
    //     console.log(this.channel)
    //   } catch (error) {
    //     console.log(error)
    //   },

    // 完整获得
    async getChannle () {
      try {
        // 声明一个空数组
        let channels = []
        // 先引入token 判断登录状态
        if (this.user) {
          // 如果登录了则请求用户数据
          const { data } = await getUserChannle()
          channels = data.data.channels
        } else {
          // 如果没有登录则取出本地存储的频道
          const localChannels = getItem('TOUTIAO_CHANNEL')
          // 判断本地有没有数据
          if (localChannels) {
            channels = localChannels
          } else {
            // 没有就请求默认数据
            const { data } = await getUserChannle()
            channels = data.data.channels
          }
        }
        // 最后赋值给属性数组去遍历
        this.channel = channels
      } catch (error) {
        console.log(error)
      }
    },
    mirrored (index, popupshow = true) {
      this.active = index
      // 设置false 子组件点击传过来index后就隐藏了popup弹框
      // 相应这边控制显示也的active也跳到相应的index上
      // 修改就显示 不修改就关闭弹窗跳出
      this.popupshow = popupshow
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang="less">
.shouye {
  padding-bottom: 50px;

.page-nav-bar{
  background-color: #3296fa;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 1;
}
.SouSearch{
  width: 278px;
  height: 32px;
  background-color: #5babfb;
  border: none;
  font-size: 14px;
  .van-icon {
    font-size: 16px;
    color: #fff;
  }
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}

/deep/ .biaoqian {
  .van-tabs__wrap{
    position: fixed;
    top: 46px;
    z-index: 1;
    left: 0;
    right: 0;
    height: 41px;
  }
.van-tab {
  border-right: 1px solid #edeff3;
  // 原样式felx布局 所以只能定最小宽度
  min-width: 100px;
  font-size: 15px;
  color: #777777;
}
// 点击时会有自动配备类名
.van-tab--active {
  color: #333333;
}
.van-tabs__line{
  width: 16px !important;
  height: 2px;
  bottom: 8px;
  background-color: #3296fa;

}
.van-tabs__nav--line {
  padding-bottom: 0;
}
.van-tabs__nav--line
// .van-tabs__nav {
//   height: 82px;
// }
// 占位符 用于按钮挡住内容
.zhanwei {
   height: 41px;
  width: 33px;
  // 父元素是filx布局的情况下 设置宽没用 所以要设置这个
  flex-shrink: 0;
}
.hambuoge-btn {
  position: fixed;
  height: 41px;
  width: 33px;
  right: 0px;
  line-height: 41px;
  text-align: center;
  background-color: #fff;
  opacity: 0.8;
  z-index: 9999;
  .icon-font {
    font-size: 17px;
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    height: 100%;
    width: 1px;
    // 跟多按钮的左边条线
    background-image: url(../../assets/gradient-gray-line.png);
    // 长轴显示
    background-size: contain;
  }
}
.van-tabs__content {
  padding-top: 87px;
}
}

}

</style>
