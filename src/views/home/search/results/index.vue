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
        v-for="item in list"
        :key="item.art_id"
        :title="item.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearch } from '@/api/search-request'

export default {
  name: 'Search',
  data () {
    return {
      list: [],
      loading: false,
      finished: false
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
        page: 1,
        per_page: 20,
        q: this.$route.params.q
      })
      console.log(response)
      this.list.push(...response.data.data.results)

      //   将搜索结果存入Vuex容器中
      this.$store.commit('keepSearchResults', response.data.data.results)
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

<style>

</style>
