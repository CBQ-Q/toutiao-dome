<template>
   <van-icon
        :name="value === 1 ? 'good-job' : 'good-job-o'"
        :color="value === 1 ? '#b73c3c' : '#777'"
        @click="collected"
      />
</template>

<script>
import { addlike, dellike } from '@/api/article'
export default {
  name: 'likeArticel',
  components: {},
  props: {
    value: {
      type: Number,
      require: true
    },
    articleId: {
      type: [Number, String, Object],
      require: true
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {
    async collected () {
      try {
        let status = -1
        if (this.value === 1) {
          // 等于1 则代表已 点赞
          await dellike(this.articleId)
        } else {
          // 等于-1 则代表已取消点赞
          await addlike(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        // 数据跟新不会立即跟新视图 所以不能根据传过来的value判断 要根据传过去的value状态判断
        this.$toast.success(status === 1 ? '点赞成功' : '已取消点赞')
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    }
  },
  created () {
  },
  mounted () {}
}
</script>
<style lang="less" scoped>

</style>
