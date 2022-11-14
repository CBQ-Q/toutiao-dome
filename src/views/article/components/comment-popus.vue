<template>
  <div class="comment-post">
    <!-- v-model可以用trim方法 -->
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      class="post-btn"
      @click="onpost"
      :disabled="!message.length"
    >发布</van-button>
  </div>
</template>

<script>
import { addcomment } from '@/api/article'
export default {
  name: 'CommentPost',
  components: {},
  // 接收父组件提供的全局数距
  inject: {
    articleId: {
      type: [Number, Object, String],
      default: null
    }
  },
  props: {
    target: {
      type: [Number, Object, String],
      require: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onpost () {
      try {
        const { data } = await addcomment({
          target: this.target,
          content: this.message,
          art_id: this.articleId
        })
        console.log(data)
        this.message = ''
        this.$toast.success('评论成功')
        this.$emit('post', data.data)
      } catch (error) {
        this.$toast.fail('评论失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
