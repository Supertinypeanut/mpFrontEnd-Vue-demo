<template>
  <div class="article-comments">
    <!-- 导航栏 -->
    <van-nav-bar title="10条回复">
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
        src="http://toutiao.meiduo.site/Ft_PKcq3Hq8qic1ms4cOMSS-hUzt"
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
  </div>
</template>

<script>

export default {
  name: 'CommentReply',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false // 是否加载结束
    }
  },
  created () {
    console.log(this.comment)
  },

  methods: {
    async onLoad () {
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
