<template>
  <div class="home">
    <!-- 1.顶部栏 -->
    <Header />
    <div class="hbody">
      <!-- 2.轮播图 -->
      <section>
        <swiper
          :options="swiperOption"
          class="swiper"
        >
          <swiper-slide>
            <img
              src="http://qny.mistgone.top/img/swiper/ban6.png"
              alt=""
            >
          </swiper-slide>
          <swiper-slide>
            <img
              src="http://qny.mistgone.top/img/swiper/ban2.png"
              alt=""
            >
          </swiper-slide>
          <swiper-slide>
            <img
              src="http://qny.mistgone.top/img/swiper/ban5.jpg"
              alt=""
            >
          </swiper-slide>
          <swiper-slide>
            <img
              src="http://qny.mistgone.top/img/swiper/banner4.png"
              alt=""
            >
          </swiper-slide>
          <div
            class="swiper-pagination"
            slot="pagination"
          />
          <div
            class="swiper-button-prev"
            slot="button-prev"
          />
          <div
            class="swiper-button-next"
            slot="button-next"
          />
        </swiper>
      </section>
      <!-- 3.four小格 -->
      <div class="fourLi">
        <ul>
          <li>
            <router-link to="">
              <img
                src="http://qny.mistgone.top/img/fourLi/four1.jpg"
                alt=""
              >
            </router-link>
          </li>
          <li>
            <router-link to="">
              <img
                src="http://qny.mistgone.top/img/fourLi/four2.jpg"
                alt=""
              >
            </router-link>
          </li>
          <li>
            <router-link to="">
              <img
                src="http://qny.mistgone.top/img/fourLi/four3.png"
                alt=""
              >
            </router-link>
          </li>
          <li>
            <router-link to="">
              <img
                src="http://qny.mistgone.top/img/fourLi/four4.jpg"
                alt=""
              >
            </router-link>
          </li>
        </ul>
      </div>
      <!-- 4.热门商品 -->
      <section class="hotGoods">
        <div>热门商品</div>
        <div>
          <div>
            <div>
              <img
                src="http://qny.mistgone.top/img/hot/hot2.webp"
                alt=""
                class="hot1"
              >
            </div>
            <h6>支付测试商品 IPhone X 全面屏 全面绽放</h6>
            <h6>￥6788.00</h6>
          </div>
          <div>
            <div>
              <img
                src="http://qny.mistgone.top/img/hot/hot1.jpg"
                alt=""
              >
            </div>
            <h6>支付测试商品 ThinkPad X1c 7th</h6>
            <h6>￥8999.00</h6>
          </div>
        </div>
      </section>
      <!-- 5.官方精选（未实现） -->
      <div />
      <!-- 6.four小图 -->
      <div id="miniFour">
        <ul>
          <li><img src="http://qny.mistgone.top/img/miniFour/mini1.jpg"></li>
          <li><img src="http://qny.mistgone.top/img/miniFour/mini2.jpg"></li>
          <li><img src="http://qny.mistgone.top/img/miniFour/mini3.jpg"></li>
          <li><img src="http://qny.mistgone.top/img/miniFour/mini4.jpg"></li>
        </ul>
      </div>
    </div>
    <!-- 7.底部栏 -->
    <Feetor />
  </div>
</template>

<script>
import Header from '../components/header.vue'
import Feetor from '../components/footer.vue'
export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  components: {
    Header,
    Feetor
  },
  mounted () {
    // 获取表goods中的信息，通过sessionStorage传递给搜索栏(vuex不行，刷新就没)
    // sessionStorage传递对象时，需要JSON.stringify()转换
    let url = `http://106.13.61.186:3000/goods`
    this.axios.get(url).then(result => {
      if (result.data.code === 1) {
        for (let i = 0, len = result.data.arr.length; i < len; i++) {
          result.data.arr[i].url = result.data.arr_pic[i].url
        }
        sessionStorage.setItem('goodsData', JSON.stringify(result.data.arr))
      } else {
        this.$router.push('/notFoundServer')
      }
    })
  }
}
</script>
<style lang='scss'>
  *{
    padding: 0;
    margin: 0;
  }
  .home{
    min-width: 1220px;
  }
  .hbody{
    width: 1220px;
    margin: 0 auto;
  }
  .swiper{
    overflow: hidden;
  }
  .swiper-button-next{
    margin-left: 100%;
  }
  .swiper img{
    width: 1220px;
    height: 500px;
    border-radius: 10px;
  }
  .swiper-pagination{
    width: 100px;
    background-color: rgba(255, 255, 255, 0);
  }
  .swiper-button-prev,.swiper-button-next{
    background-color: rgba(255, 255, 255, 0);
  }
  .fourLi>ul{
    list-style: none;
    padding: 0;
    margin: 0;
    margin-top: 25px;
    box-sizing: border-box;
  }
  .fourLi>ul>li{
    display: inline-block;
    box-sizing: border-box;
    width: 25%;
    height: 200px;
    background-color: white;
    border-right: 1px solid rgba(0, 0, 0,.1);
  }
  .fourLi>ul>li img{
    width: 304px;
    height: 200px;
  }
  .hotGoods{
    margin-top: 30px;
  }
  .hotGoods>div:first-child{
    border-radius: 8px 8px 0 0;
    height: 60px;
    padding-left: 30px;
    line-height: 60px;
    font-size: 18px;
    color: #626262;
    font-weight: 400;
    box-shadow: 0 3px 10px rgba(0, 0, 0, .06);
    background: linear-gradient(#fbfbfb,#ededed);
  }
  .hotGoods>div:last-child>div{
    position: relative;
    display: inline-block;
    padding: 0;
    margin: 0;
    width: 50%;
    background-color: white;
    height: 430px;
    vertical-align: top;
    &:hover{
      box-shadow: 0 0 25px #c2c2c2;
      transition: all .5s;
      z-index: 4;
      cursor: pointer;
    }
  }
  .hotGoods>div:last-child>div>div{
    background-color: white;
    width: 206px;
    margin: 0 auto;
    margin-top: 50px;
  }
  .hotGoods>div:last-child>div:first-child{
    border-bottom-left-radius: 10px;
  }
  .hotGoods>div:last-child>div:last-child{
    border-bottom-right-radius: 10px;
  }
  .hotGoods>div:last-child>div img{
    width: 206px;
    height: 206px;
  }
  .hotGoods>div:last-child div+h6{
    background-color: white;
    margin: 0 auto;
    width: 284px;
    white-space: nowrap;
    margin-top: 20px;
  }
  .hotGoods>div:last-child>div>h6:nth-child(3){
    color: #d44d44;
    font-size: 18px;
    background-color: white;
    margin: 0 auto;
    width: 84px;
    margin-top: 10px;
  }
  .hotGoods>div:last-child>div:last-child>div+h6{
    width: 226px;
  }
  #miniFour{
    margin-top: 30px;
  }
  #miniFour>ul{
    display: flex;
    list-style: none;
    >li{
      cursor: pointer;
    }
  }
  #miniFour>ul>li:first-child>img{
    border-radius: 10px 0 0 10px;
  }
  #miniFour>ul>li:last-child>img{
    border-radius: 0 10px 10px 0;
  }
  #miniFour>ul>li>img{
    width: 304.5px;
    height: 200px;
  }
</style>
