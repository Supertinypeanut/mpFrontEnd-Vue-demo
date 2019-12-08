<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      right-text="保存"
      @click-left="$router.back()"
      @click-right="onSave"
    />
    <van-cell-group>
      <van-cell @click="$refs.photoFile.click()" title="头像" is-link>
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

    <!-- 图片上传 -->
    <input
      type="file"
      ref="photoFile"
      @change="onChangePhoto"
      hidden
    />
    <!-- 图片上传 -->

    <!-- 编辑用户昵称弹窗 -->
    <van-dialog
      v-model="isEditNameShow"
      title="用户昵称"
      show-cancel-button
      @confirm="onUserNameConfirm"
    >
      <van-field
        placeholder="请输入用户名"
        :value="user.name"
        @input="onUserNameInput"
      />
    </van-dialog>
    <!-- /编辑用户昵称弹窗 -->
  </div>
</template>

<script>
import {
  userInfoProfile,
  updataUserPhoto
} from '@/api/user'

export default {
  name: 'UserProfile',
  data () {
    return {
      user: {},
      genders: ['男', '女']
    }
  },
  computed: {
    file () {
      return this.$refs.photoFile
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
      // 图片对象
      const photoFile = this.file

      // 图片预览
      const url = URL.createObjectURL(photoFile.files[0])
      this.user.photo = url
    },

    // 保存按钮
    async onSave () {
    // 加载loading
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '保存中'
      })
      // 捕获异常
      try {
        if (this.file.files[0]) {
          const FD = new FormData()
          FD.append('phone', this.file.files[0])
          await updataUserPhoto(FD)
          console.log(this.file.files[0])
          this.$toast.success('保存成功')
        }
      } catch (error) {
        this.$toast.fail('保存失败')
      }
    }
  }
}
</script>
