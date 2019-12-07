<template>
  <div class="article-comment">
     <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="comment in comments"
        :key="comment.com_id.toString()"
      >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <span style="color: #466b9d;" slot="title">{{comment.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{comment.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{comment.pubdate | relativeTime}}</span>
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon
          slot="right-icon"
          :name="comment.is_liking ? 'like' : 'like-o'"
          @click="onToggleCommentLiking(comment)"
        />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->
    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field
        clearable
        placeholder="请输入评论内容"
      >
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import { comments, commentsLiking, cancelCommentsLiking } from '@/api/article-comment-request'

export default {
  name: 'ArticleComment',
  props: {},
  data () {
    return {
      comments: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      lastId: undefined // 本次返回结果的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为NULL
    }
  },

  created () {

  },

  methods: {
    //   上拉刷新，自动填满屏幕
    async onLoad () {
    // 获取评论
      const response = await comments({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.$route.params.article_ID, // 源id，文章id或评论id
        offset: this.lastId, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: undefined // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      })
      console.log(response)
      this.comments.push(...response.data.data.results)
      this.loading = false

      const lastId = response.data.data.last_id
      lastId ? this.lastId = lastId : this.finished = true
    },

    // 对评论点赞
    async onToggleCommentLiking (comment) {
      // 获取点击评论id与当前是否
      const targetID = comment.com_id.toString()

      // 校验是否喜欢
      comment.is_liking
        ? await cancelCommentsLiking(targetID)
        : await commentsLiking(targetID)

      // 更改状态数据
      comment.is_liking = !comment.is_liking
    }
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}

.van-icon-like,.van-icon-like-o{
    color: red
}
</style>
