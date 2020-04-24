<template>
  <div>
    <User user-title="我的订单">
      <div
        class="big"
        v-show="haveOrder"
      >
        <div
          v-for="(item,index) of orderMessage"
          :key="index"
        >
          <div class="cartTitle">
            <span>{{ item[0].time }}</span>
            <span>订单号: {{ item[0].checkoutId }}</span>
            <span>单价</span>
            <span>数量</span>
            <span>实付金额</span>
            <span>商品操作</span>
            <span>
              <span @click="toOrderDetail(item)">查看详情 ></span>
            </span>
          </div>
          <div
            v-for="(entry,ind) of item"
            :key="ind"
            class="product"
          >
            <span>
              <img
                :src="entry.chpic"
                alt=""
              >
            </span>
            <span>{{ entry.chname }}</span>
            <span>￥{{ entry.chprice }}</span>
            <span>{{ entry.chnum }}</span>
            <span v-show="ind===0">￥{{ allSum[index] }}</span>
            <span v-show="ind===0">
              <el-button
                type="primary"
                size="mini"
                @click="toPay()"
                v-show="!entry.cancelSymbol"
              >现在付款</el-button>
              <span v-show="entry.cancelSymbol">订单关闭</span>
            </span>
            <span v-show="ind===0"><el-button
              type="danger"
              round
              size="mini"
              @click="delCheckout(item[0].checkoutId)"
            >删除订单</el-button></span>
          </div>
        </div>
      </div>
      <div
        class="noneOrder"
        v-show="!haveOrder"
      >
        无订单可显示~
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
      orderMessage: [],
      allSum: [],
      haveOrder: true
    }
  },
  methods: {
    toPay () {
      this.$router.push('/pay')
    },
    // 删除表user_checkout中的订单
    delCheckout (id) {
      let t = confirm('确认删除?')
      if (t === true) {
        // 执行delCheckoutAddress()
        this.delCheckoutAddress(id)
        let url = `http://106.13.61.186:3000/delCheckout`
        let postData = this.qs.stringify({
          checkoutId: id,
          cid: sessionStorage.getItem('userId')
        })
        this.axios.post(url, postData).then(result => {
          if (result.data.code === 1) {
            location.reload()
          }
        })
      }
    },
    // 删除表checkout_address中订单对应的地址
    delCheckoutAddress (checkoutId) {
      let url = `http://106.13.61.186:3000/delCheckoutAddress/${checkoutId}`
      this.axios.get(url).then(result => {
        // 留白
      })
    },
    // 路由跳转到orderDetail
    toOrderDetail (item) {
      if (sessionStorage.getItem('orderMsg')) {
        sessionStorage.removeItem('orderMsg')
      }
      sessionStorage.setItem('orderMsg', JSON.stringify(item))
      this.$router.push({ path: '/user/orderDetail' })
    }
  },
  created () {
    let url = `http://106.13.61.186:3000/getCheckout/${sessionStorage.getItem('userId')}`
    this.axios.get(url).then(result => {
      // 查询是否有订单
      if (result.data.code === 1) {
        // 把相同单号的数据归类到同一个数组，再加入到一个总数组
        let arr1 = []
        for (let i = 0; i < result.data.result.length; i++) {
          if (arr1.indexOf(result.data.result[i].checkoutId) === -1) {
            arr1.push(result.data.result[i].checkoutId)
          }
        }
        for (let i = 0; i < arr1.length; i++) {
          let m = result.data.result.filter(item =>
            item.checkoutId === arr1[i]
          )
          // 计算每笔订单总额
          let it = 0
          m.forEach((element) => {
            it += element.chsum
          })
          this.allSum.push(it)
          this.orderMessage.push(m)
        }
      } else {
        this.haveOrder = false
      }
    })
  }
}
</script>

<style lang='scss'>
  .big{
    border-left: 1px solid #dbdbdb;
    border-right: 1px solid #dbdbdb;
  }
  .cartTitle{
    padding: 0 24px;
    height: 38px;
    line-height: 38px;
    background: #eee;
    border-bottom: 1px solid #dbdbdb;
    border-top: 1px solid #dbdbdb;
    font-size: 12px;
    color: #666;
    >span{
      display: inline-block;
    }
    >span:first-child{
      width: 120px;
    }
    >span:nth-child(2){
      width: 200px;
      margin-left: 20px;
    }
    >span:nth-child(3){
      width: 30px;
      margin-left: 50px;
    }
    >span:nth-child(4){
      width: 30px;
      margin-left: 100px;
    }
    >span:nth-child(5){
      width: 50px;
      margin-left: 70px;
    }
    >span:nth-child(6){
      width: 50px;
      margin-left: 50px;
    }
    >span:last-child{
      width: 60px;
      margin-left: 50px;
      >span{
        cursor: pointer;
        color: #409eff;
      }
    }
  }
  .product{
    padding: 0 24px;
    height: 112px;
    line-height: 112px;
    border-bottom: 1px solid #ebebeb;
    &:last-child{
      border-bottom: 0;
    }
    >span{
      display: inline-block;
      text-align: center;
    }
    >span:first-child{
      >img{
        width: 80px;
        border: 1px solid #ebebeb;
      }
    }
    >span:nth-child(2){
      width: 220px;
      overflow:hidden; //超出的文本隐藏
      text-overflow:ellipsis; //用省略号显示
      white-space:nowrap; //不换行
      vertical-align:middle;
      margin-left: 40px;
    }
    >span:nth-child(3){
      width: 80px;
      margin-left: 20px;
    }
    >span:nth-child(4){
      width: 50px;
      margin-left: 67px;
    }
    >span:nth-child(5){
      width: 80px;
      margin-left: 48px;
    }
    >span:nth-child(6){
      width: 80px;
      margin-left: 20px;
    }
    >span:last-child{
      margin-left: 22px;
    }
  }
  .noneOrder{
    text-align: center;
    font-size: 24px;
  }
</style>
