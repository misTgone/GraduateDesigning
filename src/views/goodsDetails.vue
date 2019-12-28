<template>
  <div class="goodsDetails">
    <!-- 头部 -->
    <Heador />
    <!-- 商品信息 -->
    <div class="goodsMsg">
      <!-- 左侧小图和大图 -->
      <div>
        <div>
          <ul>
            <li>图1</li>
            <li>图2</li>
            <li>图3</li>
            <li>图4</li>
          </ul>
        </div>
        <div>大图片</div>
      </div>
      <!-- 右侧文字信息 -->
      <div>
        <div>
          <h3>坚果 3 绒布国旗保护套</h3>
          <span>质感精良、完美贴合、周到防护</span>
          <span>￥79.00</span>
        </div>
        <div>
          <span>数量</span>
          <button>-</button>
          <span>1</span>
          <button>+</button>
        </div>
        <div>
          <button class="btn btn-primary">
            加入购物车
          </button>
          <button class="btn btn-warning">
            现在购买
          </button>
        </div>
      </div>
    </div>
    <!-- 商品图片介绍 -->
    <Cart
      :title-name="'商品信息'"
      class="goodsImg"
    >
      <div>
        <img
          src="../../../server/public/icons/jianguo3_detail.jpg"
          alt=""
        >
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

<style lang="scss">
    .goodsDetails{
        background-color: #ededed;
    }
    .goodsImg{
        img{
          border-radius: 0 0 8px 8px;
          width: 1220px;
        }
    }
    .goodsMsg{
            display: flex;
            width: 1220px;
            height: 560px;
            padding: 60px;
            margin: 20px auto;
            background-color: white;
            border-radius: 5px;
        >div:first-child{
                display: flex;
                width: 540px;
                height: 440px;
            >div:first-child{
                ul{
                    list-style: none;
                    li{
                        width: 80px;
                        height: 80px;
                        border: 1px solid #f0f0f0;
                        margin-bottom: 10px;
                    }
                }
            }
            >div:last-child{
                width: 460px;
                height: 440px;
                margin-left: 20px;
            }
        }
        >div:last-child{
            width: 450px;
            height: 440px;
            >div:first-child{
              border-bottom: 1px solid #ebebeb;
              padding-bottom: 10px;
              >h3{
                font-size: 24px;
              }
              >span:nth-child(2){
                font-size: 14px;
                color: #bdbdbd;
                width: 360px;
                display: inline-block;
              }
              >span:last-child{
                color: #d44d44;
                font-size: 24px;
                font-weight: 700;
              }
            }
            >div:nth-child(2){
              margin: 25px 0;
              padding-bottom: 25px;
              border-bottom: 1px solid #ebebeb;
              >span:first-child{
                font-size: 14px;
                color: #8d8d8d;
                margin-right: 20px;
              }
              >button{
                width: 24px;
                height: 27px;
              }
              >span:nth-child(3){
                width: 30px;
                display: inline-block;
                text-align: center;
              }
            }
            >div:last-child{
              margin-top: 70px;
              >button:first-child{
                margin-right: 15px;
              }
            }
        }
    }
</style>
