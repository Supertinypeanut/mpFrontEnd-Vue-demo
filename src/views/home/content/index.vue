<template>
  <div class="first">
    <van-nav-bar fixed>
      <van-button
        slot="title"
        round
        type="info"
        size="small"
        @click="$router.push('/search')"
      >
      搜索
      </van-button>
    </van-nav-bar>
    <!-- tab标签页 -->
    <van-tabs v-model="active" animated swipeable>
      <!-- 标签页标签管理按钮 -->
      <div slot="nav-right" class="nav-right">
        <van-icon name="wap-nav" @click='isManage = !isManage' />
      </div>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
      <!-- 下拉刷新 -->
        <van-pull-refresh
          v-model="channel.isLoading"
          @refresh="onRefresh"
        >
          <!-- 列表 -->
          <van-list
            v-model="channel.loading"
            :finished="channel.finished"
            finished-text="没有更多了"
            @load="onLoad(channel)"
          >
            <!-- 单元格 -->
            <van-cell
              v-for="article in channel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
              @click="$router.push({name:'Article',params:{article_ID:article.art_id}})"
            >
              <!-- 图片预览 -->
              <van-grid
                slot="label"
                :border="false"
                :column-num="3"
              >
                <van-grid-item
                  v-for="(image,index) in article.cover.images"
                  :key="index"
                >
                  <lazy-component>
                    <van-image
                      lazy-load
                      :src="image"
                    >
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                    </van-image>
                  </lazy-component>
                </van-grid-item>
              </van-grid>
              <!-- 标签 tag -->
              <van-row slot="label" type="flex">
                <van-col span="4" v-if="article.is_top">
                  <van-tag round plain type="danger">已置顶</van-tag>
                </van-col>
                <van-col span="6">
                  {{article.aut_name}}
                </van-col>
                <van-col span="4">
                  评论:({{ article.comm_count}})
                </van-col>
                <van-col span="12">
                  {{article.pubdate | relativeTime}}
                </van-col>
              </van-row>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 频道管理弹出层 -->
    <van-popup
      v-model="isManage"
      position="bottom"
      closeable
      close-icon-position="top-left"
      round
      :style="{ height: '90%' }"
      @open="onChannelOpen"
    >
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">我的频道</span>
        </template>
        <van-tag
          slot="right-icon"
          type="danger"
          @click="editChannels = !editChannels "
        >
        {{ editChannels ? '完成' : '编辑'}}
        </van-tag>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
          v-for="(channel,index) in channels"
          :key="channel.id"
          :text="channel.name"
          @click="onNotEditClick(index)"
        >
        <van-icon
          slot="icon"
          name="clear"
          v-show="editChannels && channel !==channels[0]"
          @click="onClearChannel(channel)"
        />
        </van-grid-item>
      </van-grid>
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">其他频道</span>
        </template>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
          v-for="channel in otherChannels"
          :key="channel.id"
          :text="channel.name"
          @click="onAddChannel(channel)"
        />
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
// 导入本地存储API
import { getItem, setItem } from '@/utils/storage'
// 导入首页API
import { channels, articles, allChannels, deleteChannel, addChannel } from '@/api/home-request'

export default {
  name: 'Content',

  data () {
    return {
      active: 0, // 当前频道索引
      channels: [], // 频道列表
      isManage: false, // 频道管理
      allChannels: [], // 所有频道
      editChannels: false // 我的频道清除按钮
    }
  },

  computed: {
    // 其他频道
    otherChannels () {
      return this.allChannels.filter(allItem =>
        this.channels.every(item =>
          item.id !== allItem.id)
      )
    }
  },

  watch: {
    // 将频道列表及文章持久化
    channels: {
      handler () {
        setItem('channels', this.channels)
      },
      deep: true
    },

    // 监视频道管理弹出状态，只要关闭，清除频道按钮状态也应关闭
    isManage () {
      if (!this.isManage) this.editChannels = false
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

    // 获取用户频道
    async getChannels () {
      let channelsArr = []
      // 查看本地是否有数据
      const localChannels = getItem('channels')
      if (localChannels) {
        channelsArr = localChannels
      } else {
        const response = await channels()
        channelsArr = response.data.data.channels
        // 初始化频道各自的私有数据
        channelsArr.forEach(channel => {
          channel.timestamp = null // 是否还有可加载数据
          channel.loading = false // 上拉刷新
          channel.finished = false // 是否加载完毕
          channel.isLoading = false // 下拉刷新
          channel.articles = [] // 频道文章
        })
      }
      this.channels = channelsArr
    },

    // 获取频道文章列表
    async onLoad (channel) {
      // 发送频道推荐请求
      const response = await articles({
        channel_id: channel.id,
        timestamp: channel.timestamp || Date.now(),
        with_top: 1
      })
      // 是否有还需加载
      channel.timestamp = response.data.data.pre_timestamp
      // 文章列表
      channel.articles.push(...response.data.data.results)
      // 关闭上拉加载
      channel.loading = false
      // 判断是否结束加载
      channel.timestamp ? channel.finished = false : channel.finished = true
    },

    // 获取所有频道
    async onChannelOpen () {
      const response = await allChannels()
      const isAllChannels = response.data.data.channels
      isAllChannels.forEach(channel => {
        channel.timestamp = null // 是否还有可加载数据
        channel.loading = false // 上拉刷新
        channel.finished = false // 是否加载完毕
        channel.isLoading = false // 下拉刷新
        channel.articles = [] // 频道文章
      })
      this.allChannels = isAllChannels
    },

    // 移除我的频道
    onClearChannel (channel) {
      const channels = this.channels
      channels.splice(channels.indexOf(channel), 1)
      // 发送移除请求
      deleteChannel(channel.id)
    },

    // 添加用户频道
    onAddChannel (channel) {
      this.channels.push(channel)
      // 发送添加请求
      addChannel(channel)
    },

    // 非编辑状态下点击我的频道
    onNotEditClick (index) {
      if (this.editChannels) return
      this.active = index
      this.isManage = false
    }
  }
}
</script>

<style scoped lang="less">
// 搜索按钮
.van-button{
  width: 100%;
  background-color: #59abfe;
}

// 顶部样式
/deep/ .van-tabs__wrap{
  position: fixed;
    z-index: 2;
    width: 100%;
    top: 44px;
}

// 频道列表样式
/deep/ .van-tabs__content{
  margin-top: 90px;
}

//  列表底部
.van-list{
  padding-bottom: 40px;
}

//
/deep/.van-image__img {
  height: 100px;
}

// tag标签样式
/deep/ .van-row{
  align-items: center;
  .van-tag{
    transform: scale(.7)
  }
}

// 频道管理按钮
.nav-right{
  position: sticky;
  right: 0;
  display: flex;
  align-items: center;
  background-color: #fff;
}

// 频道管理弹出层
.van-popup{
  padding-top: 30px;
  .van-grid{
    padding-top: 10px;
      /deep/ .van-grid-item__icon-wrapper{
      position: absolute;
      right: -2px;
      top: -2px;
      transform: scale(.7)
    }
  }
}
</style>
