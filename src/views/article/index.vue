<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <!-- 请求成功就等于拿到数据了 那么直接就可以用随意拿到的数据判断成功 等于true就显示 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
           <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            :loading="loadingFollow"
            @click="onFollow"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="loadingFollow"
            @click="onFollow"
          >关注</van-button>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
         class="article-content markdown-body"
         ref="article-content"
          v-html="article.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 把后台评论数据数量传过来 再通过变量赋予底部需用 -->
        <comment-list
        :source="article.art_id"
        @mun="totalcomment = $event.total_count "
        :list="commentPopu"
         @popu-reply="reply"
         />
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errstatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <!-- 如果不是404错误 就给予从新加载的按钮 重新调用请求函数 -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="localArticle">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="popupShow = true"
      >写评论</van-button>
      <van-icon
        name="comment-o"
        :badge="totalcomment"
        color="#777"
      />
      <collect-articel
      v-model="article.is_collected"
      :articleId="article.art_id"
       />
      <!-- <van-icon
        color="#777"
        name="star-o"
      /> -->
      <like-articel
      v-model="article.attitude"
      :articleId="article.art_id"
      />
      <!-- <van-icon
        color="#777"
        name="good-job-o"
      /> -->
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
    <!-- 文章评论弹出框 -->
    <van-popup
    v-model="popupShow"
    closeable
    position="bottom"
    >
    <comment-popus
    :target="article.art_id"
    @post="postpopus"
     />
    </van-popup>
    <!-- 文章评论弹出框 -->
    <!-- 文章回复评论弹出框 -->
    <van-popup
    v-model="popureplyshow"
    position="bottom"
    style="height: 100%;"
    >
    <!--把文章评论项传入回复的组件 -->
    <!-- 这里的v-if 要在弹出框关闭的时候销毁 ，不然第二次渲染还是一样的 -->
    <commentReply
     v-if="popureplyshow"
     :addreply="replydata"
     @close="popureplyshow = false"
     ></commentReply>
    </van-popup>
    <!-- 文章回复评论弹出框 -->
  </div>
</template>

<script>
import { getArticleId } from '@/api/article'
import { addFollow, delFollow } from '@/api/user'
import { ImagePreview } from 'vant'
import collectArticel from '@/components/collect-articel'
import likeArticel from '@/components/like-articel'
import commentList from '@/views/article/components/comment-list'
import CommentPopus from './components/comment-popus.vue'
import commentReply from './components/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  components: {
    collectArticel,
    likeArticel,
    commentList,
    CommentPopus,
    commentReply
  },
  // 给所有的子组件后代提供数据 接收即可用 最好是传用的频繁的数据
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: true, // 控制加载中的logding状态
      errstatus: 0, // 用于判断状态码
      loadingFollow: false, // 按钮加载状态的控制开关 避免多次请求
      totalcomment: 0,
      popupShow: false,
      commentPopu: [],
      popureplyshow: false,
      replydata: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.localArticle()
  },
  mounted () {},
  methods: {
    async localArticle () {
      // 不管加载不加载成功都会显示 然后判断后面的
      this.loading = true
      try {
        const { data } = await getArticleId(this.articleId)
        this.article = data.data
        // console.log(this.article.content)
        // 想要拿到文章内容里的图片 必须再请求成功之后，而且数据驱动视图不是立即的 ，所以要加个定时器
        // 渲染的操作是微任务 拿到iMG要渲染完成之后 添加定时器为红任务
        setTimeout(() => {
          this.Images()
        }, 0)
        // 加载成功拿到数据了 就关闭loading 进行成功条件判断 显示文章
        this.loading = false
      } catch (err) {
        // 如果请求出错 如果是404 服务器没有资源 则给变量赋值404，响应上面出现404情况应该显示的东西
        if (err.response && err.response.status === 404) {
          this.errstatus = 404
        }
      }
    },
    Images () {
      // 获得所有img节点
      const strImg = this.$refs['article-content']
      const imgs = strImg.querySelectorAll('img')
      const images = [] // 准备一个数组添加图片地址
      // 遍历图片
      imgs.forEach((item, index) => {
        // 遍历图片拿到地址
        images.push(item.src)
        // 给没个图片加个点击事件onclick
        imgs.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组
            images,
            closeable: true,
            startPosition: index // 预览的起始位置从0开始
          })
        }
      })
    },
    async onFollow () {
      this.loadingFollow = true // 开启按钮的logding状态
      try {
        // 如果关注为ture 点击事件就是取消关注
        if (this.article.is_followed) {
          await delFollow(this.article.aut_id)
          this.article.is_followed = false
        } else {
          // 如果关注为false 点击事件就是取消关注
          await addFollow(this.article.aut_id)
          this.article.is_followed = true
        }
      } catch (err) {
        let message = '操作失败'
        if (err.response && err.response.status === 400) {
          message = '不能关注自己'
        }
        this.$toast(message)
      }
      this.loadingFollow = false // 关闭按钮的logding状态
    },
    postpopus (data) {
      // 点击发布评论 关闭弹框
      // 子组件请求成功了 触发方法 修改状态
      this.popupShow = false
      // 子组件传过来的评论值 添加到数组前面 配合传入获取评论数据的子组件
      // 经过那边的渲染就添加到了数组前面
      this.commentPopu.unshift(data.new_obj)
    },
    reply (commented) {
      // 设置一个变量 接收文章的评论项
      this.replydata = commented
      this.popureplyshow = true
      console.log(commented)
    }
  }
}
</script>

<style scoped lang="less">
@import './github-markdown.css';
.article-container {
  .page-nav-bar {
    background-color: rgb(12, 175, 245);
   /deep/ i.van-icon-arrow-left {
      color: #fff;
    }
  }
  /deep/ .van-nav-bar__title{
      color: #fff;
    }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px 16px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 9px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 12px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }

    .article-content {
      padding: 27px 16px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 100px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 61px;
      color: #b4b4b4;
    }
    .text {
      font-size: 15px;
      color: #666666;
      margin: 16px 0 23px;
    }
    .retry-btn {
      width: 140px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #c3c3c3;
      font-size: 15px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 2px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 20px;
      color: #777;
      .van-info {
        font-size: 8px;
        background-color: #e22829;
      }
    }
  }
}
</style>
