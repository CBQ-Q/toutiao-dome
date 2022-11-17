<template>
  <div class="userpop">
    <van-nav-bar
    class="amendname"
    title="修改昵称"
    left-text="取消"
    right-text="完成"
    @click-left="$emit('close')"
    @click-right="amendusered"
     />
    <div class="shurukuan">
  <van-field
  v-model="message"
  rows="2"
  autosize
  type="textarea"
  maxlength="10"
  placeholder="请输入新昵称"
  show-word-limit
/>
    </div>
  </div>
</template>

<script>
import { amenduser } from '@/api/user'
export default {
  name: 'userPop',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: this.value
    }
  },
  watch: {},
  computed: {},
  methods: {
    async amendusered () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true, // 紧张背景点击
        duration: 0 // 持续展示 成功会自动关闭
      })
      try {
        const messaged = this.message.trim()
        if (!messaged.length) {
          return this.$toast('不能为空')
        }
        await amenduser(messaged)
        // 成功 跟新视图响应v-model
        this.$emit('input', messaged)
        // 关闭弹窗
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (error) {
        this.$toast.fail('更新失败')
      }
    }
  },
  created () {},
  mounted () {}
}
</script>
<style lang="less" scoped>
.userpop {
  .shurukuan {
    margin: 10px;
  }
}
</style>
