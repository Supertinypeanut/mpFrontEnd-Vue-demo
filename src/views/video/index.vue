<template>
  <div>
    <!-- 顶部栏 -->
    <van-nav-bar title="视频"/>
    <!-- 顶部栏 -->

    <!-- 视频列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item"
      >
        <!-- 视频组件 -->
        <video-player
          :options="playerOptions"
          slot="title"
          ></video-player>
      </van-cell>
    </van-list>
    <!-- 视频列表 -->

  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'Video',
  data () {
    return {
      playerOptions: {
        // videojs options
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm'
        }],
        poster: '/static/images/author.jpg'
      },
      list: [],
      loading: false,
      finished: false
    }
  },
  components: {
    videoPlayer
  },

  methods: {
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }

}
</script>

<style scoped lang="less">
/deep/ .video-js{
  width: 95%;
  height: 5rem;
  margin: 10px;
  border-radius: 10px;
  overflow: hidden;
}

</style>
