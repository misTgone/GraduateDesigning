import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Router from 'vue-router'
// 1.引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// 2.引入axios库
import axios from 'axios'
// this.axios.get(url).then();
// 3.引入qs模块
import qs from 'qs'
// 4.引入Element
import ElementUI from 'element-ui'
// 4.1引入Element的css
import 'element-ui/lib/theme-chalk/index.css'
// 5 这是为了避免一个报错
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 1.1
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
// 2.1配置跨域访问选项
axios.defaults.withCredentials = true
// 2.2在main.js中将axios配置vue实例中
Vue.prototype.axios = axios
// 3.1
Vue.prototype.qs = qs
// 4.2
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
