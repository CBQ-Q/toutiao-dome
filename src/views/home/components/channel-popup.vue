<!-- eslint-disable vue/no-mutating-props -->
<!-- eslint-disable vue/no-mutating-props -->
<template>
   <div class="channel-popup">
    <!-- 我的频道 -->
    <van-cell class="ddd">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
      class="popup-btn"
      type="danger"
      round
      plain
      size="mini"
      @click="isShow = !isShow"
      >{{isShow ? '完成' : '编辑'}}</van-button>
    </van-cell>
    <van-grid :gutter="10">
    <van-grid-item
     class="grid-item"
     v-for="(channel , index) in channels"
      :key="index"
      @click="mirroring(channel,index)"
      >
        <!-- 这里表示isSho为ture时候并且不包含id为0的显示 ，推荐频道就是id就是0 -->
       <van-icon
        v-show="isShow && !fiexChannel.includes(channel.id)"
         slot="icon" name="clear"></van-icon>
        <span class="text"
         slot="text"
        :class="{active: active === index }"
        >
          {{channel.name}}
        </span>
      </van-grid-item>
    </van-grid>
     <!-- 我的频道 -->

    <!-- 频道推荐 -->
      <van-cell>
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
    <van-grid-item
     class="grid-item"
     v-for="value in recommendChannels"
      :key="value.id"
      :text="value.name"
      @click="addchannel(value)"
       />
    </van-grid>
      <!-- 频道推荐 -->
   </div>
</template>

<script>
import { channelAll, addUserChannel, Deletechannel } from '@/api/channel'
import { mapState } from 'vuex'
import { setUser } from '@/utils/storage'
export default {
  name: 'channel-popup',
  props: {
    channels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      channelAlls: [],
      isShow: false, // 控制开关
      fiexChannel: [0] // 固定频道 ，不允许操作
    }
  },
  created () {
    this.channelsAllLoad()
  },
  methods: {
    async channelsAllLoad () {
      try {
        const { data } = await channelAll()
        console.log(data)
        this.channelAlls = data.data.channels
      } catch (error) {
        console.log(error)
      }
    },
    async addchannel (value) {
      console.log(value)
      // eslint-disable-next-line vue/no-mutating-props
      this.channels.push(value)
      // 数据持久化
      // 如果有token就添加到后台没有就保存到本地
      if (this.user) {
        try {
          await addUserChannel({
            id: value.id, // 频道id
            seq: this.channels.length // 序号
          })
        } catch (error) {
          this.$toast('保存失败，请稍后再试')
        }
      } else {
        setUser('TOUTIAO_CHANNEL', this.channels)
      }
    },
    mirroring (channel, index) {
      if (this.isShow) {
        // 如果包阔到了这个返回ture 就不继续往下执行
        if (this.fiexChannel.includes(channel.id)) {
          return
        }
        // 删除频道
        // eslint-disable-next-line vue/no-mutating-props
        this.channels.splice(index, 1)

        // 删除频道数据持久化操作
        this.delChannel(channel)

        if (index <= this.active) {
          // isShow = true 编辑状态 执行删除操作 计算属性全过程监听依赖属性的变化时时改变
          this.$emit('mirror', this.active - 1, true)
        }
      } else {
        // 否则点击跳转 跳转的话就不传false过去让popup弹出框不显示
        this.$emit('mirror', index, false)
      }
    },
    // 删除数据频道
    async delChannel (channel) {
      if (this.user) {
        try {
          await Deletechannel(channel.id)
        } catch (error) {
          this.$toast('删除失败')
        }
      } else {
        // 没有登录 直接本地覆盖
        setUser('TOUTIAO_CHANNEL', this.channels)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      const channelStr = []
      // 遍历获取数据存入数组的所有频道
      this.channelAlls.forEach(str => {
        // 赛选我的频道数组里已有频道id
        const res = this.channels.find(strs => {
          // 对比拿到相同频道
          return strs.id === str.id
        })

        if (!res) {
          // 把我的频道没有的频道push到新数组
          channelStr.push(str)
        }
      })
      // 返回该数组
      return channelStr
    }
  }

}
</script>
<style lang='less' scoped>
.channel-popup {
  padding: 43px 0;
  .ddd {
    // text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title-text {
    color: #333333;
    font-size: 16px;
  }
  .popup-btn {
    width: 52px;
    height: 24px;
    line-height: 24px;
    font-size: 13px;
    color: #f85959;
    border: 1px solid #f85959;
  }
 /deep/ .grid-item {
    width: 80px;
    height: 43px;
    .van-grid-item__content {
      position: relative;
     background-color: #f4f5f6;
     .van-grid-item__text, .text {
      font-size: 14px;
      color: #222;
      margin-top: 0;
      // 文字在一行
      white-space: nowrap;
     }
     .active {
      color: red;
     }
     .van-grid-item__icon-wrapper {
      position: unset;
     }
     .van-icon {
      position: absolute;
      font-size: 15px;
      right: -6px;
      top: -6px;
      color: rgb(177, 32, 32);
      z-index: 999;
     }
    }
  }
}
</style>
