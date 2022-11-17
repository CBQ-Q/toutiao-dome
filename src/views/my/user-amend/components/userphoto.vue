<template>
   <div class="suerphoto">
    <img :src="this.img" class="img" ref="img">
    <div class="bottombox">
      <div class="quxiao" @click="$emit('close')">取消</div>
      <div class="wancheng" @click="onphoto">完成</div>
    </div>
   </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updataphoto } from '@/api/user'
export default {
  name: 'userPhoto',
  components: {},
  props: {
    img: {
      type: [Object, String],
      required: true
    }
  },
  data () {
    return {
      cropper: ''
    }
  },
  watch: {},
  computed: {},
  methods: {
    onphoto () {
      // 基于服务端的图片裁切使用 getData 方法获取裁切参数
      // this.cropper.getData()

      // 客户端裁切使用 getCroppedCanvas() 方法 获取裁切文件对象
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        // 如果接口要求的是 application/json格式 就用普通参数
        // await updataphoto({
        //   photo: blob
        // })
        // 如果接口要求的是 from-data格式
        // 就必须传递 FormData 对象
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await updataphoto(formData)

        // 取消弹窗
        this.$emit('close')

        // 修改视图
        this.$emit('updata-photo', data.data.photo)
      })
    }
  },
  created () {},
  mounted () {
    // 要操作dom 要再挂载后
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  }
}
</script>
<style lang="less" scoped>
.suerphoto {
  background-color: black;
  height: 100%;
    .bottombox {
      position: fixed;
      left: 0;
      bottom: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      .quxiao, .wancheng {
        width: 45px;
        height: 45px;
        font-size: 16px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
}
  .img {
    display: block;
    max-width: 100%;
  }

</style>
