<template>
 <!-- 导航栏 -->
  <div class="user-amend">
    <van-nav-bar
    class="toubu"
    title="个人信息"
    left-arrow
    @click-left="$router.back()"
     />
     <!-- 导航栏 -->
     <!-- 选文件 hidden隐藏元素-->
     <input type="file" hidden ref="file" @change="onimgFn">
     <!-- 个人信息  -->
     <!-- 拿到了input文件传输的dom 点击单元隔再调用input的点击事件 相当于点击了input -->
     <van-cell
      title="头像"
       is-link
       center
       @click="$refs.file.click()"
       >
      <van-image
      class="myimg"
      fit="cover"
      round
      :src="adduser.photo"
      />
     </van-cell>
     <van-cell
      title="昵称"
       :value="adduser.name"
        is-link
        @click="isusershow = true"
        ></van-cell>
     <van-cell
      title="性别"
       :value="adduser.gender === 0 ? '男' : '女'" is-link
       @click="isgendershow = true"
       ></van-cell>
     <van-cell
      title="生日"
       :value="adduser.birthday"
        is-link
        @click="isuseruserBirthdayshow = true"
        ></van-cell>
     <!-- 个人信息  -->

     <!-- 编辑用户资料弹窗 -->
      <van-popup
      v-model="isusershow"
      style="height: 50%;"
      position="bottom"
      >
      <!-- 给组件传值 应为按正常逻辑来说 点击修改修改框里面应该有要被修改的值 -->
      <!-- 每次取消同时要销毁组件 再到下一次重新渲染 -->
      <userPop
      v-if="isusershow"
      v-model="adduser.name"
       @close="isusershow = false"
       />
      </van-popup>
     <!-- 编辑用户资料弹窗 -->
     <!-- 用户性别编辑弹窗 -->
     <van-popup
      v-model="isgendershow"
      position="bottom"
      >
      <!-- 给组件传值 应为按正常逻辑来说 点击修改修改框里面应该有要被修改的值 -->
      <!-- 每次取消同时要销毁组件 再到下一次重新渲染 -->
      <userGender
      v-if="isgendershow"
      v-model="adduser.gender"
       @close="isgendershow = false"
       />
      </van-popup>
     <!-- 用户性别编辑弹窗 -->
     <!-- 用户生日编辑 -->
       <van-popup
      v-model="isuseruserBirthdayshow"
      style="height: 50%;"
      position="bottom"
      >
      <!-- 给组件传值 应为按正常逻辑来说 点击修改修改框里面应该有要被修改的值 -->
      <!-- 每次取消同时要销毁组件 再到下一次重新渲染 -->
      <userBirthday
      v-if="isuseruserBirthdayshow"
      v-model="adduser.birthday"
       @close="isuseruserBirthdayshow = false"
       />
      </van-popup>
     <!-- 用户生日编辑 -->
     <!-- 头像编辑弹框 -->
     <van-popup
      v-model="isuserPhotoshow"
      style="height: 100%;"
      position="bottom"
      >
      <!-- 给组件传值 应为按正常逻辑来说 点击修改修改框里面应该有要被修改的值 -->
      <!-- 每次取消同时要销毁组件 再到下一次重新渲染 -->
      <userPhoto
       :img="imgs"
       @close="isuserPhotoshow = false"
       @updata-photo="adduser.photo = $event"
       />
      </van-popup>
     <!-- 头像编辑弹框 -->
  </div>
</template>

<script>
import { getuser } from '@/api/user'
import userPop from './components/userpop.vue'
import userGender from './components/usergender.vue'
import userBirthday from './components/userbirthday.vue'
import userPhoto from './components/userphoto.vue'
export default {
  name: 'userAmend',
  components: {
    userPop,
    userGender,
    userBirthday,
    userPhoto
  },
  props: {},
  data () {
    return {
      adduser: {},
      isusershow: false,
      isgendershow: false,
      isuseruserBirthdayshow: false,
      isuserPhotoshow: false,
      imgs: null
    }
  },
  watch: {},
  computed: {},
  methods: {
    async  addgetuser () {
      try {
        const { data } = await getuser()
        this.adduser = data.data
        console.log(this.adduser)
      } catch (error) {
        this.$toast('获取用户资料失败')
      }
    },
    onimgFn () {
      // 获取文件对象
      const myimg = this.$refs.file.files[0]
      // 基于文章对象获取 blob数据
      this.imgs = window.URL.createObjectURL(myimg)
      console.log(this.img)
      // 意思就是拿到图片数据后就显示弹框
      this.isuserPhotoshow = true
      // 如果选择了同一个文件 不会再次触发change事件
      // 解决办法每次使用完毕 把value清空
      this.$refs.file.value = ''
    }
  },
  created () {
    this.addgetuser()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
.user-amend {
  .toubu {
    background-color: rgb(8, 200, 248);
  /deep/ .van-ellipsis {
     color: #fff;
    }
  /deep/  i.van-icon-arrow-left {
      color: #fff;
    }
  }
  .myimg {
    width: 30px;
    height: 30px;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
