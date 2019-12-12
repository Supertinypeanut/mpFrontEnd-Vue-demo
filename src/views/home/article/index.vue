<template>
  <div class="article">
    <!-- 顶部栏 -->
    <van-nav-bar
      fixed
      left-text="返回"
      left-arrow
      @click-left="$router.push('/')"
    >
     <van-icon slot="right" size="26" name="ellipsis" />
    </van-nav-bar>
    <van-skeleton
      title
      :loading="loading"
      :row="2"
    >
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
          <van-button
            round
            size="small"
            hairline
            type="primary"
            :plain="!(article.attitude == 1)"
            icon="good-job-o"
            @click="onToggleLikeArticle(article.art_id)"
          >
            {{ article.attitude == 1 ?'已点赞': '点赞' }}
          </van-button>
        </van-col>
        <van-col span="5">
          <van-button
            round
            size="small"
            hairline
            type="danger"
            :plain="article.attitude !== 0"
            icon="delete"
            @click="onToggleDisLikeArticle(article.art_id)"
          >
            {{ article.attitude == 0 ? '取消' :'不喜欢' }}
          </van-button>
        </van-col>
      </van-row>

      <van-divider>文章评论</van-divider>
      <!-- 评论组件 -->
      <article-comment></article-comment>
    </van-skeleton>

    <!-- 填充屏幕骨架屏 -->
    <van-skeleton title :loading="loading" avatar :row="2" />
    <van-skeleton title :loading="loading" :row="9" />
    <van-skeleton title :loading="loading" :row="3" />
  </div>
</template>

<script>
import {
  articleInfo,
  followings,
  unFollowings,
  likeArticle,
  cancelLikeArticle,
  disLikeArticle,
  cancelDisLikeArticle
} from '@/api/article-request'
import ArticleComment from './components/article-comment'

export default {
  name: 'Article',
  data () {
    return {
      article: {}, // 文章信息对象
      loading: true, // 开启骨架屏
      loadError: false // 页面数据异常提示
    }
  },

  created () {
    // 加载页面数据
    this.loadData()
  },

  components: {
    ArticleComment
  },
  methods: {
    // 获取文章详情与评论信息
    async loadData () {
      // 捕获页面数据请求失败异常
      try {
        const response = await articleInfo(this.$route.params.article_ID)
        this.article = response.data.data

        // 关闭骨架屏
        this.loading = false
      } catch (error) {
        // 使用对话框
        this.$dialog.confirm({
          title: '加载失败',
          message: '是否需要重新加载'
        }).then(() => {
          this.loadData()
        }).catch(() => {
          this.$router.back()
        })
      }
    },

    // 关注按钮
    async onToggleFollow (targetID) {
      let isFollowed = this.article.is_followed
      isFollowed = !isFollowed
      // 对不同状态下发送不同的关注请求
      isFollowed ? await followings(targetID) : await unFollowings(targetID)
      this.article.is_followed = isFollowed
    },

    // 点赞按钮
    async onToggleLikeArticle (targetID) {
      // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
      let attitude = this.article.attitude

      if (attitude !== 1) {
        attitude = 1
        //  发送点赞请求
        await likeArticle(targetID)
      } else {
        attitude = -1
        //  取消点赞请求
        await cancelLikeArticle(targetID)
      }

      // 改变视图
      this.article.attitude = attitude
    },

    // 不喜欢按钮
    async onToggleDisLikeArticle (targetID) {
      // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
      let attitude = this.article.attitude

      if (attitude !== 0) {
        attitude = 0
        //  发送不喜欢请求
        await disLikeArticle(targetID)
      } else {
        attitude = -1
        //  取消不喜欢请求
        await cancelDisLikeArticle(targetID)
      }

      // 改变视图
      this.article.attitude = attitude
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

.van-skeleton{
  margin-top: 20px;
}

.van-image{
  margin-right: 10px;
}
</style>
