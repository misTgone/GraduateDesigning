<template>
  <header class="bgcolor">
    <div class="hContent bgcolor">
      <router-link to="/">
        <i
          class="fas fa-cog fa-spin fa-3x bgcolor logo"
        />
      </router-link>
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
        @mouseover="userWrapper"
        @mouseleave="userAWrapper"
      >
        <div>
          <i class="fas fa-caret-up fa-2x" />
        </div>
        <div>
          <ul>
            <li>
              <router-link to="">
                图片加用户名
              </router-link>
            </li>
            <li>
              <router-link to="">
                我的订单
              </router-link>
            </li>
            <li>
              <router-link to="">
                账户资料
              </router-link>
            </li>
            <li>
              <router-link to="">
                收货地址
              </router-link>
            </li>
            <li>
              <router-link to="">
                售后服务
              </router-link>
            </li>
            <li>
              <router-link to="">
                我的优惠
              </router-link>
            </li>
            <li>
              <span @click="userExit">
                退出
              </span>
            </li>
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
      if (!sessionStorage.getItem('userId')) {
        return
      }
      let a = document.getElementsByClassName('nav-user-wrapper')[0]
      a.style.display = 'block'
    },
    userAWrapper () {
      if (!sessionStorage.getItem('userId')) {
        return
      }
      let a = document.getElementsByClassName('nav-user-wrapper')[0]
      a.style.display = 'none'
    },
    userExit () {
      sessionStorage.removeItem('userId')
      location.reload()
    }
  }
}
</script>

<style lang="scss">
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
        margin-right: 220px;
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
    .hContent>a:nth-child(5){
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
      height: 376px;
      background-color: white;
      border-radius: 10px;
      z-index: 30;
      box-shadow: 0 0 20px 10px rgba(0,0,0,.04);
      display: none;
      border-top: 30px;
      >div:first-child{
        height: 20px;
        width: 50px;
        margin-top: -20px;
        margin-left: 58px;
        >i{
          position: relative;
          top: -29px;
          left: 16px;
          color: white;
        }

      }
      >div:last-child{
        >ul{
          list-style: none;
          >li{
            height: 46px;
            width: 166px;
            text-align: center;
            border-bottom: 1px solid #f5f5f5;
            line-height: 44px;
            a,span{
              line-height: 44px;
              font-size: 12px;
              color: #626262;
            }
          }
          >li:first-child{
             height: 90px;
             line-height: 90px;
             margin-top: 10px;
          }
          >li:last-child{
            border-bottom: 0;
            >span{
              cursor: pointer;
            }
          }
        }
      }
    }
</style>
