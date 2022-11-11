<template>
<!-- // 请求全部文章内容 -->
<!-- 跳转动态路由 -->
<!-- 拼接路径 -->
<!-- :to="'/acticle/'" + article.art_id -->
<!-- :to="`/acticle/${article.art_id}`" -->
   <van-cell
   class="arcitle-item"
   :to="{
    name: 'article',
    params: {
      articleID: article.art_id
    }
   }"
 >
 <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
 <!-- 搞个盒子装图片也是跟,下部信息,分行 -->
 <!-- 插槽也可以分方向 -->
 <div slot="label">
   <div class="cover-wrap" v-if="article.cover.type === 3">
    <van-image
    class="cover-wrap-img"
    v-for="(img,index) in article.cover.images"
    :key="index"
    fit="cover"
    :src="img"
    />
    </div>
 <div class="lablespan">
 <span>{{article.aut_name}}</span>
 <span>{{article.comm_count}}</span>
 <span>{{article.pubdate | relativeTime}}</span>
 </div>
 </div>
 <!-- 判断图片数量 -->
 <van-image
 class="oneimg"
 v-if="article.cover.type === 1"
  slot="default"
   fit="cover"
  :src="article.cover.images[0]"
/>
   </van-cell>
</template>

<script>
export default {
  naem: 'article',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  }

}
</script>
<style lang='less' scoped>
.arcitle-item {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;   //取消flex平分
    width: 116px;
    height: 73px;
    padding-left: 12px;
  }
  .oneimg {
    width: 116px;
    height: 73px;
  }
  .lablespan span {
     font-size: 11px;
     color: #b4b4b4;
     margin-right: 22px;
  }
  .cover-wrap {
    display: flex;
    padding: 15px 0;
    .cover-wrap-img {
    flex: 1;
    height: 73px;
    padding-right: 2px;

    }
  }
}
</style>
