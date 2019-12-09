<template>
  <div class="chat-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="小智同学"
      left-arrow
      @click-left="$router.back()"
      fixed
    />
    <!-- /导航栏 -->

    <!-- 消息列表 -->
    <div class="message-list" ref="message-list">
      <div
        class="message-item"
        :class="{ reverse: message.isMe }"
        v-for="(message,index) in messageQueue"
        :key="index"
      >
        <van-image
          class="avatar"
          slot="icon"
          round
          width="30"
          height="30"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="title">
          <span>{{ `hello${message.msg}` }}</span>
        </div>
      </div>
    </div>
    <!-- /消息列表 -->

    <!-- 发送消息 -->
    <van-cell-group class="send-message">
      <van-field
        v-model="message"
        center
        clearable
      >
        <van-button
          slot="button"
          size="small"
          type="primary"
          @click="onEmitMessage"
        >发送</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发送消息 -->
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'RobotChat',
  data () {
    return {
      message: '',
      socket: null,
      messageQueue: []
    }
  },

  created () {
    this.socket = io('http://ttapi.research.itcast.cn')
    this.socket.on('message', data => {
      // 加入消息列表
      this.messageQueue.push(data)
    })
  },

  mounted () {
    window.list = this.$refs['message-list']
  },

  methods: {
    // 发送按钮
    onEmitMessage () {
      const message = this.message.trim()
      if (!message) {
        return
      }

      const data = {
        msg: this.message,
        timestamp: Date.now()
      }
      // 发送消息
      this.socket.emit('message', data)

      // 加入标记是否是自己发送
      data.isMe = true
      // 加入消息列表
      this.messageQueue.push(data)
    }
  }
}
</script>

<style scoped lang='less'>
.chat-container {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 46px 0 50px 0;
  top: 0;
  left: 0;
  box-sizing: border-box;
  background: #f5f5f6;
  .message-list {
    height: 100%;
    overflow-y: scroll;
    .message-item {
      display: flex;
      align-items: center;
      padding: 10px;
      .title {
        background: #fff;
        padding: 5px;
        border-radius: 6px;
        margin-right: 30px;
      }
      .avatar {
        width: 10%;
        margin-right: 5px;
      }
    }
    .reverse {
      flex-direction: row-reverse;
      .title {
        margin-right: 5px;
      }
    }
  }

  .send-message {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #f5f5f6 !important;
  }
}
</style>
