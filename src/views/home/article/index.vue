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
    <h5 v-text="article.title"></h5>
  </div>
</template>

<script>
import { articleInfo } from '@/api/article-request'

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
    }
  }
}
</script>

<style lang="less" scoped>
h5{
  padding-top: 20px;
}
</style>
