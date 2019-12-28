<template>
  <header class="bgcolor">
    <div class="hContent bgcolor">
      <i class="fas fa-cog fa-spin fa-3x bgcolor logo" />
      <label class="bgcolor search">
        <input
          type="text"
          class="form-control"
          placeholder="搜索"
        >
      </label>
      <a
        href="javascript:;"
        class="rcolor"
      >全部商品</a>
      <a
        href="javascript:;"
        class="rcolor"
      >捐赠</a>
      <router-link
        to="/login"
      >
        <i
          class="fas fa-user fa-lg bgcolor rcolor"
          @mouseover="userWrapper"
          @mouseleave="userAWrapper"
        />
      </router-link>
      <div
        class="nav-user-wrapper"
        @mousemove="userWrapper"
      >
        <div>
          <div />
        </div>
        <div>
          <ul>
            <li>图片加用户名</li>
            <li>我的订单</li>
            <li>账户资料</li>
            <li>收货地址</li>
            <li>售后服务</li>
            <li>我的优惠</li>
            <li>退出</li>
          </ul>
        </div>
      </div>
      <router-link
        to="/cart"
      >
        <i class="fas fa-shopping-cart fa-lg bgcolor rcolor" />
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    userWrapper () {
      let a = document.getElementsByClassName('nav-user-wrapper')[0]
      a.style.display = 'block'
    },
    userAWrapper () {
      let a = document.getElementsByClassName('nav-user-wrapper')[0]
      a.style.display = 'none'
    }

  }
}
</script>

<style>
    .home{
       background-color: rgb(237, 237, 237);
    }
    header{
        height: 100px;
        width: 100%;
        line-height: 100px;
    }
    .hContent{
        width: 1220px;
        margin: 0 auto;
        height: 100px;
        position: relative;
    }
    .bgcolor{
        background-color: rgb(4, 4, 4);
    }
    .logo{
        color: white;
        position: relative;
        top: 10px;
    }
    .search{
        width: 300px;
        margin-left: 300px;
        margin-right: 250px;
    }
    .hContent a{
        font-size: 14px;
        margin-left: 20px;
        margin-right: 20px;
    }
    .hContent a:hover{
        text-decoration: none;
        color: white;
    }
    .rcolor{
        color: #c8c8c8;
    }
    .rcolor:hover{
      color: #e2e2e2;
    }
    .hContent>i:nth-child(5){
        margin-left: 50px;
    }
    .hContent>i:nth-child(6){
        margin-left: 50px;
    }
    .nav-user-wrapper{
      position: absolute;
      top: 75px;
      right: 12px;
      width: 168px;
      height: 374px;
      background-color: white;
      border-radius: 10px;
      z-index: 30;
      box-shadow: 0 0 20px 10px rgba(0,0,0,.04);
      display: none;
      border-top: 30px;
    }
    .nav-user-wrapper>div:first-child>div{
      width: 19px;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 8px solid white;
      border-radius: 6px;
      position: relative;
      top: -7px;
      left: 75px;
    }
    .nav-user-wrapper>div:last-child>ul{
      list-style: none;
    }
    .nav-user-wrapper>div:last-child>ul>li{
      height: 46px;
      width: 166px;
      line-height: 44px;
      text-align: center;
      border-bottom: 1px solid #f5f5f5;
      font-size: 12px;
      color: #626262;
    }
    .nav-user-wrapper>div:last-child>ul>li:first-child{
      height: 90px;
      line-height: 90px;
    }
    .nav-user-wrapper>div:last-child>ul>li:last-child{
      border-bottom: 0;
    }
</style>
