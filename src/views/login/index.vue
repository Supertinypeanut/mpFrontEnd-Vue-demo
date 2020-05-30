<template>
  <div class="login">
  <!-- 顶部nav -->
  <van-nav-bar title="登录"/>
  <!-- 账号密码输入框 -->
  <van-form validate-first @submit="onSubmit()">
    <van-field
      v-model="user.mobile"
      required
      clearable
      label="用户名"
      placeholder="请输入手机号"
      :rules="[{ validator: validatorName, message: '请输入正确手机号' }]"
    />
    <van-field
      v-model="user.code"
      type="password"
      label="密码"
      placeholder="请输入密码"
      required
      :rules="[{ validator: validatorMobile, message: '请输入正确密码' }]"
    />
      <!-- 登入按钮 -->
  <div class="btn">
    <van-button type="info" native-type="submit">确定</van-button>
  </div>
  </van-form>
  </div>
</template>

<script>
import { login } from '@/api/login-request'
import { userInfo } from '@/api/user'

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
    validatorName (val) {
      return /^1\d{10}$/.test(val)
    },
    validatorMobile (val) {
      return /^\d{6}$/.test(val)
    },
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

        // 更新人员信息
        const response = await userInfo()
        this.$store.commit('updateUserInfo', response.data.data)

        // 跳转到主页
        const path = this.$route.query.redirect || '/'
        this.$router.push(path)
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
