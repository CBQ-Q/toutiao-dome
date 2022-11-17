<template>
  <div class="userbirthday">
  <van-datetime-picker
  v-model="currentDate"
  type="date"
  title="选择年月日"
  :min-date="minDate"
  :max-date="maxDate"
  @cancel="$emit('close')"
  @confirm="amendusered"
  />
  </div>
</template>

<script>
import { amenduser } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'userBirthday',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1960, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  watch: {},
  computed: {},
  methods: {
    async amendusered () {
      // 后端需要的是字符串格式的时间所以要转换一下
      const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
      this.$toast.loading({
        message: '保存中',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示 成功会自动关闭
      })
      try {
        // 改什么请求传什么 按接口描述来
        await amenduser({ birthday: currentDate })
        // 成功 跟新视图响应v-model 修改对象里的对应数据视图也就显示不同
        this.$emit('input', currentDate)
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
</style>
