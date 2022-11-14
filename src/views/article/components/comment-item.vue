<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="commented.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{commented.aut_name}}</div>
      <van-button
        class="like-btn"
        :icon="commented.is_liking ? 'good-job' : 'good-job-o'"
        :class="{
          liked: commented.like_count
        }"
        :loading="commentloading"
        @click="onlike"
      >{{commented.like_count || '赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{commented.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{commented.pubdate | relativeTime}}</span>
        <van-button
          class="reply-btn"
          round
          @click="$emit('popu-reply', commented)"
        >回复 {{commented.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { likings, dellikings } from '@/api/article'
export default {
  name: 'CommentItem',
  components: {},
  props: {
    commented: {
      type: Object,
      require: true
    }
  },
  data () {
    return {
      commentloading: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onlike () {
      this.commentloading = true
      try {
        if (this.commented.is_liking) {
          // 已点赞 再点 取消
          await dellikings(this.commented.com_id)
          // eslint-disable-next-line vue/no-mutating-props
          this.commented.like_count--
        } else {
          // 未点赞 再点 点赞
          await likings(this.commented.com_id)
          // eslint-disable-next-line vue/no-mutating-props
          this.commented.like_count++
        }
        // eslint-disable-next-line vue/no-mutating-props
        this.commented.is_liking = !this.commented.is_liking
      } catch (error) {
        this.$toast('操作失败')
      }
      this.commentloading = false
    }
  }
}
</script>

<style scoped lang="less">
.comment-item {
  .avatar {
    width: 36px;
    height: 36px;
    margin-right: 13px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 13px;
    }
  }
  .comment-content {
    font-size: 16px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 10px;
    color: #222;
    margin-right: 23px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 67px;
    height: 24px;
    line-height: 24px;
    font-size: 10px;
    color: #222;
  }
  .like-btn {
    height: 15px;
    padding: 0;
    border: none;
    font-size: 10px;
    line-height: 15px;
    margin-right: 4px;
    .van-icon {
      font-size: 15px;
    }
    &.liked {
      color: red;
    }
  }
}
</style>
