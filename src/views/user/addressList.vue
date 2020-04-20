<template>
  <div class="addressList">
    <User user-title="收货地址">
      <div class="title">
        <span>姓名</span>
        <span>详细地址</span>
        <span>电话</span>
        <span>修改地址</span>
      </div>
      <div class="address">
        <span>{{ message.uaname }}</span>
        <span>{{ message.uaphonenum }}</span>
        <span>{{ message.uaddress }}</span>
        <i
          class="el-icon-edit"
          @click="dialogVisible = true"
        />
      </div>
    </User>
    <!-- dialog弹出框 -->
    <div>
      <el-dialog
        title="编辑收货地址"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <p>
          <el-input
            type="text"
            placeholder="收货人姓名"
            v-model="message.uaname"
          />
        </p>
        <p>
          <el-input
            type="text"
            placeholder="手机号码"
            v-model="message.uaphonenum"
          />
        </p>
        <p>
          <el-input
            type="text"
            placeholder="收货地址"
            v-model="message.uaddress"
          />
        </p>
        <span
          slot="footer"
          class="dialog-footer"
        >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="dialogVisible = false;changeAddress()"
          >保 存</el-button>
        </span>
      </el-dialog>
    </div>
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
      aid: sessionStorage.getItem('userId'),
      name: '',
      address: '',
      phone: '',
      message: { uaname: '', uaphonenum: '', uaddress: '' },
      dialogVisible: false
    }
  },
  methods: {
    changeAddress () {
      let url = `http://106.13.61.186:3000/addAddress`
      let postData = this.qs.stringify({
        aid: this.aid,
        name: this.message.uaname,
        address: this.message.uaddress,
        phone: this.message.uaphonenum
      })
      this.axios.post(url, postData).then(result => {
        if (result.data.code === 1) {
          this.$message({
            message: '修改地址成功!',
            type: 'success'
          })
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    }
  },
  created () {
    let url = `http://106.13.61.186:3000/getAddress/${this.aid}`
    this.axios.get(url).then(result => {
      this.message = result.data.result[0]
    })
  }
}
</script>

<style lang='scss' scoped>
.title {
  height: 38px;
  background-color: #eee;
  border-bottom: 1px solid #d4d4d4;
  > span {
    line-height: 38px;
    font-size: 12px;
    color: #838383;
  }
  > span:first-child {
    margin-left: 38px;
  }
  > span:nth-child(2) {
    margin-left: 300px;
  }
  > span:nth-child(3) {
    margin-left: 300px;
  }
  > span:last-child {
    margin-left: 110px;
  }
}
.address {
  height: 100px;
  line-height: 100px;
  > span {
    font-size: 16px;
    display: inline-block;
    text-align: center;
  }
  > span:first-child {
    width: 94px;
  }
  > span:nth-child(2) {
    width: 400px;
    margin-left: 90px;
  }
  > span:nth-child(3) {
    width: 276px;
  }
  > i {
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
