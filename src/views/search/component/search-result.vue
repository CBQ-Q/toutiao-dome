<template>
  <div class="searchResult">
  <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  :error.sync="error"
  error-text="加载失败"
  @load="onLoad"
>
  <van-cell
   v-for="(article, index) in list"
   :key="index"
   :title="article.title" />
 </van-list>
  </div>
 </template>

<script>
import { getresult } from '@/api/search'
export default {
  name: 'searchResult',
  components: {},
  props: {
    searchTexts: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 15,
      error: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    async onLoad () {
      try {
        const { data } = await getresult({
          page: this.page,
          per_page: this.perpage,
          q: this.searchTexts
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false

        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.loading = false
      }
    }
  },

  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
  .searchResult {
    height: 92vh;
    overflow-y: auto;
  }
</style>
