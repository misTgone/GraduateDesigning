<template>
  <div id="reg">
    <div>
      <div>注册帐号</div>
      <div>
        <!-- 使用element-ui的表单控件迭代 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="85px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="帐号"
            prop="name"
          >
            <el-input
              v-model="ruleForm.name"
              style="padding-right:60px"
            />
          </el-form-item>
          <el-form-item
            label="密码"
            prop="pass"
          >
            <el-input
              type="password"
              v-model="ruleForm.pass"
              style="padding-right:60px"
            />
          </el-form-item>
          <el-form-item
            label="确认密码"
            prop="checkPass"
          >
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              style="padding-right:60px"
            />
          </el-form-item>
          <el-form-item
            label="邮箱"
            prop="email"
          >
            <el-input
              v-model="ruleForm.email"
              style="padding-right:60px"
            />
          </el-form-item>
          <el-form-item
            label="电话"
            prop="phone"
          >
            <el-input
              v-model="ruleForm.phone"
              style="padding-right:60px"
            />
          </el-form-item>
          <VerificationCode ref="VerificationCode" />
          <el-form-item style="margin-top:20px">
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >
              立即注册
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
import VerificationCode from '../components/verificationCode.vue'
export default {
  components: {
    VerificationCode
  },
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        name: '',
        pass: '',
        checkPass: '',
        email: '',
        phone: '',
        time: ''
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let VCode = this.$refs.VerificationCode.check()
          if (VCode === 1) {
            this.time = this.getNowTime()[1]
            let url = `http://106.13.61.186:3000/register`
            let postData = this.qs.stringify({
              user: this.ruleForm.name,
              upwd: this.ruleForm.pass,
              email: this.ruleForm.email,
              phone: this.ruleForm.phone,
              time: this.time
            })
            this.axios.post(url, postData).then(result => {
              if (result.data.code === 1) {
                this.$message({
                  message: '注册成功!',
                  type: 'success'
                })
                this.$router.push('/login')
              }
            })
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs.VerificationCode.inputValue = ''
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
            >div:nth-child(1){
                font-size: 20px;
                font-weight: 700;
                color: #666;
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #dcdcdc;
            }
            >div:nth-child(2){
              padding-top: 20px;
            }
        }
    }
</style>
