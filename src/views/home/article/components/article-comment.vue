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
            <van-button
              size="mini"
              type="default"
              @click="onReplyComment(comment)"
            >
              回复
            </van-button>
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
        v-model="emitText"
      >
        <van-button
          slot="button"
          size="mini"
          type="info"
          @click="onCommentEmit"
        >
          发布
        </van-button>
      </van-field>
    </van-cell-group>
     <!-- 发布评论 -->

     <!-- 回复弹出层 -->
    <van-popup
      v-model="replyShow"
      round
      position="bottom"
      :style="{ height: '90%' }"
    >
    <!-- 回复组件 -->
      <article-comment
        :comment="currentComment"
        @onCloseCommentReply="replyShow = false"
      />
    </van-popup>
     <!-- 回复弹出层 -->
  </div>
</template>

<script>
import {
  comments,
  commentsLiking,
  cancelCommentsLiking,
  addComment
} from '@/api/article-comment-request'

import CommentReply from './comment-reply'

export default {
  name: 'ArticleComment',
  props: {},
  data () {
    return {
      comments: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      lastId: undefined, // 本次返回结果的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为NULL
      emitText: '', // 发布内容
      replyShow: false, // 弹出层显示
      currentComment: null // 当前点击的评论
    }
  },

  components: {
    'article-comment': CommentReply
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

      // 将获取的评论列表添加到数组中
      this.comments.push(...response.data.data.results)
      this.loading = false

      // 判断是否还有评论数据，lastId为下次请求偏移量
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
    },

    // 发布评论
    async onCommentEmit () {
      this.emitText = this.emitText.trim()
      try {
        if (this.emitText) {
          //   发送添加评论请求
          const response = await addComment({
            target: this.$route.params.article_ID, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
            content: this.emitText, // 评论内容
            art_id: undefined // 文章id，对评论内容发表回复时，需要传递此参数
          })
          // 将回调回来的数据填入comments中
          this.comments.unshift(response.data.data.new_obj)

          //   清空输入框内容
          this.emitText = ''

          // 提示用户
          this.$toast.success('发表成功')
        }
      } catch (error) {
        this.$toast.fail('评论失败')
      }
    },

    // 回复按钮
    onReplyComment (comment) {
      // 开启弹层
      this.replyShow = true
      this.currentComment = comment
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
