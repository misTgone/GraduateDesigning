<template>
  <div id="reg">
    <div>
      <div>注册帐号</div>
      <div>
        <ul>
          <li>
            <input
              type="text"
              class="form-control"
              placeholder="帐号"
              v-model="userName"
            >
          </li>
          <li>
            <input
              type="password"
              class="form-control"
              placeholder="密码"
              v-model="userPassword"
            >
          </li>
          <li>
            <input
              type="password"
              class="form-control"
              placeholder="确认密码"
              v-model="repetUpwd"
            >
          </li>
          <li>
            <input
              type="text"
              class="form-control"
              placeholder="手机号"
            >
          </li>
          <li>
            <input
              type="text"
              class="form-control"
              placeholder="邮箱"
            >
          </li>
          <li>
            <!-- 验证码 -->
            <VerificationCode ref="VerificationCode" />
          </li>
          <li>
            <button
              class="btn btn-primary"
              @click="toRegister"
            >
              注册
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import VerificationCode from '../components/verificationCode.vue'
export default {
  components: {
    VerificationCode
  },
  data () {
    return {
      userName: '',
      userPassword: '',
      repetUpwd: ''
    }
  },
  methods: {
    toRegister () {
      let u = this.userName
      let p = this.userPassword
      let rp = this.repetUpwd
      // 验证环节
      if (!u) {
        this.$message.error(
          '账号不能为空!'
        )
        return
      }
      if (!p) {
        this.$message.error(
          '密码不能为空!'
        )
        return
      }
      if (!rp) {
        this.$message.error(
          '请再次确认密码!'
        )
        return
      }
      if (rp !== p) {
        this.$message.error(
          '前后密码不一致!'
        )
        return
      }
      let VCode = this.$refs.VerificationCode.check()
      if (VCode === 1) {
        // 发送ajax  post 请求
        let postData = this.qs.stringify({
          user: u,
          upwd: p
        })
        let url = 'http://106.13.61.186:3000/register'
        this.axios.post(url, postData).then(result => {
          if (result.data.code === 1) {
            alert('注册成功!')
            this.userName = ''
            this.userPassword = ''
            this.repetUpwd = ''
            this.$router.push({ path: '/login' })
          } else {
            alert('该用户名已注册!')
          }
        })
      }
    }

  }
}
</script>

<style lang="scss">
    #reg{
        min-width: 630px;
        min-height: 800px;
        overflow: hidden;
        > div{
            text-align: center;
            margin: 0 auto;
            width: 450px;
            height: 580px;
            margin-top: 100px;
            border-radius: 10px;
            box-shadow: 0 9px 30px -6px rgba(0,0,0,.2), 0 18px 20px -10px rgba(0,0,0,.04), 0 18px 20px -10px rgba(0,0,0,.04), 0 10px 20px -10px rgba(0,0,0,.04);
            > div{
                > ul{
                    list-style: none;
                    margin-top: 40px;
                    li{
                        margin: 0 auto;
                        margin-top: 18px;
                        width: 370px;
                        > input{
                            height: 50px;
                        }
                        > button{
                            height: 50px;
                            width: 370px;
                        }
                    }
                }
            }
            >div:nth-child(1){
                font-size: 20px;
                font-weight: 700;
                color: #666;
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #dcdcdc;
            }
        }
    }
</style>
