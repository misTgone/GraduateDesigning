<template>
  <div class="orderList">
    <!-- 头部 -->
    <Heador :to-show="false" />
    <div>
      <div>
        <div>
          <div>
            <img
              src="http://qny.mistgone.top/img/headPortrait/v2-8df0e1ada7af09d3c62f2ba5ec4e4266_hd.jpg"
              alt=""
            >
            <h5>{{ userName }}</h5>
          </div>
          <div>
            <ul>
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
                <router-link to="/user/coupon">
                  我的优惠
                </router-link>
              </li>
              <li>
                <router-link to="/user/support">
                  售后服务
                </router-link>
              </li>
              <li>
                <router-link to="/user/substitution">
                  以旧换新
                </router-link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div>
            <span>
              {{ userTitle }}
            </span>
          </div>
          <div>
            <slot />
          </div>
        </div>
      </div>
    </div>
    <!-- 底部 -->
    <Footor />
  </div>
</template>

<script>
import Heador from '../components/header.vue'
import Footor from '../components/footer.vue'
export default {
  components: {
    Heador,
    Footor
  },
  props: {
    'userTitle': {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      userName: sessionStorage.getItem('userName')
    }
  }
}
</script>

<style lang='scss'>
    .orderList{
        >div:nth-child(2){
            min-width: 1220px;
            width: 100%;
            background-color: #ededed;
            padding-top: 40px;
            >div{
                width: 1220px;
                margin: 0 auto;
                display: flex;
                min-height: 600px;
                // 解决父元素设置display:flex子元素div高度一致，导致不能自适应的问题
                align-items:flex-start;
                >div:first-child{
                    width: 210px;
                    height: 544px;
                    background-color: #fff;
                    margin: 0 20px;
                    padding-top: 20px;
                    border: 1px solid #dcdcdc;
                    border-color: rgba(0,0,0,.14);
                    box-shadow: 0 3px 8px -6px rgba(0,0,0,.1);
                    border-radius: 10px;
                    >div:first-child{
                        >img{
                            width: 168px;
                            height: 168px;
                            margin-left: 20px;
                        }
                        >h5{
                            margin-top: 10px;
                            text-align: center;
                            font-size: 18px;
                            font-weight: 700;
                            color: #666;
                            line-height: 36px;
                            height: 36px;
                        }
                    }
                    >div:nth-child(2){
                        >ul{
                            list-style: none;
                            >li{
                                height: 50px;
                                line-height: 50px;
                                border-top: 1px solid #ebebeb;
                                text-align: center;
                                >a{
                                    &:hover{
                                        text-decoration: none;
                                    }
                                }
                            }
                        }
                    }
                }
                >div:last-child{
                    width: 970px;
                    border: 1px solid #dcdcdc;
                    box-shadow: 0 1px 7px rgba(0,0,0,.06);
                    border-radius: 8px;
                    border-color: rgba(0,0,0,.14);
                    margin-bottom: 30px;
                    background: #fff;
                    >div:first-child{
                        background: linear-gradient(#fbfbfb,#ececec);
                        border-radius: 8px 8px 0 0;
                        height: 60px;
                        padding: 0 10px 0 24px;
                        border-bottom: 1px solid #d4d4d4;
                        color: #333;
                        font-size: 18px;
                        line-height: 60px;
                    }
                    >div:nth-child(2){
                      background-color: #fff;
                      border-radius: 0 0 8px 8px;
                    }
                }
            }
        }
    }
</style>
