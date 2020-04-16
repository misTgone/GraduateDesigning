<template>
  <div id="cartt">
    <!-- 1.头部 -->
    <Header />
    <!-- 2.购物车内容 -->
    <Carder
      :title-name="'购物清单'"
      class="card"
    >
      <!-- 购物车有商品时 -->
      <div v-if="have">
        <!-- 2.1 信息栏 -->
        <div class="msg">
          <ul>
            <li>商品信息</li>
            <li>单价</li>
            <li>数量</li>
            <li>小计</li>
            <li>操作</li>
          </ul>
        </div>
        <!-- 2.2 每件商品信息 -->
        <!-- ul在有数据库返回数据之后，ul v-for="item of cartList" -->
        <div class="msgDetails">
          <ul>
            <li
              v-for="(item,index) of cartMsg"
              :key="index"
            >
              <label>
                <input
                  type="checkbox"
                  :id="item.goodsid"
                  :value="item"
                  v-model="checkedNames"
                  :checked="checkedAll"
                >
              </label>
              <a href="javascript:;">
                <img
                  :src="item.url"
                  alt=""
                >
              </a>
              <a href="javascript:;">{{ item.gname }}</a>
              <span>￥{{ (item.gprice).toFixed(1) }}</span>
              <div>
                <i
                  @click="numControl(index,0)"
                  class="el-icon-remove-outline"
                />
                <span>{{ item.num }}</span>
                <i
                  @click="numControl(index,1)"
                  class="el-icon-circle-plus-outline"
                />
              </div>
              <span>￥{{ (item.gprice * item.num).toFixed(1) }}</span>
              <i
                class="el-icon-circle-close"
                @click="delCart(index)"
              />
            </li>
          </ul>
        </div>
        <!-- 2.3 结算栏 -->
        <div class="settlement">
          <label>
            <input
              type="checkbox"
              name=""
              id=""
              v-model="checkedAll"
              @change="checkedChange"
            >
            全选
          </label>
          <label>
            <a
              href="javascript:;"
              @click="delSomeCart"
            >删除选中的商品</a>
          </label>
          <span>已选择{{ checkedNum }}件商品 |</span>
          <span>应付总额: <i>￥{{ checkedPrice }}</i></span>
          <button
            class="btn btn-warning"
            @click="cartSettlement"
          >
            现在结算
          </button>
        </div>
      </div>
      <!-- 购物车无商品时 -->
      <div
        v-if="!have"
        class="emptyCart"
      >
        <p>您的购物车空空如也~</p>
        <p>
          <el-button
            type="primary"
            @click="$router.push('/goods')"
          >
            现在选购
          </el-button>
        </p>
      </div>
    </Carder>
    <!-- 3.底部 -->
    <Feetor />
  </div>
</template>

<script>
import Header from '../components/header.vue'
import Feetor from '../components/footer.vue'
import Carder from '../components/card.vue'
export default {
  data () {
    return {
      cid: sessionStorage.getItem('userId'),
      cartMsg: {},
      checkedAll: false,
      checkedNames: [],
      checkedNum: 0,
      checkedPrice: 0,
      have: true
    }
  },
  components: {
    Header,
    Feetor,
    Carder
  },
  created () {
    let url = `http://106.13.61.186:3000/getCart/${this.cid}`
    this.axios(url).then(result => {
      // 如果购物车为空
      if (result.data.code === -1) {
        this.have = false
      } else {
        let cart = result.data.cart
        this.cartMsg = result.data.goods
        let pic = result.data.pic
        for (let i = 0; i < cart.length; i++) {
          this.cartMsg[i].num = cart[i].num
          this.cartMsg[i].url = pic[i].url
        }
      }
    })
  },
  watch: {
    checkedNames (val) {
      if (val.length === this.cartMsg.length) {
        this.checkedAll = true
      } else {
        this.checkedAll = false
      }
      this.checkedNum = val.length
      this.checkedPrice = 0
      val.forEach(e => {
        this.checkedPrice += e.gprice * e.num
      })
    },
    cartMsg (val) {
      this.checkedPriceUpdate()
    }
  },
  methods: {
    numControl (index, op) {
      if (op === 0) {
        if (this.cartMsg[index].num > 1) {
          this.cartMsg[index].num -= 1
        }
      } else {
        this.cartMsg[index].num += 1
      }
      // why use this.$get()
      // Because Vue cant 监听到对象中后来添加进的对象(line:105)
      this.$set(this.cartMsg, index, this.cartMsg[index])
    },
    delCart (index) {
      let r = confirm('确定删除?')
      if (r === true) {
        let url = `http://106.13.61.186:3000/delCart`
        let postData = this.qs.stringify({
          cid: this.cid,
          gid: this.cartMsg[index].goodsid
        })
        this.axios.post(url, postData).then(result => {
          if (result.data.code === 1) {
            location.reload()
          }
        })
      }
    },
    delSomeCart () {
      if (!this.checkedNames.length) {
        this.$message({
          message: '未选择商品!',
          type: 'warning'
        })
      } else {
        let r = confirm('确定删除?')
        if (r === true) {
          let gid = []
          this.checkedNames.forEach(e => {
            gid.push(e.goodsid)
          })
          let url = `http://106.13.61.186:3000/delSomeCart`
          let postData = this.qs.stringify({
            cid: this.cid,
            gid,
            len: this.checkedNames.length
          })
          this.axios.post(url, postData).then(result => {
            if (result.data.code === 1) {
              location.reload()
            }
          })
        }
      }
    },
    checkedChange () {
      if (!this.checkedAll) {
        this.checkedNames = []
      } else {
        this.checkedNames = this.cartMsg
      }
    },
    checkedPriceUpdate () {
      this.checkedPrice = 0
      this.checkedNames.forEach(e => {
        this.checkedPrice += e.gprice * e.num
      })
    },
    cartSettlement () {
      if (!this.checkedNames.length) {
        this.$message({
          message: '未选择商品!',
          type: 'warning'
        })
      } else {
        // 更新购物车信息
        let gid = []
        let num = []
        this.checkedNames.forEach(e => {
          gid.push(e.goodsid)
          num.push(e.num)
        })
        let url = 'http://106.13.61.186:3000/updateCart'
        let postData = this.qs.stringify({
          cid: this.cid,
          gid,
          num,
          len: this.checkedNames.length
        })
        this.axios.post(url, postData).then(result => {
          if (result.data.code === 1) {
            // 把checkedNames写入vuex，在/checkout页面获取
            // 存在一个问题，vuex数据保存在运行内存中，在页面刷新时重新载入实例，store中的数据丢失
            this.$store.state.checkoutList = this.checkedNames
            this.$router.push('/checkout')
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
  #cartt{
    background: #ededed;
    min-width: 1220px;
  }
  .card{
    margin-top: 40px;
  }
  .msg{
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
        margin-left: 50px;
      }
      > li:nth-child(2){
        margin-left: 620px;
        ~ li{
          margin-left: 110px;
        }
      }
    }
  }
  .msgDetails{
    > ul{
      margin-top: 30px;
      list-style: none;
      > li{
        margin-bottom: 60px;
        user-select:none;
        img{
          width: 80px;
          height: 80px;
          border: 1px solid #f0f0f0;
        }
        > label:nth-child(1){
          margin-left: 20px;
          margin-right: 20px;
        }
        > a:nth-child(3){
          color: black;
          margin-left: 20px;
          display: inline-block;
          width: 370px;
          &:hover{
            text-decoration: none;
            color: black;
          }
        }
        span:nth-child(4){
          margin-left: 187px;
          display: inline-block;
          width: 128px;
        }
        div:nth-child(5){
          display: inline-block;
          width: 141px;
          i{
            cursor: pointer;
          }
          button:last-child{
            margin-right: 26px;
          }
          span{
            display: inline-block;
            width: 36px;
            text-align: center;
          }
        }
        span:nth-child(6){
          display: inline-block;
          width: 155px;
        }
        i:last-child{
          cursor: pointer;
        }
      }
    }
  }
  .settlement{
    height: 90px;
    background: linear-gradient(#fdfdfd,#f9f9f9);
    border-top: 1px solid #e9e9e9;
    box-shadow: 0 -3px 8px rgba(0,0,0,.04);
    border-radius: 0 0 10px 10px;
    line-height: 90px;
    user-select:none;
    > label:first-child{
      margin-left: 20px;
      font-size: 12px;
    }
    >label:nth-child(2){
      margin-left: 20px;
      font-size: 12px;
      a{
        color: #bbbbbb;
        &:hover{
         text-decoration: none;
         color: #bbbbbb;
        }
      }
    }
    >span:nth-child(3){
      margin-left: 600px;
    }
    >span:nth-child(4){
      display: inline-block;
      width: 200px;
      padding-left: 4px;
      >i{
        font-size: 20px;
        color: #ca0c16;
      }
    }
  }
  .emptyCart{
    text-align: center;
    >p:first-child{
      font-size: 20px;
      margin-top: 20px;
    }
  }
</style>
