<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      right-text="保存"
      @click-left="$router.back()"
    />
    <van-cell-group>
      <input type="file" @change="onChangePhoto">
      <van-cell title="头像" is-link>
        <van-image
          round
          width="30"
          height="30"
          :src="user.photo"
        />
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link />
      <van-cell title="性别" :value="genders[user.gender]" is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import {
  userInfoProfile
//  updataUserPhoto
} from '@/api/user'

export default {
  name: 'UserProfile',
  data () {
    return {
      user: {},
      genders: ['男', '女']
    }
  },

  created () {
    this.getUserProfile()
  },

  methods: {
    // 获取用户个人资料
    async getUserProfile () {
      const response = await userInfoProfile()
      console.log(response)
      this.user = response.data.data
    },

    // 图片更改事件
    onChangePhoto () {

    }
  }
}
</script>
