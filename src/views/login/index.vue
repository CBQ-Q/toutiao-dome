<!-- eslint-disable no-undef -->
<!-- eslint-disable no-undef -->
<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon
      slot="left"
      name="arrow-left"
      @click="$router.back()" />
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form ref="biaodanForm" @submit="onSubmit">
  <van-field
    name="mobile"
    placeholder="请输入手机号"
    v-model="user.mobile"
    :rules="userForm.mobile"
    type="number"
    maxlength="11"
  >
  <i slot="left-icon" class="iconfont icon-shouji"></i>
  </van-field>
  <van-field
    name="code"
    placeholder="请输入验证码"
     v-model="user.code"
     :rules="userForm.code"
     type="number"
     maxlength="11"
  >
  >
  <i slot="left-icon" class="iconfont icon-yanzhengma"><div></div></i>
    <template #button>
      <van-count-down
      v-if="outTime"
      :time="300 * 10"
       format="ss s"
       @finish="outTime = false"
       />
    <van-button
    v-else
     native-type="button"
     class="btn-sms" round size="small"
      type="default"
       @click="onYan"
       >发送验证码</van-button>
  </template>
  </van-field>
  <div class="login-btn-warp">
    <van-button class="login-btn"  block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      userForm: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /1[3|5|6|9|7|8]\d{9}/,
          message: '手机号不正确'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      outTime: false

    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      //  获取表单验证
      const user = this.user
      // 表单验
      // 提交表单信息请求登录
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true
      })
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // 登录成功跳转回我的页面
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机或验证码错误')
        } else {
          this.$toast.fail('登录失败')
        }
      }
      // 根据请求响应结果处理后续操作
    },
    async onYan () {
      try {
        // vant组件手机验证
        await this.$refs.biaodanForm.validate('mobile')
      } catch (err) {
        return console.log(err)
      }
      this.outTime = true

      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.outTime = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁')
        }
      }
    }
  }
}
</script>
<style scoped lang="less">
.page-nav-bar{
  background-color: #3296fa;
::v-deep .van-nav-bar__title, .van-icon{
    color: white;
  }
    }
  .login-container{
    .iconfont{
      font-size: 19px;
    }
    .btn-sms{
      width: 80px;
      height: 23px;
      line-height:23px;
      background-color: #ededed;
      font-size: 11px;
      color:#666666;
    }
    .login-btn-warp{
      padding: 27px 14px;
      .login-btn{
        background-color: #6db4fb;
        border:none;
      }
    }
    }
</style>
