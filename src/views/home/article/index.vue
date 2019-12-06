<template>
  <div class="article">
    <!-- 顶部栏 -->
    <van-nav-bar
      fixed
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    >
     <van-icon slot="right" size="26" name="ellipsis" />
    </van-nav-bar>
    <!-- 标题 -->
    <van-cell class="title" :value="article.title" />
    <!-- 用户信息 -->
    <van-cell
      :title="article.aut_name"
      :label="article.pubdate | relativeTime"
    >
      <van-image
        slot="icon"
        width="1rem"
        height="1rem"
        round
        fit="fill"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <van-button
        slot="right-icon"
        size="small"
        round
        :plain="!article.is_followed"
        type="info"
        @click="onToggleFollow(article.aut_id)"
      >
        {{article.is_followed ? '已关注':'+关注' }}
      </van-button>
    </van-cell>
    <!-- 内容 -->
    <van-cell>
      <p v-html="article.content"></p>
    </van-cell>
    <!-- 猜你喜欢 -->
    <van-cell
      style="font-weight:bolder"
      value="猜你喜欢"
      v-show="article.recomments"
    />
    <van-row>
      <van-col
        span="12"
        v-for="(item,index) in article.recomments"
        :key="index"
        v-text="itme"
      >
      </van-col>
      <van-row type="flex" justify="center">
        <van-col></van-col>
      </van-row>
    </van-row>
    <!-- 不喜欢与点赞 -->
    <van-row type="flex" justify="center">
      <van-col span="5">
        <van-button round size="small" hairline type="primary" plain icon="good-job-o">点赞</van-button>
      </van-col>
      <van-col span="5">
        <van-button round size="small" hairline type="danger" plain icon="delete">不喜欢</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { articleInfo, followings, unFollowings } from '@/api/article-request'

export default {
  name: 'Article',
  data () {
    return {
      article: {} // 文章信息对象
    }
  },

  created () {
    // 加载页面数据
    this.loadData()
  },

  methods: {
    // 获取文章详情与评论信息
    async loadData () {
      const response = await articleInfo(this.$route.params.article_ID)
      console.log(response)
      this.article = response.data.data
    },

    // 关注按钮
    async onToggleFollow (targetID) {
      let ifFollowed = this.article.is_followed
      ifFollowed = !ifFollowed
      // 对不同状态下发送不同的关注请求
      ifFollowed ? await unFollowings(targetID) : await followings(targetID)
      this.article.is_followed = ifFollowed
    }
  }
}
</script>

<style lang="less" scoped>
.title{
  padding-top: 60px;
  font-weight: bolder;
  font-size: 20px;
}
</style>
