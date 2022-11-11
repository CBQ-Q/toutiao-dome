<template>
  <div class="searchHistoy">
    <van-cell title="搜索历史">
      <div v-if="delShow">
      &nbsp;&nbsp;&nbsp;
      <span @click="$emit('delSearchAll')">全部删除</span>
      <span @click="delShow = false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="delShow = !delShow"/>
    </van-cell>
    <van-cell
     :title="item"
     v-for="(item, index) in seaHistoyed"
     :key="index"
     @click="delFn(item,index)"
     >
      <van-icon v-if="delShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'searchHistoy',
  components: {},
  props: {
    seaHistoyed: {
      type: Array,
      require: true
    }
  },
  data () {
    return {
      delShow: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    delFn (item, index) {
      // 编辑状态
      if (this.delShow) {
        // eslint-disable-next-line vue/no-mutating-props
        this.seaHistoyed.splice(index, 1)
      } else {
        // 否则 触发父组件方法 添加进入搜索
        this.$emit('search', item)
      }
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
</style>
