<template>
<van-picker
  title="标题"
  show-toolbar
  :default-index="value"
  :columns="columns"
  @confirm="amendusered"
  @cancel="$emit('colse')"
  @change="onChange"
/>
</template>

<script>
import { amenduser } from '@/api/user'
export default {
  name: 'userGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      messagegender: this.value
    }
  },
  watch: {},
  computed: {},
  methods: {
    async amendusered () {
      const message = this.messagegender
      this.$toast.loading({
        message: '保存中',
        forbidClick: true, // 紧张背景点击
        duration: 0 // 持续展示 成功会自动关闭
      })
      try {
        // 改什么请求传什么 按接口描述来
        await amenduser({ gender: message })
        // 成功 跟新视图响应v-model 修改对象里的对应数据视图也就显示不同
        this.$emit('input', message)
        // 关闭弹窗
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    },
    // 组件自带方法 可以拿到展示区域的对象 索引等
    onChange (picker, value, index) {
      this.messagegender = index
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
</style>
