<template>
  <div class="orderDetail">
    <User :user-title="'我的订单：'+orderMsg[0].checkoutId">
      <div class="font">
        <!-- 步骤条，在订单关闭时显示第二种步骤条 -->
        <div
          class="steps1"
          v-show="orderShow"
        >
          <el-steps
            :space="400"
            :active="1"
            finish-status="success"
          >
            <el-step
              title="下单"
              :description="orderMsg[0].time"
            />
            <el-step title="付款" />
            <el-step title="交易成功" />
          </el-steps>
        </div>
        <div
          v-show="!orderShow"
          class="steps2"
        >
          <el-steps
            :space="600"
            :active="2"
            finish-status="success"
          >
            <el-step
              title="下单"
              :description="orderMsg[0].time"
            />
            <el-step title="交易关闭" />
          </el-steps>
        </div>
        <!-- 订单状态和付款时间 -->
        <div>
          <ul>
            <li>订单状态：{{ orderState }}</li>
            <li v-show="orderShow">
              <el-button
                type="primary"
                size="mini"
                @click="$router.push('/pay')"
              >
                现在付款
              </el-button>
              <el-button
                size="mini"
                @click="cancelOrder()"
              >
                取消订单
              </el-button>
            </li>
          </ul>
          <p>{{ orderPhrase }}</p>
        </div>
        <!-- 商品信息 -->
        <div>
          <div class="lineStyle">
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>小计</span>
          </div>
          <div
            v-for="(item,index) of orderMsg"
            :key="index"
            class="msg"
          >
            <span>
              <img
                :src="item.chpic"
                alt
              >
            </span>
            <span>{{ item.chname }}</span>
            <span>￥{{ item.chprice.toFixed(1) }}</span>
            <span>{{ item.chnum }}</span>
            <span>￥{{ item.chsum.toFixed(1) }}</span>
          </div>
          <!-- 结算栏 -->
          <div class="settlement1">
            <p>商品总计：&nbsp;&nbsp;&nbsp;&nbsp;￥{{ priceSum.toFixed(1) }}</p>
            <p>运费：+ ¥ 0.00</p>
            <p>
              应付金额：
              <span>￥{{ priceSum.toFixed(1) }}</span>
            </p>
          </div>
        </div>
        <!-- 地址栏信息 -->
        <div class="address">
          <div class="lineStyle">
            <span>收货信息</span>
          </div>
          <div>
            <p>姓名：{{ msg.caname }}</p>
            <p>联系电话：{{ msg.caphone }}</p>
            <p>详细地址：{{ msg.caaddress }}</p>
          </div>
        </div>
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
      orderMsg: JSON.parse(sessionStorage.getItem('orderMsg')),
      msg: {},
      priceSum: 0,
      orderState: '',
      orderPhrase: '',
      orderShow: 1
    }
  },
  methods: {
    cancelOrder () {
      let url = `http://106.13.61.186:3000/cancelOrder/${this.orderMsg[0].checkoutId}`
      this.axios.get(url).then(result => {
        if (result.data.code === 1) {
          this.orderState = '已关闭'
          this.orderPhrase = '您的订单已关闭。'
          this.orderShow = 0
          this.$message({
            message: '取消订单成功!',
            type: 'success'
          })
        }
      })
    }
  },
  created () {
    // 判断订单是否被取消
    if (this.orderMsg[0].cancelSymbol === 1) {
      this.orderState = '已关闭'
      this.orderPhrase = '您的订单已关闭。'
      this.orderShow = 0
    } else {
      this.orderState = '待支付'
      this.orderPhrase = '请及时付款，超时后订单将自动取消。'
    }
    let checkoutId = this.orderMsg[0].checkoutId
    let url = `http://106.13.61.186:3000/getCheckoutAddress/${checkoutId}`
    this.axios.get(url).then(result => {
      this.msg = result.data.result[0]
    })
    this.orderMsg.forEach(element => {
      this.priceSum += element.chsum
    })
  }
}
</script>

<style lang='scss' scoped>
.font {
  > div:nth-child(3) {
    height: 160px;
    border: 1px solid #dadada;
    margin: 20px 30px 20px;
    border-radius: 5px;
    padding: 30px;
    background-color: #f6f6f6;
    > ul {
      list-style: none;
      overflow: hidden;
      padding-bottom: 24px;
      border-bottom: 1px solid #dadada;
      > li:first-child {
        float: left;
      }
      > li:last-child {
        float: right;
      }
    }
    > p {
      clear: both;
    }
  }
  > div:nth-child(4) {
    > div:first-child {
      > span:first-child {
        margin-left: 30px;
      }
      > span:nth-child(2) {
        margin-left: 520px;
      }
      > span:nth-child(3) {
        margin-left: 100px;
      }
      > span:nth-child(4) {
        margin-left: 100px;
      }
    }
  }
}
.steps1 {
  margin-top: 35px;
  width: 1200px;
  margin-left: 70px;
}
.steps2 {
  margin-top: 35px;
  width: 1200px;
  margin-left: 150px;
}
.msg {
  height: 110px;
  line-height: 79px;
  padding: 15px 30px;
  border-bottom: 1px solid #efefef;
  &:last-child {
    border-bottom: 0;
  }
  > span {
    display: inline-block;
    text-align: center;
  }
  > span:first-child {
    > img {
      border: 1px solid #ebebeb;
      width: 80px;
    }
  }
  > span:nth-child(2) {
    width: 300px;
    margin-left: 70px;
    font-size: 14px;
  }
  > span:nth-child(3) {
    width: 80px;
    margin-left: 88px;
  }
  > span:nth-child(4) {
    width: 50px;
    margin-left: 61px;
  }
  > span:nth-child(5) {
    width: 100px;
    margin-left: 50px;
  }
}
.lineStyle {
  height: 36px;
  line-height: 36px;
  background-color: #eee;
  border-top: 1px solid #dbdbdb;
  border-bottom: 1px solid #dbdbdb;
  font-size: 12px;
  color: #666;
}
.address {
  > div:first-child {
    > span {
      margin-left: 30px;
    }
  }
  > div:nth-child(2) {
    height: 155px;
    padding: 20px 30px;
    font-size: 14px;
  }
}
.settlement1 {
  padding-top: 10px;
  padding-right: 30px;
  > p {
    text-align: right;
    height: 20px;
  }
  > p:nth-child(2) {
    font-size: 13px;
  }
  > p:last-child {
    > span {
      color: #d44d44;
      font-weight: bold;
    }
  }
}
</style>
