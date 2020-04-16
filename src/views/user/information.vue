<template>
  <div class="information">
    <User user-title="账户资料">
      <div class="content">
        <p>
          <span>原密码:</span>
          <el-input
            placeholder="请输入原密码"
            v-model="oldPassword"
            show-password
            class="password"
          />
        </p>
        <p>
          <span>新密码:</span>
          <el-input
            placeholder="请输入新密码"
            v-model="newPassword"
            show-password
            class="password"
          />
        </p>
        <p>
          <span>重复新密码:</span>
          <el-input
            placeholder="请再次输入新密码"
            v-model="againPassword"
            show-password
            class="password"
          />
          <el-button
            type="primary"
            plain
            class="sure"
            @click="changePassword()"
          >
            确定修改
          </el-button>
        </p>
      </div>
    </User>
  </div>
</template>

<script>
import User from '../../components/user.vue'
export default {
  components: {
    User
  },
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      againPassword: ''
    }
  },
  methods: {
    changePassword () {
      if (this.oldPassword === '') {
        this.$message({
          message: '原密码不能为空!',
          type: 'warning'
        })
        this.oldPassword = ''
        this.newPassword = ''
        this.againPassword = ''
        return
      }
      if (this.newPassword === '') {
        this.$message({
          message: '新密码不能为空!',
          type: 'warning'
        })
        this.oldPassword = ''
        this.newPassword = ''
        this.againPassword = ''
        return
      }
      if (this.againPassword === '') {
        this.$message({
          message: '确认密码不能为空!',
          type: 'warning'
        })
        return
      }
      if (this.newPassword !== this.againPassword) {
        this.$message({
          message: '前后密码不一致!',
          type: 'warning'
        })
        this.oldPassword = ''
        this.newPassword = ''
        this.againPassword = ''
        return
      }
      let url = `http://127.0.0.1:3000/changePassword`
      let postData = this.qs.stringify({
        uid: sessionStorage.getItem('userId'),
        upwd: this.oldPassword,
        newPwd: this.newPassword
      })
      this.axios.post(url, postData).then(result => {
        if (result.data.code === -2) {
          this.$message({
            message: '原密码有误!',
            type: 'warning'
          })
          this.oldPassword = ''
          this.newPassword = ''
          this.againPassword = ''
        } else if (result.data.code === -3) {
          this.$message({
            message: '前后密码一致!',
            type: 'warning'
          })
          this.oldPassword = ''
          this.newPassword = ''
          this.againPassword = ''
        } else if (result.data.code === 1) {
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
          this.oldPassword = ''
          this.newPassword = ''
          this.againPassword = ''
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .content{
    padding-left: 60px;
    padding-top: 30px;
    padding-bottom: 30px;
    width: 968px;
    >p{
      >span{
        margin-right: 50px;
      }
    }
    >p:last-child{
      >span{
        margin-left: -32px;
      }
    }
  }
  .password{
    width: 300px;
  }
  .sure{
    margin-left: 50px;
  }
</style>
