<template>
  <div class="checkout">
    <!-- 头部 -->
    <Heador />
    <!-- 收货信息 -->
    <Cart
      :title-name="'收货信息'"
      class="adress"
    >
      <div>
        <div>
          <p>收货人:xxx</p>
          <p>收货地址:xxx</p>
          <p>手机号码:xxx</p>
        </div>
      </div>
    </Cart>
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
            <li>
              <a href="javascript:;">
                <img
                  src="../../../server/public/icons/jianguo3.jpg"
                  alt=""
                >
              </a>
              <a href="javascript:;">坚果 3 绒布国旗保护套</a>
              <span>￥79</span>
              <span>4</span>
              <span>￥316</span>
            </li>
            <li>
              <a href="javascript:;">
                <img
                  src="../../../server/public/icons/youdianzhineng_E1.jpg"
                  alt=""
                >
              </a>
              <a href="javascript:;">优点智能 E1 推拉式智能指纹密码锁</a>
              <span>￥2699</span>
              <span>2</span>
              <span>￥5398</span>
            </li>
            <li>
              <a href="javascript:;">
                <img
                  src="../../../server/public/icons/FIIL_Diva_Pro.jpg"
                  alt=""
                >
              </a>
              <a href="javascript:;">FIIL Diva Pro 全场景无线降噪耳机</a>
              <span>￥1499</span>
              <span>4</span>
              <span>￥5996</span>
            </li>
          </ul>
        </div>
        <!-- 提交订单 -->
        <div class="checkoutSub">
          <span>应付总额: ￥xxxxx</span>
          <button class="btn btn-info">
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
    }
  },
  components: {
    Heador,
    Footor,
    Cart
  }
}
</script>

<style lang='scss' scoped>
  .checkout{
    background-color: #ededed;
  }
  .adress{
    margin-top: 40px;
    background-color: white;
    height: 280px;
    border-radius: 10px;
    border: 1px solid #dfdfdf;
    >div{
      height: 218px;
      overflow: hidden;
      >div{
        margin-left: 30px;
        margin-top: 32px;
        border: 1px solid #6c90e5;
        height: 157px;
        width: 273px;
        padding: 19px 14px 0 14px;
        font-size: 14px;
        border-radius: 5px;
        background-color: #fafafa;
      }
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
      margin-left: 915px;
      font-size: 15px;
    }
    >button{
      margin-left: 50px;
    }
  }
</style>
