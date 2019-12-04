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
        @search="onSearch"
        @cancel="$router.back()"
        @input="onSuggestion"
        @clear="historiesShow = true"
      />
    </form>

    <!-- 下拉联想 -->
    <van-cell-group v-show="!historiesShow">
      <van-cell
      icon="search"
      v-for="item in suggestion"
      :key="item"
      @click="onSearch(item)"
      >
      <span slot="title" v-html="lightSuggestionKey(item)"></span>
      </van-cell>
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group v-show="historiesShow">
      <van-cell style="color:#969799;" title="历史记录">
        <div v-show="isDeleteStatus">
          <span>全部删除</span>&nbsp;&nbsp;
          <span @click="isDeleteStatus = false">完成</span>
        </div>
        <van-icon
          v-show="!isDeleteStatus"
          name="delete"
          @click="isDeleteStatus = true"
        />
      </van-cell>
      <van-cell
        v-for="mark in historyMark"
        :title="mark"
        :key="mark"
      >
        <van-icon
          name="close"
          v-show="isDeleteStatus"
          slot="right-icon"
          >
        </van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { getSuggestion, getSearch } from '@/api/search-request'

export default {
  name: 'Search',
  data () {
    return {
      searchText: '', // 输入内容
      historiesShow: true, // 历史记录是否显示
      suggestion: [], // 下拉联想数组
      isDeleteStatus: false, // 历史记录是否是删除状态
      historyMark: [], // 历史记录数组
      searchResults: [] // 查询的数组
    }
  },

  created () {

  },

  methods: {
    async onSuggestion (searchText) {
      // 获取下联想数组
      this.historiesShow = false
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

    async onSearch (searchText) {
      // 关键词搜索
      // 发送请求
      const response = await getSearch({
        page: 1,
        per_page: 20,
        q: searchText
      })
      //   当前历史记录数组
      const historyMark = this.historyMark
      // 防止历史记录重复，且最新搜索关键词排第一
      if (historyMark.includes(searchText)) {
        //   删除已存在的
        historyMark.splice(historyMark.indexOf(searchText), 1)
      }
      historyMark.unshift(searchText)
      this.historyMark = historyMark
      this.searchResults = response.data.data.results
    }
  }
}
</script>

<style>

</style>
