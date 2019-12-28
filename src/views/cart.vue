<template>
  <div id="cartt">
    <!-- 1.头部 -->
    <Header />
    <!-- 2.购物车内容 -->
    <Carder
      :title-name="'购物清单'"
      class="card"
    >
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
      <!-- 每件商品信息 -->
      <!-- ul在有数据库返回数据之后，ul v-for="item of cartList" -->
      <div class="msgDetails">
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                name="list"
                id="1"
              >
            </label>
            <a href="javascript:;">
              <img
                src="../../../server/public/icons/jianguo3.jpg"
                alt=""
              >
            </a>
            <a href="javascript:;">坚果 3 绒布国旗保护套</a>
            <span>￥79</span>
            <div>
              <button>-</button>
              <span>4</span>
              <button>+</button>
            </div>
            <span>￥316</span>
            <button>x</button>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="list"
                id="2"
              >
            </label>
            <a href="javascript:;">
              <img
                src="../../../server/public/icons/FIIL_Diva_Pro.jpg"
                alt=""
              >
            </a>
            <a href="javascript:;">FIIL Diva Pro 全场景无线降噪耳机</a>
            <span>￥1499</span>
            <div>
              <button>-</button>
              <span>4</span>
              <button>+</button>
            </div>
            <span>￥5996</span>
            <button>x</button>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                name="list"
                id="3"
              >
            </label>
            <a href="javascript:;">
              <img
                src="../../../server/public/icons/youdianzhineng_E1.jpg"
                alt=""
              >
            </a>
            <a href="javascript:;">优点智能 E1 推拉式智能指纹密码锁</a>
            <span>￥2699</span>
            <div>
              <button>-</button>
              <span>2</span>
              <button>+</button>
            </div>
            <span>￥5398</span>
            <button>x</button>
          </li>
        </ul>
      </div>
      <!-- 结算栏 -->
      <div class="settlement">
        <label>
          <input
            type="checkbox"
            name=""
            id=""
          >
          全选
        </label>
        <label>
          <a href="javascript:;">删除选中的商品</a>
        </label>
        <span>已选择xxx件商品 |</span>
        <span>应付总额: ￥xxxx.00</span>
        <button class="btn btn-warning">
          现在结算
        </button>
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
    }
  },
  components: {
    Header,
    Feetor,
    Carder
  }
}
</script>

<style lang="scss">
  #cartt{
    background: #ededed;
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
          width: 118px;
        }
        div:nth-child(5){
          display: inline-block;
          width: 151px;
          button{
            width: 24px;
            height: 27px;
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
          width: 146px;
        }
        button:last-child{
          width: 30px;
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
    }
  }
</style>
