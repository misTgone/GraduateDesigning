<template>
  <div class="checkout">
    <!-- 头部 -->
    <Heador />
    <!-- 收货信息 -->
    <Cart
      :title-name="'收货信息'"
      class="adress"
    >
      <div class="adressList">
        <div
          class="addressStyle"
          v-show="ad1.state1"
        >
          <p>姓名:{{ ad1.name }}</p>
          <p>电话:{{ ad1.phone }}</p>
          <p>地址:{{ ad1.address }}</p>
        </div>
        <div
          class="addAdress"
          @click="dialogVisible = true"
        >
          <i class="el-icon-circle-plus-outline" />
          <p>使用新地址</p>
        </div>
      </div>
    </Cart>
    <!-- dialog弹出框 -->
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
          v-model="message.name"
        />
      </p>
      <p>
        <el-input
          type="text"
          placeholder="手机号码"
          v-model="message.phone"
        />
      </p>
      <p>
        <el-input
          type="text"
          placeholder="收货地址"
          v-model="message.address"
        />
      </p>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false;addAddressToMysql()"
        >保 存</el-button>
      </span>
    </el-dialog>
    <!-- 购物清单 -->
    <Cart
      :title-name="'购物清单'"
      class="shopList"
    >
      <div>
        <div class="checkoutMsg">
          <ul>
            <li>商品信息</li>
            <li>单价</li>
            <li>数量</li>
            <li>小计</li>
          </ul>
          <!-- 商品信息 -->
        </div>
        <div class="checkoutList">
          <ul>
            <li
              v-for="(item,index) of checkoutNames"
              :key="index"
            >
              <a href="javascript:;">
                <img
                  :src="item.url"
                  alt=""
                >
              </a>
              <a href="javascript:;">{{ item.gname }}</a>
              <span>￥{{ (item.gprice).toFixed(1) }}</span>
              <span>{{ item.num }}</span>
              <span>￥{{ (item.gprice * item.num).toFixed(1) }}</span>
            </li>
          </ul>
        </div>
        <!-- 提交订单 -->
        <div class="checkoutSub">
          <span>应付总额: <i>￥{{ totalPrice }}</i></span>
          <button
            class="btn btn-info"
            @click="placeOrder(),removeCart()"
          >
            提交订单
          </button>
        </div>
      </div>
    </Cart>
    <!-- 底部 -->
    <Footor />
  </div>
</template>

<script>
import Heador from '../components/header.vue'
import Footor from '../components/footer.vue'
import Cart from '../components/card.vue'
export default {
  data () {
    return {
      checkoutNames: [],
      totalPrice: 0,
      dialogVisible: false,
      message: { name: '', address: '', phone: '' },
      ad1: { state1: false, name: '', address: '', phone: '' },
      cid: sessionStorage.getItem('userId'),
      len: 0,
      gid: []
    }
  },
  components: {
    Heador,
    Footor,
    Cart
  },
  created () {
    // 判断是购物车跳转过来还是商品页跳转
    if (this.$store.state.checkoutList.length !== 0) {
      // 把购物车选中的商品搞到支付界面
      this.checkoutNames = this.$store.state.checkoutList
    } else {
      this.checkoutNames = this.$store.state.checkoutSingle
    }
    this.len = this.checkoutNames.length
    this.sumTotal()
    // 把用户地址从数据中找出来
    let url = `http://106.13.61.186:3000/getAddress/${this.cid}`
    this.axios.get(url).then(result => {
      if (result.data.code === 1) {
        this.ad1.state1 = true
        this.ad1.name = result.data.result[0].uaname
        this.ad1.address = result.data.result[0].uaddress
        this.ad1.phone = result.data.result[0].uaphonenum
      }
    })
  },
  methods: {
    sumTotal () {
      this.checkoutNames.forEach(e => {
        this.totalPrice += parseFloat(e.gprice * e.num)
      })
      this.totalPrice = this.totalPrice.toFixed(1)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    addAddressToMysql () {
      this.ad1.state1 = true
      this.ad1.name = this.message.name
      this.ad1.phone = this.message.phone
      this.ad1.address = this.message.address
      this.message = { name: '', address: '', phone: '' }
      let url = `http://106.13.61.186:3000/addAddress`
      let postData = this.qs.stringify({
        aid: sessionStorage.getItem('userId'),
        name: this.ad1.name,
        address: this.ad1.address,
        phone: this.ad1.phone
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
    // 删除购物车表user_cart中对应的条目
    // 判断是否由购物车跳转过来
    removeCart () {
      if (this.$store.state.checkoutList.length !== 0) {
        let url = `http://106.13.61.186:3000/delSomeCart`
        let postData = this.qs.stringify({
          cid: this.cid,
          gid: this.gid,
          len: this.len
        })
        this.axios.post(url, postData).then(result => {
        })
      }
      // 跳转到支付页面pay
      this.$router.push('/pay')
    },
    // 向订单表user_checkout添加记录
    placeOrder () {
      let checkoutId = this.toCheckoutId()
      let price = []
      let num = []
      let name = []
      let pic = []
      let sum = []
      for (let i = 0; i < this.checkoutNames.length; i++) {
        this.gid.push(this.checkoutNames[i].goodsid)
        price.push((this.checkoutNames[i].gprice).toFixed(1))
        name.push(this.checkoutNames[i].gname)
        pic.push(this.checkoutNames[i].url)
        num.push(this.checkoutNames[i].num)
        let s = 0
        s = (num[i] * price[i]).toFixed(1)
        sum.push(s)
      }
      let url = `http://106.13.61.186:3000/checkedCart`
      let postData = this.qs.stringify({
        cid: this.cid,
        len: this.len,
        checkoutId: checkoutId[0],
        time: checkoutId[1],
        gid: this.gid,
        num,
        price,
        sum,
        pic,
        name
      })
      this.axios.post(url, postData).then(result => {
        if (result.data.code === 1) {
          this.$message({
            message: '订单提交成功!',
            type: 'success'
          })
          // 如果订单成功提交，则执行addCheckoutAddress()
          this.addCheckoutAddress(checkoutId[0])
        } else {
          this.$message({
            message: '订单提交失败!',
            type: 'warning'
          })
        }
      })
    },
    // DATE()日期格式化，返回订单码
    toCheckoutId () {
      let t = new Date()
      let y = t.getFullYear()
      let M = t.getMonth() + 1
      let d = t.getDate()
      let h = t.getHours()
      let m = t.getMinutes()
      let s = t.getSeconds()
      let arr = []
      if (M < 10) {
        M = '0' + M
      }
      if (h < 10) {
        h = '0' + h
      }
      if (m < 10) {
        m = '0' + m
      }
      if (s < 10) {
        s = '0' + s
      }
      let order = '' + y + M + d + h + m + s + sessionStorage.getItem('userId')
      let time = '' + y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s
      arr.push(order)
      arr.push(time)
      return arr
    },
    // 添加订单对应地址信息到表checkout_address
    addCheckoutAddress (checkoutId) {
      let url = `http://106.13.61.186:3000/addCheckoutAddress`
      let postData = this.qs.stringify({
        caname: this.ad1.name,
        caaddress: this.ad1.address,
        caphone: this.ad1.phone,
        checkoutId
      })
      this.axios.post(url, postData).then(result => {
        if (result.data.code === -1) {
          this.$message({
            message: '地址信息未成功提交!',
            type: 'warning'
          })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .checkout{
    background-color: #ededed;
    min-width: 1220px;
  }
  .adress{
    margin-top: 40px;
    background-color: white;
    height: 280px;
    border-radius: 10px;
    border: 1px solid #dfdfdf;
  }
  .adressList{
    margin-top: 32px;
    overflow: hidden;
  }
  .addressStyle{
    display: inline-block;
    width: 273px;
    height: 157px;
    border: 1px solid #6c90e5;
    background-color: #fafafa;
    border-radius: 5px;
    padding: 19px 14px 0 14px;
    margin-left: 25px;
    vertical-align: top;
    font-size: 15px;
  }
  .addAdress{
    display: inline-block;
    width: 273px;
    height: 157px;
    border: 1px solid #6c90e5;
    background-color: #fafafa;
    margin-left: 25px;
    vertical-align: top;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    >i{
      font-size: 25px;
      margin-top: 50px;
    }
  }
  .shopList{
    margin-top: 40px;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #dfdfdf;
  }
  .checkoutList{
    >ul{
      list-style: none;
      >li{
        margin-top: 20px;
        margin-bottom: 30px;
        >a:first-child{
          margin-left: 60px;
        }
        >a:nth-child(2){
          margin-left: 20px;
          display: inline-block;
          width: 550px;
          color: black;
          &:hover{
            text-decoration: none;
          }
        }
        >span:nth-child(3){
          display: inline-block;
          width: 155px;
        }
        >span:nth-child(4){
          display: inline-block;
          width: 118px;
        }
        >span:nth-child(5){
          display: inline-block;
          width: 100px;
        }
      }
    }
    img{
      width: 80px;
      height: 80px;
      border: 1px solid #f0f0f0;
    }
  }
  .checkoutMsg{
    >ul{
      list-style-type: none;
      height: 38px;
      background-color: #eeeeee;
      border-bottom: 1px solid #dbdbdb;
      line-height: 38px;
      > li{
        display: inline;
        color: #838383;
        font-size: 13px;
      }
      > li:first-child{
        margin-left: 70px;
      }
      > li:nth-child(2){
        margin-left: 590px;
      }
      > li:nth-child(3){
        margin-left: 120px;
      }
      > li:last-child{
        margin-left: 110px;
      }
    }
  }
  .checkoutSub{
    height: 90px;
    line-height: 90px;
    border-top: 1px solid #e9e9e9;
    box-shadow: 0 -3px 8px rgba(0,0,0,.04);
    >span{
      margin-left: 870px;
      font-size: 15px;
      display: inline-block;
      width: 200px;
      >i{
        font-size: 20px;
        color: #ca0c16;
      }
    }
    >button{
      margin-left: 10px;
    }
  }
</style>
