<template>
  <div id="total">
    <div>
      <div class="title">
        <div><i class="fas fa-cog fa-spin fa-4x bgcolor logo" /></div>
        <h4>使用已注册帐号登录</h4>
        <div>
          <label>
            <input
              type="text"
              class="form-control"
              placeholder="帐号"
              v-model="userName"
            >
          </label>
        </div>
        <div>
          <label>
            <input
              type="password"
              class="form-control"
              placeholder="密码"
              v-model="userPassword"
            >
          </label>
        </div>
        <div>
          <router-link to="/register">
            注册帐号 |
          </router-link>
          <router-link to="">
            忘记密码?
          </router-link>
        </div>
        <div>
          <button
            class="btn btn-primary"
            @click="toLogin"
          >
            登录
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      userPassword: ''
    }
  },
  methods: {
    toLogin () {
      let u = this.userName
      let p = this.userPassword
      // 检验是否输入为空
      if (!u) {
        alert('请输入用户名!')
        return
      }
      if (!p) {
        alert('请输入密码!')
        return
      }
      // 发送axios post 请求
      let postData = this.qs.stringify({
        user: u,
        upwd: p
      })
      let url = 'http://106.13.61.186:3000/login'
      this.axios.post(url, postData).then(result => {
        if (result.data.code === 1) {
          alert('登录成功!')
          this.userName = ''
          this.userPassword = ''
          // vuex并不能满足系统登录的需求
          // console.log(result.data.uid)
          // console.log(this.$store.state.userLogin)
          // this.$store.state.userLogin = result.data.uid
          // 使用sessionstorage解决
          sessionStorage.setItem('userId', result.data.uid)
          this.$router.push({ path: '/' })
        } else {
          alert('账号或者密码有误!')
        }
      })
    }
  }
}
</script>

<style lang="scss">
    #total {
        min-width: 630px;
        min-height: 800px;
        > div{
            width: 452px;
            height: 573px;
            margin: 100px auto;
            border-radius: 10px;
            box-shadow: 0 9px 30px -6px rgba(0,0,0,.2), 0 18px 20px -10px rgba(0,0,0,.04), 0 18px 20px -10px rgba(0,0,0,.04), 0 10px 20px -10px rgba(0,0,0,.04);
        }
        .title{
            > div{
                text-align: center;
                i{
                    margin-top: 50px;
                    color: rgb(4, 4, 4);
                    background-color: rgba(255, 255, 255, 0);
                }
                > label{
                    input{
                        width: 370px;
                        height: 50px;
                        margin-top: 10px;
                    }
                }
                > button{
                    margin-top: 10px;
                    width: 370px;
                    height: 50px;
                }
            }
            h4{
                margin-top: 50px;
                text-align: center;
                margin-bottom: 40px;
            }
        }
    }
</style>
