import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../views/homePage.vue'
import Login from '../views/login.vue'
import Register from '../views/register.vue'
import Cart from '../views/cart.vue'
import Checkout from '../views/checkout.vue'
import GoodsDetails from '../views/goodsDetails.vue'
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
    path: '/register',
    name: Register,
    component: Register
  },
  {
    path: '/goodsDetails',
    name: GoodsDetails,
    component: GoodsDetails
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
