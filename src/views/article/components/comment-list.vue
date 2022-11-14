<template>
  <div class="commentList">
    <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="没有更多了"
  @load="onLoad"
>
  <CommentItem
   v-for="(item, index) in list"
  :key="index"
  :commented="item"
  @popu-reply="$emit('popu-reply', $event)"
   />
</van-list>
  </div>
</template>

<script>
import { allComments } from '@/api/article'
import CommentItem from './comment-item'
export default {
  name: 'commentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    // 这里因为要配合发布评论评论组件会传值过来 这边这样声明不会影响后台获取数据存入list
    // 默认设置为[]
    // 没有新评论传过来也不影响我拿到旧评论渲染
    // 传入过来的数据不是必须需要的
    // 反正评论先渲染了，你传一个我再渲染一个
    list: {
      type: Array,
      default: () => []
    },
    // 当进入文章详情页评论列表的时候会发一次请求，那么进入评论回复的时候又会激活换参数发请求
    type: {
      type: String,
      // 自定义 prop 数据验证 应后台参数要求 必须是a 或 b
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      error: false,
      loading: false,
      finished: false,
      limit: 8,
      offset: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    // 文章评论获取
    async onLoad () {
      try {
        const { data } = await allComments({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: this.limit
        })
        const { results } = data.data
        // eslint-disable-next-line vue/no-mutating-props
        this.list.push(...results)
        console.log(this.list)
        this.$emit('mun', data.data)
        this.loading = false

        if (results.length) {
          this.offset = data.dara.last_id
        } else {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
        this.error = true
      }
    }
  },

  created () {
    // 出来先调一下拿到评论数量 不等loading触发
    this.onLoad()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
</style>
