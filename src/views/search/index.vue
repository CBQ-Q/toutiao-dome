<template>
  <div class="mySearch">
    <!-- 搜索栏 -->
    <form action="/" class="from">
    <!-- 搜索组件中有个获得焦点事件 如果获得焦点那么显示 搜索联想组件 -->
    <van-search
      v-model="searchText"
      shape="round"
      show-action
      placeholder="请输入搜索关键词"
      background="#3296fa"
      @search="onSearch"
      @cancel="onCancel"
      @focus="isshow = false"
  />
  </form>
  <!-- 搜索栏 -->
  <!-- 搜索结果 -->
  <!-- // isshow = true 则显示 -->
   <search-result
    v-if="isshow"
   :searchTexts = "searchText"
   />
  <!-- 搜索结果 -->

  <!-- 搜索联想 -->
  <!-- // 如果文本框在输入 有内容则显示 -->
   <search-sugges
    v-else-if="searchText"
    :searchTexted = "searchText"
    @search="onSearch"
    />
  <!-- 搜索联想 -->

  <!-- 搜索历史 -->
  <!-- // 不显示结果则显示历史 -->
    <search-histoy
     v-else
     :seaHistoyed="seaHistoy"
     @delSearchAll="seaHistoy = [] "
     @search="onSearch"
     />
  <!-- 搜索历史 -->

  </div>
</template>

<script>
import { getItem, setItem } from '@/utils/storage'
import searchHistoy from './component/search-histoy.vue'
import searchResult from './component/search-result.vue'
import searchSugges from './component/search-sugges.vue'
export default {
  name: 'mySearch',
  components: {
    searchHistoy,
    searchResult,
    searchSugges
  },
  props: {},
  data () {
    return {
      searchText: '',
      isshow: false,
      // 存入搜索值用
      seaHistoy: getItem('TOUTIAO_HISTOY') || []
    }
  },
  watch: {
    // 在这里监听输入框数组值的变化 存入本地
    // 监听属性要属性有变化才触发
    seaHistoy: {
      handler (val) {
        setItem('TOUTIAO_HISTOY', val)
      }
    }
  },
  computed: {},
  methods: {
    onSearch (val) {
      this.searchText = val
      // console.log(val)
      // 筛选相同的搜索数据 删除 同时新的就还是添加到前面了 这里是查找数组中相同元素的下标再删除
      const index = this.seaHistoy.indexOf(val)
      //  判断有没有 不等于-1就是有
      if (index !== -1) {
        this.seaHistoy.splice(index, 1)
      }
      // 声明一个数组储存每次搜索的历史记录 存到最前面
      this.seaHistoy.unshift(val)
      // 点击搜索后会执行这个方法
      this.isshow = true
    },
    onCancel () {
      // 点击取消时触发
      this.$router.back()
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
.mySearch {
  padding-top: 54px;
  .van-search__action {
    color: #fff;
  }
  .from {
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
    right: 0;
  }
}
</style>
