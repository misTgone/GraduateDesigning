<template>
  <div class="pay">
    <!-- 头部 -->
    <Heador />
    <Cart
      title-name="支付页面说明"
      class="payCart"
    >
      <p class="word">
        因调用支付宝/微信支付接口需要企业营业执照等资质，又因直接po二维码违反相关法规，故支付窗口予以保留
      </p>
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
  components: {
    Heador,
    Footor,
    Cart
  }
}
</script>

<style lang='scss' scoped>
    .pay{
        background-color: #ededed;
        min-width: 1220px;
    }
    .payCart{
        margin-top: 40px;
        background-color: white;
        height: 280px;
        border-radius: 10px;
        border: 1px solid #dfdfdf;
        text-align: center;
    }
    .word{
        line-height: 200px;
        font-size: 20px;
        color: brown;
    }
</style>
