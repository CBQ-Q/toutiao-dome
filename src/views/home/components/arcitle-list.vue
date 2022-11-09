<template>
   <div class="arcitle-List">
    <van-pull-refresh
     v-model="isLoading"
     :success-text="successtext"
     :success-duration="1500"
    @refresh="onRefresh">
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="请求失败，点击重新加载"
  @load="onLoad"
>
  <ArtiCleItem
   v-for="(article, index) in list"
   :key="index"
   :article="article"
  ></ArtiCleItem>
  <!-- 这里表示先循环标题出来看看 然后调整功能 反过头来在创建组件循环全部内容 -->
  <!-- <van-cell
   v-for="(article, index) in list"
   :key="index"
   :title="article.title" /> -->
  </van-list>
   </van-pull-refresh>
   </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArtiCleItem from '@/components/arcitle-item'
export default {
  name: 'ArcitleList',
  components: {
    ArtiCleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false, // 控制加载出错 加如网速差等等
      isLoading: false, // 控制下拉刷新的loading状态
      successtext: ''
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          // 请求当前数据页的时间戳  页码 就是第一次获取没有timestamp 就用现在的时间戳
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        const { results } = data.data
        console.log(results)
        // 展开数据追加到数组
        this.list.push(...results)
        // 本次数据加载结束后 还要触发loading
        this.loading = false
        // 判断是否全部加载完成
        if (results.length) {
          // 继续更新下个时间戳的数据
          this.timestamp = data.data.pre_timestamp
        } else {
          // 数据加载已完成 暂停加载
          this.finished = true
        }
      } catch (err) {
        console.log(err)
        // 请求失败要设置 不然还是可以往下滑
        this.loading = false
      }
    },
    async onRefresh () {
      // 异步更新数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          // 请求当前最新数据 添加到下拉刷新数组前面渲染
          timestamp: Date.now(),
          with_top: 1
        })
        const { results } = data.data
        // 刷新后追加到前面显示
        this.list.unshift(...results)
        // 下拉更新关闭状态
        this.isLoading = false
        // 更新成功提示文本
        this.successtext = '刷新成功'
      } catch (err) {
        this.successtext = '刷新失败'
        // 请求失败要设置 不然还是可以往下滑
        this.loading = false
      }
    }
  }

}
</script>
<style lang='less' scoped>
// 滚动位置限制
.arcitle-List {
  height: 79vh;
  overflow-y: auto;
}
</style>
