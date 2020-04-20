<template>
  <div id="reg">
    <div>
      <div>注册帐号</div>
      <div>
        <!-- <ul>
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
            // 验证码
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
        </ul> -->
        <!-- 使用element-ui的表单控件迭代 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="活动名称"
            prop="name"
          >
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >
              立即创建
            </el-button>
            <el-button @click="resetForm('ruleForm')">
              重置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
// import VerificationCode from '../components/verificationCode.vue'
export default {
  components: {
    // VerificationCode
  },
  data () {
    return {
      userName: '',
      userPassword: '',
      repetUpwd: '',
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
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
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
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
