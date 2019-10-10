// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 官方模組
import Vue from 'vue'
import App from './App'
import router from './router'
// axios套件
import axios from 'axios'
import VueAxios from 'vue-axios'
// Swiper套件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// loadin-overlay套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// ScratchCard套件 -- 備註：以 userCoupon 元件載入
// vee-validate套件
import VeeValidate, {
  Validator
} from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';

// 自訂 bus
import './bus';
// 自訂 filters
import currencyFilter from './filters/currency';
import dateTimeFilter from './filters/dateTime';
import dollarFilter from './filters/dollar';

// 元件方式載入loadin-overlay套件
Vue.component('Loading', Loading);

// 全域載入Filter方法
Vue.filter('currency', currencyFilter);
Vue.filter('dateTime', dateTimeFilter);
Vue.filter('dollar', dollarFilter);

// 啟用附加套件
Vue.use(VueAxios, axios);
Vue.use(VueAwesomeSwiper);
Vue.use(VeeValidate);

// 啟用附加套件 -- 設定語系
Validator.localize('zhTW', zhTW);

// 前端 axios 請求附帶 Cookies 設定
axios.defaults.withCredentials = true;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})

// 全局巡視守衛
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const url = `${process.env.API_Server}/api/user/check`;
    axios.post(url).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: ('/login'),
        })
      }
    })
  } else {
    next();
  }
})
