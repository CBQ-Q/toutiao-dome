<template>
  <div class="searchSugges">
    <!-- 响应显示高亮搜索显示就必须用v-html -->
      <van-cell
      icon="search"
      v-for="(item, index) in searchList"
      :key="index"
      @click="$emit('search', item)"
      >
      <div slot="title" v-html="lightstr(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
export default {
  name: 'searchSugges',
  components: {},
  props: {
    searchTexted: {
      type: String,
      require: true
    }
  },
  data () {
    return {
      searchList: [],
      tiem: ''
    }
  },
  watch: {
    // 监听搜索框的值变化
    searchTexted: {
      // handler 函数名称是固定的
      handler (val) {
        if (this.tiem) clearTimeout(this.tiem)
        this.tiem = setTimeout(() => {
          this.getSearched(val)
        }, 1000)
      },
      immediate: true // 监听配置后立即触发一次 解决第一次搜索框输入不显示
    }
  },
  computed: {},
  methods: {
    async getSearched (q) {
      try {
        const { data } = await getSearch(q)
        this.searchList = data.data.options
      } catch (error) {
        this.$toast('刷新失败')
      }
    },
    lightstr (item) {
      // 这里运用查找字符串到替换， RegExp是正则表达式构造函数，g表示全局i表示忽略大小写
      // 根据数据变量动态创建正则表达式
      // 替换模板字符串父组件搜索框传入过来的数据
      const datastr = `<span class="active">${this.searchTexted}</span>`
      const res = new RegExp(this.searchTexted, 'gi')
      return item.replace(res, datastr)
    }
  },
  created () {
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.searchSugges {
 /deep/ span.active {
    color: red !important;
  }
}
</style>
