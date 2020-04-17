<template>
  <div>
    <header class="bgcolor">
      <div class="hContent bgcolor">
        <router-link to="/">
          <i
            class="fas fa-cog fa-spin fa-3x bgcolor logo"
          />
        </router-link>
        <label class="bgcolor search">
          <!-- 搜索栏 -->
          <el-autocomplete
            v-model="state"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入内容"
            @select="handleSelect"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="toSearch()"
            />
          </el-autocomplete>
        </label>
        <router-link
          to="/goods"
          class="rcolor"
          style="margin-left:12px;"
        >
          全部商品
        </router-link>
        <a
          href="javascript:;"
          class="rcolor"
        >捐赠</a>
        <span
          @click="toLogin"
        >
          <i
            class="fas fa-user fa-lg bgcolor rcolor"
            @mouseover="userWrapper"
            @mouseleave="userAWrapper"
          />
        </span>
        <!-- 用户内容提示框 -->
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
                  <img
                    src="http://q7jie7kms.bkt.clouddn.com/img/headPortrait/v2-8df0e1ada7af09d3c62f2ba5ec4e4266_hd.jpg"
                    alt=""
                  >
                  <p>{{ userName }}</p>
                </router-link>
              </li>
              <li>
                <router-link to="/user/orderList">
                  我的订单
                </router-link>
              </li>
              <li>
                <router-link to="/user/information">
                  账户资料
                </router-link>
              </li>
              <li>
                <router-link to="/user/addressList">
                  收货地址
                </router-link>
              </li>
              <li>
                <router-link to="/user/support">
                  售后服务
                </router-link>
              </li>
              <li>
                <router-link to="/user/coupon">
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
        <span
          @click="toCart"
        >
          <i class="fas fa-shopping-cart fa-lg bgcolor rcolor" />
        </span>
      </div>
    </header>
    <div
      class="nav-sub"
      v-show="toShow"
    >
      <div>
        <ul>
          <li>
            <router-link to="/">
              · 首页
            </router-link>
          </li>
          <li>
            <router-link to="/goods">
              · 全部
            </router-link>
          </li>
          <li>
            <router-link to="">
              · 后台管理系统
            </router-link>
          </li>
          <li>
            <a
              href="https://github.com/misTgone"
              target="_blank"
            >
              · Github
            </a>
          </li>
          <li>
            <a
              href="https://weibo.com/5666508219/profile?rightmod=1&wvr=6&mod=personinfo"
              target="_blank"
            >
              · 个人微博
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: sessionStorage.getItem('userName'),
      goods: [],
      state: '',
      timeout: null,
      goodsid: ''
    }
  },
  props: {
    'toShow': {
      type: Boolean,
      default: true
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
      let path = this.$route.path
      if (path === '/') {
        location.reload()
      } else {
        this.$router.push('/')
      }
    },
    toLogin () {
      if (!sessionStorage.getItem('userId')) {
        this.$router.push('/login')
      } else {
        this.$router.push('/user/orderList')
      }
    },
    toCart () {
      if (!sessionStorage.getItem('userId')) {
        this.$router.push('/login')
      } else {
        this.$router.push('/cart')
      }
    },
    toSearch () {
      if (!this.state) {
        this.$notify({
          title: '友情提示',
          message: '请输入内容',
          type: 'warning'
        })
      } else {
        this.$router.push('/goodsDetails/' + this.goodsid)
        location.reload()
      }
    },
    querySearchAsync (queryString, cb) {
      var goods = this.goods
      // console.log(cb)
      var results = queryString ? goods.filter(this.createStateFilter(queryString)) : goods

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 400 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      // console.log(item)
      this.goodsid = item.goodsid
    }
  },
  mounted () {
    let goods = JSON.parse(sessionStorage.getItem('goodsData'))
    if (goods) {
      goods.forEach(element => {
        this.goods.push({ 'value': element.gname, 'goodsid': element.goodsid })
      })
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
  .hContent>span:nth-child(5){
      margin-left: 50px;
  }
  .hContent>span:nth-child(7){
      margin-left: 40px;
  }
  .hContent>span:hover{
    cursor: pointer;
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
            img{
              width: 60px;
              border-radius: 50%;
              margin-left: -17px;
              margin-top: -30px;
            }
            p{
              position: relative;
              top: -35px;
              font-size: 14px;
            }
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
  .nav-sub{
    width: 100%;
    height: 90px;
    background-color: rgb(247, 247, 247);
    box-shadow: 0 2px 4px rgba(0,0,0,.04);
    margin-bottom: 30px;
    >div{
      width: 1220px;
      margin: 0 auto;
      >ul{
        list-style: none;
        overflow: hidden;
        >li{
          float: left;
          line-height: 90px;
          margin-right: 10px;
          >a{
            color: #666666;
            &:hover{
              text-decoration: none;
              color: rgb(88, 132, 236);
            }
          }
        }
      }
    }
  }
</style>
