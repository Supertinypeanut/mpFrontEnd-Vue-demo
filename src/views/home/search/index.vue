<template>
  <div class="search">
      <!-- 顶部搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @focus="historiesShow = false"
        @blur="historiesShow = true"
        @search="onSearch"
        @cancel="$router.back()"
        @input="onSuggestion"
      />
    </form>

    <!-- 下拉联想 -->
    <van-cell-group v-show="!historiesShow">
      <van-cell
      icon="search"
      v-for="item in suggestion"
      :key="item"
      >
      <span slot="title" v-html="lightSuggestionKey(item)"></span>
      </van-cell>
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group v-show="historiesShow">
      <van-cell style="color:#969799;" title="历史记录">
        <span>全部删除</span>&nbsp;&nbsp;
        <span>完成</span>
        <van-icon name="delete" />
      </van-cell>
      <van-cell title="记录" >
        <van-icon name="close" slot="right-icon"></van-icon>
      </van-cell>
      <van-cell title="记录" >
        <van-icon name="close" slot="right-icon"></van-icon>
      </van-cell>
      <van-cell title="记录" >
        <van-icon name="close" slot="right-icon"></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search-request'

export default {
  name: 'Search',
  data () {
    return {
      searchText: '', // 输入内容
      historiesShow: true, // 历史记录是否显示
      suggestion: [] // 下拉联想数组
    }
  },

  created () {

  },

  methods: {
    async onSuggestion (searchText) {
      // 获取下联想数组
      if (searchText.trim()) {
        // 发送请求
        const response = await getSuggestion(searchText)
        this.suggestion = response.data.data.options
      }
    },

    lightSuggestionKey (suggestionText) {
      // 高亮联想关键词
      const reg = new RegExp(this.searchText, 'g') // 对应替换正则
      const str = `<span style="color:red;">${this.searchText}</span>` // 对应转换内容
      return suggestionText.replace(reg, str)
    },

    onSearch () {

    }
  }
}
</script>

<style>

</style>
