<template>
  <div class="first">
    <van-nav-bar title="首页"></van-nav-bar>
    <!-- tab标签页 -->
    <van-tabs v-model="active" animated>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
      <!-- 下拉刷新 -->
        <van-pull-refresh v-model="channel.isLoading" @refresh="onRefresh">
          <!-- 列表 -->
          <van-list
            v-model="channel.loading"
            :finished="channel.finished"
            finished-text="没有更多了"
            @load="onLoad(channel)"
          >
            <van-cell
              v-for="article in channel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 导入首页API
import { channels, articles } from '@/api/home-request'

export default {
  name: 'Content',

  data () {
    return {
      active: 0, // 当前频道索引
      channels: [] // 频道列表
    }
  },

  created () {
    // 首页频道列表数据
    this.getChannels()
  },

  methods: {
    // 下拉刷新事件
    async onRefresh () {
      const channel = this.channels[this.active]
      // 发送刷新请求
      const response = await articles({
        channel_id: channel.id,
        timestamp: Date.now(),
        with_top: 1
      })

      // 存储刷新返回数据
      const articlesArr = response.data.data.results
      channel.articles.unshift(...articlesArr)

      // 提示用户信息
      articlesArr.length
        ? this.$toast(`更新了${articlesArr.length}条数据`)
        : this.$toast('暂无最新数据')

      // 关闭下拉刷新数据状态
      channel.isLoading = false
    },

    // 获取频道列表
    async getChannels () {
      const response = await channels()
      const channelsArr = response.data.data.channels
      // 初始化频道各自的私有数据
      channelsArr.forEach(channel => {
        channel.timestamp = null // 是否还有可加载数据
        channel.loading = false // 上拉刷新
        channel.finished = false // 是否加载完毕
        channel.isLoading = false // 下拉刷新
        channel.articles = []
      })
      this.channels = channelsArr
    },

    // 获取频道推荐
    async onLoad (channel) {
      // 发送频道推荐请求
      const response = await articles({
        channel_id: channel.id,
        timestamp: channel.timestamp || Date.now(),
        with_top: 1
      })
      console.log(response.data.data.results)
      // 是否有还需加载
      channel.timestamp = response.data.data.pre_timestamp
      // 文章列表
      channel.articles.push(...response.data.data.results)
      // 关闭上拉加载
      channel.loading = false
      // 判断是否结束加载
      channel.timestamp ? channel.finished = false : channel.finished = true
    }
  }
}
</script>

<style>

</style>
