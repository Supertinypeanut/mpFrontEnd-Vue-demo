<template>
  <div class="search">
      <!-- 顶部搜索框 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
        @cancel="$router.back()"
      />
    </form>

    <!-- 下拉联想 -->
    <van-cell-group>
      <van-cell icon="search" title="单元格" />
      <van-cell icon="search" title="单元格" />
      <van-cell icon="search" title="单元格" />
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group >
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
export default {
  name: 'Search',
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    onSearch () {

    }
  }
}
</script>

<style>

</style>
