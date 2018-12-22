// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import axios from 'axios'
import qs from 'qs'
<<<<<<< HEAD
import Mint from 'mint-ui'

import {
  Toast,
  Swipe,
  SwipeItem
} from 'mint-ui'

//引入mint-ui的css样式文件。
import 'mint-ui/lib/style.css';


Vue.use(Mint);
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.prototype.Toast = Toast;

Vue.prototype.qs = qs;
axios.defaults.baseURL = 'http://onekey.applinzi.com/';
=======



Vue.prototype.qs = qs;
axios.defaults.baseURL = 'http://127.0.0.1:3005/';
>>>>>>> a16eff8f2bdc54a51e59d88d7a561190698bd7ad
axios.defaults.withCredentials = true;
Vue.prototype.axios = axios;

Vue.config.productionTip = false

<<<<<<< HEAD

Vue.filter('businessStatusFilter', function (val) {
  if (val) {
    return '办理成功'
  } else {
    return '办理失败'
  }
})
Vue.filter('getInteger', function (val) {
  return Math.ceil(val);
})

=======
>>>>>>> a16eff8f2bdc54a51e59d88d7a561190698bd7ad
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
