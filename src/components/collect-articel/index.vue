<template>
   <van-icon
        :name="value ? 'star' : 'star-o'"
        :color="value ? '#ffa500' : '#777'"
        @click="collected"
      />
</template>

<script>
import { addcollect, delcollect } from '@/api/article'
export default {
  name: 'collectArticle',
  components: {},
  props: {
    value: {
      type: Boolean,
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
        if (this.value) {
          // 等于true 则代表已收藏 点击 取消
          await delcollect(this.articleId)
        } else {
          // 等于true 则代表已取消 点击 收藏
          await addcollect(this.articleId)
        }
        // 更新视图
        this.$emit('input', !this.value)
        // 数据跟新不会立即跟新视图 所以不能根据传过来的value判断 要根据传过去的value状态判断
        this.$toast.success(!this.value ? '收藏成功' : '已取消收藏')
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
