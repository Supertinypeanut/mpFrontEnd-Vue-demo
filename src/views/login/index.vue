<template>
  <div class="login">
  <!-- 顶部nav -->
  <van-nav-bar title="登入"/>
  <!-- 账号密码输入框 -->
  <van-cell-group>
    <van-field
      v-model="user.mobile"
      required
      clearable
      label="用户名"
      placeholder="请输入用户名"
    />
    <van-field
      v-model="user.code"
      type="password"
      label="密码"
      placeholder="请输入密码"
      required
    />
  </van-cell-group>
  <!-- 登入按钮 -->
  <div class="btn">
    <van-button @click="onSubmit" type="info">确定</van-button>
  </div>

  </div>
</template>

<script>
import { login } from '@/api/login-request'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    //  发送登入请求，获取token
    async onSubmit () {
      // 轻提示
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
        forbidClick: true
      })
      // 捕获请求失败
      try {
        const res = await login(this.user)
        this.$toast.success('登入成功')
        // 更新容器内token
        this.$store.commit('updateUserToken', res.data.data)
        // 跳转到主页
        this.$router.push(this.$route.query.redirect)
      } catch (error) {
        this.$toast.fail('登入失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.login{
  .btn{
    padding: 20px;
    .van-button{
      width: 100%;
    }
  }

}
</style>
