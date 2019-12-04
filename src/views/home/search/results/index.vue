<template>
  <div class="search">
      <!-- 顶部栏 -->
    <van-nav-bar
      fixed
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 数据列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="article in articles"
        :key="article.art_id"
        :title="article.title"
      >
       <!-- 图拍预览 -->
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
        <van-row slot="label" type="flex" align="center">
          <van-col span="4" v-if="article.is_top">
            <van-tag round plain type="danger">已置顶</van-tag>
          </van-col>
          <van-col span="6">
            {{article.aut_name}}
          </van-col>
          <van-col span="6">
            评论:({{article.collect_count}})
          </van-col>
          <van-col span="6">
            {{article.pubdate | relativeTime}}
          </van-col>
        </van-row>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search-request'

export default {
  name: 'Search',
  data () {
    return {
      articles: [], // 文章列表
      loading: false, // 加载状态
      finished: false, // 结束加载
      page: 1 // 请求页数
    }
  },

  computed: {
    title () {
      return `${this.$route.params.q}搜索结果`
    }
  },

  methods: {
    async onLoad () {
      // 发送请求
      const response = await getSearch({
        page: this.page,
        per_page: 20,
        q: this.$route.params.q
      })
      const articles = response.data.data.results
      this.articles.push(...articles)
      console.log(articles)
      // 加载状态结束
      this.loading = false

      // 数据是否全部加载完成
      articles.length ? this.page++ : this.finished = true
    }
  }
}
</script>

<style lang="less" scoped>
.van-list{
    margin-top: 46px;
}
</style>
