import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/homePage.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Cart from '../views/cart.vue'
import Checkout from '../views/checkout.vue'
import Pay from '../views/pay.vue'
import GoodsDetails from '../views/goodsDetails.vue'
import Goods from '../views/goods.vue'
import Test from '../views/test.vue'
import NotFoundServer from '../views/notFoundServer.vue'
import AddressList from '../views/user/addressList.vue'
import Coupon from '../views/user/coupon.vue'
import Information from '../views/user/information.vue'
import OrderList from '../views/user/orderList.vue'
import Substitution from '../views/user/substitution.vue'
import Support from '../views/user/support.vue'
import OrderDetail from '../views/user/orderDetail.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homePage',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: Checkout
  },
  {
    path: '/pay',
    name: 'pay',
    component: Pay
  },
  {
    path: '/register',
    name: Register,
    component: Register
  },
  {
    path: '/goodsDetails/:goodsid',
    name: GoodsDetails,
    component: GoodsDetails
  },
  {
    path: '/goods',
    name: Goods,
    component: Goods
  },
  {
    path: '/test',
    name: Test,
    component: Test
  },
  {
    path: '/user/addressList',
    component: AddressList
  },
  {
    path: '/user/coupon',
    component: Coupon
  },
  {
    path: '/user/information',
    component: Information
  },
  {
    path: '/user/orderList',
    component: OrderList
  },
  {
    path: '/user/substitution',
    component: Substitution
  },
  {
    path: '/user/support',
    component: Support
  },
  {
    path: '/user/orderDetail',
    name: OrderDetail,
    component: OrderDetail
  },
  {
    path: '/notFoundServer',
    name: NotFoundServer,
    component: NotFoundServer
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
