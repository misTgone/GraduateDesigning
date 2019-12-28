import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 1.引入swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// 2.引入axios库
import axios from 'axios'
// this.axios.get(url).then();
// 3.引入qs模块
import qs from 'qs'
// 1.1
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
// 2.1配置跨域访问选项
axios.defaults.withCredentials = true
// 2.2在main.js中将axios配置vue实例中
Vue.prototype.axios = axios
// 3.1
Vue.prototype.qs = qs
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
