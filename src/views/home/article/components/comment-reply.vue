<template>
  <div class="article-comments">
    <!-- 导航栏 -->
    <van-nav-bar >
        <span slot="title">{{reply_count}}条回复</span>
      <van-icon @click="$emit('onCloseCommentReply')" slot="left" name="cross" />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论 -->
    <van-cell title="当前评论">
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px;"
        :src="comment.aut_photo"
      />
      <span style="color: #466b9d;" slot="title">{{ comment.aut_name }}</span>
      <div slot="label">
        <p style="color: #363636;">{{ comment.content }}</p>
        <p>
          <span style="margin-right: 10px;">{{ comment.pubdate | relativeTime}}</span>
          <van-button
            size="mini"
            type="default"
          >回复 {{comment.reply_count}}</van-button>
        </p>
      </div>
      <van-icon slot="right-icon" />
    </van-cell>
    <!-- /当前评论 -->

    <van-cell title="全部评论" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="comment in list"
        :key="comment.com_id.toString()"
      >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="comment.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{ comment.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636;">{{ comment.content }}</p>
          <p>
            <span style="margin-right: 10px;">{{ comment.pubdate | relativeTime}}</span>
            <van-button
              size="mini"
              type="default"
            >回复 {{comment.reply_count}}</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" />
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import {
  comments
//   commentsLiking,
//   cancelCommentsLiking,
//   addComment
} from '@/api/article-comment-request'

export default {
  name: 'CommentReply',
  props: {
    //   当前评论
    comment: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      last_id: null, // 获取评论数据的偏移量
      reply_count: 0
    }
  },

  computed: {
    // 评论ID
    commentID () {
      return this.comment.com_id.toString()
    }
  },

  created () {
    //  评论回复
    this.onLoad()
    console.log(this.clearComponent)
  },

  methods: {
    // 获取评论回复
    async onLoad () {
      const response = await comments({
        type: 'c',
        source: this.commentID,
        offset: this.last_id,
        limit: undefined
      })

      // 响应数据赋值
      this.list.push(...response.data.data.results)
      this.reply_count = response.data.data.total_count

      //   关闭本次加载
      this.loading = false

      // 判断是否还有数据，结束加载
      const lastID = response.data.data.last_id
      lastID ? this.last_id = lastID : this.finished = true
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
</style>
