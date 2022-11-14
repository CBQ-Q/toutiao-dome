<template>
  <div class="comment-reply">
    <van-nav-bar
    class="cnm"
    :title="addreply.reply_count > 0 ? `${addreply.reply_count}条回复` : '暂无回复'"
   >
   <van-icon
    slot="left"
    name="cross"
    @click="$emit('close')"
    />
   </van-nav-bar>

   <div class="scroll">
    <!-- 把父组件点击回复拿到的评论每一项 再传给commCommentItem渲染 -->
   <CommentItem :commented="addreply"/>
   <!-- 全部回复 -->
   <div class="box">全部回复</div>
   <CommentList
    :source="addreply.com_id"
    type="c"
    :list="commentList"
    />
   </div>
   <!-- 全部回复 -->
   <!-- 底部评论按钮 -->
   <div class="post-wrap">
    <van-button
    round class="post-btn"
    @click="ispostshoe = true"
    >
    写评论</van-button>
   </div>
   <!-- 发布评论 -->
   <van-popup v-model="ispostshoe" position="bottom">
    <!-- 应为2次评论都是用的同一个组件 只是请求参数不同 其他的可以通用 -->
    <!-- 监听post事件 list组件传入评论对象 文章数组做修改 -->
     <CommentPopus
     :target="addreply.com_id"
     @post="onpost"
     />
   </van-popup>
  </div>
</template>

<script>
import CommentItem from './comment-item'
import CommentList from './comment-list'
import CommentPopus from './comment-popus'
export default {
  name: 'commentReply',
  components: {
    CommentItem,
    CommentList,
    CommentPopus
  },
  props: {
    addreply: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      ispostshoe: false,
      commentList: []
    }
  },
  watch: {},
  computed: {},
  methods: {
    onpost (data) {
      // 关闭弹窗
      this.ispostshoe = false
      // 回复数量改变
      // eslint-disable-next-line vue/no-mutating-props
      this.addreply.reply_count++
      // 将最新的回复内容展示到列表顶部
      this.commentList.unshift(data.new_obj)
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
.comment-reply {
  .box {
    padding-left: 15px;
    font-size: 16px;
    color: #716969;
  }
  .cnm {
    // background-color: aqua;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
   /deep/ .van-ellipsis {
      color: rgb(105, 102, 102);
    }
  }
  .post-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .post-btn {
      background-color:rgb(58, 163, 204);
      width: 100%;
      height: 35px;
      border-top: 1px solid #d8d8d8;
      color: #fff;
    }
  }
  .scroll {
    position: fixed;
    top: 46px;
    bottom: 35px;
    left: 0;
    right: 0;
    overflow-y: auto;
  }
}
</style>
