<template>
  <div class="first">
    <van-nav-bar title="首页"></van-nav-bar>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- 列表 -->
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="item in list"
          :key="item"
          :title="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'First',
  data () {
    return {
      isLoading: false,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    // 下拉刷新事件
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
      }, 500)
    },
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

<style>

</style>
